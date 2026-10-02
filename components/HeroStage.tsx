import Image from "next/image";
import type { ReactNode } from "react";
import { Logo3DHero } from "@/components/logo3d/lazy";

/**
 * The home hero. Riyadh by night under a slow push-in and a deep-navy veil; a thin gold frame cut at
 * two corners; two slow gold orbits around the turning 3D mark; one sentence, two actions and a scroll
 * cue. The firm name is the page's real h1 (visually hidden: the mark is the headline).
 */
export default function HeroStage({
  photo,
  blurDataURL,
  body,
  actions,
  h1,
  cue,
}: {
  photo: string;
  blurDataURL?: string;
  body: string;
  actions: ReactNode;
  h1: string;
  cue: string;
}) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden bg-[#00061d]">
        <Image src={photo} {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})} alt="" fill priority sizes="100vw" className="hero-kenburns object-cover" style={{ objectPosition: "center 40%" }} />
      </div>
      <div aria-hidden className="absolute inset-0 z-[1] bg-[#00124a]/60 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,6,29,0.78)_0%,rgba(0,18,74,0.35)_42%,rgba(0,6,29,0.92)_100%)]" />
      <div aria-hidden className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_38%,rgba(30,70,200,0.34),transparent_70%),radial-gradient(ellipse_40%_30%_at_50%_100%,rgba(224,179,90,0.16),transparent_70%)]" />

      {/* orbits and frame */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute start-1/2 top-[39%] -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2">
          <div className="hero-ring-a h-[min(78vw,36rem)] w-[min(78vw,36rem)] rounded-full border border-[#e0b35a]/25 [border-style:dashed]" />
        </div>
        <div className="absolute start-1/2 top-[39%] -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2">
          <div className="hero-ring-b h-[min(58vw,26rem)] w-[min(58vw,26rem)] rounded-full border border-[#f6e2b3]/20" />
        </div>
      </div>
      <div aria-hidden className="chamfer-lg pointer-events-none absolute inset-3 z-[2] border border-[#e0b35a]/30 md:inset-6" />

      <div className="absolute inset-0 z-[2]">
        <Logo3DHero />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-4 pb-32 pt-28 md:px-10 md:pb-36">
        <div className="hero-in relative w-full max-w-3xl text-center">
          <h1 className="sr-only">{h1}</h1>
          <span aria-hidden className="mx-auto block h-px w-24 bg-[linear-gradient(90deg,transparent,#f6e2b3,transparent)]" />
          <p className="mt-5 text-lg font-light leading-9 text-white/90 [text-shadow:0_2px_16px_rgba(0,6,29,0.8)] md:text-2xl md:leading-[2.6rem]">{body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{actions}</div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute bottom-[4.4rem] start-1/2 z-10 hidden -translate-x-1/2 rtl:translate-x-1/2 md:block" title={cue}>
        <span className="relative block h-8 w-px overflow-hidden bg-white/25">
          <span className="hero-cue absolute inset-0 bg-[#f6e2b3]" />
        </span>
      </div>
    </>
  );
}
