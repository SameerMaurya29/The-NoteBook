export const buildKey=(unitId,itemId)=>`build:os:${unitId}:${itemId}`;
export function pathProgress(path,completed){
 const keys=path.units.flatMap(u=>[...u.syllabus.map(s=>buildKey(u.id,s.id)),buildKey(u.id,'lab')]);
 const done=keys.filter(k=>Boolean(completed[k])).length;
 return {done,total:keys.length,pct:keys.length?Math.round(100*done/keys.length):0};
}
export function countSubjectCompletions(subjects,completed){
 return subjects.reduce((n,s)=>n+s.topics.filter(t=>Boolean(completed[`${s.id}:${t.id}`])).length,0);
}
