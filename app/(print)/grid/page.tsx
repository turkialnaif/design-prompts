import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import QRCode from "qrcode";
import { firm } from "@/lib/site";

/**
 * The Instagram grid (development only): nine tiles that are also one picture. The picture is the firm's mark drawn at the scale of the whole
 * grid: two brass lintels across the top and the bottom, three pillars between them (one per column of tiles), the middle pillar in bone.
 * The board is symmetric on purpose, so the picture reads the same whether the viewer's grid runs left to right or right to left.
 * Tile order below is the Arabic reading order (right to left); the PNGs are cut from this one board by the script in /tmp (kept in docs/instagram).
 */
const cairo = Cairo({ subsets: ["arabic"], weight: ["700", "800", "900"], display: "swap" });
const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap" });

const INK = "#00061d";
const NAVY = "#00124a";
const BONE = "#f4efe4";
const BRASS = "#c4a04e";
const BRASS_DEEP = "#8a6d25";
const TW = 1080;
const TH = 1440;
const COLX = (c: number) => (2 - c) * TW; // c = 0 is the right-hand column (Arabic reading order)

const kicker = (color: string): CSSProperties => ({ margin: 0, fontSize: 34, fontWeight: 600, color, letterSpacing: 0 });

function Tile({ r, c, children, tone = "navy", justify = "center", zoom = 1.34 }: { r: number; c: number; children: ReactNode; tone?: "navy" | "bone"; justify?: CSSProperties["justifyContent"]; zoom?: number }) {
  const bone = tone === "bone";
  return (
    <div
      className={plex.className}
      style={{
        position: "absolute",
        left: COLX(c) + 90,
        top: r * TH + (r === 0 ? 440 : 0),
        width: 900,
        height: r === 0 ? TH - 440 : r === 2 ? TH - 240 : TH,
        padding: r === 0 ? "0 70px" : "0 70px",
        display: "flex",
        flexDirection: "column",
        justifyContent: justify,
        color: bone ? NAVY : "#fff",
        textAlign: "right",
      }}
    >
      {/* the type is drawn at 1x and scaled up as one block, so every tile keeps its proportions */}
      <div style={{ zoom }}>{children}</div>
    </div>
  );
}

const H = ({ children, size = 104, color = "#fff", mt = 0 }: { children: ReactNode; size?: number; color?: string; mt?: number }) => (
  <h2 className={cairo.className} style={{ margin: `${mt}px 0 0`, fontSize: size, fontWeight: 900, lineHeight: 1.14, color }}>{children}</h2>
);

const P = ({ children, size = 44, color = "rgba(255,255,255,0.88)", mt = 0, w = 500 }: { children: ReactNode; size?: number; color?: string; mt?: number; w?: number }) => (
  <p style={{ margin: `${mt}px 0 0`, fontSize: size, lineHeight: 1.62, fontWeight: w, color }}>{children}</p>
);

const Rule = ({ color = "rgba(196,160,78,0.55)", mt = 38 }: { color?: string; mt?: number }) => <div style={{ height: 3, width: 120, background: color, marginTop: mt, marginInlineStart: "auto" }} />;

