import {mergeHistory} from './learningSchema.js';
export function quizCount(requested,available) {
  const n=Number(requested);const desired=Number.isInteger(n)&&n>0?Math.min(n,15):10;
  return Math.max(0,Math.min(desired,available));
}
export function scoreAttempt(pool,answers,{id,subjectId,mode,timeSec=0,date=Date.now()}) {
  const subjectScores={};let correct=0;
  pool.forEach((q,i)=>{
    const subject=q.subjectId||subjectId,ok=answers[i]===q.answer?1:0;
    if(!subjectScores[subject])subjectScores[subject]={correct:0,total:0};
    subjectScores[subject].total++;subjectScores[subject].correct+=ok;correct+=ok;
  });
  return {id,subjectId,correct,total:pool.length,mode,timeSec,date,subjectScores};
}
export function addHistory(history,entry) {return mergeHistory(history,[entry]);}
export function accuracyForSubject(history,subjectId,{inline=false}={}) {
  let runs=0,total=0,possible=0;
  for(const r of history) {
    if((r.mode==='inline')!==inline)continue;
    const score=r.subjectId===subjectId?r:r.subjectScores?.[subjectId];
    if(!score)continue;runs++;total+=score.correct;possible+=score.total;
  }
  return possible?{runs,total,possible,pct:Math.round(100*total/possible)}:null;
}
