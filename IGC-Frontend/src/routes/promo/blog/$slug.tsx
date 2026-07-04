import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Seo } from "@/components/seo";
import { ConsultCTA } from "@/components/layout";
import { Figure } from "@/components/ui";
import { BLOG_POSTS } from "@/data/igc";

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
      <Seo title={post.title} description={post.excerpt} path={`/promo/blog/${post.slug}`} />
      <article className="container max-w-3xl pt-10">
        <Link to="/promo/blog" className="text-sm text-igc-blue hover:underline">← 블로그 목록</Link>
        <span className="mt-4 block text-sm font-medium text-igc-blue">{post.category}</span>
        <h1 className="mt-1 text-3xl font-bold text-igc-navy">{post.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{post.date}</p>
        {post.cover && <Figure src={post.cover} caption="송도 인천글로벌캠퍼스 (예시 이미지 — 실제 사진으로 교체)" className="mt-6" />}
        <div className="mt-6 text-lg leading-relaxed text-foreground/90">
          {post.body.map((para, i) => (
            <div key={i}>
              <p className="mb-5">{para}</p>
              {post.figures?.filter((f) => f.afterParagraph === i).map((f, fi) => (
                <Figure key={fi} src={f.src} caption={f.caption} />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 rounded-xl bg-slate-50 p-5">
          <Link to="/promo/diagnosis" className="rounded-lg border px-5 py-2 text-sm font-semibold text-igc-navy hover:bg-white">내 경우엔? 1분 진단</Link>
          <Link to="/promo/consult" className="rounded-lg bg-igc-blue px-5 py-2 text-sm font-semibold text-white hover:bg-igc-navy">무료 1:1 상담</Link>
        </div>
      </article>
      <ConsultCTA />
    </>
  );
}
