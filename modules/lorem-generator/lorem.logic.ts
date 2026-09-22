export type LoremType = "word" | "sentence" | "paragraph";
export type LoremLanguage = "en" | "fa";

const enWords = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","magna","aliqua","veniam","quis","nostrud"];
const faWords = ["لورم","ایپسوم","متن","نمونه","طراحی","رابط","کاربری","توسعه","وب","سریع","مدرن","ابزار","ساخت","ایجاد","تولید","اطلاعات","دیجیتال"];

const pick = (arr:string[]) => arr[Math.floor(Math.random()*arr.length)];

function makeSentence(words:string[]) {
 return Array.from({length: 8 + Math.floor(Math.random()*7)}, () => pick(words)).join(" ") + ".";
}

export function generateLorem(type: LoremType, amount:number, language:LoremLanguage = "en") {
 const words = language === "fa" ? faWords : enWords;
 const count = Math.max(1, Math.floor(amount));

 if(type==="word") return Array.from({length:count},()=>pick(words)).join(" ");
 if(type==="sentence") return Array.from({length:count},()=>makeSentence(words)).join(" ");

 return Array.from({length:count},()=>Array.from({length:3},()=>makeSentence(words)).join(" "))
 .join("\n\n");
}

export function getTextStats(text:string){
 return {
  words: text.trim() ? text.trim().split(/\s+/).length : 0,
  chars: text.length,
  paragraphs: text ? text.split(/\n\n/).length : 0
 };
}
