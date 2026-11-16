import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const bundle=await build({entryPoints:['src/components/LessonDiagram.jsx'],bundle:true,write:false,format:'esm',platform:'node',packages:'external',jsx:'automatic'});
// A temporary session-local module lets React resolve from the project installation.
import { writeFile, unlink } from 'node:fs/promises';
const path=new URL('../.diagram-test-module.mjs',import.meta.url);
await writeFile(path,bundle.outputFiles[0].text);
let Diagram;
try { Diagram=(await import(path.href)).default; } finally { await unlink(path); }
for(const [subjectId,topicId] of [['os','process-states'],['dbms','sql-joins'],['networks','tcp-connection'],['coa','memory-hierarchy']]) {
 test(`${subjectId} diagram renders with explanation`,()=>{
   const html=renderToStaticMarkup(createElement(Diagram,{subjectId,topicId}));
   assert.match(html,/<figure/); assert.match(html,/<figcaption/); assert.match(html,/aria-labelledby/);
   if(subjectId==='dbms') {assert.match(html,/NULL/); assert.equal((html.match(/<table/g)||[]).length,4);}
   else assert.match(html,/<svg/);
 });
}
test('unselected lessons do not acquire unrelated diagrams',()=>assert.equal(renderToStaticMarkup(createElement(Diagram,{subjectId:'java',topicId:'variables-and-types'})),''));
