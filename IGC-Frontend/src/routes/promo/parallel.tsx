import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, ArrowUpRight, ArrowRight, TriangleAlert, Layers, GraduationCap, Globe2, Bell } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { SectionHead, Badge } from "@/components/ui";

export const Route = createFileRoute("/promo/parallel")({
  component: ParallelPage,
});

const TSUSI_URL = "https://tsusi.kr";

// 수시에 쓰는 준비 자산이 IGC에도 그대로 쓰인다 — "한 번 준비, 두 번 지원"
const SHARED_ASSETS = [
  { asset: "생활기록부·활동", app: "생기북", susi: "학생부종합 핵심 근거", igc: "학생 전체를 보는 평가 — 에세이·추천서 근거" },
  { asset: "교과 성적 추이", app: "모고모고", susi: "내신·모의고사 관리", igc: "성장 궤적 증빙 + 겐트 수학·화학 대비" },
  { asset: "학습·마감 일정", app: "스터디플래너", susi: "수시 원서·자소서 마감 관리", igc: "어학·자체시험·원서 마감 역산" },
  { asset: "어학 성적", app: "—", susi: "수능최저·특기자 전형", igc: "수능영어 대체·토익·조건부입학 우회로" },
];

const TRACKS = [
  { id: "domestic", label: "국내파", hint: "현재 주력" },
  { id: "abroad", label: "유학파", hint: "준비 중" },
] as const;

function ParallelPage() {
  const [track, setTrack] = useState<"domestic" | "abroad">("domestic");

  return (
    <>
      <Seo
        title="국내 수시 + IGC 병행 — 두 개의 합격 경로"
        description="수시 하나에 인생을 걸지 마세요. 같은 준비(생기부·성적·어학)로 국내 수시(tsusi.kr)와 IGC를 병행하는 보험식 이중 지원 전략. 국내파·유학파 투트랙."
        path="/promo/parallel"
      />
      <PageHeader
        badge="수시 병행 · 신규"
        title="국내 수시 + IGC, 두 개의 합격 경로"
        desc="수시 하나에 인생을 걸지 마세요. 같은 준비로 IGC라는 두 번째 합격 경로를 병행하는 '보험식 이중 지원' 전략입니다."
      />

      {/* 투트랙 토글 */}
      <section className="container">
        <div className="inline-flex rounded-xl border bg-slate-50 p-1">
          {TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTrack(t.id)}
              className={
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition " +
                (track === t.id ? "bg-white text-igc-navy shadow-sm" : "text-muted-foreground hover:text-igc-navy")
              }
            >
              {t.id === "domestic" ? <GraduationCap className="h-4 w-4" /> : <Globe2 className="h-4 w-4" />}
              {t.label}
              <span className={"rounded-full px-1.5 py-0.5 text-[10px] " + (t.id === "domestic" ? "bg-igc-mint/15 text-igc-mint" : "bg-amber-100 text-amber-700")}>{t.hint}</span>
            </button>
          ))}
        </div>
      </section>

      {track === "domestic" ? <DomesticTrack /> : <AbroadTrack />}

      <ConsultCTA context="내 수시 지원과 IGC, 어떻게 병행할까요?" />
    </>
  );
}

