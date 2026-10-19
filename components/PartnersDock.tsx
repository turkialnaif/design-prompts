import Image from "next/image";
import { partners } from "@/lib/partners";

const copy = {
  ar: { label: "شركاء النجاح", sentence: "علامات وثقت بنا ونعتز بشراكتها" },
  en: { label: "Success Partners", sentence: "Brands that trust us, partners we are proud of" },
};

/**
 * The partners dock: a second card that sits directly under the footer's card, the same width and cut, so it reads as its own
 * object rather than a strip squeezed into the footer. Left side is a fixed label (who they are, how many); the rest is one row of
 * logos sliding slowly. Logos are quiet and monochrome and take their own colours when the pointer is on them. There are no layers to
 * keep in step: the row is the same list twice, moved by CSS, and it is always in the page (images load lazily).
 */
export default function PartnersDock({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const n = partners.length;
  return (
    <section aria-label={`${t.label} — ${n}`} className="mx-auto mt-3.5 max-w-7xl px-5 pb-10 md:pb-14">
      <div className="relative overflow-hidden border border-white/10 bg-[#020a22]/90 backdrop-blur-xl [clip-path:polygon(0_0,100%_0,100%_calc(100%-32px),calc(100%-32px)_100%,0_100%)]">
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e0b35a]/60 to-transparent" />
        <div className="grid items-center md:grid-cols-[19rem_1fr]">
          <div className="flex items-center gap-5 border-b border-white/10 px-7 py-5 md:border-b-0 md:border-e md:py-7">
            <span dir="ltr" className="ft-serif text-6xl font-bold leading-none text-[#e0b35a] md:text-7xl">{n}</span>
            <div>
              <p className="ft-serif text-2xl font-bold text-[#f6e2b3]">{t.label}</p>
              <p className="mt-1 text-[0.82rem] font-light leading-6 text-white/65">{t.sentence}</p>
            </div>
          </div>

          <div
            dir="ltr"
            className="pdock group relative overflow-hidden py-5 md:py-7 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
          >
            <ul className="pdock-track flex w-max items-center gap-3">
              {[0, 1].flatMap((c) =>
                partners.map((p, i) => (
                  <li key={`${c}-${i}`} className="pdock-tile" aria-hidden={c > 0 ? true : undefined}>
                    <Image src={p.src} alt={c === 0 ? p.name : ""} width={96} height={96} sizes="56px" loading="lazy" className="h-full w-full" />
                  </li>
                )),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
