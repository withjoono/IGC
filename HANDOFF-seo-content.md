# 인수인계 — IGC 검색 노출 복구 + 대학별 콘텐츠 보강 (`feat/seo-prerender`)

작성 2026-10-27 · 클라우드 세션에서 작업 → 로컬 Claude Code로 이어서 작업하기 위한 문서.
작업이 끝나면 이 파일은 지우거나 `docs/context/`로 옮긴다.

## 1. 현재 상태 (한 줄 요약)

`feat/seo-prerender` 브랜치에 커밋·푸시 완료. **`main` 미머지, 배포 안 됨** — tigc.kr 은 아직 예전 버전(모든 페이지가 홈 HTML)을 서빙 중.

## 2. 왜 이 작업을 했나

2026-10-24 구글 실측: `site:tigc.kr` 결과가 **홈 1건뿐**. 대학명 검색(겐트대 입학시험, 스토니브룩 송도 입학 등)에서 전부 30위 밖.

원인:
1. 프리렌더가 빌드에 연결돼 있지 않아 23개 URL이 모두 같은 `index.html`(홈 title·description)을 받았음
2. 모든 페이지의 canonical 이 `https://tigc.kr/` → 하위 페이지가 홈의 중복으로 처리됨. JS 실행 후에도 canonical 2개
3. 대학 페이지 본문 800~1,000자, 검색자가 가장 많이 묻는 학비·수준·편입·장학금·취업을 다루지 않음

## 3. 이 브랜치에서 바뀐 것

