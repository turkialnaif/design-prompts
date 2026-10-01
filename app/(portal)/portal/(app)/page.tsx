import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { invoices, matters, payments } from "@/lib/db/schema";
import { requireClient } from "@/lib/auth/session";
import WelcomeBand from "@/components/admin/WelcomeBand";
import { Badge, Card, Empty, fmtDate, money } from "@/components/admin/ui";
import { invoiceStatusLabel, matterStatusLabel } from "@/lib/erp/labels";

export const metadata = { title: "قضاياي" };

export default async function PortalHome() {
  const u = await requireClient();
  const d = await db();
  const list = await d.select().from(matters).where(eq(matters.clientId, u.clientId)).orderBy(desc(matters.createdAt));
  const inv = await d
    .select({ i: invoices, paid: sql<string>`coalesce((select sum(${payments.amount}) from ${payments} where ${payments.invoiceId} = ${invoices.id}), 0)` })
    .from(invoices)
    .where(eq(invoices.clientId, u.clientId));
  const balance = inv.filter((r) => r.i.status === "issued" || r.i.status === "partial").reduce((s, r) => s + Number(r.i.total) - Number(r.paid), 0);
  return (
    <>
      <WelcomeBand
        title={`مرحبًا، ${u.fullName}`}
        sub="هنا حالة قضاياك ومستنداتك المشتركة وفواتيرك"
        chips={[
          { label: "القضايا", value: list.length },
          { label: "المفتوحة", value: list.filter((m) => m.status === "open").length },
          { label: "الرصيد المستحق", value: money(balance) },
        ]}
      />
      {inv.filter((r) => r.i.status !== "draft").length > 0 && (
        <Card title="الفواتير" className="mb-6">
          <ul className="space-y-2">
            {inv.filter((r) => r.i.status !== "draft").map(({ i, paid }) => (
              <li key={i.id} className="flex items-center justify-between rounded-xl bg-[#faf7ef] p-3 text-sm">
                <div><p className="font-mono text-xs font-bold">{i.number}</p><p className="text-xs text-ink-soft/60">{fmtDate(i.issuedOn)} · المتبقي {money(Number(i.total) - Number(paid))}</p></div>
                <div className="text-end"><p className="font-bold">{money(i.total)}</p><Badge tone={i.status === "paid" ? "green" : i.status === "void" ? "red" : "gold"}>{invoiceStatusLabel[i.status]}</Badge></div>
              </li>
            ))}
          </ul>
        </Card>
      )}
      <Card title="قضاياي">
        {list.length === 0 ? <Empty>لا قضايا لعرضها.</Empty> : (
          <ul className="space-y-3">
            {list.map((m) => (
              <li key={m.id}>
                <Link href={`/portal/matters/${m.id}`} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e3ddcb] bg-[#faf7ef] p-4 transition hover:border-[#d0a751]">
                  <div><p className="font-display font-bold">{m.title}</p><p className="mt-0.5 text-xs text-ink-soft/60">{m.number} · فُتحت {fmtDate(m.openedOn)}</p></div>
                  <Badge tone={m.status === "open" ? "green" : "gray"}>{matterStatusLabel[m.status]}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
