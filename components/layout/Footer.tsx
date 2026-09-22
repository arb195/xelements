import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} xelements. ابزارهای کوچک، با دقت ساخته شده‌اند.</p>
        <div className="flex items-center gap-4">
          <Link className="transition hover:text-brand-600 dark:hover:text-brand-400" href="/#tools">
            ابزارها
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span>طراحی‌شده با احترام به حریم خصوصی</span>
        </div>
      </div>
    </footer>
  );
}
