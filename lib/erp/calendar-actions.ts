"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth/session";
import { audit } from "@/lib/audit";
import { feedToken } from "@/lib/calendar/ics";

/** تجديد رابط الاشتراك: يبطل الرابط القديم فورًا (عند تسريبه أو تغيير الجهاز). */
export async function rotateFeedAction() {
  const user = await requireStaff("matters:read");
  await feedToken(user.id, true);
  await audit({ id: user.id, name: user.fullName }, "calendar_feed_rotated", "user", user.id, {});
  revalidatePath("/admin/calendar");
}
