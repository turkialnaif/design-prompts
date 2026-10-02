import type { Metadata } from "next";
import AboutView from "@/components/pages/AboutView";
import { firm } from "@/lib/site";

export const metadata: Metadata = {
  title: "من نحن",
  description: `${firm.nameAr} — شريك قانوني يربط الحُكم المهني بسياق الأعمال، في الرياض، المملكة العربية السعودية.`,
  alternates: { canonical: "/about", languages: { ar: "/about", en: "/en/about" } },
  openGraph: {
    title: "من نحن",
    description: `${firm.nameAr} — شريك قانوني يربط الحُكم المهني بسياق الأعمال، في الرياض، المملكة العربية السعودية.`,
    images: [{ url: "/brand/attorney-turki.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return <AboutView locale="ar" />;
}
