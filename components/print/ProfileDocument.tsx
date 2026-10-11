import type { CSSProperties, ReactNode } from "react";
import QRCode from "qrcode";
import { attorneys, corePillars, deliverables, firm, lineAxis, matterMethod, serviceStandard, specializedLines } from "@/lib/site";
import { accreditations } from "@/lib/accreditations";
import { sectors } from "@/lib/sectors";
import { attorneyEn, firmEn, serviceStandardEn } from "@/lib/site.en";
import ProfileScreenBar from "@/components/print/ProfileScreenBar";

/**
 * The company profile: a separate piece from the website, not a print of it. Where the site is dark, animated and
 * layered, the profile is a dossier: warm paper, deep navy, one gold, hairline rules, very large numerals and
 * headlines set in Hail (Arabic) with space doing the work that cards do online. Nine A4 pages, Arabic and English
 * from one source. Print it to PDF with background graphics on (the PDFs in /downloads are made from this page).
 */

type Locale = "ar" | "en";

const PAPER = "#f6f1e6";
const INK = "#00124a";
const DEEP = "#00061d";
const GOLD = "#b98a35"; // rules and large type
const GOLD_TEXT = "#76570f"; // small gold text on paper (>= 5:1)
const GOLD_BRIGHT = "#e0b35a"; // gold on navy
const BODY = "#2c3550";
const HAIR = "rgba(0,18,74,0.16)";
const TOTAL = 9;

const T = {
  ar: {
    cover: "الملف التعريفي",
    year: "2026",
    headline: "فهمٌ يُسابق الرأْي",
    headlineAlt: "Understanding that runs ahead of opinion",
    who: "من نحن",
    whoK: "Who we are",
    principles: "ثلاثة مبادئ نبني عليها كل ملف",
    facts: [
      ["رخصة مزاولة المحاماة", firm.licenseNumber],
      ["السجل الموحد", firm.unifiedNumber],
      ["المقر", "الرياض · حي الياسمين"],
      ["ساعات العمل", "الأحد – الخميس ٨ ص – ٥ م · السبت ١٠ ص – ٢ م"],
    ],
    journey: "رحلة العميل",
    servicesK: "Practice architecture",
    services: "منظومة الخدمات",
    servicesLead: "نعرض الخدمات بوصفها رحلة عمل متصلة، من المشورة قبل القرار إلى اكتمال الأثر.",
    linesK: "Practice lines",
    lines: "خطوط الممارسة المتخصصة",
    methodK: "Method",
    method: "منهجنا في إدارة المسألة",
    deliverables: "ما نسلّمه",
    standard: "معيار الخدمة",
    leadK: "Leadership",
    lead: "القيادة المهنية",
    cred: "الاعتمادات المهنية",
    areas: "مجالات الممارسة",
    sectorsK: "Sectors",
    sectors: "القطاعات التي نخدمها",
    sectorsLead: "نفهم طبيعة كل قطاع قبل أن نكتب أو نترافع: عقوده ومخاطره ولغته التجارية.",
    accK: "Accreditations",
    acc: "الاعتمادات والتراخيص",
    accLead: "تراخيص واعتمادات رسمية في الترافع والاستشارة والتحكيم.",
    contactK: "Get in touch",
    contact: "لنبدأ بمسألتك",
    contactLead: "نبدأ بتحديد النطاق والمخرجات منذ أول تواصل. أرسل نبذة مختصرة: الأطراف، والوقائع الأساسية، والهدف المطلوب.",
    phone: "الجوال",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    web: "الموقع",
    office: "المقر",
    hours: "ساعات العمل",
    hoursV: "الأحد – الخميس ٨ ص – ٥ م · السبت ١٠ ص – ٢ م · الجمعة مغلق",
    scanWa: "واتساب",
    scanWeb: "الموقع",
    page: "صفحة",
    stageWord: "المرحلة",
    license: "رخصة مزاولة المحاماة",
    unified: "السجل الموحد",
    stats: [
      [String(corePillars.length), "محاور أساسية"],
      [String(specializedLines.length), "خط ممارسة متخصص"],
      [String(sectors.length), "قطاعًا نخدمه"],
      [String(matterMethod.length), "خطوات في المنهج"],
    ],
  },
  en: {
    cover: "Company Profile",
    year: "2026",
    headline: "Understanding that runs ahead of opinion",
    headlineAlt: "فهمٌ يُسابق الرأْي",
    who: "Who we are",
    whoK: "About the firm",
    principles: "Three principles behind every file",
    facts: [
      ["Law Practice Licence No.", firm.licenseNumber],
      ["Unified Number", firm.unifiedNumber],
      ["Office", "Riyadh · Al Yasmin District"],
      ["Opening hours", "Sun – Thu 8 AM – 5 PM · Sat 10 AM – 2 PM"],
    ],
    journey: "The client journey",
    servicesK: "Practice architecture",
    services: "The legal service system",
    servicesLead: "We present our services as a connected engagement journey: from advice before a decision through to a completed practical effect.",
    linesK: "Practice lines",
    lines: "Specialised practice lines",
    methodK: "Method",
    method: "How we manage a matter",
    deliverables: "What we deliver",
    standard: "Our service standard",
    leadK: "Leadership",
    lead: "Professional leadership",
    cred: "Professional credentials",
    areas: "Practice areas",
    sectorsK: "Sectors",
    sectors: "Sectors we serve",
    sectorsLead: "We understand a sector before we write or plead in it: its contracts, its risks and its commercial language.",
    accK: "Accreditations",
    acc: "Accreditations & licences",
    accLead: "Official licences and accreditations in advocacy, advice and arbitration.",
    contactK: "Get in touch",
    contact: "Let's start with your matter",
    contactLead: "We start by scoping the matter and the deliverables from the first contact. Send a short summary: the parties, the key facts and the goal.",
    phone: "Phone",
    whatsapp: "WhatsApp",
    email: "Email",
    web: "Website",
    office: "Office",
    hours: "Opening hours",
    hoursV: "Sun – Thu 8:00 AM – 5:00 PM · Sat 10:00 AM – 2:00 PM · Fri closed",
    scanWa: "WhatsApp",
    scanWeb: "Website",
    page: "Page",
    stageWord: "Stage",
    license: "Law Practice Licence No.",
    unified: "Unified Number",
    stats: [
      [String(corePillars.length), "core pillars"],
      [String(specializedLines.length), "practice lines"],
      [String(sectors.length), "sectors served"],
      [String(matterMethod.length), "steps in the method"],
    ],
  },
} as const;

