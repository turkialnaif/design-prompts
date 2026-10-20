import { sectors } from "@/lib/sectors";
import { corePillars, firm, individualServiceSlugs, specializedLines } from "@/lib/site";
import { firmEn, specializedLineSummaryEn } from "@/lib/site.en";

export const SITE_UPDATED = "2026-10-15";

/**
 * Search results cut a title at about 60 characters, and the brand suffix of the page template is what would be cut.
 * A title that fits with the suffix keeps it; a longer one is shown whole, without the suffix.
 */
export function fitTitle(title: string, suffix = " | تركي النايف وشركاؤه"): string | { absolute: string } {
  return title.length + suffix.length <= 60 ? title : { absolute: title };
}


export const homeTitle = {
  ar: "مكتب محاماة في الرياض: استشارات قانونية للشركات والأفراد | تركي النايف وشركاؤه",
};

export const homeDescription = {
  ar: "مكتب محاماة في الرياض يقدم الاستشارات القانونية للشركات والأفراد: العقود والمنازعات والتحكيم والحوكمة، والدفاع الجنائي والتركات والأحوال الشخصية وقانون العمل.",
  en: "Riyadh law firm advising companies and individuals: contracts, commercial disputes, arbitration, governance and foreign investment, plus criminal defense, estates, personal status and labor law.",
};

/** Site-wide structured data: the firm as a LegalService (with its catalogue and sectors) plus the WebSite. Rendered once per locale layout. */
const individualLines = () => individualServiceSlugs.map((slug) => specializedLines.find((l) => l.slug === slug)!);

/** The individuals page: a collection of the four services offered to individuals, each linking to its own page. */
export function individualsJsonLd(locale: "ar" | "en") {
  const ar = locale === "ar";
  const base = ar ? firm.website : `${firm.website}/en`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: ar ? "خدمات الأفراد" : "Services for individuals",
    url: `${base}/individuals`,
    inLanguage: locale,
    isPartOf: { "@id": `${firm.website}/#website` },
    about: { "@id": `${firm.website}/#firm` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: individualLines().map((l, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: ar ? l.title : l.titleEn,
          serviceType: "Legal services",
          description: ar ? l.summary : specializedLineSummaryEn[l.slug],
          url: `${base}/services/${l.slug}`,
          audience: { "@type": "Audience", audienceType: ar ? "الأفراد" : "Individuals" },
          provider: { "@id": `${firm.website}/#firm` },
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
        },
      })),
    },
  };
}

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
        streetAddress: ar ? `${firm.nationalAddress.building} شارع ${firm.nationalAddress.street}، حي ${firm.nationalAddress.district}` : `${firm.nationalAddress.building} ${firm.nationalAddress.streetEn} St, ${firm.nationalAddress.districtEn}`,
        addressLocality: ar ? "الرياض" : "Riyadh",
        postalCode: "13326",
        addressCountry: "SA",
      },
      hasMap: firm.mapsUrl,
      geo: { "@type": "GeoCoordinates", latitude: firm.geo.lat, longitude: firm.geo.lng },
      openingHoursSpecification: firm.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      areaServed: { "@type": "Country", name: "Saudi Arabia" },
      sameAs: Object.values(firm.social),
      identifier: [
        { "@type": "PropertyValue", name: ar ? "رخصة مزاولة المحاماة" : "Law Practice License", value: firm.licenseNumber },
        { "@type": "PropertyValue", name: ar ? "الرقم الموحد" : "Unified Number", value: firm.unifiedNumber },
      ],
      knowsAbout: [...sectors.map((s) => s[locale].title), ...individualLines().map((l) => (ar ? l.title : l.titleEn))],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: ar ? "الخدمات القانونية" : "Legal services",
        itemListElement: [
          ...corePillars.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: ar ? p.title : p.titleEn, url: `${firm.website}/services/${p.slug}` } })),
          ...individualLines().map((l) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: ar ? l.title : l.titleEn, url: ar ? `${firm.website}/services/${l.slug}` : `${firm.website}/en/services/${l.slug}`, audience: { "@type": "Audience", audienceType: ar ? "الأفراد" : "Individuals" } },
          })),
        ],
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
