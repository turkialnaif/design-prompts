import { readFileSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Aref_Ruqaa, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";

const ruqaa = Aref_Ruqaa({ subsets: ["arabic"], weight: ["400", "700"], display: "swap" });
const cairo = Cairo({ subsets: ["arabic"], weight: ["800", "900"], display: "swap" });
const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["500", "600", "700"], display: "swap" });

/**
 * Social posters (development only: the PNGs are made from this route and kept in docs/social). The two photographic elements (the flag and the
 * emblem) are cut-outs of the pictures the client supplied, read from docs/social/assets at render time so they are never part of the website's build.
 */
const INK = "#00061d";
const NAVY = "#00124a";
const BONE = "#f4efe4";
const BRASS = "#c4a04e";
const BRASS_DEEP = "#8a6d25";

const display: CSSProperties = { fontFamily: "var(--font-blog-stack)", fontWeight: 700 };
/** Running text: the site's Arabic face, whose letter shapes are the plainest to read (a prayer must never be misread). */
const plain: CSSProperties = { fontFamily: "var(--font-ar), sans-serif" };

const data = (f: string) => `data:image/png;base64,${readFileSync(join(process.cwd(), "docs/social/assets", f)).toString("base64")}`;

/** A top-view fighter, nose to the left: fuselage, swept wings, twin tails. */
const Jet = ({ s, o = 1 }: { s: number; o?: number }) => (
  <svg viewBox="0 0 100 100" width={s} height={s} style={{ display: "block", opacity: o, transform: "rotate(62deg)" }} aria-hidden>
    <path d="M50 1 L55 34 L99 80 L99 87 L57.5 76 L55 93 L50 97 L45 93 L42.5 76 L1 87 L1 80 L45 34 Z" fill={BRASS} />
  </svg>
);

function Mark({ h, color = "#fff" }: { h: number; color?: string }) {
  return (
    <svg viewBox="150 190 420 340" height={h} style={{ display: "block", width: "auto" }} aria-hidden>
      <g fill={color}>
        <rect x="160" y="202" width="398" height="52" />
        <rect x="222" y="261" width="274" height="47" />
        <polygon points="264,315 320,315 320,455 264,517" />
        <polygon points="335,315 387,315 387,415 335,448" />
        <polygon points="403,315 450,315 450,400 403,409" />
      </g>
    </svg>
  );
}

/** The firm's sign-off: the mark and TAAP, in white. */
function Signoff() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22 }} dir="ltr">
      <Mark h={64} />
      <span style={{ fontFamily: "var(--font-brand-raw), sans-serif", fontSize: 52, letterSpacing: "0.34em", color: "#fff", lineHeight: 1 }}>TAAP</span>
    </div>
  );
}

