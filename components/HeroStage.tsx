"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

/** `logo: true` shows the firm's mark in place of a headline; `headline` is used otherwise. `sub` is optional — the logo slide carries none. */
export type HeroSlide = { headline?: string; sub?: string; body: string; logo?: boolean };

const INTERVAL = 7000;

/**
 * One still Riyadh photograph. Only the words (and, on one slide, the firm's own mark) change —
 * and the white progress bar runs; the seal lives beside the chat button.
 */
export default function HeroStage({
  photo,
  blurDataURL,
  slides,
  actions,
  subLtr,
  h1,
}: {
  photo: string;
  blurDataURL?: string;
  slides: HeroSlide[];
  actions: ReactNode;
  subLtr: boolean;
  /** A real, visually hidden h1 for SEO/accessibility — the visible headline slides aren't always the same tag. */
  h1: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setTimeout(() => setActive((v) => (v + 1) % slides.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active, slides.length]);

  return (
    <>
      <div aria-hidden className="absolute inset-0 z-0 bg-[#0e1c2e]">
        <Image src={photo} {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center 40%" }} />
      </div>
      <div aria-hidden className="absolute inset-0 z-[1] bg-[#0c1f3a]/50 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(7,16,30,0.62)_0%,rgba(10,26,48,0.26)_42%,rgba(7,16,30,0.82)_100%)]" />
      <div aria-hidden className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_35%,rgba(5,12,24,0.55)_100%)]" />

      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[1] h-44 bg-[linear-gradient(to_bottom,transparent,#0a1320)]" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-4 pb-20 pt-24 md:px-10">
        <div className="hero-in relative w-full px-2 pb-4 pt-6 text-center md:px-10 max-w-6xl">
          <div aria-hidden className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(5,12,24,0.5),transparent_75%)]" />
          <h1 className="sr-only">{h1}</h1>

          <div className="relative grid place-items-center">
            {slides.map((s, i) => {
              const on = i === active;
              const Heading = "h2" as const;
              return (
                <div
                  key={s.body}
                  aria-hidden={!on}
                  className={`col-start-1 row-start-1 flex flex-col items-center transition-[opacity,transform] ease-out ${on ? "translate-y-0 opacity-100 delay-[450ms] duration-[900ms]" : "pointer-events-none translate-y-3 opacity-0 duration-[400ms]"}`}
                >
                  {s.logo ? (
                    <Image
                      src="/brand/logo-lockup.png"
                      alt=""
                      width={1632}
                      height={480}
                      className="h-auto w-64 [filter:drop-shadow(0_10px_30px_rgba(5,12,24,0.6))] sm:w-80 md:w-[26rem] lg:w-[30rem]"
                    />
                  ) : (
                    <Heading
                      className={`max-w-6xl bg-gradient-to-b from-[#fdf3d2] via-[#e6c988] to-[#b98d3c] bg-clip-text pb-2 font-bold text-transparent [filter:drop-shadow(0_6px_24px_rgba(5,12,24,0.55))] ${
                        subLtr
                          ? "text-6xl leading-[1.3] sm:text-8xl md:text-9xl lg:text-[9.5rem]"
                          : "font-display text-5xl leading-[1.25] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                      }`}
                      style={subLtr ? { fontFamily: "var(--font-ruqaa), serif" } : { letterSpacing: "-0.02em" }}
                    >
                      {s.headline}
                    </Heading>
                  )}
                  <span aria-hidden className="mt-4 block h-px w-24 bg-[linear-gradient(90deg,transparent,#f0d894,transparent)]" />
                  {s.sub && (
                    <p className="mt-4 text-base font-semibold tracking-wide text-[#f6e2b3] [text-shadow:0_2px_14px_rgba(5,12,24,0.7)] md:text-xl" dir={subLtr ? "ltr" : "rtl"}>
                      {s.sub}
                    </p>
                  )}
                  <p className="mt-4 max-w-3xl text-sm leading-8 text-white/90 [text-shadow:0_2px_14px_rgba(5,12,24,0.7)] md:text-base md:leading-9">{s.body}</p>
                </div>
              );
            })}
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">{actions}</div>

          {slides.length > 1 && (
            <div className="relative mx-auto mt-6 flex w-56 gap-2 md:w-80" role="tablist">
              {slides.map((s, i) => (
                <button
                  key={s.body}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${i + 1}`}
                  onClick={() => setActive(i)}
                  className="group h-4 flex-1 cursor-pointer"
                >
                  <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/30">
                    {i === active && <span key={active} className="hero-progress absolute inset-y-0 start-0 bg-white" style={{ animationDuration: `${INTERVAL}ms` }} />}
                    {i < active && <span className="absolute inset-0 bg-white" />}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