/** The stage each pillar answers, in English (the site data carries it in Arabic only). */
const stageEn: Record<string, string> = {
  "قبل القرار": "Before the decision",
  "بناء العلاقة": "Building the relationship",
  "نشوء النزاع": "When a dispute arises",
  "حماية التشغيل": "Protecting operations",
  "الأصول الرقمية": "Digital assets",
  "اكتمال الأثر": "Completing the effect",
};

const principles = {
  ar: [
    { n: "١", t: "دقة", s: "في التحليل والصياغة", b: "نبدأ من قراءة الوقائع والمخاطر والهدف التجاري، ثم نبني الموقف القانوني بالحجة والدليل." },
    { n: "٢", t: "وضوح", s: "في النطاق والمخرجات", b: "نتفق منذ البداية على نطاق العمل والمخرجات والافتراضات، ونكتب بلغة تناسب المحكمة والعميل." },
    { n: "٣", t: "متابعة", s: "حتى يكتمل الأثر", b: "نُبقيك مطّلعًا على ملفك عبر بوابة العملاء، ونواصل إلى ما بعد التنفيذ حتى يكتمل الأثر." },
  ],
  en: [
    { n: "1", t: "Precision", s: "in analysis and drafting", b: "We read the facts, the risks and the commercial objective first, then build the legal position on argument and evidence." },
    { n: "2", t: "Clarity", s: "in scope and deliverables", b: "We agree the scope, the deliverables and the assumptions at the outset, and write in language fitted to the court and the client." },
    { n: "3", t: "Follow-through", s: "until the effect is complete", b: "We keep you informed through the client portal and stay engaged past execution until the effect is complete." },
  ],
} as const;

/** Display type: Hail for Arabic headlines; the brand Latin face for English ones. */
const display = (en: boolean): CSSProperties => ({
  fontFamily: en ? "var(--font-brand-raw), var(--font-brand-fallback), sans-serif" : "var(--font-blog-stack)",
  fontWeight: en ? 400 : 300,
  letterSpacing: en ? "-0.01em" : undefined,
});

