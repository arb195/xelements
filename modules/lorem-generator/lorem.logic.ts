
export type LoremType = "word" | "sentence" | "paragraph";

const words = [
"lorem","ipsum","dolor","sit","amet","consectetur","adipiscing",
"elit","sed","do","eiusmod","tempor","incididunt","ut","labore",
"magna","aliqua","veniam","quis","nostrud"
];

const word = () => words[Math.floor(Math.random()*words.length)];

const sentence = () =>
 Array.from({length:10+Math.floor(Math.random()*8)},word).join(" ")+".";

export function generateLorem(type: LoremType, amount:number) {
 const count=Math.max(1,Math.floor(amount));
 if(type==="word") return Array.from({length:count},word).join(" ");
 if(type==="sentence") return Array.from({length:count},sentence).join(" ");
 return Array.from({length:count},()=>Array.from({length:4},sentence).join(" ")).join("\n\n");
}

export function getTextStats(text:string){
 return {
  words:text.trim()?text.trim().split(/\s+/).length:0,
  chars:text.length,
  paragraphs:text ? text.split(/\n\n/).length:0
 };
}
