import { Link } from "@tanstack/react-router";
import { GraduationCap, Menu, X, ChevronDown, Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const CONSULT_PHONE = "010-2518-7139";
export const CONSULT_TEL = "tel:01025187139";

type Leaf = { to: string; label: string; hint?: string };
type Item = { label: string; to?: string; badge?: string; children?: Leaf[] };

const MENU: Item[] = [
  {
    label: "블로그",
    children: [
      { to: "/promo/blog", label: "입시 정보 블로그", hint: "IGC 입시 질문·전략" },
      { to: "/promo/universities", label: "대학 비교", hint: "4개 대학 전형·학과" },
      { to: "/promo/deadlines", label: "2027 원서 마감일", hint: "학기·전형 단계별" },
      { to: "/promo/english", label: "어학 우회로", hint: "수능영어·토익·조건부" },
    ],
  },
  { label: "수시 병행", to: "/promo/parallel" },
  { label: "컨설팅 비용", to: "/promo/pricing" },
  { label: "합격진단", to: "/promo/diagnosis" },
  {
    label: "올인원 서비스",
    children: [
      { to: "/promo/consulting", label: "올인원 컨설팅", hint: "학생은 공부만, 전 과정 대행" },
      { to: "/promo/pricing", label: "컨설팅 비용", hint: "첫 대학 98만 / 추가 48만" },
      { to: "/promo/english", label: "어학 대행", hint: "점수 없어도 6가지 길" },
      { to: "/promo/cases", label: "합격 사례", hint: "내신·어학별 합격 케이스" },
      { to: "/promo/consult", label: "상담 신청", hint: "무료 1:1 진단" },
    ],
  },
  {
    label: "IGC 멘토링",
    badge: "유료",
    children: [
      { to: "/promo/igcclass", label: "IGC 멘토링 소개", hint: "멘토가 플래너·생기북으로 관리" },
      { to: "/promo/igcclass/study", label: "스터디플래너 앱 소개", hint: "IGC 준비 관리 플랫폼" },
      { to: "/promo/igcclass/grade", label: "생기북 앱 소개", hint: "교과·생기부 관리 앱" },
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
          <span>T IGC</span>
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
          <a href={CONSULT_TEL} className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-igc-blue/30 bg-igc-blue/5 px-3 py-2 text-sm font-bold text-igc-blue hover:bg-igc-blue/10">
            <Phone className="h-4 w-4" /> {CONSULT_PHONE}
          </a>
          <Link to="/promo/consult" className="ml-1 rounded-lg bg-igc-blue px-4 py-2 text-sm font-semibold text-white hover:bg-igc-navy">
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
            <a href={CONSULT_TEL} className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-igc-blue/30 bg-igc-blue/5 px-4 py-2.5 text-center text-sm font-bold text-igc-blue" onClick={() => setOpen(false)}>
              <Phone className="h-4 w-4" /> 전화 상담 {CONSULT_PHONE}
            </a>
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
    <footer className="mt-20 border-t bg-gray-50 py-6 sm:py-8">
      <div className="mx-auto w-full max-w-screen-lg px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr_auto] sm:gap-10">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <img className="h-auto w-16 rounded-xl sm:w-20" src="https://www.tskool.kr/logo.png" alt="거북스쿨 로고" />
            <span className="text-base font-semibold text-igc-navy sm:text-lg">(주)거북스쿨</span>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <a href={CONSULT_TEL} className="inline-flex items-center justify-center gap-2 rounded-lg bg-igc-blue/10 px-4 py-2 text-base font-bold text-igc-blue hover:bg-igc-blue/15">
              <Phone className="h-4 w-4" /> 입시 상담 {CONSULT_PHONE}
            </a>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:text-sm">
              <span>사업체명 (주)거북스쿨 | 대표 강준호</span>
              <span>사업자등록번호 772-87-02782 | 연락처 042-484-3356</span>
              <span>서울시 성북구 화랑로 211 성북구 기술창업센터 105호</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-sm font-medium">
              <a href="https://www.tskool.kr/explain/service" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-igc-blue">이용약관</a>
              <a href="https://www.tskool.kr/explain/refund" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-igc-blue">환불규정</a>
              <a href="https://www.tskool.kr/explain/privacy" target="_blank" rel="noopener noreferrer" className="font-bold text-igc-blue hover:underline">개인정보처리방침</a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <div className="flex items-center gap-4">
              <a href="https://www.youtube.com/@turtleschool_official" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                <img className="h-10 w-10 rounded-lg" src="https://www.tskool.kr/icons/youtube.png" alt="YouTube" />
              </a>
              <a href="https://cafe.naver.com/turtlecorp" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                <img className="h-10 w-10 rounded-lg" src="https://www.tskool.kr/icons/naver-cafe.png" alt="네이버 카페" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-foreground/10 pt-2 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} (주)거북스쿨. All rights reserved.
        </div>
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
        <a href={CONSULT_TEL} className="mt-5 inline-flex items-center gap-2 text-2xl font-extrabold text-white hover:underline md:text-3xl">
          <Phone className="h-6 w-6" /> {CONSULT_PHONE}
        </a>
        <p className="mt-1 text-sm text-white/70">전화 한 통이면 바로 상담됩니다</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={CONSULT_TEL} className="rounded-lg bg-white px-6 py-3 font-semibold text-igc-navy hover:bg-white/90">전화 상담하기</a>
          <Link to="/promo/consult" className="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10">무료 입시 진단 신청</Link>
          <Link to="/promo/diagnosis" className="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10">1분 합격 가능성 진단</Link>
        </div>
      </div>
    </section>
  );
}

export function FloatingCall() {
  return (
    <a
      href={CONSULT_TEL}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-igc-blue px-5 py-3 font-bold text-white shadow-lg shadow-igc-blue/30 transition hover:bg-igc-navy"
      aria-label={`전화 상담 ${CONSULT_PHONE}`}
    >
      <Phone className="h-5 w-5" />
      <span className="hidden sm:inline">{CONSULT_PHONE}</span>
      <span className="sm:hidden">전화 상담</span>
    </a>
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
