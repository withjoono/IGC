import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Target, Timer, BarChart3, ExternalLink } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { SectionHead, IconCard, Badge } from "@/components/ui";

export const Route = createFileRoute("/promo/igcclass/study")({
  component: StudyPlannerIntro,
});

const STUDYPLANNER_URL = "https://studyplanner.kr/promo";

function StudyPlannerIntro() {
  return (
    <>
      <Seo title="스터디플래너 앱 소개 — IGC 준비 관리 플랫폼" description="T스쿨 스터디플래너: 목표 마감 역산 플래닝, 공부시간 기록, 주간 점검. IGC 멘토링에서 멘토가 이 플랫폼으로 준비를 관리합니다." path="/promo/igcclass/study" />
      <PageHeader badge="IGC 멘토링 · 스터디플래너" title="스터디플래너 앱 소개" desc="IGC 멘토링에서 멘토가 IGC 준비를 관리하는 학습 플래너 플랫폼입니다." />

      <section className="container">
        <div className="rounded-2xl border bg-slate-50 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">T스쿨 위성앱</Badge>
            <Badge tone="amber">IGC 멘토링 연동</Badge>
          </div>
          <p className="mt-3 text-foreground/80">
            <b>스터디플래너</b>는 목표까지 남은 시간을 거꾸로 계산해 매일·매주 무엇을 할지 계획하고, 실제 공부 시간을 기록·분석하는 학습 관리 플랫폼입니다.
            IGC 멘토링에서는 멘토가 이 플래너로 어학·겐트 자체시험·원서 마감을 역산한 플랜을 짜고 매주 실행을 점검합니다.
          </p>
        </div>
      </section>

      <section className="container mt-12">
        <SectionHead eyebrow="주요 기능" title="이런 걸 할 수 있어요" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <IconCard icon={<CalendarDays className="h-5 w-5" />} title="마감 역산 플래닝" desc="목표 대학·시험 마감일에서 거꾸로 일정을 배치합니다." />
          <IconCard icon={<Target className="h-5 w-5" />} title="일간·주간 계획" desc="하루·한 주 학습 목표를 세우고 달성률을 관리합니다." />
          <IconCard icon={<Timer className="h-5 w-5" />} title="공부시간 기록" desc="실제 학습 시간을 측정·기록해 습관을 만듭니다." />
          <IconCard icon={<BarChart3 className="h-5 w-5" />} title="통계·리포트" desc="누적 데이터로 학습량과 추이를 한눈에 확인합니다." />
        </div>
      </section>

      <section className="container mt-10">
        <a href={STUDYPLANNER_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:underline">
          스터디플래너 바로가기(studyplanner.kr) <ExternalLink className="h-4 w-4" />
        </a>
        <span className="mx-3 text-muted-foreground">·</span>
        <Link to="/promo/igcclass/grade" className="text-sm font-semibold text-igc-blue hover:underline">생기북 앱 소개 →</Link>
      </section>

      <ConsultCTA context="IGC 멘토링, 상담으로 시작하세요" />
    </>
  );
}
