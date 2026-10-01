import Link from "next/link";
import { requireStaff } from "@/lib/auth/session";
import { findConflicts } from "@/lib/erp/conflicts";
import { Badge, Card, Empty, Field, Input, PageHeader, SubmitButton, Textarea } from "@/components/admin/ui";
import { partyRoleLabel } from "@/lib/erp/labels";

export const metadata = { title: "فحص تعارض المصالح" };

export default async function ConflictsPage({ searchParams }: { searchParams: Promise<{ names?: string }> }) {
  await requireStaff("clients:read");
  const sp = await searchParams;
  const names = (sp.names ?? "").split("\n").map((l) => l.trim()).filter(Boolean).map((l) => { const [name, identifier] = l.split("|").map((x) => x.trim()); return { name, identifier }; });
  const hits = names.length ? await findConflicts(names) : [];
  return (
    <>
      <PageHeader title="فحص تعارض المصالح" sub="ابحث عن أي اسم أو هوية في العملاء وفي خصوم كل القضايا قبل قبول تكليف جديد." />
      <Card className="mb-6">
        <form action="/admin/conflicts" className="grid gap-3">
          <Field label="الأسماء (سطر لكل اسم، ويمكن إضافة الهوية بعد | )"><Textarea name="names" rows={4} defaultValue={sp.names} placeholder={"شركة الأمل للتجارة | 1010123456\nمحمد بن عبدالله"} /></Field>
          <div><SubmitButton pendingText="جارٍ الفحص…">فحص</SubmitButton></div>
        </form>
      </Card>
      {names.length > 0 && (
        <Card title={`النتيجة: ${hits.length} تطابق محتمل`}>
          {hits.length === 0 ? <p className="text-sm font-semibold text-emerald-800">لا تعارض ظاهر في السجلات الحالية.</p> : (
            <ul className="space-y-2 text-sm">
              {hits.map((x, i) => (
                <li key={i} className="rounded-xl bg-[#faf7ef] p-3">
                  {x.kind === "party" ? (
                    <>«{x.name}» <Badge tone="red">{partyRoleLabel[(x.role as keyof typeof partyRoleLabel) ?? "other"]}</Badge> في القضية <Link className="font-bold underline" href={`/admin/matters/${x.matterId}`}>{x.matterNumber}</Link> (عميلنا: {x.clientName})</>
                  ) : (
                    <>«{x.name}» <Badge tone="gold">عميل</Badge> — <Link className="font-bold underline" href={`/admin/clients/${x.clientId}`}>فتح الملف</Link></>
                  )}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-ink-soft/55">الفحص نصي على الأسماء والهويات المسجَّلة؛ يُستكمل بحكم المحامي المسؤول.</p>
        </Card>
      )}
      {names.length === 0 && <Empty>أدخل اسمًا لبدء الفحص.</Empty>}
    </>
  );
}
