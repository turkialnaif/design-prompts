"use client";

import { useEffect, useState } from "react";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";

/**
 * Snapchat stories (development only): seven vertical snaps, 1080 x 1920, each a pure function of time `t` so that frames can be rendered one by one
 * and encoded to MP4. Snap 1 is the hook, 2 to 6 are "true or false?" (guess, a countdown, then a stamp slams down and the truth appears),
 * snap 7 asks for the score and the contract. Safe zones: the top 210 px and the bottom 300 px are left clear for Snapchat's own interface.
 */
const cairo = Cairo({ subsets: ["arabic"], weight: ["700", "800", "900"], display: "swap" });
const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap" });

const INK = "#00061d";
const NAVY = "#00124a";
const BONE = "#f4efe4";
const BRASS = "#c4a04e";
const RED = "#ff5340";
const W = 1080;
const H = 1920;

export const durations = [3, 6.5, 8.5, 8.5, 8.5, 8.5, 8.5, 7];

type Myth = { claim: string; right: boolean; truth: string; tip: string };
const myths: Myth[] = [
  { claim: "العقد الشفهي لا قيمة له.", right: false, truth: "قد يكون الاتفاق الشفهي ملزمًا، لكن المشكلة في إثباته أمام من سيفصل في النزاع.", tip: "أكّد كل اتفاق ببريد قصير بعد الاجتماع." },
  { claim: "يمكن أن يتفق الطرفان في العقد على التحكيم بدل القضاء.", right: true, truth: "نعم، بشرط أن يكون الاتفاق واضحًا ومكتوبًا قبل نشوء النزاع.", tip: "حدّد المركز والمقر واللغة وعدد المحكّمين." },
  { claim: "إذا كتبنا غرامة في العقد، فسآخذها كاملة.", right: false, truth: "الغرامة المبالغ فيها قد تُخفَّض أمام القضاء.", tip: "اكتب نسبة لها مبرر، وسقفًا واضحًا." },
  { claim: "توقيع المدير يكفي دائمًا.", right: false, truth: "قد تكون صلاحية التوقيع مقيّدة بقيمة العقد أو بنوع التصرف.", tip: "اطلب المستند الذي يثبت الصفة قبل أن تتعاقد." },
  { claim: "العقد الذي يُعرض عليك ليس نهائيًا.", right: true, truth: "نعم. التفاوض على البنود حقّ لك، وليس إساءة أدب.", tip: "اقرأ كل بند، واطلب تعديل ما يختل فيه التوازن." },
];

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const outCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const outBack = (x: number) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);
const ar = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

function Top({ idx }: { idx: number }) {
  return (
    <div style={{ position: "absolute", top: 226, right: 72, left: 72, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/profile/lockup-bone.png" alt="" style={{ width: 250, height: "auto" }} />
      <div style={{ display: "flex", gap: 10 }} dir="ltr">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ width: 52, height: 10, background: i < idx ? BRASS : "rgba(255,255,255,0.22)", display: "inline-block" }} />
        ))}
      </div>
    </div>
  );
}

