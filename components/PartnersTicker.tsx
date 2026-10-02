import Image from "next/image";
import { partners } from "@/lib/partners";

const copy = {
  ar: { label: "شركاء النجاح", note: "علامات تعتز بثقتها فينا" },
  en: { label: "Success Partners", note: "Brands that trust us" },
};

/**
 * A slim two-lane ticker: the lanes drift in opposite directions at different speeds, so the logos
 * never line up twice. Each mark sits in a small tile, quiet and monochrome until the pointer (or
 * keyboard focus) reaches it. Small by design — a signature, not a billboard.
 */
export default function PartnersTicker({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const half = Math.ceil(partners.length / 2);
  const lanes = [partners.slice(0, half), partners.slice(half)];
  return (
    <section aria-label={t.label} data-glow className="relative isolate overflow-hidden bg-[#00061d] py-10 md:py-14">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(30,70,200,0.22),transparent_70%)]" />
      <div aria-hidden className="orn absolute inset-x-0 top-0" />
      <div className="mx-auto mb-7 flex max-w-6xl items-center gap-4 px-5">
        <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e0b35a]/60" />
        <div className="text-center">
          <h2 className="font-display !text-xl !font-light text-[#f6e2b3] md:!text-2xl">{t.label}</h2>
          <p className="mt-1 text-[11px] font-light text-white/50">{partners.length} · {t.note}</p>
        </div>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e0b35a]/60" />
      </div>

      <div dir="ltr" className="ticker space-y-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        {lanes.map((lane, li) => (
          <ul key={li} className={`ticker-lane ${li ? "ticker-lane-b" : "ticker-lane-a"} flex w-max gap-3`}>
            {[0, 1].map((copyIdx) =>
              lane.map((p, i) => (
                <li key={`${copyIdx}-${i}`} aria-hidden={copyIdx === 1 || undefined} className="partner group shrink-0">
                  <Image src={p.src} alt={copyIdx ? "" : p.name} title={p.name} width={104} height={104} sizes="56px" className="h-12 w-12 md:h-14 md:w-14" />
                </li>
              )),
            )}
          </ul>
        ))}
      </div>
    </section>
  );
}
