import Image from "next/image";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, proposals } from "@/lib/db/schema";
import { firm } from "@/lib/site";
import { logEvent } from "@/lib/leads/engine";
import { acceptAction } from "./actions";

export const dynamic = "force-dynamic";

const fee = { fixed: "أتعاب مقطوعة", hourly: "أتعاب بالساعة", retainer: "اتفاق شهري", contingency: "أتعاب بنسبة النجاح" } as const;
const sar = (n: string | null) => (n ? new Intl.NumberFormat("ar-SA-u-nu-latn", { style: "currency", currency: "SAR", maximumFractionDigits: 2 }).format(Number(n)) : null);

export default async function ProposalPage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ done?: string; error?: string }> }) {
  const { token } = await params;
  const sp = await searchParams;
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) notFound();
  const d = await db();
  const [p] = await d.select().from(proposals).where(eq(proposals.token, token)).limit(1);
  if (!p || p.status === "draft") notFound();
  const [l] = await d.select().from(leads).where(eq(leads.id, p.leadId)).limit(1);

  // first time the client opens it: record it and let the firm know the proposal was read
  if (p.status === "sent") {
    await d.update(proposals).set({ status: "viewed", viewedAt: new Date() }).where(eq(proposals.id, p.id));
    await logEvent(p.leadId, "proposal_viewed", p.title);
  }

  const expired = !!p.validUntil && p.validUntil < new Date().toISOString().slice(0, 10) && p.status !== "accepted";
  const accepted = p.status === "accepted" || sp.done === "1";
  const amount = sar(p.feeAmount);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <header className="mb-8 flex items-center justify-between gap-4">
        <Image src="/brand/profile/lockup-navy.png" alt={firm.nameShortAr} width={326} height={96} className="h-14 w-auto" priority />
        <p className="text-xs text-[#00124a]/70">عرض أتعاب · {l?.locale === "en" ? "" : "سري"}</p>
      </header>

      <article className="border-t-4 border-[#c4a04e] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(0,18,74,0.5)] md:p-12">
        <p className="text-sm font-bold text-[#8a6d25]">إلى: {l?.name}{l?.org ? ` — ${l.org}` : ""}</p>
        <h1 className="font-display mt-3 text-3xl font-bold leading-snug md:text-4xl">{p.title}</h1>
        {p.intro && <p className="mt-5 text-lg leading-9 text-[#00124a]/85">{p.intro}</p>}

        <h2 className="font-display mt-9 text-xl font-bold">نطاق العمل</h2>
        <ol className="mt-3 space-y-3">
          {p.scope.map((s, i) => (
            <li key={i} className="flex gap-4 border-t border-[#e8e1cf] pt-3 text-[17px] leading-8">
              <span className="font-display w-7 shrink-0 text-xl font-bold text-[#c4a04e]">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>

        <div className="mt-9 bg-[#00124a] p-6 text-white">
          <p className="text-sm text-[#f6e2b3]">الأتعاب: {fee[p.feeKind]}</p>
          {amount && <p className="font-display mt-1 text-4xl font-extrabold">{amount}</p>}
          {p.feeNote && <p className="mt-3 text-sm leading-7 text-white/85">{p.feeNote}</p>}
          <p className="mt-3 text-xs text-white/60">لا تشمل الرسوم الحكومية والقضائية وضريبة القيمة المضافة ما لم يُذكر خلاف ذلك في الملاحظة أعلاه.</p>
        </div>
        {p.validUntil && <p className="mt-4 text-sm text-[#00124a]/70">العرض ساري حتى <span dir="ltr">{p.validUntil}</span></p>}

        <section id="accept" className="mt-10 border-t border-[#e8e1cf] pt-8">
          {accepted ? (
            <div className="bg-emerald-50 p-6 text-emerald-900">
              <p className="font-display text-xl font-bold">تم قبول العرض. شكرًا لثقتك.</p>
              <p className="mt-2 leading-8">سيتواصل معك المحامي المسؤول خلال يوم عمل لترتيب المستندات وأول موعد. وصلتك رسالة تأكيد على بريدك.</p>
              {p.acceptName && <p className="mt-2 text-sm">وقّع إلكترونيًا: {p.acceptName}</p>}
            </div>
          ) : expired ? (
            <p className="bg-amber-50 p-5 leading-8 text-amber-900">انتهت صلاحية هذا العرض. راسلنا على <a className="font-bold underline" href={`mailto:${firm.email}`}>{firm.email}</a> وسنجدّده لك.</p>
          ) : (
            <form action={acceptAction} className="space-y-4">
              <input type="hidden" name="token" value={token} />
              {sp.error && <p className="bg-red-50 px-4 py-3 text-sm font-bold text-red-800">{sp.error}</p>}
              <h2 className="font-display text-xl font-bold">قبول العرض</h2>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold">اكتب اسمك الكامل (يُعدّ توقيعًا إلكترونيًا)</span>
                <input name="name" required minLength={3} autoComplete="name" className="w-full border border-[#d9d0b8] bg-white px-4 py-3 text-lg outline-none focus:border-[#c4a04e]" />
              </label>
              <label className="flex items-start gap-3 text-[15px] leading-7">
                <input type="checkbox" name="agree" className="mt-1.5 h-5 w-5 accent-[#c4a04e]" />
                <span>قرأتُ العرض وأوافق على نطاق العمل والأتعاب المذكورين، وأُقرّ بأن كتابة اسمي هنا توقيع إلكتروني على هذه الموافقة، وأن يُسجَّل وقتها وبصمة محتوى العرض.</span>
              </label>
              <button className="w-full bg-[#c4a04e] px-6 py-4 text-lg font-bold text-[#00061d] transition hover:bg-[#f6e2b3]">أقبل العرض</button>
              <p className="text-sm leading-7 text-[#00124a]/70">تريد تعديلًا قبل القبول؟ <a className="font-bold underline" href={`mailto:${firm.email}?subject=${encodeURIComponent(`تعديل على العرض: ${p.title}`)}`}>راسلنا</a> أو اتصل على <span dir="ltr">{firm.phoneDisplay}</span></p>
            </form>
          )}
        </section>
      </article>
      <p className="mt-6 text-center text-xs leading-7 text-[#00124a]/60">{firm.nameAr} · رخصة المحاماة {firm.licenseNumber} · الرياض</p>
    </main>
  );
}