function Words({ text, t, start, step = 0.12, dur = 0.45, style }: { text: string; t: number; start: number; step?: number; dur?: number; style?: React.CSSProperties }) {
  return (
    <span style={style}>
      {text.split(" ").map((w, i) => {
        const p = outCubic(prog(t, start + i * step, start + i * step + dur));
        return (
          <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * 40}px)`, marginInlineStart: i ? "0.28em" : 0 }}>
            {w}
          </span>
        );
      })}
    </span>
  );
}

function Opener({ t }: { t: number }) {
  // three seconds: the brass line is drawn, the lockup rises onto it, the line under the name, and it all settles to ink for the first snap
  const line = outCubic(prog(t, 0.1, 0.75));
  const rise = outBack(prog(t, 0.45, 1.05));
  const tag = outCubic(prog(t, 1.25, 1.75));
  const out = 1 - outCubic(prog(t, 2.65, 3.0));
  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <div style={{ position: "absolute", top: 1040, right: 0, width: 1080 * line, height: 8, background: BRASS }} />
      <div style={{ position: "absolute", top: 640, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: clamp(rise * 2), transform: `translateY(${(1 - rise) * 120}px) scale(${0.88 + 0.12 * rise})` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/profile/lockup-bone.png" alt="" style={{ width: 800, height: "auto" }} />
      </div>
      <div className={cairo.className} style={{ position: "absolute", top: 1110, left: 0, right: 0, textAlign: "center", fontSize: 54, fontWeight: 800, color: BRASS, opacity: tag, transform: `translateY(${(1 - tag) * 36}px)` }}>
        استشارات قانونية للشركات
      </div>
      <div style={{ position: "absolute", top: 1200, left: 0, right: 0, textAlign: "center", fontSize: 34, fontWeight: 500, letterSpacing: 8, color: "rgba(255,255,255,0.65)", opacity: outCubic(prog(t, 1.6, 2.1)) }} dir="ltr">
        RIYADH
      </div>
    </div>
  );
}

function Intro({ t }: { t: number }) {
  const a = outCubic(prog(t, 0.1, 0.6));
  const slam = (s: number) => outBack(prog(t, s, s + 0.35));
  return (
    <>
      <Top idx={0} />
      <div style={{ position: "absolute", top: 520, right: 72, left: 72, opacity: a }}>
        <div className={cairo.className} style={{ fontSize: 44, fontWeight: 700, color: BRASS }}>اختبار سريع</div>
      </div>
      <div className={cairo.className} style={{ position: "absolute", top: 600, right: 72, left: 72, fontSize: 150, fontWeight: 900, lineHeight: 1.08, transformOrigin: "100% 50%", transform: `scale(${0.6 + 0.4 * slam(0.35)})`, opacity: clamp(slam(0.35) * 3) }}>
        صدّق أو
        <span style={{ display: "block", color: BRASS }}>لا تصدّق؟</span>
      </div>
      <div style={{ position: "absolute", top: 1010, right: 72, left: 72, fontSize: 54, lineHeight: 1.5, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
        <Words t={t} start={1.5} text="٥ معلومات قانونية شائعة. كم منها تصدّق؟" step={0.14} />
      </div>
      <div style={{ position: "absolute", top: 1290, right: 72, left: 72, display: "flex", gap: 18 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const p = outBack(prog(t, 2.9 + i * 0.35, 3.25 + i * 0.35));
          return (
            <div key={i} style={{ flex: 1, height: 130, border: `4px solid ${BRASS}`, background: p > 0.5 ? BRASS : "transparent", color: INK, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.4 + 0.6 * p})`, opacity: clamp(p * 2) }}>
              <span className={cairo.className} style={{ fontSize: 60, fontWeight: 900 }}>{"0" + (i + 1)}</span>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 1480, right: 72, left: 72, fontSize: 40, fontWeight: 600, color: "rgba(255,255,255,0.78)", opacity: outCubic(prog(t, 5, 5.5)) }}>
        خمّن في رأسك، ثم اضغط للتالي ←
      </div>
    </>
  );
}

