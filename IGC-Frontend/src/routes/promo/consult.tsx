import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MessageSquareText, Phone, Copy } from "lucide-react";
import { Seo } from "@/components/seo";
import { PageHeader, CONSULT_PHONE, CONSULT_TEL, KAKAO_CHANNEL_URL } from "@/components/layout";
import { UNIVERSITIES } from "@/data/igc";

export const Route = createFileRoute("/promo/consult")({
  component: Consult,
});

// 상담 신청 저장 경로. Hub 에 IGC 상담 접수 API 가 아직 없다(2026-11-11 확인 — Hub-Backend 에 /igc/consult 없음).
// 그래서 기본 동작은 "작성한 내용을 상담 번호로 문자 보내기"다 — 신청이 조용히 사라지지 않게 한다.
// 접수 API 가 생기면 빌드 환경변수 VITE_CONSULT_ENDPOINT 에 절대 URL 을 넣는다. 응답이 2xx 일 때만 접수 완료로 본다.
const ENDPOINT = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_CONSULT_ENDPOINT) || "";
const SMS_NUMBER = CONSULT_PHONE.replace(/-/g, "");

type Stage = "form" | "sending" | "done" | "handoff";

function Consult() {
  const [stage, setStage] = useState<Stage>("form");
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    const text = [
      "[T IGC 무료 상담 신청]",
      `학생: ${payload.name}`,
      `학년: ${payload.grade}`,
      `내신: ${payload.gpa}`,
      `관심: ${payload.interest || "미정/추천받기"}`,
      `국내 수시·정시 병행: ${payload.parallel || "미정"}`,
      `연락처: ${payload.phone}`,
    ].join("\n");
    setSummary(text);

    if (ENDPOINT) {
      setStage("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, source: "tigc.kr" }),
        });
        if (res.ok) {
          setStage("done");
          return;
        }
      } catch {
        // 아래 문자 접수로 넘어간다
      }
    }
    setStage("handoff");
  }

  function smsHref() {
    const sep = typeof navigator !== "undefined" && /iPhone|iPad|iPod/.test(navigator.userAgent) ? "&" : "?";
    return `sms:${SMS_NUMBER}${sep}body=${encodeURIComponent(summary)}`;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (stage === "done") {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <CheckCircle2 className="h-14 w-14 text-igc-mint" />
        <h1 className="mt-4 text-2xl font-bold text-igc-navy">상담 신청이 접수되었습니다</h1>
        <p className="mt-2 text-muted-foreground">담당 컨설턴트가 1영업일 내 연락드립니다.</p>
      </div>
    );
  }

  if (stage === "handoff") {
    return (
      <div className="container max-w-xl py-12">
        <h1 className="text-2xl font-bold text-igc-navy">마지막 단계 — 문자 한 통이면 접수됩니다</h1>
        <p className="mt-2 text-muted-foreground">
          아래 버튼을 누르면 작성하신 내용이 담긴 문자가 열립니다. <b className="text-igc-navy">전송까지 눌러야 접수가 완료</b>됩니다.
          담당 컨설턴트가 1영업일 내 연락드립니다.
        </p>
        <pre className="mt-5 whitespace-pre-wrap rounded-xl border bg-slate-50 p-4 text-sm text-foreground/80">{summary}</pre>
        <div className="mt-5 grid gap-3">
          <a href={smsHref()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-igc-blue py-3 font-semibold text-white hover:bg-igc-navy">
            <MessageSquareText className="h-5 w-5" /> 문자로 상담 신청 보내기 ({CONSULT_PHONE})
          </a>
          {KAKAO_CHANNEL_URL && (
            <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FEE500] py-3 font-semibold text-[#191919]">
              카카오톡으로 보내기 (내용 복사 후 붙여넣기)
            </a>
          )}
          <a href={CONSULT_TEL} className="inline-flex items-center justify-center gap-2 rounded-lg border py-3 font-semibold text-igc-navy hover:bg-slate-50">
            <Phone className="h-5 w-5" /> 바로 전화 상담 {CONSULT_PHONE}
          </a>
          <button type="button" onClick={copy} className="inline-flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-igc-navy">
            <Copy className="h-4 w-4" /> {copied ? "복사되었습니다" : "PC에서 보시는 경우: 내용 복사하기"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo title="무료 입시 진단 상담 신청" description="IGC 지원, 내 성적으로 어디가 유리한지 무료로 진단받으세요. 1:1 비밀 상담." path="/promo/consult" />
      <PageHeader title="무료 입시 진단 상담" desc="학년·내신·관심 대학만 남겨주시면, 맞춤 진단 리포트와 함께 1:1로 안내해 드립니다." />
      <form onSubmit={onSubmit} className="container max-w-xl space-y-5 pb-10">
        <L label="학생 이름"><input name="name" required className="inp" placeholder="홍길동" /></L>
        <L label="학년">
          <select name="grade" required className="inp">
            <option value="">선택</option>
            <option>고1</option><option>고2</option><option>고3</option><option>졸업/재수</option><option>기타</option>
          </select>
        </L>
        <L label="대략 내신 등급">
          <select name="gpa" required className="inp">
            <option value="">선택</option>
            {[1,2,3,4,5,6,7].map((g) => <option key={g}>{g}등급대</option>)}
          </select>
        </L>
        <L label="관심 대학 / 계열">
          <select name="interest" className="inp">
            <option value="">미정 / 추천받기</option>
            {UNIVERSITIES.map((u) => <option key={u.id}>{u.shortName}</option>)}
          </select>
        </L>
        <L label="국내 수시·정시도 함께 상담받을까요?">
          <select name="parallel" className="inp">
            <option value="">미정</option>
            <option>IGC만</option>
            <option>IGC + 국내 수시</option>
            <option>IGC + 국내 정시</option>
            <option>IGC + 수시 + 정시 모두</option>
          </select>
        </L>
        <L label="연락처(휴대폰)"><input name="phone" required className="inp" placeholder="010-0000-0000" /></L>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" name="agree" required className="mt-1" />
          <span>개인정보 수집·이용에 동의합니다. (상담 목적, 보관 후 파기)</span>
        </label>
        <button type="submit" disabled={stage === "sending"} className="w-full rounded-lg bg-igc-blue py-3 font-semibold text-white hover:bg-igc-navy disabled:opacity-60">
          {stage === "sending" ? "보내는 중…" : "무료 상담 신청하기"}
        </button>
        <p className="text-center text-xs text-muted-foreground">1:1 비밀 상담 · 강요 없는 무료 진단</p>
      </form>
      <style>{`.inp{width:100%;border:1px solid hsl(var(--border));border-radius:.5rem;padding:.625rem .75rem;font-size:.95rem}.inp:focus{outline:2px solid hsl(var(--ring));outline-offset:1px}`}</style>
    </>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-igc-navy">{label}</label>
      {children}
    </div>
  );
}
