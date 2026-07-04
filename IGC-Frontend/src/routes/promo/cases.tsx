import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui";
import { CASES } from "@/data/programs";

export const Route = createFileRoute("/promo/cases")({
  component: Cases,
});

function Cases() {
  return (
    <>
      <Seo title="IGC 합격 사례" description="내신 4·5등급, 어학 미제출에서도 합격한 실제 IGC 합격 사례. 성적이 아니라 전략이 만든 결과." path="/promo/cases" />
      <PageHeader badge="합격 사례" title="성적이 아니라 전략이 만든 결과" desc="내신 중하위권·어학 부담 학생들이 어떤 전략으로 합격했는지 익명 사례로 정리했습니다." />

      <section className="container grid gap-4 md:grid-cols-2">
        {CASES.map((c, i) => (
          <div key={i} className="rounded-2xl border p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="navy">{c.gpa}</Badge>
              <Badge tone="blue">{c.english}</Badge>
            </div>
            <p className="mt-4 text-lg font-bold text-igc-navy">{c.result}</p>
            <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
              <Quote className="mt-0.5 h-4 w-4 shrink-0 text-igc-blue" /> {c.track}
            </p>
          </div>
        ))}
      </section>

      <p className="container mt-6 text-xs text-muted-foreground">※ 개인정보 보호를 위해 익명 처리한 예시이며, 합격을 보장하지 않습니다.</p>

      <ConsultCTA context="내 사례로 만들 차례입니다" />
    </>
  );
}
