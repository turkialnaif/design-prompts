import type { Metadata } from "next";
import ServicesView from "@/components/pages/ServicesView";

export const metadata: Metadata = {
  title: "Legal Services",
  description:
    "Turki AlNaif & Partners' legal service system: advisory, contracts, litigation & arbitration, compliance, technology, and enforcement & recovery.",
  alternates: { canonical: "/en/services", languages: { ar: "/services", en: "/en/services" } },
  openGraph: {
    title: "Legal Services",
    description:
      "Turki AlNaif & Partners' legal service system: advisory, contracts, litigation & arbitration, compliance, technology, and enforcement & recovery.",
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ServicesPage() {
  return <ServicesView locale="en" />;
}
