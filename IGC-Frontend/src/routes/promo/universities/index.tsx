import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { UNIVERSITIES } from "@/data/igc";

export const Route = createFileRoute("/promo/universities/")({
  component: Universities,
});

function Universities() {
  return (
    <>
      <Seo title="IGC 5개 대학 비교" description="스토니브룩·유타·조지메이슨·겐트·FIT — 유형·순위·학비·정원·전형·어학·결정변수를 한 표로 비교." path="/promo/universities" />
      <PageHeader title="IGC 5개 대학 비교" desc="국적·순위·학비·전형·어학·내신 영향까지 한눈에. 행을 클릭하면 대학별 상세로 이동합니다." />
      <div className="container overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-igc-navy text-white">
              <th className="p-3 text-left">항목</th>
              {UNIVERSITIES.map((u) => (
                <th key={u.id} className="p-3 text-left">
                  <Link to="/promo/universities/$uniId" params={{ uniId: u.id }} className="hover:underline">{u.shortName}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {([
              ["유형/순위", (u) => `${u.country} ${u.type} · ${u.rank}`],
              ["수업 장소", (u) => u.campus],
              ["연 학비", (u) => u.tuition],
              ["정원", (u) => u.quota],
              ["전형", (u) => u.tracks],
              ["결정 변수", (u) => u.decisiveFactor],
              ["내신 영향", (u) => u.gpaImpact],
              ["공인 영어", (u) => u.english],
            ] as [string, (u: typeof UNIVERSITIES[number]) => string][]).map(([label, fn], i) => (
              <tr key={label} className={i % 2 ? "bg-slate-50" : ""}>
                <th className="p-3 text-left font-semibold text-igc-navy">{label}</th>
                {UNIVERSITIES.map((u) => (
                  <td key={u.id} className="p-3 align-top text-foreground/80">{fn(u)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="container mt-4 text-xs text-muted-foreground">※ 각 대학 공식 모집요강 기준. 변동 가능 — 지원 전 공식 사이트 확인.</p>

      <section className="container mt-12">
        <h2 className="text-xl font-bold text-igc-navy">대학별 학과 · 정원</h2>
        <p className="mt-1 text-sm text-muted-foreground">각 대학이 공개한 모집 학과와 정원입니다. ‘미공개’는 대학이 학과별 정원을 발표하지 않은 경우입니다.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="bg-igc-navy text-white">
                <th className="p-3 text-left">대학</th>
                <th className="p-3 text-left">계열</th>
                <th className="p-3 text-left">학과</th>
                <th className="p-3 text-left">학위</th>
                <th className="p-3 text-left">정원</th>
              </tr>
            </thead>
            <tbody>
              {UNIVERSITIES.map((u, ui) =>
                u.majors.map((m, mi) => (
                  <tr key={u.id + m.name} className={`border-b ${ui % 2 ? "bg-slate-50" : ""}`}>
                    {mi === 0 && (
                      <th rowSpan={u.majors.length} className="p-3 text-left align-top font-semibold text-igc-navy">
                        <Link to="/promo/universities/$uniId" params={{ uniId: u.id }} className="hover:underline">{u.shortName}</Link>
                        <span className="block text-xs font-normal text-muted-foreground">총 {u.quota}</span>
                      </th>
                    )}
                    <td className="p-3 align-top text-foreground/70">{m.college}</td>
                    <td className="p-3 align-top font-medium text-foreground/90">
                      {m.name}
                      {m.note ? <span className="block text-xs font-normal text-muted-foreground">{m.note}</span> : null}
                    </td>
                    <td className="p-3 align-top text-foreground/70">{m.degree}</td>
                    <td className="p-3 align-top text-foreground/80">{m.quota}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">※ 유타대·조지메이슨은 학과별 정원을 공식 미공개. FIT은 한국뉴욕주립대(스토니브룩과 동일 학교법인) 소속으로 9월 입학만 운영합니다.</p>
      </section>

      <ConsultCTA context="어느 대학이 내 성적·전공에 맞을까요?" />
    </>
  );
}
