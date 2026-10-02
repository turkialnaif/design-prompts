import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectorPage from "@/components/SectorPage";
import { sectorBySlug, sectors } from "@/lib/sectors";
import { firm } from "@/lib/site";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectorBySlug(slug);
  if (!sector) return {};
  const c = sector.ar;
  const title = `محاماة واستشارات قانونية لقطاع ${c.title}`;
  const description = `${c.short} ${firm.nameShortAr} في الرياض.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/sectors/${slug}`,
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
  return <SectorPage sector={sector} locale="ar" />;
}
