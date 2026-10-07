export type ArticlePhoto = { src: string; focus: string; alt: string };

// One photograph per article, chosen for what the article is about.
// a1–a8: portrait set · b1–b8: landscape set (public/blog). Add or swap a photo by editing this map.
const p = (n: string, focus: string, alt: string): ArticlePhoto => ({ src: `/blog/${n}.jpg`, focus, alt });

const photos: Record<string, ArticlePhoto> = {
  // شركات
  "director-manager-liability-saudi-arabia": p("a4", "50% 55%", "قاعة اجتماعات مجلس الإدارة"),
  "shareholder-partner-disputes-saudi-arabia": p("a1", "50% 72%", "مطرقة قاضٍ على طاولة رخامية"),
  "shareholders-agreement-saudi-arabia": p("b2", "50% 50%", "مراجعة اتفاق بين شريكين"),
  // عقود
  "commercial-contract-review-before-signing": p("a3", "60% 45%", "مراجعة عقد قبل التوقيع"),
  "commercial-contract-termination-saudi-arabia": p("a7", "50% 55%", "مجلدات قانونية"),
  "breach-of-contract-damages-saudi-arabia": p("a6", "50% 58%", "ميزان العدالة"),
  "liquidated-damages-saudi-arabia": p("b6", "50% 50%", "ملف مستندات ومطرقة"),
  "memorandum-of-understanding-saudi-arabia": p("b1", "50% 45%", "توقيع مذكرة تفاهم"),
  "termination-rescission-dissolution-saudi-contracts": p("b8", "50% 55%", "مخططات وأوراق عمل"),
  "force-majeure-exceptional-circumstances-saudi-arabia": p("a2", "50% 40%", "أبراج زجاجية في الرياض"),
  // منازعات
  "evidence-commercial-cases-saudi-arabia": p("b5", "50% 50%", "أدلة رقمية وميزان"),
  "commercial-contract-receivables-saudi-arabia": p("a8", "50% 55%", "مكتب ومخططات مع أفق الرياض"),
  "settlement-vs-litigation-saudi-arabia": p("b3", "50% 50%", "مطرقة ومصافحة تسوية"),
  // أفراد
  "employer-terminate-employment-without-reason-saudi-arabia": p("b4", "50% 50%", "قاعة اجتماعات تطل على الرياض"),
  "end-of-employment-entitlements-saudi-arabia": p("a6", "50% 40%", "ميزان العدالة"),
  "claim-outstanding-debt-saudi-arabia": p("b6", "30% 55%", "ملف مستندات ومطرقة"),
  "heirs-dispute-estate-division-saudi-arabia": p("b7", "60% 50%", "مجسّم عقاري"),
  "signed-contract-without-reading-saudi-arabia": p("a5", "50% 72%", "توقيع على عقد"),
  // الدفعة الثانية
  "arbitration-clause-commercial-contracts-saudi-arabia": p("b3", "70% 50%", "مطرقة ومصافحة"),
  "personal-data-protection-obligations-saudi-arabia": p("b5", "25% 45%", "حاسوب وبيانات وميزان"),
  "conflict-of-interest-policy-governance-saudi-arabia": p("b4", "40% 60%", "قاعة اجتماعات"),
  "due-diligence-before-commercial-deal-saudi-arabia": p("a3", "60% 55%", "مراجعة مستندات الصفقة"),
  "residential-lease-check-before-signing-saudi-arabia": p("b7", "30% 55%", "مجسّم عقاري"),
  "power-of-attorney-risks-saudi-arabia": p("b1", "40% 50%", "توقيع على وكالة"),
  // الدفعة الثالثة
  "scca-arbitration-guide": p("a1", "50% 60%", "مطرقة تحكيم"),
  "financial-reorganization-saudi-arabia": p("b8", "50% 50%", "مخططات وأوراق عمل"),
  "investment-registration-saudi-arabia": p("a2", "50% 40%", "أبراج زجاجية في الرياض"),
  "pre-litigation-commercial-strategy": p("b5", "60% 50%", "أدلة وميزان"),
  // الدفعة الرابعة
  "enforcement-arbitral-award-saudi-arabia": p("b3", "60% 50%", "مطرقة ومصافحة"),
  "annulment-arbitral-award-saudi-arabia": p("a1", "50% 60%", "مطرقة قاضٍ"),
  "share-purchase-agreement-saudi-arabia": p("b2", "50% 50%", "مراجعة اتفاق بين شريكين"),
  "asset-purchase-vs-share-purchase-saudi-arabia": p("a3", "60% 55%", "مراجعة مستندات الصفقة"),
  "minority-shareholder-rights-saudi-arabia": p("a4", "50% 55%", "قاعة اجتماعات مجلس الإدارة"),
  "partner-exit-buyout-saudi-arabia": p("b1", "50% 45%", "توقيع اتفاق"),
  "corporate-governance-saudi-arabia": p("b4", "40% 60%", "قاعة اجتماعات"),
  "corporate-compliance-program-saudi-arabia": p("a7", "50% 55%", "مجلدات قانونية"),
  "creditor-rights-bankruptcy-saudi-arabia": p("b6", "50% 50%", "ملف مستندات ومطرقة"),
  "preventive-settlement-saudi-arabia": p("b8", "50% 55%", "مخططات وأوراق عمل"),
  // الدفعة الخامسة
  "arbitration-vs-litigation-saudi-arabia": p("b3", "50% 50%", "مطرقة ومصافحة تسوية"),
};

export const articlePhoto = (slug: string): ArticlePhoto | undefined => photos[slug];
