import { db } from "@/lib/db";
import { clientContacts, clients, events, expenses, invoiceItems, invoices, matterNotes, matterParties, matters, payments, tasks, timeEntries } from "@/lib/db/schema";
import { getStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { audit } from "@/lib/audit";

export const dynamic = "force-dynamic";

/** نسخة احتياطية بصيغة JSON (بدون كلمات المرور وبدون محتوى المستندات). */
export async function GET() {
  const user = await getStaff();
  if (!user || !can(user.role, "export:data")) return new Response("Forbidden", { status: 403 });
  const d = await db();
  const data = {
    exportedAt: new Date().toISOString(),
    clients: await d.select().from(clients),
    clientContacts: await d.select().from(clientContacts),
    matters: await d.select().from(matters),
    matterParties: await d.select().from(matterParties),
    matterNotes: await d.select().from(matterNotes),
    events: await d.select().from(events),
    tasks: await d.select().from(tasks),
    timeEntries: await d.select().from(timeEntries),
    expenses: await d.select().from(expenses),
    invoices: await d.select().from(invoices),
    invoiceItems: await d.select().from(invoiceItems),
    payments: await d.select().from(payments),
  };
  await audit({ id: user.id, name: user.fullName }, "data_exported", "system");
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="tnz-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
