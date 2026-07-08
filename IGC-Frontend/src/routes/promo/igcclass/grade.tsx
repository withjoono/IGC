import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, GraduationCap, Sparkles, ExternalLink } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { SectionHead, IconCard, Badge } from "@/components/ui";

export const Route = createFileRoute("/promo/igcclass/grade")({
  component: SaengibookIntro,
});

const SAENGIBOOK_URL = "https://ms-front.web.app/promo";

function SaengibookIntro() {
  return (
    <>
      <Seo title="생기북 앱 소개 — 교과·생활기록부 관리" description="T스쿨 생기북: 교과 성적과 생활기록부·전공적합성을 관리하고, 전직 교수·입학사정관 시각의 분석으로 정리합니다. IGC 멘토링 연동 앱." path="/promo/igcclass/grade" />
      <PageHeader badge="IGC 멘토링 · 생기북" title="생기북 앱 소개" desc="IGC 멘토링에서 교과 성적과 생활기록부를 관리하는 앱입니다." />

      <section className="container">
        <div className="rounded-2xl border bg-slate-50 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="mint">T스쿨 위성앱</Badge>
            <Badge tone="amber">IGC 멘토링 연동</Badge>
          </div>
          <p className="mt-3 text-foreground/80">
            <b>생기북</b>은 교과 성적과 생활기록부를 관리하고, 활동·수상·세특을 전공 적합성 스토리로 정리하는 앱입니다.
            IGC는 성적 하나가 아니라 학생 전체를 보는 평가라, 이렇게 정리한 기록이 에세이·추천서·서류의 근거가 됩니다.
          </p>
        </div>
      </section>

      <section className="container mt-12">
        <SectionHead eyebrow="주요 기능" title="이런 걸 할 수 있어요" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <IconCard icon={<GraduationCap className="h-5 w-5" />} title="교과 성적 관리" desc="내신·교과 성취를 기록하고 추이를 관리합니다." />
          <IconCard icon={<BookMarked className="h-5 w-5" />} title="생기부·전공적합성" desc="활동·수상·세특을 전공 스토리로 정리해 서류 근거로 씁니다." />
          <IconCard icon={<Sparkles className="h-5 w-5" />} title="전문가 시각 분석" desc="전직 교수·입학사정관 관점의 평가로 기록의 방향을 잡습니다." />
        </div>
      </section>

      <section className="container mt-10">
        <a href={SAENGIBOOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:underline">
          생기북 앱 바로가기(ms-front.web.app) <ExternalLink className="h-4 w-4" />
        </a>
        <span className="mx-3 text-muted-foreground">·</span>
        <Link to="/promo/igcclass/study" className="text-sm font-semibold text-igc-blue hover:underline">스터디플래너 앱 소개 →</Link>
      </section>

      <ConsultCTA context="IGC 멘토링, 상담으로 시작하세요" />
    </>
  );
}
