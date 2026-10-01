import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";

export type FirmSettings = {
  name: string;
  nameEn: string;
  address: string;
  phone: string;
  email: string;
  licenseNumber: string;
  vatNumber: string;
  iban: string;
  bank: string;
  vatRate: number;
  dueDays: number;
  invoiceNotes: string;
  remindEmailFrom: string;
};

export const FIRM_DEFAULTS: FirmSettings = {
  name: "تركي النايف وشركاؤه للمحاماة والاستشارات القانونية",
  nameEn: "Turki AlNaif & Partners",
  address: "حي الياسمين، الرياض 13326",
  phone: "966 566 770 888",
  email: "tnz@tnzlaw.com",
  licenseNumber: "4477",
  vatNumber: "",
  iban: "",
  bank: "",
  vatRate: 15,
  dueDays: 30,
  invoiceNotes: "يُسدَّد المبلغ بالتحويل البنكي خلال المدة المحددة.",
  remindEmailFrom: "تركي النايف وشركاؤه",
};

export async function getFirmSettings(): Promise<FirmSettings> {
  const d = await db();
  const [row] = await d.select().from(settings).where(eq(settings.key, "firm")).limit(1);
  return { ...FIRM_DEFAULTS, ...((row?.value as Partial<FirmSettings>) ?? {}) };
}

export async function saveFirmSettings(v: Partial<FirmSettings>) {
  const d = await db();
  const current = await getFirmSettings();
  const value = { ...current, ...v };
  await d.insert(settings).values({ key: "firm", value }).onConflictDoUpdate({ target: settings.key, set: { value } });
}
