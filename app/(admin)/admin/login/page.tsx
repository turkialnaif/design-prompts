import AuthShell from "@/components/AuthShell";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";
import { getStaff } from "@/lib/auth/session";
import { dbConfigured } from "@/lib/db";

export const metadata = { title: "تسجيل الدخول" };

export default async function AdminLogin() {
  const ready = dbConfigured();
  if (ready && (await getStaff())) redirect("/admin");
  return (
    <AuthShell
      title="نظام إدارة المكتب"
      sub="دخول مخصّص للعاملين في المكتب"
      note={
        <p className="flex items-center justify-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-[#e6c988]" />
          اتصال مشفّر · تُسجَّل كل محاولة دخول
        </p>
      }
    >
      {ready ? <LoginForm /> : <p className="rounded-xl bg-white/10 p-4 text-center text-sm leading-7 text-white/80">النظام قيد التهيئة ولم يُفعَّل بعد. سيُتاح الدخول بعد ربط قاعدة البيانات.</p>}
    </AuthShell>
  );
}
