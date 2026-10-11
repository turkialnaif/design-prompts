import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArrowButton from "@/components/ArrowButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import PageHero from "@/components/PageHero";
import ServiceLongform from "@/components/ServiceLongform";
import SectionHeading from "@/components/SectionHeading";
import { corePillars, firm, specializedLines } from "@/lib/site";
import { enServiceSlugs, hasEnService } from "@/lib/en/slugs";
import { serviceCopyEn, serviceExtraEn } from "@/lib/en/services";

export function generateStaticParams() {
  return enServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!hasEnService(slug)) return {};
  const copy = serviceCopyEn[slug as keyof typeof serviceCopyEn];
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical: `/en/services/${slug}`,
      languages: { ar: `/services/${slug}`, en: `/en/services/${slug}`, "x-default": `/services/${slug}` },
    },
    openGraph: { title: copy.title, description: copy.description, images: [{ url: "/brand/riyadh-kafd.jpg" }] },
    twitter: { card: "summary_large_image" },
  };
}

export default async function EnServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!hasEnService(slug)) notFound();
  const key = slug as keyof typeof serviceCopyEn;
  const copy = serviceCopyEn[key];
  const extra = serviceExtraEn[key];
  const entry = [...corePillars, ...specializedLines].find((s) => s.slug === slug);
  if (!entry) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: entry.titleEn,
    description: copy.description,
    url: `${firm.website}/en/services/${slug}`,
    serviceType: "Legal services",
    inLanguage: "en",
    provider: { "@id": `${firm.website}/#firm` },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: extra.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero>
        <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
          <SectionHeading as="h1" eyebrow={entry.titleEn} title={copy.h1} tone="onDark" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85">{copy.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ArrowButton href={firm.whatsapp} external ltr>
              Consultation on this matter
            </ArrowButton>
            <MatterBriefCTA locale="en" matterTypes={corePillars.map((s) => s.titleEn)} tone="onDark" />
          </div>
        </div>
      </PageHero>

      <Breadcrumbs
        locale="en"
        items={[
          { label: "Home", href: "/en" },
          { label: "Services & Sectors", href: "/en/services" },
          { label: entry.titleEn, href: `/en/services/${slug}` },
        ]}
      />

      <ServiceLongform copy={copy} extra={extra} links={copy.links} locale="en" />
    </div>
  );
}
