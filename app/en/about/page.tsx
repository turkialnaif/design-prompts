import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import { corePillars, firm, matterMethod } from "@/lib/site";
import { attorneyEn, firmEn, serviceStandardEn } from "@/lib/site.en";

export const metadata: Metadata = {
  title: "About Us",
  description: `${firmEn.nameShort} — a legal partner connecting professional judgment with business context, in Riyadh, Saudi Arabia.`,
  alternates: { canonical: "/en/about", languages: { ar: "/about", en: "/en/about" } },
  openGraph: {
    title: "About Us",
    description: `${firmEn.nameShort} — a legal partner connecting professional judgment with business context, in Riyadh, Saudi Arabia.`,
    images: [{ url: "/brand/attorney-turki.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const principles = [
  { n: "1", title: "We understand the context and the business detail", body: "The engagement starts by reading the facts, the risks, and the commercial objective." },
  { n: "2", title: "We build the legal position", body: "Connecting the statutory text to the argument, the evidence, and the expected outcome." },
  { n: "3", title: "We follow through past execution", body: "We stay engaged with what follows: the opinion, the judgment, the procedure, deadlines, and risks." },
];
const standard = serviceStandardEn;
const leader = { name: attorneyEn.name, role: attorneyEn.role, href: `/en/team/${attorneyEn.slug}`, lead: attorneyEn.bio[0] };
const stepTitle = (s: (typeof matterMethod)[number]) => s.title;
const stepSub = (s: (typeof matterMethod)[number]) => s.titleAr;

export default function AboutPageEn() {
  const facts = [
    { label: "License No.", value: firm.licenseNumber },
    { label: "Based in", value: "Riyadh, Saudi Arabia" },
    { label: "Unified Number", value: firm.unifiedNumber },
  ];

  return (
    <div>
            <PageHero photo="/brand/riyadh-kafd.jpg" focus="center 40%">
          <div className="relative flex flex-col items-center px-6 py-14 text-center md:px-16 md:py-20">
            <Image src="/brand/logo-mark.png" alt="" width={44} height={35} className="mb-4" />
            <SectionHeading as="h1" eyebrow="Who We Are" title="About Us" tone="onDark" />
            <p className="font-display mt-8 max-w-2xl text-xl font-bold leading-10 text-white md:text-2xl">A legal partner connecting professional judgment with business context</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/85">{firmEn.description}</p>

            <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="border border-white/25 bg-white/10 flex flex-col items-center justify-center rounded-2xl px-3 py-4 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-white/70">{f.label}</span>
                  <span className="mt-1 text-sm font-bold text-white">{f.value}</span>
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
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="01" eyebrow="Principles" title="How We Think" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <TiltCard className="h-full rounded-2xl" maxTilt={6}>
                  <div className="glass-card flex h-full flex-col items-center rounded-2xl p-7 text-center">
                    <span className="glass-number-light font-display text-5xl font-extrabold leading-none">{p.n}</span>
                    <h3 className="font-display mt-4 text-base font-bold text-ink">{p.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft/80">{p.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number="02" eyebrow="The Matter Method" title="How We Manage a Matter" tone="onLight" />
            <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-7 text-ink-soft/80">
              A short, repeatable way of working that gives the client a clear view of the engagement.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matterMethod.map((step, i) => (
              <Reveal key={step.step} delay={(i % 3) * 70}>
                <TiltCard className="h-full rounded-2xl" maxTilt={8}>
                  <div className="glass-card flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center">
                    <span className="glass-number-light font-display text-4xl font-extrabold leading-none">{step.step}</span>
                    <h3 className="font-display mt-3 text-sm font-bold text-ink">{stepTitle(step)}</h3>
                    <p className="gold-eyebrow mt-1 text-[10px]">{stepSub(step)}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <SectionHeading number="03" eyebrow="Leadership" title="Leadership" tone="onLight" />
          </Reveal>
          <Reveal>
            <Link
              href={leader.href}
              className="group glass-card mt-12 grid items-center gap-6 rounded-3xl p-6 text-center transition-transform duration-300 hover:-translate-y-1 md:grid-cols-[14rem_1fr] md:p-8"
            >
              <div className="relative mx-auto aspect-[4/5] w-44 overflow-hidden rounded-2xl ring-1 ring-white/90 shadow-[0_24px_50px_-24px_rgba(120,90,30,0.55)] md:w-full">
                <Image src="/brand/attorney-turki.jpg" alt={leader.name} fill sizes="224px" className="object-cover object-top" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">{leader.name}</h3>
                <p className="mt-1 text-sm font-medium text-gold-deep">{leader.role}</p>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-ink-soft/85">{leader.lead}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-gold-deep opacity-0 transition-opacity group-hover:opacity-100">
                  View profile →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number="04" eyebrow="Service Standard" title="Our Service Standard" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {standard.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 80}>
                <TiltCard className="h-full rounded-2xl" maxTilt={6}>
                  <div className="glass-card flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center">
                    <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft/80">{item.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
