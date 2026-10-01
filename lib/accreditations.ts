import { firm } from "@/lib/site";

export type Logo = { src: string; width: number; height: number; cls: string };

export type Accreditation = {
  key: string;
  /** who holds it: the founder personally, or both the founder and the firm */
  holder: "founder" | "both";
  icon: "scale" | "bar" | "hr" | "ip" | "arbitration" | "training" | "franchise" | "expert";
  logos?: Logo[];
  ar: { title: string; body: string };
  en: { title: string; body: string };
};

/**
 * Order: the accreditations that mirror a full-service Saudi firm's set first
 * (practice licence, Bar membership, HR-ministry and IP-authority accreditation),
 * then the additional accreditations documented for the firm's founder.
 * Except the licence and Bar membership (held by the founder and the firm), these are the founder's
 * personal accreditations. The "hr", "premium" and "ip" accreditations were
 * confirmed by the firm on 2026-09-26.
 */
export const accreditations: Accreditation[] = [
  {
    key: "license",
    holder: "both",
    icon: "scale",
    logos: [{ src: "/brand/moj-logo.png", width: 492, height: 598, cls: "h-16" }],
    ar: {
      title: "رخصة مزاولة مهنة المحاماة",
      body: `مرخّص من وزارة العدل برقم ${firm.licenseNumber}، بما يخوّل الترافع والتمثيل أمام المحاكم والجهات القضائية.`,
    },
    en: {
      title: "Law Practice Licence",
      body: `Licensed by the Ministry of Justice under No. ${firm.licenseNumber}, authorising advocacy and representation before the courts and judicial bodies.`,
    },
  },
  {
    key: "bar",
    holder: "both",
    icon: "bar",
    logos: [{ src: "/brand/bar-association-logo.png", width: 671, height: 188, cls: "h-11" }],
    ar: {
      title: "عضوية الهيئة السعودية للمحامين",
      body: "عضو أساسي في الهيئة السعودية للمحامين، ونعمل وفق الاعتماد المهني وقواعد السلوك الصادرة عنها.",
    },
    en: {
      title: "Saudi Bar Association Membership",
      body: "A core member of the Saudi Bar Association, practising under its professional accreditation and code of conduct.",
    },
  },
  {
    key: "hr",
    holder: "founder",
    icon: "hr",
    logos: [{ src: "/brand/mhrsd-logo.png", width: 513, height: 166, cls: "h-14" }],
    ar: {
      title: "معتمد لدى وزارة الموارد البشرية والتنمية الاجتماعية",
      body: "مراجعة لوائح تنظيم العمل الداخلية واعتمادها، والاستشارات العمالية للمنشآت والأفراد.",
    },
    en: {
      title: "Accredited by the Ministry of Human Resources and Social Development",
      body: "Review and approval of internal work regulations, and labour consultancy for employers and individuals.",
    },
  },
  {
    key: "premium",
    holder: "founder",
    icon: "hr",
    logos: [{ src: "/brand/premium-residency-logo.svg", width: 220, height: 64, cls: "h-12" }],
    ar: {
      title: "معتمد لدى مركز الإقامة المميزة",
      body: "خدمات ملفات الإقامة المميزة.",
    },
    en: {
      title: "Accredited by the Premium Residency Centre",
      body: "Premium Residency file services.",
    },
  },
  {
    key: "ip",
    holder: "founder",
    icon: "ip",
    logos: [{ src: "/brand/saip-logo.png", width: 716, height: 180, cls: "h-12" }],
    ar: {
      title: "معتمد لدى الهيئة السعودية للملكية الفكرية",
      body: "تسجيل العلامات التجارية والنماذج الصناعية وبراءات الاختراع وحماية الأصول الفكرية للمنشأة.",
    },
    en: {
      title: "Accredited by the Saudi Authority for Intellectual Property",
      body: "Registration of trademarks, industrial designs and patents, and protection of the establishment's intellectual assets.",
    },
  },
  {
    key: "arbitration",
    holder: "founder",
    icon: "arbitration",
    logos: [{ src: "/brand/sba-arbitration-logo.png", width: 700, height: 322, cls: "h-14" }],
    ar: {
      title: "محكّم معتمد",
      body: "معتمد لدى مركز هيئة المحامين للتسوية والتحكيم بشهادة اعتماد سارية.",
    },
    en: {
      title: "Accredited Arbitrator",
      body: "Accredited by the Saudi Bar Association Settlement and Arbitration Centre under a current certificate.",
    },
  },
  {
    key: "training",
    holder: "founder",
    icon: "training",
    logos: [{ src: "/brand/sasl-logo.svg", width: 8037, height: 3671, cls: "h-16" }],
    ar: {
      title: "الاعتماد المهني للقانونيين",
      body: "إتمام معايير الاعتماد المهني السعودي للقانونيين الصادر عن الهيئة السعودية للمحامين.",
    },
    en: {
      title: "Saudi Professional Accreditation for Legal Professionals",
      body: "Completed the professional accreditation standards issued by the Saudi Bar Association.",
    },
  },
  {
    key: "franchise",
    holder: "founder",
    icon: "franchise",
    logos: [{ src: "/brand/monshaat-franchise-logo.png", width: 418, height: 101, cls: "h-12" }],
    ar: {
      title: "وسيط امتياز تجاري معتمد",
      body: "رخصة وسيط امتياز تجاري من مركز الامتياز التجاري التابع لـ«منشآت».",
    },
    en: {
      title: "Accredited Franchise Broker",
      body: "Franchise-broker licence from the Commercial Franchise Centre of the Small and Medium Enterprises Authority (Monsha'at).",
    },
  },
  {
    key: "expert",
    holder: "founder",
    icon: "expert",
    logos: [{ src: "/brand/khebra-logo.png", width: 242, height: 111, cls: "h-14" }],
    ar: {
      title: "خبير معتمد — منصة خبرة",
      body: "معتمد لدى منصة «خبرة» التابعة لوزارة العدل لتقديم الخبرة القانونية والفنية في المسائل القضائية.",
    },
    en: {
      title: "Accredited Expert — Khebra Platform",
      body: "Accredited on the Ministry of Justice's Khebra platform to provide legal and technical expertise in judicial matters.",
    },
  },
];
