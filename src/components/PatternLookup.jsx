import { useState, useMemo } from "react";
import { Compass, ArrowRight, GitCompare, ChevronDown, ChevronUp } from "lucide-react";

/**
 * PatternLookup — a problem-type → pattern lookup tool for the DSA page.
 * The user selects a concrete problem type from a list; the tool shows the
 * recommended pattern, its complexity, why it fits, and — crucially —
 * the competing alternatives with "when to use that instead."
 * A collapsible comparison section disambiguates commonly confused pairs
 * (sliding window vs two pointers, BFS vs DFS, DP vs greedy, etc.).
 */

const PROBLEMS = [
  {
    id: "pair-sum",
    label: "Find a pair that sums to a target",
    pattern: "Hash Map",
    complexity: "O(n)",
    why: "One pass — for each element, check if its complement is already in the map. O(1) lookups keep the whole scan linear.",
    alternatives: [
      { name: "Two Pointers", when: "Input is already sorted (or you can sort). Saves the O(n) hash space, same O(n) time after sorting.", complexity: "O(n log n)" },
      { name: "Brute Force", when: "Only if n is tiny. Nested loops check every pair — O(n²).", complexity: "O(n²)" },
    ],
  },
  {
    id: "pair-sorted",
    label: "Find a pair in a sorted array",
    pattern: "Two Pointers",
    complexity: "O(n)",
    why: "One pointer at each end; move inward based on the sum vs target. Sortedness lets you skip without a hash map.",
    alternatives: [
      { name: "Hash Map", when: "If the array is unsorted and sorting is not allowed — hash map works regardless of order.", complexity: "O(n)" },
      { name: "Binary Search", when: "For each element, binary-search its complement — O(n log n), worse than two pointers but works if sorted.", complexity: "O(n log n)" },
    ],
  },
  {
    id: "longest-substring-k",
    label: "Longest substring with ≤ K distinct characters",
    pattern: "Sliding Window",
    complexity: "O(n)",
    why: "Expand the right end, shrink the left when distinct count exceeds K. A frequency map tracks the window. Each char enters and exits once.",
    alternatives: [
      { name: "Two Pointers", when: "Sliding window IS a two-pointer variant here — but the 'K distinct' constraint needs the freq map, not just pointer movement.", complexity: "O(n)" },
      { name: "Brute Force", when: "Check every substring pair — O(n²) or worse. Only for tiny inputs.", complexity: "O(n²)" },
    ],
  },
  {
    id: "max-subarray",
    label: "Maximum subarray sum (contiguous)",
    pattern: "Kadane's Algorithm",
    complexity: "O(n)",
    why: "Track the running sum; reset to 0 when it goes negative. One pass, O(1) space. A sliding-window variant without a fixed size.",
    alternatives: [
      { name: "Prefix Sum", when: "If you need many range-sum queries afterward — precompute once, then O(1) per query.", complexity: "O(n) precompute" },
      { name: "Divide & Conquer", when: "Educational — split in half, max is left, right, or crossing. O(n log n), slower but teaches recursion.", complexity: "O(n log n)" },
    ],
  },
  {
    id: "range-sum",
    label: "Range sum queries on a static array",
    pattern: "Prefix Sum",
    complexity: "O(n) precompute, O(1) query",
    why: "Precompute running sums so any range sum [l..r] = prefix[r+1] - prefix[l]. No updates allowed.",
    alternatives: [
      { name: "Segment Tree", when: "If the array can be updated (point updates) between queries — segment tree handles both in O(log n).", complexity: "O(log n) per op" },
      { name: "Fenwick Tree (BIT)", when: "Lighter-weight than segment tree for point updates + prefix sums. Same O(log n), less code.", complexity: "O(log n) per op" },
    ],
  },
  {
    id: "range-update",
    label: "Range queries + point updates",
    pattern: "Segment Tree",
    complexity: "O(log n) per op",
    why: "Both range queries and point updates in O(log n). Prefix sums can't handle updates; this is the upgrade.",
    alternatives: [
      { name: "Fenwick Tree (BIT)", when: "For sums, arbitrary [l,r] ranges are prefix(r) - prefix(l-1), with point updates in O(log n). Simpler than a segment tree; not a generic replacement for every range operation.", complexity: "O(log n) per op" },
      { name: "Prefix Sum", when: "If there are NO updates — prefix sum gives O(1) queries, strictly better than O(log n).", complexity: "O(1) query" },
    ],
  },
  {
    id: "kth-largest",
    label: "Find the K-th largest element",
    pattern: "Heap (size K)",
    complexity: "O(n log k)",
    why: "Maintain a min-heap of size K. Each insert is O(log k). At the end, the heap root is the K-th largest.",
    alternatives: [
      { name: "Quickselect", when: "If you need O(n) average time and can mutate the array — quickselect is faster on average but O(n²) worst case.", complexity: "O(n) avg" },
      { name: "Sort", when: "If K is close to n or you need the top-K sorted anyway — full sort is O(n log n), simplest to write.", complexity: "O(n log n)" },
    ],
  },
  {
    id: "next-greater",
    label: "Next greater element for each item",
    pattern: "Monotonic Stack",
    complexity: "O(n)",
    why: "A decreasing stack reveals the next greater in one pass. Each element is pushed and popped at most once — amortized O(n).",
    alternatives: [
      { name: "Brute Force", when: "For each element, scan right until a greater one is found — O(n²). Only for tiny n.", complexity: "O(n²)" },
      { name: "Sort", when: "Sorting doesn't help here — you need positional order, not value order.", complexity: "—" },
    ],
  },
  {
    id: "all-permutations",
    label: "Generate all permutations / combinations",
    pattern: "Backtracking",
    complexity: "O(n!) / O(2ⁿ)",
    why: "Build candidates step by step, undo choices to explore all branches. Pruning keeps it tractable but the worst case is factorial/exponential.",
    alternatives: [
      { name: "Dynamic Programming", when: "If you only need the COUNT of permutations/combinations (not the list itself) — DP counts in polynomial time.", complexity: "O(n²) or O(n·target)" },
      { name: "Bitmask Enumeration", when: "For subsets specifically — iterate 0..2ⁿ and use bits as inclusion flags. Same O(2ⁿ) but iterative.", complexity: "O(2ⁿ)" },
    ],
  },
  {
    id: "count-ways",
    label: "Count the number of ways / optimal value",
    pattern: "Dynamic Programming",
    complexity: "O(states × transitions)",
    why: "Optimal substructure + overlapping subproblems → cache subproblem answers. Identify the state, write the recurrence, fill the table.",
    alternatives: [
      { name: "Greedy", when: "If a local optimum always leads to the global one (prove it!) — greedy is O(n log n) or O(n), far cheaper than DP.", complexity: "O(n log n)" },
      { name: "Memoized Recursion", when: "Top-down DP — same complexity, easier to write if the recurrence is natural. Risk: stack overflow on deep recursion.", complexity: "O(states)" },
    ],
  },
  {
    id: "shortest-unweighted",
    label: "Shortest path (unweighted graph)",
    pattern: "BFS",
    complexity: "O(V + E)",
    why: "Level-by-level exploration reaches every node via its shortest path first. A queue guarantees FIFO order = shortest path.",
    alternatives: [
      { name: "Dijkstra", when: "If edges have weights (non-negative) — Dijkstra generalizes BFS with a priority queue.", complexity: "O(E log V)" },
      { name: "DFS", when: "DFS does NOT find shortest paths — it finds a path, not the shortest. Don't use it for this.", complexity: "—" },
    ],
  },
  {
    id: "shortest-weighted",
    label: "Shortest path (weighted, non-negative)",
    pattern: "Dijkstra",
    complexity: "O(E log V)",
    why: "Greedy: always expand the closest unvisited node via a min-heap. Requires non-negative edge weights.",
    alternatives: [
      { name: "Bellman-Ford", when: "If there are negative weights or you need to detect negative cycles — O(VE), slower but handles negatives.", complexity: "O(V·E)" },
      { name: "Floyd-Warshall", when: "If you need shortest paths between ALL pairs — O(V³), worth it for dense graphs.", complexity: "O(V³)" },
    ],
  },
  {
    id: "dependency-order",
    label: "Order tasks with dependencies (DAG)",
    pattern: "Topological Sort",
    complexity: "O(V + E)",
    why: "Kahn's algorithm (BFS) or post-order DFS — both produce a valid order where every edge points forward. Only works on DAGs.",
    alternatives: [
      { name: "DFS + post-order", when: "Same result, different approach — recurse, add to result on the way back up. Reverse for topological order.", complexity: "O(V + E)" },
      { name: "Cycle detection first", when: "If the graph might have cycles — detect first (DFS or Kahn's leftover nodes), then sort only if acyclic.", complexity: "O(V + E)" },
    ],
  },
  {
    id: "connected-components",
    label: "Connected components / cycle in undirected graph",
    pattern: "Union-Find (DSU)",
    complexity: "O(α(n)) per op",
    why: "Near-constant-time union and find with path compression. Great for online connectivity queries and cycle detection.",
    alternatives: [
      { name: "DFS / BFS", when: "If you need the actual component members (not just count) — DFS/BFS visits each component fully. Same O(V+E).", complexity: "O(V + E)" },
      { name: "Tarjan's", when: "For strongly connected components in directed graphs — Tarjan's or Kosaraju's algorithm.", complexity: "O(V + E)" },
    ],
  },
  {
    id: "prefix-match",
    label: "Prefix matching / autocomplete",
    pattern: "Trie",
    complexity: "O(L) per op",
    why: "A prefix tree gives O(word-length) insert, search, and prefix lookup. Shares prefixes across words to save space.",
    alternatives: [
      { name: "Hash Map", when: "If you only need exact word lookup (not prefix search) — O(L) average, simpler. Can't do prefix queries.", complexity: "O(L)" },
      { name: "Sort + Binary Search", when: "If words are sorted — binary search the prefix range. O(L log n) per query.", complexity: "O(L log n)" },
    ],
  },
  {
    id: "merge-intervals",
    label: "Merge overlapping intervals",
    pattern: "Sort + Sweep",
    complexity: "O(n log n)",
    why: "Sort by start, then sweep: if the current interval overlaps the last merged, extend it; otherwise start a new one.",
    alternatives: [
      { name: "Sweep Line", when: "If you need max concurrency (how many intervals overlap at a point) — events + counter, not just merging.", complexity: "O(n log n)" },
      { name: "Brute Force", when: "Compare every pair of intervals — O(n²). Only for tiny n.", complexity: "O(n²)" },
    ],
  },
  {
    id: "lis",
    label: "Longest increasing subsequence",
    pattern: "Patience Sort (binary search)",
    complexity: "O(n log n)",
    why: "Maintain a 'tails' array; binary-search the position for each element. The array length is the LIS length.",
    alternatives: [
      { name: "DP (O(n²))", when: "Simpler to write — dp[i] = LIS ending at i. Fine if n ≤ 10⁴; too slow for n > 10⁵.", complexity: "O(n²)" },
      { name: "Segment Tree", when: "If elements have values in a range — query max over [0..val] and update. O(n log n).", complexity: "O(n log n)" },
    ],
  },
];

