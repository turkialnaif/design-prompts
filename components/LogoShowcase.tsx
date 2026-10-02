"use client";

import { useEffect, useRef, useState } from "react";
import { LogoShowcaseStage } from "@/components/logo3d/lazy";
import { newRig } from "@/components/logo3d/Mark";

type Step = { k: string; v: string; text: string };

const copy = {
  ar: {
    eyebrow: "How We Work",
    title: "ثلاثة مبادئ نبني عليها كل ملف",
    hint: "مرّر لتفكيك الشعار",
    steps: [
      { k: "دقة", v: "في التحليل والصياغة", text: "نبدأ من قراءة الوقائع والمخاطر والهدف التجاري، ثم نبني الموقف القانوني بالحجة والدليل." },
      { k: "وضوح", v: "في النطاق والمخرجات", text: "نتفق منذ البداية على نطاق العمل والمخرجات والافتراضات، ونكتب بلغة تناسب المحكمة والعميل." },
      { k: "متابعة", v: "حتى يكتمل الأثر", text: "نُبقيك مطّلعًا على سير ملفك عبر بوابة العملاء، ونواصل إلى ما بعد التنفيذ حتى يكتمل الأثر." },
    ] as Step[],
  },
  en: {
    eyebrow: "How We Work",
    title: "Three principles behind every file",
    hint: "Scroll to take the mark apart",
    steps: [
      { k: "Precision", v: "in analysis and drafting", text: "We start by reading the facts, the risks and the commercial objective, then build the legal position on argument and evidence." },
      { k: "Clarity", v: "in scope and deliverables", text: "We agree the scope, the deliverables and the assumptions at the outset, and write in language fitted to the court and the client." },
      { k: "Follow-through", v: "until the effect is complete", text: "We keep you informed on your file through the client portal and stay engaged past execution until the effect is complete." },
    ] as Step[],
  },
};

const HL: [number, number, number][] = [
  [1, 0.1, 0.1],
  [0.1, 1, 0.1],
  [0.1, 0.1, 1],
];

/**
 * A pinned stage: the section holds still for three screens while the 3D mark turns, draws apart and
 * lights one part at a time — top slab, second slab, legs — each tied to one of the firm's principles.
 * With reduced motion the stage is replaced by three plain cards.
 */
export default function LogoShowcase({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const rtl = locale === "ar";
  const section = useRef<HTMLElement>(null);
  const rig = useRef(newRig());
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const r = rig.current;
    r.spin = 0.04;
    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const wide = window.matchMedia("(min-width: 768px)").matches;
      const s = p < 0.3 ? 0 : p < 0.64 ? 1 : 2;
      const done = p > 0.95;
      r.explode = p < 0.04 ? 0 : p < 0.14 ? (p - 0.04) / 0.1 : done ? 0 : 1;
      r.dim = done ? 0 : 1;
      r.hl = HL[s];
      r.yaw = 0.35 + p * Math.PI * 2.3;
      r.x = wide ? (rtl ? -2.25 : 2.25) : 0;
      r.y = wide ? -0.15 : 1.0;
      r.scale = wide ? 0.74 : 0.55;
      if (s !== last) {
        last = s;
        setStep(s);
      }
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [rtl]);

  return (
    <section ref={section} data-glow aria-label={t.title} className="relative h-[330vh] motion-reduce:h-auto">
      <div className="sticky top-0 h-screen overflow-hidden motion-reduce:static motion-reduce:h-auto">
        <div aria-hidden className="absolute inset-0 -z-0 bg-[linear-gradient(180deg,#00061d_0%,#00124a_50%,#00061d_100%)]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_50%_50%,rgba(155,136,215,0.22),transparent_70%)]" />
        <div className="motion-reduce:hidden">
          <LogoShowcaseStage rig={rig} />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col px-5 pt-28 motion-reduce:h-auto motion-reduce:py-24 md:pt-32">
          <div className="text-center">
            <p className="gold-eyebrow !text-[#f6e2b3] text-xs md:text-sm">{t.eyebrow}</p>
            <h2 className="font-display grad-text mt-3 text-3xl md:text-5xl">{t.title}</h2>
          </div>

          <div className="relative mt-auto mb-16 h-56 md:absolute md:inset-y-0 md:mb-0 md:mt-0 md:flex md:h-auto md:w-[26rem] md:items-center motion-reduce:hidden md:[inset-inline-start:2%]">
            {t.steps.map((s, i) => (
              <div
                key={s.k}
                aria-hidden={i !== step}
                className={`absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-700 ease-out md:bottom-auto ${
                  i === step ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                <div className="chamfer-lg border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl md:p-8">
                  <span className="font-display text-sm tracking-[0.3em] text-[#f6e2b3]" dir="ltr">{`0${i + 1} / 03`}</span>
                  <h3 className="font-display grad-text mt-3 text-5xl font-light md:text-6xl">{s.k}</h3>
                  <p className="mt-1 text-sm text-[#f6e2b3]">{s.v}</p>
                  <p className="mt-4 text-[15px] font-light leading-8 text-white/85">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden motion-reduce:grid motion-reduce:gap-5 motion-reduce:md:grid-cols-3">
            {t.steps.map((s) => (
              <div key={s.k} className="chamfer-lg border border-white/15 bg-white/[0.07] p-6">
                <h3 className="font-display grad-text text-4xl font-light">{s.k}</h3>
                <p className="mt-1 text-sm text-[#f6e2b3]">{s.v}</p>
                <p className="mt-3 text-[15px] font-light leading-8 text-white/85">{s.text}</p>
              </div>
            ))}
          </div>

          <div aria-hidden className="absolute bottom-6 start-1/2 hidden w-48 -translate-x-1/2 flex-col items-center gap-2 text-[11px] text-white/60 motion-safe:flex">
            <span>{t.hint}</span>
            <span className="relative block h-[2px] w-full overflow-hidden bg-white/20">
              <span className="absolute inset-y-0 start-0 bg-gradient-to-l from-[#9b88d7] via-[#f3a6b6] to-[#f4932c]" style={{ width: `${progress * 100}%` }} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
