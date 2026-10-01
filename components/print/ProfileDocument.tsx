import type { ReactNode } from "react";
import QRCode from "qrcode";
import CornerField from "@/components/CornerField";
import {
  attorneys,
  corePillars,
  deliverables,
  firm,
  lineAxis,
  matterMethod,
  serviceStandard,
  specializedLines,
} from "@/lib/site";
import { accreditations } from "@/lib/accreditations";
import { attorneyEn, firmEn, serviceStandardEn } from "@/lib/site.en";

type Locale = "ar" | "en";

const T = {
  ar: {
    cover: "الملف التعريفي",
    coverSub: "محاماة واستشارات قانونية",
    aboutE: "Who We Are",
    aboutH: "من نحن",
    principlesH: "كيف نفكّر",
    servicesE: "Service Architecture",
    servicesH: "منظومة الخدمات القانونية",
    servicesP: "نعرض الخدمات بوصفها رحلة عمل متصلة، من المشورة قبل القرار إلى اكتمال الأثر.",
    linesE: "Specialized Practice Lines",
    linesH: "خطوط الممارسة المتخصصة",
    methodE: "How We Work",
    methodH: "منهجنا في إدارة المسألة",
    deliverablesH: "مُخرجات تفصيلية",
    standardH: "معيار الخدمة",
    leadE: "Leadership",
    leadH: "القيادة المهنية",
    credH: "الاعتمادات المهنية",
    contactE: "Get In Touch",
    contactH: "لنبدأ بمسألتك",
    contactP: "نبدأ بتحديد النطاق والمخرجات منذ أول تواصل. أرسل نبذة مختصرة عن المسألة: الأطراف، والوقائع الأساسية، والهدف المطلوب.",
    phone: "الجوال",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    web: "الموقع",
    address: "المقر",
    license: "رخصة مزاولة المحاماة",
    unified: "السجل الموحد",
    regulators: "الجهات النظامية",
    scan: "امسح للتواصل عبر واتساب",
    page: "صفحة",
  },
  en: {
    cover: "Company Profile",
    coverSub: "Lawyers & Legal Consultants",
    aboutE: "Who We Are",
    aboutH: "About Us",
    principlesH: "How We Think",
    servicesE: "Service Architecture",
    servicesH: "Legal Service System",
    servicesP: "We present our services as a connected engagement journey — from advice before a decision through to a completed practical effect.",
    linesE: "Specialized Practice Lines",
    linesH: "Specialized Practice Lines",
    methodE: "How We Work",
    methodH: "How We Manage a Matter",
    deliverablesH: "Detailed Deliverables",
    standardH: "Our Service Standard",
    leadE: "Leadership",
    leadH: "Leadership",
    credH: "Professional Credentials",
    contactE: "Get In Touch",
    contactH: "Let's Start With Your Matter",
    contactP: "We start by scoping the matter and the deliverables from the first contact. Send a brief summary: the parties, the key facts, and the goal.",
    phone: "Phone",
    whatsapp: "WhatsApp",
    email: "Email",
    web: "Website",
    address: "Office",
    license: "Law Practice License No.",
    unified: "Unified Number",
    regulators: "Regulatory Affiliations",
    scan: "Scan to reach us on WhatsApp",
    page: "Page",
  },
} as const;

const principles = {
  ar: [
    { n: "1", title: "نفهم السياق وتفاصيل العمل", body: "يبدأ العمل من قراءة الوقائع والمخاطر والهدف التجاري." },
    { n: "2", title: "نبني الموقف القانوني", body: "نربط النص النظامي بالحجة والدليل والنتيجة المتوقعة." },
    { n: "3", title: "نواصل إلى ما بعد التنفيذ", body: "نهتم بما بعد: الرأي أو الحكم أو الإجراء أو المدد أو المخاطر." },
  ],
  en: [
    { n: "1", title: "We understand the context and the business detail", body: "The engagement starts by reading the facts, the risks, and the commercial objective." },
    { n: "2", title: "We build the legal position", body: "Connecting the statutory text to the argument, the evidence, and the expected outcome." },
    { n: "3", title: "We follow through past execution", body: "We stay engaged with what follows: the opinion, the judgment, the procedure, deadlines, and risks." },
  ],
} as const;