const COMPARISONS = [
  {
    a: "Sliding Window",
    b: "Two Pointers",
    aWins: "Contiguous subarray/substring with a constraint (K distinct, max sum, etc.). Window expands and shrinks; a freq map tracks state.",
    bWins: "Finding a pair or converging on a target in a sorted array. Both pointers move inward monotonically; no window state needed.",
    key: "Sliding window maintains a window (state between pointers); two pointers just move two indices independently.",
  },
  {
    a: "BFS",
    b: "DFS",
    aWins: "Shortest path in unweighted graphs, level-order processing, nearest neighbor.",
    bWins: "Connectivity, cycle detection, topological sort, exhaustive path exploration. Uses less memory on wide graphs.",
    key: "BFS uses a queue (FIFO, level by level); DFS uses a stack/recursion (LIFO, go deep first).",
  },
  {
    a: "Dynamic Programming",
    b: "Greedy",
    aWins: "Optimal substructure + overlapping subproblems. Need the globally optimal answer; local choices may not lead there.",
    bWins: "Greedy choice property — a local optimum provably leads to the global one. Much faster: O(n log n) or O(n).",
    key: "If you can prove local = global, use greedy. If not, DP. Greedy is a special case of DP where you never backtrack.",
  },
  {
    a: "Hash Map",
    b: "Two Pointers (pair sum)",
    aWins: "Unsorted input, need O(n) time, can afford O(n) space. Works regardless of input order.",
    bWins: "Input is sorted (or you can sort). O(1) space after sorting. Same time if already sorted.",
    key: "Hash map trades space for order-independence; two pointers need sortedness but use no extra space.",
  },
  {
    a: "Segment Tree",
    b: "Prefix Sum",
    aWins: "Array has point updates between queries. Both range queries and updates in O(log n).",
    bWins: "Static array (no updates). Range queries in O(1) after O(n) precompute — strictly faster.",
    key: "Prefix sum = static, O(1) query. Segment tree = dynamic, O(log n) query + update.",
  },
  {
    a: "Heap (top-K)",
    b: "Sort (top-K)",
    aWins: "K is small relative to n, or data is streaming. O(n log k) — doesn't sort the whole input.",
    bWins: "K is close to n, or you need the top-K sorted anyway. Full sort is O(n log n), simpler to write.",
    key: "Heap wins when K ≪ n; sort wins when K ≈ n or you need sorted output.",
  },
  {
    a: "Backtracking",
    b: "DP (counting)",
    aWins: "You need the actual combinations/permutations (the list), not just the count.",
    bWins: "You only need the count of valid arrangements — DP counts in polynomial time, exponentially faster.",
    key: "Backtracking enumerates (exponential); DP counts (polynomial). Use DP when you don't need the list.",
  },
  {
    a: "Union-Find",
    b: "DFS (connectivity)",
    aWins: "Online connectivity queries (interleaved with edge additions), cycle detection as edges arrive. Near-O(1) per op.",
    bWins: "You need the actual component members, not just connectivity. Visits each component fully.",
    key: "Union-Find answers 'are these connected?' fast; DFS/BFS gives you the full component contents.",
  },
];

