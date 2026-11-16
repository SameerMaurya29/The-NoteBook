import {trace} from './trace.js';
export function operationsInput(input,allowed){
 if(!Array.isArray(input)||input.length>24)throw Error('Use a JSON array of at most 24 operations.');
 for(const op of input){if(!op||typeof op!=='object'||!allowed.includes(op.op)||Object.keys(op).some(k=>!['op','value'].includes(k)))throw Error(`Allowed operations: ${allowed.join(', ')}.`);
 if(['push','enqueue','prepend','append','insert','search'].includes(op.op)&&(!Number.isSafeInteger(op.value)||Math.abs(op.value)>99))throw Error('Operation values must be integers from -99 to 99.');}
 return input;
}
export function stackSteps(input){
 const ops=operationsInput(input,['push','pop','peek']),a=[],{steps,snap}=trace(['for each operation','  push: append value at top','  pop: remove top unless empty','  peek: read top unless empty','done']);
 snap({array:a,line:0,narration:'Empty stack. Top is the rightmost element.'});
 ops.forEach((op,index)=>{let result='';if(op.op==='push'){a.push(op.value);result=op.value;}else if(op.op==='pop')result=a.length?a.pop():'empty';else result=a.length?a.at(-1):'empty';snap({array:a,line:{push:1,pop:2,peek:3}[op.op],highlights:{i:a.length-1},vars:{operation:index,op:op.op,result,top:a.length-1},narration:`${op.op}: ${result}. LIFO: last in, first out.`});});
 snap({array:a,line:4,done:true,vars:{size:a.length},narration:'Stack operations complete. Each model operation is O(1); trace snapshots copy state for display.'});return steps;
}
export function queueSteps(input){
 const ops=operationsInput(input,['enqueue','dequeue','peek']),store=[];let head=0;
 const {steps,snap}=trace(['for each operation','  enqueue: append at rear','  dequeue: read head then head++ unless empty','  peek: read head unless empty','done']);
 snap({line:0,narration:'Empty queue. Front is left; rear is right.'});
 ops.forEach((op,index)=>{let result='';if(op.op==='enqueue'){store.push(op.value);result=op.value;}else if(op.op==='dequeue')result=head<store.length?store[head++]:'empty';else result=head<store.length?store[head]:'empty';snap({array:store.slice(head),line:{enqueue:1,dequeue:2,peek:3}[op.op],highlights:{i:0},vars:{operation:index,op:op.op,result,head,rear:store.length-1},narration:`${op.op}: ${result}. FIFO: first in, first out.`});});
 snap({array:store.slice(head),line:4,done:true,vars:{size:store.length-head},narration:'Queue complete. Head-index enqueue/dequeue are O(1) amortized; display copies are excluded.'});return steps;
}
export function linkedListSteps(input){
 const ops=operationsInput(input,['prepend','append','removeHead','search']);let head=null,tail=null,nextId=0;const nodes=new Map();
 const {steps,snap}=trace(['for each operation','  prepend: new.next = head; head = new','  append: tail.next = new; tail = new','  removeHead: head = head.next','  search: follow next pointers','done']);
 const state=()=>{const out=[];for(let n=head;n;n=n.next)out.push({id:n.id,value:n.value,next:n.next?.id??null});return out;};
 const emit=(line,vars,narration)=>snap({nodes:state(),view:'list',line,vars:{head:head?.id??'null',tail:tail?.id??'null',...vars},narration});
 emit(0,{},'Empty singly linked list. Nodes have identities and next pointers.');
 ops.forEach((op,index)=>{
  if(op.op==='prepend'||op.op==='append'){const n={id:nextId++,value:op.value,next:null};nodes.set(n.id,n);if(op.op==='prepend'){n.next=head;head=n;if(!tail)tail=n;}else{if(tail)tail.next=n;else head=n;tail=n;}emit(op.op==='prepend'?1:2,{operation:index,value:op.value},`${op.op} node ${n.id}, value ${n.value}.`);}
  else if(op.op==='removeHead'){const old=head;if(head){head=head.next;if(!head)tail=null;nodes.delete(old.id);}emit(3,{operation:index,removed:old?.value??'empty'},old?`Removed node ${old.id}; update head.`:'Empty list: nothing removed.');}
  else{let found=null;for(let n=head;n;n=n.next){emit(4,{operation:index,current:n.id,target:op.value},`Visit node ${n.id}, compare ${n.value} with ${op.value}.`);if(n.value===op.value){found=n.id;break;}}emit(4,{operation:index,target:op.value,result:found??'not found'},`Search result: ${found===null?'not found':`node ${found}`}.`);}
 });emit(5,{size:nodes.size},'List operations complete. Head/tail insertion and remove-head O(1); search O(n).');steps.at(-1).done=true;return steps;
}
