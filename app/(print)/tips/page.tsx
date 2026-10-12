import { notFound } from "next/navigation";
import { Cover, H, INK, W } from "./parts";
import { tips } from "./data";

/** Development only: the nine covers in the order the profile will show them (newest, tip 9, at the top right). */
export default function TipsBoard() {
  if (process.env.NODE_ENV === "production") notFound();
  const order = [...tips].reverse();
  return (
    <main style={{ margin: 0 }}>
      <style>{`nextjs-portal { display: none !important; } html, body { margin: 0; padding: 0; background: #fff; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }`}</style>
      <div dir="rtl" style={{ width: W * 3 + 12, display: "grid", gridTemplateColumns: `repeat(3, ${W}px)`, gap: 6, background: "#fff", outline: `1px solid ${INK}` }}>
        {order.map((t) => (
          <div key={t.n} style={{ width: W, height: H }}>
            <Cover tip={t} />
          </div>
        ))}
      </div>
    </main>
  );
}
