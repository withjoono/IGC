import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/seo";
import { PageHeader } from "@/components/layout";
import { UNIVERSITIES } from "@/data/igc";

export const Route = createFileRoute("/promo/consult")({
  component: Consult,
});

function Consult() {
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      // Hub 백엔드 연동 지점 (vite proxy /api-nest → :4000)
      await fetch("/api-nest/igc/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } finally {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <CheckCircle2 className="h-14 w-14 text-igc-mint" />
        <h1 className="mt-4 text-2xl font-bold text-igc-navy">상담 신청이 접수되었습니다</h1>
        <p className="mt-2 text-muted-foreground">담당 컨설턴트가 1영업일 내 연락드립니다. 맞춤 마감일·준비 체크리스트도 함께 보내드려요.</p>
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
        <L label="연락처(휴대폰)"><input name="phone" required className="inp" placeholder="010-0000-0000" /></L>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" name="agree" required className="mt-1" />
          <span>개인정보 수집·이용에 동의합니다. (상담 목적, 보관 후 파기)</span>
        </label>
        <button type="submit" className="w-full rounded-lg bg-igc-blue py-3 font-semibold text-white hover:bg-igc-navy">
          무료 상담 신청하기
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
