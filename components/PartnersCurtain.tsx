import Image from "next/image";
import { partners, type Partner } from "@/lib/partners";

const copy = {
  ar: { label: "شركاء النجاح", note: "علامات تعتز بثقتها فينا", count: "شريكًا" },
  en: { label: "Success Partners", note: "Brands that trust us", count: "partners" },
};

function Track({ items, dir, dur, color }: { items: Partner[]; dir: "up" | "down"; dur: number; color?: boolean }) {
  return (
    <ul className={`vtrack ${dir === "up" ? "vtrack-up" : "vtrack-down"} flex flex-col items-center gap-2.5`} style={{ animationDuration: `${dur}s` }}>
      {[0, 1].map((c) =>
        items.map((p, i) => (
          <li key={`${c}-${i}`} className={color ? "vtile vtile-color" : "vtile"}>
            <Image src={p.src} alt="" width={104} height={104} sizes="56px" loading={c === 0 ? "eager" : "lazy"} className="h-full w-full" />
          </li>
        )),
      )}
    </ul>
  );
}

function Lanes({ n, className = "" }: { n: number; className?: string }) {
  const lanes = Array.from({ length: n }, (_, i) => partners.filter((_, k) => k % n === i));
  return (
    <div className={`grid h-full ${className}`} style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
      {lanes.map((items, i) => {
        const dir = i % 2 ? "down" : "up";
        const dur = 30 + ((i * 7) % 23);
        return (
          <div key={i} className="relative h-full overflow-hidden">
            <Track items={items} dir={dir} dur={dur} />
            <div className="vlens absolute inset-0">
              <Track items={items} dir={dir} dur={dur} color />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Sits under the footer's call-to-action buttons. A narrow curtain of partner logos falling and
 * rising in vertical lanes: every logo is quiet and monochrome except while it crosses the "lens" —
 * a band across the middle where it lights in full colour and gains a gold edge — so partners are read
 * one after another. The colour layer is a second copy of each lane, clipped to the lens and moving
 * in lock-step. A caption line gives the count.
 */
export default function PartnersCurtain({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  return (
    <div role="group" aria-label={`${t.label} — ${partners.length}`} className="mx-auto mt-14 max-w-4xl md:mt-16">
      <div className="flex items-center gap-4">
        <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e0b35a]/60" />
        <p className="text-center text-sm font-light text-[#f6e2b3]">
          {t.label} <span className="mx-2 text-white/30">·</span> <span dir="ltr" className="font-display text-base">{partners.length}</span> <span className="text-white/60">{t.note}</span>
        </p>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e0b35a]/60" />
      </div>
      <div className="curtain relative mt-4 h-[13.5rem] md:h-[12rem]">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_26%,#000_74%,transparent)]">
          <Lanes n={14} className="max-md:hidden" />
          <Lanes n={6} className="md:hidden" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[38%] h-px bg-gradient-to-r from-transparent via-[#e0b35a]/70 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[38%] h-px bg-gradient-to-r from-transparent via-[#e0b35a]/70 to-transparent" />
      </div>
    </div>
  );
}
