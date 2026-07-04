import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, LineChart, FlaskConical, ExternalLink } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { SectionHead, IconCard, Badge } from "@/components/ui";

export const Route = createFileRoute("/promo/igcclass/grade")({
  component: GradeClass,
});

function GradeClass() {
  return (
    <>
      <Seo title="IGC반 성적관리 · 생기북·모고모고" description="생기북으로 생기부·전공적합성 관리, 모고모고로 모의고사 성적 추이 추적. IGC 정성·정량 평가에 맞춘 성적관리반." path="/promo/igcclass/grade" />
      <PageHeader badge="IGC반 · 성적관리 · 유료" title="성적관리 · 생기북·모고모고" desc="IGC 홀리스틱 리뷰에 대비해 기록(정성)과 성적 추이(정량)를 함께 관리합니다." />

      <section className="container">
        <div className="rounded-2xl border bg-slate-50 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="amber">유료 프로그램</Badge>
            <Badge tone="mint">생기북 · 모고모고 연동</Badge>
          </div>
          <p className="mt-3 text-foreground/80">
            <b>생기북</b>으로 생기부·전공적합성 스토리를 정리하고, <b>모고모고</b>로 모의고사 성적 추이를 데이터로 추적해 "성장 궤적"을 증빙합니다.
          </p>
        </div>
      </section>

      <section className="container mt-12">
        <SectionHead eyebrow="관리 항목" title="이렇게 관리합니다" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <IconCard icon={<BookMarked className="h-5 w-5" />} title="생기부·전공적합성" desc="활동·수상·세특을 전공 스토리로 정리해 에세이·추천서 근거로 씁니다." />
          <IconCard icon={<LineChart className="h-5 w-5" />} title="성적 추이 추적" desc="모의고사 성적을 데이터화해 상승 궤적을 만들고 약점을 보완합니다." />
          <IconCard icon={<FlaskConical className="h-5 w-5" />} title="자체시험 과목 보강" desc="겐트 수학·화학 등 자체시험 대비 과목의 성취를 집중 점검합니다." />
        </div>
      </section>

      <section className="container mt-10">
        <a href="https://ms-front.web.app/promo" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:underline">
          생기북 앱 살펴보기 <ExternalLink className="h-4 w-4" />
        </a>
        <span className="mx-3 text-muted-foreground">·</span>
        <a href="https://mogomogo.kr/promo" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:underline">
          모고모고 앱 <ExternalLink className="h-4 w-4" />
        </a>
        <span className="mx-3 text-muted-foreground">·</span>
        <Link to="/promo/igcclass/study" className="text-sm font-semibold text-igc-blue hover:underline">학습관리반 보기 →</Link>
      </section>

      <ConsultCTA context="성적관리반, 상담으로 등록하세요" />
    </>
  );
}