function Sheet({ children, dark = false, num, locale, last = false }: { children: ReactNode; dark?: boolean; num?: number; locale: Locale; last?: boolean }) {
  return (
    <section
      className="sheet relative overflow-hidden"
      style={{
        width: "210mm",
        height: "296.5mm",
        breakAfter: last ? "auto" : "page",
        background: dark ? "#0b1626" : "#faf6ec",
      }}
    >
      {children}
      {num && (
        <div
          className="absolute bottom-[8mm] start-0 end-0 flex items-center justify-center gap-3 text-[9px] tracking-[0.2em]"
          style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(42,56,73,0.5)" }}
        >
          <span style={{ width: "10mm", height: 1, background: "#d0a751", opacity: 0.6 }} />
          <span>
            {T[locale].page} {num}
          </span>
          <span style={{ width: "10mm", height: 1, background: "#d0a751", opacity: 0.6 }} />
        </div>
      )}
    </section>
  );
}

function PageHead({ e, h, locale }: { e: string; h: string; locale: Locale }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b pb-4" style={{ borderColor: "rgba(208,167,81,0.45)" }}>
      <div>
        <h2 className="font-display text-[26px] font-bold leading-[1.4] text-[#0a1420]">{h}</h2>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-text">{e}</p>
      </div>
      <img src="/brand/logo-mark.png" alt="" width={34} height={27} />
      <span className="sr-only">{locale}</span>
    </div>
  );
}

const regulatorLogos: { src: string; h: string }[] = [
  { src: "/brand/vision2030-logo.png", h: "12mm" },
  { src: "/brand/moj-logo.png", h: "12mm" },
  { src: "/brand/bar-association-logo.png", h: "8mm" },
];

const card = "rounded-[14px] border";
const cardStyle = { borderColor: "rgba(208,167,81,0.5)", background: "#fffdf8" } as const;

