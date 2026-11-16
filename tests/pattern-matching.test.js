import test from 'node:test';
import assert from 'node:assert/strict';
import {rankPatterns} from '../src/lib/patternMatching.js';
test('sorted-only ranking puts confirmed Binary Search before unconfirmed pair search',()=>{
 const r=rankPatterns(['sorted']);assert.equal(r[0].name,'Binary Search');assert.deepEqual(r[0].missing,[]);assert.ok(r[1].missing.includes('find-pair'));
});
test('sorted plus pair goal gives Two Pointers, not Binary Search',()=>assert.deepEqual(rankPatterns(['sorted','find-pair']).map(p=>p.name),['Two Pointers']));
test('shortest paths require weight constraints before a confirmed recommendation',()=>{
 const r=rankPatterns(['graph','shortest-path']);assert.equal(r.length,3);assert.ok(r.every(p=>p.missing.length===1));
 assert.equal(rankPatterns(['graph','shortest-path','unweighted'])[0].name,'BFS');
 assert.equal(rankPatterns(['graph','shortest-path','nonnegative'])[0].name,'Dijkstra');
 assert.equal(rankPatterns(['graph','shortest-path','negative'])[0].name,'Bellman-Ford');
 assert.deepEqual(rankPatterns(['graph','shortest-path','unweighted','negative']),[]);
});
test('ranking is deterministic and DP explicitly needs both properties',()=>{
 const a=rankPatterns(['optimal-substructure']);assert.deepEqual(a[0].missing,['overlapping']);
 assert.deepEqual(rankPatterns(['sorted']),rankPatterns(new Set(['sorted'])));
 assert.deepEqual(rankPatterns([]),[]);
});
