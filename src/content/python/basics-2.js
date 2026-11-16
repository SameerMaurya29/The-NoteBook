// Python — more foundational "things you have to know" notes (part 2).
export default [
  {
    id: "operators-and-expressions",
    title: "Operators & Expressions",
    difficulty: "easy",
    definition: `Operators act on values to produce new values. Python has arithmetic (+ - * / // % **), comparison (== != < > <= >=), logical (and or not), bitwise (& | ^ ~ << >>), and membership/identity (in, is). Expressions combine values and operators; statements do something with the result.`,
    coreUnderstanding: `An expression is anything that evaluates to a value (\`3 + 4\`, \`x < 5\`); a statement does work (\`x = 7\`). Python's operators are mostly familiar, with two twists: \`/\` is always float division (\`7/2 = 3.5\`), while \`//\` is floor division (\`7//2 = 3\`); and \`**\` is exponentiation (\`2**3 = 8\`). Logical operators are words (\`and\`, \`or\`, \`not\`), not symbols. \`is\` checks identity (same object), \`==\` checks equality — mixing them up is a classic bug.`,
    howItWorks: `1. ARITHMETIC: + - * / // % **.  / is float (7/2=3.5); // is floor (7//2=3); % is remainder (7%2=1); ** is power (2**3=8).
2. COMPARISON: == != < > <= >=. Return True/False. Chain naturally: 1 < x < 10 (Python allows it).
3. LOGICAL: and, or, not (words, not && || !). Short-circuit: and stops if left is False; or stops if left is True. Return the operand, not always a bool.
4. MEMBERSHIP: x in collection (True if x is an element). Works on strings, lists, tuples, sets, dicts (checks keys).
5. IDENTITY: a is b (True if same object in memory). Use for None checks (x is None), NOT for value equality.
6. BITWISE: & | ^ ~ << >>. Operate on integers as bit patterns. << is left-shift (multiply by 2), >> is right-shift (divide by 2).
7. AUGMENTED ASSIGNMENT: x += 1 (x = x + 1). Also -=, *=, //=, %=, **=.
8. PRECEDENCE: ** binds tightest; then * / // %; then + -; then comparisons; then not, and, or. Use parentheses to be explicit.`,
    codeExamples: [
      {
        lang: "python",
        code: `# arithmetic — / is float, // is floor, ** is power
print(7 / 2)    # 3.5  (float division)
print(7 // 2)  # 3    (floor division)
print(7 % 2)   # 1    (remainder)
print(2 ** 3)  # 8    (power)

# logical operators are WORDS, and they short-circuit
x = 0
if x != 0 and 10 / x > 1:   # right side NOT evaluated (x != 0 is False)
    print("never")

# 'in' checks membership; 'is' checks identity
nums = [1, 2, 3]
print(2 in nums)      # True
print(nums is nums)   # True (same object)

# comparison chaining (Python-specific, reads like math)
age = 25
print(18 <= age <= 65) # True

# augmented assignment
total = 10
total += 5            # total = 15
print(total)`,
        output: `3.5
3
1
8
True
True
True
15`,
        note: "/ is always float; // is floor; ** is power. Logical ops are words (and/or/not) and short-circuit. 'in' = membership, 'is' = identity. Python allows chained comparisons: 18 <= age <= 65."
      }
    ],
    marginNotes: [
      "/ is ALWAYS float division (7/2 = 3.5). Use // for integer floor division. Forgetting this gives floats where you expected ints.",
      "Logical operators are words (and, or, not), not && || !. They short-circuit AND return the operand value (not always a bool): `0 or 'hi'` returns 'hi'.",
      "Use `is` only for identity (x is None, sentinel checks), never for value equality. `a == b` compares values; `a is b` checks they're the same object.",
      "Python allows chained comparisons: `1 < x < 10` works and reads like math — no need for `1 < x and x < 10`."
    ],
    commonMistakes: [
      "Using `is` instead of `==` for value comparison — `is` checks identity, so `a is b` can be False even when a == b.",
      "Expecting `7 / 2` to be `3` — Python's / is float division; use // for floor.",
      "Using `&&` / `||` / `!` (C/Java syntax) — Python uses `and` / `or` / `not`."
    ],
    relatedTopics: ["Variables & Dynamic Typing", "Control Flow: if/for/while", "Mutable vs Immutable"],
    externalLinks: [
      { label: "Python Docs: Operators", url: "https://docs.python.org/3/reference/expressions.html#operator-precedence" }
    ],
    mcqs: [
      {
        question: "What does `7 / 2` return in Python 3?",
        options: ["3", "3.5 (float division — / is always float)", "3.0", "An error"],
        answer: 1,
        explanations: ["That's // (floor).", "Correct — / always returns a float: 7/2 = 3.5. Use // for floor division (7//2 = 3).", "It's 3.5, not 3.0.", "No error."],
        difficulty: "easy"
      },
      {
        question: "What's the difference between `==` and `is`?",
        options: ["None — they're the same", "`==` compares values; `is` checks identity (same object in memory)", "`==` is for numbers only", "`is` is faster"],
        answer: 1,
        explanations: ["They differ.", "Correct — `==` asks 'do these have the same value?'; `is` asks 'are these the exact same object?'. Use `is` for None/sentinels, `==` for values.", "`==` works on all types.", "Speed is irrelevant."],
        difficulty: "medium"
      },
      {
        question: "Which are Python's logical operators?",
        options: ["&& || !", "and, or, not (words)", "& | ~", "AND OR NOT (uppercase)"],
        answer: 1,
        explanations: ["That's C/Java/JS.", "Correct — Python uses the words `and`, `or`, `not`. They short-circuit and return the operand value, not always a bool.", "Those are bitwise.", "Case isn't the issue; the words are."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "control-flow-basics",
    title: "Control Flow: if / for / while",
    difficulty: "easy",
    definition: `Control flow decides which code runs and how often. Python gives you conditionals (if / elif / else), iteration (for over any iterable, while), and loop control (break, continue, else). Blocks are defined by indentation after a colon.`,
    coreUnderstanding: `Control flow is how you make a program react and repeat. Python's if/elif/else branch on conditions; for iterates over any iterable (lists, strings, ranges, dicts); while loops until a condition is false. Every one opens with a colon and an indented block. Two Python-isms: for is always "for-each" (no C-style counter — use range), and loops can have an else that runs only if the loop completed without break (handy for search loops).`,
    howItWorks: `1. IF/ELIF/ELSE: if cond: ... elif cond2: ... else:. Each opens a block with a colon. Only the first true branch runs.
2. FOR: for x in iterable: — iterates over each element. To count, use for i in range(n):. range(n) yields 0..n-1; range(a, b) yields a..b-1; range(a, b, step).
3. WHILE: while cond: — repeats while cond is True. You must update something inside or it loops forever.
4. BREAK: exit the loop immediately. CONTINUE: skip to the next iteration.
5. LOOP ELSE: for ... else: — the else runs only if the loop finished WITHOUT a break. Use to detect "not found".
6. ENUMERATE: for i, x in enumerate(lst): gives index + value together (better than range(len(lst))).
7. ZIP: for a, b in zip(lst1, lst2): iterates two lists in parallel.
8. NESTING: loops inside loops multiply cost; deep nesting is hard to read — prefer extracting helpers.`,
    codeExamples: [
      {
        lang: "python",
        code: `# if / elif / else — colon opens each block
score = 82
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
print(grade)   # B

# for-each over a list; enumerate for index+value
fruits = ["apple", "banana", "cherry"]
for i, f in enumerate(fruits):
    print(i, f)
# 0 apple
# 1 banana
# 2 cherry

# while — must update the condition variable
n = 5
while n > 0:
    print(n, end=" ")
    n -= 1        # without this: infinite loop!
# 5 4 3 2 1

# loop else: runs only if NO break occurred
def find(lst, x):
    for item in lst:
        if item == x:
            print("found")
            break
    else:
        print("not found")

find([1, 2, 3], 5)   # not found`,
        output: `B
0 apple
1 banana
2 cherry
5 4 3 2 1 not found`,
        note: "if/elif/else and loops open blocks with a colon then indentation. for is always for-each (use range/enumerate). while must update its condition. A loop's else runs only if no break occurred."
      }
    ],
    marginNotes: [
      "Python's for is ALWAYS for-each — there's no C-style `for(i=0; i<n; i++)`. Use `for i in range(n)` or `enumerate()` for indices.",
      "A while loop MUST change something inside or it runs forever. Forgetting `n -= 1` is the classic infinite loop.",
      "The loop `else` is Python-specific: it runs only if the loop completed without `break`. Perfect for 'search and report not-found'.",
      "Use `enumerate()` instead of `range(len(lst))` — it gives index + value cleanly and is the idiomatic Python way."
    ],
    commonMistakes: [
      "Writing a C-style for loop — Python's for is for-each; use range() or enumerate().",
      "Forgetting to update the while condition — infinite loop.",
      "Misunderstanding the loop else — it runs when the loop DIDN'T break, not when it did."
    ],
    relatedTopics: ["Operators & Expressions", "Functions & Scope", "Comprehensions"],
    externalLinks: [
      { label: "Python Docs: Control Flow", url: "https://docs.python.org/3/tutorial/controlflow.html" }
    ],
    mcqs: [
      {
        question: "How does Python's for loop work?",
        options: ["C-style: for(i=0; i<n; i++)", "It's always for-each over an iterable — use range() or enumerate() for counters", "Only with while", "It requires an index variable"],
        answer: 1,
        explanations: ["No C-style for in Python.", "Correct — `for x in iterable` iterates elements. For a counter use `for i in range(n)`; for index+value use `enumerate()`.", "while is separate.", "No index variable needed for for-each."],
        difficulty: "easy"
      },
      {
        question: "When does a loop's `else` clause run?",
        options: ["If the loop ran at all", "Only if the loop completed WITHOUT a break", "If the loop broke", "Never"],
        answer: 1,
        explanations: ["It's more specific than that.", "Correct — the else runs only if the loop finished normally (no break). It's the 'not found' branch of a search loop.", "That's the opposite — break skips the else.", "It does run, in one case."],
        difficulty: "medium"
      },
      {
        question: "What causes an infinite while loop?",
        options: ["Using a for loop instead", "Not updating the condition variable inside the loop", "Too many iterations", "A missing colon"],
        answer: 1,
        explanations: ["for vs while is unrelated.", "Correct — if the body never changes the condition (e.g. forgetting `n -= 1`), the condition stays True forever. Always update the condition.", "Count is a symptom.", "A missing colon is a SyntaxError, not an infinite loop."],
        difficulty: "easy"
      }
    ]
  }
];