import test from 'node:test';import assert from 'node:assert/strict';
import {interviewCategories,interviewQuestions,STAR_FIELDS,selfReviewItems} from '../src/content/behavioralInterviews.js';
import {ANSWER_LIMIT,ROUND_MS,emptyAnswer,questionById,filterQuestions,mockQuestions,remainingTime,clockLabel,storyText} from '../src/lib/behavioralPractice.js';
import {resources} from '../src/content/resources.js';
import {readFile} from 'node:fs/promises';
test('30 original teaching prompts cover all six categories with complete STAR examples',()=>{
 assert.equal(interviewCategories.length,6);assert.equal(interviewQuestions.length,30);assert.equal(new Set(interviewQuestions.map(q=>q.id)).size,30);assert.equal(new Set(interviewQuestions.map(q=>q.prompt)).size,30);
 for(const c of interviewCategories)assert.equal(interviewQuestions.filter(q=>q.category===c.id).length,5);
 for(const q of interviewQuestions){assert.ok(interviewCategories.some(c=>c.id===q.category));for(const key of ['short','prompt','intent','followUp','pitfall'])assert.ok(q[key].length>10);for(const f of STAR_FIELDS)assert.ok(q.example[f.id].length>30);}
 assert.equal(selfReviewItems.length,5);assert.equal(questionById('__proto__'),null);assert.equal(questionById('teamwork-1').category,'teamwork');
});
test('filtering is deterministic, supports category and multi-term search without mutating content',()=>{
 const before=JSON.stringify(interviewQuestions);assert.equal(filterQuestions().length,30);assert.equal(filterQuestions('failure').length,5);assert.ok(filterQuestions('all','technical disagreement').some(q=>q.id==='conflict-1'));assert.equal(filterQuestions('all','missing9876').length,0);assert.equal(JSON.stringify(interviewQuestions),before);
});
test('mock sessions balance topics and rotate prompts deterministically',()=>{
 for(const seed of [0,1,2,7,100,-1,NaN]){const session=mockQuestions(seed);assert.equal(session.length,6);assert.equal(new Set(session.map(q=>q.category)).size,6);assert.equal(new Set(session.map(q=>q.id)).size,6);assert.deepEqual(session,mockQuestions(seed));}
 assert.notDeepEqual(mockQuestions(0).map(q=>q.id),mockQuestions(1).map(q=>q.id));
});
test('timer uses elapsed deadline time, clamps at zero and formats speaking targets',()=>{
 assert.equal(remainingTime(200000,80000),ROUND_MS);assert.equal(remainingTime(200000,140000),60000);assert.equal(remainingTime(200000,250000),0);assert.equal(remainingTime(200000,0),ROUND_MS);assert.equal(clockLabel(120000),'02:00');assert.equal(clockLabel(1001),'00:02');assert.equal(clockLabel(0),'00:00');assert.equal(clockLabel(-1),'00:00');
});
test('draft export contains only personal written answers, with limits and no example substitution',()=>{
 const a=emptyAnswer(),b=emptyAnswer();a.action='My real action';assert.equal(b.action,'');
 const text=storyText({'teamwork-1':a,'failure-1':{result:'x'.repeat(ANSWER_LIMIT+100)}});assert.match(text,/My real action/);assert.match(text,/Self-review only/);assert.ok(text.includes('x'.repeat(ANSWER_LIMIT)));assert.ok(!text.includes('x'.repeat(ANSWER_LIMIT+1)));assert.ok(!text.includes(interviewQuestions[0].example.action));assert.ok(!storyText({}).includes(interviewQuestions[0].prompt));
});
test('existing behavioral resource opens native studio; no ad-hoc persistence or code execution',async()=>{
 const r=resources.find(r=>r.id==='behavioral');assert.equal(r.internalPath,'/interviews/behavioral');assert.equal(r.url,'https://github.com/ashishps1/awesome-behavioral-interviews');
 const source=await readFile(new URL('../src/pages/BehavioralStudio.jsx',import.meta.url),'utf8');assert.doesNotMatch(source,/localStorage\s*\.|sessionStorage\s*\.|eval\s*\(|new Function\s*\(/);assert.match(source,/beforeunload/);assert.match(source,/Fictional teaching example/);
});
