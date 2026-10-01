export function arToEnHref(pathname: string): string {
  if (pathname === "/") return "/en";
  if (pathname === "/about") return "/en/about";
  if (pathname === "/services") return "/en/services";
  if (pathname === "/contact") return "/en/contact";
  if (pathname.startsWith("/team/")) return `/en${pathname}`;
  return "/en";
}

export function enToArHref(pathname: string): string {
  if (pathname === "/en") return "/";
  const rest = pathname.replace(/^\/en/, "");
  return rest || "/";
}
