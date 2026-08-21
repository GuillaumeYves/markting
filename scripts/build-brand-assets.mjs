/**
 * Renders the favicon set and the Open Graph image from the two SVG sources in
 * assets/brand. The outputs are committed, so neither CI nor the production
 * build ever needs to run this script.
 *
 * The brand fonts live in assets/brand/fonts and are registered through a
 * throwaway fontconfig file, which keeps the render identical on any machine
 * instead of depending on what happens to be installed system-wide.
 */
import { mkdtempSync, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brandRoot = path.join(projectRoot, "assets", "brand");
const publicRoot = path.join(projectRoot, "public");

const fontConfigDir = mkdtempSync(path.join(tmpdir(), "markting-fonts-"));
const fontConfigFile = path.join(fontConfigDir, "fonts.conf");
writeFileSync(
  fontConfigFile,
  [
    '<?xml version="1.0"?>',
    '<!DOCTYPE fontconfig SYSTEM "fonts.dtd">',
    "<fontconfig>",
    `  <dir>${path.join(brandRoot, "fonts")}</dir>`,
    `  <cachedir>${path.join(fontConfigDir, "cache")}</cachedir>`,
    "</fontconfig>",
  ].join("\n"),
);
process.env.FONTCONFIG_FILE = fontConfigFile;

// Imported after FONTCONFIG_FILE is set: libvips reads it when it initialises.
const { default: sharp } = await import("sharp");

const pngOptions = { compressionLevel: 9, effort: 10, palette: true, quality: 100 };
const iconSource = await readFile(path.join(brandRoot, "icon.svg"));

async function renderIcon(size, filename) {
  await sharp(iconSource, { density: 384 })
    .resize(size, size, { fit: "cover" })
    .png(pngOptions)
    .toFile(path.join(publicRoot, filename));
}

/** Minimal multi-size .ico container: three PNG frames behind one directory. */
function encodeIco(images) {
  const headerSize = 6;
  const directorySize = images.length * 16;
  let imageOffset = headerSize + directorySize;
  const header = Buffer.alloc(headerSize + directorySize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  images.forEach(({ size, buffer }, index) => {
    const offset = headerSize + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, offset);
    header.writeUInt8(size === 256 ? 0 : size, offset + 1);
    header.writeUInt16LE(1, offset + 4);
    header.writeUInt16LE(32, offset + 6);
    header.writeUInt32LE(buffer.length, offset + 8);
    header.writeUInt32LE(imageOffset, offset + 12);
    imageOffset += buffer.length;
  });

  return Buffer.concat([header, ...images.map(({ buffer }) => buffer)]);
}

const icons = [
  [16, "favicon-16x16.png"],
  [32, "favicon-32x32.png"],
  [48, "favicon-48x48.png"],
  [180, "apple-touch-icon.png"],
  [192, "icon-192.png"],
  [512, "icon-512.png"],
];

for (const [size, filename] of icons) {
  await renderIcon(size, filename);
}

const icoFrames = await Promise.all(
  icons.slice(0, 3).map(async ([size, filename]) => ({
    size,
    buffer: await readFile(path.join(publicRoot, filename)),
  })),
);
await writeFile(path.join(publicRoot, "favicon.ico"), encodeIco(icoFrames));

await sharp(await readFile(path.join(brandRoot, "og-image.svg")), { density: 144 })
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 90, progressive: true, chromaSubsampling: "4:4:4", mozjpeg: true })
  .toFile(path.join(publicRoot, "og-image.jpg"));

console.log("Generated the favicon set and the 1200x630 Open Graph image.");
