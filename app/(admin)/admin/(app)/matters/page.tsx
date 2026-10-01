import Link from "next/link";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { clients, matters, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { matterScope } from "@/lib/erp/queries";
import { Badge, Card, Empty, Input, LinkButton, PageHeader, Select, Table, Td, Th, fmtDate } from "@/components/admin/ui";
import { matterStatusLabel } from "@/lib/erp/labels";

export const metadata = { title: "القضايا" };

export default async function MattersPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; mine?: string }> }) {
  const user = await requireStaff("matters:read");
  const sp = await searchParams;
  const q = sp.q?.trim();
  const scope = await matterScope(user);
  const d = await db();
  const status = sp.status && sp.status in matterStatusLabel ? (sp.status as keyof typeof matterStatusLabel) : undefined;

  const rows = await d
    .select({ m: matters, c: clients, lawyer: users.fullName })
    .from(matters)
    .innerJoin(clients, eq(matters.clientId, clients.id))
    .leftJoin(users, eq(matters.responsibleId, users.id))
    .where(
      and(
        scope,
        status ? eq(matters.status, status) : undefined,
        sp.mine ? eq(matters.responsibleId, user.id) : undefined,
        q ? or(ilike(matters.title, `%${q}%`), ilike(matters.number, `%${q}%`), ilike(matters.courtCaseNumber, `%${q}%`), ilike(clients.name, `%${q}%`)) : undefined,
      ),
    )
    .orderBy(desc(matters.createdAt))
    .limit(300);

  return (
    <>
      <PageHeader
        title="القضايا"
        sub={`${rows.length} قضية`}
        actions={can(user.role, "matters:write") && <LinkButton href="/admin/matters/new"><Plus className="h-4 w-4" /> قضية جديدة</LinkButton>}
      />
      <Card>
        <form className="mb-4 flex flex-wrap gap-2" action="/admin/matters">
          <div className="min-w-64 flex-1"><Input name="q" defaultValue={q} placeholder="ابحث برقم القضية أو عنوانها أو العميل أو رقم الدعوى" /></div>
          <div className="w-44">
            <Select name="status" defaultValue={sp.status ?? ""}>
              <option value="">كل الحالات</option>
              {Object.entries(matterStatusLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </Select>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="mine" value="1" defaultChecked={!!sp.mine} /> قضاياي</label>
          <button className="rounded-xl bg-[#12233a] px-5 text-sm font-semibold text-white">تصفية</button>
        </form>
        {rows.length === 0 ? <Empty>لا قضايا مطابقة.</Empty> : (
          <Table>
            <thead><tr><Th>الرقم</Th><Th>القضية</Th><Th>العميل</Th><Th>المسؤول</Th><Th>الجهة</Th><Th>الحالة</Th><Th>فُتحت</Th></tr></thead>
            <tbody>
              {rows.map(({ m, c, lawyer }) => (
                <tr key={m.id}>
                  <Td className="font-mono text-xs">{m.number}</Td>
                  <Td><Link href={`/admin/matters/${m.id}`} className="font-semibold hover:text-[#a9843c]">{m.title}</Link><p className="text-xs text-ink-soft/55">{m.practiceArea ?? ""}</p></Td>
                  <Td><Link href={`/admin/clients/${c.id}`} className="hover:text-[#a9843c]">{c.name}</Link></Td>
                  <Td className="text-xs">{lawyer ?? "—"}</Td>
                  <Td className="text-xs">{m.court ?? "—"}</Td>
                  <Td><Badge tone={m.status === "open" ? "green" : m.status === "closed" ? "gray" : "gold"}>{matterStatusLabel[m.status]}</Badge></Td>
                  <Td className="text-xs">{fmtDate(m.openedOn)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}
