// 프리렌더 결과 점검 (선택 도구): node scripts/check-prerender.mjs
// - dist/ 를 Firebase Hosting 처럼 서빙(파일 → 디렉터리 index.html → SPA fallback)
// - sitemap.xml 의 모든 URL을 실제 브라우저로 열어 hydration 오류, canonical·description·og:title 개수(각 1개) 확인
// 필요: npm i -D playwright && npx playwright install chromium   (기본 의존성 아님)
// 날짜가 지난 뒤의 hydration 을 보려면: OFFSET_DAYS=30 node scripts/check-prerender.mjs
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const DIST = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "dist");
const PORT = 4173;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".xml": "application/xml", ".txt": "text/plain" };

async function resolveFile(p) {
  const f = path.join(DIST, decodeURIComponent(p));
  try {
    const s = await stat(f);
    if (s.isFile()) return f;
    if (s.isDirectory()) {
      const i = path.join(f, "index.html");
      await stat(i);
      return i;
    }
  } catch {}
  return path.join(DIST, "index.html");
}

const server = http
  .createServer(async (req, res) => {
    const f = await resolveFile(new URL(req.url, "http://x").pathname);
    res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" });
    res.end(await readFile(f));
  })
  .listen(PORT);

const sitemap = await readFile(path.join(DIST, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
routes.push("/promo", "/promo/not-a-page");

const browser = await chromium.launch();
let bad = 0;
for (const r of routes) {
  const page = await browser.newPage();
  if (process.env.OFFSET_DAYS) await page.clock.install({ time: new Date(Date.now() + Number(process.env.OFFSET_DAYS) * 86400000) });
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error" || /hydrat/i.test(m.text())) errors.push(m.text().slice(0, 200)); });
  page.on("pageerror", (e) => errors.push(e.message.slice(0, 200)));
  await page.goto(`http://localhost:${PORT}${r}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const info = await page.evaluate(() => ({
    title: document.title,
    canon: document.querySelectorAll('link[rel="canonical"]').length,
    desc: document.querySelectorAll('meta[name="description"]').length,
    og: document.querySelectorAll('meta[property="og:title"]').length,
  }));
  const ok = info.canon === 1 && info.desc === 1 && info.og === 1 && errors.length === 0;
  if (!ok) bad++;
  console.log(`${ok ? "OK " : "BAD"} ${r} | ${info.title.slice(0, 50)} | canon=${info.canon} desc=${info.desc} og=${info.og}`);
  errors.forEach((e) => console.log(`     ! ${e}`));
  await page.close();
}
await browser.close();
server.close();
console.log(`${routes.length - bad}/${routes.length} OK`);
process.exit(bad ? 1 : 0);
