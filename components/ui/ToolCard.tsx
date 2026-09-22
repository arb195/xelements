
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calculator,
  FileText,
  ShieldCheck,
} from "lucide-react";
import type { ToolDefinition } from "@/lib/tools";

const icons = {
  calculator: Calculator,
  password: ShieldCheck,
  lorem: FileText,
};

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = icons[tool.icon];

  return (
    <motion.article
      initial={{opacity:0,y:20}}
      whileInView={{opacity:1,y:0}}
      whileHover={{y:-8}}
      viewport={{once:true}}
      className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft transition dark:border-zinc-800 dark:bg-zinc-900/80"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
          <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
        </div>
        <span className="text-xs text-zinc-500">{tool.accent}</span>
      </div>

      <h3 className="mt-6 text-xl font-bold">{tool.name}</h3>
      <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
        {tool.description}
      </p>

      <Link href={tool.href}
        className="mt-6 flex items-center justify-between rounded-xl bg-zinc-950 px-4 py-3 text-white transition hover:bg-brand-600 dark:bg-white dark:text-zinc-950">
        باز کردن ابزار
        <ArrowUpRight className="h-4 w-4"/>
      </Link>
    </motion.article>
  );
}
