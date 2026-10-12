import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

/**
 * Social posters (development only: the PNGs are made from this route and kept in docs/social). Same language as the stationery: matte ink, bone, flat
 * brass, the lockup, and nothing else. The Kingdom's emblem is deliberately not used: it is regulated, and a firm's post does not need it.
 */
const INK = "#00061d";
const NAVY = "#00124a";
const BONE = "#f4efe4";
const BRASS = "#c4a04e";
const BRASS_DEEP = "#8a6d25";

const display = (w = 700): CSSProperties => ({ fontFamily: "var(--font-blog-stack)", fontWeight: w });
/** Running text: the site's Arabic face, whose letter shapes are the plainest to read (a prayer must never be misread). */
const plain: CSSProperties = { fontFamily: "var(--font-ar), sans-serif" };

function Dua({ h }: { h: number }) {
  const story = h > 1500;
  const m = 90; // side margin
  return (
    <div dir="rtl" style={{ position: "relative", width: 1080, height: h, background: INK, color: "#fff", overflow: "hidden" }}>
      {/* top: the lockup on the right, the address on the left */}
      <div style={{ position: "absolute", top: story ? 150 : 70, right: m }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/profile/lockup-brass.png" alt="" style={{ width: 250, height: "auto", display: "block" }} />
      </div>
      <p dir="ltr" style={{ position: "absolute", top: story ? 176 : 94, left: m, margin: 0, fontFamily: "var(--font-brand-raw), sans-serif", fontSize: 22, letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)" }}>TAAP.SA</p>

      {/* the invocation */}
      <div style={{ position: "absolute", top: story ? 360 : 186, right: m, left: m }}>
        <div style={{ ...display(), fontSize: story ? 172 : 148, lineHeight: 1.08, color: "#fff" }}>اللهم احفظ</div>
        <div style={{ ...display(), fontSize: story ? 172 : 148, lineHeight: 1.08, color: BRASS }}>بلادنا</div>
        <p style={{ ...plain, margin: `${story ? 64 : 34}px 0 0`, fontSize: story ? 52 : 46, lineHeight: 1.65, color: "#fff" }}>
          وشعبنا، وأحط بلادنا
          <br />
          بالأمن والأمان،
        </p>
        <p style={{ ...plain, margin: `${story ? 40 : 20}px 0 0`, fontSize: story ? 52 : 46, lineHeight: 1.65, color: BRASS }}>
          ورد كيد أعدائنا ومن خلفهم
          <br />
          ومن يدعمهم ومن يرضى بفعلتهم
          <br />
          في نحورهم
        </p>
      </div>

      {/* the article */}
      <div style={{ position: "absolute", left: m, right: m, bottom: story ? 170 : 76, background: BONE, padding: "30px 44px 32px" }}>
        <p style={{ margin: 0, fontSize: 30, color: BRASS_DEEP }}>النظام الأساسي للحكم · المادة الرابعة والثلاثون</p>
        <p style={{ ...plain, margin: "12px 0 0", fontSize: 42, lineHeight: 1.55, color: NAVY }}>الدفاع عن العقيدة الإسلامية والمجتمع والوطن واجب على كل مواطن.</p>
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
