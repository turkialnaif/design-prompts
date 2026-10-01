"use client";

import { useActionState } from "react";
import { createUserAction, resetPasswordAction, type UserFormState } from "@/lib/erp/user-actions";
import { Field, Flash, Input, Select, SubmitButton } from "@/components/admin/ui";
import { roleLabels } from "@/lib/auth/perms";
import { ROLES } from "@/lib/db/schema";

function Created({ state }: { state: NonNullable<UserFormState> }) {
  if (!state.created) return null;
  return (
    <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm">
      <p className="font-bold text-amber-900">كلمة المرور المؤقتة تظهر مرة واحدة فقط — انسخها وسلّمها للمستخدم:</p>
      <p className="mt-2 font-mono text-base" dir="ltr">{state.created.username} / {state.created.password}</p>
      <p className="mt-1 text-xs text-amber-800">سيُطلب منه تغييرها عند أول دخول.</p>
    </div>
  );
}

export function CreateUserForm() {
  const [state, action] = useActionState<UserFormState, FormData>(createUserAction, null);
  return (
    <form action={action} className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-3">
        {state?.error && <Flash error={state.error} />}
        {state && <Created state={state} />}
      </div>
      <Field label="اسم المستخدم (لاتيني)"><Input name="username" required dir="ltr" placeholder="mohammed.a" /></Field>
      <Field label="الاسم الكامل"><Input name="fullName" required /></Field>
      <Field label="الدور">
        <Select name="role" defaultValue="lawyer">
          {ROLES.map((r) => <option key={r} value={r}>{roleLabels[r]}</option>)}
        </Select>
      </Field>
      <Field label="البريد الإلكتروني"><Input name="email" type="email" dir="ltr" /></Field>
      <Field label="سعر الساعة (ر.س)" hint="يُستخدم في تسجيل الوقت"><Input name="hourlyRate" type="number" step="0.01" min="0" dir="ltr" /></Field>
      <Field label="رقم الترخيص / القيد"><Input name="barNumber" dir="ltr" /></Field>
      <div className="md:col-span-3"><SubmitButton>إنشاء المستخدم</SubmitButton></div>
    </form>
  );
}

export function ResetPasswordButton({ id }: { id: string }) {
  const [state, action] = useActionState<UserFormState, FormData>(resetPasswordAction, null);
  return (
    <form action={action} className="inline">
      <input type="hidden" name="id" value={id} />
      <SubmitButton className="!bg-white !px-3 !py-1.5 !text-xs !text-ink border border-[#e3ddcb] hover:!border-[#d0a751]">كلمة مرور جديدة</SubmitButton>
      {state?.created && (
        <span className="mt-2 block rounded-lg bg-amber-50 px-3 py-2 font-mono text-xs text-amber-900" dir="ltr">{state.created.password}</span>
      )}
    </form>
  );
}
