import "server-only";
import { firm } from "@/lib/site";
import { hmac } from "@/lib/auth/crypto";
import { SITE, bookingUrl, btn, esc, shell, type MailBody } from "@/lib/leads/emails";

/** رابط إيقاف الرسائل الخاص بجهة الاتصال: نقرة واحدة، بلا تسجيل دخول. */
export const outreachUnsubscribeUrl = (contactId: string) => `${SITE}/api/outreach/unsubscribe?c=${contactId}&t=${hmac(`ounsub:${contactId}`)}`;
export const verifyOutreachUnsubscribe = (contactId: string, t: string) => hmac(`ounsub:${contactId}`) === t;

/** عدد الأيام بين كل رسالة والتي قبلها (الأولى فورًا). ثلاث رسائل ثم نتوقف. */
export const EMAIL_GAPS = [0, 5, 7];

type Who = { id: string; fullName?: string | null; title?: string | null };
type Read = { href: string; title: string } | null;

const first = (n?: string | null) => (n ?? "").trim().split(/\s+/)[0] ?? "";
const hello = (c: Who) => (c.fullName?.trim() ? `السلام عليكم ورحمة الله وبركاته، ${esc(first(c.fullName))}` : "السلام عليكم ورحمة الله وبركاته،");

export const regionOf = (list: string) => (list === "riyadh" ? "الرياض" : list === "khobar-dammam" ? "المنطقة الشرقية" : "المملكة");

export function outreachMail(step: number, c: Who, company: string, read: Read, region = "المملكة"): MailBody {
  const unsub = outreachUnsubscribeUrl(c.id);
  const foot = `وصلتك هذه الرسالة لأن عملك${c.title ? ` بصفة «${esc(c.title)}»` : ""} في ${esc(company)} يقع ضمن ما نخدمه من الشركات في ${region}. إن لم تُرد أن نراسلك فاضغط <a href="${unsub}" style="color:#8a6d25">إيقاف الرسائل</a> وسنتوقف فورًا.<br>`;
  const book = btn(bookingUrl(true), "احجز مكالمة من 15 دقيقة");
  const sign = `<p style="margin-top:22px">مع التقدير،<br><b>${esc(firm.nameShortAr)}</b></p>`;
  const link = read ? `<p>ولأن نظام التنفيذ الجديد دخل حيز النفاذ، فهذه قراءة موجزة قد تفيدك: <a href="${SITE}${read.href}" style="color:#00124a">${esc(read.title)}</a>.</p>` : "";

  const body: Record<number, [string, string]> = {
    0: [
      "تعريف موجز بمكتب تركي النايف وشركاؤه",
      `<p>${hello(c)}</p>
<p>أكتب إليك من «${esc(firm.nameShortAr)}» في الرياض. نعمل مع الشركات في ثلاثة مجالات: <b>العقود التجارية</b> (صياغةً ومراجعةً وتفاوضًا)، و<b>المنازعات والتنفيذ</b>، و<b>الشؤون النظامية للشركات</b>.</p>
${link}
<p>إن كان لدى ${esc(company)} عقد قيد التفاوض أو مطالبة معلّقة ترغبون برأي نظامي فيها، فيسعدنا أن نتحدث معك قليلًا دون التزام.</p>${book}${sign}`,
    ],
    1: [
      "خمسة بنود تُراجَع قبل توقيع أي عقد توريد أو خدمات",
      `<p>${hello(c)}</p>
<p>تكرّر معنا في عقود التوريد والخدمات أن النزاع لاحقًا يدور حول خمسة بنود بعينها، فنراجعها قبل التوقيع:</p>
<ol style="padding-inline-start:22px"><li>تحديد الأطراف بصفاتهم وسجلاتهم الصحيحة.</li><li>آلية الإخطار والمُهَل (متى يُعدّ الإخطار واصلًا؟).</li><li>سقف المسؤولية والتعويض والغرامات.</li><li>النظام الواجب التطبيق وجهة الفصل في النزاع.</li><li>شروط الإنهاء والدفع وما يترتب على التأخر.</li></ol>
<p>إن أحببت أن نمرّ على نموذج عقد تستخدمه ${esc(company)} ونخبرك بما نراه، فنحن حاضرون.</p>${book}${sign}`,
    ],
    2: [
      "آخر رسالة منا",
      `<p>${hello(c)}</p>
<p>لا نريد أن نزعجك، وهذه آخر رسالة منا. إن احتاجت ${esc(company)} يومًا إلى رأي نظامي في عقد أو مطالبة أو مسألة تخص الشركة، فرسالة واحدة تكفي وسنردّ في يوم عمل.</p>${book}${sign}`,
    ],
  };
  const [subject, inner] = body[step];
  return { subject, html: shell(true, inner, foot), unsubscribe: unsub, replyTo: firm.email };
}

/** نص مختصر للقراءة داخل لوحة الإدارة، لمعاينة ما سيصل. */
export const preview = (step: number, c: Who, company: string, read: Read, region?: string) => outreachMail(step, c, company, read, region).html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const legal = /legal|counsel|law|compliance|contracts?|قانون|عقود|امتثال|نظامي|شؤون قانونية/i;
const money = /finance|cfo|procure|supply|purchas|commercial|مالي|مشتريات|إمداد|تجاري/i;

/** مذكرة الدعوة على لينكدان: ٣٠٠ حرفًا كحدّ أقصى (حدّ المنصة)، بلا مبالغة ولا وعود. */
export function linkedinNote(c: { fullName?: string | null; title?: string | null }, company: string, region = "المنطقة الشرقية"): string {
  const n = first(c.fullName);
  const hi = n ? `السلام عليكم ${n}،` : "السلام عليكم،";
  const t = c.title ?? "";
  const mid = legal.test(t)
    ? `أنا من مكتب تركي النايف وشركاؤه للمحاماة بالرياض، ونعمل مع الإدارات القانونية في الشركات على العقود والمنازعات والتنفيذ. يسعدني أن نتواصل هنا ونتبادل الخبرة.`
    : money.test(t)
      ? `أنا من مكتب تركي النايف وشركاؤه للمحاماة بالرياض، ونعمل مع الشركات في ${region} على عقود التوريد والخدمات وتحصيل المستحقات. يسعدني أن نتواصل هنا.`
      : `أنا من مكتب تركي النايف وشركاؤه للمحاماة بالرياض، ونعمل مع شركات ${region} في العقود التجارية والمنازعات والشؤون النظامية. يسعدني أن نتواصل هنا.`;
  const out = `${hi} ${mid}`;
  return out.length <= 300 ? out : `${out.slice(0, 297)}…`;
}

/** رسالة المتابعة بعد قبول الدعوة: قيمة أولًا، ثم عرض لمكالمة قصيرة. */
export function linkedinFollowup(c: { fullName?: string | null }, company: string): string {
  const n = first(c.fullName);
  return `${n ? `شكرًا لقبولك يا ${n}.` : "شكرًا لقبولك الدعوة."} من واقع ما نراه في عقود الشركات، أكثر ما يُكلّف لاحقًا هو بنود الإخطار والمهل وسقف المسؤولية. إن كان لدى ${company} عقد قيد المراجعة فيسرّني أن أُلقي نظرة سريعة عليه دون التزام. ومتى ما ناسبك، ٢٠ دقيقة بيننا تكفي.`;
}

/** رابط بحث لينكدان عن صاحب القرار في منشأة: يُفتح في متصفحك أنت، والاختيار والمراسلة يدويان. */
export const peopleSearchUrl = (company: string, role = "legal counsel") =>
  `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${role} ${company.replace(/\([^)]*\)/g, "").trim()}`)}`;
