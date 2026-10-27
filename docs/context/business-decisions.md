---
name: business-decisions
description: T IGC 의 사업 목적·타깃·대상 대학 범위·3대 강점·가격·상담 전화·서비스 명칭 — 화면 문구나 가격을 고칠 때
type: project
---

# 사업 결정 (코드에 반영돼 있는 것)

> 출처: claude.ai 프로젝트 기억·기획 문서(2026-07 ~ 2026-10). 코드와 다르면 **코드를 실측하고 사용자에게 확인**한다.

## 목적과 타깃

- 두 목적: ① IGC 입주 대학 **입시 정보 허브**(검색 유입) ② **무료 상담 신청 전환**.
- 타깃: 학부모 · 고등학생 본인 · 내신 중하위권(4~6등급).
- 모든 기능(진단기·에세이 코치·블로그)은 결국 **상담 전환**이 목적이다 → 상담 폼이 실제로 저장되는지가 선결 과제([frontend-only-architecture.md](frontend-only-architecture.md) 참고).

## 대상 대학 범위 — ⚠️ 미결

| 기준 | 대학 |
|---|---|
| 사이트(코드, 2026-07-21 커밋 `9102a8c` 이후) | **5개교** — 겐트(ghent) · 스토니브룩(sbu) · 유타(utah) · 조지메이슨(gmu) · **FIT(fit)** |
| 내부 기획·엑셀 `IGC2027.xlsx` | **4개교** — FIT 미포함 |

- 진단기 v2 등 새 기능의 대상 범위(4 vs 5)는 **사용자 결정 대기**. 임의로 FIT 를 빼거나 넣지 말 것.
- 대학별 핵심 특징(문구 작성 시 참고):
  - 겐트 — 벨기에 공립, **자체 수학·화학 입학시험이 당락**, 내신 무관
  - 스토니브룩(SBU) — 미국 공립, 봄학기 주력
  - 유타 — TOEIC 인정, test-optional
  - 조지메이슨(GMU) — Versant · Patriot Plus 조건부 입학

## 3대 강점 (2026-07 확정, 랜딩 카드·하위 페이지의 축)

1. **올인원 완전 대행** — 학생은 수능 공부만. 전형 선택·어학 최소경로·생기부·에세이·원서·마감 전부 대행. 어학은 6경로(수능영어 · Versant · Duolingo · TOEIC · SAT · ACT · 조건부입학). → `/promo/english`
2. **학습·성적 관리 병행 = IGC 멘토링** — 멘토가 스터디플래너(studyplanner.kr)로 IGC 준비, 생기북 앱(ms-front.web.app)으로 교과·생기부 관리. → `/promo/igcclass`
3. **국내 수시 병행** — IGC 는 수시 6회 제한 밖 "7번째 카드" → 보험 확보 후 수시는 소신 지원. 연계 tsusi.kr. → `/promo/parallel`

## 명칭

- 舊 **"IGC반" → "IGC 멘토링"** 으로 개명(2026-07-08 커밋 `82b8078`). 화면 문구는 "IGC 멘토링"만 쓴다.
- 단, **라우트는 `/promo/igcclass` 그대로 유지**(SEO·외부 링크 보존). 라우트명을 바꾸지 말 것.
- 브랜드 표시명은 **T IGC**, 도메인 tigc.kr.

## 가격 — 투명 공개가 차별점

| 상품 | 가격 |
|---|---|
| 컨설팅(원서 사이클 1회) | **첫 대학 98만원 / 추가 대학당 48만원** |
| IGC 멘토링 | **4주 기준 58만원** (컨설팅과 별도) |

- 경쟁사는 가격 비공개 → **가격을 숨기거나 "문의" 로 바꾸지 말 것**(사용자 결정 없이).
- 전용 라우트 `/promo/pricing`.
- ⚠️ 가격이 **여러 파일에 하드코딩**돼 있다. 바꿀 때는 전부 찾아 고친다:
  ```bash
  grep -rn -E "98|48|58만" IGC-Frontend/src --include=*.tsx --include=*.ts
  ```
  현재 위치: `routes/promo/pricing.tsx`(상수 `BASE = 98` + 본문·메타), `routes/promo/consulting.tsx`, `routes/promo/igcclass/index.tsx`, `routes/promo/index.tsx`.

## 상담 전화

- 공개 상담 번호(사이트 노출용): `010-2518-7139`.
- 단일 상수 `CONSULT_PHONE` / `CONSULT_TEL` — `src/components/layout.tsx`. 헤더·푸터·ConsultCTA·전역 FloatingCall 이 이 상수를 쓴다.
- ⚠️ 상수를 안 쓰는 하드코딩이 남아 있다: `src/data/header.ts`(`tel:01025187139`), `src/routes/promo/index.tsx`(히어로). 번호를 바꾸면 여기도 같이 고친다.

## 연계 앱 링크 (외부)

`src/data/igc.ts` · `src/data/header.ts` 에 하드코딩: 스터디플래너 `https://studyplanner.kr/promo`, 생기북 `https://ms-front.web.app/promo`, T수시 `https://tsusi.kr/promo`. 도메인이 바뀌면 여기를 고친다.
