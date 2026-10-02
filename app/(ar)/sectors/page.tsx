import type { Metadata } from "next";
import SectorsIndex from "@/components/SectorsIndex";

export const metadata: Metadata = {
  title: "القطاعات التي نخدمها",
  description: "محاماة واستشارات قانونية لأكثر من 20 قطاعًا في المملكة: الإنشاءات والتقنية والرعاية الصحية والعقارات والبنوك والرياضة والنقل والطاقة وغيرها.",
  alternates: { canonical: "/sectors", languages: { ar: "/sectors", en: "/en/sectors", "x-default": "/sectors" } },
  openGraph: { title: "القطاعات التي نخدمها", description: "محاماة واستشارات قانونية لأكثر من 20 قطاعًا في المملكة: الإنشاءات والتقنية والرعاية الصحية والعقارات والبنوك والرياضة والنقل والطاقة وغيرها.", images: [{ url: "/brand/riyadh-kafd.jpg" }] },
  twitter: { card: "summary_large_image" },
};

export default function SectorsPage() {
  return <SectorsIndex locale="ar" />;
}
