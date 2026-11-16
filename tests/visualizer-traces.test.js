import test from 'node:test';import assert from 'node:assert/strict';import {generators} from '../src/lib/visualizers.js';
const cases=[[],[1],[3,1,2],[2,2,1],[1,2,3],[3,2,1],[-3,0,2,-1]];
for(const id of ['selection-sort','insertion-sort'])test(`${id} snapshots sort without mutation and have valid active lines`,()=>{
 for(const input of cases){const original=[...input],steps=generators[id].gen(input);assert.deepEqual(input,original);assert.deepEqual(steps.at(-1).array,[...input].sort((a,b)=>a-b));assert.equal(steps.at(-1).done,true);for(const s of steps){assert.ok(s.line>=-1&&s.line<s.pseudo.length);assert.ok(s.narration);}}
 if(id==='selection-sort'){const steps=generators[id].gen([3,1,2]);assert.deepEqual(steps.filter(s=>s.line===4).map(s=>s.array),[[1,3,2],[1,2,3]]);}
});
for(const id of ['linear-search','binary-search'])test(`${id} handles empty, singleton, duplicates and absent targets`,()=>{
 for(const input of cases){const a=id==='binary-search'?[...input].sort((a,b)=>a-b):input;for(const target of [-99,1,2,99]){const steps=generators[id].gen(a,{target}),result=steps.at(-1).vars.result;assert.equal(steps.at(-1).done,true);if(!a.includes(target))assert.equal(result,-1);else{assert.equal(a[result],target);if(id==='linear-search')assert.equal(result,a.indexOf(target));}}}
 assert.throws(()=>generators[id].gen([1],{target:NaN}));
});
test('binary search rejects unsorted input rather than silently changing it',()=>assert.throws(()=>generators['binary-search'].gen([3,1,2]),/ascending/));
for(const id of ['merge-sort','quick-sort'])test(`${id} recursion sorts fixtures and snapshots remain independent`,()=>{
 for(const input of cases){const original=[...input],steps=generators[id].gen(input);assert.deepEqual(input,original);assert.deepEqual(steps.at(-1).array,[...input].sort((a,b)=>a-b));assert.equal(steps.at(-1).done,true);assert.ok(steps.some(s=>Number.isInteger(s.vars.depth)));assert.notEqual(steps[0].array,steps.at(-1).array);}
});
test('Quick Sort partition invariant and Merge Sort buffer size are traceable',()=>{
 const q=generators['quick-sort'].gen([3,1,4,1,5]);for(const s of q.filter(s=>s.line===5)){const {lo,hi,p,pivot}=s.vars;assert.equal(s.array[p],pivot);assert.ok(s.array.slice(lo,p).every(n=>n<pivot));assert.ok(s.array.slice(p+1,hi+1).every(n=>n>=pivot));}
 const m=generators['merge-sort'].gen([3,1,2]);assert.ok(m.some(s=>s.line===4&&s.vars.buffer==='1, 2, 3'));
});
test('stack and queue obey LIFO/FIFO, handle empty reads/removals and retain independent snapshots',()=>{
 const s=generators.stack.gen([{op:'pop'},{op:'push',value:1},{op:'push',value:2},{op:'peek'},{op:'pop'}]);assert.equal(s[1].vars.result,'empty');assert.equal(s.at(-2).vars.result,2);assert.deepEqual(s.at(-1).array,[1]);assert.deepEqual(s[2].array,[1]);
 const q=generators.queue.gen([{op:'dequeue'},{op:'enqueue',value:1},{op:'enqueue',value:2},{op:'peek'},{op:'dequeue'}]);assert.equal(q[1].vars.result,'empty');assert.equal(q.at(-2).vars.result,1);assert.deepEqual(q.at(-1).array,[2]);
 for(const id of ['stack','queue','linked-list']){assert.equal(generators[id].gen([]).at(-1).done,true);assert.throws(()=>generators[id].gen([{op:'execute'}]));}
});
test('linked list head/tail/next pointers handle duplicates, absent search and final deletion',()=>{
 const steps=generators['linked-list'].gen([{op:'removeHead'},{op:'append',value:2},{op:'prepend',value:2},{op:'search',value:99},{op:'removeHead'},{op:'removeHead'}]);assert.equal(steps.at(-1).nodes.length,0);assert.equal(steps.at(-1).vars.head,'null');assert.equal(steps.at(-1).vars.tail,'null');assert.ok(steps.some(s=>s.vars.result==='not found'));
 for(const s of steps){const nodes=s.nodes||[];nodes.forEach((n,i)=>assert.equal(n.next,nodes[i+1]?.id??null));}
});
test('BST insertion/search has strict ordering, explicit links and duplicate policy',()=>{
 const steps=generators.bst.gen([{op:'search',value:1},...[5,2,8,3,5].map(value=>({op:'insert',value})),{op:'search',value:3},{op:'search',value:99}]);const last=steps.at(-1);assert.equal(last.nodes.length,4);
 const visit=id=>id===null?[]:[...visit(last.nodes[id].left),last.nodes[id].value,...visit(last.nodes[id].right)];assert.deepEqual(visit(last.vars.root),[2,3,5,8]);assert.ok(steps.some(s=>s.vars.result==='found'));assert.ok(steps.some(s=>s.vars.result==='not found'));assert.ok(steps.some(s=>s.vars.result==='duplicate ignored'));assert.equal(generators.bst.gen([]).at(-1).nodes.length,0);
});
test('BFS/DFS follow explicit adjacency order, avoid cycles and leave disconnected vertices unseen',()=>{
 const input={adj:[[1,2],[0,3],[0,3],[1,2],[]],start:0};
 const bfs=generators.bfs.gen(input),dfs=generators.dfs.gen(input);assert.equal(bfs.at(-1).vars.order,'0, 1, 2, 3');assert.equal(dfs.at(-1).vars.order,'0, 1, 3, 2');assert.equal(bfs.at(-1).vars.distance,'0, 1, 1, 2, -1');assert.equal(dfs.at(-1).frontier.length,0);
 for(const id of ['bfs','dfs']){assert.equal(generators[id].gen({adj:[],start:0}).at(-1).done,true);assert.deepEqual(generators[id].gen({adj:[[0]],start:0}).at(-1).visited,[0]);assert.throws(()=>generators[id].gen({adj:[[2]],start:0}));}
});
test('Dijkstra distances are exact for non-negative directed graphs, zero/parallel edges and large weights',()=>{
 const s=generators.dijkstra.gen({nodes:5,edges:[[0,1,4],[0,2,1],[2,1,2],[1,3,5]],start:0});assert.deepEqual(s.at(-1).nodes.map(n=>n.distance),[0,3,1,8,Infinity]);
 const big=generators.dijkstra.gen({nodes:3,edges:[[0,1,2000000000],[1,2,2000000000]],start:0});assert.equal(big.at(-1).nodes[2].distance,4000000000);
 const zero=generators.dijkstra.gen({nodes:2,edges:[[0,1,4],[0,1,0],[1,0,0]],start:0});assert.equal(zero.at(-1).nodes[1].distance,0);
 assert.equal(generators.dijkstra.gen({nodes:0,edges:[],start:0}).at(-1).done,true);
 assert.throws(()=>generators.dijkstra.gen({nodes:2,edges:[[1,0,-1]],start:0}),/non-negative/);
 assert.throws(()=>generators.dijkstra.gen({nodes:3,edges:[[0,1,Number.MAX_SAFE_INTEGER],[1,2,1]],start:0}),/safe-integer range/);
});
test('Fibonacci results, call tree and active stack match recurrence including base cases',()=>{
 const expected=[0,1,1,2,3,5,8,13,21];expected.forEach((value,n)=>{const steps=generators['recursion-fib'].gen(n),last=steps.at(-1);assert.equal(last.vars.result,value);assert.equal(last.frontier.length,0);assert.equal(last.edges.length,last.nodes.length-1);assert.ok(last.nodes.every(n=>n.status==='returned'));});assert.throws(()=>generators['recursion-fib'].gen(9));
});
test('hash collisions use separate chains and normalized modulo for negative values',()=>{
 const last=generators.hashing.gen({values:[-1,3,3,4],buckets:4}).at(-1);assert.deepEqual(last.buckets,[ [4],[],[],[-1,3,3] ]);assert.throws(()=>generators.hashing.gen({values:[1],buckets:0}));
});
test('sliding window sums match brute force including negative values, ties and no window',()=>{
 for(const values of cases)for(let k=1;k<=Math.max(1,values.length);k++){const last=generators['sliding-window'].gen({values,k}).at(-1);const expected=values.length?Math.max(...values.slice(0,values.length-k+1).map((_,i)=>values.slice(i,i+k).reduce((a,b)=>a+b,0))):'no window';assert.equal(last.vars.result,expected);}
 assert.throws(()=>generators['sliding-window'].gen({values:[1],k:2}));
});
test('two pointers finds only valid distinct-index pairs, rejects unsorted input and reports absent pairs',()=>{
 for(const input of cases){const a=[...input].sort((a,b)=>a-b);for(const target of [-4,2,5,99]){const s=generators['two-pointers'].gen(a,{target}).at(-1);const exists=a.some((x,i)=>a.some((y,j)=>i!==j&&x+y===target));if(exists){const [i,j]=s.vars.result.split(',').map(Number);assert.ok(i<j);assert.equal(a[i]+a[j],target);}else assert.equal(s.vars.result,'no pair');}}
 assert.throws(()=>generators['two-pointers'].gen([2,1]));
});
test('every registry generator produces independent bounded snapshots with valid line references',()=>{
 for(const [id,c] of Object.entries(generators)){const before=structuredClone(c.defaultInput),steps=c.gen(c.defaultInput,{target:c.defaultTarget??5});assert.deepEqual(c.defaultInput,before,id);assert.ok(steps.length>1&&steps.length<1000,id);assert.equal(steps.at(-1).done,true,id);for(const s of steps){assert.ok(Array.isArray(s.array),id);assert.ok(s.line>=-1&&s.line<s.pseudo.length,id);assert.ok(s.vars&&s.highlights,id);}if(steps.length>1)assert.notEqual(steps[0].array,steps[1].array,id);}
});
test('all five sorts match a reference over deterministic duplicate/negative fixtures',()=>{
 let seed=17;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed;};
 for(let trial=0;trial<50;trial++){const a=Array.from({length:rand()%13},()=>rand()%15-7),expected=[...a].sort((a,b)=>a-b);for(const id of ['bubble-sort','selection-sort','insertion-sort','merge-sort','quick-sort'])assert.deepEqual(generators[id].gen(a).at(-1).array,expected,id);}
});
test('Dijkstra scan distances match independent all-pairs relaxation fixtures',()=>{
 for(let trial=0;trial<12;trial++){const n=4,edges=[];for(let u=0;u<n;u++)for(let v=0;v<n;v++)if(u!==v&&(u*7+v+trial)%3)edges.push([u,v,(u+v+trial)%7]);const d=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:Infinity));for(const [u,v,w] of edges)d[u][v]=Math.min(d[u][v],w);for(let k=0;k<n;k++)for(let i=0;i<n;i++)for(let j=0;j<n;j++)d[i][j]=Math.min(d[i][j],d[i][k]+d[k][j]);assert.deepEqual(generators.dijkstra.gen({nodes:n,edges,start:0}).at(-1).nodes.map(n=>n.distance),d[0]);}
});
test('all numeric arrays reject oversized, fractional and non-numeric inputs',()=>{
 for(const id of ['bubble-sort','selection-sort','insertion-sort','merge-sort','quick-sort','linear-search','binary-search','two-pointers'])for(const a of [Array(13).fill(1),[1.5],['1'],[Infinity],[100]])assert.throws(()=>generators[id].gen(a),id);
});
