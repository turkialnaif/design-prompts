import { Field, Input, Select, SubmitButton, Textarea } from "@/components/admin/ui";
import { billingTypeLabel, courts, practiceAreas } from "@/lib/erp/labels";

type Defaults = Partial<{
  title: string; practiceArea: string | null; matterType: string | null; court: string | null; courtCaseNumber: string | null; stage: string | null;
  claimValue: string | null; description: string | null; responsibleId: string | null; billingType: string; fixedFee: string | null; hourlyRate: string | null;
}>;

export default function MatterForm({
  action, clients, lawyers, defaults = {}, clientId, id, submit, withParties,
}: {
  action: (fd: FormData) => Promise<void>;
  clients?: { id: string; name: string }[];
  lawyers: { id: string; fullName: string }[];
  defaults?: Defaults;
  clientId?: string;
  id?: string;
  submit: string;
  withParties?: boolean;
}) {
  return (
    <form action={action} className="grid gap-4 md:grid-cols-3">
      {id && <input type="hidden" name="id" value={id} />}
      {clients && (
        <Field label="العميل">
          <Select name="clientId" defaultValue={clientId ?? ""} required>
            <option value="" disabled>اختر العميل</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </Field>
      )}
      <Field label="عنوان القضية" span={clients ? 2 : 3}><Input name="title" required defaultValue={defaults.title} /></Field>
      <Field label="مجال الممارسة">
        <Select name="practiceArea" defaultValue={defaults.practiceArea ?? ""}>
          <option value="">—</option>
          {practiceAreas.map((p) => <option key={p}>{p}</option>)}
        </Select>
      </Field>
      <Field label="نوع القضية / المسألة"><Input name="matterType" defaultValue={defaults.matterType ?? ""} placeholder="مطالبة مالية، فسخ عقد…" /></Field>
      <Field label="المرحلة"><Input name="stage" defaultValue={defaults.stage ?? ""} placeholder="قيد النظر، استئناف، تنفيذ…" /></Field>
      <Field label="الجهة القضائية">
        <Select name="court" defaultValue={defaults.court ?? ""}>
          <option value="">—</option>
          {courts.map((c) => <option key={c}>{c}</option>)}
        </Select>
      </Field>
      <Field label="رقم الدعوى لدى الجهة"><Input name="courtCaseNumber" dir="ltr" defaultValue={defaults.courtCaseNumber ?? ""} /></Field>
      <Field label="قيمة المطالبة (ر.س)"><Input name="claimValue" type="number" step="0.01" min="0" dir="ltr" defaultValue={defaults.claimValue ?? ""} /></Field>
      <Field label="المحامي المسؤول">
        <Select name="responsibleId" defaultValue={defaults.responsibleId ?? ""}>
          <option value="">أنا</option>
          {lawyers.map((l) => <option key={l.id} value={l.id}>{l.fullName}</option>)}
        </Select>
      </Field>
      <Field label="طريقة احتساب الأتعاب">
        <Select name="billingType" defaultValue={defaults.billingType ?? "hourly"}>
          {Object.entries(billingTypeLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </Select>
      </Field>
      <Field label="سعر الساعة للقضية (اختياري)"><Input name="hourlyRate" type="number" step="0.01" min="0" dir="ltr" defaultValue={defaults.hourlyRate ?? ""} /></Field>
      <Field label="المبلغ المقطوع (إن وُجد)"><Input name="fixedFee" type="number" step="0.01" min="0" dir="ltr" defaultValue={defaults.fixedFee ?? ""} /></Field>
      <Field label="وصف موجز" span={3}><Textarea name="description" defaultValue={defaults.description ?? ""} /></Field>
      {withParties && (
        <Field label="الخصوم (سطر لكل خصم، ويمكن إضافة رقم الهوية بعد | )" span={3} hint="يُستخدم لفحص تعارض المصالح تلقائيًا عند الحفظ، مثال: شركة الأمل للتجارة | 1010123456">
          <Textarea name="parties" rows={3} />
        </Field>
      )}
      <div className="md:col-span-3"><SubmitButton>{submit}</SubmitButton></div>
    </form>
  );
}
