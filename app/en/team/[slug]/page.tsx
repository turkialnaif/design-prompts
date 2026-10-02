import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamView from "@/components/pages/TeamView";
import { firm } from "@/lib/site";
import { attorneyEn } from "@/lib/site.en";

const attorneysEn = [attorneyEn];
const attorneys = attorneysEn;

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
    title: attorney.seoTitle,
    description: attorney.metaDescription,
    alternates: { canonical: `/en/team/${slug}`, languages: { ar: `/team/${slug}`, en: `/en/team/${slug}` } },
    openGraph: {
      type: "profile",
      title: attorney.seoTitle,
      description: attorney.metaDescription,
      images: photo ? [{ url: photo }] : [{ url: "/brand/riyadh-kafd.jpg" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function AttorneyPageEn({
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
    jobTitle: attorney.role,
    worksFor: { "@type": "Organization", name: firm.nameEn },
    url: `${firm.website}/en/team/${attorney.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TeamView attorney={attorney} locale="en" />
    </>
  );
}
