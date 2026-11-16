/* Notebook offline worker. Generated build configuration is prepended by Vite. */
const PREFIX='notebook-static:';
const coreName=PREFIX+BUILD+':core';
const currentPrefix=PREFIX+BUILD+':';
const STATUS='/__notebook_offline_status__';
const saving=new Map();
const urlOf=path=>new URL(path,self.location.origin).href;
async function fetchAsset(path){
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
 try{const r=await fetch(path,{cache:'reload',credentials:'omit',signal:controller.signal});if(!r.ok||r.type==='opaque')throw Error('Download failed: '+path);if(/\.(js|css|woff2)$/.test(path)&&r.headers.get('content-type')?.includes('text/html'))throw Error('Server returned HTML for an asset');return r;}finally{clearTimeout(timeout);}
}
async function statuses(verify=true){
 const out=[];
 for(const name of await caches.keys()){
  if(!name.startsWith(PREFIX)||name.includes(':pending:'))continue;
  const cache=await caches.open(name),r=await cache.match(STATUS);if(!r)continue;
  let metadata;try{metadata=await r.json();}catch{continue;}
  if(!metadata||!['shell','subject'].includes(metadata.kind))continue;
  const current=name.startsWith(currentPrefix);
  // A metadata marker alone is not proof: browsers may evict individual entries.
  const paths=current?(metadata.kind==='shell'?SHELL:SUBJECTS[metadata.id]):metadata.paths;
  if(verify&&Array.isArray(paths)){
   let complete=true;for(const path of paths)if(!await cache.match(path)){complete=false;break;}
   if(!complete)continue;
  }
  out.push({...metadata,cacheName:name,current});
 }
 return out;
}
async function saveSubject(id){
 if(!Object.hasOwn(SUBJECTS,id))throw Error('Unknown subject');
 const existing=(await statuses()).find(s=>s.current&&s.id===id);if(existing)return existing;
 const name=currentPrefix+'subject:'+id+':'+crypto.randomUUID(),cache=await caches.open(name);
 try{for(const path of SUBJECTS[id])await cache.put(path,await fetchAsset(path));const metadata={build:BUILD,kind:'subject',id,savedAt:new Date().toISOString(),assets:SUBJECTS[id].length,paths:SUBJECTS[id]};await cache.put(STATUS,new Response(JSON.stringify(metadata),{headers:{'content-type':'application/json'}}));return metadata;}
 catch(error){await caches.delete(name);throw error;}
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
 // Failed installation cannot activate and does not remove previous releases.
 const cache=await caches.open(coreName);try{for(const path of SHELL)await cache.put(path,await fetchAsset(path));await cache.put(STATUS,new Response(JSON.stringify({build:BUILD,kind:'shell',savedAt:new Date().toISOString(),paths:SHELL})));}catch(error){await caches.delete(coreName);throw error;}
})()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('message',event=>{
 const port=event.ports?.[0],data=event.data||{};
 const reply=value=>port?.postMessage(value);
 event.waitUntil((async()=>{try{
  if(data.type==='ACTIVATE_UPDATE'){await self.skipWaiting();reply({ok:true});return;}
  if(data.type==='STATUS'){reply({ok:true,build:BUILD,saved:await statuses()});return;}
  if(data.type==='SAVE_SUBJECT'){
   if(!saving.has(data.id))saving.set(data.id,saveSubject(data.id).finally(()=>saving.delete(data.id)));
   reply({ok:true,saved:await saving.get(data.id)});return;
  }
  if(data.type==='REMOVE_SUBJECT'){
   // Settle a concurrent download before removing it; do not resurrect the copy.
   if(saving.has(data.id))await saving.get(data.id).catch(()=>{});
   for(const s of await statuses(false))if(s.kind==='subject'&&s.id===data.id)await caches.delete(s.cacheName);
   reply({ok:true});return;
  }
  if(data.type==='REMOVE_OLD'){
   for(const name of await caches.keys())if(name.startsWith(PREFIX)&&!name.startsWith(currentPrefix))await caches.delete(name);
   reply({ok:true});return;
  }
  reply({ok:false,error:'Unknown offline action'});
 }catch(error){reply({ok:false,error:error.message||'Offline storage unavailable or full'});}})());
});
async function matchStatic(request){
 const names=await caches.keys();names.sort((a,b)=>Number(b.startsWith(currentPrefix))-Number(a.startsWith(currentPrefix)));for(const name of names){if(!name.startsWith(PREFIX))continue;
  // HTML shell uses active release only; old exact hashed assets support still-open tabs.
  if(!name.startsWith(currentPrefix)&&!new URL(request.url).pathname.startsWith('/assets/'))continue;
  const cache=await caches.open(name);if(!await cache.match(STATUS))continue;const response=await cache.match(request);if(response)return response;
 }return null;
}
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/tests/'))return;
 if(request.mode==='navigate'){
  event.respondWith((async()=>{
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),3000);
   try{const r=await fetch(request,{signal:controller.signal});if(r.ok)return r;}catch{/* origin unavailable */}finally{clearTimeout(timeout);}
   const cache=await caches.open(coreName);return await cache.match('/index.html')||await cache.match('/offline.html')||new Response('Offline. Reconnect to open the notebook.',{status:503,headers:{'content-type':'text/plain'}});
  })());return;
 }
 // No API, authentication, GitHub/company-list or arbitrary runtime caching.
 if(url.pathname.startsWith('/assets/')||SHELL.includes(url.pathname))event.respondWith((async()=>await matchStatic(request)||fetch(request))());
});
