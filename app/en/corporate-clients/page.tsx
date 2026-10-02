import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import { corePillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "Working With Corporate Clients",
  description: "How Turki AlNaif & Partners works with companies and institutions: engagement models, response time, confidentiality, conflict checks, and reporting.",
  alternates: { canonical: "/en/corporate-clients", languages: { ar: "/corporate-clients", en: "/en/corporate-clients" } },
  openGraph: {
    title: "Working With Corporate Clients",
    description: "How Turki AlNaif & Partners works with companies and institutions: engagement models, response time, confidentiality, conflict checks, and reporting.",
    images: [{ url: "/brand/riyadh-kafd.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

const models = [
  { tag: "Matter-based", title: "A defined matter", body: "An engagement with an agreed scope and deliverables: a legal opinion, a contract, a transaction, or representation in a dispute. The ask, the deliverables, and the assumptions are agreed before work begins." },
  { tag: "Ongoing arrangement", title: "A continuing relationship", body: "A standing legal relationship for the organization’s recurring needs: advisory, contract review, and support for management decisions, on a scope and working method agreed in advance." },
];

const commitments = [
  { title: "Response time", body: "We respond to new requests and matter briefs within one business day." },
  { title: "Confidentiality", body: "Information is shared strictly on a professional need-to-know basis, and what you disclose to us stays confidential." },
  { title: "Conflict check", body: "Before accepting any engagement we check for any potential conflict with our existing clients." },
  { title: "Reporting", body: "Updates at decision points, not only when asked; a written summary of status and next steps on longer matters, and periodic reporting in ongoing arrangements." },
];

const steps = [
  { n: "1", title: "Send a matter brief", body: "The parties, the key facts, and the goal — a short summary is enough." },
  { n: "2", title: "We review and respond", body: "We check for conflicts and respond within one business day." },
  { n: "3", title: "We agree the scope", body: "The scope, deliverables, and assumptions are agreed before work starts." },
];

export default function CorporateClientsPageEn() {
  return (
    <div>
            <PageHero photo="/brand/riyadh-kafd.jpg" focus="center 30%">
          <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
            <SectionHeading as="h1" eyebrow="Corporate Clients" title="Working With Corporate Clients" tone="onDark" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85">Two clear engagement models and commitments we state upfront, so your legal team and management know what to expect from the first contact.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MatterBriefCTA locale="en" matterTypes={corePillars.map((s) => s.titleEn)} tone="onDark" />
            </div>
          </div>
      </PageHero>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="01" eyebrow="Engagement Models" title="How We Engage" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {models.map((m, i) => (
              <Reveal key={m.tag} delay={i * 90}>
                <TiltCard className="h-full rounded-2xl" maxTilt={6}>
                  <div className="glass-card flex h-full flex-col items-center rounded-2xl p-8 text-center">
                    <span className="glass-card chamfer-btn px-4 py-1 text-xs font-semibold text-gold-deep">{m.tag}</span>
                    <h3 className="font-display mt-4 text-lg font-bold text-ink">{m.title}</h3>
                    <p className="mt-3 text-sm leading-8 text-ink-soft/85">{m.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="02" eyebrow="Our Commitments" title="What You Can Rely On" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 80}>
                <div className="glass-card flex h-full flex-col items-center rounded-2xl p-7 text-center">
                  <h3 className="font-display text-base font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-8 text-ink-soft/85">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading number="03" eyebrow="Getting Started" title="How It Begins" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="glass-card flex h-full flex-col items-center rounded-2xl p-7 text-center">
                  <span className="glass-number-light font-display text-5xl font-extrabold leading-none">{s.n}</span>
                  <h3 className="font-display mt-4 text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft/80">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper pb-20">
        <p className="mx-auto max-w-lg px-5 text-center text-xs leading-6 text-ink-soft/60">Submitting a brief does not create a lawyer–client relationship until the firm formally accepts the engagement.</p>
      </section>
    </div>
  );
}