function Dua({ h }: { h: number }) {
  const story = h > 1500;
  const m = 88;
  const flag = data("flag.png");
  const emblem = data("emblem.png");
  const flagW = story ? 700 : 470;
  const top = story ? 120 : 52;
  const textTop = story ? 792 : 500;
  return (
    <div dir="rtl" style={{ position: "relative", width: 1080, height: h, background: INK, color: "#fff", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 45% at 24% 18%, rgba(40,84,220,0.34), transparent 72%)" }} />

      {/* the flag, bleeding off the left edge */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={flag} alt="" style={{ position: "absolute", left: story ? -34 : -26, top, width: flagW, height: "auto", filter: "saturate(1.3) brightness(1.18) contrast(1.06)" }} />
      <div style={{ position: "absolute", left: 0, top, width: flagW + 80, height: (flagW * 490) / 537, background: "linear-gradient(90deg, transparent 80%, rgba(0,6,29,0.0) 100%)" }} />

      {/* the jets, in formation, crossing above the emblem */}
      <div style={{ position: "absolute", right: 70, top: story ? 150 : 84, width: 360, height: 220 }}>
        {[
          { x: 250, y: 0, s: 64 },
          { x: 168, y: 40, s: 56 },
          { x: 86, y: 84, s: 50 },
          { x: 0, y: 128, s: 44 },
          { x: 300, y: 70, s: 50 },
          { x: 214, y: 112, s: 44 },
          { x: 130, y: 156, s: 38 },
        ].map((j, i) => (
          <div key={i} style={{ position: "absolute", left: j.x, top: j.y }}>
            <Jet s={j.s} o={0.95 - i * 0.04} />
          </div>
        ))}
      </div>

      {/* the Kingdom's emblem, in white */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={emblem} alt="" style={{ position: "absolute", right: story ? 104 : 120, top: story ? 440 : 270, width: story ? 250 : 170, height: "auto" }} />

      {/* the prayer */}
      <div style={{ position: "absolute", top: textTop, right: m, left: m }}>
        <div style={{ ...display, fontSize: story ? 150 : 104, lineHeight: 1.05, color: "#fff" }}>اللهم احفظ</div>
        <div style={{ ...display, fontSize: story ? 150 : 104, lineHeight: 1.05, color: BRASS }}>بلادنا</div>
        <p style={{ ...plain, margin: `${story ? 46 : 22}px 0 0`, fontSize: story ? 48 : 34, lineHeight: 1.6, color: "#fff", fontWeight: 600 }}>
          وشعبنا، وأحط بلادنا بالأمن والأمان،
        </p>
        <p style={{ ...plain, margin: `${story ? 14 : 6}px 0 0`, fontSize: story ? 48 : 34, lineHeight: 1.6, color: BRASS, fontWeight: 600 }}>
          ورد كيد أعدائنا ومن خلفهم ومن يدعمهم
          <br />
          ومن يرضى بفعلتهم في نحورهم
        </p>
      </div>

      {/* the article */}
      <div style={{ position: "absolute", left: m, right: m, bottom: story ? 222 : 124, background: BONE, padding: "24px 40px 26px" }}>
        <p style={{ ...plain, margin: 0, fontSize: 27, color: BRASS_DEEP }}>النظام الأساسي للحكم · المادة الرابعة والثلاثون</p>
        <p style={{ ...plain, margin: "8px 0 0", fontSize: 38, lineHeight: 1.5, color: NAVY, fontWeight: 600 }}>الدفاع عن العقيدة الإسلامية والمجتمع والوطن واجب على كل مواطن.</p>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: story ? 118 : 46, display: "flex", justifyContent: "center" }}>
        <Signoff />
      </div>
    </div>
  );
}

/**
 * The agency version: the supplied collage is the whole background (five frames, the emblem strip in the middle), graded to the identity's navy with grain,
 * a vignette and brass seams; the prayer is set in Ruqaa; the article sits on a pane of frosted glass centred over the emblem that the collage already carries.
 */
function Agency() {
  const base = data("collage.png");
  const seams = [384, 768, 1152, 1536];
  return (
    <div dir="rtl" style={{ position: "relative", width: 1080, height: 1920, background: INK, overflow: "hidden", color: "#fff" }}>
      {/* layer 1: the photographs */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={base} alt="" style={{ position: "absolute", inset: 0, width: 1080, height: 1920, filter: "contrast(1.08) saturate(1.0) brightness(0.98)" }} />
      {/* layer 2: the grade, in the identity's navy */}
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", background: "linear-gradient(180deg, rgba(0,34,110,0.22) 0%, rgba(0,18,74,0.12) 45%, rgba(0,18,74,0.26) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "soft-light", background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(196,160,78,0.35), rgba(0,6,29,0.0) 70%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 768, height: 384, mixBlendMode: "screen", background: "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))" }} />
      {/* layer 3: brass seams between the frames */}
      {seams.map((y) => (
        <div key={y} style={{ position: "absolute", left: 0, right: 0, top: y - 1, height: 2, background: "linear-gradient(90deg, rgba(196,160,78,0), rgba(196,160,78,0.9) 50%, rgba(196,160,78,0))" }} />
      ))}
      {/* layer 4: scrim for the prayer, over the sky of the fourth frame */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1130, height: 520, background: "linear-gradient(180deg, rgba(0,6,29,0) 0%, rgba(0,6,29,0.55) 38%, rgba(0,6,29,0.8) 80%, rgba(0,6,29,0) 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 210, background: "linear-gradient(180deg, rgba(0,6,29,0), rgba(0,6,29,0.92) 70%)" }} />

      {/* layer 5: the prayer */}
      <div style={{ position: "absolute", right: 64, left: 440, top: 1176, textAlign: "right", textShadow: "0 3px 22px rgba(0,6,29,0.75)" }}>
        <div className={ruqaa.className} style={{ fontSize: 108, lineHeight: 1.02, fontWeight: 700, color: "#fff" }}>اللهم احفظ</div>
        <div className={ruqaa.className} style={{ fontSize: 122, lineHeight: 1.0, fontWeight: 700, paddingBottom: 34, marginBottom: -34, paddingTop: 10, background: "linear-gradient(100deg,#9c7a2c 0%,#e8c970 38%,#fff1bf 52%,#d4a747 70%,#b88a34 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "none", filter: "drop-shadow(0 3px 12px rgba(0,6,29,0.7))" }}>بلادنا</div>
        <p className={plex.className} style={{ margin: "26px 0 0", fontSize: 35, lineHeight: 1.62, fontWeight: 600, color: "#fff" }}>
          وشعبنا، وأحط بلادنا بالأمن والأمان،
          <span style={{ display: "block", color: "#e8c970", fontWeight: 600 }}>ورد كيد أعدائنا ومن خلفهم ومن يدعمهم ومن يرضى بفعلتهم في نحورهم</span>
        </p>
      </div>

      {/* layer 6: the pane of glass over the emblem */}
      <div style={{ position: "absolute", left: 96, right: 96, top: 794, height: 332, borderRadius: 30, overflow: "hidden", boxShadow: "0 36px 90px rgba(0,6,29,0.5), 0 2px 0 rgba(255,255,255,0.35) inset" }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(15px) saturate(1.6)", WebkitBackdropFilter: "blur(15px) saturate(1.6)", background: "linear-gradient(135deg, rgba(255,255,255,0.46), rgba(255,255,255,0.12) 55%, rgba(255,255,255,0.3))" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 30, border: "1.5px solid rgba(255,255,255,0.85)", boxShadow: "inset 0 0 0 1px rgba(196,160,78,0.35), inset 0 -24px 40px rgba(255,255,255,0.18)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, background: "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0))" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", textAlign: "right" }}>
          <p className={plex.className} style={{ margin: 0, fontSize: 27, fontWeight: 600, letterSpacing: 0, color: "#7a5d17" }}>النظام الأساسي للحكم · المادة الرابعة والثلاثون</p>
          <div style={{ width: 90, height: 2, background: "#b98a35", margin: "16px 0 16px auto" }} />
          <p className={plex.className} style={{ margin: 0, fontSize: 47, lineHeight: 1.52, fontWeight: 700, color: NAVY }}>الدفاع عن العقيدة الإسلامية والمجتمع والوطن واجب على كل مواطن.</p>
        </div>
      </div>

      {/* layer 7: the signature */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 52, display: "flex", justifyContent: "center", filter: "drop-shadow(0 3px 10px rgba(0,6,29,0.6))" }}>
        <Signoff />
      </div>

      {/* layer 8: grain and vignette, over everything */}
      <svg width="1080" height="1920" style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.22 }} aria-hidden>
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="1080" height="1920" filter="url(#g)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,6,29,0.55) 100%)" }} />
    </div>
  );
}

