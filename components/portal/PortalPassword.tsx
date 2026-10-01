"use client";

import { useActionState } from "react";
import { portalChangePasswordAction } from "@/lib/erp/portal-actions";

export default function PortalPassword() {
  const [state, action, pending] = useActionState(portalChangePasswordAction, null);
  const field = "w-full rounded-xl border border-[#e3ddcb] bg-white px-4 py-3 text-sm outline-none focus:border-[#d0a751]";
  return (
    <form action={action} className="space-y-4">
      {state?.error && <p className="text-sm font-semibold text-red-700">{state.error}</p>}
      {state?.ok && <p className="text-sm font-semibold text-emerald-700">تم تغيير كلمة المرور. <a className="underline" href="/portal">متابعة</a></p>}
      <input name="current" type="password" placeholder="كلمة المرور الحالية" required dir="ltr" className={field} />
      <input name="next" type="password" placeholder="كلمة المرور الجديدة (١٠ أحرف على الأقل، حروف وأرقام)" required dir="ltr" className={field} />
      <input name="confirm" type="password" placeholder="تأكيد كلمة المرور" required dir="ltr" className={field} />
      <button disabled={pending} className="rounded-xl bg-[#12233a] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">حفظ</button>
    </form>
  );
}
