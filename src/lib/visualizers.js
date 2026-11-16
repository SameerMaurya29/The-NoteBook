import { fibonacciSteps, hashingSteps, slidingWindowSteps, twoPointersSteps } from "./visualizers/techniques.js";
import { bfsSteps, dfsSteps, dijkstraSteps } from "./visualizers/graphs.js";
import { bstSteps } from "./visualizers/tree.js";
import { stackSteps, queueSteps, linkedListSteps } from "./visualizers/structures.js";
import { mergeSortSteps, quickSortSteps } from "./visualizers/recursiveSort.js";
import { linearSearchSteps, binarySearchSteps } from "./visualizers/search.js";
import { selectionSortSteps, insertionSortSteps, arrayInput } from "./visualizers/trace.js";
// Availability is derived from actual generators, never from card labels.
export const visualizers = [
  { id: "bubble-sort", name: "Bubble Sort", type: "sorting", desc: "Adjacent swaps bubble the largest to the end each pass." },
  { id: "selection-sort", name: "Selection Sort", type: "sorting", desc: "Repeatedly select the minimum and swap it forward." },
  { id: "insertion-sort", name: "Insertion Sort", type: "sorting", desc: "Build a sorted prefix by inserting each element in place." },
  { id: "merge-sort", name: "Merge Sort", type: "sorting", desc: "Divide, conquer, merge — O(n log n) and stable." },
  { id: "quick-sort", name: "Quick Sort", type: "sorting", desc: "Partition around a pivot, recurse on each side." },
  { id: "linear-search", name: "Linear Search", type: "searching", desc: "Scan left to right until found." },
  { id: "binary-search", name: "Binary Search", type: "searching", desc: "Halve the search space each step on sorted input." },
  { id: "stack", name: "Stack", type: "structure", desc: "LIFO — push and pop from one end." },
  { id: "queue", name: "Queue", type: "structure", desc: "FIFO — enqueue at back, dequeue at front." },
  { id: "linked-list", name: "Linked List", type: "structure", desc: "Nodes chained by pointers; O(1) insert at head." },
  { id: "bst", name: "Binary Search Tree", type: "tree", desc: "Left < node < right; O(log n) ops when balanced." },
  { id: "bfs", name: "Breadth-First Search", type: "graph", desc: "Level by level using a queue." },
  { id: "dfs", name: "Depth-First Search", type: "graph", desc: "Go deep first using a stack/recursion." },
  { id: "dijkstra", name: "Dijkstra", type: "graph", desc: "Shortest paths from a source with non-negative weights." },
  { id: "recursion-fib", name: "Recursion Tree (Fibonacci)", type: "recursion", desc: "Watch fib branch into a call tree." },
  { id: "hashing", name: "Hashing & Collisions", type: "structure", desc: "Buckets, chains, and why collisions happen." },
  { id: "sliding-window", name: "Sliding Window", type: "technique", desc: "Maintain a window over an array; extend/shrink." },
  { id: "two-pointers", name: "Two Pointers", type: "technique", desc: "Two indices converge or scan in tandem." }
];

function bubbleSortSteps(input) {
  const arr = arrayInput(input);
  const n = arr.length;
  const steps = [];
  const pseudo = [
    "for i in 0..n-1:",
    "  swapped = False",
    "  for j in 0..n-i-2:",
    "    if arr[j] > arr[j+1]:",
    "      swap(arr[j], arr[j+1])",
    "      swapped = True",
    "  if not swapped: break"
  ];
  const snap = (extra) => steps.push({ array: [...arr], pseudo, ...extra });

  snap({ line: 0, highlights: {}, sortedTail: 0, vars: { i: 0, n, swapped: false } });
  for (let i = 0; i < n; i++) {
    let swapped = false;
    snap({ line: 1, highlights: {}, sortedTail: i, vars: { i, n, swapped } });
    for (let j = 0; j < n - i - 1; j++) {
      snap({ line: 2, highlights: { i: j, j: j + 1 }, sortedTail: i, vars: { i, n, j, swapped } });
      if (arr[j] > arr[j + 1]) {
        snap({ line: 3, highlights: { i: j, j: j + 1 }, sortedTail: i, vars: { i, n, j, arrj: arr[j], arrj1: arr[j + 1], swapped } });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        snap({ line: 4, highlights: { i: j, j: j + 1 }, sortedTail: i, vars: { i, n, j, swapped } });
      }
    }
    if (!swapped) {
      snap({ line: 6, highlights: {}, sortedTail: n, vars: { i, n, swapped } });
      break;
    }
  }
  snap({ line: -1, highlights: {}, sortedTail: n, vars: { done: true }, done: true });
  return steps;
}

