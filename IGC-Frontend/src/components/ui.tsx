import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Badge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "mint" | "amber" | "navy" }) {
  const tones = {
    blue: "bg-igc-blue/10 text-igc-blue",
    mint: "bg-igc-mint/15 text-igc-mint",
    amber: "bg-amber-100 text-amber-700",
    navy: "bg-igc-navy/10 text-igc-navy",
  };
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", tones[tone])}>{children}</span>;
}

export function SectionHead({ eyebrow, title, desc, center }: { eyebrow?: string; title: string; desc?: string; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="text-sm font-semibold text-igc-blue">{eyebrow}</p>}
      <h2 className="mt-1 text-2xl font-bold text-igc-navy md:text-3xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border bg-white p-6", className)}>{children}</div>;
}

export function IconCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border p-6 transition hover:border-igc-blue hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-igc-blue/10 text-igc-blue">{icon}</div>
      <h3 className="mt-4 font-bold text-igc-navy">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

export function StatBand({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-slate-50 p-6 md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="text-center">
          <p className="text-2xl font-bold text-igc-navy md:text-3xl">{s.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Figure({ src, caption, alt, ratio = "16 / 9", className }: { src: string; caption?: string; alt?: string; ratio?: string; className?: string }) {
  return (
    <figure className={cn("my-7", className)}>
      <img src={src} alt={alt ?? caption ?? "송도 캠퍼스 사진"} loading="lazy" className="w-full rounded-2xl border object-cover" style={{ aspectRatio: ratio }} />
      {caption && <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

export function PricingCard({
  name, price, period, note, features, featured, ctaTo, ctaLabel = "상담 신청",
}: {
  name: string; price: string; period?: string; note?: string; features: string[]; featured?: boolean; ctaTo: string; ctaLabel?: string;
}) {
  return (
    <div className={cn("relative flex flex-col rounded-2xl border p-6", featured ? "border-2 border-igc-blue shadow-md" : "")}>
      {featured && <span className="absolute -top-3 left-6 rounded-full bg-igc-blue px-3 py-1 text-xs font-semibold text-white">추천</span>}
      <h3 className="text-lg font-bold text-igc-navy">{name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-igc-navy">{price}</span>
        {period && <span className="text-sm text-muted-foreground">{period}</span>}
      </div>
      {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2 text-foreground/80">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-igc-mint" /> <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link to={ctaTo} className={cn("mt-6 rounded-lg px-4 py-2.5 text-center text-sm font-semibold", featured ? "bg-igc-blue text-white hover:bg-igc-navy" : "border text-igc-navy hover:bg-slate-50")}>
        {ctaLabel}
      </Link>
    </div>
  );
}
