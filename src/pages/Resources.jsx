import {useSearchParams,Link} from 'react-router-dom';
import {ExternalLink} from 'lucide-react';
import {RESOURCE_KINDS,RESOURCE_SUBJECTS} from '@/content/resources';
import {shelfFilters,filterResources,groupBySubject,subjectCounts} from '@/lib/resourceShelf';

const PERSONAL=import.meta.env.VITE_PERSONAL_LIBRARY==='1';
const TAB_LABEL={books:'Books',courses:'Courses',practice:'Practice',interviews:'Interviews',reference:'References',tools:'Tools',discover:'Explore'};
const tabClass=on=>`shrink-0 border rounded-sm px-3 py-2 min-h-[44px] text-sm whitespace-nowrap ${on?'bg-greenink/10 border-greenink text-ink font-medium':'border-brown/30 text-brown hover:text-ink'}`;
const chipClass=on=>`border rounded-full px-3 py-1.5 min-h-[40px] text-sm ${on?'bg-greenink/10 border-greenink text-ink font-medium':'border-brown/30 text-brown hover:text-ink'}`;

function Row({r,showKind}){
 return <li className="min-w-0 border border-brown/30 rounded-sm bg-paper-2/30 px-4 py-3">
 <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
 <h3 className="text-base font-semibold min-w-0">{r.internalPath?<Link className="underline underline-offset-4 break-words inline-flex items-start gap-2" to={r.internalPath}>{r.title} →</Link>:<a className="underline underline-offset-4 break-words inline-flex items-start gap-2" href={r.url} target="_blank" rel="noopener noreferrer"><span>{r.title}{r.format==='PDF'?' (PDF)':''}</span><ExternalLink size={14} className="shrink-0 mt-1" aria-hidden="true"/><span className="sr-only"> (opens external site in a new tab)</span></a>}</h3>
 {PERSONAL&&r.pdf&&<p className="flex gap-4 text-sm shrink-0"><a className="underline py-2 min-h-[44px] inline-flex items-center" href={import.meta.env.BASE_URL+r.pdf.replace(/^\//,"")} target="_blank" rel="noopener">Open PDF</a><a className="underline py-2 min-h-[44px] inline-flex items-center" href={import.meta.env.BASE_URL+r.pdf.replace(/^\//,"")} download>Download PDF</a></p>}
 </div>
 <p className="text-sm leading-6 mt-1">{r.description}</p>
 <p className="text-xs text-brown mt-1">{showKind&&<span>{RESOURCE_KINDS[r.kind]} · </span>}{r.access}{r.status==='limited'&&<span className="font-medium"> · Access not fully verified</span>}</p>
 <details className="text-sm text-brown"><summary className="cursor-pointer py-2 min-h-[40px] inline-block">Source & access notes</summary><div className="space-y-2 break-words pt-1"><p>{r.status==='checked'?`Source reviewed ${r.verifiedAt}. This is not a test of every course, exercise or link.`:r.status==='existing'?'Retained from the existing shelf; not reverified in this update.':'Supplied resource retained with the limitations below.'}</p>{r.caution&&<p>{r.caution}</p>}{r.subjects.length>1&&<p>Also relevant to: {r.subjects.slice(1).map(s=>RESOURCE_SUBJECTS[s]).join(', ')}.</p>}{r.internalPath&&<a className="underline block py-2" href={r.url} target="_blank" rel="noopener noreferrer">External background source ↗</a>}{r.evidenceUrl&&<a href={r.evidenceUrl} target="_blank" rel="noopener noreferrer" className="underline block py-2">Author / source page ↗</a>}{r.originalUrl&&<a href={r.originalUrl} target="_blank" rel="noopener noreferrer" className="underline block py-2">Original supplied link (third-party or redirected) ↗</a>}</div></details>
 </li>;
}

export default function Resources(){
 const [params,setParams]=useSearchParams();const raw=shelfFilters(params);
 // Opening the shelf with no filters shows Books first; "Everything" keeps the old all-types view.
 const untouched=!params.get('kind')&&!params.get('subject')&&!params.get('q');
 const filters=untouched?{...raw,kind:'books'}:raw;
 const matches=filterResources(filters);
 const counts=subjectCounts({kind:filters.kind,query:filters.query});
 const groups=filters.subject==='all'?groupBySubject(matches):[{subject:filters.subject,items:matches}];
 const update=(key,value)=>{const next=new URLSearchParams(params);if(untouched&&key!=='kind')next.set('kind','books');if(!value||(value==='all'&&key==='subject'))next.delete(key);else next.set(key,value);setParams(next,{replace:key==='q'});};
 const total=filterResources({kind:filters.kind,query:filters.query}).length;
 return <div className="animate-page-turn space-y-6">
 <header className="double-rule pt-4"><p className="font-hand text-2xl text-brown">the reference shelf</p><h1 className="text-4xl font-semibold">Learning resources</h1><p className="text-brown mt-2 max-w-2xl">Pick a type, then a subject. Each subject lists the books, courses and practice sites chosen for it.</p></header>
 <section aria-label="Browse learning resources" className="space-y-4">
 <div className="flex flex-wrap items-center gap-3 justify-between">
 <div role="group" aria-label="Resource type" className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 max-w-full">{Object.entries(RESOURCE_KINDS).map(([id,label])=><button key={id} type="button" title={label} aria-label={label} aria-pressed={filters.kind===id} className={tabClass(filters.kind===id)} onClick={()=>update('kind',id)}>{TAB_LABEL[id]||label}</button>)}<button type="button" aria-pressed={filters.kind==='all'} className={tabClass(filters.kind==='all')} onClick={()=>update('kind','all')}>Everything</button></div>
 <label className="text-sm flex items-center gap-2"><span className="sr-only">Search resources</span><input type="search" value={filters.query} maxLength={200} onChange={e=>update('q',e.target.value)} placeholder="Search a title…" className="w-44 sm:w-56 p-2 bg-paper border border-brown/40 rounded-sm min-h-[44px]"/></label>
 </div>
 <div role="group" aria-label="Subject" className="flex flex-wrap gap-2"><button type="button" aria-pressed={filters.subject==='all'} className={chipClass(filters.subject==='all')} onClick={()=>update('subject','all')}>All subjects <span className="text-brown">{total}</span></button>{counts.map(({subject,count})=><button key={subject} type="button" aria-pressed={filters.subject===subject} className={chipClass(filters.subject===subject)} onClick={()=>update('subject',subject)}>{RESOURCE_SUBJECTS[subject]} <span className="text-brown">{count}</span></button>)}</div>
 </section>
 <div className="flex flex-wrap items-center justify-between gap-3"><p role="status" aria-live="polite" className="text-sm text-brown">{matches.length} resource{matches.length===1?'':'s'}{filters.subject!=='all'?` for ${RESOURCE_SUBJECTS[filters.subject]}`:''}</p>{(filters.subject!=='all'||filters.query||(!untouched&&filters.kind!=='books'))&&<button className="underline min-h-[44px] text-sm" onClick={()=>setParams({})}>Clear filters</button>}</div>
 {!matches.length&&<div className="border border-brown/30 p-5"><h2 className="text-xl">No matching resources</h2><p className="mt-2">Try another subject, choose another type or shorten the search.</p></div>}
 <div className="space-y-8">{groups.map(({subject,items})=><section key={subject} aria-labelledby={`shelf-${subject}`}><h2 id={`shelf-${subject}`} className="text-2xl mb-3 flex items-baseline gap-3">{RESOURCE_SUBJECTS[subject]}<span className="text-sm text-brown font-normal">{items.length}</span></h2><ul className="grid gap-3">{items.map(r=><Row key={r.id} r={r} showKind={filters.kind==='all'}/>)}</ul></section>)}</div>
 <aside className="text-sm text-brown border-t border-brown/30 pt-4 space-y-2"><p>External links open other sites. Their accounts, prices and availability can change. External books, videos and exercises are not downloaded for offline use or tracked as completed here.</p><p>Book listings do not grant permission to copy or redistribute a work. Prefer author, publisher or library access; check each work’s license.</p><Link to="/cheatsheets" className="inline-block underline py-2">Use the notebook’s built-in cheatsheets →</Link></aside>
 </div>;
}