function MythSnap({ i, t }: { i: number; t: number }) {
  const m = myths[i];
  const impact = 4.6;
  const sinceImpact = t - impact;
  const shake = sinceImpact > 0 && sinceImpact < 0.55 ? Math.sin(sinceImpact * 90) * 16 * (1 - sinceImpact / 0.55) : 0;
  const flash = sinceImpact > 0 && sinceImpact < 0.3 ? 0.45 * (1 - sinceImpact / 0.3) : 0;
  const stampP = outBack(prog(t, impact, impact + 0.28));
  const showStamp = t >= impact;
  const stampColor = m.right ? BRASS : RED;
  const ring = prog(t, 1.6, 4.6);
  const count = Math.max(1, 3 - Math.floor((t - 1.6) / 1));
  const countOpacity = t < 1.6 ? outCubic(prog(t, 1.3, 1.6)) : 1 - clamp((t - 4.5) / 0.2);
  const pulse = 1 + 0.035 * Math.sin(t * 7);
  const dim = t >= impact ? 1 - 0.45 * outCubic(prog(t, impact, impact + 0.4)) : 1;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.4}px)` }}>
      <Top idx={i + 1} />
      <div className={cairo.className} dir="ltr" style={{ position: "absolute", top: 1080, left: -30, fontSize: 720, fontWeight: 900, lineHeight: 1, color: "rgba(196,160,78,0.07)", letterSpacing: -20 }}>{"0" + (i + 1)}</div>
      <div className={cairo.className} style={{ position: "absolute", top: 400, right: 72, left: 72, fontSize: 46, fontWeight: 800, color: BRASS, opacity: outCubic(prog(t, 0.1, 0.5)), transform: `translateX(${(1 - outCubic(prog(t, 0.1, 0.5))) * 60}px)` }}>
        المعلومة {"٠" + ar(i + 1)} من ٠٥
      </div>

      <div style={{ position: "absolute", top: 480, right: 72, left: 72, background: BONE, color: NAVY, padding: "54px 56px 60px", borderRight: `16px solid ${BRASS}`, opacity: dim, transform: `scale(${0.97 + 0.03 * outCubic(prog(t, 0.2, 0.7))})`, transformOrigin: "50% 50%" }}>
        <div className={cairo.className} style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.3, textWrap: "balance" as never }}>
          <Words t={t} start={0.45} step={0.1} text={m.claim} />
        </div>
      </div>

      {/* guess: a countdown and the two answers */}
      <div style={{ position: "absolute", top: 1120, right: 72, left: 72, height: 330, opacity: countOpacity }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: 230, height: 230, transform: `scale(${pulse})` }}>
          <svg width="230" height="230" viewBox="0 0 230 230" style={{ transform: "rotate(-90deg) scaleY(-1)" }}>
            <circle cx="115" cy="115" r="100" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="14" />
            <circle cx="115" cy="115" r="100" fill="none" stroke={BRASS} strokeWidth="14" strokeDasharray={628} strokeDashoffset={628 * ring} strokeLinecap="butt" />
          </svg>
          <div className={cairo.className} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 118, fontWeight: 900, color: "#fff" }}>{ar(count)}</div>
        </div>
        <div style={{ position: "absolute", left: 0, top: 0, width: 690, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className={cairo.className} style={{ fontSize: 60, fontWeight: 900 }}>صح أم خطأ؟</div>
          <div style={{ display: "flex", gap: 22 }}>
            {["صح", "خطأ"].map((x, k) => (
              <div key={x} className={cairo.className} style={{ flex: 1, height: 120, border: `4px solid ${k === 0 ? BRASS : "rgba(255,255,255,0.7)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, fontWeight: 900, color: k === 0 ? BRASS : "#fff", transform: `scale(${1 + 0.03 * Math.sin(t * 6 + k * 3)})` }}>{x}</div>
            ))}
          </div>
        </div>
      </div>

      {/* the stamp */}
      {showStamp ? (
        <>
          <svg width="1080" height="1080" viewBox="-540 -540 1080 1080" style={{ position: "absolute", top: 520, left: 0, opacity: 1 - prog(t, impact, impact + 0.5), pointerEvents: "none" }}>
            {Array.from({ length: 22 }).map((_, k) => {
              const ang = (k / 22) * Math.PI * 2;
              const r1 = 190 + outCubic(prog(t, impact, impact + 0.5)) * 260;
              const r2 = r1 + 120 + (k % 3) * 40;
              return <line key={k} x1={Math.cos(ang) * r1} y1={Math.sin(ang) * r1 * 0.7} x2={Math.cos(ang) * r2} y2={Math.sin(ang) * r2 * 0.7} stroke={stampColor} strokeWidth="9" />;
            })}
          </svg>
          <div className={cairo.className} style={{ position: "absolute", top: 640, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `rotate(-8deg) scale(${2.6 - 1.6 * stampP})`, opacity: clamp(stampP * 3) }}>
            <div style={{ border: `16px solid ${stampColor}`, color: stampColor, padding: "10px 70px 22px", fontSize: 230, fontWeight: 900, lineHeight: 1.1, background: "rgba(0,6,29,0.55)", letterSpacing: 0 }}>
              {m.right ? "صح ✓" : "خطأ ✕"}
            </div>
          </div>
        </>
      ) : null}

      {/* the truth */}
      <div style={{ position: "absolute", top: 1110, right: 72, left: 72 }}>
        <div style={{ opacity: outCubic(prog(t, 5.1, 5.5)), transform: `translateY(${(1 - outCubic(prog(t, 5.1, 5.5))) * 40}px)` }}>
          <div className={cairo.className} style={{ fontSize: 44, fontWeight: 800, color: BRASS }}>الحقيقة</div>
          <p style={{ margin: "10px 0 0", fontSize: 54, lineHeight: 1.5, fontWeight: 500 }}>{m.truth}</p>
        </div>
        <div style={{ marginTop: 40, background: BRASS, color: INK, padding: "28px 38px", fontSize: 46, lineHeight: 1.45, fontWeight: 700, opacity: outCubic(prog(t, 6.2, 6.6)), transform: `translateY(${(1 - outCubic(prog(t, 6.2, 6.6))) * 40}px)` }}>
          {m.tip}
        </div>
      </div>
      <div style={{ position: "absolute", top: 1590, right: 72, left: 72, fontSize: 36, fontWeight: 600, color: "rgba(255,255,255,0.72)", opacity: outCubic(prog(t, 7.4, 7.8)) * (0.6 + 0.4 * Math.abs(Math.sin(t * 4))) }}>
        اضغط للتالي ←
      </div>
      <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash, pointerEvents: "none" }} />
    </div>
  );
}

