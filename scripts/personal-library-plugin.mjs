// Personal build only. Copies the user's own PDFs from ./personal-library into the build and serves them in dev.
// The normal build never includes them: books are copyrighted and must not reach a public host.
import {copyFile,mkdir,readdir,stat} from 'node:fs/promises';import {createReadStream} from 'node:fs';import {resolve,join} from 'node:path';
const SAFE=/^[a-z0-9-]+\.pdf$/;
export function personalLibraryPlugin(){let root='',out='dist';const enabled=()=>process.env.NOTEBOOK_INCLUDE_BOOKS==='1';
 return {name:'personal-library',configResolved(c){root=c.root;out=resolve(c.root,c.build.outDir);},
  configureServer(server){if(!enabled())return;server.middlewares.use('/library',async(req,res,next)=>{const name=decodeURIComponent((req.url||'').split('?')[0].slice(1));if(!SAFE.test(name))return next();const file=join(root,'personal-library',name);try{const s=await stat(file);res.writeHead(200,{'Content-Type':'application/pdf','Content-Length':s.size});createReadStream(file).pipe(res);}catch{next();}});},
  async closeBundle(){if(!enabled())return;const src=join(root,'personal-library');let names=[];try{names=(await readdir(src)).filter(n=>SAFE.test(n));}catch{throw Error('NOTEBOOK_INCLUDE_BOOKS=1 but ./personal-library is missing');}
   await mkdir(join(out,'library'),{recursive:true});for(const n of names)await copyFile(join(src,n),join(out,'library',n));console.log(`Personal build: copied ${names.length} PDFs to ${join(out,'library')}. Do not publish this build.`);}};
}
