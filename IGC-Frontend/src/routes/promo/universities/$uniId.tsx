import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Seo, breadcrumbLd } from "@/components/seo";
import { ConsultCTA } from "@/components/layout";
import { CampusPhoto } from "@/components/campus-photo";
import { getUniversity, DEADLINES, BLOG_POSTS } from "@/data/igc";
import { UNI_PHOTOS } from "@/data/photos";

export const Route = createFileRoute("/promo/universities/$uniId")({
  component: UniDetail,
  loader: ({ params }) => {
    const uni = getUniversity(params.uniId);
    if (!uni) throw notFound();
    return uni;
  },
});

function Row({ label, value }: { label: string; value: string }) {
  if (!value || value === "-") return null;
  return (
    <div className="grid grid-cols-1 gap-1 border-b py-3 sm:grid-cols-[160px_1fr]">
      <dt className="font-semibold text-igc-navy">{label}</dt>
      <dd className="text-foreground/80">{value}</dd>
    </div>
  );
}

function UniDetail() {
  const u = Route.useLoaderData();
  const deadlines = DEADLINES.filter((d) => d.uni === u.id);
  const guides = BLOG_POSTS.filter((p) => p.uni === u.id);
  return (
    <>
      <Seo
        title={`${u.shortName} 입시 2027 — ${u.name} 전형·어학·원서 마감일`}
        description={`인천글로벌캠퍼스(송도) ${u.name} 2027학년도 입시 정리. 전형 ${u.tracks} · 어학 기준 · 학과·정원 · 원서 마감일. 핵심 변수: ${u.decisiveFactor}.`}
        path={`/promo/universities/${u.id}`}
        jsonLd={[
          breadcrumbLd([
            { name: "IGC 대학 비교", path: "/promo/universities" },
            { name: u.name, path: `/promo/universities/${u.id}` },
          ]),
          {
            "@type": "CollegeOrUniversity",
            name: u.name,
            url: u.link,
            address: { "@type": "PostalAddress", addressLocality: "인천 연수구 송도동", addressCountry: "KR" },
          },
        ]}
      />
      <div className="container pt-10">
        <Link to="/promo/universities" className="text-sm text-igc-blue hover:underline">← 대학 비교로</Link>
        <p className="mt-4 text-sm text-muted-foreground">{u.country} {u.type} · {u.rank}</p>
        <h1 className="text-3xl font-bold text-igc-navy md:text-4xl">{u.name}</h1>
        <p className="mt-2 text-muted-foreground">{u.campus} · 학비 {u.tuition} · 정원 {u.quota}</p>
        <CampusPhoto src={UNI_PHOTOS[u.id]?.src} credit={UNI_PHOTOS[u.id]?.credit} />
      </div>

      <section className="container mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-igc-navy">전형 요강</h2>
          <dl className="mt-3">
            <Row label="입학 학기" value={u.terms} />
            <Row label="전형 종류" value={u.tracks} />
            <Row label="핵심 전형 방식" value={u.reviewStyle} />
            <Row label="공인 영어(택1)" value={u.english} />
            <Row label="영어 대체·조건부" value={u.englishAlt} />
            <Row label="자체 시험" value={u.ownExam} />
            <Row label="필수 서류" value={u.requiredDocs} />
            <Row label="선택 서류" value={u.optionalDocs} />
            <Row label="전형료" value={u.fee} />
            <Row label="특이사항" value={u.notes} />
          </dl>
          <a href={u.link} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-igc-blue hover:underline">공식 입학 페이지 →</a>
          {guides.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-igc-navy">{u.shortName} 입시 가이드</h2>
              <ul className="mt-3 space-y-2">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link to="/promo/blog/$slug" params={{ slug: g.slug }} className="block rounded-lg border p-4 transition hover:border-igc-blue">
                      <span className="font-semibold text-igc-navy">{g.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{g.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-igc-navy">학과 / 정원</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {u.majors.map((m) => (
                <li key={m.name} className="rounded-lg border p-3">
                  <div className="flex justify-between"><span className="font-medium">{m.name}</span><span className="text-muted-foreground">{m.quota}</span></div>
                  <div className="text-xs text-muted-foreground">{m.college} · {m.degree}{m.note ? ` · ${m.note}` : ""}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-igc-navy">2027 원서 마감</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {deadlines.map((d, i) => (
                <li key={i} className="flex justify-between rounded-lg border p-3">
                  <span>{d.term} · {d.stage}</span>
                  <span className="font-medium">{d.date}{d.estimated && <em className="ml-1 not-italic text-xs text-amber-600">(예상)</em>}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ConsultCTA context={`${u.shortName}, 내 성적으로 가능할까요?`} />
    </>
  );
}
