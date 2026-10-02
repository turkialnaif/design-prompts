import Image from "next/image";
import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Accreditations from "@/components/Accreditations";
import LogoShowcase from "@/components/LogoShowcase";
import { Band, BandHead, HeroHead, Wrap } from "@/components/ui";
import { attorneys, corePillars, firm, matterMethod } from "@/lib/site";
import { attorneyEn, firmEn } from "@/lib/site.en";

const overview = {
  ar: {
    paragraphs: [
      `تركي النايف وشركاؤه مكتب محاماة واستشارات قانونية في الرياض، مرخّص من وزارة العدل برقم ${firm.licenseNumber}، وعضو أساسي في الهيئة السعودية للمحامين. نخدم الأفراد والشركات والمؤسسات، ونؤمن بأن القيمة القانونية الحقيقية هي التي تُبنى قبل القرار لا بعده.`,
      "نقدّم خدمات مركّزة للمسائل التي تتطلب دقة في التحليل وجودة في الصياغة وانضباطًا في إدارة الملف حتى الوصول إلى أثر عملي. وتقوم منظومتنا على المشورة والرأي القانوني، والعقود والصفقات، والتقاضي والتحكيم والتسوية، والامتثال وحوكمة الأعمال، والقانون الرقمي والبيانات، والتنفيذ والتحصيل.",
      "يقود المكتب المحامي تركي النايف الشمري، وهو محامٍ ومدرب قانوني مرخّص، ومحكّم معتمد لدى مركز هيئة المحامين للتسوية والتحكيم، وخبير معتمد لدى منصة «خبرة»، ووسيط امتياز تجاري معتمد من «منشآت».",
      "نضع تجربة العميل أولًا: نتفق منذ البداية على نطاق العمل والمخرجات، ونُبقيه مطّلعًا على سير ملفه عبر بوابة العملاء، ونُسلّم ما يُقرأ ويُراجع ويُطبّق. ونعمل بما يتوافق مع أنظمة المملكة ومستهدفات رؤية 2030 في بيئة أعمال أوضح وأكثر شفافية.",
    ],
  },
  en: {
    paragraphs: [
      `Turki AlNaif & Partners is a law and legal consultancy firm in Riyadh, licensed by the Ministry of Justice under No. ${firm.licenseNumber} and a core member of the Saudi Bar Association. We serve individuals, companies and institutions, and believe legal value is built before a decision, not after it.`,
      "We offer focused services for matters that demand precision in analysis, quality in drafting and discipline in managing every file through to a practical outcome. Our system spans advice and legal opinion, contracts and transactions, litigation, arbitration and settlement, compliance and governance, digital and data law, and enforcement and recovery.",
      "The firm is led by Turki AlNaif, a licensed lawyer and legal trainer, an accredited arbitrator at the Saudi Bar Association Settlement and Arbitration Centre, an accredited expert on the Ministry of Justice's Khebra platform, and an accredited franchise broker with Monsha'at.",
      "We put the client experience first: agreeing the scope and deliverables at the outset, keeping you informed on your file through the client portal, and delivering work that can be read, reviewed and applied. We work within the Kingdom's laws and in line with Vision 2030's aim of a clearer, more transparent business environment.",
    ],
  },
};

const ui = {
  ar: {
    eyebrow: "Who We Are",
    title: "من نحن",
    lead: "شريك قانوني يربط الحُكم المهني بسياق الأعمال",
    facts: [
      { label: "رخصة المحاماة", value: firm.licenseNumber },
      { label: "المقر", value: "الرياض، المملكة العربية السعودية" },
      { label: "السجل الموحد", value: firm.unifiedNumber },
    ],
    book: "احجز استشارة أولية",
    methodHead: { number: "02", eyebrow: "The Matter Method", title: "منهجنا في إدارة المسألة", lead: "نظام عمل مختصر وقابل للتكرار يمنح العميل رؤية واضحة لمسار التكليف." },
    leaderHead: { number: "03", eyebrow: "Leadership", title: "القيادة المهنية" },
    profile: "الملف الشخصي",
    stepTitle: (s: (typeof matterMethod)[number]) => s.titleAr,
    stepSub: (s: (typeof matterMethod)[number]) => s.title,
  },
  en: {
    eyebrow: "Who We Are",
    title: "About Us",
    lead: "A legal partner connecting professional judgment with business context",
    facts: [
      { label: "License No.", value: firm.licenseNumber },
      { label: "Based in", value: "Riyadh, Saudi Arabia" },
      { label: "Unified Number", value: firm.unifiedNumber },
    ],
    book: "Book an Initial Consultation",
    methodHead: { number: "02", eyebrow: "The Matter Method", title: "How We Manage a Matter", lead: "A short, repeatable way of working that gives the client a clear view of the engagement's path." },
    leaderHead: { number: "03", eyebrow: "Leadership", title: "Leadership" },
    profile: "View profile",
    stepTitle: (s: (typeof matterMethod)[number]) => s.title,
    stepSub: (s: (typeof matterMethod)[number]) => s.titleAr,
  },
};

