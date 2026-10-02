import Accreditations from "@/components/Accreditations";
import HomeHero from "@/components/HomeHero";
import Overview from "@/components/Overview";
import TrustStrip from "@/components/TrustStrip";
import ScrollWords from "@/components/ScrollWords";
import LogoShowcase from "@/components/LogoShowcase";
import WhoWeServe from "@/components/WhoWeServe";
import HomeServices from "@/components/HomeServices";
import HomeBackdrop from "@/components/HomeBackdrop";
import Preloader from "@/components/Preloader";
import PartnersTicker from "@/components/PartnersTicker";
import ServiceStandard from "@/components/ServiceStandard";
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
      <Preloader locale="ar" />
      <HomeBackdrop />
      <HomeHero locale="ar" />
      <div id="content" />

      <ScrollWords eyebrow="فلسفتنا" text="نخدم الأفراد والشركات والمؤسسات، ونؤمن بأن القيمة القانونية الحقيقية هي التي تُبنى قبل القرار لا بعده." />

      <HomeServices locale="ar" />

      <LogoShowcase locale="ar" />

      <WhoWeServe locale="ar" />

      <PartnersTicker locale="ar" />

      <section className="relative bg-paper">
        <TrustStrip locale="ar" />
        <Overview locale="ar" />
      </section>

      <Accreditations locale="ar" />

      <ServiceStandard locale="ar" />

      <BlogBand items={bandItems} />
    </div>
  );
}
