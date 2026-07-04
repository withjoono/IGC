import { Link } from "@tanstack/react-router";
import { GraduationCap, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Leaf = { to: string; label: string; hint?: string };
type Item = { label: string; to?: string; badge?: string; children?: Leaf[] };

const MENU: Item[] = [
  {
    label: "입시정보",
    children: [
      { to: "/promo/universities", label: "대학 비교", hint: "4개 대학 전형·학과" },
      { to: "/promo/deadlines", label: "2027 원서 마감일", hint: "학기·전형 단계별" },
      { to: "/promo/english", label: "어학 우회로", hint: "수능영어·토익·조건부" },
    ],
  },
  { label: "블로그", to: "/promo/blog" },
  { label: "합격진단", to: "/promo/diagnosis" },
  {
    label: "컨설팅",
    children: [
      { to: "/promo/consulting", label: "컨설팅 소개", hint: "진단→설계→첨삭→동행" },
      { to: "/promo/cases", label: "합격 사례", hint: "내신·어학별 합격 케이스" },
      { to: "/promo/consult", label: "상담 신청", hint: "무료 1:1 진단" },
    ],
  },
  {
    label: "IGC반",
    badge: "유료",
    children: [
      { to: "/promo/igcclass", label: "IGC반 소개", hint: "요금제 한눈에" },
      { to: "/promo/igcclass/study", label: "학습관리 · 플래너", hint: "스터디플래너 코칭" },
      { to: "/promo/igcclass/grade", label: "성적관리 · 생기북·모고", hint: "생기부·모의고사 관리" },
    ],
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/promo" className="flex items-center gap-2 font-bold text-igc-navy">
          <GraduationCap className="h-6 w-6 text-igc-blue" />
          <span>IGC 입시</span>
          <span className="hidden text-xs font-normal text-muted-foreground sm:inline">by T스쿨</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {MENU.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-slate-50 hover:text-igc-blue">
                  {item.label}
                  {item.badge && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">{item.badge}</span>}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="invisible absolute left-0 top-full w-64 translate-y-1 rounded-xl border bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((c) => (
                    <Link key={c.to} to={c.to} className="block rounded-lg px-3 py-2 hover:bg-slate-50 [&.active]:bg-igc-blue/5">
                      <span className="block text-sm font-medium text-igc-navy">{c.label}</span>
                      {c.hint && <span className="block text-xs text-muted-foreground">{c.hint}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.to} to={item.to!} className="rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-slate-50 hover:text-igc-blue [&.active]:font-semibold [&.active]:text-igc-blue">
                {item.label}
              </Link>
            ),
          )}
          <Link to="/promo/consult" className="ml-2 rounded-lg bg-igc-blue px-4 py-2 text-sm font-semibold text-white hover:bg-igc-navy">
            무료 상담 신청
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="메뉴">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="container flex flex-col py-3">
            {MENU.map((item) =>
              item.children ? (
                <div key={item.label} className="py-1">
                  <p className="flex items-center gap-2 px-1 py-1.5 text-xs font-semibold uppercase text-muted-foreground">
                    {item.label}
                    {item.badge && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">{item.badge}</span>}
                  </p>
                  {item.children.map((c) => (
                    <Link key={c.to} to={c.to} className="block rounded-lg px-3 py-2 text-sm" onClick={() => setOpen(false)}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.to} to={item.to!} className="rounded-lg px-3 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ),
            )}
            <Link to="/promo/consult" className="mt-2 rounded-lg bg-igc-blue px-4 py-2.5 text-center text-sm font-semibold text-white" onClick={() => setOpen(false)}>
              무료 상담 신청
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-muted/40">
      <div className="container grid gap-8 py-10 text-sm text-muted-foreground md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-semibold text-igc-navy">IGC 입시 정보·컨설팅 — T스쿨</p>
          <p className="mt-2 max-w-md">
            인천글로벌캠퍼스(스토니브룩·유타·조지메이슨·겐트) 전형·학과·2027 원서 마감일 정보와 무료 1:1 상담, 유료 IGC반(학습·성적관리).
          </p>
        </div>
        <div>
          <p className="font-semibold text-igc-navy">바로가기</p>
          <ul className="mt-2 space-y-1">
            <li><Link to="/promo/universities" className="hover:text-igc-blue">대학 비교</Link></li>
            <li><Link to="/promo/deadlines" className="hover:text-igc-blue">2027 마감일</Link></li>
            <li><Link to="/promo/igcclass" className="hover:text-igc-blue">IGC반(유료)</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-igc-navy">상담</p>
          <ul className="mt-2 space-y-1">
            <li><Link to="/promo/consult" className="hover:text-igc-blue">무료 상담 신청</Link></li>
            <li><Link to="/promo/diagnosis" className="hover:text-igc-blue">합격 가능성 진단</Link></li>
          </ul>
        </div>
      </div>
      <div className="container border-t py-4 text-xs text-muted-foreground">
        <p>※ 입시 정보는 각 대학 공식 모집요강 기준이며 변동될 수 있습니다. IGC반 요금은 예시이며 확정 후 안내됩니다.</p>
        <p className="mt-1">© {new Date().getFullYear()} T스쿨 · geobukacademy</p>
      </div>
    </footer>
  );
}

export function ConsultCTA({ context }: { context?: string }) {
  return (
    <section className="container my-16">
      <div className="rounded-2xl bg-gradient-to-r from-igc-navy to-igc-blue p-8 text-center text-white md:p-12">
        <h2 className="text-2xl font-bold">{context ?? "내 경우엔 어디가 유리할까요?"}</h2>
        <p className="mt-3 text-white/85">내신·어학·전공에 맞춘 정밀 진단은 무료 1:1 상담에서 받으실 수 있습니다.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/promo/consult" className="rounded-lg bg-white px-6 py-3 font-semibold text-igc-navy hover:bg-white/90">무료 입시 진단 신청</Link>
          <Link to="/promo/diagnosis" className="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10">1분 합격 가능성 진단</Link>
        </div>
      </div>
    </section>
  );
}

export function PageHeader({ title, desc, badge }: { title: string; desc: string; badge?: string }) {
  return (
    <div className="container pt-10 pb-6">
      {badge && <p className="mb-2"><span className="rounded-full bg-igc-blue/10 px-3 py-1 text-xs font-semibold text-igc-blue">{badge}</span></p>}
      <h1 className="text-3xl font-bold text-igc-navy md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{desc}</p>
    </div>
  );
}
