"use client";

import { useActionState } from "react";
import { loginAction, verify2faAction, type LoginState } from "@/lib/erp/auth-actions";

const field =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#d0a751] focus:bg-white/15";

export default function LoginForm() {
  const [login, loginDo, loginPending] = useActionState<LoginState, FormData>(loginAction, null);
  const [twofa, twofaDo, twofaPending] = useActionState<LoginState, FormData>(verify2faAction, null);
  const inTwoFa = login?.step === "2fa" || twofa?.step === "2fa";

  if (inTwoFa) {
    return (
      <form action={twofaDo} className="space-y-4" autoComplete="off">
        <p className="text-center text-sm text-white/70">أدخل الرمز المكوّن من ٦ أرقام من تطبيق المصادقة.</p>
        <input name="code" inputMode="numeric" pattern="[0-9 ]*" maxLength={7} autoFocus dir="ltr" className={`${field} text-center text-lg tracking-[0.4em]`} placeholder="000000" />
        {twofa?.error && <p className="text-center text-sm text-red-300">{twofa.error}</p>}
        <button disabled={twofaPending} className="w-full rounded-xl bg-gradient-to-b from-[#f0d894] to-[#cfa64e] py-3 text-sm font-bold text-ink disabled:opacity-60">
          {twofaPending ? "جارٍ التحقق…" : "تحقق ودخول"}
        </button>
      </form>
    );
  }

  return (
    <form action={loginDo} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-white/70" htmlFor="username">اسم المستخدم</label>
        <input id="username" name="username" autoComplete="username" autoFocus required dir="ltr" className={field} placeholder="username" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-white/70" htmlFor="password">كلمة المرور</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required dir="ltr" className={field} placeholder="••••••••••" />
      </div>
      {login?.error && <p className="text-center text-sm text-red-300">{login.error}</p>}
      <button disabled={loginPending} className="w-full rounded-xl bg-gradient-to-b from-[#f0d894] to-[#cfa64e] py-3 text-sm font-bold text-ink transition hover:brightness-105 disabled:opacity-60">
        {loginPending ? "جارٍ الدخول…" : "تسجيل الدخول"}
      </button>
    </form>
  );
}
