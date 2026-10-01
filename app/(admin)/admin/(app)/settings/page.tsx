import { requireStaff } from "@/lib/auth/session";
import { Card, Field, Flash, Input, PageHeader, SubmitButton, Textarea } from "@/components/admin/ui";
import { getFirmSettings } from "@/lib/erp/settings";
import { saveSettingsAction } from "@/lib/erp/settings-actions";

export const metadata = { title: "الإعدادات" };

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  await requireStaff("settings:manage");
  const sp = await searchParams;
  const f = await getFirmSettings();
  return (
    <>
      <PageHeader title="إعدادات المكتب" sub="تظهر في الفواتير والمستندات المولَّدة." />
      <Flash ok={sp.ok} />
      <Card>
        <form action={saveSettingsAction} className="grid gap-4 md:grid-cols-3">
          <Field label="اسم المكتب" span={2}><Input name="name" defaultValue={f.name} /></Field>
          <Field label="الاسم بالإنجليزية"><Input name="nameEn" dir="ltr" defaultValue={f.nameEn} /></Field>
          <Field label="العنوان" span={2}><Input name="address" defaultValue={f.address} /></Field>
          <Field label="الهاتف"><Input name="phone" dir="ltr" defaultValue={f.phone} /></Field>
          <Field label="البريد"><Input name="email" dir="ltr" defaultValue={f.email} /></Field>
          <Field label="رقم رخصة المحاماة"><Input name="licenseNumber" dir="ltr" defaultValue={f.licenseNumber} /></Field>
          <Field label="الرقم الضريبي (VAT)"><Input name="vatNumber" dir="ltr" defaultValue={f.vatNumber} /></Field>
          <Field label="الآيبان"><Input name="iban" dir="ltr" defaultValue={f.iban} /></Field>
          <Field label="البنك"><Input name="bank" defaultValue={f.bank} /></Field>
          <Field label="نسبة الضريبة %"><Input name="vatRate" type="number" step="0.01" dir="ltr" defaultValue={f.vatRate} /></Field>
          <Field label="مدة السداد الافتراضية (أيام)"><Input name="dueDays" type="number" dir="ltr" defaultValue={f.dueDays} /></Field>
          <Field label="ملاحظة تظهر أسفل الفاتورة" span={3}><Textarea name="invoiceNotes" rows={3} defaultValue={f.invoiceNotes} /></Field>
          <div className="md:col-span-3"><SubmitButton>حفظ الإعدادات</SubmitButton></div>
        </form>
      </Card>
      <Card title="نسخة احتياطية" className="mt-6">
        <p className="mb-3 text-sm leading-7 text-ink-soft/80">
          تنزيل نسخة JSON من العملاء والقضايا والجلسات والمهام والوقت والفواتير (دون كلمات المرور ودون محتوى المستندات المشفّرة). قاعدة البيانات نفسها تحتفظ بنسخ احتياطية تلقائية لدى مزوّد الخدمة.
        </p>
        <a href="/api/admin/export" className="inline-block rounded-xl bg-[#12233a] px-5 py-2.5 text-sm font-semibold text-white">تنزيل النسخة الاحتياطية</a>
      </Card>
    </>
  );
}
