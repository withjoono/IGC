// IGC반(유료 프로그램) · 컨설팅 · 합격사례 데이터
// ⚠️ 요금은 예시(placeholder)입니다. 확정 후 실제 금액으로 교체하세요.

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  note: string;
  features: string[];
  featured?: boolean;
}

// IGC반 = 유료. 학습관리(플래너) / 성적관리(생기북·모고) / 종합
export const IGC_PLANS: Plan[] = [
  {
    id: "study",
    name: "학습관리반",
    price: "월 99,000원",
    period: "/ 예시",
    note: "스터디플래너 기반 학습 코칭",
    features: [
      "스터디플래너 프리미엄 이용",
      "어학·자체시험·원서 마감 역산 플랜",
      "주간 학습 점검 코칭",
      "IGC 지원 로드맵 관리",
    ],
  },
  {
    id: "grade",
    name: "성적관리반",
    price: "월 129,000원",
    period: "/ 예시",
    note: "생기북 + 모고모고 기반 성적·기록 관리",
    features: [
      "생기북으로 생기부·전공적합성 관리",
      "모고모고로 모의고사 성적 추이 추적",
      "겐트 수학·화학 자체시험 대비 점검",
      "월간 성적 리포트 + 피드백",
    ],
  },
  {
    id: "all",
    name: "IGC 종합반",
    price: "월 249,000원",
    period: "/ 예시",
    note: "학습·성적관리 + 1:1 컨설팅 통합",
    features: [
      "학습관리반 + 성적관리반 전체",
      "1:1 입시 컨설팅(에세이·서류 첨삭)",
      "어학 우회·조건부입학 전략 설계",
      "원서 제출까지 전담 동행",
    ],
    featured: true,
  },
];

export interface ConsultingStep {
  step: string;
  title: string;
  desc: string;
}

export const CONSULTING_STEPS: ConsultingStep[] = [
  { step: "01", title: "무료 진단", desc: "내신·어학·전공을 바탕으로 지원 가능 대학과 전형을 진단합니다." },
  { step: "02", title: "로드맵 설계", desc: "목표 대학 기준으로 어학·서류·자체시험 준비 일정을 역산해 설계합니다." },
  { step: "03", title: "서류·에세이 첨삭", desc: "자기소개서·추천서·포트폴리오를 대학별 기준에 맞춰 다듬습니다." },
  { step: "04", title: "원서 제출 동행", desc: "우선지원 타이밍부터 제출까지 마감 관리와 함께 동행합니다." },
];

export interface Case {
  gpa: string;
  english: string;
  result: string;
  track: string;
}

export const CASES: Case[] = [
  { gpa: "내신 5.2등급", english: "TOEIC 720", result: "유타대 게임학과 합격", track: "교과 추이 + 전공 연계 강조" },
  { gpa: "내신 4.4등급", english: "수능영어 2등급", result: "조지메이슨 데이터과학과 합격", track: "Patriot Plus 조건부입학" },
  { gpa: "내신 4.9등급", english: "미제출", result: "겐트대 분자생명공학 합격", track: "자체 수학·화학 시험 집중" },
  { gpa: "내신 3.1등급", english: "TOEFL 88", result: "스토니브룩 컴퓨터과학 합격", track: "에세이·추천서 보강" },
];