function DomesticTrack() {
  return (
    <>
      {/* 문제 공감 */}
      <section className="container mt-10">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8">
          <div className="flex items-center gap-2 text-amber-700">
            <TriangleAlert className="h-5 w-5" />
            <h2 className="text-lg font-bold">"올해 수시에 떨어지면, 내년이 막막합니다"</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-foreground/80">
            중하위권 학생의 진짜 불안은 여기 있습니다. 재수는 부담이고, 정시는 수능이라 더 불리합니다.
            그런데 IGC는 국내 수시와 <b>같은 재료(생기부·성적·어학)</b>로 준비됩니다. 추가 부담 없이,
            한 번의 준비로 <b>두 개의 합격 경로</b>를 여는 이유입니다.
          </p>
        </div>
      </section>

      {/* 수시 6회 밖 7번째 카드 */}
      <section className="container mt-12">
        <div className="rounded-3xl bg-igc-navy p-8 text-white md:p-12">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">수시 6회 밖 · 7번째 카드</span>
          <h2 className="mt-4 text-2xl font-bold md:text-3xl">IGC는 수시 6장에 들어가지 않습니다</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            국내 수시는 최대 6회. 그래서 몇 장은 '하향 안정'으로 쓰게 됩니다. 하지만 IGC(외국대학 한국캠퍼스)는 <b className="text-white">이 6회 제한 밖의 별도 전형</b>입니다.
            보험 한 장을 6회 밖에서 미리 확보하고, 아까운 수시 6장은 전부 <b className="text-white">소신·상향 지원</b>에 쓰세요.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="font-bold">수시 6장</p>
              <p className="mt-1 text-sm text-white/70">전부 소신·상향 지원</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="font-bold">+ IGC 1장</p>
              <p className="mt-1 text-sm text-white/70">6회 밖, 미리 드는 보험</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="font-bold">학생은 수능만</p>
              <p className="mt-1 text-sm text-white/70">IGC 준비는 전부 대행</p>
            </div>
          </div>
        </div>
      </section>

      {/* 리스크 분산 도식 */}
      <section className="container mt-12">
        <SectionHead eyebrow="WHY 보험" title="평가 축이 다르니, 리스크가 겹치지 않습니다" desc="한쪽이 흔들려도 다른 쪽이 살아있는 구조. 그래서 IGC가 수시의 '보험'이 됩니다." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <Badge tone="navy">국내 수시 · tsusi.kr</Badge>
            <h3 className="mt-3 font-bold text-igc-navy">내신·수능최저 중심</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
              <li>· 평가: 내신 등급, 학생부종합, 수능최저</li>
              <li>· 리스크: 내신·수능 한 번의 결과에 좌우</li>
              <li>· 결과: 불합격 시 재수·정시 부담</li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-igc-blue p-6">
            <Badge tone="blue">IGC · 보험/병행</Badge>
            <h3 className="mt-3 font-bold text-igc-navy">정성평가·수능 무관</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
              <li>· 평가: 학생 전체를 봄(성장 추이·전공 적합성·어학)</li>
              <li>· 리스크: 수시와 다른 축 → <b>리스크 분산</b></li>
              <li>· 결과: 겐트는 내신 무관·자체시험으로 별도 승부</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          두 트랙의 일정도 별도로 굴러갑니다. IGC 우선지원/얼리는 국내 수시와 겹치지 않아, <Link to="/promo/deadlines" className="font-medium text-igc-blue hover:underline">마감 캘린더</Link>로 두 일정을 한 번에 역산할 수 있습니다.
        </p>
      </section>

      {/* 한 번 준비, 두 번 지원 */}
      <section className="container mt-14">
        <SectionHead eyebrow="한 번 준비, 두 번 지원" title="수시에 쓰는 그 준비가, IGC에도 그대로 들어갑니다" desc="T스쿨 앱으로 쌓은 자산이 수시와 IGC 양쪽에 재사용됩니다. 이게 경쟁사가 만들 수 없는 효율입니다." />
        <div className="mt-6 overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-muted-foreground">
              <tr>
                <th className="p-3">준비 자산</th>
                <th className="p-3">T스쿨 앱</th>
                <th className="p-3">국내 수시에서</th>
                <th className="p-3">IGC에서</th>
              </tr>
            </thead>
            <tbody>
              {SHARED_ASSETS.map((r) => (
                <tr key={r.asset} className="border-t align-top">
                  <td className="p-3 font-medium text-igc-navy">{r.asset}</td>
                  <td className="p-3 text-igc-blue">{r.app}</td>
                  <td className="p-3 text-foreground/80">{r.susi}</td>
                  <td className="p-3 text-foreground/80">{r.igc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-igc-navy">
          <Layers className="h-4 w-4 text-igc-mint" /> 한 번의 준비 = 두 번의 지원. 준비 부담은 그대로, 합격 확률은 두 배로.
        </p>
      </section>

      {/* tsusi.kr 연동 배너 */}
      <section className="container mt-14">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-igc-navy p-6 text-white md:flex-row md:items-center md:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-igc-sky" />
            <div>
              <p className="font-bold">국내 수시는 tsusi.kr에서, IGC는 여기서 — 한 시스템으로 병행하세요</p>
              <p className="mt-1 text-sm text-white/75">tsusi.kr에서 수시 지원 설계를 시작하고, IGC 병행 전략은 무료 상담으로 이어가세요.</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <a href={TSUSI_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-igc-navy hover:bg-white/90">
              tsusi.kr 바로가기 <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link to="/promo/consult" className="inline-flex items-center gap-1 rounded-lg border border-white/50 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              병행 전략 상담 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function AbroadTrack() {
  return (
    <section className="container mt-10">
      <div className="rounded-2xl border bg-slate-50 p-8 text-center md:p-12">
        <Badge tone="amber">준비 중</Badge>
        <h2 className="mt-4 text-2xl font-bold text-igc-navy">유학파 트랙은 곧 열립니다</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          처음부터 해외를 겨냥하는 학생을 위한 트랙입니다. IGC를 발판·대안으로 삼아
          <b> 일본·미국 대학 진학</b>까지 잇는 로드맵을 준비하고 있습니다. 전용 플랫폼 오픈 시 가장 먼저 안내드릴게요.
        </p>
        <Link to="/promo/consult" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-igc-blue px-6 py-3 font-semibold text-white hover:bg-igc-navy">
          <Bell className="h-4 w-4" /> 오픈 알림 신청
        </Link>
        <p className="mt-4 text-xs text-muted-foreground">현재는 국내 수시와 병행하는 <b>국내파 트랙</b>을 우선 제공합니다.</p>
      </div>
    </section>
  );
}
