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
export function VThread({ x, nodes = [], color = C.gold, foilLine = false, ticks = [], stopAt }: { x: number; nodes?: number[]; color?: string; foilLine?: boolean; ticks?: number[]; stopAt?: number }) {
  // `stopAt` (mm from the top of the trim) ends the thread there, where it meets the footer
  // the thread is drawn on the full sheet (bleed included) and starts 1 mm beyond its top edge; offsets below are in trim millimetres
  const ext = stopAt === undefined ? { bottom: `-${BLEED + 1}mm` } : { height: `${stopAt + 2 * BLEED + 1}mm` };
  return (
    <div className="absolute" style={{ insetInlineStart: `${x}mm`, top: `-${BLEED + 1}mm`, ...ext, width: "0.25mm", ...(foilLine ? foilBg : { background: color }) }}>
      {nodes.map((n) => (
        <Diamond key={n} size={1.5} color={color} style={{ position: "absolute", top: `${n + 2 * BLEED + 1 - 0.75}mm`, insetInlineStart: "-0.62mm", ...(foilLine ? foilBg : {}) }} />
      ))}
      {ticks.map((n) => (
        <span key={n} style={{ position: "absolute", top: `${n + 2 * BLEED + 1}mm`, insetInlineStart: "-1.6mm", width: "3.4mm", height: "0.25mm", background: color }} />
      ))}
    </div>
  );
}

const PAPER_W = "#fbf9f4";

const FOOT_Y = 242; // where the letterhead's footer begins (mm from the top of the trim)

/** The letterhead's footer: deep navy, the city under glass, and the thread arriving at a gold seal and turning into the footer's edge. */
function LetterFoot() {
  const H = 297 - FOOT_Y + BLEED;
  return (
    <>
      <div className="absolute inset-x-0 overflow-hidden" style={{ bottom: 0, height: `${H}mm`, background: C.deep }}>
        {/* the city hangs under the thread and dissolves into solid navy, where the text sits */}
        <img src="/brand/profile/city-kafd.jpg" alt="" className="absolute inset-x-0" style={{ top: 0, width: "100%", height: "30mm", objectFit: "cover", objectPosition: "50% 34%", opacity: 0.95 }} />
        <div className="absolute inset-x-0" style={{ top: 0, height: "31mm", background: "linear-gradient(180deg, rgba(0,6,29,0.05) 0%, rgba(0,6,29,0.5) 50%, #00061d 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 70% at 100% 0%, rgba(40,84,220,0.28), transparent 70%)" }} />
      </div>
      <Thread y={BLEED + FOOT_Y} from={BLEED + 16 + 8.6} to="end" foilLine weight={0.4} />
    </>
  );
}

/** The seal at the end of the thread: a navy disc ringed in gold, the mark inside. */
function ThreadSeal({ at = FOOT_Y }: { at?: number }) {
  const D = 17.2;
  return (
    <div className="absolute" style={{ insetInlineStart: `${16 - D / 2}mm`, top: `${at - D / 2}mm`, width: `${D}mm`, height: `${D}mm` }}>
      <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden>
        <circle cx="20" cy="20" r="19.6" fill={C.deep} />
        <circle cx="20" cy="20" r="19" fill="none" stroke="url(#stn-foil)" strokeWidth="0.9" />
        <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(216,174,85,0.55)" strokeWidth="0.3" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Mark height={6.4} />
      </div>
    </div>
  );
}

/**
 * Letterhead, A4. The thread runs down the start edge, its two diamonds at 99 and 198 mm (the third-folds, so the identity is also the
 * fold guide for a DL envelope; a tick at 148.5 mm marks the filing punch), reaches a gold seal and turns into the edge of the footer.
 */
