import Link from "next/link";
import { and, asc, desc, eq, gte, isNull, lte, ne, sql } from "drizzle-orm";
import { AlertTriangle } from "lucide-react";
import { db } from "@/lib/db";
import { clients, events, invoices, matters, payments, tasks, timeEntries, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { matterScope } from "@/lib/erp/queries";
import WelcomeBand from "@/components/admin/WelcomeBand";
import { Badge, Card, Empty, Flash, Stat, Table, Td, Th, fmtDate, fmtDateTime, money } from "@/components/admin/ui";
import { eventKindLabel, matterStatusLabel, priorityLabel } from "@/lib/erp/labels";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await requireStaff();
  const sp = await searchParams;
  const d = await db();
  const scope = await matterScope(user);
  const now = new Date();
  const in7 = new Date(now.getTime() + 7 * 864e5);
  const today = now.toISOString().slice(0, 10);

  const [openCount] = await d
    .select({ n: sql<number>`count(*)::int` })
    .from(matters)
    .where(and(ne(matters.status, "closed"), ne(matters.status, "archived"), scope));

  const upcoming = await d
    .select({ e: events, m: matters })
    .from(events)
    .leftJoin(matters, eq(events.matterId, matters.id))
    .where(and(gte(events.startsAt, now), lte(events.startsAt, in7), eq(events.status, "scheduled"), scope ? sql`(${events.matterId} is null or ${scope})` : undefined))
    .orderBy(asc(events.startsAt))
    .limit(8);

  const myTasks = await d
    .select({ t: tasks, m: matters })
    .from(tasks)
    .leftJoin(matters, eq(tasks.matterId, matters.id))
    .where(and(eq(tasks.assigneeId, user.id), ne(tasks.status, "done")))
    .orderBy(asc(tasks.dueOn))
    .limit(8);

  const overdue = myTasks.filter((r) => r.t.dueOn && r.t.dueOn < today).length;

  const recent = await d
    .select({ m: matters, c: clients })
    .from(matters)
    .innerJoin(clients, eq(matters.clientId, clients.id))
    .where(scope)
    .orderBy(desc(matters.createdAt))
    .limit(6);

  let unbilled = 0;
  let receivable = 0;
  let monthRevenue = 0;
  if (can(user.role, "billing:read")) {
    const [u] = await d
      .select({ v: sql<string>`coalesce(sum(${timeEntries.minutes} / 60.0 * coalesce(${timeEntries.rate}, 0)), 0)` })
      .from(timeEntries)
      .where(and(isNull(timeEntries.invoiceId), eq(timeEntries.billable, true)));
    unbilled = Number(u?.v ?? 0);
    const [r] = await d
      .select({ v: sql<string>`coalesce(sum(${invoices.total}), 0)` })
      .from(invoices)
      .where(sql`${invoices.status} in ('issued','partial')`);
    receivable = Number(r?.v ?? 0);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    const [p] = await d
      .select({ v: sql<string>`coalesce(sum(${payments.amount}), 0)` })
      .from(payments)
      .where(gte(payments.paidOn, monthStart));
    monthRevenue = Number(p?.v ?? 0);
  }

  const [userCount] = can(user.role, "users:manage") ? await d.select({ n: sql<number>`count(*)::int` }).from(users) : [null];

  return (
    <>
      <WelcomeBand
        title={`مرحبًا، ${user.fullName.split(" ")[0]}`}
        sub={new Intl.DateTimeFormat("ar-SA-u-nu-latn-ca-gregory", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Riyadh" }).format(now)}
        chips={[
          { label: "قضايا مفتوحة", value: openCount?.n ?? 0 },
          { label: "جلسات هذا الأسبوع", value: upcoming.length },
          { label: "مهامي المتأخرة", value: overdue },
        ]}
        actions={[
          ...(can(user.role, "matters:write") ? [{ href: "/admin/matters/new", label: "+ قضية جديدة" }] : []),
          ...(can(user.role, "clients:write") ? [{ href: "/admin/clients/new", label: "+ عميل جديد" }] : []),
        ]}
      />
      {sp.denied && <Flash error="ليست لديك صلاحية للوصول إلى هذه الصفحة." />}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="القضايا المفتوحة" value={openCount?.n ?? 0} />
        <Stat label="جلسات ومواعيد خلال ٧ أيام" value={upcoming.length} />
        <Stat label="مهامي المتأخرة" value={overdue} tone={overdue ? "warn" : "good"} hint={`${myTasks.length} مهمة مفتوحة`} />
        {can(user.role, "billing:read") ? (
          <Stat label="مستحقات غير محصّلة" value={money(receivable)} hint={`وقت غير مفوتر: ${money(unbilled)}`} />
        ) : (
          <Stat label="المستخدمون" value={userCount?.n ?? "—"} />
        )}
      </div>
      {can(user.role, "billing:read") && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Stat label="مدفوعات هذا الشهر" value={money(monthRevenue)} tone="good" />
          <Stat label="وقت قابل للفوترة لم يُفوتر" value={money(unbilled)} />
        </div>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="الجلسات والمواعيد القادمة" actions={<Link href="/admin/calendar" className="text-xs font-bold text-[#a9843c]">التقويم ←</Link>}>
          {upcoming.length === 0 ? (
            <Empty>لا جلسات أو مواعيد خلال الأيام السبعة القادمة.</Empty>
          ) : (
            <Table>
              <tbody>
                {upcoming.map(({ e, m }) => (
                  <tr key={e.id}>
                    <Td>
                      <p className="font-semibold">{e.title}</p>
                      <p className="text-xs text-ink-soft/60">{m ? `${m.number} · ${m.title}` : "بلا قضية"}</p>
                    </Td>
                    <Td><Badge tone="gold">{eventKindLabel[e.kind]}</Badge></Td>
                    <Td className="whitespace-nowrap text-xs">{fmtDateTime(e.startsAt)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>

        <Card title="مهامي" actions={<Link href="/admin/tasks" className="text-xs font-bold text-[#a9843c]">كل المهام ←</Link>}>
          {myTasks.length === 0 ? (
            <Empty>لا مهام مفتوحة لك.</Empty>
          ) : (
            <Table>
              <tbody>
                {myTasks.map(({ t, m }) => {
                  const late = t.dueOn && t.dueOn < today;
                  return (
                    <tr key={t.id}>
                      <Td>
                        <p className="font-semibold">{t.title}</p>
                        <p className="text-xs text-ink-soft/60">{m ? m.number : "عامة"}</p>
                      </Td>
                      <Td><Badge tone={t.priority === "urgent" ? "red" : t.priority === "high" ? "gold" : "gray"}>{priorityLabel[t.priority]}</Badge></Td>
                      <Td className={`whitespace-nowrap text-xs ${late ? "font-bold text-red-700" : ""}`}>
                        {late && <AlertTriangle className="me-1 inline h-3.5 w-3.5" />}
                        {fmtDate(t.dueOn)}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card>

        <Card title="أحدث القضايا" className="xl:col-span-2" actions={<Link href="/admin/matters" className="text-xs font-bold text-[#a9843c]">كل القضايا ←</Link>}>
          {recent.length === 0 ? (
            <Empty>لا قضايا بعد. ابدأ بإضافة عميل ثم قضية.</Empty>
          ) : (
            <Table>
              <thead>
                <tr><Th>الرقم</Th><Th>القضية</Th><Th>العميل</Th><Th>الحالة</Th><Th>فُتحت</Th></tr>
              </thead>
              <tbody>
                {recent.map(({ m, c }) => (
                  <tr key={m.id}>
                    <Td className="font-mono text-xs">{m.number}</Td>
                    <Td><Link href={`/admin/matters/${m.id}`} className="font-semibold hover:text-[#a9843c]">{m.title}</Link></Td>
                    <Td>{c.name}</Td>
                    <Td><Badge tone={m.status === "open" ? "green" : "gray"}>{matterStatusLabel[m.status]}</Badge></Td>
                    <Td className="text-xs">{fmtDate(m.openedOn)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </div>
    </>
  );
}
