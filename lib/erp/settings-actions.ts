"use server";

import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/auth/session";
import { saveFirmSettings } from "@/lib/erp/settings";
import { audit } from "@/lib/audit";

export async function saveSettingsAction(formData: FormData) {
  const user = await requireStaff("settings:manage");
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  await saveFirmSettings({
    name: s("name"), nameEn: s("nameEn"), address: s("address"), phone: s("phone"), email: s("email"),
    licenseNumber: s("licenseNumber"), vatNumber: s("vatNumber"), iban: s("iban"), bank: s("bank"),
    vatRate: Number(s("vatRate")) || 15, dueDays: Number(s("dueDays")) || 30, invoiceNotes: s("invoiceNotes"),
  });
  await audit({ id: user.id, name: user.fullName }, "settings_saved", "settings", "firm");
  redirect("/admin/settings?ok=" + encodeURIComponent("تم حفظ الإعدادات"));
}
