import test from 'node:test';import assert from 'node:assert/strict';
import {PAGE_SIZE,scenarios,translate,repairScenario,passedCase,CHALLENGE_KEY,challengePassed} from '../src/lib/osLabBench.js';
import {pathProgress,countSubjectCompletions} from '../src/lib/buildProgress.js';
import {osBuildPath} from '../src/content/build-os.js';
import {defaults,parseProgressFile} from '../src/lib/learningSchema.js';
import {exportProgress,importProgress} from '../src/lib/learningStorage.js';
import {profileKey} from '../src/lib/profileStorage.js';
test('VM boundaries and exact arithmetic',()=>{
 const p=scenarios[0].table;
 for(const [address,physical] of [[0,8192],[4095,12287],[12288,28672],[16383,32767]]) assert.equal(translate(address,'read',p).physical,physical);
 assert.equal(translate(PAGE_SIZE,'read',p).code,'unmapped');
 for(const address of [-1,16384,0.5,NaN,Infinity,'42',null]) assert.equal(translate(address,'read',p).code,'invalid');
 for(const pages of [null,[],[...p.slice(1)],p.map(()=>({frame:8,user:true,read:true,write:true}))]) assert.equal(translate(0,'read',pages).code,'invalid');
 assert.equal(translate(0,'execute',p).code,'invalid');
});
test('first fault order is input, mapping, user permission, access permission',()=>{
 const p=scenarios[0].table.map(v=>v?{...v}:null);p[2].read=false;
 assert.equal(translate(8192,'read',p).code,'supervisor');p[2].user=true;assert.equal(translate(8192,'read',p).code,'read');
 assert.equal(translate(0,'write',p).code,'write');assert.equal(translate(4096,'write',p).code,'unmapped');
});
test('fixtures deterministic, immutable and only safe policy repairs pass',()=>{
 const before=JSON.stringify(scenarios);
 for(const s of scenarios){assert.deepEqual(translate(s.address,s.access,s.table),translate(s.address,s.access,s.table));assert.equal(translate(s.address,s.access,s.table).code,s.expected);assert.equal(passedCase(s,s.expected,s.repair),true);assert.equal(passedCase(s,'invalid',s.repair),false);assert.equal(repairScenario(s,'expose-kernel').ok,false);assert.equal(repairScenario({...s},s.repair).ok,false);}
 assert.equal(JSON.stringify(scenarios),before);const repaired=repairScenario(scenarios[1],'grant-write');repaired.pages[0].frame=6;assert.equal(scenarios[1].table[0].frame,2);
});
test('challenge record preserves transfer, profile isolation, counts and versions',()=>{
 const map=new Map();const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)};
 const data=defaults();data.completed[CHALLENGE_KEY]=123;storage.setItem(profileKey('notebook:progress','a'),JSON.stringify(data.completed));
 const text=exportProgress('a',storage);importProgress(text,'b','replace',storage);assert.equal(challengePassed(parseProgressFile(exportProgress('b',storage)).data.completed),true);
 assert.equal(challengePassed({'challenge:os:vm-page-table:v0':123}),false);assert.equal(challengePassed({[CHALLENGE_KEY]:'123'}),false);assert.equal(storage.getItem(profileKey('notebook:progress','c')),null);
 importProgress(JSON.stringify({format:'notebook-progress',version:1,exportedAt:new Date().toISOString(),data:defaults()}),'b','merge',storage);assert.equal(challengePassed(parseProgressFile(exportProgress('b',storage)).data.completed),true);
 importProgress(JSON.stringify({format:'notebook-progress',version:1,exportedAt:new Date().toISOString(),data:defaults()}),'b','replace',storage);assert.equal(challengePassed(parseProgressFile(exportProgress('b',storage)).data.completed),false);
 assert.deepEqual(pathProgress(osBuildPath,data.completed),{done:0,total:199,pct:0});assert.equal(countSubjectCompletions([{id:'os',topics:[{id:'vm'}]}],data.completed),0);assert.equal(data.history.length,0);
});
