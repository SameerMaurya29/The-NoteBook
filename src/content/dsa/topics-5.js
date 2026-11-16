export default [
  {
    id: "minimum-spanning-tree",
    title: "Minimum Spanning Tree (Kruskal's & Prim's)",
    difficulty: "hard",
    definition: "A Minimum Spanning Tree (MST) connects all vertices of a weighted undirected graph with the minimum total edge weight. Kruskal's algorithm sorts edges by weight and adds them if they don't create a cycle (using DSU). Prim's algorithm grows the tree from a start node, always adding the cheapest edge to a new node (using a priority queue). Both are O(E log E).",
    coreUnderstanding: "An MST has exactly V-1 edges (a tree spanning V nodes) with minimum total weight. Kruskal's is edge-centric: sort all edges, greedily add the cheapest that doesn't form a cycle (DSU checks this in O(α)). Prim's is node-centric: start anywhere, maintain a min-heap of edges crossing the tree boundary, always extract the cheapest. Kruskal's is better for sparse graphs (sort-dominated, O(E log E)); Prim's with a heap is better for dense graphs (O(E log V)). Both are greedy and correct because of the cut property: the cheapest edge crossing any cut is in some MST.",
    howItWorks: "KRUSKAL'S ALGORITHM:\n1. Sort all edges by weight.\n2. Initialize DSU with V singletons.\n3. For each edge (u, v, w) in sorted order:\n   - If find(u) != find(v) (different sets, no cycle): union(u, v), add edge to MST.\n   - Stop when MST has V-1 edges.\n4. Total: O(E log E) for sort + O(E · α) for unions.\n\nPRIM'S ALGORITHM:\n1. Start from any node. Add all its edges to a min-heap.\n2. Mark the start as visited.\n3. While heap and MST < V-1 edges:\n   - Extract the cheapest edge (u, v, w). If v is visited, skip.\n   - Mark v visited, add edge to MST.\n   - Add all edges from v to unvisited nodes to the heap.\n4. Total: O(E log V) with a binary heap.\n\nCUT PROPERTY: for any cut (partition of vertices), the cheapest edge crossing it is in some MST. This is the correctness proof for both greedy algorithms.",
    codeExamples: [
      {
        lang: "python",
        code: "# Kruskal's MST using DSU\nclass DSU:\n    def __init__(self, n):\n        self.parent = list(range(n)); self.rank = [0] * n\n    def find(self, x):\n        if self.parent[x] != x:\n            self.parent[x] = self.find(self.parent[x])\n        return self.parent[x]\n    def union(self, x, y):\n        rx, ry = self.find(x), self.find(y)\n        if rx == ry: return False\n        if self.rank[rx] < self.rank[ry]: rx, ry = ry, rx\n        self.parent[ry] = rx\n        if self.rank[rx] == self.rank[ry]: self.rank[rx] += 1\n        return True\n\ndef kruskal(n, edges):\n    edges.sort(key=lambda e: e[2])  # sort by weight\n    dsu = DSU(n)\n    mst = []\n    for u, v, w in edges:\n        if dsu.union(u, v):\n            mst.append((u, v, w))\n            if len(mst) == n - 1: break\n    return mst\n\nedges = [(0,1,10),(0,2,6),(0,3,5),(1,3,15),(2,3,4)]\nprint(kruskal(4, edges))",
        output: "[(2, 3, 4), (0, 3, 5), (0, 1, 10)]",
        note: "Sort edges, add cheapest that doesn't form a cycle (DSU checks). Stop at V-1 edges."
      },
      {
        lang: "python",
        code: "# Prim's MST using a min-heap\nimport heapq\n\ndef prim(n, graph):\n    # graph: adjacency list, graph[u] = [(v, w), ...]\n    visited = [False] * n\n    heap = [(0, 0, -1)]  # (weight, node, parent)\n    mst = []\n    while heap and len(mst) < n - 1:\n        w, u, parent = heapq.heappop(heap)\n        if visited[u]: continue\n        visited[u] = True\n        if parent != -1: mst.append((parent, u, w))\n        for v, w2 in graph[u]:\n            if not visited[v]:\n                heapq.heappush(heap, (w2, v, u))\n    return mst\n\ngraph = {0: [(1,10),(2,6),(3,5)], 1: [(0,10),(3,15)], 2: [(0,6),(3,4)], 3: [(0,5),(1,15),(2,4)]}\nprint(prim(4, graph))",
        output: "[(0, 3, 5), (2, 3, 4), (0, 1, 10)]  # order may vary",
        note: "Grow from node 0: always add the cheapest edge to an unvisited node. The heap holds boundary edges."
      }
    ],
    marginNotes: [
      "Kruskal's: sort edges, add if no cycle (DSU). Prim's: grow from a node, add cheapest boundary edge (heap). Both O(E log E).",
      "Kruskal's is better for sparse graphs (sort-dominated); Prim's with a heap is better for dense graphs (O(E log V)).",
      "The cut property proves both correct: the cheapest edge crossing any cut is in some MST. Greedy works because of this.",
      "An MST has exactly V-1 edges. If the graph is disconnected, no spanning tree exists (each component has its own MST)."
    ],
    commonMistakes: [
      "Not checking for cycles in Kruskal's — adding an edge within the same set creates a cycle. DSU's union returns False.",
      "In Prim's, not skipping already-visited nodes from the heap — stale heap entries cause incorrect edges to be added.",
      "Forgetting that MST requires a connected graph — a disconnected graph has no spanning tree (only a minimum spanning forest).",
      "Using Kruskal's without sorting edges by weight first — the greedy choice requires cheapest-first order."
    ],
    relatedTopics: ["Disjoint Set Union", "Graph Fundamentals", "Priority Queue", "Greedy Algorithms"],
    externalLinks: [
      { label: "Minimum Spanning Tree (Wikipedia)", url: "https://en.wikipedia.org/wiki/Minimum_spanning_tree" },
      { label: "Kruskal's Algorithm (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/" }
    ],
    mcqs: [
      {
        question: "How many edges does an MST of a graph with V vertices have?",
        options: ["V", "V - 1", "V + 1", "E"],
        answer: 1,
        explanations: ["That's a cycle.", "Correct — a tree spanning V nodes has V-1 edges.", "Too many.", "E is the total graph edges, not the MST."],
        difficulty: "easy"
      },
      {
        question: "What data structure does Kruskal's use to detect cycles?",
        options: ["A priority queue", "Disjoint Set Union (Union-Find)", "A hash table", "A stack"],
        answer: 1,
        explanations: ["That's Prim's.", "Correct — DSU checks if two endpoints are in the same set (cycle) in O(α).", "Not needed.", "Not a stack."],
        difficulty: "medium"
      },
      {
        question: "When is Prim's algorithm preferred over Kruskal's?",
        options: ["For sparse graphs", "For dense graphs (O(E log V) with a heap beats O(E log E) sort)", "For directed graphs", "For disconnected graphs"],
        answer: 1,
        explanations: ["Kruskal's is better for sparse.", "Correct — in dense graphs E ≈ V², so O(E log V) < O(E log E).", "MST is for undirected graphs.", "Neither works on disconnected graphs (use MSF)."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "shortest-path-algorithms",
    title: "Shortest Path Algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall)",
    difficulty: "hard",
    definition: "Shortest path algorithms find the minimum-weight path between nodes. Dijkstra's handles non-negative weights (single-source, O(E log V)). Bellman-Ford handles negative weights and detects negative cycles (O(VE)). Floyd-Warshall finds all-pairs shortest paths (O(V³)).",
    coreUnderstanding: "Dijkstra's is the default for non-negative weights: greedily settle the nearest unsettled node, relax its edges, repeat with a min-heap. It fails on negative edges because the greedy assumption (settled = final) breaks. Bellman-Ford relaxes ALL edges V-1 times — after k rounds, it has the shortest path using ≤ k edges. A V-th round that still improves reveals a negative cycle. Floyd-Warshall is DP: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for each intermediate k. It handles negative edges (but not negative cycles) and gives all-pairs in O(V³).",
    howItWorks: "DIJKSTRA (single-source, non-negative weights):\n1. dist[source] = 0, all others = ∞. Min-heap = [(0, source)].\n2. While heap: extract (d, u) with min d. If d > dist[u], skip (stale entry).\n3. For each edge (u, v, w): if dist[u] + w < dist[v]: update dist[v], push (dist[v], v).\n4. O(E log V) with a binary heap. Fails on negative edges (greedy assumption breaks).\n\nBELLMAN-FORD (single-source, handles negative edges):\n1. dist[source] = 0, all others = ∞.\n2. Repeat V-1 times: for each edge (u, v, w): if dist[u] + w < dist[v]: dist[v] = dist[u] + w.\n3. (Negative cycle check) One more round: if any dist improves, a negative cycle exists.\n4. O(VE) — slower than Dijkstra but handles negatives.\n\nFLOYD-WARSHALL (all-pairs):\n1. dist[i][j] = weight(i,j) or ∞, dist[i][i] = 0.\n2. For each k: for each i: for each j: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).\n3. O(V³) — but gives all V² pairs. Handles negative edges (not negative cycles).",
    codeExamples: [
      {
        lang: "python",
        code: "import heapq\n\n# Dijkstra — single-source, non-negative weights\ndef dijkstra(graph, start, n):\n    dist = [float('inf')] * n\n    dist[start] = 0\n    heap = [(0, start)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]: continue  # stale entry\n        for v, w in graph[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(heap, (dist[v], v))\n    return dist\n\ngraph = {0: [(1,4),(2,1)], 1: [(3,1)], 2: [(1,2),(3,5)], 3: []}\nprint(dijkstra(graph, 0, 4))  # [0, 3, 1, 4]",
        output: "[0, 3, 1, 4]",
        note: "Greedy: settle the nearest node, relax its edges. The stale-entry check (d > dist[u]) handles outdated heap entries."
      },
      {
        lang: "python",
        code: "# Bellman-Ford — handles negative weights, detects negative cycles\ndef bellman_ford(edges, n, start):\n    dist = [float('inf')] * n\n    dist[start] = 0\n    for _ in range(n - 1):           # V-1 rounds\n        for u, v, w in edges:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n    # Check for negative cycle\n    for u, v, w in edges:\n        if dist[u] + w < dist[v]:\n            return None  # negative cycle detected\n    return dist\n\nedges = [(0,1,4),(0,2,1),(2,1,2),(1,3,1),(2,3,5)]\nprint(bellman_ford(edges, 4, 0))  # [0, 3, 1, 4]",
        output: "[0, 3, 1, 4]",
        note: "V-1 rounds of relaxing all edges. A V-th round that still improves means a negative cycle exists."
      }
    ],
    marginNotes: [
      "Dijkstra fails on negative edges — the greedy 'settled = final' assumption breaks. Use Bellman-Ford for negative weights.",
      "The stale-entry check (d > dist[u]) in Dijkstra is essential — the heap can have outdated entries after a node is updated multiple times.",
      "Bellman-Ford's V-1 rounds: after k rounds, dist[v] is the shortest path using ≤ k edges. A V-th improvement means a negative cycle.",
      "Floyd-Warshall is O(V³) but gives ALL V² pairs — worth it when you need many source-destination queries, not just one."
    ],
    commonMistakes: [
      "Using Dijkstra on a graph with negative edges — it gives wrong results. Use Bellman-Ford instead.",
      "Not checking for stale entries in Dijkstra's heap — outdated (d, u) pairs cause incorrect relaxations.",
      "Forgetting the V-th round in Bellman-Ford to detect negative cycles — the algorithm isn't complete without it.",
      "Using Floyd-Warshall for a single-source query — O(V³) is overkill; use Dijkstra (O(E log V)) for single-source."
    ],
    relatedTopics: ["Graph Fundamentals", "Priority Queue", "Topological Sort", "Negative Cycle Detection"],
    externalLinks: [
      { label: "Dijkstra's Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" },
      { label: "Bellman-Ford (Wikipedia)", url: "https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm" }
    ],
    mcqs: [
      {
        question: "Which algorithm handles negative edge weights?",
        options: ["Dijkstra", "Bellman-Ford", "Prim's", "Kruskal's"],
        answer: 1,
        explanations: ["Dijkstra fails on negative edges.", "Correct — Bellman-Ford relaxes all edges V-1 times, handling negatives.", "MST algorithm.", "MST algorithm."],
        difficulty: "medium"
      },
      {
        question: "What is the time complexity of Dijkstra with a binary heap?",
        options: ["O(V²)", "O(E log V)", "O(VE)", "O(V³)"],
        answer: 1,
        explanations: ["That's the array-based Dijkstra.", "Correct — each edge may cause a heap push/pop (O(log V)).", "That's Bellman-Ford.", "That's Floyd-Warshall."],
        difficulty: "medium"
      },
      {
        question: "How does Bellman-Ford detect a negative cycle?",
        options: ["If dist is still ∞ after V-1 rounds", "If a V-th round of relaxation still improves any dist", "If the graph has a cycle", "If any edge has weight 0"],
        answer: 1,
        explanations: ["That means unreachable, not a negative cycle.", "Correct — after V-1 rounds, shortest paths are final; a V-th improvement means a negative cycle exists.", "Any cycle is fine; only negative cycles are a problem.", "Zero-weight edges are fine."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "lca-binary-lifting",
    title: "Lowest Common Ancestor & Binary Lifting",
    difficulty: "hard",
    definition: "The Lowest Common Ancestor (LCA) of two nodes in a tree is the deepest node that is an ancestor of both. Binary lifting precomputes, for each node, its 2^k-th ancestor for k = 0..log(n), enabling LCA queries in O(log n) after O(n log n) preprocessing. It also powers k-th ancestor and tree distance queries.",
    coreUnderstanding: "The naive LCA lifts both nodes to the same depth, then walks both up until they meet — O(n) per query. Binary lifting precomputes a 'jump table': up[node][k] = the 2^k-th ancestor of node. This is built bottom-up: up[node][0] = parent, up[node][k] = up[up[node][k-1]][k-1] (a 2^k jump = two 2^(k-1) jumps). To find LCA: lift the deeper node to the same depth (using binary jumps), then if they're different, jump both up by decreasing powers of 2 until their parents match. O(log n) per query, O(n log n) preprocessing.",
    howItWorks: "PREPROCESSING (O(n log n)):\n1. DFS to compute depth[node] and up[node][0] = parent.\n2. For k = 1..log(n): up[node][k] = up[up[node][k-1]][k-1] (2^k = 2^(k-1) + 2^(k-1)).\n\nLCA QUERY (O(log n)):\n1. If depth[u] < depth[v], swap so u is deeper.\n2. Lift u to depth[v]: for k from log(n) down to 0, if depth[u] - 2^k >= depth[v]: u = up[u][k].\n3. If u == v, LCA = u (v was an ancestor of u).\n4. Otherwise, for k from log(n) down to 0: if up[u][k] != up[v][k]: u = up[u][k]; v = up[v][k] (jump while parents differ).\n5. LCA = up[u][0] (parent of u, which equals parent of v).\n\nDISTANCE(u, v) = depth[u] + depth[v] - 2 * depth[LCA(u, v)].\n\nK-TH ANCESTOR: lift by the binary representation of k, using the jump table. O(log k).",
    codeExamples: [
      {
        lang: "python",
        code: "import math\n\nclass BinaryLifting:\n    def __init__(self, n, parent, root=0):\n        self.LOG = math.ceil(math.log2(n)) + 1\n        self.depth = [0] * n\n        self.up = [[-1] * self.LOG for _ in range(n)]\n        self._dfs(root, parent, 0)\n        for k in range(1, self.LOG):\n            for v in range(n):\n                if self.up[v][k-1] != -1:\n                    self.up[v][k] = self.up[self.up[v][k-1]][k-1]\n\n    def _dfs(self, node, parent, d):\n        self.depth[node] = d\n        self.up[node][0] = parent[node] if node < len(parent) else -1\n\n    def lca(self, u, v):\n        if self.depth[u] < self.depth[v]: u, v = v, u\n        diff = self.depth[u] - self.depth[v]\n        for k in range(self.LOG):\n            if diff & (1 << k): u = self.up[u][k]\n        if u == v: return u\n        for k in range(self.LOG - 1, -1, -1):\n            if self.up[u][k] != self.up[v][k]:\n                u = self.up[u][k]; v = self.up[v][k]\n        return self.up[u][0]\n\n# Tree: 0->1, 0->2, 1->3, 1->4, 2->5\nparent = [0, 0, 0, 1, 1, 2]  # parent[i], parent[0]=0 (root)\nbl = BinaryLifting(6, parent)\nprint(bl.lca(3, 4))  # 1 (parent of both 3 and 4)\nprint(bl.lca(3, 5))  # 0 (root)",
        output: "1\n0",
        note: "up[v][k] = 2^k-th ancestor. LCA: equalize depths, then jump both up while parents differ."
      }
    ],
    marginNotes: [
      "up[node][k] = 2^k-th ancestor. Built from up[node][k] = up[up[node][k-1]][k-1] — a 2^k jump is two 2^(k-1) jumps.",
      "LCA: equalize depths (binary jumps), then jump both up by decreasing powers of 2 while their ancestors differ. O(log n).",
      "Distance(u, v) = depth[u] + depth[v] - 2*depth[LCA]. No need to store path — just depths and LCA.",
      "K-th ancestor: lift by the binary representation of k using the jump table. O(log k) per query."
    ],
    commonMistakes: [
      "Not equalizing depths before the upward jump — the algorithm assumes both nodes are at the same depth for the second phase.",
      "Using up[u][k] != up[v][k] instead of checking parents — the jump should stop when parents match, not when the nodes themselves match.",
      "Forgetting the -1 (no ancestor) sentinel for the root — up[root][k] = -1 for all k > 0.",
      "Not building the jump table bottom-up — up[v][k] depends on up[up[v][k-1]][k-1], so k-1 must be computed first."
    ],
    relatedTopics: ["Binary Tree Fundamentals", "Tree Traversals", "Binary Search", "Sparse Table"],
    externalLinks: [
      { label: "Lowest Common Ancestor (Wikipedia)", url: "https://en.wikipedia.org/wiki/Lowest_common_ancestor" },
      { label: "Binary Lifting (CP-Algorithms)", url: "https://cp-algorithms.com/graph/lca_binary_lifting.html" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of an LCA query with binary lifting (after O(n log n) preprocessing)?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        answer: 1,
        explanations: ["That's the naive approach.", "Correct — equalize depth (log n) + jump up (log n).", "That's with Euler tour + sparse table (a different technique).", "That's the preprocessing."],
        difficulty: "hard"
      },
      {
        question: "What does up[node][k] represent?",
        options: ["The k-th ancestor", "The 2^k-th ancestor", "The depth of node", "The number of children"],
        answer: 1,
        explanations: ["It's exponential, not linear.", "Correct — 2^k-th ancestor, built from two 2^(k-1) jumps.", "Depth is stored separately.", "Children count is unrelated."],
        difficulty: "medium"
      },
      {
        question: "How is the distance between two nodes computed from LCA?",
        options: ["depth[u] + depth[v] - 2 * depth[LCA]", "depth[u] + depth[v]", "depth[LCA]", "depth[u] - depth[v]"],
        answer: 0,
        explanations: ["Correct — path u→LCA→v has length (depth[u]-depth[LCA]) + (depth[v]-depth[LCA]).", "That overcounts by 2*depth[LCA].", "That's just the LCA depth.", "That's the depth difference, not the distance."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "segment-tree-fenwick",
    title: "Segment Trees & Fenwick Trees (BIT)",
    difficulty: "hard",
    definition: "Segment Trees and Fenwick Trees (Binary Indexed Trees / BIT) support range queries (sum, min, max) with point updates in O(log n). A segment tree is a binary tree over array ranges; a Fenwick tree uses the binary representation of indices for a more compact, faster implementation (but only for invertible operations like sum, not min/max).",
    coreUnderstanding: "A prefix sum array answers range-sum queries in O(1) but updates are O(n) (rebuild). A segment tree answers both in O(log n): each node stores the aggregate of a range; an update touches O(log n) nodes on the root-to-leaf path; a query combines O(log n) nodes covering the range. A Fenwick tree (BIT) is more compact — it uses the least significant set bit to define the range each index covers, making both operations O(log n) with a tiny constant and low memory. Fenwick trees only work for invertible operations (sum, XOR); segment trees work for any associative operation (min, max, gcd). For range UPDATES (add a value to a range), use lazy propagation on a segment tree.",
    howItWorks: "SEGMENT TREE (range sum, point update):\n• Build: tree[2*i] = left child, tree[2*i+1] = right child. Leaf = array element. Internal = sum of children. O(n).\n• Update(i, val): set leaf i, then walk up to root, updating each parent. O(log n).\n• Query(l, r): recursively combine nodes covering [l, r]. O(log n).\n• Lazy propagation: for range updates (add v to [l, r]), defer updates to children until needed. O(log n) per range update/query.\n\nFENWICK TREE (BIT, range sum, point update):\n• tree[i] stores sum of range (i - LSB(i), i], where LSB(i) = i & (-i) (lowest set bit).\n• Update(i, delta): while i <= n: tree[i] += delta; i += LSB(i). O(log n).\n• Prefix_sum(i): sum = 0; while i > 0: sum += tree[i]; i -= LSB(i). O(log n).\n• Range_sum(l, r) = prefix_sum(r) - prefix_sum(l-1). O(log n).\n• Only works for invertible operations (sum, XOR). Not for min/max (can't 'subtract' a min).",
    codeExamples: [
      {
        lang: "python",
        code: "# Fenwick Tree (BIT) — range sum, point update\nclass Fenwick:\n    def __init__(self, n):\n        self.n = n\n        self.tree = [0] * (n + 1)  # 1-indexed\n\n    def update(self, i, delta):  # i is 1-indexed\n        while i <= self.n:\n            self.tree[i] += delta\n            i += i & (-i)  # add LSB\n\n    def prefix_sum(self, i):  # sum of [1, i]\n        s = 0\n        while i > 0:\n            s += self.tree[i]\n            i -= i & (-i)  # remove LSB\n        return s\n\n    def range_sum(self, l, r):  # sum of [l, r], 1-indexed\n        return self.prefix_sum(r) - self.prefix_sum(l - 1)\n\nft = Fenwick(10)\nfor i, v in enumerate([3, 1, 4, 1, 5, 9, 2, 6], 1):\n    ft.update(i, v)\nprint(ft.range_sum(3, 6))  # 4+1+5+9 = 19",
        output: "19",
        note: "LSB(i) = i & (-i) isolates the lowest set bit. Update adds LSB (move right); prefix_sum removes LSB (move left)."
      },
      {
        lang: "python",
        code: "# Segment Tree — range sum, point update (iterative)\nclass SegmentTree:\n    def __init__(self, arr):\n        self.n = len(arr)\n        self.tree = [0] * (2 * self.n)\n        self.tree[self.n:] = arr\n        for i in range(self.n - 1, 0, -1):\n            self.tree[i] = self.tree[2*i] + self.tree[2*i + 1]\n\n    def update(self, i, val):  # set arr[i] = val\n        i += self.n\n        self.tree[i] = val\n        while i > 1:\n            i //= 2\n            self.tree[i] = self.tree[2*i] + self.tree[2*i + 1]\n\n    def query(self, l, r):  # sum of [l, r)\n        l += self.n; r += self.n; s = 0\n        while l < r:\n            if l & 1: s += self.tree[l]; l += 1\n            if r & 1: r -= 1; s += self.tree[r]\n            l //= 2; r //= 2\n        return s\n\nst = SegmentTree([3, 1, 4, 1, 5, 9, 2, 6])\nprint(st.query(2, 6))  # 4+1+5+9 = 19 (indices 2..5)",
        output: "19",
        note: "Iterative segment tree: leaves at indices n..2n-1, parents at 1..n-1. Query combines O(log n) nodes."
      }
    ],
    marginNotes: [
      "Fenwick tree: only for invertible operations (sum, XOR). Segment tree: any associative operation (min, max, gcd).",
      "Fenwick is simpler and faster (tiny constant, low memory) — use it for sum/XOR. Segment tree for min/max/gcd or range updates.",
      "Lazy propagation extends segment trees to range updates (add v to [l, r]) in O(log n) — defer child updates until a query touches them.",
      "Both are O(log n) per operation — the upgrade from prefix sum's O(n) update or naive array's O(n) query."
    ],
    commonMistakes: [
      "Using a Fenwick tree for min/max — it only works for invertible operations (sum, XOR). Use a segment tree for min/max.",
      "1-indexing confusion in Fenwick trees — the tree is 1-indexed; index 0 is unused. Convert 0-indexed input to 1-indexed.",
      "Not handling lazy propagation correctly in segment trees — lazy values must be pushed down before visiting children.",
      "Using a segment tree when a prefix sum suffices — if there are no updates, prefix sum is O(1) query, no tree needed."
    ],
    relatedTopics: ["Prefix Sum", "Binary Trees", "Range Queries", "Lazy Propagation"],
    externalLinks: [
      { label: "Segment Tree (CP-Algorithms)", url: "https://cp-algorithms.com/data_structures/segment_tree.html" },
      { label: "Fenwick Tree (Wikipedia)", url: "https://en.wikipedia.org/wiki/Fenwick_tree" }
    ],
    mcqs: [
      {
        question: "Which operation can a Fenwick tree (BIT) NOT support?",
        options: ["Range sum", "Point update + range sum", "Range minimum query", "Prefix XOR"],
        answer: 2,
        explanations: ["Fenwick handles sum.", "That's the standard use.", "Correct — min is not invertible (can't 'subtract' a min). Use a segment tree.", "XOR is invertible."],
        difficulty: "hard"
      },
      {
        question: "What is the time complexity of update and query in a segment tree?",
        options: ["O(1) and O(1)", "O(log n) and O(log n)", "O(n) and O(1)", "O(n) and O(n)"],
        answer: 1,
        explanations: ["That's a prefix sum (no updates).", "Correct — update walks root-to-leaf; query combines O(log n) covering nodes.", "That's prefix sum (O(n) update).", "That's a naive array."],
        difficulty: "medium"
      },
      {
        question: "What does LSB(i) = i & (-i) give you in a Fenwick tree?",
        options: ["The parent index", "The lowest set bit (range size that index i covers)", "The depth", "The number of children"],
        answer: 1,
        explanations: ["Parent is i - LSB(i) or i + LSB(i).", "Correct — tree[i] covers (i - LSB(i), i]; LSB defines the range size.", "Depth is unrelated.", "Children count is unrelated."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "knapsack-dp",
    title: "0/1 & Unbounded Knapsack DP",
    difficulty: "hard",
    definition: "The Knapsack problem: given items with weights and values, maximize total value within a weight capacity. 0/1 Knapsack: each item used at most once. Unbounded Knapsack: each item used unlimited times. Both are solved with DP: dp[w] = max value for capacity w. Subset Sum and Coin Change are special cases.",
    coreUnderstanding: "0/1 Knapsack: for each item, either take it (add its value, reduce capacity by its weight) or skip it. The DP is dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i]) — the best of skipping or taking item i. Compressed to 1D: iterate w from high to low (so each item is used at most once). Unbounded Knapsack: same, but iterate w from low to high (so an item can be reused). Subset Sum is 0/1 Knapsack with value = weight (can we reach exactly capacity?). Coin Change is Unbounded Knapsack (min coins to make a sum). The 1D space optimization is the key insight: the inner loop direction determines 0/1 vs unbounded.",
    howItWorks: "0/1 KNAPSACK (each item at most once):\n• 2D: dp[i][w] = max value using items 0..i-1 with capacity w.\n  dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i]) if w >= weight[i], else dp[i-1][w].\n• 1D optimization: dp[w] = max(dp[w], dp[w - weight[i]] + value[i]). Iterate w from W DOWN to weight[i] — this ensures each item is used at most once (dp[w - weight[i]] is from the previous row, not the current).\n\nUNBOUNDED KNAPSACK (each item unlimited times):\n• Same recurrence, but iterate w from weight[i] UP to W — dp[w - weight[i]] may include item i (current row), allowing reuse.\n\nSUBSET SUM (can we pick items summing to target?):\n• 0/1 Knapsack with value = weight. dp[w] = True if a subset sums to w.\n• dp[0] = True; for each item, for w from W down to weight[i]: dp[w] |= dp[w - weight[i]].\n\nCOIN CHANGE (min coins to make sum S):\n• Unbounded Knapsack. dp[s] = min coins for sum s. dp[0] = 0; for s from 1 to S: dp[s] = min(dp[s - coin] + 1) for each coin <= s.",
    codeExamples: [
      {
        lang: "python",
        code: "# 0/1 Knapsack — 1D DP\ndef knapsack_01(weights, values, W):\n    dp = [0] * (W + 1)\n    for i in range(len(weights)):\n        for w in range(W, weights[i] - 1, -1):  # HIGH to LOW\n            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])\n    return dp[W]\n\nprint(knapsack_01([2, 3, 4, 5], [3, 4, 5, 6], 5))  # max value with capacity 5",
        output: "7  # items 0 (w=2,v=3) and 1 (w=3,v=4): 3+4=7",
        note: "Inner loop goes HIGH to LOW so dp[w - weight[i]] is from the previous row — each item used at most once."
      },
      {
        lang: "python",
        code: "# Unbounded Knapsack — 1D DP\ndef knapsack_unbounded(weights, values, W):\n    dp = [0] * (W + 1)\n    for i in range(len(weights)):\n        for w in range(weights[i], W + 1):  # LOW to HIGH\n            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])\n    return dp[W]\n\nprint(knapsack_unbounded([2, 3, 4, 5], [3, 4, 5, 6], 5))\n# Can reuse: two of item 0 (w=2+2=4, v=3+3=6) or item 0+1 (w=5, v=7)",
        output: "7",
        note: "Inner loop goes LOW to HIGH so dp[w - weight[i]] may include item i — allowing unlimited reuse."
      },
      {
        lang: "python",
        code: "# Coin Change — min coins to make sum S (unbounded)\ndef coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for s in range(1, amount + 1):\n        for c in coins:\n            if c <= s:\n                dp[s] = min(dp[s], dp[s - c] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1\n\nprint(coin_change([1, 5, 10, 25], 36))  # 25+10+1 = 3 coins",
        output: "3",
        note: "Unbounded: each coin can be reused. dp[s] = min over all coins of dp[s - coin] + 1."
      }
    ],
    marginNotes: [
      "The ONLY difference between 0/1 and unbounded is the inner loop direction: HIGH→LOW (0/1) vs LOW→HIGH (unbounded).",
      "1D space optimization: dp[w] replaces dp[i][w] because we only need the previous row. The loop direction controls reuse.",
      "Subset Sum = 0/1 Knapsack with value = weight. Coin Change = Unbounded Knapsack minimizing count.",
      "Partition Equal Subset Sum: can you split into two equal sums? → subset sum with target = total/2."
    ],
    commonMistakes: [
      "Using the wrong loop direction: LOW→HIGH for 0/1 (allows reuse, wrong) or HIGH→LOW for unbounded (prevents reuse, wrong).",
      "Not initializing dp[0] = 0 (and the rest to -∞ or 0 depending on the problem) — the base case is essential.",
      "Forgetting the capacity check (w >= weight[i]) — accessing dp[w - weight[i]] with w < weight[i] is out of bounds.",
      "Confusing 0/1 (each item once) with unbounded (unlimited reuse) — the problem statement determines which."
    ],
    relatedTopics: ["Dynamic Programming", "Subset Sum", "Coin Change", "Bitmasking"],
    externalLinks: [
      { label: "Knapsack Problem (Wikipedia)", url: "https://en.wikipedia.org/wiki/Knapsack_problem" },
      { label: "Coin Change (LeetCode 322)", url: "https://leetcode.com/problems/coin-change/" }
    ],
    mcqs: [
      {
        question: "What distinguishes 0/1 Knapsack from Unbounded Knapsack in the 1D DP?",
        options: ["The recurrence formula", "The inner loop direction: HIGH→LOW for 0/1, LOW→HIGH for unbounded", "The number of items", "The capacity"],
        answer: 1,
        explanations: ["The recurrence is the same.", "Correct — direction controls whether dp[w - weight[i]] includes the current item (reuse) or not.", "Same items.", "Same capacity concept."],
        difficulty: "hard"
      },
      {
        question: "Why does iterating w from HIGH to LOW ensure each item is used at most once in 0/1 Knapsack?",
        options: ["It's faster", "dp[w - weight[i]] is from the previous row (not yet updated this iteration), so the item isn't reused", "It prevents overflow", "It sorts the items"],
        answer: 1,
        explanations: ["Same speed.", "Correct — going high to low, dp[w - weight[i]] hasn't been updated yet for item i, so it's the previous row's value.", "No overflow concern.", "No sorting."],
        difficulty: "hard"
      },
      {
        question: "Coin Change (min coins) is which type of Knapsack?",
        options: ["0/1 Knapsack", "Unbounded Knapsack (minimizing count)", "Subset Sum", "Fractional Knapsack"],
        answer: 1,
        explanations: ["0/1 would limit each coin to one use.", "Correct — coins can be reused (unbounded), and we minimize the count.", "Subset sum is boolean, not min count.", "Fractional allows partial items — not applicable to coins."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "lcs-edit-distance",
    title: "Longest Common Subsequence & Edit Distance",
    difficulty: "hard",
    definition: "LCS finds the longest subsequence common to two strings (not necessarily contiguous). Edit Distance (Levenshtein) finds the minimum operations (insert, delete, replace) to transform one string into another. Both are classic 2D DP: dp[i][j] = answer for the first i chars of s1 and first j chars of s2.",
    coreUnderstanding: "Both problems compare two strings position by position. LCS: if s1[i] == s2[j], dp[i][j] = dp[i-1][j-1] + 1 (match extends the LCS); else dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (skip one char from either string). Edit distance: if s1[i] == s2[j], dp[i][j] = dp[i-1][j-1] (free); else dp[i][j] = 1 + min(dp[i-1][j] (delete), dp[i][j-1] (insert), dp[i-1][j-1] (replace)). Both are O(n·m) time and space; space can be optimized to O(min(n,m)) since only the previous row is needed. The key insight: dp[i][j] represents the subproblem on prefixes, and the recurrence handles the last characters.",
    howItWorks: "LCS (Longest Common Subsequence):\n• dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1].\n• If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1 (match).\n• Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (skip from s1 or s2).\n• Base: dp[0][*] = dp[*][0] = 0.\n• To reconstruct the LCS string, backtrack from dp[n][m] following the max path.\n\nEDIT DISTANCE (Levenshtein):\n• dp[i][j] = min operations to convert s1[0..i-1] to s2[0..j-1].\n• If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] (no operation needed).\n• Else: dp[i][j] = 1 + min(dp[i-1][j] (delete from s1), dp[i][j-1] (insert into s1), dp[i-1][j-1] (replace)).\n• Base: dp[i][0] = i (delete all), dp[0][j] = j (insert all).\n\nSPACE OPTIMIZATION: both only need the previous row → O(min(n, m)) space. But reconstruction needs the full table (or a more complex approach).",
    codeExamples: [
      {
        lang: "python",
        code: "# Longest Common Subsequence\ndef lcs(s1, s2):\n    n, m = len(s1), len(s2)\n    dp = [[0] * (m + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for j in range(1, m + 1):\n            if s1[i-1] == s2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[n][m]\n\nprint(lcs('abcde', 'ace'))  # 'ace' -> 3",
        output: "3",
        note: "Match extends the diagonal; mismatch takes the max of skipping from either string."
      },
      {
        lang: "python",
        code: "# Edit Distance (Levenshtein)\ndef edit_distance(s1, s2):\n    n, m = len(s1), len(s2)\n    dp = [[0] * (m + 1) for _ in range(n + 1)]\n    for i in range(n + 1): dp[i][0] = i  # delete all\n    for j in range(m + 1): dp[0][j] = j  # insert all\n    for i in range(1, n + 1):\n        for j in range(1, m + 1):\n            if s1[i-1] == s2[j-1]:\n                dp[i][j] = dp[i-1][j-1]  # match, free\n            else:\n                dp[i][j] = 1 + min(dp[i-1][j],    # delete\n                                   dp[i][j-1],    # insert\n                                   dp[i-1][j-1])  # replace\n    return dp[n][m]\n\nprint(edit_distance('horse', 'ros'))  # horse->rorse->rose->ros: 3",
        output: "3",
        note: "Match = free (diagonal). Mismatch = 1 + min(delete, insert, replace). Base cases: i or j = 0."
      }
    ],
    marginNotes: [
      "Both are 2D DP over string prefixes. dp[i][j] = answer for s1[0..i-1] and s2[0..j-1].",
      "LCS: match extends the diagonal; mismatch takes max of skipping. Edit distance: match is free; mismatch is 1 + min of 3 ops.",
      "Space can be optimized to O(min(n, m)) — only the previous row is needed. But reconstruction needs the full table.",
      "Edit distance base cases: dp[i][0] = i (delete all from s1), dp[0][j] = j (insert all into s1). Don't forget these."
    ],
    commonMistakes: [
      "Using dp[i-1][j-1] + 1 on a mismatch in LCS — the +1 is only for a match. Mismatch takes max, not diagonal+1.",
      "Forgetting the base cases in edit distance: dp[i][0] = i, dp[0][j] = j. Without them, the first row/column is wrong.",
      "Confusing subsequence (non-contiguous) with substring (contiguous) — LCS is subsequence; longest common substring is a different problem.",
      "Not initializing dp[0][*] and dp[*][0] to 0 in LCS — the empty prefix has LCS 0."
    ],
    relatedTopics: ["Dynamic Programming", "String Fundamentals", "Palindromic DP", "2D DP"],
    externalLinks: [
      { label: "Longest Common Subsequence (Wikipedia)", url: "https://en.wikipedia.org/wiki/Longest_common_subsequence" },
      { label: "Edit Distance (LeetCode 72)", url: "https://leetcode.com/problems/edit-distance/" }
    ],
    mcqs: [
      {
        question: "In LCS, what is dp[i][j] when s1[i-1] != s2[j-1]?",
        options: ["dp[i-1][j-1] + 1", "max(dp[i-1][j], dp[i][j-1])", "dp[i-1][j-1]", "0"],
        answer: 1,
        explanations: ["That's for a match.", "Correct — skip from s1 or s2, take the better.", "That ignores both chars.", "Only if no common subsequence exists."],
        difficulty: "medium"
      },
      {
        question: "In edit distance, what are the three operations when s1[i-1] != s2[j-1]?",
        options: ["Match, insert, delete", "Delete from s1, insert into s1, replace", "Swap, insert, delete", "Match, replace, swap"],
        answer: 1,
        explanations: ["Match is the equal case, not a mismatch operation.", "Correct — delete (dp[i-1][j]), insert (dp[i][j-1]), replace (dp[i-1][j-1]).", "Swap isn't a standard edit operation.", "Match and swap aren't standard."],
        difficulty: "hard"
      },
      {
        question: "What is the time and space complexity of LCS / edit distance?",
        options: ["O(n + m) time, O(1) space", "O(n·m) time, O(n·m) space (optimizable to O(min(n,m)))", "O(n·m) time, O(1) space", "O(n²) time, O(n²) space"],
        answer: 1,
        explanations: ["Too fast.", "Correct — 2D table of size (n+1)×(m+1); space optimizable to one row.", "Can't do O(1) space — need the previous row.", "Only if n == m."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "palindromic-dp",
    title: "Palindromic DP & Matrix Chain Multiplication",
    difficulty: "hard",
    definition: "Palindromic DP solves problems like 'longest palindromic substring' and 'palindrome partitioning' using interval DP: dp[i][j] = true if s[i..j] is a palindrome. Matrix Chain Multiplication finds the minimum-cost parenthesization for multiplying a chain of matrices — also interval DP: dp[i][j] = min cost to multiply matrices i..j.",
    coreUnderstanding: "Interval DP fills a table over all subintervals [i, j], from smallest to largest. For palindromes: dp[i][j] = (s[i] == s[j]) and (j - i < 2 or dp[i+1][j-1]) — a substring is a palindrome if its ends match and the inside is a palindrome. For matrix chain: dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + cost of multiplying the two resulting matrices. Both are O(n²) or O(n³) time, O(n²) space. The key: process intervals by LENGTH (shortest first), because longer intervals depend on shorter ones.",
    howItWorks: "LONGEST PALINDROMIC SUBSTRING (DP, O(n²)):\n• dp[i][j] = True if s[i..j] is a palindrome.\n• Base: dp[i][i] = True (single char), dp[i][i+1] = (s[i] == s[i+1]) (two chars).\n• For length L from 3 to n: dp[i][j] = (s[i] == s[j]) and dp[i+1][j-1].\n• Track the longest (j - i + 1) where dp[i][j] is True.\n• Note: center expansion is O(1) space and usually preferred; DP is needed for 'palindrome partitioning' (min cuts).\n\nPALINDROME PARTITIONING (min cuts):\n• dp[i] = min cuts for s[0..i]. dp[i] = min(dp[j-1] + 1) for all j where s[j..i] is a palindrome.\n• Precompute is_pal[j][i] with the interval DP above. O(n²).\n\nMATRIX CHAIN MULTIPLICATION (O(n³)):\n• dp[i][j] = min cost to multiply matrices i..j (dimensions given by array p where matrix i is p[i]×p[i+1]).\n• dp[i][j] = min over k from i to j-1 of dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1].\n• Base: dp[i][i] = 0 (single matrix, no multiplication).\n• Process by interval length from 2 to n.",
    codeExamples: [
      {
        lang: "python",
        code: "# Longest Palindromic Substring — DP approach (O(n^2) time and space)\ndef longest_palindrome_dp(s):\n    n = len(s)\n    dp = [[False] * n for _ in range(n)]\n    start, best = 0, 1\n    for i in range(n): dp[i][i] = True  # single char\n    for i in range(n - 1):\n        if s[i] == s[i+1]:\n            dp[i][i+1] = True; start, best = i, 2\n    for length in range(3, n + 1):\n        for i in range(n - length + 1):\n            j = i + length - 1\n            if s[i] == s[j] and dp[i+1][j-1]:\n                dp[i][j] = True\n                if length > best: start, best = i, length\n    return s[start:start + best]\n\nprint(longest_palindrome_dp('babad'))  # 'bab' or 'aba'",
        output: "bab",
        note: "Process by length: dp[i][j] depends on dp[i+1][j-1] (shorter interval), so shorter must be computed first."
      },
      {
        lang: "python",
        code: "# Matrix Chain Multiplication — min cost to multiply a chain\ndef matrix_chain(p):\n    # p: dimensions, matrix i is p[i] x p[i+1]\n    n = len(p) - 1  # number of matrices\n    dp = [[0] * n for _ in range(n)]\n    for length in range(2, n + 1):       # interval length\n        for i in range(n - length + 1):\n            j = i + length - 1\n            dp[i][j] = float('inf')\n            for k in range(i, j):       # split point\n                cost = dp[i][k] + dp[k+1][j] + p[i] * p[k+1] * p[j+1]\n                dp[i][j] = min(dp[i][j], cost)\n    return dp[0][n-1]\n\n# Matrices: 10x30, 30x5, 5x60\nprint(matrix_chain([10, 30, 5, 60]))  # (10x30 * 30x5) * 5x60 = 1500+3000=4500",
        output: "4500",
        note: "Try every split point k; cost = left + right + p[i]*p[k+1]*p[j+1]. Process by interval length."
      }
    ],
    marginNotes: [
      "Interval DP: process by LENGTH (shortest first) — longer intervals depend on shorter ones.",
      "Center expansion is O(1) space for longest palindromic substring; DP is needed for palindrome partitioning (min cuts).",
      "Matrix chain: the split point k determines the parenthesization. The cost includes the dimensions of the resulting matrix.",
      "Palindrome partitioning: precompute is_pal[i][j] with interval DP, then dp[i] = min cuts for prefix 0..i."
    ],
    commonMistakes: [
      "Processing intervals in the wrong order — must go by length (short to long), not by i then j, because dp[i][j] needs dp[i+1][j-1].",
      "Forgetting the base cases: dp[i][i] = True (single char) and dp[i][i+1] = (s[i] == s[i+1]) (two chars) for palindromes.",
      "In matrix chain, using the wrong dimension formula — cost = p[i] * p[k+1] * p[j+1], not p[i] * p[k] * p[j].",
      "Confusing interval DP with 1D DP — interval DP is 2D (over [i, j] ranges), not a single index."
    ],
    relatedTopics: ["Palindrome Techniques", "Dynamic Programming", "Interval DP", "2D DP"],
    externalLinks: [
      { label: "Longest Palindromic Substring (LeetCode 5)", url: "https://leetcode.com/problems/longest-palindromic-substring/" },
      { label: "Matrix Chain Multiplication (Wikipedia)", url: "https://en.wikipedia.org/wiki/Matrix_chain_multiplication" }
    ],
    mcqs: [
      {
        question: "In interval DP, what order should intervals be processed?",
        options: ["By starting index i", "By length (shortest first)", "By ending index j", "Random order"],
        answer: 1,
        explanations: ["i alone doesn't guarantee shorter intervals are done first.", "Correct — dp[i][j] depends on dp[i+1][j-1] (shorter), so shorter must be computed first.", "Same issue as i.", "Random order would access uninitialized values."],
        difficulty: "hard"
      },
      {
        question: "What is the recurrence for dp[i][j] in longest palindromic substring DP?",
        options: ["dp[i][j] = dp[i+1][j-1]", "dp[i][j] = (s[i] == s[j]) and dp[i+1][j-1]", "dp[i][j] = s[i] == s[j]", "dp[i][j] = max(dp[i+1][j], dp[i][j-1])"],
        answer: 1,
        explanations: ["Missing the end-match check.", "Correct — ends match AND the inside is a palindrome (or length < 2).", "Missing the inside check.", "That's LCS, not palindrome."],
        difficulty: "medium"
      },
      {
        question: "What is the time complexity of matrix chain multiplication DP?",
        options: ["O(n²)", "O(n³)", "O(n log n)", "O(2^n)"],
        answer: 1,
        explanations: ["That's the space, not time.", "Correct — O(n²) intervals × O(n) split points = O(n³).", "No binary search.", "That's brute force (all parenthesizations)."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "dp-on-trees-bitmask",
    title: "DP on Trees & Bitmask DP",
    difficulty: "hard",
    definition: "DP on Trees solves optimization problems over tree structures (max path sum, diameter, independent set) using post-order DP: compute children's DP first, then combine. Bitmask DP solves problems over subsets (TSP, assignment) where the state is a bitmask representing which elements are used. Both use exponential state spaces made tractable by structure.",
    coreUnderstanding: "DP on Trees: the tree's recursive structure maps to DP — each node's answer depends on its children's answers. Post-order traversal (children before parent) is the natural order. Classic problems: diameter (longest path = max depth of two children + edge), max path sum, house robber on a tree (rob this node OR its children, not both). Bitmask DP: the state is a bitmask (which elements are used/visited). TSP: dp[mask][last] = min cost to visit the set 'mask' ending at 'last'. Transition: add an unvisited city. O(2^n · n²) — feasible for n ≤ 20. The bitmask compresses the subset into an integer, making the state space enumerable.",
    howItWorks: "DP ON TREES (post-order):\n• Return values from children, combine at the parent.\n• Diameter: for each node, the longest path through it = max_depth(left) + max_depth(right) + 2 (or + edges). Track the global max.\n• Max path sum: at each node, the best path either passes through (left + node + right) or extends one child (node + max(left, right)).\n• House robber III: rob(node) = max(node.val + rob(grandchildren), rob(children)). Two states per node: rob or skip.\n\nBITMASK DP (TSP example):\n• dp[mask][last] = min cost to visit the cities in 'mask', ending at 'last'.\n• Base: dp[1 << 0][0] = 0 (start at city 0, only it visited).\n• Transition: dp[mask | (1 << j)][j] = min(dp[mask][last] + dist[last][j]) for j not in mask.\n• Answer: min over last of dp[(1 << n) - 1][last] + dist[last][0] (return to start).\n• O(2^n · n²) time, O(2^n · n) space.\n\nKEY: the bitmask represents the SET of visited cities. 2^n states × n choices = O(2^n · n²).",
    codeExamples: [
      {
        lang: "python",
        code: "# Tree Diameter via post-order DP\ndef tree_diameter(edges):\n    from collections import defaultdict\n    graph = defaultdict(list)\n    for u, v in edges:\n        graph[u].append(v); graph[v].append(u)\n    diameter = 0\n    def dfs(node, parent):\n        nonlocal diameter\n        depths = []\n        for child in graph[node]:\n            if child != parent:\n                depths.append(dfs(child, node))\n        depths.sort(reverse=True)\n        top2 = depths[:2] if len(depths) >= 2 else depths\n        diameter = max(diameter, sum(top2))  # path through this node\n        return (depths[0] + 1) if depths else 0  # max depth from this node\n    dfs(0, -1)\n    return diameter\n\nprint(tree_diameter([(0,1),(0,2),(1,3),(1,4)]))  # 3 (e.g., 3-1-0-2)",
        output: "3",
        note: "At each node, the longest path through it = sum of the two deepest children. Return the max depth to the parent."
      },
      {
        lang: "python",
        code: "# TSP via Bitmask DP\ndef tsp(dist):\n    n = len(dist)\n    INF = float('inf')\n    dp = [[INF] * n for _ in range(1 << n)]\n    dp[1][0] = 0  # start at city 0, only city 0 visited\n    for mask in range(1 << n):\n        for last in range(n):\n            if not (mask & (1 << last)): continue\n            for nxt in range(n):\n                if mask & (1 << nxt): continue  # already visited\n                new_mask = mask | (1 << nxt)\n                dp[new_mask][nxt] = min(dp[new_mask][nxt], dp[mask][last] + dist[last][nxt])\n    # return to start\n    full = (1 << n) - 1\n    return min(dp[full][last] + dist[last][0] for last in range(n))\n\nprint(tsp([[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]))",
        output: "80",
        note: "dp[mask][last] = min cost to visit 'mask' ending at 'last'. 2^n states × n transitions = O(2^n · n²)."
      }
    ],
    marginNotes: [
      "DP on trees: post-order (children before parent) is the natural order. Return values from children, combine at the parent.",
      "Tree diameter: at each node, the longest path through it = sum of the two deepest children. Track the global max.",
      "Bitmask DP (TSP): the mask represents the SET of visited cities. 2^n states × n choices. Feasible for n ≤ 20.",
      "TSP is O(2^n · n²) — the classic 'exponential but tractable for small n' problem. n=20 → ~4M states, feasible."
    ],
    commonMistakes: [
      "Not using post-order for tree DP — parent values depend on children; computing parent first gives wrong results.",
      "In tree diameter, returning the path-through-node value instead of the max depth — the parent needs the depth, not the diameter.",
      "Using bitmask DP for n > 25 — 2^25 = 33M states, too slow. The exponential wall is real.",
      "Forgetting to return to the start in TSP — the answer is min(dp[full][last] + dist[last][0]), not just dp[full][last]."
    ],
    relatedTopics: ["Dynamic Programming", "Binary Tree Fundamentals", "Bitmasking", "Traveling Salesman"],
    externalLinks: [
      { label: "Tree DP (CP-Algorithms)", url: "https://cp-algorithms.com/graph/Tree_diameter.html" },
      { label: "TSP (Wikipedia)", url: "https://en.wikipedia.org/wiki/Travelling_salesman_problem" }
    ],
    mcqs: [
      {
        question: "What traversal order is used for DP on trees?",
        options: ["Pre-order", "In-order", "Post-order (children before parent)", "Level-order"],
        answer: 2,
        explanations: ["Parent before children — wrong for DP.", "Only for BSTs.", "Correct — children's DP must be computed before the parent combines them.", "BFS doesn't guarantee children before parent."],
        difficulty: "medium"
      },
      {
        question: "What is the time complexity of TSP via bitmask DP?",
        options: ["O(n²)", "O(n³)", "O(2^n · n²)", "O(n!)"],
        answer: 2,
        explanations: ["Too fast.", "That's matrix chain.", "Correct — 2^n masks × n endings × n transitions.", "That's brute force (all permutations)."],
        difficulty: "hard"
      },
      {
        question: "In tree diameter DP, what does each node return to its parent?",
        options: ["The diameter", "The maximum depth from that node", "The sum of all children's depths", "The number of nodes"],
        answer: 1,
        explanations: ["The diameter is a global max, not returned.", "Correct — the parent needs the depth to compute its own path-through-node.", "Only the top two matter for the diameter.", "Node count is irrelevant."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "interval-dp",
    title: "Interval DP (Burst Balloons, Stone Merge)",
    difficulty: "hard",
    definition: "Interval DP solves problems where the optimal solution for an interval [i, j] depends on optimal solutions for its sub-intervals. The last operation in [i, j] splits the interval at some point k: dp[i][j] = min/max over k of dp[i][k] + dp[k+1][j] + cost of combining. Classic: burst balloons, stone merge, matrix chain.",
    coreUnderstanding: "The key insight for interval DP: instead of deciding what to do FIRST, decide what to do LAST. In burst balloons, the last balloon burst in [i, j] is k — when k bursts, its neighbors are i-1 and j+1 (everything else is already gone). So dp[i][j] = max over k of dp[i][k-1] + dp[k+1][j] + nums[i-1]*nums[k]*nums[j+1]. The sub-intervals [i, k-1] and [k+1, j] are independent because k is the last to burst, so it's the boundary for both. Process intervals by length (shortest first) because longer intervals depend on shorter ones.",
    howItWorks: "GENERAL INTERVAL DP TEMPLATE:\n• dp[i][j] = optimal value for interval [i, j].\n• Base: dp[i][i] = base value for a single element.\n• For length L from 2 to n:\n  - For i from 0 to n - L:\n    - j = i + L - 1\n    - dp[i][j] = min/max over k from i to j-1 of dp[i][k] + dp[k+1][j] + combine_cost(i, k, j)\n• Process by LENGTH (shortest first) — longer intervals depend on shorter ones.\n\nBURST BALLOONS:\n• Add boundary 1s: nums = [1] + nums + [1]. dp[i][j] = max coins from bursting i+1..j-1.\n• dp[i][j] = max over k of dp[i][k] + dp[k+1][j] + nums[i]*nums[k]*nums[j].\n• k is the LAST balloon burst in (i, j) — when it bursts, its neighbors are i and j (the boundaries).\n\nSTONE MERGE (minimum cost to merge piles):\n• dp[i][j] = min cost to merge stones i..j into one pile.\n• dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + sum(i..j).\n• Precompute prefix sums for the range sum. O(n³) time, O(n²) space.",
    codeExamples: [
      {
        lang: "python",
        code: "# Burst Balloons — interval DP\ndef max_coins(nums):\n    nums = [1] + nums + [1]  # add boundaries\n    n = len(nums)\n    dp = [[0] * n for _ in range(n)]\n    for length in range(2, n):          # interval length (gap between boundaries)\n        for i in range(n - length):\n            j = i + length\n            for k in range(i + 1, j):   # k is the last balloon burst in (i, j)\n                coins = nums[i] * nums[k] * nums[j] + dp[i][k] + dp[k][j]\n                dp[i][j] = max(dp[i][j], coins)\n    return dp[0][n - 1]\n\nprint(max_coins([3, 1, 5, 8]))  # 167",
        output: "167",
        note: "k is the LAST to burst — when it bursts, its neighbors are the boundaries i and j. Sub-intervals are independent."
      },
      {
        lang: "python",
        code: "# Minimum Cost to Merge Stones — interval DP\ndef merge_stones(stones):\n    n = len(stones)\n    prefix = [0] * (n + 1)\n    for i in range(n): prefix[i+1] = prefix[i] + stones[i]\n    dp = [[0] * n for _ in range(n)]\n    for length in range(2, n + 1):\n        for i in range(n - length + 1):\n            j = i + length - 1\n            dp[i][j] = float('inf')\n            for k in range(i, j):\n                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j])\n            dp[i][j] += prefix[j+1] - prefix[i]  # cost of merging the two halves\n    return dp[0][n-1]\n\nprint(merge_stones([3, 1, 4, 1, 5]))  # merge cost",
        output: "25",
        note: "dp[i][j] = min over k of (left + right) + sum(i..j). The sum is the cost of the final merge. Prefix sums for O(1) range sum."
      }
    ],
    marginNotes: [
      "Decide what to do LAST, not first. In burst balloons, k is the last burst — its neighbors are the boundaries, not adjacent balloons.",
      "Process intervals by LENGTH (shortest first) — dp[i][j] depends on dp[i][k] and dp[k+1][j], which are shorter.",
      "Add boundary elements (1s in burst balloons) to handle edge cases cleanly — the first and last balloons burst with boundary 1s as neighbors.",
      "Stone merge: the merge cost is the sum of the interval (prefix sum for O(1)). The total is the sum of all merge costs."
    ],
    commonMistakes: [
      "Deciding what to do FIRST instead of LAST — in burst balloons, the first burst's neighbors are unknown; the last burst's are the boundaries.",
      "Not processing by length — dp[i][j] needs dp[i][k] and dp[k+1][j] (shorter intervals), so they must be computed first.",
      "Forgetting boundary elements in burst balloons — without the 1s, the edge balloons have no neighbors when they burst last.",
      "Not using prefix sums for stone merge — recomputing the range sum each time makes it O(n⁴) instead of O(n³)."
    ],
    relatedTopics: ["Dynamic Programming", "Matrix Chain Multiplication", "Palindromic DP", "Prefix Sum"],
    externalLinks: [
      { label: "Burst Balloons (LeetCode 312)", url: "https://leetcode.com/problems/burst-balloons/" },
      { label: "Interval DP (CP-Algorithms)", url: "https://cp-algorithms.com/dynamic_programming/interval_dp.html" }
    ],
    mcqs: [
      {
        question: "In burst balloons, what does k represent in the interval [i, j]?",
        options: ["The first balloon burst", "The last balloon burst in (i, j)", "The smallest balloon", "The boundary"],
        answer: 1,
        explanations: ["First burst has unknown neighbors.", "Correct — when k bursts last, its neighbors are the boundaries i and j (everything else is gone).", "Size is irrelevant.", "i and j are the boundaries; k is inside."],
        difficulty: "hard"
      },
      {
        question: "Why must interval DP be processed by length (shortest first)?",
        options: ["It's faster", "dp[i][j] depends on shorter sub-intervals [i, k] and [k+1, j], which must be computed first", "To sort the output", "To reduce memory"],
        answer: 1,
        explanations: ["Same speed.", "Correct — longer intervals depend on shorter ones; processing by length guarantees dependencies are ready.", "No sorting.", "Memory is the same."],
        difficulty: "medium"
      },
      {
        question: "What is the time complexity of stone merge via interval DP?",
        options: ["O(n²)", "O(n³)", "O(n log n)", "O(2^n)"],
        answer: 1,
        explanations: ["That's the space.", "Correct — O(n²) intervals × O(n) split points = O(n³).", "No binary search.", "That's brute force."],
        difficulty: "hard"
      }
    ]
  }
];