import Link from "next/link";
import { and, asc, eq, gte, lt, sql } from "drizzle-orm";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/lib/db";
import { events, matters, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { matterScope } from "@/lib/erp/queries";
import { Card, PageHeader } from "@/components/admin/ui";
import { EventForm, EventList } from "@/components/admin/work";
import { eventKindLabel } from "@/lib/erp/labels";

export const metadata = { title: "الجلسات والتقويم" };

const DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

export default async function CalendarPage({ searchParams }: { searchParams: Promise<{ m?: string }> }) {
  const user = await requireStaff("matters:read");
  const sp = await searchParams;
  const now = new Date();
  const match = /^(\d{4})-(\d{2})$/.exec(sp.m ?? "");
  const year = match ? Number(match[1]) : now.getFullYear();
  const month = match ? Number(match[2]) - 1 : now.getMonth();
  const start = new Date(Date.UTC(year, month, 1));
  const end = new Date(Date.UTC(year, month + 1, 1));
  const prev = new Date(Date.UTC(year, month - 1, 1));
  const next = new Date(Date.UTC(year, month + 1, 1));
  const key = (d: Date) => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;

  const d = await db();
  const scope = await matterScope(user);
  const rows = await d
    .select({ e: events, m: matters, assignee: users.fullName })
    .from(events)
    .leftJoin(matters, eq(events.matterId, matters.id))
    .leftJoin(users, eq(events.assigneeId, users.id))
    .where(and(gte(events.startsAt, start), lt(events.startsAt, end), scope ? sql`(${events.matterId} is null or ${scope})` : undefined))
    .orderBy(asc(events.startsAt));
  const people = await d.select({ id: users.id, fullName: users.fullName }).from(users).where(eq(users.isActive, true));

  const byDay = new Map<number, typeof rows>();
  for (const r of rows) {
    const day = new Date(r.e.startsAt.getTime() + 3 * 3600e3).getUTCDate();
    byDay.set(day, [...(byDay.get(day) ?? []), r]);
  }
  const firstDow = start.getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [...Array(firstDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const todayDay = now.getFullYear() === year && now.getMonth() === month ? now.getDate() : -1;

  return (
    <>
      <PageHeader
        title="الجلسات والتقويم"
        sub={`${MONTHS[month]} ${year} · ${rows.length} موعد`}
        actions={
          <>
            <Link href={`/admin/calendar?m=${key(prev)}`} className="rounded-xl border border-[#e3ddcb] bg-white p-2"><ChevronRight className="h-5 w-5" /></Link>
            <Link href="/admin/calendar" className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">اليوم</Link>
            <Link href={`/admin/calendar?m=${key(next)}`} className="rounded-xl border border-[#e3ddcb] bg-white p-2"><ChevronLeft className="h-5 w-5" /></Link>
          </>
        }
      />

      <Card className="mb-6 overflow-x-auto">
        <div className="grid min-w-[42rem] grid-cols-7 gap-px overflow-hidden rounded-xl border border-[#e3ddcb] bg-[#e3ddcb] text-xs">
          {DAYS.map((n) => <div key={n} className="bg-[#faf7ef] py-2 text-center font-bold text-ink-soft/70">{n}</div>)}
          {cells.map((day, i) => (
            <div key={i} className={`min-h-24 bg-white p-1.5 ${day === todayDay ? "ring-2 ring-inset ring-[#d0a751]" : ""}`}>
              {day && (
                <>
                  <p className={`mb-1 font-bold ${day === todayDay ? "text-[#a9843c]" : "text-ink-soft/60"}`}>{day}</p>
                  <div className="space-y-1">
                    {(byDay.get(day) ?? []).slice(0, 3).map(({ e, m }) => (
                      <Link
                        key={e.id}
                        href={m ? `/admin/matters/${m.id}?tab=events` : "/admin/calendar"}
                        className={`block truncate rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${e.kind === "hearing" ? "bg-[#12233a] text-white" : e.kind === "deadline" ? "bg-red-100 text-red-800" : "bg-[#d0a751]/25 text-[#7a5a14]"} ${e.status !== "scheduled" ? "opacity-50 line-through" : ""}`}
                        title={`${eventKindLabel[e.kind]}: ${e.title}`}
                      >
                        {e.title}
                      </Link>
                    ))}
                    {(byDay.get(day)?.length ?? 0) > 3 && <p className="text-[10px] text-ink-soft/55">+{(byDay.get(day)?.length ?? 0) - 3} أخرى</p>}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="مواعيد الشهر" className="xl:col-span-2">
          <EventList items={rows.map(({ e, m, assignee }) => ({ e, assignee, matterLabel: m ? `${m.number} · ${m.title}` : null }))} showMatter />
        </Card>
        {can(user.role, "events:write") && <Card title="إضافة موعد"><EventForm people={people} /></Card>}
      </div>
    </>
  );
}
