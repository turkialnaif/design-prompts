import { notFound } from "next/navigation";
import { INK } from "../../tips/parts";
import { TOTAL, cards } from "../parts";

/** Development only: /vat/1 … /vat/8, the WhatsApp statuses on the VAT refund for individuals' real-estate sales (2018–2020). */
export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { n } = await params;
  const num = Number(n);
  if (!(num >= 1 && num <= TOTAL)) notFound();
  return (
    <main style={{ margin: 0 }}>
      <style>{`nextjs-portal { display: none !important; } html, body { margin: 0; padding: 0; background: ${INK}; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }`}</style>
      {cards[num - 1]({})}
    </main>
  );
}
