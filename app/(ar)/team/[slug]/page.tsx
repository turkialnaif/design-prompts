import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamView from "@/components/pages/TeamView";
import { attorneys, firm } from "@/lib/site";


const attorneyPhotos: Record<string, string> = {
  "turki-alnayef": "/brand/attorney-turki.jpg",
};

export function generateStaticParams() {
  return attorneys.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const attorney = attorneys.find((a) => a.slug === slug);
  if (!attorney) return {};

  const photo = attorneyPhotos[slug];
  return {
    title: { absolute: attorney.seoTitle },
    description: attorney.metaDescription,
    alternates: { canonical: `/team/${slug}`, languages: { ar: `/team/${slug}`, en: `/en/team/${slug}` } },
    openGraph: {
      type: "profile",
      title: attorney.seoTitle,
      description: attorney.metaDescription,
      images: photo ? [{ url: photo }] : [{ url: "/brand/riyadh-kafd.jpg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function AttorneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const attorney = attorneys.find((a) => a.slug === slug);
  if (!attorney) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: attorney.name,
    alternateName: attorney.nameEn,
    jobTitle: attorney.role,
    worksFor: { "@type": "Organization", name: firm.nameShortAr },
    knowsAbout: attorney.practiceAreas.map((p) => p.label),
    url: `${firm.website}/team/${attorney.slug}`,
    identifier: attorney.slug === "turki-alnayef" ? { "@type": "PropertyValue", name: "رقم رخصة مزاولة المحاماة", value: firm.licenseNumber } : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TeamView attorney={attorney} locale="ar" />
    </>
  );
}
