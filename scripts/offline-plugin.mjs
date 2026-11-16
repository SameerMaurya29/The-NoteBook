import {readFile,writeFile,readdir} from 'node:fs/promises';import {resolve} from 'node:path';import {createHash} from 'node:crypto';
export function offlinePlugin(){let out,root,base='/';return {name:'notebook-offline-assets',apply:'build',configResolved(c){root=c.root;out=resolve(root,c.build.outDir);base=c.base||'/';},async closeBundle(){
 const manifest=JSON.parse(await readFile(resolve(out,'.vite/manifest.json'),'utf8'));
 const collect=key=>{const seen=new Set(),files=new Set();function visit(k){if(seen.has(k))return;seen.add(k);const m=manifest[k];if(!m)throw Error('Offline manifest entry missing: '+k);files.add(base+m.file);for(const f of [...(m.css||[]),...(m.assets||[])])files.add(base+f);for(const dep of m.imports||[])visit(dep);}visit(key);return [...files];};
 const fonts=(await readdir(resolve(out,'fonts'))).filter(f=>f.endsWith('.woff2')).map(f=>base+'fonts/'+f);
 const shell=[...new Set([base,...['index.html','offline.html','manifest.webmanifest','icons/inklet-192.png','icons/inklet-512.png','icons/inklet-maskable.png','fonts/fonts.css'].map(f=>base+f),...fonts,...['index.html','src/pages/Home.jsx','src/pages/Auth.jsx','src/pages/ProgressData.jsx','src/pages/Subject.jsx','src/pages/OfflineLibrary.jsx','src/pages/Resources.jsx','src/pages/BehavioralStudio.jsx','src/pages/BuildPaths.jsx','src/components/OSLabBench.jsx','src/components/MoreMenu.jsx','src/pages/SystemDesignSyllabus.jsx'].flatMap(collect)])];
 const subjects=Object.fromEntries(['java','python','c','dsa','os','dbms','networks','coa','html','css','js','aptitude','systemdesign'].map(id=>[id,[...new Set([...collect(`src/content/${id}/index.js`),...collect('src/pages/Topic.jsx'),...collect('src/pages/CurriculumPrint.jsx')])]]));
 const template=await readFile(resolve(root,'src/offline/worker-template.js'),'utf8');const hash=createHash('sha256').update(JSON.stringify(manifest)+template+(process.env.NOTEBOOK_BUILD_TAG||''));
 for(const path of shell.filter(p=>p!==base))hash.update(await readFile(resolve(out,'./'+path.slice(base.length))));
 const build=hash.digest('hex').slice(0,16);
 await writeFile(resolve(out,'offline-assets.json'),JSON.stringify({build,shell,subjects},null,2));
 await writeFile(resolve(out,'sw.js'),`const SITE_BASE=${JSON.stringify(base)},BUILD=${JSON.stringify(build)},SHELL=${JSON.stringify(shell)},SUBJECTS=${JSON.stringify(subjects)};\n`+template);
 }};}
