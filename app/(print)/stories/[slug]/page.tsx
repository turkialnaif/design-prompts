import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import QRCode from "qrcode";
import { firm } from "@/lib/site";

/**
 * Instagram stories (1080 x 1920) and highlight covers (development only). Same language as the grid: the mark drawn as a frame (lintels above,
 * a pillar of content, a base below). Stories keep the top 250 px and the bottom 340 px free of type (the app draws over them).
 */
const cairo = Cairo({ subsets: ["arabic"], weight: ["700", "800", "900"], display: "swap" });
const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap" });
const INK = "#00061d";
const NAVY = "#00124a";
const BONE = "#f4efe4";
const BRASS = "#c4a04e";
const BRASS_DEEP = "#8a6d25";

function Frame({ children, tone = "navy" }: { children: ReactNode; tone?: "navy" | "bone" }) {
  const bone = tone === "bone";
  return (
    <div dir="rtl" style={{ position: "relative", width: 1080, height: 1920, background: INK, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 70, width: 1080, height: 100, background: BRASS }} />
      <div style={{ position: "absolute", left: 130, top: 190, width: 820, height: 62, background: BRASS }} />
      <div className={plex.className} style={{ position: "absolute", left: 90, top: 280, width: 900, height: 1300, background: bone ? BONE : NAVY, color: bone ? NAVY : "#fff", textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px" }}>
        {children}
      </div>
      <div style={{ position: "absolute", left: 130, top: 1608, width: 820, height: 40, background: BRASS }} />
      <div style={{ position: "absolute", left: 0, top: 1676, width: 1080, height: 70, background: BRASS }} />
      <div dir="ltr" className={plex.className} style={{ position: "absolute", left: 0, top: 70, width: 1080, height: 100, display: "flex", alignItems: "center", padding: "0 56px", fontSize: 30, fontWeight: 600, letterSpacing: "0.5em", color: INK }}>TURKI ALNAIF &amp; PARTNERS</div>
    </div>
  );
}

const K = ({ children, bone = false }: { children: ReactNode; bone?: boolean }) => <p style={{ margin: 0, fontSize: 44, fontWeight: 600, color: bone ? BRASS_DEEP : BRASS }}>{children}</p>;
const H = ({ children, size = 150, color = "#fff", mt = 22 }: { children: ReactNode; size?: number; color?: string; mt?: number }) => (
  <h1 className={cairo.className} style={{ margin: `${mt}px 0 0`, fontSize: size, fontWeight: 900, lineHeight: 1.12, color }}>{children}</h1>
);
const Rule = ({ bone = false }: { bone?: boolean }) => <div style={{ width: 150, height: 4, background: bone ? BRASS_DEEP : BRASS, margin: "44px 0 0 auto" }} />;
const row = (bone = false): CSSProperties => ({ padding: "26px 0", borderTop: `3px solid ${bone ? "rgba(138,109,37,0.45)" : "rgba(196,160,78,0.4)"}` });

async function Story({ slug }: { slug: string }) {
  const qr = await QRCode.toString(`${firm.website}/contact?utm_source=instagram&utm_medium=story&utm_campaign=profile`, { type: "svg", margin: 0, color: { dark: NAVY, light: "#0000" } });
  if (slug === "s1")
    return (
      <Frame tone="bone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/profile/lockup-navy.png" alt="" style={{ width: 740, height: "auto", alignSelf: "center" }} />
        <div style={{ height: 4, width: 150, background: BRASS_DEEP, margin: "70px auto 0" }} />
        <H size={128} color={NAVY} mt={64}><span style={{ display: "block", textAlign: "center" }}>أهلًا بكم</span></H>
        <p style={{ margin: "26px 0 0", fontSize: 54, textAlign: "center", fontWeight: 500, color: BRASS_DEEP }}>مكتب محاماة في الرياض</p>
      </Frame>
    );
  if (slug === "s2")
    return (
      <Frame>
        <K>قبل أن توقّع</K>
        <div className={cairo.className} style={{ display: "flex", alignItems: "baseline", gap: 30, marginTop: 6 }}>
          <span style={{ fontSize: 300, fontWeight: 900, lineHeight: 1, color: BRASS }}>5</span>
          <span style={{ fontSize: 140, fontWeight: 900, color: "#fff" }}>أسئلة</span>
        </div>
        <div style={{ marginTop: 36 }}>
          {["من الأطراف، وهل لهم صفة التوقيع؟", "ما التزام كل طرف، ومتى؟", "ما المدد والغرامات؟", "كيف يُنهى العقد؟", "قضاءٌ أم تحكيم؟"].map((q) => (
            <div key={q} style={{ ...row(), fontSize: 50, fontWeight: 500 }}>{q}</div>
          ))}
        </div>
      </Frame>
    );
  if (slug === "s3")
    return (
      <Frame>
        <K>كيف نبدأ</K>
        <H size={140}>ثلاث خطوات</H>
        <Rule />
        <div style={{ marginTop: 40 }}>
          {[["أرسل موجز مسألتك", "الأطراف، والوقائع الأساسية، والهدف."], ["نحدد النطاق والمخرجات", "نرد خلال يوم عمل باقتراح واضح."], ["نبدأ العمل", "برأي أو صياغة أو تفاوض أو ترافع."]].map(([t, d], i) => (
            <div key={t} style={{ ...row(), display: "flex", gap: 36 }}>
              <span className={cairo.className} style={{ fontSize: 120, fontWeight: 900, lineHeight: 1, color: BRASS, width: 90, flex: "none" }}>{i + 1}</span>
              <div>
                <div style={{ fontSize: 58, fontWeight: 700 }}>{t}</div>
                <div style={{ fontSize: 42, fontWeight: 400, color: "rgba(255,255,255,0.78)", marginTop: 8 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </Frame>
    );
  if (slug === "s4")
    return (
      <Frame tone="bone">
        <K bone>تواصل معنا</K>
        <H size={130} color={NAVY}>أرسل موجز<br />مسألتك</H>
        <Rule bone />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
          <div style={{ width: 400, height: 400 }} dangerouslySetInnerHTML={{ __html: qr.replace("<svg", '<svg style="width:100%;height:100%"') }} />
        </div>
        <div dir="ltr" style={{ textAlign: "center", marginTop: 48, fontSize: 52, fontWeight: 600, lineHeight: 1.7, color: NAVY }}>
          <div>+966 56 677 0888</div>
          <div>taap.sa</div>
        </div>
      </Frame>
    );
  if (slug === "s5")
    return (
      <Frame>
        <K>ما نقدّمه</K>
        <H size={140}>أربعة أبواب</H>
        <Rule />
        <div style={{ marginTop: 40 }}>
          {["العقود التجارية", "الشركات والشراكات", "التحكيم وتسوية المنازعات", "الامتثال والحوكمة"].map((t, i) => (
            <div key={t} style={{ ...row(), display: "flex", alignItems: "baseline", gap: 34, fontSize: 62, fontWeight: 600 }}>
              <span className={cairo.className} style={{ fontSize: 64, color: BRASS, width: 60, flex: "none", fontWeight: 900 }}>{i + 1}</span>
              {t}
            </div>
          ))}
        </div>
      </Frame>
    );
  if (slug === "s6")
    return (
      <Frame tone="bone">
        <K bone>المقر</K>
        <H size={112} color={NAVY}><span style={{ whiteSpace: "nowrap" }}>الرياض</span><br /><span style={{ whiteSpace: "nowrap" }}>حي الياسمين</span></H>
        <Rule bone />
        <p style={{ margin: "48px 0 0", fontSize: 56, lineHeight: 1.7, fontWeight: 500, color: NAVY }}>الدور الأول · مكتب 14<br />طريق أبي بكر الصديق الفرعي<br />الرياض 13326</p>
        <p style={{ margin: "40px 0 0", fontSize: 44, lineHeight: 1.7, fontWeight: 600, color: BRASS_DEEP }}>الأحد – الخميس ٨ ص – ٥ م<br />السبت ١٠ ص – ٢ م</p>
      </Frame>
    );
  return null;
}

/** Highlight cover: 1080 x 1920, the circle that Instagram shows is the central 1080 x 1080 square, so the artwork lives inside a 760 px disc. */
function Cover({ slug }: { slug: string }) {
  const c: Record<string, { word: string; icon: ReactNode }> = {
    c1: { word: "نبذة", icon: <svg viewBox="150 190 420 340" height={180} aria-hidden><g fill={BRASS}><rect x="160" y="202" width="398" height="52" /><rect x="222" y="261" width="274" height="47" /><polygon points="264,315 320,315 320,455 264,517" /><polygon points="335,315 387,315 387,415 335,448" /><polygon points="403,315 450,315 450,400 403,409" /></g></svg> },
    c2: { word: "خدماتنا", icon: <svg viewBox="0 0 200 200" height={170} aria-hidden><g fill={BRASS}><rect x="14" y="20" width="76" height="76" /><rect x="110" y="20" width="76" height="76" /><rect x="14" y="116" width="76" height="68" /><rect x="110" y="116" width="76" height="68" /></g></svg> },
    c3: { word: "أسئلة", icon: <span className={cairo.className} style={{ fontSize: 200, fontWeight: 900, color: BRASS, lineHeight: 1 }}>5</span> },
    c4: { word: "ابدأ", icon: <svg viewBox="0 0 200 120" height={130} aria-hidden><path d="M184 60H24M70 16L22 60l48 44" fill="none" stroke={BRASS} strokeWidth="14" strokeLinecap="square" strokeLinejoin="miter" /></svg> },
    c5: { word: "تواصل", icon: <svg viewBox="0 0 200 200" height={170} aria-hidden><g fill="none" stroke={BRASS} strokeWidth="14"><rect x="20" y="40" width="160" height="120" /><path d="M20 40l80 70 80-70" /></g></svg> },
  };
  const d = c[slug];
  if (!d) return null;
  return (
    <div dir="rtl" style={{ position: "relative", width: 1080, height: 1920, background: INK, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 800, height: 800, borderRadius: "50%", background: NAVY, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 44, boxShadow: `inset 0 0 0 10px ${BRASS}` }}>
        {d.icon}
        <div className={cairo.className} style={{ fontSize: 150, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{d.word}</div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return ["s1", "s2", "s3", "s4", "s5", "s6", "c1", "c2", "c3", "c4", "c5"].map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  return (
    <main style={{ margin: 0 }}>
      <style>{`nextjs-portal { display: none !important; } html, body { margin: 0; padding: 0; background: ${INK}; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }`}</style>
      {slug.startsWith("c") ? <Cover slug={slug} /> : <Story slug={slug} />}
    </main>
  );
}
