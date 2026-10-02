import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SectorList from "@/components/SectorList";

const copy = {
  ar: {
    title: "القطاعات التي نخدمها",
    eyebrow: "Sectors We Serve",
    lead: "نخدم الأفراد والشركات والمؤسسات والجهات الحكومية والجمعيات الخيرية والأوقاف في عشرين قطاعًا، ولكل قطاع صفحة تشرح مسائله القانونية وكيف نخدمه.",
  },
  en: {
    title: "Sectors We Serve",
    eyebrow: "Clients",
    lead: "We serve individuals, companies, institutions, government entities, charities and endowments across twenty sectors; each has its own page on its legal matters and how we help.",
  },
};

/** The sectors section of the Services page: heading and the full list of twenty. */
export default function WhoWeServe({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  return (
    <section id="sectors" className="relative scroll-mt-24 bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading title={t.title} eyebrow={t.eyebrow} lead={t.lead} tone="onLight" />
          </div>
        </Reveal>
        <div className="mt-16">
          <SectorList locale={locale} />
        </div>
      </div>
    </section>
  );
}
