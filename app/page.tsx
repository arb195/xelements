import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "@/components/ui/Icons";
import { ToolCard } from "@/components/ui/ToolCard";
import { tools } from "@/lib/tools";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="surface-grid pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-30" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 dark:border-brand-900 dark:bg-brand-950/60 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-[0_0_0_4px_rgba(34,199,122,0.12)]" />
              جعبه‌ابزار کاربردی
            </div>
            <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold text-zinc-950 sm:text-6xl lg:text-7xl dark:text-white">
              ابزارهای کوچک.
              <span className="block bg-gradient-to-l from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                امکانات بزرگ.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-400">
              xelements مجموعه‌ای متمرکز از ابزارهای سریع و خوش‌ساخت برای کارهای کوچک روزمره است؛ بدون شلوغی و پیچیدگی، فقط ابزارهای مفید درست زمانی که به آن‌ها نیاز دارید.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
              >
                مشاهده ابزارها
                <ArrowUpRight className="h-4 w-4 scale-x-[-1]" />
              </Link>
              <span className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400">
                {tools.length} ابزار فعال · ابزارهای بیشتر در راه‌اند
              </span>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-md lg:block" aria-hidden="true">
            <div className="absolute inset-0 scale-75 rounded-full bg-brand-400/25 blur-3xl dark:bg-brand-500/15" />
            <div className="relative aspect-square overflow-hidden rounded-[2.25rem] border border-white/50 bg-zinc-950 p-12 shadow-[0_40px_120px_-32px_rgba(24,24,27,0.55)] ring-1 ring-zinc-900/10 dark:border-zinc-800 dark:ring-white/5">
              <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
              <div className="relative flex h-full items-center justify-center">
                <Image
                  src="/brand/xelements-logo.png"
                  alt=""
                  width={348}
                  height={284}
                  priority
                  className="w-[88%] object-contain drop-shadow-[0_20px_35px_rgba(34,199,122,0.16)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="scroll-mt-28 border-y border-zinc-200/70 bg-white/55 py-20 dark:border-zinc-800/80 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">ابزارها</p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-950 sm:text-4xl dark:text-white">
                کاربردی، از همان ابتدا.
              </h2>
              <p className="mt-3 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                هر ابزار یک ماژول مستقل است؛ بنابراین می‌توان قابلیت‌های جدید را بدون وابسته‌کردن منطق ابزارها به صفحه اصلی، سریع و تمیز اضافه کرد.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-soft sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/70">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">آماده برای رشد</p>
                <h2 className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-white">زیرساختی ماژولار.</h2>
              </div>
              <p className="text-base leading-8 text-zinc-600 dark:text-zinc-400">
                فهرست ابزارها از یک رجیستری مرکزی تغذیه می‌شود و هر ابزار رابط کاربری و منطق دامنه خودش را در اختیار دارد. برای افزودن ابزار جدید فقط یک ماژول، یک مسیر و یک ورودی رجیستری نیاز است؛ بدون بازنویسی ابزارهای قبلی.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
