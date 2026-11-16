import test from 'node:test';
import assert from 'node:assert/strict';
import {csvToQuestions,fetchFullList,getCachedFullList,CACHE_TTL} from '../src/lib/companyFullList.js';
const csv='Difficulty,Title,Link,Topics\r\nEASY,"Two Sum",https://leetcode.com/problems/two-sum/,"Array, Hash Table"';
const memory=()=>{const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};};
const ok=text=>async()=>({ok:true,headers:{get:()=> 'text/csv'},text:async()=>text});
test('quoted CSV, BOM, escapes, topics and URL column parse',()=>{
 assert.equal(csvToQuestions('\uFEFF'+csv)[0].topics,'Array, Hash Table');
 assert.equal(csvToQuestions(csv.replace('Title,Link','Title,URL').replace('"Two Sum"','"Two ""Sum"""'))[0].title,'Two "Sum"');
});
test('HTML, changed schema, empty, invalid difficulty/URL/quoting fail closed',()=>{
 for(const text of ['<html>ok</html>','Other,Headers\na,b','Title,Difficulty,Link',csv.replace('EASY','UNKNOWN'),csv.replace('https://leetcode.com/problems/two-sum/','javascript:alert(1)'),csv.replace('leetcode.com','evil.test'),csv+'\n"unterminated',csv+'\nwrong,row']) assert.throws(()=>csvToQuestions(text));
});
test('validated cache distinguishes fresh, stale and invalid without deleting raw data',async()=>{
 const storage=memory(),now=10000000000;
 const result=await fetchFullList('A',{storage,fetcher:ok(csv),now:()=>now});assert.equal(result.persisted,true);
 assert.equal(getCachedFullList('A',{storage,now}).stale,false);
 assert.equal(getCachedFullList('A',{storage,now:now+CACHE_TTL+1}).stale,true);
 storage.setItem('cp_full_v1:B','broken');assert.equal(getCachedFullList('B',{storage,now}),null);assert.equal(storage.getItem('cp_full_v1:B'),'broken');
});
test('failed/invalid forced refresh preserves previously valid cache',async()=>{
 const storage=memory();await fetchFullList('A',{storage,fetcher:ok(csv)});const before=storage.getItem('cp_full_v1:A');
 for(const fetcher of [ok('<html>Oops</html>'),async()=>({ok:false,status:503})]) {
  await assert.rejects(fetchFullList('A',{storage,force:true,fetcher}));assert.equal(storage.getItem('cp_full_v1:A'),before);
 }
});
test('quota failure truthfully returns session-only data',async()=>{
 const storage={getItem:()=>null,setItem:()=>{throw Error('quota');}};
 const r=await fetchFullList('A',{storage,fetcher:ok(csv)});assert.equal(r.persisted,false);assert.equal(r.questions.length,1);
});
test('timeouts and cancellation retain cache and do not publish late fetch',async()=>{
 const storage=memory();await fetchFullList('A',{storage,fetcher:ok(csv)});const before=storage.getItem('cp_full_v1:A');
 await assert.rejects(fetchFullList('A',{storage,force:true,timeoutMs:5,fetcher:()=>new Promise(()=>{})}),/timed out/);
 const controller=new AbortController();controller.abort();
 await assert.rejects(fetchFullList('A',{storage,force:true,signal:controller.signal,fetcher:ok(csv)}),{name:'AbortError'});
 assert.equal(storage.getItem('cp_full_v1:A'),before);
});
test('unsafe persisted destinations and wrong-shape cache records are ignored but preserved',()=>{
 const storage=memory();
 for(const record of [{ts:Date.now(),questions:[]},{ts:'yesterday',questions:[]},{ts:Date.now(),questions:[{title:'bad',difficulty:'easy',link:'javascript:alert(1)'}]}]) {
  const raw=JSON.stringify(record);storage.setItem('cp_full_v1:A',raw);assert.equal(getCachedFullList('A',{storage}),null);assert.equal(storage.getItem('cp_full_v1:A'),raw);
 }
});
test('HTML content type is rejected even if response body resembles CSV',async()=>{
 const storage=memory();await assert.rejects(fetchFullList('A',{storage,fetcher:async()=>({ok:true,headers:{get:()=> 'text/html'},text:async()=>csv})}),/received HTML/);
 assert.equal(storage.getItem('cp_full_v1:A'),null);
});
