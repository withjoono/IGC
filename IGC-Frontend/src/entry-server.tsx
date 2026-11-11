// 빌드 타임 프리렌더 전용 엔트리 (scripts/prerender.mjs 가 import).
// Chromium 없이 React 서버 렌더링으로 라우트별 완성 HTML을 만든다 → 구글·네이버 크롤러가 JS 없이 본문을 읽음.
import { renderToString } from "react-dom/server";
import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { createAppRouter } from "./router";
import { setRenderNow } from "./lib/now";
import { BLOG_POSTS, UNIVERSITIES } from "./data/igc";
import { UNI_GUIDES } from "./data/uni-guides";

export interface PrerenderRoute {
  path: string;
  /** sitemap lastmod (YYYY-MM-DD). 없으면 CONTENT_UPDATED */
  lastmod?: string;
  /** sitemap 포함 여부 — canonical이 다른 URL을 가리키는 페이지는 제외 */
  inSitemap?: boolean;
}

/**
 * 정적 페이지의 sitemap lastmod 기본값. 빌드할 때마다 오늘 날짜로 바꾸면 검색엔진이 lastmod 를 신뢰하지 않으므로
 * 내용을 실제로 고친 페이지만 아래 목록에서 lastmod 를 올리고, 이 값은 사이트 전반을 손볼 때만 갱신한다.
 */
export const CONTENT_UPDATED = "2026-11-06";

/** 프리렌더 + sitemap 대상. 라우트를 추가하면 여기에만 넣으면 된다. */
export const PRERENDER_ROUTES: PrerenderRoute[] = [
  // /promo 는 canonical 이 루트(/)라서 sitemap 에서는 / 로만 노출
  { path: "/promo", inSitemap: false },
  { path: "/promo/universities" },
  ...UNIVERSITIES.map((u) => ({ path: `/promo/universities/${u.id}`, lastmod: "2026-10-26" })),
  { path: "/promo/deadlines" },
  { path: "/promo/parallel", lastmod: "2026-11-11" },
  { path: "/promo/pricing", lastmod: "2026-11-11" },
  { path: "/promo/diagnosis" },
  { path: "/promo/english" },
  { path: "/promo/ghent-exam" },
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

/** /llms.txt — AI 검색·답변 엔진이 사이트를 한 번에 파악하도록 정본 페이지와 핵심 사실을 텍스트로 정리 */
export function LLMS_TXT(site: string) {
  const uni = UNIVERSITIES.map((u) => {
    const g = UNI_GUIDES[u.id];
    return `- [${u.name}](${site}/promo/universities/${u.id}): ${g?.tagline ?? u.decisiveFactor} 학비 ${u.tuition}.`;
  }).join("\n");
  const posts = BLOG_POSTS.map((p) => `- [${p.title}](${site}/promo/blog/${p.slug}): ${p.excerpt}`).join("\n");
  return `# T IGC — 인천글로벌캠퍼스 입시 정보·컨설팅

> 인천글로벌캠퍼스(IGC, 인천 송도) 5개 대학(겐트대·한국뉴욕주립대 스토니브룩·FIT·유타대 아시아캠퍼스·한국조지메이슨대)의 2027학년도 전형·학비·장학금·원서 마감일 정보와 입시 컨설팅. 운영: (주)거북스쿨(T스쿨). 국내 수시·정시와 IGC 지원을 한 팀이 함께 설계한다.

- 컨설팅 비용: 첫 대학 98만원, 추가 대학당 48만원(에세이 첨삭·원서 제출·합격 후 절차 포함, 대학 전형료 별도). 에세이 대필은 하지 않는다.
- IGC 대학 지원은 국내 수시 6회·정시 3회 제한에 포함되지 않는다.
- 학비·장학·일정 수치는 각 대학 공식 자료 기준이며 페이지마다 출처와 확인일을 표기한다.
- 상담: ${site}/promo/consult · 전화 010-2518-7139

## 대학별 가이드
${uni}

## 핵심 페이지
- [IGC 5개 대학 비교](${site}/promo/universities): 학비·순위·본교 이동·전형·어학 비교표
- [2027 원서 마감일](${site}/promo/deadlines): 대학·학기·단계별 마감일
- [국내 수시·정시 + IGC 병행](${site}/promo/parallel): 2027 국내 대입 일정과 IGC 마감을 함께 보는 병행 전략
- [컨설팅 비용](${site}/promo/pricing): 요금·포함 항목·타사 비교
- [어학 경로](${site}/promo/english): 수능영어·Versant·Duolingo·TOEIC·SAT·ACT·조건부입학
- [겐트 입학시험 대비반](${site}/promo/ghent-exam)

## 가이드 글
${posts}
`;
}
