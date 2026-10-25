// 대학 상세 페이지(/promo/universities/$uniId)의 서술형 가이드 콘텐츠.
// 요강·학과·마감처럼 표로 쓰는 값은 igc.ts, 문장으로 설명하는 값은 여기에 둔다.
// 숫자(학비·장학·기숙사)는 반드시 공식 출처 URL과 기준 학년도를 함께 적는다. 확인 못 한 값은 넣지 않는다.
// 언론 보도·학교 측 발표를 옮긴 수치는 문장 안에 그 출처를 밝힌다.
import type { UniId } from "./igc";

export interface CostRow {
  item: string;
  amount: string;
  note?: string;
}

export interface UniGuide {
  /** 검색 결과·요약 카드용 한 줄 소개 */
  tagline: string;
  /** 어떤 대학인가 — 본교 소개, 송도 캠퍼스, 학업 구조 */
  intro: string[];
  /** 학비·총비용 */
  cost: { lead: string; rows: CostRow[]; notes?: string[]; asOf: string };
  /** 장학금 */
  scholarships?: { lead?: string; items: { name: string; detail: string }[] };
  /** 순위·학위 등 사실 정보 (주관적 평가는 넣지 않음) */
  standing: string[];
  /** 전형·어학을 문장으로 풀어 쓴 설명 */
  admissions: string[];
  /** 내신·수능 기준과 등급별 전략 */
  grades: string[];
  /** 학과별 설명 — igc.ts majors[].name 과 같은 키 */
  majorDetails?: Record<string, string>;
  /** 본교 이동·편입·학위 */
  homeCampus: string[];
  /** 졸업 후 진로 */
  careers?: string[];
  /** 캠퍼스 생활 */
  campusLife?: string[];
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  /** 마지막으로 공식 자료와 대조한 날짜 */
  verifiedAt: string;
}

const IGC_DORM = "https://igc.or.kr/en/campus/dorm.do";

