// 빌드 타임 프리렌더 + sitemap 생성.
//   npm run build = vite build(클라이언트) → vite build --ssr(서버 엔트리) → tsc -b → 이 스크립트
//
// 1) dist-ssr/entry-server.js 의 render(url) 로 PRERENDER_ROUTES 각 경로를 React 서버 렌더링
// 2) dist/index.html(클라이언트 빌드 결과)을 템플릿으로, 경로마다 dist/<경로>/index.html 생성
//    - Hub 브랜드 블록의 사이트 공통 canonical·description·OG(홈 값)를 지우고 페이지별 Helmet 태그로 교체
//    - #root 안의 브랜드 크롤러 본문을 실제 페이지 마크업으로 교체 (data-ssr-path 로 hydrate 판단)
// 3) dist/index.html(= / 와 SPA fallback) 은 /promo 렌더 결과로 교체 — canonical 은 https://tigc.kr/
// 4) dist/sitemap.xml · public/sitemap.xml 을 같은 라우트 목록으로 생성
//
// index.html 원본의 브랜드 마커 블록은 건드리지 않는다(Hub sync_brand.py 소유). 출력물만 후처리한다.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SSR_DIR = path.join(ROOT, "dist-ssr");
const SITE_URL = (process.env.SITE_URL || "https://tigc.kr").replace(/\/+$/, "");

const { render, PRERENDER_ROUTES } = await import(pathToFileURL(path.join(SSR_DIR, "entry-server.js")).href);
const template = await readFile(path.join(DIST, "index.html"), "utf8");

// 브랜드 블록이 넣는 사이트 공통 태그 중 페이지마다 달라야 하는 것들 (og:image·site_name·JSON-LD 는 유지)
const SITE_WIDE_TAG_PATTERNS = [
  /<link rel="canonical"[^>]*>\s*/g,
  /<meta name="description"[^>]*>\s*/g,
  /<meta property="og:(type|title|description|url)"[^>]*>\s*/g,
  /<meta name="twitter:(card|title|description)"[^>]*>\s*/g,
];

function stripSiteWideTags(html) {
  return SITE_WIDE_TAG_PATTERNS.reduce((acc, re) => acc.replace(re, ""), html);
}

// 검색엔진 소유 확인 메타 (값은 배포 환경변수로 주입 — 저장소에 하드코딩하지 않음)
function verificationTags() {
  const tags = [];
  if (process.env.GOOGLE_SITE_VERIFICATION)
    tags.push(`<meta name="google-site-verification" content="${process.env.GOOGLE_SITE_VERIFICATION}" />`);
  if (process.env.NAVER_SITE_VERIFICATION)
    tags.push(`<meta name="naver-site-verification" content="${process.env.NAVER_SITE_VERIFICATION}" />`);
  return tags.join("\n    ");
}

const ROOT_RE = /<div id="root">[\s\S]*?<!-- \/T Skool brand body --><\/div>|<div id="root"><\/div>/;
if (!ROOT_RE.test(template)) throw new Error("dist/index.html 에서 #root 를 찾지 못했습니다.");
if (!/<title>[\s\S]*?<\/title>/.test(template)) throw new Error("dist/index.html 에 <title> 이 없습니다.");

function buildPage(routePath, { html, head }) {
  if (!head.title) throw new Error(`${routePath}: <Seo> 가 없어 title 이 비었습니다.`);
  if (!/rel="canonical"/.test(head.link)) throw new Error(`${routePath}: canonical 이 없습니다.`);
  let page = stripSiteWideTags(template);
  page = page.replace(/<title>[\s\S]*?<\/title>/, head.title);
  const headTags = [head.meta, head.link, head.script, verificationTags()].filter(Boolean).join("\n    ");
  page = page.replace("</head>", `    ${headTags}\n  </head>`);
  page = page.replace(ROOT_RE, () => `<div id="root" data-ssr-path="${routePath}" data-ssr-time="${NOW}">${html}</div>`);
  return page;
}

async function writePage(routePath, page) {
  const dir = path.join(DIST, routePath);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), page);
}

const NOW = Date.now(); // 모든 페이지 공통 렌더 시각 — #root data-ssr-time 으로 클라이언트 첫 렌더에 전달
const today = new Date(NOW).toISOString().slice(0, 10);
const problems = [];

for (const route of PRERENDER_ROUTES) {
  const result = await render(route.path, NOW);
  if (result.statusCode !== 200) problems.push(`${route.path} → status ${result.statusCode}`);
  await writePage(route.path, buildPage(route.path, result));
}

// 루트(/) — Firebase 가 / 와 미존재 경로(SPA rewrite)에 이 파일을 준다. 랜딩(/promo) 본문 + canonical https://tigc.kr/
const home = await render("/promo", NOW);
await writeFile(path.join(DIST, "index.html"), buildPage("/", home));

if (problems.length) throw new Error(`프리렌더 실패:\n  ${problems.join("\n  ")}`);

// sitemap — 프리렌더 대상과 같은 목록에서 생성 (canonical 과 일치하는 URL만)
const urls = [
  { loc: `${SITE_URL}/`, lastmod: today },
  ...PRERENDER_ROUTES.filter((r) => r.inSitemap !== false).map((r) => ({
    loc: `${SITE_URL}${r.path}`,
    lastmod: r.lastmod || today,
  })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap);
await writeFile(path.join(ROOT, "public", "sitemap.xml"), sitemap);

await rm(SSR_DIR, { recursive: true, force: true });
console.log(`prerendered ${PRERENDER_ROUTES.length + 1} pages, sitemap ${urls.length} urls`);
