// 대학 상세 페이지(/promo/universities/$uniId)의 서술형 가이드 콘텐츠.
// 요강·학과·마감처럼 표로 쓰는 값은 igc.ts, 문장으로 설명하는 값은 여기에 둔다.
// 숫자(학비·장학·기숙사)는 반드시 공식 출처 URL과 기준 학년도를 함께 적는다. 확인 못 한 값은 넣지 않는다.
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

export const UNI_GUIDES: Partial<Record<UniId, UniGuide>> = {};
