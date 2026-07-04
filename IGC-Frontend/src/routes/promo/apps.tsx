import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { TSCHOOL_APPS } from "@/data/igc";

export const Route = createFileRoute("/promo/apps")({
  component: AppsPage,
});

function AppsPage() {
  return (
    <>
      <Seo title="T스쿨 앱으로 IGC 준비하기" description="입시검색·스터디플래너·생기북·모고모고로 IGC 지원을 단계별로 관리. 정보는 사이트에서, 실행은 앱에서, 전략은 컨설턴트가." path="/promo/apps" />
      <PageHeader title="T스쿨 앱으로 준비하기" desc="정보는 사이트에서, 실행은 앱에서, 전략은 컨설턴트가. 각 준비 단계에 맞는 T스쿨 앱을 연결했습니다." />
      <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TSCHOOL_APPS.map((a) => (
          <a key={a.name} href={a.url} target="_blank" rel="noreferrer" className="group rounded-2xl border p-5 transition hover:border-igc-blue hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-igc-navy">{a.name}</h3>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-igc-blue" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{a.role}</p>
          </a>
        ))}
      </div>
      <ConsultCTA />
    </>
  );
}
