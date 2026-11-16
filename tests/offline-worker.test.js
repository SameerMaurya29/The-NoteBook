import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../src/offline/worker-template.js',import.meta.url),'utf8');
const origin='https://notebook.test',status='/__notebook_offline_status__';
const shell=['/index.html','/offline.html','/assets/shell.js'];
const subjects={java:['/assets/java.js','/assets/topic.js'],python:['/assets/python.js','/assets/topic.js']};
function harness(){
 const stores=new Map(),listeners={},calls=[];let putFailure=null;let fetcher=async()=>new Response('asset',{headers:{'content-type':'text/javascript'}}),uuid=0,skips=0,claims=0;
 const key=x=>new URL(typeof x==='string'?x:x.url,origin).href;
 const caches={async keys(){return [...stores.keys()];},async delete(n){return stores.delete(n);},async open(n){if(!stores.has(n))stores.set(n,new Map());const store=stores.get(n);return {async match(x){return store.get(key(x))?.clone();},async put(x,r){if(putFailure?.(n,key(x)))throw Error('QuotaExceededError');store.set(key(x),r.clone());},async keys(){return [...store.keys()].map(url=>({url}));}};}};
 const self={location:{origin},clients:{async claim(){claims++;}},async skipWaiting(){skips++;},addEventListener(type,fn){listeners[type]=fn;}};
 vm.runInNewContext(`const BUILD='new',SHELL=${JSON.stringify(shell)},SUBJECTS=${JSON.stringify(subjects)};\n${source}`,{self,caches,fetch:async(...args)=>{calls.push(args);return fetcher(...args);},URL,Response,AbortController,setTimeout,clearTimeout,crypto:{randomUUID:()=>String(++uuid)}});
 async function event(type,extra={}){let pending,response,reply;listeners[type]({...extra,waitUntil(p){pending=p;},respondWith(p){response=p;},ports:[{postMessage(x){reply=x;}}]});await pending;return response?await response:reply;}
 return {stores,caches,calls,event,setPutFailure(fn){putFailure=fn;},setFetch(fn){fetcher=fn;},get skips(){return skips;},get claims(){return claims;},async message(type,extra={}){return event('message',{data:{type,...extra}});},async seed(name,paths,metadata){const cache=await caches.open(name);for(const path of paths)await cache.put(path,new Response(name));if(metadata)await cache.put(status,new Response(JSON.stringify(metadata)));},fetch(path,extra={}){return event('fetch',{request:{url:new URL(path,origin).href,method:'GET',mode:'cors',...extra}});}};
}
test('install failure rolls back only new shell; previous and unrelated caches survive',async()=>{
 const h=harness();await h.seed('notebook-static:old:core',['/index.html'],{build:'old',kind:'shell'});await h.seed('company-cache',[],null);
 h.setFetch(async path=>{if(path==='/offline.html')throw Error('offline');return new Response('ok');});
 await assert.rejects(h.event('install'),/offline/);assert.equal(h.stores.has('notebook-static:new:core'),false);assert.equal(h.stores.has('notebook-static:old:core'),true);assert.equal(h.stores.has('company-cache'),true);assert.equal(h.skips,0);
});
test('successful install caches shell, does not force updates and activation claims clients',async()=>{
 const h=harness();await h.event('install');assert.equal(h.skips,0);assert.equal((await h.message('STATUS')).saved.length,1);await h.event('activate');assert.equal(h.claims,1);await h.message('ACTIVATE_UPDATE');assert.equal(h.skips,1);
});
test('subject network failures roll back and keep saved subjects',async()=>{
 const h=harness();await h.message('SAVE_SUBJECT',{id:'python'});h.setFetch(async path=>{if(path.includes('topic'))throw Error('quota or network');return new Response('ok');});
 const result=await h.message('SAVE_SUBJECT',{id:'java'});assert.equal(result.ok,false);assert.match(result.error,/quota or network/);const saved=(await h.message('STATUS')).saved;assert.equal(saved.length,1);assert.equal(saved[0].id,'python');assert.equal((await h.message('SAVE_SUBJECT',{id:'__proto__'})).ok,false);
});
test('HTML disguised as JS is rejected without a saved status',async()=>{
 const h=harness();h.setFetch(async()=>new Response('<html>',{headers:{'content-type':'text/html'}}));assert.equal((await h.message('SAVE_SUBJECT',{id:'java'})).ok,false);assert.equal((await h.message('STATUS')).saved.length,0);
});
test('subject save is deduplicated and retry does not redownload complete copies',async()=>{
 const h=harness();await Promise.all([h.message('SAVE_SUBJECT',{id:'java'}),h.message('SAVE_SUBJECT',{id:'java'})]);assert.equal(h.calls.length,2);await h.message('SAVE_SUBJECT',{id:'java'});assert.equal(h.calls.length,2);
});
test('status does not claim an evicted asset is still saved; saving repairs it',async()=>{
 const h=harness();await h.message('SAVE_SUBJECT',{id:'java'});const name=[...h.stores.keys()][0];h.stores.get(name).delete(origin+'/assets/java.js');assert.equal((await h.message('STATUS')).saved.length,0);await h.message('SAVE_SUBJECT',{id:'java'});assert.equal((await h.message('STATUS')).saved.length,1);
});
test('remove subject waits for an in-flight save so it cannot reappear',async()=>{
 const h=harness();let release;const gate=new Promise(resolve=>{release=resolve;});h.setFetch(async()=>{await gate;return new Response('ok');});const save=h.message('SAVE_SUBJECT',{id:'java'});const remove=h.message('REMOVE_SUBJECT',{id:'java'});release();await Promise.all([save,remove]);assert.equal((await h.message('STATUS')).saved.length,0);
});
test('deletion stays within notebook static namespace and chosen subject',async()=>{
 const h=harness();await h.event('install');await h.message('SAVE_SUBJECT',{id:'java'});await h.message('SAVE_SUBJECT',{id:'python'});await h.seed('notebook-static:old:subject:java:1',[],{build:'old',kind:'subject',id:'java'});await h.seed('company-cache',[],{kind:'subject',id:'java'});
 await h.message('REMOVE_SUBJECT',{id:'java'});assert.equal((await h.message('STATUS')).saved.some(s=>s.id==='java'),false);assert.equal(h.stores.has('company-cache'),true);await h.seed('notebook-static:old:core',[],{build:'old',kind:'shell'});await h.message('REMOVE_OLD');assert.equal(h.stores.has('notebook-static:old:core'),false);assert.equal(h.stores.has('notebook-static:new:core'),true);assert.equal((await h.message('STATUS')).saved.some(s=>s.id==='python'),true);
});
test('fetch uses network navigation then current shell fallback, never old HTML',async()=>{
 const h=harness();await h.seed('notebook-static:old:core',['/index.html'],{build:'old',kind:'shell'});h.setFetch(async()=>{throw Error('offline');});assert.equal((await h.fetch('/lesson',{mode:'navigate'})).status,503);await h.event('install').catch(()=>{});await h.seed('notebook-static:new:core',['/index.html'],{build:'new',kind:'shell'});assert.equal(await(await h.fetch('/lesson',{mode:'navigate'})).text(),'notebook-static:new:core');h.setFetch(async()=>new Response('online'));assert.equal(await(await h.fetch('/lesson',{mode:'navigate'})).text(),'online');
});
test('fetch serves complete static caches and old hashed assets, never incomplete saves',async()=>{
 const h=harness();await h.seed('notebook-static:old:core',['/assets/old.js','/offline.html'],{build:'old',kind:'shell'});await h.seed('notebook-static:new:subject:pending',['/assets/pending.js']);h.setFetch(async()=>new Response('network'));assert.equal(await(await h.fetch('/assets/old.js')).text(),'notebook-static:old:core');assert.equal(await(await h.fetch('/assets/pending.js')).text(),'network');assert.equal(await(await h.fetch('/offline.html')).text(),'network');
});
test('fetch prefers current over retained old entries for identical asset paths',async()=>{
 const h=harness();await h.seed('notebook-static:old:core',['/assets/shared.js'],{build:'old',kind:'shell'});await h.seed('notebook-static:new:core',['/assets/shared.js'],{build:'new',kind:'shell'});assert.equal(await(await h.fetch('/assets/shared.js')).text(),'notebook-static:new:core');
});
test('fetch does not intercept external, company/API, test fixtures or writes',async()=>{
 const h=harness();for(const [path,extra] of [['https://github.com/data.csv',{}],['/api/auth',{}],['/tests/fixture.js',{}],['/assets/a.js',{method:'POST'}],['/sw.js',{}]])assert.equal(await h.fetch(path,extra),undefined);assert.equal(h.calls.length,0);
});

