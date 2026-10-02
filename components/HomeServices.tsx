import Reveal from "@/components/Reveal";
import ServiceAccordion from "@/components/ServiceAccordion";
import { homeServiceTiles, pillarTiles, totalServices } from "@/lib/service-tiles";

const copy = {
  ar: {
    eyebrow: "Service Architecture",
    line1: "من المشورة",
    line2: "إلى اكتمال الأثر",
    lead: "لا نقدّم خدمات متفرقة، بل رحلة عمل واحدة متصلة: نبدأ بالمشورة قبل أن تتخذ قرارك، ثم نبني العلاقة التعاقدية، ونتولى النزاع إن نشأ، ونحمي التشغيل والأصول الرقمية، حتى يكتمل الأثر العملي ويبقى ملفك مضبوطًا.",
    sub: "مرّر الماوس على أي مسار ليفتح، وانقر لقراءة تفاصيله.",
    figure: "خدمة قانونية في",
    figure2: "محاور متصلة",
    cta: "تفاصيل الخدمة ←",
  },
  en: {
    eyebrow: "Service Architecture",
    line1: "From advice",
    line2: "to a completed effect",
    lead: "We do not sell scattered services but one connected journey: advice before you decide, then the contractual relationship, the dispute if one arises, protection of operations and digital assets — until the practical effect is complete and your file is in order.",
    sub: "Move the pointer over a path to open it; click to read the detail.",
    figure: "legal services across",
    figure2: "connected pillars",
    cta: "Service details →",
  },
};

/**
 * The first section after the philosophy line. A two-sided heading — a huge outlined count beside the
 * title and a longer lead — then the journey as six stages on a hairline, then the eight service
 * panels that open like a fan.
 */
export default function HomeServices({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const stages = pillarTiles(locale);
  return (
    <section data-glow className="relative isolate overflow-hidden bg-[#00061d] py-24 md:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(224,179,90,0.14),transparent_70%),radial-gradient(ellipse_45%_35%_at_0%_30%,rgba(30,70,200,0.22),transparent_70%),linear-gradient(180deg,#00061d_0%,#00124a_45%,#00061d_100%)]" />
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="grid items-end gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
            <div>
              <p className="gold-eyebrow !text-[#f6e2b3] text-xs md:text-sm">{t.eyebrow}</p>
              <h2 className="font-display mt-5 text-5xl font-light leading-[1.18] sm:text-6xl md:text-7xl">
                <span className="grad-text block">{t.line1}</span>
                <span className="block text-white">{t.line2}</span>
              </h2>
            </div>
            <div className="md:pb-3">
              <p className="font-display text-7xl font-extralight leading-none text-transparent [-webkit-text-stroke:1px_rgba(224,179,90,0.85)] md:text-8xl" dir="ltr">
                {totalServices}
              </p>
              <p className="mt-3 text-sm text-[#f6e2b3]">
                {t.figure} {stages.length} {t.figure2}
              </p>
              <p className="mt-5 text-base font-light leading-8 text-white/80 md:text-lg md:leading-9">{t.lead}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ol className="mt-14 flex items-center justify-between gap-1 overflow-x-auto pb-1 [scrollbar-width:none] md:mt-16" aria-label={t.eyebrow}>
            {stages.map((s, i) => (
              <li key={s.href} className="flex flex-1 items-center gap-2 whitespace-nowrap last:flex-none">
                <span aria-hidden className="h-2 w-2 shrink-0 rotate-45 bg-[#e0b35a]" />
                <span className="text-xs font-light text-white/75 md:text-sm">{s.label}</span>
                {i < stages.length - 1 && <span aria-hidden className="h-px min-w-3 flex-1 bg-gradient-to-l from-[#e0b35a]/60 to-white/10" />}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs font-light text-white/45">{t.sub}</p>
        </Reveal>

        <div className="mt-8">
          <ServiceAccordion items={homeServiceTiles(locale)} cta={t.cta} />
        </div>
      </div>
    </section>
  );
}
