import { blurProps } from "@/lib/blur";
import Image from "next/image";
import { Clock, Globe, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import ArrowButton from "@/components/ArrowButton";
import GlassFrame from "@/components/GlassFrame";
import MatterBriefForm from "@/components/MatterBriefForm";
import Reveal from "@/components/Reveal";
import { corePillars, firm } from "@/lib/site";
import { firmEn } from "@/lib/site.en";

const copy = {
  ar: {
    eyebrow: "Contact",
    title: "تواصل معنا",
    lead: "نبدأ بتحديد النطاق والمخرجات منذ أول تواصل. اختر الطريقة الأنسب لك، أو اكتب لنا موجز المسألة هنا.",
    whatsapp: "تواصل عبر واتساب",
    call: "اتصل بنا",
    mail: "راسلنا",
    reply: "نرد خلال يوم عمل واحد",
    formTitle: "أرسل موجز مسألتك",
    formLead: "نراجع الموجز ونرد عليك خلال يوم عمل واحد.",
    channelsTitle: "طرق الوصول إلينا",
    channels: [
      { icon: MessageCircle, label: "واتساب", value: firm.phoneDisplay, href: firm.whatsapp, ltr: true, external: true },
      { icon: Phone, label: "الجوال", value: firm.phoneDisplay, href: `tel:${firm.phone}`, ltr: true },
      { icon: Mail, label: "البريد الإلكتروني", value: firm.email, href: `mailto:${firm.email}`, ltr: true },
      { icon: Globe, label: "الموقع الإلكتروني", value: firm.domain, href: firm.website, ltr: true, external: true },
    ],
    officeTitle: "مقر المكتب",
    name: firm.nameShortAr,
    address: firm.address,
    city: firm.city,
    maps: "افتح في خرائط جوجل",
    directions: "احصل على الاتجاهات",
    matterTypes: corePillars.map((s) => s.title),
  },
  en: {
    eyebrow: "Contact",
    title: "Get in Touch",
    lead: "We start by scoping the matter and the deliverables from the first contact. Choose what suits you, or write your matter brief right here.",
    whatsapp: "Message on WhatsApp",
    call: "Call us",
    mail: "Email us",
    reply: "We reply within one business day",
    formTitle: "Send your matter brief",
    formLead: "We review the brief and reply within one business day.",
    channelsTitle: "Ways to reach us",
    channels: [
      { icon: MessageCircle, label: "WhatsApp", value: firm.phoneDisplay, href: firm.whatsapp, ltr: true, external: true },
      { icon: Phone, label: "Phone", value: firm.phoneDisplay, href: `tel:${firm.phone}`, ltr: true },
      { icon: Mail, label: "Email", value: firm.email, href: `mailto:${firm.email}`, ltr: true },
      { icon: Globe, label: "Website", value: firm.domain, href: firm.website, ltr: true, external: true },
    ],
    officeTitle: "Our office",
    name: firmEn.nameShort,
    address: firm.addressEn,
    city: firmEn.city,
    maps: "Open in Google Maps",
    directions: "Get directions",
    matterTypes: corePillars.map((s) => s.titleEn),
  },
};

const pill = "inline-flex items-center gap-2 chamfer-btn border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20";

export default function ContactView({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const ar = locale === "ar";
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(firm.plusCode + " " + firm.address)}`;

  return (
    <div>
      {/* the footer's "have a matter?" card would repeat this page's own form */}
      <style>{"[data-footer-cta]{display:none}"}</style>
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-5 pb-14 pt-32 md:px-10 md:pb-24 md:pt-44">
        <Image src="/brand/riyadh-skyline.jpg" {...blurProps("/brand/riyadh-skyline.jpg")} alt="" fill priority sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: "center 55%" }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,18,32,0.62)_0%,rgba(8,18,32,0.4)_50%,rgba(8,18,32,0.72)_100%)]" />
        <GlassFrame tint className="mx-auto max-w-4xl">
          <div className="relative px-6 py-12 text-center md:px-14 md:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e6c988]">{t.eyebrow}</p>
            <h1 className="engraved-light font-display mt-3 text-5xl font-bold leading-[1.3] md:text-7xl">{t.title}</h1>
            <span aria-hidden className="mx-auto mt-4 block h-px w-16 bg-[#f0d894]/80" />
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-white/85 md:text-base md:leading-9">{t.lead}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ArrowButton href={firm.whatsapp} external ltr={!ar}>
                {t.whatsapp}
              </ArrowButton>
              <a href={`tel:${firm.phone}`} className={pill}>
                <Phone className="h-4 w-4 text-[#f0d894]" />
                {t.call}
              </a>
              <a href={`mailto:${firm.email}`} className={pill}>
                <Mail className="h-4 w-4 text-[#f0d894]" />
                {t.mail}
              </a>
            </div>
            <p className="mt-7 inline-flex items-center gap-4 text-xs text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#f0d894]" />
                {t.city}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#f0d894]" />
                {t.reply}
              </span>
            </p>
          </div>
        </GlassFrame>
      </section>

      {/* Form + channels + office */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="glass-card h-full rounded-3xl p-7 md:p-10">
              <span className="block h-[3px] w-10 rounded-full bg-gold" />
              <h2 className="font-display mt-4 text-3xl font-bold text-ink md:text-4xl">{t.formTitle}</h2>
              <p className="mb-7 mt-2 text-sm leading-7 text-ink-soft/80">{t.formLead}</p>
              <MatterBriefForm locale={locale} matterTypes={t.matterTypes} />
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal delay={80}>
              <div className="glass-card rounded-3xl p-4 md:p-5">
                <h2 className="font-display px-3 pb-2 pt-2 text-lg font-bold text-ink">{t.channelsTitle}</h2>
                <ul className="divide-y divide-gold/20">
                  {t.channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-gold/10"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-white/70 text-gold-deep">
                          <c.icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-soft/60">{c.label}</span>
                          <span dir={c.ltr ? "ltr" : undefined} className={`mt-0.5 block break-all text-sm font-bold text-ink transition-colors group-hover:text-gold-deep ${c.ltr && ar ? "text-end" : ""}`}>
                            {c.value}
                          </span>
                        </span>
                        <span aria-hidden className="text-gold-deep opacity-0 transition-opacity group-hover:opacity-100">{ar ? "←" : "→"}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="relative isolate overflow-hidden rounded-3xl p-7 text-white ring-1 ring-white/20 md:p-9">
                <Image src="/brand/riyadh-kafd.jpg" {...blurProps("/brand/riyadh-kafd.jpg")} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="-z-20 object-cover" style={{ objectPosition: "60% 40%" }} />
                <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,18,32,0.55)_0%,rgba(8,18,32,0.9)_100%)]" />
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f0d894]/70 bg-white/10 backdrop-blur-md">
                  <MapPin className="h-5 w-5 text-[#f0d894]" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#e6c988]">{t.officeTitle}</p>
                <h3 className="font-display mt-1 text-2xl font-bold">{t.name}</h3>
                <p className="mt-2 text-sm leading-7 text-white/85">{t.address}</p>
                <p className="mt-1 text-xs text-white/60" dir="ltr">{firm.plusCode}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <ArrowButton href={firm.mapsUrl} external ltr={!ar}>
                    {t.maps}
                  </ArrowButton>
                  <a href={directions} target="_blank" rel="noopener noreferrer" className={pill}>
                    <Navigation className="h-4 w-4 text-[#f0d894]" />
                    {t.directions}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
