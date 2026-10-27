# AGENTS.md — IGC (T IGC)

> Codex가 이 파일을 자동으로 읽는다. **여기 적힌 것은 링크가 아니라 규칙이다.**
> 세부 배경은 `docs/context/` 에 있고, 아래 색인에서 필요한 것만 열어 본다.

## 이 리포는 무엇인가

**T IGC** — 인천글로벌캠퍼스(IGC) 입시 정보·컨설팅 사이트. 운영 중이며 도메인은 **https://tigc.kr** 이다.
IGC 입주 대학(스토니브룩·유타·조지메이슨·겐트·FIT) 의 전형·학과·정원·2027 원서 마감일을 안내하고, 무료 진단 상담을 받는다.

**특화대학형 위성앱**이다 — 과기원(`Kwakiwon`)·사관학교(`Sakwan`)·메디(`T_Medi`)와 같은 계열로, **자체 백엔드도 자체 App Engine 서비스도 없다.** 필요한 백엔드는 Hub 를 쓴다.

- `IGC-Frontend/` — Vite 5 + React 18 + TanStack Router(파일기반) + Tailwind 3 + lucide-react, dev **3024**
- Firebase Hosting target `igc` → site **`igc-front`**, 커스텀 도메인 **tigc.kr**
- 리포 루트에는 프론트 외에 기획 문서·프로모 원고·엑셀 자료가 함께 들어 있다.

라우팅 컨벤션: 루트 `/` 는 `/promo` 로 리다이렉트하고 **모든 페이지가 `/promo/*` 하위**에 있다.

## 🚨 생태계 공통 규칙 (읽지 않고 작업 금지)

이 5개는 링크가 아니라 본문이다. 전 리포 공통이며, 위반 시 프로덕션 데이터가 깨진다.

### 1. DB 접속 직후 신원 게이트 — 생략 금지

**"접속 성공"은 prod에 붙었다는 증거가 전혀 아니다.** 로컬에도 `geobukschool_prod` 라는 **같은 이름의 DB**가 있고 `tsuser` 자격증명까지 통과하므로, 포트·DB명·유저·비밀번호가 **전 단계 모두 통과**하면서도 엉뚱한 DB를 보게 된다.

> 실제 사고 (2026-08-19): `cloud-sql-proxy --port 5433` 이 로컬 postgres의 5433 점유로 기동 실패했는데 `netstat` LISTENING만 보고 떴다고 오인. prod를 "환산식 0행 / susi_unit 없음"으로 보고했으나 실제 prod는 formula 1,267행·susi_unit 33,770행으로 정상 가동 중이었다. 멀쩡한 작업 메모를 거짓으로 판정할 뻔했다.

접속 직후 **무조건** 이 쿼리부터 실행한다:

```sql
SELECT current_database(), inet_server_port(), version();
--  prod  = "PostgreSQL 14.x on x86_64-pc-linux-gnu"
--  로컬  = "PostgreSQL 18.x on x86_64-windows"   ← 즉시 중단

SELECT count(*) FROM susi.susi_calculation_formula;  -- prod ≈ 1,267 (year 2027)
SELECT count(*) FROM susi.susi_unit;                 -- prod ≈ 33,770
```

행 수가 기대치와 다르면 **그건 prod가 아니다.** 스키마 존재 여부만으로 판정하지 말 것 — 로컬에도 같은 스키마가 있다.

- **5433을 프록시 포트로 쓰지 말 것.** 로컬 Windows postgres 상시 점유 대역이다. 15432·15433 등 비어 있는 포트를 쓴다.
- 프록시는 **분리 실행**하고 기동 성공을 프로세스/로그로 확인한다. `netstat` LISTENING은 근거가 안 된다(누가 듣고 있는지 알 수 없음).
- `app.yaml` 은 Secret에서 재생성되므로 그 파일의 접속 정보를 신뢰하지 말 것.
- 메모에 "prod 실측 확인"이라 적을 때는 **위 게이트 출력을 함께 붙인다.** 출력이 없으면 미확인으로 취급한다.
- 저장된 메모와 실측이 충돌하면 **메모보다 접속 대상을 먼저 의심한다.**

### 2. 척도 3컬럼 — `max_score` / `real_max_score` / `score_scale`

`susi.susi_calculation_formula` 의 세 컬럼은 서로 다른 척도다. 혼동하면 환산점수가 통째로 틀린다.

