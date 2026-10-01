import { redirect } from "next/navigation";
import Shell from "@/components/admin/Shell";
import { requireStaff } from "@/lib/auth/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireStaff();
  if (user.mustChangePassword) redirect("/admin/account?force=1");
  return <Shell user={user}>{children}</Shell>;
}