test('quota failure during subject asset or final metadata write rolls back the entire new cache',async()=>{
 for(const failedPath of ['/assets/topic.js',status]){
  const h=harness();await h.message('SAVE_SUBJECT',{id:'python'});h.setPutFailure((name,url)=>name.includes(':subject:java:')&&url===origin+failedPath);
  const result=await h.message('SAVE_SUBJECT',{id:'java'});assert.equal(result.ok,false);assert.match(result.error,/QuotaExceededError/);assert.equal([...h.stores.keys()].some(name=>name.includes(':subject:java:')),false);assert.equal((await h.message('STATUS')).saved[0].id,'python');
 }
});
test('shell metadata quota failure rejects install and removes the incomplete shell',async()=>{
 const h=harness();h.setPutFailure((name,url)=>url===origin+status);await assert.rejects(h.event('install'),/QuotaExceededError/);assert.equal(h.stores.size,0);
});
test('status ignores malformed metadata and remove deletes an incomplete chosen copy',async()=>{
 const h=harness();await h.message('SAVE_SUBJECT',{id:'java'});const name=[...h.stores.keys()][0];h.stores.get(name).delete(origin+'/assets/java.js');await h.seed('notebook-static:old:broken',[],null);await(await h.caches.open('notebook-static:old:broken')).put(status,new Response('{broken'));assert.equal((await h.message('STATUS')).saved.length,0);await h.message('REMOVE_SUBJECT',{id:'java'});assert.equal(h.stores.has(name),false);
});