export default async function ProfileDocument({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const t = T[locale];
  const attorney = en ? attorneyEn : attorneys[0];
  const qr = await QRCode.toString(firm.whatsapp, { type: "svg", margin: 0, color: { dark: "#0a1420", light: "#0000" } });
  const standard = en ? serviceStandardEn : serviceStandard;
  const axisOrder = ["corporate-contracts", "compliance-governance", "technology-data", "enforcement-recovery"];

  return (
    <div dir={en ? "ltr" : "rtl"} lang={en ? "en" : "ar"} className="profile-root">
      <style>{`
        @page { size: 210mm 297mm; margin: 0; }
        html, body { margin: 0; padding: 0; background: #fff; }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .sheet { box-sizing: border-box; }
      `}</style>

      {/* 1 — Cover: Riyadh photograph, one clear pane, the floating mark */}
      <Sheet dark locale={locale}>
        <img src="/brand/riyadh-kafd.jpg" alt="" className="absolute inset-0" style={{ width: "210mm", height: "296.5mm", objectFit: "cover", objectPosition: "42% 50%" }} />
        <div className="absolute inset-0" style={{ background: "rgba(8,18,32,0.62)" }} />

        <div className="absolute start-0 end-0 flex justify-center" style={{ top: "17mm" }}>
          <img src="/brand/logo-lockup.png" alt="" style={{ width: "78mm" }} />
        </div>

        <div
          className="absolute text-center"
          style={{ top: "66mm", insetInlineStart: "17mm", insetInlineEnd: "17mm", height: "116mm", borderRadius: "9mm", border: "0.5mm solid rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.13)" }}
        >
          <div className="absolute" style={{ inset: "3mm", borderRadius: "6.5mm", border: "0.25mm solid rgba(240,216,148,0.5)" }} />
          <CornerField tone="cream" corner="tr" opacity={0.16} size={70} className="absolute" style={{ top: 0, insetInlineEnd: 0, width: "60mm", height: "60mm", borderStartEndRadius: "9mm" }} />
          <div className="relative flex h-full flex-col items-center justify-center px-[14mm]">
            <h1 className={`font-display ${en ? "text-[31px]" : "text-[54px]"} font-bold leading-[1.45] text-white`} style={{ maxWidth: en ? "120mm" : undefined }}>
              {en ? "Understanding that runs ahead of opinion" : "فهمٌ يُسابق الرأْي"}
            </h1>
            <div className="my-[6mm] h-px w-[26mm]" style={{ background: "#f0d894" }} />
            <p className="text-[13px] font-bold tracking-wide" style={{ color: "#f6e2b3" }} dir={en ? "rtl" : "ltr"}>
              {en ? "فهمٌ يُسابق الرأْي" : "Understanding that runs ahead of opinion"}
            </p>
            <p className="mt-4 text-[12.5px] leading-8 text-white/85" style={{ maxWidth: "118mm" }}>
              {en ? firmEn.tagline : firm.tagline}
            </p>
          </div>
        </div>

        {/* the mark, floating below the pane */}
        <div className="absolute flex justify-center" style={{ top: "194mm", insetInlineStart: 0, insetInlineEnd: 0 }}>
          <div className="flex items-center justify-center" style={{ width: "24mm", height: "24mm", borderRadius: "50%", border: "0.4mm solid rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.18)" }}>
            <img src="/brand/logo-mark.png" alt="" style={{ width: "11mm" }} />
          </div>
        </div>

        <div className="absolute flex justify-center gap-3" style={{ bottom: "44mm", insetInlineStart: "24mm", insetInlineEnd: "24mm" }}>
          {[`${t.license} ${firm.licenseNumber}`, `${t.unified} ${firm.unifiedNumber}`].map((x) => (
            <span key={x} className="rounded-full border px-4 py-1.5 text-[9.5px] text-white" style={{ borderColor: "rgba(240,216,148,0.65)", background: "rgba(8,18,32,0.4)" }}>
              {x}
            </span>
          ))}
        </div>
        <div className="absolute bottom-[14mm] start-0 end-0 text-center">
          <p className="font-display text-[17px] font-bold tracking-[0.3em]" style={{ color: "#f0d894" }}>{t.cover}</p>
          <p className="mt-2 text-[10px] tracking-[0.2em] text-white/70">
            {en ? firmEn.city : firm.city}
          </p>
        </div>
      </Sheet>

      {/* 2 — About */}
      <Sheet num={2} locale={locale}>
        <div className="px-[16mm] pt-[16mm]">
          <PageHead e={t.aboutE} h={t.aboutH} locale={locale} />
          <p className="font-display mt-[12mm] text-[22px] font-bold leading-[1.7] text-[#0a1420]">
            {en ? firmEn.tagline : firm.tagline}
          </p>
          <p className="mt-4 text-[13.5px] leading-[2.1] text-[#2a3849]">
            {en
              ? firmEn.description
              : `يقدّم ${firm.nameShortAr} للمحاماة والاستشارات القانونية خدمات قانونية مركّزة للمسائل التي تتطلب دقة في التحليل، وجودة في الصياغة، وانضباطًا في إدارة الملف حتى الوصول إلى أثر عملي.`}
          </p>

          <h3 className={`font-display ${en ? "mt-[8mm]" : "mt-[14mm]"} text-[15px] font-bold text-gold-text`}>{t.principlesH}</h3>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {principles[locale].map((p) => (
              <div key={p.n} className={`${card} px-5 py-7 text-center`} style={cardStyle}>
                <span
                  className="font-display text-[40px] font-extrabold leading-none"
                  style={{ color: "rgba(201,154,60,0.5)" }}
                >
                  {p.n}
                </span>
                <h4 className="font-display mt-3 text-[12px] font-bold leading-[1.6] text-[#0a1420]">{p.title}</h4>
                <p className="mt-2 text-[10.5px] leading-[1.9] text-[#2a3849]/85">{p.body}</p>
              </div>
            ))}
          </div>

          <div className={`${en ? "mt-[8mm]" : "mt-[14mm]"} grid grid-cols-4 gap-3`}>
            {[
              { v: corePillars.length, l: en ? "core pillars" : "محاور أساسية" },
              { v: specializedLines.length, l: en ? "practice lines" : "خط ممارسة متخصص" },
              { v: matterMethod.length, l: en ? "step method" : "خطوات في المنهج" },
              { v: deliverables.length, l: en ? "deliverables" : "مخرجات تفصيلية" },
            ].map((x) => (
              <div key={x.l} className={`${card} px-3 py-6 text-center`} style={cardStyle}>
                <span
                  className="font-display text-[42px] font-extrabold leading-none"
                  style={{ color: "rgba(201,154,60,0.5)" }}
                >
                  {x.v}
                </span>
                <p className="mt-2 text-[10px] font-bold text-[#2a3849]">{x.l}</p>
              </div>
            ))}
          </div>

          <h3 className={`font-display ${en ? "mt-[8mm]" : "mt-[14mm]"} text-[15px] font-bold text-gold-text`}>{en ? "The client journey" : "رحلة العميل"}</h3>
          <div className="mt-4 flex items-stretch gap-2">
            {corePillars.map((p, i) => (
              <div key={p.slug} className="flex-1 rounded-[12px] px-2 py-4 text-center" style={{ background: i % 2 ? "#12233a" : "#d0a751", color: i % 2 ? "#fff" : "#0a1420" }}>
                <p className="text-[8.5px] font-bold opacity-80">0{i + 1}</p>
                <p className="font-display mt-1 text-[10.5px] font-bold leading-[1.5]">{p.stage}</p>
              </div>
            ))}
          </div>

          <div className={`${en ? "mt-[8mm]" : "mt-[14mm]"} grid grid-cols-3 gap-4`}>
            {[
              { l: t.license, v: firm.licenseNumber },
              { l: t.unified, v: firm.unifiedNumber },
              { l: t.address, v: en ? firm.addressEn : firm.address },
            ].map((f) => (
              <div key={f.l} className="rounded-[14px] px-4 py-5 text-center" style={{ background: "#12233a" }}>
                <p className="text-[9px] tracking-wide text-[#e6c988]">{f.l}</p>
                <p className="font-display mt-1 text-[14px] font-bold text-white">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* 3 — Core services */}
      <Sheet num={3} locale={locale}>
        <div className="px-[16mm] pt-[16mm]">
          <PageHead e={t.servicesE} h={t.servicesH} locale={locale} />
          <p className="mt-4 text-[12px] leading-[1.9] text-[#2a3849]">{t.servicesP}</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {corePillars.map((p, i) => (
              <div key={p.slug} className={`${card} overflow-hidden`} style={cardStyle}>
                <div className="relative" style={{ height: "19mm" }}>
                  <img src={`/services/${p.slug}.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="absolute inset-0" style={{ background: "rgba(8,18,32,0.55)" }} />
                  <span className="absolute start-3 top-2 rounded-full px-3 py-0.5 text-[9.5px] font-bold" style={{ background: "rgba(240,216,148,0.95)", color: "#0a1420" }}>{p.stage}</span>
                  <span className="font-display absolute end-3 top-1 text-[26px] font-extrabold leading-none text-white">0{i + 1}</span>
                </div>
                <div className="px-5 pb-4 pt-3">
                  <h3 className="font-display text-[14px] font-bold leading-[1.6] text-[#0a1420]">{en ? p.titleEn : p.title}</h3>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-gold-text">{en ? p.title : p.titleEn}</p>
                  <ul className="mt-2.5 space-y-1 text-[11px] leading-[1.6] text-[#2a3849]">
                    {p.items.map((it) => (
                      <li key={it.titleEn} className="flex gap-2">
                        <span style={{ color: "#806223" }}>—</span>
                        <span>{en ? it.titleEn : it.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* 4 — Practice lines */}
      <Sheet num={4} locale={locale}>
        <div className="px-[16mm] pt-[16mm]">
          <PageHead e={t.linesE} h={t.linesH} locale={locale} />
          <div className="mt-5 space-y-5">
            {axisOrder.map((slug) => {
              const axis = corePillars.find((p) => p.slug === slug)!;
              const lines = specializedLines.filter((l) => lineAxis[l.slug] === slug);
              return (
                <div key={slug}>
                  <h3 className="font-display text-[13px] font-bold text-gold-text">
                    {en ? axis.titleEn : axis.title}
                  </h3>
                  <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                    {lines.map((l) => (
                      <div key={l.slug} className={`${card} px-3 py-2.5`} style={cardStyle}>
                        <p className="font-display text-[11.5px] font-bold leading-[1.6] text-[#0a1420]">{en ? l.titleEn : l.title}</p>
                        <p className="mt-0.5 text-[9px] uppercase tracking-wide text-gold-text">{en ? l.title : l.titleEn}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Sheet>

      {/* 5 — Method, deliverables, standard */}
      <Sheet num={5} locale={locale}>
        <div className="px-[16mm] pt-[16mm]">
          <PageHead e={t.methodE} h={t.methodH} locale={locale} />
          <div className="mt-6 grid grid-cols-3 gap-4">
            {matterMethod.map((s) => (
              <div key={s.step} className={`${card} px-3 py-6 text-center`} style={cardStyle}>
                <span
                  className="font-display text-[36px] font-extrabold leading-none"
                  style={{ color: "rgba(201,154,60,0.5)" }}
                >
                  {s.step}
                </span>
                <p className="font-display mt-2 text-[12.5px] font-bold text-[#0a1420]">{en ? s.title : s.titleAr}</p>
                <p className="text-[8.5px] font-bold uppercase tracking-wide text-gold-text">{en ? s.titleAr : s.title}</p>
              </div>
            ))}
          </div>

          <h3 className="font-display mt-[13mm] text-[15px] font-bold text-gold-text">{t.deliverablesH}</h3>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {deliverables.map((d) => (
              <div key={d.title} className={`${card} px-2 py-5 text-center`} style={cardStyle}>
                <p className="font-display text-[11.5px] font-bold leading-[1.5] text-[#0a1420]">{en ? d.titleEn : d.title}</p>
                <p className="text-[8px] uppercase tracking-wide text-gold-text">{en ? d.title : d.titleEn}</p>
              </div>
            ))}
          </div>

          <h3 className="font-display mt-[13mm] text-[15px] font-bold text-gold-text">{t.standardH}</h3>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {standard.map((s) => (
              <div key={s.title} className={`${card} px-4 py-6 text-center`} style={cardStyle}>
                <h4 className="font-display text-[12.5px] font-bold text-[#0a1420]">{s.title}</h4>
                <p className="mt-2 text-[10.5px] leading-[1.9] text-[#2a3849]/85">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* 6 — Leadership */}
      <Sheet num={6} locale={locale}>
        <div className="px-[16mm] pt-[16mm]">
          <PageHead e={t.leadE} h={t.leadH} locale={locale} />
          <div className="mt-6 grid gap-6" style={{ gridTemplateColumns: "56mm 1fr" }}>
            <div>
              <img
                src="/brand/attorney-turki.jpg"
                alt=""
                style={{ width: "56mm", height: "70mm", objectFit: "cover", objectPosition: "top", borderRadius: 14, border: "1px solid rgba(208,167,81,0.6)" }}
              />
              <h3 className="font-display mt-4 text-[17px] font-bold text-[#0a1420]">{attorney.name}</h3>
              <p className="mt-1 text-[10px] font-bold leading-[1.7] text-gold-text">{attorney.role}</p>
            </div>
            <div className="space-y-3">
              {attorney.bio.map((p, i) => (
                <p key={i} className={`leading-[1.95] text-[#2a3849] ${i === 0 ? "font-display text-[13.5px] font-bold text-[#0a1420]" : "text-[11.2px]"}`}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <h3 className="font-display mt-[6mm] text-[15px] font-bold text-gold-text">{t.credH}</h3>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {attorney.credentials.map((c) => (
              <div key={c.title} className={`${card} px-4 py-3`} style={cardStyle}>
                <h4 className="font-display text-[11.5px] font-bold text-[#0a1420]">{c.title}</h4>
                <p className="mt-1 text-[10px] leading-[1.7] text-[#2a3849]/80">{c.body}</p>
              </div>
            ))}
          </div>

          <h3 className="font-display mt-[6mm] text-[15px] font-bold text-gold-text">{en ? "Practice areas" : "مجالات الممارسة"}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {attorney.practiceAreas.map((a) => (
              <span key={a.label} className="rounded-full border px-4 py-1.5 text-[11px] font-bold text-[#2a3849]" style={{ borderColor: "rgba(208,167,81,0.55)", background: "rgba(255,255,255,0.7)" }}>
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </Sheet>

      {/* 7 — Accreditations */}
      <Sheet dark num={7} locale={locale}>
        <img src="/brand/riyadh-skyline.jpg" alt="" className="absolute inset-0" style={{ width: "210mm", height: "296.5mm", objectFit: "cover", objectPosition: "50% 50%" }} />
        <div className="absolute inset-0" style={{ background: "rgba(8,18,32,0.68)" }} />
        <div className="relative px-[16mm] pt-[18mm] text-center">
          <span className="mx-auto block h-[0.8mm] w-[14mm]" style={{ background: "#e6c988" }} />
          <h2 className="font-display mt-4 text-[34px] font-bold text-white">{en ? "Accreditations & Licences" : "الاعتمادات والتراخيص"}</h2>
          <p className="mx-auto mt-2 text-[11.5px] leading-7 text-white/75" style={{ maxWidth: "120mm" }}>
            {en ? "Official licences and accreditations in advocacy, advice and arbitration." : "تراخيص واعتمادات رسمية في الترافع والاستشارة والتحكيم."}
          </p>
          <div className="mt-[9mm] grid grid-cols-3 gap-3.5">
            {accreditations.map((a) => (
              <div key={a.key} className="flex flex-col items-center rounded-[12px] px-3 py-5 text-center" style={{ background: "rgba(255,255,255,0.93)" }}>
                <div className="flex items-center justify-center" style={{ height: "18mm" }}>
                  {a.logos?.map((l) => (
                    <img key={l.src} src={l.src} alt="" style={{ height: "12mm", maxWidth: "100%", width: "auto", objectFit: "contain" }} />
                  ))}
                </div>
                <span className="mt-3 block h-px w-[8mm]" style={{ background: "#d0a751" }} />
                <h3 className="font-display mt-3 text-[10.5px] font-bold leading-[1.75] text-[#0a1420]">{a[locale].title}</h3>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* 7 — Contact */}
      <Sheet dark num={8} locale={locale} last>
        <img src="/brand/riyadh-kafd.jpg" alt="" className="absolute inset-0" style={{ width: "210mm", height: "296.5mm", objectFit: "cover", objectPosition: "50% 40%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,18,32,0.78) 0%, rgba(8,18,32,0.9) 60%, rgba(8,18,32,0.96) 100%)" }} />
        <div className="absolute inset-[9mm] rounded-[6px] border" style={{ borderColor: "rgba(208,167,81,0.45)" }} />
        <div className="relative px-[20mm] pt-[20mm] text-center">
          <img src="/brand/logo-lockup.png" alt="" style={{ width: "62mm", margin: "0 auto" }} />
          <p className="mt-[12mm] text-[10px] font-bold uppercase tracking-[0.3em] text-[#d0a751]">{t.contactE}</p>
          <h2 className="font-display mt-2 text-[34px] font-bold leading-[1.5] text-white">{t.contactH}</h2>
          <p className="mx-auto mt-3 text-[12px] leading-[2] text-white/65" style={{ maxWidth: "130mm" }}>
            {t.contactP}
          </p>

          <div className="mt-[10mm] grid grid-cols-2 gap-3.5 text-start">
            {[
              { l: t.phone, v: firm.phoneDisplay, ltr: true },
              { l: t.whatsapp, v: firm.phoneDisplay, ltr: true },
              { l: t.email, v: firm.email, ltr: true },
              { l: t.web, v: firm.domain, ltr: true },
            ].map((c) => (
              <div key={c.l} className="rounded-[14px] border px-5 py-4" style={{ borderColor: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.07)" }}>
                <p className="text-[9px] uppercase tracking-wide text-[#e6c988]">{c.l}</p>
                <p className="font-display mt-1 text-[13px] font-bold text-white" dir="ltr" style={{ textAlign: en ? "left" : "right" }}>
                  {c.v}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-[14px] border px-4 py-3 text-start" style={{ borderColor: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.07)" }}>
            <p className="text-[9px] uppercase tracking-wide text-[#e6c988]">{t.address}</p>
            <p className="font-display mt-1 text-[13px] font-bold text-white">
              {en ? firm.addressEn : firm.address} · <span dir="ltr">{firm.plusCode}</span>
            </p>
          </div>

          <div className="mt-[9mm] flex items-center justify-center gap-6">
            <div className="rounded-[14px] bg-white p-3">
              <div style={{ width: "36mm", height: "36mm" }} dangerouslySetInnerHTML={{ __html: qr.replace("<svg", '<svg style="width:100%;height:100%"') }} />
            </div>
            <p className="text-[10.5px] leading-[1.9] text-white/70" style={{ maxWidth: "50mm", textAlign: en ? "left" : "right" }}>
              {t.scan}
            </p>
          </div>

          <p className="mt-[9mm] text-[9px] uppercase tracking-[0.22em] text-white/50">{t.regulators}</p>
          <div className="mx-auto mt-3 flex items-center justify-center gap-10 rounded-[14px] bg-white px-8 py-4" style={{ width: "fit-content" }}>
            {regulatorLogos.map((l) => (
              <img key={l.src} src={l.src} alt="" style={{ height: l.h, maxWidth: "40mm", width: "auto", objectFit: "contain" }} />
            ))}
          </div>

          <p className="mt-[8mm] whitespace-nowrap text-[9.5px] leading-[1.9] text-white/50">
            {t.license} {firm.licenseNumber} · {t.unified} {firm.unifiedNumber}
          </p>
        </div>
      </Sheet>
    </div>
  );
}
