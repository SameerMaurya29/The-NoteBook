import {arrayInput,trace} from './trace.js';
export function fibonacciSteps(input){
 if(!Number.isInteger(input)||input<0||input>8)throw Error('Fibonacci n must be an integer from 0 to 8 (bounded recursion trace).');
 const nodes=[],edges=[],stack=[],{steps,snap}=trace(['fib(n): create call and push stack','if n < 2: result = n','else: left = fib(n-1)','      right = fib(n-2)','      result = left + right','pop call; return result','done']);
 const emit=(line,vars,narration)=>snap({view:'tree',nodes,edges,frontier:stack,line,vars,narration});
 function fib(n,parent=null){const id=nodes.length,node={id,value:`fib(${n})`,parent,depth:stack.length,result:'pending',status:'active'};nodes.push(node);if(parent!==null)edges.push([parent,id,'call']);stack.push(id);emit(0,{n,id,depth:stack.length},`Enter call ${id}: fib(${n}).`);let result;
  if(n<2){result=n;emit(1,{n,id,result},`Base case fib(${n}) = ${n}.`);}else{emit(2,{n,id},'Evaluate left recursive call.');const left=fib(n-1,id);emit(3,{n,id,left},'Left returned; evaluate right call.');const right=fib(n-2,id);result=left+right;emit(4,{n,id,left,right,result},`Combine ${left} + ${right} = ${result}.`);}
  node.result=result;node.status='returned';stack.pop();emit(5,{n,id,result},`Return ${result} from call ${id}.`);return result;
 }
 const result=fib(input);emit(6,{n:input,result,calls:nodes.length},'Naive recursion complete. Exponential O(φⁿ) time, O(n) active call stack; displayed tree stores every call and is not auxiliary algorithm space.');steps.at(-1).done=true;return steps;
}
export function hashingSteps(input){
 if(!input||!Number.isInteger(input.buckets)||input.buckets<1||input.buckets>8)throw Error('Use {"values":[integers],"buckets":1..8}.');
 const values=arrayInput(input.values),buckets=Array.from({length:input.buckets},()=>[]),{steps,snap}=trace(['for each value','  bucket = ((value % count) + count) % count','  append value to collision chain','done']);
 const emit=(line,vars,narration)=>snap({view:'buckets',buckets,line,vars,narration});emit(0,{},'Separate chaining with normalized modulo; duplicate values are retained as separate insertions.');
 for(const value of values){const bucket=((value%input.buckets)+input.buckets)%input.buckets;emit(1,{value,bucket},`${value} hashes to bucket ${bucket}.`);const collision=buckets[bucket].length>0;buckets[bucket].push(value);emit(2,{value,bucket,collision},collision?'Collision: append to the existing chain.':'Start a new chain.');}
 emit(3,{insertions:values.length,buckets:input.buckets},'Hashing complete. Chaining lookup averages O(1+load factor), worst O(n). Display-copy overhead is excluded.');steps.at(-1).done=true;return steps;
}
export function slidingWindowSteps(input){
 const a=arrayInput(input?.values),k=input.k;if(!Number.isInteger(k)||k<1||k>Math.max(1,a.length))throw Error('Window k must be 1..array length (empty input accepts k=1).');
 let sum=0,best=-Infinity,bestStart=-1;const {steps,snap}=trace(['sum = 0; best = -infinity','for right = 0 to n-1','  add a[right]','  if right >= k: subtract a[right-k]','  if right >= k-1: compare complete-window sum with best','done']);
 snap({array:a,line:0,vars:{k,sum},narration:'Fixed-size window maximum sum; only complete windows count.'});
 for(let right=0;right<a.length;right++){sum+=a[right];snap({array:a,line:2,highlights:{i:right},vars:{k,right,sum},narration:`Add ${a[right]}.`});if(right>=k){sum-=a[right-k];snap({array:a,line:3,vars:{k,right,sum},narration:`Remove index ${right-k} to keep size ${k}.`});}
  if(right>=k-1){const left=right-k+1;if(sum>best){best=sum;bestStart=left;}snap({array:a,line:4,window:[left,right],vars:{k,left,right,sum,best,bestStart},narration:`Complete window [${left},${right}], sum ${sum}; best ${best}.`});}
 }
 snap({array:a,line:5,done:true,window:bestStart<0?[]:[bestStart,bestStart+k-1],vars:{k,result:bestStart<0?'no window':best,bestStart},narration:'Window scan complete. O(n) time, O(1) auxiliary space; ties keep the earliest window.'});return steps;
}
export function twoPointersSteps(input,{target=9}={}){
 const a=arrayInput(input,{sorted:true});if(!Number.isSafeInteger(target)||Math.abs(target)>198)throw Error('Target must be an integer from -198 to 198.');
 let left=0,right=a.length-1;const {steps,snap}=trace(['left = 0; right = n-1','while left < right','  sum = a[left] + a[right]','  if sum == target: return indices','  if sum < target: left++','  else: right--','return no pair']);
 snap({array:a,line:0,vars:{left,right,target},narration:'Sorted input required. Pointers must use distinct positions.'});
 while(left<right){const sum=a[left]+a[right];snap({array:a,line:2,highlights:{i:left,j:right},vars:{left,right,sum,target},narration:`Sum at [${left},${right}] is ${sum}.`});if(sum===target){snap({array:a,line:3,done:true,highlights:{i:left,j:right},vars:{left,right,sum,target,result:`${left},${right}`},narration:'Pair found at distinct indices. O(n) time, O(1) extra space.'});return steps;}
  if(sum<target){left++;snap({array:a,line:4,vars:{left,right,target},narration:'Sum too small; move left inward to increase it.'});}else{right--;snap({array:a,line:5,vars:{left,right,target},narration:'Sum too large; move right inward to decrease it.'});}
 }
 snap({array:a,line:6,done:true,vars:{target,result:'no pair'},narration:'Pointers met; no distinct-index pair exists. O(n) time, O(1) extra space.'});return steps;
}
