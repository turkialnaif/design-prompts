"use client";

import { useActionState } from "react";
import { portalLoginAction, type PortalLoginState } from "@/lib/erp/portal-actions";

export default function PortalLogin() {
  const [state, action, pending] = useActionState<PortalLoginState, FormData>(portalLoginAction, null);
  const field = "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#d0a751] focus:bg-white/15";
  return (
    <form action={action} className="space-y-4">
      <div><label className="mb-1.5 block text-xs font-bold text-white/70" htmlFor="u">اسم المستخدم</label><input id="u" name="username" required dir="ltr" autoComplete="username" className={field} /></div>
      <div><label className="mb-1.5 block text-xs font-bold text-white/70" htmlFor="p">كلمة المرور</label><input id="p" name="password" type="password" required dir="ltr" autoComplete="current-password" className={field} /></div>
      {state?.error && <p className="text-center text-sm font-semibold text-red-300">{state.error}</p>}
      <button disabled={pending} className="w-full rounded-xl bg-gradient-to-b from-[#f0d894] to-[#cfa64e] py-3 text-sm font-bold text-ink disabled:opacity-60">{pending ? "جارٍ الدخول…" : "دخول"}</button>
    </form>
  );
}
