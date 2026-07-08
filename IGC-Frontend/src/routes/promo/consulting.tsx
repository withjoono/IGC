import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Map, FileEdit, Handshake, ArrowRight } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { SectionHead, StatBand } from "@/components/ui";
import { CONSULTING_STEPS } from "@/data/programs";

export const Route = createFileRoute("/promo/consulting")({
  component: Consulting,
});

const ICONS = [Compass, Map, FileEdit, Handshake];

function Consulting() {
  return (
    <>
      <Seo title="IGC 입시 컨설팅 소개" description="내신·어학 진단부터 로드맵 설계, 에세이·서류 첨삭, 원서 제출 동행까지. T스쿨 데이터 기반 1:1 IGC 입시 컨설팅." path="/promo/consulting" />
      <PageHeader badge="컨설팅" title="데이터로 설계하는 IGC 입시 컨설팅" desc="감이 아니라 T스쿨 앱 데이터를 근거로, 진단부터 원서 제출까지 1:1로 동행합니다." />

      <section className="container">
        <StatBand items={[
          { value: "4개 대학", label: "전형 전담 분석" },
          { value: "1:1", label: "맞춤 컨설팅" },
          { value: "정성+정량", label: "학생 전체 평가 대응" },
          { value: "마감까지", label: "원서 동행" },
        ]} />
      </section>

      <section className="container mt-14">
        <SectionHead eyebrow="PROCESS" title="이렇게 준비합니다" desc="네 단계로 나눠, 지금 무엇을 해야 하는지 분명하게 안내합니다." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CONSULTING_STEPS.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <div key={s.step} className="rounded-2xl border p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-blue/10 text-igc-blue"><Icon className="h-5 w-5" /></span>
                  <span className="text-2xl font-bold text-slate-200">{s.step}</span>
                </div>
                <h3 className="mt-4 font-bold text-igc-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mt-14 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-igc-blue/20 bg-igc-blue/5 p-8">
          <SectionHead eyebrow="COST" title="컨설팅 비용은?" desc="첫 대학 98만원 / 추가 대학당 48만원. 전형 설계부터 원서 제출까지 전략적 대행." />
          <Link to="/promo/pricing" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:gap-2">
            비용·대행 범위 자세히 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-2xl border bg-slate-50 p-8">
          <SectionHead eyebrow="WHY IGC반" title="꾸준한 관리가 필요하다면, IGC반" desc="일회성 상담을 넘어 학습·성적을 매달 관리받고 싶다면 유료 IGC반으로 연결됩니다." />
          <Link to="/promo/igcclass" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:gap-2">
            IGC반 요금·구성 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <ConsultCTA context="무료 진단부터 시작하세요" />
    </>
  );
}
