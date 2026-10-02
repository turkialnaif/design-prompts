import type { Metadata } from "next";
import AboutView from "@/components/pages/AboutView";
import { firmEn } from "@/lib/site.en";

export const metadata: Metadata = {
  title: "About Us",
  description: `${firmEn.nameShort} — a legal partner connecting professional judgment with business context, in Riyadh, Saudi Arabia.`,
  alternates: { canonical: "/en/about", languages: { ar: "/about", en: "/en/about" } },
  openGraph: {
    title: "About Us",
    description: `${firmEn.nameShort} — a legal partner connecting professional judgment with business context, in Riyadh, Saudi Arabia.`,
    images: [{ url: "/brand/attorney-turki.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return <AboutView locale="en" />;
}
