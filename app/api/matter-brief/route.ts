import { NextResponse } from "next/server";
import { Resend } from "resend";
import { firm } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 4000;

// Best-effort limit per client address (serverless instances each keep their own count, which is enough to blunt a script).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  for (const [k, v] of hits) if (now - v.t > WINDOW_MS) hits.delete(k);
  const h = hits.get(ip);
  if (!h) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > MAX_PER_WINDOW;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: {
    name?: string;
    org?: string;
    email?: string;
    phone?: string;
    website?: string;
    matterType?: string;
    description?: string;
    locale?: "ar" | "en";
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, org, email, phone, website, matterType, description, locale = "ar" } = body;

  // the hidden field is filled only by scripts: answer as if it worked, send nothing
  if (website) return NextResponse.json({ ok: true });

  if (!name || !email || !matterType || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (phone && !/^[+\d\s()-]{5,30}$/.test(phone)) {
    return NextResponse.json({ error: "Invalid phone." }, { status: 400 });
  }
  if ([name, org, matterType, description].some((v) => (v?.length ?? 0) > MAX_LEN)) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const isAr = locale === "ar";
  const subject = isAr ? `موجز مسألة قانونية جديدة — ${name}` : `New Matter Brief — ${name}`;

  const rows = [
    [isAr ? "الاسم" : "Name", name],
    [isAr ? "المنشأة" : "Organization", org || "—"],
    [isAr ? "البريد الإلكتروني" : "Email", email],
    [isAr ? "الجوال" : "Phone", phone || "—"],
    [isAr ? "نوع المسألة" : "Matter Type", matterType],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    isAr ? "وصف المسألة:" : "Description:",
    description,
  ].join("\n");

  const html = `
    <div style="font-family: sans-serif; direction: ${isAr ? "rtl" : "ltr"};">
      <h2>${escapeHtml(subject)}</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="font-weight:bold; vertical-align:top;">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="font-weight:bold; margin-top:16px;">${isAr ? "وصف المسألة:" : "Description:"}</p>
      <p style="white-space: pre-wrap;">${escapeHtml(description)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `${firm.nameShortAr} <onboarding@resend.dev>`,
      to: firm.email,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  }
}
