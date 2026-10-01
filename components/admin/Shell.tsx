import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Nav, { type NavItem } from "@/components/admin/Nav";
import { logoutAction } from "@/lib/erp/auth-actions";
import { can, roleLabels, type Cap } from "@/lib/auth/perms";
import type { Staff } from "@/lib/auth/session";

const ITEMS: (NavItem & { cap?: Cap })[] = [
  { href: "/admin", label: "لوحة التحكم", icon: "dashboard", group: "العمل" },
  { group: "العمل", href: "/admin/matters", label: "القضايا", icon: "matters", cap: "matters:read" },
  { group: "العمل", href: "/admin/clients", label: "العملاء", icon: "clients", cap: "clients:read" },
  { group: "العمل", href: "/admin/conflicts", label: "فحص التعارض", icon: "conflicts", cap: "clients:read" },
  { group: "العمل", href: "/admin/calendar", label: "الجلسات والتقويم", icon: "calendar", cap: "matters:read" },
  { group: "العمل", href: "/admin/tasks", label: "المهام", icon: "tasks", cap: "matters:read" },
  { group: "الملفات", href: "/admin/documents", label: "المستندات", icon: "documents", cap: "docs:read" },
  { group: "الملفات", href: "/admin/templates", label: "قوالب المستندات", icon: "templates", cap: "docs:read" },
  { group: "المال", href: "/admin/time", label: "الوقت والمصروفات", icon: "time", cap: "time:write" },
  { group: "المال", href: "/admin/billing", label: "الفوترة والأتعاب", icon: "billing", cap: "billing:read" },
  { group: "المال", href: "/admin/reports", label: "التقارير", icon: "reports", cap: "reports:read" },
  { group: "الإدارة", href: "/admin/users", label: "المستخدمون", icon: "users", cap: "users:manage" },
  { group: "الإدارة", href: "/admin/settings", label: "الإعدادات", icon: "settings", cap: "settings:manage" },
  { group: "الإدارة", href: "/admin/audit", label: "سجل التدقيق", icon: "audit", cap: "audit:read" },
];

export default function Shell({ user, children }: { user: Staff; children: React.ReactNode }) {
  const items = ITEMS.filter((i) => !i.cap || can(user.role, i.cap));
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="relative isolate hidden overflow-hidden bg-[linear-gradient(180deg,#12263f,#060d15)] p-5 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <Image src="/brand/riyadh-skyline.jpg" alt="" fill sizes="272px" className="pointer-events-none -z-10 object-cover object-[50%_80%] opacity-[0.16] [mask-image:linear-gradient(to_top,black_0%,transparent_55%)]" />
        <Link href="/admin" className="mb-4 block">
          <Image src="/brand/logo-lockup.png" alt="تركي النايف وشركاؤه" width={163} height={48} className="h-11 w-auto" />
        </Link>
        <div className="flex-1 overflow-y-auto">
          <Nav items={items} />
        </div>
        <div className="mt-4 border-t border-white/10 pt-4">
          <Link href="/admin/account" className="block rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur hover:bg-white/10">
            <p className="text-sm font-semibold">{user.fullName}</p>
            <p className="text-[11px] text-[#e6c988]">{roleLabels[user.role]}</p>
          </Link>
          <form action={logoutAction}>
            <button className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/65 hover:bg-white/10 hover:text-white">
              <LogOut className="h-4 w-4" /> تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/60 bg-white/70 px-5 py-3 backdrop-blur-xl lg:hidden">
          <Link href="/admin" className="font-display text-sm font-bold">نظام إدارة المكتب</Link>
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-lg border border-line px-3 py-1.5 text-sm">القائمة</summary>
            <div className="absolute end-0 top-full z-40 mt-2 w-64 rounded-2xl bg-[#0f1e30] p-3 shadow-xl">
              <Nav items={items} />
              <form action={logoutAction} className="mt-2 border-t border-white/10 pt-2">
                <button className="w-full rounded-xl px-3 py-2 text-start text-sm text-white/70 hover:bg-white/10">تسجيل الخروج</button>
              </form>
            </div>
          </details>
        </header>
        <main className="mx-auto max-w-[88rem] px-5 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
