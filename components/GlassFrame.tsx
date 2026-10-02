import type { ReactNode } from "react";

/**
 * The site's signature clear glass: prismatic rim, a slow band of light and a fine inner gold line.
 * Content goes in `children`.
 */
export default function GlassFrame({
  children,
  className = "",
  tint = false,
  hero = false,
}: {
  children: ReactNode;
  className?: string;
  tint?: boolean;
  hero?: boolean;
}) {
  return (
    <div className={`glass-clear glass-prism relative overflow-hidden ${hero ? "glass-hero rounded-[2.25rem] md:rounded-[3.25rem]" : "rounded-[2rem] md:rounded-[2.5rem]"} ${className}`}>
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
