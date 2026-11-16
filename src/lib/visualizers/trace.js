export function arrayInput(input,{sorted=false}={}) {
  if(!Array.isArray(input)||input.length>12||!input.every(n=>Number.isSafeInteger(n)&&Math.abs(n)<=99))throw Error('Use at most 12 integers from -99 to 99.');
  if(sorted&&input.some((n,i)=>i>0&&n<input[i-1]))throw Error('This algorithm requires input sorted in ascending order.');
  return [...input];
}
export function trace(pseudo) {
  const steps=[];
  return {steps,snap(state){steps.push(structuredClone({array:[],highlights:{},sortedTail:0,line:-1,vars:{},pseudo,...state}));}};
}
export function selectionSortSteps(input) {
  const a=arrayInput(input),{steps,snap}=trace(['for i = 0 to n-2','  min = i','  for j = i+1 to n-1','    if a[j] < a[min]: min = j','  swap(a[i], a[min])','done']);
  snap({array:a,line:0,narration:'Start with no sorted prefix.'});
  for(let i=0;i<a.length-1;i++) {
    let min=i;snap({array:a,line:1,sortedPrefix:i,highlights:{i},vars:{i,min},narration:`Find the minimum from index ${i}.`});
    for(let j=i+1;j<a.length;j++) {
      snap({array:a,line:2,sortedPrefix:i,highlights:{i:j,j:min},vars:{i,j,min},narration:`Compare ${a[j]} with current minimum ${a[min]}.`});
      if(a[j]<a[min]){min=j;snap({array:a,line:3,sortedPrefix:i,highlights:{i:min},vars:{i,j,min},narration:`New minimum is at ${min}.`});}
    }
    [a[i],a[min]]=[a[min],a[i]];snap({array:a,line:4,sortedPrefix:i+1,highlights:{i,j:min},vars:{i,min},narration:`Place minimum at index ${i}.`});
  }
  snap({array:a,line:5,sortedPrefix:a.length,done:true,vars:{done:true},narration:'Sorted. Selection Sort uses O(n²) comparisons and O(1) auxiliary space; swaps are not stable.'});return steps;
}
export function insertionSortSteps(input) {
  const a=arrayInput(input),{steps,snap}=trace(['for i = 1 to n-1','  key = a[i]; j = i-1','  while j >= 0 and a[j] > key','    a[j+1] = a[j]; j--','  a[j+1] = key','done']);
  snap({array:a,line:0,sortedPrefix:Math.min(1,a.length),narration:'The first element is a sorted prefix.'});
  for(let i=1;i<a.length;i++){
    const key=a[i];let j=i-1;
    snap({array:a,line:1,sortedPrefix:i,highlights:{i},vars:{i,j,key},narration:`Hold ${key} outside the array while opening an insertion slot.`});
    while(j>=0&&a[j]>key){snap({array:a,line:2,highlights:{i:j,j:j+1},vars:{i,j,key},narration:`${a[j]} is greater than key ${key}.`});a[j+1]=a[j];j--;snap({array:a,line:3,highlights:{i:j+1},vars:{i,j,key},narration:'Shift right; key is still held separately, so duplicated displayed values are temporary.'});}
    a[j+1]=key;snap({array:a,line:4,sortedPrefix:i+1,highlights:{i:j+1},vars:{i,j,key},narration:`Insert key ${key} at ${j+1}.`});
  }
  snap({array:a,line:5,sortedPrefix:a.length,done:true,vars:{done:true},narration:'Sorted. Stable insertion uses O(n²) worst-case time, O(n) best-case time and O(1) auxiliary space.'});return steps;
}
