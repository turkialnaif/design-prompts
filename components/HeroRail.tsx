import Link from "next/link";
import type { ServiceTile } from "@/components/ServiceTiles";

const copy = {
  ar: { label: "خدماتنا", all: "جميع الخدمات", href: "/services", arrow: "←" },
  en: { label: "Services", all: "All services", href: "/en/services", arrow: "→" },
};

/** A slim glass rail closing the hero: every service line drifts past as a link; it pauses under the pointer. */
export default function HeroRail({ locale, tiles }: { locale: "ar" | "en"; tiles: ServiceTile[] }) {
  const t = copy[locale];
  const track = [...tiles, ...tiles];
  return (
    <div className="glass-clear mx-auto flex w-full max-w-3xl items-stretch overflow-hidden rounded-full">
      <div className="flex shrink-0 items-center gap-2 border-e border-white/25 bg-[#0a1626]/55 px-4 text-[11px] font-bold text-[#f0d894]">
        <span aria-hidden className="h-1 w-1 rotate-45 bg-[#e6c988]" />
        {t.label}
      </div>

      <div
        dir="ltr"
        className="hero-rail min-w-0 flex-1 overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)" }}
      >
        <div className="hero-rail-track flex w-max">
          {track.map((s, i) => (
            <Link
              key={`${s.href}-${i}`}
              href={s.href}
              dir={locale === "ar" ? "rtl" : "ltr"}
              aria-hidden={i >= tiles.length}
              tabIndex={i >= tiles.length ? -1 : undefined}
              className="group flex shrink-0 items-center px-4 py-2 transition-colors hover:bg-white/10"
            >
              <span className="font-display whitespace-nowrap text-[13px] font-semibold text-white transition-colors group-hover:text-[#f6e2b3]">{s.title}</span>
              <span aria-hidden className="ms-4 h-1 w-1 rotate-45 bg-[#e6c988]/70" />
            </Link>
          ))}
        </div>
      </div>

      <Link href={t.href} className="hidden shrink-0 items-center border-s border-white/25 px-4 text-[11px] font-bold text-[#f0d894] transition-colors hover:bg-white/10 sm:flex">
        {t.all} {t.arrow}
      </Link>

      <style>{`
        @keyframes hero-rail-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .hero-rail-track { animation: hero-rail-scroll 60s linear infinite; }
        .hero-rail:hover .hero-rail-track, .hero-rail:focus-within .hero-rail-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .hero-rail-track { animation: none; } .hero-rail { overflow-x: auto; } }
      `}</style>
    </div>
  );
}
