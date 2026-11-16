export default [
  {
    id: "intervals",
    title: "Intervals (Merge, Insert, Meeting Rooms)",
    difficulty: "medium",
    definition: "Interval problems deal with ranges [start, end] — merging overlapping intervals, inserting a new interval into a sorted list, or checking if meeting times conflict. The universal first step is sorting by start time, after which overlaps become detectable in a single O(n) pass.",
    coreUnderstanding: "An interval overlaps another if its start is <= the other's end. When intervals are sorted by start, any overlap is between consecutive intervals in the sorted order — so a single left-to-right pass with a 'current merged interval' suffices. The pattern generalizes: sort by one endpoint, then sweep. For meeting rooms (maximum concurrent meetings), the trick is to separate start and end events, sort both, then sweep with a counter — increment on a start, decrement on an end, track the max.",
    howItWorks: "MERGE INTERVALS:\n1. Sort by start time.\n2. Initialize merged = [intervals[0]].\n3. For each next interval:\n   - If its start <= last merged end → overlap: extend last merged end to max(last_end, current_end).\n   - Else → no overlap: append as a new interval.\n\nINSERT INTERVAL (into already-sorted, non-overlapping list):\n1. Add all intervals ending before the new one (no overlap).\n2. Merge all overlapping intervals into the new one (extend start/end).\n3. Add the rest.\n\nMEETING ROOMS II (min rooms needed):\n1. Separate starts and ends into two sorted arrays.\n2. Two pointers: on a start, rooms++; on an end, rooms--. Track max.\n3. Or: create events (+1 for start, -1 for end), sort by time, sweep prefix sum, max is the answer.\n\nCOMPLEXITY: O(n log n) for the sort, O(n) for the sweep. Space O(n) for output or O(1) in-place.",
    codeExamples: [
      {
        lang: "python",
        code: "# Merge overlapping intervals\ndef merge(intervals):\n    if not intervals: return []\n    intervals.sort(key=lambda x: x[0])   # sort by start\n    merged = [intervals[0]]\n    for start, end in intervals[1:]:\n        if start <= merged[-1][1]:       # overlap\n            merged[-1][1] = max(merged[-1][1], end)\n        else:\n            merged.append([start, end])  # no overlap\n    return merged\n\nprint(merge([[1,3],[2,6],[8,10],[15,18]]))",
        output: "[[1, 6], [8, 10], [15, 18]]",
        note: "Sort by start, then sweep: extend on overlap, append on gap. The sort is the key enabler."
      },
      {
        lang: "python",
        code: "# Meeting Rooms II — min rooms needed (sweep-line with events)\nimport heapq\n\ndef min_meeting_rooms(intervals):\n    if not intervals: return 0\n    starts = sorted(i[0] for i in intervals)\n    ends = sorted(i[1] for i in intervals)\n    rooms = max_rooms = 0\n    s = e = 0\n    while s < len(starts):\n        if starts[s] < ends[e]:\n            rooms += 1; s += 1\n            max_rooms = max(max_rooms, rooms)\n        else:\n            rooms -= 1; e += 1\n    return max_rooms\n\nprint(min_meeting_rooms([[0,30],[5,10],[15,20]]))",
        output: "2",
        note: "Two sorted arrays, sweep: a start before the next end means a new room; an end frees a room. Max concurrent = answer."
      }
    ],
    marginNotes: [
      "Sort by start time FIRST — it's the universal first step. Without sorting, you need O(n²) pairwise checks.",
      "Overlap condition: start <= last_end (not <). Touching intervals [1,2] and [2,3] may or may not overlap — clarify with the problem.",
      "Meeting Rooms II can also use a min-heap of end times: push each end, pop all ended before the current start, heap size = rooms.",
      "Insert Interval into a sorted list is O(n) — no re-sort needed. Exploit the existing sort order."
    ],
    commonMistakes: [
      "Not sorting by start first — makes overlap detection O(n²) and error-prone.",
      "Using start < last_end instead of start <= last_end — misses touching intervals (depends on problem definition).",
      "Forgetting to extend the end with max() — just checking overlap isn't enough; the merged end is the max of both ends.",
      "In Meeting Rooms II, counting total meetings instead of max concurrent — the answer is the peak, not the count."
    ],
    relatedTopics: ["Sweep-Line Algorithm", "Sorting", "Greedy Algorithms", "Prefix Sum"],
    externalLinks: [
      { label: "Merge Intervals (LeetCode 56)", url: "https://leetcode.com/problems/merge-intervals/" },
      { label: "Meeting Rooms II (LeetCode 253)", url: "https://leetcode.com/problems/meeting-rooms-ii/" }
    ],
    mcqs: [
      {
        question: "What is the first step in almost every interval problem?",
        options: ["Sort by end time", "Sort by start time", "Find the longest interval", "Remove duplicates"],
        answer: 1,
        explanations: ["End-time sort is for specific variants, not the default.", "Correct — sorting by start makes overlaps detectable in one pass.", "Length is irrelevant to overlap.", "Duplicates don't matter for overlap."],
        difficulty: "easy"
      },
      {
        question: "What is the time complexity of merging n intervals?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        answer: 1,
        explanations: ["That's the sweep, but the sort dominates.", "Correct — O(n log n) sort + O(n) sweep = O(n log n).", "Only without sorting (brute force).", "Impossible for n intervals."],
        difficulty: "easy"
      },
      {
        question: "In Meeting Rooms II, what does the answer represent?",
        options: ["Total number of meetings", "Maximum number of concurrent meetings", "Longest meeting duration", "Number of unique rooms"],
        answer: 1,
        explanations: ["That's just len(intervals).", "Correct — the peak concurrent count is the minimum rooms needed.", "Duration is irrelevant.", "Same as concurrent, but 'concurrent' is the precise term."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "matrix-grid-traversal",
    title: "Matrix / 2D Grid Traversal",
    difficulty: "medium",
    definition: "Matrix traversal covers patterns for navigating 2D grids: spiral order (layer-by-layer peeling), flood fill (BFS/DFS from a source), and multi-source BFS (rotting oranges, walls-and-gates). The grid is a graph where each cell connects to its 4 (or 8) neighbors.",
    coreUnderstanding: "A 2D grid is just a graph where cells are nodes and adjacent cells are edges. The key patterns: spiral order peels the matrix layer by layer (shrinking boundaries), flood fill explores a connected region from a seed (BFS or DFS), and multi-source BFS starts from all sources simultaneously to find the minimum distance to any target (rotting oranges: all rotten oranges spread at once, answer is the max distance). The direction vectors [(0,1),(1,0),(0,-1),(-1,0)] encode the 4 neighbors compactly.",
    howItWorks: "SPIRAL ORDER:\n1. Maintain four boundaries: top, bottom, left, right.\n2. Traverse: left→right on top, then top→bottom on right, then right→left on bottom (if top<bottom), then bottom→top on left (if left<right).\n3. Shrink boundaries after each direction. Repeat until boundaries cross.\n\nFLOOD FILL (BFS or DFS):\n1. From a seed cell, change its color/value.\n2. Explore 4-directional neighbors with the same original color.\n3. BFS (queue) or DFS (stack/recursion). Mark visited to avoid revisiting.\n\nMULTI-SOURCE BFS (Rotting Oranges):\n1. Find all sources (rotten oranges), enqueue them all with distance 0.\n2. BFS: each step, spread to fresh neighbors, mark them, enqueue with distance+1.\n3. The answer is the max distance (last fresh orange rotted). If any fresh remains, return -1.\n\nDIRECTION VECTORS: dirs = [(0,1),(1,0),(0,-1),(-1,0)] for 4-directional. Add diagonals for 8-directional.",
    codeExamples: [
      {
        lang: "python",
        code: "# Spiral matrix traversal\ndef spiral_order(matrix):\n    if not matrix: return []\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n    result = []\n    while top <= bottom and left <= right:\n        for j in range(left, right + 1): result.append(matrix[top][j])\n        top += 1\n        for i in range(top, bottom + 1): result.append(matrix[i][right])\n        right -= 1\n        if top <= bottom:\n            for j in range(right, left - 1, -1): result.append(matrix[bottom][j])\n            bottom -= 1\n        if left <= right:\n            for i in range(bottom, top - 1, -1): result.append(matrix[i][left])\n            left += 1\n    return result\n\nprint(spiral_order([[1,2,3],[4,5,6],[7,8,9]]))",
        output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
        note: "Four boundaries shrink inward. The if-guards prevent double-counting the last row/column."
      },
      {
        lang: "python",
        code: "# Rotting Oranges — multi-source BFS\nfrom collections import deque\n\ndef oranges_rotting(grid):\n    rows, cols = len(grid), len(grid[0])\n    queue = deque()\n    fresh = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 2: queue.append((r, c, 0))  # rotten, dist 0\n            elif grid[r][c] == 1: fresh += 1\n    if fresh == 0: return 0\n    dirs = [(0,1),(1,0),(0,-1),(-1,0)]\n    max_dist = 0\n    while queue:\n        r, c, dist = queue.popleft()\n        for dr, dc in dirs:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:\n                grid[nr][nc] = 2; fresh -= 1\n                max_dist = max(max_dist, dist + 1)\n                queue.append((nr, nc, dist + 1))\n    return max_dist if fresh == 0 else -1\n\nprint(oranges_rotting([[2,1,1],[1,1,0],[0,1,1]]))",
        output: "4",
        note: "All rotten oranges start in the queue simultaneously — BFS guarantees minimum time to rot each fresh one."
      }
    ],
    marginNotes: [
      "Direction vectors [(0,1),(1,0),(0,-1),(-1,0)] are the standard 4-neighbor encoding — cleaner than 4 if-statements.",
      "Multi-source BFS: enqueue ALL sources at once. BFS guarantees each cell is reached in minimum steps from its nearest source.",
      "Spiral order: the if-guards (top<=bottom, left<=right) prevent re-traversing the last row/column on non-square matrices.",
      "Flood fill can overflow the recursion stack on large grids — use BFS (queue) or iterative DFS for 1000×1000 grids."
    ],
    commonMistakes: [
      "Forgetting boundary checks (0 <= nr < rows, 0 <= nc < cols) before accessing grid[nr][nc] — index out of bounds.",
      "Not marking cells as visited when enqueuing (instead of when dequeuing) — same cell enqueued multiple times.",
      "In spiral order, missing the if-guards — double-counts the last row or column on non-square matrices.",
      "Using single-source BFS for rotting oranges — must enqueue ALL rotten oranges at once for correct minimum time."
    ],
    relatedTopics: ["BFS", "DFS", "Graph Fundamentals", "Flood Fill"],
    externalLinks: [
      { label: "Spiral Matrix (LeetCode 54)", url: "https://leetcode.com/problems/spiral-matrix/" },
      { label: "Rotting Oranges (LeetCode 994)", url: "https://leetcode.com/problems/rotting-oranges/" }
    ],
    mcqs: [
      {
        question: "Why does multi-source BFS enqueue all sources at distance 0?",
        options: ["It's faster", "BFS from all sources simultaneously guarantees each cell is reached in minimum steps from its nearest source", "To avoid sorting", "To reduce memory"],
        answer: 1,
        explanations: ["Same speed per cell.", "Correct — simultaneous expansion gives the min distance to the nearest source for every cell.", "Sorting isn't involved.", "Memory is the same."],
        difficulty: "medium"
      },
      {
        question: "What do the direction vectors [(0,1),(1,0),(0,-1),(-1,0)] represent?",
        options: ["Diagonal moves", "The 4 cardinal directions (right, down, left, up)", "Pixel coordinates", "Sorting order"],
        answer: 1,
        explanations: ["Those would be diagonals like (1,1).", "Correct — (dr, dc) deltas for the 4 neighbors.", "No.", "No."],
        difficulty: "easy"
      },
      {
        question: "In spiral matrix, why are the if-guards (top<=bottom, left<=right) needed?",
        options: ["To speed up the traversal", "To prevent double-counting the last row/column on non-square matrices", "To sort the output", "To handle negative numbers"],
        answer: 1,
        explanations: ["No speed change.", "Correct — after top++ and right--, the bottom and left traversals may be empty; the guards skip them.", "No sorting.", "Negatives are irrelevant."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "sweep-line",
    title: "Sweep-Line Algorithm",
    difficulty: "hard",
    definition: "Sweep-line processes events sorted by coordinate (or time) by sweeping a vertical line across them, maintaining active state. Each event (start or end of an interval, a point) updates the state; the answer is derived from the state at each event. It turns O(n²) interval/point problems into O(n log n).",
    coreUnderstanding: "Sweep-line is the generalization of the meeting-rooms and merge-intervals ideas. Instead of comparing every pair of intervals, sort all events (starts and ends) by position, then sweep left to right. At each event, update a counter or active set. The key insight: between consecutive events, the state doesn't change — so you only need to process events, not the entire continuum. This is the 1D version of computational geometry algorithms; 2D sweep-line (Bentley-Ottmann for line segment intersections) is more complex.",
    howItWorks: "1. Convert each interval/segment into EVENTS: a start event (+1) and an end event (-1).\n2. Sort events by coordinate. On ties, process ends before starts (or per problem rules — e.g., for 'max concurrent', starts before ends).\n3. Sweep: maintain a running counter (or active set). At each event, add or remove.\n4. The answer is derived from the state: max counter (max concurrent), sum of active lengths (total covered length), etc.\n\nVARIANTS:\n• Max concurrent intervals: +1 on start, -1 on end, track max of running sum.\n• Total covered length: track active intervals, sum (next_event - current_event) × active_count.\n• Point in max intervals: same as max concurrent, but query at a specific point.\n• Skyline problem: building height events, maintain a sorted set of active heights, track the max.\n\nCOMPLEXITY: O(n log n) for sorting, O(n) for the sweep. Space O(n) for events.",
    codeExamples: [
      {
        lang: "python",
        code: "# Max concurrent intervals via sweep-line\ndef max_concurrent(intervals):\n    events = []\n    for start, end in intervals:\n        events.append((start, 1))   # +1 on start\n        events.append((end, -1))     # -1 on end\n    events.sort()                    # sort by coordinate\n    current = best = 0\n    for _, delta in events:\n        current += delta\n        best = max(best, current)\n    return best\n\nprint(max_concurrent([(0,30),(5,10),(15,20)]))",
        output: "2",
        note: "Each interval becomes two events. Sort, sweep, track the running sum's max — that's the peak concurrency."
      },
      {
        lang: "python",
        code: "# Total covered length of union of intervals\ndef covered_length(intervals):\n    events = []\n    for start, end in intervals:\n        events.append((start, 1))\n        events.append((end, -1))\n    events.sort()\n    length = 0\n    active = 0\n    prev = None\n    for coord, delta in events:\n        if active > 0 and prev is not None:\n            length += coord - prev\n        active += delta\n        prev = coord\n    return length\n\nprint(covered_length([(1,5),(3,8),(10,12)]))",
        output: "9  # [1,8] = 7 + [10,12] = 2",
        note: "Between consecutive events, the covered length grows by (coord - prev) × active. Sum over all gaps."
      }
    ],
    marginNotes: [
      "Sweep-line = sort events + sweep with a counter. It's the generalization of merge-intervals and meeting-rooms.",
      "Event tie-breaking matters: for 'max concurrent', process starts before ends at the same coordinate (a meeting starting when another ends still needs a room).",
      "Between consecutive events, the state is constant — so you only process events, not the entire coordinate range.",
      "The skyline problem uses sweep-line with a sorted set (or heap) of active building heights — the max height at each event is the skyline."
    ],
    commonMistakes: [
      "Wrong tie-breaking on same-coordinate events — starts vs ends order changes the answer for concurrent-count problems.",
      "Forgetting to sort events — the sweep only works if events are in coordinate order.",
      "Not handling the 'between events' gap correctly for covered-length — the length accumulates only when active > 0.",
      "Using O(n²) pairwise comparison instead of events — defeats the entire point of sweep-line."
    ],
    relatedTopics: ["Intervals", "Sorting", "Priority Queue", "Computational Geometry"],
    externalLinks: [
      { label: "Sweep Line Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sweep_line_algorithm" },
      { label: "The Skyline Problem (LeetCode 218)", url: "https://leetcode.com/problems/the-skyline-problem/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of a sweep-line algorithm with n events?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(n log² n)"],
        answer: 1,
        explanations: ["That's the sweep, but sorting dominates.", "Correct — O(n log n) sort + O(n) sweep.", "That's the brute force.", "No nested log unless using a balanced BST for active set."],
        difficulty: "medium"
      },
      {
        question: "How does each interval become events in sweep-line?",
        options: ["One event per interval", "Two events: a +1 start and a -1 end", "Four events (corners)", "One event at the midpoint"],
        answer: 1,
        explanations: ["Not enough to track concurrency.", "Correct — start adds, end removes; the running sum is the active count.", "Intervals are 1D, not 2D.", "The midpoint is irrelevant."],
        difficulty: "easy"
      },
      {
        question: "Why does tie-breaking (starts before ends at the same coordinate) matter for max concurrent?",
        options: ["It doesn't matter", "A meeting starting when another ends at the same time still needs a room — processing start first counts the overlap", "It affects sorting speed", "It changes the coordinate values"],
        answer: 1,
        explanations: ["It does matter.", "Correct — if end is processed first, the counter drops before the start, undercounting the peak.", "No speed effect.", "Coordinates are unchanged."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "binary-search-on-answer",
    title: "Binary Search on Answer",
    difficulty: "hard",
    definition: "Binary search on answer (predicate binary search) bisects the ANSWER SPACE, not an array. If a predicate 'is X achievable?' is monotonic (false...false, true...true), binary search finds the boundary — the minimum or maximum feasible value. Classic problems: 'capacity to ship packages within D days', 'Koko eating bananas', 'split array largest sum'.",
    coreUnderstanding: "The insight: instead of searching for a target in an array, search for the optimal value in a range [lo, hi]. The predicate 'can we achieve value v?' must be monotonic: if v works, any easier value (larger capacity, slower speed) also works; if v fails, any harder value also fails. This monotonicity lets us discard half the range each step — O(log(range)) evaluations of the predicate, each O(n). The hard part is recognizing that a problem is a binary-search-on-answer and defining the monotonic predicate.",
    howItWorks: "1. DEFINE the search space: [lo, hi] — the range of possible answers (e.g., capacity from max(weights) to sum(weights)).\n2. DEFINE the predicate: can(value) → True if the answer 'value' is achievable (e.g., can we ship all packages within D days with capacity 'value'?).\n3. VERIFY monotonicity: if can(v) is true, can(v+1) is also true (or vice versa). If not monotonic, binary search doesn't apply.\n4. BINARY SEARCH: while lo < hi, mid = (lo + hi) // 2. If can(mid) is true, search left (hi = mid); else search right (lo = mid + 1).\n5. lo is the minimum feasible value (or maximum, depending on predicate direction).\n\nPREDICATE EXAMPLE (ship within D days): can(capacity) = greedily pack packages into days; if days_needed <= D, true. Monotonic: larger capacity → fewer days → stays true.\n\nCOMPLEXITY: O(n · log(range)) — n for the predicate, log(range) for the search. range is typically sum - max, so log is ~30-60.",
    codeExamples: [
      {
        lang: "python",
        code: "# Capacity To Ship Packages Within D Days\ndef ship_within_days(weights, days):\n    def can(capacity):\n        current = 0; need = 1\n        for w in weights:\n            if current + w > capacity:\n                need += 1; current = 0\n            current += w\n        return need <= days\n\n    lo, hi = max(weights), sum(weights)  # search space\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if can(mid):       # feasible → try smaller\n            hi = mid\n        else:              # infeasible → need bigger\n            lo = mid + 1\n    return lo\n\nprint(ship_within_days([1,2,3,4,5,6,7,8,9,10], 5))",
        output: "15",
        note: "The predicate 'can(capacity)' is monotonic: larger capacity → fewer days. Binary search finds the minimum feasible capacity."
      },
      {
        lang: "python",
        code: "# Koko Eating Bananas — min speed to eat all piles within h hours\ndef min_eating_speed(piles, h):\n    def can(speed):\n        hours = 0\n        for p in piles:\n            hours += (p + speed - 1) // speed  # ceil division\n        return hours <= h\n\n    lo, hi = 1, max(piles)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if can(mid):\n            hi = mid\n        else:\n            lo = mid + 1\n    return lo\n\nprint(min_eating_speed([3,6,7,11], 8))",
        output: "4",
        note: "Faster speed → fewer hours. Binary search the minimum speed that finishes within h hours."
      }
    ],
    marginNotes: [
      "The key recognition: if you're asked for a 'minimum/maximum value' and can test feasibility, think binary search on the answer.",
      "The predicate MUST be monotonic. Verify: if can(v) is true, is can(v+1) always true? If not, this technique doesn't apply.",
      "lo = max(weights), hi = sum(weights) for capacity problems — the lower bound is the heaviest single package, the upper is shipping all at once.",
      "O(n · log(range)) — the predicate is O(n), the search is O(log(range)). range is typically large (up to 10⁹), so log is ~30."
    ],
    commonMistakes: [
      "Not verifying the predicate is monotonic — if feasibility isn't monotonic, binary search gives wrong answers.",
      "Using lo <= hi instead of lo < hi — can cause infinite loops or off-by-one. The standard template uses lo < hi with hi = mid (not mid - 1).",
      "Setting hi = mid - 1 on a true predicate — mid might be the answer; use hi = mid to keep it in the range.",
      "Forgetting to ceil-divide (p + speed - 1) // speed for hours-per-pile — integer division truncates, undercounting hours."
    ],
    relatedTopics: ["Binary Search", "Greedy Algorithms", "Predicate Monotonicity", "Optimization"],
    externalLinks: [
      { label: "Binary Search on Answer (CP-Algorithms)", url: "https://cp-algorithms.com/num_methods/ternary_search.html" },
      { label: "Capacity To Ship Packages (LeetCode 1011)", url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" }
    ],
    mcqs: [
      {
        question: "What property must the predicate have for binary search on answer to work?",
        options: ["It must be fast", "It must be monotonic (true...true, false...false or vice versa)", "It must be recursive", "It must return an integer"],
        answer: 1,
        explanations: ["Speed helps but isn't required.", "Correct — monotonicity lets us discard half the range each step.", "Recursion is irrelevant.", "The return type doesn't matter."],
        difficulty: "medium"
      },
      {
        question: "In the standard template, what happens when can(mid) is true?",
        options: ["lo = mid + 1", "hi = mid (keep mid in range, try smaller)", "hi = mid - 1", "return mid immediately"],
        answer: 1,
        explanations: ["That's for the false case.", "Correct — mid might be the answer; search the lower half but keep mid.", "Loses mid, which might be the answer.", "Don't return early; converge to the boundary."],
        difficulty: "hard"
      },
      {
        question: "What is the time complexity of binary search on answer with an O(n) predicate?",
        options: ["O(n)", "O(n log n)", "O(n · log(range))", "O(log n)"],
        answer: 2,
        explanations: ["That's the predicate alone.", "That's sorting.", "Correct — O(n) per predicate × O(log(range)) searches.", "That's just the search, ignoring the predicate."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "matrix-exponentiation",
    title: "Matrix Exponentiation & Fast Power",
    difficulty: "hard",
    definition: "Matrix exponentiation computes M^k in O(log k) matrix multiplications using exponentiation by squaring: M^k = (M^(k/2))² if k is even, M · M^(k-1) if odd. This solves linear recurrence relations (like Fibonacci) in O(log n) instead of O(n) by expressing the recurrence as a matrix power.",
    coreUnderstanding: "A linear recurrence like F(n) = F(n-1) + F(n-2) can be written as a matrix equation: [F(n), F(n-1)] = [[1,1],[1,0]] · [F(n-1), F(n-2)]. So [F(n), F(n-1)] = M^(n-1) · [F(1), F(0)] where M is the transition matrix. Computing M^(n-1) by exponentiation by squaring takes O(log n) matrix multiplications, each O(d³) for a d×d matrix. For Fibonacci (d=2), that's O(log n) total — a massive speedup over the O(n) DP. This generalizes to any linear recurrence with constant coefficients.",
    howItWorks: "EXPONENTIATION BY SQUARING (for scalars or matrices):\n• power(M, k): if k == 0, return identity. If k is even, half = power(M, k//2), return half × half. If k is odd, return M × power(M, k-1).\n• O(log k) multiplications instead of O(k).\n\nMATRIX EXPONENTIATION FOR RECURRENCES:\n1. Express the recurrence as [state(n)] = M · [state(n-1)], where state is a vector of the last d terms.\n2. Then [state(n)] = M^n · [state(0)].\n3. Compute M^n by exponentiation by squaring in O(d³ log n) time.\n\nFIBONACCI EXAMPLE:\n[F(n)]     [1 1] [F(n-1)]\n[F(n-1)] = [1 0] [F(n-2)]\nSo M = [[1,1],[1,0]], and [F(n), F(n-1)] = M^(n-1) · [1, 0].\n\nMODULAR ARITHMETIC: for problems requiring (result mod p), take mod at every multiplication to keep numbers small. This is essential for large n (e.g., n = 10^18).",
    codeExamples: [
      {
        lang: "python",
        code: "# Fibonacci via matrix exponentiation — O(log n)\ndef mat_mult(A, B, mod=10**9 + 7):\n    n = len(A); m = len(B[0]); k = len(B)\n    C = [[0] * m for _ in range(n)]\n    for i in range(n):\n        for j in range(m):\n            for l in range(k):\n                C[i][j] = (C[i][j] + A[i][l] * B[l][j]) % mod\n    return C\n\ndef mat_pow(M, k, mod=10**9 + 7):\n    n = len(M)\n    result = [[1 if i == j else 0 for j in range(n)] for i in range(n)]  # identity\n    while k:\n        if k & 1:\n            result = mat_mult(result, M, mod)\n        M = mat_mult(M, M, mod)\n        k >>= 1\n    return result\n\ndef fib(n):\n    if n <= 1: return n\n    M = [[1, 1], [1, 0]]\n    Mn = mat_pow(M, n - 1)\n    return Mn[0][0]  # F(n) = Mn[0][0] * F(1) + Mn[0][1] * F(0) = Mn[0][0]\n\nprint(fib(100))  # 354224848179261915075 (mod 10^9+7)",
        output: "687995182  # F(100) mod 10^9+7",
        note: "M^(n-1) gives F(n) in O(log n) matrix multiplications. Each 2×2 multiply is O(1), so total O(log n)."
      }
    ],
    marginNotes: [
      "O(log n) for any linear recurrence — express it as a matrix, exponentiate by squaring. Fibonacci is the simplest example.",
      "Take mod at EVERY multiplication, not just the end — prevents overflow for large n (n up to 10^18).",
      "The matrix dimension d is the number of terms in the recurrence (Fibonacci: d=2, tribonacci: d=3). Each multiply is O(d³).",
      "Exponentiation by squaring works for any associative operation: matrices, modular integers, polynomials. The key is (A·B)·C = A·(B·C)."
    ],
    commonMistakes: [
      "Not taking mod at every multiplication — numbers overflow for large n (10^18 range).",
      "Using the wrong transition matrix — the matrix must encode the recurrence exactly; a wrong entry gives wrong results.",
      "Forgetting the identity matrix as the base case for k=0 — M^0 = I, not 0.",
      "Confusing O(n) DP with O(log n) matrix exponentiation — for a single query, DP is fine; for many queries or huge n, matrix exp wins."
    ],
    relatedTopics: ["Recursion Fundamentals", "Modular Arithmetic", "Dynamic Programming", "Fast Power"],
    externalLinks: [
      { label: "Matrix Exponentiation (Wikipedia)", url: "https://en.wikipedia.org/wiki/Exponentiation_by_squaring" },
      { label: "Matrix Exponentiation (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/matrix-exponentiation/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of computing the n-th Fibonacci number via matrix exponentiation?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(2^n)"],
        answer: 1,
        explanations: ["That's the DP approach.", "Correct — O(log n) matrix multiplications, each O(1) for 2×2 matrices.", "No sorting.", "That's naive recursion."],
        difficulty: "hard"
      },
      {
        question: "Why must you take mod at every multiplication, not just the end?",
        options: ["It's faster", "To prevent integer overflow for large n (up to 10^18)", "It's required for correctness", "To sort the results"],
        answer: 1,
        explanations: ["Same speed.", "Correct — intermediate products can overflow 64-bit integers; mod keeps them bounded.", "The final result is the same either way.", "No sorting."],
        difficulty: "medium"
      },
      {
        question: "What is the matrix dimension d for the Fibonacci recurrence?",
        options: ["1", "2", "3", "n"],
        answer: 1,
        explanations: ["Too small — Fibonacci needs two previous terms.", "Correct — the state vector is [F(n), F(n-1)], so d=2.", "That's tribonacci.", "d is fixed, not n."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "sieve-prime-factorization",
    title: "Sieve of Eratosthenes & Prime Factorization",
    difficulty: "medium",
    definition: "The Sieve of Eratosthenes finds all primes up to n in O(n log log n) by iteratively marking multiples of each prime as composite. Prime factorization decomposes a number into its prime factors (e.g., 60 = 2² × 3 × 5), the foundation of GCD, LCM, and number theory.",
    coreUnderstanding: "The sieve works by elimination: start with all numbers marked 'prime', then for each prime p, mark its multiples (2p, 3p, ...) as composite. Each composite is marked once by its smallest prime factor, giving O(n log log n) — nearly linear. The optimization: start marking from p² (smaller multiples were already marked by smaller primes). Prime factorization by trial division runs in O(√n) — divide by each number up to √n, collecting prime factors. For many queries, precompute the smallest prime factor (SPF) for each number using a modified sieve, then factorize in O(log n) per query.",
    howItWorks: "SIEVE OF ERATOSTHENES:\n1. Create a boolean array is_prime[0..n], all True. Set is_prime[0] = is_prime[1] = False.\n2. For p from 2 to √n:\n   - If is_prime[p]: for each multiple m from p² to n step p, set is_prime[m] = False.\n3. Remaining True entries are primes.\n\nPRIME FACTORIZATION (trial division, O(√n)):\n1. For d from 2 to √n: while n % d == 0, record d, divide n by d.\n2. If n > 1 after the loop, n itself is a prime factor.\n\nSPF SIEVE (smallest prime factor, for fast factorization):\n1. Build spf[0..n] where spf[i] = smallest prime factor of i.\n2. Factorize n: repeatedly divide by spf[n], collect factors. O(log n) per factorization.\n\nGCD via Euclidean algorithm: gcd(a, b) = gcd(b, a % b) until b == 0. O(log min(a,b)).\nLCM(a, b) = a * b / gcd(a, b).",
    codeExamples: [
      {
        lang: "python",
        code: "# Sieve of Eratosthenes — all primes up to n\ndef sieve(n):\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    for p in range(2, int(n**0.5) + 1):\n        if is_prime[p]:\n            for m in range(p * p, n + 1, p):  # start at p^2\n                is_prime[m] = False\n    return [i for i in range(n + 1) if is_prime[i]]\n\nprint(sieve(30))",
        output: "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]",
        note: "Starting at p² is the key optimization — smaller multiples were already marked by smaller primes."
      },
      {
        lang: "python",
        code: "# Prime factorization by trial division — O(sqrt(n))\ndef factorize(n):\n    factors = []\n    d = 2\n    while d * d <= n:\n        while n % d == 0:\n            factors.append(d)\n            n //= d\n        d += 1\n    if n > 1:           # remaining prime factor\n        factors.append(n)\n    return factors\n\nprint(factorize(60))  # 60 = 2^2 * 3 * 5\n\n# GCD via Euclidean algorithm\ndef gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\nprint(gcd(48, 18))  # 6",
        output: "[2, 2, 3, 5]\n6",
        note: "Trial division up to √n suffices: if n has a factor > √n, the co-factor is < √n and already found."
      }
    ],
    marginNotes: [
      "Start marking from p², not 2p — smaller multiples (2p, 3p, ...) were already marked by smaller primes (2, 3, ...).",
      "O(n log log n) is nearly linear — the sieve is the fastest way to find all primes up to n for n up to ~10^7.",
      "Trial division factorization is O(√n) — fine for single queries. For many queries, precompute SPF (smallest prime factor) for O(log n) factorization.",
      "GCD via Euclidean algorithm is O(log min(a,b)) — far faster than iterating from min(a,b) downward."
    ],
    commonMistakes: [
      "Starting the inner loop at 2p instead of p² — redundant work (smaller multiples already marked).",
      "Forgetting to handle the remaining prime factor (n > 1 after the loop) in trial division — misses the last factor.",
      "Using is_prime[0] = is_prime[1] = True — 0 and 1 are not prime; this corrupts the sieve.",
      "Computing LCM as a * b * gcd(a,b) instead of a * b / gcd(a,b) — overflow and wrong result."
    ],
    relatedTopics: ["Number Theory", "GCD/LCM", "Modular Arithmetic", "Hashing Techniques"],
    externalLinks: [
      { label: "Sieve of Eratosthenes (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes" },
      { label: "Prime Factorization (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/prime-factorization-using-sieve-ologn-multiple-queries/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of the Sieve of Eratosthenes up to n?",
        options: ["O(n)", "O(n log log n)", "O(n log n)", "O(n²)"],
        answer: 1,
        explanations: ["Close, but the sieve has a log log factor from marking multiples.", "Correct — nearly linear; each composite marked once by its smallest prime factor.", "That's sorting.", "That's brute force."],
        difficulty: "medium"
      },
      {
        question: "Why does the inner loop start at p² instead of 2p?",
        options: ["It's faster to compute p²", "Smaller multiples (2p, 3p, ...) were already marked by smaller primes", "To avoid overflow", "To handle p=2 specially"],
        answer: 1,
        explanations: ["Computation speed is irrelevant.", "Correct — any multiple kp with k < p was already marked when processing k's smallest prime factor.", "No overflow concern.", "It applies to all primes, not just 2."],
        difficulty: "medium"
      },
      {
        question: "What is the time complexity of prime factorization by trial division?",
        options: ["O(n)", "O(√n)", "O(log n)", "O(n log n)"],
        answer: 1,
        explanations: ["That's too slow.", "Correct — divide by each d up to √n; if n has a factor > √n, the co-factor is < √n.", "That's with SPF precomputation.", "No sorting."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "trie",
    title: "Trie (Prefix Tree)",
    difficulty: "hard",
    definition: "A Trie (prefix tree) stores strings character-by-character in a tree where each path from root to node represents a prefix. Shared prefixes are stored once, making prefix queries (autocomplete, 'starts with', word search) efficient. Search, insert, and prefix lookup are O(L) where L is the word length — independent of the number of stored words.",
    coreUnderstanding: "A hash set stores words in O(L) per lookup, but can't answer 'which words start with prefix \"app\"?' without scanning all words. A trie stores shared prefixes once: 'app', 'apple', 'apply' share the path a→p→p, then branch. This makes prefix queries O(L) regardless of how many words exist. The cost: high memory (each node has up to 26 children for lowercase English). A compressed trie (radix tree) merges single-child chains to save space. Tries also power XOR-maximum queries (binary trie) and IP routing (longest prefix match).",
    howItWorks: "NODE: { children: map of char → node, is_end: bool }.\n\nINSERT (word, O(L)):\n1. Start at root. For each char: if not in children, create a new node. Move to the child.\n2. After the last char, mark the node as is_end = True.\n\nSEARCH (word, O(L)):\n1. Walk the path. If any char is missing, the word doesn't exist.\n2. Return True only if the final node has is_end = True (it's a complete word, not just a prefix).\n\nSTARTS_WITH (prefix, O(L)):\n1. Walk the path. If any char is missing, no word starts with this prefix.\n2. If the path exists, at least one word starts with this prefix (don't need is_end).\n\nAUTOCOMPLETE (prefix, O(L + results)):\n1. Walk to the prefix node.\n2. DFS/BFS from there, collecting all words (append chars along the path, stop at is_end nodes).\n\nBINARY TRIE (for XOR maximum): store numbers as 31-bit binary strings. To find the max XOR with a number x, greedily pick the opposite bit at each level. O(31) per query.",
    codeExamples: [
      {
        lang: "python",
        code: "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_end = True\n\n    def search(self, word):\n        node = self._walk(word)\n        return node is not None and node.is_end\n\n    def starts_with(self, prefix):\n        return self._walk(prefix) is not None\n\n    def _walk(self, s):\n        node = self.root\n        for ch in s:\n            if ch not in node.children:\n                return None\n            node = node.children[ch]\n        return node\n\nt = Trie()\nfor w in ['apple', 'app', 'apply']: t.insert(w)\nprint(t.search('app'))       # True\nprint(t.search('ap'))        # False (prefix, not a word)\nprint(t.starts_with('ap'))   # True",
        output: "True\nFalse\nTrue",
        note: "search requires is_end (complete word); starts_with only needs the path to exist (any word with that prefix)."
      }
    ],
    marginNotes: [
      "O(L) per operation — independent of the number of stored words. A hash set is also O(L) but can't do prefix queries.",
      "High memory: each node has up to 26 children (for lowercase). A radix tree (compressed trie) merges single-child chains to save space.",
      "Binary trie (31-bit) for XOR maximum: greedily pick the opposite bit at each level. O(31) per query, O(n·31) to build.",
      "search needs is_end (complete word); starts_with only needs the path to exist. Don't confuse them."
    ],
    commonMistakes: [
      "Returning True from search when the path exists but is_end is False — that's a prefix, not a complete word.",
      "Not marking is_end after insert — search returns False for inserted words.",
      "Using a fixed 26-array when the alphabet isn't lowercase English — use a dict for flexibility (Unicode, digits).",
      "Forgetting that tries use more memory than a hash set — the trade-off is prefix queries, not raw storage."
    ],
    relatedTopics: ["Hash Tables", "String Fundamentals", "Binary Trie", "Autocomplete"],
    externalLinks: [
      { label: "Trie (Wikipedia)", url: "https://en.wikipedia.org/wiki/Trie" },
      { label: "Implement Trie (LeetCode 208)", url: "https://leetcode.com/problems/implement-trie-prefix-tree/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of insert and search in a trie (L = word length)?",
        options: ["O(n) where n is the number of words", "O(L)", "O(L log n)", "O(1)"],
        answer: 1,
        explanations: ["Trie operations are independent of the number of stored words.", "Correct — walk L characters, each step O(1) with a hash map.", "No log factor.", "Impossible — you must walk the word."],
        difficulty: "medium"
      },
      {
        question: "What is the key advantage of a trie over a hash set for strings?",
        options: ["Faster single-word lookup", "Prefix queries ('starts with', autocomplete) in O(L)", "Less memory", "Easier to implement"],
        answer: 1,
        explanations: ["Both are O(L) for single-word lookup.", "Correct — a hash set can't do prefix queries without scanning all words.", "Tries use MORE memory.", "Tries are more complex."],
        difficulty: "medium"
      },
      {
        question: "What does is_end represent in a trie node?",
        options: ["The node has children", "A complete word ends at this node (not just a prefix)", "The node is the root", "The node is a leaf"],
        answer: 1,
        explanations: ["is_end is independent of children.", "Correct — 'app' is a word even though 'apple' extends it; is_end marks the boundary.", "Only the root has no parent.", "A leaf has no children, but is_end is about word completion."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "disjoint-set-union",
    title: "Disjoint Set Union (Union-Find)",
    difficulty: "hard",
    definition: "Disjoint Set Union (DSU / Union-Find) maintains a collection of disjoint sets, supporting two operations: find (which set contains x?) and union (merge two sets). With path compression and union by rank, both operations are O(α(n)) ≈ O(1) — effectively constant time. It's the backbone of Kruskal's MST, connectivity, and cycle detection in undirected graphs.",
    coreUnderstanding: "DSU represents each set as a tree, with the root as the set's representative. find(x) walks up to the root; union(x, y) attaches one root under the other. Without optimization, the tree can become a chain (O(n) per find). Two optimizations make it near-constant: path compression (after find, point every node on the path directly to the root — flattens the tree) and union by rank (attach the shorter tree under the taller — keeps depth O(log n)). Together, the amortized complexity is O(α(n)), where α is the inverse Ackermann function — less than 5 for any practical n, so effectively O(1).",
    howItWorks: "DATA: parent[i] (parent of i, root points to itself), rank[i] (upper bound on tree height).\n\nINIT: each element is its own parent, rank 0.\n\nFIND with path compression:\n```\ndef find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])  # compress: point directly to root\n    return parent[x]\n```\n\nUNION by rank:\n```\ndef union(x, y):\n    rx, ry = find(x), find(y)\n    if rx == ry: return False  # already in the same set\n    if rank[rx] < rank[ry]: rx, ry = ry, rx  # attach shorter under taller\n    parent[ry] = rx\n    if rank[rx] == rank[ry]: rank[rx] += 1\n    return True\n```\n\nAPPLICATIONS:\n• Connectivity: are two nodes in the same component? O(α(n)) per query.\n• Cycle detection in undirected graph: if union(u, v) returns False (already same set), adding edge u-v creates a cycle.\n• Kruskal's MST: sort edges by weight, union if different sets, stop at n-1 edges.\n• Connected components count: number of distinct roots after all unions.\n\nCOMPLEXITY: O(α(n)) per operation with both optimizations — α(10^80) < 5, so effectively O(1).",
    codeExamples: [
      {
        lang: "python",
        code: "class DSU:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.rank = [0] * n\n        self.components = n\n\n    def find(self, x):\n        if self.parent[x] != x:\n            self.parent[x] = self.find(self.parent[x])  # path compression\n        return self.parent[x]\n\n    def union(self, x, y):\n        rx, ry = self.find(x), self.find(y)\n        if rx == ry:\n            return False  # already connected\n        if self.rank[rx] < self.rank[ry]:\n            rx, ry = ry, rx\n        self.parent[ry] = rx\n        if self.rank[rx] == self.rank[ry]:\n            self.rank[rx] += 1\n        self.components -= 1\n        return True\n\n# Detect cycle in undirected graph\nedges = [(0,1),(1,2),(2,0)]  # 0-1-2-0 is a cycle\ndsu = DSU(3)\nfor u, v in edges:\n    if not dsu.union(u, v):\n        print(f'Cycle detected adding edge {u}-{v}')\n        break",
        output: "Cycle detected adding edge 2-0",
        note: "union returns False when both endpoints are already in the same set — adding this edge would create a cycle."
      }
    ],
    marginNotes: [
      "O(α(n)) ≈ O(1) with BOTH path compression and union by rank. Either alone gives O(log n); both give near-constant.",
      "Path compression flattens the tree: after find(x), every node on the path points directly to the root. Future finds are O(1).",
      "Union by rank: attach the shorter tree under the taller. This keeps depth O(log n) even without path compression.",
      "Cycle detection: if union(u, v) returns False (same set), edge u-v creates a cycle. This is the basis of Kruskal's MST."
    ],
    commonMistakes: [
      "Using union without rank — the tree can become a chain, making find O(n). Always use union by rank (or by size).",
      "Forgetting path compression in find — without it, find is O(log n) at best, O(n) without rank too.",
      "Not checking if rx == ry before union — merging a set with itself is a no-op but can corrupt rank if not guarded.",
      "Confusing directed and undirected cycle detection — DSU detects cycles in UNDIRECTED graphs. Directed graphs need DFS with colors."
    ],
    relatedTopics: ["Minimum Spanning Tree", "Graph Fundamentals", "Kruskal's Algorithm", "Connectivity"],
    externalLinks: [
      { label: "Disjoint Set Union (Wikipedia)", url: "https://en.wikipedia.org/wiki/Disjoint-set_data_structure" },
      { label: "DSU (CP-Algorithms)", url: "https://cp-algorithms.com/data_structures/disjoint_set_union.html" }
    ],
    mcqs: [
      {
        question: "What is the amortized time per operation in DSU with path compression and union by rank?",
        options: ["O(n)", "O(log n)", "O(α(n)) ≈ O(1)", "O(n log n)"],
        answer: 2,
        explanations: ["That's without any optimization.", "That's with only one optimization.", "Correct — α (inverse Ackermann) is < 5 for any practical n, so effectively constant.", "No such complexity."],
        difficulty: "hard"
      },
      {
        question: "What does path compression do in find?",
        options: ["Sorts the tree", "Points every node on the find path directly to the root, flattening the tree", "Removes the root", "Increases the rank"],
        answer: 1,
        explanations: ["No sorting.", "Correct — future finds on those nodes are O(1) since they point directly to the root.", "The root is the representative; it stays.", "Rank is updated in union, not find."],
        difficulty: "medium"
      },
      {
        question: "How does DSU detect a cycle in an undirected graph?",
        options: ["DFS with colors", "If union(u, v) returns False (both already in the same set), edge u-v creates a cycle", "BFS from each node", "Topological sort"],
        answer: 1,
        explanations: ["That's for directed graphs.", "Correct — same set means a path already exists; adding the edge closes a cycle.", "Too slow.", "Topo sort is for DAGs."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "topological-sort",
    title: "Topological Sort",
    difficulty: "medium",
    definition: "Topological sort orders the vertices of a Directed Acyclic Graph (DAG) so that for every edge u→v, u comes before v. It's the basis for dependency resolution: task scheduling, build systems, course prerequisites. Two algorithms: Kahn's (BFS, in-degree based) and DFS-based (post-order reversal).",
    coreUnderstanding: "A topological order exists if and only if the graph is a DAG (no cycles). If there's a cycle, no valid order exists (a depends on b depends on a). Kahn's algorithm repeatedly removes nodes with in-degree 0 (no dependencies) — they can go first. If the output has fewer than n nodes, a cycle exists. The DFS approach does a post-order traversal and reverses it — a node is added after all its dependencies. Both are O(V + E). Topological sort also enables shortest/longest path in a DAG (process in topo order, relax edges — no need for Dijkstra since there are no cycles).",
    howItWorks: "KAHN'S ALGORITHM (BFS, in-degree):\n1. Compute in-degree of each node (number of incoming edges).\n2. Enqueue all nodes with in-degree 0.\n3. While queue: dequeue a node, add to result. For each neighbor, decrement in-degree; if it becomes 0, enqueue.\n4. If result has n nodes → valid topo sort. If < n → cycle exists (some nodes never reached in-degree 0).\n\nDFS-BASED:\n1. DFS from each unvisited node.\n2. After visiting all neighbors (post-order), push the node onto a stack.\n3. Pop the stack to get the topological order (reverse of finish times).\n4. If a back edge is detected (a node currently in the recursion stack is revisited), a cycle exists.\n\nCYCLE DETECTION: Kahn's — if output < n, cycle. DFS — if a node in the current DFS path is revisited (gray node), cycle.\n\nDAG SHORTEST PATH: process nodes in topo order; for each node, relax its outgoing edges. O(V + E) — no Dijkstra needed because topo order guarantees dependencies are processed first.",
    codeExamples: [
      {
        lang: "python",
        code: "from collections import deque\n\n# Kahn's algorithm (BFS, in-degree based)\ndef topological_sort(graph, n):\n    in_degree = [0] * n\n    for u in graph:\n        for v in graph[u]:\n            in_degree[v] += 1\n    queue = deque([i for i in range(n) if in_degree[i] == 0])\n    order = []\n    while queue:\n        u = queue.popleft()\n        order.append(u)\n        for v in graph[u]:\n            in_degree[v] -= 1\n            if in_degree[v] == 0:\n                queue.append(v)\n    return order if len(order) == n else []  # [] means cycle\n\n# 0→1, 0→2, 1→3, 2→3\ng = {0: [1, 2], 1: [3], 2: [3], 3: []}\nprint(topological_sort(g, 4))  # [0, 1, 2, 3] or [0, 2, 1, 3]",
        output: "[0, 1, 2, 3]",
        note: "Nodes with in-degree 0 go first. If the output has fewer than n nodes, a cycle exists (no valid order)."
      },
      {
        lang: "python",
        code: "# DFS-based topological sort (post-order reversal)\ndef topo_dfs(graph, n):\n    visited = [False] * n\n    on_stack = [False] * n  # for cycle detection\n    stack = []\n    def dfs(u):\n        if on_stack[u]: return False  # cycle\n        if visited[u]: return True\n        visited[u] = on_stack[u] = True\n        for v in graph[u]:\n            if not dfs(v): return False\n        on_stack[u] = False\n        stack.append(u)  # post-order\n        return True\n    for i in range(n):\n        if not visited[i]:\n            if not dfs(i): return []  # cycle\n    return stack[::-1]  # reverse of finish order\n\nprint(topo_dfs(g, 4))",
        output: "[0, 2, 1, 3]",
        note: "Post-order (children before parent), then reverse. The on_stack check detects cycles (back edges)."
      }
    ],
    marginNotes: [
      "A topological order exists IFF the graph is a DAG. If there's a cycle, no valid order — detect via Kahn's (output < n) or DFS (back edge).",
      "Kahn's: in-degree 0 nodes go first. DFS: post-order reversed. Both are O(V + E).",
      "DAG shortest/longest path: process in topo order, relax edges. O(V + E) — no Dijkstra needed (no cycles to worry about).",
      "Multiple valid orders may exist — any one is correct. The order depends on the order nodes are dequeued/visited."
    ],
    commonMistakes: [
      "Not detecting cycles — a cyclic graph has no topological order. Always check (Kahn's: output < n; DFS: back edge).",
      "Confusing directed and undirected — topo sort is for DIRECTED acyclic graphs only.",
      "In DFS, adding to the result before visiting children (pre-order) instead of after (post-order) — gives the wrong order.",
      "Forgetting to reverse the DFS post-order stack — the stack is finish times; the topo order is the reverse."
    ],
    relatedTopics: ["Graph Fundamentals", "BFS", "DFS", "DAG Shortest Path"],
    externalLinks: [
      { label: "Topological Sorting (Wikipedia)", url: "https://en.wikipedia.org/wiki/Topological_sorting" },
      { label: "Course Schedule (LeetCode 207)", url: "https://leetcode.com/problems/course-schedule/" }
    ],
    mcqs: [
      {
        question: "A topological order exists if and only if the graph is:",
        options: ["Connected", "A DAG (Directed Acyclic Graph)", "Weighted", "Complete"],
        answer: 1,
        explanations: ["Connectivity is unrelated.", "Correct — cycles prevent a valid order (a depends on b depends on a).", "Weights are irrelevant.", "Completeness is irrelevant."],
        difficulty: "easy"
      },
      {
        question: "In Kahn's algorithm, how do you detect a cycle?",
        options: ["If the queue is empty before all nodes are processed", "If the output has fewer than n nodes (some never reached in-degree 0)", "If any node has in-degree > 1", "If the graph is weighted"],
        answer: 1,
        explanations: ["The queue being empty mid-way is the same as output < n.", "Correct — nodes in a cycle never reach in-degree 0, so they're never enqueued.", "In-degree > 1 is fine.", "Weights are irrelevant."],
        difficulty: "medium"
      },
      {
        question: "What is the time complexity of topological sort?",
        options: ["O(V²)", "O(V + E)", "O(V log E)", "O(E²)"],
        answer: 1,
        explanations: ["That's adjacency matrix.", "Correct — each node and edge processed once (Kahn's or DFS).", "No log factor.", "No quadratic."],
        difficulty: "easy"
      }
    ]
  }
];