function Outro({ t, qr }: { t: number; qr: string }) {
  const k = (s: number) => outCubic(prog(t, s, s + 0.5));
  return (
    <>
      <Top idx={5} />
      <div className={cairo.className} style={{ position: "absolute", top: 460, right: 72, left: 72, fontSize: 170, fontWeight: 900, lineHeight: 1.05, opacity: k(0.2), transform: `translateY(${(1 - k(0.2)) * 60}px)` }}>
        كم <span style={{ color: BRASS }}>أصبت؟</span>
      </div>
      <div style={{ position: "absolute", top: 830, right: 72, left: 72, fontSize: 52, lineHeight: 1.5, fontWeight: 500, color: "rgba(255,255,255,0.92)", opacity: k(1) }}>
        ردّ علينا برقمك من ٥، وأخبرنا أي معلومة فاجأتك.
      </div>
      <div style={{ position: "absolute", top: 1090, right: 72, left: 72, background: BRASS, color: INK, padding: "44px 48px", display: "flex", gap: 40, alignItems: "center", opacity: k(2), transform: `translateY(${(1 - k(2)) * 70}px)` }}>
        <div style={{ flex: 1 }}>
          <div className={cairo.className} style={{ fontSize: 58, fontWeight: 900, lineHeight: 1.25 }}>أرسل لنا عقدك قبل أن توقّعه.</div>
          <div style={{ fontSize: 36, lineHeight: 1.5, fontWeight: 600, marginTop: 14 }}>نرد خلال يوم عمل.</div>
          <div dir="ltr" style={{ fontSize: 44, fontWeight: 700, marginTop: 14, textAlign: "right" }}>taap.sa</div>
        </div>
        <div style={{ background: BONE, padding: 16, width: 230, height: 230, flex: "none" }} dangerouslySetInnerHTML={{ __html: qr.replace("<svg", '<svg style="width:100%;height:100%"') }} />
      </div>
      <div style={{ position: "absolute", top: 1490, right: 72, left: 72, fontSize: 28, color: "rgba(255,255,255,0.6)", opacity: k(3) }}>معلومات عامة للتوعية وليست استشارة قانونية لحالتك.</div>
    </>
  );
}

export default function Snap({ n, qr, t0 }: { n: number; qr: string; t0: number }) {
  const [t, setT] = useState(t0);
  useEffect(() => {
    (window as unknown as { __setT: (x: number) => void }).__setT = (x: number) => setT(x);
  }, []);
  return (
    <div className={plex.className} dir="rtl" style={{ position: "relative", width: W, height: H, background: INK, color: "#fff", overflow: "hidden" }}>
      {n === 0 ? <Opener t={t} /> : n === 1 ? <Intro t={t} /> : n === 7 ? <Outro t={t} qr={qr} /> : <MythSnap i={n - 2} t={t} />}
    </div>
  );
}
