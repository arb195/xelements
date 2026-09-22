import Link from "next/link";

import { ArrowUpRightIcon, CalculatorIcon, ShieldSparkIcon } from "@/components/ui/Icons";
import type { ToolDefinition } from "@/lib/tools";

function ToolIcon({ icon }: Pick<ToolDefinition, "icon">) {
  const iconClass = "h-6 w-6";

  if (icon === "calculator") {
    return <CalculatorIcon className={iconClass} />;
  }

  return <ShieldSparkIcon className={iconClass} />;
}

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-brand-800">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-950/70 dark:text-brand-300 dark:ring-brand-900">
          <ToolIcon icon={tool.icon} />
        </div>
        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
          {tool.accent}
        </span>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{tool.name}</h3>
        <p className="mt-2 min-h-[48px] text-sm leading-7 text-zinc-600 dark:text-zinc-400">{tool.description}</p>
      </div>
      <Link
        href={tool.href}
        className="mt-6 inline-flex w-full items-center justify-between rounded-xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950 dark:hover:bg-brand-300 dark:focus-visible:ring-offset-zinc-900"
      >
        باز کردن ابزار
        <ArrowUpRightIcon className="h-4 w-4 scale-x-[-1] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </article>
  );
}
