import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import SocialIcons from "@/components/SocialIcons";
import { corePillars, firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

const regulators = {
  ar: [
    { src: "/brand/vision2030-logo.png", alt: "رؤية السعودية 2030", width: 524, height: 354, cls: "h-11" },
    { src: "/brand/bar-association-logo.png", alt: "الهيئة السعودية للمحامين", width: 671, height: 188, cls: "h-7" },
    { src: "/brand/moj-logo.png", alt: "وزارة العدل", width: 492, height: 598, cls: "h-11" },
  ],
  en: [
    { src: "/brand/vision2030-logo.png", alt: "Saudi Vision 2030", width: 524, height: 354, cls: "h-11" },
    { src: "/brand/bar-association-logo.png", alt: "Saudi Bar Association", width: 671, height: 188, cls: "h-7" },
    { src: "/brand/moj-logo.png", alt: "Ministry of Justice", width: 492, height: 598, cls: "h-11" },
  ],
};

const copy = {
  ar: {
    alt: `${firm.nameShortAr} — ${firm.nameEn}`,
    tagline: firm.tagline,
    address: firm.address,
    exploreTitle: "تصفّح",
    firmTitle: "المكتب",
    explore: [
      { href: "/", label: "الرئيسية" },
      { href: "/about", label: "من نحن" },
      { href: "/services", label: "الخدمات" },
      { href: "/corporate-clients", label: "للشركات" },
    ],
    firmLinks: [
      { href: "/team/turki-alnayef", label: "القيادة المهنية" },
      { href: "/blog", label: "مقالات قانونية" },
      { href: "/contact", label: "تواصل معنا" },
      { href: "/downloads/company-profile-ar.pdf", label: "الملف التعريفي" },
      { href: "/privacy", label: "سياسة الخصوصية" },
    ],
    subscribeTitle: "اشترك في التنبيهات القانونية",
    subscribeBody: "رسالة موجزة عند نشر مقال جديد أو صدور تعديل نظامي يهم منشأتك.",
    ctaTitle: "هل لديك مسألة قانونية تحتاج رأيًا دقيقًا؟",
    ctaBody: "تواصل معنا وسنحدد معك نطاق العمل والمخرجات منذ البداية.",
    ctaWhatsapp: "تواصل عبر واتساب",
    matterTypes: corePillars.map((s) => s.title),
    regulators: "جهات نظامية",
    rights: `© ${new Date().getFullYear()} ${firm.nameAr}. جميع الحقوق محفوظة.`,
    license: `رخصة مزاولة المحاماة رقم ${firm.licenseNumber} · السجل الموحد ${firm.unifiedNumber} · المملكة العربية السعودية`,
    admin: "دخول إدارة المكتب",
    portal: "بوابة العملاء",
    source: "footer",
  },
  en: {
    alt: `${firm.nameShortAr} — ${firmEn.nameShort}`,
    tagline: firmEn.tagline,
    address: firm.addressEn,
    exploreTitle: "Explore",
    firmTitle: "The Firm",
    explore: [
      { href: "/en", label: "Home" },
      { href: "/en/about", label: "About" },
      { href: "/en/services", label: "Services" },
      { href: "/en/corporate-clients", label: "Corporate Clients" },
    ],
    firmLinks: [
      { href: "/en/team/turki-alnayef", label: "Leadership" },
      { href: "/blog", label: "Legal Insights (Arabic)" },
      { href: "/en/contact", label: "Contact" },
      { href: "/downloads/company-profile-en.pdf", label: "Company Profile" },
      { href: "/en/privacy", label: "Privacy Policy" },
    ],
    subscribeTitle: "Legal alerts by email",
    subscribeBody: "A short note when we publish a new article or a regulatory change affects your business.",
    ctaTitle: "Have a legal matter that needs a precise opinion?",
    ctaBody: "Get in touch and we'll scope the work and the deliverables from day one.",
    ctaWhatsapp: "Message on WhatsApp",
    matterTypes: corePillars.map((s) => s.titleEn),
    regulators: "Regulators",
    rights: `© ${new Date().getFullYear()} ${firmEn.nameFull}. All rights reserved.`,
    license: `Law Practice Licence No. ${firm.licenseNumber} · Unified No. ${firm.unifiedNumber} · Kingdom of Saudi Arabia`,
    admin: "Firm sign-in",
    portal: "Client portal",
    source: "footer-en",
  },
};

const linkCls = "transition-colors hover:text-gold-deep";

export default function SiteFooter({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const ar = locale === "ar";
  return (
    <footer className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#fbf9f3_0%,#f1e9d3_100%)] text-ink-soft">
      {/* The Riyadh skyline rises out of the page colour behind the glass card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 45%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 45%, black 70%, transparent 100%)",
        }}
      >
        <Image src="/brand/riyadh-skyline.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_62%] opacity-[0.5] mix-blend-multiply [filter:sepia(0.55)_saturate(0.9)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-32">
        <div className="glass-card rounded-3xl px-6 py-10 md:px-10">
          <div data-footer-cta className="mb-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-gold/35 bg-white/60 px-6 py-7 text-center md:flex-row md:px-9 md:text-start">
            <div>
              <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{t.ctaTitle}</h2>
              <p className="mt-1.5 text-sm leading-7 text-ink-soft/80">{t.ctaBody}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <ArrowButton href={firm.whatsapp} external ltr={!ar}>{t.ctaWhatsapp}</ArrowButton>
              <MatterBriefCTA locale={locale} matterTypes={t.matterTypes} tone="onLight" />
            </div>
          </div>
          <div className="grid gap-10 text-center md:grid-cols-[1.3fr_1fr_1.2fr] md:text-start">
            <div className="flex flex-col items-center md:items-start">
              <Image src="/brand/logo-lockup.png" alt={t.alt} width={163} height={48} className="h-11 w-auto" />
              <p className="mt-3 max-w-xs text-sm leading-7">{t.tagline}</p>
              <a href={firm.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-2 text-xs text-ink-soft/70 ${linkCls}`}>
                {t.address}
              </a>
              <div className="mt-4 flex flex-col items-center gap-3 md:items-start">
                <SocialIcons tone="onLight" className="justify-center md:justify-start" />
                <p className="text-xs text-ink-soft/70" dir="ltr">
                  <a href={`tel:${firm.phone}`} className={linkCls}>{firm.phoneDisplay}</a>
                  <span className="mx-2 text-ink/20">|</span>
                  <a href={`mailto:${firm.email}`} className={linkCls}>{firm.email}</a>
                </p>
              </div>
            </div>

            <nav className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">{t.exploreTitle}</p>
                <ul className="space-y-2.5">
                  {t.explore.map((l) => (
                    <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">{t.firmTitle}</p>
                <ul className="space-y-2.5">
                  {t.firmLinks.map((l) => (
                    <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>
                  ))}
                </ul>
              </div>
            </nav>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">{t.subscribeTitle}</p>
              <p className="mb-4 mt-2 text-xs leading-6 text-ink-soft/80">{t.subscribeBody}</p>
              <NewsletterSignup source={t.source} compact locale={locale} />

            </div>
          </div>

          <div className="mt-9 border-t border-gold/25 pt-6">
            <p className="text-center text-[11px] uppercase tracking-[0.22em] text-ink-soft/50">{t.regulators}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {regulators[locale].map((r) => (
                <Image key={r.src} src={r.src} alt={r.alt} width={r.width} height={r.height} className={`${r.cls} w-auto`} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 text-center text-[11px] leading-5 text-ink-soft/60">
          <p className="mb-1">
            <a href="/admin/login" className={linkCls}>{t.admin}</a>
            <span className="mx-2 text-ink/20">|</span>
            <a href="/portal/login" className={linkCls}>{t.portal}</a>
          </p>
          <p>{t.rights}</p>
          <p>{t.license}</p>
        </div>
      </div>
    </footer>
  );
}
