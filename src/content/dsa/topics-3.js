export default [
  {
    id: "recursion-basics",
    title: "Recursion Fundamentals",
    difficulty: "medium",
    definition: "Recursion is when a function calls itself to solve a smaller instance of the same problem. Every recursive function has two parts: a base case (the smallest input, solved directly) and a recursive case (reduce the input, call self, combine the result). It's the natural way to express problems with self-similar structure — trees, divide-and-conquer, mathematical induction.",
    coreUnderstanding: "Recursion is induction made executable. The base case is the induction anchor; the recursive case is the induction step. The key insight: trust the recursive call to solve the smaller problem correctly — you don't trace every level, you assume it works and focus on combining results. Every recursion can be rewritten as iteration with an explicit stack, but recursion often expresses the structure more clearly. The cost: function call overhead and stack space (each call adds a frame; deep recursion can overflow the stack). Tail recursion (where the recursive call is the last operation) can be optimized to O(1) space by compilers — but Python doesn't do this.",
    howItWorks: "1. IDENTIFY the self-similar substructure: can the problem be split into smaller versions of itself?\n2. BASE CASE: the smallest input where the answer is known directly (factorial(0) = 1, empty tree, single element). Without this, recursion loops forever.\n3. RECURSIVE CASE: reduce the input (n → n-1, array → first + rest, tree → left + right), call self on the smaller input, combine the result.\n4. TRUST THE RECURSION: don't trace every level. Assume the recursive call returns the correct answer for the smaller input; focus on how to combine.\n5. STACK: each call adds a frame (local vars, return address). Deep recursion (n > ~1000 in Python) overflows the stack. Use iteration or tail-call optimization (in languages that support it) for deep cases.\n\nRECURRENCE RELATIONS: T(n) = a·T(n/b) + f(n) — solve with the Master Theorem to get the complexity.",
    codeExamples: [
      {
        lang: "python",
        code: "# Factorial: the canonical recursion example\ndef factorial(n):\n    if n <= 1:        # base case\n        return 1\n    return n * factorial(n - 1)  # recursive case\n\nprint(factorial(5))  # 5 * 4 * 3 * 2 * 1 = 120",
        output: "120",
        note: "Base case (n <= 1) stops the recursion. Without it, factorial(0) calls factorial(-1) forever."
      },
      {
        lang: "python",
        code: "# Fibonacci: naive recursion is O(2^n) — exponential! (overlapping subproblems)\ndef fib_naive(n):\n    if n <= 1: return n\n    return fib_naive(n - 1) + fib_naive(n - 2)  # recomputes fib(2) many times\n\n# Memoized: O(n) — cache results to avoid recomputation\ndef fib_memo(n, memo={}):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)\n    return memo[n]\n\nprint(fib_memo(50))  # 12586269025 — would take forever with naive",
        output: "12586269025",
        note: "Naive fib recomputes the same subproblems exponentially. Memoization (caching) makes it O(n) — this is the bridge to dynamic programming."
      }
    ],
    marginNotes: [
      "Every recursion needs a base case — without it, infinite recursion → stack overflow.",
      "Trust the recursion: don't trace every level. Assume the recursive call works; focus on combining results.",
      "Naive recursion on overlapping subproblems (like fib) is exponential. Memoize to make it polynomial — that's DP.",
      "Python's default recursion limit is ~1000. For deeper recursion, use sys.setrecursionlimit or rewrite iteratively."
    ],
    commonMistakes: [
      "Missing or incorrect base case — infinite recursion, stack overflow.",
      "Not reducing the input in the recursive case — calls itself with the same input, infinite loop.",
      "Using naive recursion on overlapping subproblems (fib) — exponential time. Memoize or use DP.",
      "Deep recursion on large inputs — stack overflow. Convert to iteration with an explicit stack for deep cases."
    ],
    relatedTopics: ["Backtracking", "Dynamic Programming", "Divide and Conquer", "Tree Traversals"],
    externalLinks: [
      { label: "Recursion (Khan Academy)", url: "https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/recursion" },
      { label: "Master Theorem (Wikipedia)", url: "https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)" }
    ],
    mcqs: [
      {
        question: "What are the two essential parts of every recursive function?",
        options: ["A loop and a counter", "A base case and a recursive case", "A parameter and a return value", "A class and a method"],
        answer: 1,
        explanations: ["Loops are iterative, not recursive.", "Correct — base case stops, recursive case reduces and calls self.", "Those are function parts, not recursion-specific.", "OOP is unrelated."],
        difficulty: "easy"
      },
      {
        question: "Why is naive recursive Fibonacci O(2^n)?",
        options: ["Recursion is always exponential", "It recomputes the same subproblems many times (overlapping subproblems)", "The base case is wrong", "Fibonacci is inherently exponential"],
        answer: 1,
        explanations: ["Recursion isn't always exponential — it depends on overlapping subproblems.", "Correct — fib(5) computes fib(3) twice, fib(2) three times, etc. Memoization fixes this.", "The base case is fine.", "Memoized fib is O(n)."],
        difficulty: "medium"
      },
      {
        question: "What is the space complexity of a recursive function with depth d?",
        options: ["O(1)", "O(d) — one stack frame per level", "O(n) where n is input size", "O(2^d)"],
        answer: 1,
        explanations: ["That's iterative space.", "Correct — each recursive call adds a stack frame; depth d means d frames.", "Only if d = n.", "That's the time of a branching recursion, not space."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "backtracking",
    title: "Backtracking",
    difficulty: "hard",
    definition: "Backtracking is a systematic way to search all possible solutions by building a candidate step by step and abandoning ('backtracking') a path as soon as it's clear it can't lead to a valid solution. It's recursion + pruning: try a choice, recurse, undo the choice if it fails. Classic for permutations, combinations, N-Queens, Sudoku, maze solving.",
    coreUnderstanding: "Backtracking is DFS over a decision tree. At each node, you make a choice (place a queen, pick a number, go left/right), recurse, then undo the choice (remove the queen, un-pick the number) so the next branch starts clean. The key optimization is pruning: if a partial candidate already violates a constraint (two queens attack each other), abandon it immediately — don't explore its subtree. Without pruning, backtracking is brute force (exponential); with good pruning, it can be dramatically faster. The art is in choosing what to prune and in what order to try choices.",
    howItWorks: "TEMPLATE:\n```\ndef backtrack(candidate, state):\n    if is_solution(candidate):\n        record(candidate)\n        return\n    for choice in possible_choices(state):\n        if not is_valid(choice, state):   # PRUNE\n            continue\n        make(choice, state)              # apply the choice\n        backtrack(candidate, state)       # recurse\n        undo(choice, state)              # BACKTRACK — undo the choice\n```\n\nKEY ELEMENTS:\n1. is_solution: when is the candidate complete and valid?\n2. possible_choices: what can we try at this step?\n3. is_valid (pruning): can this choice possibly lead to a solution? If not, skip.\n4. make / undo: apply the choice, recurse, then undo it so the next iteration starts clean.\n\nCOMPLEXITY: worst case O(b^d) where b = branching factor, d = depth. Pruning reduces this in practice but not in the worst case.\n\nCLASSIC PROBLEMS: N-Queens (place N queens on an NxN board, none attacking), permutations/combinations, subset sum, Sudoku solver, word search in a grid.",
    codeExamples: [
      {
        lang: "python",
        code: "# Generate all permutations of a list\ndef permutations(arr):\n    result = []\n    def backtrack(path, remaining):\n        if not remaining:                    # base: all used\n            result.append(path[:])           # copy! (path is mutated)\n            return\n        for i in range(len(remaining)):\n            path.append(remaining[i])       # make choice\n            backtrack(path, remaining[:i] + remaining[i+1:])  # recurse without i\n            path.pop()                       # undo choice (backtrack)\n    backtrack([], arr)\n    return result\n\nprint(permutations([1, 2, 3]))",
        output: "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        note: "path[:] copies the list — without the copy, all results would point to the same (eventually empty) path."
      },
      {
        lang: "python",
        code: "# N-Queens: place N queens so none attack each other\ndef n_queens(n):\n    solutions = []\n    def backtrack(row, cols, diag1, diag2, placement):\n        if row == n:                        # all queens placed\n            solutions.append(placement[:])\n            return\n        for col in range(n):\n            if col in cols or (row - col) in diag1 or (row + col) in diag2:\n                continue                     # PRUNE: attacked position\n            cols.add(col); diag1.add(row - col); diag2.add(row + col)\n            placement.append(col)\n            backtrack(row + 1, cols, diag1, diag2, placement)\n            placement.pop()                  # undo\n            cols.discard(col); diag1.discard(row - col); diag2.discard(row + col)\n    backtrack(0, set(), set(), set(), [])\n    return solutions\n\nprint(len(n_queens(8)))  # 92 solutions for 8-queens",
        output: "92",
        note: "Sets track attacked columns and diagonals — O(1) prune check instead of scanning the board each time."
      }
    ],
    marginNotes: [
      "Always COPY the candidate when recording a solution (path[:]) — the path is mutated during backtracking and ends empty.",
      "Pruning is everything — N-Queens without diagonal checks explores 8^8 = 16M boards; with pruning, ~2000. Order choices to fail fast.",
      "The undo step is the namesake — without it, choices leak into sibling branches and corrupt results.",
      "Backtracking = DFS + undo. If you don't undo, it's just DFS (and your state is wrong for the next branch)."
    ],
    commonMistakes: [
      "Forgetting to undo the choice after recursing — state leaks into sibling branches, corrupting results.",
      "Recording a reference to the mutable candidate instead of a copy — all recorded solutions end up identical (and empty).",
      "Not pruning — exploring obviously invalid branches makes it pure brute force (exponential with no reduction).",
      "Using a list instead of a set for membership checks (cols in list is O(n); cols in set is O(1)) — slows pruning."
    ],
    relatedTopics: ["Recursion Fundamentals", "Dynamic Programming", "DFS", "N-Queens"],
    externalLinks: [
      { label: "Backtracking (Wikipedia)", url: "https://en.wikipedia.org/wiki/Backtracking" },
      { label: "Backtracking (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/backtracking-algorithms/" }
    ],
    mcqs: [
      {
        question: "What is the 'backtrack' step in backtracking?",
        options: ["Starting over from the beginning", "Undoing a choice after recursing, so the next branch starts clean", "Skipping invalid choices", "Recording the solution"],
        answer: 1,
        explanations: ["That's restarting, not backtracking.", "Correct — make, recurse, undo. The undo lets the next iteration try a different choice.", "That's pruning.", "That's the base case."],
        difficulty: "medium"
      },
      {
        question: "Why must you copy the candidate (path[:]) when recording a solution?",
        options: ["To improve performance", "The path is mutated during backtracking and ends empty — a reference would show the final (empty) state", "To sort the solution", "To reduce memory"],
        answer: 1,
        explanations: ["Copying adds work, not speed.", "Correct — without the copy, all recorded solutions point to the same list, which ends up empty.", "No sorting involved.", "Copying uses more memory."],
        difficulty: "medium"
      },
      {
        question: "What does pruning achieve in backtracking?",
        options: ["Guarantees a solution exists", "Abandons branches that can't lead to a solution, reducing the search space", "Makes it iterative", "Sorts the results"],
        answer: 1,
        explanations: ["Pruning doesn't guarantee a solution.", "Correct — skip invalid choices early; the tree is still exponential in the worst case but much smaller in practice.", "Backtracking is recursive.", "No sorting."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "linked-list-basics",
    title: "Linked List Fundamentals",
    difficulty: "medium",
    definition: "A linked list is a linear data structure where each node stores a value and a pointer to the next node. Unlike arrays, nodes aren't contiguous in memory — so insertion/deletion at a known position is O(1), but random access by index is O(n) (you must walk from the head). Variants: singly linked, doubly linked (prev pointer too), circular (tail points to head).",
    coreUnderstanding: "The array vs linked list trade-off is the foundational data structure decision: arrays give O(1) random access but O(n) insertion/deletion in the middle (shifting elements); linked lists give O(1) insertion/deletion at a known node (just rewire pointers) but O(n) access by index (walk the list). Linked lists also have no fixed capacity (grow dynamically) and no memory waste from over-allocation. The cost: extra memory per node (the pointer) and poor cache locality (nodes are scattered, not contiguous). In practice, arrays (and array lists) are faster for most use cases due to cache effects — linked lists win when you insert/delete frequently at known positions and rarely access by index.",
    howItWorks: "NODE: { value, next } (singly) or { value, next, prev } (doubly).\n\nCORE OPERATIONS (singly linked, head pointer):\n• Access i-th: walk from head, i steps. O(n).\n• Insert at head: new.next = head; head = new. O(1).\n• Insert at tail: walk to tail (O(n) unless you keep a tail pointer), then append. O(1) with tail pointer.\n• Insert after node X: new.next = X.next; X.next = new. O(1).\n• Delete node X: find predecessor P (O(n)), then P.next = X.next. O(1) if you have the predecessor.\n• Search: walk from head, compare each. O(n).\n\nDUMMY HEAD: a sentinel node before the real head simplifies insert/delete at the head — no special case for the first node. A classic trick that removes edge cases.\n\nCYCLE: if a node's next points to an earlier node, the list has a cycle. Detect with Floyd's fast/slow pointers (O(n), O(1)).",
    codeExamples: [
      {
        lang: "python",
        code: "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\n# Build: 1 -> 2 -> 3 -> None\nhead = Node(1, Node(2, Node(3)))\n\n# Traverse\ndef print_list(h):\n    cur = h\n    while cur:\n        print(cur.val, end=' -> ')\n        cur = cur.next\n    print('None')\n\nprint_list(head)\n\n# Insert at head (O(1))\nhead = Node(0, head)\nprint_list(head)  # 0 -> 1 -> 2 -> 3 -> None",
        output: "1 -> 2 -> 3 -> None\n0 -> 1 -> 2 -> 3 -> None",
        note: "Insert at head is O(1) — just rewire the new node's next to the old head. No shifting needed (unlike arrays)."
      },
      {
        lang: "python",
        code: "# Reverse a linked list (iterative, O(n), O(1) space)\ndef reverse(head):\n    prev = None\n    cur = head\n    while cur:\n        nxt = cur.next    # save next\n        cur.next = prev   # reverse the pointer\n        prev = cur         # advance prev\n        cur = nxt          # advance cur\n    return prev            # new head (old tail)\n\nhead = Node(1, Node(2, Node(3)))\nprint_list(reverse(head))  # 3 -> 2 -> 1 -> None",
        output: "3 -> 2 -> 1 -> None",
        note: "The classic: save next, reverse pointer, advance both. prev starts as None (the new tail's next)."
      }
    ],
    marginNotes: [
      "O(1) insert/delete at a KNOWN node — but finding the node is O(n). The 'known node' caveat is crucial.",
      "Dummy head (sentinel) removes the special case for inserting/deleting at the head — fewer bugs, cleaner code.",
      "Poor cache locality — nodes are scattered in memory, so traversal causes cache misses. Arrays are cache-friendly; lists aren't.",
      "Doubly linked lists allow O(1) delete given the node itself (you have the predecessor via prev). Singly needs the predecessor."
    ],
    commonMistakes: [
      "Losing the head pointer — if you reassign head without saving the old head, you lose the list. Always save before rewiring.",
      "Forgetting to save `next` before reversing a pointer — once you set cur.next = prev, you've lost the rest of the list.",
      "Not handling the empty list (head = None) or single-node list — common edge cases that cause NoneType errors.",
      "Assuming O(1) access by index — it's O(n). If you need random access, use an array, not a linked list."
    ],
    relatedTopics: ["Fast & Slow Pointers", "Stack", "Queue", "Two Pointers"],
    externalLinks: [
      { label: "Linked List (Wikipedia)", url: "https://en.wikipedia.org/wiki/Linked_list" },
      { label: "Linked List (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/data-structures/linked-list/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of inserting at the head of a singly linked list?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
        answer: 1,
        explanations: ["That's inserting at the tail without a tail pointer.", "Correct — just rewire the new node's next to the old head, O(1).", "No binary search.", "No sorting."],
        difficulty: "easy"
      },
      {
        question: "What is the time complexity of accessing the i-th element of a linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(i log i)"],
        answer: 1,
        explanations: ["That's array access.", "Correct — you must walk from the head, i steps. No random access.", "No binary search (not sorted/indexed).", "No such complexity."],
        difficulty: "easy"
      },
      {
        question: "What does a dummy head (sentinel) node achieve?",
        options: ["Speeds up traversal", "Removes the special case for inserting/deleting at the head", "Detects cycles", "Sorts the list"],
        answer: 1,
        explanations: ["Same speed.", "Correct — the dummy is always before the real head, so head operations become 'middle' operations with a predecessor.", "That's Floyd's algorithm.", "No sorting."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "fast-slow-pointers",
    title: "Fast & Slow Pointers (Floyd's)",
    difficulty: "medium",
    definition: "Fast & Slow Pointers (Floyd's Tortoise and Hare) uses two pointers moving at different speeds — slow moves 1 step, fast moves 2 steps. If there's a cycle, fast eventually laps slow (they meet). If no cycle, fast reaches the end. It detects cycles and finds the middle of a list in O(n) time, O(1) space — no hash set needed.",
    coreUnderstanding: "On a straight path, fast pulls ahead and reaches the end. On a cycle, fast enters the loop and keeps lapping; since fast gains one step per move on slow, they must meet within one lap of slow entering the cycle. The meeting proves a cycle exists. To find the cycle's START: after they meet, reset one pointer to the head and move both at the same speed — they meet at the cycle start (a beautiful proof by distance algebra). To find the MIDDLE: when fast reaches the end, slow is at the middle. All in O(n) time and O(1) space — the hash-set alternative uses O(n) space.",
    howItWorks: "CYCLE DETECTION:\n1. slow = head, fast = head.\n2. While fast and fast.next exist:\n   - slow = slow.next (1 step)\n   - fast = fast.next.next (2 steps)\n   - If slow == fast: cycle exists.\n3. If fast reaches None: no cycle.\n\nFIND CYCLE START (after detection):\n1. Reset slow = head (keep fast at meeting point).\n2. Move both 1 step at a time.\n3. They meet at the cycle's start node.\n(Proof: distance from head to cycle start = distance from meeting point to cycle start, modulo the cycle length.)\n\nFIND MIDDLE (no cycle):\n1. slow = fast = head.\n2. Move slow 1, fast 2 until fast reaches the end.\n3. slow is at the middle (for odd length) or the start of the second half (for even length).",
    codeExamples: [
      {
        lang: "python",
        code: "class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\n# Detect cycle — Floyd's Tortoise and Hare\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False\n\n# Build: 1 -> 2 -> 3 -> 4 -> 2 (cycle back to node 2)\nn2 = Node(2); n3 = Node(3); n4 = Node(4)\nn2.next = n3; n3.next = n4; n4.next = n2  # cycle\nhead = Node(1, n2)\nprint(has_cycle(head))  # True",
        output: "True",
        note: "Fast gains 1 step per move on slow — they must meet within one lap of slow entering the cycle."
      },
      {
        lang: "python",
        code: "# Find the middle of a list (no cycle)\ndef middle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow  # slow is at the middle\n\nhead = Node(1, Node(2, Node(3, Node(4, Node(5)))))\nprint(middle(head).val)  # 3 (middle of 5 elements)",
        output: "3",
        note: "Fast moves 2x, so when fast hits the end, slow has moved half — it's at the middle."
      }
    ],
    marginNotes: [
      "O(1) space — the key advantage over the hash-set approach (which uses O(n) space to store visited nodes).",
      "Finding the cycle start: after they meet, reset one to head, move both at 1x — they meet at the cycle entry. Pure algebra.",
      "For the middle: fast moves 2x, so slow is at n/2 when fast reaches the end. For even length, slow is at the start of the second half.",
      "The 'gain 1 step per move' insight is why they must meet — fast can't skip over slow in a cycle (it approaches by 1 each step)."
    ],
    commonMistakes: [
      "Checking `slow == fast` before moving — they start at the same node, so it'd always return true. Move first, then compare.",
      "Not checking `fast and fast.next` — fast.next.next on a None or last node crashes. Guard the loop condition.",
      "Forgetting to reset slow to head when finding the cycle start — both must move at 1x from their respective positions.",
      "Using fast = fast.next (same speed) — that's just two pointers, not fast/slow. Fast must move 2 steps."
    ],
    relatedTopics: ["Linked List Fundamentals", "Two Pointers", "Hash Tables", "Cycle Detection"],
    externalLinks: [
      { label: "Cycle Detection (Wikipedia)", url: "https://en.wikipedia.org/wiki/Cycle_detection" },
      { label: "Floyd's Algorithm (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/" }
    ],
    mcqs: [
      {
        question: "What is the space complexity of Floyd's cycle detection?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
        answer: 1,
        explanations: ["That's the hash-set approach.", "Correct — only two pointers, no extra storage.", "No binary search.", "No sorting."],
        difficulty: "easy"
      },
      {
        question: "After detecting a cycle (slow meets fast), how do you find the cycle's start node?",
        options: ["Move both at 2x until they meet again", "Reset one pointer to head, move both at 1x — they meet at the cycle start", "Use a hash set", "Reverse the list"],
        answer: 1,
        explanations: ["That doesn't find the start.", "Correct — a distance-algebra proof shows they meet at the cycle entry.", "That works but uses O(n) space — defeats the purpose.", "Reversing a cyclic list is problematic."],
        difficulty: "hard"
      },
      {
        question: "Why must fast move 2 steps and slow 1 step (not both at 1 step)?",
        options: ["It's faster", "Fast gains 1 step per move, guaranteeing they meet in a cycle; same speed would never close the gap", "It uses less memory", "It's required for the middle-finding variant"],
        answer: 1,
        explanations: ["Speed of detection isn't the reason.", "Correct — the speed difference is what guarantees a meeting in a cycle.", "Same memory.", "Middle-finding works with any 2:1 ratio, but the reason is cycle detection."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "stack-basics",
    title: "Stack Fundamentals",
    difficulty: "easy",
    definition: "A stack is a Last-In-First-Out (LIFO) data structure: you push and pop from the same end (the top). Think of a stack of plates — you add and remove from the top. Operations (push, pop, peek, isEmpty) are all O(1). It's the backbone of function call management, undo/redo, expression evaluation, and DFS.",
    coreUnderstanding: "LIFO order is natural for problems where the most recent item matters first: function call frames (the call stack), undo history (undo the last action first), bracket matching (the last opened bracket must close first), and DFS (explore the most recently discovered node first). A stack can be implemented with an array (push/pop at the end, O(1)) or a linked list (push/pop at the head, O(1)). The array version is cache-friendly and usually preferred. The call stack in every programming language is literally a stack data structure.",
    howItWorks: "OPERATIONS (all O(1)):\n• push(x): add x to the top.\n• pop(): remove and return the top.\n• peek() / top(): look at the top without removing.\n• is_empty(): check if the stack has no elements.\n\nIMPLEMENTATION:\n• Array (dynamic): push = append, pop = remove last. O(1) amortized. Cache-friendly. The default choice.\n• Linked list: push = insert at head, pop = remove head. O(1). No resizing cost but poor cache locality.\n\nCLASSIC APPLICATIONS:\n1. Function call stack: each call pushes a frame; return pops it. Recursion = implicit stack use.\n2. Bracket matching: push opening brackets; on a closing bracket, check the top matches. Unmatched = invalid.\n3. Undo/redo: push each state; undo pops and pushes to a redo stack.\n4. Expression evaluation: convert infix to postfix (Shunting Yard), then evaluate postfix with a stack.\n5. DFS: an explicit stack replaces recursion — push neighbors, pop to visit.\n6. Monotonic stack: maintain a sorted stack for 'next greater element' problems.",
    codeExamples: [
      {
        lang: "python",
        code: "# Valid parentheses — the classic stack problem\ndef is_valid(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)          # push opening\n        else:  # closing bracket\n            if not stack or stack[-1] != pairs[ch]:\n                return False           # unmatched or wrong type\n            stack.pop()               # matched, remove the opener\n    return len(stack) == 0            # all openers must be closed\n\nprint(is_valid('()[]{}'))   # True\nprint(is_valid('([)]'))     # False — wrong nesting order",
        output: "True\nFalse",
        note: "The last opened bracket must close first — that's LIFO, so a stack is the natural fit."
      },
      {
        lang: "python",
        code: "# Evaluate postfix (Reverse Polish Notation)\ndef eval_postfix(tokens):\n    stack = []\n    for t in tokens:\n        if t in '+-*/':\n            b = stack.pop()            # second operand (popped first!)\n            a = stack.pop()            # first operand\n            if t == '+': stack.append(a + b)\n            elif t == '-': stack.append(a - b)\n            elif t == '*': stack.append(a * b)\n            elif t == '/': stack.append(int(a / b))\n        else:\n            stack.append(int(t))     # push operand\n    return stack[0]\n\nprint(eval_postfix(['2', '1', '+', '3', '*']))  # (2+1)*3 = 9",
        output: "9",
        note: "Postfix needs no parentheses — the stack order encodes precedence. Pop b first, then a (order matters for - and /)."
      }
    ],
    marginNotes: [
      "LIFO = 'last in, first out.' If the problem says 'most recent first' or 'reverse the order,' think stack.",
      "The call stack IS a stack — recursion uses it implicitly. Deep recursion = deep stack = potential overflow.",
      "Bracket matching is the canonical stack problem: push openers, match closers against the top.",
      "Postfix (RPN) evaluation: push operands; on an operator, pop two, compute, push back. No precedence rules needed."
    ],
    commonMistakes: [
      "Popping from an empty stack — always check is_empty or use a try/except. Stack underflow is a classic bug.",
      "In postfix evaluation, popping b then a but computing a - b as b - a — order matters for non-commutative operators.",
      "Forgetting to check that the stack is empty at the end of bracket matching — leftover openers mean unbalanced.",
      "Using a stack where a queue is needed (BFS) — LIFO vs FIFO gives the wrong traversal order."
    ],
    relatedTopics: ["Queue", "Recursion Fundamentals", "DFS", "Monotonic Stack"],
    externalLinks: [
      { label: "Stack (Wikipedia)", url: "https://en.wikipedia.org/wiki/Stack_(abstract_data_type)" },
      { label: "Valid Parentheses (LeetCode 20)", url: "https://leetcode.com/problems/valid-parentheses/" }
    ],
    mcqs: [
      {
        question: "What order does a stack follow?",
        options: ["FIFO (First-In-First-Out)", "LIFO (Last-In-First-Out)", "Random", "Sorted"],
        answer: 1,
        explanations: ["That's a queue.", "Correct — the last element pushed is the first popped.", "No.", "Stacks aren't inherently sorted."],
        difficulty: "easy"
      },
      {
        question: "Which problem is a natural fit for a stack?",
        options: ["Breadth-first search", "Bracket matching (last opened must close first)", "Finding the shortest path in an unweighted graph", "Level-order traversal"],
        answer: 1,
        explanations: ["BFS uses a queue.", "Correct — LIFO matches 'last opened, first closed.'", "BFS (queue).", "Level-order is BFS (queue)."],
        difficulty: "easy"
      },
      {
        question: "In postfix evaluation, when you pop two operands for a '-', which is the first operand?",
        options: ["The first popped", "The second popped (popped first, pushed earlier)", "Either order works", "The top of the stack after the operation"],
        answer: 1,
        explanations: ["That's the second operand.", "Correct — pop b (second), then a (first); compute a - b. The earlier-pushed value is the first operand.", "Order matters for - and /.", "Irrelevant."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "queue-basics",
    title: "Queue Fundamentals",
    difficulty: "easy",
    definition: "A queue is a First-In-First-Out (FIFO) data structure: you add at the back (enqueue) and remove from the front (dequeue). Think of a line at a store — first person in line is first served. Operations (enqueue, dequeue, front, isEmpty) are all O(1). It's the backbone of BFS, scheduling, and buffering.",
    coreUnderstanding: "FIFO order is natural for problems where fairness or order-preservation matters: BFS (explore nodes in the order discovered), task scheduling (first submitted, first executed), print spooling, message buffers. A naive array implementation (shifting on dequeue) is O(n) per dequeue; a circular buffer (ring buffer) or linked list makes all operations O(1). A deque (double-ended queue) allows O(1) insert/remove at both ends — more flexible and the basis for sliding-window-maximum algorithms.",
    howItWorks: "OPERATIONS (all O(1) with a good implementation):\n• enqueue(x) / push: add x to the back.\n• dequeue() / pop: remove and return the front.\n• front() / peek: look at the front without removing.\n• is_empty(): check if the queue has no elements.\n\nIMPLEMENTATION:\n• Circular buffer (ring buffer): an array with front and rear indices that wrap around. O(1) enqueue/dequeue, no shifting. The standard efficient implementation.\n• Linked list: enqueue at tail (with a tail pointer), dequeue at head. O(1). No capacity limit.\n• Two stacks: enqueue = push to stack1; dequeue = if stack2 empty, pop all from stack1 to stack2, then pop stack2. Amortized O(1). (A clever trick.)\n\nVARIANTS:\n• Deque: O(1) at both ends. Used for sliding window maximum (monotonic deque).\n• Priority queue: dequeue returns the highest-priority element, not the oldest. Implemented with a heap. O(log n) per op.\n• Circular queue: fixed-size ring buffer — overwrites old data when full (useful in streaming/buffers).",
    codeExamples: [
      {
        lang: "python",
        code: "from collections import deque\n\n# BFS using a queue — the canonical queue application\ndef bfs(graph, start):\n    visited = {start}\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()       # dequeue from front (O(1))\n        order.append(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)  # enqueue at back (O(1))\n    return order\n\ngraph = {0: [1, 2], 1: [3], 2: [3], 3: []}\nprint(bfs(graph, 0))  # [0, 1, 2, 3]",
        output: "[0, 1, 2, 3]",
        note: "deque.popleft() is O(1); list.pop(0) is O(n) (shifts all elements). Always use deque for queues in Python."
      },
      {
        lang: "python",
        code: "# Two-stack queue (amortized O(1) per op)\nclass QueueViaStacks:\n    def __init__(self):\n        self.in_stack = []   # for enqueue\n        self.out_stack = []  # for dequeue\n\n    def enqueue(self, x):\n        self.in_stack.append(x)\n\n    def dequeue(self):\n        if not self.out_stack:\n            while self.in_stack:              # transfer all to out\n                self.out_stack.append(self.in_stack.pop())\n        if not self.out_stack:\n            raise IndexError('empty queue')\n        return self.out_stack.pop()\n\nq = QueueViaStacks()\nfor x in [1, 2, 3]: q.enqueue(x)\nprint(q.dequeue(), q.dequeue())  # 1, 2 (FIFO order)",
        output: "1 2",
        note: "Each element is moved once from in to out — amortized O(1) per dequeue, even though a single dequeue can be O(n)."
      }
    ],
    marginNotes: [
      "FIFO = 'first in, first out.' If the problem says 'in order of arrival' or 'level by level,' think queue.",
      "Python: use collections.deque, NOT list. list.pop(0) is O(n); deque.popleft() is O(1).",
      "BFS is THE queue application — explore nodes in the order they're discovered, level by level.",
      "A priority queue (heap) is NOT FIFO — it returns the highest-priority element, not the oldest. Different structure."
    ],
    commonMistakes: [
      "Using list.pop(0) in Python — O(n) per dequeue (shifts all elements). Use deque.popleft() for O(1).",
      "Confusing FIFO (queue) with LIFO (stack) — using the wrong one gives the wrong traversal order (BFS vs DFS).",
      "Not marking nodes as visited when enqueuing (instead of when dequeuing) — can enqueue the same node multiple times.",
      "Using a priority queue when a plain queue is needed — priority queues reorder by priority, not arrival time."
    ],
    relatedTopics: ["Stack", "BFS", "Monotonic Stack", "Priority Queue"],
    externalLinks: [
      { label: "Queue (Wikipedia)", url: "https://en.wikipedia.org/wiki/Queue_(abstract_data_type)" },
      { label: "Python collections.deque", url: "https://docs.python.org/3/library/collections.html#collections.deque" }
    ],
    mcqs: [
      {
        question: "What order does a queue follow?",
        options: ["LIFO (Last-In-First-Out)", "FIFO (First-In-First-Out)", "Random", "Sorted by priority"],
        answer: 1,
        explanations: ["That's a stack.", "Correct — the first element enqueued is the first dequeued.", "No.", "That's a priority queue."],
        difficulty: "easy"
      },
      {
        question: "Why is list.pop(0) O(n) in Python but deque.popleft() is O(1)?",
        options: ["deque is implemented in C", "list.pop(0) shifts all remaining elements left; deque uses a linked block structure with O(1) front removal", "list is slower in general", "deque caches the front element"],
        answer: 1,
        explanations: ["Both are in C, but the data structure matters.", "Correct — list is contiguous (shift on front removal); deque is a doubly-linked block list (O(1) at both ends).", "list is fast for end operations.", "No caching."],
        difficulty: "medium"
      },
      {
        question: "Which traversal uses a queue?",
        options: ["DFS (depth-first)", "BFS (breadth-first)", "In-order tree traversal", "Binary search"],
        answer: 1,
        explanations: ["DFS uses a stack (or recursion).", "Correct — BFS explores level by level, FIFO order.", "In-order is DFS (recursion/stack).", "Binary search doesn't traverse."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "monotonic-stack",
    title: "Monotonic Stack",
    difficulty: "hard",
    definition: "A monotonic stack is a stack that maintains its elements in sorted order (increasing or decreasing). When a new element would break the order, you pop elements until the order is restored — and each pop reveals a relationship (e.g., 'this is the next greater element for the popped one'). It solves 'next greater/smaller element' problems in O(n) instead of O(n²).",
    coreUnderstanding: "The brute force for 'next greater element' is O(n²) — for each element, scan right until you find a bigger one. The monotonic stack observes: when you process elements left to right and maintain a decreasing stack, the moment a new element is bigger than the stack's top, that new element IS the next greater for the popped element (and all elements it pops). Each element is pushed and popped at most once, so the total work is O(n) despite the nested-looking while loop. The stack's monotonicity is the invariant that makes it work.",
    howItWorks: "NEXT GREATER ELEMENT (the canonical problem):\n1. Initialize an empty stack (stores indices) and a result array filled with -1.\n2. For each element from left to right:\n   - While the stack is non-empty AND arr[stack.top] < arr[i]:\n     - Pop idx. result[idx] = arr[i]  (arr[i] is the next greater for arr[idx]).\n   - Push i onto the stack.\n3. Elements left on the stack have no next greater (result stays -1).\n\nWHY O(n): each index is pushed once and popped at most once. The while loop's total iterations across the entire algorithm is ≤ n, not n².\n\nVARIANTS:\n• Next greater → decreasing stack (pop while top < current).\n• Next smaller → increasing stack (pop while top > current).\n• Previous greater → process right to left, or scan left to right and the stack top is the previous greater.\n• Largest rectangle in histogram → increasing stack; pop when a shorter bar arrives, compute area with the popped height.\n• Sliding window maximum → monotonic deque (not stack), maintaining the max at the front.",
    codeExamples: [
      {
        lang: "python",
        code: "# Next Greater Element — O(n) with a monotonic decreasing stack\ndef next_greater(arr):\n    n = len(arr)\n    result = [-1] * n\n    stack = []  # stores indices, values decreasing from bottom to top\n    for i in range(n):\n        while stack and arr[stack[-1]] < arr[i]:\n            idx = stack.pop()\n            result[idx] = arr[i]   # arr[i] is the next greater for arr[idx]\n        stack.append(i)\n    return result\n\nprint(next_greater([4, 5, 2, 10, 8]))\n# For 4 -> 5, for 5 -> 10, for 2 -> 10, for 10 -> -1, for 8 -> -1",
        output: "[5, 10, 10, -1, -1]",
        note: "Each index is pushed and popped at most once — the while loop's total iterations across all i is O(n), not O(n²)."
      },
      {
        lang: "python",
        code: "# Largest Rectangle in Histogram — increasing stack\ndef largest_rectangle(heights):\n    stack = []  # increasing heights; stores indices\n    max_area = 0\n    for i, h in enumerate(heights + [0]):  # append 0 to flush the stack\n        while stack and heights[stack[-1]] > h:\n            height = heights[stack.pop()]\n            width = i if not stack else i - stack[-1] - 1\n            max_area = max(max_area, height * width)\n        stack.append(i)\n    return max_area\n\nprint(largest_rectangle([2, 1, 5, 6, 2, 3]))  # 10 (bars 5,6 -> height 5, width 2)",
        output: "10",
        note: "Appending 0 forces the stack to fully flush at the end — a clean trick to avoid post-loop cleanup."
      }
    ],
    marginNotes: [
      "The while loop looks O(n²) but isn't — each element is pushed and popped at most once, so total pops ≤ n. Amortized O(n).",
      "Store INDICES, not values — you need the index to compute the result position and (for histogram) the width.",
      "Decreasing stack for 'next greater'; increasing stack for 'next smaller.' The pop condition is the opposite of the order you maintain.",
      "Appending a sentinel (0 for histogram, -∞ for next greater) flushes the stack at the end — avoids a separate cleanup loop."
    ],
    commonMistakes: [
      "Storing values instead of indices — you can't write the result or compute widths without the index.",
      "Using the wrong monotonicity — decreasing stack for 'next smaller' (should be increasing). The pop condition is the opposite.",
      "Thinking the while loop makes it O(n²) — it's amortized O(n) because each element is popped at most once.",
      "Forgetting to flush the stack at the end — use a sentinel or a post-loop while to process remaining elements."
    ],
    relatedTopics: ["Stack", "Sliding Window", "Two Pointers", "Next Greater Element"],
    externalLinks: [
      { label: "Monotonic Stack (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/next-greater-element/" },
      { label: "Largest Rectangle in Histogram (LeetCode 84)", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of the next-greater-element algorithm with a monotonic stack?",
        options: ["O(n²)", "O(n)", "O(n log n)", "O(1)"],
        answer: 1,
        explanations: ["That's the brute force.", "Correct — each element is pushed and popped at most once; the while loop's total iterations ≤ n.", "No sorting.", "Impossible — you must scan the array."],
        difficulty: "medium"
      },
      {
        question: "For 'next greater element,' what monotonicity should the stack maintain?",
        options: ["Increasing (bottom to top)", "Decreasing (bottom to top)", "Unsorted", "Strictly increasing"],
        answer: 1,
        explanations: ["That's for 'next smaller.'", "Correct — pop while top < current; the stack holds elements waiting for their next greater, in decreasing order.", "A monotonic stack is sorted by definition.", "Non-strict decreasing is fine (equals don't trigger a pop)."],
        difficulty: "hard"
      },
      {
        question: "Why store indices instead of values in the stack?",
        options: ["Indices are smaller", "You need the index to write the result and compute widths", "Values can be negative", "Indices sort faster"],
        answer: 1,
        explanations: ["Size is irrelevant.", "Correct — without the index, you can't place the result or compute the rectangle width.", "Both can be negative.", "No sorting involved."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "binary-trees",
    title: "Binary Tree Fundamentals",
    difficulty: "medium",
    definition: "A binary tree is a hierarchical structure where each node has at most two children (left and right). It's the foundation of BSTs, heaps, expression trees, and segment trees. Key terms: root (top), leaf (no children), depth (edges from root), height (edges to deepest leaf). A balanced tree has height O(log n); a degenerate (linked-list-like) tree has height O(n).",
    coreUnderstanding: "Trees model hierarchy and enable O(log n) operations when balanced — the height determines performance. A binary tree's power comes from branching: each level doubles the capacity, so a balanced tree of height h holds up to 2^h - 1 nodes, and a tree of n nodes has height log₂(n) when balanced. The danger: an unbalanced tree (e.g., inserting sorted data into a naive BST) degenerates into a linked list — height O(n), all operations O(n). Self-balancing trees (AVL, Red-Black) fix this by rotating on insert/delete to keep height O(log n).",
    howItWorks: "NODE: { value, left, right }.\n\nKEY METRICS:\n• Depth of a node: edges from the root. Root has depth 0.\n• Height of a node: edges to the deepest leaf in its subtree. Leaf has height 0.\n• Height of the tree: height of the root.\n• A perfect binary tree (all levels full) of height h has 2^(h+1) - 1 nodes.\n• A balanced tree of n nodes has height ~log₂(n); a degenerate tree has height n-1.\n\nTRAVERSALS:\n• In-order (left, root, right): visits BST nodes in sorted order.\n• Pre-order (root, left, right): root first — good for copying or serializing a tree.\n• Post-order (left, right, root): children first — good for deleting or evaluating expression trees.\n• Level-order (BFS): level by level, using a queue.\n\nTYPES:\n• Full: every node has 0 or 2 children.\n• Complete: all levels full except possibly the last, filled left to right (heap property).\n• Perfect: all internal nodes have 2 children, all leaves at the same depth.\n• Balanced: height O(log n) — AVL, Red-Black trees maintain this automatically.",
    codeExamples: [
      {
        lang: "python",
        code: "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n# In-order traversal (recursive)\ndef inorder(node, result):\n    if node:\n        inorder(node.left, result)\n        result.append(node.val)   # visit after left, before right\n        inorder(node.right, result)\n\n# Build:     1\n#          /   \\\n#         2     3\n#        / \\\n#       4   5\nroot = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nres = []\ninorder(root, res)\nprint(res)  # [4, 2, 5, 1, 3]",
        output: "[4, 2, 5, 1, 3]",
        note: "In-order on a BST gives sorted order. The recursion mirrors the tree structure exactly."
      },
      {
        lang: "python",
        code: "# Level-order traversal (BFS with a queue)\nfrom collections import deque\n\ndef level_order(root):\n    if not root: return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        result.append(node.val)\n        if node.left:  queue.append(node.left)\n        if node.right: queue.append(node.right)\n    return result\n\nprint(level_order(root))  # [1, 2, 3, 4, 5]",
        output: "[1, 2, 3, 4, 5]",
        note: "Level-order visits level by level, left to right — the queue ensures FIFO order."
      }
    ],
    marginNotes: [
      "Height determines performance — balanced = O(log n), degenerate = O(n). Self-balancing trees (AVL, Red-Black) keep height O(log n).",
      "In-order traversal of a BST gives sorted order — this is the defining property that makes BSTs useful.",
      "Post-order is for bottom-up processing (delete, evaluate expressions); pre-order is for top-down (copy, serialize).",
      "A complete binary tree can be stored in an array (index i, children at 2i+1, 2i+2) — no pointers needed. This is how heaps work."
    ],
    commonMistakes: [
      "Confusing depth (from root) and height (to deepest leaf) — they're measured in opposite directions.",
      "Forgetting the base case (if node is None) in recursive traversals — causes NoneType errors on empty trees.",
      "Assuming a binary tree is balanced — a naive BST can degenerate to O(n) height. Use a self-balancing tree for guarantees.",
      "Using DFS (stack) for level-order — level-order needs BFS (queue). DFS gives depth-first, not level-by-level."
    ],
    relatedTopics: ["BST", "Tree Traversals", "Heap / Priority Queue", "Recursion Fundamentals"],
    externalLinks: [
      { label: "Binary Tree (Wikipedia)", url: "https://en.wikipedia.org/wiki/Binary_tree" },
      { label: "Tree Traversals (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/" }
    ],
    mcqs: [
      {
        question: "What is the height of a balanced binary tree with n nodes?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        answer: 1,
        explanations: ["That's a degenerate (linked-list-like) tree.", "Correct — each level doubles capacity, so log₂(n) levels.", "No such height.", "Only for a single node."],
        difficulty: "easy"
      },
      {
        question: "Which traversal of a BST produces sorted order?",
        options: ["Pre-order", "In-order", "Post-order", "Level-order"],
        answer: 1,
        explanations: ["Root first — not sorted.", "Correct — left (smaller), root, right (larger) = sorted.", "Children first — not sorted.", "Level by level — not sorted."],
        difficulty: "easy"
      },
      {
        question: "What happens when you insert sorted data into a naive BST?",
        options: ["It stays balanced", "It degenerates into a linked list (height O(n))", "It becomes a heap", "It crashes"],
        answer: 1,
        explanations: ["Only with self-balancing.", "Correct — each insert goes to one side, creating a chain. Use AVL/Red-Black to prevent this.", "A heap is a different structure.", "No crash, just bad performance."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "bst-basics",
    title: "Binary Search Tree (BST)",
    difficulty: "medium",
    definition: "A Binary Search Tree is a binary tree where for every node: all keys in the left subtree are smaller, and all keys in the right subtree are larger. This invariant makes search, insert, and delete O(h) where h is the height — O(log n) if balanced, O(n) if degenerate. In-order traversal yields sorted order.",
    coreUnderstanding: "The BST invariant (left < node < right) is what enables binary search on a tree: at each node, go left if the target is smaller, right if larger. This is O(h) — the same logic as binary search on a sorted array, but on a dynamic structure that supports O(h) insert and delete (no shifting). The catch: the invariant doesn't guarantee balance. Inserting sorted data creates a linked list (height n, all ops O(n)). Self-balancing BSTs (AVL, Red-Black) add rotation on insert/delete to maintain height O(log n), guaranteeing O(log n) operations regardless of insertion order.",
    howItWorks: "SEARCH (O(h)):\n1. Start at root. If target == node, found.\n2. If target < node, go left. If target > node, go right.\n3. If you reach None, target not present.\n\nINSERT (O(h)):\n1. Search for the target. When you reach None (where it would be), insert the new node there.\n2. This preserves the BST invariant — the new node lands at its sorted position.\n\nDELETE (O(h)) — three cases:\n1. Leaf: just remove it.\n2. One child: replace the node with its child.\n3. Two children: find the in-order successor (smallest in the right subtree), copy its value, then delete the successor (which has at most one child, reducing to case 1 or 2).\n\nBALANCE: AVL trees track balance factors and rotate on insert/delete. Red-Black trees use color flips and rotations. Both guarantee height O(log n), making all operations O(log n) in the worst case.",
    codeExamples: [
      {
        lang: "python",
        code: "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n    def insert(self, val):\n        self.root = self._insert(self.root, val)\n\n    def _insert(self, node, val):\n        if not node:\n            return TreeNode(val)\n        if val < node.val:\n            node.left = self._insert(node.left, val)\n        elif val > node.val:\n            node.right = self._insert(node.right, val)\n        return node  # duplicates ignored\n\n    def search(self, val):\n        node = self.root\n        while node:\n            if val == node.val: return True\n            node = node.left if val < node.val else node.right\n        return False\n\nbst = BST()\nfor x in [5, 3, 7, 1, 4]: bst.insert(x)\nprint(bst.search(4))  # True\nprint(bst.search(6))  # False",
        output: "True\nFalse",
        note: "Search is O(h) — go left if smaller, right if larger. Balanced → O(log n); degenerate → O(n)."
      }
    ],
    marginNotes: [
      "The BST invariant (left < node < right) is what makes search O(h) — it's binary search on a tree.",
      "Delete with two children: replace with the in-order successor (smallest in right subtree), then delete the successor.",
      "Naive BST can degenerate to O(n) — inserting sorted data creates a linked list. Use AVL/Red-Black for guaranteed O(log n).",
      "In-order traversal of a BST = sorted order. This is the easiest way to validate a BST or extract sorted data."
    ],
    commonMistakes: [
      "Assuming BST operations are O(log n) — they're O(h). A degenerate BST has h = n, so O(n). Balance matters.",
      "Deleting a node with two children by just removing it — you must find the successor (or predecessor) to maintain the invariant.",
      "Allowing duplicate keys without a policy (ignore, count, or go to one side) — undefined behavior on search/delete.",
      "Not validating the BST invariant (left < node < right for ALL descendants, not just immediate children) — a common interview trap."
    ],
    relatedTopics: ["Binary Tree Fundamentals", "Binary Search", "AVL Trees", "Tree Traversals"],
    externalLinks: [
      { label: "Binary Search Tree (Wikipedia)", url: "https://en.wikipedia.org/wiki/Binary_search_tree" },
      { label: "BST (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of BST search, insert, and delete?",
        options: ["O(1)", "O(h) where h is the height", "O(n) always", "O(log n) always"],
        answer: 1,
        explanations: ["Impossible for a dynamic structure.", "Correct — O(log n) if balanced, O(n) if degenerate. Height is the key.", "Only in the degenerate case.", "Only if balanced — not guaranteed by a naive BST."],
        difficulty: "medium"
      },
      {
        question: "How do you delete a node with two children in a BST?",
        options: ["Just remove it", "Replace with the in-order successor (smallest in right subtree), then delete the successor", "Replace with the left child", "You can't delete it"],
        answer: 1,
        explanations: ["That breaks the invariant.", "Correct — the successor has at most one child, reducing to a simpler case.", "That loses the right subtree.", "You can — via the successor."],
        difficulty: "hard"
      },
      {
        question: "What causes a BST to degenerate to O(n) operations?",
        options: ["Too many nodes", "Inserting sorted (or reverse-sorted) data", "Having duplicate keys", "Deep recursion"],
        answer: 1,
        explanations: ["Many nodes with balance is fine.", "Correct — sorted inserts create a chain (linked list), height = n.", "Duplicates can be handled.", "Recursion depth follows height."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "tree-traversals",
    title: "Tree Traversals",
    difficulty: "medium",
    definition: "Tree traversal visits every node in a tree in a specific order. The four main orders: in-order (left, root, right), pre-order (root, left, right), post-order (left, right, root), and level-order / BFS (level by level). Each has a purpose: in-order sorts a BST, pre-order copies/serializes, post-order deletes/evaluates, level-order does breadth-first processing.",
    coreUnderstanding: "The three depth-first traversals (in, pre, post) differ only in WHEN they visit the root relative to the children — the recursive structure is identical. They're all O(n) (visit each node once) and can be implemented recursively (simplest) or iteratively with a stack (avoids stack overflow on deep trees). Level-order (BFS) uses a queue instead of a stack, visiting level by level. The choice of traversal depends on what you need: sorted data (in-order), tree structure (pre-order), bottom-up computation (post-order), or level-by-level (BFS).",
    howItWorks: "DEPTH-FIRST (recursive — mirrors the tree structure):\n• In-order: traverse(left), visit(node), traverse(right). On a BST, yields sorted order.\n• Pre-order: visit(node), traverse(left), traverse(right). Root first — for copying, serializing, prefix expressions.\n• Post-order: traverse(left), traverse(right), visit(node). Children first — for deleting, evaluating, postfix expressions.\n\nDEPTH-FIRST (iterative — uses a stack):\n• Pre-order: push root; while stack: pop, visit, push right, push left (right first so left is processed first).\n• In-order: go left as far as possible, pushing; pop, visit, go right and repeat.\n• Post-order: like pre-order but push left first, then reverse the result (or use a two-stack / visited-flag approach).\n\nBREADTH-FIRST (level-order — uses a queue):\n• Enqueue root; while queue: dequeue, visit, enqueue left, enqueue right. Visits level by level.\n\nMORRIS TRAVERSAL: in-order with O(1) space (no stack, no recursion) by temporarily modifying the tree (threading). Restores the tree afterward. O(n) time, O(1) space — a clever trick for constrained environments.",
    codeExamples: [
      {
        lang: "python",
        code: "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\n# All three DFS traversals — recursive\ndef inorder(node, res):\n    if node:\n        inorder(node.left, res); res.append(node.val); inorder(node.right, res)\n\ndef preorder(node, res):\n    if node:\n        res.append(node.val); preorder(node.left, res); preorder(node.right, res)\n\ndef postorder(node, res):\n    if node:\n        postorder(node.left, res); postorder(node.right, res); res.append(node.val)\n\nroot = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nfor name, fn in [('in', inorder), ('pre', preorder), ('post', postorder)]:\n    r = []; fn(root, r); print(name, r)",
        output: "in [4, 2, 5, 1, 3]\npre [1, 2, 4, 5, 3]\npost [4, 5, 2, 3, 1]",
        note: "Same tree, different orders. In-order: left-root-right. Pre: root-left-right. Post: left-right-root."
      },
      {
        lang: "python",
        code: "# Iterative in-order (stack, no recursion)\ndef inorder_iterative(root):\n    result, stack = [], []\n    node = root\n    while node or stack:\n        while node:              # go left as far as possible\n            stack.append(node)\n            node = node.left\n        node = stack.pop()       # visit\n        result.append(node.val)\n        node = node.right        # go right, repeat\n    return result\n\nprint(inorder_iterative(root))  # [4, 2, 5, 1, 3]",
        output: "[4, 2, 5, 1, 3]",
        note: "The inner while pushes all left children; the pop visits; then we go right. Same order as recursive in-order."
      }
    ],
    marginNotes: [
      "All DFS traversals are O(n) — each node visited once. The order differs only in when the root is visited relative to children.",
      "Iterative traversal avoids stack overflow on deep trees — important for skewed trees where recursion depth = n.",
      "Morris traversal achieves O(1) space in-order by temporarily threading the tree — clever but modifies the tree during traversal.",
      "Level-order (BFS) uses a queue; DFS uses a stack (or recursion). The data structure determines the order."
    ],
    commonMistakes: [
      "Forgetting the base case (if node is None) — causes NoneType errors on empty trees or missing children.",
      "In iterative pre-order, pushing left before right — processes right first (stack is LIFO). Push right, then left.",
      "Confusing the order: in-order (L-R), pre-order (R-L-R... no, root-L-R), post-order (L-R-root). Memorize the root's position.",
      "Using a stack for level-order — level-order is BFS, needs a queue. Stack gives DFS."
    ],
    relatedTopics: ["Binary Tree Fundamentals", "BST", "DFS", "BFS"],
    externalLinks: [
      { label: "Tree Traversal (Wikipedia)", url: "https://en.wikipedia.org/wiki/Tree_traversal" },
      { label: "Morris Traversal (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion-and-without-stack/" }
    ],
    mcqs: [
      {
        question: "Which traversal visits the root BEFORE its children?",
        options: ["In-order", "Pre-order", "Post-order", "Level-order"],
        answer: 1,
        explanations: ["Root is in the middle.", "Correct — pre = root, left, right. Root first.", "Root is last.", "Level-order is BFS, not a root-relative order."],
        difficulty: "easy"
      },
      {
        question: "In iterative pre-order, why do you push the RIGHT child before the LEFT?",
        options: ["Right is more important", "The stack is LIFO — pushing right first means left is popped (visited) first", "To balance the tree", "It doesn't matter"],
        answer: 1,
        explanations: ["No priority difference.", "Correct — stack pops the last pushed; push right then left so left comes out first (pre-order is root-left-right).", "No balancing.", "Order matters for correctness."],
        difficulty: "medium"
      },
      {
        question: "What data structure does level-order traversal use?",
        options: ["Stack", "Queue", "Heap", "Hash table"],
        answer: 1,
        explanations: ["Stack is for DFS.", "Correct — queue (FIFO) gives level-by-level (BFS) order.", "Heap is for priority queues.", "No hashing."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "heap-priority-queue",
    title: "Heaps & Priority Queue",
    difficulty: "hard",
    definition: "A heap is a complete binary tree where every parent is >= its children (max-heap) or <= its children (min-heap). It's stored as an array (parent at i, children at 2i+1, 2i+2). The root is always the max (or min), making it perfect for a priority queue — get the top in O(1), insert in O(log n), extract the top in O(log n).",
    coreUnderstanding: "A priority queue needs 'get the highest-priority element fast' — a sorted array gives O(1) get-max but O(n) insert; an unsorted array gives O(n) get-max but O(1) insert. A heap splits the difference: O(1) peek-max, O(log n) insert, O(log n) extract-max. The 'complete tree stored as array' representation means no pointers, perfect cache locality, and no memory waste. Heaps power Dijkstra's algorithm, Huffman coding, task scheduling, and the median-finding trick (two heaps). The heap property (parent >= children) is weaker than BST's (left < root < right) — a heap is NOT sorted, only the root is special.",
    howItWorks: "REPRESENTATION: complete binary tree in an array. Parent at i, left child at 2i+1, right child at 2i+2, parent of i at (i-1)//2. No pointers — just index arithmetic.\n\nHEAP PROPERTY (max-heap): arr[parent] >= arr[children] for all nodes. The root (index 0) is the maximum. Note: this does NOT mean the array is sorted — only the parent-child relationship holds, not sibling order.\n\nOPERATIONS:\n• PEEK (get max): return arr[0]. O(1).\n• INSERT (push): append to the end, then sift-UP (compare with parent, swap if larger, repeat). O(log n) = height.\n• EXTRACT-MAX (pop): save arr[0], move the last element to the root, sift-DOWN (compare with the larger child, swap if smaller, repeat). O(log n).\n• BUILD-HEAP: sift-down from the last non-leaf to the root. O(n) (not O(n log n) — amortized).\n\nPRIORITY QUEUE: a heap with a priority key. Python's heapq is a min-heap; use negative values for a max-heap. C++ std::priority_queue is a max-heap by default.\n\nTWO-HEAP MEDIAN: a max-heap for the lower half, a min-heap for the upper half. The median is at the two roots. Insert: push to one, rebalance. O(log n) per insert, O(1) median query.",
    codeExamples: [
      {
        lang: "python",
        code: "import heapq\n\n# Python's heapq is a MIN-heap. For max-heap, negate values.\n# Min-heap operations:\nheap = []\nheapq.heappush(heap, 5)\nheapq.heappush(heap, 2)\nheapq.heappush(heap, 8)\nprint(heapq.heappop(heap))  # 2 (smallest first)\nprint(heapq.heappop(heap))  # 5\n\n# Max-heap via negation\nmaxheap = []\nfor x in [5, 2, 8]:\n    heapq.heappush(maxheap, -x)\nprint(-heapq.heappop(maxheap))  # 8 (largest first)",
        output: "2\n5\n8",
        note: "Python's heapq is a min-heap. Negate values for a max-heap, or store (-priority, item) tuples."
      },
      {
        lang: "python",
        code: "# Two-heap running median\nclass RunningMedian:\n    def __init__(self):\n        self.lower = []  # max-heap (negated) — smaller half\n        self.upper = []  # min-heap — larger half\n\n    def add(self, x):\n        heapq.heappush(self.lower, -x)\n        # move the max of lower to upper\n        heapq.heappush(self.upper, -heapq.heappop(self.lower))\n        # keep lower >= upper in size\n        if len(self.upper) > len(self.lower):\n            heapq.heappush(self.lower, -heapq.heappop(self.upper))\n\n    def median(self):\n        if len(self.lower) > len(self.upper):\n            return -self.lower[0]\n        return (-self.lower[0] + self.upper[0]) / 2\n\nrm = RunningMedian()\nfor x in [5, 2, 8, 1, 3]: rm.add(x)\nprint(rm.median())  # 3",
        output: "3.0",
        note: "Max-heap (lower half) + min-heap (upper half). Median is at the roots. O(log n) per add, O(1) query."
      }
    ],
    marginNotes: [
      "A heap is NOT sorted — only the root is special (max or min). The array is not in sorted order; only the parent-child property holds.",
      "Complete tree in an array: no pointers, perfect cache locality, no memory waste. This is why heaps are fast in practice.",
      "Build-heap is O(n), not O(n log n) — a non-obvious amortized result. Inserting one-by-one is O(n log n); bottom-up sift-down is O(n).",
      "Two-heap median: max-heap for the lower half, min-heap for the upper half. The median is at the two roots. O(log n) insert, O(1) query."
    ],
    commonMistakes: [
      "Assuming a heap is sorted — it's not. Only the root is the max/min; the rest is partially ordered. Use a sorted array if you need full order.",
      "Using 2i and 2i+1 instead of 2i+1 and 2i+2 for 0-indexed arrays — off by one, accesses the wrong children.",
      "Forgetting to sift-down after extracting the root — the last element moved to the root violates the heap property.",
      "Confusing min-heap and max-heap — Python's heapq is min-only. Negate values or use a wrapper for max-heap behavior."
    ],
    relatedTopics: ["Heap Sort", "Binary Tree Fundamentals", "Dijkstra's Algorithm", "Priority Queue"],
    externalLinks: [
      { label: "Heap (Wikipedia)", url: "https://en.wikipedia.org/wiki/Heap_(data_structure)" },
      { label: "Python heapq", url: "https://docs.python.org/3/library/heapq.html" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of insert and extract-max in a binary heap?",
        options: ["O(1) and O(1)", "O(log n) and O(log n)", "O(n) and O(1)", "O(n) and O(n)"],
        answer: 1,
        explanations: ["Peek is O(1), but insert/extract are not.", "Correct — sift-up and sift-down are O(height) = O(log n).", "Insert is O(log n), not O(n).", "Both are O(log n)."],
        difficulty: "medium"
      },
      {
        question: "Is a heap's array sorted?",
        options: ["Yes, always", "No — only the parent-child property holds; the root is the max/min, but the array isn't fully sorted", "Only for a min-heap", "Only after extract-all"],
        answer: 1,
        explanations: ["A heap is partially ordered, not sorted.", "Correct — only arr[parent] >= arr[children]; siblings have no order.", "Min-heaps aren't sorted either.", "Extracting all elements in order does produce sorted output (heap sort)."],
        difficulty: "medium"
      },
      {
        question: "How does the two-heap median trick work?",
        options: ["One sorted array, take the middle", "Max-heap for the lower half, min-heap for the upper half; median is at the roots", "A single heap with the median at the root", "Binary search on a sorted list"],
        answer: 1,
        explanations: ["That's O(n) per insert.", "Correct — rebalance after each insert; O(log n) insert, O(1) median query.", "A heap's root is the max/min, not the median.", "That's O(n) per insert."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "graph-basics",
    title: "Graph Fundamentals",
    difficulty: "medium",
    definition: "A graph is a set of vertices (nodes) connected by edges. Unlike a tree, a graph has no hierarchy — any node can connect to any other. Graphs model networks: social connections, road maps, web links, dependencies. Key variants: directed vs undirected, weighted vs unweighted, cyclic vs acyclic. Representation: adjacency matrix (O(V²) space) or adjacency list (O(V+E) space).",
    coreUnderstanding: "Graphs are the most general data structure — trees and linked lists are special cases. The representation choice matters: an adjacency matrix (V×V boolean grid) gives O(1) edge lookup but O(V²) space and O(V) to list a node's neighbors — good for dense graphs. An adjacency list (array of lists, one per node) gives O(V+E) space and O(degree) to list neighbors — good for sparse graphs, which is most real-world graphs. The graph's properties (directed, weighted, cyclic) determine which algorithms apply: BFS/DFS for traversal, Dijkstra/Bellman-Ford for shortest paths, topological sort for DAGs, Union-Find for connectivity.",
    howItWorks: "REPRESENTATION:\n• Adjacency Matrix: matrix[i][j] = 1 (or weight) if edge i→j exists. O(V²) space. O(1) edge check. O(V) to list neighbors. Good for dense graphs.\n• Adjacency List: list[i] = [neighbors of i]. O(V + E) space. O(degree) to list neighbors. Good for sparse graphs (most real graphs).\n\nTERMINOLOGY:\n• Directed: edges have direction (i→j ≠ j→i). Undirected: edges are bidirectional.\n• Weighted: edges have costs (distance, time). Unweighted: all edges equal.\n• Degree: number of edges at a node. In-degree / out-degree for directed graphs.\n• Path: sequence of vertices connected by edges. Cycle: a path that starts and ends at the same vertex.\n• Connected: there's a path between any two vertices. DAG: Directed Acyclic Graph (no cycles, supports topological sort).\n\nALGORITHMS BY PROBLEM:\n• Traversal: BFS (shortest path unweighted), DFS (connectivity, cycle detection).\n• Shortest path: Dijkstra (non-negative weights), Bellman-Ford (negative weights), Floyd-Warshall (all pairs).\n• Minimum spanning tree: Kruskal, Prim.\n• Topological sort: DAGs only (Kahn's algorithm or DFS).\n• Connectivity: Union-Find (disjoint set), strongly connected components (Tarjan/Kosaraju).",
    codeExamples: [
      {
        lang: "python",
        code: "# Adjacency list representation (most common for sparse graphs)\ngraph = {\n    0: [1, 2],\n    1: [0, 3],\n    2: [0, 3],\n    3: [1, 2]\n}\n\n# Adjacency matrix (for dense graphs or when O(1) edge lookup matters)\nimport numpy as np\nn = 4\nmatrix = np.zeros((n, n), dtype=int)\nedges = [(0,1), (0,2), (1,3), (2,3)]\nfor u, v in edges:\n    matrix[u][v] = 1\n    matrix[v][u] = 1  # undirected\nprint(matrix)",
        output: "[[0 1 1 0]\n [1 0 0 1]\n [1 0 0 1]\n [0 1 1 0]]",
        note: "Adjacency list: O(V+E) space, fast neighbor iteration. Matrix: O(V²) space, O(1) edge check. Choose by density."
      },
      {
        lang: "python",
        code: "# DFS on a graph (handles cycles with a visited set)\ndef dfs(graph, start, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(start)\n    print(start, end=' ')\n    for neighbor in graph[start]:\n        if neighbor not in visited:   # skip visited (handles cycles)\n            dfs(graph, neighbor, visited)\n    return visited\n\ng = {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}\ndfs(g, 0)  # 0 1 3 2 (or 0 2 3 1 — order depends on neighbor order)",
        output: "0 1 3 2",
        note: "The visited set is essential — graphs can have cycles, unlike trees. Without it, DFS loops forever."
      }
    ],
    marginNotes: [
      "Adjacency list for sparse graphs (most real-world); matrix for dense graphs or when you need O(1) edge existence checks.",
      "Always use a visited set in graph traversal — graphs can have cycles (trees can't), so without it you loop forever.",
      "Directed vs undirected changes everything: in-degree ≠ out-degree for directed; degree is symmetric for undirected.",
      "A DAG (Directed Acyclic Graph) supports topological sort — the basis for dependency resolution, task scheduling, build systems."
    ],
    commonMistakes: [
      "Forgetting the visited set in graph DFS/BFS — cycles cause infinite loops. Trees don't need it (no cycles); graphs do.",
      "Using an adjacency matrix for a sparse graph — O(V²) space is wasteful when E << V². Use an adjacency list.",
      "Confusing directed and undirected — adding edge (u,v) to an undirected graph requires both matrix[u][v] and matrix[v][u].",
      "Not handling disconnected components — a single BFS/DFS from one node misses other components. Loop over all nodes."
    ],
    relatedTopics: ["BFS", "DFS", "Dijkstra's Algorithm", "Topological Sort"],
    externalLinks: [
      { label: "Graph (Wikipedia)", url: "https://en.wikipedia.org/wiki/Graph_(abstract_data_type)" },
      { label: "Graph Representations (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/graph-and-its-representations/" }
    ],
    mcqs: [
      {
        question: "Which representation is best for a sparse graph (E << V²)?",
        options: ["Adjacency matrix", "Adjacency list", "Edge list", "Hash table"],
        answer: 1,
        explanations: ["Matrix is O(V²) space — wasteful for sparse graphs.", "Correct — O(V+E) space, proportional to actual edges.", "Edge list is O(E) but slow for neighbor queries.", "Not a graph representation."],
        difficulty: "easy"
      },
      {
        question: "Why must graph traversal use a visited set (unlike tree traversal)?",
        options: ["Graphs are larger", "Graphs can have cycles — without a visited set, traversal loops forever", "Graphs are directed", "Graphs have weights"],
        answer: 1,
        explanations: ["Size is irrelevant.", "Correct — trees have no cycles; graphs can. The visited set prevents revisiting.", "Direction doesn't cause the issue; cycles do.", "Weights don't affect traversal order."],
        difficulty: "medium"
      },
      {
        question: "What is the space complexity of an adjacency list for a graph with V vertices and E edges?",
        options: ["O(V²)", "O(V + E)", "O(E²)", "O(V · E)"],
        answer: 1,
        explanations: ["That's the matrix.", "Correct — V lists (one per vertex) + E total entries across all lists.", "No such complexity.", "No such complexity."],
        difficulty: "easy"
      }
    ]
  }
];