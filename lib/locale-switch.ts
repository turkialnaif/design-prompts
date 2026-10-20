import { hasEnArticle, hasEnService } from "@/lib/en/slugs";

const SAME = ["/about", "/services", "/contact", "/corporate-clients", "/individuals", "/privacy", "/blog"];

/** Arabic path -> its English counterpart when one exists, otherwise the English home. */
export function arToEnHref(pathname: string): string {
  if (pathname === "/") return "/en";
  if (SAME.includes(pathname)) return `/en${pathname}`;
  if (pathname.startsWith("/team/") || pathname.startsWith("/sectors/")) return `/en${pathname}`;
  const svc = pathname.match(/^\/services\/([^/]+)$/);
  if (svc && hasEnService(svc[1])) return `/en${pathname}`;
  const art = pathname.match(/^\/blog\/([^/]+)$/);
  if (art && hasEnArticle(art[1])) return `/en${pathname}`;
  if (pathname.startsWith("/services/")) return "/en/services";
  return "/en";
}

export function enToArHref(pathname: string): string {
  if (pathname === "/en") return "/";
  const rest = pathname.replace(/^\/en/, "");
  return rest || "/";
}
