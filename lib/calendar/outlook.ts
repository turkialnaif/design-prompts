import "server-only";
import { and, eq, gte, lt, notInArray } from "drizzle-orm";
import ICAL from "ical.js";
import { db } from "@/lib/db";
import { events, settings } from "@/lib/db/schema";

const KEY = "outlook:ics";
const HOSTS = ["outlook.office365.com", "outlook.office.com", "outlook.live.com", "calendar.live.com"];
const BACK = 30;
const AHEAD = 365;
const MAX_EVENTS = 3000;

export type OutlookState = { url: string; ownerId: string; lastSyncAt?: string; lastCount?: number; lastError?: string | null };

export async function getOutlook(): Promise<OutlookState | null> {
  const d = await db();
  const [r] = await d.select().from(settings).where(eq(settings.key, KEY)).limit(1);
  return (r?.value as OutlookState | undefined) ?? null;
}
async function put(v: OutlookState | null) {
  const d = await db();
  if (!v) return void (await d.delete(settings).where(eq(settings.key, KEY)));
  await d.insert(settings).values({ key: KEY, value: v }).onConflictDoUpdate({ target: settings.key, set: { value: v } });
}

/** رابط الاشتراك المنشور من Outlook فقط: https وعلى نطاقات مايكروسوفت، حتى لا يصير الخادم أداة لجلب أي عنوان. */
export function validateIcsUrl(raw: string): string | null {
  try {
    const u = new URL(raw.trim().replace(/^webcal:/i, "https:"));
    if (u.protocol !== "https:" || !HOSTS.includes(u.hostname)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export type Parsed = { uid: string; title: string; start: Date; end: Date | null; location: string | null; notes: string | null; cancelled: boolean };

/** يقرأ ملف ICS ويفرد التكرارات داخل النافذة (من 30 يومًا مضت إلى سنة) ويطبّق الاستثناءات. */
export function parseIcs(text: string, now = new Date()): Parsed[] {
  const root = new ICAL.Component(ICAL.parse(text));
  for (const tz of root.getAllSubcomponents("vtimezone")) {
    try { ICAL.TimezoneService.register(tz); } catch { /* منطقة زمنية مكررة */ }
  }
  const from = now.getTime() - BACK * 864e5;
  const to = now.getTime() + AHEAD * 864e5;
  const evs = root.getAllSubcomponents("vevent").map((v) => new ICAL.Event(v));
  const masters = new Map<string, InstanceType<typeof ICAL.Event>>();
  for (const e of evs) if (!e.isRecurrenceException()) masters.set(e.uid, e);
  for (const e of evs) if (e.isRecurrenceException()) masters.get(e.uid)?.relateException(e);

  const out: Parsed[] = [];
  const push = (uid: string, d: { startDate: ICAL.Time; endDate: ICAL.Time; item: InstanceType<typeof ICAL.Event> }, status?: string | null) => {
    // اليوم الكامل يُثبَّت على منتصف ليل الرياض أينما شُغّل الخادم
    const at = (t: ICAL.Time) => (t.isDate ? new Date(`${String(t.year).padStart(4, "0")}-${String(t.month).padStart(2, "0")}-${String(t.day).padStart(2, "0")}T00:00:00+03:00`) : t.toJSDate());
    const start = at(d.startDate);
    const end = d.endDate ? at(d.endDate) : null;
    if (start.getTime() < from || start.getTime() > to) return;
    out.push({
      uid,
      title: (d.item.summary || "بلا عنوان").slice(0, 300),
      start,
      end: end && end.getTime() > start.getTime() ? end : null,
      location: d.item.location ? String(d.item.location).slice(0, 300) : null,
      notes: d.item.description ? String(d.item.description).replace(/\s+/g, " ").trim().slice(0, 1500) : null,
      cancelled: /cancel/i.test(status ?? ""),
    });
  };
  for (const [uid, e] of masters) {
    if (uid.endsWith("@taap.sa")) continue; // لا نعيد استيراد ما صدّرناه نحن
    const status = String(e.component.getFirstPropertyValue("status") ?? "");
    if (e.isRecurring()) {
      const it = e.iterator();
      for (let n = 0, next = it.next(); next && n < 500; next = it.next(), n++) {
        if (next.toJSDate().getTime() > to) break;
        const det = e.getOccurrenceDetails(next);
        push(`${uid}:${next.toJSDate().toISOString()}`, det, status);
      }
    } else {
      push(uid, { startDate: e.startDate, endDate: e.endDate, item: e }, status);
    }
    if (out.length >= MAX_EVENTS) break;
  }
  return out;
}

const kindOf = (t: string): "hearing" | "deadline" | "meeting" | "filing" | "other" =>
  /جلسة|hearing|محكمة|دائرة/i.test(t) ? "hearing" : /موعد نهائي|deadline|مهلة/i.test(t) ? "deadline" : /إيداع|filing|لائحة/i.test(t) ? "filing" : /اجتماع|meeting|مكالمة|call|teams|zoom/i.test(t) ? "meeting" : "other";

export async function syncOutlook(): Promise<{ ok: boolean; count: number; error?: string }> {
  const st = await getOutlook();
  if (!st) return { ok: false, count: 0, error: "لم يُربط تقويم Outlook" };
  const fail = async (error: string) => {
    await put({ ...st, lastError: error, lastSyncAt: new Date().toISOString() });
    return { ok: false, count: 0, error };
  };
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(st.url, { signal: ctrl.signal, headers: { accept: "text/calendar" } });
    clearTimeout(timer);
    if (!res.ok) return fail(`رفض Outlook الرابط (${res.status}). تأكد أن التقويم ما زال منشورًا.`);
    if (!HOSTS.includes(new URL(res.url).hostname)) return fail("حُوِّل الرابط إلى جهة غير موثوقة");
    const text = await res.text();
    if (text.length > 8_000_000 || !text.includes("BEGIN:VCALENDAR")) return fail("الاستجابة ليست تقويمًا صالحًا");
    const list = parseIcs(text);
    const d = await db();
    const now = Date.now();
    const ids: string[] = [];
    for (const p of list) {
      const id = `outlook:${p.uid}`;
      ids.push(id);
      const v = { title: p.title, startsAt: p.start, endsAt: p.end, location: p.location, notes: p.notes, kind: kindOf(p.title), status: (p.cancelled ? "cancelled" : "scheduled") as "cancelled" | "scheduled", assigneeId: st.ownerId, createdBy: st.ownerId, source: "outlook", externalUid: id, remindDaysBefore: 0, visibleToClient: false };
      await d.insert(events).values(v).onConflictDoUpdate({ target: events.externalUid, set: { title: v.title, startsAt: v.startsAt, endsAt: v.endsAt, location: v.location, notes: v.notes, kind: v.kind, status: v.status } });
    }
    // ما حُذف من Outlook داخل النافذة يُحذف هنا أيضًا
    const win = and(eq(events.source, "outlook"), gte(events.startsAt, new Date(now - BACK * 864e5)), lt(events.startsAt, new Date(now + AHEAD * 864e5)));
    if (ids.length) await d.delete(events).where(and(win, notInArray(events.externalUid, ids)));
    else await d.delete(events).where(win);
    await put({ ...st, lastSyncAt: new Date().toISOString(), lastCount: ids.length, lastError: null });
    return { ok: true, count: ids.length };
  } catch (e) {
    return fail(e instanceof Error && e.name === "AbortError" ? "انتهت مهلة الاتصال بـ Outlook" : "تعذّر قراءة التقويم");
  }
}

export async function connectOutlook(rawUrl: string, ownerId: string) {
  const url = validateIcsUrl(rawUrl);
  if (!url) return { ok: false as const, error: "الرابط غير صالح: يجب أن يكون رابط ICS منشورًا من Outlook (يبدأ بـ https://outlook.office365.com أو outlook.live.com)." };
  await put({ url, ownerId });
  const r = await syncOutlook();
  return r.ok ? { ok: true as const, count: r.count } : { ok: false as const, error: r.error ?? "فشلت المزامنة" };
}

export async function disconnectOutlook(deleteEvents: boolean) {
  const d = await db();
  await put(null);
  if (deleteEvents) await d.delete(events).where(eq(events.source, "outlook"));
}

export const isStale = (st: OutlookState | null, minutes = 20) => !!st && (!st.lastSyncAt || Date.now() - new Date(st.lastSyncAt).getTime() > minutes * 60e3);
