import { sectors } from "@/lib/sectors";
import { part1 } from "./part1";
import { part2 } from "./part2";
import { part3 } from "./part3";
import { part4 } from "./part4";
import type { SectorExtraCopy, SectorExtraMap } from "./types";

export type { SectorExtraCopy } from "./types";

const extra: SectorExtraMap = { ...part1, ...part2, ...part3, ...part4 };

/** Further reading per sector, on top of the articles listed in lib/sectors.ts, so that every article is reachable from at least one sector page. */
const moreArticles: Record<string, string[]> = {
  construction: ["evidence-commercial-cases-saudi-arabia", "scca-arbitration-guide", "termination-rescission-dissolution-saudi-contracts"],
  technology: ["corporate-compliance-program-saudi-arabia", "share-purchase-agreement-saudi-arabia"],
  education: ["corporate-governance-saudi-arabia"],
  healthcare: ["corporate-compliance-program-saudi-arabia"],
  "sports-entertainment": ["arbitration-vs-litigation-saudi-arabia", "termination-rescission-dissolution-saudi-contracts"],
  "hospitality-tourism": ["settlement-vs-litigation-saudi-arabia", "preventive-settlement-saudi-arabia"],
  "transport-logistics": ["evidence-commercial-cases-saudi-arabia", "scca-arbitration-guide"],
  "banking-finance": ["creditor-rights-bankruptcy-saudi-arabia", "financial-reorganization-saudi-arabia", "pre-litigation-commercial-strategy"],
  telecommunications: ["corporate-compliance-program-saudi-arabia"],
  "retail-trade": ["preventive-settlement-saudi-arabia", "pre-litigation-commercial-strategy", "signed-contract-without-reading-saudi-arabia"],
  "real-estate": ["asset-purchase-vs-share-purchase-saudi-arabia", "investment-registration-saudi-arabia", "signed-contract-without-reading-saudi-arabia"],
  "security-defense": ["corporate-compliance-program-saudi-arabia"],
  "environment-water": ["scca-arbitration-guide"],
  "municipal-housing": ["enforcement-arbitral-award-saudi-arabia", "evidence-commercial-cases-saudi-arabia"],
  "culture-media": ["signed-contract-without-reading-saudi-arabia"],
  agriculture: ["preventive-settlement-saudi-arabia"],
  "energy-mining": ["investment-registration-saudi-arabia", "arbitration-vs-litigation-saudi-arabia", "annulment-arbitral-award-saudi-arabia", "enforcement-arbitral-award-saudi-arabia"],
  government: ["annulment-arbitral-award-saudi-arabia", "enforcement-arbitral-award-saudi-arabia", "corporate-governance-saudi-arabia"],
  "family-businesses": ["minority-shareholder-rights-saudi-arabia", "partner-exit-buyout-saudi-arabia", "corporate-governance-saudi-arabia", "share-purchase-agreement-saudi-arabia"],
  "nonprofit-endowments": ["corporate-governance-saudi-arabia"],
};

export function sectorExtra(slug: string, locale: "ar" | "en"): SectorExtraCopy | null {
  return extra[slug]?.[locale] ?? null;
}

/** All articles worth reading for a sector: its own list first, then the further reading, without repeats. */
export function sectorArticleSlugs(slug: string): string[] {
  const s = sectors.find((x) => x.slug === slug);
  return [...new Set([...(s?.articles ?? []), ...(moreArticles[slug] ?? [])])];
}

/** The sectors an article belongs to, for the "related sectors" block on article pages. */
export function sectorsForArticle(articleSlug: string) {
  return sectors.filter((s) => sectorArticleSlugs(s.slug).includes(articleSlug));
}

/** Services that no sector listed, tied to the sectors where they matter most. */
const moreServices: Record<string, string[]> = {
  "retail-trade": ["tax-zakat", "competition-law", "bankruptcy-restructuring", "legal-advisory"],
  "family-businesses": ["tax-zakat", "listed-company-governance", "legal-advisory"],
  "banking-finance": ["tax-zakat", "listed-company-governance", "bankruptcy-restructuring"],
  "real-estate": ["tax-zakat", "bankruptcy-restructuring"],
  telecommunications: ["competition-law"],
  "transport-logistics": ["competition-law"],
  construction: ["bankruptcy-restructuring"],
  technology: ["legal-advisory"],
};

export function sectorServiceSlugs(slug: string): string[] {
  const s = sectors.find((x) => x.slug === slug);
  return [...new Set([...(s?.services ?? []), ...(moreServices[slug] ?? [])])];
}

export function sectorsForService(serviceSlug: string) {
  return sectors.filter((s) => sectorServiceSlugs(s.slug).includes(serviceSlug));
}
