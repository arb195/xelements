import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorIcon } from "@/components/ui/Icons";
import { Calculator } from "@/modules/calculator/Calculator";

export const metadata: Metadata = {
  title: "ماشین حساب",
  description: "ماشین حسابی تمیز، سریع و سازگار با صفحه‌کلید برای محاسبات روزمره."
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/#tools"
        className="text-sm font-medium text-zinc-500 transition hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
      >
        → همه ابزارها
      </Link>

      <div className="mt-7 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="max-w-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-950/70 dark:text-brand-300 dark:ring-brand-900">
            <CalculatorIcon className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-3xl font-semibold text-zinc-950 sm:text-4xl dark:text-white">ماشین حساب</h1>
          <p className="mt-3 text-base leading-8 text-zinc-600 dark:text-zinc-400">
            یک ماشین حساب متمرکز برای جمع، تفریق، ضرب و تقسیم؛ با رابط مدرن و پشتیبانی کامل از صفحه‌کلید.
          </p>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400">
            منطق محاسبات با یک ماشین حالت مدیریت می‌شود و از <code dir="ltr" className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">eval()</code> یا اجرای مستقیم عبارت استفاده نمی‌کند.
          </div>
        </div>
        <Calculator />
      </div>
    </div>
  );
}
