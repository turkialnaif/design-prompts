import Link from "next/link";
import { sectors } from "@/lib/sectors";

export default function NotFound() {
  return (
    <div className="bg-[#00061d] px-5 pb-24 pt-40 text-center text-white">
      <p className="gold-eyebrow !text-[#f6e2b3] text-sm">404</p>
      <h1 className="font-display grad-text mt-4 text-5xl md:text-7xl">الصفحة غير موجودة</h1>
      <p className="mx-auto mt-6 max-w-xl text-base font-light leading-8 text-white/75">ربما تغيّر الرابط أو حُذفت الصفحة. يمكنك العودة إلى الرئيسية أو تصفّح القطاعات التي نخدمها.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="chamfer-btn bg-white px-6 py-3 text-[#00124a]">الرئيسية</Link>
        <Link href="/sectors" className="chamfer-btn border border-white/30 px-6 py-3 text-white">القطاعات</Link>
      </div>
      <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2">
        {sectors.slice(0, 10).map((x) => (
          <li key={x.slug}>
            <Link href={`/sectors/${x.slug}`} className="chamfer-btn inline-block border border-white/20 px-3.5 py-1.5 text-sm font-light text-white/80 hover:text-white">{x.ar.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
