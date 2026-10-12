import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { firm } from "@/lib/site";
import { ClausePage, Cover, INK, Sign } from "../parts";

/** Development only: /signline/1 … /signline/6, and /signline/all (the six pages in one document, printed to the PDF). */
export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { n } = await params;
  const qr = await QRCode.toString(`${firm.website}/contact?utm_source=linkedin&utm_medium=carousel&utm_campaign=before-the-signature`, { type: "svg", margin: 0, color: { dark: INK, light: "#0000" } });
  const num = n === "all" ? 0 : Number(n);
  if (n !== "all" && !(num >= 1 && num <= 6)) notFound();
  const pages = [<Cover key={1} />, ...[0, 1, 2, 3].map((i) => <ClausePage key={i + 2} i={i} />), <Sign key={6} qr={qr} />];
  return (
    <main style={{ margin: 0 }}>
      <style>{`nextjs-portal { display: none !important; } @page { size: 1080px 1350px; margin: 0; } html, body { margin: 0; padding: 0; background: ${INK}; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }`}</style>
      {n === "all" ? pages : pages[num - 1]}
    </main>
  );
}
