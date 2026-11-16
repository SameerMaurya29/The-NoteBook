import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ALGORITHMS} from '../src/content/dsa/algorithms.js';
test('Quick Sort stack bound and DFS dry run match the given undirected adjacency',()=>{
 assert.match(ALGORITHMS.find(a=>a.id==='quick-sort').space,/O\(n\) worst/);
 const graph=[[1,2],[0,3],[0,3],[1,2]],seen=new Set(),order=[];
 const dfs=u=>{seen.add(u);order.push(u);for(const v of graph[u])if(!seen.has(v))dfs(v);};dfs(0);
 const trace=ALGORITHMS.find(a=>a.id==='dfs').dryRun.join('\n');assert.ok(trace.includes(order.join(',')));assert.match(trace,/go to unvisited neighbor 2/);
});
test('subset/permutation output costs and Fenwick range sums are distinguished',()=>{
 const guide=readFileSync('src/components/ComplexityGuide.jsx','utf8');assert.match(guide,/O\(n · n!\)/);assert.match(guide,/O\(n · 2ⁿ\)/);
 const lookup=readFileSync('src/components/PatternLookup.jsx','utf8');assert.match(lookup,/prefix\(r\) - prefix\(l-1\)/);assert.doesNotMatch(lookup,/not arbitrary range queries/);
});
