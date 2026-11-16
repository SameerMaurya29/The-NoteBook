// Deterministic payload accounting, not a low-end-device CPU benchmark.
import {readFile,stat,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {gzipSync} from 'node:zlib';
const root=resolve(process.argv[2]);
const manifest=JSON.parse(await readFile(resolve(root,'.vite/manifest.json'),'utf8'));
function closure(key,seen=new Set()){
 if(seen.has(key))return seen;seen.add(key);
 if(!manifest[key])throw Error('Unknown manifest key '+key);
 for(const child of manifest[key].imports||[])closure(child,seen);
 return seen;
}
async function payload(keys){
 const files=[...new Set([...keys].map(k=>manifest[k].file).filter(f=>f.endsWith('.js')))];
 let bytes=0,gzipBytes=0;for(const file of files){const data=await readFile(resolve(root,file));bytes+=data.length;gzipBytes+=gzipSync(data).length;}
 return {files,bytes,gzipBytes};
}
const entry=closure('index.html');
const home=new Set([...entry,...closure('src/pages/Home.jsx')]);
const initial=await payload(home);
const forbidden=['src/content/generated/search.js','src/pages/QuizRunner.jsx',...Object.keys(manifest).filter(k=>/^src\/content\/[^/]+\/index.js$/.test(k))];
for(const key of forbidden)if(home.has(key))throw Error('Eager heavy payload: '+key);
const report={initialHome:initial,entry:await payload(entry),total:await payload(Object.keys(manifest)),auditBaseline:{bytes:3933480,gzipBytes:1117110},note:'Home includes initial entry + Home route static dependencies. Excludes CSS/fonts, service-worker precaching and deferred pages. No CPU/network throttling claim.'};
report.initialJsReductionPercent=Number((100*(1-initial.bytes/report.auditBaseline.bytes)).toFixed(2));
console.log(JSON.stringify(report,null,2));
if(process.argv[3])await writeFile(process.argv[3],JSON.stringify(report,null,2));
