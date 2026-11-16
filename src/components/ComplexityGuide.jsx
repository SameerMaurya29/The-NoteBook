import { useState } from "react";
import { BookOpen, Compass, ChevronDown, ChevronUp } from "lucide-react";

/**
 * ComplexityGuide — two collapsible reference panels shown alongside the
 * ComplexityCalculator: (1) tricks for manually finding Big-O, and
 * (2) a complexity → DSA-pattern recognition guide.
 */
export default function ComplexityGuide() {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);

  return (
    <div className="space-y-3">
      {/* ── How to Find Complexity ── */}
      <div className="border border-brown/30 rounded-sm bg-paper overflow-hidden">
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-paper-2/40 hover:bg-paper-2 transition-colors"
        >
          <span className="flex items-center gap-2">
            <BookOpen size={15} className="text-green-ink" />
            <span className="font-hand text-lg text-brown">how to find complexity — the tricks</span>
          </span>
          {showAnalysis ? <ChevronUp size={15} className="text-brown" /> : <ChevronDown size={15} className="text-brown" />}
        </button>
        {showAnalysis && (
          <div className="p-4 space-y-4 animate-page-turn text-sm">
            <Trick
              n="1"
              title="Count nested loops"
              body="Each nested loop level multiplies by n. One loop = O(n), two = O(n²), three = O(n³). The innermost body runs n^depth times."
              code="for i:        # O(n)\n  for j:      # O(n^2)\n    for k:    # O(n^3)"
            />
            <Trick
              n="2"
              title="Halving = logarithmic"
              body="If the loop variable halves (÷2, >>1) or the search space shrinks by half each step, it's O(log n). Binary search, balanced tree height, bit tricks."
              code="while n > 0:\n  n = n // 2   # O(log n)"
            />
            <Trick
              n="3"
              title="Sorting is the O(n log n) baseline"
              body="Any .sort() / sorted() call is O(n log n). If you sort then do a single O(n) pass, the total is O(n log n) — the sort dominates."
              code="arr.sort()       # O(n log n)\nfor x in arr:    # O(n) — dominated\n  ..."
            />
            <Trick
              n="4"
              title="Recursion tree method"
              body="Draw the call tree. Count nodes per level × levels. A function calling itself once with n-1 is O(n). Calling itself twice (branching) is O(2^n). Halving each call is O(n log n) or O(log n)."
              code="def f(n):\n  f(n-1)       # O(n) — one branch\n  f(n-1)+f(n-2) # O(2^n) — two branches"
            />
            <Trick
              n="5"
              title="Master theorem"
              body="For T(n) = a·T(n/b) + O(n^d): if a < b^d → O(n^d); if a = b^d → O(n^d log n); if a > b^d → O(n^(log_b a)). Merge sort: a=2, b=2, d=1 → O(n log n)."
              code="T(n) = 2T(n/2) + O(n)\n# a=2, b=2, d=1 -> O(n log n)"
            />
            <Trick
              n="6"
              title="Hash map operations are O(1) average"
              body="Each lookup, insert, or delete on a hash map/set is O(1) average. A loop doing n hash ops is O(n), not O(n²). But worst case (collisions) is O(n) per op."
              code="for x in arr:\n  seen[x] = True   # O(n) total, not O(n^2)"
            />
            <Trick
              n="7"
              title="Space = extra data + recursion depth"
              body="Space complexity = size of extra data structures + recursion stack depth. An array of size n is O(n). Recursion depth d is O(d). No extra data and no recursion = O(1)."
              code="dp = [0]*n      # O(n) space\nrecurse(n)      # O(n) stack depth"
            />
            <Trick
              n="8"
              title="Amortized analysis"
              body="Some operations are occasionally expensive but cheap on average. Dynamic array append is O(1) amortized (doubling costs O(n) but happens rarely). DSU with path compression is O(α(n)) ≈ O(1) amortized."
              code="list.append(x)  # O(1) amortized\n                 # (occasional O(n) resize)"
            />
          </div>
        )}
      </div>

      {/* ── Pattern Recognition ── */}
      <div className="border border-brown/30 rounded-sm bg-paper overflow-hidden">
        <button
          onClick={() => setShowPatterns(!showPatterns)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-paper-2/40 hover:bg-paper-2 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Compass size={15} className="text-orange-ink" />
            <span className="font-hand text-lg text-brown">which pattern to use — complexity → pattern</span>
          </span>
          {showPatterns ? <ChevronUp size={15} className="text-brown" /> : <ChevronDown size={15} className="text-brown" />}
        </button>
        {showPatterns && (
          <div className="p-4 space-y-4 animate-page-turn text-sm">
            <div>
              <p className="font-hand text-base text-brown mb-2">step 1 — find the target complexity from constraints</p>
              <p className="text-ink leading-7">
                Most problems hint at the target via constraints. If n ≤ 10⁹, you need O(log n) or O(1). If n ≤ 10⁵, O(n log n) or O(n) works. If n ≤ 20, O(2ⁿ) is fine. Match the target to the pattern.
              </p>
            </div>

            <div className="border-t border-brown/20 pt-3">
              <p className="font-hand text-base text-brown mb-2">step 2 — match complexity to pattern</p>
              <div className="space-y-2">
                <PatternRow complexity="O(1)" pattern="Hash map lookup, math formula, bit trick" />
                <PatternRow complexity="O(log n)" pattern="Binary search (on array or on answer), balanced tree op" />
                <PatternRow complexity="O(n)" pattern="Single pass, two pointers, sliding window, hash map, monotonic stack, BFS/DFS" />
                <PatternRow complexity="O(n log n)" pattern="Sort then process, merge sort, heap, divide & conquer, LIS (patience sort)" />
                <PatternRow complexity="O(n²)" pattern="Nested loops, 2D DP on pairs (LCS, edit distance), brute-force pairs" />
                <PatternRow complexity="O(n · m)" pattern="2D DP (grid paths, string comparison)" />
                <PatternRow complexity="O(n · 2ⁿ)" pattern="Generate all subsets with output copying (2ⁿ subsets)" />
                <PatternRow complexity="O(n · n!)" pattern="Generate all permutations with output copying (n! permutations)" />
                <PatternRow complexity="O(V + E)" pattern="Graph traversal (BFS, DFS), topological sort, DSU" />
              </div>
            </div>

            <div className="border-t border-brown/20 pt-3">
              <p className="font-hand text-base text-brown mb-2">step 3 — match problem shape to pattern</p>
              <div className="space-y-2">
                <ShapeRow shape="Sorted array + find a pair/target" pattern="Two Pointers or Binary Search" />
                <ShapeRow shape="Two elements that sum to target" pattern="Hash Map (O(n)) or Sort + Two Pointers (O(n log n))" />
                <ShapeRow shape="Longest/shortest substring with a condition" pattern="Sliding Window" />
                <ShapeRow shape="Running sum / range sum queries" pattern="Prefix Sum" />
                <ShapeRow shape="Next greater/smaller element" pattern="Monotonic Stack" />
                <ShapeRow shape="All permutations / combinations / subsets" pattern="Backtracking" />
                <ShapeRow shape="Optimal substructure + overlapping subproblems" pattern="Dynamic Programming" />
                <ShapeRow shape="Greedy choice property (local opt = global opt)" pattern="Greedy (sort + pick)" />
                <ShapeRow shape="Connected components / cycle in undirected graph" pattern="DSU (Union-Find) or DFS" />
                <ShapeRow shape="Shortest path (unweighted)" pattern="BFS" />
                <ShapeRow shape="Shortest path (weighted, non-negative)" pattern="Dijkstra" />
                <ShapeRow shape="Dependency ordering / scheduling" pattern="Topological Sort" />
                <ShapeRow shape="Range queries + point updates" pattern="Segment Tree or Fenwick Tree (BIT)" />
                <ShapeRow shape="Prefix matching / autocomplete" pattern="Trie" />
                <ShapeRow shape="K largest/smallest/most-frequent" pattern="Heap (size K) or Quickselect" />
                <ShapeRow shape="Intervals / overlapping ranges" pattern="Sort by start + sweep" />
                <ShapeRow shape="Count arrangements / paths" pattern="Combinatorics (nCr, Catalan, modular inverse)" />
              </div>
            </div>

            <div className="border-t border-brown/20 pt-3">
              <p className="font-hand text-base text-brown mb-2">step 4 — the decision shortcut</p>
              <p className="text-ink leading-7">
                Ask: <em>can I sort first?</em> If yes, sorting unlocks two pointers, binary search, greedy, and sweep-line. Ask: <em>is there a repeated subproblem?</em> If yes, DP or memoization. Ask: <em>do I need all combinations?</em> If yes, backtracking. Ask: <em>is the graph a DAG?</em> If yes, topological sort + DP. These four questions narrow 80% of problems to the right pattern.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Trick({ n, title, body, code }) {
  return (
    <div className="flex gap-3">
      <span className="font-mono-code text-green-ink font-semibold shrink-0 w-6">{n}.</span>
      <div className="space-y-1.5 flex-1">
        <p className="font-semibold text-ink">{title}</p>
        <p className="text-ink leading-7">{body}</p>
        <pre className="font-mono-code text-xs text-brown bg-paper-2/50 border border-brown/20 rounded-sm px-3 py-2 overflow-x-auto">{code}</pre>
      </div>
    </div>
  );
}

function PatternRow({ complexity, pattern }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="font-mono-code text-green-ink font-semibold shrink-0 w-24">{complexity}</span>
      <span className="text-ink leading-7">→ {pattern}</span>
    </div>
  );
}

function ShapeRow({ shape, pattern }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-brown shrink-0 flex-1 leading-7">"{shape}"</span>
      <span className="text-orange-ink shrink-0">→</span>
      <span className="text-ink font-semibold flex-1 leading-7">{pattern}</span>
    </div>
  );
}