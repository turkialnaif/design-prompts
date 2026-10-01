import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { documents, matters, users } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { matterScope } from "@/lib/erp/queries";
import { Card, Input, PageHeader } from "@/components/admin/ui";
import { DocList, DocUpload } from "@/components/admin/work";

export const metadata = { title: "المستندات" };

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const user = await requireStaff("docs:read");
  const sp = await searchParams;
  const d = await db();
  const scope = await matterScope(user);
  const rows = await d
    .select({ doc: documents, m: matters, uploader: users.fullName })
    .from(documents)
    .leftJoin(matters, eq(documents.matterId, matters.id))
    .leftJoin(users, eq(documents.uploadedBy, users.id))
    .where(and(sp.q ? ilike(documents.name, `%${sp.q}%`) : undefined, scope ? sql`(${documents.matterId} is null or ${scope})` : undefined))
    .orderBy(desc(documents.createdAt))
    .limit(300);
  return (
    <>
      <PageHeader title="المستندات" sub="كل الملفات مشفّرة (AES-256) وكل اطلاع عليها مسجَّل في سجل التدقيق." />
      {can(user.role, "docs:write") && <Card title="رفع مستند عام (غير مرتبط بقضية)" className="mb-6"><DocUpload /></Card>}
      <Card>
        <form className="mb-4 flex gap-2" action="/admin/documents">
          <div className="flex-1"><Input name="q" defaultValue={sp.q} placeholder="ابحث باسم المستند" /></div>
          <button className="rounded-xl bg-[#12233a] px-5 text-sm font-semibold text-white">بحث</button>
        </form>
        <DocList items={rows.map(({ doc, m, uploader }) => ({ doc, uploader, matterLabel: m ? m.number : null }))} showMatter />
      </Card>
    </>
  );
}
