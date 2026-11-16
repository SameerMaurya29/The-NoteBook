import { build } from 'esbuild';
import { mkdtemp, writeFile, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const bundle = await build({entryPoints:['src/content/java/index.js'],bundle:true,write:false,format:'esm',platform:'node'});
const {default:subject} = await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const root=await mkdtemp(join(process.env.SESSION_DIR || tmpdir(),'notebook-java-'));
const selected=['variables-and-types','control-flow','oop-classes-objects','operators-and-expressions','comparable-comparator'];
const results=[];
try {
 for (const id of selected) {
  const topic=subject.topics.find(t=>t.id===id); const example=topic.codeExamples[0];
  const dir=join(root,id); await mkdir(dir);
  const publicClass=example.code.match(/public class (\w+)/)?.[1];
  const className=publicClass || 'Demo';
  const context=publicClass ? 'complete program, matching filename' : 'method-body snippet wrapped in Demo.main for execution';
  const source=publicClass ? example.code : `public class Demo { public static void main(String[] args) {\n${example.code}\n} }`;
  await writeFile(join(dir,`${className}.java`),source);
  const compile=spawnSync('javac',['-encoding','UTF-8',join(dir,`${className}.java`)],{encoding:'utf8',timeout:15000});
  if(compile.status!==0) {results.push({id,status:'compile failed',error:compile.stderr || compile.error?.message});continue;}
  const run=spawnSync('java',['-cp',dir,className],{encoding:'utf8',timeout:10000});
  const normalize=s=>s.replace(/\r\n/g,'\n').trimEnd();
  const match=run.status===0 && normalize(run.stdout)===normalize(example.output);
  results.push({id,context,status:match?'PASS':'output mismatch',actual:run.stdout.trimEnd(),expected:example.output,error:run.stderr || run.error?.message});
 }
 console.log(JSON.stringify(results,null,2));
 if(results.some(r=>r.status!=='PASS')) process.exitCode=1;
} finally {await rm(root,{recursive:true,force:true});}
