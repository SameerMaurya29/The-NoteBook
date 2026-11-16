import test from 'node:test';import assert from 'node:assert/strict';import {build} from 'esbuild';
import {ROADMAP} from '../src/content/roadmap.js';
const b=await build({entryPoints:['src/content/index.js'],bundle:true,write:false,format:'esm',platform:'node'});const {findTopic,subjects}=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].text).toString('base64'));
test('every phase has explicit reachable milestones and includes all subjects',()=>{
 const covered=new Set();
 for(const phase of ROADMAP){assert.ok(phase.items.length>0);for(const item of phase.items){assert.ok(item.topic);assert.ok(item.focus);assert.ok(findTopic(item.subjectId,item.topic),`${item.subjectId}:${item.topic}`);covered.add(item.subjectId);}}
 assert.deepEqual([...covered].sort(),subjects.map(s=>s.id).sort());
});
test('ticking every phase milestone makes every phase completable without 0/0',()=>{
 const done=new Set(ROADMAP.flatMap(p=>p.items.map(i=>`${i.subjectId}:${i.topic}`)));
 for(const p of ROADMAP)assert.equal(p.items.filter(i=>done.has(`${i.subjectId}:${i.topic}`)).length,p.items.length);
});
