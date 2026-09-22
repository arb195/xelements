import type { Metadata } from "next";
import Link from "next/link";

import { ShieldCheck } from "@/components/ui/Icons";
import { PasswordGenerator } from "@/modules/password-generator/PasswordGenerator";

export const metadata: Metadata = {
  title: "سازنده رمز عبور",
  description:
    "ساخت رمزهای تصادفی و قدرتمند با طول و گروه‌های کاراکتری قابل تنظیم.",
};

export default function PasswordGeneratorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/#tools"
        className="text-sm font-medium text-zinc-500 transition hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
      >
        → همه ابزارها
      </Link>
      <div className="mt-7 flex max-w-3xl items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-950/70 dark:text-brand-300 dark:ring-brand-900">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-zinc-950 sm:text-4xl dark:text-white">
            سازنده رمز عبور
          </h1>
          <p className="mt-2 text-base leading-8 text-zinc-600 dark:text-zinc-400">
            رمزهای تصادفی و قابل تنظیم را مستقیماً روی دستگاه خودتان بسازید،
            قدرت آن‌ها را بررسی کنید و با یک کلیک کپی کنید.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <PasswordGenerator />
      </div>
    </div>
  );
}