export const UNI_GUIDES: Partial<Record<UniId, UniGuide>> = {
  ghent: {
    tagline: "벨기에 국립 겐트대학교의 송도 캠퍼스. 내신이 아니라 자체 수학·화학 시험으로 합격이 갈리고, 본교와 같은 겐트대 이학사 학위를 받습니다.",
    intro: [
      "겐트대학교 글로벌캠퍼스(GUGC)는 벨기에 국립 겐트대학교가 인천 송도에 세운 확장 캠퍼스입니다. 2014년 9월에 문을 열었고, 분교가 아니라 본교와 같은 학위를 주는 캠퍼스라고 대학이 밝히고 있습니다.",
      "학부 과정은 생명·식품·환경 분야의 공학 계열 3개 학과입니다. 1~2학년은 STEM 공통 과정을 듣고, 3학년이 될 때 분자생명공학·식품공학·환경공학 중 전공을 고릅니다.",
      "학업 기간은 4년(240 ECTS)입니다. 4학년 1학기는 벨기에 겐트 본교에서 공부하고, 2학기에는 졸업논문을 씁니다. 3월에 입학하면 예비학기가 붙어 전체 4.5년이 됩니다.",
      "캠퍼스는 인천글로벌캠퍼스(IGC) 안에 있으며 서울에서 약 30km, 인천공항에서 18km 떨어져 있습니다. 수업은 100% 영어로 진행됩니다.",
    ],
    cost: {
      lead: "2027-28학년도 연간 학비는 2,196만 원입니다. 매년 한 번 내는 기본고정비 300만 원에 학점당 31만 6천 원의 수업료(60학점 기준 1,896만 원)를 더한 금액입니다. 학비는 원화로 냅니다.",
      rows: [
        { item: "기본고정비", amount: "연 300만 원", note: "1년에 1회, 환불 불가" },
        { item: "수업료", amount: "학점당 31만 6천 원", note: "60학점 기준 연 1,896만 원" },
        { item: "연간 학비 합계 (2027-28)", amount: "2,196만 원", note: "2026-27학년도는 2,100만 원" },
        { item: "3월 입학 예비학기", amount: "774만 원", note: "기본고정비 + 15학점" },
        { item: "기숙사 1인실", amount: "119만 2,500원", note: "17주, 2027 입학요강 기준" },
        { item: "기숙사 2인실", amount: "100만 원", note: "17주, 2027 입학요강 기준" },
      ],
      notes: [
        "수업료는 50%·25%·25%로 세 번에 나눠 낼 수 있습니다. 기본고정비는 분할 대상이 아닙니다.",
        "기숙사비는 대학 기숙사 안내 페이지에 1인실 191만 2,500원·2인실 127만 5,000원(17주)으로 다르게 나와 있습니다. 입사 신청 전에 대학에 최신 금액을 확인하세요.",
      ],
      asOf: "2027 입학요강·학비 안내(2026-10 확인)",
    },
    scholarships: {
      lead: "입학 장학금은 연간 수업료에서 빼 주는 방식이고(기본고정비 제외), 여러 개에 해당해도 가장 큰 금액 하나만 받습니다.",
      items: [
        { name: "Sciences Excellence (입학)", detail: "수학·화학·생물 장학시험 성적으로 선발. 1년간 1,800만·1,350만·900만 원." },
        { name: "Dare to Think (입학)", detail: "입학평가 최상위자. 1년간 1,800만·900만 원." },
        { name: "International Student (입학)", detail: "외국 국적 최상위자. 4년간 연 900만 원, 전 과목 10/20점 이상 통과 시 유지." },
        { name: "재학생 성적우수", detail: "수업료 100%(1명)·75%(2명)·50%(3명)·20%(4명), 학년당 10명씩 2~4학년 30명 (2025-26 기준)." },
        { name: "형제자매 장학", detail: "수업료 25%." },
        { name: "UGent 학기 장학", detail: "벨기에 본교 학기에 참여하는 4학년에게 100만 원." },
      ],
    },
    standing: [
      "겐트대 본교는 QS 세계대학순위 2027에서 공동 150위(2026은 162위), THE 세계대학순위 2027에서 공동 116위입니다.",
      "졸업하면 벨기에 겐트대학교 이학사(BSc) 학위를 받습니다. 대학은 \"수여 학위는 겐트대학교 학위\"라고 밝히고 있습니다.",
      "2026년 4월 기준 재학생은 832명, 교원은 62명으로 교원 1명당 학생 13명입니다.",
    ],
    admissions: [
      "겐트대는 다른 IGC 대학과 달리 수학 실력을 직접 확인합니다. 대학 온라인 적성시험(수학·화학 20문항)에서 14점 이상을 받거나, SAT 수학 720·ACT 수학 32점으로 대신할 수 있습니다. 시험은 온라인으로 보고 정해진 날짜가 없어 준비되면 응시하면 됩니다.",
      "영어는 IELTS 6.0, IB 5, SAT 영어 500, ACT 영어 21, 수능 영어 2등급 등 가운데 하나로 충족합니다. 별도의 조건부입학 과정은 없으므로 어학보다 수학·화학 시험 통과가 핵심입니다.",
      "일반전형과 학교장추천전형이 있습니다. 문과·검정고시·해외학력 출신은 학교장추천전형으로 지원할 수 없습니다.",
    ],
    grades: [
      "내신 등급은 당락에 거의 영향을 주지 않습니다. 합격 여부는 자체 시험(또는 SAT·ACT 수학) 성적과 제출 교과성적을 함께 보는데, 실질적인 문턱은 시험입니다.",
      "그래서 내신은 4~6등급이어도 수학·화학이 강한 이과 학생이라면 충분히 노릴 수 있습니다. 반대로 내신이 좋아도 시험 14점을 넘지 못하면 합격할 수 없습니다.",
      "수능 미적분·화학을 공부한 학생은 개념이 상당 부분 겹칩니다. 영어로 출제되므로 영어 수학·화학 용어와 AP 범위 차이를 보완하는 것이 준비의 중심입니다.",
    ],
    majorDetails: {
      분자생명공학과: "생명체에 대한 지식과 공학 기술을 경영 지식과 결합해 질병 연구와 바이오 기반 생산에 응용합니다. 대학원, R&D, 품질보증, 제약·의료 분야로 진출합니다.",
      식품공학과: "식품의 화학·미생물·영양·기술적 측면과 안전·품질·보존을 다룹니다. 대학원, R&D, 식품안전·검사, 품질보증 분야로 진출합니다.",
      환경공학과: "물·대기·토양에서 일어나는 과정과 인간 활동의 영향을 연구하고, 환경 위험을 찾아 예방하는 법을 배웁니다. 대학원, R&D, 환경 관리·컨설팅 분야로 진출합니다.",
    },
    homeCampus: [
      "4학년 1학기에 벨기에 겐트 본교에서 한 학기를 공부하는 것이 필수입니다. 본교 수업도 영어로 진행됩니다.",
      "학위는 본교와 같은 겐트대학교 학위이며, 송도에서 공부한 기간과 벨기에 학기 모두 같은 교육과정 안에 있습니다.",
      "벨기에 학기에 참여하는 4학년에게는 UGent 학기 장학금(100만 원)이 지급됩니다. 본교로 완전히 옮겨 졸업하는 제도는 대학 공지에서 확인되지 않습니다.",
    ],
    careers: [
      "언론 보도에 따르면 대학이 공개한 2025년 자료에서 졸업생의 65%가 석사 과정에 진학했고 35%가 취업했으며, 취업자의 45%가 R&D 분야였습니다. 진학처로 겐트대 본교, ETH Zurich, Imperial College, UCL, 서울대, KAIST 등이 소개됐습니다(메트로신문, 2026-07).",
      "학과별로 대학원 진학과 연구개발, 품질·안전 관리 직무가 대표 진로로 제시됩니다.",
    ],
    campusLife: [
      "수업은 100% 영어입니다. 연 정원은 225명(3월·9월 통합)으로, 4개 학년을 합쳐 900명 규모의 작은 캠퍼스입니다.",
      "기숙사는 1인실과 2인실이 있고 17주(한 학기) 단위로 냅니다. 송도 IGC 안에 있어 다른 IGC 대학 학생들과 같은 생활권을 씁니다.",
    ],
    faq: [
      { q: "겐트대 글로벌캠퍼스 학비는 얼마인가요?", a: "2027-28학년도 기준 연 2,196만 원입니다(기본고정비 300만 원 + 학점당 31만 6천 원 × 60학점). 3월 입학 예비학기는 774만 원입니다." },
      { q: "겐트대는 내신을 보나요?", a: "제출 교과성적도 보지만 실제 당락은 자체 수학·화학 온라인 시험(20점 만점 14점 이상) 또는 SAT 수학 720·ACT 수학 32점이 가릅니다. 내신이 낮아도 시험을 통과하면 합격권입니다." },
      { q: "겐트대 졸업장은 본교와 같나요?", a: "네. 대학은 수여 학위가 겐트대학교 학위라고 밝히며, 졸업생은 겐트대 이학사(BSc)를 받습니다." },
      { q: "벨기에에는 언제 가나요?", a: "4학년 1학기에 겐트 본교에서 한 학기를 공부하는 것이 필수입니다. 4학년 2학기에는 졸업논문을 씁니다." },
      { q: "겐트대 세계 순위는 몇 위인가요?", a: "본교 기준 QS 세계대학순위 2027 공동 150위, THE 2027 공동 116위입니다." },
      { q: "장학금은 어떤 게 있나요?", a: "입학 장학금으로 Sciences Excellence(최대 1,800만 원), Dare to Think, International Student가 있고, 재학 중에는 성적우수(수업료 20~100%)·형제자매(25%) 장학이 있습니다." },
    ],
    sources: [
      { label: "GUGC 2027 입학요강 (Ghent University)", url: "https://www.ugent.be/globalcampus/en/gugc-admission-guide-2027" },
      { label: "GUGC 학비 안내", url: "https://www.ugent.be/globalcampus/en/study/fees.htm" },
      { label: "GUGC 학비 납부 안내", url: "https://ghent.ac.kr/~tuition_payment" },
      { label: "GUGC 기숙사 안내", url: "https://www.ghent.ac.kr/~housing" },
      { label: "GUGC 장학금 안내", url: "https://ghent.ac.kr/~scholarship" },
      { label: "GUGC 2025-26 장학금 안내 (PDF)", url: "https://www.ghent.ac.kr/data/attach/scholarship/Scholarship%20Information%20for%20AY2025-2026.pdf" },
      { label: "GUGC 학과 안내", url: "https://www.ghent.ac.kr/~programmes" },
      { label: "GUGC 소개", url: "https://ghent.ac.kr/~ghentkorea" },
      { label: "QS — Ghent University", url: "https://www.topuniversities.com/universities/ghent-university" },
      { label: "THE — Ghent University", url: "https://www.timeshighereducation.com/world-university-rankings/ghent-university" },
      { label: "메트로신문 (2026-07-20)", url: "https://www.metroseoul.co.kr/article/20260719500254" },
    ],
    verifiedAt: "2026-10-26",
  },

  sbu: {
    tagline: "뉴욕주립대 스토니브룩의 송도 캠퍼스. 송도 3년 + 뉴욕 본교 1년을 공부하고 본교와 같은 학위를 받으며, 봄학기 모집이 주력입니다.",
    intro: [
      "한국뉴욕주립대학교(SUNY Korea)는 2012년에 문을 연 한국 최초의 미국 대학 캠퍼스입니다. 스토니브룩대학교(SBU)의 학부 과정을 송도에서 운영하며, 같은 학교법인 안에 패션 특성화 FIT 과정도 있습니다.",
      "학생은 송도에서 3년, 뉴욕 스토니브룩 본교에서 1년을 공부합니다. 본교 교수진이 같은 교육과정으로 가르치고, 졸업하면 본교와 같은 학위를 받습니다.",
      "학과는 컴퓨터과학, 전자정보공학, 응용수학통계, 기계공학, 경영학, 기술경영학 6개입니다. 컴퓨터과학과 기계공학은 미국 공학교육인증(ABET)을 받았습니다.",
    ],
    cost: {
      lead: "2026 가을학기 학부 등록금은 학기당 $11,775(뉴욕주 비거주자 기준)로, 1년(2학기)이면 $23,550입니다. 기숙사는 IGC 공동 기숙사를 씁니다.",
      rows: [
        { item: "학부 등록금", amount: "학기당 $11,775", note: "뉴욕주 비거주자, 2026 가을 학비표" },
        { item: "학부 등록금 (뉴욕주 거주자)", amount: "학기당 $4,235", note: "뉴욕주 거주 자격자" },
        { item: "연간 등록금", amount: "$23,550", note: "2학기 기준" },
        { item: "IGC 기숙사 1인실", amount: "191만 2,500원", note: "17주 기준" },
        { item: "IGC 기숙사 2인실", amount: "127만 5,000원", note: "17주 기준" },
      ],
      notes: [
        "등록금에는 일부 과목별 수강료가 포함되지 않습니다.",
        "뉴욕 본교에서 공부하는 1년의 비용은 본교 기준을 따릅니다. 본교가 공개한 2026-27 추정치(일반 타주 학생, 기숙사 거주)는 등록금 $31,050를 포함해 연 $58,799입니다. SUNY Korea 학생에게 적용되는 요율은 입학처에 확인하세요.",
      ],
      asOf: "SUNY Korea 학비표 Fall 2026, IGC 기숙사 요금표(2026-10 확인)",
    },
    scholarships: {
      lead: "신입생 장학금은 원서를 낼 때 에세이와 함께 신청해야 하며, 원서 제출 뒤에는 신청할 수 없습니다. 결과는 합격 발표 1~2개월 뒤에 나옵니다.",
      items: [
        { name: "Presidential Scholarship", detail: "등록금 전액(기숙사는 심사 후 결정), 2~6학기." },
        { name: "Dean's Scholarship", detail: "학기당 $7,500, 2~6학기." },
        { name: "Merit Scholarship", detail: "$1,000~$10,000, 2학기(최대 1학기 연장)." },
        { name: "Motivation Scholarship", detail: "$1,000~$5,000, 1회." },
        { name: "유지 조건", detail: "학기·누적 GPA 3.2 이상, 12학점 이상 풀타임 등록." },
      ],
    },
    standing: [
      "스토니브룩 본교는 US News 2026 미국 대학 순위에서 59위, 공립대 26위, 뉴욕주 공립 1위입니다(본교 발표).",
      "QS 세계대학순위는 2027에서 공동 468위(2026 공동 452위)입니다.",
      "졸업생은 스토니브룩 본교와 같은 학위를 받습니다. 본교 교수진이 가르치고 커리큘럼도 같습니다.",
    ],
    admissions: [
      "전형은 일반지원, 수능지원, 조건부입학 세 가지입니다. 수능지원은 수능 성적을 활용하는 전형이고, 조건부입학으로 지원하면 공인영어 성적 제출이 면제됩니다.",
      "영어는 TOEFL iBT 80(각 영역 18 이상), IELTS 6.5, Duolingo 110, SAT ERW 480, ACT English 19 중 하나입니다.",
      "봄학기 모집이 주력이라 수능 이후(12월~1월)에도 지원할 수 있습니다. 1·2지망을 쓸 수 있는데, 경영 계열 1지망에서 이공 2지망은 가능하고 그 반대는 안 됩니다.",
    ],
    grades: [
      "성적·에세이·추천서를 함께 보는 종합 평가라 내신 등급 하나로 결정되지 않습니다. 내신 2~3등급은 안정, 4~5등급도 가능권으로 봅니다.",
      "당락을 실제로 가르는 것은 영문 자기소개서와 추천서입니다. 내신이 낮다면 성적이 오른 흐름과 전공 관련 활동을 에세이에서 구체적으로 보여주는 것이 중요합니다.",
      "수능 성적은 선택 제출이지만, 수능지원 전형을 쓰면 수능 결과가 핵심 자료가 됩니다.",
    ],
    majorDetails: {
      컴퓨터과학과: "프로그래밍, 알고리즘, 시스템을 다루는 학과로 ABET 인증을 받았습니다. 정원 50명으로 SUNY Korea에서 가장 큰 이공 학과입니다.",
      전자정보공학과: "전기·전자 회로와 정보통신 기술을 함께 배우는 공학 학과입니다.",
      응용수학통계학과: "수학·통계 이론을 데이터 분석, 금융, 계산 모델링에 적용하는 학과입니다.",
      기계공학과: "기계 설계, 열·유체, 재료를 다루는 공학 학과로 ABET 인증을 받았습니다.",
      경영학과: "회계·재무·마케팅 등 경영 전반을 배우는 학과입니다. 정원 65명으로 가장 큽니다.",
      기술경영학과: "기술과 경영을 함께 다루는 Technological Systems Management 과정입니다.",
    },
    homeCampus: [
      "송도 3년, 뉴욕 본교 1년의 '3+1' 구조입니다. 본교 1년 동안 뉴욕 캠퍼스에서 수업을 듣습니다.",
      "학위는 본교에서 수여하며, 송도 졸업생도 같은 스토니브룩 학위를 받습니다.",
      "본교에 1년보다 오래 머물거나 소속을 본교로 옮기는 제도는 공식 자료에서 확인되지 않으니 입학처에 문의하세요.",
    ],
    careers: [
      "학교 측 발표를 인용한 보도에 따르면 졸업생은 구글, 메타, 마이크로소프트, 아마존, 빅4 회계법인 등에 취업했고, 스탠퍼드·하버드·컬럼비아 등 대학원에 진학했습니다(코리아데일리, 2026-07).",
      "본교 전체 기준으로는 학사 졸업생의 95%가 졸업 1년 안에 취업하거나 대학원에 진학했습니다(2022-23, 본교 발표).",
    ],
    campusLife: [
      "수업은 영어로 진행되며, 40개국 이상에서 온 학생이 함께 공부합니다.",
      "기숙사는 IGC 공동 기숙사로, 1인실(B동)과 2인실(A동)이 있습니다. 통학하는 학생은 기숙사에 살지 않아도 됩니다.",
    ],
    faq: [
      { q: "한국뉴욕주립대 스토니브룩 학비는 얼마인가요?", a: "2026 가을 기준 학부 등록금은 학기당 $11,775(뉴욕주 비거주자), 1년 $23,550입니다. IGC 기숙사는 17주 기준 2인실 127만 5,000원, 1인실 191만 2,500원입니다." },
      { q: "송도 스토니브룩 졸업장은 본교와 같나요?", a: "네. 본교에서 학위를 수여하며 본교와 같은 학위를 받습니다." },
      { q: "뉴욕 본교에는 얼마나 가나요?", a: "송도 3년, 뉴욕 본교 1년의 3+1 구조입니다." },
      { q: "수능이 끝나고 지원할 수 있나요?", a: "봄학기 모집이 주력이라 가능합니다. 2027 봄학기는 2차 우선지원 2026-12-16, 최종 마감 2027-01-18입니다." },
      { q: "스토니브룩 순위는 어느 정도인가요?", a: "본교 기준 US News 2026 미국 대학 59위, 공립 26위입니다." },
      { q: "장학금은 어떻게 신청하나요?", a: "원서를 낼 때 에세이와 함께 신청해야 합니다. 신입생 성적장학금은 Presidential(등록금 전액), Dean's(학기당 $7,500), Merit, Motivation 4종입니다." },
    ],
    sources: [
      { label: "SUNY Korea 학비 (Stony Brook)", url: "https://sunykorea.ac.kr/costaid/html/sub01/0101.html" },
      { label: "SUNY Korea 신입생 장학금", url: "https://sunykorea.ac.kr/costaid/html/sub05/050101.html" },
      { label: "IGC 기숙사 요금", url: IGC_DORM },
      { label: "Stony Brook — SUNY Korea 소개", url: "https://ehs.stonybrook.edu/commcms/est/about/sunykr" },
      { label: "Stony Brook — Facts & Rankings", url: "https://stonybrook.edu/kr-new/about-sbu/facts-and-rankings.html" },
      { label: "Stony Brook — 2026-27 Tuition & Costs", url: "https://www.stonybrook.edu/undergraduate-admissions/cost-and-aid/tuition-costs.php" },
      { label: "QS — Stony Brook University", url: "https://topuniversities.com/node/297276" },
      { label: "Stony Brook Study Abroad — Korea", url: "https://www.stonybrook.edu/commcms/studyabroad/fly/locations/korea-incheon.php" },
      { label: "코리아데일리 (2026-07-21)", url: "https://www.koreadaily.com/article/20260721220834012" },
    ],
    verifiedAt: "2026-10-26",
  },

  utah: {
    tagline: "미국 유타대학교의 첫 해외 캠퍼스. 연 $20,000 정액 학비, TOEIC 695 인정, SAT 선택 제출로 어학·시험 문턱이 낮습니다.",
    intro: [
      "유타대학교 아시아캠퍼스(UAC)는 미국 유타대학교가 2014년 9월 송도에 연 첫 해외 캠퍼스입니다. 2024년 가을 재학생은 620명으로 개교 이후 가장 많았습니다.",
      "학부생은 송도에서 공부하다가 보통 3학년 무렵 미국 솔트레이크시티(SLC) 본교에서 2개 학기를 보냅니다. 졸업하면 본교와 같은 학위를 받습니다.",
      "학과는 회계, 커뮤니케이션, 심리학, 영화·미디어아트, 전기·컴퓨터공학, 게임, 정보시스템, 도시생태학 8개입니다. 같은 IGC 안의 다른 대학 강의도 들을 수 있습니다.",
    ],
    cost: {
      lead: "학비는 연 $20,000(학기당 $10,000)이며, 정규학기 12~17학점은 정액입니다. 대학이 제시한 1년 예상 총비용은 학비·숙식·교재·항공을 합쳐 $31,000입니다.",
      rows: [
        { item: "학비", amount: "연 $20,000", note: "학기당 $10,000, 12~17학점 정액" },
        { item: "17학점 초과 / 12학점 미만", amount: "학점당 $700 / $900", note: "정규학기" },
        { item: "여름·겨울학기", amount: "학점당 $350", note: "" },
        { item: "기숙사 2인실", amount: "학기당 약 $1,100", note: "입학처 FAQ" },
        { item: "기숙사 1인실", amount: "학기당 약 $1,500", note: "입학처 FAQ" },
        { item: "대학 제시 연간 총비용", amount: "$31,000", note: "학비 20,000 + 숙식 5,000 + 교재 1,000 + 기타 2,000 + 항공 3,000" },
        { item: "원서비", amount: "$65", note: "환불 불가" },
      ],
      notes: [
        "대학 이사회 회의록(2024-09)에 따르면 UAC는 개교 이후 학비를 한 번도 올리지 않았습니다.",
        "SLC 본교 기간의 비용은 본교 기준입니다. 본교가 공개한 2025-26 유학생 연간 예상비용은 학비·수수료 $32,520를 포함해 $61,237이며, UAC 학생 적용 요율은 대학에 확인이 필요합니다.",
      ],
      asOf: "유타대 아시아캠퍼스 학비·입학처 안내(2026-10 확인)",
    },
    scholarships: {
      lead: "신입생 장학금 3종은 송도에서만 쓸 수 있고 SLC 체류 기간에는 적용되지 않습니다. 대신 SLC로 가는 학생을 위한 장학금이 따로 있습니다. 장학금 합계는 학비를 넘을 수 없습니다.",
      items: [
        { name: "Entrance Scholarship (입학)", detail: "성적 기준, 연 최대 $4,000." },
        { name: "New Horizon (입학)", detail: "리더십·활동 기준, 에세이 2편, 최대 6학기." },
        { name: "Opportunity (입학)", detail: "경제적 필요 기준, 최대 6학기." },
        { name: "Academic Excellence (재학)", detail: "GPA 3.9 이상, 학기당 $1,000." },
        { name: "Inspire (재학)", detail: "GPA 3.0 이상, $1,000~$10,000." },
        { name: "SLC-Bound 장학 (Global Trailblazer 등)", detail: "GPA 3.0 이상, $1,000~$10,000, SLC 2개 학기에 나눠 지급." },
        { name: "Future Talent 장학", detail: "기초생활수급·차상위·한부모·장애 가정 학생 대상. 학기당 현금 700만 원 + 학비 $5,000, 최대 8학기, 연 1명." },
      ],
    },
    standing: [
      "유타대 본교는 US News 2026 미국 대학 순위에서 공동 151위, 공립 79위입니다(데저렛뉴스 보도).",
      "졸업생은 본교와 같은 국제 인증 학위를 받습니다.",
      "교수 1인당 학생 수는 11명입니다.",
    ],
    admissions: [
      "영어는 TOEFL 80, IELTS 6.5, TOEIC 695, Duolingo 110, SAT EBRW 510, ACT English 18 중 하나이며, 2년 이내 성적이어야 합니다. IGC 대학 가운데 TOEIC을 인정하는 곳은 유타대입니다.",
      "SAT·ACT는 선택 제출(test-optional)이고 종합평가로 선발합니다. 다만 미국 GED·HiSET 취득자, 홈스쿨, 미인가 미국 고교 출신은 SAT/ACT를 반드시 내야 합니다.",
      "필수 서류는 영문 졸업증명서, 9~12학년 영문 성적증명서, 공인영어성적으로 간단한 편입니다.",
    ],
    grades: [
      "고교 성적과 들은 과목의 난이도를 함께 보는 종합평가입니다. 내신 2~4등급 학생이 주로 지원합니다.",
      "등급 숫자보다 성적이 올라가는 흐름과 지원 전공과 연결되는 과목 이수가 중요합니다. 수능 성적은 필수가 아닙니다.",
    ],
    majorDetails: {
      회계학과: "기록을 넘어서는 분석 중심 회계 교육. Deloitte·KPMG 등으로 진출하며, 대학은 평균 초봉 $55,985, 취업률 98%를 게시하고 있습니다.",
      커뮤니케이션학과: "전략커뮤니케이션·저널리즘 등 4개 분야. 홍보, 마케팅, 출판, 광고, 방송으로 진출합니다.",
      심리학과: "인간의 사고와 행동을 이해하는 학문. 휴먼서비스·인사·교육 분야로 진출하며, 대학원을 거쳐 상담사·심리학자가 될 수 있습니다.",
      "영화·미디어아트학과": "광고, 방송, 영화, 박물관 분야를 다룹니다. 프로듀서·촬영감독·편집자 등으로 진출합니다. 전용 극장이 있습니다.",
      "전기·컴퓨터공학과": "신기술의 발명·설계·개발·시험을 배웁니다. 산업계·정부·학계로 진출합니다.",
      게임학과: "게임 산업 진출을 목표로 시뮬레이션, 에듀테인먼트, 시각화, 헬스 시리어스 게임까지 다룹니다. 게임랩·스트리밍룸이 있습니다.",
      정보시스템학과: "비즈니스와 기술의 교차 분야로 사이버보안·BI·분석으로 진출합니다. 대학은 평균 초봉 $63,531, 취업률 92%를 게시하고 있습니다.",
      도시생태학과: "도시 환경에서 인간과 자연의 관계를 연구합니다. GIS 분석가, 계획 컨설턴트 등으로 진출합니다.",
    },
    homeCampus: [
      "SLC 본교에서 2개 학기를 공부하는 것이 필수이며, 보통 3학년 무렵 갑니다.",
      "졸업하면 본교와 같은 학위를 받습니다. SLC 기간에는 SLC-Bound 장학금 등 별도 장학을 신청할 수 있습니다.",
      "본교로 소속을 완전히 옮기는 제도는 공식 자료에서 확인되지 않으니 입학처에 문의하세요.",
    ],
    careers: [
      "대학 이사회 회의록(2024-09)에 따르면 UAC 졸업생 취업률은 82%입니다.",
      "2026년 5월 졸업식에서는 학사 132명, 석사 3명이 졸업했습니다(세계일보 보도).",
    ],
    campusLife: [
      "어학 과목을 뺀 모든 수업이 영어로 진행됩니다.",
      "기숙사는 1인실과 2인실이 있고, 방마다 샤워실·화장실이 있으며 공용 소형 주방을 씁니다. 기숙사는 학기마다 따로 신청해야 하고, 의무 식사 플랜은 없습니다.",
      "게임 스트리밍룸·게임랩·게임라운지와 영화 전공용 극장이 있습니다.",
    ],
    faq: [
      { q: "유타대 아시아캠퍼스 학비는 얼마인가요?", a: "연 $20,000(학기당 $10,000)이며 12~17학점은 정액입니다. 대학이 제시한 1년 예상 총비용은 숙식·교재·항공을 포함해 $31,000입니다." },
      { q: "토익으로 지원할 수 있나요?", a: "네. TOEIC 695 이상이면 어학 기준을 충족합니다. 성적은 2년 이내여야 합니다." },
      { q: "SAT가 꼭 필요한가요?", a: "아니요. SAT·ACT는 선택 제출입니다. 다만 미국 GED·홈스쿨·미인가 미국 고교 출신은 필수입니다." },
      { q: "미국 본교에는 언제 가나요?", a: "SLC 본교에서 2개 학기를 이수하는 것이 필수이며, 보통 3학년 무렵 갑니다." },
      { q: "장학금은 어떻게 받나요?", a: "신입생은 Entrance(연 최대 $4,000), New Horizon, Opportunity 장학에 지원할 수 있고, 재학 중에는 GPA에 따라 Academic Excellence·Inspire, SLC로 갈 때는 SLC-Bound 장학이 있습니다." },
      { q: "2027 원서 마감은 언제인가요?", a: "봄학기는 우선 2026-11-15, 최종 2027-01-15이고, 가을학기는 우선 2027-02-15, 최종 2027-04-01입니다." },
    ],
    sources: [
      { label: "UAC 학비·비용 안내", url: "https://asiacampus.utah.edu/?p=3802" },
      { label: "유타대 입학처 UAC FAQ", url: "https://admissions.utah.edu/information-resources/uac-faqs/" },
      { label: "UAC 신입생 지원 안내 (2027)", url: "https://asiacampus.utah.edu/apply/freshman-students" },
      { label: "UAC 장학금", url: "https://asiacampus.utah.edu/scholarships-financial-aid" },
      { label: "UAC Future Talent 장학금", url: "https://asiacampus.utah.edu/uac-future-talent-scholarship/" },
      { label: "UAC 기숙사", url: "https://asiacampus.utah.edu/dormitories/" },
      { label: "UAC 학사 안내", url: "https://asiacampus.utah.edu/academics/" },
      { label: "UAC 소개 (교수 1인당 학생 수·IGC 교차 수강)", url: "https://asiacampus.utah.edu/?p=164" },
      { label: "UAC 이사회 회의록 (2024-09-13, PDF)", url: "https://www.global.utah.edu/wp-content/uploads/sites/49/2025/08/UAC_Board_Meeting_Minutes_2024.09.13.pdf" },
      { label: "유타대 본교 유학생 비용 (2025-26)", url: "https://admissions.utah.edu/?p=329" },
      { label: "UAC 10주년 (At the U, 2024-09)", url: "https://attheu.utah.edu/announcements/university-of-utah-asia-campus-celebrates-10th-anniversary/" },
      { label: "데저렛뉴스 US News 2026 순위 보도", url: "https://www.deseret.com/faith/2025/09/25/college-rankings-utah-byu-utah-state/" },
      { label: "세계일보 (2026-06-01)", url: "https://www.segye.com/newsView/20260601505666" },
    ],
    verifiedAt: "2026-10-26",
  },

  gmu: {
    tagline: "미국 조지메이슨대학교의 송도 캠퍼스. 송도 학기당 $10,000, 본교 Fairfax에서 최소 2학기를 공부하고 본교와 같은 학위를 받습니다.",
    intro: [
      "한국조지메이슨대학교(Mason Korea)는 미국 버지니아주 조지메이슨대학교가 2014년 3월 송도에 연 캠퍼스입니다. 첫 입학생 20명으로 시작해 2024년에는 18개국 출신 900명 이상이 다니고 있습니다.",
      "본교와 같은 교육과정으로 모든 수업을 영어로 진행하며, 학위는 \"조지메이슨 학위와 모든 면에서 동일\"하다고 본교가 밝히고 있습니다.",
      "학부는 경영학, 경제학, 글로벌문제학(국제학), 분쟁분석·해결학, 계산·데이터과학, 게임디자인으로 구성됩니다. 게임디자인은 2018년, 데이터과학은 2021년에 신설됐습니다.",
    ],
    cost: {
      lead: "송도 캠퍼스 등록금은 학기당 $10,000(12~16학점)입니다. 대학이 제시한 송도 한 학기 예상 총비용은 숙식·항공·교재를 포함해 $15,550입니다.",
      rows: [
        { item: "송도 등록금", amount: "학기당 $10,000", note: "12~16학점 풀타임" },
        { item: "송도 한 학기 예상 총비용", amount: "$15,550", note: "등록금 + 숙식 2,500 + 항공 1,450 + 교재 600 + 개인 1,000" },
        { item: "IGC 기숙사 2인실", amount: "128만 5,710원", note: "2026 가을학기" },
        { item: "IGC 기숙사 1인실", amount: "192만 8,570원", note: "2026 가을학기" },
        { item: "Fairfax 본교 학기 예상 총비용", amount: "$20,765", note: "등록금 10,000 + 숙식 7,550 + 항공·교재·개인" },
        { item: "Fairfax 연간 등록금·학생회비 (2026-27)", amount: "$20,000", note: "Mason Korea 소속 할인 등록금 $15,944 + 의무 학생회비 $4,056" },
      ],
      notes: [
        "Mason Korea 학생은 Fairfax에서 공부할 때도 할인된 등록금을 냅니다. 본교 일반 타주 학생 등록금(2026-27 연 $35,748)보다 낮습니다.",
        "신입생은 첫 학기에 IGC 기숙사 2인실에 살아야 합니다(First Semester Experience).",
      ],
      asOf: "Mason Korea 학비·기숙사 안내, GMU 2026-27 등록금표(2026-10 확인)",
    },
    scholarships: {
      lead: "2027 봄·가을학기 공고 기준입니다. 장학금 합계는 등록금을 넘을 수 없습니다.",
      items: [
        { name: "성적우수 입학장학", detail: "학기당 $1,500~$5,000, 최대 6학기. GPA·에세이·면접으로 선발, 누적 GPA 3.5 이상 유지." },
        { name: "가계곤란 입학장학", detail: "학기당 $1,000~$3,000, 최대 6학기. 누적 GPA 2.0 이상 유지." },
        { name: "Dean's Merit", detail: "학기당 $2,000. 누적 GPA 3.5 이상, 30학점 이상 이수자." },
        { name: "1학년 학업성취", detail: "1회 $500~$1,000. 첫 학기 GPA 3.7 이상." },
        { name: "Fairfax Patriot Access", detail: "Fairfax로 가는 학생, 학기당 $3,000, 2학기." },
        { name: "기타", detail: "Stearns Global Education Fund($1,000), 기숙사 사감(RA) $1,500~$1,750, 학생활동 장학 등." },
      ],
    },
    standing: [
      "조지메이슨 본교는 US News 2026 미국 대학 순위에서 117위, 공립 57위입니다(본교 발표).",
      "경영학 과정은 AACSB 인증을 받은 Costello 경영대 과정입니다.",
      "학생 대 교수 비율은 12:1입니다.",
    ],
    admissions: [
      "어학 경로가 다양합니다. TOEFL·IELTS·SAT·ACT 점수가 없으면 학교에서 특정 일자에 시행하는 Versant 시험으로 대신할 수 있고, 수능 영어 성적도 공인어학 점수 대신 낼 수 있습니다.",
      "영어 점수가 기준에 조금 못 미치면 Patriot Plus(PPP)로 입학합니다. 1학년 동안 전공과목과 영어과목(교양학점 인정)을 함께 들어 졸업 시기는 같고, 각 과목 C 이상이면 2학년으로 올라갑니다.",
      "PPP 기준보다도 낮다면 MK Way 과정(한 학기 등록금 $5,000)을 거쳐 세 과목 모두 B- 이상이면 PPP로 진급합니다.",
    ],
    grades: [
      "학생 전체를 보는 종합평가로, 어학과 정성평가(자기소개서·활동)의 비중이 큽니다. 내신 2~4등급 학생이 주로 지원합니다.",
      "어학 점수만 확보되면 지원 경로가 넓어서, 내신보다 영어 경로를 먼저 정하는 것이 전략의 출발점입니다.",
    ],
    majorDetails: {
      경영학과: "AACSB 인증 Costello 경영대 과정으로 회계·재무·마케팅·MIS 등 세부전공이 있습니다. 회계법인, 금융기관, 컨설팅, 데이터·IT 분석으로 진출합니다.",
      경제학과: "BA는 폭넓은 교양과 비판적 사고로 로스쿨·경영·행정 대학원을 준비하고, BS는 정량분석을 강조해 정부·컨설팅 애널리스트, 경제학 대학원으로 이어집니다.",
      국제학과: "Global Affairs BA. 세계화의 문화·정치·경제·생태적 측면을 다루는 융합 과정으로 국제안보, 기후, 보건, 개발, 기업, 미디어 분야로 진출합니다.",
      "분쟁분석 및 해결학과": "평화·사회문제를 다루는 융합 과정입니다. BS는 정량 연구방법을 강조하고 외국어 요건이 없으며, 기업·데이터 분석·컨설팅·교육으로 진출합니다.",
      데이터과학과: "계산·데이터과학 BS. 머신러닝·AI·시뮬레이션·시각화로 대규모 데이터를 분석하는 법을 배웁니다.",
      컴퓨터게임디자인학과: "게임디자인 BFA. 예술적 디자인과 컴퓨터공학 기술을 결합하며 인턴십이 필수입니다. 게임 개발, 3D 모델링·애니메이션, 사운드 분야로 진출합니다.",
    },
    homeCampus: [
      "모든 학생은 버지니아 Fairfax 본교에서 정규학기 최소 2학기를 이수해야 합니다. 6·7학기 또는 7·8학기 중 고를 수 있고, 여름학기는 인정되지 않습니다.",
      "Fairfax로 가려면 4년 학업계획상 앞 학기 과목을 이수하고, 누적 GPA 2.0 이상, 지도교수 승인이 필요합니다.",
      "Fairfax에서도 Mason Korea 소속 할인 등록금이 적용되며, Fairfax Patriot Access(학기당 $3,000) 장학금을 받을 수 있습니다.",
    ],
    careers: [
      "학교는 졸업생의 80% 이상이 졸업 1년 안에 취업한다고 밝히고 있습니다(기준 졸업연도 미표기).",
      "Academic Resource Center와 Career Services가 송도 캠퍼스에서 운영됩니다.",
    ],
    campusLife: [
      "모든 수업이 영어로 진행되며, 18개국 출신 학생이 함께 공부합니다.",
      "기숙사는 IGC 공동 기숙사(1인실 B동, 2인실 A동)이며, 신입생은 첫 학기에 2인실 거주가 의무입니다.",
    ],
    faq: [
      { q: "한국조지메이슨대 학비는 얼마인가요?", a: "송도 캠퍼스 등록금은 학기당 $10,000(12~16학점)이고, 대학이 제시한 한 학기 예상 총비용은 $15,550입니다." },
      { q: "미국 본교에서는 학비가 더 비싼가요?", a: "Mason Korea 학생은 Fairfax에서도 할인 등록금을 냅니다. 2026-27 기준 할인 등록금과 의무 학생회비를 합쳐 연 $20,000입니다." },
      { q: "토플 없이 지원할 수 있나요?", a: "네. 학교가 시행하는 Versant 시험이나 수능 영어 성적으로 대신할 수 있고, 점수가 조금 모자라면 Patriot Plus 조건부입학이 있습니다." },
      { q: "본교에는 꼭 가야 하나요?", a: "네. Fairfax 본교에서 정규학기 최소 2학기를 이수해야 하며, 6·7학기 또는 7·8학기 중 선택합니다." },
      { q: "어떤 학과가 있나요?", a: "경영학, 경제학, 글로벌문제학, 분쟁분석·해결학, 계산·데이터과학, 게임디자인이 있습니다." },
      { q: "조지메이슨 순위는 어느 정도인가요?", a: "본교 기준 US News 2026 미국 대학 117위, 공립 57위입니다." },
    ],
    sources: [
      { label: "Mason Korea 학비·비용", url: "https://masonkorea.gmu.edu/tuition-and-costs" },
      { label: "GMU 2026-27 등록금표 (PDF)", url: "https://studentaccounts.gmu.edu/wp-content/uploads/AY26-27_Tuition_and_Fee_Rates_Annual.pdf" },
      { label: "Mason Korea 장학금", url: "https://masonkorea.gmu.edu/scholarships-detail" },
      { label: "Mason Korea 기숙사 (Fall 2026)", url: "https://masonkorea.gmu.edu/housing-residential-life/fsemasonkorea/fall-26" },
      { label: "Mason Korea 본교 이동 (Campus Transition)", url: "https://masonkorea.gmu.edu/campus-transition" },
      { label: "Mason Korea Direct·PPP 안내", url: "https://masonkorea.gmu.edu/future-students-kor/english-language-programs-kor/direct-and-ppp" },
      { label: "Mason Korea Versant 안내", url: "https://masonkorea.gmu.edu/future-students/versant-test" },
      { label: "Mason Korea MK Way", url: "https://masonkorea.gmu.edu/future-students/english-language-programs/academic-english" },
      { label: "GMU — Mason Korea", url: "https://www.gmu.edu/freshman/mason-korea" },
      { label: "GMU Rankings", url: "https://provost.sitemasonry.gmu.edu/rankings" },
      { label: "Mason Korea 10주년 (2024-08)", url: "https://content.gmu.edu/news/2024-08/mason-korea-marks-decade-success" },
      { label: "Why Mason Korea", url: "https://masonkorea.gmu.edu/about/why-mason-korea/accelerating_success" },
    ],
    verifiedAt: "2026-10-26",
  },

  fit: {
    tagline: "뉴욕 패션공과대학(FIT)의 아시아 유일 캠퍼스. 송도에서 2년 전문학사(AAS)를 마치고 뉴욕·밀라노 학사과정에 지원하는 2+2 구조입니다.",
    intro: [
      "한국뉴욕주립대학교 FIT는 미국 뉴욕 패션공과대학(Fashion Institute of Technology)이 2017년 송도에 연 과정으로, 아시아 유일이자 미국 밖 세 번째 FIT 캠퍼스입니다. 스토니브룩과 같은 학교법인(SUNY Korea) 소속입니다.",
      "송도에서 2년 동안 전문학사(AAS)를 취득한 뒤, 뉴욕 캠퍼스 학사과정(BS/BFA)에 지원합니다. 패션디자인 전공은 밀라노 BFA 과정에도 지원할 수 있습니다.",
      "한국 캠퍼스는 본교와 같은 교육과정으로 운영되고 같은 학위를 수여합니다. 모집 학과는 패션디자인과 패션비즈니스매니지먼트(패션경영) 두 곳입니다.",
    ],
    cost: {
      lead: "2026 가을학기 등록금은 학기당 $11,775(뉴욕주 비거주자 기준), 1년 $23,550입니다. 원서비는 $50(또는 6만 원)이고 합격 후 예치금 $1,000을 냅니다.",
      rows: [
        { item: "학부 등록금", amount: "학기당 $11,775", note: "뉴욕주 비거주자, 2026 가을" },
        { item: "학부 등록금 (뉴욕주 거주자)", amount: "학기당 $4,235", note: "" },
        { item: "연간 등록금", amount: "$23,550", note: "2학기 기준" },
        { item: "원서비 / 합격 예치금", amount: "$50(6만 원) / $1,000", note: "" },
        { item: "IGC 기숙사 1인실", amount: "191만 2,500원", note: "17주 기준" },
        { item: "IGC 기숙사 2인실", amount: "127만 5,000원", note: "17주 기준" },
        { item: "뉴욕 캠퍼스 학사 등록금", amount: "학기당 $10,846", note: "비거주자, 2026-27 + 보험 등 별도" },
      ],
      notes: [
        "이수 학기가 2학기 미만인 학부생은 교내(IGC 기숙사)에 살아야 합니다.",
        "뉴욕 캠퍼스에서는 의료보험(연 $3,807, 다른 보험 증빙 시 제외)과 학기당 Health Services $205, Technology $180 등이 따로 붙습니다.",
      ],
      asOf: "SUNY Korea FIT 학비표 Fall 2026, FIT 2026-27 카탈로그(2026-10 확인)",
    },
    scholarships: {
      lead: "SUNY Korea 공통 신입생 성적장학금 안내입니다(FIT 적용 범위는 입학처 확인). 원서를 낼 때 에세이와 함께 신청해야 하며, 원서 제출 뒤에는 신청할 수 없습니다.",
      items: [
        { name: "Presidential Scholarship", detail: "등록금 전액(기숙사는 심사 후 결정)." },
        { name: "Dean's Scholarship", detail: "학기당 $7,500." },
        { name: "Merit Scholarship", detail: "$1,000~$10,000." },
        { name: "Motivation Scholarship", detail: "$1,000~$5,000, 1회." },
        { name: "유지 조건", detail: "학기·누적 GPA 3.2 이상, 12학점 이상 풀타임 등록." },
      ],
    },
    standing: [
      "FIT는 CEOWORLD 매거진의 2025년 세계 패션스쿨 순위에서 1위에 올랐습니다(2019년에도 같은 순위에서 1위).",
      "송도에서 받는 학위는 FIT 전문학사(AAS)이며, 본교와 같은 교육과정·같은 학위입니다.",
    ],
    admissions: [
      "신입생은 매년 가을학기(9월)에만 뽑습니다. 서류로만 심사하고 별도 시험이나 면접은 없습니다.",
      "영어는 TOEFL iBT 80, IELTS 6.5, Duolingo 105, PTE 53 중 하나입니다. 영어로 수업하는 고교를 4년 다녔다면 면제될 수 있습니다. 스토니브룩과 달리 조건부입학은 없습니다.",
      "자기소개서는 750단어 이내입니다. 패션디자인 지원자는 FIT 본교가 정한 과제 4개(에세이 1, 디자인 프로젝트 2, 봉제 프로젝트 1)를 원서 제출 후 안내되는 링크로 온라인 제출합니다.",
    ],
    grades: [
      "미국식 입학사정관제로 성적·자기소개서·포트폴리오를 함께 봅니다. 정성평가 비중이 커서 내신 2~4등급 학생이 주로 지원합니다.",
      "패션디자인은 포트폴리오가 사실상 합격을 좌우합니다. 과제 구성이 정해져 있으니 고2~고3 초부터 학기 중에 나눠 준비하는 것이 좋습니다.",
    ],
    majorDetails: {
      패션디자인학과: "총 64학점의 AAS 과정으로 드레이핑·패턴메이킹·봉제·CAD를 배웁니다. 디자이너, 어시스턴트·테크니컬 디자이너, 스타일리스트로 진출하며 뉴욕·밀라노 BFA에 지원할 수 있습니다.",
      패션경영학과: "패션비즈니스매니지먼트 AAS(62.5~64학점). 바잉, 세일즈, 패션 프레젠테이션, 리테일 경영, 마케팅을 다루고, 졸업 후 FBM·국제무역·마케팅 등 BS 과정에 지원할 수 있습니다.",
    },
    homeCampus: [
      "송도 2년(AAS) + 뉴욕 또는 밀라노 2년(학사)의 2+2 구조입니다.",
      "뉴욕 학사 진학은 자동으로 보장되지 않으며, 학생 핸드북에 정해진 학사과정 지원 마감일까지 별도로 지원해야 합니다. AAS를 졸업하려면 누적 GPA 2.00 이상이 필요합니다.",
      "뉴욕 캠퍼스 학사과정 등록금은 2026-27 기준 학기당 $10,846(비거주자)이며, 보험 등 비용이 따로 붙습니다.",
    ],
    careers: [
      "대학은 패션디자인 전공의 진로로 디자이너, 어시스턴트 디자이너, 테크니컬 디자이너, 스타일리스트를 제시합니다.",
      "패션경영 전공은 바잉·세일즈·리테일·마케팅 직무와 뉴욕 BS 과정 진학으로 이어집니다.",
    ],
    campusLife: [
      "모든 수업이 영어로 진행되며, 스토니브룩 학생들과 같은 SUNY Korea 캠퍼스를 씁니다.",
      "기숙사는 IGC 공동 기숙사(1인실 B동, 2인실 A동)이고, 2학기 미만 이수자는 교내 거주가 의무입니다.",
    ],
    faq: [
      { q: "송도 FIT 학비는 얼마인가요?", a: "2026 가을 기준 학기당 $11,775(뉴욕주 비거주자), 1년 $23,550입니다. IGC 기숙사는 17주 기준 2인실 127만 5,000원, 1인실 191만 2,500원입니다." },
      { q: "송도 FIT를 졸업하면 뉴욕으로 갈 수 있나요?", a: "송도에서 AAS를 마친 뒤 뉴욕 캠퍼스 학사과정에 지원합니다. 진학이 자동으로 보장되지는 않으며, 정해진 학사과정 지원 마감일까지 별도로 지원해야 합니다." },
      { q: "포트폴리오는 어떻게 준비하나요?", a: "패션디자인 지원자만 제출하며, FIT가 정한 과제 4개(에세이 1, 디자인 프로젝트 2, 봉제 프로젝트 1)를 원서 제출 후 온라인으로 냅니다." },
      { q: "봄학기에도 입학할 수 있나요?", a: "아니요. FIT는 매년 가을학기(9월)에만 신입생을 뽑습니다." },
      { q: "영어 점수가 모자라면 조건부입학이 되나요?", a: "FIT는 조건부입학을 받지 않습니다. TOEFL 80, IELTS 6.5, Duolingo 105, PTE 53 중 하나를 마감 전에 확보해야 합니다." },
    ],
    sources: [
      { label: "SUNY Korea FIT 학비 (Fall 2026)", url: "https://sunykorea.ac.kr/costaid/html/sub01/0102.html" },
      { label: "SUNY Korea 분할납부 안내", url: "https://sunykorea.ac.kr/costaid/html/sub03/0301.html" },
      { label: "SUNY Korea FIT 신입생 지원 안내", url: "https://www.sunykorea.ac.kr/adm/html/sub02/020102.html" },
      { label: "SUNY Korea FIT 학위·장학 안내", url: "https://www.sunykorea.ac.kr/adm/html/sub02/0207.html" },
      { label: "SUNY Korea 신입생 장학금", url: "https://sunykorea.ac.kr/costaid/html/sub05/050101.html" },
      { label: "FIT 2025-26 학생 핸드북", url: "https://www.sunykorea.ac.kr/_prog/bbs/?mode=D&site_dvs_cd=en&menu_dvs_cd=030502&code=en_030502&file_id=5419" },
      { label: "FIT Korea 패션디자인 교육과정", url: "https://fd.sunykorea.ac.kr/fd/html/sub02/0203.html" },
      { label: "FIT Korea FAQ", url: "https://fd.sunykorea.ac.kr/fd/html/sub01/0108.html" },
      { label: "FIT 2026-27 Tuition and Fees", url: "https://catalog.fitnyc.edu/undergraduate/expensesandfinancialaid/tuitionandfees/" },
      { label: "FIT FBM 과정 (카탈로그 2026-27)", url: "https://catalog.fitnyc.edu/undergraduate/majors/twoyearassociatedegreeprograms/fashionbusinessmanagementmajor/" },
      { label: "IGC 기숙사 요금", url: IGC_DORM },
      { label: "FIT, 2025 세계 패션스쿨 순위 1위 (FashionUnited)", url: "https://fashionunited.com/education/news/fit-tops-2025-ranking-of-the-worlds-best-fashion-schools/2025120969561" },
      { label: "FIT News — CEOWORLD 2019 1위", url: "https://news.fitnyc.edu/2019/04/11/best/" },
      { label: "FIT News — SUNY Korea 과정 개설 (2017-05)", url: "https://news.fitnyc.edu/2017/05/16/fit-launches-fashion-design-and-fashion-business-management-programs-at-suny-korea/" },
      { label: "FIT News — SUNY Korea 개교 (2017-10)", url: "https://news.fitnyc.edu/2017/10/16/fit-president-and-delegation-attend-opening-events-at-fit-at-suny-korea/" },
    ],
    verifiedAt: "2026-10-26",
  },
};
