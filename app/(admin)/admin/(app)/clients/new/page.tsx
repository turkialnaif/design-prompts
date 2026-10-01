import { Card, Flash, PageHeader } from "@/components/admin/ui";
import ClientForm from "@/components/admin/ClientForm";
import { requireStaff } from "@/lib/auth/session";
import { createClientAction } from "@/lib/erp/client-actions";

export const metadata = { title: "عميل جديد" };

export default async function NewClient({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireStaff("clients:write");
  const sp = await searchParams;
  return (
    <>
      <PageHeader title="عميل جديد" />
      <Flash error={sp.error} />
      <Card><ClientForm action={createClientAction} submit="حفظ العميل" /></Card>
    </>
  );
}
