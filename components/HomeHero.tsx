import ArrowButton from "@/components/ArrowButton";
import HeroScroll from "@/components/HeroScroll";
import HeroStage from "@/components/HeroStage";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import { corePillars, firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

const copy: Record<"ar" | "en", { body: string; book: string; h1: string; lead: string; tail: string; cue: string; cueTouch: string }> = {
  ar: {
    body: `${firm.nameAr}: خدمات قانونية مركّزة للمسائل التي تتطلب دقة في التحليل وجودة في الصياغة وانضباطًا في إدارة الملف حتى الوصول إلى أثر عملي.`,
    book: "احجز استشارة أولية",
    cue: "حرّك الماوس إلى الأسفل… لتُضيء الصفحة",
    cueTouch: "مرّر للأسفل… لتُضيء الصفحة",
    h1: firm.nameAr,
    lead: firm.nameShortAr,
    tail: "للمحاماة والاستشارات القانونية",
  },
  en: {
    body: `${firmEn.nameFull}: Focused legal services for matters that demand precision in analysis, quality in drafting, and discipline in managing every file through to a practical outcome.`,
    book: "Book an Initial Consultation",
    cue: "Move your mouse down to light the page",
    cueTouch: "Scroll down to light the page",
    h1: firmEn.nameFull,
    lead: "Turki AlNaif & Partners",
    tail: "Lawyers & Legal Consultants",
  },
};

/** The hero: the 3D gold mark beside the firm name, one sentence and two actions. */
export default function HomeHero({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const ar = locale === "ar";
  return (
    <HeroScroll>
      <HeroStage
        body={t.body}
        h1={t.h1}
        h1Lead={t.lead}
        h1Tail={t.tail}
        cue={t.cue}
        cueTouch={t.cueTouch}
        actions={
          <>
            <ArrowButton href={firm.whatsapp} external ltr={!ar} small>
              {t.book}
            </ArrowButton>
            <MatterBriefCTA locale={locale} matterTypes={corePillars.map((s) => (ar ? s.title : s.titleEn))} tone="onDark" small />
          </>
        }
      />

    </HeroScroll>
  );
}