/**
 * The flag version. One photograph is the whole poster: the flag over the figure, the jets above, the monument behind. The lower part of the picture is
 * deepened into the identity's navy (the black robe simply continues into it) and carries the prayer, the frosted-glass article pane and the signature.
 */
function FlagPoster() {
  const base = data("collage-flag.png");
  return (
    <div dir="rtl" style={{ position: "relative", width: 1080, height: 1920, background: INK, overflow: "hidden", color: "#fff" }}>
      {/* layer 1: the photograph, framed so the flag and the jets sit high and the figure's head sits at the golden line */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={base} alt="" style={{ position: "absolute", left: 0, top: -64, width: 1080, height: 2127, filter: "contrast(1.1) saturate(1.22) brightness(0.9)" }} />
      {/* layer 2: the grade: a deep navy sky, a warm light on the horizon */}
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", background: "linear-gradient(180deg, rgba(0,34,110,0.78) 0%, rgba(0,34,110,0.42) 38%, rgba(30,40,70,0.15) 62%, rgba(0,18,74,0.4) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "soft-light", background: "radial-gradient(ellipse 80% 40% at 55% 62%, rgba(255,214,140,0.55), rgba(0,0,0,0) 70%)" }} />
      {/* a glow behind the flag so it lifts off the sky */}
      <div style={{ position: "absolute", left: -120, top: 60, width: 900, height: 700, mixBlendMode: "screen", background: "radial-gradient(closest-side, rgba(60,160,110,0.28), rgba(0,0,0,0))" }} />
      {/* layer 3: the navy floor that the picture sinks into */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1090, bottom: 0, background: "linear-gradient(180deg, rgba(0,6,29,0) 0%, rgba(0,6,29,0.6) 20%, rgba(0,6,29,0.93) 44%, #00061d 70%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1262, height: 2, background: "linear-gradient(90deg, rgba(196,160,78,0), rgba(196,160,78,0.9) 50%, rgba(196,160,78,0))" }} />

      {/* layer 4: the prayer */}
      <div style={{ position: "absolute", right: 70, left: 70, top: 1286, textAlign: "right" }}>
        <div className={ruqaa.className} style={{ fontSize: 106, lineHeight: 1.12, fontWeight: 700, color: "#fff", textShadow: "0 3px 22px rgba(0,6,29,0.8)", whiteSpace: "nowrap" }}>
          اللهم احفظ{" "}
          <span style={{ background: "linear-gradient(100deg,#9c7a2c 0%,#e8c970 38%,#fff1bf 52%,#d4a747 70%,#b88a34 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", display: "inline-block", paddingBottom: 30, marginBottom: -30, textShadow: "none", filter: "drop-shadow(0 3px 12px rgba(0,6,29,0.7))" }}>بلادنا</span>
        </div>
        <p className={plex.className} style={{ margin: "14px 0 0", fontSize: 35, lineHeight: 1.55, fontWeight: 600, color: "#fff" }}>
          وشعبنا، وأحط بلادنا بالأمن والأمان،
          <span style={{ display: "block", color: "#e8c970" }}>ورد كيد أعدائنا ومن خلفهم ومن يدعمهم</span><span style={{ display: "block", color: "#e8c970" }}>ومن يرضى بفعلتهم في نحورهم</span>
        </p>
      </div>

      {/* layer 5: the pane of glass */}
      <div style={{ position: "absolute", left: 70, right: 70, top: 1596, height: 184, borderRadius: 26, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,6,29,0.55)" }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(16px) saturate(1.5)", WebkitBackdropFilter: "blur(16px) saturate(1.5)", background: "linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.22))" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 26, border: "1.5px solid rgba(255,255,255,0.55)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 0 0 1px rgba(196,160,78,0.3)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 70, background: "linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0))" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 44px", textAlign: "right" }}>
          <p className={plex.className} style={{ margin: 0, fontSize: 25, fontWeight: 600, color: "#e8c970" }}>النظام الأساسي للحكم · المادة الرابعة والثلاثون</p>
          <p className={plex.className} style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.45, fontWeight: 700, color: "#fff", textShadow: "0 2px 12px rgba(0,6,29,0.5)" }}>الدفاع عن العقيدة الإسلامية والمجتمع والوطن واجب على كل مواطن.</p>
        </div>
      </div>

      {/* layer 6: the signature */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, display: "flex", justifyContent: "center" }}>
        <Signoff />
      </div>

      {/* layer 7: grain and vignette */}
      <svg width="1080" height="1920" style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.2 }} aria-hidden>
        <filter id="g2"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="1080" height="1920" filter="url(#g2)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,6,29,0.5) 100%)" }} />
    </div>
  );
}

