import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import ClosingCTA from "@/components/ClosingCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import PartnersCurtain from "@/components/PartnersCurtain";
import SocialIcons from "@/components/SocialIcons";
import { firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

const copy = {
  ar: {
    alt: `${firm.nameShortAr} — ${firm.nameEn}`,
    tagline: firm.tagline,
    address: firm.address,
    followTitle: "تابعنا على كل المنصات",
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
    rights: `© ${new Date().getFullYear()} ${firm.nameAr}. جميع الحقوق محفوظة.`,
    license: `رخصة مزاولة المحاماة رقم ${firm.licenseNumber} · السجل الموحد ${firm.unifiedNumber} · المملكة العربية السعودية`,
    portal: "بوابة العملاء",
    source: "footer",
  },
  en: {
    alt: `${firm.nameShortAr} — ${firmEn.nameShort}`,
    tagline: firmEn.tagline,
    address: firm.addressEn,
    followTitle: "Follow us everywhere",
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
      { href: "/en/blog", label: "Legal Insights" },
      { href: "/en/contact", label: "Contact" },
      { href: "/downloads/company-profile-en.pdf", label: "Company Profile" },
      { href: "/en/privacy", label: "Privacy Policy" },
    ],
    subscribeTitle: "Legal alerts by email",
    subscribeBody: "A short note when we publish a new article or a regulatory change affects your business.",
    rights: `© ${new Date().getFullYear()} ${firmEn.nameFull}. All rights reserved.`,
    license: `Law Practice Licence No. ${firm.licenseNumber} · Unified No. ${firm.unifiedNumber} · Kingdom of Saudi Arabia`,
    portal: "Client portal",
    source: "footer-en",
  },
};

const linkCls = "inline-block py-1 text-white/75 transition-colors hover:text-[#f6e2b3] [@media(pointer:coarse)]:py-3";

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
        <Image src="/brand/riyadh-skyline.jpg" alt={ar ? "أفق مدينة الرياض" : "Riyadh skyline"} fill sizes="100vw" className="object-cover object-[center_62%] opacity-[0.28] [filter:saturate(0.7)_hue-rotate(8deg)]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(30,70,200,0.28),transparent_70%),radial-gradient(ellipse_40%_30%_at_90%_100%,rgba(224,179,90,0.14),transparent_70%)]" />

      <div className="relative pb-10 pt-28 md:pt-36">
        <ClosingCTA locale={locale} />

        <PartnersCurtain locale={locale} />

        <div className="mx-auto max-w-7xl px-5">
        <div className="chamfer-lg relative mt-16 overflow-hidden border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl md:mt-24 md:p-12">
          <span aria-hidden className="cta-sweep absolute inset-x-0 top-0 h-px" />
          <div aria-hidden className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(224,179,90,0.16),transparent)]" />
          <div className="relative grid grid-cols-[minmax(0,1fr)] items-start gap-10 md:grid-cols-12 md:gap-x-12 md:gap-y-12 [&>*]:min-w-0 [overflow-wrap:anywhere]">
            <div className="flex flex-col items-center text-center md:col-span-5 md:items-start md:text-start">
              <Image src="/brand/logo-lockup.png" alt={t.alt} width={163} height={48} className="h-14 w-auto" />
              <p className="mt-5 max-w-sm text-base font-light leading-8 text-white/80">{t.tagline}</p>
              <a href={firm.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-flex items-start gap-2 text-sm ${linkCls}`}>
                <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-[#e0b35a]" aria-hidden />
                <span>{t.address}</span>
              </a>

              <div className="mt-8 w-full">
                <p className={label}>{t.followTitle}</p>
                <SocialIcons variant="tiles" locale={locale} className="mt-4 justify-center md:justify-start" />
                <p className="mt-4 flex items-center justify-center gap-3 md:justify-start" dir="ltr">
                  <span aria-hidden className="h-px w-8 bg-[#e0b35a]/70" />
                  <span className="font-display text-lg tracking-wide text-[#f6e2b3]">@taapsaudi</span>
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 md:justify-start" dir="ltr">
                <a href={`tel:${firm.phone}`} className="inline-flex min-h-11 items-center gap-2.5 border border-white/20 bg-white/[0.03] px-4 py-2 text-sm text-white/90 transition-colors [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] hover:border-[#e0b35a] hover:text-[#f6e2b3]">
                  <Phone className="h-4 w-4 text-[#e0b35a]" aria-hidden />
                  {firm.phoneDisplay}
                </a>
                <a href={`mailto:${firm.email}`} className="inline-flex min-h-11 items-center gap-2.5 border border-white/20 bg-white/[0.03] px-4 py-2 text-sm text-white/90 transition-colors [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] hover:border-[#e0b35a] hover:text-[#f6e2b3]">
                  <Mail className="h-4 w-4 text-[#e0b35a]" aria-hidden />
                  {firm.email}
                </a>
              </div>
            </div>

            <nav aria-label={locale === "ar" ? "روابط التذييل" : "Footer links"} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-6 gap-y-8 border-t border-white/10 pt-10 md:col-span-3 md:grid-cols-1 md:border-t-0 md:pt-0">
              {[
                { title: t.exploreTitle, items: t.explore },
                { title: t.firmTitle, items: t.firmLinks },
              ].map((col) => (
                <div key={col.title} className="text-start">
                  <p className={`mb-5 flex items-center gap-2 ${label}`}>
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" />
                    {col.title}
                  </p>
                  <ul className="space-y-1.5 text-sm font-light">
                    {col.items.map((l) => (
                      <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="border-t border-white/10 pt-10 text-center md:col-span-4 md:border-t-0 md:pt-0 md:text-start">
              <p className={`flex items-center justify-center gap-2 md:justify-start ${label}`}>
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-[#e0b35a]" />
                {t.subscribeTitle}
              </p>
              <p className="mb-5 mt-3 text-sm font-light leading-7 text-white/70">{t.subscribeBody}</p>
              <NewsletterSignup source={t.source} compact locale={locale} onDark />
            </div>
          </div>
        </div>

        <div aria-hidden className="pointer-events-none relative mt-6 select-none overflow-hidden text-center font-display leading-[0.85] text-transparent [-webkit-text-stroke:1px_rgba(224,179,90,0.55)] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_100%)] text-[26vw] md:mt-8 md:text-[12rem]" dir="ltr">
          TAAP
        </div>
        <div className="-mt-2 flex flex-col items-center gap-3 border-t border-white/10 pb-24 pt-6 text-center text-xs leading-6 text-white/55 md:mt-0 md:flex-row md:items-start md:justify-between md:pb-4 md:pe-40 md:text-start">
          <div>
            <p>{t.rights}</p>
            <p>{t.license}</p>
          </div>
          <p className="shrink-0">
            <a href="/portal/login" className={linkCls}>{t.portal}</a>
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
