import PortalPassword from "@/components/portal/PortalPassword";
import { requireClient } from "@/lib/auth/session";

export const metadata = { title: "كلمة المرور" };

export default async function PortalAccount() {
  const u = await requireClient();
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="glass-card w-full max-w-md rounded-3xl p-8">
        <h1 className="font-display text-xl font-bold">تغيير كلمة المرور</h1>
        <p className="mt-1 mb-6 text-sm text-ink-soft/70">{u.mustChangePassword ? "يجب تغيير كلمة المرور المؤقتة قبل المتابعة." : u.fullName}</p>
        <PortalPassword />
      </div>
    </main>
  );
}
