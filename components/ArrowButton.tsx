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
      ? "btn-gold"
      : "btn-ghost";

  const Icon = ltr ? ArrowRight : ArrowLeft;
  const iconSpan = (
    <span
      className={`flex ${small ? "h-6 w-6" : "h-8 w-8"} shrink-0 items-center justify-center transition-transform duration-200 ${
        ltr ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"
      } ${variant === "gold" ? "bg-[#00124a]" : "bg-white/10"}`}
    >
      <Icon className={`${small ? "h-3 w-3" : "h-4 w-4"} ${variant === "gold" ? "text-gold" : "text-white"}`} />
    </span>
  );

  const content = (
    <span
      className={`btn chamfer-btn inline-flex items-center font-normal ${
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
