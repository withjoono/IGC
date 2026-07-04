// IGC 입시 데이터 — 출처: IGC2027.xlsx (요강 / 과별 정원 / 2027 원서마감일)
// 운영 시 Hub 백엔드(/api-nest) 또는 CMS로 교체 가능. 현재는 정적 소스(프리렌더 친화).

export type UniId = "ghent" | "sbu" | "utah" | "gmu";

export interface University {
  id: UniId;
  name: string;
  shortName: string;
  country: string;
  type: string;
  rank: string;
  campus: string;
  tuition: string;
  quota: string;
  terms: string;
  tracks: string;
  reviewStyle: string;
  english: string;
  englishAlt: string;
  ownExam: string;
  requiredDocs: string;
  optionalDocs: string;
  fee: string;
  notes: string;
  decisiveFactor: string;
  gpaImpact: string;
  link: string;
  majors: { college: string; name: string; degree: string; quota: string; note?: string }[];
}

export const UNIVERSITIES: University[] = [
  {
    id: "ghent",
    name: "겐트대학교 글로벌캠퍼스",
    shortName: "겐트대",
    country: "벨기에",
    type: "공립",
    rank: "세계 169위",
    campus: "3년 한국 + 1학기 벨기에",
    tuition: "약 2,000만원",
    quota: "225명 (3·9월 통합)",
    terms: "3월 / 9월",
    tracks: "일반전형, 학교장추천전형",
    reviewStyle: "자체 입학시험(수학·화학) + 제출 교과성적 종합평가",
    english: "TOEFL iBT 72 / IELTS 6.0 / IB 5 / SAT 영어 500 / ACT 영어 21 / 수능영어 2등급",
    englishAlt: "별도 조건부 과정 없음 — 어학보다 자체시험 통과가 핵심",
    ownExam: "온라인 수학·화학 20문항 중 14점↑(오픈북·계산기 가능) / SAT수학 720·ACT수학 32로 대체 가능",
    requiredDocs:
      "증명사진, 여권사본, [영문]졸업증명서, [영문]성적증명서, 입학시험 성적표(또는 SAT/ACT 수학), 공인영어성적 / (학교장추천) +국문 생활기록부 +본교양식 학교장추천서",
    optionalDocs: "[영문]자기소개서(에세이), 상장·활동내역서(영문 공증본만 인정)",
    fee: "-",
    notes: "1~2학년 공통과정 후 3학년 전공 선택 / 상시·조기마감 / 문과·검정고시·해외학력자는 학교장추천전형 불가",
    decisiveFactor: "자체 수학·화학 시험",
    gpaImpact: "내신 무관 (시험이 좌우)",
    link: "https://admissions.ghent.ac.kr",
    majors: [
      { college: "공학", name: "분자생명공학과", degree: "이학사", quota: "225명(3개 학과 통합)", note: "1~2학년 공통, 3학년 전공 선택" },
      { college: "공학", name: "식품공학과", degree: "이학사", quota: "(통합)" },
      { college: "공학", name: "환경공학과", degree: "이학사", quota: "(통합)" },
    ],
  },
  {
    id: "sbu",
    name: "한국뉴욕주립대학교 스토니브룩",
    shortName: "스토니브룩(SBU)",
    country: "미국",
    type: "공립",
    rank: "미국 58위",
    campus: "3년 한국 + 1년 미국",
    tuition: "$23,550",
    quota: "260명",
    terms: "봄(주력) / 가을",
    tracks: "일반지원, 수능지원, 조건부입학",
    reviewStyle: "홀리스틱 리뷰(성적 + 에세이 + 추천서 종합)",
    english: "TOEFL iBT 80(각 영역 18↑) / IELTS 6.5 / Duolingo 110 / SAT ERW 480 / ACT English 19",
    englishAlt: "조건부입학 지원자는 공인영어성적 제출 면제",
    ownExam: "-",
    requiredDocs: "[영문]성적표, [영문]자기소개서, [영문]추천서, 공인영어성적",
    optionalDocs: "수능성적, 생활기록부, 대내외활동·수상·에세이, SAT/ACT/AP/IB",
    fee: "$65",
    notes: "1·2지망 가능(경영→이공 2지망 가능 / 이공→경영 2지망 불가) / 지원자격: 고3·졸업생·검정고시·편입",
    decisiveFactor: "에세이·추천서",
    gpaImpact: "2~3 안정 / 4~5 가능",
    link: "https://www.sunykorea.ac.kr",
    majors: [
      { college: "이공", name: "컴퓨터과학과", degree: "이학사", quota: "50" },
      { college: "이공", name: "전자정보공학과", degree: "이학사", quota: "30" },
      { college: "이공", name: "응용수학통계학과", degree: "이학사", quota: "30" },
      { college: "이공", name: "기계공학과", degree: "이학사", quota: "30" },
      { college: "경영", name: "경영학과", degree: "이학사", quota: "65" },
      { college: "경영", name: "기술경영학과", degree: "이학사", quota: "55" },
    ],
  },
  {
    id: "utah",
    name: "유타대학교 아시아캠퍼스",
    shortName: "유타대",
    country: "미국",
    type: "공립",
    rank: "미국 115위",
    campus: "3년 한국 + 1년 미국",
    tuition: "$20,000",
    quota: "미공개",
    terms: "봄 / 가을",
    tracks: "신입생전형 (SAT/ACT Test-Optional)",
    reviewStyle: "홀리스틱 리뷰(고교 성적·과목 난이도 종합)",
    english: "TOEFL 80 / IELTS 6.5 / TOEIC 695 / Duolingo 110 / SAT EBRW 510 / ACT English 18",
    englishAlt: "ELI Level 8(B↑) 이수 시 면제 / 영어집중과정(1년) 연계 입학",
    ownExam: "-",
    requiredDocs: "[영문]졸업증명서, [영문]성적증명서(9~12학년), 공인영어성적",
    optionalDocs: "[영문]자기소개서, ACT/SAT (미인가고·홈스쿨·미국GED는 SAT/ACT 필수)",
    fee: "$65",
    notes: "국내 검정고시 지원 불가(미국 GED만 허용) / 전자성적표 인정 / TOEIC 인정",
    decisiveFactor: "교과 추이·전공 연계",
    gpaImpact: "2~4",
    link: "https://asiacampus.utah.edu",
    majors: [
      { college: "경영", name: "회계학과", degree: "BS", quota: "미공개" },
      { college: "인문사회", name: "커뮤니케이션학과", degree: "BA/BS", quota: "미공개", note: "학부·대학원" },
      { college: "인문사회", name: "심리학과", degree: "BS", quota: "미공개" },
      { college: "예술", name: "영화·미디어아트학과", degree: "BA", quota: "미공개" },
      { college: "이공", name: "전기·컴퓨터공학과", degree: "BS", quota: "미공개", note: "전기/컴퓨터공학 통합" },
      { college: "이공", name: "게임학과", degree: "BS", quota: "미공개" },
      { college: "이공", name: "정보시스템학과", degree: "BS", quota: "미공개" },
      { college: "환경", name: "도시생태학과", degree: "BS", quota: "미공개", note: "구 도시계획학과" },
    ],
  },
  {
    id: "gmu",
    name: "한국조지메이슨대학교",
    shortName: "조지메이슨(GMU)",
    country: "미국",
    type: "공립",
    rank: "미국 105위",
    campus: "3년 한국 + 1년 미국",
    tuition: "$20,000",
    quota: "미공개",
    terms: "봄 / 가을",
    tracks: "일반전형, 조건부입학(Patriot Plus)",
    reviewStyle: "홀리스틱 리뷰 / 온라인 지원 후 수험번호(G-Number) 발급",
    english: "TOEFL 80 / IELTS 6.5 / Duolingo 110 / SAT ERW 500 / ACT English 20 / Versant 57 / 수능영어 1등급",
    englishAlt: "Patriot Plus: TOEFL 69(각 15↑) / IELTS 6.0(각 5.5↑) / 수능영어 2등급 + 영어집중코스 이수",
    ownExam: "본교 자체 Versant Test로 영어 평가 가능",
    requiredDocs: "온라인지원서, [영문]성적표, 공인영어(또는 수능영어·Versant), [영문]자기소개서, [영문]졸업증명서",
    optionalDocs: "[영문]추천서, 생활기록부, 상장·기타서류, SAT/ACT/AP/IB",
    fee: "$80",
    notes: "컴퓨터게임디자인학과 추가 에세이 제출 / 편입 24학점 기준으로 고교서류 면제",
    decisiveFactor: "어학·정성평가",
    gpaImpact: "2~4",
    link: "https://masonkorea.gmu.edu",
    majors: [
      { college: "경영", name: "경영학과", degree: "BS", quota: "미공개", note: "경영/경영정보/마케팅/비즈니스분석/운영공급망/재무/회계" },
      { college: "인문사회", name: "경제학과", degree: "이/문학사", quota: "미공개" },
      { college: "인문사회", name: "국제학과", degree: "BA", quota: "미공개" },
      { college: "인문사회", name: "분쟁분석 및 해결학과", degree: "이/문학사", quota: "미공개" },
      { college: "이공", name: "데이터과학과", degree: "BS", quota: "미공개", note: "Computational and Data Sciences" },
      { college: "예술", name: "컴퓨터게임디자인학과", degree: "BFA", quota: "미공개", note: "추가 에세이 제출" },
    ],
  },
];

