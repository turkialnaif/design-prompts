import type { Metadata } from "next";
import ServicesView from "@/components/pages/ServicesView";

export const metadata: Metadata = {
  title: "الخدمات القانونية",
  description:
    "منظومة الخدمات القانونية لدى تركي النايف وشركاؤه: المشورة، العقود، التقاضي والتحكيم، الامتثال، القانون الرقمي، والتنفيذ والتحصيل.",
  alternates: { canonical: "/services", languages: { ar: "/services", en: "/en/services" } },
  openGraph: {
    title: "الخدمات القانونية",
    description:
      "منظومة الخدمات القانونية لدى تركي النايف وشركاؤه: المشورة، العقود، التقاضي والتحكيم، الامتثال، القانون الرقمي، والتنفيذ والتحصيل.",
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ServicesPage() {
  return <ServicesView locale="ar" />;
}
