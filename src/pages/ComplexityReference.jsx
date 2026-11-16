import { AlertTriangle, Zap } from "lucide-react";

/**
 * ComplexityReference — a dedicated, always-accessible Big-O study guide.
 * Lists every common complexity class with the rule to identify it, the
 * step-by-step calculation process, a growth comparison, and quick-lookup
 * pattern → complexity mapping.
 */
export default function ComplexityReference() {
  return (
    <div className="animate-page-turn space-y-8">
      <header className="double-rule pt-4">
        <p className="font-hand text-2xl text-brown">the complexity codex</p>
        <h1 className="text-4xl font-semibold text-ink">Big-O Reference</h1>
        <p className="text-brown mt-2 max-w-xl">
          Every common complexity class, the rule to spot it, and the step-by-step process for calculating Big-O from any code snippet. Pin this while studying.
        </p>
      </header>

      {/* ── The Classes ── */}
      <section>
        <div className="mb-3">
          <p className="font-hand text-xl text-brown highlight-green rounded-sm px-1 w-fit">the classes</p>
          <h2 className="text-xl font-semibold text-green-ink border-b-2 border-greenink/50 pb-1.5">Complexity Classes & Identification Rules</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-brown/40">
                <th className="text-left py-2 px-2 text-brown font-semibold">Notation</th>
                <th className="text-left py-2 px-2 text-brown font-semibold">Name</th>
                <th className="text-left py-2 px-2 text-brown font-semibold">Rule to Identify</th>
                <th className="text-left py-2 px-2 text-brown font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brown/15">
              {CLASSES.map((c) => (
                <tr key={c.notation} className="hover:bg-paper-2/40">
                  <td className="py-2.5 px-2 font-mono-code text-green-ink font-semibold whitespace-nowrap">{c.notation}</td>
                  <td className="py-2.5 px-2 text-ink whitespace-nowrap">{c.name}</td>
                  <td className="py-2.5 px-2 text-ink leading-6">{c.rule}</td>
                  <td className="py-2.5 px-2 font-mono-code text-xs text-brown leading-6">{c.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Calculation Rules ── */}
      <section className="border-t border-brown/20 pt-6">
        <div className="mb-3">
          <p className="font-hand text-xl text-brown highlight-orange rounded-sm px-1 w-fit">the process</p>
          <h2 className="text-xl font-semibold text-orange-ink border-b-2 border-orangeink/50 pb-1.5">How to Calculate Big-O — Step by Step</h2>
        </div>
        <div className="space-y-3">
          {RULES.map((r, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="font-mono-code text-green-ink font-semibold shrink-0 w-6">{i + 1}.</span>
              <div className="flex-1">
                <p className="text-ink leading-7"><span className="font-semibold">{r.title}</span> — {r.body}</p>
                <pre className="font-mono-code text-xs text-brown bg-paper-2/50 border border-brown/20 rounded-sm px-3 py-2 mt-1 overflow-x-auto">{r.example}</pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Growth Comparison ── */}
      <section className="border-t border-brown/20 pt-6">
        <div className="mb-3">
          <p className="font-hand text-xl text-brown highlight-brown rounded-sm px-1 w-fit">feel the growth</p>
          <h2 className="text-xl font-semibold text-brown border-b-2 border-brown/50 pb-1.5">Growth at a Glance</h2>
        </div>
        <div className="bg-paper-2/40 border border-brown/30 rounded-sm p-4 space-y-2">
          {GROWTH.map((g) => (
            <div key={g.notation} className="flex items-center gap-3">
              <span className="font-mono-code text-xs text-brown w-20 shrink-0">{g.notation}</span>
              <div className="flex-1 bg-paper rounded-sm h-6 overflow-hidden border border-brown/20">
                <div className="h-full bg-greenink/30 flex items-center justify-end pr-2" style={{ width: g.bar }}>
                  <span className="font-mono-code text-xs text-brown">{g.values}</span>
                </div>
              </div>
            </div>
          ))}
          <p className="text-xs text-brown/70 italic pt-1">Bar width is relative — at n=20, O(2ⁿ) already hits a million. Exponential and factorial explode off the chart.</p>
        </div>
      </section>

      {/* ── Quick Pitfalls ── */}
      <section className="border-t border-brown/20 pt-6">
        <div className="mb-3">
          <p className="font-hand text-xl text-brown highlight-orange rounded-sm px-1 w-fit">don't trip</p>
          <h2 className="text-xl font-semibold text-orange-ink border-b-2 border-orangeink/50 pb-1.5">Common Pitfalls</h2>
        </div>
        <ul className="space-y-0">
          {PITFALLS.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-ink leading-8">
              <AlertTriangle size={15} className="text-orange-ink mt-1.5 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Quick ID ── */}
      <section className="border-t border-brown/20 pt-6">
        <div className="mb-3">
          <p className="font-hand text-xl text-brown highlight-green rounded-sm px-1 w-fit">cheat mode</p>
          <h2 className="text-xl font-semibold text-green-ink border-b-2 border-greenink/50 pb-1.5">Pattern → Complexity Quick ID</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
          {QUICK_ID.map((q, i) => (
            <div key={i} className="flex items-center gap-2 text-sm leading-7">
              <Zap size={12} className="text-orange-ink shrink-0" />
              <span className="text-brown flex-1">{q.pattern}</span>
              <span className="font-mono-code text-green-ink font-semibold">{q.complexity}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const CLASSES = [
  { notation: "O(1)", name: "Constant", rule: "No loops, no recursion. Output is independent of input size n.", example: "hash_map[key]\na + b * c" },
  { notation: "O(log n)", name: "Logarithmic", rule: "The loop variable halves (or divides by a constant) each step.", example: "while n > 0:\n  n //= 2" },
  { notation: "O(n)", name: "Linear", rule: "One pass over the input — a single loop or recursion with one branch.", example: "for x in arr:\n  total += x" },
  { notation: "O(n log n)", name: "Linearithmic", rule: "A sort call, or divide-and-conquer that halves input then does linear work to merge.", example: "arr.sort()\nmerge_sort(arr)" },
  { notation: "O(n²)", name: "Quadratic", rule: "Two nested loops over n, or a 2D DP table of size n×n.", example: "for i: for j:\n  dp[i][j]" },
  { notation: "O(n³)", name: "Cubic", rule: "Three nested loops, or matrix multiplication / 3-loop DP.", example: "for i: for j:\n  for k: ..." },
  { notation: "O(2ⁿ)", name: "Exponential", rule: "Branching recursion — each call spawns 2+ children. Backtracking without pruning.", example: "fib(n-1)+\n  fib(n-2)" },
  { notation: "O(n!)", name: "Factorial", rule: "Generating all permutations or orderings of n elements.", example: "permutations(\n  [1..n])" },
];

const RULES = [
  { title: "Drop constants", body: "Coefficients don't matter in Big-O. 3n, 100n, and n are all O(n) — we care about the growth shape, not the exact count.", example: "3n + 5      ->  O(n)\n100 * n      ->  O(n)\nn/2         ->  O(n)" },
  { title: "Drop non-dominant terms", body: "Keep only the fastest-growing term. If two terms are present, the larger one dominates as n → ∞.", example: "n² + n       ->  O(n²)\nn log n + n  ->  O(n log n)\n2ⁿ + n³      ->  O(2ⁿ)" },
  { title: "Count nested loop depth", body: "Each nested loop level multiplies by n. One loop = O(n), two = O(n²), k loops = O(nᵏ). The innermost body runs n^depth times.", example: "for i:           # O(n)\n  for j:         # O(n²)\n    for k:       # O(n³)" },
  { title: "Halving = logarithmic", body: "If the loop counter divides by 2 (or any constant) each iteration, it's O(log n). This includes binary search, tree descent, and bit shifts.", example: "while hi > lo:\n  mid = (lo+hi)//2\n# O(log n)" },
  { title: "Sorting is the O(n log n) baseline", body: "Any .sort() or sorted() call is O(n log n). If you sort then do a single O(n) pass, the total is O(n log n) — the sort dominates.", example: "arr.sort()       # O(n log n)\nfor x in arr:    # O(n) — dominated\n  ..." },
  { title: "Hash map ops are O(1) average", body: "Each lookup, insert, or delete on a hash map/set is O(1) average. A loop doing n hash operations is O(n), not O(n²). Worst case (collisions) is O(n) per op.", example: "for x in arr:\n  seen[x] = True\n# O(n) total" },
  { title: "Recursion tree: count nodes × levels", body: "Draw the call tree. One branch of depth n = O(n). Two branches (binary tree) = O(2ⁿ). Halving each call with linear merge = O(n log n). Use the Master Theorem for T(n) = aT(n/b) + f(n).", example: "f(n-1)          # O(n)\nf(n-1)+f(n-2)   # O(2ⁿ)\n2*f(n/2)+O(n)   # O(n log n)" },
  { title: "Space = extra data + recursion depth", body: "Space complexity is the size of extra data structures plus the recursion stack depth. An array of size n is O(n). Recursion depth d is O(d). No extra data and no recursion = O(1).", example: "dp = [0]*n      # O(n)\nrecurse(n)      # O(n) stack" },
  { title: "Amortized analysis", body: "Some operations are occasionally expensive but cheap on average. Dynamic array append is O(1) amortized. DSU with path compression is O(α(n)) ≈ O(1) amortized.", example: "list.append(x)  # O(1) amortized\n# occasional O(n) resize" },
];

const GROWTH = [
  { notation: "O(1)", values: "1 · 1 · 1", bar: "8%" },
  { notation: "O(log n)", values: "1 · 3 · 7", bar: "12%" },
  { notation: "O(n)", values: "10 · 100 · 1K", bar: "20%" },
  { notation: "O(n log n)", values: "33 · 664 · 10K", bar: "32%" },
  { notation: "O(n²)", values: "100 · 10K · 1M", bar: "48%" },
  { notation: "O(n³)", values: "1K · 1M · 1B", bar: "64%" },
  { notation: "O(2ⁿ)", values: "1K · 10³⁰ · ∞", bar: "82%" },
  { notation: "O(n!)", values: "3.6M · 10¹⁵⁸ · ∞", bar: "95%" },
];

const PITFALLS = [
  "Saying O(2n) or O(n/2) — these are just O(n). Constants are always dropped.",
  "Keeping both terms: O(n² + n) is O(n²). The n² dominates as n grows; the linear term becomes negligible.",
  "Assuming nested loops are always O(n²) — if the inner loop halves (binary search inside a loop), it's O(n log n), not O(n²).",
  "Forgetting the sort: an O(n) pass after arr.sort() is O(n log n) total, not O(n) — the sort dominates.",
  "Counting hash map worst case as O(1) — it's O(1) average, O(n) worst case (all keys collide). Interviewers may ask.",
  "Ignoring space: a recursive function with depth n uses O(n) stack space even if it creates no extra data structures.",
  "Treating memoized recursion as O(2ⁿ) — memoization collapses overlapping subproblems to O(n) or O(n²). The naive bound only applies without memoization.",
];

const QUICK_ID = [
  { pattern: "Single loop / linear scan", complexity: "O(n)" },
  { pattern: "Nested loops (depth k)", complexity: "O(nᵏ)" },
  { pattern: "Binary search / halving", complexity: "O(log n)" },
  { pattern: "Sort + process", complexity: "O(n log n)" },
  { pattern: "Hash map loop (n lookups)", complexity: "O(n)" },
  { pattern: "Two pointers / sliding window", complexity: "O(n)" },
  { pattern: "Monotonic stack", complexity: "O(n)" },
  { pattern: "Merge sort / quick sort (avg)", complexity: "O(n log n)" },
  { pattern: "Heap insert / extract", complexity: "O(log n)" },
  { pattern: "DFS / BFS on graph", complexity: "O(V + E)" },
  { pattern: "Dijkstra with heap", complexity: "O(E log V)" },
  { pattern: "Union-Find (amortized)", complexity: "O(α(n))" },
  { pattern: "Segment tree query/update", complexity: "O(log n)" },
  { pattern: "Naive recursion (branching)", complexity: "O(2ⁿ)" },
  { pattern: "Permutations / backtracking", complexity: "O(n!)" },
  { pattern: "DP (states × transition cost)", complexity: "O(states)" },
];