import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "gold" | "outline";
  /** English/LTR usage: text leads, arrow trails and points right. */
  ltr?: boolean;
  small?: boolean;
};

export default function ArrowButton({ href, children, external, variant = "gold", ltr = false, small = false }: Props) {
  const classes =
    variant === "gold"
      ? "bg-gradient-to-b from-[#f0d894] to-[#cfa64e] text-ink ring-1 ring-white/80 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.8),0_12px_26px_-10px_rgba(169,132,60,0.7)] hover:brightness-105"
      : "glass-card-dark text-white hover:text-gold";

  const Icon = ltr ? ArrowRight : ArrowLeft;
  const iconSpan = (
    <span
      className={`flex ${small ? "h-6 w-6" : "h-8 w-8"} shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
        ltr ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"
      } ${variant === "gold" ? "bg-ink" : "bg-white/10"}`}
    >
      <Icon className={`${small ? "h-3 w-3" : "h-4 w-4"} ${variant === "gold" ? "text-gold" : "text-white"}`} />
    </span>
  );

  const content = (
    <span
      className={`inline-flex items-center rounded-full font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        small ? "gap-2 py-1.5 text-sm" : "gap-3 py-2 text-base"
      } ${small ? (ltr ? "pr-2 pl-5" : "pl-2 pr-5") : ltr ? "pr-3 pl-7" : "pl-3 pr-7"} ${classes}`}
    >
      {ltr ? (
        <>
          {children}
          {iconSpan}
        </>
      ) : (
        <>
          {iconSpan}
          {children}
        </>
      )}
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-block">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="group inline-block">
      {content}
    </Link>
  );
}
