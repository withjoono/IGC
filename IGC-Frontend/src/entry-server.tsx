// 빌드 타임 프리렌더 전용 엔트리 (scripts/prerender.mjs 가 import).
// Chromium 없이 React 서버 렌더링으로 라우트별 완성 HTML을 만든다 → 구글·네이버 크롤러가 JS 없이 본문을 읽음.
import { renderToString } from "react-dom/server";
import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { createAppRouter } from "./router";
import { setRenderNow } from "./lib/now";
import { BLOG_POSTS, UNIVERSITIES } from "./data/igc";

export interface PrerenderRoute {
  path: string;
  /** sitemap lastmod (YYYY-MM-DD). 없으면 빌드일 */
  lastmod?: string;
  /** sitemap 포함 여부 — canonical이 다른 URL을 가리키는 페이지는 제외 */
  inSitemap?: boolean;
}

/** 프리렌더 + sitemap 대상. 라우트를 추가하면 여기에만 넣으면 된다. */
export const PRERENDER_ROUTES: PrerenderRoute[] = [
  // /promo 는 canonical 이 루트(/)라서 sitemap 에서는 / 로만 노출
  { path: "/promo", inSitemap: false },
  { path: "/promo/universities" },
  ...UNIVERSITIES.map((u) => ({ path: `/promo/universities/${u.id}` })),
  { path: "/promo/deadlines" },
  { path: "/promo/parallel" },
  { path: "/promo/pricing" },
  { path: "/promo/diagnosis" },
  { path: "/promo/english" },
  { path: "/promo/apps" },
  { path: "/promo/blog" },
  ...BLOG_POSTS.map((p) => ({ path: `/promo/blog/${p.slug}`, lastmod: p.updated ?? p.date })),
  { path: "/promo/consulting" },
  { path: "/promo/cases" },
  { path: "/promo/consult" },
  { path: "/promo/igcclass" },
  { path: "/promo/igcclass/study" },
  { path: "/promo/igcclass/grade" },
];

export interface RenderResult {
  html: string;
  head: { title: string; meta: string; link: string; script: string };
  statusCode: number;
}

export async function render(url: string, now: number): Promise<RenderResult> {
  setRenderNow(now);
  const router = createAppRouter(createMemoryHistory({ initialEntries: [url] }));
  await router.load();

  const helmetContext: { helmet?: HelmetServerState } = {};
  const queryClient = new QueryClient();
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>,
  );

  const h = helmetContext.helmet;
  return {
    html,
    head: {
      title: h?.title.toString() ?? "",
      meta: h?.meta.toString() ?? "",
      link: h?.link.toString() ?? "",
      script: h?.script.toString() ?? "",
    },
    statusCode: router.state.statusCode,
  };
}