export default function PatternLookup() {
  const [selected, setSelected] = useState(null);
  const [showCompare, setShowCompare] = useState(false);

  const problem = useMemo(() => PROBLEMS.find((p) => p.id === selected), [selected]);

  return (
    <div className="border border-brown/40 rounded-sm bg-paper-2/40 overflow-hidden">
      <div className="px-4 py-3 bg-paper-2/60 flex items-center gap-2">
        <Compass size={16} className="text-orange-ink" />
        <span className="font-hand text-xl text-brown">pattern lookup</span>
        <span className="text-xs text-brown/70 hidden sm:inline">— pick your problem, see which pattern fits & why</span>
      </div>

      <div className="p-4 space-y-4">
        {/* Problem type selector */}
        <div>
          <p className="font-hand text-base text-brown mb-2">what does your problem look like?</p>
          <div className="flex flex-wrap gap-2">
            {PROBLEMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`px-3 py-1.5 rounded-sm border text-sm transition-colors min-h-[36px] text-left ${
                  selected === p.id
                    ? "border-orangeink bg-orangeink/15 text-ink"
                    : "border-brown/40 bg-paper text-brown hover:bg-paper-2"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        {problem ? (
          <div className="border-t border-brown/20 pt-3 space-y-3 animate-page-turn">
            <div className="border border-greenink/40 rounded-sm bg-greenink/8 p-4">
              <div className="flex items-center gap-2 mb-1">
                <ArrowRight size={16} className="text-green-ink" />
                <span className="font-hand text-lg text-brown">recommended</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-semibold text-ink">{problem.pattern}</span>
                <span className="font-mono-code text-sm px-2 py-0.5 bg-greenink/15 text-green-ink rounded-sm">{problem.complexity}</span>
              </div>
              <p className="text-sm text-ink mt-2 leading-7">{problem.why}</p>
            </div>

            <div>
              <p className="font-hand text-base text-brown mb-2">when to use something else instead</p>
              <div className="space-y-2">
                {problem.alternatives.map((alt) => (
                  <div key={alt.name} className="border border-brown/30 rounded-sm bg-paper p-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-ink">{alt.name}</span>
                      <span className="font-mono-code text-xs px-1.5 py-0.5 bg-brown/10 text-brown rounded-sm">{alt.complexity}</span>
                    </div>
                    <p className="text-sm text-brown mt-1 leading-6">{alt.when}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-brown text-sm italic text-center py-4 border-t border-brown/20">
            ↑ pick a problem type above to see the recommended pattern and its alternatives.
          </p>
        )}

        {/* Comparison reference */}
        <div className="border-t border-brown/20 pt-3">
          <button
            onClick={() => setShowCompare(!showCompare)}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="flex items-center gap-2">
              <GitCompare size={15} className="text-brown" />
              <span className="font-hand text-lg text-brown">confusable patterns — side by side</span>
            </span>
            {showCompare ? <ChevronUp size={15} className="text-brown" /> : <ChevronDown size={15} className="text-brown" />}
          </button>
          {showCompare && (
            <div className="mt-3 space-y-3 animate-page-turn">
              {COMPARISONS.map((c, i) => (
                <div key={i} className="border border-brown/30 rounded-sm bg-paper p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-green-ink">{c.a}</span>
                    <span className="text-brown">vs</span>
                    <span className="font-semibold text-orange-ink">{c.b}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-mono-code text-xs text-green-ink mb-1">use {c.a} when:</p>
                      <p className="text-ink leading-6">{c.aWins}</p>
                    </div>
                    <div>
                      <p className="font-mono-code text-xs text-orange-ink mb-1">use {c.b} when:</p>
                      <p className="text-ink leading-6">{c.bWins}</p>
                    </div>
                  </div>
                  <p className="text-xs text-brown italic mt-2 pt-2 border-t border-brown/15">Key: {c.key}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}