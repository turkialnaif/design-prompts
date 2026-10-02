import { sectors } from "@/lib/sectors";
import { corePillars, firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

export const SITE_UPDATED = "2026-10-02";

export const homeDescription = {
  ar: "مكتب محاماة واستشارات قانونية في الرياض: عقود وصفقات، تقاضٍ وتحكيم، امتثال وحوكمة، قانون رقمي وبيانات، تنفيذ وتحصيل. أكثر من 50 خدمة قانونية في 20 قطاعًا.",
  en: firmEn.description,
};

/** Site-wide structured data: the firm as a LegalService (with its catalogue and sectors) plus the WebSite. Rendered once per locale layout. */
export function siteJsonLd(locale: "ar" | "en") {
  const ar = locale === "ar";
  const home = ar ? firm.website : `${firm.website}/en`;
  return [
    {
      "@context": "https://schema.org",
      "@type": ["LegalService", "LocalBusiness"],
      "@id": `${firm.website}/#firm`,
      name: ar ? firm.nameAr : firmEn.nameFull,
      alternateName: ar ? [firm.nameShortAr, firm.nameEn, "TAAP"] : [firm.nameAr, "TAAP"],
      description: homeDescription[locale],
      url: home,
      logo: `${firm.website}/brand/icon-512.png`,
      image: `${firm.website}/brand/riyadh-kafd.jpg`,
      email: firm.email,
      telephone: firm.phone,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: ar ? firm.address : firm.addressEn,
        addressLocality: ar ? "الرياض" : "Riyadh",
        postalCode: "13326",
        addressCountry: "SA",
      },
      hasMap: firm.mapsUrl,
      areaServed: { "@type": "Country", name: "Saudi Arabia" },
      sameAs: Object.values(firm.social),
      identifier: [
        { "@type": "PropertyValue", name: ar ? "رخصة مزاولة المحاماة" : "Law Practice License", value: firm.licenseNumber },
        { "@type": "PropertyValue", name: ar ? "الرقم الموحد" : "Unified Number", value: firm.unifiedNumber },
      ],
      knowsAbout: sectors.map((s) => s[locale].title),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: ar ? "الخدمات القانونية" : "Legal services",
        itemListElement: corePillars.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: ar ? p.title : p.titleEn, url: `${firm.website}/services/${p.slug}` } })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${firm.website}/#website`,
      url: firm.website,
      name: ar ? firm.nameShortAr : firmEn.nameShort,
      inLanguage: locale,
      publisher: { "@id": `${firm.website}/#firm` },
    },
  ];
}
