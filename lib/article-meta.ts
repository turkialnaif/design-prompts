export type Audience = "individuals" | "companies" | "institutions";

export const audienceLabels: Record<Audience, string> = {
  individuals: "للأفراد",
  companies: "للشركات",
  institutions: "للمؤسسات",
};

// الجمهور المستهدف لكل مقال — يُراجَع مع كل مقال جديد.
export const articleAudiences: Record<string, Audience[]> = {
  "enforcement-arbitral-award-saudi-arabia": ["companies", "institutions"],
  "annulment-arbitral-award-saudi-arabia": ["companies", "institutions"],
  "share-purchase-agreement-saudi-arabia": ["companies", "institutions"],
  "asset-purchase-vs-share-purchase-saudi-arabia": ["companies", "institutions"],
  "minority-shareholder-rights-saudi-arabia": ["companies", "institutions"],
  "partner-exit-buyout-saudi-arabia": ["companies", "institutions"],
  "corporate-governance-saudi-arabia": ["companies", "institutions"],
  "corporate-compliance-program-saudi-arabia": ["companies", "institutions"],
  "creditor-rights-bankruptcy-saudi-arabia": ["companies", "institutions"],
  "preventive-settlement-saudi-arabia": ["companies", "institutions"],
  "scca-arbitration-guide": ["companies", "institutions"],
  "financial-reorganization-saudi-arabia": ["companies", "institutions"],
  "investment-registration-saudi-arabia": ["companies", "institutions"],
  "pre-litigation-commercial-strategy": ["individuals", "companies"],
  "director-manager-liability-saudi-arabia": ["companies", "institutions"],
  "shareholder-partner-disputes-saudi-arabia": ["companies", "individuals"],
  "shareholders-agreement-saudi-arabia": ["companies", "individuals"],
  "commercial-contract-review-before-signing": ["individuals", "companies", "institutions"],
  "commercial-contract-termination-saudi-arabia": ["companies", "institutions"],
  "breach-of-contract-damages-saudi-arabia": ["individuals", "companies"],
  "liquidated-damages-saudi-arabia": ["companies", "institutions"],
  "memorandum-of-understanding-saudi-arabia": ["individuals", "companies"],
  "termination-rescission-dissolution-saudi-contracts": ["companies", "institutions"],
  "force-majeure-exceptional-circumstances-saudi-arabia": ["companies", "institutions"],
  "evidence-commercial-cases-saudi-arabia": ["individuals", "companies"],
  "commercial-contract-receivables-saudi-arabia": ["individuals", "companies"],
  "settlement-vs-litigation-saudi-arabia": ["individuals", "companies", "institutions"],
  "employer-terminate-employment-without-reason-saudi-arabia": ["individuals"],
  "end-of-employment-entitlements-saudi-arabia": ["individuals"],
  "claim-outstanding-debt-saudi-arabia": ["individuals"],
  "heirs-dispute-estate-division-saudi-arabia": ["individuals"],
  "signed-contract-without-reading-saudi-arabia": ["individuals"],
  "arbitration-clause-commercial-contracts-saudi-arabia": ["companies", "institutions"],
  "personal-data-protection-obligations-saudi-arabia": ["companies", "institutions"],
  "conflict-of-interest-policy-governance-saudi-arabia": ["companies", "institutions"],
  "due-diligence-before-commercial-deal-saudi-arabia": ["companies"],
  "residential-lease-check-before-signing-saudi-arabia": ["individuals"],
  "power-of-attorney-risks-saudi-arabia": ["individuals"],
};

export function audiencesOf(slug: string): Audience[] {
  return articleAudiences[slug] ?? ["companies"];
}

export function readLabel(minutes: number) {
  if (minutes <= 1) return "دقيقة قراءة";
  if (minutes === 2) return "دقيقتان قراءة";
  if (minutes <= 10) return `${minutes} دقائق قراءة`;
  return `${minutes} دقيقة قراءة`;
}