| 컬럼 | 의미 |
|---|---|
| `max_score` | **환산식 내부 만점.** 대학마다 제각각(1·10·100·125·400·720…). 시드 JSON 유래. |
| `real_max_score` | **대학별 실제 환산 만점**(유웨이 크롤값). `rescale-formulas.py` 의 `UW_MAXSCORE` 딕셔너리가 원본. |
| `score_scale` | `real_max_score / max_score`. 엔진 raw 점수를 **입결 척도로 올리는 배율**. |

적용 지점:

- **저장** — 엔진 원점수(raw) 그대로 저장한다. 척도 보정을 하지 않는다.
- **조회** — `convertedScore = raw × score_scale`. **조회 시점 적용**이므로 값을 바꿔도 `susi_user_factor_score` 재계산·캐시 무효화가 필요 없다.
- **백분율 분모** — `real_max_score` 우선, 없으면 `max_score` 폴백. 내 환산점수와 예상컷(환산 50컷/70컷)이 **둘 다 입결 척도**이므로 분모도 입결 척도여야 한다.
- 엔진이 실척도를 직접 산출하는 경우 `score_scale` 은 **반드시 1** — 이중 보정 금지.

### 3. 권위 테이블은 `susi.susi_unit`

- `susi.susi_unit` — **2027 모집단위 권위 테이블** (prod 33,770행). `conversion_factor_id` 가 이미 붙어 있다.
- `hub.susi_kyokwa_recruitment` — **비어 있는 레거시.** 개념 중복이 아니라 그냥 빈 테이블이다.

→ `susi_unit` 생성·적재·크로스워크 작업은 **전부 불필요하다.** 이 테이블을 "만들어야 한다"고 판단했다면 잘못된 DB를 보고 있는 것이다(규칙 1로 돌아갈 것).

### 4. DRY-RUN 기본, 쓰기는 `--apply` 명시

DB를 수정하는 모든 스크립트는 **인자 없이 실행하면 DRY-RUN**이어야 한다.

- 기본 동작: 변경 대상과 before/after를 출력만 하고 **커밋하지 않는다**(`conn.rollback()`).
- 실제 쓰기: `--apply` 를 **명시적으로** 붙였을 때만. `conn.autocommit = False` + 명시적 `commit()`.
- 출력에 현재 접속 대상(규칙 1의 게이트 출력)과 영향 행 수를 반드시 찍는다.
- 기존 스크립트에 이 플래그가 없다면 **먼저 추가하고 나서** 실행한다. 예외 없다.

### 5. 어디가 대조 베이스라인 50.2% — 떨어지면 즉시 롤백

환산 엔진 관련 변경은 반드시 **어디가 대조를 재실행**해서 검증한다.

- 현재 베이스라인: **일치 + 근사 50.2%** (화이트리스트 대학 기준).
- 변경 후 이 수치보다 **올라가야 정상**이다. 떨어지면 **즉시 롤백**한다.
- 나머지 절반은 엔진을 켜면 틀린 환산점수를 노출하므로 **화이트리스트 대학만** 엔진을 적용한다.
- 배율이 큰 대학(가톨릭대 10배)·하향 조정 대학(건국대)은 자동 수치만 믿지 말고 **개별 육안 확인**한다.

---

## 🔒 T IGC 고유 규칙

### 1. 리포 루트에 학생 실명 문서가 있다 — `git add .` 금지

**루트에 `.gitignore` 가 없다.** 그리고 2026-09-03 실측 기준 루트에 **추적되지 않은 파일이 22개** 있으며, 그중 상당수가 **개인 식별 정보를 담은 실제 학생 산출물**이다 — 추천서 초안, 추가 에세이, 지원 패키지, 브리핑 시트(파일명에 학생 실명 포함), 설명회 슬라이드, 프로모션 기획 문서.

- **`git add .` / `git add -A` / `git commit -a` 를 쓰지 말 것.** 그 순간 학생 개인정보가 공개 리포에 커밋된다.
- 커밋은 **항상 경로를 명시**한다: `git add IGC-Frontend/src/...`
- 정리하려면 루트에 `.gitignore` 를 만들어 `*.docx` `*.pptx` `*.xlsx` 와 개인 문서 폴더를 제외하는 것이 먼저다. 다만 `IGC.xlsx` · `IGC2027.xlsx` 는 **이미 추적 중**이므로 무시 규칙만으로는 빠지지 않는다.
- **문서 내용을 코드·이슈·로그로 옮기지 말 것.**

