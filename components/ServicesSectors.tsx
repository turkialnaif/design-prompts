import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SectorList from "@/components/SectorList";
import ServiceAccordion from "@/components/ServiceAccordion";
import { homeServiceTiles } from "@/lib/service-tiles";
import Link from "next/link";

const copy = {
  ar: {
    eyebrow: "Services & Sectors",
    title: "الخدمات والقطاعات",
    lead: "ثماني ركائز لخدماتنا القانونية، وعشرون قطاعًا نخدمها. اختر الخدمة لتقرأ تفاصيلها، أو القطاع لتعرف مسائله القانونية.",
    servicesLabel: "خدماتنا",
    sectorsLabel: "القطاعات التي نخدمها",
    cta: "تفاصيل الخدمة ←",
    all: "كل الخدمات والقطاعات",
    allHref: "/services",
  },
  en: {
    eyebrow: "Services & Sectors",
    title: "Services & Sectors",
    lead: "Eight pillars of legal service and twenty sectors we serve. Pick a service for its detail, or a sector for its legal matters.",
    servicesLabel: "Our services",
    sectorsLabel: "Sectors we serve",
    cta: "Service details →",
    all: "All services & sectors",
    allHref: "/en/services",
  },
};

/** One light section on the home page: the eight service panels that open like a fan, then the twenty sectors beneath them. */
export default function ServicesSectors({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  return (
    <section id="services" className="relative scroll-mt-24 bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading title={t.title} eyebrow={t.eyebrow} lead={t.lead} tone="onLight" />
          </div>
        </Reveal>

        <div className="mt-16">
          <p className="mb-5 flex items-center gap-3 text-sm text-[#012696]">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" />
            {t.servicesLabel}
          </p>
          <ServiceAccordion items={homeServiceTiles(locale)} cta={t.cta} />
        </div>

        <div className="mt-20 md:mt-28">
          <p className="mb-5 flex items-center gap-3 text-sm text-[#012696]">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" />
            {t.sectorsLabel}
          </p>
          <SectorList locale={locale} />
        </div>

        <div className="mt-12 text-center">
          <Link href={t.allHref} className="btn btn-navy chamfer-btn inline-block px-8 py-3.5 text-base font-normal">{t.all}</Link>
        </div>
      </div>
    </section>
  );
}
