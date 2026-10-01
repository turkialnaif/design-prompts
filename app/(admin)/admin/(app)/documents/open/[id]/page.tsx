import DirectOpen from "@/components/DirectOpen";
import { requireStaff } from "@/lib/auth/session";

export const metadata = { title: "فتح مستند" };

export default async function OpenDocPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff("docs:read");
  const { id } = await params;
  return <DirectOpen api={`/api/admin/documents/${id}/direct`} />;
}
