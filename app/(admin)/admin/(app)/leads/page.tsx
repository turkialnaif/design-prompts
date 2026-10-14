import Link from "next/link";
import { and, count, desc, eq, gte, inArray, isNull, ne, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { LEAD_STAGES, leads, users, type LeadStage, type LeadTier } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { Badge, Card, Empty, PageHeader, Stat, Table, Td, Th } from "@/components/admin/ui";
import { stageLabel } from "@/lib/leads/engine";
import { tierLabel } from "@/lib/leads/score";

export const metadata = { title: "الفرص والعملاء المحتملون" };
export const dynamic = "force-dynamic";

const tierTone: Record<LeadTier, "red" | "gold" | "gray"> = { hot: "red", warm: "gold", cold: "gray" };
const stageTone: Record<LeadStage, "blue" | "gray" | "gold" | "green" | "red"> = { new: "blue", contacted: "gray", qualified: "gold", meeting: "gold", proposal: "gold", won: "green", lost: "red" };

const daysAgo = (n: number) => new Date(Date.now() - n * 864e5);

export function ago(d: Date) {
  const h = (Date.now() - d.getTime()) / 36e5;
  return h < 1 ? "أقل من ساعة" : h < 24 ? `${Math.floor(h)} ساعة` : `${Math.floor(h / 24)} يوم`;
}

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ stage?: string; tier?: string }> }) {
  await requireStaff("clients:read");
  const sp = await searchParams;
  const d = await db();
  const since30 = daysAgo(30);
  const since90 = daysAgo(90);

  const [{ waiting }] = await d.select({ waiting: count() }).from(leads).where(and(eq(leads.stage, "new"), isNull(leads.firstContactAt)));
  const [{ hot }] = await d.select({ hot: count() }).from(leads).where(and(eq(leads.tier, "hot"), inArray(leads.stage, ["new", "contacted", "qualified", "meeting", "proposal"])));
  const [{ pipeline }] = await d.select({ pipeline: count() }).from(leads).where(inArray(leads.stage, ["meeting", "proposal"]));
  const [{ total30 }] = await d.select({ total30: count() }).from(leads).where(gte(leads.createdAt, since30));
  const [{ won30 }] = await d.select({ won30: count() }).from(leads).where(and(gte(leads.createdAt, since30), eq(leads.stage, "won")));

  const stage = (LEAD_STAGES as readonly string[]).includes(sp.stage ?? "") ? (sp.stage as LeadStage) : undefined;
  const tier = ["hot", "warm", "cold"].includes(sp.tier ?? "") ? (sp.tier as LeadTier) : undefined;
  const rows = await d
    .select({ l: leads, owner: users.fullName })
    .from(leads)
    .leftJoin(users, eq(leads.ownerId, users.id))
    .where(and(stage ? eq(leads.stage, stage) : ne(leads.stage, "lost"), tier ? eq(leads.tier, tier) : undefined))
    .orderBy(desc(leads.createdAt))
    .limit(300);

  const sources = await d
    .select({ s: leads.source, n: count(), hot: sql<number>`count(*) filter (where ${leads.tier} = 'hot')::int`, won: sql<number>`count(*) filter (where ${leads.stage} = 'won')::int` })
    .from(leads)
    .where(gte(leads.createdAt, since90))
    .groupBy(leads.source)
    .orderBy(sql`count(*) desc`)
    .limit(8);

  const chip = (active: boolean) => `rounded-xl px-4 py-2 text-sm font-semibold ${active ? "bg-[#12233a] text-white" : "border border-[#e3ddcb] bg-white"}`;
  const q = (s?: string, t?: string) => `/admin/leads?${[s ? `stage=${s}` : "", t ? `tier=${t}` : ""].filter(Boolean).join("&")}`;

  return (
    <>
      <PageHeader title="الفرص والعملاء المحتملون" sub="من موجز المسألة إلى العقد الموقّع: الردّ الفوري والتقييم والمتابعة والعرض آليًا، والقرار للمحامي" />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="بلا تواصل بعد" value={waiting} tone={waiting ? "warn" : "good"} hint="الردّ في الساعة الأولى يرفع التحويل" />
        <Stat label="فرص حارة مفتوحة" value={hot} hint="درجة 60 فأكثر" />
        <Stat label="في الاجتماع أو العرض" value={pipeline} />
        <Stat label="التحويل في 30 يومًا" value={total30 ? `${Math.round((won30 / total30) * 100)}%` : "—"} hint={`${won30} عقد من ${total30} فرصة`} tone={won30 ? "good" : "default"} />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Link href={q(undefined, tier)} className={chip(!stage)}>المفتوحة</Link>
        {LEAD_STAGES.map((s) => (
          <Link key={s} href={q(s, tier)} className={chip(stage === s)}>{stageLabel[s]}</Link>
        ))}
        <span className="mx-1 w-px bg-[#e3ddcb]" />
        {(["hot", "warm", "cold"] as const).map((t) => (
          <Link key={t} href={q(stage, tier === t ? undefined : t)} className={chip(tier === t)}>{tierLabel[t]}</Link>
        ))}
      </div>

      <Card className="mb-6">
        {rows.length === 0 ? (
          <Empty>لا فرص بعد. أول موجز يصل من الموقع يظهر هنا خلال ثوانٍ مع درجته وردٍّ آلي للعميل.</Empty>
        ) : (
          <Table>
            <thead>
              <tr><Th>العميل المحتمل</Th><Th>الدرجة</Th><Th>المسألة</Th><Th>المصدر</Th><Th>المرحلة</Th><Th>منذ</Th><Th>المسؤول</Th></tr>
            </thead>
            <tbody>
              {rows.map(({ l, owner }) => (
                <tr key={l.id} className="hover:bg-[#faf7ef]">
                  <Td><Link href={`/admin/leads/${l.id}`} className="font-bold text-ink hover:underline">{l.name}</Link>{l.org && <span className="block text-xs text-ink-soft/80">{l.org}</span>}{l.conflictNote && <span className="block text-xs font-bold text-red-700">تعارض محتمل</span>}</Td>
                  <Td><Badge tone={tierTone[l.tier]}>{tierLabel[l.tier]} · {l.score}</Badge></Td>
                  <Td className="max-w-[16rem] truncate">{l.matterType ?? "—"}</Td>
                  <Td>{l.source}</Td>
                  <Td><Badge tone={stageTone[l.stage]}>{stageLabel[l.stage]}</Badge></Td>
                  <Td>{ago(l.createdAt)}</Td>
                  <Td>{owner ?? "—"}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {sources.length > 0 && (
        <Card title="أي مصدر يجلب عقودًا؟ (آخر 90 يومًا)">
          <Table>
            <thead><tr><Th>المصدر</Th><Th>فرص</Th><Th>حارة</Th><Th>عقود</Th><Th>تحويل</Th></tr></thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.s}><Td>{s.s}</Td><Td>{s.n}</Td><Td>{s.hot}</Td><Td>{s.won}</Td><Td>{s.n ? `${Math.round((s.won / s.n) * 100)}%` : "—"}</Td></tr>
              ))}
            </tbody>
          </Table>
          <p className="mt-3 text-xs text-ink-soft/80">يُسجَّل المصدر من أول زيارة للعميل (utm أو المُحيل). ضع وسوم utm في روابطك على لينكدان وإنستقرام ورسائل البريد لتعرف ما يعمل.</p>
        </Card>
      )}
    </>
  );
}
