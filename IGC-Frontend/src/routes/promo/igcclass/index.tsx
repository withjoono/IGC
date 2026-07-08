import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, BookMarked, ArrowRight, ExternalLink, UserCheck, Check } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { SectionHead } from "@/components/ui";

export const Route = createFileRoute("/promo/igcclass/")({
  component: IgcMentoring,
});

const STUDYPLANNER_URL = "https://studyplanner.kr/promo";
const SAENGIBOOK_URL = "https://ms-front.web.app/promo";

const FEATURES = [
  "전담 멘토가 IGC 준비 전 과정을 함께 설계·점검",
  "스터디플래너로 어학·겐트 시험·원서 마감을 역산한 주간 플랜",
  "생기북 앱으로 교과 성적과 생활기록부를 상시 관리",
  "매주 실행 점검 + 성장 궤적 데이터로 에세이·서류 근거 축적",
];

function IgcMentoring() {
  return (
    <>
      <Seo
        title="IGC 멘토링 — 멘토가 플래너·생기북으로 관리하는 반"
        description="전담 멘토가 스터디플래너 플랫폼으로 IGC 준비를 관리하고, 교과·생기부는 생기북 앱으로 관리하는 유료 멘토링. 4주 기준 58만원."
        path="/promo/igcclass"
      />
      <PageHeader
        badge="IGC 멘토링 · 유료"
        title="IGC 준비, 멘토가 매주 관리합니다"
        desc="전담 멘토가 스터디플래너 플랫폼으로 IGC 준비를 관리하고, 교과와 생활기록부는 생기북 앱으로 관리하는 멘토링 반입니다."
      />

      {/* 두 축 소개 */}
      <section className="container grid gap-4 md:grid-cols-2">
        <Link to="/promo/igcclass/study" className="group rounded-2xl border p-6 transition hover:border-igc-blue hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-blue/10 text-igc-blue"><CalendarCheck className="h-5 w-5" /></div>
          <h3 className="mt-4 text-lg font-bold text-igc-navy">IGC 준비 관리 · 스터디플래너</h3>
          <p className="mt-2 text-sm text-muted-foreground">어학·겐트 자체시험·원서 마감을 역산한 학습 플랜을 멘토가 플래너 플랫폼으로 매주 관리합니다.</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-igc-blue group-hover:gap-2">스터디플래너 앱 소개 <ArrowRight className="h-3.5 w-3.5" /></span>
        </Link>
        <Link to="/promo/igcclass/grade" className="group rounded-2xl border p-6 transition hover:border-igc-mint hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-mint/15 text-igc-mint"><BookMarked className="h-5 w-5" /></div>
          <h3 className="mt-4 text-lg font-bold text-igc-navy">교과·생기부 관리 · 생기북</h3>
          <p className="mt-2 text-sm text-muted-foreground">교과 성적과 생활기록부·전공적합성 스토리를 생기북 앱으로 상시 관리합니다.</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-igc-mint group-hover:gap-2">생기북 앱 소개 <ArrowRight className="h-3.5 w-3.5" /></span>
        </Link>
      </section>

      {/* 멘토링이 하는 일 */}
      <section className="container mt-14">
        <SectionHead eyebrow="HOW" title="멘토가 이렇게 관리합니다" desc="일회성 상담이 아니라, 멘토가 플랫폼으로 매주 준비 과정을 관리합니다." />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f} className="flex items-start gap-2 rounded-xl border bg-white p-4 text-sm text-foreground/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-igc-mint" /> {f}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href={STUDYPLANNER_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:underline">
            스터디플래너 바로가기 <ExternalLink className="h-4 w-4" />
          </a>
          <a href={SAENGIBOOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:underline">
            생기북 앱 바로가기 <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 요금 */}
      <section className="container mt-14">
        <div className="rounded-3xl border-2 border-igc-blue p-8 text-center md:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-igc-blue/10 text-igc-blue"><UserCheck className="h-6 w-6" /></div>
          <p className="mt-4 text-sm font-semibold text-igc-blue">IGC 멘토링 요금</p>
          <p className="mt-2 text-4xl font-extrabold text-igc-navy">58<span className="text-2xl">만원</span></p>
          <p className="mt-1 text-sm text-muted-foreground">4주 기준 · 멘토 관리 + 스터디플래너 + 생기북 앱 포함</p>
          <Link to="/promo/consult" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-igc-blue px-6 py-3 font-semibold text-white hover:bg-igc-navy">
            상담으로 시작하기 <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-muted-foreground">※ 금액은 4주 단위 기준이며, 기간·구성은 상담 시 안내됩니다.</p>
        </div>
      </section>

      <ConsultCTA context="IGC 멘토링, 상담으로 시작하세요" />
    </>
  );
}
