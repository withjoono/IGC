import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, BookOpenCheck, CalendarClock, Check, ClipboardCheck, ExternalLink,
  FlaskConical, Languages, MonitorPlay, Sigma, Target, Timer, X,
} from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";
import { Badge, IconCard, SectionHead, StatBand } from "@/components/ui";

export const Route = createFileRoute("/promo/ghent-exam")({
  component: GhentExamClass,
});

/* ───────────── 운영 설정 (기수·기간이 정해지면 여기만 고치면 됩니다) ───────────── */
const COURSE = {
  weeks: 8,
  // 2027 3월학기 우선지원 마감(11/30)에 맞춘 기수 / 9월학기 기수
  cohorts: [
    { name: "3월학기 우선지원반", target: "우선지원 마감 2026-11-30 전 14점 확보", status: "모집 중" },
    { name: "9월학기반", target: "최종 마감 2027-07-31 전 14점 확보", status: "사전 신청" },
  ],
  priceNote: "수강료·기수 일정은 상담 시 안내",
};

const MOGOMOGO_URL = "https://mogomogo.kr/promo";
const STUDYPLANNER_URL = "https://studyplanner.kr/promo";

/* ───────────── 커리큘럼 ───────────── */
const CURRICULUM = [
  { week: "0주차", title: "진단 모의고사", desc: "실전과 같은 20문항·120분 온라인 테스트로 현재 점수와 약점 단원을 확인합니다.", kind: "test" },
  { week: "1–2주차", title: "수학 ① 함수·극한·미분", desc: "AP Calculus 범위 기준. 수능 미적분과 겹치는 개념은 빠르게, 빠진 단원은 보완합니다.", kind: "math" },
  { week: "3주차", title: "수학 ② 적분·응용", desc: "정적분·넓이·변화율 응용. 계산기 활용법까지 함께 연습합니다.", kind: "math" },
  { week: "4–5주차", title: "화학 ① 몰·화학양론·기체", desc: "AP Chemistry 범위 기준. mole, stoichiometry, gas laws를 영어 문제로 익힙니다.", kind: "chem" },
  { week: "6주차", title: "화학 ② 평형·산염기·열화학", desc: "equilibrium, acid–base, thermochemistry 등 수능 범위와 차이 나는 부분을 집중 보완합니다.", kind: "chem" },
  { week: "7주차", title: "실전 모의고사 2회 + 오답 클리닉", desc: "실전 형식 모의고사 2회, 선생님이 틀린 문항을 라이브로 풀이합니다.", kind: "test" },
  { week: "8주차", title: "실제 응시 · 원서 연결", desc: "모의고사 14점 이상이 안정적이면 실제 시험에 응시하고, 점수를 원서에 바로 연결합니다.", kind: "test" },
];

const HOW = [
  { icon: <MonitorPlay className="h-5 w-5" />, title: "선생님 실시간 온라인 강의", desc: "주 2회 라이브 강의. 놓친 수업은 다시보기로 복습합니다." },
  { icon: <ClipboardCheck className="h-5 w-5" />, title: "매주 온라인 단원 테스트", desc: "배운 단원을 바로 온라인으로 테스트하고 자동 채점·약점 리포트를 받습니다." },
  { icon: <Timer className="h-5 w-5" />, title: "실전 형식 모의고사", desc: "20문항·120분·영어 출제·계산기 허용 — 실제 시험과 같은 조건으로 연습합니다." },
  { icon: <Languages className="h-5 w-5" />, title: "영어 수학·화학 용어 정리", desc: "derivative, equilibrium, mole… 문제를 읽지 못해 틀리는 일이 없게 합니다." },
];

