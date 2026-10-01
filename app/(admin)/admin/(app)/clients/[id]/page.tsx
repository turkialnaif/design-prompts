import Link from "next/link";
import { notFound } from "next/navigation";
import { desc, eq, sql } from "drizzle-orm";
import { Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { clientContacts, clientUsers, clients, invoices, matters, payments } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { Badge, Card, Empty, Field, Flash, Input, LinkButton, PageHeader, SubmitButton, Table, Td, Th, fmtDate, money } from "@/components/admin/ui";
import ClientForm from "@/components/admin/ClientForm";
import PortalUserForm from "@/components/admin/PortalUserForm";
import { addContactAction, deleteContactAction, togglePortalUser, toggleArchiveClient, updateClientAction } from "@/lib/erp/client-actions";
import { clientTypeLabel, invoiceStatusLabel, matterStatusLabel } from "@/lib/erp/labels";

export default async function ClientPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; error?: string }> }) {
  const user = await requireStaff("clients:read");
  const { id } = await params;
  const sp = await searchParams;
  const d = await db();
  const [client] = await d.select().from(clients).where(eq(clients.id, id)).limit(1);
  if (!client) notFound();

  const contacts = await d.select().from(clientContacts).where(eq(clientContacts.clientId, id));
  const clientMatters = await d.select().from(matters).where(eq(matters.clientId, id)).orderBy(desc(matters.createdAt));
  const portalUsers = await d.select().from(clientUsers).where(eq(clientUsers.clientId, id));
  const canWrite = can(user.role, "clients:write");
  const canBilling = can(user.role, "billing:read");

  const invs = canBilling
    ? await d
        .select({ i: invoices, paid: sql<string>`coalesce((select sum(${payments.amount}) from ${payments} where ${payments.invoiceId} = ${invoices.id}), 0)` })
        .from(invoices)
        .where(eq(invoices.clientId, id))
        .orderBy(desc(invoices.createdAt))
    : [];
  const balance = invs.filter((r) => r.i.status !== "void" && r.i.status !== "draft").reduce((s, r) => s + Number(r.i.total) - Number(r.paid), 0);

  return (
    <>
      <PageHeader
        title={client.name}
        sub={`${clientTypeLabel[client.type]}${client.archived ? " · مؤرشف" : ""}`}
        actions={
          <>
            {canWrite && !client.archived && <LinkButton href={`/admin/matters/new?client=${client.id}`}><Plus className="h-4 w-4" /> قضية جديدة</LinkButton>}
            {canWrite && (
              <form action={toggleArchiveClient}>
                <input type="hidden" name="id" value={client.id} />
                <button className="rounded-xl border border-[#e3ddcb] bg-white px-4 py-2 text-sm font-semibold">{client.archived ? "استرجاع" : "أرشفة"}</button>
              </form>
            )}
          </>
        }
      />
      <Flash error={sp.error} ok={sp.ok} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card title="بيانات العميل">
            {canWrite ? <ClientForm action={updateClientAction} id={client.id} defaults={client} submit="حفظ التعديلات" /> : (
              <dl className="grid gap-3 text-sm md:grid-cols-2">
                <div><dt className="text-xs text-ink-soft/60">الهوية / السجل</dt><dd>{client.identifier ?? "—"}</dd></div>
                <div><dt className="text-xs text-ink-soft/60">الجوال</dt><dd>{client.phone ?? "—"}</dd></div>
                <div><dt className="text-xs text-ink-soft/60">البريد</dt><dd>{client.email ?? "—"}</dd></div>
                <div><dt className="text-xs text-ink-soft/60">المدينة</dt><dd>{client.city ?? "—"}</dd></div>
              </dl>
            )}
          </Card>

          <Card title={`القضايا (${clientMatters.length})`}>
            {clientMatters.length === 0 ? <Empty>لا قضايا لهذا العميل بعد.</Empty> : (
              <Table>
                <thead><tr><Th>الرقم</Th><Th>القضية</Th><Th>الحالة</Th><Th>فُتحت</Th></tr></thead>
                <tbody>
                  {clientMatters.map((m) => (
                    <tr key={m.id}>
                      <Td className="font-mono text-xs">{m.number}</Td>
                      <Td><Link href={`/admin/matters/${m.id}`} className="font-semibold hover:text-[#a9843c]">{m.title}</Link></Td>
                      <Td><Badge tone={m.status === "open" ? "green" : "gray"}>{matterStatusLabel[m.status]}</Badge></Td>
                      <Td className="text-xs">{fmtDate(m.openedOn)}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>

          {canBilling && (
            <Card title="الفواتير والرصيد" actions={<Badge tone={balance > 0 ? "gold" : "green"}>الرصيد المستحق: {money(balance)}</Badge>}>
              {invs.length === 0 ? <Empty>لا فواتير.</Empty> : (
                <Table>
                  <thead><tr><Th>الرقم</Th><Th>التاريخ</Th><Th>الإجمالي</Th><Th>المدفوع</Th><Th>الحالة</Th></tr></thead>
                  <tbody>
                    {invs.map(({ i, paid }) => (
                      <tr key={i.id}>
                        <Td><Link href={`/admin/billing/${i.id}`} className="font-mono text-xs hover:text-[#a9843c]">{i.number}</Link></Td>
                        <Td className="text-xs">{fmtDate(i.issuedOn)}</Td>
                        <Td>{money(i.total)}</Td>
                        <Td>{money(paid)}</Td>
                        <Td><Badge tone={i.status === "paid" ? "green" : i.status === "void" ? "red" : "gold"}>{invoiceStatusLabel[i.status]}</Badge></Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card title="جهات الاتصال">
            {contacts.length === 0 && <Empty>لا جهات اتصال.</Empty>}
            <ul className="space-y-3">
              {contacts.map((c) => (
                <li key={c.id} className="flex items-start justify-between gap-2 rounded-xl bg-[#faf7ef] p-3 text-sm">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-ink-soft/60">{[c.title, c.phone, c.email].filter(Boolean).join(" · ")}</p>
                  </div>
                  {canWrite && (
                    <form action={deleteContactAction}>
                      <input type="hidden" name="id" value={c.id} /><input type="hidden" name="clientId" value={client.id} />
                      <button aria-label="حذف" className="text-red-700"><Trash2 className="h-4 w-4" /></button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
            {canWrite && (
              <form action={addContactAction} className="mt-4 grid gap-2 border-t border-[#f0ebdc] pt-4">
                <input type="hidden" name="clientId" value={client.id} />
                <Input name="name" placeholder="الاسم" required />
                <Input name="title" placeholder="المسمى" />
                <Input name="phone" placeholder="الجوال" dir="ltr" />
                <Input name="email" placeholder="البريد" dir="ltr" />
                <SubmitButton>إضافة جهة اتصال</SubmitButton>
              </form>
            )}
          </Card>

          {can(user.role, "portal:manage") && (
            <Card title="دخول العميل إلى البوابة">
              <ul className="mb-4 space-y-2">
                {portalUsers.map((u) => (
                  <li key={u.id} className="flex items-center justify-between gap-2 rounded-xl bg-[#faf7ef] p-3 text-sm">
                    <div><p className="font-semibold">{u.fullName}</p><p className="font-mono text-xs text-ink-soft/60">{u.username}</p></div>
                    <form action={togglePortalUser}>
                      <input type="hidden" name="id" value={u.id} /><input type="hidden" name="clientId" value={client.id} />
                      <button className="rounded-lg border border-[#e3ddcb] px-2.5 py-1 text-xs font-semibold">{u.isActive ? "إيقاف" : "تفعيل"}</button>
                    </form>
                  </li>
                ))}
              </ul>
              <PortalUserForm clientId={client.id} defaultName={client.name} defaultEmail={client.email} />
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