/** Who we are — the overview that used to sit on the home page now opens this page's body. */
export default function AboutView({ locale }: { locale: "ar" | "en" }) {
  const t = ui[locale];
  const ar = locale === "ar";
  const o = overview[locale];
  const [first, ...rest] = o.paragraphs;
  const lead = ar ? attorneys[0] : attorneyEn;
  const leaderHref = ar ? `/team/${lead.slug}` : `/en/team/${lead.slug}`;

  return (
    <div>
      <PageHero>
        <HeroHead eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-8 text-white/70">{ar ? `يقدّم ${firm.nameShortAr} للمحاماة والاستشارات القانونية خدمات قانونية مركّزة للمسائل التي تتطلب دقة في التحليل، وجودة في الصياغة، وانضباطًا في إدارة الملف حتى الوصول إلى أثر عملي.` : firmEn.description}</p>
          <div className="mx-auto mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
            {t.facts.map((f) => (
              <div key={f.label} className="chamfer border border-white/12 bg-white/[0.06] px-3 py-4 text-center backdrop-blur-md">
                <span className="block text-xs font-light text-white/65">{f.label}</span>
                <span className="mt-1 block text-sm text-white">{f.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ArrowButton href={firm.whatsapp} external ltr={!ar}>{t.book}</ArrowButton>
            <MatterBriefCTA locale={locale} matterTypes={corePillars.map((s) => (ar ? s.title : s.titleEn))} tone="onDark" />
          </div>
        </HeroHead>
      </PageHero>

      <Band tone="white">
        <Wrap max="5xl">
          <Reveal>
            <p className="font-display text-2xl font-light leading-[2] text-[#00124a] md:text-4xl md:leading-[1.9]">{first}</p>
            <div className="mt-10 gap-14 border-t border-[#00124a]/15 pt-10 text-[15px] font-light leading-[2.15] text-ink-soft md:columns-2 md:[column-rule:1px_solid_rgba(0,18,74,0.12)]">
              {rest.map((p) => (
                <p key={p.slice(0, 24)} className="mb-5 break-inside-avoid-column">{p}</p>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Band>

      <LogoShowcase locale={locale} variant="think" />

      <Band tone="white">
        <Wrap max="6xl">
          <BandHead {...t.methodHead} />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matterMethod.map((step, i) => (
              <li key={step.step}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <div className="glass-card h-full rounded-2xl p-7">
                    <span className="glass-number-light font-display block text-6xl font-light leading-none" dir="ltr">{step.step}</span>
                    <h3 className="font-display mt-5 text-2xl font-light text-[#00124a]">{t.stepTitle(step)}</h3>
                    <p className="gold-eyebrow mt-2 text-[11px]">{t.stepSub(step)}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Wrap>
      </Band>

      <Accreditations locale={locale} />

      <Band tone="tint">
        <Wrap max="5xl">
          <BandHead {...t.leaderHead} />
          <Reveal>
            <Link href={leaderHref} className="group glass-card mt-12 grid items-center gap-8 rounded-3xl p-6 md:grid-cols-[15rem_1fr] md:p-10">
              <div className="relative mx-auto aspect-[4/5] w-48 overflow-hidden rounded-2xl md:w-full">
                <Image src="/brand/attorney-turki.jpg" alt={lead.name} fill sizes="240px" className="object-cover object-top" />
              </div>
              <div className="text-center md:text-start">
                <h3 className="font-display text-3xl font-light text-[#00124a] md:text-4xl">{lead.name}</h3>
                <p className="mt-2 text-sm text-[#012696]">{lead.role}</p>
                <p className="mt-5 text-[15px] font-light leading-8 text-ink-soft">{lead.bio[0]}</p>
                <span className="mt-6 inline-block text-sm text-[#012696] opacity-70 transition-opacity group-hover:opacity-100">{t.profile} {ar ? "←" : "→"}</span>
              </div>
            </Link>
          </Reveal>
        </Wrap>
      </Band>
    </div>
  );
}
