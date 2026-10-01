"use client";

import { useActionState } from "react";
import { createPortalUserAction, type PortalState } from "@/lib/erp/client-actions";
import { Field, Flash, Input, SubmitButton } from "@/components/admin/ui";

export default function PortalUserForm({ clientId, defaultName, defaultEmail }: { clientId: string; defaultName: string; defaultEmail?: string | null }) {
  const [state, action] = useActionState<PortalState, FormData>(createPortalUserAction, null);
  return (
    <form action={action} className="grid gap-3 md:grid-cols-4">
      <input type="hidden" name="clientId" value={clientId} />
      <div className="md:col-span-4">
        {state?.error && <Flash error={state.error} />}
        {state?.created && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">
            <p className="font-bold text-amber-900">بيانات دخول العميل (تظهر مرة واحدة):</p>
            <p className="mt-1 font-mono" dir="ltr">{state.created.username} / {state.created.password}</p>
            <p className="text-xs text-amber-800">رابط البوابة: /portal/login</p>
          </div>
        )}
      </div>
      <Field label="اسم المستخدم"><Input name="username" required dir="ltr" placeholder="client.name" /></Field>
      <Field label="اسم صاحب الدخول"><Input name="fullName" required defaultValue={defaultName} /></Field>
      <Field label="البريد"><Input name="email" type="email" dir="ltr" defaultValue={defaultEmail ?? ""} /></Field>
      <div className="flex items-end"><SubmitButton>إنشاء دخول للبوابة</SubmitButton></div>
    </form>
  );
}
