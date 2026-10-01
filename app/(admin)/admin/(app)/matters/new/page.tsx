import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { Card, Flash, PageHeader } from "@/components/admin/ui";
import MatterForm from "@/components/admin/MatterForm";
import { createMatterAction } from "@/lib/erp/matter-actions";

export const metadata = { title: "قضية جديدة" };

export default async function NewMatter({ searchParams }: { searchParams: Promise<{ client?: string; error?: string }> }) {
  await requireStaff("matters:write");
  const sp = await searchParams;
  const d = await db();
  const cl = await d.select({ id: clients.id, name: clients.name }).from(clients).where(eq(clients.archived, false)).orderBy(asc(clients.name));
  const lawyers = await d.select({ id: users.id, fullName: users.fullName }).from(users).where(eq(users.isActive, true)).orderBy(asc(users.fullName));
  return (
    <>
      <PageHeader title="قضية جديدة" sub="يُفحص تعارض المصالح تلقائيًا مقابل الخصوم والعملاء عند الحفظ." />
      <Flash error={sp.error} />
      <Card><MatterForm action={createMatterAction} clients={cl} lawyers={lawyers} clientId={sp.client} submit="فتح القضية" withParties /></Card>
    </>
  );
}
