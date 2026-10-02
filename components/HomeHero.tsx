import ArrowButton from "@/components/ArrowButton";
import HeroScroll from "@/components/HeroScroll";
import HeroStage from "@/components/HeroStage";
import HeroRail from "@/components/HeroRail";
import { homeServiceTiles } from "@/lib/service-tiles";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import { blurProps } from "@/lib/blur";
import { corePillars, firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

const PHOTO = "/brand/riyadh-kafd.jpg";

const copy: Record<"ar" | "en", { body: string; book: string; h1: string; cue: string }> = {
  ar: {
    body: `${firm.nameAr}: خدمات قانونية مركّزة للمسائل التي تتطلب دقة في التحليل وجودة في الصياغة وانضباطًا في إدارة الملف حتى الوصول إلى أثر عملي.`,
    book: "احجز استشارة أولية",
    cue: "اسحب للأسفل",
    h1: firm.nameAr,
  },
  en: {
    body: `${firmEn.nameFull}: Focused legal services for matters that demand precision in analysis, quality in drafting, and discipline in managing every file through to a practical outcome.`,
    book: "Book an Initial Consultation",
    cue: "Scroll",
    h1: firmEn.nameFull,
  },
};

/** The hero: Riyadh photograph, the 3D gold mark, one sentence and two actions; the service rail runs along the foot. */
export default function HomeHero({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const ar = locale === "ar";
  return (
    <HeroScroll>
      <HeroStage
        photo={PHOTO}
        blurDataURL={"blurDataURL" in blurProps(PHOTO) ? blurProps(PHOTO).blurDataURL : undefined}
        body={t.body}
        h1={t.h1}
        cue={t.cue}
        actions={
          <>
            <ArrowButton href={firm.whatsapp} external ltr={!ar} small>
              {t.book}
            </ArrowButton>
            <MatterBriefCTA locale={locale} matterTypes={corePillars.map((s) => (ar ? s.title : s.titleEn))} tone="onDark" small />
          </>
        }
      />

      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-5 md:px-10">
        <HeroRail locale={locale} tiles={homeServiceTiles(locale)} />
      </div>
    </HeroScroll>
  );
}
