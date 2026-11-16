import {operationsInput} from './structures.js';import {trace} from './trace.js';
export function bstSteps(input){
 const ops=operationsInput(input,['insert','search']);let root=null,nextId=0;const nodes=[];
 const {steps,snap}=trace(['for each insert/search value','  compare current.value with value','  smaller: follow left; larger: follow right','  insert at empty link (ignore duplicates)','  search ends at equal value or empty link','done']);
 const emit=(line,vars,narration)=>snap({view:'tree',nodes,edges:nodes.flatMap(n=>[n.left!==null?[n.id,n.left,'left']:null,n.right!==null?[n.id,n.right,'right']:null].filter(Boolean)),line,vars:{root:root?.id??'null',...vars},narration});
 emit(0,{},'Empty BST. Strict left < node < right; duplicate inserts are ignored.');
 ops.forEach((op,index)=>{
  let current=root,parent=null,side=null;
  while(current){emit(1,{operation:index,current:current.id,value:op.value},`Compare ${op.value} with node ${current.id} (${current.value}).`);if(current.value===op.value)break;parent=current;side=op.value<current.value?'left':'right';emit(2,{current:current.id,side},`Follow ${side}.`);current=current[side]===null?null:nodes[current[side]];}
  if(op.op==='insert'){
   if(current)emit(3,{operation:index,result:'duplicate ignored'},`${op.value} is already present.`);
   else{const n={id:nextId++,value:op.value,left:null,right:null};nodes.push(n);if(parent)parent[side]=n.id;else root=n;emit(3,{operation:index,inserted:n.id,value:op.value},`Insert node ${n.id} at ${parent?`${parent.id}.${side}`:'root'}.`);}
  }else emit(4,{operation:index,value:op.value,result:current?'found':'not found',node:current?.id??'null'},`Search ${op.value}: ${current?'found':'not found'}.`);
 });emit(5,{size:nodes.length},'BST trace complete. Operations take O(height): O(log n) when balanced, O(n) worst case; this tree is not self-balancing.');steps.at(-1).done=true;return steps;
}
