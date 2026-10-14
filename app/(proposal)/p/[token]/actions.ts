"use server";

import { redirect } from "next/navigation";
import { requestMeta } from "@/lib/auth/session";
import { acceptProposal } from "@/lib/leads/engine";

export async function acceptAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const name = String(formData.get("name") ?? "");
  if (!formData.get("agree")) redirect(`/p/${token}?error=${encodeURIComponent("أكّد موافقتك على العرض أولًا.")}#accept`);
  const { ip, userAgent } = await requestMeta();
  const r = await acceptProposal(token, name, ip, userAgent);
  if (!r.ok) redirect(`/p/${token}?error=${encodeURIComponent(r.error ?? "تعذّر قبول العرض.")}#accept`);
  redirect(`/p/${token}?done=1`);
}
