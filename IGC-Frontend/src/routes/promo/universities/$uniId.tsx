import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Seo, breadcrumbLd } from "@/components/seo";
import { ConsultCTA } from "@/components/layout";
import { CampusPhoto } from "@/components/campus-photo";
import { getUniversity, DEADLINES, BLOG_POSTS } from "@/data/igc";
import { UNI_GUIDES } from "@/data/uni-guides";
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

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 border-t pt-8">
      <h2 className="text-2xl font-bold text-igc-navy">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-foreground/85">{children}</div>
    </section>
  );
}

function Paras({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <>
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
}

function UniDetail() {
  const u = Route.useLoaderData();
  const g = UNI_GUIDES[u.id];
  const deadlines = DEADLINES.filter((d) => d.uni === u.id);
  const guides = BLOG_POSTS.filter((p) => p.uni === u.id || p.unis?.includes(u.id));
  const englishFirst = u.english.split(" / ")[0];

  // 목차 — 내용이 있는 섹션만
  const toc: [string, string][] = [
    ...(g ? ([["about", "어떤 대학인가"], ["cost", "학비·총비용"]] as [string, string][]) : []),
    ...(g?.scholarships?.items.length ? ([["scholarship", "장학금"]] as [string, string][]) : []),
    ...(g?.standing.length ? ([["standing", "순위·학위"]] as [string, string][]) : []),
    ["admissions", "전형·어학"],
    ...(g?.grades.length ? ([["grades", "내신·수능 기준"]] as [string, string][]) : []),
    ["majors", "학과"],
    ...(g?.homeCampus.length ? ([["home", "본교 이동·학위"]] as [string, string][]) : []),
    ...(g?.careers?.length ? ([["careers", "졸업 후 진로"]] as [string, string][]) : []),
    ...(g?.campusLife?.length ? ([["life", "캠퍼스 생활"]] as [string, string][]) : []),
    ["deadlines", "2027 원서 마감"],
    ...(g?.faq.length ? ([["faq", "자주 묻는 질문"]] as [string, string][]) : []),
  ];

  const jsonLd: Record<string, unknown>[] = [
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
  ];
  if (g?.faq.length) {
    jsonLd.push({
      "@type": "FAQPage",
      mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return (
    <>
      <Seo
        title={`${u.shortName} 입시 2027 — 학비·장학금·전형·어학·원서 마감일`}
        description={
          g
            ? `${u.name} 완전 가이드: ${g.tagline} 2027학년도 학비·장학금·전형·어학 기준·학과·본교 이동·마감일 정리.`
            : `인천글로벌캠퍼스(송도) ${u.name} 2027학년도 입시 정리. 전형 ${u.tracks} · 어학 기준 · 학과·정원 · 원서 마감일. 핵심 변수: ${u.decisiveFactor}.`
        }
        path={`/promo/universities/${u.id}`}
        jsonLd={jsonLd}
      />
      <div className="container pt-10">
        <Link to="/promo/universities" className="text-sm text-igc-blue hover:underline">← 대학 비교로</Link>
        <p className="mt-4 text-sm text-muted-foreground">{u.country} {u.type} · {u.rank}</p>
        <h1 className="text-3xl font-bold text-igc-navy md:text-4xl">{u.name}</h1>
        {g && <p className="mt-3 max-w-3xl text-lg text-foreground/80">{g.tagline}</p>}
        <CampusPhoto src={UNI_PHOTOS[u.id]?.src} credit={UNI_PHOTOS[u.id]?.credit} />

        {/* 한눈에 요약 */}
        <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            ["학비", u.tuition],
            ["정원", u.quota],
            ["입학 학기", u.terms],
            ["어학(예)", englishFirst],
            ["합격 핵심", u.decisiveFactor],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border bg-slate-50 p-4">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 font-semibold text-igc-navy">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="container mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="목차" className="hidden lg:block">
          <div className="sticky top-32 rounded-xl border p-4 text-sm">
            <p className="mb-2 font-semibold text-igc-navy">목차</p>
            <ol className="space-y-1.5">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-foreground/70 hover:text-igc-blue">{label}</a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0 space-y-10">
          {g && (
            <Section id="about" title={`${u.shortName}은 어떤 대학인가`}>
              <Paras items={g.intro} />
            </Section>
          )}

          {g && (
            <Section id="cost" title={`${u.shortName} 학비·총비용`}>
              <p>{g.cost.lead}</p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-igc-navy text-left text-white">
                      <th className="p-3">항목</th>
                      <th className="p-3">금액</th>
                      <th className="p-3">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.cost.rows.map((r, i) => (
                      <tr key={r.item} className={i % 2 ? "bg-slate-50" : ""}>
                        <th className="p-3 text-left font-medium text-igc-navy">{r.item}</th>
                        <td className="p-3 font-semibold">{r.amount}</td>
                        <td className="p-3 text-foreground/70">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Paras items={g.cost.notes} />
              <p className="text-xs text-muted-foreground">기준: {g.cost.asOf}. 학비는 매년 바뀌므로 납부 전 대학 공지를 확인하세요.</p>
            </Section>
          )}

          {g?.scholarships?.items.length ? (
            <Section id="scholarship" title={`${u.shortName} 장학금`}>
              {g.scholarships.lead && <p>{g.scholarships.lead}</p>}
              <ul className="space-y-3">
                {g.scholarships.items.map((s) => (
                  <li key={s.name} className="rounded-xl border p-4">
                    <p className="font-semibold text-igc-navy">{s.name}</p>
                    <p className="mt-1 text-sm text-foreground/80">{s.detail}</p>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {g?.standing.length ? (
            <Section id="standing" title={`${u.shortName} 순위·학위`}>
              <ul className="list-disc space-y-2 pl-5">
                {g.standing.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          <Section id="admissions" title={`${u.shortName} 전형·어학 기준`}>
            <Paras items={g?.admissions} />
            <dl>
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
            <a href={u.link} target="_blank" rel="noreferrer" className="inline-block text-sm font-medium text-igc-blue hover:underline">공식 입학 페이지 →</a>
          </Section>

          {g?.grades.length ? (
            <Section id="grades" title={`${u.shortName} 내신·수능 어느 정도면 될까`}>
              <Paras items={g.grades} />
            </Section>
          ) : null}

          <Section id="majors" title={`${u.shortName} 학과·정원`}>
            <ul className="grid gap-3 md:grid-cols-2">
              {u.majors.map((m) => (
                <li key={m.name} className="rounded-xl border p-4">
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-igc-navy">{m.name}</span>
                    <span className="shrink-0 text-sm text-muted-foreground">{m.quota}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.college} · {m.degree}{m.note ? ` · ${m.note}` : ""}</p>
                  {g?.majorDetails?.[m.name] && <p className="mt-2 text-sm text-foreground/80">{g.majorDetails[m.name]}</p>}
                </li>
              ))}
            </ul>
          </Section>

          {g?.homeCampus.length ? (
            <Section id="home" title={`${u.shortName} 본교 이동·편입·학위`}>
              <Paras items={g.homeCampus} />
            </Section>
          ) : null}

          {g?.careers?.length ? (
            <Section id="careers" title={`${u.shortName} 졸업 후 진로`}>
              <Paras items={g.careers} />
            </Section>
          ) : null}

          {g?.campusLife?.length ? (
            <Section id="life" title={`${u.shortName} 캠퍼스 생활`}>
              <Paras items={g.campusLife} />
            </Section>
          ) : null}

          <Section id="deadlines" title={`${u.shortName} 2027 원서 마감일`}>
            <ul className="space-y-2 text-sm">
              {deadlines.map((d, i) => (
                <li key={i} className="flex justify-between gap-3 rounded-lg border p-3">
                  <span>{d.term} · {d.stage}</span>
                  <span className="shrink-0 font-medium">{d.date}{d.estimated && <em className="ml-1 not-italic text-xs text-amber-600">(예상)</em>}</span>
                </li>
              ))}
            </ul>
            <Link to="/promo/deadlines" className="inline-block text-sm font-medium text-igc-blue hover:underline">5개 대학 마감일 한눈에 보기 →</Link>
          </Section>

          {g?.faq.length ? (
            <Section id="faq" title={`${u.shortName} 자주 묻는 질문`}>
              <div className="space-y-3">
                {g.faq.map((f) => (
                  <details key={f.q} className="rounded-xl border p-4" open>
                    <summary className="cursor-pointer font-semibold text-igc-navy">{f.q}</summary>
                    <p className="mt-2 text-foreground/80">{f.a}</p>
                  </details>
                ))}
              </div>
            </Section>
          ) : null}

          {guides.length > 0 && (
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold text-igc-navy">{u.shortName} 입시 가이드</h2>
              <ul className="mt-4 space-y-2">
                {guides.map((p) => (
                  <li key={p.slug}>
                    <Link to="/promo/blog/$slug" params={{ slug: p.slug }} className="block rounded-lg border p-4 transition hover:border-igc-blue">
                      <span className="font-semibold text-igc-navy">{p.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{p.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {g && (
            <section className="border-t pt-6 text-xs text-muted-foreground">
              <p className="font-semibold">출처 (확인일 {g.verifiedAt})</p>
              <ul className="mt-2 space-y-1">
                {g.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-igc-blue hover:underline">{s.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <ConsultCTA context={`${u.shortName}, 내 성적으로 가능할까요?`} />
    </>
  );
}
