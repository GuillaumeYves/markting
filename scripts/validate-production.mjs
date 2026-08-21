/**
 * Last gate before a deploy: checks the contents of dist/ rather than the
 * source, because the artifact uploaded by CI is exactly what gets published.
 */
import { createHash } from "node:crypto";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");
const productionOrigin = "https://markting.guillaumeyves.fr";

/** Budgets are deliberately close to the current size, to catch drift early. */
const JAVASCRIPT_BUDGET_BYTES = 380 * 1024;
const CSS_BUDGET_BYTES = 40 * 1024;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(entryPath) : [entryPath];
    }),
  );
  return nested.flat();
}

const requiredFiles = [
  ".htaccess",
  "index.html",
  "favicon.ico",
  "apple-touch-icon.png",
  "icon-512.png",
  "og-image.jpg",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "fonts/instrument-sans-400-700-latin.woff2",
  "fonts/instrument-serif-400-italic-latin.woff2",
];
await Promise.all(
  requiredFiles.map(async (file) => {
    try {
      await access(path.join(distRoot, file));
    } catch {
      throw new Error(`Missing required production file: dist/${file}`);
    }
  }),
);

const distFiles = await walk(distRoot);
const relativeDistFiles = distFiles.map((file) =>
  path.relative(distRoot, file).replaceAll("\\", "/"),
);

assert(
  !relativeDistFiles.some((file) => file.endsWith(".map")),
  "Production source maps must not be published.",
);
assert(
  !relativeDistFiles.some((file) => /\.(?:ttf|otf|woff)$/.test(file)),
  "Only woff2 fonts belong in the published bundle.",
);

const html = await readFile(path.join(distRoot, "index.html"), "utf8");
const htaccess = await readFile(path.join(distRoot, ".htaccess"), "utf8");

const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
assert(jsonLd, "The JSON-LD block is missing from dist/index.html.");
const jsonLdHash = `sha256-${createHash("sha256").update(jsonLd).digest("base64")}`;
assert(
  htaccess.includes(`'${jsonLdHash}'`),
  `The CSP does not allow the current JSON-LD block. Expected ${jsonLdHash}.`,
);

for (const header of [
  "Content-Security-Policy",
  "Permissions-Policy",
  "Referrer-Policy",
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "X-Frame-Options",
]) {
  assert(htaccess.includes(header), `Missing security header in .htaccess: ${header}`);
}
for (const directive of [
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src-attr 'none'",
  "upgrade-insecure-requests",
]) {
  assert(htaccess.includes(directive), `Missing CSP directive: ${directive}`);
}
assert(htaccess.includes("[R=301,L]"), "The HTTPS/canonical redirect is missing.");

for (const tag of [
  `<link rel="canonical" href="${productionOrigin}/"`,
  `<meta property="og:url" content="${productionOrigin}/"`,
  `<meta property="og:image" content="${productionOrigin}/og-image.jpg"`,
]) {
  assert(html.includes(tag), `Missing or stale metadata in index.html: ${tag}`);
}
assert(
  html.includes('rel="preload"') && html.includes("instrument-sans-400-700-latin.woff2"),
  "The critical font preload is missing.",
);
assert(html.includes("<title>MarKting</title>"), "The page title changed.");

const robots = await readFile(path.join(distRoot, "robots.txt"), "utf8");
const sitemap = await readFile(path.join(distRoot, "sitemap.xml"), "utf8");
assert(robots.includes(`${productionOrigin}/sitemap.xml`), "robots.txt points at the wrong host.");
assert(sitemap.includes(`${productionOrigin}/`), "sitemap.xml points at the wrong host.");

const openGraph = await sharp(path.join(distRoot, "og-image.jpg")).metadata();
assert(
  openGraph.format === "jpeg" && openGraph.width === 1200 && openGraph.height === 630,
  "The Open Graph image must be a 1200x630 JPEG.",
);
const appIcon = await sharp(path.join(distRoot, "icon-512.png")).metadata();
assert(
  appIcon.width === 512 && appIcon.height === 512,
  "The 512px app icon must be a 512x512 PNG.",
);

const assetFiles = distFiles.filter((file) => path.dirname(file) === path.join(distRoot, "assets"));
const sizes = await Promise.all(
  assetFiles.map(async (file) => ({ file, bytes: (await stat(file)).size })),
);
const javascriptBytes = sizes
  .filter(({ file }) => file.endsWith(".js"))
  .reduce((total, { bytes }) => total + bytes, 0);
const cssBytes = sizes
  .filter(({ file }) => file.endsWith(".css"))
  .reduce((total, { bytes }) => total + bytes, 0);
assert(
  javascriptBytes < JAVASCRIPT_BUDGET_BYTES,
  `JavaScript budget exceeded: ${(javascriptBytes / 1024).toFixed(1)} KiB.`,
);
assert(cssBytes < CSS_BUDGET_BYTES, `CSS budget exceeded: ${(cssBytes / 1024).toFixed(1)} KiB.`);

console.log(
  `Validated ${relativeDistFiles.length} production files, CSP hash ${jsonLdHash}, ` +
    `${(javascriptBytes / 1024).toFixed(1)} KiB JS and ${(cssBytes / 1024).toFixed(1)} KiB CSS.`,
);
