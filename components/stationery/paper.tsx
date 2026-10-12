import type { CSSProperties } from "react";
import { firm } from "@/lib/site";
import { ADDRESS_AR, PHONE, Qr, qrUrl } from "@/components/stationery/cards";
import { BLEED, C, Diamond, Face, GhostMark, Mark, Thread, disp, foil, foilBg, latin } from "@/components/stationery/parts";

type G = { guides?: boolean };

/** The wordmark lockup, pre-coloured (navy or gold) so it prints as a plain image, with no CSS masks. */
export function Lockup({ mm, fill = C.ink, style }: { mm: number; fill?: string | "foil"; style?: CSSProperties }) {
  const src = fill === C.ink ? "/brand/profile/lockup-navy.png" : "/brand/profile/lockup-gold.png";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" style={{ width: `${mm}mm`, height: "auto", display: "block", ...style }} />;
}

/** The thread, upright: it runs the full height of the sheet and leaves through top and bottom. */
export function VThread({ x, nodes = [], color = C.gold, foilLine = false, ticks = [] }: { x: number; nodes?: number[]; color?: string; foilLine?: boolean; ticks?: number[] }) {
  return (
    <div className="absolute" style={{ insetInlineStart: `${x}mm`, top: `-${BLEED + 1}mm`, bottom: `-${BLEED + 1}mm`, width: "0.25mm", ...(foilLine ? foilBg : { background: color }) }}>
      {nodes.map((n) => (
        <Diamond key={n} size={1.5} color={color} style={{ position: "absolute", top: `${n + BLEED + 1}mm`, insetInlineStart: "-0.62mm", ...(foilLine ? foilBg : {}) }} />
      ))}
      {ticks.map((n) => (
        <span key={n} style={{ position: "absolute", top: `${n + BLEED + 1}mm`, insetInlineStart: "-1.6mm", width: "3.4mm", height: "0.25mm", background: color }} />
      ))}
    </div>
  );
}

const PAPER_W = "#fbf9f4";

/**
 * Letterhead, A4. The thread runs down the start edge; the two diamonds sit at 99 and 198 mm, exactly the third-folds of the sheet,
 * so the identity is also the fold guide for a DL envelope; a short tick at 148.5 mm marks the filing punch.
 */
