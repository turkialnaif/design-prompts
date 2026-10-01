import { Award, Building2, Download, Hash, MapPin, Phone } from "lucide-react";
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
    categoriesLabel: "الفئات التي نخدمها",
    categories: ["الأفراد", "الشركات", "المؤسسات", "الجهات الحكومية", "الجمعيات الخيرية", "الأوقاف"],
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
    categoriesLabel: "Who we serve",
    categories: ["Individuals", "Companies", "Institutions", "Government entities", "Charitable associations", "Endowments (Awqaf)"],
    download: "Download Company Profile",
    file: "/downloads/company-profile-en.pdf",
  },
};

/**
 * Under the hero: one navy panel that now carries everything the old headline and stat band
 * used to — licence, register, office and contact; the firm's own figures; who it serves; and
 * the profile download — organised in clear bands instead of scattered across the page.
 */
export default function TrustStrip({ locale }: { locale: "ar" | "en" }) {
  const t = copy[locale];
  // Wide letter-spacing reads as elegant small-caps on Latin text, but at small sizes it
  // breaks Arabic script's letter connections — so it's Latin-only.
  const label = locale === "en" ? "text-[10px] font-bold uppercase tracking-[0.18em] text-[#e6c988]" : "text-[11px] font-bold text-[#e6c988]";
  const bandLabel = locale === "en" ? "text-[10px] font-bold uppercase tracking-[0.24em] text-[#e6c988]" : "text-xs font-bold text-[#e6c988]";
  return (
    <div className="relative pb-16 pt-14 md:pt-16">
      <div className="relative z-[3] mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_90%_140%_at_50%_0%,var(--ink-3),var(--ink)_80%)] shadow-[0_30px_70px_-30px_rgba(6,13,21,0.75)] ring-1 ring-gold/50">
            {/* Facts */}
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {t.items.map((i) => {
                const Icon = i.icon;
                return (
                  <a
                    key={i.label}
                    href={i.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center gap-1.5 border-white/10 px-3 py-6 text-center transition-colors hover:bg-white/[0.06] max-lg:border-b max-lg:odd:border-e lg:border-e md:px-5"
                  >
                    <Icon className="h-4 w-4 text-[#e6c988]/80" strokeWidth={1.6} />
                    <span className={label}>{i.label}</span>
                    <span className="font-display text-base font-bold leading-6 text-white md:text-lg md:leading-7" dir={i.ltr ? "ltr" : undefined}>{i.value}</span>
                    <span className="text-[11px] text-white/60 transition-colors group-hover:text-white">{i.hint} ↗</span>
                  </a>
                );
              })}
            </div>

            {/* Figures */}
            <div className="grid grid-cols-3 border-t border-white/10">
              {t.stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center gap-1 border-white/10 px-3 py-7 text-center last:border-e-0 md:border-e">
                  <dd className="font-display bg-gradient-to-b from-[#fbeec6] to-[#c99a45] bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
                    <CountUp to={s.value} />
                  </dd>
                  <dt className="text-[11px] font-semibold tracking-wide text-white/70 md:text-xs">{s.label}</dt>
                </div>
              ))}
            </div>

            {/* Who we serve */}
            <div className="border-t border-white/10 px-6 py-7 text-center">
              <p className={`flex items-center justify-center gap-2 ${bandLabel}`}>
                <Building2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                {t.categoriesLabel}
              </p>
              <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
                {t.categories.map((c) => (
                  <span key={c} className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/85">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={t.file}
              download
              className="flex items-center justify-center gap-3 border-t border-white/10 bg-gradient-to-b from-[#f0d894] to-[#cfa64e] px-8 py-6 text-sm font-bold text-[#08121f] transition-[filter] hover:brightness-105"
            >
              <Download className="h-4 w-4" />
              {t.download}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
