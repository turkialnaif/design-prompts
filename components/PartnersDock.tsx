import Image from "next/image";
import { partners } from "@/lib/partners";

const copy = {
  ar: { label: "شركاء النجاح", sentence: "علامات وثقت بنا ونعتز بشراكتها" },
  en: { label: "Success Partners", sentence: "Brands that trust us, partners we are proud of" },
};

/**
 * The partners band inside the footer's card, above the columns: a fixed label (who they are) and one row of logos sliding slowly.
 * Logos are quiet and monochrome and take their own colours when the pointer is on them. The row is the same list twice, moved by
 * CSS; it is always in the page (images load lazily), so there is no layer to keep in step.
 */
export default function PartnersDock({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  return (
    <section aria-label={t.label} className="grid items-center border-b border-white/10 bg-white/[0.025] md:grid-cols-[17rem_1fr]">
      <div className="border-b border-white/10 px-7 py-5 md:border-b-0 md:border-e md:py-6 md:ps-12">
        <p className="font-blog text-2xl font-bold text-[#f6e2b3]">{t.label}</p>
        <p className="mt-1 text-[0.85rem] font-light leading-6 text-white/65">{t.sentence}</p>
      </div>
      <div dir="ltr" className="pdock relative overflow-hidden py-5 md:py-6 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
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
    </section>
  );
}
