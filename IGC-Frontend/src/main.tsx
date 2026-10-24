import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "@tskool/satellite-header/styles.css";

import { createAppRouter } from "./router";

const router = createAppRouter();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false, staleTime: 5 * 60 * 1000 },
  },
});

// index.html 의 Hub 브랜드 블록(자동 생성)에 들어 있는 사이트 공통 canonical·설명·OG 태그를 지운다.
// 페이지별 값은 <Seo>(react-helmet-async, data-rh 속성)가 넣는다. 남겨 두면 모든 페이지가
// canonical 2개(홈 + 자기 자신)를 갖게 돼 검색엔진이 하위 페이지를 홈의 중복으로 처리한다.
const SITE_WIDE_HEAD_TAGS = [
  'link[rel="canonical"]',
  'meta[name="description"]',
  'meta[property="og:type"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:url"]',
  'meta[name="twitter:card"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
];
document.head
  .querySelectorAll(SITE_WIDE_HEAD_TAGS.map((s) => `${s}:not([data-rh])`).join(","))
  .forEach((el) => el.remove());

const app = (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </HelmetProvider>
);

const rootElement = document.getElementById("root")!;
const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
// 빌드 타임 프리렌더(scripts/prerender.mjs)가 만든 마크업은 data-ssr-path 로 표시된다.
// 지금 주소와 같은 경로로 렌더된 HTML일 때만 hydrate 하고, 그 밖(SPA fallback·브랜드 본문)은 새로 렌더한다.
const ssrPath = rootElement.dataset.ssrPath;

if (ssrPath && normalize(ssrPath) === normalize(window.location.pathname)) {
  // 첫 렌더가 서버 결과와 같도록 라우트 로더를 먼저 끝낸 뒤 hydrate.
  // router.ssr 를 세워 두면 TanStack Router 가 서버 렌더와 같은 트리(최상위 Suspense 없음)로 그리고,
  // 이미 끝낸 첫 로드를 Transitioner 가 다시 돌리지 않는다 — 없으면 hydration 불일치(#418)로 전체 재렌더된다.
  router.load().then(() => {
    (router as unknown as { ssr?: { manifest: undefined } }).ssr = { manifest: undefined };
    ReactDOM.hydrateRoot(rootElement, app);
  });
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