function Sheet({
  children,
  tone = "paper",
  n,
  locale,
  label,
  footDark = false,
  panel,
}: {
  children: ReactNode;
  tone?: "paper" | "dark";
  n?: number;
  locale: Locale;
  label?: string;
  /** The foot of this paper page sits on a navy block, so its folio is drawn light. */
  footDark?: boolean;
  /** A full-height navy panel on this page's start or end side: the header and footer parts that sit on it are drawn light. */
  panel?: "start" | "end";
}) {
  const dark = tone === "dark";
  const t = T[locale];
  const fg = dark ? "rgba(255,255,255,0.62)" : "rgba(44,53,80,0.7)";
  return (
    <section
      className="sheet relative overflow-hidden"
      style={{ width: "210mm", height: "296.5mm", background: dark ? DEEP : PAPER, color: dark ? "#fff" : BODY }}
    >
      {n && (
        <>
          <header className="absolute inset-x-[18mm] top-[11mm] z-10 flex items-center justify-between text-[10px] tracking-[0.18em]" style={{ color: fg }}>
            <span className="flex items-center gap-2.5">
              <img src="/brand/logo-mark.png" alt="" width={20} height={16} style={{ height: "4.2mm", width: "auto" }} />
              <span style={{ letterSpacing: "0.3em", fontWeight: 600, color: dark || panel === "start" ? GOLD_BRIGHT : INK }}>TAAP</span>
            </span>
            <span style={{ textTransform: "uppercase", color: panel === "end" ? "rgba(255,255,255,0.7)" : undefined }}>{label}</span>
          </header>
          <footer className="absolute inset-x-[18mm] bottom-[9mm] z-10 flex items-end justify-between text-[10px]" style={{ color: fg }}>
            <span dir="ltr" style={{ letterSpacing: "0.14em", color: dark || footDark || panel === "start" ? "rgba(255,255,255,0.62)" : undefined }}>{firm.domain}</span>
            <span className="flex items-baseline gap-2" dir="ltr" style={{ color: dark || footDark || panel === "end" ? "rgba(255,255,255,0.62)" : undefined }}>
              <span style={{ ...display(true), fontSize: 20, color: dark || footDark || panel === "end" ? GOLD_BRIGHT : GOLD_TEXT, lineHeight: 1 }}>{String(n).padStart(2, "0")}</span>
              <span style={{ letterSpacing: "0.2em" }}>/ {String(TOTAL).padStart(2, "0")}</span>
              <span className="sr-only">{t.page}</span>
            </span>
          </footer>
        </>
      )}
      {children}
    </section>
  );
}

/** A kicker: a short gold bar and a small label above a headline. */
function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.28em]" style={{ color: dark ? GOLD_BRIGHT : GOLD_TEXT }}>
      <span style={{ width: "9mm", height: "0.5mm", background: dark ? GOLD_BRIGHT : GOLD }} />
      {children}
    </div>
  );
}

function Title({ children, en, size = 40, dark = false, style }: { children: ReactNode; en: boolean; size?: number; dark?: boolean; style?: CSSProperties }) {
  return (
    <h2 style={{ ...display(en), fontSize: en ? size * 0.82 : size, lineHeight: en ? 1.08 : 1.42, color: dark ? "#fff" : INK, margin: 0, ...style }}>{children}</h2>
  );
}

const Rule = ({ dark = false, style }: { dark?: boolean; style?: CSSProperties }) => (
  <div style={{ height: "0.25mm", background: dark ? "rgba(246,226,179,0.28)" : HAIR, ...style }} />
);

