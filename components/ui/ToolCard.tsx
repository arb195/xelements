\"use client\";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowUpRight,Calculator,FileText,ShieldCheck} from "lucide-react";
import type {ToolDefinition} from "@/lib/tools";

const icons={calculator:Calculator,password:ShieldCheck,lorem:FileText};

export function ToolCard({tool}:{tool:ToolDefinition}){
 const Icon=icons[tool.icon];
 return <motion.article
 initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}}
 whileHover={{y:-12,scale:1.025}}
 transition={{type:"spring",stiffness:220}}
 viewport={{once:true}}
 className="group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition dark:bg-zinc-900">
 <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/0 to-brand-500/10 opacity-0 transition group-hover:opacity-100"/>
 <div className="relative">
 <motion.div whileHover={{rotate:10,scale:1.15}}
 className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
 <Icon/>
 </motion.div>
 <h3 className="mt-6 text-xl font-bold">{tool.name}</h3>
 <p className="mt-2 text-zinc-600 dark:text-zinc-400">{tool.description}</p>
 <Link className="mt-6 flex items-center justify-between rounded-xl bg-zinc-950 px-4 py-3 text-white hover:bg-brand-600" href={tool.href}>
 باز کردن ابزار <ArrowUpRight/>
 </Link>
 </div>
 </motion.article>
}
