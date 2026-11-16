// DSA — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "domain-basics",
  title: "DSA Basics — Why & How",
  difficulty: "easy",
  definition: `Data Structures & Algorithms (DSA) is the study of organizing data and designing step-by-step procedures so code runs efficiently. You use it everywhere — but it matters most when data is large, when latency is tight, and in technical interviews.`,
  coreUnderstanding: `DSA is the grammar of efficient code. A data structure is HOW you store data (array, hash map, tree); an algorithm is HOW you process it (sort, search, traverse). The same problem can be solved in O(n²) or O(n log n) — the difference between finishing in a second or an hour on a million items. You learn DSA to write code that scales, to reason about trade-offs (time vs space), and to pass technical interviews where this vocabulary is assumed. Big-O notation is the language used to compare approaches.`,
  howItWorks: `1. WHY: code that scales, performance budgets, and interviews. A poor data-structure choice turns an O(1) lookup into O(n) — catastrophic at scale.
2. WHERE: any performance-critical code (databases, games, search), system design, and every coding interview.
3. THE TWO HALVES: data structures (storage) + algorithms (processing). Pick the structure that makes your algorithm fast (e.g., a hash set turns "is X present?" from O(n) to O(1)).
4. BIG-O: describes how cost grows with input size n. Common classes from best to worst: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ). Always analyze worst-case unless told otherwise.
5. LOOPS & NESTING: a single loop over n items is O(n); two nested loops are O(n²). Each nested level multiplies the cost — that's why nested loops over big inputs are slow.
6. RECURSION: a function calling itself. Needs a BASE CASE (to stop) and a recursive case (smaller input). Each call adds a stack frame — deep recursion can overflow the stack.
7. HELPER FUNCTIONS: break a problem into a main function + helpers (e.g., partition() inside quicksort). Small focused functions are easier to reason about and test.
8. SYNTAX-AGNOSTIC: DSA is expressed in pseudocode and implemented in any language. The patterns (two pointers, sliding window, BFS/DFS) transfer across languages.
9. TRADE-OFFS: time vs space (a hash map is O(1) time but O(n) space), generality vs speed (a general sort vs a counting sort for small integer ranges).`,
  codeExamples: [
    {
      lang: "python",
      code: `# The same problem: "is x in the list?" — two data structures, two costs

def find_linear(lst, x):          # O(n) — scan every item
    for item in lst:
        if item == x:
            return True
    return False

def find_set(s, x):               # O(1) — hash lookup
    return x in s

data = list(range(1_000_000))
import random; random.shuffle(data)
s = set(data)                     # build the set once: O(n)

# find_linear(data, 999_999)  -> scans ~1M items
# find_set(s, 999_999)        -> one hash lookup`,
      output: `(illustrative — set lookup is ~instant vs linear scan)`,
      note: "Same problem, different structure: a list gives O(n) search, a set gives O(1). Choosing the right data structure is the core of DSA."
    },
    {
      lang: "python",
      code: `# Recursion: needs a BASE CASE + a smaller recursive call
def factorial(n):
    if n <= 1:            # BASE CASE — stops recursion
        return 1
    return n * factorial(n - 1)   # recursive case (smaller input)

print(factorial(5))      # 120`,
      output: `120`,
      note: "Every recursive function needs a base case (to stop) and a recursive case (smaller input). Without a base case, you get infinite recursion and a stack overflow."
    }
  ],
  marginNotes: [
    "Big-O ignores constants: O(2n) and O(n) are both O(n). What matters is how cost GROWS with n — the dominant term wins.",
    "Nested loops multiply: a loop inside a loop over n is O(n²). Three levels deep is O(n³) — usually too slow for n > 1000.",
    "Always pick the data structure first. A hash map/set turns many O(n) problems into O(1); a sorted array enables binary search (O(log n)) instead of linear scan (O(n)).",
    "Recursion depth = stack frames. Python caps recursion near 1000 by default; deep recursion causes RecursionError. Use iteration or memoization for deep cases."
  ],
  commonMistakes: [
    "Using a list for membership tests (O(n)) when a set would be O(1) — the #1 performance mistake.",
    "Forgetting the base case in recursion — infinite recursion and stack overflow.",
    "Counting only the outer loop and ignoring nested loops — two nested loops are O(n²), not O(n)."
  ],
  relatedTopics: ["Big-O Notation", "Bubble Sort", "Two Pointers"],
  externalLinks: [
    { label: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/" },
    { label: "VisuAlgo", url: "https://visualgo.net/" }
  ],
  mcqs: [
    {
      question: "Why does data-structure choice matter so much?",
      options: ["It changes the language you use", "It can turn an O(n) operation into O(1) — e.g., a set for membership vs a list", "It affects compilation speed", "It changes the file size"],
      answer: 1,
      explanations: ["The language is independent of the structure.", "Correct — `x in list` is O(n); `x in set` is O(1). On a million items that's the difference between instant and a full scan.", "Compilation is unaffected.", "File size is unrelated."],
      difficulty: "easy"
    },
    {
      question: "What does every recursive function need?",
      options: ["A loop", "A base case (to stop) and a recursive case with a smaller input", "A global variable", "A class"],
      answer: 1,
      explanations: ["Recursion replaces a loop.", "Correct — without a base case the function calls itself forever, exhausting the stack. The recursive case must move toward the base case (smaller input).", "Globals are discouraged.", "Recursion needs no class."],
      difficulty: "easy"
    },
    {
      question: "What is the complexity of two nested loops each over n items?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(2n)"],
      answer: 1,
      explanations: ["A single loop is O(n).", "Correct — the inner loop runs n times for each of the n outer iterations: n × n = n². Each nesting level multiplies the cost.", "That's binary search.", "O(2n) is still O(n) — constants drop."],
      difficulty: "medium"
    }
  ]
};