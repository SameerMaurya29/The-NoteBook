import {resources,RESOURCE_KINDS,RESOURCE_SUBJECTS} from '../content/resources.js';
export function shelfFilters(params) {
 const subject=params.get('subject')||'all',kind=params.get('kind')||'all';
 return {subject:Object.hasOwn(RESOURCE_SUBJECTS,subject)?subject:'all',kind:Object.hasOwn(RESOURCE_KINDS,kind)?kind:'all',query:(params.get('q')||'').slice(0,200)};
}
export function filterResources({subject='all',kind='all',query=''}={}) {
 const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 return resources.filter(r=>(subject==='all'||r.subjects.includes(subject))&&(kind==='all'||r.kind===kind)&&terms.every(term=>`${r.title} ${r.description} ${r.subjects.map(s=>RESOURCE_SUBJECTS[s]).join(' ')} ${RESOURCE_KINDS[r.kind]}`.toLowerCase().includes(term)));
}
export function subjectResourcesHref(subject) {
 return Object.hasOwn(RESOURCE_SUBJECTS,subject)?`/resources?subject=${encodeURIComponent(subject)}`:'/resources';
}

// Browse-first helpers: subjects in reading order with "General" last, and one primary section per resource.
export const SUBJECT_ORDER=Object.keys(RESOURCE_SUBJECTS).filter(s=>s!=='general').concat('general');
export function groupBySubject(items) {
 const map=new Map();for(const r of items){const s=r.subjects[0];if(!map.has(s))map.set(s,[]);map.get(s).push(r);}
 return SUBJECT_ORDER.filter(s=>map.has(s)).map(subject=>({subject,items:map.get(subject)}));
}
export function subjectCounts({kind='all',query=''}={}) {
 const items=filterResources({kind,query});
 return SUBJECT_ORDER.map(subject=>({subject,count:items.filter(r=>r.subjects.includes(subject)).length})).filter(x=>x.count>0);
}
