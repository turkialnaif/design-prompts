import type { Metadata } from "next";
import CorporateView from "@/components/pages/CorporateView";

export const metadata: Metadata = {
  title: "Working With Corporate Clients",
  description: "How Turki AlNaif & Partners works with companies and institutions: engagement models, response time, confidentiality, conflict checks, and reporting.",
  alternates: { canonical: "/en/corporate-clients", languages: { ar: "/corporate-clients", en: "/en/corporate-clients" } },
  openGraph: {
    title: "Working With Corporate Clients",
    description: "How Turki AlNaif & Partners works with companies and institutions: engagement models, response time, confidentiality, conflict checks, and reporting.",
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function CorporateClientsPage() {
  return <CorporateView locale="en" />;
}
