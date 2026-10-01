import { and, desc, eq, ilike } from "drizzle-orm";
import { db } from "@/lib/db";
import { auditLog } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { Badge, Card, Empty, Input, PageHeader, Table, Td, Th, fmtDateTime } from "@/components/admin/ui";

export const metadata = { title: "سجل التدقيق" };

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ q?: string; action?: string }> }) {
  await requireStaff("audit:read");
  const sp = await searchParams;
  const d = await db();
  const rows = await d
    .select()
    .from(auditLog)
    .where(and(sp.action ? eq(auditLog.action, sp.action) : undefined, sp.q ? ilike(auditLog.actorName, `%${sp.q}%`) : undefined))
    .orderBy(desc(auditLog.createdAt))
    .limit(300);
  return (
    <>
      <PageHeader title="سجل التدقيق" sub="كل دخول واطلاع وتعديل مسجَّل ولا يمكن حذفه من الواجهة." />
      <Card>
        <form className="mb-4 flex gap-2" action="/admin/audit">
          <div className="flex-1"><Input name="q" defaultValue={sp.q} placeholder="ابحث باسم المستخدم" /></div>
          <div className="w-56"><Input name="action" defaultValue={sp.action} placeholder="نوع العملية (مثال: login_failed)" dir="ltr" /></div>
          <button className="rounded-xl bg-[#12233a] px-5 text-sm font-semibold text-white">تصفية</button>
        </form>
        {rows.length === 0 ? <Empty>لا سجلات.</Empty> : (
          <Table>
            <thead><tr><Th>الوقت</Th><Th>المستخدم</Th><Th>العملية</Th><Th>الكيان</Th><Th>التفاصيل</Th><Th>IP</Th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <Td className="whitespace-nowrap text-xs">{fmtDateTime(r.createdAt)}</Td>
                  <Td className="text-xs">{r.actorName ?? "—"}{r.actorKind === "client" && <Badge tone="blue">عميل</Badge>}</Td>
                  <Td><Badge tone={r.action.includes("failed") || r.action.includes("deleted") || r.action.includes("void") ? "red" : "gold"}>{r.action}</Badge></Td>
                  <Td className="text-xs">{r.entityType ?? ""}</Td>
                  <Td className="max-w-xs truncate font-mono text-[11px]" dir="ltr">{r.meta ? JSON.stringify(r.meta) : ""}</Td>
                  <Td className="font-mono text-[11px]" dir="ltr">{r.ip}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}
