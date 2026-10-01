import Link from "next/link";
import { and, asc, eq, ilike, or, sql } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { clients, matters } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { Badge, Card, Empty, Input, LinkButton, PageHeader, Table, Td, Th } from "@/components/admin/ui";
import { clientTypeLabel } from "@/lib/erp/labels";

export const metadata = { title: "العملاء" };

export default async function ClientsPage({ searchParams }: { searchParams: Promise<{ q?: string; archived?: string }> }) {
  const user = await requireStaff("clients:read");
  const sp = await searchParams;
  const q = sp.q?.trim();
  const d = await db();
  const rows = await d
    .select({ c: clients, matterCount: sql<number>`(select count(*)::int from ${matters} where ${matters.clientId} = ${clients.id})` })
    .from(clients)
    .where(and(eq(clients.archived, sp.archived === "1"), q ? or(ilike(clients.name, `%${q}%`), ilike(clients.identifier, `%${q}%`), ilike(clients.phone, `%${q}%`)) : undefined))
    .orderBy(asc(clients.name))
    .limit(300);

  return (
    <>
      <PageHeader
        title="العملاء"
        sub={`${rows.length} ${sp.archived === "1" ? "عميل مؤرشف" : "عميل"}`}
        actions={can(user.role, "clients:write") && <LinkButton href="/admin/clients/new"><Plus className="h-4 w-4" /> عميل جديد</LinkButton>}
      />
      <Card>
        <form className="mb-4 flex flex-wrap gap-2" action="/admin/clients">
          <div className="min-w-64 flex-1"><Input name="q" defaultValue={q} placeholder="ابحث بالاسم أو الهوية أو الجوال" /></div>
          <button className="rounded-xl bg-[#12233a] px-5 text-sm font-semibold text-white">بحث</button>
          <Link href={sp.archived === "1" ? "/admin/clients" : "/admin/clients?archived=1"} className="rounded-xl border border-[#e3ddcb] px-4 py-2.5 text-sm font-semibold">
            {sp.archived === "1" ? "العملاء النشطون" : "المؤرشفون"}
          </Link>
        </form>
        {rows.length === 0 ? (
          <Empty>لا يوجد عملاء مطابقون.</Empty>
        ) : (
          <Table>
            <thead><tr><Th>الاسم</Th><Th>النوع</Th><Th>الهوية / السجل</Th><Th>الجوال</Th><Th>القضايا</Th></tr></thead>
            <tbody>
              {rows.map(({ c, matterCount }) => (
                <tr key={c.id}>
                  <Td><Link href={`/admin/clients/${c.id}`} className="font-semibold hover:text-[#a9843c]">{c.name}</Link></Td>
                  <Td><Badge tone="gold">{clientTypeLabel[c.type]}</Badge></Td>
                  <Td className="font-mono text-xs" >{c.identifier ?? "—"}</Td>
                  <Td className="text-xs" >{c.phone ?? "—"}</Td>
                  <Td>{matterCount}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}
