// IGC 입시 데이터 — 출처: IGC2027.xlsx (요강 / 과별 정원 / 2027 원서마감일)
// 운영 시 Hub 백엔드(/api-nest) 또는 CMS로 교체 가능. 현재는 정적 소스(프리렌더 친화).
import { GUIDE_POSTS } from "./guide-posts";

export type UniId = "ghent" | "sbu" | "utah" | "gmu" | "fit";

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
    reviewStyle: "종합 평가 — 성적 하나가 아니라 성적·에세이·추천서를 함께 봄",
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
    reviewStyle: "종합 평가 — 고교 성적과 과목 난이도를 함께 봄",
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
    reviewStyle: "종합 평가(학생 전체를 봄) / 온라인 지원 후 수험번호(G-Number) 발급",
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
  {
    id: "fit",
    name: "한국뉴욕주립대학교 FIT",
    shortName: "FIT(뉴욕주립)",
    country: "미국",
    type: "공립 · 패션 특성화",
    rank: "세계 패션대학 4위권",
    campus: "2년 한국(준학사) + 2년 뉴욕/밀라노(학사)",
    tuition: "미공개 — 공식 확인 (스토니브룩과 동일 학교법인)",
    quota: "105명 (패션디자인 30 + 패션경영 75)",
    terms: "9월 (가을학기만)",
    tracks: "종합 평가 (미국식 입학사정관제)",
    reviewStyle: "제출 서류 전체를 종합 심사 — 성적·자기소개서·포트폴리오를 함께 봄",
    english: "TOEFL iBT 80 / IELTS 6.5 / Duolingo 110 (SUNY Korea 공통 기준)",
    englishAlt: "세부 기준·조건부 여부는 공식 입학처 확인 — 스토니브룩과 동일 학교법인(한국뉴욕주립대)",
    ownExam: "-",
    requiredDocs:
      "[영문]성적표, [영문]졸업증명서, [영문]자기소개서, 공인영어성적 / (패션디자인) +포트폴리오(에세이 1 · 디자인 프로젝트 2 · 재봉 프로젝트 1)",
    optionalDocs: "대내외활동·수상, SAT/ACT/AP/IB",
    fee: "$65",
    notes: "9월 입학만 가능 / 한국 2년(AAS 준학사) 후 FIT 뉴욕·밀라노로 편입해 학사 취득 / 패션디자인 지원자만 포트폴리오 필수",
    decisiveFactor: "포트폴리오·정성평가",
    gpaImpact: "2~4 (정성평가 비중 큼)",
    link: "https://www.sunykorea.ac.kr",
    majors: [
      { college: "패션", name: "패션디자인학과", degree: "AAS(준학사)", quota: "30", note: "Fashion Design · 포트폴리오 필수" },
      { college: "패션", name: "패션경영학과", degree: "AAS(준학사)", quota: "75", note: "Fashion Business Management" },
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
  { uni: "fit", uniName: "FIT(뉴욕주립)", term: "2027 가을학기", stage: "1차 우선지원 마감", date: "2027-03-15", estimated: true },
  { uni: "fit", uniName: "FIT(뉴욕주립)", term: "2027 가을학기", stage: "최종 지원마감", date: "2027-06-30", estimated: true },
];

export type BlogBlock =
  | string
  | { h2: string }
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string };

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  keyword: string;
  /** 대학별 가이드 글이면 해당 대학 — 대학 상세 페이지에서 내부 링크 */
  uni?: UniId;
  /** 여러 대학을 함께 다루는 글 — 해당 대학 상세 페이지 가이드 목록에 노출 */
  unis?: UniId[];
  date: string;
  /** 내용 갱신일 (sitemap lastmod·dateModified) */
  updated?: string;
  cover?: string; // 대표 이미지 (public/images/ 경로)
  /** 문자열 = 문단. 소제목·목록·표·참고 박스는 객체 블록 */
  body: BlogBlock[];
  /** 글 끝 출처 목록 */
  sources?: { label: string; url: string }[];
  // 본문 문단 사이에 삽입할 사진: afterParagraph = 몇 번째 문단(0-based) 뒤에 넣을지
  figures?: { afterParagraph: number; src: string; caption?: string }[];
}

