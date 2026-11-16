import {useState,useEffect} from 'react';
import {getCurrentUser} from '@/lib/localAuth';
import {parseProgressFile,MAX_IMPORT_BYTES,LEARNING_KEYS,FIELDS} from '@/lib/learningSchema';
import {exportProgress,importProgress,readLearningKey,readBackup,restoreBackup,resetDamagedKey,hasPendingImport,readDamagedCopy} from '@/lib/learningStorage';
export function downloadJSON(text,name) {
  const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export default function ProgressData() {
  const username=getCurrentUser()?.username||'@guest';
  const [preview,setPreview]=useState(null),[text,setText]=useState(''),[mode,setMode]=useState('merge'),[message,setMessage]=useState(''),[,refresh]=useState(0);
  useEffect(()=>{const sync=()=>refresh(n=>n+1);window.addEventListener('storage',sync);window.addEventListener('notebook-storage',sync);return()=>{window.removeEventListener('storage',sync);window.removeEventListener('notebook-storage',sync);};},[]);
  const notify=()=>{window.dispatchEvent(new CustomEvent('notebook-storage',{detail:null}));refresh(n=>n+1);};
  const action=fn=>{try{fn();notify();}catch(error){setMessage(error.message);notify();}};
  const reads=LEARNING_KEYS.map(key=>readLearningKey(key,username));
  let backup=null,backupError='';try{backup=readBackup(username);}catch(error){backupError=error.message;}
  const pending=hasPendingImport(username);
  const inspect=async event=>{
    setPreview(null);setText('');setMessage('');const file=event.target.files?.[0];
    if(!file)return;
    const target=username;
    try {
      if(file.size>MAX_IMPORT_BYTES)throw Error('Import exceeds 2 MB limit');
      const contents=await file.text(),parsed=parseProgressFile(contents);
      if((getCurrentUser()?.username||'@guest')!==target)throw Error('Profile changed; select the file again');
      setText(contents);setPreview({data:parsed.data,target});
    }catch(error){setMessage(error.message);}
  };
  return <div className="max-w-2xl mx-auto space-y-6">
    <h1 className="text-3xl font-semibold">Progress backup & recovery</h1>
    <p>Current local profile: <strong>{username==='@guest'?'Guest':username}</strong>. Files contain learning progress only—not credentials, passwords, hashes or sessions. Imports affect this profile only. A file can be restored into a different profile only by explicitly importing it there.</p>
    <button className="border border-brown rounded-sm px-4 py-2 min-h-[44px]" onClick={()=>action(()=>{downloadJSON(exportProgress(username),'notebook-progress.json');setMessage('Progress export downloaded.');})}>Export progress</button>
    <section className="border border-brown p-4 space-y-3">
      <h2 className="text-xl">Import a progress file</h2>
      <input type="file" accept=".json,application/json" aria-label="Progress JSON file" onChange={inspect} className="max-w-full"/>
      {preview&&<>
        <p>{Object.keys(preview.data.completed).length} completed topics · {preview.data.bookmarks.length} bookmarks · {Object.keys(preview.data.sheets).length} sheet ticks · {preview.data.history.length} history records. Destination: {preview.target==='@guest'?'Guest':preview.target}.</p>
        <label className="block">Import mode <select aria-label="Import mode" value={mode} onChange={e=>setMode(e.target.value)} className="bg-paper border border-brown p-2"><option value="merge">Merge with existing progress</option><option value="replace">Replace learning progress</option></select></label>
        <p className="text-sm">Merge unions ticks/bookmarks and keeps newer timestamps. History is deduplicated and limited to 50 records. Replace removes existing learning entries not in the file. Both save a pre-import recovery copy first; only the latest import backup is retained.</p>
        <button disabled={pending||preview.target!==username||reads.some(r=>r.error)} className="border border-greenink px-4 py-2 disabled:opacity-50" onClick={()=>action(()=>{
          if((getCurrentUser()?.username||'@guest')!==preview.target)throw Error('Profile changed; select the file again');
          importProgress(text,username,mode);setPreview(null);setText('');setMessage('Import complete. Pre-import backup saved in this browser.');
        })}>Apply {mode} import to this profile</button>
      </>}
    </section>
    <section className="border border-brown p-4 space-y-3">
      <h2 className="text-xl">Recovery</h2>
      <p className="text-sm">Damaged values are never silently overwritten. Backups use this browser’s storage; download copies before clearing or moving browser data. Storage full/disabled errors must be resolved before a safe write can succeed.</p>
      {backupError&&<p role="alert">{backupError}. Preserve browser storage; automatic recovery is blocked.</p>}
      {pending&&!backupError&&<p role="alert">An import was interrupted. Restore its backup before making further changes.</p>}
      {reads.map((read,i)=>read.error&&<div key={LEARNING_KEYS[i]} className="space-y-2"><p>{FIELDS[i]}: {read.error}</p><button disabled={pending} className="border px-3 py-2 disabled:opacity-50" onClick={()=>action(()=>{resetDamagedKey(LEARNING_KEYS[i],username);setMessage(`${FIELDS[i]} reset only after preserving a raw recovery copy.`);})}>Back up raw {FIELDS[i]} & reset this field</button></div>)}
      {backup&&<><p>Latest backup: {backup.createdAt} · {backup.status}</p><button className="border px-3 py-2 mr-2" onClick={()=>action(()=>downloadJSON(JSON.stringify({format:'notebook-learning-recovery',...backup},null,2),'notebook-learning-recovery.json'))}>Download recovery copy</button>
      <button className="border px-3 py-2" onClick={()=>action(()=>{restoreBackup(username);setPreview(null);setMessage('Recovery snapshot restored. Any original corrupt fields remain preserved and still need repair.');})}>Restore this backup (replaces current learning fields)</button></>}
      {LEARNING_KEYS.map((key,i)=>{
        let raw=null;try{raw=readDamagedCopy(username,key);}catch{ /* read error shown above */ }
        return raw&&<button key={key} className="border px-3 py-2 block" onClick={()=>action(()=>downloadJSON(raw,`notebook-damaged-${FIELDS[i]}.json`))}>Download preserved damaged {FIELDS[i]} copy</button>;
      })}
      {!backup&&!backupError&&!reads.some(r=>r.error)&&<p>No stored recovery backup; learning data is readable.</p>}
    </section>
    {message&&<p role="status" className="border border-brown p-3">{message}</p>}
  </div>;
}