export function getUniversity(id: string): University | undefined {
  return UNIVERSITIES.find((u) => u.id === id);
}

export interface Deadline {
  uni: UniId;
  uniName: string;
  term: string;
  stage: string;
  date: string; // ISO
  note?: string;
  estimated?: boolean;
}

export const DEADLINES: Deadline[] = [
  { uni: "ghent", uniName: "겐트대", term: "2027학년도 3월학기", stage: "우선지원 마감", date: "2026-11-30", note: "우선지원자 기숙사·장학 우선" },
  { uni: "ghent", uniName: "겐트대", term: "2027학년도 3월학기", stage: "최종 지원마감", date: "2027-01-31", note: "상시·조기마감 가능" },
  { uni: "ghent", uniName: "겐트대", term: "2027학년도 9월학기", stage: "접수 개시", date: "2027-03-01", note: "우선지원 단계 없음" },
  { uni: "ghent", uniName: "겐트대", term: "2027학년도 9월학기", stage: "최종 지원마감", date: "2027-07-31", note: "상시·조기마감 가능" },
  { uni: "sbu", uniName: "스토니브룩(SBU)", term: "2027 봄학기", stage: "1차 우선지원 마감", date: "2026-09-28", note: "장학금 우선 지급" },
  { uni: "sbu", uniName: "스토니브룩(SBU)", term: "2027 봄학기", stage: "2차 우선지원 마감", date: "2026-12-16" },
  { uni: "sbu", uniName: "스토니브룩(SBU)", term: "2027 봄학기", stage: "최종 지원마감", date: "2027-01-18" },
  { uni: "gmu", uniName: "조지메이슨(GMU)", term: "2027 봄학기", stage: "1차 마감", date: "2026-10-15" },
  { uni: "gmu", uniName: "조지메이슨(GMU)", term: "2027 봄학기", stage: "최종 마감", date: "2027-02-01" },
  { uni: "gmu", uniName: "조지메이슨(GMU)", term: "2027 가을학기", stage: "조기지원 마감", date: "2026-11-01" },
  { uni: "gmu", uniName: "조지메이슨(GMU)", term: "2027 가을학기", stage: "1차 마감", date: "2027-04-01" },
  { uni: "gmu", uniName: "조지메이슨(GMU)", term: "2027 가을학기", stage: "최종 마감", date: "2027-07-08" },
  { uni: "utah", uniName: "유타대", term: "2027 봄학기", stage: "1차 우선지원 마감", date: "2026-11-01", estimated: true },
  { uni: "utah", uniName: "유타대", term: "2027 봄학기", stage: "2차 우선지원 마감", date: "2026-12-15", estimated: true },
  { uni: "utah", uniName: "유타대", term: "2027 봄학기", stage: "최종 지원마감", date: "2027-01-15", estimated: true },
  { uni: "utah", uniName: "유타대", term: "2027 가을학기", stage: "1차 우선지원 마감", date: "2027-04-01", estimated: true },
  { uni: "utah", uniName: "유타대", term: "2027 가을학기", stage: "2차 우선지원 마감", date: "2027-06-01", estimated: true },
  { uni: "utah", uniName: "유타대", term: "2027 가을학기", stage: "최종 지원마감", date: "2027-07-15", estimated: true },
];

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  keyword: string;
  date: string;
  cover?: string; // 대표 이미지 (public/images/ 경로)
  body: string[];
  // 본문 문단 사이에 삽입할 사진: afterParagraph = 몇 번째 문단(0-based) 뒤에 넣을지
  figures?: { afterParagraph: number; src: string; caption?: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "naesin-5-igc",
    title: "내신 5등급인데 IGC 갈 수 있나요? — 솔직하게 답해드립니다",
    category: "합격 전략",
    excerpt: "수능·내신으로 줄 세우지 않는 IGC. 홀리스틱 리뷰와 어학 우회로로 4·5등급도 길이 있습니다.",
    keyword: "내신 5등급 해외대학",
    date: "2026-07-01",
    cover: "/images/campus-1.svg",
    figures: [
      { afterParagraph: 1, src: "/images/campus-2.svg", caption: "인천글로벌캠퍼스 전경 (예시 이미지 — 실제 사진으로 교체)" },
    ],
    body: [
      '"내신이 5등급인데… 해외 대학은 무리겠죠?" 상담에서 가장 많이 듣는 말입니다. 결론부터 말하면, 충분히 가능합니다.',
      "인천글로벌캠퍼스(IGC)의 4개 대학은 수능·내신 등급을 합산해 줄 세우지 않습니다. 대신 학업 궤적, 전공 적합성, 어학, 활동을 함께 보는 홀리스틱 리뷰로 평가합니다.",
      "수학·과학이 강한 이과 학생이라면 겐트대는 내신과 무관하게 자체 입학시험(수학·화학)으로 당락이 갈립니다. 어학이 부담이라면 유타대는 토익 695, 조지메이슨은 수능영어 1등급이나 Versant 시험으로도 지원할 수 있고, 점수가 모자라도 조건부입학으로 길이 열립니다.",
      "물론 4·5등급이라고 자동 합격은 아닙니다. 핵심은 내 강점을 어떤 대학·전형에 어떻게 연결하느냐입니다.",
    ],
  },
  {
    slug: "igc-2027-deadlines",
    title: "2027학년도 IGC 원서, 언제까지 내야 하나요? (전 대학 마감일 총정리)",
    category: "마감·일정",
    excerpt: "우선지원은 빠를수록 유리. 4개 대학 2027 마감일을 한눈에.",
    keyword: "IGC 원서마감",
    date: "2026-07-01",
    cover: "/images/campus-2.svg",
    body: [
      "IGC 지원에서 가장 많이 놓치는 게 우선지원 마감입니다. 정원이 차면 마감일 전이라도 조기 마감되고, 우선지원자에게 장학금·기숙사 우선권이 갑니다. 즉 빨리 낼수록 유리합니다.",
      "스토니브룩 2027 봄: 1차 우선 9/28 → 2차 12/16 → 최종 2027-01-18",
      "조지메이슨 2027 봄: 1차 10/15 → 최종 2027-02-01 / 가을: 조기 11/1·1차 4/1·최종 7/8",
      "겐트대 2027 3월: 우선 11/30 → 최종 2027-01-31 / 9월: 최종 2027-07-31",
      "유타대(예상): 봄 11/1·12/15·2027-01-15 / 가을 4/1·6/1·7/15 — 대학 미발표, 직전사이클 기준 예상",
    ],
  },
];

// T스쿨 위성앱 — IGC 준비 단계 매핑 (/promo 컨벤션)
export const TSCHOOL_APPS = [
  { name: "입시검색", role: "4개 대학 요건 비교·맞춤 추천", url: "https://search.tskool.kr/promo" },
  { name: "맞춤입시전달", role: "성적·어학 맞춤 마감 알림", url: "https://infocast.tskool.kr/promo" },
  { name: "스터디플래너", role: "어학·자체시험·원서 마감 역산 플랜", url: "https://studyplanner.kr/promo" },
  { name: "생기북", role: "전공 적합성·활동·추천서 근거 정리", url: "https://ms-front.web.app/promo" },
  { name: "모고모고", role: "성적 추이 증빙·겐트 수학·화학 약점 보완", url: "https://mogomogo.kr/promo" },
  { name: "수시·정시", role: "국내 병행 + IGC 포트폴리오 병렬 설계", url: "https://susi-front.web.app/promo" },
];
