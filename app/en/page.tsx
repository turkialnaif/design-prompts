import Accreditations from "@/components/Accreditations";
import HomeHero from "@/components/HomeHero";
import Overview from "@/components/Overview";
import TrustStrip from "@/components/TrustStrip";
import HomeServices from "@/components/HomeServices";
import HomeBackdrop from "@/components/HomeBackdrop";
import CursorGlow from "@/components/CursorGlow";
import Preloader from "@/components/Preloader";
import PartnersTicker from "@/components/PartnersTicker";
import ServiceStandard from "@/components/ServiceStandard";

export default function HomeEn() {
  return (
    <div>
      <Preloader locale="en" />
      <HomeBackdrop />
      <CursorGlow />
      <HomeHero locale="en" />
      <div id="content" />

      <HomeServices locale="en" />

      <PartnersTicker locale="en" />

      <section className="relative bg-paper">
        <TrustStrip locale="en" />
        <Overview locale="en" />
      </section>

      <Accreditations locale="en" />

      <ServiceStandard locale="en" />
    </div>
  );
}
