import test from 'node:test';import assert from 'node:assert/strict';
import {quizCount,scoreAttempt,accuracyForSubject,addHistory} from '../src/lib/quizAssessment.js';
test('counts are bounded to pool size, 1–15, and malformed requests default safely',()=>{assert.equal(quizCount(15,3),3);assert.equal(quizCount(100,100),15);assert.equal(quizCount('NaN',20),10);assert.equal(quizCount(-1,20),10);assert.equal(quizCount(10,0),0);});
test('mixed scoring records per-subject contributions and excludes inline from quiz accuracy',()=>{
 const pool=[{subjectId:'python',answer:0},{subjectId:'java',answer:1},{subjectId:'python',answer:2}];
 const r=scoreAttempt(pool,[0,0,2],{id:'run',subjectId:'all',mode:'stopwatch',date:100});assert.equal(r.correct,2);assert.deepEqual(r.subjectScores,{python:{correct:2,total:2},java:{correct:0,total:1}});
 const inline={subjectId:'python',correct:0,total:1,mode:'inline',date:101};const legacy={subjectId:'all',correct:1,total:1,mode:'timed',date:99};
 assert.equal(accuracyForSubject([r,inline,legacy],'python').pct,100);assert.equal(accuracyForSubject([r,inline],'python',{inline:true}).pct,0);assert.equal(accuracyForSubject([legacy],'python'),null);
});
test('stable attempt ID prevents duplicate finish records and history retains latest 50',()=>{
 const r={id:'same',subjectId:'python',correct:1,total:1,mode:'practice',date:100};let h=addHistory([],r);h=addHistory(h,r);assert.equal(h.length,1);
 for(let i=0;i<60;i++)h=addHistory(h,{...r,id:'run-'+i,date:1000+i});assert.equal(h.length,50);assert.equal(h[0].id,'run-59');
});
