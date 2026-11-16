import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import { DSA_SHEETS } from '../src/content/dsa/sheets.js';
import {safeProblemURL} from '../src/lib/companyFullList.js';
const catalog=JSON.parse(readFileSync(new URL('./fixtures/sheet-destinations.json',import.meta.url)));
test('all sheet placements have explicit validated identity or a non-clickable unresolved status',()=>{
 let resolved=0,unresolved=0;
 for(const sheet of DSA_SHEETS) for(const q of sheet.questions) {
  if(q.linkStatus==='unresolved') {assert.equal(q.url,null);assert.equal(q.problemId,null);unresolved++;continue;}
  const record=catalog[q.title];assert.ok(record,q.title);assert.equal(q.problemId,record.id);assert.equal(q.url,`https://leetcode.com/problems/${record.slug}/`);assert.ok(safeProblemURL(q.url));resolved++;
 }
 assert.equal(resolved+unresolved,510);assert.ok(unresolved>0);
});
test('decorated and abbreviated labels keep canonical destinations',()=>{
 const all=DSA_SHEETS.flatMap(s=>s.questions), find=t=>all.find(q=>q.title===t).url;
 assert.match(find('Maximum Subarray (Kadane)'),/\/maximum-subarray\/$/);
 assert.match(find('Course Schedule (Topological Sort)'),/\/course-schedule\/$/);
 assert.match(find('Rotting Oranges (BFS)'),/\/rotting-oranges\/$/);
 assert.match(find('Lowest Common Ancestor of BST'),/\/lowest-common-ancestor-of-a-binary-search-tree\/$/);
});
