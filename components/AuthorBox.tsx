import Link from "next/link";
import { attorneys, authorBoxCopy, type AuthorBoxVariant } from "@/lib/site";

export default function AuthorBox({
  attorneySlug = "turki-alnayef",
  variant = "default",
}: {
  attorneySlug?: string;
  variant?: AuthorBoxVariant;
}) {
  const attorney = attorneys.find((a) => a.slug === attorneySlug);
  if (!attorney) return null;

  const copy = authorBoxCopy[variant];

  return (
    <div className="flex items-start gap-4 rounded-2xl glass-card p-5">
      <div className="flex-1">
        <p className="text-xs font-semibold text-gold-deep">راجع المحتوى</p>
        <Link
          href={`/team/${attorney.slug}`}
          className="font-display mt-1 block text-sm font-bold text-ink hover:text-gold-deep"
        >
          {copy.role}
        </Link>
        <p className="mt-1 text-xs leading-6 text-ink-soft/70">{copy.body}</p>
      </div>
    </div>
  );
}
