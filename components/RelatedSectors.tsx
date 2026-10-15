import Link from "next/link";
import type { Sector } from "@/lib/sectors";

/**
 * "Sectors this page serves" plus, where it exists, a plain link to the same page in the other language.
 * Both are ordinary crawlable links, which is what lets Google reach the newer and the English pages from pages it already indexes.
 */
export default function RelatedSectors({
  locale,
  items,
  alt,
}: {
  locale: "ar" | "en";
  items: Sector[];
  alt?: { href: string };
}) {
  const ar = locale === "ar";
  if (items.length === 0 && !alt) return null;
  const base = ar ? "/sectors" : "/en/sectors";
  return (
    <section className="bg-paper py-12">
      <div className="mx-auto max-w-5xl px-5 text-center">
        {items.length > 0 && (
          <>
            <h2 className="font-display !text-2xl !font-normal text-[#00124a]">{ar ? "قطاعات ذات صلة" : "Related sectors"}</h2>
            <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
              {items.map((s) => (
                <li key={s.slug}>
                  <Link href={`${base}/${s.slug}`} className="chamfer-btn inline-block border border-[#00124a]/20 px-4 py-2 text-sm font-light text-[#00124a] transition-colors hover:border-[#e0b35a] hover:bg-[#f4f5fe]">
                    {s[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        {alt && (
          <p className={items.length > 0 ? "mt-6" : ""}>
            <Link href={alt.href} hrefLang={ar ? "en" : "ar"} className="text-sm font-normal text-[#012696] underline underline-offset-4 hover:text-[#00124a]">
              {ar ? "Read this page in English" : "قراءة هذه الصفحة بالعربية"}
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
