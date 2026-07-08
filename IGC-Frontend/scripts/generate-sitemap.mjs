// 빌드 전/후 sitemap.xml 생성: node scripts/generate-sitemap.mjs
import { writeFileSync } from "node:fs";

const BASE = process.env.SITE_URL || "https://tigc.kr";
const unis = ["ghent", "sbu", "utah", "gmu"];
const blog = ["naesin-5-igc", "igc-2027-deadlines"];

const routes = [
  "/promo",
  "/promo/universities",
  ...unis.map((u) => `/promo/universities/${u}`),
  "/promo/deadlines",
  "/promo/parallel",
  "/promo/pricing",
  "/promo/diagnosis",
  "/promo/english",
  "/promo/apps",
  "/promo/blog",
  ...blog.map((b) => `/promo/blog/${b}`),
  "/promo/consulting",
  "/promo/cases",
  "/promo/consult",
  "/promo/igcclass",
  "/promo/igcclass/study",
  "/promo/igcclass/grade",
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${BASE}${r}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml generated: ${routes.length} urls`);
