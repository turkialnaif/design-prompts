import Link from "next/link";
import type { ReactNode } from "react";
import SubmitButton from "@/components/admin/SubmitButton";

export function PageHeader({ title, sub, actions }: { title: string; sub?: string; actions?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <span aria-hidden className="mb-3 block h-[3px] w-10 rounded-full bg-[#d0a751]" />
        <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-ink-soft/70">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, actions, children, className = "" }: { title?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-[#e6dfc9] bg-white/85 p-6 shadow-[0_22px_44px_-32px_rgba(20,30,50,0.4)] backdrop-blur ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="font-display flex items-center gap-2.5 text-base font-bold text-ink"><span aria-hidden className="h-4 w-[3px] rounded-full bg-[#d0a751]" />{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, tone = "default" }: { label: string; value: ReactNode; hint?: string; tone?: "default" | "warn" | "good" }) {
  const c = tone === "warn" ? "text-red-700" : tone === "good" ? "text-emerald-700" : "text-ink";
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e6dfc9] bg-white/85 p-5 shadow-[0_22px_44px_-32px_rgba(20,30,50,0.4)] backdrop-blur">
      <span aria-hidden className="absolute inset-x-6 top-0 h-[2px] rounded-full bg-[linear-gradient(90deg,transparent,#d0a751,transparent)]" />
      <p className="text-xs font-semibold text-ink-soft/60">{label}</p>
      <p className={`font-display mt-2 text-3xl font-extrabold ${c}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-soft/55">{hint}</p>}
    </div>
  );
}

const BADGE: Record<string, string> = {
  gold: "bg-[#d0a751]/20 text-[#7a5a14]",
  green: "bg-emerald-100 text-emerald-800",
  red: "bg-red-100 text-red-800",
  gray: "bg-slate-100 text-slate-700",
  blue: "bg-sky-100 text-sky-800",
};
export function Badge({ children, tone = "gray" }: { children: ReactNode; tone?: keyof typeof BADGE }) {
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-bold ${BADGE[tone]}`}>{children}</span>;
}

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}
export const Th = ({ children, className = "" }: { children?: ReactNode; className?: string }) => (
  <th className={`border-b border-[#e3ddcb] bg-[#faf7ef] px-3 py-2.5 text-start text-xs font-bold text-ink-soft/70 first:rounded-s-xl last:rounded-e-xl ${className}`}>{children}</th>
);
export const Td = ({ children, className = "", dir }: { children?: ReactNode; className?: string; dir?: "ltr" | "rtl" }) => (
  <td dir={dir} className={`border-b border-[#f0ebdc] px-3 py-3 align-middle ${className}`}>{children}</td>
);

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl bg-[#faf7ef] px-4 py-8 text-center text-sm text-ink-soft/60">{children}</p>;
}

export function LinkButton({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "ghost" }) {
  const cls =
    variant === "primary"
      ? "bg-[#12233a] text-white hover:bg-[#d0a751] hover:text-[#0a1420]"
      : "border border-[#e3ddcb] bg-white text-ink hover:border-[#d0a751]";
  return (
    <Link href={href} className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${cls}`}>
      {children}
    </Link>
  );
}

export const inputCls =
  "w-full rounded-2xl border border-[#e3ddcb] bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-[#d0a751] focus:ring-2 focus:ring-[#d0a751]/25";

export function Field({ label, children, hint, span = 1 }: { label: string; children: ReactNode; hint?: string; span?: 1 | 2 | 3 }) {
  const s = span === 3 ? "md:col-span-3" : span === 2 ? "md:col-span-2" : "";
  return (
    <div className={s}>
      <label className="mb-1.5 block text-xs font-bold text-ink-soft/70">{label}</label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-ink-soft/50">{hint}</p>}
    </div>
  );
}

export const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={`${inputCls} ${p.className ?? ""}`} />;
export const Textarea = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea rows={4} {...p} className={`${inputCls} ${p.className ?? ""}`} />;
export const Select = (p: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...p} className={`${inputCls} ${p.className ?? ""}`} />;

export { SubmitButton };

export function Flash({ error, ok }: { error?: string; ok?: string }) {
  if (!error && !ok) return null;
  return (
    <div className={`mb-5 rounded-xl px-4 py-3 text-sm font-semibold ${error ? "bg-red-50 text-red-800" : "bg-emerald-50 text-emerald-800"}`}>
      {error ?? ok}
    </div>
  );
}

export const money = (n: number | string | null | undefined) =>
  new Intl.NumberFormat("ar-SA-u-nu-latn", { style: "currency", currency: "SAR", maximumFractionDigits: 2 }).format(Number(n ?? 0));

export const fmtDate = (d: string | Date | null | undefined) =>
  d ? new Intl.DateTimeFormat("ar-SA-u-nu-latn-ca-gregory", { year: "numeric", month: "short", day: "numeric", timeZone: "Asia/Riyadh" }).format(new Date(d)) : "—";

export const fmtDateTime = (d: string | Date | null | undefined) =>
  d
    ? new Intl.DateTimeFormat("ar-SA-u-nu-latn-ca-gregory", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Riyadh" }).format(new Date(d))
    : "—";

export const hours = (minutes: number) => `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;
