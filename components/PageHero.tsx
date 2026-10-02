import type { ReactNode } from "react";
import { Logo3DMini } from "@/components/logo3d/lazy";
import { NavyField } from "@/components/ui";

/**
 * The opening of every inner page. No photograph: a deep navy field with a violet glow, a faint dot
 * lattice (the nine-dot motif of the buttons), the turning gold mark in the corner and a slanted lower
 * edge. `panel` wraps the content in the chamfered glass panel used by the footer (for dense heroes).
 */
export default function PageHero({
  children,
  wide = false,
  mark = true,
  panel = false,
}: {
  children: ReactNode;
  wide?: boolean;
  mark?: boolean;
  panel?: boolean;
}) {
  return (
    <section data-glow className="hero-cut relative isolate overflow-hidden bg-[#00061d] px-5 pb-20 pt-32 md:px-10 md:pb-32 md:pt-44">
      <NavyField />
      {mark && (
        <div aria-hidden className="pointer-events-none absolute -top-4 end-0 -z-0 hidden h-60 w-60 sm:block md:end-10 md:top-10 md:h-80 md:w-80">
          <Logo3DMini />
        </div>
      )}
      <div className={`relative z-10 mx-auto ${wide ? "max-w-6xl" : "max-w-4xl"} ${panel ? "chamfer-lg border border-white/10 bg-white/[0.05] backdrop-blur-xl" : ""}`}>{children}</div>
    </section>
  );
}
