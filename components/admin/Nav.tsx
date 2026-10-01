"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, Briefcase, CalendarDays, CheckSquare, Clock, FileText, FilePenLine, LayoutDashboard, Receipt,
  ScrollText, Settings, ShieldAlert, Users, UserCog, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard, matters: Briefcase, clients: Users, calendar: CalendarDays, tasks: CheckSquare,
  documents: FileText, templates: FilePenLine, time: Clock, billing: Receipt, reports: BarChart3,
  users: UserCog, settings: Settings, audit: ScrollText, conflicts: ShieldAlert,
};

export type NavItem = { href: string; label: string; icon: keyof typeof ICONS; group?: string };

export default function Nav({ items }: { items: NavItem[] }) {
  const path = usePathname();
  return (
    <nav className="space-y-1">
      {items.map((it, idx) => {
        const Icon = ICONS[it.icon];
        const active = it.href === "/admin" ? path === "/admin" : path.startsWith(it.href);
        const heading = it.group && it.group !== items[idx - 1]?.group ? it.group : null;
        return (
          <div key={it.href}>
            {heading && <p className="px-3.5 pb-1 pt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e6c988]/70">{heading}</p>}
            <Link
              href={it.href}
              className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-[linear-gradient(135deg,#f0d894,#cfa64e)] font-bold text-[#0a1420] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_24px_-14px_rgba(208,167,81,0.9)]"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {it.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
