import type { Metadata } from "next";
import CorporateView from "@/components/pages/CorporateView";

export const metadata: Metadata = {
  title: "العمل مع الشركات",
  description: "كيف نعمل مع الشركات والمؤسسات: نماذج التعاقد، وزمن الرد، والسرية، وفحص تعارض المصالح، وآلية التقارير.",
  alternates: { canonical: "/corporate-clients", languages: { ar: "/corporate-clients", en: "/en/corporate-clients" } },
  openGraph: {
    title: "العمل مع الشركات",
    description: "كيف نعمل مع الشركات والمؤسسات: نماذج التعاقد، وزمن الرد، والسرية، وفحص تعارض المصالح، وآلية التقارير.",
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function CorporateClientsPage() {
  return <CorporateView locale="ar" />;
}
