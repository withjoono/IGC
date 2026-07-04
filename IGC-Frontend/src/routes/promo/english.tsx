import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";

export const Route = createFileRoute("/promo/english")({
  component: EnglishPaths,
});

const PATHS = [
  { title: "수능영어로 대체", desc: "겐트대 2등급 / 조지메이슨 1등급 — 공인 어학 없이도 지원 가능.", tag: "수능영어" },
  { title: "TOEIC 인정", desc: "유타대는 TOEIC 695점을 공식 어학 성적으로 인정하는 드문 대학.", tag: "유타대" },
  { title: "자체 영어시험(Versant)", desc: "조지메이슨 Versant 57점으로 공인 성적 대체.", tag: "조지메이슨" },
  { title: "조건부 입학 · 집중영어", desc: "SBU 조건부입학(공인영어 면제) / GMU Patriot Plus / 유타 영어집중과정(1년).", tag: "조건부" },
  { title: "겐트대 특수", desc: "어학보다 자체 수학·화학 시험(20문항 중 14점↑)이 당락 — 이과 중하위권에게 기회.", tag: "겐트대" },
];

function EnglishPaths() {
  return (
    <>
      <Seo title="TOEFL 없이 IGC 지원하는 법 — 어학 우회로 총정리" description="수능영어 대체, TOEIC 인정, Versant, 조건부입학·집중영어까지. 어학이 부담일 때의 모든 길." path="/promo/english" />
      <PageHeader title="어학 우회로 총정리" desc="TOEFL·IELTS가 부담된다면 길은 여러 개입니다. 점수가 모자라도 지원·입학할 수 있는 경로를 모았습니다." />
      <div className="container grid gap-4 md:grid-cols-2">
        {PATHS.map((p) => (
          <div key={p.title} className="rounded-2xl border p-6">
            <span className="text-xs font-medium text-igc-blue">{p.tag}</span>
            <h3 className="mt-1 text-lg font-bold text-igc-navy">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
      <ConsultCTA context="내 어학 점수로 가능한 대학 찾기" />
    </>
  );
}
