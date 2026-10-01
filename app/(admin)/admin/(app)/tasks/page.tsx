import { and, asc, eq, ne, sql } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/lib/db";
import { matters, tasks, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { matterScope } from "@/lib/erp/queries";
import { Card, PageHeader } from "@/components/admin/ui";
import { TaskForm, TaskList } from "@/components/admin/work";

export const metadata = { title: "المهام" };

export default async function TasksPage({ searchParams }: { searchParams: Promise<{ scope?: string; done?: string }> }) {
  const user = await requireStaff("matters:read");
  const sp = await searchParams;
  const d = await db();
  const scope = await matterScope(user);
  const mine = sp.scope !== "all";
  const rows = await d
    .select({ t: tasks, m: matters, assignee: users.fullName })
    .from(tasks)
    .leftJoin(matters, eq(tasks.matterId, matters.id))
    .leftJoin(users, eq(tasks.assigneeId, users.id))
    .where(
      and(
        sp.done === "1" ? undefined : ne(tasks.status, "done"),
        mine ? eq(tasks.assigneeId, user.id) : scope ? sql`(${tasks.matterId} is null or ${scope})` : undefined,
      ),
    )
    .orderBy(asc(tasks.dueOn))
    .limit(300);
  const people = await d.select({ id: users.id, fullName: users.fullName }).from(users).where(eq(users.isActive, true));
  const chip = (active: boolean) => `rounded-xl px-4 py-2 text-sm font-semibold ${active ? "bg-[#12233a] text-white" : "bg-white border border-[#e3ddcb]"}`;
  return (
    <>
      <PageHeader title="المهام" sub={`${rows.length} مهمة`} actions={
        <>
          <Link href="/admin/tasks" className={chip(mine)}>مهامي</Link>
          <Link href="/admin/tasks?scope=all" className={chip(!mine)}>مهام الفريق</Link>
          <Link href={`/admin/tasks?${mine ? "" : "scope=all&"}done=${sp.done === "1" ? "" : "1"}`} className={chip(sp.done === "1")}>المنجزة</Link>
        </>
      } />
      {can(user.role, "tasks:write") && <Card title="مهمة جديدة" className="mb-6"><TaskForm people={people} /></Card>}
      <Card>
        <TaskList items={rows.map(({ t, m, assignee }) => ({ t, assignee, matterLabel: m ? `${m.number}` : null }))} showMatter />
      </Card>
    </>
  );
}
