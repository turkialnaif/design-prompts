import type { Metadata } from "next";
import ContactView from "@/components/ContactView";
import { firmEn } from "@/lib/site.en";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${firmEn.nameShort} in Riyadh by phone, email, or WhatsApp.`,
  alternates: { canonical: "/en/contact", languages: { ar: "/contact", en: "/en/contact" } },
  openGraph: {
    title: "Contact Us",
    description: `Contact ${firmEn.nameShort} in Riyadh by phone, email, or WhatsApp.`,
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ContactPageEn() {
  return <ContactView locale="en" />;
}
