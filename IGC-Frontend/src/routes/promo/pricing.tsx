import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowRight, Layers, Compass, FileEdit, Send, ClipboardCheck } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader, CONSULT_PHONE, CONSULT_TEL } from "@/components/layout";
import { SectionHead } from "@/components/ui";

export const Route = createFileRoute("/promo/pricing")({
  component: Pricing,
});

const BASE = 98; // 첫 대학 (만원)
const ADD = 48; // 추가 대학당 (만원)

const SIM = [1, 2, 3, 4, 5].map((n) => ({
  n,
  total: BASE + ADD * (n - 1),
}));

// 컨설팅이 대행하는 전 과정
const SCOPE = [
  { icon: Compass, title: "전략 설계", desc: "학생 강점·성적·어학을 진단해 5개 대학 중 최적 조합과 전형을 설계합니다. 안전·적정·도전을 배분하고, 수시 6장과 겹치지 않는 IGC 보험 포지션을 잡습니다." },
  { icon: FileEdit, title: "서류·에세이 대행", desc: "자기소개서·활동 정리·추천서 뼈대를 만들고, 대학별 요구에 맞게 변형·첨삭합니다. (뼈대는 한 번, 학교별 변형은 추가 대학마다 — 그래서 추가는 반값)" },
  { icon: Send, title: "원서 작성·제출 대행", desc: "온라인 지원서 계정 생성부터 항목 작성·서류 업로드·제출까지 대행합니다. 우선지원·얼리 타이밍을 역산해 가장 유리한 시점에 접수합니다." },
  { icon: ClipboardCheck, title: "제출 후 관리", desc: "어드미션과의 서류 확인·추가 요청 대응, 인터뷰 준비(해당 시), 합격 후 절차 안내까지 마감 관리와 함께 동행합니다." },
];

function Pricing() {
  return (
    <>
      <Seo
        title="컨설팅 비용 안내 — 첫 대학 98만 / 추가 48만"
        description="투명하게 공개하는 IGC 입시 컨설팅 요금. 전략 설계·서류·에세이·원서 제출까지 전략적 대행. 첫 대학 98만원, 추가 대학당 48만원."
        path="/promo/pricing"
      />
      <PageHeader badge="요금 안내 · 투명 공개" title="컨설팅 비용, 숨기지 않습니다" desc="첫 대학 98만원, 추가 대학당 48만원. 전형 설계부터 원서 제출까지 전 과정을 전략적으로 대행합니다." />

      {/* 핵심 가격 */}
      <section className="container">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-igc-blue p-8 text-center">
            <p className="text-sm font-semibold text-igc-blue">첫 대학</p>
            <p className="mt-2 text-4xl font-extrabold text-igc-navy">98<span className="text-2xl">만원</span></p>
            <p className="mt-2 text-sm text-muted-foreground">진단·전략 설계 + 서류·에세이 + 원서 제출 동행</p>
          </div>
          <div className="rounded-2xl border p-8 text-center">
            <p className="text-sm font-semibold text-igc-mint">추가 대학 (1개당)</p>
            <p className="mt-2 text-4xl font-extrabold text-igc-navy">+48<span className="text-2xl">만원</span></p>
            <p className="mt-2 text-sm text-muted-foreground">이미 만든 서류를 대학별로 변형·제출 — 그래서 반값</p>
          </div>
        </div>

        {/* 시뮬레이션 */}
        <div className="mt-6 overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-muted-foreground">
              <tr><th className="p-3">지원 대학 수</th><th className="p-3">구성</th><th className="p-3 text-right">총 비용</th></tr>
            </thead>
            <tbody>
              {SIM.map((s) => (
                <tr key={s.n} className="border-t">
                  <td className="p-3 font-medium text-igc-navy">{s.n}개 대학</td>
                  <td className="p-3 text-muted-foreground">98{s.n > 1 ? ` + 48 × ${s.n - 1}` : ""}만원</td>
                  <td className="p-3 text-right text-lg font-bold text-igc-blue">{s.total}만원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">※ 대학별 지원 전형료(예: $65~80)는 실비로 별도입니다. 정확한 견적은 무료 진단 후 안내드립니다.</p>
      </section>

      {/* 무엇을 대행하나 */}
      <section className="container mt-16">
        <SectionHead eyebrow="무엇을 해드리나요" title="전략 설계부터 원서 제출까지, 전략적으로 대행합니다" desc="단순 서류 대행이 아닙니다. '어느 대학·전형에, 어떤 순서로, 무엇을 강조해 낼지'를 설계하고 실행합니다." />
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
            { q: "왜 가격을 공개하나요?", a: "대부분 업체가 '상담 후 안내'로 감춥니다. 저희는 처음부터 투명하게 공개하는 것을 원칙으로 합니다." },
            { q: "전형료도 포함인가요?", a: "아니요. 각 대학이 부과하는 지원 전형료($65~80 등)는 실비로 별도이며, 결제는 지원 시 안내드립니다." },
            { q: "어학 점수가 없어도 되나요?", a: "네. 수능영어·Versant·Duolingo 등 가장 쉬운 경로를 골라 접수까지 대행합니다. 학생은 공부만 하면 됩니다." },
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
