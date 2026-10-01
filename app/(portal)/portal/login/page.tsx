import AuthShell from "@/components/AuthShell";
import { redirect } from "next/navigation";
import PortalLogin from "@/components/portal/PortalLogin";
import { getClientUser } from "@/lib/auth/session";
import { dbConfigured } from "@/lib/db";

export const metadata = { title: "تسجيل الدخول" };

export default async function PortalLoginPage() {
  const ready = dbConfigured();
  if (ready && (await getClientUser())) redirect("/portal");
  return (
    <AuthShell title="بوابة العملاء" sub="تابع قضاياك ومستنداتك وفواتيرك بأمان" note={<p>لم تصلك بيانات الدخول؟ تواصل مع المكتب.</p>}>
      {ready ? <PortalLogin /> : <p className="rounded-xl bg-white/10 p-4 text-center text-sm leading-7 text-white/80">البوابة قيد التهيئة ولم تُفعَّل بعد.</p>}
    </AuthShell>
  );
}