### 2. 자체 백엔드가 없다 — 인증도 데이터도 Hub 것

- **자체 로그인·회원가입·JWT 발급을 만들지 말 것.** 인증이 필요하면 Hub 에 위임한다(과기원·사관·메디와 동일 패턴).
- 실측: 현재 `IGC-Frontend/src` 에는 **로그인·토큰·세션 코드가 전혀 없다.** 순수 정적 프로모 사이트다.
- 백엔드 호출 지점은 딱 하나 — 상담 신청 폼 `src/routes/promo/consult.tsx` 의 `fetch("/api-nest/igc/consult", { method: "POST" })`.
- `/api-nest` 는 **dev 전용 프록시**다(`vite.config.ts` → `http://localhost:4000` 로 rewrite). **프로덕션에는 이 rewrite 가 없다.**

### 3. 상담 신청 폼은 프로덕션에서 조용히 유실된다 (확인 필요)

`consult.tsx` 는 이렇게 생겼다:

```ts
await fetch("/api-nest/igc/consult", { method: "POST", ... }).catch(() => {});
// finally
setSent(true);   // 실패해도 "접수되었습니다" 화면
```

- 프로덕션에는 `/api-nest` rewrite 가 없고 `firebase.json` 의 SPA rewrite(`**` → `/index.html`)가 걸린다 → POST 가 **HTML 을 200 으로 받는다.** 그리고 `.catch(() => {})` 가 에러도 삼킨다.
- 즉 **사용자에게는 접수 완료로 보이지만 어디에도 저장되지 않을 수 있다.**
- 손대기 전에 확인할 것: Hub 백엔드에 `POST /igc/consult` 엔드포인트가 실제로 있는지, Firebase Hosting 에 `/api-nest` rewrite 를 추가할지 절대 URL 로 바꿀지. **확인 전까지 "상담 신청이 들어오고 있다"고 가정하지 말 것.**
- 고칠 때는 **실패를 사용자에게 노출**하도록 바꾼다(`.catch(()=>{})` 로 삼키지 않기).

### 4. 배포 — target 생략 금지

```bash
npm run deploy:firebase        # = npm run build && firebase deploy --only hosting:igc
```

- **`firebase deploy --only hosting` 단독 금지.** 2026-05-16 에 생기북 빌드가 target 없이 배포되어 Hub 의 `ts-front-479305` site 를 덮어쓰고 `www.tskool.kr` 이 생기북을 서빙한 사고가 있었다.
- `.firebaserc` 의 target 이름은 **`igc`**, 실제 site 는 **`igc-front`** 다. 이름이 다르니 헷갈리지 말 것.
- `firebase.json` 에는 자기 hosting 블록 **하나만** 둔다. 캐시 헤더가 이미 설정돼 있다 — `index.html` 은 `no-cache`, 이미지·js·css 는 `immutable` 1년.
- 도메인 전환은 클라이언트에서 처리한다: `index.html` 인라인 스크립트가 `igc-front.web.app` / `igc-front.firebaseapp.com` 접속을 `https://tigc.kr` 로 `location.replace` 한다. **이 스크립트를 지우지 말 것.**

### 5. 브랜드 자산은 Hub `brand/` 가 단일 원본

- `public/logo.png` · `favicon.ico` · `og-image.png` 는 Hub `brand/sync_brand.py` 가 배포한 **사본**이다. 여기서 직접 교체하지 말 것.
- `index.html` 의 `<!-- T Skool brand ... -->` ~ `<!-- /T Skool brand -->` 블록은 **자동 생성**이다. **블록 안을 직접 수정 금지** — 다음 sync 때 덮인다. 표시명·부제·도메인은 Hub `brand/apps.json` 의 `tigc` 항목에서 고친다.
- 마커 블록 **밖**의 `description` / `og:description` 은 이 리포가 직접 관리한다(현재 apps.json 의 `tigc` 항목에 `description` 이 없다).
- 실측 참고: `IGC-Frontend/index.html` 과 `public/sitemap.xml` 이 **커밋되지 않은 수정 상태**다. 브랜드 sync 결과가 아직 커밋 전일 수 있으니 확인 후 작업한다.

### 6. 레지스트리 등재 상태 (2026-09-03 실측)

