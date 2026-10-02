import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectorPage from "@/components/SectorPage";
import { sectorBySlug, sectors } from "@/lib/sectors";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) return {};
  const c = sector.en;
  const title = `${c.title} — Legal Services in Saudi Arabia`;
  const description = `${c.short} Turki AlNaif & Partners, Riyadh.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/en/sectors/${slug}`,
      languages: { ar: `/sectors/${slug}`, en: `/en/sectors/${slug}`, "x-default": `/sectors/${slug}` },
    },
    openGraph: { title, description, type: "website", images: [{ url: "/brand/riyadh-kafd.jpg" }] },
    twitter: { card: "summary_large_image" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) notFound();
  return <SectorPage sector={sector} locale="en" />;
}
