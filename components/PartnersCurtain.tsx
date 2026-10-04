import Image from "next/image";
import { partners, type Partner } from "@/lib/partners";

const copy = {
  ar: { label: "شركاء النجاح", note: "علامات تعتز بثقتها فينا" },
  en: { label: "Success Partners", note: "Brands that trust us" },
};

function Track({ items, reverse, dur, color }: { items: Partner[]; reverse: boolean; dur: number; color?: boolean }) {
  return (
    <ul className={`htrack ${reverse ? "htrack-rev" : ""} flex w-max items-center gap-2`} style={{ animationDuration: `${dur}s` }}>
      {[0, 1, 2, 3].map((c) =>
        items.map((p, i) => (
          <li key={`${c}-${i}`} className={color ? "vtile vtile-color" : "vtile"}>
            <Image src={p.src} alt="" width={96} height={96} sizes="48px" loading={c === 0 ? "eager" : "lazy"} className="h-full w-full" />
          </li>
        )),
      )}
    </ul>
  );
}

function Lane({ items, reverse, dur }: { items: Partner[]; reverse: boolean; dur: number }) {
  return (
    <div className="relative overflow-hidden">
      <Track items={items} reverse={reverse} dur={dur} />
      <div className="hlens absolute inset-0">
        <Track items={items} reverse={reverse} dur={dur} color />
      </div>
    </div>
  );
}

/**
 * Sits under the footer's call-to-action buttons, full width like a news ticker (it is placed outside the footer's centred column, so it needs no viewport-width tricks, which widen the page on iOS): two rows of partner
 * logos sliding in opposite directions. Every logo is quiet and monochrome except while it crosses the
 * "lens", a band down the middle where it lights in full colour and gains a gold edge, so partners are read
 * one after another. The colour layer is a second copy of each row, clipped to the lens and moving in lock-step.
 */
export default function PartnersCurtain({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const second = [...partners].reverse();
  return (
    <div role="group" aria-label={`${t.label} — ${partners.length}`} className="mt-14 md:mt-16">
      <p className="px-5 text-center text-sm font-light text-[#f6e2b3]">
        {t.label} <span className="mx-2 text-white/30">·</span> <span dir="ltr" className="font-display text-base">{partners.length}</span> <span className="text-white/60">{t.note}</span>
      </p>
      <div dir="ltr" className="curtain relative mt-5 flex w-full flex-col gap-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <Lane items={partners} reverse={false} dur={70} />
        <Lane items={second} reverse dur={85} />
      </div>
    </div>
  );
}