export async function Letterhead({ guides }: G) {
  return (
    <Face w={210} h={297} bg={PAPER_W} guides={guides} bleed={<VThread x={BLEED + 16} nodes={[99, 198]} ticks={[148.5]} />}>
      <div className="absolute" style={{ top: "13mm", insetInlineStart: "23mm" }}>
        <Lockup mm={58} />
      </div>
      <p className="absolute" style={{ top: "17.5mm", insetInlineEnd: "14mm", fontSize: "6.4pt", color: C.goldText, letterSpacing: 0 }}>فهمٌ يُسابق الرأْي</p>

      <div className="absolute" style={{ bottom: "10mm", insetInlineStart: "23mm", insetInlineEnd: "14mm" }}>
        <div style={{ height: "0.25mm", background: C.hair, marginBottom: "3.4mm" }} />
        <div className="flex items-end justify-between gap-[8mm]" style={{ fontSize: "6.2pt", lineHeight: 1.75, color: C.body }}>
          <div>
            {ADDRESS_AR.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <div dir="ltr" style={{ ...latin, letterSpacing: "0.06em" }}>
            <p>{PHONE}</p>
            <p>info@taap.sa</p>
            <p>taap.sa</p>
          </div>
          <div style={{ maxWidth: "50mm" }}>
            <p>رخصة مزاولة المحاماة رقم {firm.licenseNumber}</p>
            <p>السجل الموحد {firm.unifiedNumber}</p>
            <p dir="ltr" style={{ ...latin, textAlign: "end", color: C.goldText, letterSpacing: "0.1em", fontSize: "5.6pt" }}>
              TURKI ALNAIF &amp; PARTNERS
            </p>
          </div>
        </div>
      </div>
    </Face>
  );
}

/** Second and later pages: the thread and the mark, nothing else. */
export function Continuation({ guides }: G) {
  return (
    <Face w={210} h={297} bg={PAPER_W} guides={guides} bleed={<VThread x={BLEED + 16} nodes={[99, 198]} ticks={[148.5]} />}>
      <div className="absolute" style={{ top: "13mm", insetInlineStart: "23mm" }}>
        <Mark height={8.5} fill="flat" />
      </div>
      <p className="absolute" dir="ltr" style={{ ...latin, bottom: "10mm", insetInlineStart: "23mm", fontSize: "5.6pt", letterSpacing: "0.22em", color: C.goldText }}>
        TURKI ALNAIF &amp; PARTNERS · TAAP.SA
      </p>
    </Face>
  );
}

/** DL envelope, front. The thread leaves by the left edge; the return address is a whisper. */
export function EnvelopeFront({ guides }: G) {
  return (
    <Face w={220} h={110} bg={C.paper} guides={guides} bleed={<Thread y={BLEED + 94.5} from={BLEED + 12} nodes={[0, 4.4, 8.8]} />}>
      <div className="absolute" style={{ top: "11mm", insetInlineStart: "12mm" }}>
        <Lockup mm={42} />
      </div>
      <p className="absolute" style={{ top: "86mm", insetInlineStart: "12mm", fontSize: "6.6pt", color: C.goldText, letterSpacing: 0 }}>فهمٌ يُسابق الرأْي</p>
      <p className="absolute" dir="ltr" style={{ ...latin, top: "98.2mm", insetInlineStart: "12mm", margin: 0, fontSize: "5.2pt", letterSpacing: "0.18em", color: "rgba(44,53,80,0.85)" }}>
        TAAP.SA · {PHONE}
      </p>
    </Face>
  );
}

/** What the recipient sees when the envelope is opened: deep navy, a quiet field of marks, the thread, one line of promise. */
export function EnvelopeLiner({ guides }: G) {
  const W = 220 + BLEED * 2;
  const H = 110 + BLEED * 2;
  return (
    <Face
      w={220}
      h={110}
      bg={C.deep}
      guides={guides}
      dir="ltr"
      bleed={
        <>
          <svg className="absolute inset-0" width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
            <defs>
              <pattern id="liner" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
                <g transform="translate(6 7) scale(0.036)" fill="rgba(40,84,220,0.2)">
                  <g transform="translate(-150 -190)">
                    <rect x="160" y="202" width="398" height="52" />
                    <rect x="222" y="261" width="274" height="47" />
                    <polygon points="264,315 320,315 320,455 264,517" />
                    <polygon points="335,315 387,315 387,415 335,448" />
                    <polygon points="403,315 450,315 450,400 403,409" />
                  </g>
                </g>
              </pattern>
            </defs>
            <rect width={W} height={H} fill="url(#liner)" />
          </svg>
          <Thread y={BLEED + 55} from={-4} to="end" foilLine />
        </>
      }
    >
      <p className="absolute inset-x-0" style={{ top: "36mm", textAlign: "center", fontSize: "9pt", color: "#fff", letterSpacing: 0 }}>مُغلَق بسرية مهنية</p>
      <p className="absolute inset-x-0" style={{ ...latin, top: "63mm", textAlign: "center", fontSize: "5.6pt", letterSpacing: "0.34em", textTransform: "uppercase", color: C.goldBright }}>Sealed in professional confidence</p>
    </Face>
  );
}

/** Compliments slip, DL. */
export async function Compliments({ guides }: G) {
  return (
    <Face w={210} h={99} bg={PAPER_W} guides={guides} bleed={<Thread y={BLEED + 25} from={BLEED + 14} nodes={[0, 4.4, 8.8]} />}>
      <div className="absolute" style={{ top: "9.5mm", insetInlineStart: "14mm" }}>
        <Lockup mm={46} />
      </div>
      <p className="absolute" style={{ ...disp(), top: "31mm", insetInlineStart: "14mm", fontSize: "27pt", lineHeight: 1.1, color: C.ink }}>مع تحيات</p>
      <div className="absolute" style={{ bottom: "7mm", insetInlineStart: "14mm", insetInlineEnd: "14mm" }}>
        <div className="flex items-end justify-between" style={{ fontSize: "6pt", color: C.body }}>
          <div dir="ltr" style={{ ...latin, letterSpacing: "0.06em", lineHeight: 1.8 }}>
            <p>
              {PHONE} · info@taap.sa
            </p>
            <p>taap.sa</p>
          </div>
          <div style={{ width: "13mm" }}>
            <Qr url={qrUrl("compliments-slip")} mm={13} pad={0.4} light="transparent" />
          </div>
        </div>
      </div>
    </Face>
  );
}

/** A5 notepad, a page of ruled paper with the thread as its margin. */
export function Notepad({ guides }: G) {
  return (
    <Face w={148} h={210} bg={PAPER_W} guides={guides} bleed={<VThread x={BLEED + 13} nodes={[42, 98, 154]} />}>
      <div className="absolute" style={{ top: "11mm", insetInlineStart: "20mm", insetInlineEnd: "10mm" }}>
        <div className="flex items-end justify-between">
          <Lockup mm={36} />
          <p style={{ ...disp(), fontSize: "15pt", lineHeight: 1, color: C.ink }}>ملاحظات</p>
        </div>
      </div>
      <div
        className="absolute"
        style={{
          top: "34mm",
          bottom: "16mm",
          insetInlineStart: "20mm",
          insetInlineEnd: "10mm",
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 7.78mm, rgba(0,18,74,0.18) 7.78mm, rgba(0,18,74,0.18) 8mm)`,
        }}
      />
      <p className="absolute" dir="ltr" style={{ ...latin, bottom: "8mm", insetInlineStart: "20mm", fontSize: "5.2pt", letterSpacing: "0.22em", color: C.goldText }}>
        TAAP.SA · UNDERSTANDING THAT RUNS AHEAD OF OPINION
      </p>
    </Face>
  );
}

/** Presentation folder, flat: front, spine and back as one spread. The thread crosses all three, so the folder is one unbroken line. */
export async function FolderSpread({ guides }: G) {
  const PANEL = 220;
  const SPINE = 8;
  return (
    <Face
      w={PANEL * 2 + SPINE}
      h={310}
      bg={C.deep}
      guides={guides}
      bleed={
        <>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 40% 50% at 25% 32%, rgba(40,84,220,0.34), transparent 70%)` }} />
          <div className="absolute" style={{ insetInlineStart: `${BLEED + PANEL + SPINE}mm`, insetInlineEnd: 0, bottom: 0, height: "150mm" }}>
            <img src="/brand/profile/city-fade.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% 60%" }} />
          </div>
          <Thread y={BLEED + 224} from={-4} to="end" nodes={[]} foilLine weight={0.35} />
        </>
      }
    >
      {/* front */}
      <div className="absolute" style={{ insetInlineStart: 0, top: 0, width: `${PANEL}mm`, height: "310mm" }}>
        <div className="absolute flex justify-center" style={{ top: "42mm", insetInline: 0 }}>
          <Mark height={118} />
        </div>
        <p className="absolute" style={{ ...disp(), top: "233mm", insetInlineStart: "22mm", fontSize: "44pt", lineHeight: 1.2, color: "#fff" }}>ملف المسألة</p>
        <p className="absolute" dir="ltr" style={{ ...latin, top: "262mm", insetInlineStart: "22mm", fontSize: "9pt", letterSpacing: "0.34em", textTransform: "uppercase", color: C.goldBright }}>Matter file</p>
        <div className="absolute" style={{ bottom: "14mm", insetInlineStart: "22mm" }}>
          <Lockup mm={58} fill="foil" />
        </div>
      </div>
      {/* spine */}
      <div className="absolute flex items-center justify-center" style={{ insetInlineStart: `${PANEL}mm`, top: 0, width: `${SPINE}mm`, height: "310mm", background: "rgba(0,18,74,0.55)" }}>
        <span style={{ writingMode: "vertical-rl", ...latin, ...foil, fontSize: "6.4pt", letterSpacing: "0.34em", textTransform: "uppercase", display: "inline-block" }}>Turki AlNaif &amp; Partners · TAAP</span>
      </div>
      {/* back */}
      <div className="absolute" style={{ insetInlineStart: `${PANEL + SPINE}mm`, top: 0, width: `${PANEL}mm`, height: "310mm" }}>
        <div className="absolute" style={{ top: "22mm", insetInlineStart: "22mm", insetInlineEnd: "22mm" }}>
          <p style={{ ...disp(), fontSize: "22pt", lineHeight: 1.3, color: "#fff" }}>فهمٌ يُسابق الرأْي</p>
          <p dir="ltr" style={{ ...latin, marginTop: "2mm", fontSize: "8pt", letterSpacing: "0.04em", color: C.goldBright }}>Understanding that runs ahead of opinion</p>
        </div>
        <div className="absolute" style={{ top: "222mm", insetInline: "14mm", height: "62mm", background: "rgba(0,6,29,0.78)" }} />
        <div className="absolute" style={{ top: "232mm", insetInlineStart: "22mm", fontSize: "9pt", lineHeight: 2, color: "rgba(255,255,255,0.92)" }}>
          {ADDRESS_AR.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p dir="ltr" style={{ ...latin, letterSpacing: "0.06em", color: C.goldBright, marginTop: "2mm" }}>
            {PHONE} · info@taap.sa
          </p>
        </div>
        <div className="absolute" style={{ top: "232mm", insetInlineEnd: "22mm" }}>
          <Qr url={qrUrl("folder")} mm={24} />
        </div>
      </div>
    </Face>
  );
}

