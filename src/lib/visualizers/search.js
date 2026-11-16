import {arrayInput,trace} from './trace.js';
function targetInput(target){if(!Number.isSafeInteger(target)||Math.abs(target)>99)throw Error('Target must be an integer from -99 to 99.');}
export function linearSearchSteps(input,{target=5}={}){
 const a=arrayInput(input);targetInput(target);
 const {steps,snap}=trace(['for i = 0 to n-1','  if a[i] == target: return i','return -1']);
 snap({array:a,line:0,vars:{target},narration:`Search for ${target} from left to right.`});
 for(let i=0;i<a.length;i++){
  snap({array:a,line:1,highlights:{i},vars:{i,target},narration:`Compare index ${i}: ${a[i]} with ${target}.`});
  if(a[i]===target){snap({array:a,line:1,highlights:{i},done:true,vars:{target,result:i},narration:`Found the first match at index ${i}. Linear Search takes O(n) worst-case time and O(1) extra space.`});return steps;}
 }
 snap({array:a,line:2,done:true,vars:{target,result:-1},narration:`${target} is absent; return -1. O(n) worst-case time, O(1) extra space.`});return steps;
}
export function binarySearchSteps(input,{target=5}={}){
 const a=arrayInput(input,{sorted:true});targetInput(target);
 const {steps,snap}=trace(['lo = 0; hi = n-1','while lo <= hi','  mid = lo + floor((hi-lo)/2)','  if a[mid] == target: return mid','  if a[mid] < target: lo = mid+1','  else: hi = mid-1','return -1']);
 let lo=0,hi=a.length-1;snap({array:a,line:0,vars:{lo,hi,target},narration:'Ascending input is required; the search interval is inclusive.'});
 while(lo<=hi){const mid=lo+Math.floor((hi-lo)/2);snap({array:a,line:2,highlights:{i:mid},vars:{lo,hi,mid,target},narration:`Search [${lo},${hi}]; compare midpoint ${mid} (${a[mid]}).`});
  if(a[mid]===target){snap({array:a,line:3,highlights:{i:mid},done:true,vars:{lo,hi,mid,target,result:mid},narration:`Found at index ${mid}; with duplicates this is not necessarily the first match. O(log n) time, O(1) extra space.`});return steps;}
  if(a[mid]<target){lo=mid+1;snap({array:a,line:4,vars:{lo,hi,target},narration:'Discard midpoint and the lower half.'});}else{hi=mid-1;snap({array:a,line:5,vars:{lo,hi,target},narration:'Discard midpoint and the upper half.'});}
 }
 snap({array:a,line:6,done:true,vars:{lo,hi,target,result:-1},narration:`Empty interval: ${target} is absent. O(log n) time, O(1) extra space.`});return steps;
}
