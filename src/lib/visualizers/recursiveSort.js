import {arrayInput,trace} from './trace.js';
export function mergeSortSteps(input){
 const a=arrayInput(input),{steps,snap}=trace(['sort(lo, hi, depth)','  if lo >= hi: return','  mid = floor((lo+hi)/2)','  sort(lo, mid); sort(mid+1, hi)','  merge sorted halves into buffer','  copy buffer back to a[lo..hi]','done']);
 function sort(lo,hi,depth){
  snap({array:a,line:0,vars:{lo,hi,depth},narration:`Enter sort(${lo},${hi}), recursion depth ${depth}.`});
  if(lo>=hi){snap({array:a,line:1,vars:{lo,hi,depth},narration:'Empty or singleton range needs no sorting.'});return;}
  const mid=Math.floor((lo+hi)/2);snap({array:a,line:2,vars:{lo,mid,hi,depth},narration:`Split into [${lo},${mid}] and [${mid+1},${hi}].`});sort(lo,mid,depth+1);sort(mid+1,hi,depth+1);
  let i=lo,j=mid+1;const buffer=[];
  while(i<=mid||j<=hi){if(j>hi||(i<=mid&&a[i]<=a[j]))buffer.push(a[i++]);else buffer.push(a[j++]);snap({array:a,line:4,highlights:{i:i<=mid?i:-1,j:j<=hi?j:-1},vars:{lo,mid,hi,depth,buffer:buffer.join(', ')},narration:`Merge buffer: [${buffer}]. Left side wins ties, preserving stability.`});}
  for(let k=0;k<buffer.length;k++)a[lo+k]=buffer[k];snap({array:a,line:5,vars:{lo,mid,hi,depth},narration:`Copied sorted range [${lo},${hi}] back; return to caller.`});
 }
 sort(0,a.length-1,0);snap({array:a,line:6,sortedPrefix:a.length,done:true,vars:{done:true},narration:'Sorted. Merge Sort: O(n log n) time, O(n) auxiliary buffer plus O(log n) recursion stack.'});return steps;
}
export function quickSortSteps(input){
 const a=arrayInput(input),{steps,snap}=trace(['sort(lo, hi, depth)','  if lo >= hi: return','  pivot = a[hi]; p = lo','  for j = lo to hi-1','    if a[j] < pivot: swap(a[p++], a[j])','  swap(a[p], a[hi])','  sort(lo, p-1); sort(p+1, hi)','done']);
 function sort(lo,hi,depth){
  snap({array:a,line:0,vars:{lo,hi,depth},narration:`Enter partition range [${lo},${hi}], depth ${depth}.`});
  if(lo>=hi){snap({array:a,line:1,vars:{lo,hi,depth},narration:'Empty or singleton partition returns.'});return;}
  const pivot=a[hi];let p=lo;snap({array:a,line:2,highlights:{i:hi},vars:{lo,hi,p,pivot,depth},narration:`Use last value ${pivot} as pivot.`});
  for(let j=lo;j<hi;j++){
   snap({array:a,line:3,highlights:{i:j,j:hi},vars:{lo,hi,p,j,pivot,depth},narration:`Compare ${a[j]} with pivot ${pivot}.`});
   if(a[j]<pivot){[a[p],a[j]]=[a[j],a[p]];p++;snap({array:a,line:4,highlights:{i:p-1,j},vars:{lo,hi,p,j,pivot,depth},narration:'Moved a smaller value into the left partition.'});}
  }
  [a[p],a[hi]]=[a[hi],a[p]];snap({array:a,line:5,highlights:{i:p},vars:{lo,hi,p,pivot,depth},narration:`Pivot fixed at ${p}; recurse on the two excluding ranges.`});sort(lo,p-1,depth+1);sort(p+1,hi,depth+1);
 }
 sort(0,a.length-1,0);snap({array:a,line:7,sortedPrefix:a.length,done:true,vars:{done:true},narration:'Sorted. Unstable Quick Sort: O(n log n) average / O(n²) worst time; O(log n) average / O(n) worst stack.'});return steps;
}