- Hub `brand/apps.json` — **등재됨** (`key: "tigc"`, `kind: "vite"`, `site: https://tigc.kr`, root 는 Windows 경로 `E:/Dev/github/IGC/IGC-Frontend`). 즉 브랜드 sync 대상에 **포함돼 있다.**
- Hub `CLAUDE.md` — **등재됨** (24번 행: `IGC/IGC-Frontend` · `withjoono/IGC` · App Engine 없음 · `igc-front` · https://tigc.kr · Hub SSO/백엔드 사용). 포트 목록에도 `T IGC 3024` 가 있다.
- Hub `docs/context/satellite-registry.md` — **아직 불완전하다.** GitHub 칼럼과 Firebase site 칼럼이 둘 다 `—` 로 비어 있다. 실제로는 `withjoono/IGC` / `igc-front` 다. **이 표를 고치는 것이 남은 일이다.**
- `git remote -v` 실측: `origin https://github.com/withjoono/IGC.git` — **생기북 복제 계열이 아니다.** `Univ_Admissions_Search` · `Customized_Ipsy_Info` 와 달리 remote 오염 이력이 없다.

### 7. 개발 포트 3024 — 변경 금지

포트는 생태계 전역 레지스트리다. T IGC 는 **3024** 고정(`vite.config.ts` 의 `strictPort: true`). 특화대학형 대역: 과기원 3021 · 사관학교 3022 · Medi 3023 · **T IGC 3024**. 백엔드 포트는 없다.

### 8. 콘텐츠는 정적 소스 — 빌드 전 sitemap 생성이 필수

- 대학·학과·정원 데이터는 `src/data/igc.ts`(그 외 `photos.ts` · `programs.ts`)에 **정적으로** 들어 있다. 코드 주석대로 나중에 Hub 백엔드/CMS 로 교체할 수 있게 분리해 둔 것이다.
- `npm run build` 는 `node scripts/generate-sitemap.mjs && tsc -b && vite build` 순이다. **라우트를 추가하면 `scripts/generate-sitemap.mjs` 의 목록에도 넣어야** sitemap 에 반영된다.
- `tsc -b` 가 빌드 게이트다 — **타입 에러로 빌드가 깨진다.**
- `src/routeTree.gen.ts` 와 `.tanstack` 은 자동 생성물이며 `.gitignore` 대상이다. 손으로 고치지 말 것.
- 프리렌더(`npm run prerender`, react-snap)는 **선택**이며 대상 라우트는 `package.json` 의 `reactSnap.include` 에 있다. puppeteer/Chromium 을 받으므로 기본 의존성에서 분리돼 있다.

### 9. DB 를 직접 붙일 일이 생기면

이 앱은 지금 DB 에 붙지 않는다. 그래도 붙게 된다면 Cloud SQL `geobukschool_prod` 를 **schema 격리로 공유**하는 구조이며, 위 공통 규칙 1(신원 게이트)·4(DRY-RUN 기본)가 그대로 적용된다. **`prisma db push` 는 금지** — 2026-07 에 공용 hub 스키마를 wipe 시킨 사고가 3회 있었다.

---

## 📇 파일 색인 — `docs/context/`

| 파일 | 언제 읽나 |
|---|---|
| `deploy-and-domain.md` | 배포·Firebase target·tigc.kr 도메인·브랜드 자산 작업 |
| `frontend-only-architecture.md` | 백엔드 연동, 상담 폼, 정적 데이터·라우트 구조를 볼 때 |
| `repo-hygiene-and-pii.md` | 커밋하기 전에 (개인정보·추적 상태) |
| `business-decisions.md` | 화면 문구·가격·상담 전화·대상 대학·서비스 명칭을 고칠 때 |
| `data-sources.md` | 요강·정원·마감일 데이터 갱신, 기획 문서·GCP 리소스 위치 |
| `roadmap-and-scope.md` | 새 기능 시작 전 (스택 결정, 만들기로 한 것/안 한 것, 미결정) |

---

## 명령어

```bash
cd IGC-Frontend

npm install
npm run dev            # http://localhost:3024 → /promo
npm run build          # sitemap 생성 + tsc -b + vite build → dist/
npm run preview        # :3024
npm run lint           # eslint --max-warnings 0
npm run gen:sitemap
npm run prerender      # 선택. react-snap 별도 설치 필요

npm run deploy:firebase   # build + firebase deploy --only hosting:igc
```

**금지:** `firebase deploy --only hosting` (target 생략) · `git add .` (루트 개인정보 문서) · `index.html` 의 브랜드 마커 블록 직접 수정 · `src/routeTree.gen.ts` 수동 편집.
