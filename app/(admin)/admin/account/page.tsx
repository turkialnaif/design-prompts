import { redirect } from "next/navigation";
import QRCode from "qrcode";
import Shell from "@/components/admin/Shell";
import { Card, Flash, PageHeader, SubmitButton } from "@/components/admin/ui";
import { ChangePasswordForm, ConfirmTotpForm } from "@/components/admin/AccountForms";
import { requireStaff } from "@/lib/auth/session";
import { decryptText } from "@/lib/auth/crypto";
import { totpUri } from "@/lib/auth/totp";
import { beginTotpSetup, disableTotp } from "@/lib/erp/auth-actions";
import { roleLabels } from "@/lib/auth/perms";

export const metadata = { title: "حسابي" };

export default async function Account({ searchParams }: { searchParams: Promise<{ force?: string; setup?: string }> }) {
  const user = await requireStaff();
  const sp = await searchParams;
  if (!user.mustChangePassword && sp.force) redirect("/admin/account");

  let qr: string | null = null;
  let secret: string | null = null;
  if (user.totpSecret && !user.totpEnabled) {
    secret = decryptText(user.totpSecret);
    qr = await QRCode.toDataURL(totpUri(secret, user.username, "TNZ Law"), { margin: 1, width: 220 });
  }

  return (
    <Shell user={user}>
      <PageHeader title="حسابي" sub={`${user.fullName} · ${roleLabels[user.role]} · ${user.username}`} />
      {user.mustChangePassword && <Flash error="يجب تغيير كلمة المرور المؤقتة قبل متابعة العمل." />}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="تغيير كلمة المرور"><ChangePasswordForm /></Card>

        <Card title="المصادقة الثنائية (موصى بها بشدة)">
          {user.totpEnabled ? (
            <div className="space-y-3">
              <p className="text-sm text-emerald-800">المصادقة الثنائية مفعّلة على حسابك.</p>
              <form action={disableTotp}><SubmitButton className="!bg-red-700 hover:!bg-red-800">تعطيل المصادقة الثنائية</SubmitButton></form>
            </div>
          ) : qr && secret ? (
            <div className="space-y-4">
              <p className="text-sm leading-7 text-ink-soft/80">امسح الرمز بتطبيق مثل Google Authenticator أو Microsoft Authenticator، ثم أدخل الرمز المكوّن من ٦ أرقام.</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qr} alt="رمز المصادقة" width={220} height={220} className="rounded-xl border border-[#e3ddcb]" />
              <p className="text-xs text-ink-soft/60">أو أدخل المفتاح يدويًا: <span dir="ltr" className="font-mono">{secret}</span></p>
              <ConfirmTotpForm />
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm leading-7 text-ink-soft/80">تضيف المصادقة الثنائية طبقة حماية: حتى لو عُرفت كلمة مرورك لا يمكن الدخول دون رمز من هاتفك.</p>
              <form action={beginTotpSetup}><SubmitButton>تفعيل المصادقة الثنائية</SubmitButton></form>
            </div>
          )}
        </Card>
      </div>
    </Shell>
  );
}
