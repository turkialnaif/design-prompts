import { FileBadge2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import ClosingCTA from "@/components/ClosingCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import PartnersDock from "@/components/PartnersDock";
import SocialIcons from "@/components/SocialIcons";
import { corePillars, firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

const copy = {
  ar: {
    alt: `${firm.nameShortAr} — ${firm.nameEn}`,
    statement: firm.tagline,
    address: firm.address,
    officeTitle: "المكتب",
    office: [
      { href: "/about", label: "من نحن" },
      { href: "/team/turki-alnayef", label: "القيادة المهنية" },
      { href: "/corporate-clients", label: "للشركات" },
      { href: "/blog", label: "مقالات قانونية" },
      { href: "/downloads/company-profile-ar.pdf", label: "الملف التعريفي" },
    ],
    servicesTitle: "الخدمات",
    servicesAll: { href: "/services#sectors", label: "القطاعات التي نخدمها" },
    servicesHref: (slug: string) => `/services#${slug}`,
    serviceLabel: (s: (typeof corePillars)[number]) => s.title,
    contactTitle: "للتواصل",
    hours: [
      { d: "الأحد – الخميس", h: "٨ صباحًا – ٥ مساءً" },
      { d: "السبت", h: "١٠ صباحًا – ٢ ظهرًا" },
      { d: "الجمعة", h: "مغلق" },
    ],
    followTitle: "تابعنا",
    subscribeTitle: "التنبيهات القانونية",
    subscribeBody: "رسالة موجزة عند نشر مقال جديد أو صدور تعديل نظامي يهم منشأتك.",
    license: `رخصة مزاولة المحاماة رقم ${firm.licenseNumber}`,
    unified: `السجل الموحد ${firm.unifiedNumber}`,
    place: "المملكة العربية السعودية",
    rights: `© ${new Date().getFullYear()} ${firm.nameAr}. جميع الحقوق محفوظة.`,
    legal: [
      { href: "/privacy", label: "سياسة الخصوصية" },
      { href: "/portal/login", label: "بوابة العملاء" },
    ],
    source: "footer",
  },
  en: {
    alt: `${firm.nameShortAr} — ${firmEn.nameShort}`,
    statement: firmEn.tagline,
    address: firm.addressEn,
    officeTitle: "The Firm",
    office: [
      { href: "/en/about", label: "About" },
      { href: "/en/team/turki-alnayef", label: "Leadership" },
      { href: "/en/corporate-clients", label: "Corporate Clients" },
      { href: "/en/blog", label: "Legal Insights" },
      { href: "/downloads/company-profile-en.pdf", label: "Company Profile" },
    ],
    servicesTitle: "Services",
    servicesAll: { href: "/en/services#sectors", label: "Sectors we serve" },
    servicesHref: (slug: string) => `/en/services#${slug}`,
    serviceLabel: (s: (typeof corePillars)[number]) => s.titleEn,
    contactTitle: "Contact",
    hours: [
      { d: "Sunday – Thursday", h: "8 AM – 5 PM" },
      { d: "Saturday", h: "10 AM – 2 PM" },
      { d: "Friday", h: "Closed" },
    ],
    followTitle: "Follow",
    subscribeTitle: "Legal alerts",
    subscribeBody: "A short note when we publish a new article or a regulatory change affects your business.",
    license: `Law Practice Licence No. ${firm.licenseNumber}`,
    unified: `Unified No. ${firm.unifiedNumber}`,
    place: "Kingdom of Saudi Arabia",
    rights: `© ${new Date().getFullYear()} ${firmEn.nameFull}. All rights reserved.`,
    legal: [
      { href: "/en/privacy", label: "Privacy Policy" },
      { href: "/portal/login", label: "Client portal" },
    ],
    source: "footer-en",
  },
};

const link = "inline-block py-1 text-[0.95rem] text-white/72 transition-colors hover:text-[#f6e2b3] [@media(pointer:coarse)]:py-2.5";
const heading = "ft-serif mb-5 flex items-center gap-3 text-2xl font-bold text-[#f6e2b3]";

export default function SiteFooter({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const ar = locale === "ar";
  return (
    <footer data-glow className="ft-sans relative isolate overflow-hidden bg-[#00061d] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40rem]"
        style={{ maskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)" }}
      >
        <Image src="/brand/riyadh-skyline.jpg" alt={ar ? "أفق مدينة الرياض" : "Riyadh skyline"} fill sizes="100vw" className="object-cover object-[center_62%] opacity-[0.22] [filter:saturate(0.6)_hue-rotate(8deg)]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(30,70,200,0.28),transparent_70%),radial-gradient(ellipse_40%_30%_at_90%_100%,rgba(224,179,90,0.12),transparent_70%)]" />

      <div className="relative pt-28 md:pt-36">
        <ClosingCTA locale={locale} />

        {/* the call to action hands over to the footer's card with a gold thread */}
        <div aria-hidden className="relative mx-auto h-16 w-px bg-gradient-to-b from-[#e0b35a] to-[#e0b35a]/0 md:h-24" />

        <div className="relative px-0">
          <div className="mx-auto max-w-7xl px-5">
            <div className="relative overflow-hidden border border-white/10 border-t-[#e0b35a]/70 bg-[#020a22]/95 shadow-[0_-36px_70px_-24px_rgba(0,0,0,0.85)] backdrop-blur-xl [clip-path:polygon(0_0,100%_0,100%_calc(100%-44px),calc(100%-44px)_100%,0_100%)]">
              <span aria-hidden className="cta-sweep absolute inset-x-0 top-0 h-[2px]" />

              {/* 1 — who we are, and the credentials that stand behind the name */}
              <div className="grid items-center gap-8 border-b border-white/10 p-7 md:grid-cols-[1.25fr_1fr] md:gap-14 md:p-12">
                <div className="flex flex-col items-center text-center md:items-start md:text-start">
                  <Image src="/brand/logo-lockup.png" alt={t.alt} width={163} height={48} className="h-14 w-auto" />
                  <p className="ft-serif mt-6 max-w-xl text-3xl leading-[1.55] text-white md:text-[2.15rem]">{t.statement}</p>
                </div>
                <ul className="grid gap-3.5 text-[0.95rem]">
                  {[
                    { Icon: ShieldCheck, text: t.license },
                    { Icon: FileBadge2, text: t.unified },
                    { Icon: MapPin, text: t.place },
                  ].map(({ Icon, text }) => (
                    <li key={text} className="flex items-center gap-4 border-b border-white/8 pb-3.5 last:border-0 last:pb-0">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#e0b35a]/55 text-[#e0b35a]">
                        <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                      </span>
                      <span className="font-medium text-white/90">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2 — four plain columns */}
              <div className="grid gap-10 p-7 sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:p-12 [&>*]:min-w-0">
                <nav aria-label={t.officeTitle}>
                  <p className={heading}>{t.officeTitle}</p>
                  <ul>
                    {t.office.map((l) => (
                      <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>
                    ))}
                  </ul>
                </nav>

                <nav aria-label={t.servicesTitle}>
                  <p className={heading}>{t.servicesTitle}</p>
                  <ul>
                    {corePillars.map((s) => (
                      <li key={s.slug}><a href={t.servicesHref(s.slug)} className={link}>{t.serviceLabel(s)}</a></li>
                    ))}
                    <li><a href={t.servicesAll.href} className={`${link} !text-[#e0b35a]`}>{t.servicesAll.label}</a></li>
                  </ul>
                </nav>

                <div>
                  <p className={heading}>{t.contactTitle}</p>
                  <a href={firm.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${link} flex items-start gap-3 leading-7`}>
                    <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-[#e0b35a]" aria-hidden />
                    <span>{t.address}</span>
                  </a>
                  <div dir="ltr" className={ar ? "text-end" : "text-start"}>
                    <a href={`tel:${firm.phone}`} className={`${link} !flex w-full items-center gap-3 break-all ${ar ? "flex-row-reverse" : ""}`}>
                      <Phone className="h-4 w-4 shrink-0 text-[#e0b35a]" aria-hidden />
                      {firm.phoneDisplay}
                    </a>
                    <a href={`mailto:${firm.email}`} className={`${link} !flex w-full items-center gap-3 break-all ${ar ? "flex-row-reverse" : ""}`}>
                      <Mail className="h-4 w-4 shrink-0 text-[#e0b35a]" aria-hidden />
                      {firm.email}
                    </a>
                  </div>
                  <dl className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-[0.88rem]">
                    {t.hours.map((h) => (
                      <div key={h.d} className="flex items-baseline justify-between gap-4">
                        <dt className="text-white/60">{h.d}</dt>
                        <dd className="font-medium text-white/85">{h.h}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <p className={heading}>{t.followTitle}</p>
                  <SocialIcons variant="plain" locale={locale} iconSize={22} className="!gap-x-4" />
                  <p className="mt-6 flex items-center gap-3" dir="ltr">
                    <span aria-hidden className="h-px w-8 bg-[#e0b35a]/70" />
                    <span className="text-lg font-medium tracking-wide text-[#f6e2b3]">@taapsaudi</span>
                  </p>
                </div>
              </div>

              {/* 3 — the newsletter, as a quiet band */}
              <div className="grid items-center gap-6 border-t border-white/10 bg-white/[0.03] p-7 md:grid-cols-[1fr_1.1fr] md:gap-14 md:px-12 md:py-9">
                <div>
                  <p className="ft-serif text-2xl font-bold text-[#f6e2b3]">{t.subscribeTitle}</p>
                  <p className="mt-2 text-[0.95rem] font-light leading-7 text-white/70">{t.subscribeBody}</p>
                </div>
                <NewsletterSignup source={t.source} compact locale={locale} onDark />
              </div>

              {/* 4 — the legal line */}
              <div className="flex flex-col items-center gap-3 border-t border-white/10 px-7 py-6 pb-28 text-center text-[0.8rem] leading-6 text-white/55 md:flex-row md:justify-between md:px-12 md:pb-6 md:pe-44 md:text-start">
                <p>{t.rights}</p>
                <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
                  {t.legal.map((l) => (
                    <li key={l.href}><a href={l.href} className="inline-block py-1 transition-colors hover:text-[#f6e2b3] [@media(pointer:coarse)]:py-2.5">{l.label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <PartnersDock locale={locale} />
      </div>
    </footer>
  );
}
