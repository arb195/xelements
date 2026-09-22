"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Copy, RefreshCw, Sparkles} from "lucide-react";
import {generateLorem,getTextStats,LoremType,LoremLanguage} from "./lorem.logic";

export default function LoremGenerator(){
 const [type,setType]=useState<LoremType>("paragraph");
 const [language,setLanguage]=useState<LoremLanguage>("fa");
 const [amount,setAmount]=useState(3);
 const [text,setText]=useState("");

 const stats=getTextStats(text);

 const generate=()=>setText(generateLorem(type,amount,language));

 return <div className="space-y-6" dir="rtl">
  <motion.section initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
   className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
   <div className="flex items-center gap-3">
    <motion.div whileHover={{rotate:15,scale:1.1}} className="rounded-2xl bg-brand-50 p-3 text-brand-600">
     <Sparkles/>
    </motion.div>
    <div>
     <h1 className="text-2xl font-bold">مولد لورم ایپسوم</h1>
     <p className="text-sm text-zinc-500">ساخت متن آزمایشی فارسی و انگلیسی برای طراحی</p>
    </div>
   </div>

   <div className="mt-6 grid gap-4 md:grid-cols-4">
    <select className="rounded-xl border p-3" value={language} onChange={e=>setLanguage(e.target.value as LoremLanguage)}>
     <option value="fa">فارسی</option><option value="en">English</option>
    </select>
    <select className="rounded-xl border p-3" value={type} onChange={e=>setType(e.target.value as LoremType)}>
     <option value="paragraph">پاراگراف</option><option value="sentence">جمله</option><option value="word">کلمه</option>
    </select>
    <input className="rounded-xl border p-3" type="number" min={1} value={amount} onChange={e=>setAmount(+e.target.value)}/>
    <button onClick={generate} className="rounded-xl bg-brand-600 text-white transition hover:-translate-y-1 hover:shadow-lg">
      <RefreshCw className="inline ml-2 h-4 w-4"/> تولید متن
    </button>
   </div>
  </motion.section>

  <motion.section initial={{opacity:0}} animate={{opacity:1}}
   className="rounded-3xl border bg-white p-6 dark:bg-zinc-900">
   <textarea value={text} readOnly className="min-h-80 w-full rounded-2xl border p-4 leading-8"/>
   <div className="mt-4 flex flex-wrap items-center gap-4">
    <button onClick={()=>navigator.clipboard.writeText(text)}
    className="rounded-xl bg-zinc-950 px-5 py-3 text-white transition hover:scale-105">
     <Copy className="inline ml-2 h-4 w-4"/> کپی
    </button>
    <span className="text-sm text-zinc-500">{stats.words} کلمه | {stats.chars} کاراکتر | {stats.paragraphs} پاراگراف</span>
   </div>
  </motion.section>
 </div>
}
