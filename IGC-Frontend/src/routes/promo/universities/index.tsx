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
      <Seo title="IGC 4개 대학 비교" description="스토니브룩·유타·조지메이슨·겐트 — 유형·순위·학비·정원·전형·어학·결정변수를 한 표로 비교." path="/promo/universities" />
      <PageHeader title="IGC 4개 대학 비교" desc="국적·순위·학비·전형·어학·내신 영향까지 한눈에. 행을 클릭하면 대학별 상세로 이동합니다." />
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
      <ConsultCTA context="어느 대학이 내 성적·전공에 맞을까요?" />
    </>
  );
}
