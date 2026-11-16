export default [
  {
    id: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    difficulty: "hard",
    definition: "Merge K sorted linked lists into one sorted list. Two approaches: a min-heap of the K front nodes (O(N log K)) or divide-and-conquer pairwise merging (O(N log K)). Both are optimal; the heap is simpler to code, divide-and-conquer uses O(1) extra space.",
    coreUnderstanding: "The naive approach — merge lists pairwise one at a time — is O(KN) in the worst case (each merge is O(N), K merges). The heap approach puts all K front nodes in a min-heap; extract the smallest, append it, push the next node from that list. Each of the N total nodes is pushed and popped once, each heap operation is O(log K), so O(N log K). Divide-and-conquer merges pairs of lists (like merge sort's merge), halving the number of lists each round — log K rounds, each O(N), total O(N log K) with O(1) extra space (in-place merging). The heap is easier to implement; divide-and-conquer is more space-efficient.",
    howItWorks: "MIN-HEAP APPROACH (O(N log K)):\n1. Push the head of each non-empty list into a min-heap (keyed by node value).\n2. Create a dummy head. tail = dummy.\n3. While heap: pop the smallest node, append to tail, advance tail. If the popped node has a next, push it.\n4. Return dummy.next.\n• Each node is pushed and popped once: O(N log K).\n\nDIVIDE-AND-CONQUER (O(N log K), O(1) space):\n1. Pair up the K lists: merge list[0] with list[1], list[2] with list[3], etc. → K/2 lists.\n2. Repeat: now K/2 lists, pair and merge → K/4.\n3. After log K rounds, one list remains.\n• Each round merges all N nodes total; log K rounds → O(N log K). O(1) extra space (in-place merge).",
    codeExamples: [
      {
        lang: "python",
        code: "import heapq\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val; self.next = next\n\n# Merge K sorted lists with a min-heap — O(N log K)\ndef merge_k_lists(lists):\n    heap = []\n    for i, node in enumerate(lists):\n        if node:\n            heapq.heappush(heap, (node.val, i, node))  # (val, index, node)\n    dummy = ListNode(); tail = dummy\n    while heap:\n        val, i, node = heapq.heappop(heap)\n        tail.next = node; tail = node\n        if node.next:\n            heapq.heappush(heap, (node.next.val, i, node.next))\n    return dummy.next\n\n# 1->4->5, 1->3->4, 2->6 -> 1->1->2->3->4->4->5->6\nlists = [ListNode(1, ListNode(4, ListNode(5))),\n         ListNode(1, ListNode(3, ListNode(4))),\n         ListNode(2, ListNode(6))]\nresult = merge_k_lists(lists)\nwhile result: print(result.val, end=' '); result = result.next",
        output: "1 1 2 3 4 4 5 6",
        note: "The heap holds the K front nodes. Extract the smallest, push its successor. O(N log K) — each node enters and leaves the heap once."
      }
    ],
    marginNotes: [
      "O(N log K), not O(N log N) — the heap has only K elements (one per list), not N.",
      "Divide-and-conquer uses O(1) extra space (in-place pairwise merge) vs the heap's O(K) — better for memory-constrained environments.",
      "The tuple (val, i, node) prevents comparison of ListNode objects when vals tie — Python can't compare arbitrary objects.",
      "A dummy head simplifies the code — no special case for the first node. tail always has a predecessor."
    ],
    commonMistakes: [
      "Pushing all N nodes into the heap at once — that's O(N log N) and wastes memory. Push only the K front nodes.",
      "Not handling the tie-breaking when values are equal — Python's heap compares the next tuple element (the node), which fails. Use an index.",
      "Forgetting to push the successor after popping — the list runs dry after the first node.",
      "Using O(KN) pairwise merging (merge list 1+2, then +3, then +4...) — the first list is merged K times. Divide-and-conquer avoids this."
    ],
    relatedTopics: ["Linked List Fundamentals", "Heaps & Priority Queue", "Merge Sort", "Divide and Conquer"],
    externalLinks: [
      { label: "Merge K Sorted Lists (LeetCode 23)", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { label: "Heap (Python heapq)", url: "https://docs.python.org/3/library/heapq.html" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of merging K sorted lists with a min-heap (N total nodes)?",
        options: ["O(N log N)", "O(N log K)", "O(KN)", "O(NK log N)"],
        answer: 1,
        explanations: ["The heap has K elements, not N.", "Correct — each of N nodes is pushed/popped once, each op O(log K).", "That's the naive pairwise approach.", "No such complexity."],
        difficulty: "hard"
      },
      {
        question: "Why include an index in the heap tuple (val, i, node)?",
        options: ["To sort by index", "To prevent comparing ListNode objects when vals tie (Python can't compare arbitrary objects)", "To track the list", "To speed up the heap"],
        answer: 1,
        explanations: ["Index isn't the sort key.", "Correct — on a val tie, Python compares the next element; nodes aren't comparable, so the index breaks the tie.", "Tracking is a side effect, not the reason.", "No speed difference."],
        difficulty: "medium"
      },
      {
        question: "What is the space complexity of the divide-and-conquer approach?",
        options: ["O(K)", "O(1) — in-place pairwise merging", "O(N)", "O(log K)"],
        answer: 1,
        explanations: ["That's the heap approach.", "Correct — merge pairs in place; only recursion/log K rounds, no heap.", "No extra array needed.", "Only the recursion depth, which is O(1) for iterative pairing."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "linked-list-reverse-k",
    title: "Reverse Nodes in K-Group",
    difficulty: "hard",
    definition: "Reverse a linked list in groups of K: reverse the first K nodes, then the next K, and so on. If the remaining nodes are fewer than K, leave them as-is. It combines list reversal with group processing — a classic hard problem that tests pointer manipulation.",
    coreUnderstanding: "The problem decomposes into: (1) check if there are at least K nodes remaining, (2) reverse those K nodes, (3) connect the reversed group to the previous group, (4) recurse/iterate on the rest. The key insight: after reversing a group of K, the original head becomes the tail of the reversed group, and its next should point to the result of reversing the next group. A dummy head before the real head simplifies connecting the first reversed group. The 'check K nodes' step prevents reversing a partial final group.",
    howItWorks: "1. DUMMY HEAD: dummy.next = head. prev_group = dummy.\n2. LOOP:\n   a. Find the K-th node from prev_group (walk K steps). If fewer than K remain, stop.\n   b. Save: group_start = prev_group.next, next_group = kth.next.\n   c. Reverse the segment [group_start, kth] (standard reverse, then fix the tail's next to next_group).\n   d. Connect: prev_group.next = kth (new head of reversed group), group_start.next = next_group (group_start is now the tail).\n   e. Advance: prev_group = group_start (the tail of the just-reversed group is the prev for the next).\n3. Return dummy.next.\n\nREVERSE HELPER (standard): prev=None, cur=head; while cur: save next, cur.next=prev, advance. Returns new head.",
    codeExamples: [
      {
        lang: "python",
        code: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val; self.next = next\n\ndef reverse_k_group(head, k):\n    dummy = ListNode(0, head)\n    prev_group = dummy\n    while True:\n        # Check if K nodes remain\n        kth = prev_group\n        for _ in range(k):\n            kth = kth.next\n            if not kth: return dummy.next  # fewer than K, done\n        group_start = prev_group.next\n        next_group = kth.next\n        # Reverse [group_start, kth]\n        prev, cur = next_group, group_start\n        while cur != next_group:\n            nxt = cur.next; cur.next = prev; prev = cur; cur = nxt\n        # Connect\n        prev_group.next = kth       # new head of reversed group\n        group_start.next = next_group  # group_start is now the tail\n        prev_group = group_start\n    return dummy.next\n\n# 1->2->3->4->5, k=2 -> 2->1->4->3->5\nhead = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))\nresult = reverse_k_group(head, 2)\nwhile result: print(result.val, end=' '); result = result.next",
        output: "2 1 4 3 5",
        note: "Reverse each full group of K; leave the last partial group (5) as-is. prev_group connects reversed groups."
      }
    ],
    marginNotes: [
      "Always check if K nodes remain BEFORE reversing — a partial final group stays as-is (don't reverse it).",
      "After reversing, group_start (the old head) becomes the tail — its next must point to next_group, and prev_group.next points to kth (new head).",
      "A dummy head removes the special case for the first group — prev_group starts at dummy, not the real head.",
      "The reverse helper reverses [group_start, kth] by iterating until cur == next_group (the boundary), not until None."
    ],
    commonMistakes: [
      "Reversing the partial final group (fewer than K nodes) — the problem says to leave it as-is. Always count first.",
      "Not connecting prev_group.next to the new head (kth) — the previous group dangles, losing the list.",
      "Setting group_start.next = None instead of next_group — severs the connection to the rest of the list.",
      "Not advancing prev_group to group_start (the new tail) — the next reversal overwrites the wrong connection."
    ],
    relatedTopics: ["Linked List Fundamentals", "Recursion Fundamentals", "Two Pointers", "List Reversal"],
    externalLinks: [
      { label: "Reverse Nodes in K-Group (LeetCode 25)", url: "https://leetcode.com/problems/reverse-nodes-in-k-group/" }
    ],
    mcqs: [
      {
        question: "What should happen to a final group with fewer than K nodes?",
        options: ["Reverse it anyway", "Leave it as-is (don't reverse)", "Remove it", "Pad it to K nodes"],
        answer: 1,
        explanations: ["The problem says to leave partial groups.", "Correct — only full groups of K are reversed.", "Don't remove nodes.", "No padding."],
        difficulty: "medium"
      },
      {
        question: "After reversing a group, what does group_start (the old head) become?",
        options: ["The new head", "The tail of the reversed group — its next must point to next_group", "Removed", "The middle node"],
        answer: 1,
        explanations: ["The new head is kth (the old tail).", "Correct — reversing swaps head and tail; group_start is now the tail.", "It's still in the list.", "It's at the end, not the middle."],
        difficulty: "hard"
      },
      {
        question: "Why use a dummy head?",
        options: ["To speed up reversal", "To remove the special case for connecting the first reversed group (no real predecessor)", "To detect cycles", "To count nodes"],
        answer: 1,
        explanations: ["No speed change.", "Correct — prev_group starts at dummy, so the first group is connected like any other.", "No cycle detection.", "Counting is separate."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "copy-random-pointer",
    title: "Copy List with Random Pointer",
    difficulty: "hard",
    definition: "Deep-copy a linked list where each node has a next pointer AND a random pointer (to any node or null). The challenge: the random pointers create dependencies that make a simple traversal copy insufficient. Two approaches: a hash map (O(n) space) or interleaving (O(1) space).",
    coreUnderstanding: "A naive copy fails because random pointers can point forward — you can't copy a random pointer until the target node exists. The hash map approach: first pass, create all new nodes and map old→new. Second pass, set next and random by looking up the mapped new nodes. O(n) time, O(n) space. The interleaving approach: insert each new node right after its original (A→A'→B→B'→...), so the new node is always at old.next. Then set new.random = old.random.next (the copy of the random target). Finally, separate the interleaved list into two. O(n) time, O(1) space — no hash map needed.",
    howItWorks: "HASH MAP APPROACH (O(n) space):\n1. First pass: for each old node, create a new node, store map[old] = new.\n2. Second pass: for each old node, set map[old].next = map[old.next], map[old].random = map[old.random].\n\nINTERLEAVING APPROACH (O(1) space):\n1. INSERT: for each old node, create new node, insert after it: A→A'→B→B'→C→C'.\n2. SET RANDOM: for each old node, old.next.random = old.random.next (the copy of the random target). Handle null.\n3. SEPARATE: unlink the interleaved list into old (A→B→C) and new (A'→B'→C').\n• O(n) time, O(1) extra space — the interleaving replaces the hash map.",
    codeExamples: [
      {
        lang: "python",
        code: "class Node:\n    def __init__(self, val, next=None, random=None):\n        self.val = val; self.next = next; self.random = random\n\n# Interleaving approach — O(n) time, O(1) space\ndef copy_random_list(head):\n    if not head: return None\n    # 1. Insert copies: A -> A' -> B -> B'\n    cur = head\n    while cur:\n        copy = Node(cur.val, cur.next)\n        cur.next = copy\n        cur = copy.next\n    # 2. Set random pointers\n    cur = head\n    while cur:\n        if cur.random:\n            cur.next.random = cur.random.next  # copy of the random target\n        cur = cur.next.next  # skip the copy\n    # 3. Separate the two lists\n    dummy = Node(0); tail = dummy; cur = head\n    while cur:\n        tail.next = cur.next      # extract the copy\n        tail = tail.next\n        cur.next = cur.next.next   # restore old list\n        cur = cur.next\n    return dummy.next",
        output: "Deep copy with random pointers intact",
        note: "Interleave copies after originals, so the copy of any random target is at old.random.next. O(1) space, no hash map."
      }
    ],
    marginNotes: [
      "The interleaving trick: A→A'→B→B' makes the copy of any node X available at X.next — no hash map needed.",
      "old.next.random = old.random.next — the copy's random is the copy of the original's random (which is at old.random.next).",
      "Handle null random pointers — old.random can be None; skip the assignment in that case.",
      "The hash map approach is simpler to reason about; interleaving is the O(1) space optimization for interviews."
    ],
    commonMistakes: [
      "Trying to copy in one pass — random pointers can point forward, so the target may not exist yet. Two passes (or interleaving) are needed.",
      "Not restoring the original list after interleaving — the separation step must unlink old and new.",
      "Forgetting to handle null random pointers in the interleaving approach — old.random.next crashes if old.random is None.",
      "Using the same node object for old and new — a deep copy needs distinct objects; sharing corrupts both lists."
    ],
    relatedTopics: ["Linked List Fundamentals", "Hash Tables", "Deep Copy", "Pointer Manipulation"],
    externalLinks: [
      { label: "Copy List with Random Pointer (LeetCode 138)", url: "https://leetcode.com/problems/copy-list-with-random-pointer/" }
    ],
    mcqs: [
      {
        question: "Why can't you copy the list in a single pass?",
        options: ["It's too slow", "Random pointers can point forward — the target node may not exist yet when you need to copy the pointer", "Random pointers are null", "You need a hash map"],
        answer: 1,
        explanations: ["One pass is possible with interleaving, but not naive.", "Correct — forward random pointers reference nodes not yet copied. Two passes or interleaving solves this.", "They can be non-null.", "A hash map is one solution, not the only one."],
        difficulty: "hard"
      },
      {
        question: "What is the space complexity of the interleaving approach?",
        options: ["O(n)", "O(1) — no hash map, copies are interleaved in place", "O(log n)", "O(n²)"],
        answer: 1,
        explanations: ["That's the hash map approach.", "Correct — the interleaved structure replaces the map; no extra data structure.", "No binary search.", "No quadratic space."],
        difficulty: "hard"
      },
      {
        question: "In the interleaving approach, where is the copy of node X's random target?",
        options: ["In a hash map", "At X.random.next (the copy is interleaved right after the original)", "At X.next.random", "It doesn't exist"],
        answer: 1,
        explanations: ["No hash map in this approach.", "Correct — interleaving puts each copy at old.next, so the copy of X.random is at X.random.next.", "That's the copy's random, not the random's copy.", "It exists — we created all copies in step 1."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "serialize-deserialize-tree",
    title: "Serialize & Deserialize Binary Tree",
    difficulty: "hard",
    definition: "Serialization converts a tree to a string (for storage/transmission); deserialization rebuilds it. The challenge: the tree structure (including null children) must be fully recoverable. Pre-order traversal with null markers is the standard approach — each null child is recorded as a sentinel (e.g., 'X' or '#').",
    coreUnderstanding: "A pre-order traversal alone isn't enough to reconstruct a tree — you lose the structure (which children are null). The fix: record null children as a sentinel. Pre-order with null markers: 'visit root, recurse left, recurse right', but output 'X' for null. This encodes the full structure because the traversal order + null markers let you reconstruct exactly where each subtree ends. Deserialization reads the tokens in order: a null marker means 'no node here'; a value means 'create a node, then recursively build left and right.' The key: the token stream is consumed in pre-order, so the recursive deserializer reads tokens sequentially.",
    howItWorks: "SERIALIZE (pre-order with null markers):\n1. If node is null: append 'X' (or '#') to the stream.\n2. Else: append str(node.val), then serialize left, then serialize right.\n3. Join with a delimiter (e.g., comma).\n\nDESERIALIZE (consume tokens in pre-order):\n1. Split the string into tokens. Use an iterator (or index pointer).\n2. Read the next token. If 'X': return null.\n3. Else: create a node with the value. Recursively build left, then right.\n4. The recursive calls consume tokens in the exact order serialize produced them.\n\nWHY PRE-ORDER: the root comes first, so you can create the node immediately, then recursively build subtrees. In-order or post-order don't give you the root first, making reconstruction harder (you'd need additional info).",
    codeExamples: [
      {
        lang: "python",
        code: "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\n# Serialize: pre-order with null markers\ndef serialize(root):\n    if not root: return 'X'\n    return f'{root.val},{serialize(root.left)},{serialize(root.right)}'\n\n# Deserialize: consume tokens in pre-order\ndef deserialize(data):\n    tokens = iter(data.split(','))\n    def build():\n        val = next(tokens)\n        if val == 'X': return None\n        node = TreeNode(int(val))\n        node.left = build()\n        node.right = build()\n        return node\n    return build()\n\n#     1\n#    / \\\n#   2   3\n#      /\n#     4\nroot = TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))\ns = serialize(root)\nprint(s)  # 1,2,X,X,3,4,X,X,X\nrestored = deserialize(s)\nprint(serialize(restored) == s)  # True",
        output: "1,2,X,X,3,4,X,X,X\nTrue",
        note: "Pre-order with 'X' for nulls encodes the full structure. Deserialize consumes tokens in the same order — root, then left subtree, then right."
      }
    ],
    marginNotes: [
      "Pre-order with null markers is the standard — the root comes first, so you can build the node then recurse on subtrees.",
      "Use an iterator (or a mutable index) for deserialization — the recursive calls consume tokens sequentially, sharing the same position.",
      "The delimiter (comma) and null marker ('X') must not collide with node values. Use a unique sentinel.",
      "Level-order (BFS) serialization also works — enqueue null children as markers. Useful for complete trees, but pre-order is more common."
    ],
    commonMistakes: [
      "Serializing without null markers — the structure is lost; deserialization can't distinguish a leaf from a node with one child.",
      "Not sharing the token iterator across recursive calls — each call must read the NEXT token, not restart. Use a shared iterator or index.",
      "Using a delimiter that appears in node values (e.g., if values are strings) — choose a safe delimiter or escape.",
      "Confusing pre-order and in-order for deserialization — the recursive builder assumes pre-order (root first). In-order needs a different approach."
    ],
    relatedTopics: ["Tree Traversals", "Binary Tree Fundamentals", "Recursion Fundamentals", "Pre-order Traversal"],
    externalLinks: [
      { label: "Serialize & Deserialize Binary Tree (LeetCode 297)", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" }
    ],
    mcqs: [
      {
        question: "Why are null markers ('X') necessary in serialization?",
        options: ["To save space", "To encode the tree structure — without them, you can't distinguish a leaf from a node with one child", "To sort the values", "To handle negative numbers"],
        answer: 1,
        explanations: ["Markers add space.", "Correct — a node with only a left child and a node with only a right child serialize identically without null markers.", "No sorting.", "Negatives are unrelated."],
        difficulty: "hard"
      },
      {
        question: "Which traversal order is used for standard tree serialization?",
        options: ["In-order", "Pre-order (root first, so you can build the node then recurse on subtrees)", "Post-order", "Level-order only"],
        answer: 1,
        explanations: ["In-order doesn't give the root first.", "Correct — root first lets the deserializer create the node, then recursively build left and right.", "Root is last — harder to reconstruct.", "Level-order works but pre-order is more common."],
        difficulty: "medium"
      },
      {
        question: "How does the deserializer consume the token stream?",
        options: ["Randomly", "Sequentially, shared across recursive calls (iterator or index)", "In reverse", "Sorted order"],
        answer: 1,
        explanations: ["Order matters.", "Correct — each recursive call reads the next token; a shared iterator advances the position.", "Reverse would break the pre-order structure.", "Sorting destroys the structure."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "bst-iterator",
    title: "BST Iterator",
    difficulty: "hard",
    definition: "A BST iterator provides next() and hasNext() for in-order traversal of a BST, one element at a time, without pre-flattening the whole tree. The challenge: O(1) amortized next() with O(h) space (h = height), not O(n). It uses a stack to simulate the left-spine of the recursion.",
    coreUnderstanding: "In-order traversal visits left, root, right. The naive approach — flatten the BST into an array at construction — uses O(n) space and O(n) construction time. The optimized iterator uses a stack holding the 'left spine' (the current node and all its left ancestors). next() pops the top, then pushes the left spine of its right child. The stack never exceeds h elements (the height), so O(h) space. Each node is pushed and popped exactly once across all next() calls, so the amortized cost per next() is O(1) even though a single next() can be O(h) (when it pushes a new left spine).",
    howItWorks: "CONSTRUCTION: push the left spine of the root onto the stack (root, root.left, root.left.left, ... until null).\n\nHASNEXT(): return stack is non-empty.\n\nNEXT():\n1. Pop the top node (the current in-order element).\n2. If it has a right child, push the left spine of the right child (right, right.left, right.left.left, ...).\n3. Return the popped node's value.\n\nWHY O(h) SPACE: the stack holds at most one left spine at a time, which is at most h nodes.\nWHY O(1) AMORTIZED: each node is pushed once and popped once. A next() that pushes a left spine of length k is 'expensive', but those k nodes are then popped one per next() — the cost averages out.",
    codeExamples: [
      {
        lang: "python",
        code: "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\nclass BSTIterator:\n    def __init__(self, root):\n        self.stack = []\n        self._push_left(root)\n\n    def _push_left(self, node):\n        while node:\n            self.stack.append(node)\n            node = node.left\n\n    def next(self):\n        node = self.stack.pop()       # current in-order element\n        if node.right:\n            self._push_left(node.right)  # left spine of right subtree\n        return node.val\n\n    def hasNext(self):\n        return len(self.stack) > 0\n\n#     7\n#    / \\\n#   3   15\n#      /  \\\n#     9   20\nroot = TreeNode(7, TreeNode(3), TreeNode(15, TreeNode(9), TreeNode(20)))\nit = BSTIterator(root)\nwhile it.hasNext():\n    print(it.next(), end=' ')",
        output: "3 7 9 15 20",
        note: "Stack holds the left spine. next() pops, then pushes the left spine of the right child. O(h) space, O(1) amortized next."
      }
    ],
    marginNotes: [
      "O(h) space, not O(n) — the stack holds only the current left spine, not the whole tree.",
      "O(1) amortized next() — each node is pushed and popped exactly once across all calls, despite single calls being O(h).",
      "The _push_left helper walks the left spine (node, node.left, ...) — this is the 'go left as far as possible' step of iterative in-order.",
      "Flattening to an array at construction is O(n) space — the stack approach is the memory-efficient alternative for large trees."
    ],
    commonMistakes: [
      "Flattening the entire BST into an array at construction — O(n) space. The stack approach uses O(h).",
      "Not pushing the left spine of the right child after popping — the right subtree's in-order is skipped.",
      "Claiming O(1) worst-case next() — it's O(1) amortized; a single next() can be O(h) when it pushes a new left spine.",
      "Confusing the stack with a queue — the stack (LIFO) is what gives in-order (leftmost first)."
    ],
    relatedTopics: ["BST", "Tree Traversals", "Stack", "In-order Traversal"],
    externalLinks: [
      { label: "BST Iterator (LeetCode 173)", url: "https://leetcode.com/problems/binary-search-tree-iterator/" }
    ],
    mcqs: [
      {
        question: "What is the space complexity of the stack-based BST iterator?",
        options: ["O(n)", "O(h) where h is the tree height", "O(1)", "O(log n) always"],
        answer: 1,
        explanations: ["That's the flatten-to-array approach.", "Correct — the stack holds only the current left spine, at most h nodes.", "The stack itself is the space.", "O(log n) only if balanced; O(h) in general."],
        difficulty: "hard"
      },
      {
        question: "What is the amortized time complexity of next()?",
        options: ["O(h)", "O(1) — each node is pushed and popped once across all calls", "O(log n)", "O(n)"],
        answer: 1,
        explanations: ["That's the worst case for a single call.", "Correct — total work across n calls is O(n) (each node pushed/popped once), so O(1) amortized.", "Same as O(h) for balanced trees.", "Too high."],
        difficulty: "hard"
      },
      {
        question: "After popping a node in next(), what must you do?",
        options: ["Nothing", "Push the left spine of the popped node's right child (to continue in-order)", "Pop the next node immediately", "Push the parent"],
        answer: 1,
        explanations: ["You'd skip the right subtree.", "Correct — in-order is left-root-right; after root, process the right subtree's left spine.", "That's the next call's job.", "The parent isn't on the stack."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "construct-tree-from-traversals",
    title: "Construct Tree from Traversals",
    difficulty: "hard",
    definition: "Reconstruct a binary tree from its traversal sequences. Pre-order + in-order uniquely determine a tree (pre-order gives the root first; in-order splits left/right subtrees). Post-order + in-order also work. Pre-order + post-order do NOT uniquely determine a tree (unless it's a full binary tree).",
    coreUnderstanding: "Pre-order visits root, left, right — so the first element is the root. In-order visits left, root, right — so the root splits the array into left subtree (elements before root) and right subtree (elements after). The algorithm: take the root from pre-order, find it in in-order to determine the split, then recursively build the left and right subtrees from the corresponding sub-arrays. A hash map from value to in-order index makes the 'find root in in-order' step O(1) instead of O(n). The recursion builds the tree top-down, each level identifying one root and splitting the ranges.",
    howItWorks: "FROM PRE-ORDER + IN-ORDER:\n1. Build a hash map: value → index in in-order (O(1) root lookup).\n2. Recursive build(pre_start, in_start, size):\n   a. Root = pre_order[pre_start] (first element of the current pre-order range).\n   b. Find root's index in in-order → in_root. Left subtree size = in_root - in_start.\n   c. node.left = build(pre_start + 1, in_start, left_size).\n   d. node.right = build(pre_start + 1 + left_size, in_root + 1, size - 1 - left_size).\n3. Base: size == 0 → return null.\n\nFROM POST-ORDER + IN-ORDER:\n• Same idea, but root is the LAST element of the post-order range. Build right subtree first (or left — order depends on how you split).\n\nPRE + POST: NOT unique for general binary trees. Only works for FULL binary trees (every node has 0 or 2 children).",
    codeExamples: [
      {
        lang: "python",
        code: "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\n\ndef build_tree(preorder, inorder):\n    idx_map = {v: i for i, v in enumerate(inorder)}  # O(1) root lookup\n    def build(pre_start, in_start, size):\n        if size == 0: return None\n        root_val = preorder[pre_start]\n        in_root = idx_map[root_val]\n        left_size = in_root - in_start\n        node = TreeNode(root_val)\n        node.left = build(pre_start + 1, in_start, left_size)\n        node.right = build(pre_start + 1 + left_size, in_root + 1, size - 1 - left_size)\n        return node\n    return build(0, 0, len(preorder))\n\n# pre: [3,9,20,15,7], in: [9,3,15,20,7]\n#       3\n#      / \\\n#     9  20\n#       /  \\\n#      15   7\nroot = build_tree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])\n# Verify with in-order\ndef inorder(n, res):\n    if n: inorder(n.left, res); res.append(n.val); inorder(n.right, res)\nres = []; inorder(root, res); print(res)",
        output: "[9, 3, 15, 20, 7]",
        note: "Pre-order's first element is the root; in-order splits left/right. The hash map makes root lookup O(1)."
      }
    ],
    marginNotes: [
      "Pre-order's first element is the root; in-order splits into left/right subtrees. This uniquely determines the tree.",
      "A hash map (value → in-order index) makes the root lookup O(1) instead of O(n) per level — essential for O(n) total.",
      "Pre + post do NOT uniquely determine a general binary tree — only full binary trees (0 or 2 children).",
      "The recursion passes RANGES (start + size), not sub-arrays — avoids O(n) slicing at each level, keeping it O(n)."
    ],
    commonMistakes: [
      "Slicing sub-arrays at each recursion level — O(n) per level, O(n²) total. Pass ranges (start + size) and use the hash map.",
      "Not building the hash map — scanning in-order for the root at each level is O(n) per level, O(n²) total.",
      "Assuming pre + post uniquely determine a tree — they don't for general binary trees (ambiguous when a node has one child).",
      "Getting the left/right size calculation wrong — left_size = in_root - in_start; right_size = size - 1 - left_size."
    ],
    relatedTopics: ["Tree Traversals", "Binary Tree Fundamentals", "Recursion Fundamentals", "Divide and Conquer"],
    externalLinks: [
      { label: "Construct from Pre+In (LeetCode 105)", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
      { label: "Construct from Post+In (LeetCode 106)", url: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/" }
    ],
    mcqs: [
      {
        question: "Which pair of traversals uniquely determines a binary tree?",
        options: ["Pre + Post", "Pre + In (or Post + In)", "In + Level", "Pre + Level"],
        answer: 1,
        explanations: ["Pre + Post is ambiguous for general trees.", "Correct — pre/post gives the root, in-order splits left/right.", "Not sufficient in general.", "Not sufficient in general."],
        difficulty: "hard"
      },
      {
        question: "Why use a hash map from value to in-order index?",
        options: ["To sort the values", "To find the root's position in in-order in O(1) instead of O(n) per level", "To detect duplicates", "To balance the tree"],
        answer: 1,
        explanations: ["No sorting.", "Correct — without it, scanning in-order for the root is O(n) per level, O(n²) total.", "Duplicates would break the map anyway.", "No balancing."],
        difficulty: "medium"
      },
      {
        question: "Why pass ranges (start + size) instead of sliced sub-arrays?",
        options: ["To save memory", "Slicing is O(n) per level — ranges keep the total O(n)", "To sort faster", "Ranges are required for correctness"],
        answer: 1,
        explanations: ["Memory is secondary.", "Correct — slicing creates new arrays (O(n) each); ranges reuse the original arrays with O(1) index math.", "No sorting.", "Slicing is correct but slow."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "self-balancing-trees",
    title: "Self-Balancing Trees (AVL & Red-Black)",
    difficulty: "hard",
    definition: "Self-balancing BSTs maintain O(log n) height by rebalancing on insert/delete. AVL trees enforce |balance factor| ≤ 1 (height difference of children), rotating when violated. Red-Black trees use color invariants (no two consecutive reds, equal black height) with rotations and color flips. Both guarantee O(log n) operations regardless of insertion order.",
    coreUnderstanding: "A naive BST can degenerate to O(n) height (sorted inserts create a chain). Self-balancing trees prevent this by maintaining a height invariant. AVL trees are strictly balanced: every node's balance factor (left height - right height) is in {-1, 0, 1}. On insert, if a node's balance factor becomes ±2, a rotation (single or double) restores balance. AVL trees are more rigidly balanced (height ≤ 1.44 log n), so lookups are fast but inserts/deletes do more rotations. Red-Black trees are more relaxed (height ≤ 2 log n), so fewer rotations but slightly slower lookups — the default in C++ std::map and Java TreeMap. The trade-off: AVL for read-heavy, Red-Black for write-heavy workloads.",
    howItWorks: "AVL ROTATIONS (4 cases, based on where the imbalance is):\n• LEFT-LEFT (right child's left subtree is taller): single RIGHT rotation at the imbalanced node.\n• RIGHT-RIGHT: single LEFT rotation.\n• LEFT-RIGHT: LEFT rotation on the left child, then RIGHT rotation on the node (double).\n• RIGHT-LEFT: RIGHT rotation on the right child, then LEFT rotation (double).\n• After insert/delete, walk up from the modified node, update heights, and rotate if |balance factor| > 1.\n\nRED-BLACK INVARIANTS:\n1. Every node is red or black; the root is black.\n2. No two consecutive red nodes (a red node's children are black).\n3. Every path from root to null has the same number of black nodes (black-height).\n• Insert: add red (doesn't violate black-height), then fix violations (recolor + rotate) up the tree.\n• Delete: more complex (double-black fixup).\n• Height ≤ 2 log(n+1) — less rigid than AVL but still O(log n).",
    codeExamples: [
      {
        lang: "python",
        code: "class AVLNode:\n    def __init__(self, val):\n        self.val = val; self.left = self.right = None; self.height = 1\n\ndef height(n): return n.height if n else 0\ndef balance_factor(n): return height(n.left) - height(n.right) if n else 0\n\ndef rotate_right(y):\n    x = y.left; T = x.right\n    x.right = y; y.left = T\n    y.height = 1 + max(height(y.left), height(y.right))\n    x.height = 1 + max(height(x.left), height(x.right))\n    return x  # new root of this subtree\n\ndef rotate_left(x):\n    y = x.right; T = y.left\n    y.left = x; x.right = T\n    x.height = 1 + max(height(x.left), height(x.right))\n    y.height = 1 + max(height(y.left), height(y.right))\n    return y\n\ndef insert(node, val):\n    if not node: return AVLNode(val)\n    if val < node.val: node.left = insert(node.left, val)\n    elif val > node.val: node.right = insert(node.right, val)\n    else: return node  # no duplicates\n    node.height = 1 + max(height(node.left), height(node.right))\n    bf = balance_factor(node)\n    # Left-Left\n    if bf > 1 and val < node.left.val: return rotate_right(node)\n    # Right-Right\n    if bf < -1 and val > node.right.val: return rotate_left(node)\n    # Left-Right\n    if bf > 1 and val > node.left.val:\n        node.left = rotate_left(node.left); return rotate_right(node)\n    # Right-Left\n    if bf < -1 and val < node.right.val:\n        node.right = rotate_right(node.right); return rotate_left(node)\n    return node\n\n# Insert sorted data — stays balanced (unlike naive BST)\nroot = None\nfor x in [1, 2, 3, 4, 5, 6, 7]: root = insert(root, x)\nprint('height:', height(root))  # 3, not 7 (balanced!)",
        output: "height: 3",
        note: "AVL keeps height O(log n) even for sorted inserts. 4 rotation cases based on where the imbalance is."
      }
    ],
    marginNotes: [
      "AVL: strict balance (|height diff| ≤ 1), more rotations, faster lookups. Red-Black: relaxed, fewer rotations, faster inserts.",
      "C++ std::map and Java TreeMap use Red-Black trees — the industry default for ordered maps.",
      "The 4 AVL cases: LL (right rotate), RR (left rotate), LR (left then right), RL (right then left). Identify by where the imbalance is.",
      "Red-Black insert: add red (preserves black-height), then recolor/rotate up. The invariants (no 2 reds, equal black-height) are maintained."
    ],
    commonMistakes: [
      "Forgetting to update heights after rotations — the height field drives the balance factor; stale heights cause wrong rotations.",
      "Mixing up the rotation cases — LL needs a right rotation, RR needs a left rotation. The direction is opposite to the imbalance.",
      "Not handling the double-rotation cases (LR, RL) — a single rotation doesn't fix these; you need two.",
      "Assuming Red-Black trees are as balanced as AVL — they're not (height ≤ 2 log n vs 1.44 log n), but they do fewer rotations."
    ],
    relatedTopics: ["BST", "Binary Tree Fundamentals", "Tree Traversals", "Rotations"],
    externalLinks: [
      { label: "AVL Tree (Wikipedia)", url: "https://en.wikipedia.org/wiki/AVL_tree" },
      { label: "Red-Black Tree (Wikipedia)", url: "https://en.wikipedia.org/wiki/Red%E2%80%93black_tree" }
    ],
    mcqs: [
      {
        question: "What balance condition does an AVL tree enforce?",
        options: ["Equal subtree sizes", "|height(left) - height(right)| ≤ 1 for every node", "All leaves at the same depth", "No red nodes"],
        answer: 1,
        explanations: ["Subtree sizes can differ.", "Correct — the balance factor is in {-1, 0, 1}; rotations restore it when violated.", "That's a perfect tree (too strict).", "That's a Red-Black rule."],
        difficulty: "hard"
      },
      {
        question: "Which rotation fixes a Left-Left imbalance in an AVL tree?",
        options: ["Left rotation", "Right rotation (single)", "Left then right (double)", "Right then left (double)"],
        answer: 1,
        explanations: ["That's for RR.", "Correct — the left subtree's left child is taller; a right rotation rebalances.", "That's for LR.", "That's for RL."],
        difficulty: "hard"
      },
      {
        question: "Why are Red-Black trees preferred over AVL for write-heavy workloads?",
        options: ["They're more balanced", "They do fewer rotations on insert/delete (relaxed invariants)", "They use less memory", "They're simpler to implement"],
        answer: 1,
        explanations: ["AVL is more balanced.", "Correct — Red-Black's relaxed invariants (height ≤ 2 log n) mean fewer rebalancing ops.", "Same memory.", "Red-Black is more complex."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "top-k-elements",
    title: "Top K Elements (Heap & Quickselect)",
    difficulty: "hard",
    definition: "Find the K largest/smallest/most-frequent elements. Two approaches: a heap of size K (O(N log K)) or quickselect (O(N) average). The heap is simpler and handles streaming; quickselect is faster for one-shot queries but modifies the array and is O(N²) worst case.",
    coreUnderstanding: "For 'K largest': maintain a min-heap of size K. For each element, if it's larger than the heap's min, replace the min. At the end, the heap holds the K largest. O(N log K) — each heap op is O(log K), and the heap never exceeds K. This is better than sorting (O(N log N)) when K << N. Quickselect partitions the array around a pivot (like quicksort's partition), recursing into the side containing the K-th element. Average O(N), worst O(N²) — but with random pivots, the worst case is astronomically unlikely. For 'most frequent K', use a counter + heap keyed by frequency. The heap approach is the go-to for interviews; quickselect is the O(N) optimization.",
    howItWorks: "HEAP (K largest elements):\n1. Min-heap of size K. Push first K elements.\n2. For each remaining element: if it > heap[0] (the min), pop the min and push the element.\n3. At the end, the heap contains the K largest. O(N log K).\n• For K smallest: use a max-heap (or negate values for Python's min-heap).\n\nQUICKSELECT (K-th largest):\n1. Partition the array around a random pivot: elements < pivot on the left, > on the right.\n2. If the pivot's index == K-th position, done.\n3. If K-th is in the left part, recurse left; else recurse right.\n4. Average O(N) (each partition halves the search space); worst O(N²) (bad pivots).\n\nMOST FREQUENT K:\n1. Count frequencies (Counter / hash map).\n2. Heap of size K keyed by frequency, or bucket sort by frequency (O(N) if frequencies are bounded).",
    codeExamples: [
      {
        lang: "python",
        code: "import heapq\n\n# K largest elements — min-heap of size K\ndef k_largest(arr, k):\n    heap = arr[:k]\n    heapq.heapify(heap)          # min-heap of size K\n    for x in arr[k:]:\n        if x > heap[0]:\n            heapq.heapreplace(heap, x)  # pop min, push x\n    return sorted(heap, reverse=True)\n\nprint(k_largest([3, 1, 4, 1, 5, 9, 2, 6], 3))  # [9, 6, 5]",
        output: "[9, 6, 5]",
        note: "Min-heap of size K: if a new element beats the min, replace. O(N log K) — better than O(N log N) sort when K << N."
      },
      {
        lang: "python",
        code: "import random\n\n# Quickselect — K-th smallest (average O(N))\ndef quickselect(arr, k):\n    arr = arr[:]\n    def partition(lo, hi):\n        pivot = arr[hi]\n        i = lo\n        for j in range(lo, hi):\n            if arr[j] <= pivot:\n                arr[i], arr[j] = arr[j], arr[i]; i += 1\n        arr[i], arr[hi] = arr[hi], arr[i]\n        return i\n    lo, hi = 0, len(arr) - 1\n    while lo < hi:\n        p = partition(lo, hi)\n        if p == k: return arr[p]\n        elif p < k: lo = p + 1\n        else: hi = p - 1\n    return arr[lo]\n\nprint(quickselect([3, 1, 4, 1, 5, 9, 2, 6], 0))  # 1st smallest = 1",
        output: "1",
        note: "Partition like quicksort, recurse into the side with the K-th. Average O(N); worst O(N²) with bad pivots (use random)."
      }
    ],
    marginNotes: [
      "Min-heap of size K for 'K largest' — the heap's min is the threshold; replace it when a bigger element arrives. O(N log K).",
      "Quickselect is average O(N) — like quicksort but you only recurse into one side. Worst O(N²); random pivots avoid it in practice.",
      "For 'most frequent K': count with a hash map, then heap by frequency. Or bucket sort if frequencies are bounded (O(N)).",
      "Heap is better for streaming (unknown N); quickselect is better for one-shot in-memory queries (O(N) average)."
    ],
    commonMistakes: [
      "Using a max-heap of all N elements for 'K largest' — that's O(N) space and O(N log N) time. Use a min-heap of size K.",
      "Not using random pivots in quickselect — deterministic pivots (e.g., last element) hit O(N²) on sorted input.",
      "Confusing 'K largest' (min-heap of size K) with 'K smallest' (max-heap of size K, or negate for Python's min-heap).",
      "Sorting the entire array for top-K — O(N log N) is worse than O(N log K) when K << N."
    ],
    relatedTopics: ["Heaps & Priority Queue", "Quick Sort", "Hash Tables", "Quickselect"],
    externalLinks: [
      { label: "Kth Largest Element (LeetCode 215)", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { label: "Top K Frequent Elements (LeetCode 347)", url: "https://leetcode.com/problems/top-k-frequent-elements/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of finding K largest elements with a size-K min-heap?",
        options: ["O(N log N)", "O(N log K)", "O(N)", "O(K log N)"],
        answer: 1,
        explanations: ["That's sorting all N.", "Correct — each of N elements may trigger an O(log K) heap op.", "That's quickselect (average).", "No such complexity."],
        difficulty: "medium"
      },
      {
        question: "What type of heap is used to find the K LARGEST elements?",
        options: ["Max-heap of size N", "Min-heap of size K (the min is the threshold to beat)", "Max-heap of size K", "Min-heap of size N"],
        answer: 1,
        explanations: ["That's O(N) space.", "Correct — the heap's min is the smallest of the K largest; replace it when a bigger element arrives.", "A max-heap of size K gives the K largest only after extraction — less direct.", "O(N) space."],
        difficulty: "hard"
      },
      {
        question: "What is the average-case time complexity of quickselect?",
        options: ["O(N log N)", "O(N)", "O(N²)", "O(log N)"],
        answer: 1,
        explanations: ["That's quicksort.", "Correct — like quicksort but you recurse into only one side, halving the work each step.", "That's the worst case (bad pivots).", "That's binary search."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum (Monotonic Deque)",
    difficulty: "hard",
    definition: "Find the maximum in each sliding window of size K as it moves across an array. A monotonic deque (decreasing) achieves O(N) — each element enters and leaves the deque at most once. The deque's front is always the current window's max.",
    coreUnderstanding: "The brute force — scan each window for the max — is O(N·K). The monotonic deque observes: when a new element arrives, any smaller element to its left can never be the max of a future window (the new, larger element outlives them). So we maintain a decreasing deque: on each new element, pop from the back while the back is smaller (they're useless), then push the new element. The front is the max. When the front falls out of the window (index < window start), pop it from the front. Each element is pushed and popped at most once → O(N) total despite the nested-looking while loop.",
    howItWorks: "MONOTONIC DEQUE (stores indices, values decreasing front-to-back):\n1. For each index i:\n   a. Remove stale front: while deque and deque[0] < i - K + 1 (out of window): popleft.\n   b. Maintain decreasing: while deque and arr[deque[-1]] < arr[i]: popright (smaller elements are useless).\n   c. Push i to the back.\n   d. If i >= K - 1 (window is full): result.append(arr[deque[0]]).\n2. The front is always the max of the current window.\n\nWHY O(N): each index is pushed once and popped at most once (from front or back). The while loops' total iterations across all i is ≤ 2N.\n\nSTORE INDICES, not values — you need the index to check if the front is still in the window.",
    codeExamples: [
      {
        lang: "python",
        code: "from collections import deque\n\ndef max_sliding_window(arr, k):\n    dq = deque()  # stores indices, values decreasing front to back\n    result = []\n    for i in range(len(arr)):\n        # Remove front if it's out of the window\n        if dq and dq[0] < i - k + 1:\n            dq.popleft()\n        # Pop smaller elements from the back (they can never be the max)\n        while dq and arr[dq[-1]] < arr[i]:\n            dq.pop()\n        dq.append(i)\n        # Window is full starting at i = k - 1\n        if i >= k - 1:\n            result.append(arr[dq[0]])  # front is the max\n    return result\n\nprint(max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3))\n# [3, 3, 5, 5, 6, 7]",
        output: "[3, 3, 5, 5, 6, 7]",
        note: "Decreasing deque: pop smaller back elements (useless), push new. Front is the max; pop it when it leaves the window. O(N)."
      }
    ],
    marginNotes: [
      "O(N), not O(N·K) — each element is pushed and popped at most once. The while loops total ≤ 2N iterations.",
      "Store INDICES, not values — you need the index to check if the front is still in the window (dq[0] < i - K + 1).",
      "Pop smaller elements from the back before pushing — they can never be the max of a future window (the new, larger one outlives them).",
      "The front is always the max — it's the largest element still in the window. Pop it only when it falls out of the window."
    ],
    commonMistakes: [
      "Storing values instead of indices — can't check if the front is still in the window without the index.",
      "Not popping smaller back elements — the deque grows unbounded and the front isn't guaranteed to be the max.",
      "Using a stack instead of a deque — you need O(1) removal from BOTH ends (front for stale, back for smaller).",
      "Forgetting to check i >= K - 1 before recording — the first K-1 indices don't have a full window yet."
    ],
    relatedTopics: ["Monotonic Stack", "Sliding Window", "Deque", "Queue"],
    externalLinks: [
      { label: "Sliding Window Maximum (LeetCode 239)", url: "https://leetcode.com/problems/sliding-window-maximum/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of sliding window maximum with a monotonic deque?",
        options: ["O(N·K)", "O(N)", "O(N log K)", "O(K)"],
        answer: 1,
        explanations: ["That's the brute force.", "Correct — each element is pushed and popped at most once; total deque ops ≤ 2N.", "No heap involved.", "Impossible — must scan all N elements."],
        difficulty: "hard"
      },
      {
        question: "Why store indices instead of values in the deque?",
        options: ["Indices are smaller", "You need the index to check if the front is still in the window (dq[0] < i - K + 1)", "Values can be negative", "Indices sort faster"],
        answer: 1,
        explanations: ["Size is irrelevant.", "Correct — without the index, you can't detect when the max leaves the window.", "Both can be negative.", "No sorting."],
        difficulty: "medium"
      },
      {
        question: "Why pop smaller elements from the back before pushing a new element?",
        options: ["To save memory", "They can never be the max of a future window — the new, larger element outlives them", "To sort the deque", "To prevent duplicates"],
        answer: 1,
        explanations: ["Memory is secondary.", "Correct — a smaller element to the left of a larger one is useless; the larger one dominates all future windows containing both.", "The deque is monotonic, not sorted.", "Duplicates are handled separately."],
        difficulty: "hard"
      }
    ]
  }
];