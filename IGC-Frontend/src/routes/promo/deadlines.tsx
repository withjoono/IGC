import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { DEADLINES, UNIVERSITIES, type UniId } from "@/data/igc";

export const Route = createFileRoute("/promo/deadlines")({
  component: Deadlines,
});

function daysLeft(iso: string) {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

function Deadlines() {
  const [filter, setFilter] = useState<UniId | "all">("all");
  const rows = [...DEADLINES]
    .filter((d) => filter === "all" || d.uni === filter)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return (
    <>
      <Seo title="2027 IGC 원서 마감일 총정리" description="겐트·스토니브룩·유타·조지메이슨 2027학년도 전 학기·전형 단계별 원서 마감일. 임박순 정렬." path="/promo/deadlines" />
      <PageHeader title="2027 원서 마감일" desc="4개 대학 전 일정을 임박순으로. 우선지원은 빠를수록 장학·기숙사에서 유리하고, 정원 충원 시 조기 마감됩니다." />

      <div className="container flex flex-wrap gap-2">
        <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>전체</FilterBtn>
        {UNIVERSITIES.map((u) => (
          <FilterBtn key={u.id} active={filter === u.id} onClick={() => setFilter(u.id)}>{u.shortName}</FilterBtn>
        ))}
      </div>

      <div className="container mt-6 overflow-hidden rounded-2xl border">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-muted-foreground">
            <tr><th className="p-3">대학</th><th className="p-3">학기</th><th className="p-3">단계</th><th className="p-3">마감일</th><th className="p-3 text-right">D-day</th></tr>
          </thead>
          <tbody>
            {rows.map((d, i) => {
              const dl = daysLeft(d.date);
              return (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium">{d.uniName}</td>
                  <td className="p-3 text-foreground/80">{d.term}</td>
                  <td className="p-3 text-foreground/80">{d.stage}{d.note && <span className="block text-xs text-muted-foreground">{d.note}</span>}</td>
                  <td className="p-3">{d.date}{d.estimated && <span className="ml-1 text-xs text-amber-600">(예상·변동가능)</span>}</td>
                  <td className="p-3 text-right font-semibold">{dl >= 0 ? <span className="text-igc-blue">D-{dl}</span> : <span className="text-muted-foreground">마감</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="container mt-3 text-xs text-muted-foreground">※ 유타대 2027 일정은 대학 미발표로 직전 사이클 기준 예상치입니다. 확정 시 갱신됩니다.</p>

      <ConsultCTA context="내 학기 마감일, 놓치지 않게 챙겨드립니다" />
    </>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${active ? "bg-igc-blue text-white" : "border text-foreground/70 hover:border-igc-blue"}`}>
      {children}
    </button>
  );
}
