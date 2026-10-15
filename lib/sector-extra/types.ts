export type SectorExtraCopy = {
  /** [name, what it regulates for the sector] */
  regulators: [string, string][];
  /** Typical contracts and documents in the sector. */
  contracts: string[];
  /** Sector-specific risks, beyond the issues already listed on the page. */
  risks: { t: string; d: string }[];
  /** Extra questions, appended to the page's own. */
  faqs: { q: string; a: string }[];
};
export type SectorExtraMap = Record<string, { ar: SectorExtraCopy; en: SectorExtraCopy }>;
