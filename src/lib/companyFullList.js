// On-demand mutable upstream snapshot; successful fetch does not imply completeness.
const BASE = 'https://raw.githubusercontent.com/liquidslr/leetcode-company-wise-problems/main';
const CACHE_PREFIX = 'cp_full_v1:';
export const CACHE_TTL = 30 * 24 * 60 * 60 * 1000;
const MAX_BYTES = 5 * 1024 * 1024;
export function safeProblemURL(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && u.hostname === 'leetcode.com' && !u.port && !u.username && !u.password && /^\/problems\/[a-z0-9-]+\/?$/.test(u.pathname) && !u.search && !u.hash;
  } catch { return false; }
}
function validQuestion(q) {
  return q && typeof q.title === 'string' && q.title.trim() && ['easy','medium','hard'].includes(q.difficulty) && safeProblemURL(q.link) && (q.topics === undefined || typeof q.topics === 'string');
}
export function getCachedFullList(company, { storage = globalThis.localStorage, now = Date.now() } = {}) {
  try {
    const data = JSON.parse(storage.getItem(CACHE_PREFIX + company));
    if (!data || !Number.isFinite(data.ts) || data.ts <= 0 || data.ts > now + 60000 || !Array.isArray(data.questions) || !data.questions.length || !data.questions.every(validQuestion)) return null;
    return { questions: data.questions, ts: data.ts, source: 'cache', persisted: true, stale: now - data.ts > CACHE_TTL };
  } catch { return null; }
}
export function parseCSV(text) {
  if (typeof text !== 'string' || text.length > MAX_BYTES || /^\s*</.test(text)) throw new Error('Invalid CSV response');
  text = text.replace(/^\uFEFF/, '');
  const rows = []; let row = [], field = '', quoted = false, closed = false;
  const finish = () => { row.push(field); if (row.some(v=>v.trim())) rows.push(row); row=[];field='';closed=false; };
  for (let i=0;i<text.length;i++) {
    const c=text[i];
    if (quoted) {
      if (c==='"' && text[i+1]==='"') {field+='"';i++;}
      else if(c==='"') {quoted=false;closed=true;} else field+=c;
    } else if (c==='"') {
      if (field || closed) throw new Error('Malformed CSV quoting'); quoted=true;
    } else if(c===',') {row.push(field);field='';closed=false;}
    else if(c==='\n') finish();
    else if(c!=='\r') { if(closed) throw new Error('Malformed CSV field'); field+=c; }
  }
  if (quoted) throw new Error('Unclosed CSV quote');
  if(field || row.length) finish();
  return rows;
}
export function csvToQuestions(text) {
  const rows=parseCSV(text);
  if(rows.length < 2) throw new Error('CSV has no questions');
  const header=rows.shift().map(h=>h.trim().toLowerCase());
  if(new Set(header).size!==header.length) throw new Error('Duplicate CSV columns');
  const ti=header.indexOf('title'), di=header.indexOf('difficulty'), li=header.includes('link')?header.indexOf('link'):header.indexOf('url'), pi=header.indexOf('topics');
  if ([ti,di,li].some(i=>i<0)) throw new Error('CSV schema changed: title, difficulty and link/url required');
  const out=[],seen=new Set();
  for(const row of rows) {
    if(row.length!==header.length) throw new Error('CSV row does not match schema');
    const q={title:row[ti].trim(),difficulty:row[di].trim().toLowerCase(),link:row[li].trim(),topics:pi<0?'':row[pi].trim()};
    if(!validQuestion(q)) throw new Error('CSV contains an invalid question or unsafe destination');
    if(!seen.has(q.link)) {out.push(q);seen.add(q.link);}
  }
  if(!out.length) throw new Error('CSV has no valid questions');
  return out;
}
export async function fetchFullList(company, {force=false,signal=/** @type {AbortSignal | undefined} */ (undefined),timeoutMs=15000,storage=globalThis.localStorage,fetcher=globalThis.fetch,now=Date.now}={}) {
  if(!force) {const cached=getCachedFullList(company,{storage,now:now()});if(cached && !cached.stale) return cached;}
  const controller=new AbortController(); let timer,abort;
  const interrupted=new Promise((_,reject)=>{
    abort=()=>{controller.abort();reject(new DOMException('Request cancelled','AbortError'));};
    if(signal?.aborted) abort(); else signal?.addEventListener('abort',abort,{once:true});
    timer=setTimeout(()=>{controller.abort();reject(new Error('Request timed out; previous saved list retained'));},timeoutMs);
  });
  try {
    const result=await Promise.race([interrupted,(async()=>{
      const response=await fetcher(`${BASE}/${encodeURIComponent(company)}/${encodeURIComponent('5. All.csv')}`,{signal:controller.signal});
      if(!response.ok) throw new Error(`HTTP ${response.status}; previous saved list retained`);
      if(/text\/html/i.test(response.headers?.get('content-type') || '')) throw new Error('Expected CSV, received HTML');
      const text=await response.text();
      if(controller.signal.aborted) throw new DOMException('Request cancelled','AbortError');
      return csvToQuestions(text);
    })()]);
    // Only write after successful validation; no removal of previous cache on error.
    const ts=now();let persisted=false;
    try {storage.setItem(CACHE_PREFIX+company,JSON.stringify({ts,questions:result}));persisted=true;}catch { /* session data remains usable */ }
    return {questions:result,ts,source:'network',persisted,stale:false};
  } finally {clearTimeout(timer);signal?.removeEventListener('abort',abort);}
}
