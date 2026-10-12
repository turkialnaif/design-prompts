import type { CSSProperties, ReactNode } from "react";
import { Amiri, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { tips, type Tip } from "./data";

const cairo = Cairo({ subsets: ["arabic"], weight: ["700", "800", "900"], display: "swap" });
const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], display: "swap" });

export const INK = "#00061d";
export const NAVY = "#00124a";
export const BONE = "#f4efe4";
export const BRASS = "#c4a04e";
export const BRASS_DEEP = "#8a6d25";
const MARK = "#a63d2b"; // the proofreader's red, used only for what is struck out
export const W = 1080;
export const H = 1440;
const PAD = 72;

const ar = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

type Tone = "bone" | "ink";
const toneOf = (n: number): Tone => (n % 2 === 1 ? "bone" : "ink");

function palette(tone: Tone) {
  const bone = tone === "bone";
  return {
    bg: bone ? BONE : INK,
    text: bone ? NAVY : "#ffffff",
    soft: bone ? "rgba(0,18,74,0.74)" : "rgba(255,255,255,0.8)",
    accent: bone ? BRASS_DEEP : BRASS,
    line: bone ? "rgba(0,18,74,0.16)" : "rgba(196,160,78,0.4)",
    paper: bone ? "#fffdf7" : BONE,
    lockup: bone ? "/brand/profile/lockup-navy.png" : "/brand/profile/lockup-bone.png",
  };
}