test('offline plugin respects configured root and emits transitive static dependencies with a content-versioned worker',async()=>{
 const {mkdtemp,mkdir,writeFile,rm}=await import('node:fs/promises');const {join}=await import('node:path');const {tmpdir}=await import('node:os');const {offlinePlugin}=await import('../scripts/offline-plugin.mjs');
 const root=await mkdtemp(join(tmpdir(),'notebook-offline-'));
 try{
  const out=join(root,'build');const manifest={};const entries=['index.html','src/pages/Home.jsx','src/pages/Auth.jsx','src/pages/ProgressData.jsx','src/pages/Subject.jsx','src/pages/OfflineLibrary.jsx','src/pages/Resources.jsx','src/pages/BehavioralStudio.jsx','src/pages/Topic.jsx','src/pages/BuildPaths.jsx','src/components/OSLabBench.jsx','src/components/MoreMenu.jsx','src/pages/SystemDesignSyllabus.jsx','src/pages/CurriculumPrint.jsx',...Object.keys(subjects).concat(['c','dsa','os','dbms','networks','coa','html','css','js','aptitude','systemdesign']).map(id=>`src/content/${id}/index.js`)];
  for(const [i,entry] of entries.entries())manifest[entry]={file:`assets/entry-${i}.js`,imports:['shared']};manifest.shared={file:'assets/shared.js',css:['assets/shared.css'],assets:['assets/image.svg']};
  const put=async(path,text='fixture')=>{await mkdir(join(out,path,'..'),{recursive:true});await writeFile(join(out,path),text);};
  for(const path of ['index.html','offline.html','manifest.webmanifest','Icon.png','icons/inklet-192.png','icons/inklet-512.png','icons/inklet-maskable.png','fonts/fonts.css','fonts/fixture.woff2',...Object.values(manifest).flatMap(m=>[m.file,...(m.css||[]),...(m.assets||[])])])await put(path);
  await put('.vite/manifest.json',JSON.stringify(manifest));await mkdir(join(root,'src/offline'),{recursive:true});await writeFile(join(root,'src/offline/worker-template.js'),source+'\n// root fixture');
  const plugin=offlinePlugin();plugin.configResolved({root,build:{outDir:'build'}});await plugin.closeBundle();const first=JSON.parse(await readFile(join(out,'offline-assets.json'),'utf8'));const worker=await readFile(join(out,'sw.js'),'utf8');assert.ok(worker.endsWith('// root fixture'));assert.ok(first.shell.includes('/fonts/fixture.woff2'));assert.ok(first.subjects.java.includes('/assets/shared.css'));assert.ok(first.subjects.java.includes('/assets/image.svg'));assert.equal(new Set(first.shell).size,first.shell.length);assert.ok(first.shell.includes(`/assets/entry-${entries.indexOf('src/components/MoreMenu.jsx')}.js`),'lazy More menu chunk must be in the offline shell');
  await put('index.html','changed shell');await plugin.closeBundle();const second=JSON.parse(await readFile(join(out,'offline-assets.json'),'utf8'));assert.notEqual(first.build,second.build);
 }finally{await rm(root,{recursive:true,force:true});}
});
