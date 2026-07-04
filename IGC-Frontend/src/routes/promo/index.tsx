import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, GraduationCap, Globe2, Sparkles, CalendarCheck, LineChart } from "lucide-react";
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
        description="IGC 4개 대학(스토니브룩·유타·조지메이슨·겐트) 전형·학과·2027 원서 마감일을 한눈에. 내신·어학 합격 가능성 진단과 무료 1:1 상담, 유료 IGC반."
        path="/promo"
      />

      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="container py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-igc-blue/10 px-3 py-1 text-sm text-igc-blue">
            <Sparkles className="h-4 w-4" /> 송도 글로벌 명문대 입시, 정보부터 합격까지
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-igc-navy md:text-5xl">
            내신이 전부가 아닙니다.
            <br />
            IGC는 <span className="text-igc-blue">가능성</span>을 봅니다.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            수능이 아닌 성장과 적합성으로 평가하는 인천글로벌캠퍼스. 4개 대학 전형·2027 마감일·합격 전략을 한곳에서 확인하고,
            T스쿨 데이터 컨설팅으로 합격까지 동행합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/promo/consult" className="inline-flex items-center gap-2 rounded-lg bg-igc-blue px-6 py-3 font-semibold text-white hover:bg-igc-navy">
              무료 입시 진단 신청 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/promo/diagnosis" className="rounded-lg border px-6 py-3 font-semibold text-igc-navy hover:bg-slate-50">
              1분 합격 가능성 진단
            </Link>
          </div>
        </div>
      </section>

      <section className="container -mt-6">
        <StatBand items={[
          { value: "4개 대학", label: "IGC 전형 분석" },
          { value: "2027", label: "원서 마감 총정리" },
          { value: "내신 4·5등급", label: "합격 전략" },
          { value: "T스쿨 앱", label: "학습·성적 관리" },
        ]} />
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

      {/* IGC반 (유료) 티저 */}
      <section className="container py-14">
        <div className="rounded-3xl bg-igc-navy p-8 text-white md:p-12">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">IGC반 · 유료 프로그램</span>
          <h2 className="mt-4 text-2xl font-bold md:text-3xl">준비까지 T스쿨이 관리합니다</h2>
          <p className="mt-3 max-w-2xl text-white/80">스터디플래너로 학습관리, 생기북·모고모고로 성적관리. IGC 지원을 매달 체계적으로 관리하는 유료 반입니다.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link to="/promo/igcclass/study" className="group rounded-2xl bg-white/10 p-5 hover:bg-white/15">
              <CalendarCheck className="h-5 w-5" />
              <p className="mt-3 font-bold">학습관리 · 스터디플래너</p>
              <p className="mt-1 text-sm text-white/70">마감 역산 플랜 + 주간 코칭</p>
            </Link>
            <Link to="/promo/igcclass/grade" className="group rounded-2xl bg-white/10 p-5 hover:bg-white/15">
              <LineChart className="h-5 w-5" />
              <p className="mt-3 font-bold">성적관리 · 생기북·모고모고</p>
              <p className="mt-1 text-sm text-white/70">생기부·전공적합성 + 성적 추이</p>
            </Link>
          </div>
          <Link to="/promo/igcclass" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white hover:gap-2">
            IGC반 요금·구성 보기 <ArrowRight className="h-4 w-4" />
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
