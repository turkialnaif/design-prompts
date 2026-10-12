import { notFound } from "next/navigation";
import { BoardOne, BoardThree, BoardTwo } from "@/components/stationery/board";

/** The stationery set on a table (development only). Screenshots of these two boards are the presentation of the set. */
export default async function StationeryBoards() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <main>
      <style>{`
        html, body { margin: 0; padding: 0; background: #00061d; }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .stn-face { box-sizing: border-box; margin: 0 !important; box-shadow: none !important; }
        main :where(p, h1, h2, h3) { margin: 0; }
      `}</style>
      <BoardOne />
      <BoardTwo />
      <BoardThree />
    </main>
  );
}
