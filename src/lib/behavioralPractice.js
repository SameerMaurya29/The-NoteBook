import {interviewCategories,interviewQuestions,STAR_FIELDS} from '../content/behavioralInterviews.js';
export const ANSWER_LIMIT=2000,ROUND_MS=120000;
export const emptyAnswer=()=>Object.fromEntries(STAR_FIELDS.map(f=>[f.id,'']));
export const questionById=id=>interviewQuestions.find(q=>q.id===id)||null;
export function filterQuestions(category='all',query='') {
 const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 return interviewQuestions.filter(q=>(category==='all'||q.category===category)&&terms.every(t=>`${q.short} ${q.prompt} ${q.intent}`.toLowerCase().includes(t)));
}
export function mockQuestions(seed=0) {
 const offset=Number.isSafeInteger(seed)&&seed>=0?seed:0;
 return interviewCategories.map((c,i)=>{const group=interviewQuestions.filter(q=>q.category===c.id);return group[(offset+i)%group.length];});
}
export const remainingTime=(deadline,now=Date.now())=>Math.max(0,Math.min(ROUND_MS,deadline-now));
export function clockLabel(ms){const seconds=Math.ceil(Math.max(0,ms)/1000);return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;}
export function storyText(drafts) {
 const written=interviewQuestions.filter(q=>STAR_FIELDS.some(f=>typeof drafts[q.id]?.[f.id]==='string'&&drafts[q.id][f.id].trim()));
 return 'THE NOTEBOOK · INTERVIEW PRACTICE\nPersonal draft export. Self-review only; not an interview assessment.\n\n'+written.map(q=>[q.prompt,...STAR_FIELDS.map(f=>`${f.label.toUpperCase()}\n${(drafts[q.id]?.[f.id]||'').slice(0,ANSWER_LIMIT)}`)].join('\n\n')).join('\n\n---\n\n');
}
