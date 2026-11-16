// Local verification only. Usage: node scripts/serve-production.mjs <build-dir> <port>
import http from 'node:http';import {readFile,stat} from 'node:fs/promises';import {resolve,extname} from 'node:path';
const root=resolve(process.argv[2]),port=Number(process.argv[3]||5174);
const mime={'.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.html':'text/html','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain','.pdf':'application/pdf'};
const server=http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://localhost');let file=resolve(root,'.'+decodeURIComponent(url.pathname));if(file!==root&&!file.startsWith(root+'/'))throw Error('path');
 try{if((await stat(file)).isDirectory())file=resolve(file,'index.html');await stat(file);}catch{if(req.headers.accept?.includes('text/html'))file=resolve(root,'index.html');else{res.writeHead(404);res.end('Not found');return;}}
 const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store','Service-Worker-Allowed':'/'});res.end(data);
}catch{res.writeHead(500);res.end('Local test server error');}});server.listen(port,'127.0.0.1',()=>console.log(`Local build: http://127.0.0.1:${port}`));
