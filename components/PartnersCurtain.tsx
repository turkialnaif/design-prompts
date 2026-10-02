import Image from "next/image";
import { partners, type Partner } from "@/lib/partners";

const copy = {
  ar: { label: "شركاء النجاح", note: "علامات تعتز بثقتها فينا", count: "شريكًا" },
  en: { label: "Success Partners", note: "Brands that trust us", count: "partners" },
};

function Track({ items, dir, dur, color }: { items: Partner[]; dir: "up" | "down"; dur: number; color?: boolean }) {
  return (
    <ul className={`vtrack ${dir === "up" ? "vtrack-up" : "vtrack-down"} flex flex-col items-center gap-3`} style={{ animationDuration: `${dur}s` }}>
      {[0, 1].map((c) =>
        items.map((p, i) => (
          <li key={`${c}-${i}`} className={color ? "vtile vtile-color" : "vtile"}>
            <Image src={p.src} alt="" width={104} height={104} sizes="56px" loading={c === 0 ? "eager" : "lazy"} className="h-12 w-12 md:h-14 md:w-14" />
          </li>
        )),
      )}
    </ul>
  );
}

function Lanes({ n, className = "" }: { n: number; className?: string }) {
  const lanes = Array.from({ length: n }, (_, i) => partners.filter((_, k) => k % n === i));
  return (
    <div className={`vlanes grid h-full ${className}`} style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
      {lanes.map((items, i) => {
        const dir = i % 2 ? "down" : "up";
        const dur = 34 + (i * 7) % 23;
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
 * The page's last word: a curtain of partner logos falling and rising in vertical lanes. Every logo is
 * quiet and monochrome except while it crosses the "lens" — a band across the middle where it lights
 * up in full colour — so the eye reads the partners one after another instead of all at once.
 * The colour layer is a second copy of each lane, clipped to the lens and moving in lock-step.
 */
export default function PartnersCurtain({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  return (
    <section aria-label={t.label} className="relative isolate overflow-hidden bg-[#00061d]">
      <div aria-hidden className="orn absolute inset-x-0 top-0" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_90%_at_50%_100%,rgba(30,70,200,0.28),transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-10 md:grid-cols-[17rem_1fr] md:gap-12 md:py-14">
        <div className="text-center md:text-start">
          <p className="gold-eyebrow !text-[#f6e2b3] text-xs">Success Partners</p>
          <h2 className="font-display mt-3 text-4xl font-light leading-[1.2] text-[#f6e2b3] md:text-5xl">{t.label}</h2>
          <p className="mt-3 text-sm font-light text-white/60">{t.note}</p>
          <p className="font-display mt-4 text-6xl font-extralight leading-none text-transparent [-webkit-text-stroke:1px_rgba(224,179,90,0.8)]" dir="ltr">
            {partners.length}
            <span className="ms-2 align-middle text-sm tracking-widest text-[#f6e2b3]/70 [-webkit-text-stroke:0]">{t.count}</span>
          </p>
        </div>

        <div className="curtain relative h-[17rem] md:h-[20rem]">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]">
            <Lanes n={8} className="max-md:hidden" />
            <Lanes n={4} className="md:hidden" />
          </div>
          {/* the lens: two hairlines across the lanes */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[38%] h-px bg-gradient-to-r from-transparent via-[#e0b35a]/70 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[38%] h-px bg-gradient-to-r from-transparent via-[#e0b35a]/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
