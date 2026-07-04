import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { BLOG_POSTS } from "@/data/igc";

export const Route = createFileRoute("/promo/blog/")({
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <Seo title="IGC 입시 블로그" description="인천글로벌캠퍼스 입시 정보 — 내신·어학·전형·마감일·합격 전략을 정확하게." path="/promo/blog" />
      <PageHeader title="IGC 입시 블로그" desc="검색에서 가장 많이 찾는 IGC 입시 질문에, 공식 요강 기준으로 답합니다." />
      <div className="container grid gap-4 md:grid-cols-2">
        {BLOG_POSTS.map((p) => (
          <Link key={p.slug} to="/promo/blog/$slug" params={{ slug: p.slug }} className="overflow-hidden rounded-2xl border transition hover:border-igc-blue hover:shadow-md">
            {p.cover && <img src={p.cover} alt="" loading="lazy" className="h-44 w-full border-b object-cover" />}
            <div className="p-6">
              <span className="text-xs font-medium text-igc-blue">{p.category}</span>
              <h2 className="mt-1 text-lg font-bold text-igc-navy">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <p className="mt-3 text-xs text-muted-foreground">{p.date}</p>
            </div>
          </Link>
        ))}
      </div>
      <ConsultCTA />
    </>
  );
}
