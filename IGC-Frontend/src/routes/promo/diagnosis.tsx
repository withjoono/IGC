import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Seo } from "@/components/seo";
import { PageHeader } from "@/components/layout";
import { UNIVERSITIES } from "@/data/igc";

export const Route = createFileRoute("/promo/diagnosis")({
  component: Diagnosis,
});

type Track = "이과" | "문과" | "예체능";

function Diagnosis() {
  const [gpa, setGpa] = useState(4);
  const [track, setTrack] = useState<Track>("이과");
  const [eng, setEng] = useState<"있음" | "낮음" | "없음">("낮음");
  const [done, setDone] = useState(false);

  // 간이 규칙 기반 가능성 진단 (정밀 진단은 상담으로 안내)
  const results = UNIVERSITIES.map((u) => {
    let score = 0;
    if (u.id === "ghent") score += track === "이과" ? 3 : -2; // 자체 수학·화학 시험
    if (u.id === "ghent") score += gpa <= 5 ? 1 : 0; // 내신 무관
    if (u.id === "sbu") score += gpa <= 3 ? 2 : gpa <= 5 ? 1 : 0;
    if (u.id === "utah" || u.id === "gmu") score += gpa <= 4 ? 2 : gpa <= 5 ? 1 : 0;
    if (eng === "있음") score += 1;
    if (eng === "없음") score += u.id === "ghent" ? 0 : -1; // 우회로 많음
    const level = score >= 3 ? "유망" : score >= 1 ? "도전 가능" : "전략 필요";
    return { u, level };
  });
  const ORDER: Record<string, number> = { 유망: 0, "도전 가능": 1, "전략 필요": 2 };
  results.sort((a, b) => ORDER[a.level] - ORDER[b.level]);

  return (
    <>
      <Seo title="IGC 합격 가능성 1분 자가진단" description="내신·계열·어학을 입력하면 지원 가능한 IGC 대학·전형을 즉시 확인. 정밀 진단은 무료 상담." path="/promo/diagnosis" />
      <PageHeader title="합격 가능성 1분 진단" desc="내신 등급·계열·어학 상황을 고르면 지원 전략의 방향을 보여드립니다. (간이 진단 — 정밀 분석은 1:1 상담)" />

      <div className="container grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 rounded-2xl border p-6">
          <Field label={`내신 등급: ${gpa}등급`}>
            <input type="range" min={1} max={7} value={gpa} onChange={(e) => setGpa(+e.target.value)} className="w-full accent-igc-blue" />
          </Field>
          <Field label="계열">
            <div className="flex gap-2">
              {(["이과", "문과", "예체능"] as Track[]).map((t) => (
                <Choice key={t} active={track === t} onClick={() => setTrack(t)}>{t}</Choice>
              ))}
            </div>
          </Field>
          <Field label="공인 어학 성적">
            <div className="flex gap-2">
              {(["있음", "낮음", "없음"] as const).map((e) => (
                <Choice key={e} active={eng === e} onClick={() => setEng(e)}>{e}</Choice>
              ))}
            </div>
          </Field>
          <button onClick={() => setDone(true)} className="w-full rounded-lg bg-igc-blue py-3 font-semibold text-white hover:bg-igc-navy">
            결과 보기
          </button>
        </div>

        <div className="rounded-2xl border p-6">
          {!done ? (
            <p className="text-muted-foreground">왼쪽에서 조건을 선택하고 결과 보기를 누르세요.</p>
          ) : (
            <>
              <h2 className="text-lg font-bold text-igc-navy">예상 적합도</h2>
              <ul className="mt-4 space-y-3">
                {results.map(({ u, level }) => (
                  <li key={u.id} className="flex items-center justify-between rounded-lg border p-3">
                    <Link to="/promo/universities/$uniId" params={{ uniId: u.id }} className="font-medium text-igc-navy hover:underline">{u.shortName}</Link>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${level === "유망" ? "bg-igc-mint/15 text-igc-mint" : level === "도전 가능" ? "bg-igc-blue/10 text-igc-blue" : "bg-amber-100 text-amber-700"}`}>{level}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm">
                <p className="font-medium text-igc-navy">정확한 진단이 궁금하다면?</p>
                <p className="mt-1 text-muted-foreground">실제 성적표·생활기록부를 바탕으로 한 정밀 진단은 무료 상담에서.</p>
                <Link to="/promo/consult" className="mt-3 inline-block rounded-lg bg-igc-blue px-5 py-2 font-semibold text-white">무료 1:1 상담 신청</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-igc-navy">{label}</p>
      {children}
    </div>
  );
}
function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`flex-1 rounded-lg border py-2 text-sm font-medium transition ${active ? "border-igc-blue bg-igc-blue/10 text-igc-blue" : "hover:border-igc-blue/50"}`}>{children}</button>
  );
}