export default async function ProfileDocument({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const t = T[locale];
  const attorney = en ? attorneyEn : attorneys[0];
  const standard = en ? serviceStandardEn : serviceStandard;
  const tagline = en ? firmEn.tagline : firm.tagline;
  const [qrWa, qrWeb] = await Promise.all(
    [firm.whatsapp, `${firm.website}${en ? "/en" : ""}`].map((u) => QRCode.toString(u, { type: "svg", margin: 0, color: { dark: INK, light: "#0000" } })),
  );
  const axisOrder = ["corporate-contracts", "compliance-governance", "technology-data", "enforcement-recovery"];
  const sideStart = en ? "left" : "right"; // the "start" edge in physical terms, for the few absolutely placed shapes

  return (
    <main dir={en ? "ltr" : "rtl"} lang={en ? "en" : "ar"} className="profile-root">
      <style>{`
        @page { size: 210mm 297mm; margin: 0; }
        html, body { margin: 0; padding: 0; background: #fff; }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .sheet { box-sizing: border-box; break-after: page; }
        .sheet:last-child { break-after: auto; }
        .profile-root { font-feature-settings: "kern"; }
        .profile-root[dir="ltr"] { word-spacing: 0.14em; }
        @layer base { :where(.profile-root) :is(h1, h2, h3, h4, p) { margin: 0; } }
        .profile-root b, .profile-root strong, .profile-root .font-bold { -webkit-text-stroke: 0; }
        @media screen {
          body { background: #141a2b; }
          .profile-root { padding: 62px 0 40px; }
          .sheet { margin: 0 auto 22px; box-shadow: 0 20px 60px rgba(0,0,0,0.45); zoom: var(--fit, 1); }
        }
        @media print { .no-print { display: none !important; } .sheet { zoom: 1 !important; } }
      `}</style>
      <ProfileScreenBar
        labels={en ? { pdf: "Download PDF", site: "Visit the website", back: "taap.sa" } : { pdf: "تحميل PDF", site: "زيارة الموقع", back: "taap.sa" }}
        pdfHref={`/downloads/company-profile-${en ? "en" : "ar"}.pdf`}
        siteHref={en ? "/en" : "/"}
        en={en}
      />

      {/* 1 — Cover */}
      <Sheet tone="dark" locale={locale}>
        {/* Riyadh, turned to a navy duotone, rising from the foot of the page */}
        <div className="absolute inset-x-0 bottom-0" style={{ height: "128mm", background: INK }}>
          <img src="/brand/profile/city-kafd.jpg" alt="" className="absolute inset-0" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "48% 55%" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${DEEP} 0%, rgba(0,6,29,0.55) 30%, rgba(0,18,74,0.1) 58%, rgba(0,6,29,0.9) 100%)` }} />
        </div>
        {/* the mark, enormous and faint, bleeding off the edge */}
        <img
          src="/brand/logo-mark.png"
          alt=""
          className="absolute"
          style={{ width: "205mm", [sideStart === "right" ? "left" : "right"]: "-62mm", top: "40mm", opacity: 0.055, filter: "brightness(1.6)" }}
        />
        <div className="absolute inset-x-[18mm] top-[16mm] flex items-start justify-between">
          <img src="/brand/logo-lockup.png" alt="" style={{ width: "62mm" }} />
          <span style={{ ...display(true), fontSize: 22, color: GOLD_BRIGHT, letterSpacing: "0.12em" }}>{t.year}</span>
        </div>

        <div className="absolute inset-x-[18mm]" style={{ top: "86mm" }}>
          <Kicker dark>{t.cover}</Kicker>
          <h1
            style={{
              ...display(en),
              marginTop: "9mm",
              fontSize: en ? 58 : 84,
              lineHeight: en ? 1.04 : 1.3,
              color: "#fff",
              maxWidth: en ? "150mm" : "160mm",
              fontWeight: en ? 400 : 300,
            }}
          >
            {t.headline}
          </h1>
          <div className="mt-[9mm] flex items-center gap-4">
            <span style={{ width: "22mm", height: "0.5mm", background: GOLD_BRIGHT }} />
            <span style={{ width: "2.2mm", height: "2.2mm", background: GOLD_BRIGHT, transform: "rotate(45deg)" }} />
          </div>
          <p dir={en ? "rtl" : "ltr"} style={{ marginTop: "7mm", fontSize: en ? 18 : 15, color: GOLD_BRIGHT, textAlign: en ? "right" : "left", letterSpacing: en ? 0 : "0.04em", fontFamily: en ? "var(--font-blog-stack)" : undefined }}>
            {t.headlineAlt}
          </p>
        </div>

        <div className="absolute inset-x-[18mm] bottom-[14mm] flex items-end justify-between gap-8" style={{ color: "rgba(255,255,255,0.86)" }}>
          <div>
            <p style={{ ...display(en), fontSize: en ? 17 : 19, color: "#fff", whiteSpace: "nowrap" }}>{en ? firmEn.nameFull : firm.nameAr}</p>
            <p className="mt-2 text-[11.5px] tracking-[0.06em]" style={{ color: "rgba(255,255,255,0.7)" }}>
              {en ? firmEn.city : firm.city}
            </p>
          </div>
          <div className="text-[10.5px] leading-[1.9]" style={{ textAlign: en ? "left" : "right", color: "rgba(255,255,255,0.78)" }}>
            <p>
              {t.license} <b style={{ color: GOLD_BRIGHT, fontWeight: 600 }}>{firm.licenseNumber}</b>
            </p>
            <p>
              {t.unified} <b style={{ color: GOLD_BRIGHT, fontWeight: 600 }}>{firm.unifiedNumber}</b>
            </p>
          </div>
        </div>
      </Sheet>

      {/* 2 — Who we are */}
      <Sheet n={2} locale={locale} label={t.whoK} footDark>
        <div className="absolute inset-x-[18mm] top-[27mm]">
          <Kicker>{t.whoK}</Kicker>
          <Title en={en} size={46} style={{ marginTop: "6mm" }}>
            {t.who}
          </Title>

          <p style={{ ...display(en), marginTop: "8mm", fontSize: en ? 25 : 30, lineHeight: en ? 1.3 : 1.75, color: INK, maxWidth: "150mm" }}>{tagline}</p>
          <p className="mt-6 text-[13.5px] leading-[2.15]" style={{ maxWidth: "150mm" }}>
            {en
              ? firmEn.description
              : `يقدّم ${firm.nameShortAr} للمحاماة والاستشارات القانونية خدمات قانونية مركّزة للمسائل التي تتطلب دقة في التحليل، وجودة في الصياغة، وانضباطًا في إدارة الملف حتى الوصول إلى أثر عملي.`}
          </p>

          <Rule style={{ marginTop: "9mm" }} />
          <dl className="grid" style={{ gridTemplateColumns: "1fr 1fr", columnGap: "14mm" }}>
            {t.facts.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-[3.2mm]" style={{ borderBottom: `0.25mm solid ${HAIR}` }}>
                <dt className="text-[11px]" style={{ color: GOLD_TEXT }}>{k}</dt>
                <dd className="m-0 text-[12px] font-semibold" style={{ color: INK, textAlign: en ? "right" : "left" }}>{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-[10mm] text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_TEXT }}>{t.principles}</h3>
          <div className="mt-5 grid grid-cols-3" style={{ columnGap: 0 }}>
            {principles[locale].map((p, i) => (
              <div key={p.t} className="px-[5mm] pb-2" style={{ borderInlineStart: i === 0 ? "none" : `0.25mm solid ${HAIR}`, paddingInlineStart: i === 0 ? 0 : "6mm" }}>
                <span style={{ ...display(en), fontSize: 64, lineHeight: 1, color: "transparent", WebkitTextStroke: `0.35mm ${GOLD}` }}>{p.n}</span>
                <h4 style={{ ...display(en), marginTop: 10, fontSize: en ? 22 : 26, color: INK, lineHeight: 1.3 }}>{p.t}</h4>
                <p className="mt-0.5 text-[11px] font-semibold" style={{ color: GOLD_TEXT }}>{p.s}</p>
                <p className="mt-3 text-[11.5px] leading-[2]">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0" style={{ bottom: 0, height: "58mm", background: INK }}>
          <div className="absolute inset-x-[18mm] top-[9mm]">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_BRIGHT }}>{t.journey}</p>
            <div className="mt-5 grid" style={{ gridTemplateColumns: `repeat(${corePillars.length}, 1fr)` }}>
              {corePillars.map((p, i) => (
                <div key={p.slug} className="relative pe-2" style={{ borderTop: `0.35mm solid ${GOLD_BRIGHT}`, paddingTop: "3mm" }}>
                  <span aria-hidden className="absolute" style={{ top: "-1.1mm", insetInlineStart: 0, width: "1.8mm", height: "1.8mm", background: GOLD_BRIGHT, transform: "rotate(45deg)" }} />
                  <span style={{ ...display(true), fontSize: 20, color: GOLD_BRIGHT, lineHeight: 1 }}>0{i + 1}</span>
                  <p className="mt-2 text-[11px] font-semibold leading-[1.6]" style={{ color: "#fff" }}>{en ? (stageEn[p.stage] ?? p.stage) : p.stage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sheet>

      {/* 3 — Service architecture */}
      <Sheet n={3} locale={locale} label={t.servicesK}>
        <div className="absolute inset-x-[18mm] top-[27mm]">
          <Kicker>{t.servicesK}</Kicker>
          <Title en={en} size={46} style={{ marginTop: "6mm" }}>
            {t.services}
          </Title>
          <p className="mt-4 text-[12.5px] leading-[2]" style={{ maxWidth: "140mm" }}>{t.servicesLead}</p>
        </div>
        <div className="absolute inset-x-[18mm]" style={{ top: "80mm" }}>
          {corePillars.map((p, i) => (
            <div key={p.slug} className="grid items-start gap-[6mm] py-[3.6mm]" style={{ gridTemplateColumns: "17mm 1fr", borderTop: `0.25mm solid ${i === 0 ? INK : HAIR}` }}>
              <div className="relative overflow-hidden" style={{ width: "17mm", height: "24mm", background: INK }}>
                <img src={`/brand/profile/thumb-${p.slug}.jpg`} alt="" className="absolute inset-0" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ ...display(true), position: "absolute", insetInlineStart: "1.6mm", bottom: "1mm", fontSize: 22, lineHeight: 1, color: "#fff" }}>0{i + 1}</span>
              </div>
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 style={{ ...display(en), fontSize: en ? 20 : 23, lineHeight: 1.3, color: INK }}>{en ? p.titleEn : p.title}</h3>
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_TEXT }}>{en ? (stageEn[p.stage] ?? p.stage) : p.stage}</span>
                </div>
                <p className="text-[9.5px] uppercase tracking-[0.14em]" style={{ color: "rgba(44,53,80,0.82)" }}>{en ? p.title : p.titleEn}</p>
                <ul className="mt-2 grid list-none gap-x-6 gap-y-0.5 p-0 text-[11px] leading-[1.7]" style={{ gridTemplateColumns: "1fr 1fr", margin: 0 }}>
                  {p.items.map((it) => (
                    <li key={it.titleEn} className="flex gap-2">
                      <span aria-hidden style={{ marginTop: "0.6em", width: "1.3mm", height: "1.3mm", background: GOLD, transform: "rotate(45deg)", flex: "none" }} />
                      <span>{en ? it.titleEn : it.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Sheet>

      {/* 4 — Practice lines (an index) */}
      <Sheet n={4} locale={locale} label={t.linesK}>
        <div className="absolute inset-x-[18mm] top-[27mm]">
          <Kicker>{t.linesK}</Kicker>
          <Title en={en} size={46} style={{ marginTop: "6mm" }}>
            {t.lines}
          </Title>
        </div>
        <div className="absolute inset-x-[18mm]" style={{ top: "72mm" }}>
          {[[axisOrder[0]], [axisOrder[1]], [axisOrder[2], axisOrder[3]]].map((row, ri) => (
            <div key={ri} className="grid" style={{ gridTemplateColumns: row.length === 2 ? "1fr 1fr" : "1fr", columnGap: "14mm", marginTop: ri === 0 ? 0 : "7mm" }}>
              {row.map((slug) => {
                const axis = corePillars.find((p) => p.slug === slug)!;
                const ai = axisOrder.indexOf(slug);
                const lines = specializedLines.filter((l) => lineAxis[l.slug] === slug);
                return (
                  <div key={slug}>
                    <div className="flex items-baseline gap-3 pb-2" style={{ borderBottom: `0.4mm solid ${INK}` }}>
                      <span style={{ ...display(true), fontSize: 26, lineHeight: 1, color: GOLD_TEXT }}>0{ai + 1}</span>
                      <h3 style={{ ...display(en), fontSize: en ? 17 : 20, lineHeight: 1.3, color: INK }}>{en ? axis.titleEn : axis.title}</h3>
                    </div>
                    <ul className="m-0 list-none p-0" style={{ columnCount: row.length === 1 ? 2 : 1, columnGap: "14mm" }}>
                      {lines.map((l) => (
                        <li key={l.slug} className="py-[1.6mm]" style={{ borderBottom: `0.25mm solid ${HAIR}`, breakInside: "avoid" }}>
                          <p className="text-[12px] font-semibold leading-[1.5]" style={{ color: INK }}>{en ? l.titleEn : l.title}</p>
                          <p className="text-[9px] uppercase tracking-[0.1em]" style={{ color: "rgba(44,53,80,0.82)" }}>{en ? l.title : l.titleEn}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Sheet>

      {/* 5 — Method, deliverables, standard */}
      <Sheet n={5} locale={locale} label={t.methodK} panel="end">
        {/* the navy panel for what we deliver, on the end side */}
        <div className="absolute inset-y-0" style={{ [en ? "right" : "left"]: 0, width: "70mm", background: INK }} />
        <div className="absolute top-[27mm]" style={{ [en ? "left" : "right"]: "18mm", width: "104mm" }}>
          <Kicker>{t.methodK}</Kicker>
          <Title en={en} size={42} style={{ marginTop: "6mm" }}>
            {t.method}
          </Title>
          <ol className="m-0 mt-[11mm] list-none p-0">
            {matterMethod.map((s, i) => (
              <li key={s.step} className="relative flex gap-5 pb-[7mm]">
                {i < matterMethod.length - 1 && <span aria-hidden className="absolute" style={{ insetInlineStart: "7mm", top: "14mm", bottom: "-1mm", width: "0.3mm", background: GOLD, opacity: 0.55 }} />}
                <span style={{ ...display(true), fontSize: 34, lineHeight: 1, color: GOLD_TEXT, width: "15mm", flex: "none" }}>{s.step}</span>
                <div>
                  <h3 style={{ ...display(en), fontSize: en ? 21 : 23, lineHeight: 1.3, color: INK }}>{en ? s.title : s.titleAr}</h3>
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color: GOLD_TEXT }}>{en ? s.titleAr : s.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="absolute top-[27mm]" style={{ [en ? "right" : "left"]: "9mm", width: "52mm", color: "#fff" }}>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_BRIGHT }}>{t.deliverables}</p>
          <ul className="m-0 mt-5 list-none p-0">
            {deliverables.map((d, i) => (
              <li key={d.title} className="py-[3mm]" style={{ borderTop: `0.25mm solid rgba(246,226,179,0.28)` }}>
                <span className="text-[10px]" style={{ color: GOLD_BRIGHT }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-0.5 text-[12px] font-semibold leading-[1.6]">{en ? d.titleEn : d.title}</p>
                <p className="text-[9px] uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.58)" }}>{en ? d.title : d.titleEn}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-[22mm]" style={{ [en ? "left" : "right"]: "18mm", width: "104mm" }}>
          <Rule />
          <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_TEXT }}>{t.standard}</p>
          <div className="mt-3 grid grid-cols-1 gap-y-1.5 text-[10.8px] leading-[1.75]">
            {standard.map((s) => (
              <p key={s.title}>
                <b style={{ color: INK, fontWeight: 700 }}>{s.title}.</b> {s.description}
              </p>
            ))}
          </div>
        </div>
      </Sheet>

      {/* 6 — Leadership */}
      <Sheet n={6} locale={locale} label={t.leadK} panel="start">
        <div className="absolute inset-y-0" style={{ [en ? "left" : "right"]: 0, width: "78mm", background: INK }} />
        <div className="absolute" style={{ [en ? "left" : "right"]: "10mm", top: "27mm", width: "58mm" }}>
          <div className="relative overflow-hidden" style={{ width: "58mm", height: "76mm", background: DEEP }}>
            <img src="/brand/attorney-turki.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            <span aria-hidden className="absolute inset-x-0 bottom-0" style={{ height: "1.2mm", background: GOLD_BRIGHT }} />
          </div>
          <h3 style={{ ...display(en), marginTop: "6mm", fontSize: en ? 24 : 30, lineHeight: 1.25, color: "#fff" }}>{attorney.name}</h3>
          <p className="mt-2 text-[11px] leading-[1.8]" style={{ color: GOLD_BRIGHT }}>{attorney.role}</p>
          <p className="mt-[9mm] text-[10.5px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_BRIGHT }}>{t.areas}</p>
          <ul className="m-0 mt-3 list-none p-0 text-[11px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.88)" }}>
            {attorney.practiceAreas.map((a) => (
              <li key={a.label} className="py-[1.6mm]" style={{ borderTop: `0.25mm solid rgba(246,226,179,0.25)` }}>
                {a.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute top-[27mm]" style={{ [en ? "right" : "left"]: "18mm", width: "98mm" }}>
          <Kicker>{t.leadK}</Kicker>
          <Title en={en} size={42} style={{ marginTop: "6mm" }}>
            {t.lead}
          </Title>
          <div style={{ marginTop: en ? "7mm" : "9mm" }}>
            {attorney.bio.map((p, i) => (
              <p
                key={i}
                style={i === 0 ? { ...display(en), fontSize: en ? 19 : 21, lineHeight: en ? 1.45 : 1.85, color: INK, marginBottom: 14 } : { fontSize: en ? 10.6 : 11.4, lineHeight: en ? 1.85 : 1.95, marginBottom: en ? 6 : 8 }}
              >
                {p}
              </p>
            ))}
          </div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD_TEXT, marginTop: en ? "5mm" : "8mm" }}>{t.cred}</p>
          <ul className="m-0 mt-3 list-none p-0">
            {attorney.credentials.map((c) => (
              <li key={c.title} className={en ? "py-[1.5mm]" : "py-[2.2mm]"} style={{ borderTop: `0.25mm solid ${HAIR}` }}>
                <p className={en ? "text-[10.6px] font-bold leading-[1.5]" : "text-[11.5px] font-bold leading-[1.6]"} style={{ color: INK }}>{c.title}</p>
                <p className={en ? "text-[9.6px] leading-[1.65]" : "text-[10.5px] leading-[1.8]"} style={{ color: "rgba(44,53,80,0.82)" }}>{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>

      {/* 7 — Sectors */}
      <Sheet n={7} locale={locale} label={t.sectorsK}>
        <div className="absolute inset-x-[18mm] top-[27mm]">
          <Kicker>{t.sectorsK}</Kicker>
          <Title en={en} size={46} style={{ marginTop: "6mm" }}>
            {t.sectors}
          </Title>
          <p className="mt-4 text-[12.5px] leading-[2]" style={{ maxWidth: "140mm" }}>{t.sectorsLead}</p>
        </div>
        <div className="absolute inset-x-[18mm] grid" style={{ top: "80mm", gridTemplateColumns: "1fr 1fr", columnGap: "14mm" }}>
          {sectors.map((s, i) => {
            const c = en ? s.en : s.ar;
            return (
              <div key={s.slug} className="flex items-baseline gap-3 py-[3.3mm]" style={{ borderTop: `0.25mm solid ${i < 2 ? INK : HAIR}` }}>
                <span className="w-[7mm] shrink-0 text-[10px]" style={{ ...display(true), color: GOLD_TEXT, fontSize: 14 }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[12.5px] font-semibold leading-[1.5]" style={{ color: INK }}>{c.title}</span>
              </div>
            );
          })}
        </div>
        <div className="absolute inset-x-[18mm] bottom-[22mm] grid grid-cols-4" style={{ borderTop: `0.4mm solid ${INK}` }}>
          {t.stats.map(([v, l], i) => (
            <div key={l} className="pt-4" style={{ paddingInlineStart: i === 0 ? 0 : "5mm", borderInlineStart: i === 0 ? "none" : `0.25mm solid ${HAIR}` }}>
              <p style={{ ...display(true), fontSize: 46, lineHeight: 1, color: INK }}>{v}</p>
              <p className="mt-1 text-[10.5px]" style={{ color: GOLD_TEXT }}>{l}</p>
            </div>
          ))}
        </div>
      </Sheet>

      {/* 8 — Accreditations */}
      <Sheet tone="dark" n={8} locale={locale} label={t.accK}>
        <div className="absolute inset-0" style={{ background: INK }}>
          <img src="/brand/profile/city-skyline.jpg" alt="" className="absolute inset-0" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${DEEP} 0%, rgba(0,6,29,0.78) 50%, ${DEEP} 100%)` }} />
        </div>
        <div className="absolute inset-x-[18mm] top-[27mm]">
          <Kicker dark>{t.accK}</Kicker>
          <Title en={en} size={46} dark style={{ marginTop: "6mm" }}>
            {t.acc}
          </Title>
          <p className="mt-4 text-[12.5px] leading-[2]" style={{ maxWidth: "140mm", color: "rgba(255,255,255,0.78)" }}>{t.accLead}</p>
        </div>
        <div className="absolute inset-x-[18mm] grid grid-cols-3" style={{ top: "88mm", gap: "5mm" }}>
          {accreditations.map((a) => (
            <div key={a.key} className="flex flex-col" style={{ background: "#fff", minHeight: "56mm", padding: "5mm 4mm 4mm" }}>
              <div className="flex items-center justify-center" style={{ height: "21mm" }}>
                {a.logos?.map((l) => (
                  <img key={l.src} src={l.src} alt="" style={{ height: "15mm", maxWidth: "100%", width: "auto", objectFit: "contain" }} />
                ))}
              </div>
              <span className="my-[3mm] block" style={{ width: "9mm", height: "0.5mm", background: GOLD }} />
              <h3 className="text-[11.5px] font-bold leading-[1.75]" style={{ color: INK }}>{a[locale].title}</h3>
            </div>
          ))}
        </div>
      </Sheet>

      {/* 9 — Contact */}
      <Sheet tone="dark" n={9} locale={locale} label={t.contactK}>
        <div className="absolute inset-0" style={{ background: INK }}>
          <img src="/brand/profile/city-kafd.jpg" alt="" className="absolute inset-0" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% 40%", opacity: 0.5 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(0,6,29,0.82) 0%, rgba(0,6,29,0.9) 55%, ${DEEP} 100%)` }} />
        </div>
        <div className="absolute inset-x-[18mm] top-[27mm]">
          <Kicker dark>{t.contactK}</Kicker>
          <h2 style={{ ...display(en), marginTop: "7mm", fontSize: en ? 52 : 66, lineHeight: en ? 1.05 : 1.3, color: "#fff", maxWidth: "150mm" }}>{t.contact}</h2>
          <p className="mt-5 text-[13px] leading-[2.1]" style={{ maxWidth: "135mm", color: "rgba(255,255,255,0.8)" }}>{t.contactLead}</p>
        </div>

        <div className="absolute inset-x-[18mm]" style={{ top: "124mm" }}>
          {[
            [t.phone, firm.phoneDisplay],
            [t.whatsapp, firm.phoneDisplay],
            [t.email, firm.email],
            [t.web, firm.domain],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-6 py-[3.6mm]" style={{ borderTop: "0.25mm solid rgba(246,226,179,0.3)" }}>
              <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: GOLD_BRIGHT }}>{k}</span>
              <span dir="ltr" style={{ ...display(true), fontSize: 24, color: "#fff", letterSpacing: "0.02em" }}>{v}</span>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-6 py-[3.6mm]" style={{ borderTop: "0.25mm solid rgba(246,226,179,0.3)" }}>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: GOLD_BRIGHT }}>{t.office}</span>
            <span className="text-[13px] leading-[1.9]" style={{ color: "#fff", textAlign: en ? "right" : "left" }}>
              {en ? "Floor 1, Office 14, Abu Bakr Al Siddiq Branch Road, Al Yasmin District, Riyadh 13326" : "الدور الأول، مكتب 14، طريق أبي بكر الصديق الفرعي، حي الياسمين، الرياض 13326"} · <span dir="ltr">{firm.plusCode}</span>
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-6 py-[3.6mm]" style={{ borderTop: "0.25mm solid rgba(246,226,179,0.3)", borderBottom: "0.25mm solid rgba(246,226,179,0.3)" }}>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: GOLD_BRIGHT }}>{t.hours}</span>
            <span className="text-[12.5px] leading-[1.9]" style={{ color: "#fff", textAlign: en ? "right" : "left" }}>{t.hoursV}</span>
          </div>
        </div>

        <div className="absolute inset-x-[18mm] flex items-end justify-between" style={{ bottom: "20mm" }}>
          <div className="flex gap-5">
            {[
              [qrWa, t.scanWa],
              [qrWeb, t.scanWeb],
            ].map(([svg, label]) => (
              <figure key={label} className="m-0 text-center">
                <div style={{ background: "#fff", padding: "2.4mm", width: "31mm", height: "31mm" }} dangerouslySetInnerHTML={{ __html: svg.replace("<svg", '<svg style="width:100%;height:100%"') }} />
                <figcaption className="mt-1.5 text-[10px] uppercase tracking-[0.2em]" style={{ color: GOLD_BRIGHT }}>{label}</figcaption>
              </figure>
            ))}
          </div>
          <div style={{ textAlign: en ? "right" : "left" }}>
            <img src="/brand/logo-lockup.png" alt="" style={{ width: "58mm", marginInlineStart: en ? "auto" : 0 }} />
            <p className="mt-3 text-[10.5px] leading-[1.9]" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t.license} {firm.licenseNumber} · {t.unified} {firm.unifiedNumber}
            </p>
          </div>
        </div>
      </Sheet>
    </main>
  );
}
