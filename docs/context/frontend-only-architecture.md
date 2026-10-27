---
name: frontend-only-architecture
description: 자체 백엔드 없는 특화대학형 구조, 상담 폼의 프로덕션 유실 위험, 정적 데이터·라우트·빌드 파이프라인
type: project
---

# 프론트 전용 구조

## 특화대학형 패턴

T IGC 는 과기원(`Kwakiwon`)·사관학교(`Sakwan`)·메디(`T_Medi`)와 같은 **특화대학형 위성앱**이다.

- 자체 App Engine 서비스 **없음**
- 자체 DB 스키마 **없음**
- 자체 인증 **없음** — 필요하면 Hub SSO 에 위임
- Firebase Hosting 프론트만 배포

실측: `IGC-Frontend/src` 전체에 **로그인·토큰·세션·`Authorization` 헤더 코드가 하나도 없다.** 현재는 완전한 정적 프로모 사이트다.

**자체 로그인·회원가입을 만들지 말 것.** 인증이 필요해지면 Hub 토큰교환 계약(client → Hub `/login?redirect=` → `sso_code` → backend 가 Hub `/auth/sso/verify-code`)을 따른다.

## 유일한 백엔드 호출 지점 — 상담 신청 폼

`src/routes/promo/consult.tsx`

```ts
async function onSubmit(e) {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
  try {
    // Hub 백엔드 연동 지점 (vite proxy /api-nest → :4000)
    await fetch("/api-nest/igc/consult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } finally {
    setSent(true);          // 실패해도 "상담 신청이 접수되었습니다"
  }
}
```

폼이 보내는 필드: `name`(학생 이름) · `grade`(고1~기타) · `gpa`(내신 등급대) · `interest`(관심 대학/계열) 외.

`/api-nest` 프록시는 **dev 전용**이다 — `vite.config.ts`:

```ts
proxy: { "/api-nest": { target: "http://localhost:4000", changeOrigin: true,
                        rewrite: (p) => p.replace(/^\/api-nest/, "") } }
```

### 프로덕션 위험 (확인 필요)

프로덕션 Firebase Hosting 에는 `/api-nest` rewrite 가 **없다.** `firebase.json` 의 SPA rewrite(`**` → `/index.html`) 가 걸리므로 POST 는 **HTML 을 200 으로** 받는다. 게다가 `.catch(() => {})` 가 네트워크 에러까지 삼키고, `finally` 가 무조건 성공 화면을 띄운다.

→ **사용자에게는 접수 완료로 보이지만 어디에도 저장되지 않을 수 있다.** 실제 상담 신청이 유실되고 있는지 확인이 필요하다.

확인 순서:

1. Hub 백엔드에 `POST /igc/consult` 엔드포인트가 존재하는가?
2. 존재한다면 프로덕션에서 어떻게 도달시킬 것인가 — Firebase Hosting rewrite 추가 vs. Hub 절대 URL 로 호출(그 경우 CORS 필요).
3. 실패를 사용자에게 노출하도록 고칠 것. `.catch(() => {})` 로 삼키지 말 것.

**확인 전까지 "상담 신청이 들어오고 있다"고 가정하지 말 것.**

## 라우트 구조

루트 `/` 는 `/promo` 로 `redirect` 한다(`src/routes/index.tsx`). 모든 페이지가 `/promo/*` 하위다.

```
/promo                          index
/promo/universities             index, /$uniId   (ghent, sbu, utah, gmu, fit)
/promo/deadlines  /promo/parallel  /promo/pricing  /promo/diagnosis
/promo/english    /promo/apps      /promo/consulting  /promo/cases
/promo/consult                  상담 신청 폼 (유일한 백엔드 호출)
/promo/blog                     index, /$slug
/promo/igcclass                 index, /study, /grade
```

TanStack Router **파일기반** 라우팅이다. `src/routeTree.gen.ts` 와 `.tanstack/` 은 자동 생성물이며 `.gitignore` 대상 — **손으로 고치지 말 것.**

## 데이터

정적 소스다: `src/data/igc.ts`(대학·학과·정원 — `UNIVERSITIES`), `src/data/photos.ts`, `src/data/programs.ts`.
파일 주석: "운영 시 Hub 백엔드(`/api-nest`) 또는 CMS 로 교체 가능. 현재는 정적 소스(프리렌더 친화)."

## 빌드 파이프라인

```
npm run build = vite build                                   (클라이언트 → dist/)
              → vite build --ssr src/entry-server.tsx --outDir dist-ssr
              → tsc -b                                      (타입 게이트)
              → node scripts/prerender.mjs                  (라우트별 HTML + sitemap)
```

- 프리렌더는 **빌드의 일부**다(별도 명령 없음, Chromium 불필요). `dist-ssr/entry-server.js` 의 `render(url)` 로 React 서버 렌더링해 `dist/<경로>/index.html` 을 만든다. `dist/index.html`(= `/` 와 SPA fallback)은 `/promo` 렌더 결과 + canonical `https://tigc.kr/`.
- **라우트를 추가하면 `src/entry-server.tsx` 의 `PRERENDER_ROUTES` 에 넣는다.** 대학(`UNIVERSITIES`)·블로그(`BLOG_POSTS`)는 데이터에서 자동 포함. sitemap(`dist/sitemap.xml`·`public/sitemap.xml`)도 같은 목록으로 생성된다 — 예전 `generate-sitemap.mjs`·react-snap 설정은 삭제됐다.
- 페이지에 `<Seo>` 가 없거나 렌더가 200이 아니면 빌드 실패.
- 브랜드 블록의 사이트 공통 canonical·description·OG 는 출력물에서만 지우고 페이지별 값으로 교체한다(원본 `index.html` 은 그대로).
- 클라이언트(`src/main.tsx`)는 `#root[data-ssr-path]` 가 현재 경로와 같을 때만 hydrate 한다. D-day·연도처럼 시각에 따라 바뀌는 값은 `src/lib/now.ts` 의 `useNow()` 로 렌더 — 렌더 중 `Date.now()` 직접 사용 금지(hydration 불일치 #418).
- `firebase.json` `trailingSlash: false` — `/promo/x/` 는 `/promo/x` 로 301, `/promo/x` 는 `dist/promo/x/index.html` 을 준다(canonical 과 일치).
- `tsc -b` 가 빌드 게이트다 — **타입 에러로 빌드가 깨진다**(Hub 프론트와 다르다).
- `npm run lint` 는 `--max-warnings 0` 이라 경고도 실패다.
- SEO 는 `react-helmet-async` 기반 `src/components/seo.tsx`(기본 OG 이미지는 `https://www.tskool.kr/logo.png`). JSON-LD: BreadcrumbList·BlogPosting·CollegeOrUniversity·FAQPage.
- 선택 점검: `node scripts/check-prerender.mjs`(playwright 필요) — sitemap 전 URL 의 hydration 오류·head 태그 개수 확인.

## 외부 링크 의존

`src/components/layout.tsx` 의 푸터가 Hub 자산·페이지를 직접 참조한다 — `https://www.tskool.kr/logo.png`, `/explain/service`(이용약관), `/explain/refund`(환불규정), `/explain/privacy`(개인정보처리방침), `/icons/youtube.png`, `/icons/naver-cafe.png`.
Hub 쪽 경로가 바뀌면 여기가 깨진다.
