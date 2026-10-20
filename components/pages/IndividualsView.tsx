import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import PageHero from "@/components/PageHero";
import { Band, BandHead, HeroHead, Numbered, RowList, Wrap } from "@/components/ui";
import { articles } from "@/lib/articles";
import { individualsJsonLd } from "@/lib/seo";
import { firm, individualGroups, individualServiceSlugs, specializedLines } from "@/lib/site";
import { specializedLineSummaryEn } from "@/lib/site.en";

const line = (slug: string) => specializedLines.find((l) => l.slug === slug)!;
const lines = individualServiceSlugs.map(line);

/** Individuals' articles that already exist on the site, with an English gloss for the English page (the articles themselves are Arabic). */
const reading: { slug: string; en: string }[] = [
  { slug: "employer-terminate-employment-without-reason-saudi-arabia", en: "Can an employer end an employment contract without a reason?" },
  { slug: "end-of-employment-entitlements-saudi-arabia", en: "What am I owed when my employment ends?" },
  { slug: "heirs-dispute-estate-division-saudi-arabia", en: "What to do when heirs disagree on dividing an estate" },
  { slug: "claim-outstanding-debt-saudi-arabia", en: "How to claim a documented debt from someone who is late paying" },
  { slug: "signed-contract-without-reading-saudi-arabia", en: "Am I bound by a contract I signed without reading?" },
];

const steps = {
  ar: [
    { title: "أرسل موجز المسألة", text: "الأطراف والوقائع الأساسية والهدف، ونبذة مختصرة تكفي." },
    { title: "نراجع ونرد", text: "نفحص تعارض المصالح ونرد خلال يوم عمل واحد." },
    { title: "نتفق على النطاق", text: "يُتفق على النطاق والمخرجات والافتراضات قبل بدء العمل." },
  ],
  en: [
    { title: "Send a matter brief", text: "The parties, the key facts and the goal; a short summary is enough." },
    { title: "We review and respond", text: "We check for conflicts and respond within one business day." },
    { title: "We agree the scope", text: "The scope, deliverables and assumptions are agreed before work starts." },
  ],
};

const ui = {
  ar: {
    eyebrow: "Services for Individuals",
    title: "خدمات الأفراد",
    lead: "نقدّم للأفراد خدمات قانونية في القضايا الجنائية والتركات والأحوال الشخصية وقانون العمل والديون والعقار والمنازعات مع الجهات الحكومية، إلى جانب خدماتنا للشركات.",
    book: "احجز استشارة أولية",
    services: { number: "01", eyebrow: "What We Handle", title: "ما نتولاه للأفراد", lead: "لكل خدمة صفحة تشرح نطاق العمل وكيف نسير فيه وما نحتاجه لنبدأ." },
    how: { number: "02", eyebrow: "Getting Started", title: "كيف تبدأ" },
    read: { number: "03", eyebrow: "Before You Consult", title: "اقرأ قبل أن تستشير", lead: "مقالات تعريفية عامة تعين على فهم المسألة قبل اللقاء الأول." },
    tag: "مقال",
    corp: { text: "تبحث عن خدمات للشركات والمنشآت؟", link: "الخدمات والقطاعات", href: "/services" },
    note: "المعلومات في هذه الصفحة عامة وليست رأيًا قانونيًا في حالة بعينها؛ يختلف الجواب بحسب الوقائع والنظام المنطبق. وإرسال الموجز لا ينشئ علاقة محاماة (محامٍ–موكل) إلا بعد قبول المكتب للتكليف رسميًا.",
    cta: "تفاصيل الخدمة",
  },
  en: {
    eyebrow: "Services for Individuals",
    title: "Services for Individuals",
    lead: "Legal services for individuals in criminal matters, estates, personal status, labor law, debts, property and disputes with government bodies, alongside our services for companies.",
    book: "Book an Initial Consultation",
    services: { number: "01", eyebrow: "What We Handle", title: "What we handle for individuals", lead: "Each service has its own page on the scope of work, how we proceed, and what we need to start." },
    how: { number: "02", eyebrow: "Getting Started", title: "How to start" },
    read: { number: "03", eyebrow: "Before You Consult", title: "Read before you consult", lead: "General explanatory articles (in Arabic) to help you understand the matter before a first meeting." },
    tag: "Article in Arabic",
    corp: { text: "Looking for services for companies and organizations?", link: "Services & Sectors", href: "/en/services" },
    note: "The information on this page is general and is not a legal opinion on a specific matter; the answer depends on the facts and on the law in force. Submitting a brief does not create a lawyer–client relationship until the firm formally accepts the engagement.",
    cta: "Service details",
  },
};

export default function IndividualsView({ locale }: { locale: "ar" | "en" }) {
  const t = ui[locale];
  const ar = locale === "ar";
  const prefix = ar ? "" : "/en";
  const matterTypes = lines.map((l) => (ar ? l.title : l.titleEn));
  const read = reading.flatMap((r) => {
    const a = articles.find((x) => x.slug === r.slug);
    return a ? [{ title: ar ? a.h1 : r.en, href: `/blog/${r.slug}`, tag: t.tag }] : [];
  });
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(individualsJsonLd(locale)) }} />
      <PageHero>
        <HeroHead eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ArrowButton href={firm.whatsapp} external ltr={!ar}>{t.book}</ArrowButton>
            <MatterBriefCTA locale={locale} matterTypes={matterTypes} tone="onDark" />
          </div>
        </HeroHead>
      </PageHero>

      <Band tone="white">
        <Wrap max="6xl">
          <BandHead {...t.services} />
          <div className="mt-14 space-y-14">
            {individualGroups.map((g) => (
              <div key={g.id}>
                <h3 className="font-display flex items-center gap-3 text-2xl font-light text-[#00124a]">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#e0b35a]" />
                  {ar ? g.ar : g.en}
                </h3>
                <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {g.slugs.map((slug) => {
                    const l = line(slug);
                    return (
                      <li key={slug}>
                        <Link
                          href={`${prefix}/services/${slug}`}
                          className="group glass-card flex h-full flex-col items-center rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1"
                        >
                          <h4 className="font-display text-lg font-bold text-ink">{ar ? l.title : l.titleEn}</h4>
                          <p className="gold-eyebrow mt-1 text-[11px]">{ar ? l.titleEn : l.title}</p>
                          <p className="mt-3 text-sm leading-7 text-ink-soft/80">{ar ? l.summary : specializedLineSummaryEn[slug]}</p>
                          <span className="mt-auto inline-block pt-4 text-sm font-semibold text-gold-deep">{t.cta} {ar ? "←" : "→"}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm font-light text-ink-soft">
            {t.corp.text}{" "}
            <Link href={t.corp.href} className="font-semibold text-gold-deep hover:underline">{t.corp.link}</Link>
          </p>
        </Wrap>
      </Band>

      <Band tone="tint">
        <Wrap max="6xl">
          <BandHead {...t.how} />
          <div className="mt-14">
            <Numbered items={steps[locale]} />
          </div>
        </Wrap>
      </Band>

      <Band tone="white">
        <Wrap max="5xl">
          <BandHead {...t.read} />
          <div className="mt-14">
            <RowList items={read} />
          </div>
          <p className="mx-auto mt-14 max-w-xl text-center text-xs leading-6 text-ink-soft/80">{t.note}</p>
        </Wrap>
      </Band>
    </div>
  );
}
