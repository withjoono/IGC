# IGC Frontend (`igc-front`)

인천글로벌캠퍼스(IGC) 입시 정보·컨설팅 사이트. T스쿨 위성앱 컨벤션을 따른다.

- **스택**: Vite 5 + React 18 + TanStack Router(파일기반) + Tailwind 3 + lucide-react
- **dev 포트**: `3024` (Hub 3000 / Susi 3001 … IGC 3024)
- **URL 컨벤션**: 루트 `/` → `/promo` 리다이렉트, 모든 페이지는 `/promo/*` 하위
- **SEO**: 빌드 타임 프리렌더(React 서버 렌더링, Chromium 불필요)로 라우트마다 완성 HTML 생성 + react-helmet-async 페이지별 title·description·canonical·OG·JSON-LD + sitemap 자동 생성 (아래 참조).

## 실행

### 공통 헤더 의존성

`@tskool/satellite-header`는 `../../Music_College/packages/satellite-header`를
`file:` 의존성으로 연결합니다. 소스와 스타일의 원본은 이 로컬 패키지에 있습니다.
새 환경이나 CI에서도 `Music_College` 저장소를 IGC와 같은 상위 폴더에 체크아웃한 뒤
`npm ci`를 실행해야 합니다.

앱별 메뉴·링크는 `src/data/header.ts`, TanStack Router 연결은
`src/components/header.tsx`에서 관리합니다. 기존 콘텐츠 목적지는 하단 가로 스크롤
메뉴에 유지합니다. Vite의 React 중복 제거와 TypeScript의 React 타입 경로 설정은
공통 패키지의 React 19 개발 환경과 이 앱의 React 18이 충돌하지 않도록 합니다.
개인 인증·잔액·알림 조회는 아직 없으며, 계정 도구는 Hub의 실제 페이지로 연결합니다.

```bash
npm install
npm run dev        # http://localhost:3024 (→ /promo)
npm run build      # vite build → SSR 빌드 → tsc -b → 프리렌더 + sitemap → dist/
npm run preview
```

### 빌드 타임 프리렌더 — 검색엔진에 완성 HTML 제공

`npm run build` 가 항상 수행한다(별도 명령 없음).

1. `vite build` — 클라이언트 번들 → `dist/`
2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` — 서버 렌더용 엔트리
3. `tsc -b` — 타입 게이트
4. `node scripts/prerender.mjs`
   - `src/entry-server.tsx` 의 `PRERENDER_ROUTES` 각 경로를 렌더해 `dist/<경로>/index.html` 생성
   - `index.html` 브랜드 블록(Hub 자동 생성)의 사이트 공통 canonical·description·OG(홈 값)는 **출력물에서만** 지우고 페이지별 `<Seo>` 값으로 교체 — 원본 블록은 건드리지 않는다
   - `dist/index.html`(= `/` 와 SPA fallback)은 랜딩(`/promo`) 본문 + canonical `https://tigc.kr/`
   - 같은 목록으로 `dist/sitemap.xml`·`public/sitemap.xml` 생성 (블로그 글은 `date`/`updated` 가 lastmod)
   - 페이지에 `<Seo>` 가 없거나 렌더가 200이 아니면 빌드 실패

**라우트를 추가하면 `PRERENDER_ROUTES` 에 넣는다.** 대학(`UNIVERSITIES`)·블로그(`BLOG_POSTS`)는 데이터에서 자동으로 포함된다.

클라이언트(`src/main.tsx`)는 `#root[data-ssr-path]` 가 현재 경로와 같을 때만 hydrate 한다. "지금" 시각에 따라 바뀌는 값(D-day·연도)은 `src/lib/now.ts` 의 `useNow()` 로 그려야 hydration 불일치가 나지 않는다 — 렌더 중에 `Date.now()` 를 직접 쓰지 말 것.

`firebase.json` 의 `trailingSlash: false` 로 `/promo/x/` 는 `/promo/x` 로 301, `/promo/x` 는 `dist/promo/x/index.html` 을 준다(canonical 과 일치).

검색엔진 소유 확인 메타가 필요하면 배포 시 환경변수로 넣는다: `GOOGLE_SITE_VERIFICATION=... NAVER_SITE_VERIFICATION=... npm run deploy:firebase`

> `src/routeTree.gen.ts`는 TanStack Router Vite 플러그인이 dev/build 시 자동 생성한다(gitignore 처리됨). 최초 `npm run dev` 또는 `npm run build` 한 번이면 만들어진다.

## 라우트 구조 (`src/routes/`)

```
__root.tsx                     헤더/푸터/스크롤탑 레이아웃
index.tsx                      / → /promo 리다이렉트
promo/index.tsx                랜딩(히어로·대학요약·임박마감·블로그)
promo/universities/index.tsx   4개 대학 비교표
promo/universities/$uniId.tsx  대학 상세(요강+학과+마감)
promo/deadlines.tsx            2027 마감 캘린더(필터·D-day)
promo/diagnosis.tsx            합격 가능성 자가진단(인터랙티브)
promo/english.tsx              어학 우회로 총정리
promo/apps.tsx                 T스쿨 앱 연결
promo/blog/index.tsx           블로그 목록
promo/blog/$slug.tsx           블로그 글
promo/consult.tsx              무료 상담 신청(전환 종착, /api-nest/igc/consult)
```

## 데이터

`src/data/igc.ts` — `IGC2027.xlsx`(요강/과별정원/2027마감일)에서 옮긴 정적 데이터.
운영 시 Hub 백엔드(`/api-nest`)나 CMS로 교체 가능. **유타 2027 마감일은 대학 미발표로 예상치**(확정 시 갱신).

## 배포 (Firebase Hosting) — ⚠️ 사이트 소유권 가드레일 준수

Hub CLAUDE.md의 1:1 매핑 규칙에 따라 **IGC 전용 site만** 사용한다.

1. Firebase 콘솔(`ts-front-479305`)에서 hosting site **`igc-front`** 생성
2. `.firebaserc`에 target `igc` → `igc-front`만 매핑(다른 앱 site 금지)
3. 배포는 **반드시 target 지정**: `firebase deploy --only hosting:igc`
   - `--only hosting`(target 없이) 단독 실행 금지 — 타 앱 site 덮어쓰기 사고 방지

## 백엔드 연동

상담 신청은 `POST /api-nest/igc/consult`. dev에서는 vite proxy가 `:4000`(Hub 백엔드)로 전달.
SSO가 필요해지면 Hub의 `@shared/sso-client` 패턴을 도입한다(현재 공개 정보·상담만이라 미적용).

## 디자인 통일(선택)

완전한 T스쿨 비주얼 통일이 필요하면 `geobuk-shared/tailwind-preset`와 `geobuk-shared/ui`(Header/Footer)를
의존성에 추가해 교체할 수 있다. 현재는 독립 실행을 위해 자체 Tailwind 토큰을 사용.
