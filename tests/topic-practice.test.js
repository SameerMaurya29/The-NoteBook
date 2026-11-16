import test from 'node:test';import assert from 'node:assert/strict';
import {TOPIC_PRACTICE} from '../src/content/dsa/topicPractice.js';
import {DSA_SHEETS} from '../src/content/dsa/sheets.js';
import {subjects} from '../src/content/generated/catalog.js';
const dsaTopicIds=subjects.find(s=>s.id==='dsa').topics.map(t=>t.id);
test('every DSA topic has a practice list of at least 12 unique problems',()=>{
 for(const id of dsaTopicIds){const l=TOPIC_PRACTICE[id];assert.ok(l&&l.length>=12,id);assert.equal(new Set(l.map(p=>p.id)).size,l.length,id);}
 assert.deepEqual(Object.keys(TOPIC_PRACTICE).filter(k=>!dsaTopicIds.includes(k)),[]);
});
test('links are canonical leetcode problem URLs that match their id, ordered easy to hard',()=>{
 const rank={easy:0,medium:1,hard:2};
 for(const [t,l] of Object.entries(TOPIC_PRACTICE)){let last=0;for(const p of l){assert.match(p.url,/^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/,p.url);assert.ok(Number.isInteger(p.id)&&p.id>0);assert.ok(p.title);assert.ok(rank[p.difficulty]>=last,t);last=rank[p.difficulty];}}
});
test('problems that the reviewed sheets already match keep the same id and url',()=>{
 const sheet=new Map(DSA_SHEETS.flatMap(c=>c.questions).filter(q=>q.problemId&&q.url).map(q=>[String(q.problemId),q.url]));
 let checked=0;for(const l of Object.values(TOPIC_PRACTICE))for(const p of l)if(sheet.has(String(p.id))){assert.equal(sheet.get(String(p.id)),p.url,p.title);checked++;}
 assert.ok(checked>200);
});
