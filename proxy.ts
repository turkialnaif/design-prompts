import { NextResponse, type NextRequest } from "next/server";

const strict = process.env.NODE_ENV === "production" && !process.env.ALLOW_LOCAL_DB;
const STAFF = strict ? "__Host-tnz_staff" : "tnz_staff";
const CLIENT = strict ? "__Host-tnz_client" : "tnz_client";

/** فحص متفائل فقط؛ التحقق الحقيقي من الجلسة يتم في كل صفحة وإجراء. */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !req.cookies.get(STAFF)) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (pathname.startsWith("/portal") && !pathname.startsWith("/portal/login") && !req.cookies.get(CLIENT)) {
    return NextResponse.redirect(new URL("/portal/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/portal/:path*"] };
