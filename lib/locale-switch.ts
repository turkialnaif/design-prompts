const SAME = ["/about", "/services", "/contact", "/corporate-clients", "/privacy", "/sectors"];

/** Arabic path -> its English counterpart when one exists, otherwise the English home. */
export function arToEnHref(pathname: string): string {
  if (pathname === "/") return "/en";
  if (SAME.includes(pathname)) return `/en${pathname}`;
  if (pathname.startsWith("/team/") || pathname.startsWith("/sectors/")) return `/en${pathname}`;
  return "/en";
}

export function enToArHref(pathname: string): string {
  if (pathname === "/en") return "/";
  const rest = pathname.replace(/^\/en/, "");
  return rest || "/";
}