export default async function Grid() {
  if (process.env.NODE_ENV === "production") notFound();
  const qr = await QRCode.toString(`${firm.website}/contact?utm_source=instagram&utm_medium=grid&utm_campaign=profile`, { type: "svg", margin: 0, color: { dark: NAVY, light: "#0000" } });
  const W = TW * 3;
  const Hh = TH * 3;
  const steps = [
    ["أرسل موجز مسألتك", "الأطراف، والوقائع الأساسية، والهدف."],
    ["نحدد النطاق والمخرجات", "نرد خلال يوم عمل باقتراح واضح."],
    ["نبدأ العمل", "برأي أو صياغة أو تفاوض أو ترافع."],
  ];
  const qs = ["من الأطراف، وهل لهم صفة التوقيع؟", "ما التزام كل طرف، ومتى؟", "ما المدد والغرامات؟", "كيف يُنهى العقد؟", "قضاءٌ أم تحكيم؟"];
  return (
    <main style={{ margin: 0 }}>
      <style>{`nextjs-portal { display: none !important; } html, body { margin: 0; padding: 0; background: ${INK}; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }`}</style>
      <div style={{ position: "relative", width: W, height: Hh, background: INK, overflow: "hidden" }} dir="rtl">
        {/* the picture: lintels, pillars, base */}
        <div style={{ position: "absolute", left: 0, top: 70, width: W, height: 170, background: BRASS }} />
        <div style={{ position: "absolute", left: 270, top: 268, width: W - 540, height: 112, background: BRASS }} />
        {[0, 1, 2].map((c) => (
          <div key={c} style={{ position: "absolute", left: COLX(c) + 90, top: 410, width: 900, height: Hh - 410 - 150, background: c === 1 ? BONE : NAVY }} />
        ))}
        <div style={{ position: "absolute", left: 270, top: Hh - 150, width: W - 540, height: 62, background: BRASS }} />
        <div style={{ position: "absolute", left: 0, top: Hh - 70, width: W, height: 70, background: BRASS }} />

        {/* on the top lintel */}
        <div className={plex.className} dir="ltr" style={{ position: "absolute", left: 0, top: 70, width: W, height: 170, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 110px", fontSize: 40, fontWeight: 600, letterSpacing: "0.5em", color: INK }}>
          <span>TURKI ALNAIF &amp; PARTNERS</span>
          <span>RIYADH</span>
        </div>

        {/* ---- row 1 ---- */}
        <Tile r={0} c={0}>
          <p style={kicker(BRASS)}>من نحن</p>
          <H mt={22}>مكتب محاماة في الرياض</H>
          <Rule />
          <P mt={36}>نخدم الشركات والمستثمرين ورواد الأعمال، ونكتب لكل مسألة ما يلزمها: رأيًا أو عقدًا أو مرافعة.</P>
        </Tile>
        <Tile r={0} c={1} tone="bone" justify="center">
          <div style={{ display: "flex", justifyContent: "center", marginTop: -70 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/profile/lockup-navy.png" alt="" style={{ width: 660, height: "auto" }} />
          </div>
          <div style={{ height: 3, width: 120, background: BRASS_DEEP, margin: "56px auto 0" }} />
          <P mt={36} color={BRASS_DEEP} size={46} w={600}><span style={{ display: "block", textAlign: "center" }}>استشارات قانونية للشركات</span></P>
        </Tile>
        <Tile r={0} c={2}>
          <p style={kicker(BRASS)}>ما نقدّمه</p>
          <H mt={22} size={96}>أربعة أبواب</H>
          <Rule />
          <div style={{ marginTop: 34 }}>
            {["العقود التجارية", "الشركات والشراكات", "التحكيم وتسوية المنازعات", "الامتثال والحوكمة"].map((t, i) => (
              <div key={t} style={{ display: "flex", alignItems: "baseline", gap: 24, padding: "20px 0", borderTop: "2px solid rgba(196,160,78,0.4)", fontSize: 46, fontWeight: 600 }}>
                <span style={{ fontSize: 34, color: BRASS, width: 44, flex: "none" }}>{i + 1}</span>
                {t}
              </div>
            ))}
          </div>
        </Tile>

        {/* ---- row 2 ---- */}
        <Tile r={1} c={0} justify="center">
          <p style={kicker(BRASS)}>قبل أن توقّع</p>
          <div className={cairo.className} style={{ display: "flex", alignItems: "baseline", gap: 26, justifyContent: "flex-start", marginTop: 10 }}>
            <span style={{ fontSize: 230, fontWeight: 900, lineHeight: 1, color: BRASS }}>5</span>
            <span style={{ fontSize: 110, fontWeight: 900, color: "#fff" }}>أسئلة</span>
          </div>
          <div style={{ marginTop: 26 }}>
            {qs.map((q) => (
              <div key={q} style={{ padding: "13px 0", borderTop: "2px solid rgba(196,160,78,0.35)", fontSize: 40, fontWeight: 500 }}>{q}</div>
            ))}
          </div>
        </Tile>
        <Tile r={1} c={1} tone="bone" justify="center" zoom={1.3}>
          <p style={kicker(BRASS_DEEP)}>قاعدة نعمل بها</p>
          <H mt={26} size={74} color={NAVY}><span style={{ whiteSpace: "nowrap" }}>العقد الجيد</span><br /><span style={{ whiteSpace: "nowrap" }}>يُكتب لأسوأ يوم،</span><br /><span style={{ whiteSpace: "nowrap" }}>لا لأفضل يوم.</span></H>
          <Rule color={BRASS_DEEP} mt={44} />
        </Tile>
        <Tile r={1} c={2} justify="center">
          <p style={kicker(BRASS)}>كيف نبدأ</p>
          <H mt={22} size={96}>ثلاث خطوات</H>
          <Rule />
          <div style={{ marginTop: 28 }}>
            {steps.map(([t, d], i) => (
              <div key={t} style={{ display: "flex", gap: 30, padding: "24px 0", borderTop: "2px solid rgba(196,160,78,0.4)" }}>
                <span className={cairo.className} style={{ fontSize: 76, fontWeight: 900, color: BRASS, lineHeight: 1, width: 66, flex: "none" }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 46, fontWeight: 700 }}>{t}</div>
                  <div style={{ fontSize: 36, fontWeight: 400, color: "rgba(255,255,255,0.78)", marginTop: 6 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </Tile>

        {/* ---- row 3 ---- */}
        <Tile r={2} c={0} justify="center">
          <p style={kicker(BRASS)}>نصيحة</p>
          <H mt={22} size={96}>ثلاثة أشياء تُراجَع قبل أي توقيع</H>
          <Rule />
          <div style={{ marginTop: 32 }}>
            {["الأطراف وصفاتهم", "المدد والغرامات", "إنهاء العقد وما يترتب عليه"].map((t) => (
              <div key={t} style={{ padding: "18px 0", borderTop: "2px solid rgba(196,160,78,0.4)", fontSize: 44, fontWeight: 600 }}>{t}</div>
            ))}
          </div>
        </Tile>
        <Tile r={2} c={1} tone="bone" justify="center" zoom={1.2}>
          <p style={kicker(BRASS_DEEP)}>تواصل معنا</p>
          <H mt={22} size={88} color={NAVY}>أرسل موجز<br />مسألتك</H>
          <Rule color={BRASS_DEEP} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 36, marginTop: 40 }} dir="ltr">
            <div style={{ width: 240, height: 240, flex: "none" }} dangerouslySetInnerHTML={{ __html: qr.replace("<svg", '<svg style="width:100%;height:100%"') }} />
            <div style={{ fontSize: 36, lineHeight: 1.9, color: NAVY, fontWeight: 500, textAlign: "left", whiteSpace: "nowrap" }}>
              <div>+966 56 677 0888</div>
              <div>info@taap.sa</div>
              <div>taap.sa</div>
            </div>
          </div>
          <P mt={36} size={34} color={BRASS_DEEP} w={600}>الأحد – الخميس ٨ ص – ٥ م<br />السبت ١٠ ص – ٢ م</P>
        </Tile>
        <Tile r={2} c={2} justify="center">
          <p style={kicker(BRASS)}>المقر</p>
          <H mt={22} size={96}>الرياض · حي الياسمين</H>
          <Rule />
          <P mt={34} size={44}>الدور الأول · مكتب 14<br />طريق أبي بكر الصديق الفرعي<br />الرياض 13326</P>
          <P mt={34} size={34} color={BRASS} w={600}>رخصة مزاولة المحاماة رقم {firm.licenseNumber}</P>
        </Tile>
      </div>
    </main>
  );
}
