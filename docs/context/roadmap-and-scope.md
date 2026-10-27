---
name: roadmap-and-scope
description: 스택 결정(Next.js 아님), 만들기로 한 것·안 만들기로 한 것, 진단기 v2·에세이 AI 코치의 설계 원칙과 미결정 사항 — 새 기능을 시작하기 전에
type: project
---

# 범위 경계와 로드맵

## 스택 결정 — 바꾸지 말 것

- **Next.js 로 옮기지 않는다.** 통일성·공유 패키지·Hub SSO·배포 재사용을 위해 생태계 표준(Vite + React + TanStack Router)을 유지한다.
- SEO 는 스택 교체 대신: 공개 라우트(`/promo`, `/promo/blog/*`, `/promo/universities/*`) **빌드 시 프리렌더 + react-helmet 메타/OG + sitemap.xml** 로 확보.

## 만들지 않기로 한 것

- **영어 학습 앱** — 좋은 앱이 이미 많아 별도 제작 불필요(2026-10 결정). 어학은 "최소 경로 안내 + 대행"으로만 다룬다.
- **자체 백엔드·자체 로그인** — Hub 사용(AGENTS.md 고유 규칙 2).

## 추진하기로 한 것 (2026-10)

1. **겐트 입학시험 대비반** — 선생님 온라인 강의 + 온라인 테스트. 예정 라우트 `/promo/ghent-exam`.
2. **입학 가능성 · 최소 경로 진단기 v2** — 현 `/promo/diagnosis` 를 **같은 URL 로** 교체.
3. **에세이 AI 코치** — 생기북 연동. 소개 `/promo/essay`, 앱 `/essay/*`.
- 큰 방향: 원서 대행 외에 티스쿨 기존 앱을 활용한 IGC 용 AI 앱 서비스.

## 선결 과제

**상담 신청 폼 유실 의심을 먼저 고친다** — 모든 기능이 상담 전환이 목적이기 때문. 순서: Hub 에 `POST /igc/consult` 존재 확인 → 절대 URL 또는 Hosting rewrite → 실패를 사용자에게 노출. 상세는 [frontend-only-architecture.md](frontend-only-architecture.md).

## 진단기 v2 설계 원칙

- **판정은 규칙(결정론), AI 는 해설 문장만.** 판정·점수·날짜는 결과 JSON 을 그대로 렌더하고 AI 문장은 별도 블록. 1단계는 AI 없이 템플릿 문장으로 출시.
- 규칙은 `src/data/eligibility.ts` 한 곳에 구조화(`igc.ts` 의 `english`·`englishAlt`·`ownExam` 기반). 숫자는 `IGC2027.xlsx` 와 대조.
- 결과 상태 3단계: 바로 지원 가능 / 조건부로 가능 / 준비 필요. 대학마다 가장 쉬운 영어 경로 1개(보유 성적 > 수능 영어 > Duolingo·Versant 등 > 조건부).
- 결과 공유는 **입력값을 URL 쿼리로 인코딩**(서버 저장 없음).
- 고정 면책 문구: "간이 진단이며 합격을 보장하지 않습니다. 지원 전 공식 모집요강을 확인하세요."
- 같은 URL 유지 → 라우트 추가 없음 → sitemap 변경 없음.
- 단계: 0 상담 폼 수정 → 1 순수 프론트(규칙·단계형 입력·결과·URL 공유) → 2 상담 payload 에 `diagnosis` 필드(Hub 필드 추가) → 3 AI 해설(Hub LLM 프록시, 에세이 코치와 공용).

## 에세이 AI 코치 설계 원칙

- **AI 는 대필하지 않는다.** 소재 발굴·구조 제안·루브릭 피드백까지만. 완성 문단·대체 문장 생성 금지(시스템 프롬프트에 명시, UI 에도 원칙 노출). 최종 검토는 멘토.
- 대상: 미국계 3개교(스토니브룩·유타·조지메이슨) 에세이.
- **LLM API 키는 프론트에 절대 두지 않는다** — Hub `ai-proxy` 모듈에서만 호출, 사용자별 호출 한도.
- `/essay/*` 는 로그인 필요 앱 화면 → `/promo` 밖, **sitemap·프리렌더 제외**. 인증은 Hub SSO.
- DB 는 Hub 쪽 `geobukschool_prod` 의 `igc` schema 격리(신원 게이트·DRY-RUN·`prisma db push` 금지).
- 개인정보: 학생 실명·학교명은 마스킹 후 LLM 전송, AI 요청 로그에는 본문 대신 메타데이터만. 수집·이용 동의·보관 기간·삭제 경로 명시.
- 생기북 연동은 동의한 학생만 **읽기 전용**. MVP 는 직접 입력만.
- 데이터 모델 초안: `essay_project` · `essay_draft` · `essay_feedback` · `essay_source`.

## 미결정 (사용자 확인 필요 — 임의 결정 금지)

1. 상담 폼 저장 경로(Hub 엔드포인트)와 수정 담당
2. 진단 대상 대학: 4개교 vs FIT 포함 5개교
3. 진단기 숫자 기준 최종 대조
4. 에세이 코치 과금(멘토링·컨설팅 포함 vs 단독)과 공개 범위
5. 생기북 활동 데이터 API 제공 가능 여부
6. 사용할 LLM 과 월 예산 한도
