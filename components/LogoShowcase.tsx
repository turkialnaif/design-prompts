"use client";

import { useEffect, useRef, useState } from "react";
import { LogoShowcaseStage } from "@/components/logo3d/lazy";
import { newRig } from "@/components/logo3d/rig";
import { serviceStandard } from "@/lib/site";
import { serviceStandardEn } from "@/lib/site.en";

type Step = { k: string; v?: string; text: string };

const principles = {
  ar: {
    eyebrow: "How We Work",
    title: "ثلاثة مبادئ نبني عليها كل ملف",
    steps: [
      { k: "دقة", v: "في التحليل والصياغة", text: "نبدأ من قراءة الوقائع والمخاطر والهدف التجاري، ثم نبني الموقف القانوني بالحجة والدليل." },
      { k: "وضوح", v: "في النطاق والمخرجات", text: "نتفق منذ البداية على نطاق العمل والمخرجات والافتراضات، ونكتب بلغة تناسب المحكمة والعميل." },
      { k: "متابعة", v: "حتى يكتمل الأثر", text: "نُبقيك مطّلعًا على سير ملفك عبر بوابة العملاء، ونواصل إلى ما بعد التنفيذ حتى يكتمل الأثر." },
    ] as Step[],
  },
  en: {
    eyebrow: "How We Work",
    title: "Three principles behind every file",
    steps: [
      { k: "Precision", v: "in analysis and drafting", text: "We start by reading the facts, the risks and the commercial objective, then build the legal position on argument and evidence." },
      { k: "Clarity", v: "in scope and deliverables", text: "We agree the scope, the deliverables and the assumptions at the outset, and write in language fitted to the court and the client." },
      { k: "Follow-through", v: "until the effect is complete", text: "We keep you informed on your file through the client portal and stay engaged past execution until the effect is complete." },
    ] as Step[],
  },
};

const think = {
  ar: {
    eyebrow: "Principles",
    title: "كيف نفكّر",
    steps: [
      { k: "نفهم السياق", v: "وتفاصيل العمل", text: "يبدأ العمل من قراءة الوقائع والمخاطر والهدف التجاري." },
      { k: "نبني الموقف القانوني", text: "نربط النص النظامي بالحجة والدليل والنتيجة المتوقعة." },
      { k: "نواصل إلى ما بعد التنفيذ", text: "نهتم بما بعد: الرأي أو الحكم أو الإجراء أو المدد أو المخاطر." },
    ] as Step[],
  },
  en: {
    eyebrow: "Principles",
    title: "How We Think",
    steps: [
      { k: "We understand the context", v: "and the business detail", text: "The engagement starts by reading the facts, the risks, and the commercial objective." },
      { k: "We build the legal position", text: "Connecting the statutory text to the argument, the evidence, and the expected outcome." },
      { k: "We follow through past execution", text: "We stay engaged with what follows: the opinion, the judgment, the procedure, deadlines, and risks." },
    ] as Step[],
  },
};

const standard = {
  ar: { eyebrow: "Service Standard", title: "معيار الخدمة", steps: serviceStandard.map((s) => ({ k: s.title, text: s.description })) as Step[] },
  en: { eyebrow: "Service Standard", title: "Our Service Standard", steps: serviceStandardEn.map((s) => ({ k: s.title, text: s.description })) as Step[] },
};

const hints = {
  ar: "حرّك الماوس لتدوير الشعار · مرّر للانتقال",
  en: "Move the mouse to turn the mark · scroll to continue",
};

/** Which of the mark's three parts (top slab, second slab, legs) each step lights. */
const groupOf = (i: number, n: number) => Math.min(2, Math.floor((i / n) * 3));

/**
 * Each card has its own entrance. They alternate between the right and left of the screen (physical sides,
 * whatever the language): the first from the right, the second from the left, the third from the right again
 * but dropping in from above. The 3D mark moves to the opposite side each time, so the pair trade places.
 * `x` is the card's side (1 = right), `from` its offset when it is not on stage yet; once passed it leaves
 * the other way.
 */
const stagger = [
  { side: 1, from: "translate3d(110px,0,0) rotate(1.5deg)", leave: "translate3d(-110px,0,0) rotate(-1.5deg)" },
  { side: -1, from: "translate3d(-110px,0,0) rotate(-1.5deg)", leave: "translate3d(110px,0,0) rotate(1.5deg)" },
  { side: 1, from: "translate3d(70px,-130px,0) rotate(3deg)", leave: "translate3d(0,120px,0) rotate(-2deg)" },
];
const sideOf = (i: number) => stagger[i % stagger.length].side;

/**
 * A pinned stage: the section holds still while the visitor scrolls through its steps. The 3D mark
 * stays whole and turns to follow the pointer; each step lights one part of it. With reduced motion the
 * stage is replaced by plain cards.
 */
