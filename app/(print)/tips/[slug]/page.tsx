import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { firm } from "@/lib/site";
import { Checklist, Cover, INK, Points, tipOf } from "../parts";

/** Development only: /tips/<tip>-<slide>, e.g. /tips/3-1 is the cover of tip 3. The PNGs in docs/instagram-tips are screenshots of these. */
export default async function TipSlide({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  const [n, s] = slug.split("-").map(Number);
  const tip = n >= 1 && n <= 9 ? tipOf(n) : undefined;
  if (!tip || ![1, 2, 3].includes(s)) notFound();
  const qr = await QRCode.toString(`${firm.website}/contact?utm_source=instagram&utm_medium=tips&utm_campaign=on-the-margin-${n}`, { type: "svg", margin: 0, color: { dark: INK, light: "#0000" } });
  return (
    <main style={{ margin: 0 }}>
      <style>{`nextjs-portal { display: none !important; } html, body { margin: 0; padding: 0; background: ${INK}; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }`}</style>
      {s === 1 ? <Cover tip={tip} /> : s === 2 ? <Points tip={tip} /> : <Checklist tip={tip} qr={qr} />}
    </main>
  );
}
