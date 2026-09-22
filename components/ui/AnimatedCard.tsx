
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function AnimatedCard({children}:{children:ReactNode}) {
  return (
    <motion.div
      initial={{opacity:0, y:20}}
      whileInView={{opacity:1, y:0}}
      whileHover={{y:-8, scale:1.02}}
      viewport={{once:true}}
      transition={{duration:.25}}
      className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur dark:bg-zinc-900/80"
    >
      {children}
    </motion.div>
  );
}
