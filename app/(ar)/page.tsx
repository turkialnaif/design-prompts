import Accreditations from "@/components/Accreditations";
import CornerField from "@/components/CornerField";
import HomeHero from "@/components/HomeHero";
import Overview from "@/components/Overview";
import TrustStrip from "@/components/TrustStrip";
import ServiceStandard from "@/components/ServiceStandard";
import ServiceTiles from "@/components/ServiceTiles";
import { homeServiceTiles, totalServices } from "@/lib/service-tiles";
import Reveal from "@/components/Reveal";
import { newestFirst } from "@/lib/article-index";
import BlogBand from "@/components/BlogBand";

const bandMonth = new Intl.DateTimeFormat("ar-SA-u-nu-latn", { month: "long", timeZone: "UTC" });
const bandItems = newestFirst.slice(0, 12).map((a) => ({
  slug: a.slug,
  title: a.h1,
  description: a.metaDescription,
  day: String(new Date(a.publishedAt).getUTCDate()),
  month: bandMonth.format(new Date(a.publishedAt)),
}));

export default function Home() {
  return (
    <div>
      <HomeHero locale="ar" />
      <div id="content" />

      {/* One canvas — the trust panel, the overview and the service pillars read as one page, not three stacked bands. */}
      <section className="relative isolate overflow-hidden bg-paper">
        <CornerField tone="gold" corner="tr" opacity={0.14} size={170} className="absolute -top-10 -right-10 h-[30rem] w-[40rem] md:h-[36rem] md:w-[48rem]" />
        <CornerField tone="gold" corner="bl" opacity={0.09} size={170} className="absolute -bottom-10 -left-10 h-[22rem] w-[28rem] md:h-[26rem] md:w-[34rem]" />

        <div className="relative">
          <TrustStrip locale="ar" />

          <Overview locale="ar" />

          {/* Service pillars */}
          <div className="py-32 md:py-48">
            <div className="mx-auto max-w-6xl px-5">
              <Reveal className="text-center">
                <span aria-hidden className="mx-auto block h-2 w-20 rounded-full bg-gradient-to-l from-[#f0d894] to-[#cfa64e]" />
                <h2 className="font-display mt-8 text-5xl font-extrabold leading-[1.15] text-ink sm:text-6xl md:text-7xl lg:text-8xl">
                  منظومة الخدمات القانونية
                </h2>
                <p className="gold-eyebrow mt-5 text-sm md:text-base">Service Architecture</p>
                <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-ink-soft/80">
                  نعرض الخدمات بوصفها رحلة عمل متصلة، من المشورة قبل القرار إلى اكتمال الأثر.
                </p>
                <p className="mx-auto mt-5 inline-block rounded-full border border-gold/40 bg-white/60 px-5 py-2 text-xs font-bold text-gold-deep">
                  {totalServices} خدمة قانونية موزّعة على ٦ محاور أساسية وخطوط ممارسة متخصصة
                </p>
              </Reveal>

              <div className="mt-12">
                <ServiceTiles items={homeServiceTiles("ar")} cta="تفاصيل الخدمة ←" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Accreditations locale="ar" />

      <ServiceStandard locale="ar" />

      <BlogBand items={bandItems} />
    </div>
  );
}
