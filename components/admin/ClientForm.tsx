import { Field, Input, Select, SubmitButton, Textarea } from "@/components/admin/ui";

type Defaults = { type?: string; name?: string; identifier?: string | null; email?: string | null; phone?: string | null; city?: string | null; address?: string | null; notes?: string | null };

export default function ClientForm({ action, defaults = {}, id, submit }: { action: (fd: FormData) => Promise<void>; defaults?: Defaults; id?: string; submit: string }) {
  return (
    <form action={action} className="grid gap-4 md:grid-cols-3">
      {id && <input type="hidden" name="id" value={id} />}
      <Field label="نوع العميل">
        <Select name="type" defaultValue={defaults.type ?? "individual"}>
          <option value="individual">فرد</option>
          <option value="company">شركة</option>
          <option value="institution">مؤسسة / جهة</option>
        </Select>
      </Field>
      <Field label="الاسم" span={2}><Input name="name" required defaultValue={defaults.name} /></Field>
      <Field label="رقم الهوية / السجل التجاري"><Input name="identifier" dir="ltr" defaultValue={defaults.identifier ?? ""} /></Field>
      <Field label="البريد الإلكتروني"><Input name="email" type="email" dir="ltr" defaultValue={defaults.email ?? ""} /></Field>
      <Field label="الجوال"><Input name="phone" dir="ltr" defaultValue={defaults.phone ?? ""} /></Field>
      <Field label="المدينة"><Input name="city" defaultValue={defaults.city ?? ""} /></Field>
      <Field label="العنوان" span={2}><Input name="address" defaultValue={defaults.address ?? ""} /></Field>
      <Field label="ملاحظات داخلية" span={3}><Textarea name="notes" defaultValue={defaults.notes ?? ""} /></Field>
      <div className="md:col-span-3"><SubmitButton>{submit}</SubmitButton></div>
    </form>
  );
}
