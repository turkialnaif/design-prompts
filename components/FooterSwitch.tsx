"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** The blog closes with its own, much smaller footer (the lockup, the social accounts, phone, email and address); every other page keeps the site footer. */
export default function FooterSwitch({ site, blog }: { site: ReactNode; blog: ReactNode }) {
  const path = usePathname() ?? "";
  return /^\/(en\/)?blog(\/|$)/.test(path) ? blog : site;
}
