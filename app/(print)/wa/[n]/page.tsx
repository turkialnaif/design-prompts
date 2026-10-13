import { notFound } from "next/navigation";
import { INK, TOTAL, cards } from "../parts";

/** Development only: /wa/1 … /wa/10, the WhatsApp statuses on the new Enforcement Law. */
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
