import { Award, Download, Hash, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { accreditations } from "@/lib/accreditations";
import { articles } from "@/lib/articles";
import { firm } from "@/lib/site";
import { totalServices } from "@/lib/service-tiles";

const SBA_LICENSE = "https://eservice.sba.gov.sa/directory/3977";
const SBA_FIRM = "https://eservice.sba.gov.sa/firm/3977/pdf";

const copy = {
  ar: {
    items: [
      { icon: Award, label: "رخصة مزاولة المحاماة", value: firm.licenseNumber, href: SBA_LICENSE, hint: "التحقق في دليل الهيئة" },
      { icon: Hash, label: "السجل الموحد", value: firm.unifiedNumber, href: SBA_FIRM, hint: "سجل المنشأة" },
      { icon: MapPin, label: "المقر", value: "حي الياسمين، الرياض", href: firm.mapsUrl, hint: "افتح في الخرائط" },
      { icon: Phone, label: "اتصل أو راسلنا", value: firm.phoneDisplay, href: firm.whatsapp, hint: "محادثة واتساب", ltr: true },
    ],
    stats: [
      { value: totalServices, label: "خدمة قانونية" },
      { value: accreditations.length, label: "اعتمادًا وترخيصًا" },
      { value: articles.length, label: "مقالة قانونية" },
    ],
    download: "تحميل الملف التعريفي",
    file: "/downloads/company-profile-ar.pdf",
  },
  en: {
    items: [
      { icon: Award, label: "Law Practice License", value: firm.licenseNumber, href: SBA_LICENSE, hint: "Verify in the Bar directory" },
      { icon: Hash, label: "Unified Number", value: firm.unifiedNumber, href: SBA_FIRM, hint: "Firm register" },
      { icon: MapPin, label: "Office", value: "Al Yasmin, Riyadh", href: firm.mapsUrl, hint: "Open in Maps" },
      { icon: Phone, label: "Call or message us", value: firm.phoneDisplay, href: firm.whatsapp, hint: "WhatsApp chat", ltr: true },
    ],
    stats: [
      { value: totalServices, label: "legal services" },
      { value: accreditations.length, label: "licences & accreditations" },
      { value: articles.length, label: "legal articles" },
    ],
    download: "Download Company Profile",
    file: "/downloads/company-profile-en.pdf",
  },
};

/**
 * The facts band: the firm's own three figures set huge in the identity's gradient, then licence,
 * register, office and contact as four chamfered tiles that each link to where the fact can be checked,
 * then the profile download.
 */
export default function TrustStrip({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  const ar = locale === "ar";
  return (
    <section className="relative isolate overflow-hidden bg-[#f4f5fe] py-20 md:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(30,70,200,0.16),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <dl className="grid divide-[#00124a]/12 border-y border-[#00124a]/12 sm:grid-cols-3 sm:divide-x rtl:sm:divide-x-reverse">
            {t.stats.map((s) => (
              <div key={s.label} className="px-4 py-10 text-center md:py-14">
                <dd className="font-display grad-text-light text-7xl font-light leading-none md:text-8xl">
                  <CountUp to={s.value} />
                </dd>
                <dt className="mt-4 text-base font-light text-[#00124a]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((i, k) => {
            const Icon = i.icon;
            return (
              <Reveal key={i.label} delay={k * 70} className="h-full">
                <a
                  href={i.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-card flex h-full flex-col gap-2 rounded-2xl p-6"
                >
                  <Icon className="h-5 w-5 text-[#012696]" strokeWidth={1.5} />
                  <span className={ar ? "mt-2 text-sm text-ink-soft" : "mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft"}>{i.label}</span>
                  <span className="font-display text-2xl font-light leading-8 text-[#00124a]" dir={i.ltr ? "ltr" : undefined}>{i.value}</span>
                  <span className="mt-auto pt-2 text-xs text-[#012696] opacity-70 transition-opacity group-hover:opacity-100">{i.hint} ↗</span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-10 text-center">
            <a href={t.file} download className="chamfer-btn inline-flex items-center gap-3 bg-gradient-to-b from-[#f6e2b3] to-[#e0b35a] px-8 py-4 text-sm text-[#00124a] transition-[filter] hover:brightness-105">
              <Download className="h-4 w-4" />
              {t.download}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
