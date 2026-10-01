"use client";

import { useActionState } from "react";
import { changePasswordAction, confirmTotpAction } from "@/lib/erp/auth-actions";
import { Field, Flash, Input, SubmitButton } from "@/components/admin/ui";

export function ChangePasswordForm() {
  const [state, action] = useActionState(changePasswordAction, null);
  return (
    <form action={action} className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-3"><Flash error={state?.error} ok={state?.ok ? "تم تغيير كلمة المرور." : undefined} /></div>
      <Field label="كلمة المرور الحالية"><Input name="current" type="password" required autoComplete="current-password" dir="ltr" /></Field>
      <Field label="كلمة المرور الجديدة" hint="١٠ أحرف على الأقل، بحروف وأرقام"><Input name="next" type="password" required autoComplete="new-password" dir="ltr" /></Field>
      <Field label="تأكيد كلمة المرور"><Input name="confirm" type="password" required autoComplete="new-password" dir="ltr" /></Field>
      <div className="md:col-span-3"><SubmitButton>تغيير كلمة المرور</SubmitButton></div>
    </form>
  );
}

export function ConfirmTotpForm() {
  const [state, action] = useActionState(confirmTotpAction, null);
  if (state?.ok) return <Flash ok="تم تفعيل المصادقة الثنائية. ستُطلب عند كل دخول." />;
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <div className="w-48"><Field label="الرمز من التطبيق"><Input name="code" inputMode="numeric" maxLength={7} dir="ltr" className="text-center tracking-[0.3em]" placeholder="000000" required /></Field></div>
      <SubmitButton>تفعيل</SubmitButton>
      {state?.error && <p className="w-full text-sm font-semibold text-red-700">{state.error}</p>}
    </form>
  );
}
