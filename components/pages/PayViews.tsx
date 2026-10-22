import { CheckCircle2, CircleAlert, Lock, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import PaymentMethods from "@/components/PaymentMethods";
import { Band, HeroHead } from "@/components/ui";
import { lookupInvoiceAction, startPaymentAction } from "@/lib/pay-actions";
import { canPay, type PayableInvoice } from "@/lib/pay";
import { firm } from "@/lib/site";

type L = "ar" | "en";

const copy = {
  ar: {
    eyebrow: "الدفع الإلكتروني",
    title: "ادفع فاتورتك بأمان",
    lead: "ادفع فواتير المكتب ببطاقة فيزا أو ماستركارد أو مدى عبر صفحة دفع آمنة من شبكة العالمية (Network International). لا تصل بيانات بطاقتك إلى موقعنا.",
    lookupTitle: "ابحث عن فاتورتك",
    lookupLead: "أدخل رقم الفاتورة كما ورد في الفاتورة المرسلة إليك، وآخر أربعة أرقام من جوالك المسجّل لدينا.",
    number: "رقم الفاتورة",
    numberHint: "مثال: INV-2026-0001",
    last4: "آخر ٤ أرقام من الجوال",
    next: "متابعة",
    err: {
      format: "تحقق من رقم الفاتورة (مثل INV-2026-0001) ومن الأرقام الأربعة.",
      notfound: "لم نجد فاتورة بهذه البيانات. تأكد منها أو تواصل معنا.",
      slow: "محاولات كثيرة. حاول بعد قليل أو تواصل معنا.",
      off: "الدفع الإلكتروني قيد التفعيل حاليًا. تواصل معنا لإتمام الدفع بالتحويل البنكي.",
      gateway: "تعذّر الاتصال ببوابة الدفع الآن. حاول بعد دقائق أو تواصل معنا.",
    },
    invoice: "فاتورة",
    client: "العميل",
    total: "إجمالي الفاتورة",
    paid: "المدفوع",
    due: "المستحق الآن",
    dueOn: "تاريخ الاستحقاق",
    pay: "ادفع الآن",
    sar: "ر.س",
    securedBy: "تتم عملية الدفع على صفحة آمنة من شبكة العالمية (Network International). نحن لا نرى ولا نحفظ بيانات بطاقتك.",
    vat: "المبالغ شاملة ضريبة القيمة المضافة وفق الفاتورة.",
    settled: "هذه الفاتورة مسددة بالكامل. شكرًا لك.",
    unavailable: "هذه الفاتورة غير متاحة للدفع حاليًا. تواصل معنا.",
    refund: "لأي استفسار عن الفاتورة أو الدفع: ",
    resultOk: "تمت عملية الدفع بنجاح",
    resultOkLead: (n: string | null, a: number) => `استلمنا ${a.toLocaleString("ar-SA", { minimumFractionDigits: 2 })} ر.س${n ? ` للفاتورة ${n}` : ""}. سنرسل لك الإيصال بالبريد عند الحاجة.`,
    resultFail: "لم تكتمل عملية الدفع",
    resultFailLead: "لم يُخصم أي مبلغ إن لم تظهر لك رسالة نجاح من البنك. يمكنك المحاولة مرة أخرى من رابط الفاتورة.",
    back: "العودة إلى الدفع",
    contact: "تواصل معنا",
  },
  en: {
    eyebrow: "Online payment",
    title: "Pay your invoice securely",
    lead: "Pay the firm's invoices by Visa, Mastercard or mada on a secure payment page from Network International. Your card details never reach our website.",
    lookupTitle: "Find your invoice",
    lookupLead: "Enter the invoice number from the invoice sent to you and the last four digits of the mobile number we hold for you.",
    number: "Invoice number",
    numberHint: "e.g. INV-2026-0001",
    last4: "Last 4 digits of your mobile",
    next: "Continue",
    err: {
      format: "Check the invoice number (like INV-2026-0001) and the four digits.",
      notfound: "We could not find an invoice with these details. Please check them or contact us.",
      slow: "Too many attempts. Please try again shortly or contact us.",
      off: "Online payment is being activated. Please contact us to pay by bank transfer.",
      gateway: "The payment gateway is unreachable right now. Please try again in a few minutes or contact us.",
    },
    invoice: "Invoice",
    client: "Client",
    total: "Invoice total",
    paid: "Paid",
    due: "Amount due",
    dueOn: "Due date",
    pay: "Pay now",
    sar: "SAR",
    securedBy: "Payment is made on a secure page run by Network International. We never see or store your card details.",
    vat: "Amounts include VAT as shown on the invoice.",
    settled: "This invoice is paid in full. Thank you.",
    unavailable: "This invoice cannot be paid online right now. Please contact us.",
    refund: "For any question about the invoice or the payment: ",
    resultOk: "Payment received",
    resultOkLead: (n: string | null, a: number) => `We received SAR ${a.toLocaleString("en-US", { minimumFractionDigits: 2 })}${n ? ` for invoice ${n}` : ""}.`,
    resultFail: "The payment was not completed",
    resultFailLead: "You were not charged unless the bank showed you a success message. You can try again from your invoice link.",
    back: "Back to payment",
    contact: "Contact us",
  },
};

const input = "w-full rounded-xl border border-[#00124a]/20 bg-white px-4 py-3 text-base text-[#00124a] outline-none focus:border-[#c9a24a] focus:ring-2 focus:ring-[#c9a24a]/30";
const pre = (l: L) => (l === "en" ? "/en/pay" : "/pay");
const money = (n: number, l: L) => n.toLocaleString(l === "ar" ? "ar-SA" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Hero({ l }: { l: L }) {
  const t = copy[l];
  return (
    <PageHero>
      <HeroHead eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
        <div className="mt-8 flex justify-center">
          <PaymentMethods locale={l} />
        </div>
      </HeroHead>
    </PageHero>
  );
}

function Notice({ text, tone = "warn" }: { text: string; tone?: "warn" | "ok" }) {
  const Icon = tone === "ok" ? CheckCircle2 : CircleAlert;
  return (
    <p className={`mb-6 flex items-start gap-3 rounded-xl px-4 py-3 text-sm leading-7 ${tone === "ok" ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"}`} role="status">
      <Icon className="mt-1 h-4 w-4 shrink-0" aria-hidden />
      {text}
    </p>
  );
}

export function PayLookup({ locale: l, error }: { locale: L; error?: string }) {
  const t = copy[l];
  const msg = error && (t.err as Record<string, string>)[error];
  return (
    <div>
      <style>{"[data-footer-cta]{display:none}"}</style>
      <Hero l={l} />
      <Band tone="tint">
        <div className="mx-auto max-w-xl px-5">
          <div className="glass-card rounded-3xl p-7 md:p-10">
            <h2 className="font-display text-3xl font-light text-[#00124a]">{t.lookupTitle}</h2>
            <p className="mb-7 mt-2 text-sm font-light leading-7 text-ink-soft">{t.lookupLead}</p>
            {msg && <Notice text={msg} />}
            <form action={lookupInvoiceAction} className="space-y-5">
              <input type="hidden" name="locale" value={l} />
              <label className="block text-sm font-medium text-[#00124a]">
                {t.number}
                <input name="number" required dir="ltr" autoComplete="off" placeholder={t.numberHint} className={`mt-2 ${input}`} />
              </label>
              <label className="block text-sm font-medium text-[#00124a]">
                {t.last4}
                <input name="last4" required dir="ltr" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} autoComplete="off" placeholder="0000" className={`mt-2 ${input}`} />
              </label>
              <button type="submit" className="chamfer-btn inline-flex min-h-12 w-full items-center justify-center bg-[#00124a] px-6 py-3 text-base text-white transition-colors hover:bg-[#001b6b]">
                {t.next}
              </button>
            </form>
            <p className="mt-6 flex items-start gap-2 text-xs leading-6 text-ink-soft">
              <Lock className="mt-1 h-3.5 w-3.5 shrink-0 text-[#c9a24a]" aria-hidden />
              {t.securedBy}
            </p>
          </div>
        </div>
      </Band>
    </div>
  );
}

export function PayInvoice({ locale: l, invoice, error }: { locale: L; invoice: PayableInvoice; error?: string }) {
  const t = copy[l];
  const msg = error && (t.err as Record<string, string>)[error];
  const payable = canPay(invoice);
  const settled = invoice.status === "paid" || (invoice.due <= 0 && invoice.total > 0);
  const row = "flex items-baseline justify-between gap-4 border-b border-[#00124a]/10 py-3 text-sm";
  return (
    <div>
      <style>{"[data-footer-cta]{display:none}"}</style>
      <Hero l={l} />
      <Band tone="tint">
        <div className="mx-auto max-w-xl px-5">
          <div className="glass-card rounded-3xl p-7 md:p-10">
            {msg && <Notice text={msg} />}
            {settled && <Notice tone="ok" text={t.settled} />}
            {!settled && !payable && <Notice text={t.unavailable} />}
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a6b1f]">{t.invoice}</p>
            <h2 className="font-display mt-1 text-3xl font-light text-[#00124a]" dir="ltr" style={{ textAlign: l === "ar" ? "right" : "left" }}>{invoice.number}</h2>
            <dl className="mt-5">
              <div className={row}><dt className="text-ink-soft">{t.client}</dt><dd className="font-medium text-[#00124a]">{invoice.clientName}</dd></div>
              {invoice.dueOn && <div className={row}><dt className="text-ink-soft">{t.dueOn}</dt><dd className="text-[#00124a]" dir="ltr">{invoice.dueOn}</dd></div>}
              <div className={row}><dt className="text-ink-soft">{t.total}</dt><dd className="text-[#00124a]">{money(invoice.total, l)} {t.sar}</dd></div>
              {invoice.paid > 0 && <div className={row}><dt className="text-ink-soft">{t.paid}</dt><dd className="text-[#00124a]">{money(invoice.paid, l)} {t.sar}</dd></div>}
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className="font-medium text-[#00124a]">{t.due}</dt>
                <dd className="font-display text-3xl text-[#00124a]">{money(invoice.due, l)} <span className="text-base">{t.sar}</span></dd>
              </div>
            </dl>
            <p className="text-xs leading-6 text-ink-soft">{t.vat}</p>
            {payable && (
              <form action={startPaymentAction} className="mt-6">
                <input type="hidden" name="locale" value={l} />
                <input type="hidden" name="invoiceId" value={invoice.id} />
                <button type="submit" className="chamfer-btn inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#00124a] px-6 py-3 text-base text-white transition-colors hover:bg-[#001b6b]">
                  <Lock className="h-4 w-4 text-[#f6e2b3]" aria-hidden />
                  {t.pay} · {money(invoice.due, l)} {t.sar}
                </button>
                <div className="mt-4 flex justify-center"><PaymentMethods locale={l} label={false} /></div>
              </form>
            )}
            <p className="mt-6 flex items-start gap-2 text-xs leading-6 text-ink-soft">
              <ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-[#c9a24a]" aria-hidden />
              {t.securedBy}
            </p>
            <p className="mt-4 text-xs text-ink-soft">{t.refund}<a href={`mailto:${firm.email}`} className="underline" dir="ltr">{firm.email}</a></p>
          </div>
        </div>
      </Band>
    </div>
  );
}

export function PayResult({ locale: l, ok, number, amount, invoiceId }: { locale: L; ok: boolean; number: string | null; amount: number; invoiceId: string | null }) {
  const t = copy[l];
  return (
    <div>
      <style>{"[data-footer-cta]{display:none}"}</style>
      <PageHero>
        <HeroHead eyebrow={t.eyebrow} title={ok ? t.resultOk : t.resultFail} lead={ok ? t.resultOkLead(number, amount) : t.resultFailLead}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={invoiceId ? `${pre(l)}/${invoiceId}` : pre(l)} className="chamfer-btn inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10">{t.back}</a>
            <a href={`mailto:${firm.email}`} className="chamfer-btn inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10">{t.contact}</a>
          </div>
        </HeroHead>
      </PageHero>
    </div>
  );
}

