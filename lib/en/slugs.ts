/** Pages that exist in English as well as Arabic. Kept apart from the copy so client code (the language switch) can import it cheaply. */
export const enArticleSlugs = [
  "arbitration-clause-commercial-contracts-saudi-arabia",
  "arbitration-vs-litigation-saudi-arabia",
  "enforcement-arbitral-award-saudi-arabia",
  "annulment-arbitral-award-saudi-arabia",
  "scca-arbitration-guide",
  "investment-registration-saudi-arabia",
  "share-purchase-agreement-saudi-arabia",
  "shareholders-agreement-saudi-arabia",
  "due-diligence-before-commercial-deal-saudi-arabia",
  "personal-data-protection-obligations-saudi-arabia",
] as const;

export const enServiceSlugs = [
  "corporate-contracts",
  "disputes-arbitration",
  "mergers-acquisitions",
  "compliance-governance",
  "bankruptcy-restructuring",
  "foreign-investment",
  "enforcement-recovery",
  "legal-advisory",
  "employment-labor",
  "criminal-defense",
  "estates-inheritance",
  "personal-status",
] as const;

export const hasEnArticle = (slug: string) => (enArticleSlugs as readonly string[]).includes(slug);
export const hasEnService = (slug: string) => (enServiceSlugs as readonly string[]).includes(slug);
