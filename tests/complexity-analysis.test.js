import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzeComplexity as analyze} from '../src/lib/complexityAnalysis.js';
test('indexed read is constant space, not an allocation',()=>{const r=analyze('const x = arr[0];');assert.equal(r.timeComplexity,'O(1)');assert.equal(r.spaceComplexity,'O(1)');});
test('JS/Java/C++ independent loops handle same-line nesting and sequential work',()=>{
 for(const type of ['let','int','long']) {
  const loop=`for (${type} i=0; i<n; i++) { sum += i; }`;
  assert.equal(analyze(loop).timeComplexity,'O(n)');assert.equal(analyze(loop+loop).timeComplexity,'O(n)');
  assert.equal(analyze(`for (${type} j=0; j<n; j++) {${loop}}`).timeComplexity,'O(n^2)');
 }
});
test('Python independent loops use indentation, not number of loop keywords',()=>{
 assert.equal(analyze('for i in range(n):\n    sum += i\nfor j in range(n):\n    sum += j').timeComplexity,'O(n)');
 assert.equal(analyze('for i in range(n):\n    for j in range(n):\n        sum += j').timeComplexity,'O(n^2)');
});
test('explicit halving loop has logarithmic cost',()=>assert.equal(analyze('for (int i=n; i>1; i/=2) { sum += i; }').timeComplexity,'O(log n)'));
test('binary search, merge sort and Fibonacci are unknown, never confidently misclassified',()=>{
 for(const code of [
  'def binary_search(arr, target):\n    left, right = 0, len(arr)-1\n    while left <= right:\n        mid = (left+right)//2\n        if arr[mid] == target:\n            return mid\n        left = mid + 1',
  'def merge_sort(a):\n    mid = len(a)//2\n    return merge(merge_sort(a[:mid]), merge_sort(a[mid:]))',
  'function fib(n) { if(n<2) return n; return fib(n-1)+fib(n-2); }',
  'int fib(int n) { return n<2 ? n : fib(n-1)+fib(n-2); }',
  'public int fib(int n) { return n<2 ? n : fib(n-1)+fib(n-2); }'
 ]) {const r=analyze(code);assert.equal(r.timeComplexity,'Cannot determine');assert.equal(r.spaceComplexity,'Cannot determine');}
});
test('allocations, calls, changing bounds, conditional/data-dependent loops fail closed',()=>{
 for(const code of ['const x = new Array(n);','const x = arr.sort();','x = [0] * n','for (let i=0; i<n; i++) { n -= 1; }','for (let i=0; i<n; i++) { for(let j=0; j<i; j++) {sum += j;} }','while(n>1) {n/=2;}','const x = input.custom;','for (let i=0;i<n;i++) { i += 2; }']) assert.equal(analyze(code).timeComplexity,'Cannot determine',code);
});
