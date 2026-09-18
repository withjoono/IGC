import { copyFile, mkdir } from "node:fs/promises";

// Firebase serves existing files before SPA rewrites. Keep /promo's SEO fallback
// and the compiled React entry together, rather than shipping a static-only page.
const dist = new URL("../dist/", import.meta.url);
await mkdir(new URL("promo/", dist), { recursive: true });
await copyFile(new URL("index.html", dist), new URL("promo/index.html", dist));
console.log("Hosting /promo entry prepared with the compiled app.");
