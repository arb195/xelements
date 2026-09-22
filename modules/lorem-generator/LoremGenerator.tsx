"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import { generateLorem, getTextStats, LoremType, LoremLanguage } from "./lorem.logic";

export default function LoremGenerator() {
  const [type, setType] = useState<LoremType>("paragraph");
  const [language, setLanguage] = useState<LoremLanguage>("fa");
  const [amount, setAmount] = useState(3);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = getTextStats(text);

  const generate = () => {
    setText(generateLorem(type, amount, language));
    setCopied(false);
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div dir="rtl" className="mx-auto max-w-5xl space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="rounded-2xl bg-brand-50 p-3 text-brand-600"
          >
            <Sparkles />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold">مولد لورم ایپسوم</h1>
            <p className="text-sm text-zinc-500">
              تولید متن نمونه فارسی و انگلیسی برای طراحی
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <select className="rounded-xl border p-3" value={language} onChange={(e)=>setLanguage(e.target.value as LoremLanguage)}>
            <option value="fa">فارسی</option>
            <option value="en">English</option>
          </select>

          <select className="rounded-xl border p-3" value={type} onChange={(e)=>setType(e.target.value as LoremType)}>
            <option value="paragraph">پاراگراف</option>
            <option value="sentence">جمله</option>
            <option value="word">کلمه</option>
          </select>

          <input className="rounded-xl border p-3" type="number" min={1} value={amount} onChange={(e)=>setAmount(Number(e.target.value))}/>

          <button onClick={generate} className="rounded-xl bg-brand-600 text-white transition-all duration-200 ease-linear hover:-translate-y-1 hover:shadow-lg">
            <RefreshCw className="inline ml-2 h-4 w-4" />
            تولید متن
          </button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900"
      >
        <textarea
          value={text}
          readOnly
          className="min-h-80 w-full rounded-2xl border p-4 leading-8 outline-none"
        />

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <motion.button
            whileTap={{ scale: .95 }}
            onClick={copyText}
            className="flex items-center rounded-xl bg-zinc-950 px-5 py-3 text-white transition-all duration-200 ease-linear hover:scale-105 hover:bg-brand-600"
          >
            {copied ? <Check className="ml-2 h-4 w-4" /> : <Copy className="ml-2 h-4 w-4" />}
            {copied ? "کپی شد" : "کپی"}
          </motion.button>

          <span className="text-sm text-zinc-500">
            {stats.words} کلمه | {stats.chars} کاراکتر | {stats.paragraphs} پاراگراف
          </span>
        </div>
      </motion.section>
    </div>
  );
}
