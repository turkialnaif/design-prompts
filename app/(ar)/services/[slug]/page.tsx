import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowButton from "@/components/ArrowButton";
import MatterBriefCTA from "@/components/MatterBriefCTA";
import Reveal from "@/components/Reveal";
import ServiceLongform from "@/components/ServiceLongform";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import { articles } from "@/lib/articles";
import { sectors } from "@/lib/sectors";
import { lineDetails } from "@/lib/line-content";
import { serviceCopy } from "@/lib/service-copy";
import { serviceExtra } from "@/lib/service-extra";
import { corePillars, deliverables, firm, lineAxis, matterMethod, specializedLines } from "@/lib/site";

export function generateStaticParams() {
  return [...corePillars, ...specializedLines].map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = corePillars.find((s) => s.slug === slug);
  const line = specializedLines.find((s) => s.slug === slug);
  const entry = pillar ?? line;
  if (!entry) return {};

  const hasPhoto = existsSync(path.join(process.cwd(), "public", "services", `${slug}.jpg`));
  const image = hasPhoto ? `/services/${slug}.jpg` : "/brand/riyadh-kafd.jpg";

  const copy = serviceCopy[slug];
  const title = copy?.title ?? entry.title;
  const description = copy?.description ?? entry.summary;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title, description, images: [{ url: image }] },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = corePillars.find((s) => s.slug === slug);
  const line = specializedLines.find((s) => s.slug === slug);
  const entry = pillar ?? line;

  if (!entry) notFound();

  const axis = line ? corePillars.find((p) => p.slug === lineAxis[line.slug]) : undefined;
  const axisLines = pillar ? specializedLines.filter((l) => lineAxis[l.slug] === pillar.slug) : [];
  const siblings = axis ? specializedLines.filter((l) => l.slug !== slug && lineAxis[l.slug] === axis.slug) : [];
  const related = pillar
    ? corePillars.filter((s) => s.slug !== slug)
    : (siblings.length ? siblings : specializedLines.filter((s) => s.slug !== slug)).slice(0, 8);

  const keywords = entry.title.split(/\s+و?/).filter((w) => w.length > 3);
  const relatedArticles = articles
    .filter((a) => keywords.some((k) => `${a.h1} ${a.primaryKeyword}`.includes(k)))
    .slice(0, 3);
  const relatedSectors = sectors.filter((x) => x.services.includes(slug));
  const detail = line ? lineDetails[line.slug] : undefined;
  const order = [
    pillar ? "scope" : null,
    pillar && axisLines.length > 0 ? "axis" : null,
    detail ? "lscope" : null,
    detail ? "deliv" : null,
    detail ? "faq" : null,
    "how",
    "related",
  ].filter(Boolean) as string[];
  const no = (k: string) => String(order.indexOf(k) + 1).padStart(2, "0");
  const faqItems = detail ? detail.faq.map((f) => ({ q: f.question, a: f.answer })) : undefined;
  const faqJsonLd = (faqItems ?? serviceExtra[slug]?.faq)
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (faqItems ?? serviceExtra[slug].faq).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: entry.title,
    alternateName: entry.titleEn,
    description: entry.summary,
    url: `${firm.website}/services/${slug}`,
    serviceType: "Legal services",
    provider: { "@id": `${firm.website}/#firm` },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  };
  const copy = serviceCopy[slug];
  const extra = serviceExtra[slug];
  const labelFor = (href: string) => {
    const [, kind, key] = href.split("/");
    if (kind === "blog") return articles.find((a) => a.slug === key)?.h1;
    return [...corePillars, ...specializedLines].find((x) => x.slug === key)?.title;
  };
  const readMore = (copy?.links ?? []).flatMap((href) => {
    const label = labelFor(href);
    return label ? [{ href, label }] : [];
  });
  const all = [...corePillars, ...specializedLines];
  const idx = all.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
            <PageHero>
          <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
            {pillar && (
              <span className="border border-white/25 bg-white/10 mb-5 inline-block chamfer-btn px-4 py-1 text-xs font-semibold text-[#f6e2b3]">
                {pillar.stage}
              </span>
            )}
            {axis && (
              <Link
                href={`/services/${axis.slug}`}
                className="border border-white/25 bg-white/10 mb-5 inline-block chamfer-btn px-4 py-1 text-xs font-semibold text-[#f6e2b3]"
              >
                ضمن محور: {axis.title}
              </Link>
            )}
            <SectionHeading as="h1" eyebrow={entry.titleEn} title={copy?.h1 ?? entry.title} tone="onDark" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85">{entry.summary}</p>
            {(pillar || axis) && (
              <ol className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2" aria-label="رحلة العميل">
                {corePillars.map((p) => {
                  const active = p.slug === (pillar?.slug ?? axis?.slug);
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/services/${p.slug}`}
                        className={`inline-block chamfer-btn px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                          active
                            ? "bg-gradient-to-b from-[#f6e2b3] to-[#e0b35a] text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.8)]"
                            : "border border-white/25 bg-white/10 text-white/75 hover:text-[#f6e2b3]"
                        }`}
                      >
                        {p.stage}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ArrowButton href={firm.whatsapp} external>
                استشارة بخصوص هذه المسألة
              </ArrowButton>
              <MatterBriefCTA locale="ar" matterTypes={corePillars.map((s) => s.title)} tone="onDark" />
            </div>
          </div>
      </PageHero>

      <Breadcrumbs
        locale="ar"
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "الخدمات والقطاعات", href: "/services" },
          { label: entry.title, href: `/services/${slug}` },
        ]}
      />

      {copy && extra && <ServiceLongform copy={copy} extra={extra} links={readMore} skipFaq={!!detail} />}

      {pillar && (
        <section className="bg-paper py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <SectionHeading number={no("scope")} eyebrow="Scope of Work" title="نطاق العمل" tone="onLight" />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {pillar.items.map((item, i) => (
                <Reveal key={item.titleEn} delay={(i % 2) * 100}>
                  <TiltCard className="h-full rounded-2xl" maxTilt={7}>
                    <div className="glass-card flex h-full flex-col items-center justify-center rounded-2xl p-7 text-center">
                      <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                      <p className="gold-eyebrow mt-1 text-[11px]">{item.titleEn}</p>
                      <p className="mt-3 text-sm leading-7 text-ink-soft/80">{item.description}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail && (
        <section className="bg-paper py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <SectionHeading number={no("lscope")} eyebrow="What It Covers" title="ما تشمله هذه الخدمة" tone="onLight" />
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {detail.scope.map((item, i) => (
                <Reveal key={item} delay={(i % 2) * 80}>
                  <div className="glass-card flex h-full min-h-[5.5rem] items-center justify-center rounded-2xl p-5 text-center">
                    <p className="text-sm font-semibold leading-7 text-ink">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail && (
        <section className="bg-paper py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <SectionHeading number={no("deliv")} eyebrow="Deliverables" title="ما الذي تتسلّمه" tone="onLight" />
            </Reveal>
            <ul className="mt-12 flex flex-wrap justify-center gap-3">
              {detail.deliverables.map((d) => (
                <li key={d} className="glass-card chamfer-btn px-6 py-2.5 text-sm font-semibold text-ink-soft">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {detail && (
        <section className="bg-paper py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-5">
            <Reveal>
              <SectionHeading number={no("faq")} eyebrow="FAQ" title="أسئلة شائعة" tone="onLight" />
            </Reveal>
            <div className="mt-12 space-y-4">
              {detail.faq.map((f) => (
                <details key={f.question} className="group glass-card rounded-2xl p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-ink">
                    <span>{f.question}</span>
                    <span aria-hidden className="text-lg text-gold-deep transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-ink-soft/80">{f.answer}</p>
                </details>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-6 text-ink-soft/55">
              المعلومات أعلاه عامة وليست رأيًا قانونيًا في حالة بعينها؛ يختلف الجواب بحسب الوقائع والنظام المنطبق.
            </p>
          </div>
        </section>
      )}

      {pillar && axisLines.length > 0 && (
        <section className="bg-paper py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <SectionHeading number={no("axis")} eyebrow="Practice Lines" title="خطوط الممارسة ضمن هذا المحور" tone="onLight" />
            </Reveal>
            <ul className="mt-12 flex flex-wrap justify-center gap-3">
              {axisLines.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/services/${l.slug}`}
                    className="glass-card inline-block chamfer-btn px-5 py-2.5 text-sm font-semibold text-ink-soft transition-transform duration-300 hover:-translate-y-0.5 hover:text-gold-deep"
                  >
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading number={no("how")} eyebrow="How We Work" title="كيف نعمل على المسألة" tone="onLight" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matterMethod.map((step, i) => (
              <Reveal key={step.step} delay={(i % 3) * 70}>
                <div className="glass-card flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center">
                  <span className="glass-number-light font-display text-4xl font-extrabold leading-none">{step.step}</span>
                  <h3 className="font-display mt-3 text-sm font-bold text-ink">{step.titleAr}</h3>
                  <p className="gold-eyebrow mt-1 text-[10px]">{step.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {deliverables.map((d) => (
              <li key={d.title} className="glass-card chamfer-btn px-5 py-2 text-xs font-semibold text-ink-soft">
                {d.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <SectionHeading
              number={no("related")}
              eyebrow="Related Services"
              title="خدمات ذات صلة"
              tone="onLight"
            />
          </Reveal>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/services/${r.slug}`}
                  className="glass-card inline-block chamfer-btn px-5 py-2.5 text-sm font-semibold text-ink-soft transition-transform duration-300 hover:-translate-y-0.5 hover:text-gold-deep"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href="/services" className="text-sm font-semibold text-gold-deep hover:underline">
              ← عودة لجميع الخدمات
            </Link>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="bg-paper py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-5">
            <Reveal>
              <SectionHeading eyebrow="Legal Insights" title="مقالات ذات صلة" tone="onLight" />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {relatedArticles.map((a, i) => (
                <Reveal key={a.slug} delay={i * 90}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group glass-card flex h-full flex-col items-center rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1"
                  >
                    <h3 className="font-display text-base font-bold leading-snug text-ink">{a.h1}</h3>
                    <span className="mt-auto pt-4 text-sm font-semibold text-gold-deep transition-transform group-hover:-translate-x-1">
                      اقرأ المقال ←
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedSectors.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-5 text-center">
            <h2 className="font-display !text-3xl !font-light text-[#00124a] md:!text-4xl">القطاعات التي نقدّم لها هذه الخدمة</h2>
            <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
              {relatedSectors.map((x) => (
                <li key={x.slug}>
                  <Link href={`/sectors/${x.slug}`} className="chamfer-btn inline-block border border-[#00124a]/20 px-4 py-2 text-sm font-light text-[#00124a] transition-colors hover:border-[#e0b35a] hover:bg-[#f4f5fe]">
                    {x.ar.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <nav aria-label="التنقل بين الخدمات" className="bg-paper py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 text-sm font-semibold">
          {prev ? (
            <Link href={`/services/${prev.slug}`} className="glass-card chamfer-btn px-5 py-2.5 text-ink-soft hover:text-gold-deep">
              → {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/services/${next.slug}`} className="glass-card chamfer-btn px-5 py-2.5 text-ink-soft hover:text-gold-deep">
              {next.title} ←
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>

    </div>
  );
}
