import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, GraduationCap, Globe2, Sparkles, CalendarCheck, LineChart, ShieldCheck, PackageCheck, Phone } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA } from "@/components/layout";
import { StatBand } from "@/components/ui";
import { UNIVERSITIES, DEADLINES, BLOG_POSTS } from "@/data/igc";

export const Route = createFileRoute("/promo/")({
  component: Landing,
});

function daysLeft(iso: string) {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

function Landing() {
  const upcoming = [...DEADLINES]
    .filter((d) => daysLeft(d.date) >= 0)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .slice(0, 4);

  return (
    <>
      <Seo
        title="인천글로벌캠퍼스(IGC) 입시 정보·컨설팅"
        description="IGC 4개 대학(스토니브룩·유타·조지메이슨·겐트) 전형·학과·2027 원서 마감일을 한눈에. 내신·어학 합격 가능성 진단과 무료 1:1 상담, IGC 멘토링."
        path="/promo"
      />

      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="container py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-igc-blue/10 px-3 py-1 text-sm text-igc-blue">
            <Sparkles className="h-4 w-4" /> 학생은 수능만, 입시는 우리가 다
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-igc-navy md:text-5xl">
            학생은 <span className="text-igc-blue">수능만</span> 준비하세요.
            <br />
            나머지 입시는 우리가 다 합니다.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            IGC는 수시 6회에 안 걸리는 보험 한 장 — 미리 들어두고 수시는 소신 지원하세요.
            어학 성적이 없어도 수능영어·Versant 하나면 되고, 전형 선택부터 생기부·에세이·원서·마감까지 전부 대행합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/promo/consult" className="inline-flex items-center gap-2 rounded-lg bg-igc-blue px-6 py-3 font-semibold text-white hover:bg-igc-navy">
              무료 입시 진단 신청 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/promo/diagnosis" className="rounded-lg border px-6 py-3 font-semibold text-igc-navy hover:bg-slate-50">
              1분 합격 가능성 진단
            </Link>
          </div>
          <a href="tel:01025187139" className="mt-5 inline-flex items-center gap-2 text-lg font-bold text-igc-navy">
            <Phone className="h-5 w-5 text-igc-blue" /> 상담 전화 <span className="text-igc-blue">010-2518-7139</span>
          </a>
        </div>
      </section>

      <section className="container -mt-6">
        <StatBand items={[
          { value: "올인원", label: "전 과정 대행" },
          { value: "수시 6회 밖", label: "보험 한 장" },
          { value: "어학 6경로", label: "점수 없어도 OK" },
          { value: "학습·성적", label: "매달 관리" },
        ]} />
      </section>

      {/* 3대 강점 */}
      <section className="container py-14">
        <div className="text-center">
          <p className="text-sm font-semibold text-igc-blue">WHY T스쿨 IGC</p>
          <h2 className="mt-1 text-2xl font-bold text-igc-navy md:text-3xl">맡기면 끝나는, 세 가지 이유</h2>
          <p className="mt-2 text-muted-foreground">경쟁사는 원서 대행에서 끝납니다. 우리는 편리·실력·안전을 모두 드립니다.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link to="/promo/english" className="group rounded-2xl border-2 border-igc-blue/20 bg-gradient-to-br from-igc-blue/5 to-white p-6 transition hover:border-igc-blue hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-blue/10 text-igc-blue"><PackageCheck className="h-5 w-5" /></div>
            <p className="mt-4 text-xs font-semibold text-igc-blue">① 올인원 완전 대행</p>
            <h3 className="mt-1 text-lg font-bold text-igc-navy">학생은 공부만 하세요</h3>
            <p className="mt-2 text-sm text-muted-foreground">전형 선택·어학 최소경로·생기부·에세이·원서·마감까지 전부 대행. 영어 점수 없어도 6가지 길.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-igc-blue group-hover:gap-2">올인원 서비스 <ArrowRight className="h-3.5 w-3.5" /></span>
          </Link>
          <Link to="/promo/igcclass" className="group rounded-2xl border-2 border-igc-blue/20 bg-gradient-to-br from-igc-mint/5 to-white p-6 transition hover:border-igc-mint hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-mint/15 text-igc-mint"><LineChart className="h-5 w-5" /></div>
            <p className="mt-4 text-xs font-semibold text-igc-mint">② 학습·성적 관리 병행</p>
            <h3 className="mt-1 text-lg font-bold text-igc-navy">멘토가 매주 관리합니다</h3>
            <p className="mt-2 text-sm text-muted-foreground">멘토가 스터디플래너로 IGC 준비를, 생기북 앱으로 교과·생기부를 관리 — 합격을 '빌드'합니다.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-igc-mint group-hover:gap-2">IGC 멘토링 보기 <ArrowRight className="h-3.5 w-3.5" /></span>
          </Link>
          <Link to="/promo/parallel" className="group rounded-2xl border-2 border-igc-blue/20 bg-gradient-to-br from-igc-navy/5 to-white p-6 transition hover:border-igc-navy hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-navy/10 text-igc-navy"><ShieldCheck className="h-5 w-5" /></div>
            <p className="mt-4 text-xs font-semibold text-igc-navy">③ 국내 수시 병행</p>
            <h3 className="mt-1 text-lg font-bold text-igc-navy">수시 6회 밖 보험 한 장</h3>
            <p className="mt-2 text-sm text-muted-foreground">IGC는 수시 6장에 안 들어갑니다. 보험 미리 확보하고 수시는 소신 지원하세요.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-igc-navy group-hover:gap-2">수시 병행 전략 <ArrowRight className="h-3.5 w-3.5" /></span>
          </Link>
        </div>
      </section>

      <section className="container py-14">
        <SectionTitle icon={<Globe2 className="h-5 w-5" />} title="IGC 4개 대학, 한눈에" sub="성격이 전혀 다른 4개 대학. 내 성적·전공에 맞는 곳을 찾으세요." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {UNIVERSITIES.map((u) => (
            <Link key={u.id} to="/promo/universities/$uniId" params={{ uniId: u.id }} className="group rounded-2xl border p-5 transition hover:border-igc-blue hover:shadow-md">
              <p className="text-xs text-muted-foreground">{u.country} · {u.rank}</p>
              <h3 className="mt-1 text-lg font-bold text-igc-navy">{u.shortName}</h3>
              <dl className="mt-3 space-y-1 text-sm text-foreground/80">
                <div className="flex justify-between"><dt className="text-muted-foreground">결정 변수</dt><dd className="text-right font-medium">{u.decisiveFactor}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">내신 영향</dt><dd className="text-right">{u.gpaImpact}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">학비</dt><dd className="text-right">{u.tuition}</dd></div>
              </dl>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-igc-blue group-hover:gap-2">상세 보기 <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-6"><Link to="/promo/universities" className="text-sm font-medium text-igc-blue hover:underline">전체 비교표 보기 →</Link></div>
      </section>

      <section className="container py-14">
        <SectionTitle icon={<CalendarClock className="h-5 w-5" />} title="다가오는 2027 원서 마감" sub="우선지원은 빠를수록 유리 — 정원 충원 시 조기 마감됩니다." />
        <div className="mt-6 overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-muted-foreground">
              <tr><th className="p-3">대학</th><th className="p-3">학기 / 단계</th><th className="p-3">마감일</th><th className="p-3 text-right">D-day</th></tr>
            </thead>
            <tbody>
              {upcoming.map((d, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium">{d.uniName}</td>
                  <td className="p-3 text-foreground/80">{d.term} · {d.stage}</td>
                  <td className="p-3">{d.date}{d.estimated && <span className="ml-1 text-xs text-amber-600">(예상)</span>}</td>
                  <td className="p-3 text-right font-semibold text-igc-blue">D-{daysLeft(d.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4"><Link to="/promo/deadlines" className="text-sm font-medium text-igc-blue hover:underline">전체 마감일 캘린더 →</Link></div>
      </section>

      {/* IGC 멘토링 (유료) 티저 */}
      <section className="container py-14">
        <div className="rounded-3xl bg-igc-navy p-8 text-white md:p-12">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">IGC 멘토링 · 유료</span>
          <h2 className="mt-4 text-2xl font-bold md:text-3xl">멘토가 IGC 준비를 매주 관리합니다</h2>
          <p className="mt-3 max-w-2xl text-white/80">전담 멘토가 스터디플래너로 IGC 준비를, 생기북 앱으로 교과·생기부를 관리합니다. 4주 기준 58만원.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link to="/promo/igcclass/study" className="group rounded-2xl bg-white/10 p-5 hover:bg-white/15">
              <CalendarCheck className="h-5 w-5" />
              <p className="mt-3 font-bold">IGC 준비 관리 · 스터디플래너</p>
              <p className="mt-1 text-sm text-white/70">마감 역산 플랜 + 주간 점검</p>
            </Link>
            <Link to="/promo/igcclass/grade" className="group rounded-2xl bg-white/10 p-5 hover:bg-white/15">
              <LineChart className="h-5 w-5" />
              <p className="mt-3 font-bold">교과·생기부 관리 · 생기북</p>
              <p className="mt-1 text-sm text-white/70">교과 성적 + 생기부·전공적합성</p>
            </Link>
          </div>
          <Link to="/promo/igcclass" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white hover:gap-2">
            IGC 멘토링 요금·구성 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="container py-14">
        <SectionTitle icon={<GraduationCap className="h-5 w-5" />} title="입시 정보 블로그" sub="검색에서 가장 많이 찾는 IGC 입시 질문에 답합니다." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {BLOG_POSTS.map((p) => (
            <Link key={p.slug} to="/promo/blog/$slug" params={{ slug: p.slug }} className="rounded-2xl border p-5 transition hover:border-igc-blue hover:shadow-md">
              <span className="text-xs font-medium text-igc-blue">{p.category}</span>
              <h3 className="mt-1 font-bold text-igc-navy">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <ConsultCTA />
    </>
  );
}

function SectionTitle({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-igc-blue">{icon}<h2 className="text-xl font-bold text-igc-navy">{title}</h2></div>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}
