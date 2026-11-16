// DSA — more foundational "things you have to know" notes (part 2).
export default [
  {
    id: "problem-solving-patterns",
    title: "Problem-Solving Patterns",
    difficulty: "medium",
    definition: `Problem-solving patterns are reusable templates that map a problem's shape to an efficient approach — two pointers, sliding window, fast/slow pointers, prefix sums, in-place reversal, and more. Recognizing the pattern is half the battle in interviews and real code.`,
    coreUnderstanding: `Most interview and real-world problems are variations on a small set of templates. Once you can name the pattern from the problem's constraints (sorted array? contiguous subarray? cycle detection?), the code almost writes itself. Patterns are language-agnostic mental models — you learn them once and apply them everywhere. They turn "I don't know where to start" into "this is a sliding-window problem."`,
    howItWorks: `1. TWO POINTERS: one at each end of a sorted array, moving inward. Use for pair-sum (two-sum on sorted), palindromes, container-with-most-water. O(n) instead of O(n²).
2. SLIDING WINDOW: a moving subarray range [left..right]. Expand right, shrink left when a constraint breaks. Use for max-sum subarray of size k, longest substring without repeats. O(n).
3. FAST & SLOW POINTERS: two pointers at different speeds in a linked list. If they meet, there's a cycle. Use for cycle detection and finding the middle.
4. PREFIX SUM: precompute running sums so any range sum is O(1). arr[i..j] = prefix[j+1] - prefix[i]. Use for range queries, equilibrium index.
5. IN-PLACE REVERSAL: reverse a list or subarray by swapping ends inward. Use for "reverse linked list", "rotate array".
6. MERGE INTERVALS: sort by start, merge overlapping. Use for meeting-room scheduling, range unions.
7. BREADTH-FIRST SEARCH (BFS): level-by-level with a queue — shortest path in unweighted graphs. DEPTH-FIRST SEARCH (DFS): go deep with a stack/recursion — connectivity, cycles, backtracking.
8. MONOTONIC STACK: a stack that stays sorted to find next greater/smaller element in O(n).`,
    codeExamples: [
      {
        lang: "python",
        code: `# Two pointers: pair sum in a SORTED array (O(n), not O(n^2))
def pair_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return (arr[left], arr[right])
        elif s < target:
            left += 1      # need a bigger sum -> move left up
        else:
            right -= 1     # need a smaller sum -> move right down
    return None

print(pair_sum_sorted([1, 2, 4, 7, 11], 9))   # (2, 7)

# Sliding window: max sum of any subarray of length k (O(n))
def max_window_sum(arr, k):
    win = sum(arr[:k])           # first window
    best = win
    for i in range(k, len(arr)):
        win += arr[i] - arr[i - k]   # add new, drop old
        best = max(best, win)
    return best

print(max_window_sum([2, 1, 5, 1, 3, 2], 3))   # 9 (5+1+3)`,
        output: `(2, 7)
9`,
        note: "Two pointers turn O(n²) pair problems into O(n) on sorted data. Sliding window keeps a running sum so each step is O(1). Recognize the pattern from the constraints."
      }
    ],
    marginNotes: [
      "Two pointers need a SORTED array (or a sorted-ish structure). On unsorted data, sort first (O(n log n)) then two-pointer — still better than O(n²).",
      "Sliding window's key trick: when you move the window right by one, you ADD the new element and SUBTRACT the one that fell off — O(1) per step, no re-summing.",
      "Fast/slow pointers detect cycles in O(1) space — no hash set needed. If they ever point at the same node, there's a loop.",
      "Prefix sums turn range-sum queries into O(1): sum(i..j) = prefix[j+1] - prefix[i]. Build the prefix array once in O(n)."
    ],
    commonMistakes: [
      "Using two pointers on unsorted data and getting wrong answers — sort first.",
      "Re-summing the whole window each step in sliding window — that's O(nk). Add/subtract at the edges for O(1).",
      "Forgetting the base case in fast/slow pointers — if the list is empty or single-node, return early."
    ],
    relatedTopics: ["Two Pointers", "Sliding Window", "BFS & DFS"],
    externalLinks: [
      { label: "Grokking the Coding Interview (patterns)", url: "https://www.educative.io/courses/grokking-the-coding-interview" },
      { label: "NeetCode Patterns", url: "https://neetcode.io/" }
    ],
    mcqs: [
      {
        question: "When can you use the two-pointer technique for pair sum?",
        options: ["On any array", "On a SORTED array — pointers move inward based on the current sum", "Only on linked lists", "Only with a hash map"],
        answer: 1,
        explanations: ["Unsorted data gives wrong results.", "Correct — two pointers work on sorted data: if the sum is too small, move the left pointer up; too big, move the right down. Sort first if needed (O(n log n)).", "Two pointers work on arrays, not just linked lists.", "A hash map is the alternative O(n) approach for unsorted two-sum."],
        difficulty: "medium"
      },
      {
        question: "What makes a sliding window O(n) instead of O(n·k)?",
        options: ["It uses a hash map", "Each step adds the new element and subtracts the one leaving — O(1) per move, no re-summing", "It sorts the array", "It uses recursion"],
        answer: 1,
        explanations: ["No hash map needed.", "Correct — keep a running sum; when the window slides right, add arr[i] and subtract arr[i-k]. O(1) per step, O(n) total. Re-summing the window each time is O(n·k).", "No sorting.", "No recursion."],
        difficulty: "medium"
      },
      {
        question: "Which pattern detects a cycle in a linked list in O(1) space?",
        options: ["BFS", "Fast & slow pointers (Floyd's cycle detection)", "Prefix sum", "Merge intervals"],
        answer: 1,
        explanations: ["BFS is for graphs/trees.", "Correct — two pointers at different speeds; if they meet, there's a cycle. O(n) time, O(1) space — no hash set needed.", "Prefix sums are for range sums.", "Merge intervals is for overlapping ranges."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "complexity-analysis-practice",
    title: "Analyzing Complexity in Practice",
    difficulty: "medium",
    definition: `Complexity analysis is the skill of looking at code and stating how its time and space grow with input size n. Big-O is the notation; analysis is the practice of counting loops, recursion, and allocations to derive it.`,
    coreUnderstanding: `Big-O describes the worst-case growth rate, ignoring constants. To analyze real code you count: how many times loops run (and whether they nest), how recursion branches (the recurrence), and how much extra memory you allocate. The goal isn't an exact number — it's the growth class (O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)) so you can predict whether your code survives a million-item input. Space complexity counts extra allocations (new arrays, recursion depth), not the input itself.`,
    howItWorks: `1. SINGLE LOOP over n: O(n). Two sequential loops: still O(n) (constants drop).
2. NESTED LOOPS multiply: loop-in-loop over n is O(n²); three deep is O(n³).
3. LOGARITHMIC: halving each step (binary search, balanced-tree operations) is O(log n).
4. n log n: sorting (merge/heap/quick average), divide-and-conquer that does O(n) work per level over log n levels.
5. RECURSION: count via the recurrence. Binary search T(n)=T(n/2)+O(1)=O(log n). Merge sort T(n)=2T(n/2)+O(n)=O(n log n). Naive Fibonacci T(n)=T(n-1)+T(n-2)=O(2ⁿ).
6. SPACE: count extra allocations + recursion depth. An in-place algorithm is O(1) space; one that builds an output array of size n is O(n) space; recursion depth d is O(d) space.
7. AMORTIZED: some operations are occasionally expensive but cheap on average. Dynamic-array append is O(1) amortized even though a resize is O(n) — the resizes are rare.
8. BEST vs WORST vs AVERAGE: always state which. Quicksort is O(n²) worst but O(n log n) average; binary search is O(log n) worst.`,
    codeExamples: [
      {
        lang: "python",
        code: `# O(n) — one loop, each step O(1)
def sum_all(arr):
    total = 0
    for x in arr:        # n iterations
        total += x        # O(1)
    return total

# O(n^2) — nested loops
def all_pairs(arr):
    for a in arr:           # n
        for b in arr:       # n  -> n*n
            print(a, b)

# O(log n) — halving (binary search)
def bsearch(arr, x):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:        # halves each step
        mid = (lo + hi) // 2
        if arr[mid] == x: return mid
        elif arr[mid] < x: lo = mid + 1
        else: hi = mid - 1
    return -1

# O(n log n) — sort then one pass
def sorted_pairs(arr):
    arr.sort()             # O(n log n)
    for x in arr:          # O(n)  -> total O(n log n)
        pass`,
        output: `(complexity examples)`,
        note: "Single loop = O(n); nested loops multiply to O(n²); halving = O(log n); sort dominates a following O(n) pass at O(n log n). Count loops and how they combine."
      }
    ],
    marginNotes: [
      "Constants drop: O(2n) and O(n) are both O(n). What matters is the growth as n → large, so the dominant term wins (O(n² + n) = O(n²)).",
      "Sequential loops ADD (O(n)+O(n)=O(n)); nested loops MULTIPLY (O(n)×O(n)=O(n²)). Mixing these up is the #1 analysis mistake.",
      "Space counts EXTRA allocations and recursion depth, not the input. An in-place sort is O(1) space; merge sort's temp arrays make it O(n) space.",
      "Amortized: dynamic-array append is O(1) amortized despite occasional O(n) resizes. Don't call it O(n) — the resizes are geometrically rare."
    ],
    commonMistakes: [
      "Adding nested loops instead of multiplying — two nested loops over n are O(n²), not O(2n).",
      "Forgetting recursion depth in space complexity — deep recursion uses O(d) stack space even with no extra arrays.",
      "Calling dynamic-array append O(n) because of resizes — it's O(1) amortized."
    ],
    relatedTopics: ["Big-O Notation", "Recursion", "Sorting Algorithms"],
    externalLinks: [
      { label: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/" },
      { label: "Complexity of Python operations", url: "https://wiki.python.org/moin/TimeComplexity" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of two nested loops each over n?",
        options: ["O(2n)", "O(n²)", "O(n log n)", "O(log n)"],
        answer: 1,
        explanations: ["That's two sequential loops.", "Correct — nested loops MULTIPLY: n × n = n². Sequential loops add (O(n)+O(n)=O(n)).", "That's sorting.", "That's binary search."],
        difficulty: "easy"
      },
      {
        question: "Why is dynamic-array append O(1) amortized despite resizes?",
        options: ["Resizes never happen", "Resizes are O(n) but geometrically rare — averaged over many appends, each is O(1)", "Arrays don't resize", "It's actually O(n)"],
        answer: 1,
        explanations: ["Resizes do happen.", "Correct — the array doubles on resize, so after k appends there are ~log k resizes totaling O(k) work. Averaged, each append is O(1).", "They do.", "It's amortized O(1), not worst-case O(1)."],
        difficulty: "hard"
      },
      {
        question: "What does space complexity count?",
        options: ["The input size", "Extra allocations and recursion depth, not the input itself", "The number of variables", "The runtime"],
        answer: 1,
        explanations: ["The input is given, not counted.", "Correct — space complexity counts EXTRA memory: new arrays/maps and the recursion stack. An in-place algorithm is O(1) space.", "Variable count is irrelevant.", "That's time, not space."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "choosing-data-structure",
    title: "Choosing the Right Data Structure",
    difficulty: "medium",
    definition: `Picking the right data structure means matching its strengths to your access pattern — lookup, insertion, ordering, or uniqueness. The wrong choice turns an O(1) operation into O(n); the right one makes the whole algorithm fast.`,
    coreUnderstanding: `Every data structure optimizes for some operations at the expense of others. An array gives O(1) index access but O(n) search and insert. A hash map gives O(1) lookup but no ordering. A sorted array gives O(log n) search and ordered iteration but O(n) insert. A balanced tree gives O(log n) everything but with overhead. The skill is naming the operation you do MOST, then choosing the structure that makes it cheap. Ask: do I need order? uniqueness? fast lookup? fast insert at ends? fast middle insert? Each answer points to a different structure.`,
    howItWorks: `1. FAST INDEX ACCESS + fixed size -> ARRAY. O(1) by index; O(n) search/insert. Best for "the k-th element" and cache-friendly scans.
2. FAST LOOKUP / MEMBERSHIP by key -> HASH MAP / HASH SET. O(1) average get/contains; no order. Best for "is X present?" and key→value.
3. ORDERED DATA + FAST SEARCH -> SORTED ARRAY. O(log n) binary search; O(n) insert. Best for read-heavy ordered data.
4. ORDERED + FAST INSERT/DELETE everywhere -> BALANCED TREE (TreeMap/TreeSet). O(log n) all ops, kept sorted. Best for "range queries" and "k-th smallest".
5. FAST INSERT/DELETE AT ENDS -> DEQUE (double-ended queue). O(1) both ends; O(n) middle. Best for queues, sliding windows.
6. LAST-IN-FIRST-OUT -> STACK. O(1) push/pop. Best for undo, recursion simulation, balanced brackets.
7. FIRST-IN-FIRST-OUT -> QUEUE. O(1) enqueue/dequeue. Best for BFS, scheduling.
8. PRIORITY ORDER -> HEAP / PRIORITY QUEUE. O(log n) insert/extract-min; O(1) peek. Best for "k largest", Dijkstra, scheduling by priority.
9. RELATIONSHIPS / HIERARCHY -> GRAPH or TREE. Adjacency list for sparse graphs; matrix for dense.`,
    codeExamples: [
      {
        lang: "python",
        code: `# Same task, "count word frequencies", three structures, three costs
words = ["a", "b", "a", "c", "b", "a"]

# BAD: list scan for each word -> O(n^2)
def count_list(words):
    out = []
    for w in set(words):
        out.append((w, words.count(w)))   # .count is O(n) each!
    return out

# GOOD: hash map -> O(n)
from collections import Counter
def count_map(words):
    return dict(Counter(words))           # one pass, O(1) per update

# If you need them SORTED by frequency:
def count_sorted(words):
    c = Counter(words)
    return c.most_common()                 # O(n log n) to sort

print(count_map(words))   # {'a': 3, 'b': 2, 'c': 1}`,
        output: `{'a': 3, 'b': 2, 'c': 1}`,
        note: "A list .count() inside a loop is O(n²); a hash map (Counter) is O(n). Match the structure to the operation you do most: lookup → hash map, order → sorted/tree, ends → deque."
      }
    ],
    marginNotes: [
      "Name the operation you do MOST, then pick the structure that makes it cheap. Lookup → hash map; order → sorted array/tree; ends → deque; priority → heap.",
      "A hash map has no order. If you need sorted iteration, use a sorted array or a balanced tree (TreeMap/TreeSet), not a hash map.",
      "Arrays beat linked lists for almost everything in practice because of cache locality — only use a linked list when you insert/delete in the MIDDLE constantly AND can't index.",
      "Heaps give O(log n) insert/extract and O(1) peek-min — perfect for 'top k' and priority scheduling, but they don't support arbitrary lookup."
    ],
    commonMistakes: [
      "Using a list for membership tests (O(n)) when a set would be O(1).",
      "Expecting a hash map to keep order — it doesn't. Use a sorted structure if order matters.",
      "Using a linked list where an array/deque would be faster due to cache locality."
    ],
    relatedTopics: ["Arrays vs Linked Lists", "Hash Tables", "Heaps & Priority Queues"],
    externalLinks: [
      { label: "Big-O Cheat Sheet (data structures)", url: "https://www.bigocheatsheet.com/" },
      { label: "Python collections — Time Complexity", url: "https://wiki.python.org/moin/TimeComplexity" }
    ],
    mcqs: [
      {
        question: "Which structure gives O(1) key lookup but no ordering?",
        options: ["Sorted array", "Hash map / hash set", "Linked list", "Heap"],
        answer: 1,
        explanations: ["A sorted array gives O(log n) lookup and IS ordered.", "Correct — a hash map/set gives O(1) average lookup/membership but does not keep elements in order.", "A linked list is O(n) lookup.", "A heap is O(n) arbitrary lookup (O(1) only for the min)."],
        difficulty: "easy"
      },
      {
        question: "You need 'the k largest elements' from a stream. Best structure?",
        options: ["A sorted array", "A min-heap of size k", "A hash set", "A linked list"],
        answer: 1,
        explanations: ["A sorted array needs O(n log n) sort and doesn't handle a stream.", "Correct — keep a min-heap of size k: for each element, push then pop the min if size > k. O(n log k) — far better than sorting.", "A set has no order.", "A list is O(n) per insert."],
        difficulty: "hard"
      },
      {
        question: "Why do arrays usually beat linked lists in practice despite equal Big-O?",
        options: ["Arrays use less code", "Cache locality — arrays are contiguous, so sequential access hits CPU cache; linked-list nodes miss", "Linked lists are deprecated", "Arrays are always O(1)"],
        answer: 1,
        explanations: ["Code length is irrelevant.", "Correct — arrays are contiguous in memory, so scanning them hits L1/L2 cache (spatial locality). Linked-list nodes are scattered, each a cache miss — far slower despite the same Big-O.", "They aren't.", "Arrays aren't O(1) for everything."],
        difficulty: "medium"
      }
    ]
  }
];