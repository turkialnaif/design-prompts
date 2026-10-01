import type { Metadata } from "next";
import ContactView from "@/components/ContactView";
import { firm } from "@/lib/site";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: `تواصل مع ${firm.nameShortAr} في الرياض عبر الهاتف أو البريد الإلكتروني أو واتساب.`,
  alternates: { canonical: "/contact", languages: { ar: "/contact", en: "/en/contact" } },
  openGraph: {
    title: "تواصل معنا",
    description: `تواصل مع ${firm.nameShortAr} في الرياض عبر الهاتف أو البريد الإلكتروني أو واتساب.`,
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ContactPage() {
  return <ContactView locale="ar" />;
}
