import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Target, Timer, ExternalLink } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { SectionHead, IconCard, Badge } from "@/components/ui";

export const Route = createFileRoute("/promo/igcclass/study")({
  component: StudyClass,
});

function StudyClass() {
  return (
    <>
      <Seo title="IGC반 학습관리 · 스터디플래너" description="스터디플래너 기반 IGC 학습관리반. 어학·겐트 자체시험·원서 마감을 역산한 플랜과 주간 코칭." path="/promo/igcclass/study" />
      <PageHeader badge="IGC반 · 학습관리 · 유료" title="학습관리 · 스터디플래너" desc="IGC 지원까지 남은 시간을 거꾸로 계산해, 매주 무엇을 할지 관리합니다." />

      <section className="container">
        <div className="rounded-2xl border bg-slate-50 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="amber">유료 프로그램</Badge>
            <Badge tone="blue">스터디플래너 연동</Badge>
          </div>
          <p className="mt-3 text-foreground/80">
            T스쿨 <b>스터디플래너</b>로 어학시험·겐트 자체시험·원서 마감을 역산한 학습 플랜을 만들고, 주간 점검 코칭으로 실행을 관리합니다.
          </p>
        </div>
      </section>

      <section className="container mt-12">
        <SectionHead eyebrow="관리 항목" title="이렇게 관리합니다" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <IconCard icon={<CalendarDays className="h-5 w-5" />} title="마감 역산 플랜" desc="목표 대학·학기 마감일에서 거꾸로 어학·서류·시험 일정을 배치합니다." />
          <IconCard icon={<Target className="h-5 w-5" />} title="주간 미션·점검" desc="주 단위 학습 목표를 세우고 달성률을 코칭과 함께 확인합니다." />
          <IconCard icon={<Timer className="h-5 w-5" />} title="자체시험 대비 루틴" desc="겐트 수학·화학 등 자체시험 준비를 학습 루틴에 녹입니다." />
        </div>
      </section>

      <section className="container mt-10">
        <a href="https://studyplanner.kr/promo" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:underline">
          스터디플래너 앱 살펴보기 <ExternalLink className="h-4 w-4" />
        </a>
        <span className="mx-3 text-muted-foreground">·</span>
        <Link to="/promo/igcclass/grade" className="text-sm font-semibold text-igc-blue hover:underline">성적관리반 보기 →</Link>
      </section>

      <ConsultCTA context="학습관리반, 상담으로 등록하세요" />
    </>
  );
}
