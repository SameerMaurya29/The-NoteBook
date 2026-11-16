export default [
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "medium",
    definition: "Binary Search finds a target in a SORTED array in O(log n) by repeatedly halving the search space: compare the target to the middle element, then discard the half that cannot contain the target. It's the algorithm behind 'think of a number 1-100' — each guess eliminates half.",
    coreUnderstanding: "Binary search works because a sorted array is monotonic: if the middle is too small, everything to the left is also too small. That monotonicity lets us discard half the remaining elements every step — after k steps, only n/2^k elements remain, so we need log₂(n) steps. The same idea applies beyond searching: any problem where you can discard half the search space based on a predicate (find first true in a monotonic sequence) is a binary search.",
    howItWorks: "1. Set left = 0, right = n - 1.\n2. While left <= right:\n   - mid = left + (right - left) // 2  (avoids overflow vs (left+right)//2).\n   - If arr[mid] == target: return mid.\n   - If arr[mid] < target: left = mid + 1  (target is in the right half).\n   - If arr[mid] > target: right = mid - 1 (target is in the left half).\n3. If the loop ends, target is not present.\n\nVARIANTS:\n• Lower bound (first position where arr[i] >= target): on match, search left — right = mid - 1, record mid.\n• Upper bound (first position where arr[i] > target): on match, search right — left = mid + 1, record mid.\n• Search in rotated sorted array: check which half is sorted, then decide based on target's range.\n• Binary search on answer: if you can test 'is X achievable?' monotonically, binary search the answer space.",
    codeExamples: [
      {
        lang: "python",
        code: "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = left + (right - left) // 2   # overflow-safe\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nprint(binary_search([1, 3, 5, 7, 9, 11, 13], 7))",
        output: "3",
        note: "mid = left + (right - left) // 2 avoids integer overflow when left + right exceeds the max int — critical in C/Java."
      },
      {
        lang: "python",
        code: "# Lower bound: first index where arr[i] >= target\ndef lower_bound(arr, target):\n    left, right = 0, len(arr)\n    while left < right:\n        mid = (left + right) // 2\n        if arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid       # don't exclude mid — it might be the answer\n    return left\n\nprint(lower_bound([1, 3, 3, 3, 5, 7], 3))  # first 3 is at index 1",
        output: "1",
        note: "Lower/upper bound use left < right (not <=) and don't return early — they converge to the boundary."
      }
    ],
    marginNotes: [
      "The array MUST be sorted. Binary search on an unsorted array silently gives wrong answers.",
      "mid = left + (right - left) // 2, not (left + right) // 2 — the latter overflows in C/Java for large arrays.",
      "Binary search on the ANSWER (not the array) is a powerful pattern: if you can test feasibility monotonically, bisect the range.",
      "Lower/upper bound variants use left < right and never return early — they converge to the boundary, not a specific element."
    ],
    commonMistakes: [
      "Using (left + right) // 2 — integer overflow when left + right > INT_MAX in C/Java.",
      "Forgetting that the array must be sorted — binary search on unsorted data is silently wrong.",
      "Infinite loop from wrong boundary update: left = mid (not mid + 1) when the target is in the right half — mid never advances.",
      "Using left <= right in lower_bound (which needs left < right) — can loop forever or skip the boundary."
    ],
    relatedTopics: ["Two Pointers", "Big-O Notation", "Quick Sort", "Binary Search on Answer"],
    externalLinks: [
      { label: "Binary Search (Khan Academy)", url: "https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search" },
      { label: "Binary Search (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/binary-search/" }
    ],
    mcqs: [
      {
        question: "Why is mid = left + (right - left) // 2 preferred over (left + right) // 2?",
        options: ["It's faster", "It avoids integer overflow", "It handles negative numbers", "It's more accurate"],
        answer: 1,
        explanations: ["Same speed.", "Correct — left + right can overflow INT_MAX in C/Java; the subtraction form cannot.", "Both handle negatives.", "Both give the same mid."],
        difficulty: "easy"
      },
      {
        question: "What is the time complexity of binary search on a sorted array of n elements?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        answer: 1,
        explanations: ["That's linear search.", "Correct — each step halves the search space, so log₂(n) steps.", "That's sorting.", "Only if you precomputed a lookup table."],
        difficulty: "easy"
      },
      {
        question: "What precondition must hold for binary search to work?",
        options: ["The array has no duplicates", "The array is sorted (monotonic)", "The array size is a power of 2", "The target exists in the array"],
        answer: 1,
        explanations: ["Duplicates are fine.", "Correct — monotonicity is what lets us discard half each step.", "Any size works.", "The target may not exist; search returns -1."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "selection-sort",
    title: "Selection Sort",
    difficulty: "easy",
    definition: "Selection Sort builds the sorted array one position at a time: find the minimum element in the unsorted region and swap it into the next sorted position. After k passes, the first k elements are in their final sorted positions.",
    coreUnderstanding: "Selection sort is O(n²) in all cases — best, average, worst — because it always scans the entire unsorted region to find the minimum, regardless of initial order. It does at most n-1 swaps (one per pass), which is its one advantage: when swaps are expensive (e.g., writing to flash memory), selection sort minimizes them. It's NOT stable (equal elements can be reordered by the swap) and NOT adaptive (a nearly-sorted array takes the same time).",
    howItWorks: "1. For i from 0 to n-2:\n   - Assume the minimum is at index i.\n   - Scan j from i+1 to n-1: if arr[j] < arr[min_idx], update min_idx = j.\n   - Swap arr[i] and arr[min_idx].\n2. After each pass, arr[0..i] is sorted and final.\n3. The last element (i = n-1) is automatically in place after n-1 passes.\n\nINVARIANT: after pass i, arr[0..i] contains the i+1 smallest elements in sorted order, and they never move again.",
    codeExamples: [
      {
        lang: "python",
        code: "def selection_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]   # one swap per pass\n    return arr\n\nprint(selection_sort([64, 25, 12, 22, 11]))",
        output: "[11, 12, 22, 25, 64]",
        note: "Exactly n-1 swaps — fewer than any other O(n²) sort. Useful when writes are costly."
      }
    ],
    marginNotes: [
      "O(n²) in ALL cases — it always scans the full unsorted region, even if the array is already sorted.",
      "Minimum swaps (n-1) — the one scenario where selection sort wins: expensive writes (flash, EEPROM).",
      "NOT stable — the swap can move an equal element past another. Use a stable sort if order matters.",
      "Not adaptive — a nearly-sorted array gets no speedup. Insertion sort is adaptive; selection isn't."
    ],
    commonMistakes: [
      "Swapping on every comparison instead of once per pass — turns n-1 swaps into O(n²) swaps.",
      "Assuming it's stable — the long-distance swap breaks stability. (Stable selection sort exists but shifts instead of swapping.)",
      "Expecting early exit on sorted input — there's no early exit; it's always O(n²).",
      "Looping i to n instead of n-1 — the last element is already in place after n-1 passes."
    ],
    relatedTopics: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Big-O Notation"],
    externalLinks: [
      { label: "Selection Sort (Wikipedia)", url: "https://en.wikipedia.org/wiki/Selection_sort" },
      { label: "Selection Sort (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/selection-sort/" }
    ],
    mcqs: [
      {
        question: "What is the best-case time complexity of selection sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
        answer: 2,
        explanations: ["That's insertion sort's best case.", "That's merge/quick sort.", "Correct — it always scans the full unsorted region, even when sorted.", "Impossible for a sort."],
        difficulty: "easy"
      },
      {
        question: "What is selection sort's key advantage over other O(n²) sorts?",
        options: ["It's stable", "It's adaptive", "It minimizes swaps (at most n-1)", "It's O(n log n) on average"],
        answer: 2,
        explanations: ["It's NOT stable.", "It's NOT adaptive.", "Correct — one swap per pass, ideal when writes are expensive.", "It's always O(n²)."],
        difficulty: "medium"
      },
      {
        question: "Is selection sort stable?",
        options: ["Yes", "No", "Only for distinct elements", "Depends on the comparison"],
        answer: 1,
        explanations: ["The long-distance swap can reorder equal elements.", "Correct — the swap breaks stability.", "Stability is about equal elements, so this is vacuously true but misleading.", "The comparison is <, but the swap still breaks order."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "insertion-sort",
    title: "Insertion Sort",
    difficulty: "easy",
    definition: "Insertion Sort builds the sorted array one element at a time: take the next unsorted element and insert it into its correct position among the already-sorted elements by shifting larger ones right. It's how you sort a hand of playing cards.",
    coreUnderstanding: "Insertion sort is O(n²) worst-case (reverse-sorted) but O(n) best-case (nearly sorted) — making it adaptive, unlike selection sort. It's stable and in-place. For small arrays (n < ~20) or nearly-sorted data, insertion sort is actually faster than quicksort or mergesort because of its tiny constant factor and cache friendliness. Many library sorts (Timsort, introsort) switch to insertion sort for small subarrays.",
    howItWorks: "1. For i from 1 to n-1:\n   - key = arr[i] (the element to insert).\n   - j = i - 1.\n   - While j >= 0 and arr[j] > key: shift arr[j] to arr[j+1], j--.\n   - Place key at arr[j+1].\n2. After each pass, arr[0..i] is sorted (though not final — later insertions may shift elements).\n\nINVARIANT: after pass i, arr[0..i] is sorted. Unlike selection sort, these elements can still move (shifted right by later insertions).",
    codeExamples: [
      {
        lang: "python",
        code: "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]   # shift right\n            j -= 1\n        arr[j + 1] = key          # insert\n    return arr\n\nprint(insertion_sort([12, 11, 13, 5, 6]))",
        output: "[5, 6, 11, 12, 13]",
        note: "Best case (nearly sorted): the while loop exits immediately each time → O(n). Worst case (reverse sorted): full shift each time → O(n²)."
      }
    ],
    marginNotes: [
      "O(n) best case on nearly-sorted data — the while loop exits after one comparison. This makes it adaptive.",
      "Stable: equal elements (using > not >=) never shift past each other, preserving relative order.",
      "Used as the base case in Timsort (Python) and introsort (C++ std::sort) for small subarrays (n < 16-32).",
      "It's the card-sorting algorithm: pick up each card, insert it into the right spot in your sorted hand."
    ],
    commonMistakes: [
      "Using >= instead of > in the while condition — makes it unstable (equal elements shift past each other).",
      "Swapping instead of shifting — shifting is cheaper (one assignment per move, not three for a swap).",
      "Assuming it's always O(n²) — on nearly-sorted data it's O(n), which is why hybrid sorts use it.",
      "Forgetting to save key before shifting — the shift overwrites arr[i], losing the element to insert."
    ],
    relatedTopics: ["Bubble Sort", "Selection Sort", "Merge Sort", "Timsort"],
    externalLinks: [
      { label: "Insertion Sort (Wikipedia)", url: "https://en.wikipedia.org/wiki/Insertion_sort" },
      { label: "Insertion Sort (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/insertion-sort/" }
    ],
    mcqs: [
      {
        question: "What is the best-case time complexity of insertion sort?",
        options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
        answer: 2,
        explanations: ["That's the worst case.", "That's merge/quick sort.", "Correct — nearly-sorted input exits the inner loop immediately each pass.", "Impossible for a sort."],
        difficulty: "easy"
      },
      {
        question: "Why do hybrid sorts (Timsort, introsort) use insertion sort for small subarrays?",
        options: ["It's O(n log n) for small n", "Its tiny constant factor and cache friendliness beat quicksort for small n", "It's stable", "It uses less memory"],
        answer: 1,
        explanations: ["It's O(n²) but the constant is tiny.", "Correct — for n < ~20, the overhead of recursion/partitioning exceeds insertion sort's simple loop.", "Stability matters but isn't the reason here.", "Both are in-place."],
        difficulty: "medium"
      },
      {
        question: "Is insertion sort stable?",
        options: ["Yes (with >, not >=)", "No", "Only for distinct elements", "Depends on the input order"],
        answer: 0,
        explanations: ["Correct — using strict > keeps equal elements in their original order.", "It is stable when implemented correctly.", "Stability is about equal elements.", "It's always stable with strict >."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "merge-sort",
    title: "Merge Sort",
    difficulty: "medium",
    definition: "Merge Sort is a divide-and-conquer algorithm: split the array in half, recursively sort each half, then merge the two sorted halves into one. It's O(n log n) in all cases — best, average, worst — and stable, but requires O(n) extra space for the merge.",
    coreUnderstanding: "Merge sort's guarantee of O(n log n) in ALL cases (no worst-case degradation like quicksort) makes it the choice when worst-case performance matters. The divide step is O(log n) levels (halving each time); the merge at each level touches every element once (O(n)), so total is O(n log n). Stability comes from the merge: when two equal elements meet, take the one from the left half first. The O(n) space cost (the temp merge array) is the trade-off — it's not in-place.",
    howItWorks: "1. DIVIDE: if the array has 0 or 1 elements, it's already sorted. Otherwise, split at the midpoint.\n2. CONQUER: recursively merge-sort the left and right halves.\n3. MERGE: combine the two sorted halves using two pointers — compare the fronts, take the smaller, advance that pointer. If equal, take from the left first (stability).\n4. The merge is O(n) for two halves totaling n elements. The recursion tree has log n levels. Total: O(n log n).\n\nEXTERNAL SORT: merge sort is the basis for sorting data too large for memory — sort chunks that fit, then merge the sorted files (k-way merge).",
    codeExamples: [
      {
        lang: "python",
        code: "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(a, b):\n    result = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:     # <= for stability (left first on tie)\n            result.append(a[i]); i += 1\n        else:\n            result.append(b[j]); j += 1\n    result.extend(a[i:])     # drain remaining\n    result.extend(b[j:])\n    return result\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))",
        output: "[3, 9, 10, 27, 38, 43, 82]",
        note: "The <= (not <) in the merge is what makes it stable — equal elements from the left half come first."
      }
    ],
    marginNotes: [
      "O(n log n) in ALL cases — no worst-case degradation. This is merge sort's killer feature vs quicksort.",
      "Stable: use <= (not <) in the merge so equal elements from the left half are taken first.",
      "O(n) extra space — the temp array for merging. Not in-place. This is the main drawback.",
      "External sorting (data larger than RAM) uses merge sort: sort chunks, then merge sorted files."
    ],
    commonMistakes: [
      "Using < instead of <= in the merge — makes it unstable (equal elements from the right half jump ahead).",
      "Forgetting to drain the remaining elements after the main merge loop — one half may have leftovers.",
      "Assuming it's in-place — the merge needs a temp array; in-place merge exists but is complex and rarely used.",
      "Counting the recursion depth wrong — it's log₂(n) levels, each doing O(n) merge work."
    ],
    relatedTopics: ["Quick Sort", "Insertion Sort", "Divide and Conquer", "External Sort"],
    externalLinks: [
      { label: "Merge Sort (Wikipedia)", url: "https://en.wikipedia.org/wiki/Merge_sort" },
      { label: "Merge Sort (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/merge-sort/" }
    ],
    mcqs: [
      {
        question: "What is the worst-case time complexity of merge sort?",
        options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
        answer: 1,
        explanations: ["That's quicksort's worst case, not merge sort's.", "Correct — merge sort is O(n log n) in ALL cases; no degradation.", "That's only for already-sorted with a special check.", "That's binary search."],
        difficulty: "easy"
      },
      {
        question: "What makes merge sort stable?",
        options: ["It uses a temp array", "Using <= in the merge so left-half equals come first", "It's recursive", "It divides in half"],
        answer: 1,
        explanations: ["The temp array is for space, not stability.", "Correct — taking the left element on a tie preserves original order.", "Recursion is unrelated to stability.", "The split doesn't affect stability."],
        difficulty: "medium"
      },
      {
        question: "What is merge sort's main drawback compared to quicksort?",
        options: ["It's slower on average", "It needs O(n) extra space", "It's not stable", "It degrades to O(n²)"],
        answer: 1,
        explanations: ["They're both O(n log n) on average.", "Correct — the merge needs a temp array; quicksort is in-place.", "Merge sort IS stable.", "Merge sort never degrades to O(n²)."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "quick-sort",
    title: "Quick Sort",
    difficulty: "hard",
    definition: "Quick Sort is a divide-and-conquer sort: pick a 'pivot', partition the array so all elements less than the pivot come before it and all greater come after, then recursively sort the two partitions. It's O(n log n) on average, O(n²) worst-case, but in-place and cache-friendly — making it the default library sort in practice (with safeguards against the worst case).",
    coreUnderstanding: "Quick sort's average O(n log n) with a small constant and in-place operation makes it faster than merge sort in practice for in-memory arrays. The worst case O(n²) happens when the pivot is consistently the smallest or largest element (e.g., already-sorted input with a naive first-element pivot) — one partition is empty, the other is n-1, giving n + (n-1) + ... = O(n²). The fixes: random pivot, median-of-three, or introsort (switch to heapsort if recursion depth exceeds c·log n). The partition step is the heart of the algorithm.",
    howItWorks: "1. CHOOSE a pivot (first, last, random, or median-of-three).\n2. PARTITION: rearrange so elements < pivot are left of it, elements > pivot are right. The pivot lands in its final sorted position. (Lomuto or Hoare partition scheme.)\n3. RECURSE: quick-sort the left partition and the right partition.\n4. Base case: 0 or 1 elements is already sorted.\n\nLOMUTO PARTITION (simpler): pivot = last element. Scan with i tracking the boundary of 'less than pivot'. Swap arr[i] and arr[j] when arr[j] < pivot. Finally swap pivot into position i.\n\nHOARE PARTITION (faster, fewer swaps): two pointers from both ends, swap out-of-place pairs, meet in the middle.\n\nAVERAGE: each partition roughly halves → log n levels × O(n) partition = O(n log n).\nWORST: one empty partition each time → n levels × O(n) = O(n²).",
    codeExamples: [
      {
        lang: "python",
        code: "import random\n\ndef quick_sort(arr, lo=0, hi=None):\n    if hi is None: hi = len(arr) - 1\n    if lo < hi:\n        p = partition(arr, lo, hi)\n        quick_sort(arr, lo, p - 1)\n        quick_sort(arr, p + 1, hi)\n    return arr\n\ndef partition(arr, lo, hi):\n    # Lomuto scheme with random pivot\n    rand_idx = random.randint(lo, hi)\n    arr[rand_idx], arr[hi] = arr[hi], arr[rand_idx]  # move pivot to end\n    pivot = arr[hi]\n    i = lo                          # boundary of '< pivot' region\n    for j in range(lo, hi):\n        if arr[j] < pivot:\n            arr[i], arr[j] = arr[j], arr[i]\n            i += 1\n    arr[i], arr[hi] = arr[hi], arr[i]  # place pivot in final spot\n    return i\n\nprint(quick_sort([3, 6, 8, 10, 1, 2, 1]))",
        output: "[1, 1, 2, 3, 6, 8, 10]",
        note: "Random pivot makes the worst case astronomically unlikely — expected O(n log n) for any input."
      }
    ],
    marginNotes: [
      "Random pivot (or median-of-three) is ESSENTIAL — a fixed pivot (first/last) gives O(n²) on sorted input, a common real-world case.",
      "In-place (O(log n) stack space for recursion) — no temp array needed, unlike merge sort.",
      "NOT stable by default — the partition swaps can reorder equal elements. Stable quicksort exists but is slower.",
      "Introsort (C++ std::sort) = quicksort + heapsort fallback + insertion sort for small n — gets quicksort's speed with a guaranteed O(n log n) bound."
    ],
    commonMistakes: [
      "Using a fixed pivot (first/last element) — O(n²) on sorted or reverse-sorted input, a very common case.",
      "Forgetting the base case (lo >= hi) — infinite recursion on empty or single-element partitions.",
      "Partitioning with <= instead of < — can put equal elements on the wrong side, and with all-equal input, one partition gets everything (O(n²)).",
      "Not handling the recursion depth — deep recursion on a bad pivot can stack-overflow. Introsort caps this."
    ],
    relatedTopics: ["Merge Sort", "Heap Sort", "Binary Search", "Dutch National Flag"],
    externalLinks: [
      { label: "Quicksort (Wikipedia)", url: "https://en.wikipedia.org/wiki/Quicksort" },
      { label: "Quick Sort (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/quick-sort/" }
    ],
    mcqs: [
      {
        question: "What causes quicksort's O(n²) worst case?",
        options: ["Random pivot", "Pivot is consistently the min or max (one partition is empty)", "Too many duplicates", "Large arrays"],
        answer: 1,
        explanations: ["Random pivot AVOIDS the worst case.", "Correct — empty partition means n levels of O(n) work = O(n²).", "Duplicates cause O(n²) only with a bad partition scheme (use three-way partition).", "Size alone doesn't cause it."],
        difficulty: "medium"
      },
      {
        question: "How does a random pivot fix the worst case?",
        options: ["It makes the sort stable", "The probability of consistently bad pivots is astronomically low", "It reduces space to O(1)", "It makes it O(n) on average"],
        answer: 1,
        explanations: ["Random pivot doesn't affect stability.", "Correct — expected O(n log n) for ANY input; bad splits average out.", "Quicksort is already in-place.", "It's O(n log n), not O(n)."],
        difficulty: "medium"
      },
      {
        question: "Quicksort vs merge sort — which is in-place?",
        options: ["Both", "Quicksort only", "Merge sort only", "Neither"],
        answer: 1,
        explanations: ["Merge sort needs O(n) temp space for merging.", "Correct — quicksort partitions in-place; only O(log n) recursion stack.", "Merge sort is not in-place.", "Quicksort is."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "heap-sort",
    title: "Heap Sort",
    difficulty: "hard",
    definition: "Heap Sort builds a max-heap from the array, then repeatedly extracts the maximum (swap root with last element, shrink heap, sift-down) to build the sorted array from the end. It's O(n log n) in all cases, in-place, but not stable.",
    coreUnderstanding: "A max-heap is a binary tree where every parent is >= its children, stored as an array (parent at i, children at 2i+1 and 2i+2). The root is always the maximum. Heap sort exploits this: the max goes to the end (its final sorted position), the heap shrinks by one, and we restore the heap property by sifting the new root down. After n-1 extractions, the array is sorted. Building the heap is O(n) (not O(n log n) — a subtle result from amortized analysis), and each extraction is O(log n), giving O(n log n) total.",
    howItWorks: "1. BUILD HEAP (O(n)): starting from the last non-leaf node (index n//2 - 1) down to 0, sift-down each node. The bottom-up order means each sift-down operates on a subtree whose children are already heaps.\n2. SORT (O(n log n)): for i from n-1 down to 1:\n   - Swap arr[0] (max) with arr[i] (end of heap).\n   - Shrink the heap by 1 (i decreases).\n   - Sift-down arr[0] in the reduced heap to restore the max-heap property.\n3. The sorted portion grows from the end; the heap shrinks from the front.\n\nSIFT-DOWN: compare node with its two children; if the larger child is greater than the node, swap and continue down. O(log n) = height of the tree.",
    codeExamples: [
      {
        lang: "python",
        code: "def heap_sort(arr):\n    n = len(arr)\n\n    # Build max-heap (O(n))\n    for i in range(n // 2 - 1, -1, -1):\n        sift_down(arr, n, i)\n\n    # Extract max one by one (O(n log n))\n    for i in range(n - 1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]   # max to end\n        sift_down(arr, i, 0)             # restore heap on reduced size\n    return arr\n\ndef sift_down(arr, n, i):\n    largest = i\n    left, right = 2 * i + 1, 2 * i + 2\n    if left < n and arr[left] > arr[largest]:\n        largest = left\n    if right < n and arr[right] > arr[largest]:\n        largest = right\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        sift_down(arr, n, largest)\n\nprint(heap_sort([12, 11, 13, 5, 6, 7]))",
        output: "[5, 6, 7, 11, 12, 13]",
        note: "Build-heap starts at n//2-1 (last non-leaf) — leaves are already valid heaps."
      }
    ],
    marginNotes: [
      "Build-heap is O(n), NOT O(n log n) — a non-obvious result from amortized analysis (lower nodes sift less).",
      "In-place (O(1) extra space) and O(n log n) in ALL cases — no worst-case degradation like quicksort.",
      "NOT stable — the sift-down swaps can reorder equal elements across large distances.",
      "Poor cache performance (jumps by 2i+1, 2i+2 across the array) — slower in practice than quicksort despite same Big-O."
    ],
    commonMistakes: [
      "Building the heap by inserting elements one by one (O(n log n)) instead of the bottom-up sift-down (O(n)).",
      "Starting build-heap at index 0 instead of n//2-1 — sifts leaves unnecessarily (they're already heaps).",
      "Forgetting to shrink the heap size after each extraction — sift-down would touch the sorted region.",
      "Using 2i and 2i+1 instead of 2i+1 and 2i+2 — off by one for 0-indexed arrays."
    ],
    relatedTopics: ["Quick Sort", "Merge Sort", "Heaps / Priority Queue", "Binary Trees"],
    externalLinks: [
      { label: "Heapsort (Wikipedia)", url: "https://en.wikipedia.org/wiki/Heapsort" },
      { label: "Heap Sort (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/heap-sort/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of building a heap from an unsorted array (bottom-up sift-down)?",
        options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
        answer: 1,
        explanations: ["That's the insert-one-by-one approach.", "Correct — amortized analysis shows bottom-up build is O(n), a surprising result.", "That's a single sift-down.", "No quadratic factor."],
        difficulty: "hard"
      },
      {
        question: "For a 0-indexed array heap, the children of node i are at:",
        options: ["2i and 2i+1", "2i+1 and 2i+2", "i//2 and i//2+1", "i+1 and i+2"],
        answer: 1,
        explanations: ["That's 1-indexed.", "Correct — 0-indexed: left = 2i+1, right = 2i+2.", "Those are the parent formulas.", "Those are siblings, not children."],
        difficulty: "medium"
      },
      {
        question: "Why is heap sort slower than quicksort in practice despite the same O(n log n)?",
        options: ["It's not stable", "Poor cache locality (non-sequential array access)", "It uses more memory", "It has a higher worst case"],
        answer: 1,
        explanations: ["Instability doesn't affect speed.", "Correct — jumping by 2i+1, 2i+2 causes cache misses; quicksort scans sequentially.", "Both are in-place.", "Both are O(n log n) worst case (quicksort with introsort)."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "counting-sort",
    title: "Counting Sort",
    difficulty: "medium",
    definition: "Counting Sort is a non-comparison integer sort: count how many times each value appears, then reconstruct the sorted array from the counts. It's O(n + k) where k is the range of values — linear when k = O(n), but impractical when k is huge (e.g., sorting 10 elements with values up to 10⁹).",
    coreUnderstanding: "Comparison-based sorts have a lower bound of O(n log n) — you can't do better by comparing elements. Counting sort breaks this barrier by NOT comparing: it uses values as array indices. When the value range k is small relative to n, it's O(n + k) ≈ O(n) — faster than any comparison sort. When k >> n (e.g., sparse values), the count array is mostly empty and the sort is dominated by k, making it worse than O(n log n). It's also the foundation of radix sort (counting sort per digit).",
    howItWorks: "1. Find the range: min_val and max_val of the input. Range k = max_val - min_val + 1.\n2. Create a count array of size k, initialized to 0.\n3. Count: for each element x, increment count[x - min_val].\n4. (For stability) Convert counts to prefix sums: count[i] now = number of elements <= i. This gives each element's output position.\n5. Build output: iterate the input in REVERSE, place each element at count[val] - 1, decrement count[val]. Reverse iteration preserves stability.\n6. Copy output back to the original array.\n\nSTABILITY: the prefix-sum + reverse-iteration trick makes it stable — essential when counting sort is used as a subroutine in radix sort.",
    codeExamples: [
      {
        lang: "python",
        code: "def counting_sort(arr):\n    if not arr:\n        return arr\n    min_val, max_val = min(arr), max(arr)\n    k = max_val - min_val + 1\n    count = [0] * k\n\n    # Count occurrences\n    for x in arr:\n        count[x - min_val] += 1\n\n    # Reconstruct sorted array\n    result = []\n    for i in range(k):\n        result.extend([i + min_val] * count[i])\n    return result\n\nprint(counting_sort([4, 2, 2, 8, 3, 3, 1]))",
        output: "[1, 2, 2, 3, 3, 4, 8]",
        note: "This version isn't stable (it just extends by count). The stable version uses prefix sums + reverse iteration."
      },
      {
        lang: "python",
        code: "# Stable counting sort (needed for radix sort)\ndef counting_sort_stable(arr):\n    if not arr:\n        return arr\n    min_val, max_val = min(arr), max(arr)\n    k = max_val - min_val + 1\n    count = [0] * k\n    for x in arr:\n        count[x - min_val] += 1\n    # Prefix sums: count[i] = number of elements <= i\n    for i in range(1, k):\n        count[i] += count[i - 1]\n    # Build output in REVERSE for stability\n    output = [0] * len(arr)\n    for x in reversed(arr):\n        count[x - min_val] -= 1\n        output[count[x - min_val]] = x\n    return output\n\nprint(counting_sort_stable([4, 2, 2, 8, 3, 3, 1]))",
        output: "[1, 2, 2, 3, 3, 4, 8]",
        note: "Reverse iteration + prefix sums = stable. Forward iteration would reverse the order of equal elements."
      }
    ],
    marginNotes: [
      "Non-comparison sort — breaks the O(n log n) lower bound by using values as indices, not comparisons.",
      "Only practical when k (value range) is O(n). Sorting 10 elements with values up to 10⁹ → k = 10⁹, useless.",
      "Stable counting sort (prefix sums + reverse iteration) is the building block of radix sort.",
      "Handles negative values by offsetting with min_val — count[x - min_val] maps the range to [0, k)."
    ],
    commonMistakes: [
      "Using counting sort when k >> n — the count array is huge and mostly empty; use comparison sort instead.",
      "Forgetting the min_val offset for negative values — count[x] with negative x is an index error.",
      "Building the output in forward order — reverses the stability (equal elements come out in reverse order).",
      "Assuming it's comparison-based — it's not; the O(n log n) lower bound doesn't apply."
    ],
    relatedTopics: ["Radix Sort", "Heap Sort", "Dutch National Flag", "Big-O Notation"],
    externalLinks: [
      { label: "Counting Sort (Wikipedia)", url: "https://en.wikipedia.org/wiki/Counting_sort" },
      { label: "Counting Sort (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/counting-sort/" }
    ],
    mcqs: [
      {
        question: "When is counting sort practical?",
        options: ["Always — it's O(n)", "When the value range k is O(n)", "When n is very large", "When the values are floating point"],
        answer: 1,
        explanations: ["Only when k is small.", "Correct — O(n + k) ≈ O(n) when k = O(n); useless when k >> n.", "Large n with huge k is still bad.", "Counting sort needs integer keys."],
        difficulty: "medium"
      },
      {
        question: "Why does counting sort use prefix sums and reverse iteration?",
        options: ["To improve speed", "To make it stable", "To handle negatives", "To reduce memory"],
        answer: 1,
        explanations: ["It doesn't change speed.", "Correct — prefix sums give output positions; reverse iteration preserves original order of equals.", "Negatives use the min_val offset.", "Memory is the same."],
        difficulty: "hard"
      },
      {
        question: "Counting sort breaks the O(n log n) comparison-sort lower bound because:",
        options: ["It uses a hash table", "It doesn't compare elements — values are used as indices", "It's recursive", "It uses parallelism"],
        answer: 1,
        explanations: ["No hash table needed.", "Correct — the lower bound applies only to comparison-based sorts.", "Recursion is irrelevant to the bound.", "No parallelism involved."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "bit-manipulation-basics",
    title: "Bit Manipulation Basics",
    difficulty: "medium",
    definition: "Bit manipulation operates on the individual bits of integers using bitwise operators: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), and right shift (>>). It's the fastest way to perform certain operations — setting, clearing, toggling, and testing individual bits — and the foundation of low-level systems, cryptography, and competitive programming tricks.",
    coreUnderstanding: "Computers store everything as bits. Bitwise operators work on integers one bit at a time, in parallel across all bits. AND masks (selects bits), OR sets bits, XOR toggles bits, NOT inverts, shifts multiply/divide by powers of 2. Because these map directly to single CPU instructions, bit tricks are often 10-100x faster than arithmetic equivalents. The key mental model: an integer is a set of bit-flags, and bitwise ops are set operations (AND = intersection, OR = union, XOR = symmetric difference).",
    howItWorks: "OPERATORS (on each bit independently):\n• AND (&): 1 only if both bits are 1. Used to MASK (test/clear bits).\n• OR (|): 1 if either bit is 1. Used to SET bits.\n• XOR (^): 1 if bits differ. Used to TOGGLE bits. A ^ A = 0, A ^ 0 = A.\n• NOT (~): inverts all bits. ~x = -x - 1 in two's complement.\n• Left shift (<<): x << n = x × 2ⁿ. Shifts bits left, fills with 0.\n• Right shift (>>): x >> n = x ÷ 2ⁿ (floor for positives). Fills with sign bit for negatives (arithmetic shift).\n\nCOMMON OPERATIONS:\n• Set bit k: x | (1 << k)\n• Clear bit k: x & ~(1 << k)\n• Toggle bit k: x ^ (1 << k)\n• Test bit k: (x >> k) & 1, or x & (1 << k) != 0\n• Lowest set bit: x & (-x)  (isolate the rightmost 1)\n• Clear lowest set bit: x & (x - 1)  (Brian Kernighan's trick)\n• Count set bits: repeatedly x &= (x-1), count iterations",
    codeExamples: [
      {
        lang: "python",
        code: "# Set, clear, toggle, test bit k\nx = 0b00001010  # 10 in binary\n\nx |= (1 << 4)    # set bit 4   -> 0b00011010 = 26\nprint(bin(x))\n\nx &= ~(1 << 1)   # clear bit 1 -> 0b00011000 = 24\nprint(bin(x))\n\nx ^= (1 << 3)    # toggle bit 3 -> 0b00010000 = 16\nprint(bin(x))\n\nprint((x >> 4) & 1)  # test bit 4 -> 1",
        output: "0b11010\n0b11000\n0b10000\n1",
        note: "1 << k creates a mask with only bit k set. OR to set, AND-NOT to clear, XOR to toggle."
      },
      {
        lang: "python",
        code: "# Brian Kernighan's trick: count set bits in O(number of 1s)\ndef popcount(n):\n    count = 0\n    while n:\n        n &= (n - 1)   # clears the lowest set bit\n        count += 1\n    return count\n\nprint(popcount(0b10110011))  # 5 ones\n\n# Isolate lowest set bit\nx = 0b01100000\nprint(bin(x & (-x)))  # 0b1000000 (the lowest 1)",
        output: "5\n0b1000000",
        note: "x & (x-1) clears the lowest set bit because subtracting 1 flips all bits up to and including the lowest 1."
      }
    ],
    marginNotes: [
      "XOR is its own inverse: (a ^ b) ^ b = a. This enables swap-without-temp (a ^= b; b ^= a; a ^= b) and simple encryption.",
      "x & (x-1) clears the lowest set bit — Brian Kernighan's trick counts set bits in O(popcount), not O(bits).",
      "Right shift of negatives is implementation-defined in C (arithmetic vs logical); Python uses arithmetic (fills with 1s).",
      "Python integers are arbitrary precision — no overflow. In C/Java, watch for overflow on << (shifting into the sign bit)."
    ],
    commonMistakes: [
      "Confusing & (bitwise) and && (logical), or | and || — they're different operators with different semantics.",
      "Forgetting operator precedence: x & 1 == 0 parses as x & (1 == 0) — always parenthesize: (x & 1) == 0.",
      "Using ~x expecting a positive mask — ~x is negative in two's complement (~0 = -1, not 0).",
      "Assuming >> is always logical (fill with 0) — for signed negatives it's arithmetic (fill with sign bit)."
    ],
    relatedTopics: ["Bit Tricks & XOR", "Bitmasking", "Two's Complement", "Hash Tables"],
    externalLinks: [
      { label: "Bitwise Operations (Wikipedia)", url: "https://en.wikipedia.org/wiki/Bitwise_operation" },
      { label: "Bit Manipulation (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/" }
    ],
    mcqs: [
      {
        question: "What does x & (x - 1) do?",
        options: ["Sets the lowest bit", "Clears the lowest set bit", "Toggles all bits", "Doubles x"],
        answer: 1,
        explanations: ["That's x | 1.", "Correct — Brian Kernighan's trick; subtracting 1 flips bits up to the lowest 1.", "That's ~x.", "That's x << 1."],
        difficulty: "medium"
      },
      {
        question: "What is x ^ x?",
        options: ["x", "0", "1", "All bits set"],
        answer: 1,
        explanations: ["That's x ^ 0.", "Correct — XOR with itself always gives 0 (bits can't differ from themselves).", "Only if x is 1.", "Only if x is all 1s."],
        difficulty: "easy"
      },
      {
        question: "How do you test if bit k is set in x?",
        options: ["x & (1 << k) != 0", "x | (1 << k)", "x ^ (1 << k)", "x >> k"],
        answer: 0,
        explanations: ["Correct — AND with the mask; non-zero result means the bit is set.", "That SETS bit k.", "That TOGGLES bit k.", "That shifts x, not a test."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "bit-tricks-xor",
    title: "Bit Tricks & XOR",
    difficulty: "hard",
    definition: "XOR (^) is the Swiss Army knife of bit manipulation: it's its own inverse (a ^ b ^ b = a), self-canceling (a ^ a = 0), and identity (a ^ 0 = a). These properties unlock a family of elegant tricks — finding a unique element, swapping without a temp, detecting duplicates, and generating Gray codes.",
    coreUnderstanding: "XOR's power comes from three properties: (1) a ^ a = 0 (self-canceling), (2) a ^ 0 = a (identity), (3) XOR is commutative and associative (order doesn't matter). Together, XORing a list cancels all elements appearing an even number of times, leaving only those appearing an odd number of times. This turns 'find the unique element in a sea of duplicates' from O(n²) to O(n) with O(1) space. The same logic powers swap-without-temp, simple stream ciphers, and parity checks.",
    howItWorks: "KEY PROPERTIES:\n• a ^ a = 0, a ^ 0 = a, a ^ b ^ b = a (self-inverse).\n• Commutative & associative: order and grouping don't matter.\n• XOR of a list = elements appearing an odd number of times (evens cancel).\n\nCLASSIC TRICKS:\n1. FIND THE UNIQUE ELEMENT: XOR all elements. Pairs cancel (a^a=0), leaving the singleton. O(n), O(1).\n2. SWAP WITHOUT TEMP: a ^= b; b ^= a; a ^= b. (Works because a^b^b = a.)\n3. FIND MISSING NUMBER (1..n): XOR all array elements AND all numbers 1..n. Pairs cancel, missing number remains.\n4. PARITY CHECK: XOR all bits — result is 1 if odd number of 1s. Hardware parity bit.\n5. GRAY CODE: g = n ^ (n >> 1). Adjacent Gray codes differ by exactly one bit — used in K-maps and rotary encoders.\n6. SIMPLE CIPHER: ciphertext = plaintext ^ key; decrypt = ciphertext ^ key. (One-time pad if key is random and used once.)",
    codeExamples: [
      {
        lang: "python",
        code: "# Find the unique element (all others appear exactly twice)\ndef find_unique(arr):\n    result = 0\n    for x in arr:\n        result ^= x     # pairs cancel, singleton remains\n    return result\n\nprint(find_unique([2, 3, 5, 3, 2]))  # 5 is unique",
        output: "5",
        note: "XOR all elements: 2^3^5^3^2 = (2^2)^(3^3)^5 = 0^0^5 = 5. O(n) time, O(1) space."
      },
      {
        lang: "python",
        code: "# Find the missing number in 1..n (one is missing)\ndef missing_number(arr, n):\n    xor_all = 0\n    for i in range(1, n + 1):\n        xor_all ^= i        # XOR all 1..n\n    for x in arr:\n        xor_all ^= x        # XOR all array elements\n    return xor_all  # pairs cancel, missing remains\n\nprint(missing_number([1, 2, 4, 5, 6], 6))  # 3 is missing",
        output: "3",
        note: "XOR(1..n) ^ XOR(array) = missing. Same idea as sum formula (n(n+1)/2 - sum) but no overflow risk."
      },
      {
        lang: "python",
        code: "# Swap without a temp variable (use with caution — not for aliased vars!)\na, b = 5, 9\na ^= b\nb ^= a\na ^= b\nprint(a, b)  # 9, 5",
        output: "9 5",
        note: "Don't use this if a and b are the same variable (a ^= a zeroes it). Python's a, b = b, a is clearer anyway."
      }
    ],
    marginNotes: [
      "XOR finds the ODD-occurring element — if duplicates appear 3 times, XOR won't work (use counting or a different approach).",
      "Swap-without-temp is a neat trick but DON'T use it if a and b might be the same variable — a ^= a zeroes it permanently.",
      "Missing number via XOR avoids the overflow risk of the sum formula (n(n+1)/2 can overflow in C/Java).",
      "Gray code (n ^ (n>>1)) guarantees adjacent values differ by one bit — essential in hardware to avoid glitches."
    ],
    commonMistakes: [
      "Using XOR to find a unique element when duplicates appear 3+ times — XOR only cancels even occurrences.",
      "Swap-without-temp on aliased variables (a and b are the same) — zeroes the variable. Always check for aliasing.",
      "Assuming XOR is 'encryption' — XOR with a reused key is trivially breakable (two-time pad attack).",
      "Forgetting that XOR of a list gives the odd-count elements, not just 'the unique one' — multiple odd-count elements all remain."
    ],
    relatedTopics: ["Bit Manipulation Basics", "Bitmasking", "Hash Tables", "Gray Code"],
    externalLinks: [
      { label: "XOR Swap (Wikipedia)", url: "https://en.wikipedia.org/wiki/XOR_swap_algorithm" },
      { label: "XOR Tricks (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/xor-tricks-for-competitive-programming/" }
    ],
    mcqs: [
      {
        question: "XORing all elements of [2, 3, 2, 3, 7] gives:",
        options: ["0", "7", "17", "2"],
        answer: 1,
        explanations: ["That's if all cancel.", "Correct — 2^2=0, 3^3=0, 0^0^7=7. The singleton remains.", "That's the sum.", "That's the first element."],
        difficulty: "easy"
      },
      {
        question: "Why does XOR fail to find a unique element if duplicates appear 3 times?",
        options: ["XOR is not associative", "XOR cancels even occurrences; 3 is odd, so the element remains mixed in", "XOR only works on positive numbers", "The array must be sorted"],
        answer: 1,
        explanations: ["XOR is associative.", "Correct — x^x^x = x (not 0), so triple-appearing elements don't cancel. Need a different approach.", "XOR works on any integer.", "Sorting is irrelevant."],
        difficulty: "hard"
      },
      {
        question: "What is the risk of the XOR swap trick (a^=b; b^=a; a^=b)?",
        options: ["It's slower than temp swap", "If a and b are the same variable, it zeroes the value", "It only works for positive numbers", "It overflows"],
        answer: 1,
        explanations: ["It's the same speed.", "Correct — a ^= a = 0, then b ^= 0 = 0, then a ^= 0 = 0. Both become 0.", "Works for any integer.", "No overflow in XOR."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "bitmasking",
    title: "Bitmasking",
    difficulty: "hard",
    definition: "Bitmasking uses an integer's individual bits as a compact set of boolean flags — each bit represents presence/absence of an element. A 32-bit integer stores a set of up to 32 elements; a 64-bit integer, 64. Bitwise operators become set operations: OR = add, AND-NOT = remove, AND = test membership, XOR = toggle. This is the foundation of subset DP and state compression.",
    coreUnderstanding: "When a problem involves subsets of a small set (n ≤ 20-64), representing the subset as a bitmask turns exponential-space enumeration into a compact integer. 'Is element i in the subset?' is a single bit test. 'Add element i' is a single OR. 'Union of two subsets' is a single OR. This makes bitmask DP (traveling salesman, subset sum with small n) feasible — the state is just an integer, and transitions are single bit operations. The trade-off: n is limited to the word size (typically 20-64).",
    howItWorks: "REPRESENTING A SUBSET as an integer mask:\n• Element i is in the set iff bit i of mask is 1.\n• Empty set = 0. Full set (all n elements) = (1 << n) - 1.\n\nSET OPERATIONS (mask m, element i):\n• Add i: m | (1 << i)\n• Remove i: m & ~(1 << i)\n• Toggle i: m ^ (1 << i)\n• Test i in m: (m >> i) & 1, or m & (1 << i) != 0\n• Union: m1 | m2. Intersection: m1 & m2. Difference: m1 & ~m2.\n• Complement (within n bits): ((1 << n) - 1) ^ m\n\nENUMERATING ALL SUBSETS of n elements: for mask in range(1 << n). 2ⁿ subsets.\nENUMERATING SUBSETS of a given mask m: sub = m; while True: ...; sub = (sub - 1) & m; until sub == 0. (3^k iterations for k set bits.)\n\nDP ON MASKS (e.g., TSP): dp[mask][last] = min cost to visit the set 'mask' ending at 'last'. Transition: dp[mask | (1 << j)][j] = min(dp[mask][last] + dist[last][j]). O(2ⁿ · n²).",
    codeExamples: [
      {
        lang: "python",
        code: "# Subset sum via bitmask DP (small n only — O(n * 2^n))\ndef subset_sum(arr, target):\n    n = len(arr)\n    # Enumerate all 2^n subsets\n    for mask in range(1 << n):\n        total = 0\n        for i in range(n):\n            if mask & (1 << i):\n                total += arr[i]\n        if total == target:\n            return True, mask\n    return False, -1\n\nfound, mask = subset_sum([3, 1, 4, 2], 5)\nprint(found, bin(mask))  # True, 0b1010 (elements 1 and 3: 1+4=5)",
        output: "True 0b1010",
        note: "2^n subsets — only feasible for n ≤ ~20. For larger n, use meet-in-the-middle or DP."
      },
      {
        lang: "python",
        code: "# Enumerate all subsets of a given mask (submasks)\ndef submasks(mask):\n    sub = mask\n    result = []\n    while sub:\n        result.append(sub)\n        sub = (sub - 1) & mask   # next smaller submask\n    result.append(0)  # the empty subset\n    return result\n\nprint([bin(s) for s in submasks(0b101)])",
        output: "['0b101', '0b100', '0b1', '0b0']",
        note: "(sub - 1) & mask gives the next smaller submask — 3^k iterations for k set bits, not 2^n."
      }
    ],
    marginNotes: [
      "Bitmask DP is feasible only for n ≤ ~20 (2^20 = 1M states). Beyond that, the state space explodes.",
      "Enumerating submasks of a mask m is 3^(popcount(m)), not 2^n — much faster when m is sparse.",
      "Python has arbitrary-precision integers, so masks can exceed 64 bits — but the 2^n state explosion still limits you.",
      "TSP with bitmask DP is O(2^n · n²) — the classic 'small n, exponential' problem that bitmasking makes tractable."
    ],
    commonMistakes: [
      "Using bitmasking for n > ~25 — 2^25 = 33M states, too slow. The exponential wall is real.",
      "Forgetting the empty set (mask = 0) when enumerating subsets — it's a valid subset.",
      "Confusing (1 << n) - 1 (full set of n bits) with (1 << n) (only bit n set, which is outside the set).",
      "Iterating submasks with `sub = sub - 1` instead of `sub = (sub - 1) & mask` — includes bits outside the mask."
    ],
    relatedTopics: ["Bit Manipulation Basics", "Dynamic Programming", "Subset Sum", "Traveling Salesman"],
    externalLinks: [
      { label: "Bitmask DP (CP-Algorithms)", url: "https://cp-algorithms.com/algebra/all-submasks.html" },
      { label: "Bitmasking (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/bitmasking-dynamic-programming/" }
    ],
    mcqs: [
      {
        question: "What is the maximum n for which bitmask DP is typically feasible?",
        options: ["n ≤ 10", "n ≤ 20", "n ≤ 100", "n ≤ 1000"],
        answer: 1,
        explanations: ["Too conservative — 2^10 = 1024 is tiny.", "Correct — 2^20 ≈ 1M states, feasible; 2^25 ≈ 33M is borderline.", "2^100 is astronomically large.", "Way too large."],
        difficulty: "medium"
      },
      {
        question: "How do you represent the full set of n elements as a bitmask?",
        options: ["1 << n", "(1 << n) - 1", "n", "2 * n"],
        answer: 1,
        explanations: ["That's only bit n set (outside the set).", "Correct — bits 0 through n-1 all set.", "That's just the count.", "Irrelevant."],
        difficulty: "easy"
      },
      {
        question: "How many iterations does enumerating all submasks of a mask with k set bits take?",
        options: ["2^n", "2^k", "3^k", "k!"],
        answer: 2,
        explanations: ["That's all subsets of n elements.", "That's all subsets of the k elements (if you enumerate naively).", "Correct — each bit can be in, out, or in the submask; the (sub-1)&mask trick gives 3^k.", "No factorial involved."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "hash-tables",
    title: "Hash Tables",
    difficulty: "medium",
    definition: "A hash table (hash map / dictionary) stores key-value pairs and provides average O(1) lookup, insert, and delete by mapping each key to a bucket via a hash function. It's the most-used data structure for 'I need to find/count things fast' — frequency counting, memoization, deduplication, two-sum, caching.",
    coreUnderstanding: "The hash function turns an arbitrary key into an array index. If two keys hash to the same index (collision), they're stored in the same bucket — typically a linked list (chaining) or by probing nearby slots (open addressing). With a good hash function and load factor (n/buckets < ~0.75), collisions are rare and operations are O(1) average. Worst case (all keys collide, or adversarial input) degrades to O(n) — a hash table is only as good as its hash function. Resizing (rehashing into a bigger array when the load factor is high) keeps the average O(1) but is an occasional O(n) cost.",
    howItWorks: "1. HASH FUNCTION: h(key) → index in [0, bucket_count). Must be deterministic, fast, and uniform (spread keys evenly). For strings, a polynomial hash (each char contributes to a running sum mod a prime) is common.\n2. COLLISION RESOLUTION:\n   • Chaining: each bucket is a linked list (or tree). On collision, append to the list. Lookup walks the list. Worst case O(n) if all collide.\n   • Open addressing: on collision, probe the next slot (linear, quadratic, or double hashing) until an empty one is found. Better cache, but sensitive to clustering and load factor.\n3. LOAD FACTOR: n / bucket_count. Keep it < 0.75 (chaining) or < 0.7 (open addressing). When exceeded, resize (double the array) and rehash all keys — O(n) but amortized O(1).\n4. OPERATIONS: insert = hash, find bucket, add. Lookup = hash, find bucket, search. Delete = hash, find bucket, remove.\n\nWHEN TO USE: frequency counting, two-sum (store complements), memoization (cache results by input), deduplication, graph adjacency lists.",
    codeExamples: [
      {
        lang: "python",
        code: "from collections import defaultdict\n\n# Frequency counting — the #1 hash table use case\ndef char_freq(s):\n    freq = defaultdict(int)\n    for ch in s:\n        freq[ch] += 1       # O(1) average per insert\n    return dict(freq)\n\nprint(char_freq('abracadabra'))\n# {'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}",
        output: "{'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}",
        note: "defaultdict(int) auto-initializes missing keys to 0 — no need for 'if key not in dict' checks."
      },
      {
        lang: "python",
        code: "# Two-sum using a hash table — O(n) instead of O(n^2)\ndef two_sum(arr, target):\n    seen = {}  # value -> index\n    for i, x in enumerate(arr):\n        complement = target - x\n        if complement in seen:        # O(1) average lookup\n            return [seen[complement], i]\n        seen[x] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))",
        output: "[0, 1]",
        note: "Store each value's index; on each new element, check if its complement is already in the map. One pass, O(n)."
      }
    ],
    marginNotes: [
      "Average O(1), worst-case O(n) — a bad hash function or adversarial input can force all keys into one bucket.",
      "Python's dict is a hash table with open addressing (since 3.6, insertion-ordered). Java's HashMap uses chaining.",
      "Load factor > 0.75 triggers a resize (double the buckets, rehash all keys) — an amortized O(1) but occasional O(n) cost.",
      "Hash tables are unordered — if you need sorted iteration, use a tree map (O(log n) per op) or sort the keys after."
    ],
    commonMistakes: [
      "Assuming O(1) is guaranteed — it's AVERAGE. Worst case (all collisions) is O(n). Know your hash function.",
      "Modifying a dict while iterating it — adding/removing keys during iteration causes RuntimeError or skips. Iterate a copy of keys.",
      "Using mutable objects (lists) as keys — they're unhashable because their hash changes on mutation. Use tuples or frozensets.",
      "Forgetting that hash tables are unordered — don't rely on iteration order for logic (Python dicts preserve insertion order, but that's an implementation detail)."
    ],
    relatedTopics: ["Two Pointers", "Sliding Window", "Anagram Detection", "Memoization"],
    externalLinks: [
      { label: "Hash Table (Wikipedia)", url: "https://en.wikipedia.org/wiki/Hash_table" },
      { label: "Python dict (CPython Implementation)", url: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries" }
    ],
    mcqs: [
      {
        question: "What is the average-case time complexity of hash table lookup?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        answer: 2,
        explanations: ["That's the worst case (all collide).", "That's a tree map.", "Correct — hash to a bucket, search the (short) chain.", "No sorting involved."],
        difficulty: "easy"
      },
      {
        question: "What causes a hash table to degrade to O(n) per operation?",
        options: ["Too many keys", "All keys hashing to the same bucket (bad hash or adversarial input)", "Using string keys", "A high load factor only"],
        answer: 1,
        explanations: ["Many keys with a good hash is still O(1).", "Correct — one bucket has a chain of length n; lookup walks the whole chain.", "Strings hash fine.", "High load factor increases collisions but doesn't force O(n) alone."],
        difficulty: "medium"
      },
      {
        question: "Why can't you use a list as a dictionary key in Python?",
        options: ["Lists are too large", "Lists are mutable — their hash would change on mutation, breaking the table", "Lists can't be compared", "Lists don't support __hash__ by design"],
        answer: 1,
        explanations: ["Size is irrelevant.", "Correct — mutable objects are unhashable because mutation would invalidate their bucket position.", "Lists can be compared with ==.", "The reason is mutability, not an arbitrary design choice."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "hashing-techniques",
    title: "Hashing Techniques",
    difficulty: "medium",
    definition: "Hashing maps data of arbitrary size to a fixed-size value (a hash) using a hash function. Good hash functions are deterministic, fast, uniform (spread inputs evenly), and avalanche (small input change → large hash change). Beyond hash tables, hashing powers content addressing, checksums, password storage, and rolling hashes in string algorithms.",
    coreUnderstanding: "A hash function is a one-way compression: it maps a large space (all possible strings) to a small space (2³² or 2¹²⁸ values). Collisions are inevitable (pigeonhole principle), but a good hash makes them random and rare. The properties that matter: determinism (same input → same hash), uniformity (even distribution across buckets), and avalanche (changing one bit of input changes ~50% of output bits). Cryptographic hashes (SHA-256) add one-wayness (infeasible to invert) and collision resistance (infeasible to find two inputs with the same hash).",
    howItWorks: "COMMON HASH FUNCTIONS:\n1. DIVISION METHOD: h(key) = key % p, where p is a prime near the table size. Simple, fast, but sensitive to p.\n2. MULTIPLICATION METHOD: h(key) = (A · key) % 1, then take the high bits. A is an irrational constant (Knuth suggests (√5-1)/2). Less sensitive to table size.\n3. POLYNOMIAL ROLLING HASH (for strings): h = (s[0]·B^(m-1) + s[1]·B^(m-2) + ... + s[m-1]) mod M. B = base (e.g., 256), M = large prime. This is the Rabin-Karp rolling hash — O(1) update when the window slides.\n4. FNV / MurmurHash: fast non-cryptographic hashes for hash tables. Good distribution, fast.\n5. SHA-256 / MD5: cryptographic hashes. Slow, but one-way and collision-resistant. For passwords, use bcrypt/argon2 (salted, slow on purpose).\n\nUNIVERSAL HASHING: pick a random hash function from a family at runtime. Guarantees expected O(1) regardless of input — defends against adversarial collisions.",
    codeExamples: [
      {
        lang: "python",
        code: "# Polynomial rolling hash (Rabin-Karp style)\ndef rolling_hash(s, base=256, mod=10**9 + 7):\n    h = 0\n    for ch in s:\n        h = (h * base + ord(ch)) % mod\n    return h\n\nprint(rolling_hash('hello'))  # deterministic\nprint(rolling_hash('hello') == rolling_hash('hello'))  # True",
        output: "<some number>\nTrue",
        note: "The same string always hashes to the same value. Different strings almost always differ (collisions are rare with a large prime)."
      },
      {
        lang: "python",
        code: "# Universal hashing — pick a random function from a family\nimport random\n\nclass UniversalHash:\n    def __init__(self, p, m):\n        self.a = random.randint(1, p - 1)  # random in [1, p-1]\n        self.b = random.randint(0, p - 1)  # random in [0, p-1]\n        self.p = p  # large prime\n        self.m = m  # table size\n\n    def __call__(self, key):\n        return ((self.a * key + self.b) % self.p) % self.m\n\nh = UniversalHash(p=10**9 + 7, m=100)\nprint(h(42))  # random but deterministic for this instance",
        output: "<random value in [0, 100)>",
        note: "Random a, b chosen at startup — adversary can't predict the function, so can't craft colliding inputs."
      }
    ],
    marginNotes: [
      "Avalanche: a good hash changes ~50% of output bits when one input bit flips. Poor avalanche → clustering → collisions.",
      "Cryptographic hashes (SHA-256) are NOT for hash tables — they're slow. Use fast non-crypto hashes (MurmurHash, FNV).",
      "Universal hashing (random function from a family) gives expected O(1) against ANY input — the defense against hash-flooding attacks.",
      "Rolling hash (Rabin-Karp) updates in O(1) when the window slides — the key insight that makes it linear."
    ],
    commonMistakes: [
      "Using a non-prime modulus — patterns in the input (e.g., all multiples of 4) cluster into few buckets with a non-prime mod.",
      "Using a cryptographic hash (SHA-256) for a hash table — 10-100x slower than needed; use a fast non-crypto hash.",
      "Storing password hashes with a plain hash (MD5/SHA) — use bcrypt/argon2 with a salt; plain hashes are brute-forceable.",
      "Forgetting that hash collisions are inevitable (pigeonhole principle) — always handle them (chaining or open addressing)."
    ],
    relatedTopics: ["Hash Tables", "Rabin-Karp", "Bit Manipulation Basics", "Universal Hashing"],
    externalLinks: [
      { label: "Hash Function (Wikipedia)", url: "https://en.wikipedia.org/wiki/Hash_function" },
      { label: "Universal Hashing (Wikipedia)", url: "https://en.wikipedia.org/wiki/Universal_hashing" }
    ],
    mcqs: [
      {
        question: "What is the 'avalanche' property of a good hash function?",
        options: ["It's very fast", "A small input change causes a large, unpredictable output change", "It never collides", "It produces fixed-size output"],
        answer: 1,
        explanations: ["Speed is separate from avalanche.", "Correct — one bit flip should change ~50% of output bits, preventing clustering.", "Collisions are inevitable.", "That's a basic property, not avalanche."],
        difficulty: "medium"
      },
      {
        question: "Why use universal hashing (random function from a family)?",
        options: ["It's faster", "It defends against adversarial inputs that force collisions", "It avoids collisions entirely", "It uses less memory"],
        answer: 1,
        explanations: ["Same speed.", "Correct — the adversary can't predict the function, so can't craft colliding keys. Expected O(1) for any input.", "Collisions still exist but are random.", "Memory is the same."],
        difficulty: "hard"
      },
      {
        question: "Why shouldn't you use SHA-256 for a hash table?",
        options: ["It's not deterministic", "It's far too slow for O(1) table operations", "It has too many collisions", "It can't hash strings"],
        answer: 1,
        explanations: ["It is deterministic.", "Correct — crypto hashes are designed to be slow and complex; table hashes need to be fast.", "SHA-256 has negligible collisions.", "It can hash any data."],
        difficulty: "medium"
      }
    ]
  }
];