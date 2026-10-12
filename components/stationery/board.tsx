import type { CSSProperties, ReactNode } from "react";
import { AppointmentBack, AppointmentFront, CardBack, CardFront, QuestionsBack, QuestionsFront } from "@/components/stationery/cards";
import { BadgeBack, BadgeFront, Billboard, DoorPlate, EntranceSign, Lanyard, Mupi, NamePlate, Notebook, Poster, ReceptionWall, RollUp } from "@/components/stationery/outdoor";
import { Compliments, EnvelopeFront, EnvelopeLiner, FolderSpread, Letterhead, Notepad, Seal } from "@/components/stationery/paper";
import { C, GhostMark, foilBg } from "@/components/stationery/parts";

/** One piece placed on the board: scaled, turned a few degrees and lifted off the surface by a soft shadow. */
function Item({ x, y, z = 1, rot = 0, zoom, children, round = false }: { x: number; y: number; z?: number; rot?: number; zoom: number; children: ReactNode; round?: boolean }) {
  const st: CSSProperties = {
    position: "absolute",
    // `zoom` scales an element's own offsets too, so they are divided back to land where the board says
    left: x / zoom,
    top: y / zoom,
    zIndex: z,
    transform: `rotate(${rot}deg)`,
    filter: "drop-shadow(0 22px 28px rgba(0,0,0,0.5)) drop-shadow(0 4px 6px rgba(0,0,0,0.35))",
    zoom,
    ...(round ? { borderRadius: "50%", overflow: "hidden" } : {}),
  };
  return <div style={st}>{children}</div>;
}

function Surface({ children, caption, sub }: { children: ReactNode; caption: string; sub: string }) {
  return (
    <section className="stn-board relative overflow-hidden" style={{ width: 1920, height: 1200, background: "linear-gradient(135deg,#00124a 0%,#000d33 48%,#00061d 100%)", breakAfter: "page" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 60% at 30% 25%, rgba(40,84,220,0.38), transparent 70%), radial-gradient(ellipse 40% 40% at 90% 100%, rgba(224,179,90,0.14), transparent 70%)" }} />
      {/* the golden thread: one line across the whole table, running under every piece and out of the picture */}
      <div className="absolute" style={{ left: -10, right: -10, top: 640, height: 2, ...foilBg, opacity: 0.9 }} />
      {children}
      <div className="absolute" dir="rtl" style={{ right: 70, bottom: 56, color: "#fff" }}>
        <p style={{ fontFamily: "var(--font-blog-stack)", fontSize: 44, lineHeight: 1.2, margin: 0 }}>{caption}</p>
        <p style={{ margin: "10px 0 0", fontSize: 17, color: "#e0b35a" }}>{sub}</p>
      </div>
      <p className="absolute" dir="ltr" style={{ left: 70, bottom: 56, margin: 0, fontFamily: "var(--font-brand-raw), sans-serif", fontSize: 14, letterSpacing: "0.34em", color: "rgba(246,226,179,0.8)", textTransform: "uppercase" }}>
        Turki AlNaif &amp; Partners · Stationery
      </p>
    </section>
  );
}

export async function BoardOne() {
  return (
    <Surface caption="القرطاسية: الخيط الذهبي" sub="خيطٌ واحد يخرج من كل قطعة سابقًا حافتها، فيكتمل الخط حين تجتمع القطع">
      <Item x={800} y={620} z={1} rot={4} zoom={0.55}>
        <Notepad />
      </Item>
      <Item x={110} y={90} z={2} rot={-2} zoom={0.8}>
        <Letterhead />
      </Item>
      <Item x={1010} y={350} z={2} rot={-2.5} zoom={0.6}>
        <EnvelopeLiner />
      </Item>
      <Item x={800} y={110} z={3} rot={3} zoom={0.72}>
        <EnvelopeFront />
      </Item>
      <Item x={1230} y={540} z={7} rot={0} zoom={1.15} round>
        <Seal />
      </Item>
      <Item x={1440} y={80} z={4} rot={-5} zoom={1.02}>
        <CardFront />
      </Item>
      <Item x={1500} y={250} z={5} rot={3} zoom={1.02}>
        <CardBack />
      </Item>
      <Item x={1450} y={430} z={6} rot={-2} zoom={1.02}>
        <QuestionsFront />
      </Item>
      <Item x={1510} y={610} z={5} rot={4} zoom={1.02}>
        <QuestionsBack />
      </Item>
      <Item x={1180} y={800} z={3} rot={-3} zoom={0.58}>
        <Compliments />
      </Item>
    </Surface>
  );
}

export async function BoardTwo() {
  return (
    <Surface caption="ملف المسألة وبطاقات التسليم" sub="غلافٌ يعبره الخيط الذهبي من الواجهة إلى الظهر، وبطاقتان تُسلَّمان مع كل استشارة">
      <Item x={70} y={110} z={1} rot={-1} zoom={0.68}>
        <FolderSpread />
      </Item>
      <Item x={1290} y={110} z={4} rot={-4} zoom={1.2}>
        <QuestionsBack />
      </Item>
      <Item x={1380} y={410} z={5} rot={3} zoom={1.2}>
        <AppointmentFront />
      </Item>
      <Item x={1290} y={700} z={6} rot={-2} zoom={1.2}>
        <AppointmentBack />
      </Item>
    </Surface>
  );
}

export async function BoardThree() {
  return (
    <Surface caption="اللوحات والمكتب" sub="لوحة إعلانية ولوحة مدينة ولافتة قائمة وملصق، ثم لوحات المدخل والباب والطاولة وجدار الاستقبال والبطاقة التعريفية">
      <Item x={60} y={70} z={2} rot={0} zoom={0.175}>
        <Billboard />
      </Item>
      <Item x={60} y={370} z={2} rot={-1.5} zoom={0.4}>
        <Mupi />
      </Item>
      <Item x={440} y={370} z={3} rot={1.5} zoom={0.34}>
        <RollUp />
      </Item>
      <Item x={690} y={340} z={3} rot={-1} zoom={0.35}>
        <Poster />
      </Item>
      <Item x={1130} y={70} z={2} rot={0} zoom={0.44}>
        <ReceptionWall />
      </Item>
      <Item x={1130} y={250} z={3} rot={-1} zoom={0.34}>
        <DoorPlate />
      </Item>
      <Item x={1590} y={350} z={3} rot={1.5} zoom={0.34}>
        <NamePlate />
      </Item>
      <Item x={1130} y={430} z={4} rot={1} zoom={0.22}>
        <EntranceSign />
      </Item>
      <Item x={1590} y={60} z={5} rot={-3} zoom={0.72}>
        <BadgeFront />
      </Item>
      <Item x={1760} y={80} z={6} rot={3} zoom={0.72}>
        <BadgeBack />
      </Item>
      <Item x={1130} y={730} z={3} rot={-1} zoom={0.34}>
        <Notebook />
      </Item>
      <Item x={60} y={980} z={2} rot={0} zoom={0.19}>
        <Lanyard />
      </Item>
    </Surface>
  );
}