const BASE_POSTS: BlogPost[] = [
  {
    slug: "naesin-5-igc",
    title: "내신 5등급인데 IGC 갈 수 있나요? — 솔직하게 답해드립니다",
    category: "합격 전략",
    excerpt: "수능·내신으로 줄 세우지 않는 IGC. 성적 하나가 아니라 학생 전체를 보는 평가와 어학 우회로로 4·5등급도 길이 있습니다.",
    keyword: "내신 5등급 해외대학",
    date: "2026-07-01",
    cover: "/images/campus-1.svg",
    figures: [
      { afterParagraph: 1, src: "/images/campus-2.svg", caption: "인천글로벌캠퍼스 전경 (예시 이미지 — 실제 사진으로 교체)" },
    ],
    body: [
      '"내신이 5등급인데… 해외 대학은 무리겠죠?" 상담에서 가장 많이 듣는 말입니다. 결론부터 말하면, 충분히 가능합니다.',
      "인천글로벌캠퍼스(IGC)의 5개 대학은 수능·내신 등급을 합산해 줄 세우지 않습니다. 대신 학업 궤적, 전공 적합성, 어학, 활동을 함께 보는 '학생 전체를 보는 평가(홀리스틱 리뷰)'로 평가합니다.",
      "수학·과학이 강한 이과 학생이라면 겐트대는 내신과 무관하게 자체 입학시험(수학·화학)으로 당락이 갈립니다. 어학이 부담이라면 유타대는 토익 695, 조지메이슨은 수능영어 1등급이나 Versant 시험으로도 지원할 수 있고, 점수가 모자라도 조건부입학으로 길이 열립니다.",
      "물론 4·5등급이라고 자동 합격은 아닙니다. 핵심은 내 강점을 어떤 대학·전형에 어떻게 연결하느냐입니다.",
    ],
  },
  {
    slug: "igc-2027-deadlines",
    title: "2027학년도 IGC 원서, 언제까지 내야 하나요? (전 대학 마감일 총정리)",
    category: "마감·일정",
    excerpt: "우선지원은 빠를수록 유리. 5개 대학 2027 마감일을 한눈에.",
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
  {
    slug: "ghent-entrance-exam",
    uni: "ghent",
    title: "겐트대 입학시험(수학·화학) 완전정복 — 수능 이과생이면 합격할까?",
    category: "대학별 가이드",
    excerpt: "겐트대는 내신이 아니라 자체 수학·화학 시험이 당락을 가릅니다. 영어로 보는 시험, 수능 이과생이면 붙을 수 있는지 솔직하게 정리했습니다.",
    keyword: "겐트대 입학시험",
    date: "2026-07-08",
    cover: "/images/campus-1.svg",
    body: [
      "인천글로벌캠퍼스(IGC)의 겐트대학교 글로벌캠퍼스는 다른 대학과 결정적으로 다릅니다. 내신 등급을 거의 보지 않고, 대신 대학이 직접 내는 '자체 입학시험' 성적이 당락을 가릅니다. 그래서 내신이 낮아도 수학·과학이 강한 이과 학생에게는 오히려 최고의 기회가 되는 대학입니다.",
      "겐트대 입학시험은 '온라인 적성시험(Online Aptitude Test)'이라고 부릅니다. 수학과 화학 두 과목에서 총 20문항이 나오고, 시험 시간은 120분입니다. 합격선은 20점 만점에 14점 이상입니다. 오픈북에 계산기 사용도 허용됩니다.",
      "가장 많이 묻는 질문 두 가지에 답해 드리겠습니다. 첫째, 시험은 영어로 출제됩니다. 겐트 글로벌캠퍼스는 모든 수업이 영어로 진행되기 때문에, 입학시험도 영어로 봅니다. 대학은 시험 대비로 AP Calculus(미적분)와 AP Chemistry(화학) 공부를 권장합니다.",
      "둘째, 온라인으로 응시하며 여러 번 재도전할 수 있습니다. 다만 응시할 때마다 75달러의 비용이 들고, 받은 점수는 2년간 유효합니다. 시험이 부담된다면 SAT 수학 720점 또는 ACT 수학 32점으로 대체하는 방법도 있습니다.",
      "그럼 국내 수능 수학·화학을 준비한 학생이면 합격할 수 있을까요? 결론부터 말하면, 개념 자체는 충분히 커버됩니다. AP Calculus는 수능 미적분과, AP Chemistry는 화학Ⅰ·Ⅱ와 상당 부분 겹치기 때문에, 이과 수능을 탄탄히 준비한 학생이라면 실력상 합격권에 도달할 수 있습니다.",
      "다만 자동 합격은 아닙니다. 두 가지를 채워야 합니다. 하나는 영어 용어입니다. 문제가 영어로 나오기 때문에 derivative(도함수), equilibrium(평형), mole(몰) 같은 영어 수학·화학 용어에 익숙해져야 합니다. 다른 하나는 범위 차이입니다. 수능 범위와 AP 범위가 완전히 같지는 않아서, 빠진 단원을 짧게 보완할 필요가 있습니다.",
      "정리하면, 합격선이 70%(14/20)이고 오픈북·계산기 허용에 재응시까지 가능하므로 부담과 리스크는 낮은 편입니다. 수능 이과(미적분·화학)가 강한 학생이 '영어 용어 + AP 범위 갭'만 단기간에 잡으면 겐트대는 내신과 무관하게 합격을 노릴 수 있습니다.",
      "그럼 시험은 언제 볼까요? 겐트 입학시험은 정해진 시험 날짜가 없습니다. 온라인 시험이라 본인이 준비되면 아무 때나 응시합니다. METTL 시험 플랫폼(gugc.mettl.com)에서 계정을 만들고, 웹캠·여권·신용카드(응시료 약 $65~75)를 준비해 집에서 바로 봅니다. 횟수 제한도 없고(응시할 때마다 비용), 받은 점수는 2년간 유효합니다.",
      "그래서 챙겨야 할 진짜 일정은 '시험일'이 아니라 '원서 마감일'입니다. 마감 전에 14점 이상을 확보해 원서와 함께 제출하면 됩니다. 2027학년도 기준 겐트 마감은 3월(봄) 학기 우선지원 11/30·최종 2027-01-31, 9월(가을) 학기 최종 2027-07-31입니다. 우선지원이 장학금·기숙사에 유리하므로, 여름~초가을에 미리 응시해 두고 점수가 모자라면 보완해 다시 보는 방식으로 우선 마감(11/30)에 맞추는 것을 권합니다.",
      "T스쿨은 이 겐트 입학시험 대비(영어 용어 정리, AP 범위 보완, 모의 문항)부터 응시 일정 설계, 원서 접수까지 전 과정을 대행·코칭합니다. 내 수학·화학 실력으로 겐트대가 가능한지 궁금하다면 무료 진단으로 확인해 보세요.",
    ],
  },
  {
    slug: "stonybrook-spring-admission",
    uni: "sbu",
    title: "한국뉴욕주립대 스토니브룩 입시 2027 — 봄학기 지원이 유리한 이유와 에세이·추천서 준비법",
    category: "대학별 가이드",
    excerpt: "송도 스토니브룩(SBU)은 봄학기가 주력입니다. 수능지원·조건부입학 전형, 어학 기준, 2027 봄학기 마감일과 합격을 좌우하는 에세이·추천서 준비법을 정리했습니다.",
    keyword: "스토니브룩 송도 입학",
    date: "2026-10-24",
    cover: "/images/campus-2.svg",
    body: [
      "한국뉴욕주립대학교 스토니브룩(SUNY Korea, SBU)은 인천글로벌캠퍼스(송도)에 있는 미국 공립대학 스토니브룩의 한국 캠퍼스입니다. 3년은 송도에서, 1년은 미국 본교에서 공부하고 본교와 같은 학위를 받습니다. 2027학년도 모집 정원은 260명입니다.",
      "스토니브룩은 봄학기와 가을학기에 모두 신입생을 뽑지만, 실제로는 봄학기 모집이 주력입니다. 국내 고3 학생은 수능을 본 뒤 결과를 보고 바로 지원할 수 있어서, 수시 원서 6장과 별도로 '7번째 카드'처럼 쓰기 좋은 일정입니다.",
      "전형은 일반지원, 수능지원, 조건부입학 세 가지입니다. 어학 기준은 TOEFL iBT 80(각 영역 18점 이상), IELTS 6.5, Duolingo 110, SAT ERW 480, ACT English 19 중 하나입니다. 영어 점수가 없거나 모자라면 조건부입학으로 지원할 수 있고, 이 경우 공인영어성적 제출이 면제됩니다.",
      "스토니브룩은 성적 하나로 줄 세우지 않는 종합 평가 대학입니다. 필수 서류는 영문 성적표, 영문 자기소개서, 영문 추천서, 공인영어성적이고 수능성적·생활기록부·활동 자료는 선택 제출입니다. 그래서 내신 2~3등급은 안정, 4~5등급도 충분히 가능권으로 봅니다. 당락을 실제로 가르는 것은 에세이와 추천서입니다.",
      "에세이는 '왜 이 전공인가'를 내 경험으로 설명하는 글이어야 합니다. 활동 나열보다 하나의 계기와 그 뒤의 변화를 구체적으로 쓰는 편이 평가가 좋습니다. 추천서는 학생을 가까이서 본 교과 선생님께 받는 것이 좋고, 영문 번역·제출 일정까지 미리 맞춰 두어야 마감 직전에 막히지 않습니다.",
      "지망은 1·2지망을 쓸 수 있습니다. 다만 방향이 정해져 있어서, 경영 계열 1지망에서 이공 계열 2지망은 가능하지만 이공 1지망에서 경영 2지망은 불가능합니다. 컴퓨터과학(50명), 경영학(65명), 기술경영학(55명) 등 학과별 정원도 함께 보고 지망을 정하세요.",
      "2027 봄학기 일정은 1차 우선지원 2026-09-28, 2차 우선지원 2026-12-16, 최종 마감 2027-01-18입니다. 우선지원자에게 장학금이 먼저 돌아가므로, 1차를 놓쳤다면 2차 우선지원(12/16)에 맞추는 것을 권합니다. 전형료는 $65입니다.",
      "T스쿨은 전형 선택(일반·수능·조건부)부터 영문 에세이 첨삭, 추천서 일정 관리, 원서 제출까지 대행합니다. 내 내신과 영어 상황으로 어느 전형이 유리한지 무료 진단으로 확인해 보세요.",
    ],
  },
  {
    slug: "utah-asia-campus-toeic",
    uni: "utah",
    title: "유타대 아시아캠퍼스 입학 — 토익 695로 지원 가능? 어학 기준·서류·마감 정리",
    category: "대학별 가이드",
    excerpt: "유타대 아시아캠퍼스는 TOEIC 695를 어학 성적으로 인정하고 SAT/ACT는 선택(test-optional)입니다. 지원 자격, 필수 서류, 2027 예상 마감일까지 정리했습니다.",
    keyword: "유타대 아시아캠퍼스 입학",
    date: "2026-10-24",
    cover: "/images/campus-1.svg",
    body: [
      "유타대학교 아시아캠퍼스는 인천글로벌캠퍼스(송도)에 있는 미국 유타대학교의 한국 캠퍼스입니다. 3년은 송도, 1년은 미국 본교에서 공부하며 본교 학위를 받습니다. 봄·가을 두 학기에 신입생을 뽑습니다.",
      "유타대의 가장 큰 특징은 어학 문턱입니다. TOEFL 80, IELTS 6.5, Duolingo 110, SAT EBRW 510, ACT English 18과 함께 TOEIC 695를 어학 성적으로 인정합니다. TOEFL보다 준비 부담이 적은 TOEIC으로 지원할 수 있다는 점이 IGC 대학 중 유타대만의 장점입니다.",
      "점수가 아직 없다면 다른 길도 있습니다. 대학 부설 영어과정(ELI) Level 8을 B 이상으로 이수하면 어학 성적이 면제되고, 1년 영어집중과정과 연계해 입학하는 방법도 있습니다.",
      "SAT·ACT는 선택 제출(test-optional)입니다. 필수 서류는 영문 졸업증명서, 영문 성적증명서(9~12학년), 공인영어성적 세 가지로 간단한 편이고, 영문 자기소개서는 선택입니다. 전자성적표도 인정됩니다. 단, 미인가 고교·홈스쿨·미국 GED 출신은 SAT/ACT가 필수입니다.",
      "주의할 점은 지원 자격입니다. 국내 검정고시 출신은 지원할 수 없고, 검정고시는 미국 GED만 허용됩니다. 검정고시생이라면 다른 IGC 대학을 함께 검토해야 합니다.",
      "평가는 고교 성적과 함께 들은 과목의 난이도를 같이 보는 종합 평가입니다. 등급 숫자보다 성적이 올라가는 흐름과 지원 전공과 연결되는 과목 이수가 중요해서, 내신 2~4등급 학생이 주로 지원합니다. 학과는 커뮤니케이션, 심리학, 영화·미디어아트, 전기·컴퓨터공학, 게임, 정보시스템, 도시생태 등이 있습니다.",
      "2027학년도 마감일은 대학이 아직 발표하지 않았습니다. 직전 사이클 기준 예상으로는 봄학기 1차 11/1, 2차 12/15, 최종 2027-01-15이고, 가을학기는 1차 4/1, 2차 6/1, 최종 7/15입니다. 공식 발표 전까지는 예상치이니 원서는 예상 1차 마감에 맞춰 준비하는 것이 안전합니다. 전형료는 $65입니다.",
      "T스쿨은 TOEIC·Duolingo 중 가장 빠른 어학 경로 설계부터 서류 번역, 원서 접수까지 대행합니다. 유타대가 내 상황에 맞는지 무료 진단으로 먼저 확인해 보세요.",
    ],
  },
  {
    slug: "george-mason-korea-versant",
    uni: "gmu",
    title: "한국조지메이슨대 입학 — 수능영어 1등급·Versant로 지원하기, Patriot Plus 조건부입학까지",
    category: "대학별 가이드",
    excerpt: "조지메이슨(GMU) 송도 캠퍼스는 수능영어 1등급이나 본교 Versant 시험으로도 지원할 수 있고, 점수가 모자라면 Patriot Plus 조건부입학이 있습니다. 2027 마감일과 함께 정리했습니다.",
    keyword: "조지메이슨대 송도 입학",
    date: "2026-10-24",
    cover: "/images/campus-2.svg",
    body: [
      "한국조지메이슨대학교(Mason Korea)는 인천글로벌캠퍼스(송도)에 있는 미국 조지메이슨대학교의 한국 캠퍼스입니다. 3년은 송도, 1년은 미국 본교에서 공부하며 본교 학위를 받습니다. 봄·가을 학기에 모집합니다.",
      "조지메이슨은 어학 경로가 가장 다양한 대학입니다. TOEFL 80, IELTS 6.5, Duolingo 110, SAT ERW 500, ACT English 20 외에 수능영어 1등급, 그리고 대학이 직접 보는 Versant 시험 57점으로도 지원할 수 있습니다. TOEFL을 따로 준비하지 않아도 수능 영어나 Versant로 바로 지원이 가능합니다.",
      "어학이 조금 모자라면 Patriot Plus 조건부입학이 있습니다. TOEFL 69(각 영역 15점 이상), IELTS 6.0(각 영역 5.5 이상), 또는 수능영어 2등급이면 지원할 수 있고, 입학 후 영어집중코스를 이수하는 조건입니다.",
      "평가는 학생 전체를 보는 종합 평가입니다. 필수 서류는 온라인 지원서, 영문 성적표, 공인영어(또는 수능영어·Versant), 영문 자기소개서, 영문 졸업증명서이고, 추천서·생활기록부·수상 자료는 선택입니다. 온라인 지원 후에는 수험번호(G-Number)가 발급됩니다. 어학과 정성평가가 당락을 가르며, 내신 2~4등급 학생이 주로 지원합니다.",
      "학과는 경영학(경영정보·마케팅·비즈니스분석 등 세부전공), 경제학, 국제학, 분쟁분석 및 해결학, 데이터과학, 컴퓨터게임디자인 등이 있습니다. 컴퓨터게임디자인학과는 추가 에세이를 내야 하니 일정에 미리 반영하세요.",
      "2027 일정은 봄학기 1차 2026-10-15, 최종 2027-02-01이고, 가을학기는 조기지원 2026-11-01, 1차 2027-04-01, 최종 2027-07-08입니다. 봄학기 1차는 지났지만 최종 마감까지 시간이 있고, 가을학기는 11/1 조기지원을 노릴 수 있습니다. 전형료는 $80입니다.",
      "T스쿨은 수능영어·Versant·Patriot Plus 중 가장 쉬운 어학 경로 선택부터 영문 자기소개서, 원서 제출까지 대행합니다. 내 영어 점수로 조지메이슨 일반전형과 조건부입학 중 어디가 맞는지 무료 진단으로 확인해 보세요.",
    ],
  },
  {
    slug: "fit-songdo-portfolio",
    uni: "fit",
    title: "송도 FIT(뉴욕주립 패션공대) 입학 — 패션디자인 포트폴리오와 9월 입학 준비 가이드",
    category: "대학별 가이드",
    excerpt: "한국뉴욕주립대 FIT는 9월 가을학기에만 신입생을 뽑고, 패션디자인 지원자는 포트폴리오가 필수입니다. 학과·정원·서류·예상 마감일을 정리했습니다.",
    keyword: "FIT 송도 입학",
    date: "2026-10-24",
    cover: "/images/campus-1.svg",
    body: [
      "한국뉴욕주립대학교 FIT는 인천글로벌캠퍼스(송도)에 있는 뉴욕주립 패션공과대학(FIT)의 한국 과정입니다. 스토니브룩과 같은 학교법인(한국뉴욕주립대) 소속이며, 한국에서 2년 동안 준학사(AAS)를 마친 뒤 뉴욕이나 밀라노 FIT로 옮겨 학사를 취득하는 구조입니다.",
      "모집 학과는 패션디자인(30명)과 패션경영(75명) 두 곳으로 총 105명입니다. 다른 IGC 대학과 달리 9월 가을학기 입학만 있습니다.",
      "어학 기준은 SUNY Korea 공통 기준인 TOEFL iBT 80, IELTS 6.5, Duolingo 110입니다. 세부 기준과 조건부입학 여부는 학교법인이 같은 스토니브룩과 비슷하게 운영될 수 있지만, 지원 전에 공식 입학처 안내를 반드시 확인해야 합니다.",
      "평가는 미국식 입학사정관제로, 제출한 서류 전체를 종합 심사합니다. 공통 서류는 영문 성적표, 영문 졸업증명서, 영문 자기소개서, 공인영어성적입니다. 패션디자인 지원자는 여기에 포트폴리오가 필수이고, 에세이 1편·디자인 프로젝트 2개·재봉 프로젝트 1개로 구성됩니다. 패션경영은 포트폴리오가 필요 없습니다.",
      "포트폴리오는 몇 주 만에 만들기 어렵습니다. 디자인 프로젝트는 아이디어 스케치부터 완성까지의 과정이 드러나야 하고, 재봉 프로젝트는 직접 만든 결과물이 필요합니다. 고2~고3 초에 시작해 학기 중에 나눠 완성하는 일정을 권합니다.",
      "2027 가을학기 마감은 1차 우선지원 2027-03-15, 최종 2027-06-30으로 예상됩니다(대학 미발표, 직전 사이클 기준). 9월 입학이라 수능 이후에 준비를 시작하면 포트폴리오 일정이 빠듯하니, 수시 지원 시기부터 함께 준비하는 것이 좋습니다. 전형료는 $65입니다.",
      "T스쿨은 FIT 포트폴리오 구성 기획, 영문 자기소개서 첨삭, 원서 접수까지 대행합니다. 패션디자인과 패션경영 중 어디가 유리한지 무료 진단으로 확인해 보세요.",
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [...BASE_POSTS, ...GUIDE_POSTS];

// T스쿨 위성앱 — IGC 준비 단계 매핑 (/promo 컨벤션)
export const TSCHOOL_APPS = [
  { name: "입시검색", role: "5개 대학 요건 비교·맞춤 추천", url: "https://search-front.web.app" },
  { name: "맞춤입시전달", role: "성적·어학 맞춤 마감 알림", url: "https://infocast-front.web.app" },
  { name: "스터디플래너", role: "어학·자체시험·원서 마감 역산 플랜", url: "https://studyplanner.kr/promo" },
  { name: "생기북", role: "전공 적합성·활동·추천서 근거 정리", url: "https://ms-front.web.app/promo" },
  { name: "모고모고", role: "성적 추이 증빙·겐트 수학·화학 약점 보완", url: "https://mogomogo.kr/promo" },
  { name: "수시", role: "국내 수시 병행 지원 설계", url: "https://tsusi.kr/promo" },
  { name: "정시", role: "정시 지원 전략 + IGC 병행 설계", url: "https://tjungsi.kr/promo" },
];
