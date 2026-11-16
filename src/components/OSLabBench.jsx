import {useEffect,useRef,useState} from 'react';
import {useLocalStorage} from '@/lib/useLocalStorage';
import {getCurrentUser} from '@/lib/localAuth';
import {CHALLENGE_KEY,challengePassed,outcomes,scenarios,translate,repairScenario,passedCase,PAGE_SIZE} from '@/lib/osLabBench';
const button='border border-brown/50 rounded-sm px-4 py-2 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed';
// Remount in-memory attempts when the active local profile changes.
export default function OSLabBench(props){return <Bench key={getCurrentUser()?.username||'@guest'} {...props}/>;}
function Bench({onClose}){
 const [completed,setCompleted]=useLocalStorage('notebook:progress',{});
 const [index,setIndex]=useState(0),[prediction,setPrediction]=useState(''),[phase,setPhase]=useState('predict'),[action,setAction]=useState(''),[result,setResult]=useState(null),[solved,setSolved]=useState([]),[message,setMessage]=useState(''),[finished,setFinished]=useState(false);
 const heading=useRef(null),lock=useRef(false);const s=scenarios[index];
 useEffect(()=>{heading.current?.focus();lock.current=false;},[phase,index,finished]);
 const reset=()=>{setPrediction('');setPhase('predict');setAction('');setResult(null);setMessage('');lock.current=false;};
 const restart=()=>{setIndex(0);setSolved([]);setFinished(false);reset();};
 const save=()=>{const ok=setCompleted(prev=>({...prev,[CHALLENGE_KEY]:Date.now()}));setMessage(ok?'Simulation challenge passed. Saved to this local profile.':'Challenge completed, but saving failed. Free storage or recover learning data, then retry saving.');return ok;};
 const retry=()=>{
  if(lock.current)return;lock.current=true;
  const fixed=repairScenario(s,action);
  if(!fixed.ok){setMessage(fixed.error);lock.current=false;return;}
  setResult(fixed.result);
  if(!passedCase(s,prediction,action)){setMessage('The repair is safe, but your initial prediction was incorrect. Retry this case with a fresh prediction; it has not counted toward the challenge.');setPhase('retry');return;}
  const next=[...new Set([...solved,s.id])];setSolved(next);setPhase('done');
  if(next.length===scenarios.length){setFinished(true);save();}else setMessage('Case passed: correct prediction and safe outcome.');
 };
 return <section aria-label="OS Lab Bench" className="border border-brown/40 rounded-sm bg-paper-2/40 p-4 md:p-6 space-y-5 no-print min-w-0">
 <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-hand text-xl text-brown">OS Lab Bench · Virtual Memory</p><h2 ref={heading} tabIndex={-1} className="text-2xl">{finished?'Challenge complete':`${index+1} / ${scenarios.length} · ${s.title}`}</h2></div><button className={button} onClick={onClose}>Close lab</button></div>
 <p className="text-sm">A deterministic browser simulation, not a kernel or Sv39 emulator. Four virtual pages, {PAGE_SIZE}-byte pages, eight physical frames; user-mode reads/writes only. No TLB, demand paging or copy-on-write. First failing check wins: input → mapping → user permission → read/write permission.</p>
 {challengePassed(completed)&&<p className="text-sm">Simulation challenge passed · saved locally. Separate from reading ticks and real kernel implementation.</p>}
 {!finished&&<><p className="font-reading text-lg">{s.policy}</p><p className="font-mono-code break-words">Access: {s.access} · virtual address {s.address}</p>
 {phase==='predict'&&<form onSubmit={e=>{e.preventDefault();if(!prediction||lock.current)return;lock.current=true;setResult(translate(s.address,s.access,s.table));setPhase('run');}} className="space-y-4"><fieldset><legend className="font-semibold mb-2">Predict the outcome and first reason</legend>{Object.entries(outcomes).filter(([key])=>key!=='invalid').map(([code,label])=><label className="flex gap-3 items-center min-h-[44px]" key={code}><input type="radio" name="prediction" value={code} checked={prediction===code} onChange={()=>setPrediction(code)}/><span>{label}</span></label>)}</fieldset><button className={button} disabled={!prediction}>Run access</button></form>}
 {phase!=='predict'&&<><p>{prediction===s.expected?'Correct prediction.':'Prediction did not match. Inspect the first failing check, then retry this case to earn credit.'}</p><ol className="list-decimal pl-5 space-y-2 break-words" aria-label="Translation trace">{result?.trace.map((line,i)=><li key={i}>{line}</li>)}</ol>
 {phase==='run'&&<button className={button} onClick={()=>setPhase('inspect')}>Inspect page table</button>}
 {['inspect','retry','done'].includes(phase)&&<><div className="overflow-x-auto"><table className="w-full text-sm text-left"><caption className="text-left font-semibold mb-2">{phase==='done'?'Verified':'Original'} page table · absent entries are unmapped</caption><thead><tr>{['Page','Frame','User','Read','Write'].map(v=><th scope="col" className="p-2" key={v}>{v}</th>)}</tr></thead><tbody>{(phase==='done'?repairScenario(s,action).pages:s.table).map((p,i)=><tr className="border-t border-brown/20" key={i}><th scope="row" className="p-2">{i}</th><td className="p-2">{p?.frame??'—'}</td>{['user','read','write'].map(k=><td className="p-2" key={k}>{p?(p[k]?'Yes':'No'):'—'}</td>)}</tr>)}</tbody></table></div>
 {phase==='inspect'&&<div className="space-y-3"><label className="block font-semibold" htmlFor="vm-repair">Choose a safe fix or preserve the correct outcome</label><select className="block w-full max-w-full border border-brown/50 bg-paper px-2 py-3" id="vm-repair" value={action} onChange={e=>{setAction(e.target.value);setMessage('');}}><option value="">Choose an action</option><option value="keep">Keep mapping and enforce policy</option><option value="grant-write">Enable write on user page 0</option><option value="map-buffer">Map user page 1 to frame 3</option><option value="expose-kernel">Make kernel page user-accessible</option></select><button className={button} disabled={!action} onClick={retry}>Retry and verify</button></div>}
 {phase==='retry'&&<button className={button} onClick={reset}>Try a fresh prediction</button>}
 {phase==='done'&&<button className={button} onClick={()=>{setIndex(index+1);reset();}}>Next case</button>}
 </>}
 </>}
 </>}
 <p role="status" aria-live="polite" className="break-words">{message}</p>
 {finished&&!challengePassed(completed)&&<button className={button} onClick={save}>Retry saving result</button>}
 <button className="underline min-h-[44px]" onClick={restart}>Restart challenge</button>
 <p className="text-sm text-brown">Pass all four cases with a correct prediction and the permitted repair or rejection. Wrong predictions need a fresh attempt. Local learning records are not tamper-proof credentials. Closing or restarting clears unsaved attempts, not an already saved pass.</p>
 </section>;
}
