export type ArticleEn = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** Same light markdown as the Arabic bodies: ## / ### / paragraphs / "- " / "1. " / "> " / pipe tables (no separator row). */
  body: string;
  faq: { question: string; answer: string }[];
  sources: string[];
  disclaimer: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel?: string;
  /** Links to other pages: an English page where one exists, otherwise the Arabic page with "(Arabic)" in the label. */
  related: { label: string; href: string }[];
};

export type ServiceCopyEn = {
  title: string;
  description: string;
  h1: string;
  groups: { label: string | null; intro: string[]; sections: { h: string; p: string[] }[] }[];
  links: { href: string; label: string }[];
};

export type ServiceExtraEn = {
  mistakes: { t: string; d: string }[];
  process: { t: string; d: string }[];
  docs: string[];
  faq: { q: string; a: string }[];
};