### 빌드·SEO (커밋 4a68364)
- `npm run build` = `vite build` → `vite build --ssr src/entry-server.tsx` → `tsc -b` → `node scripts/prerender.mjs`
- React 서버 렌더링으로 라우트별 `dist/<경로>/index.html` 생성 (Chromium 불필요). 라우트 목록은 `src/entry-server.tsx` 의 `PRERENDER_ROUTES` (대학·블로그는 데이터에서 자동)
- 출력물에서만 브랜드 블록의 사이트 공통 canonical·description·OG 제거 후 페이지별 `<Seo>` 값 주입 — **`index.html` 원본 브랜드 블록은 수정하지 않음**
- 클라이언트(`src/main.tsx`): `#root[data-ssr-path]` 가 현재 경로와 같을 때만 hydrate, 시작 시 중복 head 태그 제거, `router.ssr` 설정으로 hydration 트리 정렬
- D-day·연도는 `src/lib/now.ts` 의 `useNow()` 로만 렌더 (렌더 중 `Date.now()` 직접 사용 금지 — hydration 불일치 #418)
- sitemap 은 `scripts/prerender.mjs` 가 같은 라우트 목록으로 생성 (`generate-sitemap.mjs`·`prepare-hosting.mjs`·react-snap 설정 삭제)
- `firebase.json` `trailingSlash: false`, `index.html` 레거시 호스트 리다이렉트에 `www.tigc.kr` 추가
- JSON-LD: BreadcrumbList, BlogPosting, CollegeOrUniversity, FAQPage

### 콘텐츠 (커밋 43cab92 · 8cb19c0 · 7ed489c · 5a349c2)
- `src/data/uni-guides.ts` — 5개 대학 서술형 가이드(학비·장학·순위·전형 설명·내신·학과 설명·본교 이동·진로·생활·FAQ·출처). 공식 자료 기준, 확인일 2026-10-26
- `src/routes/promo/universities/$uniId.tsx` — 14섹션 + 목차 + 한눈에 요약. 대학 페이지 본문 3,700~4,400자
- `src/data/guide-posts.ts` — 가이드 글 11편 (`BLOG_POSTS = [...BASE_POSTS, ...GUIDE_POSTS]`)
- 블로그 본문 블록 타입 `BlogBlock` (문단 / `{h2}` / `{list}` / `{table}` / `{note}`), 글별 `sources`, `uni`/`unis` 로 대학 페이지와 상호 링크
- `igc.ts` 수치 갱신: 겐트 학비 2,196만원(2027-28)·QS 150위, SBU/FIT 학기당 $11,775, 유타 US News 151위, GMU 117위, FIT CEOWORLD 1위, 유타 2027 마감일 공식값, FIT 어학(Duolingo 105·조건부 없음)·원서비 $50
- 대학 비교 페이지 소개문 + 대표 장학금 행
- 별도 검수: 수치 약 100건 출처 일치 확인, 지적 사항 반영 완료

### 검증 도구
- `IGC-Frontend/scripts/check-prerender.mjs` — sitemap 전 URL을 브라우저로 열어 hydration 오류·head 태그 개수 점검 (선택, playwright 필요). 마지막 실행 40/40 OK

## 4. 배포 절차 (로컬에서)

```bash
cd E:\Dev\github\IGC
git fetch origin
git checkout feat/seo-prerender        # 또는 main 에 머지 후
cd IGC-Frontend
npm ci                                  # ../../Music_College 체크아웃 필요 (satellite-header)
npm run build                           # "prerendered 39 pages, sitemap 38 urls" 확인
# (선택) npm i -D playwright && npx playwright install chromium && node scripts/check-prerender.mjs
npm run deploy:firebase                 # --only hosting:igc (target 생략 금지)
```

주의:
- 로컬에만 있고 GitHub 에 없는 파일(AGENTS.md, docs/context/*)이 있으면 체크아웃 시 겹치지 않는지 확인. 그 문서들의 빌드 설명(`generate-sitemap → tsc → vite build`, react-snap 선택)은 이제 틀렸으니 이 브랜치 기준으로 고칠 것
- 배포 후 확인: `curl -s https://tigc.kr/promo/universities/ghent | grep -o '<title[^<]*</title>\|data-ssr-path="[^"]*"'` → 겐트 제목과 `data-ssr-path="/promo/universities/ghent"` 가 나와야 함
- 카카오·페이스북 OG 캐시 초기화

## 5. 배포 후 할 일 (사용자 작업)

- [ ] Google Search Console — `tigc.kr` 도메인 속성 등록, `https://tigc.kr/sitemap.xml` 제출, 대학 페이지 5개 URL 검사 → 색인 요청
- [ ] 네이버 서치어드바이저 — 사이트 등록, sitemap 제출. 소유확인 메타는 `NAVER_SITE_VERIFICATION=값 npm run deploy:firebase` (구글은 `GOOGLE_SITE_VERIFICATION`)
- [ ] Firebase 콘솔 — `www.tigc.kr` → `tigc.kr` 서버 리다이렉트 지정, `http://tigc.kr` 503 확인
- [ ] 배포 1~3주 후 `site:tigc.kr`, 대학명 키워드 노출 재측정

## 6. 사용자 결정이 필요해 보류한 것

| 항목 | 필요한 것 |
|---|---|
| 수준·현실 글 3편 (IGC 수준 비교, 겐트대 현실, 스토니브룩 수준·입결) + 대학 페이지 장단점 섹션 | 상담 현장에서 보는 대학별 장단점 |
| 합격 사례 (대학 페이지 '내신·수능' 섹션) | 학생·학부모 익명 게재 동의 |
| 검정고시로 IGC 가기 글 | 대학별 국내 검정고시 지원 자격 공식 확인 |

## 7. 확인이 필요한 데이터 불일치

| 항목 | 사이트(현재) | 공식 자료 |
|---|---|---|
| 겐트 3월학기 우선지원 | 2026-11-30 (IGC2027.xlsx) | 영문 2027 입학요강에 우선 마감 없음 |
| 겐트 9월학기 최종 마감 | 2027-07-31 (IGC2027.xlsx) | 입학요강 5/31 (해외 지원자 비자 준비 기준) |
| 겐트 기숙사비 (17주) | 두 값 병기 | 입학요강 1인 119.25만/2인 100만 vs 기숙사 페이지 191.25만/127.5만 |
| 겐트 수능 영어 2등급, GMU 수능 영어 등급, SBU 어학 기준·수능지원 전형 | IGC2027.xlsx 값 | 공식 영문 페이지에서 미확인 |
| FIT 정원 105명(30+75), 학과별 경쟁률 | 시트 값 / 없음 | 공식 미확인 |
| SUNY Korea 학비표 | Fall 2026 | 페이지 제목 Fall 2026, 표 캡션 Spring/Fall 2025로 혼재 |

## 8. 기획 문서

- 콘텐츠 보강 기획(Claude Docs): https://claude.ai/artifact/9yYyX9P7BaxrWDbhX6gjMN — 진단·검색 수요·14섹션 구성·가이드 글 15편 계획·실행 순서
- 가이드 글 15편 중 작성 11편, 보류 4편(6절)

## 9. 다음 작업 후보 (우선순위)

1. 배포 + 검색엔진 등록 (4·5절)
2. 7절 불일치 확인 후 `igc.ts` 수정
3. 장단점 받으면 수준·현실 글 3편 + 대학 페이지 장단점 섹션 (`UniGuide` 에 필드 추가)
4. 캠퍼스 실제 사진으로 예시 일러스트 교체 (`src/data/photos.ts`, `이미지_가이드.md`)
5. Hub `docs/context/satellite-registry.md` IGC 행(GitHub `withjoono/IGC`, site `igc-front`) 보완
