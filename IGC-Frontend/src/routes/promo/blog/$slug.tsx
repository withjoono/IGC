import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Seo, breadcrumbLd, canonicalUrl } from "@/components/seo";
import { ConsultCTA } from "@/components/layout";
import { Figure } from "@/components/ui";
import { BLOG_POSTS, getUniversity, type BlogBlock } from "@/data/igc";

export const Route = createFileRoute("/promo/blog/$slug")({
  component: BlogPost,
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
});

function BlogPost() {
  const post = Route.useLoaderData();
  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/promo/blog/${post.slug}`}
        type="article"
        jsonLd={[
          breadcrumbLd([
            { name: "IGC 입시 블로그", path: "/promo/blog" },
            { name: post.title, path: `/promo/blog/${post.slug}` },
          ]),
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            keywords: post.keyword,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            inLanguage: "ko-KR",
            mainEntityOfPage: canonicalUrl(`/promo/blog/${post.slug}`),
            author: { "@type": "Organization", name: "T스쿨", url: "https://www.tskool.kr" },
            publisher: { "@id": "https://www.tskool.kr/#organization" },
          },
        ]}
      />
      <article className="container max-w-3xl pt-10">
        <Link to="/promo/blog" className="text-sm text-igc-blue hover:underline">← 블로그 목록</Link>
        <span className="mt-4 block text-sm font-medium text-igc-blue">{post.category}</span>
        <h1 className="mt-1 text-3xl font-bold text-igc-navy">{post.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{post.date}{post.updated && post.updated !== post.date ? ` (수정 ${post.updated})` : ""}</p>
        {post.cover && <Figure src={post.cover} caption="송도 인천글로벌캠퍼스 (예시 이미지 — 실제 사진으로 교체)" className="mt-6" />}
        <div className="mt-6 text-lg leading-relaxed text-foreground/90">
          {post.body.map((block, i) => (
            <div key={i}>
              <Block block={block} />
              {post.figures?.filter((f) => f.afterParagraph === i).map((f, fi) => (
                <Figure key={fi} src={f.src} caption={f.caption} />
              ))}
            </div>
          ))}
        </div>
        {post.sources?.length ? (
          <div className="mt-8 border-t pt-4 text-xs text-muted-foreground">
            <p className="font-semibold">출처</p>
            <ul className="mt-2 space-y-1">
              {post.sources.map((src) => (
                <li key={src.url}>
                  <a href={src.url} target="_blank" rel="noreferrer" className="hover:text-igc-blue hover:underline">{src.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {post.unis?.length ? (
          <div className="mt-8">
            <p className="text-sm font-semibold text-igc-navy">이 글에 나온 대학 자세히 보기</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {post.unis.map((id) => (
                <Link key={id} to="/promo/universities/$uniId" params={{ uniId: id }} className="rounded-full border px-4 py-1.5 text-sm text-igc-navy hover:border-igc-blue">
                  {getUniversity(id)?.shortName}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3 rounded-xl bg-slate-50 p-5">
          {post.uni && (
            <Link to="/promo/universities/$uniId" params={{ uniId: post.uni }} className="rounded-lg border px-5 py-2 text-sm font-semibold text-igc-navy hover:bg-white">전형 요강·학과·마감일 보기</Link>
          )}
          <Link to="/promo/diagnosis" className="rounded-lg border px-5 py-2 text-sm font-semibold text-igc-navy hover:bg-white">내 경우엔? 1분 진단</Link>
          <Link to="/promo/consult" className="rounded-lg bg-igc-blue px-5 py-2 text-sm font-semibold text-white hover:bg-igc-navy">무료 1:1 상담</Link>
        </div>
      </article>
      <ConsultCTA />
    </>
  );
}

function Block({ block }: { block: BlogBlock }) {
  if (typeof block === "string") return <p className="mb-5">{block}</p>;
  if ("h2" in block) return <h2 className="mb-4 mt-10 text-2xl font-bold text-igc-navy">{block.h2}</h2>;
  if ("list" in block)
    return (
      <ul className="mb-5 list-disc space-y-1.5 pl-6">
        {block.list.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    );
  if ("note" in block) return <p className="mb-5 rounded-xl bg-igc-blue/5 p-4 text-base text-foreground/80">{block.note}</p>;
  return (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-base">
        <thead>
          <tr className="bg-igc-navy text-left text-white">
            {block.table.head.map((h) => (
              <th key={h} className="p-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((r, ri) => (
            <tr key={ri} className={ri % 2 ? "bg-slate-50" : ""}>
              {r.map((c, ci) => (ci === 0 ? <th key={ci} className="p-3 text-left font-medium text-igc-navy">{c}</th> : <td key={ci} className="p-3">{c}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
