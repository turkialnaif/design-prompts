import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { firm } from "@/lib/site";
import Snap from "../parts";

/** Development only: /snap/0 … /snap/7 (?t=seconds shows one moment). The frames are rendered one by one and encoded to MP4. */
export default async function Page({ params, searchParams }: { params: Promise<{ n: string }>; searchParams: Promise<{ t?: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { n } = await params;
  const { t } = await searchParams;
  const num = Number(n);
  if (!(num >= 0 && num <= 7)) notFound();
  const qr = await QRCode.toString(`${firm.website}/contact?utm_source=snapchat&utm_medium=story&utm_campaign=true-or-false`, { type: "svg", margin: 0, color: { dark: "#00061d", light: "#0000" } });
  return (
    <main style={{ margin: 0 }}>
      <style>{`nextjs-portal { display: none !important; } html, body { margin: 0; padding: 0; background: #00061d; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }`}</style>
      <Snap n={num} qr={qr} t0={Number(t ?? 0)} />
    </main>
  );
}
