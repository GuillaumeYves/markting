import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/**
 * A build served from anywhere but the root is a preview — today the GitHub
 * Pages copy under /markting/. It carries the production canonical, so leaving
 * it indexable would put a second, weaker copy of the site in front of anyone
 * searching for the real one.
 */
function noindexPreview(): Plugin {
  const tag = '<meta name="robots" content="noindex" />';
  let base = "/";

  return {
    name: "markting:noindex-preview",
    apply: "build",
    configResolved: (config) => {
      base = config.base;
    },
    transformIndexHtml: (html) =>
      base === "/" ? html : html.replace("</title>", `</title>\n    ${tag}`),
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), noindexPreview()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: { target: "es2022", sourcemap: false, cssCodeSplit: false },
  test: { environment: "jsdom", setupFiles: "./src/test/setup.ts", css: true },
});
