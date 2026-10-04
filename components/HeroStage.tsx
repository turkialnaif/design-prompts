import type { ReactNode } from "react";
import { Logo3DHero } from "@/components/logo3d/lazy";

/**
 * The home hero. It opens dark and still: only the 3D gold mark, assembled and unlit, beside the copy.
 * The first movement wakes it (HeroScroll sets data-awake): a pool of light opens behind the mark, the
 * stars come out around it, and the mark and the copy lean with the pointer. The firm name is the page's h1.
 */
export default function HeroStage({
  body,
  actions,
  h1,
  cue,
  cueTouch,
}: {
  body: string;
  actions: ReactNode;
  h1: string;
  cue: string;
  cueTouch: string;
}) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 z-0 bg-[#00030f]" />

      {/* light that opens behind the mark when the page wakes; it sits where the mark sits */}
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute end-1/2 top-[30%] aspect-square h-[78%] translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(40,84,220,0.34),rgba(0,18,74,0.26)_46%,transparent_74%)] rtl:-translate-x-1/2 lg:end-1/4 lg:top-1/2 lg:h-[125%]" />
        <div className="absolute end-1/2 top-[44%] h-24 w-[min(70vw,30rem)] translate-x-1/2 bg-[radial-gradient(ellipse,rgba(224,179,90,0.24),transparent_70%)] blur-sm rtl:-translate-x-1/2 lg:end-1/4 lg:top-[74%]" />
        <div className="absolute inset-x-0 top-0 h-[60%] bg-[linear-gradient(180deg,rgba(0,18,74,0.55),transparent)]" />
      </div>

      <div className="absolute inset-0 z-[2]">
        <Logo3DHero />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-5 pb-20 pt-28 md:px-10 lg:justify-center lg:pb-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="hero-lean w-full text-center lg:w-[46%] lg:text-start">
           <div className="hero-in">
            <h1 className="font-display grad-text text-[1.75rem] font-light leading-[1.35] sm:text-4xl lg:text-5xl xl:text-[3.4rem]">{h1}</h1>
            <span aria-hidden className="mx-auto mt-6 block h-px w-20 bg-gradient-to-r from-transparent via-[#e0b35a] to-transparent lg:mx-0 lg:bg-gradient-to-l lg:from-[#e0b35a] lg:via-[#e0b35a]/50 lg:to-transparent" />
            <p className="hero-copy mt-5 text-base font-light leading-8 text-white/90 md:mt-6 md:text-xl md:leading-[2.4rem]">{body}</p>
            <div className="hero-copy mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">{actions}</div>
           </div>
          </div>
        </div>
      </div>

      <p aria-hidden className="hero-hint pointer-events-none absolute inset-x-0 bottom-6 z-10 text-center text-xs font-light tracking-wide text-[#f6e2b3]/70">
        <span className="max-md:hidden">{cue}</span>
        <span className="md:hidden">{cueTouch}</span>
      </p>
    </>
  );
}
