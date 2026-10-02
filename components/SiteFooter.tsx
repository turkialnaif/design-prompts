import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import PartnersCurtain from "@/components/PartnersCurtain";
import SocialIcons from "@/components/SocialIcons";
import { corePillars, firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

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
      { href: "/services#sectors", label: "القطاعات" },
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
      { href: "/en/services#sectors", label: "Sectors" },
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
    rights: `© ${new Date().getFullYear()} ${firmEn.nameFull}. All rights reserved.`,
    license: `Law Practice Licence No. ${firm.licenseNumber} · Unified No. ${firm.unifiedNumber} · Kingdom of Saudi Arabia`,
    admin: "Firm sign-in",
    portal: "Client portal",
    source: "footer-en",
  },
};

const linkCls = "text-white/75 transition-colors hover:text-[#f6e2b3]";

export default function SiteFooter({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const ar = locale === "ar";
  // Wide tracking and capitals suit Latin small-caps but break Arabic letter joins at small sizes.
  const label = ar ? "text-sm font-normal text-[#f6e2b3]" : "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f6e2b3]";
  return (
    <footer data-glow className="relative isolate overflow-hidden bg-[#00061d] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34rem]"
        style={{ maskImage: "linear-gradient(to top, black 0%, black 35%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, black 35%, transparent 100%)" }}
      >
        <Image src="/brand/riyadh-skyline.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_62%] opacity-[0.28] [filter:saturate(0.7)_hue-rotate(8deg)]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(30,70,200,0.28),transparent_70%),radial-gradient(ellipse_40%_30%_at_90%_100%,rgba(224,179,90,0.14),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-28 md:pt-36">
        <div data-footer-cta className="text-center">
          <h2 className="font-display grad-text mx-auto max-w-4xl text-4xl leading-[1.3] sm:text-5xl md:text-6xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-8 text-white/75 md:text-lg">{t.ctaBody}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ArrowButton href={firm.whatsapp} external ltr={!ar}>{t.ctaWhatsapp}</ArrowButton>
            <MatterBriefCTA locale={locale} matterTypes={t.matterTypes} tone="onDark" />
          </div>
        </div>

        <PartnersCurtain locale={locale} />

        <div className="chamfer-lg mt-20 grid gap-12 border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl md:mt-28 md:grid-cols-[1.3fr_1fr_1.2fr] md:p-12">
          <div className="flex flex-col items-center text-center md:items-start md:text-start">
            <Image src="/brand/logo-lockup.png" alt={t.alt} width={163} height={48} className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-base font-light leading-8 text-white/80">{t.tagline}</p>
            <a href={firm.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-3 text-sm ${linkCls}`}>
              {t.address}
            </a>
            <div className="mt-5 flex flex-col items-center gap-4 md:items-start">
              <SocialIcons tone="onDark" className="justify-center md:justify-start" />
              <p className="text-sm text-white/70" dir="ltr">
                <a href={`tel:${firm.phone}`} className={linkCls}>{firm.phoneDisplay}</a>
                <span className="mx-2 text-white/25">|</span>
                <a href={`mailto:${firm.email}`} className={linkCls}>{firm.email}</a>
              </p>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-6 text-center md:text-start">
            <div>
              <p className={`mb-4 ${label}`}>{t.exploreTitle}</p>
              <ul className="space-y-3 text-[15px] font-light">
                {t.explore.map((l) => (
                  <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`mb-4 ${label}`}>{t.firmTitle}</p>
              <ul className="space-y-3 text-[15px] font-light">
                {t.firmLinks.map((l) => (
                  <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="text-center md:text-start">
            <p className={label}>{t.subscribeTitle}</p>
            <p className="mb-5 mt-3 text-sm font-light leading-7 text-white/70">{t.subscribeBody}</p>
            <NewsletterSignup source={t.source} compact locale={locale} onDark />
          </div>

        </div>

        <div className="mt-8 text-center text-xs leading-6 text-white/55">
          <p className="mb-1">
            <a href="/admin/login" className={linkCls}>{t.admin}</a>
            <span className="mx-2 text-white/25">|</span>
            <a href="/portal/login" className={linkCls}>{t.portal}</a>
          </p>
          <p>{t.rights}</p>
          <p>{t.license}</p>
        </div>
      </div>
    </footer>
  );
}
