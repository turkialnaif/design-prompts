import type { ReactNode } from "react";
import CornerField, { type FieldCorner } from "@/components/CornerField";

/**
 * The site's signature clear glass: prismatic rim, a slow band of light and a fine inner gold line.
 * Content goes in `children`. `pattern` adds the site's diamond corner motif inside the panel —
 * used on `PageHero` so it recurs on every inner page.
 */
export default function GlassFrame({
  children,
  className = "",
  tint = false,
  hero = false,
  pattern,
}: {
  children: ReactNode;
  className?: string;
  tint?: boolean;
  hero?: boolean;
  pattern?: FieldCorner;
}) {
  return (
    <div className={`glass-clear glass-prism relative overflow-hidden ${hero ? "glass-hero rounded-[2.25rem] md:rounded-[3.25rem]" : "rounded-[2rem] md:rounded-[2.5rem]"} ${className}`}>
      {pattern && (
        <CornerField
          tone="cream"
          corner={pattern}
          opacity={0.16}
          size={70}
          className={`absolute h-40 w-40 md:h-56 md:w-56 ${pattern[0] === "t" ? "-top-4" : "-bottom-4"} ${pattern[1] === "l" ? "-left-4" : "-right-4"}`}
        />
      )}
      {hero && (
        <>
          <span aria-hidden className="glass-hero-blur pointer-events-none absolute inset-0 rounded-[inherit]" />
          <span aria-hidden className="glass-hero-blur-top pointer-events-none absolute inset-0 rounded-[inherit]" />
        </>
      )}
      {tint && <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[#0a1626]/45" />}
      <div aria-hidden className="glass-sheen pointer-events-none absolute inset-0 rounded-[inherit]" />
      <span aria-hidden className="glass-sweep pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" />
      {hero && <span aria-hidden className="glass-hero-glow pointer-events-none absolute inset-0 rounded-[inherit]" />}
      <span aria-hidden className="pointer-events-none absolute inset-3 rounded-[1.35rem] border border-[#f0d894]/35 md:inset-4 md:rounded-[1.9rem]" />
      {children}
    </div>
  );
}
