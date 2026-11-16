import {trace} from './trace.js';
export function adjacencyInput(input){
 if(!input||!Array.isArray(input.adj)||input.adj.length>10)throw Error('Use {"adj":[[neighbor,...],...],"start":0}, at most 10 vertices.');
 const adj=input.adj.map(row=>{if(!Array.isArray(row)||row.length>10||!row.every(v=>Number.isInteger(v)&&v>=0&&v<input.adj.length))throw Error('Every adjacency entry must name an existing vertex.');return [...row];});
 const start=input.start??0;if(!Number.isInteger(start)||start<0||(adj.length?start>=adj.length:start!==0))throw Error('Invalid start vertex.');return {adj,start};
}
function graphState(adj,seen,frontier,current){return {view:'graph',nodes:adj.map((_,id)=>({id,value:id,status:current===id?'current':frontier.includes(id)?'frontier':seen.has(id)?'visited':'unseen'})),edges:adj.flatMap((row,u)=>row.map(v=>[u,v])),visited:[...seen],frontier};}
export function bfsSteps(input){
 const {adj,start}=adjacencyInput(input),seen=new Set(),queue=[],order=[],distance=adj.map(()=>-1);
 const {steps,snap}=trace(['mark start seen; enqueue start','while queue not empty','  u = dequeue; visit u','  for v in adjacency[u] order','    if unseen: mark v; distance[v]=distance[u]+1; enqueue v','done']);
 const emit=(line,current,narration)=>snap({...graphState(adj,seen,queue,current),line,vars:{current:current??'none',order:order.join(', '),distance:distance.join(', ')},narration});
 if(adj.length){seen.add(start);queue.push(start);distance[start]=0;}emit(0,null,'Directed adjacency is used exactly as entered. BFS visits only the reachable component; -1 distance means unreachable.');
 while(queue.length){const u=queue.shift();order.push(u);emit(2,u,`Dequeue and visit ${u}.`);for(const v of adj[u]){emit(3,u,`Inspect edge ${u} → ${v}.`);if(!seen.has(v)){seen.add(v);distance[v]=distance[u]+1;queue.push(v);emit(4,u,`Discover ${v}, distance ${distance[v]}; enqueue once.`);}}}
 emit(5,null,'Reachable traversal complete. BFS O(V+E) time, O(V) state; display snapshots excluded.');steps.at(-1).done=true;return steps;
}
export function dfsSteps(input){
 const {adj,start}=adjacencyInput(input),seen=new Set(),stack=[],order=[];
 const {steps,snap}=trace(['dfs(u): mark seen; visit u; push call','for v in adjacency[u] order','  if unseen: dfs(v)','pop call; return','done']);
 const emit=(line,current,narration)=>snap({...graphState(adj,seen,stack,current),line,vars:{current:current??'none',order:order.join(', '),depth:stack.length},narration});
 emit(-1,null,'Directed adjacency order is explicit. Frontier shows the recursion stack, not a BFS queue.');
 function dfs(u){seen.add(u);stack.push(u);order.push(u);emit(0,u,`Enter ${u} at depth ${stack.length}.`);for(const v of adj[u]){emit(1,u,`Inspect ${u} → ${v}.`);if(!seen.has(v)){emit(2,u,`Recurse to unseen ${v}.`);dfs(v);}}stack.pop();emit(3,stack.at(-1),`Return from ${u}.`);}
 if(adj.length)dfs(start);emit(4,null,'Reachable DFS complete. O(V+E) time, O(V) visited/stack state.');steps.at(-1).done=true;return steps;
}
export function weightedInput(input){
 if(!input||!Number.isInteger(input.nodes)||input.nodes<0||input.nodes>10||!Array.isArray(input.edges)||input.edges.length>30)throw Error('Use {"nodes":n,"edges":[[u,v,weight],...],"start":0}; n ≤ 10, edges ≤ 30.');
 const n=input.nodes,start=input.start??0;if(!Number.isInteger(start)||start<0||(n?start>=n:start!==0))throw Error('Invalid start vertex.');
 const edges=input.edges.map(e=>{if(!Array.isArray(e)||e.length!==3||!e.slice(0,2).every(v=>Number.isInteger(v)&&v>=0&&v<n)||!Number.isSafeInteger(e[2])||e[2]<0)throw Error('Edges need existing vertices and non-negative safe-integer weights.');return [...e];});return {n,start,edges};
}
export function dijkstraSteps(input){
 const {n,start,edges}=weightedInput(input),distance=Array(n).fill(Infinity),settled=new Set(),order=[];
 const {steps,snap}=trace(['distance[start] = 0; others = infinity','choose unsettled u with smallest finite distance','if none: stop (remaining vertices unreachable)','settle u','for outgoing edge (u,v,w)','  candidate = distance[u]+w (safe integers only)','  if candidate < distance[v]: update distance[v]','done']);
 const emit=(line,current,narration)=>snap({view:'graph',nodes:distance.map((d,id)=>({id,value:id,status:current===id?'current':settled.has(id)?'settled':'unsettled',distance:d})),edges,visited:[...settled],frontier:distance.map((d,id)=>!settled.has(id)&&Number.isFinite(d)?id:null).filter(v=>v!==null),line,vars:{current:current??'none',distance:distance.map(d=>Number.isFinite(d)?d:'∞').join(', '),order:order.join(', ')},narration});
 if(n)distance[start]=0;emit(0,null,'Directed weighted graph. This teaching model selects the minimum by scanning vertices: O(V²+E) time, not a heap implementation.');
 while(settled.size<n){let u=-1;for(let v=0;v<n;v++)if(!settled.has(v)&&Number.isFinite(distance[v])&&(u===-1||distance[v]<distance[u]))u=v;
  if(u<0){emit(2,null,'No finite unsettled vertex; remaining distances stay infinite.');break;}
  emit(1,u,`Choose vertex ${u} at distance ${distance[u]}.`);settled.add(u);order.push(u);emit(3,u,`Settle ${u}; its distance is final for non-negative weights.`);
  for(const [from,v,w] of edges){if(from!==u)continue;emit(4,u,`Inspect ${u} → ${v}, weight ${w}.`);const candidate=distance[u]+w;if(!Number.isSafeInteger(candidate))throw Error('A path sum exceeds JavaScript safe-integer range; use smaller weights.');if(candidate<distance[v]){distance[v]=candidate;emit(6,u,`Improve distance[${v}] to ${candidate}.`);}}
 }
 emit(7,null,'Dijkstra complete. Infinite distances mean unreachable. Scan-based O(V²+E) time and O(V+E) stored graph/state.');steps.at(-1).done=true;return steps;
}
