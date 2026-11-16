// Algorithm Hub — popular algorithms with C++/Java templates and dry-run steps.
// Real, hand-written templates (not AI diffs) across categories.
export const ALGORITHMS = [
  {
    id: "binary-search",
    name: "Binary Search",
    category: "searching",
    blurb: "Find an element in a SORTED array by halving the search space each step. O(log n).",
    time: "O(log n)",
    space: "O(1)",
    code: {
      cpp: `int binarySearch(vector<int>& a, int x){
  int lo = 0, hi = (int)a.size() - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;     // avoids overflow
    if (a[mid] == x) return mid;
    else if (a[mid] < x) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;                          // not found
}`,
      java: `int binarySearch(int[] a, int x){
  int lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;      // avoids overflow
    if (a[mid] == x) return mid;
    else if (a[mid] < x) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;                           // not found
}`
    },
    dryRun: [
      "a = [1,3,5,7,9,11], x = 7",
      "lo=0 hi=5 -> mid=2, a[2]=5 < 7 -> lo=3",
      "lo=3 hi=5 -> mid=4, a[4]=9 > 7 -> hi=3",
      "lo=3 hi=3 -> mid=3, a[3]=7 == 7 -> return 3"
    ]
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    category: "sorting",
    blurb: "Divide the array in half, sort each half, merge. Stable, O(n log n) always.",
    time: "O(n log n)",
    space: "O(n)",
    code: {
      cpp: `void merge(vector<int>& a, int lo, int mid, int hi){
  vector<int> L(a.begin()+lo, a.begin()+mid+1);
  vector<int> R(a.begin()+mid+1, a.begin()+hi+1);
  int i=0,j=0,k=lo;
  while(i<(int)L.size() && j<(int)R.size())
    a[k++] = (L[i]<=R[j]) ? L[i++] : R[j++];
  while(i<(int)L.size()) a[k++]=L[i++];
  while(j<(int)R.size()) a[k++]=R[j++];
}
void mergeSort(vector<int>& a, int lo, int hi){
  if(lo>=hi) return;
  int mid=lo+(hi-lo)/2;
  mergeSort(a,lo,mid);
  mergeSort(a,mid+1,hi);
  merge(a,lo,mid,hi);
}`,
      java: `void merge(int[] a, int lo, int mid, int hi){
  int[] L=Arrays.copyOfRange(a,lo,mid+1);
  int[] R=Arrays.copyOfRange(a,mid+1,hi+1);
  int i=0,j=0,k=lo;
  while(i<L.length && j<R.length)
    a[k++] = (L[i]<=R[j]) ? L[i++] : R[j++];
  while(i<L.length) a[k++]=L[i++];
  while(j<R.length) a[k++]=R[j++];
}
void mergeSort(int[] a, int lo, int hi){
  if(lo>=hi) return;
  int mid=lo+(hi-lo)/2;
  mergeSort(a,lo,mid);
  mergeSort(a,mid+1,hi);
  merge(a,lo,mid,hi);
}`
    },
    dryRun: [
      "a = [5,2,4,1,3]",
      "split -> [5,2,4] and [1,3]",
      "split -> [5],[2,4] -> merge -> [2,4,5]",
      "split -> [1],[3] -> merge -> [1,3]",
      "merge [2,4,5] + [1,3] -> [1,2,3,4,5]"
    ]
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "sorting",
    blurb: "Partition around a pivot, recurse on each side. O(n log n) avg, O(n^2) worst.",
    time: "O(n log n) avg",
    space: "O(log n) avg, O(n) worst (recursion stack)",
    code: {
      cpp: `int partition(vector<int>& a, int lo, int hi){
  int pivot=a[hi], i=lo;
  for(int j=lo;j<hi;j++)
    if(a[j]<pivot) swap(a[i++],a[j]);
  swap(a[i],a[hi]);
  return i;
}
void quickSort(vector<int>& a, int lo, int hi){
  if(lo>=hi) return;
  int p=partition(a,lo,hi);
  quickSort(a,lo,p-1);
  quickSort(a,p+1,hi);
}`,
      java: `int partition(int[] a, int lo, int hi){
  int pivot=a[hi], i=lo;
  for(int j=lo;j<hi;j++)
    if(a[j]<pivot){ int t=a[i]; a[i]=a[j]; a[j]=t; i++; }
  int t=a[i]; a[i]=a[hi]; a[hi]=t;
  return i;
}
void quickSort(int[] a, int lo, int hi){
  if(lo>=hi) return;
  int p=partition(a,lo,hi);
  quickSort(a,lo,p-1);
  quickSort(a,p+1,hi);
}`
    },
    dryRun: [
      "a = [3,1,4,1,5], pivot=a[4]=5",
      "scan j=0..3: 3,1,4,1 are all <5 -> i=4",
      "swap a[4],a[4] -> pivot index 4",
      "left partition [3,1,4,1], pivot=1: no value <1 -> swap indices 0,3 -> [1,1,4,3,5]; pivot index 0",
      "recurse indices 1..3 with pivot=3 -> [1,1,3,4,5]; singleton partitions finish"
    ]
  },
  {
    id: "bfs",
    name: "Breadth-First Search",
    category: "graph",
    blurb: "Level-by-level traversal using a queue. Shortest path in unweighted graphs.",
    time: "O(V+E)",
    space: "O(V)",
    code: {
      cpp: `vector<int> bfs(vector<vector<int>>& g, int start){
  int n=g.size();
  vector<int> dist(n,-1);
  queue<int> q;
  dist[start]=0; q.push(start);
  while(!q.empty()){
    int u=q.front(); q.pop();
    for(int v:g[u])
      if(dist[v]==-1){ dist[v]=dist[u]+1; q.push(v); }
  }
  return dist;                       // dist[i] = hops from start
}`,
      java: `int[] bfs(List<List<Integer>> g, int start){
  int n=g.size();
  int[] dist=new int[n]; Arrays.fill(dist,-1);
  Queue<Integer> q=new ArrayDeque<>();
  dist[start]=0; q.add(start);
  while(!q.isEmpty()){
    int u=q.poll();
    for(int v:g.get(u))
      if(dist[v]==-1){ dist[v]=dist[u]+1; q.add(v); }
  }
  return dist;                        // dist[i] = hops from start
}`
    },
    dryRun: [
      "graph: 0-1, 0-2, 1-3, 2-3, start=0",
      "visit 0 (dist 0), queue=[0]",
      "pop 0 -> enqueue 1(dist1), 2(dist1), queue=[1,2]",
      "pop 1 -> enqueue 3(dist2), queue=[2,3]",
      "pop 2 -> 3 already visited, queue=[3]",
      "pop 3 -> done. dist = [0,1,1,2]"
    ]
  },
  {
    id: "dfs",
    name: "Depth-First Search",
    category: "graph",
    blurb: "Go as deep as possible, then backtrack. Uses recursion (or a stack).",
    time: "O(V+E)",
    space: "O(V)",
    code: {
      cpp: `void dfs(vector<vector<int>>& g, int u, vector<bool>& vis){
  vis[u]=true;
  for(int v:g[u])
    if(!vis[v]) dfs(g,v,vis);
}
// call: vector<bool> vis(n,false); dfs(g,start,vis);`,
      java: `void dfs(List<List<Integer>> g, int u, boolean[] vis){
  vis[u]=true;
  for(int v:g.get(u))
    if(!vis[v]) dfs(g,v,vis);
}
// call: boolean[] vis=new boolean[n]; dfs(g,start,vis);`
    },
    dryRun: [
      "undirected adjacency: 0:[1,2], 1:[0,3], 2:[0,3], 3:[1,2], start=0",
      "visit 0 -> go to 1",
      "visit 1 -> go to 3",
      "visit 3 -> neighbor 1 visited; go to unvisited neighbor 2",
      "visit 2 -> neighbors 0,3 visited -> backtrack 3,1,0; neighbor 2 at 0 already visited -> done",
      "visited order: 0,1,3,2"
    ]
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    category: "graph",
    blurb: "Shortest paths from a source with non-negative weights. Min-heap of (dist, node).",
    time: "O((V+E) log V)",
    space: "O(V)",
    code: {
      cpp: `// Requires non-negative int weights. LLONG_MAX marks unreachable.
vector<long long> dijkstra(vector<vector<pair<int,int>>>& g, int src){
  int n=g.size();
  if(src<0 || src>=n) throw invalid_argument("invalid source");
  for(const auto& edges:g) for(auto [v,w]:edges)
    if(v<0 || v>=n || w<0) throw invalid_argument("invalid edge or negative weight");
  vector<long long> d(n, LLONG_MAX);
  using Entry=pair<long long,int>;
  priority_queue<Entry, vector<Entry>, greater<Entry>> pq;
  d[src]=0; pq.push({0,src});
  while(!pq.empty()){
    auto [du,u]=pq.top(); pq.pop();
    if(du!=d[u]) continue;
    for(auto [v,w]:g[u]){
      if(du>LLONG_MAX-w) continue; // avoid overflow; sentinel is reserved
      long long candidate=du+w;
      if(candidate<d[v]){ d[v]=candidate; pq.push({candidate,v}); }
    }
  }
  return d;
}`,
      java: `// Requires non-negative int weights. Long.MAX_VALUE marks unreachable.
long[] dijkstra(List<List<int[]>> g, int src){
  int n=g.size();
  if(src<0 || src>=n) throw new IllegalArgumentException("invalid source");
  for(List<int[]> edges:g) for(int[] e:edges)
    if(e.length!=2 || e[0]<0 || e[0]>=n || e[1]<0)
      throw new IllegalArgumentException("invalid edge or negative weight");
  long[] d=new long[n]; Arrays.fill(d, Long.MAX_VALUE);
  PriorityQueue<long[]> pq=new PriorityQueue<>(Comparator.comparingLong(a->a[0]));
  d[src]=0; pq.add(new long[]{0,src});
  while(!pq.isEmpty()){
    long[] cur=pq.poll(); long du=cur[0]; int u=(int)cur[1];
    if(du!=d[u]) continue;
    for(int[] e:g.get(u)){
      int v=e[0], w=e[1];
      if(du>Long.MAX_VALUE-w) continue;
      long candidate=du+w;
      if(candidate<d[v]){ d[v]=candidate; pq.add(new long[]{candidate,v}); }
    }
  }
  return d;
}`
    },
    dryRun: [
      "graph: 0-(4)->1, 0-(1)->2, 2-(2)->1, 1-(5)->3, src=0",
      "d=[0,inf,inf,inf], pq=[(0,0)]",
      "pop (0,0): relax 1 -> d[1]=4, relax 2 -> d[2]=1, pq=[(1,2),(4,1)]",
      "pop (1,2): relax 1 -> d[1]=min(4,1+2)=3, pq=[(3,1),(4,1)]",
      "pop (3,1): relax 3 -> d[3]=3+5=8, pq=[(4,1),(8,3)]",
      "pop (4,1): stale (4>3) skip; pop (8,3): no relax. d=[0,3,1,8]"
    ]
  },
  {
    id: "kadane",
    name: "Kadane's Algorithm",
    category: "dynamic programming",
    blurb: "Maximum sum of a contiguous subarray in O(n). Keep a running sum; reset to 0 when negative.",
    time: "O(n)",
    space: "O(1)",
    code: {
      cpp: `int kadane(vector<int>& a){
  int best = INT_MIN, cur = 0;
  for(int x: a){
    cur = max(x, cur + x);            // extend or restart at x
    best = max(best, cur);
  }
  return best;
}`,
      java: `int kadane(int[] a){
  int best = Integer.MIN_VALUE, cur = 0;
  for(int x: a){
    cur = Math.max(x, cur + x);        // extend or restart at x
    best = Math.max(best, cur);
  }
  return best;
}`
    },
    dryRun: [
      "a = [-2,1,-3,4,-1,2,1,-5,4]",
      "x=-2: cur=-2, best=-2",
      "x=1:  cur=max(1,-1)=1, best=1",
      "x=-3: cur=max(-3,-2)=-2, best=1",
      "x=4:  cur=max(4,2)=4, best=4",
      "x=-1: cur=3, best=4; x=2: cur=5, best=5; x=1: cur=6, best=6",
      "x=-5: cur=1, best=6; x=4: cur=5, best=6 -> answer 6 (subarray [4,-1,2,1])"
    ]
  },
  {
    id: "two-sum",
    name: "Two Sum (Hash Map)",
    category: "hashing",
    blurb: "Find two indices whose values sum to target. One pass with a hash map of needed complements.",
    time: "O(n)",
    space: "O(n)",
    code: {
      cpp: `vector<int> twoSum(vector<int>& a, int target){
  unordered_map<int,int> need;          // value -> index
  for(int i=0;i<(int)a.size();i++){
    if(need.count(a[i])) return {need[a[i]], i};
    need[target - a[i]] = i;
  }
  return {};
}`,
      java: `int[] twoSum(int[] a, int target){
  Map<Integer,Integer> need = new HashMap<>();  // value -> index
  for(int i=0;i<a.length;i++){
    if(need.containsKey(a[i])) return new int[]{need.get(a[i]), i};
    need.put(target - a[i], i);
  }
  return new int[]{};
}`
    },
    dryRun: [
      "a = [2,7,11,15], target = 9",
      "i=0, a[0]=2, need has no 2 -> need[9-2=7]=0",
      "i=1, a[1]=7, need has 7 -> return [0,1]"
    ]
  }
];