/** @type {Record<string, {title:string,desc:string,gen:Function,defaultInput:any,inputKind?:string,hasTarget?:boolean,defaultTarget?:number,sortedInput?:boolean}>} */
export const generators = {
  "recursion-fib": { title: "Recursion Tree (Fibonacci)", desc: "Naive fib calls with parent/child edges, active stack and returned values; n bounded to 8.", gen: fibonacciSteps, inputKind: "number", defaultInput: 5 },
  "hashing": { title: "Hashing & Collisions", desc: "Normalized modulo and separate chains; duplicate insertions retained.", gen: hashingSteps, inputKind: "buckets", defaultInput: {values:[5,2,9,1,5,6,3],buckets:4} },
  "sliding-window": { title: "Sliding Window", desc: "Maximum sum among complete fixed-size windows, retaining the earliest tie.", gen: slidingWindowSteps, inputKind: "window", defaultInput: {values:[5,2,9,1,5,6,3],k:3} },
  "two-pointers": { title: "Two Pointers", desc: "Find a target-sum pair at distinct indices of ascending input.", gen: twoPointersSteps, defaultInput: [1,2,3,4,5,6,8], hasTarget: true, defaultTarget: 9, sortedInput: true },
  "dijkstra": { title: "Dijkstra", desc: "Non-negative weighted directed graph, minimum-distance scan, relaxation and unreachable states. Rejects unsafe integer path sums.", gen: dijkstraSteps, inputKind: "graph", defaultInput: {nodes:5,edges:[[0,1,4],[0,2,1],[2,1,2],[1,3,5]],start:0} },
  "bfs": { title: "Breadth-First Search", desc: "Directed adjacency, queue/frontier, visited state and unweighted distances.", gen: bfsSteps, inputKind: "graph", defaultInput: {adj:[[1,2],[0,3],[0,3],[1,2]],start:0} },
  "dfs": { title: "Depth-First Search", desc: "Directed adjacency order, explicit recursion stack and visited state.", gen: dfsSteps, inputKind: "graph", defaultInput: {adj:[[1,2],[0,3],[0,3],[1,2]],start:0} },
  "bst": { title: "Binary Search Tree", desc: "Insert/search a strict BST with explicit left/right links. Duplicates ignored; no automatic balancing.", gen: bstSteps, inputKind: "operations", defaultInput: [{op:"insert",value:5},{op:"insert",value:2},{op:"insert",value:8},{op:"insert",value:3},{op:"search",value:3}] },
  "stack": { title: "Stack", desc: "LIFO operations; top is rightmost. Empty pops/peeks are explicit.", gen: stackSteps, inputKind: "operations", defaultInput: [{op:"push",value:3},{op:"push",value:5},{op:"peek"},{op:"pop"}] },
  "queue": { title: "Queue", desc: "FIFO operations with front at left and a head-index model.", gen: queueSteps, inputKind: "operations", defaultInput: [{op:"enqueue",value:3},{op:"enqueue",value:5},{op:"dequeue"},{op:"peek"}] },
  "linked-list": { title: "Linked List", desc: "Explicit node identities, head/tail and next pointers; prepend, append, removeHead and search.", gen: linkedListSteps, inputKind: "operations", defaultInput: [{op:"append",value:3},{op:"prepend",value:5},{op:"search",value:3},{op:"removeHead"}] },
  "merge-sort": { title: "Merge Sort", desc: "Trace recursive ranges and the merge buffer; left-side ties preserve stability.", gen: mergeSortSteps, defaultInput: [5,2,9,1,5,6,3] },
  "quick-sort": { title: "Quick Sort", desc: "Lomuto partition with a last-element pivot and explicit recursive ranges.", gen: quickSortSteps, defaultInput: [5,2,9,1,5,6,3] },
  "linear-search": { title: "Linear Search", desc: "Scan left to right for the target; return the first matching index or -1.", gen: linearSearchSteps, defaultInput: [5,2,9,1,5,6,3], hasTarget: true, defaultTarget: 5 },
  "binary-search": { title: "Binary Search", desc: "Search an ascending array by shrinking an inclusive interval. Duplicate matches need not be the first.", gen: binarySearchSteps, defaultInput: [1,2,3,5,5,6,9], hasTarget: true, defaultTarget: 5, sortedInput: true },
  "insertion-sort": { title: "Insertion Sort", desc: "Hold each key, shift larger values right and insert into the sorted prefix.", gen: insertionSortSteps, defaultInput: [5,2,9,1,5,6,3] },
  "selection-sort": { title: "Selection Sort", desc: "Select the minimum of the remaining suffix, then swap it into the sorted prefix.", gen: selectionSortSteps, defaultInput: [5,2,9,1,5,6,3] },
  "bubble-sort": {
    title: "Bubble Sort",
    desc: "Compare adjacent pairs and swap if out of order. After each pass the largest unsorted value bubbles to the end.",
    gen: bubbleSortSteps,
    defaultInput: [5, 2, 9, 1, 5, 6, 3]
  }
};


export function getVisualizer(id) {
  return visualizers.find((item) => item.id === id) || null;
}

export const SORT_BOUNDS = {
 'bubble-sort': 'O(n) best / O(n²) worst time; O(1) extra space',
 'selection-sort': 'O(n²) time; O(1) extra space; unstable',
 'insertion-sort': 'O(n) best / O(n²) worst time; O(1) extra space; stable',
 'merge-sort': 'O(n log n) time; O(n) buffer and O(log n) stack; stable',
 'quick-sort': 'O(n log n) average / O(n²) worst time; O(log n) average / O(n) worst stack'
};
