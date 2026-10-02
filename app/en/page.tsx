import HomeHero from "@/components/HomeHero";
import TrustStrip from "@/components/TrustStrip";
import ScrollWords from "@/components/ScrollWords";
import LogoShowcase from "@/components/LogoShowcase";
import WhoWeServe from "@/components/WhoWeServe";
import HomeServices from "@/components/HomeServices";
import Preloader from "@/components/Preloader";

export default function HomeEn() {
  return (
    <div>
      <Preloader locale="en" />
      <HomeHero locale="en" />

      <div id="content" className="relative z-10">
        <ScrollWords eyebrow="Our belief" text={`We serve individuals, companies and institutions, and believe that real legal value is built before a decision, not after it.`} />

        <HomeServices locale="en" />

        <LogoShowcase locale="en" />

        <TrustStrip locale="en" />

        <WhoWeServe locale="en" />

      </div>
    </div>
  );
}
