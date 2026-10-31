import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowRight, Layers, Compass, FileEdit, Send, ClipboardCheck, Check, GraduationCap, ShieldAlert } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader, CONSULT_PHONE, CONSULT_TEL } from "@/components/layout";
import { SectionHead } from "@/components/ui";

export const Route = createFileRoute("/promo/pricing")({
  component: Pricing,
});

const BASE = 98; // 첫 대학 (만원)
const ADD = 48; // 추가 대학당 (만원)
const total = (n: number) => BASE + ADD * (n - 1);

// 기본가에 포함되는 항목 — 다른 곳 견적과 비교할 때 확인할 체크리스트
const INCLUDED = [
  { item: "지원 대학·전형 조합 설계", note: "안전·적정·도전 배분, 수시 6장과 겹치지 않게" },
  { item: "어학 최소경로 설계", note: "수능영어·Versant·Duolingo·TOEIC·SAT·ACT·조건부입학 중 선택" },
  { item: "자기소개서·에세이 1:1 첨삭", note: "학생 본인 글을 바탕으로 구성·논리·표현 코칭" },
  { item: "추천서 일정·가이드", note: "선생님께 드릴 요청 자료와 일정 관리" },
  { item: "원서 작성·서류 업로드·제출", note: "계정 생성부터 제출 확인까지" },
  { item: "마감·추가 서류 대응", note: "어드미션 추가 요청, 인터뷰 준비(해당 시)" },
  { item: "합격 후 절차", note: "장학금 신청, 보증금·합격 수락, 기숙사 신청, 입학 전 안내" },
];

// 컨설팅이 맡는 전 과정
const SCOPE = [
  { icon: Compass, title: "전략 설계", desc: "학생 강점·성적·어학을 진단해 5개 대학 중 최적 조합과 전형을 설계합니다. 안전·적정·도전을 배분하고, 수시 6장과 겹치지 않는 IGC 보험 포지션을 잡습니다." },
  { icon: FileEdit, title: "서류·에세이 코칭", desc: "활동 정리와 에세이 구성을 함께 잡고, 학생이 쓴 글을 대학별 요구에 맞게 1:1로 첨삭합니다. (뼈대는 한 번, 학교별 변형은 추가 대학마다 — 그래서 추가는 반값)" },
  { icon: Send, title: "원서 작성·제출 대행", desc: "온라인 지원서 계정 생성부터 항목 입력·서류 업로드·제출까지 맡습니다. 우선지원 타이밍을 역산해 가장 유리한 시점에 접수합니다." },
  { icon: ClipboardCheck, title: "제출 후 · 합격 후 관리", desc: "어드미션 추가 요청 대응과 인터뷰 준비, 합격 후 장학금 신청·합격 수락·기숙사 신청·입학 전 안내까지 함께합니다." },
];

