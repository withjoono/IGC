---
name: deploy-and-domain
description: T IGC 의 Firebase target·site·tigc.kr 도메인 처리·브랜드 자산 sync·레지스트리 등재 상태
type: reference
---

# 배포와 도메인

## Firebase Hosting

`IGC-Frontend/.firebaserc`

```json
{ "projects": { "default": "ts-front-479305" },
  "targets": { "ts-front-479305": { "hosting": { "igc": ["igc-front"] } } },
  "etags": {} }
```

**target 이름은 `igc`, 실제 site 는 `igc-front`** 다. 이름이 다르므로 헷갈리기 쉽다.

`IGC-Frontend/firebase.json` — hosting 블록 1개.

- `"target": "igc"`, `public: "dist"`, `trailingSlash: false`
- SPA rewrite: `**` → `/index.html` — 프리렌더된 `dist/<경로>/index.html` 이 있으면 그 파일이 먼저 서빙되고, 없는 경로만 fallback 으로 간다
- 캐시 헤더: `**/index.html` → `no-cache, no-store, must-revalidate` / 이미지·`js`·`css` → `max-age=31536000, immutable`

배포:

```bash
npm run deploy:firebase   # npm run build && firebase deploy --only hosting:igc
```

**`firebase deploy --only hosting` (target 생략) 금지.** 2026-05-16 에 생기북 빌드가 target 없이 배포되어 Hub 의 `ts-front-479305` site 를 덮어썼고, `www.tskool.kr` 이 생기북 앱을 서빙했다. Firebase site ↔ 앱은 1:1 고정이다.

`firebase.json` 에 다른 앱 hosting 블록을 추가하지 말 것. `.firebaserc` targets 도 자기 site 하나만 유지한다.

이력: 2026-07-08 최초 배포 때 `igc-front` site 가 `ts-front-479305` 에 없어서 `firebase hosting:sites:create igc-front --project ts-front-479305` 로 만든 뒤 배포했다. 이후 커스텀 도메인 tigc.kr 연결.

## 자동 배포 (GitHub Actions)

`.github/workflows/deploy-igc.yml`

- 트리거: `main` 푸시 중 `IGC-Frontend/**` 또는 워크플로 파일 자체가 바뀐 경우 + 수동 `workflow_dispatch`. 문서만 바꾼 푸시는 배포되지 않는다.
- 단계: `npm ci` → `npm run build` → **번들에 `localhost` 가 남으면 실패**(dev URL 유출 가드) → `google-github-actions/auth@v2` → `firebase deploy --only hosting:igc --project ts-front-479305`.
- 필요한 GitHub 시크릿: **`FIREBASE_SERVICE_ACCOUNT`** (`ts-front-479305` 에 Firebase Hosting 배포 권한이 있는 서비스 계정 JSON). 2026-10-25 `gh secret list -R withjoono/IGC` 실측 결과 **등록된 시크릿이 없다** → 등록 전까지 워크플로는 인증 단계에서 실패한다. 그동안은 수동 `npm run deploy:firebase`.
- 동시 배포 방지: `concurrency: deploy-igc-front` (진행 중 배포 취소).
- ⚠️ `package.json` 의 `@tskool/satellite-header` 가 `file:../../Music_College/packages/satellite-header` 다. 워크플로는 IGC 리포만 체크아웃하므로 **시크릿을 등록해도 `npm ci` 단계에서 실패한다.** Actions 배포를 쓰려면 워크플로에서 `withjoono/Music_College` 를 `../Music_College` 위치에 추가 체크아웃하거나, 패키지를 레지스트리로 배포해야 한다.

## 도메인 tigc.kr

커스텀 도메인이 `igc-front` site 에 붙어 있다. Firebase Hosting 은 `firebase.json` 에서 커스텀 도메인과 기본 도메인을 구분할 수 없어, **클라이언트에서 리다이렉트를 처리한다.**

`IGC-Frontend/index.html` `<body>` 최상단 인라인 스크립트:

```js
var legacyHosts = ["igc-front.web.app", "igc-front.firebaseapp.com", "www.tigc.kr"];
if (legacyHosts.indexOf(location.hostname) !== -1) {
  location.replace("https://tigc.kr" + location.pathname + location.search + location.hash);
}
```

**이 스크립트를 지우지 말 것.** 지우면 같은 사이트가 두 도메인에서 동시에 서빙되어 SEO 중복이 생긴다.

`SITE_URL`(기본 `https://tigc.kr`)은 `scripts/prerender.mjs` 가 sitemap 에 쓴다(페이지 canonical 은 `src/lib/utils` 의 `SITE_URL`). 검색엔진 소유 확인 메타는 배포 시 환경변수로 주입한다: `GOOGLE_SITE_VERIFICATION=… NAVER_SITE_VERIFICATION=… npm run deploy:firebase` (저장소에 하드코딩하지 않음).

## 브랜드 자산

Hub `brand/` 가 단일 원본(SSOT)이다.

- `public/logo.png` · `favicon.ico` · `og-image.png` 는 Hub `brand/sync_brand.py` 가 배포한 사본. **여기서 직접 교체 금지.**
- `index.html` 의 `<!-- T Skool brand ... -->` ~ `<!-- /T Skool brand -->` 블록은 자동 생성. **블록 안 직접 수정 금지** — 다음 sync 에 덮인다.
- 표시명·부제·도메인은 Hub `brand/apps.json` 의 `tigc` 항목에서 고친 뒤 `python brand/sync_brand.py` 를 돌린다.
- 마커 블록 **바깥**의 `description` / `og:description` 은 이 리포가 직접 관리한다. `apps.json` 의 `tigc` 항목에는 `description` 키가 없어 sync 가 설명 메타태그를 건드리지 않는다.
- 배포 후 카카오/페이스북 OG 캐시를 초기화한다.

## 레지스트리 등재 상태 (2026-09-03 실측)

| 원본 | T IGC 등재 여부 |
|---|---|
| Hub `brand/apps.json` | **등재됨.** `key: "tigc"`, `name: "T IGC"`, `kind: "vite"`, `site: "https://tigc.kr"`, `root: "E:/Dev/github/IGC/IGC-Frontend"` — 브랜드 sync 대상에 포함돼 있다. |
| Hub `CLAUDE.md` | **등재됨.** 24번 행 — `IGC/IGC-Frontend` · `withjoono/IGC` · App Engine ❌ 없음 · `igc-front` · https://tigc.kr · Hub SSO/백엔드 사용. 포트 목록에도 `T IGC 3024` 있음. |
| Hub `docs/context/satellite-registry.md` | **불완전.** GitHub 칼럼과 Firebase site 칼럼이 둘 다 `—` 다. 실제 값은 `withjoono/IGC` 와 `igc-front`. **고쳐야 한다.** |

`git remote -v` 실측:

```
origin  https://github.com/withjoono/IGC.git (fetch)
origin  https://github.com/withjoono/IGC.git (push)
```

생기북 복제 계열이 아니다 — `Univ_Admissions_Search` · `Customized_Ipsy_Info` 와 달리 remote 오염 이력이 없다.

## App Engine

**없다.** 특화대학형(과기원·사관·메디·IGC)은 자체 백엔드 없이 Hub SSO/백엔드만 쓴다.
새 App Engine 서비스를 만들 계획이 생기면 Hub 레지스트리부터 갱신할 것.
