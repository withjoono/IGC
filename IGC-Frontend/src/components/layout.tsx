import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
export { Header } from "./header";

export const CONSULT_PHONE = "010-2518-7139";
export const CONSULT_TEL = "tel:01025187139";

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
