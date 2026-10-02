import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceTiles from "@/components/ServiceTiles";
import { homeServiceTiles, totalServices } from "@/lib/service-tiles";

const copy = {
  ar: {
    title: "منظومة الخدمات القانونية",
    eyebrow: "Service Architecture",
    lead: "نعرض الخدمات بوصفها رحلة عمل متصلة، من المشورة قبل القرار إلى اكتمال الأثر.",
    badge: `${totalServices} خدمة قانونية موزّعة على ٦ محاور أساسية وخطوط ممارسة متخصصة`,
    cta: "تفاصيل الخدمة ←",
  },
  en: {
    title: "Legal Service System",
    eyebrow: "Service Architecture",
    lead: "We present our services as a connected engagement journey — from advice before a decision through to a completed practical effect.",
    badge: `${totalServices} legal services across 6 core pillars and specialised practice lines`,
    cta: "Service details →",
  },
};

/** The first section after the hero: it sits straight on the fixed photograph of Riyadh, under a navy veil. */
export default function HomeServices({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  return (
    <section data-glow className="relative isolate overflow-hidden py-28 md:py-40">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,6,29,0.4)_0%,rgba(0,18,74,0.66)_30%,rgba(0,6,29,0.84)_100%)]" />
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <SectionHeading title={t.title} eyebrow={t.eyebrow} tone="onDark" size="xl" />
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-8 text-white/80">{t.lead}</p>
          <p className="chamfer-btn mx-auto mt-6 inline-block border border-[#f6e2b3]/40 bg-white/10 px-5 py-2 text-xs font-normal text-[#f6e2b3] backdrop-blur-md">{t.badge}</p>
        </Reveal>
        <div className="mt-14">
          <ServiceTiles items={homeServiceTiles(locale)} cta={t.cta} />
        </div>
      </div>
    </section>
  );
}
