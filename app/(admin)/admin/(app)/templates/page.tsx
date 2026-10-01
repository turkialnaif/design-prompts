import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { docTemplates, matters } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/session";
import { can } from "@/lib/auth/perms";
import { matterScope } from "@/lib/erp/queries";
import { Card, Empty, Field, Flash, Input, PageHeader, Select, SubmitButton, Textarea } from "@/components/admin/ui";
import { PLACEHOLDERS } from "@/lib/erp/templates";
import { deleteTemplateAction, generateDocumentAction, saveTemplateAction } from "@/lib/erp/template-actions";
import { docCategoryLabel } from "@/lib/erp/labels";

export const metadata = { title: "قوالب المستندات" };

export default async function TemplatesPage({ searchParams }: { searchParams: Promise<{ edit?: string; ok?: string; error?: string }> }) {
  const user = await requireStaff("docs:read");
  const sp = await searchParams;
  const d = await db();
  const scope = await matterScope(user);
  const list = await d.select().from(docTemplates).orderBy(asc(docTemplates.name));
  const editing = sp.edit ? list.find((t) => t.id === sp.edit) : undefined;
  const ms = await d.select({ id: matters.id, number: matters.number, title: matters.title }).from(matters).where(scope ?? eq(matters.status, "open")).limit(200);
  const canEdit = can(user.role, "templates:write");
  return (
    <>
      <PageHeader title="قوالب المستندات" sub="اكتب القالب مرة واحدة ثم أنشئ منه مستندًا Word مملوءًا ببيانات القضية والعميل بضغطة." />
      <Flash error={sp.error} ok={sp.ok} />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {list.length === 0 && <Empty>لا قوالب بعد.</Empty>}
          {list.map((t) => (
            <Card key={t.id} title={t.name} actions={<span className="text-xs text-ink-soft/60">{docCategoryLabel[t.category] ?? t.category}</span>}>
              <pre className="mb-4 max-h-40 overflow-auto whitespace-pre-wrap rounded-xl bg-[#faf7ef] p-3 text-xs leading-6">{t.body}</pre>
              <div className="flex flex-wrap items-end gap-3">
                {can(user.role, "docs:write") && (
                  <form action={generateDocumentAction} className="flex flex-wrap items-end gap-2">
                    <input type="hidden" name="templateId" value={t.id} />
                    <div className="w-72"><Select name="matterId" required defaultValue=""><option value="" disabled>اختر القضية لإنشاء المستند</option>{ms.map((m) => <option key={m.id} value={m.id}>{m.number} — {m.title}</option>)}</Select></div>
                    <SubmitButton>إنشاء مستند Word</SubmitButton>
                  </form>
                )}
                {canEdit && (
                  <>
                    <a href={`/admin/templates?edit=${t.id}#form`} className="rounded-xl border border-[#e3ddcb] px-4 py-2.5 text-sm font-semibold">تعديل</a>
                    <form action={deleteTemplateAction}><input type="hidden" name="id" value={t.id} /><button className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700">حذف</button></form>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          {canEdit && (
            <Card title={editing ? "تعديل القالب" : "قالب جديد"}>
              <form id="form" action={saveTemplateAction} className="grid gap-3">
                {editing && <input type="hidden" name="id" value={editing.id} />}
                <Field label="الاسم"><Input name="name" required defaultValue={editing?.name} /></Field>
                <Field label="التصنيف">
                  <Select name="category" defaultValue={editing?.category ?? "general"}>{Object.entries(docCategoryLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</Select>
                </Field>
                <Field label="النص" hint="ابدأ السطر بـ «# » لعنوان رئيسي و«## » لعنوان فرعي"><Textarea name="body" rows={14} required defaultValue={editing?.body} /></Field>
                <SubmitButton>{editing ? "حفظ" : "إضافة القالب"}</SubmitButton>
              </form>
            </Card>
          )}
          <Card title="المتغيّرات المتاحة">
            <ul className="space-y-1.5 text-xs">
              {PLACEHOLDERS.map(([k, l]) => <li key={k} className="flex justify-between gap-2"><span className="font-mono" dir="ltr">{k}</span><span className="text-ink-soft/60">{l}</span></li>)}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
