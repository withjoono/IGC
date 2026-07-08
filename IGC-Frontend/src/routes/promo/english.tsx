import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Seo } from "@/components/seo";
import { ConsultCTA, PageHeader } from "@/components/layout";

export const Route = createFileRoute("/promo/english")({
  component: EnglishPaths,
});

const PATHS = [
  { title: "수능영어로 대체", desc: "겐트대 2등급 / 조지메이슨 1등급 — 이미 본 시험이라 추가 부담 0.", tag: "수능영어", easy: "가장 쉬움" },
  { title: "Versant 자체시험", desc: "조지메이슨 57점. 집에서 보는 짧은 스피킹 테스트, 즉시 응시·빠른 결과.", tag: "조지메이슨", easy: "빠름" },
  { title: "Duolingo", desc: "스토니브룩·유타·조지메이슨 110점. 온라인·저렴·집에서 응시.", tag: "3개교 인정", easy: "온라인" },
  { title: "TOEIC 인정", desc: "유타대는 TOEIC 695점을 공식 어학 성적으로 인정하는 드문 대학.", tag: "유타대", easy: "국내 흔함" },
  { title: "SAT/ACT 영어", desc: "4개교 모두 SAT/ACT 영어 섹션 점수로 대체 인정. 이미 있다면 그대로 활용.", tag: "4개교", easy: "재활용" },
  { title: "점수가 전혀 없으면 → 조건부입학", desc: "SBU 공인영어 면제 / GMU Patriot Plus / 유타 영어집중과정(1년). 입학 후 이수로 해결.", tag: "조건부", easy: "무성적 가능" },
];

const DELEGATED = [
  "대학·전형 선택",
  "어학 최소경로 매칭·접수",
  "생기부·활동 정리(생기북)",
  "에세이·자기소개서 작성·첨삭",
  "추천서·서류 준비",
  "원서 작성·제출",
  "마감·우선지원 일정 관리",
  "합격 후 절차 안내",
];

function EnglishPaths() {
  return (
    <>
      <Seo title="TOEFL 없이 IGC 지원 — 어학은 가장 쉬운 하나만" description="수능영어·Versant·Duolingo·TOEIC·SAT/ACT·조건부입학까지. 점수가 없어도 가장 쉬운 하나를 골라 접수까지 대행합니다." path="/promo/english" />
      <PageHeader badge="올인원 · 어학 대행" title="영어 점수 없어도 됩니다" desc="TOEFL·IELTS 없이도 길은 6가지. 학생 상황에 맞는 '가장 쉬운 하나'를 우리가 골라, 접수까지 대행합니다." />

      <div className="container grid gap-4 md:grid-cols-2">
        {PATHS.map((p) => (
          <div key={p.title} className="rounded-2xl border p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-igc-blue">{p.tag}</span>
              <span className="rounded-full bg-igc-mint/15 px-2 py-0.5 text-[11px] font-semibold text-igc-mint">{p.easy}</span>
            </div>
            <h3 className="mt-1 text-lg font-bold text-igc-navy">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* 전 과정 대행 — 학생은 공부만 */}
      <section className="container mt-14">
        <div className="rounded-3xl border-2 border-igc-blue/20 bg-gradient-to-br from-igc-blue/5 to-white p-8 md:p-12">
          <h2 className="text-2xl font-bold text-igc-navy md:text-3xl">학생은 수능만, 나머지는 전부 우리가</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">어학 경로 선택부터 원서 제출까지 — IGC 준비의 전 과정을 대행합니다. 학생이 할 일은 공부뿐입니다.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {DELEGATED.map((d) => (
              <div key={d} className="flex items-center gap-2 rounded-xl border bg-white p-3 text-sm text-foreground/80">
                <Check className="h-4 w-4 shrink-0 text-igc-mint" /> {d}
              </div>
            ))}
          </div>
          <Link to="/promo/parallel" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-igc-blue hover:gap-2">
            수시 6회 밖 '보험 한 장' 전략 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <ConsultCTA context="내 어학 점수로 가능한 대학 찾기" />
    </>
  );
}
