import { NextResponse } from "next/server";
import { Resend } from "resend";
import { firm } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AUDIENCES = new Set(["individuals", "companies", "institutions"]);

function escapeHtml(input: string) {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });

  let body: { email?: string; audience?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const audience = body.audience ?? "";
  const source = (body.source ?? "").slice(0, 40);
  if (!EMAIL_RE.test(email) || email.length > 200) return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  if (!AUDIENCES.has(audience)) return NextResponse.json({ error: "Invalid audience." }, { status: 400 });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `${firm.nameShortAr} <onboarding@resend.dev>`,
    to: firm.email,
    replyTo: email,
    subject: `اشتراك جديد في التنبيهات القانونية — ${email}`,
    html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8">
      <p><strong>البريد:</strong> ${escapeHtml(email)}</p>
      <p><strong>الفئة:</strong> ${escapeHtml(audience)}</p>
      <p><strong>المصدر:</strong> ${escapeHtml(source || "—")}</p>
    </div>`,
  });
  if (error) return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
