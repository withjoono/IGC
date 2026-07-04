import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, LineChart, ArrowRight } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { SectionHead, PricingCard } from "@/components/ui";
import { IGC_PLANS } from "@/data/programs";

export const Route = createFileRoute("/promo/igcclass/")({
  component: IgcClass,
});

function IgcClass() {
  return (
    <>
      <Seo title="IGC반 — 유료 학습·성적관리 프로그램" description="T스쿨 IGC반: 스터디플래너로 학습관리, 생기북·모고모고로 성적관리. IGC 지원을 매달 체계적으로 관리하는 유료 프로그램." path="/promo/igcclass" />
      <PageHeader badge="IGC반 · 유료 프로그램" title="IGC 지원, 매달 관리받으세요" desc="일회성 상담을 넘어, T스쿨 앱으로 학습과 성적을 지속 관리하는 유료 프로그램입니다." />

      {/* 두 축 소개 */}
      <section className="container grid gap-4 md:grid-cols-2">
        <Link to="/promo/igcclass/study" className="group rounded-2xl border p-6 transition hover:border-igc-blue hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-blue/10 text-igc-blue"><CalendarCheck className="h-5 w-5" /></div>
          <h3 className="mt-4 text-lg font-bold text-igc-navy">학습관리 · 스터디플래너</h3>
          <p className="mt-2 text-sm text-muted-foreground">어학·자체시험·원서 마감을 역산한 학습 플랜과 주간 코칭.</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-igc-blue group-hover:gap-2">자세히 <ArrowRight className="h-3.5 w-3.5" /></span>
        </Link>
        <Link to="/promo/igcclass/grade" className="group rounded-2xl border p-6 transition hover:border-igc-blue hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-mint/15 text-igc-mint"><LineChart className="h-5 w-5" /></div>
          <h3 className="mt-4 text-lg font-bold text-igc-navy">성적관리 · 생기북·모고모고</h3>
          <p className="mt-2 text-sm text-muted-foreground">생기부·전공적합성 관리와 모의고사 성적 추이 추적.</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-igc-blue group-hover:gap-2">자세히 <ArrowRight className="h-3.5 w-3.5" /></span>
        </Link>
      </section>

      {/* 요금제 */}
      <section className="container mt-16">
        <SectionHead center eyebrow="PRICING" title="IGC반 요금제" desc="목표와 준비 상황에 맞춰 선택하세요. 종합반은 컨설팅까지 포함합니다." />
        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-3">
          {IGC_PLANS.map((p) => (
            <PricingCard key={p.id} name={p.name} price={p.price} period={p.period} note={p.note} features={p.features} featured={p.featured} ctaTo="/promo/consult" ctaLabel="상담으로 등록" />
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">※ 표시 금액은 예시이며, 실제 요금·할인은 상담 시 안내됩니다.</p>
      </section>

      <ConsultCTA context="IGC반, 상담으로 시작하세요" />
    </>
  );
}
