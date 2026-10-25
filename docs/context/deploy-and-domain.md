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

- `"target": "igc"`, `public: "dist"`
- SPA rewrite: `**` → `/index.html`
- 캐시 헤더: `**/index.html` → `no-cache, no-store, must-revalidate` / 이미지·`js`·`css` → `max-age=31536000, immutable`

배포:

```bash
npm run deploy:firebase   # npm run build && firebase deploy --only hosting:igc
```

**`firebase deploy --only hosting` (target 생략) 금지.** 2026-05-16 에 생기북 빌드가 target 없이 배포되어 Hub 의 `ts-front-479305` site 를 덮어썼고, `www.tskool.kr` 이 생기북 앱을 서빙했다. Firebase site ↔ 앱은 1:1 고정이다.

`firebase.json` 에 다른 앱 hosting 블록을 추가하지 말 것. `.firebaserc` targets 도 자기 site 하나만 유지한다.

## 도메인 tigc.kr

커스텀 도메인이 `igc-front` site 에 붙어 있다. Firebase Hosting 은 `firebase.json` 에서 커스텀 도메인과 기본 도메인을 구분할 수 없어, **클라이언트에서 리다이렉트를 처리한다.**

`IGC-Frontend/index.html` `<body>` 최상단 인라인 스크립트:

```js
var legacyHosts = ["igc-front.web.app", "igc-front.firebaseapp.com"];
if (legacyHosts.indexOf(location.hostname) !== -1) {
  location.replace("https://tigc.kr" + location.pathname + location.search + location.hash);
}
```

**이 스크립트를 지우지 말 것.** 지우면 같은 사이트가 두 도메인에서 동시에 서빙되어 SEO 중복이 생긴다.

`SITE_URL`(기본 `https://tigc.kr`)은 `scripts/generate-sitemap.mjs` 가 sitemap/canonical 에 쓴다.

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
