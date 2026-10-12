import { readFileSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

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

const sizes: Record<string, number> = { "dua-4x5": 1350, "dua-story": 1920 };

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
      <Dua h={h} />
    </main>
  );
}