/**
 * The city version, set the way the Riyadh Royal Commission sets its posts: the photograph runs to every edge; one short headline in a heavy, flat,
 * single-colour Arabic face, very large, in the sky; a few quiet lines under it in a regular weight; the logo small at the top; a band of Najdi
 * triangles laid translucently on the horizon. No effects on the type.
 */
function CityPoster() {
  const base = data("collage-city.png");
  const tri: React.ReactNode[] = [];
  for (let i = -1; i < 12; i++) tri.push(<polygon key={i} points={`${i * 100},46 ${i * 100 + 50},0 ${i * 100 + 100},46`} />);
  return (
    <div dir="rtl" style={{ position: "relative", width: 1080, height: 1920, background: INK, overflow: "hidden", color: "#fff" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={base} alt="" style={{ position: "absolute", inset: 0, width: 1080, height: 1920, filter: "contrast(1.08) saturate(1.15) brightness(0.98)" }} />
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", background: "linear-gradient(180deg, rgba(0,20,84,0.62) 0%, rgba(0,20,84,0.2) 30%, rgba(0,0,0,0) 52%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1470, bottom: 0, background: "linear-gradient(180deg, rgba(0,6,29,0) 0%, rgba(0,6,29,0.7) 30%, rgba(0,6,29,0.96) 52%, #00061d 66%)" }} />

      {/* a band of Najdi triangles on the horizon */}
      <svg width="1080" height="46" viewBox="0 0 1080 46" style={{ position: "absolute", left: 0, top: 1052, opacity: 0.2 }} aria-hidden>
        <g fill="#fff">{tri}</g>
      </svg>
      <svg width="1080" height="46" viewBox="0 0 1080 46" style={{ position: "absolute", left: 0, top: 1098, opacity: 0.1 }} aria-hidden>
        <g fill="#fff" transform="translate(50 0)">{tri}</g>
      </svg>

      {/* the logo, small, top left */}
      <div style={{ position: "absolute", left: 64, top: 64 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/profile/lockup-bone.png" alt="" style={{ width: 210, height: "auto", display: "block", opacity: 0.95 }} />
      </div>

      {/* the headline: heavy, flat, huge */}
      <div className={cairo.className} style={{ position: "absolute", right: 70, left: 70, top: 190, textAlign: "right", fontWeight: 900, lineHeight: 0.98 }}>
        <div style={{ fontSize: 176, color: "#fff", letterSpacing: "-0.01em" }}>اللهم احفظ</div>
        <div style={{ fontSize: 232, color: BRASS, letterSpacing: "-0.01em", marginTop: 6 }}>بلادنا</div>
      </div>

      {/* the quiet lines */}
      <div className={plex.className} style={{ position: "absolute", right: 74, left: 74, top: 604, textAlign: "right", fontWeight: 500, fontSize: 40, lineHeight: 1.62, color: "#fff", textShadow: "0 2px 18px rgba(0,6,29,0.85)" }}>
        وشعبنا، وأحط بلادنا بالأمن والأمان،
        <span style={{ display: "block" }}>ورد كيد أعدائنا ومن خلفهم ومن يدعمهم</span>
        <span style={{ display: "block" }}>ومن يرضى بفعلتهم في نحورهم</span>
      </div>

      {/* the pane of glass */}
      <div style={{ position: "absolute", left: 70, right: 70, top: 1618, height: 184, borderRadius: 26, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,6,29,0.55)" }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(16px) saturate(1.5)", WebkitBackdropFilter: "blur(16px) saturate(1.5)", background: "linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.22))" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 26, border: "1.5px solid rgba(255,255,255,0.55)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 44px", textAlign: "right" }}>
          <p className={plex.className} style={{ margin: 0, fontSize: 25, fontWeight: 600, color: "#e8c970" }}>النظام الأساسي للحكم · المادة الرابعة والثلاثون</p>
          <p className={plex.className} style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.45, fontWeight: 700, color: "#fff" }}>الدفاع عن العقيدة الإسلامية والمجتمع والوطن واجب على كل مواطن.</p>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, display: "flex", justifyContent: "center" }}>
        <Signoff />
      </div>
    </div>
  );
}

