import { corePillars, specializedLines } from "@/lib/site";
import type { ServiceTile } from "@/components/ServiceTiles";

const stageEn: Record<string, string> = {
  "قبل القرار": "Before the decision",
  "بناء العلاقة": "Building the deal",
  "نشوء النزاع": "When a dispute arises",
  "حماية التشغيل": "Protecting operations",
  "الأصول الرقمية": "Digital assets",
  "اكتمال الأثر": "Completing the effect",
};

const extra = ["real-estate-construction", "intellectual-property"] as const;

/** Every individual service across the six core pillars and the specialised practice lines. */
export const totalServices = corePillars.reduce((sum, p) => sum + p.items.length, 0) + specializedLines.length;

/** The six core pillars plus two specialised lines, each with its own photograph and its own service page. */
export function homeServiceTiles(locale: "ar" | "en"): ServiceTile[] {
  const ar = locale === "ar";
  const core = corePillars.map((s) => ({
    slug: s.slug,
    title: ar ? s.title : s.titleEn,
    titleEn: ar ? s.titleEn : s.title,
    label: ar ? s.stage : (stageEn[s.stage] ?? s.stage),
  }));
  const spec = extra.map((slug) => {
    const s = specializedLines.find((l) => l.slug === slug)!;
    return { slug, title: ar ? s.title : s.titleEn, titleEn: ar ? s.titleEn : s.title, label: ar ? "خط ممارسة متخصص" : "Specialised practice" };
  });
  return [...core, ...spec].map((s) => ({
    href: ar ? `/services/${s.slug}` : "/en/services",
    title: s.title,
    titleEn: s.titleEn,
    label: s.label,
    photo: `/services/${s.slug}.jpg`,
  }));
}

/** The six core pillars only, as photographic tiles (used on the services pages). */
export function pillarTiles(locale: "ar" | "en"): ServiceTile[] {
  const ar = locale === "ar";
  return corePillars.map((s) => ({
    href: ar ? `/services/${s.slug}` : "/en/services",
    title: ar ? s.title : s.titleEn,
    titleEn: ar ? s.titleEn : s.title,
    label: ar ? s.stage : (stageEn[s.stage] ?? s.stage),
    photo: `/services/${s.slug}.jpg`,
  }));
}