export async function Letterhead({ guides }: G) {
  return (
    <Face w={210} h={297} bg={PAPER_W} guides={guides} bleed={<><VThread x={BLEED + 16} nodes={[99, 198]} ticks={[148.5]} stopAt={FOOT_Y - 8.6} /><LetterFoot /></>}>
      <div className="absolute" style={{ top: "13mm", insetInlineStart: "27mm" }}>
        <Lockup mm={62} />
      </div>

      <ThreadSeal />

      <div className="absolute grid" style={{ top: "270.6mm", insetInlineStart: "34mm", insetInlineEnd: "14mm", gridTemplateColumns: "1.05fr 1fr 1fr", columnGap: "8mm", color: "rgba(255,255,255,0.92)", fontSize: "6.3pt", lineHeight: 1.7 }}>
        <div>
          <p style={{ fontSize: "5.2pt", color: C.goldBright, marginBottom: "0.8mm" }}>المقر</p>
          {ADDRESS_AR.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <div dir="ltr" style={{ ...latin, letterSpacing: "0.06em" }}>
          <p dir="rtl" style={{ fontFamily: "inherit", fontSize: "5.2pt", color: C.goldBright, marginBottom: "0.8mm", textAlign: "end" }}>التواصل</p>
          <p className="flex items-center gap-[1.6mm]">
            <Diamond size={1} color={C.goldBright} />
            {PHONE}
          </p>
          <p className="flex items-center gap-[1.6mm]">
            <Diamond size={1} color={C.goldBright} />
            info@taap.sa
          </p>
          <p className="flex items-center gap-[1.6mm]">
            <Diamond size={1} color={C.goldBright} />
            taap.sa
          </p>
        </div>
        <div>
          <p style={{ fontSize: "5.2pt", color: C.goldBright, marginBottom: "0.8mm" }}>التراخيص</p>
          <p>رخصة مزاولة المحاماة {firm.licenseNumber}</p>
          <p>السجل الموحد {firm.unifiedNumber}</p>
          <p style={{ color: "rgba(255,255,255,0.7)" }}>الأحد – الخميس ٨ ص – ٥ م</p>
        </div>
      </div>

      <div className="absolute flex items-center gap-[3mm]" style={{ bottom: "5mm", insetInlineStart: "34mm", insetInlineEnd: "14mm" }}>
        <span style={{ height: "0.2mm", flex: 1, background: "rgba(216,174,85,0.4)" }} />
        <span dir="ltr" style={{ ...latin, fontSize: "4.6pt", letterSpacing: "0.34em", color: C.goldBright, whiteSpace: "nowrap" }}>TURKI ALNAIF &amp; PARTNERS · LAWYERS &amp; LEGAL CONSULTANTS · RIYADH</span>
        <span style={{ height: "0.2mm", flex: 1, background: "rgba(216,174,85,0.4)" }} />
      </div>
    </Face>
  );
}

const SLIM_Y = 287; // the continuation page's footer begins here

/** Second and later pages: the thread, the mark, and a slim navy footer that the thread flows into. */
export function Continuation({ guides }: G) {
  return (
    <Face
      w={210}
      h={297}
      bg={PAPER_W}
      guides={guides}
      bleed={
        <>
          <VThread x={BLEED + 16} nodes={[99, 198]} ticks={[148.5]} stopAt={SLIM_Y} />
          <div className="absolute inset-x-0" style={{ bottom: 0, height: `${297 - SLIM_Y + BLEED}mm`, background: C.deep }} />
          <Thread y={BLEED + SLIM_Y} from={BLEED + 16} to="end" foilLine weight={0.35} />
        </>
      }
    >
      <div className="absolute" style={{ top: "13mm", insetInlineStart: "27mm" }}>
        <Mark height={8.5} fill="flat" />
      </div>
      <div className="absolute flex items-center justify-between" style={{ bottom: "2.6mm", insetInlineStart: "27mm", insetInlineEnd: "14mm" }}>
        <span dir="ltr" style={{ ...latin, fontSize: "4.8pt", letterSpacing: "0.3em", color: C.goldBright }}>TURKI ALNAIF &amp; PARTNERS</span>
        <span dir="ltr" style={{ ...latin, fontSize: "4.8pt", letterSpacing: "0.3em", color: "rgba(255,255,255,0.8)" }}>TAAP.SA</span>
      </div>
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
      <div className="absolute" style={{ top: "82.4mm", insetInlineStart: "12mm" }}>
        <Mark height={8.4} />
      </div>
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
          <Thread y={BLEED + 206} from={-4} to="end" nodes={[]} foilLine weight={0.35} />
        </>
      }
    >
      {/* front */}
      <div className="absolute" style={{ insetInlineStart: 0, top: 0, width: `${PANEL}mm`, height: "310mm" }}>
        <div className="absolute flex justify-center" style={{ top: "42mm", insetInline: 0 }}>
          <Mark height={118} />
        </div>
        <div className="absolute" style={{ top: "238mm", insetInlineStart: "22mm" }}>
          <Lockup mm={170} fill="foil" />
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
        <div className="absolute" style={{ top: "226mm", insetInline: "14mm", height: "60mm", background: "rgba(0,6,29,0.8)" }} />
        <div className="absolute" style={{ top: "235mm", insetInlineStart: "22mm", fontSize: "9pt", lineHeight: 2, color: "rgba(255,255,255,0.92)" }}>
          {ADDRESS_AR.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p dir="ltr" style={{ ...latin, letterSpacing: "0.06em", color: C.goldBright, marginTop: "2mm" }}>
            {PHONE} · info@taap.sa
          </p>
        </div>
        <div className="absolute" style={{ top: "235mm", insetInlineEnd: "22mm" }}>
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
