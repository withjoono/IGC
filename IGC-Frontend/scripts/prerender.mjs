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

const { render, PRERENDER_ROUTES, CONTENT_UPDATED, LLMS_TXT } = await import(pathToFileURL(path.join(SSR_DIR, "entry-server.js")).href);
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

// 홈은 블로그 목록·마감일이 함께 보이므로 가장 최근 lastmod 를 따른다
const HOME_LASTMOD = [CONTENT_UPDATED, ...PRERENDER_ROUTES.map((r) => r.lastmod).filter(Boolean)].sort().at(-1);

// sitemap — 프리렌더 대상과 같은 목록에서 생성 (canonical 과 일치하는 URL만)
const urls = [
  { loc: `${SITE_URL}/`, lastmod: HOME_LASTMOD },
  ...PRERENDER_ROUTES.filter((r) => r.inSitemap !== false).map((r) => ({
    loc: `${SITE_URL}${r.path}`,
    lastmod: r.lastmod || CONTENT_UPDATED,
  })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap);
await writeFile(path.join(ROOT, "public", "sitemap.xml"), sitemap);

// AI 검색용 요약 (llms.txt) — 사이트가 무엇이고 어떤 페이지가 정본인지 텍스트로 안내
await writeFile(path.join(DIST, "llms.txt"), LLMS_TXT(SITE_URL));

// 실제 404 — firebase.json rewrite 를 /promo/** 로 좁혔기 때문에, 그 밖의 없는 주소는 이 파일을 404 상태로 받는다
await writeFile(
  path.join(DIST, "404.html"),
  `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>페이지를 찾을 수 없습니다 | T IGC</title>
<style>body{font-family:system-ui,-apple-system,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;margin:0;padding:64px 20px;text-align:center;color:#1e2a4a;background:#fff}a{color:#2563eb}</style>
</head><body><h1>페이지를 찾을 수 없습니다</h1><p>주소가 바뀌었거나 없는 페이지입니다.</p>
<p><a href="/">T IGC 홈</a> · <a href="/promo/universities">IGC 5개 대학 비교</a> · <a href="/promo/consult">무료 상담 신청</a></p></body></html>
`,
);

await rm(SSR_DIR, { recursive: true, force: true });
console.log(`prerendered ${PRERENDER_ROUTES.length + 1} pages, sitemap ${urls.length} urls`);
