export const LEARNING_KEYS = ['notebook:progress','notebook:quizHistory','notebook:bookmarks','notebook:sheetProgress'];
export const FIELDS = ['completed','history','bookmarks','sheets'];
export const MAX_IMPORT_BYTES = 2 * 1024 * 1024;
export const defaults = () => ({completed:{},history:[],bookmarks:[],sheets:{}});
const plain = v => v && typeof v==='object' && !Array.isArray(v) && Object.getPrototypeOf(v)===Object.prototype;
const safe = v => typeof v==='string' && v.length>0 && v.length<=300 && !['__proto__','constructor','prototype'].includes(v) && !/[\x00-\x1f]/.test(v);
const stamp = v => Number.isSafeInteger(v) && v>0;
const only = (o, keys) => Object.keys(o).every(k=>keys.includes(k));
export function validHistoryRecord(r) {
  if(!plain(r) || !only(r,['id','subjectId','topicId','correct','total','mode','date','timeSec','subjectScores'])) return false;
  if(!safe(r.subjectId) || !Number.isSafeInteger(r.total) || r.total<1 || r.total>1500 || !Number.isSafeInteger(r.correct) || r.correct<0 || r.correct>r.total || !stamp(r.date) || !['inline','practice','timed','stopwatch'].includes(r.mode)) return false;
  if(r.id!==undefined&&!safe(r.id) || r.topicId!==undefined&&!safe(r.topicId) || r.timeSec!==undefined&&(!Number.isFinite(r.timeSec)||r.timeSec<0||r.timeSec>31536000))return false;
  if(r.subjectScores!==undefined) {
    if(!plain(r.subjectScores)||Object.keys(r.subjectScores).length>50)return false;
    let total=0,correct=0;
    for(const [id,s] of Object.entries(r.subjectScores)) {
      if(!safe(id)||id==='all'||!plain(s)||!only(s,['correct','total'])||!Number.isSafeInteger(s.total)||s.total<1||!Number.isSafeInteger(s.correct)||s.correct<0||s.correct>s.total)return false;
      total+=s.total;correct+=s.correct;
    }
    if(total!==r.total||correct!==r.correct)return false;
  }
  return true;
}
export function validLearningValue(key,value) {
  if(key==='notebook:quizHistory')return Array.isArray(value)&&value.length<=50&&value.every(validHistoryRecord);
  if(key==='notebook:bookmarks')return Array.isArray(value)&&value.length<=10000&&value.every(safe);
  if(['notebook:progress','notebook:sheetProgress'].includes(key))return plain(value)&&Object.keys(value).length<=10000&&Object.entries(value).every(([k,v])=>safe(k)&&stamp(v));
  return false;
}
export function validateData(data) {
  if(!plain(data)||!only(data,FIELDS)||!FIELDS.every(k=>Object.hasOwn(data,k)))throw Error('Learning-data fields do not match version 1');
  FIELDS.forEach((field,i)=>{if(!validLearningValue(LEARNING_KEYS[i],data[field]))throw Error(`Invalid ${field} data`);});
  return data;
}
export function parseProgressFile(text) {
  if(typeof text!=='string'||new TextEncoder().encode(text).length>MAX_IMPORT_BYTES)throw Error('Import exceeds 2 MB limit');
  let value;try{value=JSON.parse(text);}catch{throw Error('File is not valid JSON');}
  if(!plain(value)||!only(value,['format','version','exportedAt','data'])||value.format!=='notebook-progress'||value.version!==1||typeof value.exportedAt!=='string'||!Number.isFinite(Date.parse(value.exportedAt)))throw Error('Unsupported progress file format or version');
  validateData(value.data);return value;
}
export function mergeHistory(current,incoming) {
  const seen=new Set();
  return [...current,...incoming].sort((a,b)=>b.date-a.date).filter(r=>{
    const key=r.id?`id:${r.id}`:`legacy:${JSON.stringify(r)}`;
    if(seen.has(key))return false;seen.add(key);return true;
  }).slice(0,50);
}
export function mergeData(current,incoming) {
  const timestamps=(a,b)=>Object.fromEntries([...new Set([...Object.keys(a),...Object.keys(b)])].map(k=>[k,Math.max(a[k]||0,b[k]||0)]));
  const result={completed:timestamps(current.completed,incoming.completed),history:mergeHistory(current.history,incoming.history),bookmarks:[...new Set([...current.bookmarks,...incoming.bookmarks])],sheets:timestamps(current.sheets,incoming.sheets)};
  return validateData(result);
}
