import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/** Hero content shared by every inner page: small eyebrow, a large gradient title, an optional lead, then whatever follows (stats, actions). */
export function HeroHead({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <div className="px-2 text-center md:px-8">
      <p className="gold-eyebrow !text-[#f6e2b3] text-xs md:text-sm">{eyebrow}</p>
      <h1 className="font-display grad-text mt-4 text-5xl leading-[1.25] md:text-7xl">{title}</h1>
      {lead && <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-9 text-white/85 md:text-xl md:leading-10">{lead}</p>}
      {children}
    </div>
  );
}

/** The navy field behind every dark hero: deep gradient, a violet and an amber glow, a faint dot lattice. Place inside an `isolate relative overflow-hidden` section. */
export function NavyField() {
  return (
    <>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#00061d_0%,#00124a_62%,#00061d_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(30,70,200,0.34),transparent_72%),radial-gradient(ellipse_35%_40%_at_100%_100%,rgba(224,179,90,0.16),transparent_70%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1.2px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,#000,transparent_75%)]" />
    </>
  );
}

const bands = {
  white: "bg-white",
  tint: "bg-[#f4f5fe]",
  dark: "bg-[#00061d] text-white",
} as const;

/** A full-width section on one of the three surfaces of the identity: white, lavender tint, or deep navy. */
export function Band({ tone = "white", children, className = "", id }: { tone?: keyof typeof bands; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} data-glow={tone === "dark" ? "" : undefined} className={`relative isolate overflow-hidden py-20 md:py-28 ${bands[tone]} ${className}`}>
      {tone === "dark" && (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#00061d_0%,#00124a_55%,#00061d_100%)]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(30,70,200,0.26),transparent_70%),radial-gradient(ellipse_30%_35%_at_0%_100%,rgba(224,179,90,0.12),transparent_70%)]" />
        </>
      )}
      {children}
    </section>
  );
}

export function Wrap({ children, max = "6xl", className = "" }: { children: ReactNode; max?: "3xl" | "4xl" | "5xl" | "6xl" | "7xl"; className?: string }) {
  const m = { "3xl": "max-w-3xl", "4xl": "max-w-4xl", "5xl": "max-w-5xl", "6xl": "max-w-6xl", "7xl": "max-w-7xl" }[max];
  return <div className={`mx-auto px-5 ${m} ${className}`}>{children}</div>;
}

/** Centered section heading with optional lead, revealed on scroll. */
export function BandHead({ number, eyebrow, title, lead, tone = "onLight" }: { number?: string; eyebrow: string; title: string; lead?: string; tone?: "onLight" | "onDark" }) {
  return (
    <Reveal>
      <SectionHeading number={number} eyebrow={eyebrow} title={title} lead={lead} tone={tone} />
    </Reveal>
  );
}

/** A big gradient figure with a caption, on a chamfered glass tile (for dark surfaces). */
export function StatTile({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="chamfer border border-white/12 bg-white/[0.06] px-4 py-6 text-center backdrop-blur-md">
      <span className="font-display grad-text block text-5xl font-light leading-none md:text-6xl">{value}</span>
      <span className="mt-3 block text-sm font-light text-white/75">{label}</span>
    </div>
  );
}

/** Numbered rows with hairlines — the same list language as the home page's sectors. `tone` picks colours for light or dark surfaces. */
export function RowList({ items, tone = "light", cols = 1 }: { items: { title: string; text?: string; href?: string; tag?: string }[]; tone?: "light" | "dark"; cols?: 1 | 2 }) {
  const dark = tone === "dark";
  return (
    <ul className={`grid ${dark ? "border-t border-white/15" : "border-t border-[#00124a]/15"} ${cols === 2 ? "md:grid-cols-2 md:gap-x-16" : ""}`}>
      {items.map((it, i) => {
        const inner = (
          <div className="group relative flex items-start gap-5 overflow-hidden px-3 py-6 md:py-7">
            <span aria-hidden className="absolute inset-0 origin-[100%_50%] scale-x-0 bg-[linear-gradient(to_left,rgba(224,179,90,0.18),rgba(246,226,179,0.14),rgba(224,179,90,0.12))] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className={`relative pt-2 font-display text-xs tracking-widest ${dark ? "text-white/50" : "text-[#00124a]/45"}`} dir="ltr">{String(i + 1).padStart(2, "0")}</span>
            <div className="relative flex-1">
              {it.tag && <span className={`mb-1 block text-xs ${dark ? "text-[#f6e2b3]" : "text-[#012696]"}`}>{it.tag}</span>}
              <h3 className={`font-display text-2xl font-light md:text-3xl ${dark ? "text-white" : "text-[#00124a]"}`}>{it.title}</h3>
              {it.text && <p className={`mt-2 max-w-2xl text-[15px] font-light leading-8 ${dark ? "text-white/75" : "text-ink-soft"}`}>{it.text}</p>}
            </div>
          </div>
        );
        return (
          <li key={it.title} className={dark ? "border-b border-white/15" : "border-b border-[#00124a]/15"}>
            <Reveal delay={(i % 2) * 50}>{it.href ? <Link href={it.href}>{inner}</Link> : inner}</Reveal>
          </li>
        );
      })}
    </ul>
  );
}

/** Three-up numbered columns with big gradient numerals (principles, approach steps). */
export function Numbered({ items, tone = "light" }: { items: { title?: string; text: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className="grid gap-px overflow-hidden md:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={i} delay={i * 90}>
          <div className={`h-full p-8 md:p-10 ${dark ? "border-white/12 md:border-s" : "border-[#00124a]/12 md:border-s"} first:border-s-0`}>
            <span className={`font-display ${dark ? "grad-text" : "grad-text-light"} block text-7xl font-light leading-none md:text-8xl`} dir="ltr">{i + 1}</span>
            {it.title && <h3 className={`font-display mt-6 text-2xl font-light ${dark ? "text-white" : "text-[#00124a]"}`}>{it.title}</h3>}
            <p className={`mt-3 text-[15px] font-light leading-8 ${dark ? "text-white/75" : "text-ink-soft"}`}>{it.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
