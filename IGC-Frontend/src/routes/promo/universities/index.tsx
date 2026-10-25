import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { UNIVERSITIES } from "@/data/igc";
import { UNI_PHOTOS } from "@/data/photos";
import { UNI_GUIDES } from "@/data/uni-guides";

export const Route = createFileRoute("/promo/universities/")({
  component: Universities,
});

function Universities() {
  return (
    <>
      <Seo title="인천글로벌캠퍼스 대학 비교 — 5개 대학 학비·순위·전형 2027" description="인천글로벌캠퍼스(송도) 겐트·스토니브룩·유타·조지메이슨·FIT 5개 대학의 학비, 본교 순위, 본교 이동, 장학금, 전형·어학 기준을 한 표로 비교합니다." path="/promo/universities" />
      <PageHeader title="IGC 5개 대학 비교" desc="국적·순위·학비·전형·어학·내신 영향까지 한눈에. 행을 클릭하면 대학별 상세로 이동합니다." />

      <section className="container mb-8 max-w-3xl space-y-3 leading-relaxed text-foreground/85">
        <p>인천글로벌캠퍼스(IGC)는 인천 송도에 해외 명문대의 확장 캠퍼스를 모아 둔 교육 단지입니다. 미국 스토니브룩·유타·조지메이슨·FIT와 벨기에 겐트대가 들어와 있고, 졸업하면 모두 본교와 같은 학위를 받습니다.</p>
        <p>학비는 미국 대학 4곳이 연 $20,000~$23,550, 겐트대가 연 2,196만 원(2027-28) 수준입니다. 대부분 학업 기간 일부를 본교에서 보내며(스토니브룩 1년, 유타·조지메이슨 2학기, 겐트 1학기, FIT는 학사과정을 뉴욕·밀라노에서), 수업은 모두 영어로 진행됩니다. 기숙사는 IGC 공동 기숙사(17주 기준 2인실 약 128만 원, 1인실 약 191만 원)를 함께 씁니다.</p>
      </section>

      <section className="container mb-10 grid grid-cols-2 gap-4 md:grid-cols-5">
        {UNIVERSITIES.map((u) => (
          <Link key={u.id} to="/promo/universities/$uniId" params={{ uniId: u.id }} className="group overflow-hidden rounded-2xl border transition hover:border-igc-blue hover:shadow-md">
            <img src={UNI_PHOTOS[u.id]?.src} alt={`${u.shortName} 본교`} loading="lazy" className="aspect-video w-full border-b object-cover" />
            <div className="p-3">
              <p className="text-sm font-bold text-igc-navy">{u.shortName}</p>
              <p className="text-xs text-muted-foreground">{u.country} · {u.rank}</p>
            </div>
          </Link>
        ))}
      </section>

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
              ["대표 장학금", (u) => { const it = UNI_GUIDES[u.id]?.scholarships?.items[0]; return it ? `${it.name}: ${it.detail}` : "-"; }],
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