function Pricing() {
  const [n, setN] = useState(3);
  return (
    <>
      <Seo
        title="컨설팅 비용 안내 — 첫 대학 98만 / 추가 48만, 에세이 첨삭 포함"
        description="IGC 입시 컨설팅 요금. 첫 대학 98만원, 추가 대학당 48만원. 전략 설계·에세이 첨삭·원서 제출·합격 후 절차까지 포함한 총액입니다."
        path="/promo/pricing"
      />
      <PageHeader
        badge="요금 안내 · 포함 항목 공개"
        title="에세이 첨삭까지 포함한 총액입니다"
        desc="첫 대학 98만원, 추가 대학당 48만원. 전략 설계부터 에세이 첨삭, 원서 제출, 합격 후 절차까지 기본가에 들어 있습니다."
      />

      {/* 핵심 가격 */}
      <section className="container">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-igc-blue p-8 text-center">
            <p className="text-sm font-semibold text-igc-blue">첫 대학</p>
            <p className="mt-2 text-4xl font-extrabold text-igc-navy">98<span className="text-2xl">만원</span></p>
            <p className="mt-2 text-sm text-muted-foreground">진단·전략 설계 + 에세이 첨삭 + 원서 제출 + 합격 후 절차</p>
          </div>
          <div className="rounded-2xl border p-8 text-center">
            <p className="text-sm font-semibold text-igc-mint">추가 대학 (1개당)</p>
            <p className="mt-2 text-4xl font-extrabold text-igc-navy">+48<span className="text-2xl">만원</span></p>
            <p className="mt-2 text-sm text-muted-foreground">이미 만든 서류를 대학별로 변형·제출 — 그래서 반값</p>
          </div>
        </div>
      </section>

      {/* 총액 시뮬레이터 */}
      <section className="container mt-12">
        <SectionHead eyebrow="총액 계산" title="지원할 대학 수를 골라 보세요" desc="IGC 지원자는 보통 2~3곳에 냅니다. 대학을 늘릴수록 학교당 비용이 내려갑니다." />
        <div className="mt-6 rounded-2xl border p-6 md:p-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="지원 대학 수">
            {[1, 2, 3, 4, 5].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setN(k)}
                aria-pressed={n === k}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${n === k ? "border-igc-blue bg-igc-blue text-white" : "text-igc-navy hover:border-igc-blue"}`}
              >
                {k}개 대학
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-igc-blue/5 p-5">
              <p className="text-xs text-muted-foreground">총 컨설팅비</p>
              <p className="mt-1 text-3xl font-extrabold text-igc-blue">{total(n)}만원</p>
              <p className="mt-1 text-xs text-muted-foreground">98{n > 1 ? ` + 48 × ${n - 1}` : ""}만원</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs text-muted-foreground">학교당 평균</p>
              <p className="mt-1 text-3xl font-extrabold text-igc-navy">{Math.round(total(n) / n)}만원</p>
              <p className="mt-1 text-xs text-muted-foreground">에세이 첨삭 포함 기준</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs text-muted-foreground">별도 비용</p>
              <p className="mt-1 text-lg font-bold text-igc-navy">대학 전형료만 실비</p>
              <p className="mt-1 text-xs text-muted-foreground">대학별 $65~80 수준, 대학에 직접 납부</p>
            </div>
          </div>
        </div>
      </section>

      {/* 포함 항목 체크리스트 */}
      <section className="container mt-12">
        <SectionHead
          eyebrow="견적 비교 체크리스트"
          title="다른 곳 견적과 비교할 땐, 포함 항목을 확인하세요"
          desc="학교당 수속비가 낮아 보여도 에세이 첨삭·번역·합격 후 절차가 별도인 경우가 있습니다. 아래는 저희 기본가에 모두 들어 있는 항목입니다."
        />
        <div className="mt-6 overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-muted-foreground">
              <tr><th className="p-3">항목</th><th className="p-3">내용</th><th className="p-3 text-center">T IGC 기본가</th></tr>
            </thead>
            <tbody>
              {INCLUDED.map((r) => (
                <tr key={r.item} className="border-t">
                  <td className="p-3 font-medium text-igc-navy">{r.item}</td>
                  <td className="p-3 text-muted-foreground">{r.note}</td>
                  <td className="p-3 text-center"><Check className="mx-auto h-5 w-5 text-igc-blue" aria-label="포함" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 무엇을 해드리나 */}
      <section className="container mt-16">
        <SectionHead eyebrow="무엇을 해드리나요" title="전략 설계부터 합격 후 절차까지" desc="단순 서류 대행이 아닙니다. '어느 대학·전형에, 어떤 순서로, 무엇을 강조해 낼지'를 설계하고 실행합니다." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {SCOPE.map((s) => (
            <div key={s.title} className="rounded-2xl border p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-blue/10 text-igc-blue"><s.icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-bold text-igc-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 에세이 원칙 */}
      <section className="container mt-14">
        <div className="flex gap-4 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 md:p-8">
          <ShieldAlert className="h-6 w-6 shrink-0 text-amber-600" />
          <div>
            <h2 className="text-lg font-bold text-igc-navy">에세이는 학생 본인의 글로 완성합니다</h2>
            <p className="mt-2 text-sm text-foreground/80">
              대신 써 준 에세이는 대학 입장에서 부정행위이고, 적발되면 합격이 취소될 수 있습니다. 그래서 저희는 주제 찾기·구성 설계·첨삭을 함께하고,
              글은 학생이 직접 씁니다. 영어가 서툴러도 괜찮습니다 — 한국어로 이야기를 먼저 정리한 뒤 영어로 옮기는 과정을 단계별로 돕습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 왜 추가는 반값 */}
      <section className="container mt-14">
        <div className="rounded-3xl border-2 border-igc-blue/20 bg-gradient-to-br from-igc-blue/5 to-white p-8 md:p-12">
          <div className="flex items-center gap-2 text-igc-blue"><Layers className="h-5 w-5" /><span className="text-sm font-semibold">왜 추가 대학은 반값인가</span></div>
          <h2 className="mt-3 text-2xl font-bold text-igc-navy md:text-3xl">한 번 준비, 여러 번 지원</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            생기부·활동·어학·에세이 뼈대는 <b className="text-igc-navy">첫 대학에서 한 번</b> 완성합니다. 추가 대학은 그 자산을 각 대학 요구에 맞춰
            <b className="text-igc-navy"> 변형·재활용</b>하므로 공수가 절반입니다. 같은 준비로 지원 폭을 넓혀 합격 확률을 높이세요.
          </p>
        </div>
      </section>

      {/* 합격 이후 */}
      <section className="container mt-14">
        <div className="rounded-2xl border p-8">
          <div className="flex items-center gap-2 text-igc-blue"><GraduationCap className="h-5 w-5" /><span className="text-sm font-semibold">합격 이후까지 보세요</span></div>
          <h2 className="mt-3 text-xl font-bold text-igc-navy">본교 학기·학위·졸업 후 진로</h2>
          <p className="mt-2 text-sm text-muted-foreground">어느 대학을 고르느냐에 따라 본교에서 보내는 기간과 졸업 후 길이 달라집니다. 지원 전략을 짤 때 함께 봅니다.</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/promo/blog/$slug" params={{ slug: "igc-degree-home-campus" }} className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:gap-2">본교 학위·본교 학기 정리 <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/promo/blog/$slug" params={{ slug: "igc-careers-after-graduation" }} className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:gap-2">졸업 후 진로·대학원 <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/promo/blog/$slug" params={{ slug: "igc-scholarships" }} className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:gap-2">장학금 정리 <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* IGC 멘토링 구분 */}
      <section className="container mt-14">
        <div className="rounded-2xl border bg-slate-50 p-8">
          <SectionHead eyebrow="함께 보면 좋아요" title="컨설팅(1회) + IGC 멘토링(4주 관리)은 별도입니다" desc="위 비용은 원서 사이클 1회 컨설팅입니다. 고1·고2부터 멘토가 플래너·생기북으로 관리받으려면 IGC 멘토링(4주 58만원)과 함께하면 효과가 큽니다." />
          <Link to="/promo/igcclass" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:gap-2">
            IGC 멘토링 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 전화 상담 배너 */}
      <section className="container mt-14">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-igc-navy p-8 text-center text-white md:p-10">
          <p className="text-lg font-semibold">견적·구성이 궁금하세요? 전화 한 통이면 됩니다</p>
          <a href={CONSULT_TEL} className="inline-flex items-center gap-2 text-3xl font-extrabold text-white hover:underline">
            <Phone className="h-7 w-7" /> {CONSULT_PHONE}
          </a>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a href={CONSULT_TEL} className="rounded-lg bg-white px-6 py-3 font-semibold text-igc-navy hover:bg-white/90">전화 상담하기</a>
            <Link to="/promo/consult" className="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10">무료 진단 신청</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mt-16">
        <SectionHead eyebrow="자주 묻는 질문" title="비용 FAQ" />
        <div className="mt-6 space-y-3">
          {[
            { q: "에세이·자소서 첨삭은 추가 비용인가요?", a: "아니요. 대학별 에세이·자소서 첨삭은 기본가에 포함됩니다. 추가 대학의 변형 첨삭도 추가 대학 비용(48만원)에 들어 있습니다." },
            { q: "에세이를 대신 써 주나요?", a: "아니요. 대필은 대학이 부정행위로 보고 합격 취소 사유가 될 수 있습니다. 주제·구성·첨삭을 1:1로 돕고, 글은 학생이 직접 씁니다." },
            { q: "전형료도 포함인가요?", a: "아니요. 각 대학이 부과하는 지원 전형료($65~80 등)는 실비로 별도이며, 대학에 직접 납부합니다." },
            { q: "어학 점수가 없어도 되나요?", a: "네. 수능영어·Versant·Duolingo 등 가장 쉬운 경로를 골라 접수까지 대행합니다. 학생은 공부만 하면 됩니다." },
            { q: "합격 후 절차도 도와주나요?", a: "네. 장학금 신청, 합격 수락·보증금 납부, 기숙사 신청, 입학 전 안내까지 기본가에 포함됩니다." },
            { q: "환불 규정은요?", a: "진행 단계에 따른 환불 규정은 계약 시 서면으로 명확히 안내드립니다." },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl border p-5">
              <p className="font-bold text-igc-navy">Q. {f.q}</p>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">※ 표시 금액은 안내용이며, 학생 상황·지원 구성에 따라 최종 견적은 상담 시 확정됩니다.</p>
      </section>

      <ConsultCTA context="내 지원 구성, 비용부터 확인하세요" />
    </>
  );
}
