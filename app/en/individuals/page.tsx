import type { Metadata } from "next";
import IndividualsView from "@/components/pages/IndividualsView";

const description =
  "Legal services for individuals at Turki AlNaif & Partners in Riyadh: criminal defense, estates and inheritance, personal status, and labor law.";

export const metadata: Metadata = {
  title: "Legal Services for Individuals in Riyadh",
  description,
  alternates: { canonical: "/en/individuals", languages: { ar: "/individuals", en: "/en/individuals" } },
  openGraph: { title: "Legal Services for Individuals in Riyadh", description, images: [{ url: "/brand/riyadh-kafd.jpg" }] },
  twitter: { card: "summary_large_image" },
};

export default function IndividualsPage() {
  return <IndividualsView locale="en" />;
}
