
"use client";

import {useState} from "react";
import {Copy, RefreshCw} from "lucide-react";
import {generateLorem,getTextStats,LoremType} from "./lorem.logic";

export default function LoremGenerator(){
 const [type,setType]=useState<LoremType>("paragraph");
 const [amount,setAmount]=useState(3);
 const [text,setText]=useState("");

 const stats=getTextStats(text);

 return <div className="space-y-6" dir="rtl">
  <section className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
   <h1 className="text-2xl font-bold">مولد لورم ایپسوم</h1>
   <div className="mt-6 grid gap-4 md:grid-cols-3">
    <select className="rounded-xl border p-3" value={type} onChange={e=>setType(e.target.value as LoremType)}>
     <option value="paragraph">پاراگراف</option>
     <option value="sentence">جمله</option>
     <option value="word">کلمه</option>
    </select>
    <input className="rounded-xl border p-3" type="number" value={amount} min={1} onChange={e=>setAmount(+e.target.value)}/>
    <button className="rounded-xl bg-emerald-600 text-white" onClick={()=>setText(generateLorem(type,amount))}>
     <RefreshCw className="inline ml-2 h-4 w-4"/> تولید
    </button>
   </div>
  </section>

  <section className="rounded-3xl border bg-white p-6 dark:bg-zinc-900">
   <textarea value={text} readOnly className="min-h-72 w-full rounded-xl border p-4"/>
   <button onClick={()=>navigator.clipboard.writeText(text)} className="mt-4 rounded-xl bg-zinc-900 px-5 py-3 text-white">
    <Copy className="inline ml-2 h-4 w-4"/> کپی
   </button>
   <p className="mt-4 text-sm text-zinc-500">{stats.words} کلمه | {stats.chars} کاراکتر | {stats.paragraphs} پاراگراف</p>
  </section>
 </div>
}