const FAQ = [
  { q: "영어를 잘 못해도 들을 수 있나요?", a: "네. 강의는 한국어로 진행하고, 문제와 핵심 용어만 영어로 익힙니다. 겐트 시험은 영어로 출제되지만 문장 독해보다 수학·화학 용어를 아는지가 중요합니다." },
  { q: "문과 학생도 가능한가요?", a: "시험은 수학·화학이라 이과 기초가 있으면 유리합니다. 문과 학생은 학교장추천전형 지원이 불가하니, 일반전형으로 시험 준비 기간을 더 넉넉히 잡도록 상담에서 설계해 드립니다." },
  { q: "시험에 떨어지면 어떻게 되나요?", a: "겐트 시험은 횟수 제한 없이 재응시할 수 있습니다(응시할 때마다 응시료 발생, 점수 2년 유효). 그래서 모의고사로 14점을 안정적으로 넘긴 뒤 실제 시험을 보는 방식으로 응시료와 시간을 아낍니다." },
  { q: "SAT·ACT 점수로 대체할 수도 있다던데요?", a: "SAT 수학 720점 또는 ACT 수학 32점으로 대체할 수 있습니다. 다만 대부분의 학생에게는 겐트 자체 시험(14/20)이 더 빠른 길이라, 이미 점수가 있는 경우가 아니면 자체 시험을 권합니다." },
  { q: "내신이 낮아도 괜찮나요?", a: "겐트는 자체 시험이 당락을 좌우하고 내신 영향이 작은 대학입니다. 그래서 내신 4~6등급 학생에게 특히 현실적인 선택지입니다." },
];

/* ───────────── 체험 문항 (자체 제작 샘플 — 실제 기출 아님) ───────────── */
type Q = { id: string; subject: "Math" | "Chemistry"; prompt: string; hint: string; options: string[]; answer: number; explain: string };
const SAMPLE: Q[] = [
  {
    id: "m1", subject: "Math",
    prompt: "If f(x) = 3x² + 2x, what is f′(1)?",
    hint: "f′(x) = 도함수 (derivative)",
    options: ["5", "6", "8", "11"], answer: 2,
    explain: "f′(x) = 6x + 2 이므로 f′(1) = 8.",
  },
  {
    id: "m2", subject: "Math",
    prompt: "Evaluate the definite integral ∫₀² x dx.",
    hint: "definite integral = 정적분",
    options: ["1", "2", "4", "8"], answer: 1,
    explain: "∫₀² x dx = [x²/2]₀² = 2.",
  },
  {
    id: "c1", subject: "Chemistry",
    prompt: "How many moles of water (H₂O, molar mass 18 g/mol) are in 36 g of water?",
    hint: "mole = 몰, molar mass = 몰질량",
    options: ["0.5 mol", "1 mol", "2 mol", "18 mol"], answer: 2,
    explain: "36 g ÷ 18 g/mol = 2 mol.",
  },
  {
    id: "c2", subject: "Chemistry",
    prompt: "For a reaction at equilibrium, adding more reactant will shift the equilibrium:",
    hint: "equilibrium = 평형 (르샤틀리에 원리)",
    options: ["toward the products", "toward the reactants", "no shift", "it stops the reaction"], answer: 0,
    explain: "반응물을 더하면 르샤틀리에 원리에 따라 생성물 쪽(정반응)으로 이동합니다.",
  },
];

