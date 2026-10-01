import DirectOpen from "@/components/DirectOpen";

export const metadata = { title: "فتح مستند" };

export default async function OpenPortalDocPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DirectOpen api={`/api/portal/documents/${id}/direct`} />;
}
