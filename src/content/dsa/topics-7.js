export default [
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence (LIS)",
    difficulty: "hard",
    definition: "The Longest Increasing Subsequence (LIS) is the longest subsequence (not necessarily contiguous) where each element is strictly greater than the previous. The O(N²) DP is straightforward; the O(N log N) approach uses patience sorting with binary search — the key optimization for large inputs.",
    coreUnderstanding: "The O(N²) DP: dp[i] = length of the LIS ending at index i. For each i, check all j < i: if arr[j] < arr[i], dp[i] = max(dp[i], dp[j] + 1). The answer is max(dp). This is O(N²) — too slow for N > 10⁴. The O(N log N) approach (patience sorting): maintain a 'tails' array where tails[k] = the smallest tail element of all increasing subsequences of length k+1. For each element, binary search for its position in tails; if it extends the longest, append; else replace the element at that position (keeping tails minimal). The length of tails at the end is the LIS length. The key insight: a smaller tail is always better (more room to extend), so replacing doesn't lose information.",
    howItWorks: "O(N²) DP:\n• dp[i] = LIS length ending at i. dp[i] = 1 + max(dp[j] for j < i if arr[j] < arr[i]), or 1 if none.\n• Answer = max(dp). O(N²) time, O(N) space.\n\nO(N log N) PATIENCE SORTING:\n• tails = [] (tails[k] = smallest tail of an IS of length k+1).\n• For each x in arr:\n  - Binary search for the leftmost position p where tails[p] >= x (bisect_left).\n  - If p == len(tails): tails.append(x) (x extends the longest IS).\n  - Else: tails[p] = x (x is a better — smaller — tail for length p+1).\n• Answer = len(tails).\n\nRECONSTRUCTING THE LIS: the tails array gives the length, not the sequence. To reconstruct, track predecessors (more complex). For just the length, the tails approach is clean and fast.\n\nKEY: tails is always sorted (that's why binary search works). Replacing a tail with a smaller value keeps future extensions possible.",
    codeExamples: [
      {
        lang: "python",
        code: "from bisect import bisect_left\n\n# LIS length — O(N log N) with patience sorting\ndef lis_length(arr):\n    tails = []  # tails[k] = smallest tail of an IS of length k+1\n    for x in arr:\n        p = bisect_left(tails, x)  # leftmost position where tails[p] >= x\n        if p == len(tails):\n            tails.append(x)        # x extends the longest IS\n        else:\n            tails[p] = x           # x is a better (smaller) tail for length p+1\n    return len(tails)\n\nprint(lis_length([10, 9, 2, 5, 3, 7, 101, 18]))  # [2, 3, 7, 101] -> 4",
        output: "4",
        note: "tails stays sorted. Replace or append — a smaller tail is always better for future extensions. len(tails) is the LIS length."
      },
      {
        lang: "python",
        code: "# O(N^2) DP — simpler, for reference\ndef lis_dp(arr):\n    if not arr: return 0\n    dp = [1] * len(arr)\n    for i in range(1, len(arr)):\n        for j in range(i):\n            if arr[j] < arr[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)\n\nprint(lis_dp([10, 9, 2, 5, 3, 7, 101, 18]))  # 4",
        output: "4",
        note: "dp[i] = LIS ending at i. Check all j < i. O(N²) — fine for small N, too slow for N > 10^4."
      }
    ],
    marginNotes: [
      "tails[k] = smallest tail of an increasing subsequence of length k+1. A smaller tail is always better (more room to extend).",
      "tails is always sorted — that's why binary search (bisect_left) works. Replace or append; never insert in the middle.",
      "The tails array gives the LENGTH, not the actual LIS. Reconstructing the sequence needs predecessor tracking.",
      "bisect_left (not bisect_right) — we want the leftmost position where tails[p] >= x, to replace the first >= element."
    ],
    commonMistakes: [
      "Using bisect_right instead of bisect_left — bisect_right would allow equal elements to extend (wrong for strictly increasing).",
      "Thinking tails contains the actual LIS — it contains the optimal tails, which may not form a valid subsequence. Only len(tails) is correct.",
      "Using O(N²) DP for N > 10⁴ — it's too slow. The O(N log N) patience sorting is the standard for large inputs.",
      "Not handling the 'strictly increasing' vs 'non-decreasing' distinction — bisect_left for strict, bisect_right for non-decreasing."
    ],
    relatedTopics: ["Dynamic Programming", "Binary Search", "Patience Sorting", "Subsequence Problems"],
    externalLinks: [
      { label: "Longest Increasing Subsequence (LeetCode 300)", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
      { label: "Patience Sorting (Wikipedia)", url: "https://en.wikipedia.org/wiki/Patience_sorting" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of the patience sorting LIS algorithm?",
        options: ["O(N²)", "O(N log N)", "O(N)", "O(2^N)"],
        answer: 1,
        explanations: ["That's the DP approach.", "Correct — N elements, each with an O(log N) binary search on tails.", "Too fast — binary search is O(log N) per element.", "That's brute force."],
        difficulty: "hard"
      },
      {
        question: "What does tails[k] represent?",
        options: ["The k-th element of the LIS", "The smallest tail element of all increasing subsequences of length k+1", "The number of IS of length k+1", "The index of the LIS"],
        answer: 1,
        explanations: ["tails isn't the LIS itself.", "Correct — a smaller tail is always better for future extensions, so we keep the minimum.", "It's a value, not a count.", "It's a value, not an index."],
        difficulty: "hard"
      },
      {
        question: "Why use bisect_left instead of bisect_right?",
        options: ["bisect_right is slower", "bisect_left finds the leftmost position where tails[p] >= x, replacing the first >= element (correct for strictly increasing)", "bisect_right doesn't exist", "They're the same"],
        answer: 1,
        explanations: ["Same speed.", "Correct — for strictly increasing LIS, replace the first element >= x (not > x). bisect_right would allow equals to extend.", "It does exist.", "They differ on equal elements."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "dp-on-grids",
    title: "DP on Grids (Unique Paths, Min Path Sum)",
    difficulty: "medium",
    definition: "Grid DP solves problems on 2D grids: counting paths (unique paths from top-left to bottom-right), finding the minimum/maximum path cost, or handling obstacles. The state is dp[i][j] = answer for the cell (i, j), and transitions come from the allowed moves (right, down, or all 4 directions).",
    coreUnderstanding: "For 'unique paths' (only moving right or down), dp[i][j] = dp[i-1][j] + dp[i][j-1] — the number of ways to reach (i, j) is the sum of ways to reach the cell above and the cell to the left. Base: dp[0][*] = dp[*][0] = 1 (one way to reach any cell in the first row/column). For obstacles, dp[i][j] = 0 if the cell is blocked. For 'minimum path sum', dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]) — the best cost to reach (i, j) is the cell's cost plus the cheaper of the two predecessors. Space can be optimized to O(n) by keeping only the previous row, or done in-place by modifying the grid.",
    howItWorks: "UNIQUE PATHS (right and down only):\n• dp[i][j] = dp[i-1][j] + dp[i][j-1].\n• Base: dp[0][j] = dp[i][0] = 1 (one way along the first row/column).\n• With obstacles: dp[i][j] = 0 if grid[i][j] is blocked.\n\nMINIMUM PATH SUM:\n• dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).\n• Base: dp[0][0] = grid[0][0]; first row = prefix sum; first col = prefix sum.\n\nSPACE OPTIMIZATION:\n• Only the previous row is needed → O(n) space (one row of dp).\n• Or in-place: modify grid[i][j] directly (if allowed).\n\n4-DIRECTIONAL (Dungeon Game, Gold Mine):\n• If moves are all 4 directions, it's no longer a DAG (you can cycle) — use Dijkstra or process in a specific order (e.g., bottom-right to top-left for 'min path from end').",
    codeExamples: [
      {
        lang: "python",
        code: "# Unique Paths — count paths from top-left to bottom-right (right & down only)\ndef unique_paths(m, n):\n    dp = [[1] * n for _ in range(m)]  # first row/col = 1\n    for i in range(1, m):\n        for j in range(1, n):\n            dp[i][j] = dp[i-1][j] + dp[i][j-1]\n    return dp[m-1][n-1]\n\nprint(unique_paths(3, 7))  # 28",
        output: "28",
        note: "dp[i][j] = ways from above + ways from left. First row and column are 1 (only one way: all right or all down)."
      },
      {
        lang: "python",
        code: "# Minimum Path Sum — O(n) space\ndef min_path_sum(grid):\n    m, n = len(grid), len(grid[0])\n    dp = [0] * n\n    dp[0] = grid[0][0]\n    for j in range(1, n): dp[j] = dp[j-1] + grid[0][j]  # first row\n    for i in range(1, m):\n        dp[0] += grid[i][0]  # first column\n        for j in range(1, n):\n            dp[j] = grid[i][j] + min(dp[j], dp[j-1])  # min(above, left)\n    return dp[-1]\n\nprint(min_path_sum([[1,3,1],[1,5,1],[4,2,1]]))  # 1->3->1->1->1 = 7",
        output: "7",
        note: "O(n) space: one row. dp[j] = min(above (old dp[j]), left (new dp[j-1])) + grid[i][j]."
      }
    ],
    marginNotes: [
      "dp[i][j] = answer for cell (i, j). Transitions come from allowed moves (right/down for most grid DP).",
      "Space optimization: only the previous row is needed → O(n). Or modify the grid in-place.",
      "First row and column are base cases (prefix sums for path cost, 1s for path count).",
      "If moves are 4-directional, it's not a DAG — use Dijkstra or reverse the processing order (bottom-right to top-left)."
    ],
    commonMistakes: [
      "Not handling the first row and column as base cases — they have only one predecessor (or are prefix sums).",
      "Using 4-directional DP when only right/down are allowed — creates cycles, wrong answer. Check the allowed moves.",
      "Not initializing dp[0][0] correctly — it's grid[0][0] for path sum, 1 for path count.",
      "Forgetting obstacles — a blocked cell contributes 0 paths; skip it in the transition."
    ],
    relatedTopics: ["Dynamic Programming", "2D DP", "Prefix Sum", "Dijkstra's Algorithm"],
    externalLinks: [
      { label: "Unique Paths (LeetCode 62)", url: "https://leetcode.com/problems/unique-paths/" },
      { label: "Minimum Path Sum (LeetCode 64)", url: "https://leetcode.com/problems/minimum-path-sum/" }
    ],
    mcqs: [
      {
        question: "What is the recurrence for unique paths (right and down only)?",
        options: ["dp[i][j] = dp[i-1][j] * dp[i][j-1]", "dp[i][j] = dp[i-1][j] + dp[i][j-1]", "dp[i][j] = min(dp[i-1][j], dp[i][j-1])", "dp[i][j] = dp[i-1][j-1]"],
        answer: 1,
        explanations: ["Paths add, not multiply.", "Correct — ways to reach (i,j) = ways from above + ways from left.", "That's min path sum, not count.", "That ignores two predecessors."],
        difficulty: "easy"
      },
      {
        question: "What is the space-optimized complexity for grid DP (right/down only)?",
        options: ["O(m·n)", "O(n) — only the previous row is needed", "O(1)", "O(n²)"],
        answer: 1,
        explanations: ["That's the full 2D table.", "Correct — each row depends only on the previous row and the current row's left neighbor.", "Only if done in-place on the grid.", "No need for full n²."],
        difficulty: "medium"
      },
      {
        question: "What happens if the grid allows 4-directional movement?",
        options: ["Standard DP still works", "It's no longer a DAG (cycles possible) — use Dijkstra or reverse processing order", "It becomes BFS", "It's unsolvable"],
        answer: 1,
        explanations: ["DP needs a DAG (no cycles).", "Correct — 4-directional movement creates cycles; standard DP fails. Use Dijkstra or process bottom-right to top-left.", "BFS finds shortest unweighted paths, not general DP.", "It's solvable with the right approach."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "word-break",
    title: "Word Break (DP + Trie)",
    difficulty: "hard",
    definition: "Word Break determines if a string can be segmented into a sequence of dictionary words. The DP: dp[i] = True if s[0..i-1] can be segmented. dp[i] = any(dp[j] and s[j..i-1] in dictionary for j < i). A Trie optimizes the dictionary lookup. O(n² · word_len) with a set, O(n · max_word_len) with a Trie.",
    coreUnderstanding: "The DP asks: for each ending position i, is there a starting position j such that s[0..j-1] is segmentable (dp[j]) AND s[j..i-1] is a dictionary word? If yes, dp[i] = True. The base is dp[0] = True (empty string is segmentable). The naive check is O(n²) states × O(n) substring comparison = O(n³). Two optimizations: (1) use a hash set for O(1) word lookup (still O(n²) states, but each lookup is O(word_len)); (2) use a Trie and only check substrings up to the max word length (O(n · max_word_len)). The Trie approach is faster when words are short relative to the string. For reconstruction (the actual segmentation), track back-pointers.",
    howItWorks: "DP APPROACH (hash set):\n• dp[i] = True if s[0..i-1] can be segmented.\n• dp[0] = True (empty string).\n• For i from 1 to n: dp[i] = any(dp[j] and s[j:i] in word_set for j in range(i)).\n• Answer: dp[n].\n• O(n² · L) where L = average word length (substring + hash).\n\nTRIE OPTIMIZATION:\n• Build a Trie from the dictionary.\n• For each starting position j where dp[j] is True, walk the Trie from j forward. Each time you hit a word end, set dp[j + word_len] = True.\n• O(n · max_word_len) — only check substrings up to the longest word.\n\nRECONSTRUCTION: track back[j] = the j' such that s[j'..j-1] is a word and dp[j'] is True. Backtrack from dp[n].",
    codeExamples: [
      {
        lang: "python",
        code: "# Word Break — DP with a hash set\ndef word_break(s, word_dict):\n    word_set = set(word_dict)\n    n = len(s)\n    dp = [False] * (n + 1)\n    dp[0] = True  # empty string is segmentable\n    for i in range(1, n + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in word_set:\n                dp[i] = True\n                break  # one valid segmentation is enough\n    return dp[n]\n\nprint(word_break('leetcode', ['leet', 'code']))       # True\nprint(word_break('applepenapple', ['apple', 'pen']))  # True\nprint(word_break('catsandog', ['cats', 'dog', 'sand'])) # False",
        output: "True\nTrue\nFalse",
        note: "dp[i] = True if some j < i has dp[j] True and s[j:i] is a word. Break early — one valid split suffices."
      },
      {
        lang: "python",
        code: "# Word Break — Trie optimization (only check up to max word length)\nclass TrieNode:\n    def __init__(self):\n        self.children = {}; self.is_end = False\n\ndef word_break_trie(s, word_dict):\n    root = TrieNode()\n    max_len = 0\n    for w in word_dict:\n        node = root\n        for ch in w:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_end = True\n        max_len = max(max_len, len(w))\n    n = len(s)\n    dp = [False] * (n + 1)\n    dp[0] = True\n    for i in range(n):\n        if not dp[i]: continue  # only extend from valid starts\n        node = root; j = i\n        while j < n and ch := s[j]:\n            if ch not in node.children: break\n            node = node.children[ch]; j += 1\n            if node.is_end: dp[j] = True\n    return dp[n]\n\nprint(word_break_trie('leetcode', ['leet', 'code']))  # True",
        output: "True",
        note: "From each valid start, walk the Trie. Each word end sets dp[j] = True. O(n · max_word_len) — faster when words are short."
      }
    ],
    marginNotes: [
      "dp[i] = True if s[0..i-1] is segmentable. dp[0] = True (empty string). Check all j < i: dp[j] and s[j:i] in dict.",
      "Break early when dp[i] becomes True — one valid segmentation is enough; no need to check all j.",
      "Trie optimization: only check substrings up to max word length. O(n · max_word_len) vs O(n² · L) for the set approach.",
      "For reconstruction (the actual words), track back-pointers: back[i] = j where s[j:i] is a word and dp[j] is True."
    ],
    commonMistakes: [
      "Not setting dp[0] = True — the empty string is the base case; without it, no segmentation can start.",
      "Checking all j up to i without breaking early — O(n²) always; break when dp[i] is True for a small speedup.",
      "Using the Trie but still checking all j up to i (not limiting to max word length) — defeats the optimization.",
      "Confusing 'can segment' (boolean) with 'all segmentations' (Word Break II) — the DP is for the boolean version."
    ],
    relatedTopics: ["Dynamic Programming", "Trie", "String Fundamentals", "Hash Tables"],
    externalLinks: [
      { label: "Word Break (LeetCode 139)", url: "https://leetcode.com/problems/word-break/" },
      { label: "Word Break II (LeetCode 140)", url: "https://leetcode.com/problems/word-break-ii/" }
    ],
    mcqs: [
      {
        question: "What is the base case for Word Break DP?",
        options: ["dp[0] = False", "dp[0] = True (the empty string is segmentable)", "dp[1] = True", "No base case needed"],
        answer: 1,
        explanations: ["That prevents any segmentation.", "Correct — the empty prefix is the starting point; every segmentation builds from it.", "Only if s[0] is a word.", "Every DP needs a base."],
        difficulty: "medium"
      },
      {
        question: "What is the time complexity of the Trie-optimized Word Break?",
        options: ["O(n²)", "O(n · max_word_len)", "O(n · |dict|)", "O(2^n)"],
        answer: 1,
        explanations: ["That's the set approach.", "Correct — from each valid start, walk the Trie up to max_word_len.", "Not dependent on dict size this way.", "No exponential."],
        difficulty: "hard"
      },
      {
        question: "What does dp[i] represent in Word Break?",
        options: ["The number of segmentations of s[0..i-1]", "True if s[0..i-1] can be segmented into dictionary words", "The longest word in s[0..i-1]", "The first word ending at i"],
        answer: 1,
        explanations: ["That's Word Break II (count).", "Correct — boolean: can the prefix be segmented?", "Irrelevant.", "Not the DP state."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "state-machine-dp",
    title: "State Machine DP (Stock Buy/Sell)",
    difficulty: "hard",
    definition: "State machine DP models problems with discrete states and transitions — the stock buy/sell series is the canonical example. Each day, you're in a state (holding stock, not holding, cooldown, etc.), and the DP tracks the max profit in each state. Transitions between states are the buy/sell actions.",
    coreUnderstanding: "The stock problems (Best Time to Buy/Sell Stock I-V) differ in constraints: one transaction, unlimited transactions, with cooldown, with transaction fee, at most two transactions. All are modeled as state machines. For unlimited transactions (Stock II): two states — 'holding' (max profit while holding a stock) and 'not holding' (max profit while not). Each day, holding = max(holding, not_holding - price) (buy or keep), not_holding = max(not_holding, holding + price) (sell or keep). The answer is not_holding (you end without holding). For cooldown (Stock IV), add a 'cooldown' state. For at most K transactions, add a transaction count dimension. The state machine makes the transitions explicit and the DP natural.",
    howItWorks: "STOCK II (unlimited transactions):\n• States: hold (max profit while holding), cash (max profit while not holding).\n• hold = max(hold, cash - price) — keep holding, or buy today.\n• cash = max(cash, hold + price) — keep cash, or sell today.\n• Init: hold = -inf (can't start holding), cash = 0. After day 0: hold = -price[0], cash = 0.\n• Answer: cash (end without holding).\n\nSTOCK WITH COOLDAY (Stock III):\n• States: hold, cash, cooldown. After selling, you must cooldown before buying.\n• hold = max(hold, cooldown - price); cash = hold + price; cooldown = max(cooldown, cash).\n\nSTOCK WITH FEE (Stock VI):\n• Like Stock II, but cash = hold + price - fee (sell incurs the fee).\n\nAT MOST K TRANSACTIONS (Stock IV):\n• dp[k][hold] — k transactions used, holding or not. hold = max(hold, dp[k-1][cash] - price); cash = max(cash, hold + price).",
    codeExamples: [
      {
        lang: "python",
        code: "# Stock II — unlimited transactions, state machine DP\ndef max_profit(prices):\n    hold = float('-inf')  # max profit while holding a stock\n    cash = 0               # max profit while not holding\n    for price in prices:\n        hold = max(hold, cash - price)    # keep holding, or buy\n        cash = max(cash, hold + price)    # keep cash, or sell\n    return cash  # end without holding\n\nprint(max_profit([7, 1, 5, 3, 6, 4]))  # buy 1, sell 5, buy 3, sell 6 = 7",
        output: "7",
        note: "Two states: hold and cash. Each day, transition: buy (cash→hold), sell (hold→cash), or hold. Answer is cash."
      },
      {
        lang: "python",
        code: "# Stock with cooldown — 3 states\ndef max_profit_cooldown(prices):\n    hold = float('-inf')   # holding a stock\n    cash = 0                # not holding, free to buy\n    cooldown = 0            # just sold, must rest\n    for price in prices:\n        prev_hold, prev_cash, prev_cd = hold, cash, cooldown\n        hold = max(prev_hold, prev_cd - price)      # keep holding, or buy (only after cooldown)\n        cash = max(prev_cash, prev_hold + price)     # keep cash, or sell -> cooldown\n        cooldown = max(prev_cd, prev_cash)          # keep cooldown, or stay cash\n    return max(cash, cooldown)\n\nprint(max_profit_cooldown([1, 2, 3, 0, 2]))  # buy 1, sell 3, cooldown, buy 0, sell 2 = 3",
        output: "3",
        note: "Three states: hold, cash (free to buy), cooldown (just sold). Buy only from cooldown/cash; sell moves to cooldown."
      }
    ],
    marginNotes: [
      "State machine DP: each state is a 'situation' (holding, not holding, cooldown). Transitions are the actions (buy, sell, rest).",
      "Stock II: two states (hold, cash). hold = max(hold, cash - price); cash = max(cash, hold + price). Answer is cash.",
      "Cooldown adds a third state — you can only buy from cooldown/cash, and selling moves you to cooldown (forced rest).",
      "For at most K transactions, add a dimension: dp[transaction_count][state]. The state machine still drives the transitions."
    ],
    commonMistakes: [
      "Using prev values for all states — each day's transitions depend on the PREVIOUS day's states, not the updated ones. Save prev_ values.",
      "Not initializing hold to -inf — you can't start the day holding (no stock bought yet). After day 0, hold = -price[0].",
      "Returning hold instead of cash — you must end without holding (you'd never hold at the end; selling is always better or equal).",
      "Confusing 'at most one transaction' (Stock I, track min so far) with 'unlimited' (Stock II, state machine) — different problems."
    ],
    relatedTopics: ["Dynamic Programming", "1D DP", "Greedy Algorithms", "State Machines"],
    externalLinks: [
      { label: "Best Time to Buy/Sell Stock II (LeetCode 122)", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/" },
      { label: "With Cooldown (LeetCode 309)", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/" }
    ],
    mcqs: [
      {
        question: "In Stock II (unlimited transactions), what are the two states?",
        options: ["buy and sell", "hold (max profit while holding) and cash (max profit while not holding)", "profit and loss", "day and night"],
        answer: 1,
        explanations: ["Those are actions, not states.", "Correct — hold = max(hold, cash - price); cash = max(cash, hold + price).", "Not the states.", "Not meaningful."],
        difficulty: "hard"
      },
      {
        question: "Why must you use prev_ values for all state updates in one day?",
        options: ["It's faster", "Each day's transitions depend on the PREVIOUS day's states, not the just-updated ones (otherwise you could buy and sell on the same day)", "To save memory", "To sort the states"],
        answer: 1,
        explanations: ["Same speed.", "Correct — updating hold then using the new hold for cash would allow same-day buy+sell.", "Same memory.", "No sorting."],
        difficulty: "hard"
      },
      {
        question: "What is the answer for the stock problems (unlimited or with cooldown)?",
        options: ["hold (you end holding a stock)", "cash (you end without holding — selling is always >= holding)", "max(hold, cash)", "0"],
        answer: 1,
        explanations: ["You'd never end holding — selling is free profit.", "Correct — cash is the max profit ending without a stock.", "hold <= cash always at the end.", "Only if no profit possible."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "strongly-connected-components",
    title: "Strongly Connected Components (Tarjan's & Kosaraju's)",
    difficulty: "hard",
    definition: "A Strongly Connected Component (SCC) of a directed graph is a maximal set of vertices where every vertex is reachable from every other. Tarjan's algorithm finds SCCs in a single DFS (O(V+E)); Kosaraju's uses two DFS passes (O(V+E)). Both are linear time.",
    coreUnderstanding: "In a directed graph, mutual reachability (u→v and v→u) defines an equivalence relation — the SCCs are the equivalence classes. The graph of SCCs (condensed graph) is always a DAG (if there were a cycle among SCCs, they'd be one SCC). Tarjan's uses a single DFS with discovery times and 'low-link' values: low[u] = the smallest discovery time reachable from u's subtree. If low[u] == disc[u], u is the root of an SCC — pop the stack down to u. Kosaraju's is simpler conceptually: DFS the graph, record finish times, then DFS the transposed graph in decreasing finish-time order — each DFS tree is an SCC.",
    howItWorks: "TARJAN'S (single DFS, O(V+E)):\n• Maintain disc[u] (discovery time), low[u] (smallest disc reachable from u's subtree), and a stack of the current path.\n• On visiting u: disc[u] = low[u] = time++; push u onto the stack.\n• For each neighbor v: if v unvisited, recurse, then low[u] = min(low[u], low[v]). If v is on the stack, low[u] = min(low[u], disc[v]).\n• After processing all neighbors: if low[u] == disc[u], u is an SCC root — pop the stack until u, that's one SCC.\n\nKOSARAJU'S (two DFS passes, O(V+E)):\n1. DFS the original graph, push nodes onto a stack by finish time (post-order).\n2. Transpose the graph (reverse all edges).\n3. Pop nodes from the stack; for each unvisited node, DFS the transposed graph — each DFS tree is an SCC.",
    codeExamples: [
      {
        lang: "python",
        code: "# Tarjan's SCC — single DFS\ndef tarjan_scc(graph, n):\n    disc = [-1] * n; low = [-1] * n\n    on_stack = [False] * n; stack = []\n    time = [0]; sccs = []\n    def dfs(u):\n        disc[u] = low[u] = time[0]; time[0] += 1\n        stack.append(u); on_stack[u] = True\n        for v in graph[u]:\n            if disc[v] == -1:\n                dfs(v); low[u] = min(low[u], low[v])\n            elif on_stack[v]:\n                low[u] = min(low[u], disc[v])\n        if low[u] == disc[u]:  # root of an SCC\n            scc = []\n            while True:\n                v = stack.pop(); on_stack[v] = False; scc.append(v)\n                if v == u: break\n            sccs.append(scc)\n    for i in range(n):\n        if disc[i] == -1: dfs(i)\n    return sccs\n\n# 0->1, 1->2, 2->0 (SCC: {0,1,2}), 2->3, 3->4, 4->3 (SCC: {3,4})\ng = {0:[1], 1:[2], 2:[0,3], 3:[4], 4:[3]}\nprint(tarjan_scc(g, 5))  # [[4, 3], [2, 1, 0]] (order may vary)",
        output: "[[4, 3], [2, 1, 0]]",
        note: "low[u] == disc[u] means u is an SCC root — pop the stack down to u. Single DFS, O(V+E)."
      }
    ],
    marginNotes: [
      "low[u] = smallest discovery time reachable from u's subtree (including back edges). low[u] == disc[u] → u is an SCC root.",
      "The on_stack check is crucial — only consider back edges to nodes on the current path (on the stack), not cross edges to finished SCCs.",
      "Kosaraju's is simpler to explain: DFS for finish times, transpose, DFS in reverse finish order. Two passes but conceptually cleaner.",
      "The condensed graph (SCCs as nodes) is always a DAG — if SCCs had a cycle, they'd merge into one SCC."
    ],
    commonMistakes: [
      "Using low[v] instead of disc[v] for back edges — for back edges, use disc[v] (the discovery time), not low[v]. Cross edges use neither (skip if not on stack).",
      "Not checking on_stack before updating low — cross edges to already-finished SCCs must be ignored (they're not on the current path).",
      "Forgetting to pop the stack when low[u] == disc[u] — the SCC isn't recorded until you pop down to u.",
      "Confusing SCCs (directed, mutual reachability) with connected components (undirected) — different algorithms."
    ],
    relatedTopics: ["Graph Fundamentals", "DFS", "Topological Sort", "Cycle Detection"],
    externalLinks: [
      { label: "Strongly Connected Component (Wikipedia)", url: "https://en.wikipedia.org/wiki/Strongly_connected_component" },
      { label: "Tarjan's Algorithm (CP-Algorithms)", url: "https://cp-algorithms.com/graph/strongly-connected-components.html" }
    ],
    mcqs: [
      {
        question: "What condition identifies an SCC root in Tarjan's algorithm?",
        options: ["disc[u] == 0", "low[u] == disc[u] (u can't reach anything earlier)", "low[u] == 0", "u has no neighbors"],
        answer: 1,
        explanations: ["That's just the first node.", "Correct — if u can't reach an earlier node, it's the root of its SCC; pop the stack down to u.", "That means u reaches the root, not that u is a root.", "A leaf can be an SCC of size 1."],
        difficulty: "hard"
      },
      {
        question: "What is the time complexity of both Tarjan's and Kosaraju's?",
        options: ["O(V²)", "O(V + E)", "O(V log E)", "O(E²)"],
        answer: 1,
        explanations: ["Too slow.", "Correct — Tarjan: single DFS; Kosaraju: two DFS passes. Both linear.", "No log factor.", "No quadratic."],
        difficulty: "medium"
      },
      {
        question: "Why must you check on_stack before using a back edge in Tarjan's?",
        options: ["To save memory", "Cross edges to finished SCCs must be ignored — only edges to nodes on the current path (stack) count", "To sort the stack", "To detect cycles"],
        answer: 1,
        explanations: ["No memory savings.", "Correct — a cross edge to an already-popped SCC doesn't connect to the current SCC.", "No sorting.", "Cycle detection is a side effect, not the reason."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "bridges-articulation-points",
    title: "Bridges & Articulation Points (Tarjan's)",
    difficulty: "hard",
    definition: "A bridge is an edge whose removal disconnects the graph. An articulation point (cut vertex) is a vertex whose removal disconnects the graph. Tarjan's algorithm finds both in a single DFS using discovery times and low-link values — O(V+E).",
    coreUnderstanding: "An edge (u, v) is a bridge if there's no back edge from v's subtree to u or an ancestor of u — i.e., low[v] > disc[u] (v can't reach anything above u). A vertex u is an articulation point if: (1) it's the DFS root with at least 2 children in the DFS tree (each child is a separate component), or (2) it has a child v where low[v] >= disc[u] (v can't reach above u, so removing u isolates v's subtree). The low-link value low[u] = smallest disc reachable from u's subtree via tree edges and at most one back edge. The comparison (low[v] > vs >=) distinguishes bridges (strict) from articulation points (non-strict) — an edge to u itself doesn't save u as an articulation point.",
    howItWorks: "TARJAN'S (single DFS, O(V+E)):\n• disc[u] = low[u] = time++. For each neighbor v:\n  - If v unvisited: set u as parent, recurse, low[u] = min(low[u], low[v]).\n    * Bridge check: if low[v] > disc[u], edge (u,v) is a bridge.\n    * Articulation check: if low[v] >= disc[u] and u is not the root, u is an articulation point.\n  - If v visited and v != parent: low[u] = min(low[u], disc[v]) (back edge).\n• Root is an articulation point if it has > 1 DFS child.\n\nKEY DIFFERENCE: bridge uses low[v] > disc[u] (v can't reach u at all); articulation uses low[v] >= disc[u] (v can reach u but not above — removing u still isolates v).",
    codeExamples: [
      {
        lang: "python",
        code: "# Find bridges and articulation points — Tarjan's\ndef find_bridges_articulation(graph, n):\n    disc = [-1] * n; low = [-1] * n\n    time = [0]; bridges = []; articulation = set()\n    def dfs(u, parent):\n        disc[u] = low[u] = time[0]; time[0] += 1\n        children = 0\n        for v in graph[u]:\n            if disc[v] == -1:  # tree edge\n                children += 1\n                dfs(v, u)\n                low[u] = min(low[u], low[v])\n                if low[v] > disc[u]:           # bridge\n                    bridges.append((u, v))\n                if parent != -1 and low[v] >= disc[u]:  # articulation (non-root)\n                    articulation.add(u)\n            elif v != parent:  # back edge\n                low[u] = min(low[u], disc[v])\n        if parent == -1 and children > 1:  # root with >1 child\n            articulation.add(u)\n    for i in range(n):\n        if disc[i] == -1: dfs(i, -1)\n    return bridges, articulation\n\n# 0-1-2-0 (triangle), 2-3 (bridge), 3-4\ng = {0:[1,2], 1:[0,2], 2:[0,1,3], 3:[2,4], 4:[3]}\nprint(find_bridges_articulation(g, 5))  # bridges: [(2,3)], articulation: {2, 3}",
        output: "([(2, 3)], {2, 3})",
        note: "low[v] > disc[u] → bridge (v can't reach u). low[v] >= disc[u] → articulation (v can't reach above u). Root with >1 child is also articulation."
      }
    ],
    marginNotes: [
      "Bridge: low[v] > disc[u] (v can't reach u or above — the edge is the only connection). Articulation: low[v] >= disc[u] (v can reach u but not above).",
      "The root is an articulation point only if it has > 1 DFS child — each child subtree is a separate component without the root.",
      "Skip the parent edge (v != parent) — going back to the parent isn't a 'back edge' that provides an alternate path.",
      "An edge to u itself (low[v] == disc[u]) doesn't save u as an articulation point — removing u still isolates v's subtree."
    ],
    commonMistakes: [
      "Using low[v] >= disc[u] for bridges instead of low[v] > disc[u] — the >= would miss that v can reach u (the edge isn't a bridge if v can get back to u).",
      "Not handling the root specially — the root is an articulation point only with > 1 DFS child, not via the low[v] >= disc[u] check.",
      "Not skipping the parent edge (v != parent) — treating the parent as a back edge gives wrong low values.",
      "Using low[v] instead of disc[v] for back edges — back edges use disc[v] (the discovery time), not low[v]."
    ],
    relatedTopics: ["Graph Fundamentals", "DFS", "Strongly Connected Components", "Connectivity"],
    externalLinks: [
      { label: "Bridge (Graph Theory) (Wikipedia)", url: "https://en.wikipedia.org/wiki/Bridge_(graph_theory)" },
      { label: "Bridges (CP-Algorithms)", url: "https://cp-algorithms.com/graph/bridge-searching.html" }
    ],
    mcqs: [
      {
        question: "What condition makes edge (u, v) a bridge?",
        options: ["low[v] < disc[u]", "low[v] > disc[u] (v's subtree can't reach u or above)", "low[v] == disc[u]", "disc[v] == disc[u]"],
        answer: 1,
        explanations: ["That means v can reach above u — not a bridge.", "Correct — v can't reach u or any ancestor, so the edge is the only connection.", "v can reach u but not above — not a bridge, but u may be an articulation point.", "Discovery times are unique."],
        difficulty: "hard"
      },
      {
        question: "When is the DFS root an articulation point?",
        options: ["Always", "Never", "When it has more than 1 DFS child (each child subtree is a separate component without the root)", "When it has no children"],
        answer: 2,
        explanations: ["Not always.", "Not never.", "Correct — with 1 child, removing the root leaves the child subtree connected; with >1, they're separate.", "No children = isolated vertex, not articulation."],
        difficulty: "hard"
      },
      {
        question: "Why is the bridge condition low[v] > disc[u] but the articulation condition low[v] >= disc[u]?",
        options: ["They're the same", "A bridge needs v to not reach u at all; articulation allows v to reach u (but not above) — removing u still isolates v", "Bridges are stricter about articulation", "It's a typo"],
        answer: 1,
        explanations: ["They differ by the equality case.", "Correct — if low[v] == disc[u], v reaches u but not above: the edge isn't a bridge (v can reach u), but u is still an articulation point (removing u isolates v).", "The reasoning is about reachability, not strictness.", "Not a typo — the difference is meaningful."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "bipartite-graph",
    title: "Bipartite Graph Checking (BFS/DFS Coloring)",
    difficulty: "medium",
    definition: "A graph is bipartite if its vertices can be split into two sets such that every edge connects vertices from different sets — equivalently, the graph is 2-colorable (no two adjacent vertices share a color). A graph is bipartite if and only if it has no odd-length cycle. Check via BFS or DFS coloring: assign alternating colors; if a conflict arises, it's not bipartite.",
    coreUnderstanding: "2-coloring is the test: start from any uncolored vertex, color it 0, color all neighbors 1, their neighbors 0, etc. If you ever try to color a vertex that's already colored with the same color as its neighbor, the graph isn't bipartite (an odd cycle exists). BFS is natural (level-by-level alternation); DFS works too (alternate on recursion depth). The graph may be disconnected — check each component. The equivalence to 'no odd cycle' is the theorem: an even cycle alternates colors fine; an odd cycle forces two adjacent vertices to share a color. Bipartite graphs enable 2-SAT, matching (König's theorem), and are the basis for graph coloring problems.",
    howItWorks: "BFS COLORING (O(V+E)):\n1. color = [-1] * n (-1 = uncolored, 0/1 = the two colors).\n2. For each uncolored vertex (handle disconnected components):\n   a. Color it 0, enqueue it.\n   b. BFS: for each dequeued vertex u, for each neighbor v:\n      - If v uncolored: color v = 1 - color[u] (alternate), enqueue.\n      - If v colored and color[v] == color[u]: return False (conflict).\n3. Return True (all components colored without conflict).\n\nDFS COLORING: same logic, recursively. color[v] = 1 - color[u]; if a neighbor has the same color, conflict.\n\nODD CYCLE EQUIVALENCE: a graph is bipartite iff it has no odd-length cycle. Even cycles alternate fine; odd cycles force a conflict on the last edge.",
    codeExamples: [
      {
        lang: "python",
        code: "from collections import deque\n\n# Bipartite check via BFS coloring\ndef is_bipartite(graph, n):\n    color = [-1] * n  # -1 = uncolored, 0/1 = two colors\n    for start in range(n):\n        if color[start] != -1: continue  # already colored\n        color[start] = 0\n        queue = deque([start])\n        while queue:\n            u = queue.popleft()\n            for v in graph[u]:\n                if color[v] == -1:           # uncolored: alternate\n                    color[v] = 1 - color[u]\n                    queue.append(v)\n                elif color[v] == color[u]:    # conflict\n                    return False\n    return True\n\n# Even cycle (square): 0-1-2-3-0 -> bipartite\ng1 = {0:[1,3], 1:[0,2], 2:[1,3], 3:[0,2]}\nprint(is_bipartite(g1, 4))  # True\n\n# Odd cycle (triangle): 0-1-2-0 -> not bipartite\ng2 = {0:[1,2], 1:[0,2], 2:[0,1]}\nprint(is_bipartite(g2, 3))  # False",
        output: "True\nFalse",
        note: "Alternate colors (1 - color[u]). A conflict (neighbor has the same color) means an odd cycle → not bipartite."
      }
    ],
    marginNotes: [
      "Bipartite = 2-colorable = no odd cycle. All three are equivalent.",
      "Handle disconnected graphs — check each uncolored vertex as a new component start.",
      "color[v] = 1 - color[u] is the alternation. A conflict (color[v] == color[u]) means an odd cycle exists.",
      "Bipartite graphs enable bipartite matching (Hopcroft-Karp), 2-SAT, and are the basis for many graph partitioning problems."
    ],
    commonMistakes: [
      "Not handling disconnected graphs — a single BFS from one vertex misses other components. Loop over all uncolored vertices.",
      "Checking color[v] == color[u] before coloring v — color v first (if uncolored), then check on the NEXT visit.",
      "Using 3+ colors — bipartite is specifically 2-colorable. 3-coloring is a different (NP-hard) problem.",
      "Assuming directed graphs — bipartite checking is for UNDIRECTED graphs. For directed, ignore direction (treat as undirected)."
    ],
    relatedTopics: ["Graph Fundamentals", "BFS", "DFS", "Graph Coloring"],
    externalLinks: [
      { label: "Bipartite Graph (Wikipedia)", url: "https://en.wikipedia.org/wiki/Bipartite_graph" },
      { label: "Is Graph Bipartite? (LeetCode 785)", url: "https://leetcode.com/problems/is-graph-bipartite/" }
    ],
    mcqs: [
      {
        question: "A graph is bipartite if and only if it has:",
        options: ["No cycles at all", "No odd-length cycle", "No even-length cycle", "No edges"],
        answer: 1,
        explanations: ["Even cycles are fine.", "Correct — even cycles alternate colors; odd cycles force a conflict on the last edge.", "Even cycles are fine.", "An edgeless graph is trivially bipartite, but not the only case."],
        difficulty: "medium"
      },
      {
        question: "How do you alternate colors in BFS/DFS coloring?",
        options: ["color[v] = color[u]", "color[v] = 1 - color[u]", "color[v] = color[u] + 1", "color[v] = random"],
        answer: 1,
        explanations: ["Same color — wrong.", "Correct — 1 - 0 = 1, 1 - 1 = 0. Alternates between the two colors.", "Could exceed 1.", "Must be deterministic."],
        difficulty: "easy"
      },
      {
        question: "Why must you loop over all vertices to start BFS?",
        options: ["To sort them", "The graph may be disconnected — each component needs its own BFS start", "To count vertices", "To detect cycles"],
        answer: 1,
        explanations: ["No sorting.", "Correct — a single BFS covers one component; disconnected components need separate starts.", "Counting is separate.", "Cycle detection is a side effect."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "combinatorics-modular",
    title: "Combinatorics (nCr, Catalan, Modular Inverse)",
    difficulty: "hard",
    definition: "Combinatorics counts arrangements: nCr (n choose r) = n! / (r!(n-r)!), Catalan numbers count valid bracket sequences and BST shapes, and modular inverse enables division under a prime modulus (since you can't divide mod p directly). All are essential for counting problems in competitive programming.",
    coreUnderstanding: "nCr counts the ways to choose r items from n. The direct formula n!/(r!(n-r)!) overflows for large n, so we compute it iteratively: nCr = product((n-i)/(i+1) for i in range(r)), or use Pascal's triangle (dp[i][j] = dp[i-1][j-1] + dp[i-1][j]). Under a prime modulus, division becomes multiplication by the modular inverse: a/b mod p = a * b^(p-2) mod p (Fermat's little theorem, when p is prime and b not divisible by p). Precompute factorials and inverse factorials for O(1) nCr queries. Catalan numbers: C_n = (2n choose n) / (n+1) = C(2n, n) - C(2n, n+1). They count BST shapes, bracket sequences, Dyck paths, and polygon triangulations.",
    howItWorks: "nCr (iterative, no overflow for small n):\n• nCr = 1; for i in range(r): nCr = nCr * (n - i) // (i + 1). (Exact at each step if done in order.)\n• Or Pascal's triangle: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]. O(n²) space, O(1) query.\n\nnCr MOD p (precomputed factorials):\n• Precompute fact[i] = i! mod p, inv_fact[i] = (i!)^(-1) mod p for i up to n.\n• nCr mod p = fact[n] * inv_fact[r] * inv_fact[n-r] mod p. O(1) per query.\n• Modular inverse: inv(x) = x^(p-2) mod p (Fermat), or extended Euclidean.\n\nCATALAN NUMBERS:\n• C_n = (1/(n+1)) * C(2n, n) = C(2n, n) - C(2n, n+1).\n• C_0 = 1; C_{n+1} = sum(C_i * C_{n-i} for i in range(n+1)).\n• Counts: valid parentheses, BST shapes, Dyck paths, triangulations.\n\nMODULAR INVERSE (Fermat's little theorem):\n• a^(-1) mod p = a^(p-2) mod p (p prime, a not divisible by p).\n• Or extended Euclidean: ax + py = 1 → x is the inverse.",
    codeExamples: [
      {
        lang: "python",
        code: "MOD = 10**9 + 7\n\n# Precompute factorials and inverse factorials for O(1) nCr mod p\ndef precompute_factorials(n, mod):\n    fact = [1] * (n + 1); inv_fact = [1] * (n + 1)\n    for i in range(1, n + 1):\n        fact[i] = fact[i-1] * i % mod\n    inv_fact[n] = pow(fact[n], mod - 2, mod)  # Fermat's little theorem\n    for i in range(n - 1, -1, -1):\n        inv_fact[i] = inv_fact[i+1] * (i + 1) % mod\n    return fact, inv_fact\n\ndef nCr(n, r, fact, inv_fact, mod):\n    if r < 0 or r > n: return 0\n    return fact[n] * inv_fact[r] % mod * inv_fact[n - r] % mod\n\nfact, inv_fact = precompute_factorials(1000, MOD)\nprint(nCr(10, 3, fact, inv_fact, MOD))  # 120",
        output: "120",
        note: "Precompute fact and inv_fact. nCr mod p = fact[n] * inv_fact[r] * inv_fact[n-r]. O(1) per query after O(n) precompute."
      },
      {
        lang: "python",
        code: "# Catalan numbers — count valid bracket sequences, BST shapes\ndef catalan(n, mod=10**9 + 7):\n    # C_n = C(2n, n) // (n + 1)\n    fact, inv_fact = precompute_factorials(2 * n, mod)\n    return nCr(2 * n, n, fact, inv_fact, mod) * pow(n + 1, mod - 2, mod) % mod\n\nfor i in range(5):\n    print(catalan(i), end=' ')  # 1 1 2 5 14",
        output: "1 1 2 5 14",
        note: "C_n = C(2n,n)/(n+1). Counts: valid parentheses (n=3 -> 5: ()()(), ()(()), (())(), (()()), ((())))."
      }
    ],
    marginNotes: [
      "Modular inverse: a/b mod p = a * b^(p-2) mod p (Fermat, p prime). You can't divide mod p directly — multiply by the inverse.",
      "Precompute fact and inv_fact for O(1) nCr queries. inv_fact[n] = (n!)^(p-2), then inv_fact[i] = inv_fact[i+1] * (i+1) (backward).",
      "Catalan numbers: C_n = C(2n,n)/(n+1). Count valid brackets, BST shapes, Dyck paths, polygon triangulations.",
      "Pascal's triangle (dp[i][j] = dp[i-1][j-1] + dp[i-1][j]) avoids modular inverse — useful when p isn't prime or n is small."
    ],
    commonMistakes: [
      "Dividing mod p directly — you can't. Use the modular inverse: multiply by b^(p-2) mod p.",
      "Not precomputing inverse factorials — computing the inverse per query is O(log p) each; precompute for O(1).",
      "Forgetting that Fermat's little theorem requires p to be PRIME and a not divisible by p. Use extended Euclidean otherwise.",
      "Computing inv_fact forward instead of backward — inv_fact[i] depends on inv_fact[i+1], so compute from n down to 0."
    ],
    relatedTopics: ["Number Theory", "Modular Arithmetic", "Sieve of Eratosthenes", "Dynamic Programming"],
    externalLinks: [
      { label: "Modular Inverse (CP-Algorithms)", url: "https://cp-algorithms.com/algebra/module-inverse.html" },
      { label: "Catalan Numbers (Wikipedia)", url: "https://en.wikipedia.org/wiki/Catalan_number" }
    ],
    mcqs: [
      {
        question: "How do you compute a/b mod p (p prime)?",
        options: ["(a mod p) / (b mod p)", "a * b^(p-2) mod p (multiply by the modular inverse)", "a - b mod p", "a * b mod p"],
        answer: 1,
        explanations: ["Division mod p isn't defined.", "Correct — Fermat's little theorem: b^(-1) = b^(p-2) mod p, so a/b = a * b^(p-2).", "That's subtraction.", "That's multiplication, not division."],
        difficulty: "hard"
      },
      {
        question: "What is the time complexity of nCr mod p with precomputed factorials?",
        options: ["O(n)", "O(1) per query (after O(n) precompute)", "O(log n)", "O(n²)"],
        answer: 1,
        explanations: ["That's the precompute.", "Correct — fact[n] * inv_fact[r] * inv_fact[n-r] is O(1) with precomputed arrays.", "No log per query.", "That's Pascal's triangle."],
        difficulty: "medium"
      },
      {
        question: "What do Catalan numbers count?",
        options: ["Permutations", "Valid bracket sequences, BST shapes, Dyck paths", "Prime numbers", "Fibonacci-like sequences"],
        answer: 1,
        explanations: ["That's factorial.", "Correct — C_n = C(2n,n)/(n+1) counts these combinatorial structures.", "That's the sieve.", "Catalan is a specific sequence, not Fibonacci-like."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "greedy-algorithms",
    title: "Greedy Algorithms (Activity Selection, Huffman)",
    difficulty: "medium",
    definition: "Greedy algorithms make the locally optimal choice at each step, hoping to reach a global optimum. They work when the problem has the greedy-choice property (a local optimum leads to a global optimum) and optimal substructure. Classic: activity selection, Huffman coding, fractional knapsack, job sequencing. Not all problems are greedy-solvable — when greedy fails, use DP.",
    coreUnderstanding: "Greedy is simpler and faster than DP (no state, no table), but only works for problems with the greedy-choice property: a local optimal choice is part of some global optimum. Activity selection: sort by end time, pick the earliest-ending activity, then the next that starts after it — each choice is locally optimal (earliest end leaves the most room) and globally optimal. Huffman coding: merge the two least-frequent nodes repeatedly (greedy on frequency) — builds the optimal prefix code. Fractional knapsack: take items by value/weight ratio (greedy on density) — unlike 0/1 knapsack (which needs DP), fractional allows partial items, so greedy works. The art is proving the greedy choice is safe (exchange argument: swap any optimal solution's first choice for the greedy one without making it worse).",
    howItWorks: "ACTIVITY SELECTION (max non-overlapping activities):\n1. Sort by end time.\n2. Pick the first (earliest-ending). Set last_end = its end.\n3. For each next activity: if its start >= last_end, pick it, update last_end.\n• Greedy choice: earliest end leaves the most room for the rest. Proven optimal by exchange argument.\n\nHUFFMAN CODING (optimal prefix code):\n1. Put all characters (with frequencies) in a min-heap.\n2. Repeatedly: extract the two least-frequent, merge into a new node (sum of frequencies), push back.\n3. The tree gives the code: left = 0, right = 1. Frequent chars have short codes.\n• Greedy choice: merge the two smallest — minimizes total cost.\n\nFRACTIONAL KNAPSACK (items can be split):\n1. Sort items by value/weight ratio (descending).\n2. Take as much as possible of each (full item, or a fraction to fill the remaining capacity).\n• Greedy on density. Unlike 0/1 knapsack (DP), fractional allows partial items, so greedy is optimal.\n\nEXCHANGE ARGUMENT (proof technique): take any optimal solution; swap its first choice for the greedy choice; show the result is still optimal. This proves the greedy choice is 'safe.'",
    codeExamples: [
      {
        lang: "python",
        code: "# Activity Selection — max non-overlapping activities\ndef activity_selection(activities):\n    # activities: [(start, end), ...]\n    activities.sort(key=lambda x: x[1])  # sort by end time\n    selected = [activities[0]]\n    last_end = activities[0][1]\n    for start, end in activities[1:]:\n        if start >= last_end:  # non-overlapping\n            selected.append((start, end))\n            last_end = end\n    return selected\n\nprint(activity_selection([(1, 4), (3, 5), (0, 6), (5, 7), (8, 9), (5, 9)]))\n# [(1,4), (5,7), (8,9)] — 3 activities",
        output: "[(1, 4), (5, 7), (8, 9)]",
        note: "Sort by end time, pick the earliest-ending, then the next that starts after it. Greedy: earliest end = most room left."
      },
      {
        lang: "python",
        code: "import heapq\n\n# Huffman Coding — optimal prefix code\ndef huffman(freq):\n    heap = [[f, [ch, '']] for ch, f in freq.items()]\n    heapq.heapify(heap)\n    while len(heap) > 1:\n        lo = heapq.heappop(heap); hi = heapq.heappop(heap)\n        for pair in lo[1:]: pair[1] = '0' + pair[1]  # left = 0\n        for pair in hi[1:]: pair[1] = '1' + pair[1]  # right = 1\n        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])\n    return sorted(heap[0][1:], key=lambda p: (len(p[1]), p))\n\nprint(huffman({'a': 45, 'b': 13, 'c': 12, 'd': 16, 'e': 9, 'f': 5}))\n# a: 0, b: 101, c: 100, d: 111, e: 1101, f: 1100 (frequent = short)",
        output: "[('a', '0'), ('c', '100'), ('b', '101'), ('f', '1100'), ('e', '1101'), ('d', '111')]",
        note: "Merge the two least-frequent repeatedly. Frequent chars get short codes — minimizes total encoded length."
      }
    ],
    marginNotes: [
      "Greedy works only when the problem has the greedy-choice property (local optimal = global optimal) and optimal substructure.",
      "Activity selection: sort by END time (not start) — earliest end leaves the most room. Proven by exchange argument.",
      "Fractional knapsack (greedy on value/weight ratio) vs 0/1 knapsack (DP) — the difference is whether items can be split.",
      "Exchange argument: swap any optimal solution's first choice for the greedy one; show it's still optimal. This proves the greedy choice is 'safe.'"
    ],
    commonMistakes: [
      "Using greedy where DP is needed (e.g., 0/1 knapsack) — greedy on value/weight ratio fails for 0/1 (can't split items).",
      "Sorting by start time in activity selection — earliest start doesn't leave the most room; earliest end does.",
      "Not proving the greedy choice is safe — greedy can give wrong answers if the greedy-choice property doesn't hold.",
      "Confusing fractional knapsack (greedy, O(n log n)) with 0/1 knapsack (DP, O(n·W)) — they need different approaches."
    ],
    relatedTopics: ["Sorting", "Dynamic Programming", "Heaps & Priority Queue", "Optimization"],
    externalLinks: [
      { label: "Greedy Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Greedy_algorithm" },
      { label: "Huffman Coding (Wikipedia)", url: "https://en.wikipedia.org/wiki/Huffman_coding" }
    ],
    mcqs: [
      {
        question: "What property must a problem have for greedy to work?",
        options: ["It must be NP-hard", "The greedy-choice property (a local optimum is part of a global optimum) and optimal substructure", "It must be a sorting problem", "It must have a single solution"],
        answer: 1,
        explanations: ["Greedy avoids NP-hardness when it works.", "Correct — without these, greedy can give suboptimal results.", "Sorting is a tool, not a requirement.", "Multiple solutions are fine."],
        difficulty: "medium"
      },
      {
        question: "In activity selection, why sort by end time (not start time)?",
        options: ["Start time is irrelevant", "Earliest end leaves the most room for remaining activities — proven by exchange argument", "End time is easier to sort", "It avoids overlaps"],
        answer: 1,
        explanations: ["Start time matters but isn't the sort key.", "Correct — earliest end maximizes remaining time; the exchange argument proves it optimal.", "Same difficulty.", "Both avoid overlaps, but end-time sort is optimal."],
        difficulty: "medium"
      },
      {
        question: "Why does greedy work for fractional knapsack but not 0/1 knapsack?",
        options: ["Fractional is simpler", "Fractional allows splitting items — taking the best ratio is optimal; 0/1 can't split, so a high-ratio item may block better combinations", "0/1 is NP-hard", "Fractional uses a heap"],
        answer: 1,
        explanations: ["Simplicity isn't the reason.", "Correct — in 0/1, taking the best-ratio item may fill the bag suboptimally (can't take a fraction of the next).", "0/1 is polynomial (DP).", "Both can use heaps, but that's not the reason."],
        difficulty: "hard"
      }
    ]
  }
];