/**
 * The depth version. The way a designer sets a headline on a skyline: the word "بلادنا" is placed in the sky BEHIND the two towers, so Al Mamlaka and
 * Al Faisaliah overlap its letters. Layers, bottom to top: the photograph; the word; a cut-out of the towers (from the same photograph) that covers it;
 * the grade; then the quiet lines, the glass pane and the signature.
 */
function DepthPoster() {
  const base = data("collage-city.png");
  const towers = data("towers-fg.png");
  return (
    <div dir="rtl" style={{ position: "relative", width: 1080, height: 1920, background: INK, overflow: "hidden", color: "#fff" }}>
      {/* layer 1: the photograph */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={base} alt="" style={{ position: "absolute", inset: 0, width: 1080, height: 1920, filter: "contrast(1.08) saturate(1.15) brightness(0.98)" }} />
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", background: "linear-gradient(180deg, rgba(0,20,84,0.62) 0%, rgba(0,20,84,0.2) 30%, rgba(0,0,0,0) 52%)" }} />

      {/* layer 2: the headline, in the sky */}
      <div className={cairo.className} style={{ position: "absolute", right: 70, left: 70, top: 176, textAlign: "right", fontWeight: 900, lineHeight: 0.96 }}>
        <div style={{ fontSize: 170, color: "#fff" }}>اللهم احفظ</div>
      </div>
      <div className={plex.className} style={{ position: "absolute", right: 74, left: 74, top: 372, textAlign: "right", fontWeight: 500, fontSize: 38, lineHeight: 1.6, color: "#fff", textShadow: "0 2px 18px rgba(0,6,29,0.8)" }}>
        وشعبنا، وأحط بلادنا بالأمن والأمان،
        <span style={{ display: "block" }}>ورد كيد أعدائنا ومن خلفهم ومن يدعمهم</span>
        <span style={{ display: "block" }}>ومن يرضى بفعلتهم في نحورهم</span>
      </div>
      <div className={cairo.className} style={{ position: "absolute", right: 62, top: 540, fontWeight: 900, fontSize: 336, lineHeight: 1.0, color: BRASS, letterSpacing: "-0.015em", whiteSpace: "nowrap" }}>بلادنا</div>

      {/* layer 3: the towers, cut out of the photograph, standing in front of the word */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={towers} alt="" style={{ position: "absolute", inset: 0, width: 1080, height: 1920, filter: "contrast(1.08) saturate(1.15) brightness(0.98)" }} />

      {/* layer 4: the picture's floor, the glass pane, the signature */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1470, bottom: 0, background: "linear-gradient(180deg, rgba(0,6,29,0) 0%, rgba(0,6,29,0.7) 30%, rgba(0,6,29,0.96) 52%, #00061d 66%)" }} />
      <div style={{ position: "absolute", left: 64, top: 64 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/profile/lockup-bone.png" alt="" style={{ width: 210, height: "auto", display: "block", opacity: 0.95 }} />
      </div>
      <div style={{ position: "absolute", left: 70, right: 70, top: 1618, height: 184, borderRadius: 26, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,6,29,0.55)" }}>
        <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(16px) saturate(1.5)", WebkitBackdropFilter: "blur(16px) saturate(1.5)", background: "linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.22))" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 26, border: "1.5px solid rgba(255,255,255,0.55)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 44px", textAlign: "right" }}>
          <p className={plex.className} style={{ margin: 0, fontSize: 25, fontWeight: 600, color: "#e8c970" }}>النظام الأساسي للحكم · المادة الرابعة والثلاثون</p>
          <p className={plex.className} style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.45, fontWeight: 700, color: "#fff" }}>الدفاع عن العقيدة الإسلامية والمجتمع والوطن واجب على كل مواطن.</p>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, display: "flex", justifyContent: "center" }}>
        <Signoff />
      </div>
    </div>
  );
}

const sizes: Record<string, number> = { "dua-4x5": 1350, "dua-story": 1920, "dua-agency": 1920, "dua-flag": 1920, "dua-city": 1920, "dua-depth": 1920 };

export function generateStaticParams() {
  return Object.keys(sizes).map((slug) => ({ slug }));
}

export default async function SocialPoster({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  const h = sizes[slug];
  if (!h) notFound();
  return (
    <main style={{ margin: 0 }}>
      <style>{`nextjs-portal { display: none !important; } html, body { margin: 0; padding: 0; background: ${INK}; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }`}</style>
      {slug === "dua-depth" ? <DepthPoster /> : slug === "dua-city" ? <CityPoster /> : slug === "dua-flag" ? <FlagPoster /> : slug === "dua-agency" ? <Agency /> : <Dua h={h} />}
    </main>
  );
}