function GhentExamClass() {
  return (
    <>
      <Seo
        title="겐트대 입학시험 대비반 — 온라인 강의 + 온라인 모의고사"
        description="내신 무관, 수학·화학 시험 하나로 겐트대. 선생님 실시간 온라인 강의와 실전 형식 온라인 모의고사로 합격선 14/20을 먼저 확보합니다."
        path="/promo/ghent-exam"
      />
      <PageHeader
        badge="겐트 입학시험 대비반 · 온라인"
        title="내신 무관, 시험 하나로 겐트대"
        desc="겐트대 합격은 자체 수학·화학 시험이 좌우합니다. 선생님 온라인 강의로 배우고, 실전과 같은 온라인 테스트로 14점을 먼저 확보한 뒤 실제 시험을 봅니다."
      />

      <div className="container flex flex-wrap gap-3">
        <Link to="/promo/consult" className="inline-flex items-center gap-2 rounded-lg bg-igc-blue px-6 py-3 font-semibold text-white hover:bg-igc-navy">
          무료 진단 모의고사 신청 <ArrowRight className="h-4 w-4" />
        </Link>
        <a href="#sample" className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold text-igc-navy hover:bg-slate-50">
          샘플 문항 풀어보기
        </a>
      </div>

      {/* 시험 핵심 정보 */}
      <section className="container mt-10">
        <StatBand
          items={[
            { value: "20문항", label: "수학 + 화학 · 120분" },
            { value: "14 / 20", label: "합격선 (70%)" },
            { value: "계산기 OK", label: "오픈북 · 온라인 응시" },
            { value: "재응시 가능", label: "점수 2년 유효" },
          ]}
        />
        <p className="mt-3 text-xs text-muted-foreground">※ 시험 조건은 겐트대 글로벌캠퍼스 입학 안내 기준이며, 지원 전 공식 모집요강을 반드시 확인하세요.</p>
      </section>

      {/* 왜 대비반이 필요한가 */}
      <section className="container mt-14">
        <SectionHead eyebrow="WHY" title="수능 이과면 실력은 충분, 막히는 건 두 가지" desc="AP Calculus는 수능 미적분과, AP Chemistry는 화학Ⅰ·Ⅱ와 상당 부분 겹칩니다. 그런데 혼자 준비하면 여기서 점수가 깎입니다." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <IconCard icon={<Languages className="h-5 w-5" />} title="영어로 나오는 문제" desc="개념은 아는데 derivative, equilibrium, stoichiometry 같은 용어에서 문제를 잘못 읽어 틀립니다." />
          <IconCard icon={<Target className="h-5 w-5" />} title="수능과 다른 출제 범위" desc="수능에 없던 단원이 섞여 있습니다. 빠진 범위만 정확히 골라 짧게 보완하는 것이 핵심입니다." />
        </div>
      </section>

      {/* 진행 방식 */}
      <section className="container mt-14">
        <SectionHead eyebrow="HOW" title="온라인 강의로 배우고, 온라인 테스트로 확인합니다" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.map((h) => <IconCard key={h.title} {...h} />)}
        </div>
      </section>

      {/* 커리큘럼 */}
      <section className="container mt-14">
        <SectionHead eyebrow="CURRICULUM" title={`${COURSE.weeks}주 완성 커리큘럼`} desc="진단 → 수학 → 화학 → 실전 → 실제 응시까지. 진단 결과에 따라 단원 비중을 조정합니다." />
        <ol className="mt-6 space-y-3">
          {CURRICULUM.map((c) => (
            <li key={c.week} className="flex gap-4 rounded-2xl border p-5">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.kind === "math" ? "bg-igc-blue/10 text-igc-blue" : c.kind === "chem" ? "bg-igc-mint/15 text-igc-mint" : "bg-igc-navy/10 text-igc-navy"}`}>
                {c.kind === "math" ? <Sigma className="h-5 w-5" /> : c.kind === "chem" ? <FlaskConical className="h-5 w-5" /> : <BookOpenCheck className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-xs font-semibold text-igc-blue">{c.week}</p>
                <h3 className="font-bold text-igc-navy">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 샘플 문항 체험 */}
      <section id="sample" className="container mt-14 scroll-mt-24">
        <SectionHead eyebrow="TRY IT" title="샘플 문항 4개, 지금 풀어보세요" desc="실제 시험처럼 영어로 출제된 체험용 문항입니다. 대비반의 온라인 테스트도 이런 방식으로 진행됩니다." />
        <SampleQuiz />
      </section>

      {/* 기수 */}
      <section className="container mt-14">
        <SectionHead eyebrow="SCHEDULE" title="원서 마감에서 거꾸로 맞춘 기수" desc="시험일이 따로 없는 온라인 시험이라, 진짜 기준은 원서 마감일입니다." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {COURSE.cohorts.map((c) => (
            <div key={c.name} className="rounded-2xl border-2 border-igc-blue/20 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-igc-navy">{c.name}</h3>
                <Badge tone={c.status === "모집 중" ? "mint" : "blue"}>{c.status}</Badge>
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><CalendarClock className="h-4 w-4" /> {c.target}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{COURSE.priceNote}</p>
      </section>

      {/* T스쿨 앱 연계 */}
      <section className="container mt-14">
        <div className="rounded-3xl border bg-slate-50 p-8">
          <h2 className="text-xl font-bold text-igc-navy">T스쿨 앱과 함께 관리합니다</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href={STUDYPLANNER_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-xl border bg-white p-4 hover:border-igc-blue">
              <CalendarClock className="mt-0.5 h-5 w-5 text-igc-blue" />
              <span className="text-sm"><b className="text-igc-navy">스터디플래너</b> — 마감일 역산 주간 학습 계획과 실행 점검 <ExternalLink className="ml-1 inline h-3.5 w-3.5" /></span>
            </a>
            <a href={MOGOMOGO_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-xl border bg-white p-4 hover:border-igc-blue">
              <Sigma className="mt-0.5 h-5 w-5 text-igc-blue" />
              <span className="text-sm"><b className="text-igc-navy">모고모고</b> — 수학·과학 성적 추이로 약점 단원 보완 <ExternalLink className="ml-1 inline h-3.5 w-3.5" /></span>
            </a>
          </div>
          <Link to="/promo/universities/$uniId" params={{ uniId: "ghent" }} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:gap-2">
            겐트대 전형 요강 전체 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mt-14">
        <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
        <div className="mt-6 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-2xl border p-5">
              <summary className="cursor-pointer list-none font-semibold text-igc-navy">
                <span className="mr-2 text-igc-blue">Q.</span>{f.q}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ConsultCTA context="내 수학·화학 실력으로 겐트대 가능할까요?" />
    </>
  );
}

function SampleQuiz() {
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [graded, setGraded] = useState(false);
  const score = SAMPLE.filter((q) => picked[q.id] === q.answer).length;
  const allAnswered = SAMPLE.every((q) => picked[q.id] !== undefined);

  return (
    <div className="mt-6 rounded-2xl border p-6">
      <ol className="space-y-6">
        {SAMPLE.map((q, i) => (
          <li key={q.id}>
            <p className="text-xs font-semibold text-igc-blue">Q{i + 1} · {q.subject}</p>
            <p className="mt-1 font-medium text-igc-navy">{q.prompt}</p>
            <p className="mt-1 text-xs text-muted-foreground">용어 힌트: {q.hint}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const chosen = picked[q.id] === oi;
                const correct = graded && oi === q.answer;
                const wrong = graded && chosen && oi !== q.answer;
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={graded}
                    onClick={() => setPicked((p) => ({ ...p, [q.id]: oi }))}
                    className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-left text-sm transition ${
                      correct ? "border-igc-mint bg-igc-mint/10 text-igc-navy"
                      : wrong ? "border-red-300 bg-red-50 text-red-700"
                      : chosen ? "border-igc-blue bg-igc-blue/10 text-igc-blue"
                      : "hover:border-igc-blue/50"
                    }`}
                  >
                    <span>{String.fromCharCode(65 + oi)}. {opt}</span>
                    {correct && <Check className="h-4 w-4 text-igc-mint" />}
                    {wrong && <X className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
            {graded && <p className="mt-2 text-sm text-muted-foreground">해설: {q.explain}</p>}
          </li>
        ))}
      </ol>

      {!graded ? (
        <button
          type="button"
          disabled={!allAnswered}
          onClick={() => setGraded(true)}
          className="mt-6 w-full rounded-lg bg-igc-blue py-3 font-semibold text-white hover:bg-igc-navy disabled:cursor-not-allowed disabled:opacity-40"
        >
          {allAnswered ? "채점하기" : "4문항을 모두 골라주세요"}
        </button>
      ) : (
        <div className="mt-6 rounded-xl bg-slate-50 p-5">
          <p className="text-lg font-bold text-igc-navy">{SAMPLE.length}문항 중 {score}문항 정답</p>
          <p className="mt-1 text-sm text-muted-foreground">
            실제 시험은 20문항 중 14점이 합격선입니다. 샘플은 기초 문항이니, 실전 난이도의 무료 진단 모의고사로 현재 위치를 확인해 보세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/promo/consult" className="rounded-lg bg-igc-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-igc-navy">무료 진단 모의고사 신청</Link>
            <button type="button" onClick={() => { setPicked({}); setGraded(false); }} className="rounded-lg border px-5 py-2.5 text-sm font-semibold text-igc-navy hover:bg-white">다시 풀기</button>
          </div>
        </div>
      )}
      <p className="mt-4 text-xs text-muted-foreground">※ 체험용 자체 제작 문항이며 실제 기출이 아닙니다.</p>
    </div>
  );
}
