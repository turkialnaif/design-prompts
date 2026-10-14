"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth/session";
import { audit } from "@/lib/audit";
import { redirect } from "next/navigation";
import { feedToken } from "@/lib/calendar/ics";
import { connectOutlook, disconnectOutlook, syncOutlook } from "@/lib/calendar/outlook";

/** تجديد رابط الاشتراك: يبطل الرابط القديم فورًا (عند تسريبه أو تغيير الجهاز). */
export async function rotateFeedAction() {
  const user = await requireStaff("matters:read");
  await feedToken(user.id, true);
  await audit({ id: user.id, name: user.fullName }, "calendar_feed_rotated", "user", user.id, {});
  revalidatePath("/admin/calendar");
}

const back = (k: "ok" | "error", m: string) => redirect(`/admin/calendar?${k}=${encodeURIComponent(m)}`);

export async function connectOutlookAction(formData: FormData) {
  const user = await requireStaff("events:write");
  const r = await connectOutlook(String(formData.get("url") ?? ""), user.id);
  revalidatePath("/admin/calendar");
  if (!r.ok) return back("error", r.error);
  await audit({ id: user.id, name: user.fullName }, "outlook_connected", "user", user.id, { count: r.count });
  back("ok", `رُبط تقويم Outlook واستُورد ${r.count} موعدًا`);
}

export async function syncOutlookAction() {
  await requireStaff("events:write");
  const r = await syncOutlook();
  revalidatePath("/admin/calendar");
  if (!r.ok) return back("error", r.error ?? "فشلت المزامنة");
  back("ok", `تمت المزامنة: ${r.count} موعدًا`);
}

export async function disconnectOutlookAction(formData: FormData) {
  const user = await requireStaff("events:write");
  await disconnectOutlook(formData.get("purge") === "on");
  await audit({ id: user.id, name: user.fullName }, "outlook_disconnected", "user", user.id, {});
  revalidatePath("/admin/calendar");
  back("ok", "فُصل تقويم Outlook");
}
