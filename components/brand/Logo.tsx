import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      dir="ltr"
      aria-label="صفحه اصلی xelements"
      className="group inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-3 py-2 shadow-sm ring-1 ring-white/10 transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <Image
        src="/brand/xelements-mark.png"
        alt=""
        width={222}
        height={178}
        priority
        className="h-7 w-auto object-contain sm:h-8"
      />
      <span className="text-lg font-semibold tracking-[-0.03em] text-white sm:text-xl">elements</span>
    </Link>
  );
}
