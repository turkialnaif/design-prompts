import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { requireClient } from "@/lib/auth/session";
import { portalLogoutAction } from "@/lib/erp/portal-actions";

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const u = await requireClient();
  if (u.mustChangePassword) redirect("/portal/account");
  const d = await db();
  const [c] = await d.select().from(clients).where(eq(clients.id, u.clientId)).limit(1);
  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#f3ead2_0%,#fbf9f3_40%,#eceff2_100%)]">
      <header className="sticky top-0 z-30 border-b border-[#d0a751]/25 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/portal"><Image src="/brand/logo-lockup.png" alt="" width={163} height={48} className="h-9 w-auto" /></Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-ink-soft/70 sm:inline">{c?.name}</span>
            <form action={portalLogoutAction}><button className="rounded-full border border-[#e3ddcb] bg-white px-5 py-2 font-semibold transition hover:border-[#d0a751]">خروج</button></form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
    </div>
  );
}
