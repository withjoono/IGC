# IGC Frontend (`igc-front`)

인천글로벌캠퍼스(IGC) 입시 정보·컨설팅 사이트. T스쿨 위성앱 컨벤션을 따른다.

- **스택**: Vite 5 + React 18 + TanStack Router(파일기반) + Tailwind 3 + lucide-react
- **dev 포트**: `3024` (Hub 3000 / Susi 3001 … IGC 3024)
- **URL 컨벤션**: 루트 `/` → `/promo` 리다이렉트, 모든 페이지는 `/promo/*` 하위
- **SEO**: react-helmet-async(페이지별 메타/OG) + 빌드 시 sitemap/robots 생성. 정적 프리렌더는 선택(아래 참조).

## 실행

```bash
npm install
npm run dev        # http://localhost:3024 (→ /promo)
npm run build      # sitemap 생성 + tsc -b + vite build → dist/
npm run preview
npm run gen:sitemap
```

### 정적 프리렌더(선택) — 검색엔진에 완성 HTML 제공

블로그·대학 페이지의 SEO를 강화하려면 빌드 후 프리렌더를 적용한다. `react-snap`은 puppeteer(Chromium)를 받으므로 기본 의존성에서 분리했다.

```bash
PUPPETEER_SKIP_DOWNLOAD=  npm i -D react-snap   # Chromium 포함 설치
npm run build && npm run prerender              # dist/ 의 각 라우트를 정적 HTML로
```

react-snap 설정(대상 라우트)은 `package.json`의 `reactSnap.include`에 정의돼 있다. 사내 정책상 Chromium 다운로드가 막히면, Firebase Hosting 단의 동적 렌더링(봇 대상) 또는 별도 SSG로 대체한다.

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
