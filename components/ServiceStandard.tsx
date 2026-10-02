import { EyeOff, FileCheck2, MessageCircle, PenLine, Scaling, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { serviceStandard } from "@/lib/site";
import { serviceStandardEn } from "@/lib/site.en";

const copy = {
  ar: { eyebrow: "Service Standard", title: "معيار الخدمة", lead: "ستة التزامات نعلنها منذ أول تواصل، ونقيس عملنا عليها." },
  en: { eyebrow: "Service Standard", title: "Our Service Standard", lead: "Six commitments we state from the first contact and hold our work to." },
};

// One icon per commitment, in the order of `serviceStandard`.
const icons = [Scaling, Send, MessageCircle, PenLine, EyeOff, FileCheck2];

/** Six commitments as a grid of cards: an icon medallion, the title, one line, and a gold rule that fills on hover. */
export default function ServiceStandard({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const items = locale === "ar" ? serviceStandard : serviceStandardEn;
  return (
    <section className="relative bg-white py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <SectionHeading title={t.title} eyebrow={t.eyebrow} tone="onLight" size="xl" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-ink-soft/80">{t.lead}</p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? FileCheck2;
            return (
              <Reveal key={item.title} delay={(i % 3) * 90}>
                <div className="group glass-card relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0a1626] text-[#e6c988] ring-1 ring-gold/60 transition-colors duration-300 group-hover:bg-gold group-hover:text-[#08121f]">
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <span className="font-display text-xs font-bold tracking-[0.2em] text-gold-deep" dir="ltr">
                      {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-bold leading-8 text-ink">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-8 text-ink-soft/85">{item.description}</p>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-right scale-x-0 bg-gradient-to-l from-[#f0d894] to-[#cfa64e] transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
