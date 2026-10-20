import type { Metadata } from "next";
import IndividualsView from "@/components/pages/IndividualsView";

const description =
  "الخدمات القانونية للأفراد لدى تركي النايف وشركاؤه في الرياض: الدفاع الجنائي، والتركات والمواريث، والأحوال الشخصية، وقانون العمل.";

export const metadata: Metadata = {
  title: "خدمات قانونية للأفراد في الرياض",
  description,
  alternates: { canonical: "/individuals", languages: { ar: "/individuals", en: "/en/individuals" } },
  openGraph: { title: "خدمات قانونية للأفراد في الرياض", description, images: [{ url: "/brand/riyadh-kafd.jpg" }] },
  twitter: { card: "summary_large_image" },
};

export default function IndividualsPage() {
  return <IndividualsView locale="ar" />;
}
