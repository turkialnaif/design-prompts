import type { CSSProperties, ReactNode } from "react";
import { FolderInner, FolderOuter } from "@/components/stationery/folder";
import { AppointmentBack, AppointmentFront, CardBack, CardFront, QuestionsBack, QuestionsFront } from "@/components/stationery/cards";
import { Compliments, EnvelopeFront, EnvelopeLiner, Letterhead, Notepad, Seal } from "@/components/stationery/paper";
import { BadgeBack, BadgeFront, Billboard, EntranceSign, Lanyard, Mupi, NamePlate, Notebook, OfficeSign, Poster, ReceptionWall, RollUp } from "@/components/stationery/outdoor";
import { C } from "@/components/stationery/parts";

/** One piece on the table: scaled, turned a degree or two, with a soft shadow. */
function Item({ x, y, z = 1, rot = 0, zoom, children, round = false }: { x: number; y: number; z?: number; rot?: number; zoom: number; children: ReactNode; round?: boolean }) {
  const st: CSSProperties = {
    position: "absolute",
    left: x / zoom, // `zoom` scales an element's own offsets too, so they are divided back
    top: y / zoom,
    zIndex: z,
    transform: `rotate(${rot}deg)`,
    filter: "drop-shadow(0 18px 24px rgba(40,32,18,0.28)) drop-shadow(0 2px 4px rgba(40,32,18,0.3))",
    zoom,
    ...(round ? { borderRadius: "50%", overflow: "hidden" } : {}),
  };
  return <div style={st}>{children}</div>;
}

function Surface({ children, caption, sub }: { children: ReactNode; caption: string; sub: string }) {
  return (
    <section className="stn-board relative overflow-hidden" style={{ width: 1920, height: 1200, background: "radial-gradient(ellipse 70% 80% at 30% 30%, #ddd7c9, #c9c1af)", breakAfter: "page" }}>
      {children}
      <div className="absolute" dir="rtl" style={{ right: 70, bottom: 54, color: C.navy }}>
        <p style={{ fontFamily: "var(--font-blog-stack)", fontSize: 40, lineHeight: 1.2, margin: 0 }}>{caption}</p>
        <p style={{ margin: "8px 0 0", fontSize: 16, color: C.brassDeep }}>{sub}</p>
      </div>
      <p className="absolute" dir="ltr" style={{ left: 70, bottom: 54, margin: 0, fontFamily: "var(--font-brand-raw), sans-serif", fontSize: 13, letterSpacing: "0.34em", color: "rgba(0,18,74,0.7)", textTransform: "uppercase" }}>Turki AlNaif &amp; Partners · Stationery</p>
    </section>
  );
}

export async function BoardOne() {
  return (
    <Surface caption="القرطاسية" sub="الورقة الرسمية والظرف والبطاقات وقسيمة التحية والدفتر والختم">
      <Item x={70} y={60} z={1} rot={-1} zoom={0.62}>
        <Letterhead />
      </Item>
      <Item x={600} y={70} z={1} rot={2} zoom={0.52}>
        <Notepad />
      </Item>
      <Item x={950} y={60} z={2} rot={-1.5} zoom={0.5}>
        <EnvelopeFront />
      </Item>
      <Item x={980} y={320} z={2} rot={1.5} zoom={0.5}>
        <EnvelopeLiner />
      </Item>
      <Item x={1440} y={70} z={3} rot={-3} zoom={1.05}>
        <CardFront />
      </Item>
      <Item x={1470} y={340} z={4} rot={2} zoom={1.05}>
        <CardBack />
      </Item>
      <Item x={620} y={560} z={3} rot={-1} zoom={0.5}>
        <Compliments />
      </Item>
      <Item x={1030} y={640} z={2} rot={0} zoom={1.4} round>
        <Seal />
      </Item>
    </Surface>
  );
}

export async function BoardTwo() {
  return (
    <Surface caption="ملف المسألة وبطاقات التسليم" sub="غلاف كحلي ناعم والشعار مطبوع طبعًا غائرًا بلا حبر، وجيب داخلي لبطاقتين">
      <Item x={60} y={50} z={1} rot={-0.4} zoom={0.4}>
        <FolderOuter />
      </Item>
      <Item x={60} y={580} z={1} rot={0.4} zoom={0.4}>
        <FolderInner />
      </Item>
      <Item x={860} y={100} z={3} rot={-2} zoom={1.3}>
        <QuestionsFront />
      </Item>
      <Item x={1380} y={110} z={3} rot={2} zoom={1.3}>
        <QuestionsBack />
      </Item>
      <Item x={860} y={470} z={3} rot={1.5} zoom={1.3}>
        <AppointmentFront />
      </Item>
      <Item x={1380} y={480} z={3} rot={-2} zoom={1.3}>
        <AppointmentBack />
      </Item>
    </Surface>
  );
}

export async function BoardThree() {
  return (
    <Surface caption="لوحة المكتب وما حولها" sub="لوحة المكتب بجانب الباب، ولوحة المدخل، ولوحة الطاولة، وجدار الاستقبال، والبطاقة التعريفية، والدفتر">
      <Item x={60} y={60} z={2} rot={0} zoom={0.24}>
        <OfficeSign />
      </Item>
      <Item x={1050} y={60} z={2} rot={0} zoom={0.17}>
        <EntranceSign />
      </Item>
      <Item x={1350} y={70} z={2} rot={0} zoom={0.38}>
        <NamePlate />
      </Item>
      <Item x={1350} y={210} z={2} rot={0} zoom={0.36}>
        <ReceptionWall />
      </Item>
      <Item x={1360} y={380} z={4} rot={-3} zoom={0.9}>
        <BadgeFront />
      </Item>
      <Item x={1600} y={400} z={5} rot={3} zoom={0.9}>
        <BadgeBack />
      </Item>
      <Item x={60} y={720} z={3} rot={0} zoom={0.4}>
        <Notebook />
      </Item>
      <Item x={600} y={820} z={2} rot={0} zoom={0.2}>
        <Lanyard />
      </Item>
    </Surface>
  );
}

export async function BoardFour() {
  return (
    <Surface caption="الإعلان" sub="اللوحة الإعلانية ولوحة المدينة واللافتة القائمة والملصق">
      <Item x={60} y={60} z={2} rot={0} zoom={0.33}>
        <Billboard />
      </Item>
      <Item x={60} y={640} z={2} rot={0} zoom={0.3}>
        <Mupi />
      </Item>
      <Item x={400} y={640} z={2} rot={0} zoom={0.26}>
        <RollUp />
      </Item>
      <Item x={640} y={620} z={2} rot={0} zoom={0.3}>
        <Poster />
      </Item>
    </Surface>
  );
}
