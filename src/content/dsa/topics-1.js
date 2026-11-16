export default [
  {
    id: "big-o-notation",
    title: "Big-O Notation",
    difficulty: "easy",
    definition: "Big-O describes how an algorithm's running time or memory grows as the input size n grows. It ignores constants and lower-order terms, focusing only on the dominant growth rate — the shape of the curve, not its exact height.",
    coreUnderstanding: "We measure algorithms asymptotically because hardware differences (constants) fade as n grows, but growth rates diverge forever. An O(n²) algorithm on a fast machine will eventually lose to an O(n log n) algorithm on a slow one, for large enough n. Big-O answers: 'does this scale?'",
    howItWorks: "1. Count the dominant operation (comparisons, swaps, assignments) as a function of n.\n2. Drop constants: 5n → O(n); 3n² + 100n → O(n²).\n3. Keep only the highest-order term — as n→∞, lower terms become negligible.\n4. Common ranks from best to worst: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).\n5. Big-O is worst-case; Big-Ω is best-case, Big-Θ is tight bound. Interview 'Big-O' usually means worst-case.",
    codeExamples: [
      {
        variants: {
          cpp: `// O(1) — constant
int first(vector<int>& a){ return a[0]; }

// O(n) — linear, one pass
int sumAll(vector<int>& a){
  int total = 0;
  for(int x : a) total += x;   // n iterations
  return total;
}

// O(n^2) — nested loop over same input
bool hasPair(vector<int>& a){
  for(int i : a)
    for(int j : a)            // n * n
      if(i + j == 0) return true;
  return false;
}`,
          java: `// O(1) — constant
int first(int[] a){ return a[0]; }

// O(n) — linear, one pass
int sumAll(int[] a){
  int total = 0;
  for(int x : a) total += x;   // n iterations
  return total;
}

// O(n^2) — nested loop over same input
boolean hasPair(int[] a){
  for(int i : a)
    for(int j : a)            // n * n
      if(i + j == 0) return true;
  return false;
}`
        },
        output: "(no output — these are complexity examples)",
        note: "Nested loops over the same input are the classic O(n²) signal — but not always! Two independent inputs m and n is O(m·n)."
      }
    ],
    marginNotes: [
      "Drop constants AND lower-order terms. 100n + 9999 is still O(n).",
      "Nested loops ≠ automatic O(n²). Two loops over different inputs is O(a·b).",
      "log n usually means log base 2 — halving the problem each step (binary search, balanced trees).",
      "Interview 'Big-O' almost always means worst-case. Ask if unsure."
    ],
    commonMistakes: [
      "Counting total operations instead of the dominant growth — 3n + 5 is O(n), not O(8).",
      "Calling any nested loop O(n²) without checking the inputs are the same size.",
      "Confusing best-case and worst-case — sorted input makes bubble sort O(n) best-case but O(n²) worst."
    ],
    relatedTopics: ["Time vs Space Complexity", "Sorting Algorithms", "Binary Search"],
    externalLinks: [
      { label: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/" },
      { label: "Khan Academy: Asymptotic Notation", url: "https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation" }
    ],
    mcqs: [
      {
        question: "What is the Big-O of 3n² + 100n + 7?",
        options: ["O(3n²)", "O(n²)", "O(110n)", "O(n)"],
        answer: 1,
        explanations: ["Drop the constant coefficient.", "Correct — keep only the dominant term and drop its coefficient.", "Lower-order term, dropped.", "Wrong term."],
        difficulty: "easy"
      },
      {
        question: "Which grows slowest (best) as n→∞?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        answer: 1,
        explanations: ["Linear.", "Correct — log n grows slower than any positive power of n.", "Between linear and quadratic.", "Quadratic, slow."],
        difficulty: "easy"
      },
      {
        question: "Two independent nested loops over inputs of size a and b give which complexity?",
        options: ["O(n²)", "O(a·b)", "O(a+b)", "O(ab²)"],
        answer: 1,
        explanations: ["Only if a==b==n.", "Correct — each iteration of the outer pairs with each of the inner, so a times b.", "That's sequential, not nested.", "No squared term."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "bubble-sort",
    title: "Bubble Sort",
    difficulty: "easy",
    definition: "Bubble Sort repeatedly walks through the list, compares adjacent pairs, and swaps them if they're out of order. After each full pass the largest unsorted element 'bubbles' to its correct position at the end.",
    coreUnderstanding: "Bubble sort is the textbook sorting algorithm — almost never used in practice because it's O(n²), but perfect for learning because the mechanics are dead simple and the invariants are easy to reason about. It's stable (equal elements keep their order) and in-place (O(1) extra space).",
    howItWorks: "1. Start at index 0. Compare arr[i] and arr[i+1].\n2. If arr[i] > arr[i+1], swap them.\n3. Move to the next pair, repeat until the end of the unsorted region.\n4. After one pass, the largest element is at the end. Shrink the unsorted region by one.\n5. Repeat passes. If a pass makes zero swaps, the array is sorted — stop early (optimized version).",
    codeExamples: [
      {
        variants: {
          cpp: `vector<int> bubbleSort(vector<int> arr){
  int n = arr.size();
  for(int i = 0; i < n; i++){
    bool swapped = false;
    for(int j = 0; j < n - i - 1; j++){   // last i already in place
      if(arr[j] > arr[j + 1]){
        swap(arr[j], arr[j + 1]);
        swapped = true;
      }
    }
    if(!swapped) break;                   // early exit
  }
  return arr;
}
// bubbleSort({5,2,9,1,5,6}) -> {1,2,5,5,6,9}`,
          java: `int[] bubbleSort(int[] arr){
  int n = arr.length;
  for(int i = 0; i < n; i++){
    boolean swapped = false;
    for(int j = 0; j < n - i - 1; j++){   // last i already in place
      if(arr[j] > arr[j + 1]){
        int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;
        swapped = true;
      }
    }
    if(!swapped) break;                   // early exit
  }
  return arr;
}
// bubbleSort({5,2,9,1,5,6}) -> {1,2,5,5,6,9}`
        },
        output: "[1, 2, 5, 5, 6, 9]",
        note: "The `swapped` flag is the optimization: a pass with no swaps means the array is already sorted."
      }
    ],
    marginNotes: [
      "Best case (already sorted) is O(n) WITH the early-exit flag — without it, always O(n²).",
      "Stable sort: equal elements never swap past each other, so relative order is preserved.",
      "The inner loop shrinks each pass (`n-i-1`) because the tail is already sorted — a small but real optimization.",
      "Interview trap: if asked 'sort this', don't write bubble sort in production code. It's a teaching tool."
    ],
    commonMistakes: [
      "Forgetting the early-exit flag, making best-case O(n²) instead of O(n).",
      "Looping the inner loop to `n-1` every time instead of `n-i-1` — does extra useless work.",
      "Swapping with a temp variable incorrectly — C++ std::swap / Java's 3-step swap avoids this."
    ],
    relatedTopics: ["Selection Sort", "Insertion Sort", "Big-O Notation"],
    externalLinks: [
      { label: "Wikipedia: Bubble Sort", url: "https://en.wikipedia.org/wiki/Bubble_sort" },
      { label: "Visualgo: Sorting", url: "https://visualgo.net/en/sorting" }
    ],
    mcqs: [
      {
        question: "Worst-case time complexity of bubble sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        answer: 2,
        explanations: ["That's the best case with early exit.", "That's merge/quick sort.", "Correct — nested loops over the input.", "Far too fast."],
        difficulty: "easy"
      },
      {
        question: "What does the `swapped` flag achieve?",
        options: ["Makes it stable", "Enables O(n) best case by exiting early", "Reduces space to O(1)", "Nothing useful"],
        answer: 1,
        explanations: ["Stability comes from only swapping strictly-greater pairs.", "Correct — a no-swap pass means sorted, so we stop.", "It's already in-place.", "It's a real optimization."],
        difficulty: "medium"
      },
      {
        question: "Is bubble sort stable?",
        options: ["Yes", "No", "Only with the flag", "Depends on input"],
        answer: 0,
        explanations: ["Correct — equal elements (using > not >=) never swap, preserving order.", "It is stable.", "Stability is independent of the flag.", "Always stable when implemented with strict >."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "two-pointers",
    title: "Two Pointers Technique",
    difficulty: "medium",
    definition: "Two Pointers uses two indices (or cursors) moving through a data structure — usually a sorted array or linked list — to reduce an O(n²) brute-force scan to O(n). The pointers either converge from both ends, walk in the same direction at different speeds, or chase each other.",
    coreUnderstanding: "The technique exploits structure: if the input is sorted, moving a pointer inward has a predictable effect on the sum/difference, so you can eliminate whole regions of the search space without re-examining them. It turns 'check every pair' into 'walk both ends toward the middle' — the same O(n) cost as a single pass, but with the power of a nested loop.",
    howItWorks: "WHEN TO APPLY — look for these signals:\n1. The array is sorted (or can be sorted cheaply).\n2. You need to find a pair, triplet, or subarray satisfying a condition (sum, difference, palindrome).\n3. The problem asks to remove duplicates in-place, or partition elements.\n4. A linked list has cycle/intersection/meet-in-middle structure.\n\nHOW TO APPLY — three common patterns:\n• Opposite ends: left=0, right=n-1. Move left right if sum is too small, move right left if too big. (Pair sum, container with most water.)\n• Same direction (fast/slow): both start at 0, fast scouts ahead. (Remove duplicates, move zeros to end.)\n• Chase (Floyd): slow moves 1, fast moves 2. (Cycle detection.)\n\nHOW TO KNOW IT FITS: if sorting the input doesn't break the problem and a brute-force is O(n²) over pairs, two pointers almost always drops it to O(n).",
    codeExamples: [
      {
        variants: {
          cpp: `// Pattern 1: Opposite ends — two-sum on sorted array, O(n)
vector<int> twoSumSorted(vector<int>& arr, int target){
  int left = 0, right = arr.size() - 1;
  while(left < right){
    int s = arr[left] + arr[right];
    if(s == target) return {left, right};
    else if(s < target) left++;   // need bigger
    else right--;                  // need smaller
  }
  return {};
}
// twoSumSorted({1,2,7,11,15}, 9) -> {1,2}`,
          java: `// Pattern 1: Opposite ends — two-sum on sorted array, O(n)
int[] twoSumSorted(int[] arr, int target){
  int left = 0, right = arr.length - 1;
  while(left < right){
    int s = arr[left] + arr[right];
    if(s == target) return new int[]{left, right};
    else if(s < target) left++;    // need bigger
    else right--;                  // need smaller
  }
  return new int[]{};
}
// twoSumSorted({1,2,7,11,15}, 9) -> {1,2}`
        },
        output: "[1, 2]  # arr[1]+arr[2] = 2+7 = 9",
        note: "Sorted input is the key — moving a pointer monotonically guarantees we never need to backtrack."
      },
      {
        variants: {
          cpp: `// Pattern 2: Same direction — move zeros to end, in-place
void moveZeros(vector<int>& arr){
  int slow = 0;                       // write position
  for(int fast = 0; fast < (int)arr.size(); fast++){
    if(arr[fast] != 0){
      swap(arr[slow++], arr[fast]);
    }
  }
}
// moveZeros({0,1,0,3,12}) -> {1,3,12,0,0}`,
          java: `// Pattern 2: Same direction — move zeros to end, in-place
void moveZeros(int[] arr){
  int slow = 0;                        // write position
  for(int fast = 0; fast < arr.length; fast++){
    if(arr[fast] != 0){
      int t = arr[slow]; arr[slow] = arr[fast]; arr[fast] = t;
      slow++;
    }
  }
}
// moveZeros({0,1,0,3,12}) -> {1,3,12,0,0}`
        },
        output: "[1, 3, 12, 0, 0]",
        note: "fast scans every element; slow only advances on non-zeros — one pass, O(n), O(1) space."
      }
    ],
    marginNotes: [
      "Two pointers needs sorted input for the opposite-ends pattern — sort first if needed (O(n log n) + O(n) is still better than O(n²)).",
      "Same-direction pointers are really 'read/write cursors' — fast reads, slow writes. Think in-place array transforms.",
      "If the problem says 'in-place' and 'sorted' or 'partition', two pointers is almost always the answer.",
      "The chase pattern (Floyd's) is a special case — it detects cycles in O(n) time and O(1) space without a hash set."
    ],
    commonMistakes: [
      "Applying opposite-ends two pointers on an unsorted array — the monotonic movement assumption breaks.",
      "Moving both pointers when only one should move — in two-sum, move left OR right, never both at once.",
      "Forgetting the `left < right` (not `left <= right`) boundary — crossing pointers means you've checked the pair twice or hit an empty range.",
      "Using two pointers when a hash map is better — if the array isn't sortable, hash the complement instead."
    ],
    relatedTopics: ["Sliding Window", "Binary Search", "Fast & Slow Pointers", "Prefix Sum"],
    externalLinks: [
      { label: "Two Pointers Pattern (LeetCode Explore)", url: "https://leetcode.com/explore/learn/card/array-and-string/" },
      { label: "Two Pointers Technique (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/two-pointers-technique/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of the opposite-ends two-pointer two-sum on a sorted array?",
        options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
        answer: 2,
        explanations: ["That's the brute force.", "Sorting is O(n log n) but the scan itself is O(n).", "Correct — each element is visited at most once.", "That's binary search, not a linear scan."],
        difficulty: "easy"
      },
      {
        question: "Which problem signal most strongly suggests two pointers?",
        options: ["Unsorted array, find any pair summing to k", "Sorted array, find a pair summing to k, in-place", "Find the frequency of each element", "Find the k-th smallest element"],
        answer: 1,
        explanations: ["Unsorted → use a hash map instead.", "Correct — sorted + pair + in-place is the textbook two-pointer setup.", "That's a hash map / counting problem.", "That's quickselect or sorting."],
        difficulty: "medium"
      },
      {
        question: "In the same-direction 'move zeros' pattern, what does the slow pointer represent?",
        options: ["The last zero seen", "The next write position for a non-zero", "The current zero count", "The array midpoint"],
        answer: 1,
        explanations: ["It tracks non-zeros, not zeros.", "Correct — slow is the write cursor; fast is the read cursor.", "No count is stored.", "Irrelevant to this pattern."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    difficulty: "medium",
    definition: "Sliding Window maintains a 'window' (a contiguous subarray or substring) that slides across the data, expanding on the right and shrinking on the left. Instead of recomputing the window's property from scratch each step, you add the new element and remove the old one — turning O(n·k) into O(n).",
    coreUnderstanding: "Whenever a problem asks for the longest/shortest/maximum/minimum subarray or substring satisfying a constraint, the brute force checks every possible window — O(n²) or worse. The sliding window observes that as the right edge moves forward, the left edge only ever moves forward too (never backward), so each element enters and leaves the window exactly once. That monotonicity is what makes it linear.",
    howItWorks: "WHEN TO APPLY:\n1. 'Longest/shortest subarray/substring with…' or 'maximum sum subarray of size k'.\n2. The condition is monotonic — expanding the window keeps it valid or breaks it predictably.\n3. You need a contiguous slice, not a subset (subsequence is different).\n\nHOW TO APPLY (two variants):\n• Fixed window: size k is given. Slide right by 1, add new element, subtract old element. (Max sum subarray of size k.)\n• Variable window: size is unknown. Expand right while valid; when invalid, shrink left until valid again. Track the best window seen. (Longest substring without repeating characters.)\n\nCOMPLEXITY: O(n) time — each element added once, removed once. O(k) or O(1) space depending on what you track inside the window (a hash map for character counts, a running sum, etc.).",
    codeExamples: [
      {
        variants: {
          cpp: `// Fixed window: max sum of subarray of size k
int maxSumK(vector<int>& arr, int k){
  int windowSum = 0;
  for(int i = 0; i < k; i++) windowSum += arr[i];
  int best = windowSum;
  for(int i = k; i < (int)arr.size(); i++){
    windowSum += arr[i] - arr[i - k];   // add new, drop old
    best = max(best, windowSum);
  }
  return best;
}
// maxSumK({1,4,2,10,23,3,1,0,20}, 4) -> 39`,
          java: `// Fixed window: max sum of subarray of size k
int maxSumK(int[] arr, int k){
  int windowSum = 0;
  for(int i = 0; i < k; i++) windowSum += arr[i];
  int best = windowSum;
  for(int i = k; i < arr.length; i++){
    windowSum += arr[i] - arr[i - k];    // add new, drop old
    best = Math.max(best, windowSum);
  }
  return best;
}
// maxSumK({1,4,2,10,23,3,1,0,20}, 4) -> 39`
        },
        output: "39  # 4+2+10+23=39, then 10+23+3+1=37, best is 39",
        note: "One pass: each step is O(1) because we only adjust the two boundary elements."
      },
      {
        variants: {
          cpp: `// Variable window: longest substring without repeating chars
int longestUnique(string s){
  unordered_map<char,int> seen;        // char -> last index
  int left = 0, best = 0;
  for(int right = 0; right < (int)s.size(); right++){
    char ch = s[right];
    if(seen.count(ch) && seen[ch] >= left)
      left = seen[ch] + 1;             // shrink past the duplicate
    seen[ch] = right;
    best = max(best, right - left + 1);
  }
  return best;
}
// longestUnique("abcabcbb") -> 3 ("abc")`,
          java: `// Variable window: longest substring without repeating chars
int longestUnique(String s){
  Map<Character,Integer> seen = new HashMap<>();  // char -> last index
  int left = 0, best = 0;
  for(int right = 0; right < s.length(); right++){
    char ch = s.charAt(right);
    if(seen.containsKey(ch) && seen.get(ch) >= left)
      left = seen.get(ch) + 1;          // shrink past the duplicate
    seen.put(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
// longestUnique("abcabcbb") -> 3 ("abc")`
        },
        output: "3  # 'abc'",
        note: "left only moves forward — that's the key invariant that keeps this O(n), not O(n²)."
      }
    ],
    marginNotes: [
      "The golden rule: the left pointer NEVER moves backward. If you ever need to reset left, it's not a sliding window.",
      "Fixed window = subtract old, add new. Variable window = expand right, shrink left until valid. Don't mix them up.",
      "A hash map inside the window (char -> count or char -> last index) is the most common helper for string problems.",
      "If the condition isn't monotonic (adding an element can both help and hurt unpredictably), sliding window won't work — try DP."
    ],
    commonMistakes: [
      "Recomputing the window sum/property from scratch each step — defeats the O(n) benefit, making it O(n·k).",
      "Letting the left pointer move backward — breaks the linear guarantee and turns it into brute force.",
      "Using a sliding window on a non-contiguous (subsequence) problem — sliding window is for subarrays/substrings only.",
      "Forgetting to update the result inside the loop — only checking at the end misses the best window that shrank away."
    ],
    relatedTopics: ["Two Pointers", "Prefix Sum", "Kadane's Algorithm", "Hash Tables"],
    externalLinks: [
      { label: "Sliding Window Technique (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/window-sliding-technique/" },
      { label: "Sliding Window (LeetCode Explore)", url: "https://leetcode.com/explore/learn/card/fun-with-arrays/" }
    ],
    mcqs: [
      {
        question: "What makes sliding window O(n) instead of O(n²)?",
        options: ["The window is always size k", "Each element enters and leaves the window at most once", "A hash map is used", "The array is sorted"],
        answer: 1,
        explanations: ["Window size is irrelevant to the complexity argument.", "Correct — left only moves forward, so total work is 2n.", "The hash map is a helper, not the reason.", "Sorting isn't required for sliding window."],
        difficulty: "easy"
      },
      {
        question: "Which problem is NOT a good fit for sliding window?",
        options: ["Max sum subarray of size k", "Longest substring without repeating characters", "Smallest subarray with sum ≥ S", "Longest increasing subsequence"],
        answer: 3,
        explanations: ["Fixed window — perfect fit.", "Variable window — classic fit.", "Variable window — fits.", "Correct — LIS is a subsequence (non-contiguous), needs DP O(n log n)."],
        difficulty: "medium"
      },
      {
        question: "In a variable window, when do you shrink the left pointer?",
        options: ["Every iteration", "When the window becomes invalid", "When the window becomes valid", "Never"],
        answer: 1,
        explanations: ["That would be a fixed step, not adaptive.", "Correct — expand until invalid, then shrink until valid again.", "You expand when invalid, shrink when valid to find the next candidate.", "Then it's not a window."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "prefix-sum",
    title: "Prefix Sum",
    difficulty: "easy",
    definition: "Prefix Sum (also prefix sum array or cumulative sum) precomputes running totals so that the sum of any subarray [l, r] can be answered in O(1) as prefix[r+1] - prefix[l]. You pay O(n) once upfront, then every range query is instant.",
    coreUnderstanding: "If you need to answer many range-sum queries, or repeatedly compute sums over sliding subarrays, recomputing from scratch each time is O(n) per query. The prefix sum array stores `prefix[i] = arr[0] + ... + arr[i-1]`, so `sum(l..r) = prefix[r+1] - prefix[l]` — a single subtraction. The precomputation is O(n); each query is O(1). This is the simplest example of the broader idea: precompute a structure once, query it many times.",
    howItWorks: "1. Build the prefix array: prefix[0] = 0, prefix[i] = prefix[i-1] + arr[i-1] for i from 1 to n. (Length n+1, with a leading zero to make the formula clean.)\n2. To query sum of subarray from index l to r (inclusive): answer = prefix[r+1] - prefix[l].\n3. For 2D prefix sums (matrix range sums), build prefix[i][j] = sum of rectangle (0,0) to (i-1,j-1), then query with inclusion-exclusion of four corners.\n4. Variant — difference array: if you need to add a value to a range many times, store diffs and reconstruct the array from the prefix sum at the end.",
    codeExamples: [
      {
        variants: {
          cpp: `// arr = {3,1,4,1,5,9,2,6}; build prefix (length n+1, leading zero)
vector<int> buildPrefix(vector<int>& arr){
  int n = arr.size();
  vector<int> p(n + 1, 0);
  for(int i = 0; i < n; i++) p[i + 1] = p[i] + arr[i];
  return p;   // {0,3,4,8,9,14,23,25,31}
}
// sum of arr[l..r] inclusive:
int rangeSum(vector<int>& p, int l, int r){ return p[r + 1] - p[l]; }
// rangeSum(p, 2, 5) -> 4+1+5+9 = 19`,
          java: `// arr = {3,1,4,1,5,9,2,6}; build prefix (length n+1, leading zero)
int[] buildPrefix(int[] arr){
  int n = arr.length;
  int[] p = new int[n + 1];            // defaults to 0
  for(int i = 0; i < n; i++) p[i + 1] = p[i] + arr[i];
  return p;   // {0,3,4,8,9,14,23,25,31}
}
// sum of arr[l..r] inclusive:
int rangeSum(int[] p, int l, int r){ return p[r + 1] - p[l]; }
// rangeSum(p, 2, 5) -> 4+1+5+9 = 19`
        },
        output: "19",
        note: "The leading zero lets the formula work for l=0 without a special case: prefix[r+1] - prefix[0]."
      },
      {
        variants: {
          cpp: `// Difference array: add val to range [l, r] in O(1), reconstruct at end
vector<int> rangeAdd(vector<int> arr, vector<array<int,3>>& updates){
  int n = arr.size();
  vector<int> diff(n + 1, 0);
  for(auto& u : updates){           // u = {l, r, val}
    diff[u[0]] += u[2];
    diff[u[1] + 1] -= u[2];         // cancel after the range
  }
  int running = 0;
  for(int i = 0; i < n; i++){
    running += diff[i];
    arr[i] += running;
  }
  return arr;
}
// rangeAdd({0,0,0,0,0,0}, {{1,3,5},{2,4,2}}) -> {0,5,7,7,2,0}`,
          java: `// Difference array: add val to range [l, r] in O(1), reconstruct at end
int[] rangeAdd(int[] arr, int[][] updates){
  int n = arr.length;
  int[] diff = new int[n + 1];
  for(int[] u : updates){           // u = {l, r, val}
    diff[u[0]] += u[2];
    diff[u[1] + 1] -= u[2];         // cancel after the range
  }
  int running = 0;
  for(int i = 0; i < n; i++){
    running += diff[i];
    arr[i] += running;
  }
  return arr;
}
// rangeAdd({0,0,0,0,0,0}, {{1,3,5},{2,4,2}}) -> {0,5,7,7,2,0}`
        },
        output: "[0, 5, 7, 7, 2, 0]",
        note: "Each range add is O(1) instead of O(r-l); reconstruction is one O(n) pass. Great for many updates, few reads."
      }
    ],
    marginNotes: [
      "The leading zero in the prefix array isn't optional — it's what makes `prefix[r+1] - prefix[l]` work for l=0.",
      "Prefix sum answers range-sum QUERIES. If you only need one sum, just compute it directly — no need for the array.",
      "Difference array is the inverse trick: efficient range UPDATES, reconstruct via prefix sum at the end.",
      "2D prefix sum uses inclusion-exclusion (four corners) — same idea, one extra dimension of precomputation."
    ],
    commonMistakes: [
      "Off-by-one: using prefix[r] - prefix[l] instead of prefix[r+1] - prefix[l] — drops arr[r] from the sum.",
      "Building prefix of length n instead of n+1 — then l=0 needs a special case and the formula breaks.",
      "Using prefix sum when a single sum is needed — the precomputation is wasted overhead.",
      "Forgetting that prefix sum is for SUMS, not for min/max over a range (those need a segment tree)."
    ],
    relatedTopics: ["Sliding Window", "Kadane's Algorithm", "Difference Array", "Segment Tree"],
    externalLinks: [
      { label: "Prefix Sum (Wikipedia)", url: "https://en.wikipedia.org/wiki/Prefix_sum" },
      { label: "Prefix Sum (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications/" }
    ],
    mcqs: [
      {
        question: "What is the sum of subarray arr[2..5] using prefix array P (with leading zero)?",
        options: ["P[5] - P[2]", "P[6] - P[2]", "P[5] - P[1]", "P[6] - P[1]"],
        answer: 1,
        explanations: ["Drops arr[5].", "Correct — P[r+1] - P[l] = P[6] - P[2].", "Wrong indices.", "Off by one on both."],
        difficulty: "easy"
      },
      {
        question: "A difference array is best for which scenario?",
        options: ["Many range-sum queries", "Many range-add updates, few reads", "Finding the max of a range", "Sorting the array"],
        answer: 1,
        explanations: ["That's plain prefix sum.", "Correct — each add is O(1), reconstruct once at the end.", "Need a segment tree or sparse table.", "Difference array doesn't sort."],
        difficulty: "medium"
      },
      {
        question: "Time to build a prefix sum array of size n, then answer q range-sum queries?",
        options: ["O(n·q)", "O(n + q)", "O(n²)", "O(q log n)"],
        answer: 1,
        explanations: ["That's the brute force.", "Correct — O(n) to build, O(1) per query, so O(n + q) total.", "No quadratic term.", "No log factor — queries are O(1)."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "kadane-algorithm",
    title: "Kadane's Algorithm (Maximum Subarray)",
    difficulty: "medium",
    definition: "Kadane's Algorithm finds the contiguous subarray with the largest sum in O(n) time and O(1) space. At each position it decides: extend the previous best subarray, or start fresh from the current element — whichever is larger.",
    coreUnderstanding: "The key insight: the maximum subarray ending at index i is either `arr[i]` alone, or `arr[i]` added to the maximum subarray ending at i-1. You don't need to know where the subarray starts — just the best sum ending at the previous position. This local decision, made at every index, globally finds the optimum. It's dynamic programming in its purest form: `dp[i] = max(arr[i], dp[i-1] + arr[i])`, compressed to a single running variable.",
    howItWorks: "1. Initialize current_sum = arr[0], best_sum = arr[0].\n2. For each element from index 1 onward:\n   - current_sum = max(arr[i], current_sum + arr[i])  — extend or restart.\n   - best_sum = max(best_sum, current_sum).\n3. best_sum holds the maximum subarray sum.\n4. To also track the subarray indices, record start/end whenever current_sum resets or best_sum updates.\n5. For the minimum subarray, flip max to min. For a circular array, the answer is max(Kadane(arr), total_sum - Kadane(negated arr)).",
    codeExamples: [
      {
        variants: {
          cpp: `int kadane(vector<int>& arr){
  int current = arr[0], best = arr[0];
  for(int i = 1; i < (int)arr.size(); i++){
    current = max(arr[i], current + arr[i]);   // extend or restart
    best = max(best, current);
  }
  return best;
}
// kadane({-2,1,-3,4,-1,2,1,-5,4}) -> 6`,
          java: `int kadane(int[] arr){
  int current = arr[0], best = arr[0];
  for(int i = 1; i < arr.length; i++){
    current = Math.max(arr[i], current + arr[i]);  // extend or restart
    best = Math.max(best, current);
  }
  return best;
}
// kadane({-2,1,-3,4,-1,2,1,-5,4}) -> 6`
        },
        output: "6  # subarray [4, -1, 2, 1]",
        note: "current resets to x when current + x < x — i.e., the previous sum is a net negative."
      },
      {
        variants: {
          cpp: `// Variant: also return the subarray indices
pair<int,vector<int>> kadaneWithIndices(vector<int>& arr){
  int current = arr[0], best = arr[0];
  int start = 0, end = 0, tempStart = 0;
  for(int i = 1; i < (int)arr.size(); i++){
    if(arr[i] > current + arr[i]){   // restart
      current = arr[i]; tempStart = i;
    } else current += arr[i];
    if(current > best){ best = current; start = tempStart; end = i; }
  }
  return {best, vector<int>(arr.begin()+start, arr.begin()+end+1)};
}
// -> (6, {4,-1,2,1})`,
          java: `// Variant: also return the subarray (best sum + the slice)
int[] kadaneWithSlice(int[] arr){
  int current = arr[0], best = arr[0];
  int start = 0, end = 0, tempStart = 0;
  for(int i = 1; i < arr.length; i++){
    if(arr[i] > current + arr[i]){    // restart
      current = arr[i]; tempStart = i;
    } else current += arr[i];
    if(current > best){ best = current; start = tempStart; end = i; }
  }
  return Arrays.copyOfRange(arr, start, end + 1);
}
// -> {4,-1,2,1}  (sum 6)`
        },
        output: "(6, [4, -1, 2, 1])",
        note: "tempStart marks where the current run began; it becomes the real start only when best updates."
      }
    ],
    marginNotes: [
      "Kadane is DP with O(1) space — dp[i] only needs dp[i-1], so one variable replaces the whole table.",
      "All-negative array? Kadane still works — it returns the single largest (least negative) element.",
      "Circular max subarray = max(kadane(arr), sum(arr) - kadane([-x for x in arr])) — the min subarray wraps around.",
      "If the problem says 'contiguous subarray' + 'maximum/minimum sum', Kadane is the first thing to reach for."
    ],
    commonMistakes: [
      "Initializing best to 0 instead of arr[0] — fails on all-negative arrays (returns 0, wrong).",
      "Resetting current to 0 instead of arr[i] — same bug, loses the restart-from-here option.",
      "Confusing subarray (contiguous) with subsequence (non-contiguous) — Kadane is for contiguous only.",
      "Forgetting that Kadane gives the SUM, not the subarray — track indices separately if you need them."
    ],
    relatedTopics: ["Prefix Sum", "Sliding Window", "Dynamic Programming", "Divide and Conquer"],
    externalLinks: [
      { label: "Maximum Subarray Problem (Wikipedia)", url: "https://en.wikipedia.org/wiki/Maximum_subarray_problem" },
      { label: "Kadane's Algorithm (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/" }
    ],
    mcqs: [
      {
        question: "What does Kadane's algorithm return for [-3, -5, -2]?",
        options: ["0", "-3", "-2", "-10"],
        answer: 2,
        explanations: ["Wrong — that's the bug from initializing best to 0.", "That's the first element, not the max.", "Correct — the single largest element, since all are negative.", "That's the total sum, not the max subarray."],
        difficulty: "medium"
      },
      {
        question: "What is the recurrence at the heart of Kadane?",
        options: ["dp[i] = dp[i-1] + arr[i]", "dp[i] = max(arr[i], dp[i-1] + arr[i])", "dp[i] = max(dp[i-1], arr[i])", "dp[i] = arr[i] - dp[i-1]"],
        answer: 1,
        explanations: ["That always extends, never restarts.", "Correct — extend the previous best or start fresh.", "That ignores the sum entirely.", "No subtraction involved."],
        difficulty: "medium"
      },
      {
        question: "Time and space complexity of Kadane?",
        options: ["O(n) time, O(n) space", "O(n) time, O(1) space", "O(n log n) time, O(1) space", "O(n²) time, O(1) space"],
        answer: 1,
        explanations: ["That's the DP table version — unnecessary.", "Correct — one pass, one running variable.", "No sorting or binary search needed.", "That's the brute force."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "dutch-national-flag",
    title: "Dutch National Flag Problem",
    difficulty: "medium",
    definition: "The Dutch National Flag problem partitions an array of three distinct values (traditionally 0, 1, 2 — red, white, blue) so that all 0s come first, then 1s, then 2s, in a single O(n) pass with O(1) space. It's the three-way-partition generalization of two-way partitioning.",
    coreUnderstanding: "With only three values, a counting sort (count 0s, 1s, 2s, then overwrite) works in O(n) but takes two passes. The Dutch National Flag algorithm does it in one pass using three pointers — low, mid, high — that divide the array into four regions: [0s | 1s | unknown | 2s]. The mid pointer scans; depending on the value it finds, it swaps to grow the 0-region, grows the 1-region, or swaps to grow the 2-region. The 'unknown' region shrinks to nothing.",
    howItWorks: "1. Initialize low = 0, mid = 0, high = n - 1.\n2. While mid <= high:\n   - If arr[mid] == 0: swap arr[low] and arr[mid], low++, mid++. (Grows the 0-region.)\n   - If arr[mid] == 1: mid++. (Grows the 1-region, already in place.)\n   - If arr[mid] == 2: swap arr[mid] and arr[high], high--. (Grows the 2-region; don't advance mid because the swapped-in value is unknown.)\n3. Done when mid > high — the unknown region is empty.\n\nWHEN TO APPLY: any 'sort three categories in-place in one pass' problem — sort colors, partition into negatives/zeros/positives, three-way quicksort partition (to avoid O(n²) on many duplicates).",
    codeExamples: [
      {
        variants: {
          cpp: `void sortColors(vector<int>& arr){
  int low = 0, mid = 0, high = arr.size() - 1;
  while(mid <= high){
    if(arr[mid] == 0){
      swap(arr[low++], arr[mid++]);
    } else if(arr[mid] == 1){
      mid++;
    } else {                        // arr[mid] == 2
      swap(arr[mid], arr[high--]);   // don't move mid — swapped value unknown
    }
  }
}
// sortColors({2,0,2,1,1,0}) -> {0,0,1,1,2,2}`,
          java: `void sortColors(int[] arr){
  int low = 0, mid = 0, high = arr.length - 1;
  while(mid <= high){
    if(arr[mid] == 0){
      int t = arr[low]; arr[low] = arr[mid]; arr[mid] = t;
      low++; mid++;
    } else if(arr[mid] == 1){
      mid++;
    } else {                        // arr[mid] == 2
      int t = arr[mid]; arr[mid] = arr[high]; arr[high] = t;
      high--;                        // don't move mid — swapped value unknown
    }
  }
}
// sortColors({2,0,2,1,1,0}) -> {0,0,1,1,2,2}`
        },
        output: "[0, 0, 1, 1, 2, 2]",
        note: "After swapping a 2 to the end, mid stays put because the element swapped in from the high end hasn't been examined yet."
      }
    ],
    marginNotes: [
      "The critical subtlety: after swapping arr[mid] with arr[high], do NOT increment mid — the new arr[mid] is unknown.",
      "This is three-way partitioning — it's what makes quicksort O(n log n) even with many duplicate keys.",
      "Counting sort (two passes) is simpler and also O(n) — use DNF only when one-pass in-place is required.",
      "The four regions: [0..low) = 0s, [low..mid) = 1s, [mid..high] = unknown, (high..n) = 2s. Watch the boundaries."
    ],
    commonMistakes: [
      "Incrementing mid after swapping with high — the swapped-in element is unexamined, so you'd skip a value.",
      "Using < instead of <= in the while condition — the element at mid == high still needs checking.",
      "Swapping arr[low] and arr[mid] but only incrementing low — mid must advance too, since the swapped-in value came from the 1-region (already known).",
      "Confusing the pointer roles — low tracks the 0-boundary, high tracks the 2-boundary, mid is the scanner."
    ],
    relatedTopics: ["Two Pointers", "Quick Sort", "Partitioning", "Counting Sort"],
    externalLinks: [
      { label: "Dutch National Flag Problem (Wikipedia)", url: "https://en.wikipedia.org/wiki/Dutch_national_flag_problem" },
      { label: "Sort Colors (LeetCode 75)", url: "https://leetcode.com/problems/sort-colors/" }
    ],
    mcqs: [
      {
        question: "After swapping arr[mid] with arr[high] (value 2), what should happen to mid?",
        options: ["Increment mid", "Decrement mid", "Leave mid unchanged", "Reset mid to low"],
        answer: 2,
        explanations: ["Wrong — the swapped-in value is unknown and must be examined.", "Wrong direction.", "Correct — the new arr[mid] hasn't been classified yet.", "No reason to reset."],
        difficulty: "medium"
      },
      {
        question: "How many passes does the Dutch National Flag algorithm make?",
        options: ["One", "Two", "Three", "O(n log n) passes"],
        answer: 0,
        explanations: ["Correct — mid scans left to right once, high shrinks from the right.", "That's counting sort.", "No.", "No sorting-based passes."],
        difficulty: "easy"
      },
      {
        question: "What is the space complexity?",
        options: ["O(n)", "O(1)", "O(3)", "O(log n)"],
        answer: 1,
        explanations: ["No extra array is used.", "Correct — only three pointer variables.", "O(3) is O(1) but the standard answer is O(1).", "No recursion."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "string-basics",
    title: "String Fundamentals",
    difficulty: "easy",
    definition: "A string is a sequence of characters. In most languages it's either immutable (Python, Java) — every 'modification' creates a new string — or mutable (C char arrays, C++ std::string with care). Understanding immutability, indexing, and the cost of concatenation is the foundation for all string algorithms.",
    coreUnderstanding: "The single most important fact: in immutable-string languages, concatenation in a loop (s += ch) is O(n²) because each += copies the entire string so far. The fix is to collect pieces in a list and join once — O(n). This one mistake turns 'obviously linear' code into a timeout. Beyond that, strings are just arrays of characters with encoding (ASCII, Unicode/UTF-8) underneath, so most array techniques (two pointers, sliding window) apply directly.",
    howItWorks: "1. Indexing: s[i] gives the i-th character. Slicing s[l:r] gives a substring (often O(r-l) due to copying).\n2. Immutability: in Python/Java, s[0] = 'x' is illegal. To 'modify', build a new string.\n3. Efficient building: append to a list, then ''.join(list) — one allocation, O(n).\n4. Comparison: == compares character by character — O(min(len1, len2)).\n5. Searching: 'in' / .find() / .index() — typically O(n·m) naive, or O(n+m) with KMP/Rabin-Karp for repeated searches.\n6. Encoding: ASCII = 1 byte/char (0-127), Unicode UTF-8 = 1-4 bytes/char. A 'character' may span multiple bytes — be careful with non-ASCII text.",
    codeExamples: [
      {
        variants: {
          cpp: `// BAD: O(n^2) with std::string += in a loop (may reallocate each time)
string s;
for(char ch : string("hello")) s += ch;   // copies the growing string

// GOOD: O(n) — reserve, then append
string s;
s.reserve(5);
for(char ch : string("hello")) s.push_back(ch);

// Reversing a string
string s = "hello";
reverse(s.begin(), s.end());               // "olleh"

// Check palindrome (two pointers)
bool isPalindrome(string s){
  int l = 0, r = s.size() - 1;
  while(l < r){
    if(s[l] != s[r]) return false;
    l++; r--;
  }
  return true;
}
// isPalindrome("racecar") -> true`,
          java: `// BAD: O(n^2) — String += in a loop copies the whole string each time
String s = "";
for(char ch : "hello".toCharArray()) s += ch;

// GOOD: O(n) — StringBuilder, one allocation
StringBuilder sb = new StringBuilder();
for(char ch : "hello".toCharArray()) sb.append(ch);
String s = sb.toString();

// Reversing a string
String s = "hello";
sb = new StringBuilder(s).reverse();
String rev = sb.toString();                // "olleh"

// Check palindrome (two pointers)
boolean isPalindrome(String s){
  int l = 0, r = s.length() - 1;
  while(l < r){
    if(s.charAt(l) != s.charAt(r)) return false;
    l++; r--;
  }
  return true;
}
// isPalindrome("racecar") -> true`
        },
        output: "olleh\ntrue",
        note: "StringBuilder (Java) / reserve+append (C++) is the #1 string performance fix."
      }
    ],
    marginNotes: [
      "s += ch in a loop is the #1 hidden O(n²) in string code. Use StringBuilder (Java) or reserve+append (C++).",
      "Slicing creates a NEW string (copy) — s.substr(l, len) is O(len), not O(1). Don't slice in a tight loop.",
      "A 'character' in Unicode may be multiple bytes — use code points, not bytes, for logic.",
      "Strings are immutable in Java but mutable in C++ — the same algorithm can have different complexity across languages."
    ],
    commonMistakes: [
      "Using += in a loop on immutable strings — O(n²) when O(n) is possible with a builder.",
      "Assuming s[0] = 'x' works in Java — it doesn't; strings are immutable.",
      "Confusing byte length with character count for Unicode.",
      "Slicing in a hot loop (s = s.substr(1)) — each slice copies the rest, making it O(n²)."
    ],
    relatedTopics: ["Two Pointers", "Sliding Window", "Palindrome Techniques", "KMP String Matching"],
    externalLinks: [
      { label: "C++ std::string Reference", url: "https://en.cppreference.com/w/cpp/string/basic_string" },
      { label: "Strings (Java Documentation)", url: "https://docs.oracle.com/javase/tutorial/java/data/strings.html" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of building a string of length n with `s += ch` in a loop (Java)?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
        answer: 2,
        explanations: ["Only with StringBuilder.", "No.", "Correct — each += copies the growing string, so total copies are 1+2+...+n = O(n²).", "Impossible — the string grows."],
        difficulty: "easy"
      },
      {
        question: "What is the efficient way to build a string from many pieces in Java?",
        options: ["s += piece in a loop", "StringBuilder.append() then toString()", "String concatenation with +", "Repeated slicing"],
        answer: 1,
        explanations: ["That's the O(n²) way.", "Correct — one allocation, one copy.", "Same O(n²) issue in a loop.", "Slicing copies, making it worse."],
        difficulty: "easy"
      },
      {
        question: "Why might a Unicode character's byte length differ from its character count?",
        options: ["They never differ", "Unicode characters can span multiple bytes", "Strings and bytes have different max lengths", "It's a bug"],
        answer: 1,
        explanations: ["They often differ.", "Correct — a char like 'é' is 1 code point but 2 bytes in UTF-8.", "No such limit difference.", "It's by design."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "palindrome-techniques",
    title: "Palindrome Techniques",
    difficulty: "medium",
    definition: "A palindrome reads the same forwards and backwards. The core techniques are: two-pointer verification (O(n)), expanding-from-center to find the longest palindromic substring (O(n²)), and Manacher's algorithm for all palindromes in O(n).",
    coreUnderstanding: "A palindrome is symmetric around its center. For even-length palindromes the center is between two characters; for odd-length it's on a character. There are 2n-1 such centers. Expanding outward from each center until the characters mismatch finds every palindromic substring — O(n) centers × O(n) expansion = O(n²). This is the practical approach; Manacher's O(n) is the theoretical optimum but rarely needed in interviews.",
    howItWorks: "1. VERIFY a palindrome: two pointers from both ends, compare inward. O(n).\n2. FIND longest palindromic substring: for each of the 2n-1 centers (each character and each gap between characters), expand outward while characters match. Track the longest. O(n²) time, O(1) space.\n3. COUNT all palindromic substrings: same expansion, count each valid expansion. O(n²).\n4. MANACHER'S (O(n)): insert '#' between all characters (handles even/odd uniformly), maintain a radius array and a rightmost palindrome boundary to skip redundant expansions.\n5. DP approach: dp[i][j] = true if s[i..j] is a palindrome. O(n²) time and space — usually worse than center expansion unless you need all pairs.",
    codeExamples: [
      {
        variants: {
          cpp: `// Verify palindrome (ignore non-alphanumeric, case-insensitive)
bool isPalindrome(string s){
  int l = 0, r = s.size() - 1;
  while(l < r){
    while(l < r && !isalnum(s[l])) l++;
    while(l < r && !isalnum(s[r])) r--;
    if(tolower(s[l]) != tolower(s[r])) return false;
    l++; r--;
  }
  return true;
}
// isPalindrome("A man, a plan, a canal: Panama") -> true`,
          java: `// Verify palindrome (ignore non-alphanumeric, case-insensitive)
boolean isPalindrome(String s){
  int l = 0, r = s.length() - 1;
  while(l < r){
    while(l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
    while(l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
    if(Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))
      return false;
    l++; r--;
  }
  return true;
}
// isPalindrome("A man, a plan, a canal: Panama") -> true`
        },
        output: "true",
        note: "Skip non-alphanumeric and compare case-insensitively — the classic 'valid palindrome' problem."
      },
      {
        variants: {
          cpp: `// Longest palindromic substring — expand from each center
string longestPalindrome(string s){
  auto expand = [&](int l, int r){
    while(l >= 0 && r < (int)s.size() && s[l] == s[r]){ l--; r++; }
    return r - l - 1;                    // length of the palindrome
  };
  int start = 0, best = 0;
  for(int i = 0; i < (int)s.size(); i++){
    int odd  = expand(i, i);             // center on s[i]
    int even = expand(i, i + 1);         // center between s[i], s[i+1]
    int len = max(odd, even);
    if(len > best){ best = len; start = i - (len - 1) / 2; }
  }
  return s.substr(start, best);
}
// longestPalindrome("babad") -> "bab" (or "aba")`,
          java: `// Longest palindromic substring — expand from each center
String longestPalindrome(String s){
  int start = 0, best = 0;
  for(int i = 0; i < s.length(); i++){
    int odd  = expand(s, i, i);          // center on s[i]
    int even = expand(s, i, i + 1);      // center between s[i], s[i+1]
    int len = Math.max(odd, even);
    if(len > best){ best = len; start = i - (len - 1) / 2; }
  }
  return s.substring(start, start + best);
}
int expand(String s, int l, int r){
  while(l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)){ l--; r++; }
  return r - l - 1;                       // length of the palindrome
}
// longestPalindrome("babad") -> "bab" (or "aba")`
        },
        output: "'bab'  # or 'aba', both valid",
        note: "2n-1 centers (n odd + n-1 even), each expanding up to O(n) — O(n²) total, O(1) space."
      }
    ],
    marginNotes: [
      "There are 2n-1 centers, not n — remember the gaps between characters for even-length palindromes.",
      "Center expansion is O(n²) time but O(1) space; the DP approach is O(n²) time AND O(n²) space — usually worse.",
      "Manacher's O(n) is elegant but complex — only reach for it if O(n²) genuinely times out.",
      "For 'valid palindrome' problems, always clarify: ignore case? ignore non-alphanumeric? empty string counts?"
    ],
    commonMistakes: [
      "Only checking odd-length centers (on a character) — missing all even-length palindromes like 'abba'.",
      "Not handling the 'ignore non-alphanumeric, case-insensitive' requirement in valid-palindrome problems.",
      "Using the O(n²) DP table when center expansion uses O(1) space and is simpler.",
      "Returning the center index instead of the actual substring — off-by-one on start = i - (length-1)//2."
    ],
    relatedTopics: ["Two Pointers", "String Fundamentals", "Dynamic Programming", "Manacher's Algorithm"],
    externalLinks: [
      { label: "Longest Palindromic Substring (LeetCode)", url: "https://leetcode.com/problems/longest-palindromic-substring/" },
      { label: "Manacher's Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Longest_palindromic_substring" }
    ],
    mcqs: [
      {
        question: "How many centers does the expand-from-center approach check for a string of length n?",
        options: ["n", "2n", "2n - 1", "n²"],
        answer: 2,
        explanations: ["Misses the gaps between characters.", "One too many.", "Correct — n on-character centers + (n-1) between-character centers.", "That's the total work, not the center count."],
        difficulty: "medium"
      },
      {
        question: "Time and space complexity of the center-expansion longest palindrome algorithm?",
        options: ["O(n) time, O(1) space", "O(n²) time, O(1) space", "O(n²) time, O(n²) space", "O(n³) time, O(1) space"],
        answer: 1,
        explanations: ["That's Manacher's.", "Correct — 2n-1 centers, each expanding up to O(n), no extra storage.", "That's the DP approach.", "No cubic factor."],
        difficulty: "medium"
      },
      {
        question: "Which palindrome would be MISSED if you only expand from on-character centers?",
        options: ["'racecar'", "'aba'", "'abba'", "'a'"],
        answer: 2,
        explanations: ["Odd-length, center on 'e' — found.", "Odd-length, center on 'b' — found.", "Correct — even-length, center is between the two 'b's, not on a character.", "Single char, trivially found."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "anagram-detection",
    title: "Anagram Detection",
    difficulty: "easy",
    definition: "Two strings are anagrams if they contain the same characters with the same frequencies, just in a different order. 'listen' and 'silent' are anagrams. Detection reduces to comparing character frequency maps or sorted forms.",
    coreUnderstanding: "An anagram is a frequency equality: every character appears the same number of times in both strings. So the problem is 'are two frequency maps equal?' Two approaches: (1) sort both strings and compare — O(n log n) time, O(1) extra space if in-place; (2) count characters in a frequency array/hash map — O(n) time, O(k) space where k is the alphabet size. For fixed alphabets (ASCII = 256), the counting approach is strictly better. For group-anagrams (many strings), the sorted form is the natural hash key.",
    howItWorks: "1. VALIDATE two strings are anagrams:\n   - If lengths differ → not anagrams.\n   - Count approach: build a frequency map for s1, decrement for s2, check all zeros. O(n) time, O(k) space.\n   - Sort approach: sort both, compare. O(n log n) time, O(1) space.\n2. GROUP anagrams (many strings): use the sorted string as a dictionary key. All anagrams share the same sorted form. O(n·k log k) for n strings of length k.\n3. FIND all anagram substrings of s in p (sliding window): maintain a frequency window of size len(p) over s, compare to p's frequency map. O(n) with a match counter instead of full map comparison each step.",
    codeExamples: [
      {
        variants: {
          cpp: `bool isAnagram(string s, string t){
  if(s.size() != t.size()) return false;
  int freq[26] = {0};
  for(char c : s) freq[c - 'a']++;
  for(char c : t) freq[c - 'a']--;
  for(int i = 0; i < 26; i++) if(freq[i] != 0) return false;
  return true;
}
// isAnagram("listen", "silent") -> true
// isAnagram("hello", "world")   -> false`,
          java: `boolean isAnagram(String s, String t){
  if(s.length() != t.length()) return false;
  int[] freq = new int[26];
  for(char c : s.toCharArray()) freq[c - 'a']++;
  for(char c : t.toCharArray()) freq[c - 'a']--;
  for(int i = 0; i < 26; i++) if(freq[i] != 0) return false;
  return true;
}
// isAnagram("listen", "silent") -> true
// isAnagram("hello", "world")   -> false`
        },
        output: "true\nfalse",
        note: "A 26-element array (lowercase letters) is faster than a hash map — no hashing overhead."
      },
      {
        variants: {
          cpp: `// Group anagrams: sorted string is the key
vector<vector<string>> groupAnagrams(vector<string>& strs){
  unordered_map<string, vector<string>> groups;
  for(string s : strs){
    string key = s;
    sort(key.begin(), key.end());      // "eat" -> "aet"
    groups[key].push_back(s);
  }
  vector<vector<string>> res;
  for(auto& [k, v] : groups) res.push_back(v);
  return res;
}
// groupAnagrams({"eat","tea","tan","ate","nat","bat"})
// -> {{"eat","tea","ate"},{"tan","nat"},{"bat"}}`,
          java: `// Group anagrams: sorted string is the key
List<List<String>> groupAnagrams(String[] strs){
  Map<String, List<String>> groups = new HashMap<>();
  for(String s : strs){
    char[] k = s.toCharArray();
    Arrays.sort(k);                    // "eat" -> "aet"
    String key = new String(k);
    groups.computeIfAbsent(key, x -> new ArrayList<>()).add(s);
  }
  return new ArrayList<>(groups.values());
}
// groupAnagrams({"eat","tea","tan","ate","nat","bat"})
// -> [["eat","tea","ate"],["tan","nat"],["bat"]]`
        },
        output: "[['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]",
        note: "The sorted form is a canonical key — all anagrams sort to the same string."
      }
    ],
    marginNotes: [
      "Length check first — if len(s) != len(t), they can't be anagrams. O(1) early exit.",
      "For ASCII-only strings, a 26-element (or 256) array is faster than a hash map — no hashing overhead.",
      "Group-anagrams uses the sorted string as a hash key — elegant because sorting gives a canonical form.",
      "Unicode anagrams: be careful — 'café' vs 'café' may look equal but have different byte sequences (normalization)."
    ],
    commonMistakes: [
      "Not checking length first — wastes work and the frequency comparison still has to build both maps.",
      "Using a set instead of a frequency map — 'aab' and 'abb' have the same set {a,b} but aren't anagrams.",
      "Forgetting that anagram detection is case-sensitive and whitespace-sensitive unless you normalize first.",
      "Comparing sorted strings character-by-character instead of just `sorted(s) == sorted(t)`."
    ],
    relatedTopics: ["String Fundamentals", "Hash Tables", "Sliding Window", "Sorting"],
    externalLinks: [
      { label: "Valid Anagram (LeetCode 242)", url: "https://leetcode.com/problems/valid-anagram/" },
      { label: "Group Anagrams (LeetCode 49)", url: "https://leetcode.com/problems/group-anagrams/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of anagram detection using frequency counting (alphabet size k)?",
        options: ["O(n log n)", "O(n)", "O(n·k)", "O(k²)"],
        answer: 1,
        explanations: ["That's the sort approach.", "Correct — one pass to count, one pass to compare; k is constant for a fixed alphabet.", "k is the alphabet size, not the string length.", "No."],
        difficulty: "easy"
      },
      {
        question: "Why does a SET fail for anagram detection?",
        options: ["Sets are too slow", "Sets ignore frequency — 'aab' and 'abb' have the same set", "Sets can't hold characters", "Sets use too much memory"],
        answer: 1,
        explanations: ["Sets are O(1) per op.", "Correct — a set tracks presence, not count, so frequency differences are invisible.", "They can.", "Memory isn't the issue."],
        difficulty: "medium"
      },
      {
        question: "What is the canonical key for grouping anagrams?",
        options: ["The string length", "The sorted string", "The first character", "The hash of the string"],
        answer: 1,
        explanations: ["Many non-anagrams share a length.", "Correct — all anagrams sort to the same string.", "Many non-anagrams share a first char.", "Hashes can collide; sorted form is exact."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "kmp-string-matching",
    title: "KMP String Matching",
    difficulty: "hard",
    definition: "KMP (Knuth-Morris-Pratt) finds all occurrences of a pattern P in a text T in O(n + m) time — linear in the input. The key idea: when a mismatch occurs, use knowledge of the already-matched characters to skip ahead in the pattern instead of restarting the text pointer.",
    coreUnderstanding: "The naive matcher restarts the text pointer on every mismatch, giving O(n·m). KMP observes that the characters already matched tell us where in the pattern we could resume without missing a match — because a prefix of the pattern might have already appeared in the matched region. This 'resume position' is precomputed in the LPS (Longest Proper Prefix which is also Suffix) array. With LPS, a mismatch shifts the pattern pointer back to lps[j-1] instead of 0, and the text pointer never moves backward.",
    howItWorks: "1. BUILD THE LPS ARRAY (for pattern P, length m):\n   - lps[i] = length of the longest proper prefix of P[0..i] that is also a suffix of P[0..i].\n   - Two pointers: len (current matching prefix length) and i (scanning). If P[i] == P[len], lps[i] = ++len, i++. Else if len > 0, len = lps[len-1] (fall back). Else lps[i] = 0, i++.\n2. SEARCH (text T, pattern P):\n   - i (text pointer) and j (pattern pointer) both start at 0.\n   - If T[i] == P[j]: i++, j++. If j == m, found a match at i - m; set j = lps[j-1] to continue.\n   - If mismatch: if j > 0, j = lps[j-1] (don't move i). Else i++.\n3. The text pointer NEVER goes backward — that's what makes it O(n + m).",
    codeExamples: [
      {
        variants: {
          cpp: `vector<int> buildLPS(string p){
  int m = p.size();
  vector<int> lps(m, 0);
  int length = 0, i = 1;
  while(i < m){
    if(p[i] == p[length]){
      lps[i++] = ++length;
    } else if(length > 0){
      length = lps[length - 1];   // fall back, don't advance i
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}
// buildLPS("ABABCABAB") -> {0,0,1,2,0,1,2,3,4}`,
          java: `int[] buildLPS(String p){
  int m = p.length();
  int[] lps = new int[m];
  int length = 0, i = 1;
  while(i < m){
    if(p.charAt(i) == p.charAt(length)){
      lps[i++] = ++length;
    } else if(length > 0){
      length = lps[length - 1];   // fall back, don't advance i
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}
// buildLPS("ABABCABAB") -> {0,0,1,2,0,1,2,3,4}`
        },
        output: "[0, 0, 1, 2, 0, 1, 2, 3, 4]",
        note: "lps[i] tells us how far to fall back in the pattern when a mismatch occurs at position i+1."
      },
      {
        variants: {
          cpp: `vector<int> kmpSearch(string text, string pattern){
  if(pattern.empty()) return {};
  vector<int> lps = buildLPS(pattern), matches;
  int i = 0, j = 0;
  while(i < (int)text.size()){
    if(text[i] == pattern[j]){
      i++; j++;
      if(j == (int)pattern.size()){
        matches.push_back(i - j);
        j = lps[j - 1];            // continue for overlaps
      }
    } else if(j > 0){
      j = lps[j - 1];              // fall back pattern, text stays
    } else {
      i++;
    }
  }
  return matches;
}
// kmpSearch("ABABDABACDABABCABABABABCABAB", "ABABCABAB") -> {10}`,
          java: `List<Integer> kmpSearch(String text, String pattern){
  if(pattern.isEmpty()) return new ArrayList<>();
  int[] lps = buildLPS(pattern);
  List<Integer> matches = new ArrayList<>();
  int i = 0, j = 0;
  while(i < text.length()){
    if(text.charAt(i) == pattern.charAt(j)){
      i++; j++;
      if(j == pattern.length()){
        matches.add(i - j);
        j = lps[j - 1];            // continue for overlaps
      }
    } else if(j > 0){
      j = lps[j - 1];              // fall back pattern, text stays
    } else {
      i++;
    }
  }
  return matches;
}
// kmpSearch("ABABDABACDABABCABABABABCABAB", "ABABCABAB") -> [10]`
        },
        output: "[10]",
        note: "The text pointer i never decrements — every character is examined at most twice (once forward, once during fallback)."
      }
    ],
    marginNotes: [
      "The text pointer NEVER moves backward — that's the whole point. The pattern pointer falls back via LPS.",
      "LPS = Longest Proper Prefix which is also a Suffix. 'Proper' means not the whole string.",
      "Building LPS is itself a KMP search of the pattern against itself — same logic, same O(m).",
      "KMP is overkill for a single short search; it shines for repeated searches or very long texts where naive O(n·m) blows up."
    ],
    commonMistakes: [
      "Moving the text pointer backward on mismatch — that's the naive algorithm, O(n·m).",
      "Computing LPS as 'longest prefix' without the 'also a suffix' constraint — wrong fallback positions.",
      "Forgetting to set j = lps[j-1] after a full match — misses overlapping matches.",
      "Using lps[j] instead of lps[j-1] on mismatch — off by one, falls back to the wrong position."
    ],
    relatedTopics: ["Rabin-Karp", "String Fundamentals", "Two Pointers", "Z-Algorithm"],
    externalLinks: [
      { label: "KMP Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm" },
      { label: "KMP (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of KMP search?",
        options: ["O(n·m)", "O(n + m)", "O(n log m)", "O(m²)"],
        answer: 1,
        explanations: ["That's the naive matcher.", "Correct — LPS build is O(m), search is O(n), text pointer never backtracks.", "No binary search involved.", "Only the LPS build, not the search."],
        difficulty: "medium"
      },
      {
        question: "What does lps[i] represent?",
        options: ["The number of times P[i] appears", "Length of longest proper prefix of P[0..i] that is also a suffix", "The next index to jump to in the text", "The length of the pattern"],
        answer: 1,
        explanations: ["No.", "Correct — it's the fallback length for the pattern pointer on mismatch.", "It's a pattern-internal value, not a text index.", "That's just m."],
        difficulty: "hard"
      },
      {
        question: "On a mismatch at pattern position j (j > 0), what happens?",
        options: ["Text pointer moves back to the start", "Pattern pointer becomes lps[j-1], text pointer stays", "Both pointers reset to 0", "Pattern pointer becomes 0, text pointer advances"],
        answer: 1,
        explanations: ["That's naive — KMP never moves the text pointer back.", "Correct — fall back in the pattern, keep the text position.", "That restarts everything.", "That loses the matched prefix info."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "rabin-karp",
    title: "Rabin-Karp Algorithm",
    difficulty: "hard",
    definition: "Rabin-Karp finds a pattern in text using rolling hashes. Instead of comparing characters, it compares hash values — and the hash of the next window can be computed from the current hash in O(1) by subtracting the outgoing character and adding the incoming one. When hashes match, it verifies with a character-by-character check to rule out collisions.",
    coreUnderstanding: "The naive approach hashes each window from scratch — O(n·m). Rabin-Karp's insight: consecutive windows share all but two characters, so the hash can 'roll' — subtract the contribution of the outgoing char, add the incoming char, done in O(1). This makes the average case O(n + m). The catch: hash collisions mean a hash match doesn't guarantee a real match, so you verify with a string compare. In the worst case (adversarial collisions), it degrades to O(n·m), but with a good hash it's effectively linear. Rabin-Karp shines for multi-pattern search — hash all patterns once, then scan the text once.",
    howItWorks: "1. Choose a base B (e.g., 256 for ASCII) and a large prime M (to keep hashes small and reduce collisions).\n2. Compute the hash of the pattern P (length m): hash = (P[0]·B^(m-1) + P[1]·B^(m-2) + ... + P[m-1]) mod M.\n3. Compute the hash of the first text window T[0..m-1] the same way.\n4. ROLL: for each next window, hash_new = (B · (hash_old - T[i] · B^(m-1)) + T[i+m]) mod M. This is O(1).\n5. When hash(window) == hash(pattern), verify with a character compare (to catch collisions). If equal, record a match.\n6. Precompute B^(m-1) mod M once — don't recompute the power each step.\n\nMULTI-PATTERN: hash all patterns into a set; roll through the text once; on a hash hit, check which pattern matched. O(n + total pattern length) — better than running KMP per pattern.",
    codeExamples: [
      {
        variants: {
          cpp: `vector<int> rabinKarp(string text, string pattern){
  int n = text.size(), m = pattern.size();
  if(m == 0 || m > n) return {};
  const long long B = 256, M = 1e9 + 7;
  vector<int> results;
  long long h = 1;
  for(int i = 0; i < m - 1; i++) h = (h * B) % M;   // B^(m-1)
  long long pHash = 0, tHash = 0;
  for(int i = 0; i < m; i++){
    pHash = (B * pHash + pattern[i]) % M;
    tHash = (B * tHash + text[i]) % M;
  }
  for(int i = 0; i + m <= n; i++){
    if(pHash == tHash && text.substr(i, m) == pattern) results.push_back(i);
    if(i + m < n){                                   // roll the hash
      tHash = (B * (tHash - text[i] * h) + text[i + m]) % M;
      if(tHash < 0) tHash += M;                       // keep positive
    }
  }
  return results;
}
// rabinKarp("ABABDABACDABABCABAB", "ABAB") -> {0,2,14}`,
          java: `List<Integer> rabinKarp(String text, String pattern){
  int n = text.length(), m = pattern.length();
  if(m == 0 || m > n) return new ArrayList<>();
  final long B = 256, M = 1_000_000_007L;
  List<Integer> results = new ArrayList<>();
  long h = 1;
  for(int i = 0; i < m - 1; i++) h = (h * B) % M;     // B^(m-1)
  long pHash = 0, tHash = 0;
  for(int i = 0; i < m; i++){
    pHash = (B * pHash + pattern.charAt(i)) % M;
    tHash = (B * tHash + text.charAt(i)) % M;
  }
  for(int i = 0; i + m <= n; i++){
    if(pHash == tHash && text.substring(i, i + m).equals(pattern))
      results.add(i);
    if(i + m < n){                                    // roll the hash
      tHash = (B * (tHash - text.charAt(i) * h) + text.charAt(i + m)) % M;
      if(tHash < 0) tHash += M;                        // keep positive
    }
  }
  return results;
}
// rabinKarp("ABABDABACDABABCABAB", "ABAB") -> [0,2,14]`
        },
        output: "[0, 2, 14]",
        note: "The roll: subtract the outgoing char's contribution, multiply by base, add the incoming char — all mod M."
      }
    ],
    marginNotes: [
      "The rolling step is the magic: hash_new = B·(hash_old - outgoing·B^(m-1)) + incoming, all mod M.",
      "Always verify with a string compare on hash match — collisions are rare but real. Skipping verification gives false positives.",
      "Rabin-Karp beats KMP for MULTI-pattern search: hash all patterns into a set, scan the text once.",
      "Adversarial inputs can force many collisions, degrading to O(n·m). Use a randomized hash or double hashing to resist this."
    ],
    commonMistakes: [
      "Not verifying hash matches with a character compare — hash collisions produce false positives.",
      "Recomputing B^(m-1) each step instead of precomputing it once — adds an O(log m) factor or worse.",
      "Forgetting to mod by a prime — the hash grows exponentially (B^m) and overflows or slows down.",
      "Negative hash after subtraction — in C++/Java add M before mod to keep it positive."
    ],
    relatedTopics: ["KMP String Matching", "String Fundamentals", "Hash Tables", "Sliding Window"],
    externalLinks: [
      { label: "Rabin-Karp Algorithm (Wikipedia)", url: "https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm" },
      { label: "Rabin-Karp (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/" }
    ],
    mcqs: [
      {
        question: "What makes Rabin-Karp's rolling hash O(1) per window?",
        options: ["It uses a smaller alphabet", "Consecutive windows share all but two characters, so the hash updates with one subtract and one add", "It skips windows that can't match", "It uses a sorted pattern"],
        answer: 1,
        explanations: ["Alphabet size doesn't change the rolling cost.", "Correct — subtract outgoing·B^(m-1), multiply by B, add incoming.", "That's not the rolling hash mechanism.", "Sorting isn't involved."],
        difficulty: "medium"
      },
      {
        question: "Why must you verify with a character compare after a hash match?",
        options: ["To improve performance", "To handle hash collisions", "To sort the results", "To reduce memory"],
        answer: 1,
        explanations: ["Verification adds work, not speed.", "Correct — two different strings can have the same hash; only a full compare confirms.", "No sorting here.", "Memory isn't the reason."],
        difficulty: "medium"
      },
      {
        question: "In which scenario does Rabin-Karp outperform KMP?",
        options: ["Single short pattern", "Multi-pattern search (many patterns at once)", "When the text is sorted", "When the pattern is a palindrome"],
        answer: 1,
        explanations: ["KMP is fine for single patterns.", "Correct — hash all patterns into a set, scan the text once; KMP would need one run per pattern.", "Sorting is irrelevant.", "Palindrome-ness is irrelevant."],
        difficulty: "hard"
      }
    ]
  }
];