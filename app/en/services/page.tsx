import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import PillarCard from "@/components/PillarCard";
import Reveal from "@/components/Reveal";
import CornerField from "@/components/CornerField";
import SectionHeading from "@/components/SectionHeading";
import SpecializedExplorer from "@/components/SpecializedExplorer";
import { corePillars, firm, specializedLines } from "@/lib/site";
import { specializedLineSummaryEn } from "@/lib/site.en";

export const metadata: Metadata = {
  title: "Legal Services",
  description:
    "Turki AlNaif & Partners' legal service system: advisory, contracts, litigation & arbitration, compliance, technology, and enforcement & recovery.",
  alternates: { canonical: "/en/services", languages: { ar: "/services", en: "/en/services" } },
  openGraph: {
    title: "Legal Services",
    description:
      "Turki AlNaif & Partners' legal service system: advisory, contracts, litigation & arbitration, compliance, technology, and enforcement & recovery.",
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ServicesPageEn() {
  const stats = [
    { value: corePillars.length, label: "core pillars" },
    { value: specializedLines.length, label: "specialized practice lines" },
  ];

  return (
    <div>
            <PageHero photo="/brand/riyadh-skyline.jpg" focus="center 55%">
          <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
            <SectionHeading eyebrow="Service Architecture" title="Legal Service System" tone="onDark" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85">We present our services as a connected engagement journey — from advice before a decision through to a completed practical effect.</p>

            <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="border border-white/25 bg-white/10 flex flex-col items-center rounded-2xl px-3 py-4">
                  <span className="glass-number-dark font-display text-4xl font-extrabold leading-none">{s.value}</span>
                  <span className="mt-2 text-xs font-semibold text-white/75">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ArrowButton href={firm.whatsapp} external ltr>
                Book an Initial Consultation
              </ArrowButton>
              <MatterBriefCTA locale="en" matterTypes={corePillars.map((s) => s.titleEn)} tone="onDark" />
            </div>
          </div>
      </PageHero>

      <div className="relative isolate overflow-hidden">
        <CornerField tone="gold" corner="tr" opacity={0.12} size={150} className="absolute -top-6 -right-6 h-[26rem] w-[34rem] md:h-[30rem] md:w-[40rem]" />

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number="01" eyebrow="Core Pillars" title="Core Pillars" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {corePillars.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 80}>
                <PillarCard
                  href={"/en/services"}
                  label={service.stage}
                  title={service.titleEn}
                  titleEn={service.title}
                  meta={`${service.items.length} services`}
                  ctaLabel="Service details →"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number="02" eyebrow="Specialized Practice Lines" title="Specialized Practice Lines" tone="onLight" />
          </Reveal>
          <div className="mt-12">
            <SpecializedExplorer locale="en" items={specializedLines.map((l) => ({ slug: l.slug, title: l.titleEn, subtitle: l.title, summary: specializedLineSummaryEn[l.slug] ?? "" }))} />
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