function Frame({ tip, slide, children, cue }: { tip: Tip; slide: 1 | 2 | 3; children: ReactNode; cue?: boolean }) {
  const p = palette(toneOf(tip.n));
  return (
    <div className={plex.className} dir="rtl" style={{ position: "relative", width: W, height: H, background: p.bg, color: p.text, overflow: "hidden" }}>
      {/* top: the series on the right, the number on the left */}
      <div style={{ position: "absolute", top: 60, right: PAD, left: PAD, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30, fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: p.accent }}>
          <span style={{ width: 16, height: 16, background: BRASS, display: "inline-block" }} />
          على الهامش
        </div>
        <div style={{ color: p.soft, fontWeight: 500 }}>نصيحة {"٠" + ar(tip.n)} من ٠٩</div>
      </div>

      {children}

      {/* bottom: the firm on the right, where to look next on the left */}
      <div style={{ position: "absolute", bottom: 52, right: PAD, left: PAD, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.lockup} alt="" style={{ width: 300, height: "auto" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 30, fontWeight: 600, color: p.accent }}>
          {cue ? <span>اسحب للتفاصيل ←</span> : null}
          <span style={{ display: "flex", gap: 10 }} dir="ltr">
            {[3, 2, 1].map((i) => (
              <span key={i} style={{ width: 14, height: 14, borderRadius: 14, background: i === slide ? BRASS : p.line }} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

const Label = ({ children, color }: { children: ReactNode; color: string }) => (
  <div style={{ fontSize: 28, fontWeight: 700, color, letterSpacing: 0 }}>{children}</div>
);

export function Cover({ tip }: { tip: Tip }) {
  const p = palette(toneOf(tip.n));
  const longest = Math.max(tip.hook[0].length, tip.hook[1].length);
  const size = Math.min(104, Math.floor(920 / (0.535 * longest)));
  return (
    <Frame tip={tip} slide={1} cue>
      <div style={{ position: "absolute", top: 150, right: PAD, left: PAD, display: "flex", flexDirection: "column" }}>
        <h2 className={cairo.className} style={{ margin: 0, fontSize: size, fontWeight: 900, lineHeight: 1.22, whiteSpace: "nowrap" }}>
          <span style={{ display: "block", color: p.text }}>{tip.hook[0]}</span>
          <span style={{ display: "block", color: p.accent }}>{tip.hook[1]}</span>
        </h2>

        {/* the marked-up page */}
        <div
          style={{
            marginTop: 84,
            background: p.paper,
            color: NAVY,
            padding: "44px 48px 46px",
            boxShadow: toneOf(tip.n) === "bone" ? "0 0 0 2px rgba(0,18,74,0.1)" : "none",
          }}
        >
          {tip.kind === "markup" ? (
            <>
              <Label color={MARK}>− البند كما يصل غالبًا</Label>
              <p className={amiri.className} style={{ margin: "14px 0 0", fontSize: 50, lineHeight: 1.7, color: "rgba(0,18,74,0.62)" }}>
                <span style={{ backgroundImage: `linear-gradient(${MARK}, ${MARK})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 4px", backgroundPosition: "0 62%", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{tip.old}</span>
              </p>
              <div style={{ height: 2, background: "rgba(0,18,74,0.14)", margin: "28px 0 24px" }} />
              <Label color={BRASS_DEEP}>+ الصياغة الأوضح</Label>
              <p className={amiri.className} style={{ margin: "14px 0 0", fontSize: 50, lineHeight: 1.78, fontWeight: 700 }}>
                <span style={{ background: "rgba(196,160,78,0.42)", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone", padding: "2px 6px" }}>{tip.next}</span>
              </p>
            </>
          ) : (
            <>
              <Label color={BRASS_DEEP}>{tip.listTitle}</Label>
              <div style={{ marginTop: 14 }}>
                {tip.items!.map((t, i) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 28, padding: "20px 0", borderTop: i ? "2px solid rgba(0,18,74,0.12)" : "none", fontSize: 46, fontWeight: 600 }}>
                    <Check />
                    {t}
                  </div>
                ))}
              </div>
            </>
          )}
          <div style={{ marginTop: 22, fontSize: 24, fontWeight: 500, color: "rgba(0,18,74,0.5)" }}>{tip.kind === "markup" ? "صياغة توضيحية للتوعية" : "للتوعية العامة"}</div>
        </div>

        {/* the lawyer's note, hanging off the page */}
        <div
          style={{
            alignSelf: "flex-end",
            marginTop: -26,
            marginLeft: -6,
            width: 640,
            background: BRASS,
            color: INK,
            padding: "22px 30px 24px",
            fontSize: 31,
            lineHeight: 1.6,
            fontWeight: 500,
            position: "relative",
          }}
        >
          <b style={{ fontWeight: 700 }}>ملاحظة المحامي: </b>
          {tip.note}
        </div>
      </div>
    </Frame>
  );
}

function Check({ on = true, color = BRASS_DEEP, size = 46 }: { on?: boolean; color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" style={{ flex: "none" }}>
      <rect x="2" y="2" width="42" height="42" fill="none" stroke={color} strokeWidth="4" />
      {on ? <path d="M11 24 L20 33 L36 13" fill="none" stroke={color} strokeWidth="5" strokeLinecap="square" /> : null}
    </svg>
  );
}

export function Points({ tip }: { tip: Tip }) {
  const p = palette(toneOf(tip.n));
  return (
    <Frame tip={tip} slide={2}>
      <div style={{ position: "absolute", top: 150, right: PAD, left: PAD }}>
        <h2 className={cairo.className} style={{ margin: 0, fontSize: 74, fontWeight: 900, lineHeight: 1.24 }}>{tip.title}</h2>
        <div style={{ height: 4, width: 130, background: p.accent, marginTop: 36 }} />
      </div>
      <div style={{ position: "absolute", top: 410, bottom: 190, right: PAD, left: PAD, display: "flex", flexDirection: "column" }}>
        {tip.points.map(([t, d], i) => (
          <div key={t} style={{ flex: 1, display: "flex", gap: 36, borderTop: `2px solid ${p.line}`, alignItems: "center" }}>
            <span className={cairo.className} style={{ fontSize: 120, fontWeight: 900, lineHeight: 0.95, color: BRASS, width: 92, flex: "none" }}>{ar(i + 1)}</span>
            <div>
              <div className={cairo.className} style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.3 }}>{t}</div>
              <div style={{ fontSize: 40, lineHeight: 1.55, fontWeight: 400, color: p.soft, marginTop: 6 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function Checklist({ tip, qr }: { tip: Tip; qr: string }) {
  const p = palette(toneOf(tip.n));
  return (
    <Frame tip={tip} slide={3}>
      <div style={{ position: "absolute", top: 150, right: PAD, left: PAD }}>
        <h2 className={cairo.className} style={{ margin: 0, fontSize: 84, fontWeight: 900, lineHeight: 1.2 }}>قائمة التحقق</h2>
        <div style={{ height: 4, width: 130, background: p.accent, marginTop: 30 }} />
        <div style={{ marginTop: 26 }}>
          {tip.checks.map((c, i) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 28, padding: "28px 0", borderTop: i ? `2px solid ${p.line}` : "none", fontSize: 44, fontWeight: 600 }}>
              <Check color={p.accent} />
              {c}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 196, background: BRASS, color: INK, padding: "36px 44px 34px", display: "flex", gap: 38, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div className={cairo.className} style={{ fontSize: 50, fontWeight: 900, lineHeight: 1.25 }}>احفظ المنشور، وأرسله لمن يوقّع معك</div>
          <div style={{ fontSize: 32, lineHeight: 1.6, fontWeight: 500, marginTop: 14 }}>هل عقدك يحتاج مراجعة؟ أرسل موجز المسألة ونرد خلال يوم عمل.</div>
          <div dir="ltr" style={{ fontSize: 34, fontWeight: 700, marginTop: 12, textAlign: "right" }}>taap.sa</div>
        </div>
        <div style={{ background: BONE, padding: 14, width: 190, height: 190, flex: "none" }} dangerouslySetInnerHTML={{ __html: qr.replace("<svg", '<svg style="width:100%;height:100%"') }} />
      </div>
      <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 152, fontSize: 24, color: p.soft, fontWeight: 400 }}>معلومات عامة للتوعية وليست استشارة قانونية لحالتك.</div>
    </Frame>
  );
}

export const tipOf = (n: number) => tips.find((t) => t.n === n)!;
export const frameStyle: CSSProperties = { width: W, height: H };
