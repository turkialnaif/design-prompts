import ArrowButton from "@/components/ArrowButton";
import HeroStage, { type HeroSlide } from "@/components/HeroStage";
import HeroRail from "@/components/HeroRail";
import { homeServiceTiles } from "@/lib/service-tiles";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import { blurProps } from "@/lib/blur";
import { corePillars, firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

const PHOTO = "/brand/riyadh-kafd.jpg";

const copy: Record<"ar" | "en", { slides: HeroSlide[]; book: string; h1: string }> = {
  ar: {
    slides: [
      {
        headline: "فهمٌ يُسابق الرأْي",
        sub: "Understanding that runs ahead of opinion",
        body: `${firm.nameAr}: خدمات قانونية مركّزة للمسائل التي تتطلب دقة في التحليل وجودة في الصياغة وانضباطًا في إدارة الملف حتى الوصول إلى أثر عملي.`,
      },
      {
        logo: true,
        body: "هل أمامك عقدٌ أو صفقةٌ أو نزاعٌ يحتاج إلى رأيٍ دقيق قبل التوقيع؟ نحلّل المسألة، ونصوغ المستند، وندير الملف حتى يصل إلى أثرٍ عملي، ونُبقيك مطّلعًا في كل خطوة.",
      },
    ],
    book: "احجز استشارة أولية",
    h1: firm.nameAr,
  },
  en: {
    slides: [
      {
        headline: "Understanding that runs ahead of opinion",
        sub: "فهمٌ يُسابق الرأْي",
        body: `${firmEn.nameFull}: Focused legal services for matters that demand precision in analysis, quality in drafting, and discipline in managing every file through to a practical outcome.`,
      },
      {
        logo: true,
        body: "Facing a contract, a transaction or a dispute that needs a precise opinion before you sign? We analyse the matter, draft the document and run the file through to a practical outcome — keeping you informed at every step.",
      },
    ],
    book: "Book an Initial Consultation",
    h1: firmEn.nameFull,
  },
};

/** One still Riyadh photograph, one clear glass pane whose words change, a floating seal. */
export default function HomeHero({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const ar = locale === "ar";
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <HeroStage
        photo={PHOTO}
        blurDataURL={"blurDataURL" in blurProps(PHOTO) ? blurProps(PHOTO).blurDataURL : undefined}
        slides={t.slides}
        subLtr={ar}
        h1={t.h1}
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
    </section>
  );
}
