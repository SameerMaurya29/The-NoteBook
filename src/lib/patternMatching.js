// Rule-based compatible candidates, ranked by confirmed prerequisites.
export const CONSTRAINTS = [
  { id: "sorted", label: "Sorted input", group: "input" },
  { id: "fixed-window", label: "Fixed-size window", group: "structure" },
  { id: "contiguous", label: "Contiguous subarray / substring", group: "structure" },
  { id: "find-pair", label: "Find a pair / two-sum", group: "goal" },
  { id: "range-sum", label: "Range sum queries", group: "goal" },
  { id: "range-update", label: "Range query + point update", group: "goal" },
  { id: "next-greater", label: "Next greater / smaller element", group: "goal" },
  { id: "kth-element", label: "K-th largest / smallest / most frequent", group: "goal" },
  { id: "all-combos", label: "Need all combinations / permutations", group: "goal" },
  { id: "optimal-substructure", label: "Optimal substructure", group: "property" },
  { id: "overlapping", label: "Overlapping subproblems", group: "property" },
  { id: "greedy-ok", label: "Greedy choice works (local = global)", group: "property" },
  { id: "graph", label: "Graph / network", group: "structure" },
  { id: "dag", label: "DAG / dependencies", group: "structure" },
  { id: "connected", label: "Connected components / cycle", group: "goal" },
  { id: "shortest-path", label: "Shortest path", group: "goal" },
  { id: "unweighted", label: "Unweighted / equal edge weights", group: "property" },
  { id: "nonnegative", label: "Non-negative edge weights", group: "property" },
  { id: "negative", label: "Negative edge weights possible", group: "property" },
  { id: "prefix", label: "Prefix matching / autocomplete", group: "goal" },
  { id: "intervals", label: "Intervals / overlapping ranges", group: "structure" },
];

export const PATTERNS = [
  { name: "Two Pointers", complexity: "O(n)", signals: ["sorted", "find-pair"], why: "Two indices converge on a sorted array — one pass, no extra space." },
  { name: "Binary Search", complexity: "O(log n)", signals: ["sorted"], why: "Halve the search space each step. Needs a monotonic / sorted input." },
  { name: "Sliding Window", complexity: "O(n)", signals: ["fixed-window", "contiguous"], why: "Maintain a window over the array; extend and shrink in one pass." },
  { name: "Prefix Sum", complexity: "O(n) precompute", signals: ["range-sum", "contiguous"], why: "Precompute running sums so any range sum is O(1) per query." },
  { name: "Hash Map", complexity: "O(n)", signals: ["find-pair"], why: "O(1) lookups turn pair-finding and counting into a single linear pass." },
  { name: "Monotonic Stack", complexity: "O(n)", signals: ["next-greater"], why: "A sorted stack reveals next-greater/smaller in one pass with O(1) amortized pops." },
  { name: "Heap / Priority Queue", complexity: "O(n log k)", signals: ["kth-element"], why: "A size-k heap tracks the top-K elements without sorting the whole input." },
  { name: "Quickselect", complexity: "O(n) avg", signals: ["kth-element"], why: "Partition like quicksort but recurse only into the side holding the k-th element." },
  { name: "Dynamic Programming", complexity: "O(states)", signals: ["optimal-substructure", "overlapping"], why: "Both properties present — cache subproblem answers to avoid recomputation." },
  { name: "Backtracking", complexity: "O(2^n) / O(n!)", signals: ["all-combos"], why: "Build candidates step by step and undo choices; pruning keeps it tractable." },
  { name: "Greedy", complexity: "O(n log n)", signals: ["greedy-ok"], why: "When a local optimum implies the global one, sort and pick — no DP needed." },
  { name: "BFS", complexity: "O(V + E)", signals: ["graph", "shortest-path", "unweighted"], why: "Level-by-level exploration gives the shortest path on unweighted graphs." },
  { name: "Dijkstra", complexity: "O(E log V)", signals: ["graph", "shortest-path", "nonnegative"], why: "Greedy shortest path with a min-heap; requires non-negative edge weights." },
  { name: "Bellman-Ford", complexity: "O(VE)", signals: ["graph", "shortest-path", "negative"], why: "Supports negative edges; detect reachable negative cycles because finite shortest paths may not exist." },
  { name: "Topological Sort", complexity: "O(V + E)", signals: ["dag"], why: "Order DAG nodes so every edge points forward; enables DAG DP." },
  { name: "Union-Find (DSU)", complexity: "O(α(n))", signals: ["connected"], why: "Near-constant-time connectivity queries and cycle detection on undirected graphs." },
  { name: "Segment Tree", complexity: "O(log n)", signals: ["range-update"], why: "Point updates and range queries both in O(log n); more powerful than prefix sums." },
  { name: "Trie", complexity: "O(L)", signals: ["prefix"], why: "Prefix tree gives O(word-length) insert, search, and autocomplete." },
  { name: "Sort + Sweep (Intervals)", complexity: "O(n log n)", signals: ["intervals"], why: "Sort by start, then sweep once to merge or detect overlaps." },
];

export function rankPatterns(selected) {
  const checked = new Set(selected);
  if (!checked.size) return [];
  const weights=['unweighted','nonnegative','negative'].filter(x=>checked.has(x));
  if(weights.length>1) return []; // contradictory weight declarations
  return PATTERNS.map(p=>{
    const matched=p.signals.filter(s=>checked.has(s));
    const missing=p.signals.filter(s=>!checked.has(s));
    return {...p,matchCount:matched.length,totalSignals:p.signals.length,missing,
      score:matched.length/p.signals.length,allCovered:matched.length===checked.size};
  }).filter(p=>p.allCovered)
    .sort((a,b)=>a.missing.length-b.missing.length || b.score-a.score || a.name.localeCompare(b.name));
}