export default function LogoShowcase({ locale, variant = "principles" }: { locale: "ar" | "en"; variant?: "principles" | "think" | "standard" }) {
  const t = ({ principles, think, standard }[variant])[locale];
  const rtl = locale === "ar";
  const n = t.steps.length;
  const section = useRef<HTMLElement>(null);
  const rig = useRef(newRig());
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const r = rig.current;
    r.introAt = -10;
    r.spin = 0;
    r.explode = 0;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0;
    let last = -1;
    let cur = 0;
    const place = () => {
      const wide = window.matchMedia("(min-width: 768px)").matches;
      r.x = wide ? -sideOf(cur) * 2.25 : 0;
      r.y = wide ? -0.1 : 1.0;
      r.scale = wide ? 0.82 : 0.55;
    };
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const s = Math.min(n - 1, Math.floor(p * n));
      const done = p > 0.985;
      r.hl = [0.1, 0.1, 0.1];
      r.hl[groupOf(s, n)] = 1;
      cur = s;
      r.dim = done ? 0 : 1;
      if (!fine) r.yaw = 0.35 + (p - 0.5) * 1.4;
      place();
      if (s !== last) {
        last = s;
        setStep(s);
      }
      setProgress(p);
      // while the stage is pinned the site bar steps out of the way
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (pinned) document.documentElement.dataset.hideHeader = "1";
      else delete document.documentElement.dataset.hideHeader;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      if (!fine) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      r.yaw = 0.35 + (e.clientX / window.innerWidth - 0.5) * 1.5;
      r.pitch = 0.1 - (e.clientY / window.innerHeight - 0.5) * 0.55;
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      delete document.documentElement.dataset.hideHeader;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [rtl, n]);

  return (
    <section
      ref={section}
      data-glow
      aria-label={t.title}
      className="relative motion-reduce:!h-auto"
      style={{ height: `calc(100svh + ${n * 62}svh)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden motion-reduce:static motion-reduce:h-auto">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#00061d_0%,#00124a_50%,#00061d_100%)]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_50%_50%,rgba(30,70,200,0.3),transparent_70%)]" />
        <div className="motion-reduce:hidden">
          <LogoShowcaseStage rig={rig} />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col px-5 pt-28 motion-reduce:h-auto motion-reduce:py-24 md:pt-32">
          <div className="text-center">
            <p className="gold-eyebrow !text-[#f6e2b3] text-xs md:text-sm">{t.eyebrow}</p>
            <h2 className="font-display grad-text mt-4 text-4xl leading-[1.25] sm:text-5xl md:text-6xl">{t.title}</h2>
          </div>

          <div className="relative mb-16 mt-auto h-64 md:absolute md:inset-x-[2%] md:inset-y-0 md:mb-0 md:mt-0 md:flex md:h-auto md:items-center motion-reduce:hidden">
            {t.steps.map((s, i) => {
              const st = stagger[i % stagger.length];
              const away = i === step ? "none" : i < step ? st.leave : st.from;
              return (
              <div
                key={s.k}
                aria-hidden={i !== step}
                style={{ transform: away }}
                className={`absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] md:bottom-auto md:w-[26rem] ${
                  st.side === 1 ? "md:right-0 md:left-auto" : "md:left-0 md:right-auto"
                } ${i === step ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <div className="chamfer-lg border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl md:p-8">
                  <span className="font-display text-sm tracking-[0.3em] text-[#f6e2b3]" dir="ltr">{`${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`}</span>
                  <h3 className="font-display grad-text mt-3 text-4xl font-light md:text-5xl">{s.k}</h3>
                  {s.v && <p className="mt-1 text-sm text-[#f6e2b3]">{s.v}</p>}
                  <p className="mt-4 text-[15px] font-light leading-8 text-white/85">{s.text}</p>
                </div>
              </div>
              );
            })}
          </div>

          <div className="hidden motion-reduce:grid motion-reduce:gap-5 motion-reduce:md:grid-cols-3">
            {t.steps.map((s) => (
              <div key={s.k} className="chamfer-lg border border-white/15 bg-white/[0.07] p-6">
                <h3 className="font-display grad-text text-3xl font-light">{s.k}</h3>
                {s.v && <p className="mt-1 text-sm text-[#f6e2b3]">{s.v}</p>}
                <p className="mt-3 text-[15px] font-light leading-8 text-white/85">{s.text}</p>
              </div>
            ))}
          </div>

          <div aria-hidden className="absolute bottom-6 start-1/2 hidden w-64 -translate-x-1/2 flex-col items-center gap-2 text-[11px] text-white/60 motion-safe:flex rtl:translate-x-1/2">
            <span>{hints[locale]}</span>
            <span className="relative block h-[2px] w-full overflow-hidden bg-white/20">
              <span className="absolute inset-y-0 start-0 bg-gradient-to-l from-[#dbe4ff] via-[#f6e2b3] to-[#e0b35a]" style={{ width: `${progress * 100}%` }} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
