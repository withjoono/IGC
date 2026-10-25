---
name: data-sources
description: 대학 요강·정원·마감일 데이터의 원본 위치(엑셀·igc.ts), 기획 문서 위치, GCP 리소스 이름 — 데이터를 갱신하거나 기획 근거를 찾을 때
type: reference
---

# 데이터와 문서 위치

## 대학 데이터 — 원본과 사본

| 위치 | 역할 |
|---|---|
| `IGC2027.xlsx` (루트, 추적 중) | **2027 요강 원본.** 시트 3개: 요강 / 과별정원 / 2027 원서마감일. FIT 미포함(4개교). |
| `IGC.xlsx` (루트, 추적 중) | 이전 정리본. |
| `IGC2.xlsx` | 기억상 존재하던 파일. 2026-10-25 기준 리포 루트에는 **없다.** |
| `IGC-Frontend/src/data/igc.ts` | **사이트가 실제로 쓰는 단일 원본**(`UNIVERSITIES`, `DEADLINES` 등). 엑셀에서 손으로 옮긴 정적 데이터. |
| `src/data/programs.ts`, `src/data/photos.ts` | 프로그램·사진 보조 데이터. |

규칙:
- 요강 숫자(영어 기준·정원·마감일)를 컴포넌트에 **하드코딩하지 말고** `src/data/` 에 둔다. 진단기 v2 규칙도 `src/data/eligibility.ts`(예정)에 구조화한다.
- 숫자를 넣거나 바꿀 때는 **`IGC2027.xlsx` 요강 시트 + 대학 입학처 공식 페이지**와 대조하고, 출처 링크를 주석으로 남긴다.
- **유타 2027 마감일은 대학 미발표** → 직전 사이클 기준 **예상치**다. 공식 발표되면 교체하고, 그 전까지 화면에 "예상" 표시를 유지한다.
- 엑셀 두 파일은 이미 추적 중이다. 개인정보가 없는지 확인한 상태가 아니므로 새 엑셀을 추가 커밋하지 말 것([repo-hygiene-and-pii.md](repo-hygiene-and-pii.md)).

## 기획 문서 (루트)

| 파일 | 추적 | 내용 |
|---|---|---|
| `IGC_promo_사이트_종합기획.md` | ✅ | IA(`/promo/igc/` 트리) + 블로그 전략 + 홍보글 샘플 |
| `IGC_컨설팅_사이트_기획안.md`, `IGC_컨설팅_랜딩페이지_기획안.md` | ✅ | 초기 사이트·랜딩 기획 |
| `IGC_경쟁사분석_차별화기획안.md` | 로컬만 | 경쟁사 분석 → 3대 강점 근거 |
| `IGC_프로모_3대강점_기획.md` | 로컬만 | 3대 강점 페이지 기획 |
| `컨설팅_비용_경쟁사비교.md` | 로컬만 | 가격 98/48 근거 |
| `네이버_검색광고_키워드_소재_기획.md`, `네이버_확장소재_기획.md` | 로컬만 | 검색광고 키워드·소재 |
| `무료진단_알림설정_가이드.md` | 로컬만 | 무료진단 알림 설정 |
| `promo_*.html` 6개 | 로컬만 | 프로모 원고(구현 전 시안) |
| `IGC_AI진단기_에세이코치_구현기획.md` | claude.ai 프로젝트에만 | 요약은 [roadmap-and-scope.md](roadmap-and-scope.md) |

"로컬만" 문서는 **원격(GitHub)·핸드폰 Claude Code 세션에는 없다.** 필요하면 사용자가 내용 확인 후 경로 지정 커밋한다. `.docx`/`.pptx` 는 학생 실명 문서가 섞여 있으니 절대 커밋하지 않는다.

## GCP / 생태계 리소스 이름 (비밀 아님)

- 프론트 Firebase 프로젝트 `ts-front-479305`, IGC site `igc-front`(target `igc`) — 상세는 [deploy-and-domain.md](deploy-and-domain.md)
- Hub 백엔드 GCP 프로젝트 `ts-back-nest-479305` (NestJS)
- Cloud SQL `ts-back-nest-479305:asia-northeast3:geobuk-db` → DB `geobukschool_prod` (IGC 가 붙게 되면 `igc` schema 격리, AGENTS.md 공통 규칙 1·4 적용)
- 표준 스택 원본: Hub-Frontend(`E:\Dev\github\Hub`, npm name `ts-front`) — Vite 5 + React 18 + TanStack Router + Tailwind 3 + shadcn/Radix, TanStack Query, Zustand, axios. 위성앱 목록·promoUrl 은 `Hub-Frontend/src/constants/app-showcase-data.ts`.
