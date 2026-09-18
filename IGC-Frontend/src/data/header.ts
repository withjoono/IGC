import type { HeaderGroup, HeaderNavItem, HeaderUtilitiesConfig } from "@tskool/satellite-header";

export const HEADER_GROUPS: HeaderGroup[] = [
  {
    id: "grades", label: "성적관리", title: "내신과 어학, IGC 지원의 출발점",
    description: "교과 성적과 활동을 정리하고 대학별 영어 요건을 확인하세요.",
    guide: { label: "IGC 성적관리 안내", href: "/promo/igcclass/grade" },
    tools: [
      { title: "내신·생활기록부 정리", description: "교과 성적과 전공 관련 활동을 정리해 지원 자료를 준비하세요.", app: "T 생기부", url: "https://saenggiboo.kr/promo", intro: true },
      { title: "모의고사 성적 점검", description: "국내 대입 병행을 위한 과목별 성적 추이를 확인하세요.", app: "모고모고", url: "https://mogomogo.kr/promo", intro: true },
      { title: "영어 지원 요건 확인", description: "TOEFL·IELTS와 대학별 대체 어학 경로를 살펴보세요.", app: "T IGC", url: "/promo/english" },
    ],
  },
  {
    id: "learning", label: "학습관리", title: "어학·자체시험부터 원서 마감까지",
    description: "IGC 지원 일정에 맞춰 학습 계획을 세우고 멘토와 준비 과정을 점검하세요.",
    guide: { label: "IGC 멘토링 알아보기", href: "/promo/igcclass" },
    tools: [
      { title: "마감 역산 학습 계획", description: "어학 공부와 시험 준비를 일간·주간 계획으로 나누세요.", app: "스터디플래너", url: "https://studyplanner.kr/promo", intro: true },
      { title: "IGC 준비 플래너 안내", description: "멘토링에서 학습 계획과 실행을 관리하는 방법을 확인하세요.", app: "T IGC", url: "/promo/igcclass/study" },
      { title: "겐트 지원 준비", description: "자체시험 등 겐트대학교의 전형과 준비 요건을 살펴보세요.", app: "T IGC", url: "/promo/universities/ghent" },
    ],
  },
  {
    id: "prediction", label: "입시예측", title: "내 조건에 맞는 IGC 지원 전략",
    description: "내신·어학·관심 전공으로 지원 방향을 점검하고 국내 대입 병행 전략을 준비하세요.",
    guide: { label: "1분 합격 가능성 진단", href: "/promo/diagnosis" },
    tools: [
      { title: "IGC 간이 진단", description: "내신과 어학 상황을 바탕으로 지원 전략의 방향을 확인하세요.", app: "T IGC", url: "/promo/diagnosis" },
      { title: "국내 수시 병행", description: "국내 수시 지원 도구를 살펴보고 IGC와 병행할 계획을 세우세요.", app: "T수시", url: "https://tsusi.kr/promo", intro: true },
      { title: "국내 정시 병행", description: "수능 성적을 활용하는 정시 지원 서비스의 안내를 확인하세요.", app: "T정시", url: "https://tjungsi.kr/promo", intro: true },
    ],
    note: "IGC 진단은 지원 방향을 돕는 간이 안내이며 합격을 보장하지 않습니다. 정밀 분석은 상담에서 안내합니다.",
  },
  {
    id: "information", label: "입시정보", title: "IGC 5개 대학, 한곳에서 비교",
    description: "스토니브룩·유타·조지메이슨·겐트·FIT의 전형과 학과, 지원 일정을 확인하세요.",
    guide: { label: "입시 정보 블로그", href: "/promo/blog" },
    tools: [
      { title: "5개 대학 비교", description: "대학별 학과·전형·학비·어학 요건을 비교하세요.", app: "T IGC", url: "/promo/universities" },
      { title: "2027 원서 마감일", description: "학기와 전형 단계별 지원 일정을 확인하세요.", app: "T IGC", url: "/promo/deadlines" },
      { title: "수시와 IGC 병행", description: "국내 대입과 IGC 지원을 함께 준비하는 전략을 살펴보세요.", app: "T IGC", url: "/promo/parallel" },
    ],
    note: "전형과 일정은 변경될 수 있으므로 지원 전 각 대학의 공식 모집요강을 확인하세요.",
  },
  {
    id: "users", label: "사용자별", title: "학생·학부모·멘토가 함께 준비",
    description: "각자의 역할에 맞는 IGC 입시 안내와 상담 서비스를 찾아보세요.",
    guide: { label: "무료 상담 신청", href: "/promo/consult" },
    tools: [
      { title: "학생: 지원 방향 찾기", description: "관심 전공과 성적에 맞는 준비 방향을 간단히 점검하세요.", app: "T IGC", url: "/promo/diagnosis" },
      { title: "학부모: 컨설팅 안내", description: "전형 설계부터 원서 제출까지 지원하는 서비스를 확인하세요.", app: "T IGC", url: "/promo/consulting" },
      { title: "멘토·선생님: 준비 관리", description: "플래너와 생기북으로 학생의 준비 과정을 관리하는 방법을 살펴보세요.", app: "T IGC", url: "/promo/igcclass" },
    ],
  },
];

// 기존 콘텐츠 메뉴의 모든 목적지를 공통 패키지의 가로 스크롤 메뉴로 유지합니다.
export const HEADER_NAV: HeaderNavItem[] = [
  { href: "/promo/blog", label: "블로그", match: "prefix" },
  { href: "/promo/parallel", label: "수시 병행" },
  { href: "/promo/pricing", label: "컨설팅 비용" },
  { href: "/promo/diagnosis", label: "합격진단" },
  { href: "/promo/consulting", label: "올인원 서비스" },
  { href: "/promo/igcclass", label: "IGC 멘토링" },
  { href: "/promo/consult", label: "무료 상담 신청" },
  { href: "/promo/universities", label: "대학 비교", match: "prefix" },
  { href: "/promo/deadlines", label: "2027 원서 마감일" },
  { href: "/promo/english", label: "어학 우회로·대행" },
  { href: "/promo/cases", label: "합격 사례" },
  { href: "/promo/igcclass/study", label: "스터디플래너 앱 소개" },
  { href: "/promo/igcclass/grade", label: "생기북 앱 소개" },
  { href: "tel:01025187139", label: "전화 상담 010-2518-7139" },
];

export const HEADER_UTILITIES: HeaderUtilitiesConfig = {
  productsUrl: "https://www.tskool.kr/products",
  loginUrl: "https://www.tskool.kr/auth/login",
  accountLinkageUrl: "https://www.tskool.kr/account-linkage",
  notificationMessage: "T IGC에는 개인 알림이 연결되어 있지 않습니다. 지원 일정은 ‘2027 원서 마감일’ 메뉴에서 확인해 주세요.",
  shareTitle: "T IGC 입시 정보 함께 보기",
  shareDescription: "현재 IGC 안내 페이지를 학생·학부모·선생님과 공유하세요. 계정연동은 T스쿨에서 진행합니다.",
};
