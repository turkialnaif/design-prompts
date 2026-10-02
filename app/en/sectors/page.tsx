import type { Metadata } from "next";
import SectorsIndex from "@/components/SectorsIndex";

export const metadata: Metadata = {
  title: "Sectors We Serve",
  description: "Legal advice for 20 sectors in Saudi Arabia: construction, technology, healthcare, real estate, banking, sport, transport, energy and more.",
  alternates: { canonical: "/en/sectors", languages: { ar: "/sectors", en: "/en/sectors", "x-default": "/sectors" } },
  openGraph: { title: "Sectors We Serve", description: "Legal advice for 20 sectors in Saudi Arabia: construction, technology, healthcare, real estate, banking, sport, transport, energy and more.", images: [{ url: "/brand/riyadh-kafd.jpg" }] },
  twitter: { card: "summary_large_image" },
};

export default function SectorsPage() {
  return <SectorsIndex locale="en" />;
}