/** Seal sticker, 40 mm, die-cut round: closes an envelope or a bound document. */
export function Seal({ guides }: G) {
  return (
    <Face w={40} h={40} bg={C.deep} guides={guides} dir="ltr">
      <svg viewBox="0 0 40 40" className="absolute inset-0" width="100%" height="100%" aria-hidden>
        <defs>
          <linearGradient id="seal-foil" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a6420" />
            <stop offset="0.25" stopColor="#d9b25c" />
            <stop offset="0.45" stopColor="#fff3c6" />
            <stop offset="0.65" stopColor="#d4a747" />
            <stop offset="1" stopColor="#a77c2a" />
          </linearGradient>
          <path id="seal-ring" d="M 20,20 m -15.2,0 a 15.2,15.2 0 1,1 30.4,0 a 15.2,15.2 0 1,1 -30.4,0" />
        </defs>
        <circle cx="20" cy="20" r="18.4" fill="none" stroke="url(#seal-foil)" strokeWidth="0.35" />
        <circle cx="20" cy="20" r="12.6" fill="none" stroke="url(#seal-foil)" strokeWidth="0.18" />
        <text fill="url(#seal-foil)" style={{ fontFamily: "var(--font-brand-raw), sans-serif", fontSize: "2.35px", letterSpacing: "0.36px" }}>
          <textPath href="#seal-ring" startOffset="0">
            TURKI ALNAIF &amp; PARTNERS ◆ LAWYERS &amp; LEGAL CONSULTANTS ◆
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: "1.3mm" }}>
        <Mark height={8.4} />
        <p style={{ ...foil, fontSize: "3.6pt", letterSpacing: 0, display: "inline-block", lineHeight: 1.5 }}>تركي النايف وشركاؤه</p>
      </div>
    </Face>
  );
}

export { GhostMark };
