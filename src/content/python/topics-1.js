// Python topics part 1: Variables through Context Managers (topics 1-18)
export default [
  {
    id: "variables-and-types",
    title: "Variables & Dynamic Typing",
    difficulty: "easy",
    definition: `A variable in Python is a name bound to a value. There are no type declarations — the name is just a label, and the value carries its own type. The same name can be rebound to values of different types at any time.`,
    coreUnderstanding: `Python is dynamically typed: types live on values, not on names. This trades compile-time safety for speed of writing and flexibility. Under the hood, a variable is a dictionary entry mapping a name (string) to a reference to a Python object. Reassigning a name just re-points the reference — it doesn't copy the object.`,
    howItWorks: `1. \`x = 5\` binds the name \`x\` to the integer object \`5\`.
2. \`x = "hi"\` rebinds \`x\` to a string — the old int object is unchanged; if nothing else references it, the garbage collector reclaims it.
3. \`type(x)\` returns the type of the value currently bound to \`x\`.
4. \`id(x)\` returns the identity (memory address-ish) of the object — useful to prove whether two names point at the same object.
5. Type hints (\`x: int = 5\`) are optional annotations; they are NOT enforced at runtime — they're for tools and readers.`,
    codeExamples: [
      {
        lang: "python",
        code: `x = 5            # bound to int
print(type(x))   # <class 'int'>

x = "hello"       # rebound to str — totally legal
print(type(x))   # <class 'str'>

a = [1, 2]
b = a            # b points to the SAME list, not a copy
b.append(3)
print(a)         # [1, 2, 3] — a changed too!`,
        output: `<class 'int'>
<class 'str'>
[1, 2, 3]`,
        note: "Assignment never copies. `b = a` makes two names for one object — a top source of beginner bugs."
      }
    ],
    marginNotes: [
      "Assignment NEVER copies. If you want a copy, ask for it: `b = a.copy()` or `b = list(a)`.",
      "Small integers (-5 to 256) are cached by CPython, so `a is b` is True by accident. Don't rely on it.",
      "Type hints don't run. `x: int = \"oops\"` executes fine. Use mypy or pyright to check them.",
      "Names live in namespaces (module, function, class). `id()` and `type()` operate on objects, not names."
    ],
    commonMistakes: [
      "Assuming `b = a` copies a list — it aliases, so mutating `b` mutates `a`.",
      "Treating type hints as runtime enforcement — they're documentation for static checkers.",
      "Using `is` instead of `==` for value comparisons — `is` checks identity, not equality."
    ],
    relatedTopics: ["Mutable vs Immutable", "Namespaces", "Type Hints"],
    externalLinks: [
      { label: "Python Docs: Execution Model", url: "https://docs.python.org/3/reference/executionmodel.html" },
      { label: "PEP 484 — Type Hints", url: "https://peps.python.org/pep-0484/" }
    ],
    mcqs: [
      {
        question: "After `a = [1,2]; b = a; b.append(3)`, what is `a`?",
        options: ["[1, 2]", "[1, 2, 3]", "[1, 2, 3] but only if copied", "Undefined"],
        answer: 1,
        explanations: ["a also changed — b and a are the same object.", "Correct — assignment aliases; mutating b mutates a.", "No copy happened.", "It's well-defined."],
        difficulty: "medium"
      },
      {
        question: "What does `is` check?",
        options: ["Value equality", "Object identity (same object in memory)", "Type equality", "Truthiness"],
        answer: 1,
        explanations: ["That's `==`.", "Correct — `is` checks whether two names reference the exact same object.", "Use type() for that.", "Use bool() for that."],
        difficulty: "easy"
      },
      {
        question: "Are Python type hints enforced at runtime?",
        options: ["Yes, always", "No — they are annotations for static checkers only", "Only for ints", "Only in classes"],
        answer: 1,
        explanations: ["Not enforced.", "Correct — tools like mypy/pyright check them; the interpreter ignores them.", "No type is enforced.", "Same for all."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "data-structures-basics",
    title: "Lists, Tuples, Dicts & Sets",
    difficulty: "easy",
    definition: `Python ships four core built-in collections: lists (ordered, mutable), tuples (ordered, immutable), dicts (key→value mappings), and sets (unordered, unique elements). Choosing the right one is most of day-to-day Python.`,
    coreUnderstanding: `Each structure optimizes a different access pattern. Lists give O(1) index access and append but O(n) search. Dicts and sets give O(1) average lookup/membership via hashing, at the cost of needing hashable keys. Tuples are immutable and hashable, so they can be dict keys and set members — lists cannot.`,
    howItWorks: `1. \`list\`: \`[1, 2, 3]\` — append/pop from the end is O(1); insert at front is O(n) due to shifting.
2. \`tuple\`: \`(1, 2)\` — fixed after creation; used for fixed records and multiple-return values.
3. \`dict\`: \`{'k': 'v'}\` — keys must be hashable (immutable); average O(1) get/set.
4. \`set\`: \`{1, 2, 3}\` — fast membership tests and set algebra (union, intersection).
5. Comprehensions (\`[x*2 for x in lst if x>0]\`) build these concisely and idiomatically.`,
    codeExamples: [
      {
        lang: "python",
        code: `nums = [3, 1, 2]
nums.append(4)          # [3, 1, 2, 4]
nums.sort()             # [1, 2, 3, 4] — in place

point = (10, 20)        # tuple, immutable
x, y = point            # unpacking

d = {'a': 1, 'b': 2}
print(d.get('z', 0))    # 0 — safe lookup with default

squares = {i: i*i for i in range(3)}
print(squares)          # {0: 0, 1: 1, 2: 4}`,
        output: `0
{0: 0, 1: 1, 2: 4}`,
        note: "Use .get(key, default) to avoid KeyError on missing keys."
      }
    ],
    marginNotes: [
      "Lists can't be dict keys — they're unhashable. Tuples CAN, as long as their elements are hashable.",
      "`sorted(x)` returns a new sorted list; `x.sort()` sorts in place and returns None. Mixing these up is a classic bug.",
      "Dicts preserve insertion order (since 3.7). Don't rely on it for correctness, but it's handy.",
      "Set membership `x in s` is O(1) average — way faster than `x in list` (O(n)) for big collections."
    ],
    commonMistakes: [
      "Using a list as a dict key — TypeError: unhashable type.",
      "Expecting `list.sort()` to return the sorted list — it returns None.",
      "Mutating a list while iterating over it — items get skipped or IndexError."
    ],
    relatedTopics: ["Mutable vs Immutable", "Comprehensions", "Hashing"],
    externalLinks: [
      { label: "Python Docs: Data Structures", url: "https://docs.python.org/3/tutorial/datastructures.html" },
      { label: "Time Complexity — Python Wiki", url: "https://wiki.python.org/moin/TimeComplexity" }
    ],
    mcqs: [
      {
        question: "Average time complexity of `key in dict`?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
        answer: 1,
        explanations: ["That's a list scan.", "Correct — hashing gives O(1) average lookup.", "That's a balanced tree.", "Far too slow."],
        difficulty: "easy"
      },
      {
        question: "Why can a list not be used as a dict key, but a tuple can?",
        options: ["Lists are too long", "Lists are mutable and therefore unhashable", "Tuples are faster", "Lists don't support hashing by design"],
        answer: 1,
        explanations: ["Length is irrelevant.", "Correct — hashability requires immutability of the value; lists can change after being used as a key, breaking the hash.", "Speed isn't the reason.", "The reason is mutability, not arbitrary design."],
        difficulty: "medium"
      },
      {
        question: "What does `list.sort()` return?",
        options: ["A new sorted list", "None — it sorts in place", "The original list", "An iterator"],
        answer: 1,
        explanations: ["That's sorted().", "Correct — sort() mutates and returns None.", "It mutates the original, returns None.", "No."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "operators-and-expressions-practice",
    title: "Operators & Expressions — Practice",
    difficulty: "easy",
    definition: "Python supports arithmetic (+, -, *, /, //, %, **), comparison (==, !=, <, >, <=, >=), logical (and, or, not), bitwise (&, |, ^, ~, <<, >>), assignment (=, +=, etc.), identity (is, is not), and membership (in, not in) operators. The // operator does floor division (rounds down), ** is exponentiation, and operator precedence follows standard math rules with parentheses for clarity.",
    coreUnderstanding: "Python operators map closely to mathematical notation, with a few twists. Division / always returns a float, while // returns an int (floor division). The ** operator is exponentiation, not XOR — XOR is ^. Logical operators use words (and, or, not) instead of symbols, and they short-circuit: `a and b` returns a if a is falsy, otherwise b. This makes them useful for default values: `name or 'Anonymous'`.",
    howItWorks: "1. Arithmetic: `7 / 2` = 3.5 (float), `7 // 2` = 3 (floor), `7 % 2` = 1 (modulo), `2 ** 3` = 8 (power).\n2. Comparison: `==` checks value equality, `is` checks identity. `1 == 1.0` is True, `1 is 1.0` is False.\n3. Logical: `and` / `or` short-circuit and return the last evaluated operand, not True/False.\n4. Bitwise: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (left shift), `>>` (right shift) — operate on integers bit by bit.\n5. Membership: `in` checks if a value exists in a container — `3 in [1,2,3]` is True.\n6. Precedence: ** > unary +/- > * / // % > + - > bitwise > comparison > not > and > or. Use parentheses to be explicit.",
    codeExamples: [
      {
        lang: "python",
        code: `# Division differences
print(7 / 2)    # 3.5  — true division
print(7 // 2)   # 3    — floor division
print(7 % 2)    # 1    — modulo
print(2 ** 10)  # 1024 — exponentiation

# Short-circuit logic returns operands, not bool
name = ""
print(name or "Anonymous")  # Anonymous

# Chained comparison
x = 5
print(1 < x < 10)  # True — Python allows this!`,
        output: `3.5
3
1
1024
Anonymous
True`,
        note: "Python's chained comparisons (1 < x < 10) are unique — most languages require `1 < x and x < 10`."
      }
    ],
    marginNotes: [
      "/ always returns float, // always returns int (or floored float). This trips up people coming from C/Java where / on ints gives int.",
      "** is power, not XOR. ^ is XOR. This is a common confusion for C programmers learning Python.",
      "`and`/`or` return the operand, not a boolean. `0 or 'default'` returns 'default', not True.",
      "Python has no ++ or -- operators. Use += 1 and -= 1 instead."
    ],
    commonMistakes: [
      "Using ** expecting XOR — it's exponentiation. Use ^ for XOR.",
      "Assuming `7 / 2` returns 3 (int) — Python 3 always returns 3.5 (float). Use // for integer division.",
      "Confusing `is` with `==` — `is` checks identity (same object), `==` checks value equality."
    ],
    relatedTopics: ["Variables & Dynamic Typing", "Control Flow", "Bitwise Operators"],
    externalLinks: [
      { label: "Python Docs: Operators", url: "https://docs.python.org/3/reference/expressions.html#operators" },
      { label: "Python Operator Precedence", url: "https://docs.python.org/3/reference/expressions.html#operator-precedence" }
    ],
    mcqs: [
      {
        question: "What does `7 // 2` return in Python 3?",
        options: ["3.5", "3", "4", "3.0"],
        answer: 1,
        explanations: ["That's / (true division).", "Correct — // is floor division, returns int 3.", "That's rounding up, not flooring.", "// on two ints returns int, not float."],
        difficulty: "easy"
      },
      {
        question: "What does `'' or 'default'` return?",
        options: ["True", "''", "'default'", "False"],
        answer: 2,
        explanations: ["or returns the last evaluated operand, not a bool.", "'' is falsy so or moves on.", "Correct — '' is falsy, so or returns the second operand 'default'.", "It returns the operand, not a boolean."],
        difficulty: "medium"
      },
      {
        question: "Which operator is exponentiation in Python?",
        options: ["^", "**", "//", "%"],
        answer: 1,
        explanations: ["^ is XOR.", "Correct — ** is exponentiation (2**3 = 8).", "// is floor division.", "% is modulo."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "control-flow",
    title: "Control Flow: if, elif, else",
    difficulty: "easy",
    definition: "Python control flow uses if, elif, and else for conditional branching. Unlike most languages, Python uses indentation (not braces) to define code blocks — typically 4 spaces. There is no switch/case statement in older Python; match/case was added in Python 3.10 as a structural pattern matching feature.",
    coreUnderstanding: "Python's indentation-based blocks are its most distinctive feature. Indentation IS the syntax — mixing tabs and spaces causes syntax errors. The if/elif/else chain is evaluated top-to-bottom; the first True condition wins, and the rest are skipped. Python also supports ternary expressions: `value = x if condition else y`. There's no switch/case before 3.10 — you use if/elif chains or dictionaries for dispatch.",
    howItWorks: "1. `if condition:` — if the condition is truthy, execute the indented block.\n2. `elif condition:` — checked only if the previous if/elif was falsy.\n3. `else:` — runs if no if/elif matched. Optional.\n4. Truthiness: 0, 0.0, '', [], {}, None, False are falsy; everything else is truthy.\n5. Ternary: `x if cond else y` — an expression, not a statement. Can be used inline.\n6. Conditional expressions can be nested but get unreadable — prefer if/elif for complex logic.",
    codeExamples: [
      {
        lang: "python",
        code: `score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'F'

print(f"Grade: {grade}")  # Grade: B

# Ternary expression
status = "pass" if score >= 60 else "fail"
print(status)  # pass

# Truthiness check — empty list is falsy
items = []
if not items:
    print("List is empty")  # List is empty`,
        output: `Grade: B
pass
List is empty`,
        note: "Python checks truthiness — empty collections, 0, None, and False are all 'falsy'. Use `if items:` instead of `if len(items) > 0:`."
      }
    ],
    marginNotes: [
      "Indentation is syntax. 4 spaces is the standard (PEP 8). Never mix tabs and spaces — Python 3 rejects it.",
      "Use `if items:` not `if len(items) > 0:` — Pythonic code leverages truthiness.",
      "There's no switch before 3.10. Use if/elif or a dict dispatch: `{'add': add_fn}[op]()`.",
      "Ternary `x if cond else y` is an expression — it returns a value. if/else statements don't."
    ],
    commonMistakes: [
      "Mixing tabs and spaces for indentation — TabError in Python 3.",
      "Using `if x = 5:` — assignment is not an expression in Python; use `==` for comparison.",
      "Forgetting the colon after if/elif/else conditions — a common syntax error."
    ],
    relatedTopics: ["Loops & Iteration", "Match/Case", "Operators & Expressions"],
    externalLinks: [
      { label: "Python Docs: if Statements", url: "https://docs.python.org/3/tutorial/controlflow.html#if-statements" },
      { label: "PEP 8: Indentation", url: "https://peps.python.org/pep-0008/#indentation" }
    ],
    mcqs: [
      {
        question: "What defines a code block in Python?",
        options: ["Curly braces {}", "Indentation", "begin/end keywords", "Parentheses ()"],
        answer: 1,
        explanations: ["That's C/Java/JavaScript.", "Correct — Python uses indentation level to define blocks, not braces.", "That's Pascal/Ruby.", "Parentheses are for tuples or grouping."],
        difficulty: "easy"
      },
      {
        question: "Which of these is falsy in Python?",
        options: ["[0]", "0", "'0'", "[[]]"],
        answer: 1,
        explanations: ["[0] is a non-empty list — truthy.", "Correct — 0 is falsy. So are 0.0, '', [], {}, None, False.", "'0' is a non-empty string — truthy.", "[[]] is a non-empty list (containing an empty list) — truthy."],
        difficulty: "medium"
      },
      {
        question: "What does `x if x else y` return when x = 0?",
        options: ["x (0)", "y", "True", "Error"],
        answer: 1,
        explanations: ["0 is falsy, so the condition fails.", "Correct — x=0 is falsy, so the ternary returns y.", "It returns a value, not True.", "No error — valid syntax."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "loops-and-iteration",
    title: "Loops: for, while, break, continue",
    difficulty: "easy",
    definition: "Python's for loop iterates over any iterable (lists, strings, ranges, dicts) — it is a for-each loop, not a C-style counter. range(n) generates 0..n-1 lazily. while loops repeat until a condition is false. break exits a loop; continue skips to the next iteration. The for-else clause runs if the loop completes without break.",
    coreUnderstanding: "Python's for loop is fundamentally different from C's. It's a 'for-each' — it pulls items from an iterable, not incrementing a counter. This means you never write `for (int i=0; i<n; i++)` — you write `for item in collection`. When you need an index, use `enumerate()`. The for-else construct is unique: the else block runs only if the loop wasn't broken out of — perfect for search loops.",
    howItWorks: "1. `for item in iterable:` — pulls each item from the iterable one at a time.\n2. `range(n)` generates 0, 1, ..., n-1 lazily (no list created). `range(2, 10, 2)` gives 2, 4, 6, 8.\n3. `enumerate(items)` yields (index, item) pairs — the Pythonic way to get indices.\n4. `while condition:` — repeats while condition is truthy. Watch for infinite loops.\n5. `break` exits the loop immediately. `continue` skips to the next iteration.\n6. `for...else` — the else runs if the loop completed normally (no break). Useful for search.",
    codeExamples: [
      {
        lang: "python",
        code: `# for-each over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# enumerate for index + value
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# range
for i in range(3):
    print(i)  # 0, 1, 2

# for-else: else runs if no break
for n in [2, 4, 6, 7, 8]:
    if n % 2 != 0:
        print(f"Found odd: {n}")
        break
else:
    print("All even")`,
        output: `apple
banana
cherry
0: apple
1: banana
2: cherry
0
1
2
Found odd: 7`,
        note: "for-else is one of Python's most overlooked features — the else runs only if the loop wasn't broken."
      }
    ],
    marginNotes: [
      "Use `enumerate(items)` instead of `range(len(items))` — it's cleaner and more Pythonic.",
      "for-else: the else block runs when the loop completes WITHOUT a break. Great for search-and-report patterns.",
      "`range` is lazy — it doesn't create a list. `range(1000000)` uses almost no memory.",
      "Don't modify a list while iterating over it — use a comprehension or iterate over a copy."
    ],
    commonMistakes: [
      "Using `range(len(items))` and indexing instead of `enumerate(items)` — un-Pythonic and error-prone.",
      "Modifying a list while iterating over it — items get skipped or IndexError.",
      "Forgetting the for-else runs when the loop completes normally, not when it fails."
    ],
    relatedTopics: ["Control Flow", "List Comprehensions", "Generators & Yield"],
    externalLinks: [
      { label: "Python Docs: for Statements", url: "https://docs.python.org/3/tutorial/controlflow.html#for-statements" },
      { label: "Python Docs: break and continue", url: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements" }
    ],
    mcqs: [
      {
        question: "What does `for item in [1,2,3]` do?",
        options: ["Iterates with an index counter", "Iterates over each element directly", "Creates a range", "Requires len()"],
        answer: 1,
        explanations: ["That's C-style for.", "Correct — Python's for is a for-each; it pulls each element directly.", "range() does that, not for.", "No len() needed."],
        difficulty: "easy"
      },
      {
        question: "When does the `else` block of a for-else loop run?",
        options: ["If the loop body errors", "If the loop completes without break", "If the loop never runs", "Always"],
        answer: 1,
        explanations: ["else doesn't handle errors.", "Correct — else runs only if no break was hit.", "It runs even on an empty iterable (no break occurred).", "Only if no break."],
        difficulty: "medium"
      },
      {
        question: "What is the Pythonic way to get both index and value while iterating?",
        options: ["range(len(list))", "enumerate(list)", "for i in list", "list.items()"],
        answer: 1,
        explanations: ["Works but is un-Pythonic.", "Correct — enumerate yields (index, value) pairs.", "That gives values, not indices.", "items() is for dicts."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "strings-and-formatting",
    title: "Strings & String Formatting",
    difficulty: "easy",
    definition: "Python strings are immutable sequences of Unicode characters. f-strings (f\"...\") are the modern way to embed expressions. Strings support slicing (s[1:5]), methods (.upper(), .split(), .strip(), .replace()), and concatenation with +. Triple-quoted strings allow multi-line text. Strings are iterable character by character.",
    coreUnderstanding: "Strings in Python are immutable — every 'modification' creates a new string. This means `s += 'x'` in a loop is O(n^2) because it copies the whole string each time; use `''.join(parts)` instead. Python 3 strings are Unicode by default (no more str vs unicode mess from Python 2). f-strings (3.6+) are the cleanest formatting option, replacing % formatting and .format().",
    howItWorks: "1. Creation: `'hello'`, `\"hello\"`, `'''multi\\nline'''`, `r'raw\\no escape'`.\n2. Slicing: `s[0]` (first char), `s[-1]` (last), `s[1:4]` (chars 1-3), `s[::-1]` (reverse).\n3. Methods: `.upper()`, `.lower()`, `.strip()`, `.split(',')`, `.replace('a','b')`, `.find('x')`.\n4. f-strings: `f\"Hello {name}, age {age+1}\"` — expressions evaluated inline.\n5. `.join()`: `','.join(['a','b','c'])` = 'a,b,c' — the efficient way to build strings.\n6. Immutability: `s[0] = 'H'` is a TypeError. Build a new string instead.",
    codeExamples: [
      {
        lang: "python",
        code: `name = "Alice"
age = 30

# f-string (modern, preferred)
print(f"Hello {name}, age {age}")

# Slicing
s = "Hello, World"
print(s[0:5])    # Hello
print(s[-6:])   # World
print(s[::-1])  # dlroW ,olleH — reverse

# Useful methods
print("  hi  ".strip())      # hi
print("a,b,c".split(","))    # ['a', 'b', 'c']
print("hello".replace("l", "L"))  # heLLo

# join is efficient for building strings
parts = ["Hello", "World"]
print(" ".join(parts))  # Hello World`,
        output: `Hello Alice, age 30
Hello
World
dlroW ,olleH
hi
['a', 'b', 'c']
heLLo
Hello World`,
        note: "Use ''.join() to build strings from parts, not += in a loop. join() is O(n); repeated += is O(n^2)."
      }
    ],
    marginNotes: [
      "Strings are immutable. `s = s + 'x'` creates a new string — in a loop, use `''.join()` instead.",
      "f-strings are fastest and most readable. Use them over % or .format() in new code.",
      "`s[::-1]` is the Pythonic way to reverse a string — slice with step -1.",
      "Python 3 strings are Unicode. `len('cafe')` is 4, not 5 — no byte/char confusion."
    ],
    commonMistakes: [
      "Using `s += 'x'` in a loop — O(n^2) due to immutability. Use `''.join(parts)`.",
      "Trying `s[0] = 'H'` — TypeError, strings are immutable. Build a new string.",
      "Confusing `s.find('x')` (returns -1 if not found) with `s.index('x')` (raises ValueError)."
    ],
    relatedTopics: ["f-strings & Formatting", "Lists & Tuples", "Regular Expressions"],
    externalLinks: [
      { label: "Python Docs: String Methods", url: "https://docs.python.org/3/library/stdtypes.html#string-methods" },
      { label: "PEP 498 — f-strings", url: "https://peps.python.org/pep-0498/" }
    ],
    mcqs: [
      {
        question: "Why is `s += 'x'` in a loop inefficient for strings?",
        options: ["Strings are mutable", "Strings are immutable — each += copies the whole string", "It's a syntax error", "Strings can't use +="],
        answer: 1,
        explanations: ["Strings are immutable in Python.", "Correct — each += creates a new string, copying all previous content. O(n^2) in a loop.", "It's valid syntax, just slow.", "They can, but it's slow in loops."],
        difficulty: "medium"
      },
      {
        question: "What does `s[::-1]` do?",
        options: ["Returns the last char", "Reverses the string", "Returns every other char", "Errors"],
        answer: 1,
        explanations: ["That's s[-1].", "Correct — slice with step -1 reverses the sequence.", "That's s[::2].", "Valid syntax."],
        difficulty: "easy"
      },
      {
        question: "What is the modern preferred way to format strings in Python?",
        options: ["% formatting", ".format()", "f-strings", "string concatenation"],
        answer: 2,
        explanations: ["Old style, discouraged.", "Older than f-strings, still valid but verbose.", "Correct — f-strings (3.6+) are fastest and most readable.", "Readable but slow and verbose."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "functions",
    title: "Functions & Parameters",
    difficulty: "easy",
    definition: "A function is defined with def, takes parameters, and optionally returns a value. Python supports default parameters, keyword arguments (func(name=value)), *args (variable positional), and **kwargs (variable keyword). Functions are first-class objects — they can be passed as arguments, returned, and assigned to variables.",
    coreUnderstanding: "Python functions are first-class objects — you can pass them around like any other value. This enables higher-order functions, callbacks, and decorators. Parameters have flexible passing: positional, keyword, default, *args (collects extra positional into a tuple), and **kwargs (collects extra keyword into a dict). Arguments are passed by object reference — mutating a mutable argument affects the caller, but reassigning it does not.",
    howItWorks: "1. `def name(params):` — defines a function. `return value` sends a result back (None if no return).\n2. Default params: `def f(x, y=10):` — y defaults to 10 if not provided. Defaults evaluated ONCE at definition.\n3. Keyword args: `f(y=5, x=1)` — order doesn't matter when using keywords.\n4. `*args` — collects extra positional args into a tuple. `**kwargs` — collects extra keyword args into a dict.\n5. Pass-by-object-reference: mutable args (lists) can be modified by the function; reassigning the parameter doesn't affect the caller.\n6. Functions can return multiple values as a tuple: `return x, y` — caller unpacks: `a, b = f()`.",
    codeExamples: [
      {
        lang: "python",
        code: `# Default and keyword arguments
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))              # Hello, Alice!
print(greet("Bob", greeting="Hi")) # Hi, Bob!

# *args and **kwargs
def show(*args, **kwargs):
    print(f"args: {args}")        # tuple
    print(f"kwargs: {kwargs}")   # dict

show(1, 2, 3, name="Alice", age=30)

# Multiple return values
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4, 1, 5])
print(f"min={lo}, max={hi}")  # min=1, max=5`,
        output: `Hello, Alice!
Hi, Bob!
args: (1, 2, 3)
kwargs: {'name': 'Alice', 'age': 30}
min=1, max=5`,
        note: "Mutable default arguments are a classic bug: `def f(x=[]):` shares the same list across calls. Use `def f(x=None): x = x or []`."
      }
    ],
    marginNotes: [
      "Mutable default arguments are a classic trap: `def f(x=[])` — the same list is shared across all calls. Use `x=None` and create inside.",
      "Functions are objects. You can assign them: `g = greet` and call `g('Alice')`.",
      "`return a, b` returns a tuple — the caller can unpack: `x, y = func()`.",
      "Arguments are pass-by-object-reference. Mutating a mutable arg affects the caller; reassigning doesn't."
    ],
    commonMistakes: [
      "Using a mutable default argument (`def f(x=[])`) — the same object is shared across all calls.",
      "Forgetting that `return` without a value returns None, not the last expression.",
      "Confusing parameter order: positional params must come before default params."
    ],
    relatedTopics: ["Lambda & Higher-Order Functions", "*args and **kwargs", "Decorators"],
    externalLinks: [
      { label: "Python Docs: Defining Functions", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" },
      { label: "EFFBot: Default Parameter Values", url: "https://docs.python-guide.org/writing/gotchas/#mutable-default-arguments" }
    ],
    mcqs: [
      {
        question: "What is wrong with `def f(x=[])`?",
        options: ["Syntax error", "The same list is shared across all calls", "x must be a tuple", "Nothing"],
        answer: 1,
        explanations: ["It's valid syntax.", "Correct — the default is evaluated once at definition, so all calls without an arg share the same list object.", "Lists are fine as defaults syntactically.", "It's a well-known bug."],
        difficulty: "medium"
      },
      {
        question: "What does `*args` collect?",
        options: ["Extra keyword arguments into a dict", "Extra positional arguments into a tuple", "All arguments", "No arguments"],
        answer: 1,
        explanations: ["That's **kwargs.", "Correct — *args collects extra positional args into a tuple.", "It collects only the extra ones.", "It collects the extras."],
        difficulty: "easy"
      },
      {
        question: "What does `return x, y` return?",
        options: ["Two separate values", "A tuple (x, y)", "A list [x, y]", "An error"],
        answer: 1,
        explanations: ["Python returns a single object.", "Correct — comma-separated return creates a tuple. The caller can unpack it.", "It's a tuple, not a list.", "Valid syntax."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "lambda-and-higher-order",
    title: "Lambda & Higher-Order Functions",
    difficulty: "medium",
    definition: "A lambda is a small anonymous function: lambda x: x*2. It's limited to a single expression (no statements). Higher-order functions take or return functions: map, filter, reduce, sorted(key=...), and any function accepting a callback. Lambdas are best for short, throwaway transformations passed to these functions.",
    coreUnderstanding: "Lambdas are syntactic sugar for simple functions — they're equivalent to `def f(x): return x*2` but without a name and limited to one expression. They shine as arguments to higher-order functions like sorted(), map(), and filter(). However, list comprehensions often replace map/filter more readably: `[x*2 for x in lst]` beats `list(map(lambda x: x*2, lst))`. Use lambdas for short, inline transformations; use def for anything complex.",
    howItWorks: "1. `lambda params: expression` — creates an anonymous function returning the expression's value.\n2. `map(func, iterable)` — applies func to each element. Returns an iterator; wrap in list() to see.\n3. `filter(func, iterable)` — keeps elements where func returns True.\n4. `sorted(iterable, key=func)` — sorts using func as the sort key. `reverse=True` for descending.\n5. `functools.reduce(func, iterable)` — cumulatively applies func: `reduce(lambda a,b: a+b, [1,2,3])` = 6.\n6. Lambdas capture variables by reference (late binding) — a common closure gotcha in loops.",
    codeExamples: [
      {
        lang: "python",
        code: `# Lambda as sort key
students = [("Alice", 85), ("Bob", 92), ("Carol", 78)]
students.sort(key=lambda s: s[1])  # sort by score
print(students)
# [('Carol', 78), ('Alice', 85), ('Bob', 92)]

# map and filter (but comprehensions are often better)
nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x*2, nums))
evens = list(filter(lambda x: x%2 == 0, nums))
print(doubled)  # [2, 4, 6, 8, 10]
print(evens)   # [2, 4]

# Same with comprehensions (preferred)
doubled = [x*2 for x in nums]
evens = [x for x in nums if x%2 == 0]`,
        output: `[('Carol', 78), ('Alice', 85), ('Bob', 92)]
[2, 4, 6, 8, 10]
[2, 4]`,
        note: "Prefer comprehensions over map/filter with lambdas — they're more readable and often faster."
      }
    ],
    marginNotes: [
      "Lambdas are limited to one expression — no statements, no assignments, no multi-line logic. Use def for anything complex.",
      "List comprehensions often replace map/filter: `[x*2 for x in lst]` is clearer than `list(map(lambda x: x*2, lst))`.",
      "Lambda closures capture variables by reference (late binding) — `lambdas = [lambda: i for i in range(3)]` all return 2.",
      "`sorted(key=lambda x: x[1])` is the most common real-world lambda use case."
    ],
    commonMistakes: [
      "Using lambdas for complex logic — if it doesn't fit one expression, use def.",
      "Late binding in lambda closures: `[lambda: i for i in range(3)]` — all return 2, not 0,1,2.",
      "Forgetting that map/filter return iterators in Python 3 — wrap in list() to use them."
    ],
    relatedTopics: ["Functions & Parameters", "List Comprehensions", "Decorators"],
    externalLinks: [
      { label: "Python Docs: Lambdas", url: "https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions" },
      { label: "PEP 8: Lambda usage", url: "https://peps.python.org/pep-0008/#programming-recommendations" }
    ],
    mcqs: [
      {
        question: "What is a lambda limited to?",
        options: ["Multiple statements", "A single expression", "No parameters", "Only numeric operations"],
        answer: 1,
        explanations: ["Lambdas can't have statements.", "Correct — a lambda body is a single expression, no statements or assignments.", "Lambdas can take parameters.", "They work on any type."],
        difficulty: "easy"
      },
      {
        question: "What is the preferred Pythonic replacement for `map(lambda x: x*2, lst)`?",
        options: ["A for loop", "A list comprehension [x*2 for x in lst]", "A generator", "There is no replacement"],
        answer: 1,
        explanations: ["Works but not Pythonic.", "Correct — comprehensions are more readable and often faster.", "Generators are different.", "Comprehensions are the standard replacement."],
        difficulty: "medium"
      },
      {
        question: "What does `lambdas = [lambda: i for i in range(3)]; [f() for f in lambdas]` return?",
        options: ["[0, 1, 2]", "[2, 2, 2]", "[0, 0, 0]", "Error"],
        answer: 1,
        explanations: ["That would be early binding.", "Correct — late binding: all lambdas capture the same variable i, which is 2 after the loop.", "No, i is 2 at call time.", "Valid syntax."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "list-comprehensions",
    title: "List Comprehensions",
    difficulty: "medium",
    definition: "A list comprehension builds a list from an iterable in a single expression: [expr for item in iterable if condition]. It is more readable and often faster than an equivalent for-loop with append. Nested comprehensions and multiple for-clauses are possible but can become unreadable — keep them simple.",
    coreUnderstanding: "List comprehensions are Python's signature feature for transforming and filtering sequences. They replace the pattern of creating an empty list, looping, and appending. The syntax mirrors set-builder notation from math: {x^2 | x in N, x > 0} becomes `[x**2 for x in nums if x > 0]`. They're faster than equivalent for-loops because the comprehension is optimized in C. But readability drops fast with nesting — if you need two+ for-clauses or complex conditions, use a regular loop.",
    howItWorks: "1. Basic: `[expr for item in iterable]` — applies expr to each item.\n2. With filter: `[expr for item in iterable if condition]` — only items where condition is True.\n3. Multiple for-clauses: `[x+y for x in a for y in b]` — cartesian product. Read left to right, outer to inner.\n4. Nested: `[[cell for cell in row] for row in matrix]` — inner comprehension is the inner loop.\n5. Dict/set comprehensions: `{k: v for ...}` (dict), `{expr for ...}` (set).\n6. Generator expression: `(expr for item in iterable)` — lazy, doesn't build a list.",
    codeExamples: [
      {
        lang: "python",
        code: `# Basic transformation
nums = [1, 2, 3, 4, 5]
squares = [x**2 for x in nums]
print(squares)  # [1, 4, 9, 16, 25]

# With filter
evens = [x for x in nums if x % 2 == 0]
print(evens)  # [2, 4]

# With function call
words = ["hello", "world", "python"]
lengths = [len(w) for w in words]
print(lengths)  # [5, 5, 6]

# Dict comprehension
word_len = {w: len(w) for w in words}
print(word_len)  # {'hello': 5, 'world': 5, 'python': 6}

# Nested (flatten a 2D list)
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in matrix for x in row]
print(flat)  # [1, 2, 3, 4, 5, 6]`,
        output: `[1, 4, 9, 16, 25]
[2, 4]
[5, 5, 6]
{'hello': 5, 'world': 5, 'python': 6}
[1, 2, 3, 4, 5, 6]`,
        note: "Nested comprehensions read outer-to-inner: `for row in matrix` is the outer loop, `for x in row` is the inner."
      }
    ],
    marginNotes: [
      "Comprehensions are faster than for+append because they run in optimized C code, not Python bytecode.",
      "If you need two+ for-clauses or complex conditions, a regular for loop is more readable. Don't over-nest.",
      "Dict comprehensions: `{k: v for k, v in items}`. Set comprehensions: `{x for x in items}`.",
      "Generator expressions `(x for x in lst)` are lazy — use them when you just need to iterate once."
    ],
    commonMistakes: [
      "Over-nesting comprehensions — `[[x for x in row] for row in matrix]` is fine, but 3+ levels get unreadable.",
      "Using a comprehension for side effects (like printing) — it creates a useless list of None. Use a for loop.",
      "Confusing the order of for-clauses: `[x+y for x in a for y in b]` — outer loop first, inner loop second."
    ],
    relatedTopics: ["Generators & Yield", "Lambda & Higher-Order Functions", "Lists & Tuples"],
    externalLinks: [
      { label: "Python Docs: List Comprehensions", url: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions" },
      { label: "PEP 202 — List Comprehensions", url: "https://peps.python.org/pep-0202/" }
    ],
    mcqs: [
      {
        question: "What does `[x**2 for x in range(4)]` produce?",
        options: ["[0, 1, 4, 9]", "[1, 4, 9, 16]", "[0, 1, 2, 3]", "[1, 2, 3, 4]"],
        answer: 0,
        explanations: ["Correct — range(4) is 0,1,2,3; squared: 0,1,4,9.", "That's range(1,5) squared.", "That's range(4) without squaring.", "That's range(1,5)."],
        difficulty: "easy"
      },
      {
        question: "How do you flatten `[[1,2],[3,4]]` with a comprehension?",
        options: ["[x for x in row for row in matrix]", "[x for row in matrix for x in row]", "[row for row in matrix]", "[x in matrix for x in row]"],
        answer: 1,
        explanations: ["Wrong order — row isn't defined yet.", "Correct — outer loop `for row in matrix`, inner loop `for x in row`.", "That gives the rows, not flattened.", "Invalid syntax."],
        difficulty: "medium"
      },
      {
        question: "When should you prefer a for loop over a comprehension?",
        options: ["Never", "When the logic is complex or has side effects", "When speed matters", "When the list is small"],
        answer: 1,
        explanations: ["Comprehensions aren't always better.", "Correct — complex nesting or side effects make for loops more readable.", "Comprehensions are usually faster.", "Size doesn't matter."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "generator-expressions",
    title: "Generators & Yield",
    difficulty: "medium",
    definition: "A generator function uses yield instead of return to produce a sequence of values lazily — one at a time, on demand. This means you can iterate over infinite sequences or process huge files without loading everything into memory. Generator expressions (expr for x in iter) are the lazy cousin of list comprehensions.",
    coreUnderstanding: "Generators are Python's way of producing values on demand. When a function hits `yield`, it pauses, returns the value, and remembers its state. When asked for the next value, it resumes right after the yield. This is lazy evaluation — values are produced one at a time, not all at once. This means you can process infinite sequences (like counting forever) or huge files line by line without loading them into memory. Generator expressions are like list comprehensions but lazy: `(x**2 for x in nums)` produces values on demand.",
    howItWorks: "1. `def gen(): yield x` — calling gen() returns a generator object, not a value.\n2. `next(gen)` — runs until the next yield, returns the yielded value, and pauses.\n3. When the function returns (or hits the end), StopIteration is raised — the generator is exhausted.\n4. `for x in gen:` — the for loop calls next() repeatedly and catches StopIteration for you.\n5. Generator expression: `(x**2 for x in nums)` — like a list comprehension but lazy. No list is built.\n6. Generators are single-use: once exhausted, you must create a new one. They can't be indexed or rewound.",
    codeExamples: [
      {
        lang: "python",
        code: `# Generator function
def count_up_to(n):
    i = 0
    while i < n:
        yield i
        i += 1

counter = count_up_to(3)
print(next(counter))  # 0
print(next(counter))  # 1
print(next(counter))  # 2
# next(counter) would raise StopIteration

# Generator expression (lazy)
nums = [1, 2, 3, 4, 5]
gen = (x**2 for x in nums)
print(list(gen))  # [1, 4, 9, 16, 25]

# Infinite generator — no memory issue!
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print([next(fib) for _ in range(8)])
# [0, 1, 1, 2, 3, 5, 8, 13]`,
        output: `0
1
2
[1, 4, 9, 16, 25]
[0, 1, 1, 2, 3, 5, 8, 13]`,
        note: "Generators are single-use — once exhausted, you must create a new one. They can't be indexed or rewound."
      }
    ],
    marginNotes: [
      "Generators are lazy — values are produced on demand, not stored. This means O(1) memory for any size sequence.",
      "Generators are single-use. Once exhausted, `next()` raises StopIteration. Create a new one to iterate again.",
      "Generator expressions `(x for x in lst)` are to list comprehensions what range() is to a list — lazy and memory-efficient.",
      "Use generators for pipelines: `sum(x for x in data if x > 0)` — no intermediate list created."
    ],
    commonMistakes: [
      "Trying to index a generator: `gen[0]` — TypeError. Generators aren't sequences, they're iterators.",
      "Reusing an exhausted generator — it's done. Create a new one or convert to a list if you need to iterate multiple times.",
      "Using `yield` and `return value` together — `return` with a value raises StopIteration with that value, which is rarely what you want."
    ],
    relatedTopics: ["List Comprehensions", "Iterators & Iterables", "Functions & Parameters"],
    externalLinks: [
      { label: "Python Docs: Generators", url: "https://docs.python.org/3/tutorial/classes.html#generators" },
      { label: "PEP 255 — Simple Generators", url: "https://peps.python.org/pep-0255/" }
    ],
    mcqs: [
      {
        question: "What does a generator function return when called?",
        options: ["The first yielded value", "A generator object", "A list", "None"],
        answer: 1,
        explanations: ["It doesn't run yet.", "Correct — calling a generator function returns a generator object, not a value. Values come from next().", "It's lazy, no list.", "It returns a generator object."],
        difficulty: "medium"
      },
      {
        question: "What happens when a generator is exhausted and you call next() again?",
        options: ["It restarts", "StopIteration is raised", "It returns None", "It loops forever"],
        answer: 1,
        explanations: ["Generators are single-use.", "Correct — once the generator function returns, next() raises StopIteration.", "It raises, not returns.", "It stops."],
        difficulty: "medium"
      },
      {
        question: "What is the main advantage of a generator over a list?",
        options: ["It's faster for indexing", "It uses O(1) memory — values produced on demand", "It can be reused", "It supports random access"],
        answer: 1,
        explanations: ["Generators don't support indexing.", "Correct — generators produce values lazily, so they use constant memory regardless of sequence size.", "They're single-use.", "No random access."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "decorators",
    title: "Decorators",
    difficulty: "hard",
    definition: "A decorator is a function that takes another function and extends its behavior without modifying it — applied with @decorator syntax above the function. Decorators are higher-order functions that wrap the original. They are used for logging, timing, authentication, caching (functools.lru_cache), and framework routing (Flask, Django).",
    coreUnderstanding: "A decorator is just syntactic sugar. `@decorator` above `def f():` is equivalent to `f = decorator(f)` — it passes the function to the decorator and rebinds the name to the result. The decorator returns a new function (usually a wrapper) that calls the original, adding behavior before/after. This is how Flask routes work: `@app.route('/')` registers the function. The key insight: decorators run at definition time, not call time. Use functools.wraps to preserve the original function's metadata.",
    howItWorks: "1. A decorator is a function that takes a function and returns a (usually new) function.\n2. `@decorator` above `def f():` is sugar for `f = decorator(f)` — it runs at definition time.\n3. The wrapper function typically takes *args, **kwargs to accept any arguments the original takes.\n4. `functools.wraps(original)` copies the original's name, docstring, etc. to the wrapper — always use it.\n5. Decorators with arguments need three levels: `def decorator(arg): def wrapper(func): def inner(*args): ...`.\n6. Stacked decorators apply bottom-up: `@a @b def f():` means `f = a(b(f))`.",
    codeExamples: [
      {
        lang: "python",
        code: `import functools

# A timing decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        import time
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

print(slow_sum(1000000))
# slow_sum took 0.0352s
# 499999500000

# Built-in: lru_cache for memoization
from functools import lru_cache

@lru_cache(maxsize=128)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

print(fib(100))  # 354224848179261915075 — instant!`,
        output: `slow_sum took 0.0352s
499999500000
354224848179261915075`,
        note: "Always use @functools.wraps in your decorators — without it, the wrapped function loses its name and docstring."
      }
    ],
    marginNotes: [
      "`@decorator` is sugar for `f = decorator(f)`. It runs at definition time, not call time.",
      "Always use `@functools.wraps(func)` in your wrapper — it preserves the original function's name, docstring, and signature.",
      "Decorators with arguments need three nested function levels: `def deco(arg): def wrapper(func): def inner(*a, **kw): ...`.",
      "Stacked decorators apply bottom-up: `@a @b def f():` = `f = a(b(f))`. b wraps first, then a wraps that."
    ],
    commonMistakes: [
      "Forgetting `@functools.wraps` — the wrapper function loses the original's name and docstring.",
      "Forgetting to return the wrapper function from the decorator — the decorator must return a callable.",
      "Confusing decorator-with-arguments nesting: it needs three levels, not two."
    ],
    relatedTopics: ["Functions & Parameters", "Lambda & Higher-Order Functions", "functools Module"],
    externalLinks: [
      { label: "Python Docs: Decorators", url: "https://docs.python.org/3/glossary.html#term-decorator" },
      { label: "PEP 318 — Decorators", url: "https://peps.python.org/pep-0318/" }
    ],
    mcqs: [
      {
        question: "What is `@decorator` above `def f():` equivalent to?",
        options: ["f = decorator()", "f = decorator(f)", "f.decorator()", "decorator.f = f"],
        answer: 1,
        explanations: ["Missing the function argument.", "Correct — @decorator is sugar for f = decorator(f), applied at definition time.", "Not a method call.", "Not attribute assignment."],
        difficulty: "medium"
      },
      {
        question: "Why use `@functools.wraps` in a decorator?",
        options: ["To make it faster", "To preserve the original function's name and docstring", "To allow arguments", "To cache results"],
        answer: 1,
        explanations: ["wraps doesn't affect speed.", "Correct — without wraps, the wrapper replaces the original's metadata with its own.", "That's *args/**kwargs.", "That's lru_cache."],
        difficulty: "medium"
      },
      {
        question: "How many nesting levels does a decorator WITH arguments need?",
        options: ["One", "Two", "Three", "Four"],
        answer: 2,
        explanations: ["That's a simple decorator.", "That's a decorator without args.", "Correct — decorator(arg) -> wrapper(func) -> inner(*args, **kwargs).", "Too many."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "error-handling",
    title: "Error Handling: try/except/finally",
    difficulty: "medium",
    definition: "Python exceptions are caught with try/except/else/finally. except catches specific exception types (catch most specific first). else runs if no exception occurred. finally always runs (cleanup). raise throws an exception. Unlike Java, all Python exceptions are unchecked — you're never forced to catch or declare them.",
    coreUnderstanding: "Python's exception handling is simpler than Java's: all exceptions are unchecked, so you're never forced to declare or catch them. The try/except/else/finally structure is powerful: try the risky code, except catches specific errors, else runs only on success (no exception), and finally always runs for cleanup. Catch specific exceptions, not bare `except:` — catching everything hides bugs. You can raise your own exceptions with `raise ValueError('message')`.",
    howItWorks: "1. `try:` — the code that might raise an exception.\n2. `except SomeError as e:` — catches that specific exception. Catch specific types, not bare except.\n3. `else:` — runs only if NO exception occurred. Good for code that shouldn't be in the try block.\n4. `finally:` — ALWAYS runs, whether or not an exception occurred. Used for cleanup (closing files).\n5. `raise Exception('msg')` — throws an exception. `raise` alone re-raises the current one.\n6. Multiple excepts: catch specific first, general last. `except (A, B):` catches multiple types.",
    codeExamples: [
      {
        lang: "python",
        code: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError as e:
        print(f"Error: {e}")
        return None
    except TypeError:
        print("Need numbers, not strings")
        return None
    else:
        print(f"Result: {result}")
        return result
    finally:
        print("Division attempt complete")

safe_divide(10, 2)   # Result: 5.0, Division attempt complete
safe_divide(10, 0)   # Error: division by zero, Division attempt complete

# Raising your own
def check_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

try:
    check_age(-5)
except ValueError as e:
    print(f"Invalid: {e}")  # Invalid: Age cannot be negative`,
        output: `Result: 5.0
Division attempt complete
Error: division by zero
Division attempt complete
Invalid: Age cannot be negative`,
        note: "Catch specific exceptions, not bare `except:`. A bare except catches everything including KeyboardInterrupt, hiding bugs."
      }
    ],
    marginNotes: [
      "Never use bare `except:` — it catches everything including KeyboardInterrupt and SystemExit, hiding bugs. Use `except Exception:` at minimum.",
      "`else` runs only if no exception — put code that shouldn't be in the try block there to keep the try block minimal.",
      "`finally` always runs, even if an exception is uncaught or a return is hit. Use it for cleanup (closing files, releasing locks).",
      "`raise` alone (no argument) re-raises the current exception — useful in an except block to log and rethrow."
    ],
    commonMistakes: [
      "Using bare `except:` — catches everything, hiding bugs and making Ctrl+C not work.",
      "Catching too general an exception (Exception) when a specific one (ValueError) would do.",
      "Forgetting that `finally` runs even if you `return` in the try or except block."
    ],
    relatedTopics: ["Exception Hierarchy", "Context Managers", "File Handling"],
    externalLinks: [
      { label: "Python Docs: Exceptions", url: "https://docs.python.org/3/tutorial/errors.html" },
      { label: "Python Docs: Built-in Exceptions", url: "https://docs.python.org/3/library/exceptions.html" }
    ],
    mcqs: [
      {
        question: "When does the `else` block of a try/except/else run?",
        options: ["Always", "Only if no exception occurred", "Only if an exception occurred", "Never"],
        answer: 1,
        explanations: ["That's finally.", "Correct — else runs only if the try block completed without raising.", "That's except.", "It does run."],
        difficulty: "medium"
      },
      {
        question: "Why is bare `except:` dangerous?",
        options: ["It's a syntax error", "It catches everything including KeyboardInterrupt", "It's too slow", "It doesn't catch anything"],
        answer: 1,
        explanations: ["It's valid syntax.", "Correct — bare except catches all exceptions, hiding bugs and preventing Ctrl+C.", "Speed isn't the issue.", "It catches everything."],
        difficulty: "medium"
      },
      {
        question: "What does `finally` guarantee?",
        options: ["It runs only on success", "It always runs, regardless of exceptions", "It runs only on error", "It runs before try"],
        answer: 1,
        explanations: ["That's else.", "Correct — finally always executes, even with uncaught exceptions or returns.", "That's except.", "It runs after try."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "file-handling",
    title: "File Handling & Context Managers",
    difficulty: "medium",
    definition: "Files are opened with open(path, mode) and must be closed. The with statement (context manager) auto-closes the file even if an exception occurs — always prefer it. Modes: 'r' (read), 'w' (write/truncate), 'a' (append), 'b' (binary). Files are iterable line by line, which is memory-efficient for large files.",
    coreUnderstanding: "File handling in Python is straightforward but has one critical rule: always use `with open(...) as f:`. The with statement guarantees the file is closed even if an exception occurs — without it, you risk leaking file descriptors. Files are iterable line by line, which is the memory-efficient way to process large files: `for line in f:` reads one line at a time, not the whole file. For text files, always specify encoding='utf-8' to avoid platform-dependent defaults.",
    howItWorks: "1. `open(path, mode)` — returns a file object. Modes: 'r' (read), 'w' (write/truncate), 'a' (append), 'b' (binary), '+' (read+write).\n2. `with open(path) as f:` — context manager, auto-closes. ALWAYS use this.\n3. `f.read()` — reads entire file. `f.readline()` — one line. `f.readlines()` — list of lines.\n4. `for line in f:` — iterates line by line. Memory-efficient for large files.\n5. `f.write(s)` — writes string (no newline added). `f.writelines(list)` — writes each item.\n6. Always specify `encoding='utf-8'` for text files — the default varies by OS.",
    codeExamples: [
      {
        lang: "python",
        code: `# Writing
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("First line\\n")
    f.write("Second line\\n")

# Reading line by line (memory-efficient)
with open("notes.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.rstrip())  # rstrip removes trailing newline

# Read all at once (small files only)
with open("notes.txt", encoding="utf-8") as f:
    content = f.read()
    print(repr(content))

# Append
with open("notes.txt", "a", encoding="utf-8") as f:
    f.write("Third line\\n")`,
        output: `First line
Second line
'First line\\nSecond line\\n'`,
        note: "Always use `with open(...)` and specify `encoding='utf-8'`. The with statement auto-closes even on exceptions."
      }
    ],
    marginNotes: [
      "Always use `with open(...) as f:` — it auto-closes the file even if an exception occurs. No more leaked file handles.",
      "Always specify `encoding='utf-8'` for text files. The default encoding varies by OS and causes bugs when moving code between systems.",
      "`for line in f:` is memory-efficient — it reads one line at a time. `f.read()` loads the entire file into memory.",
      "Files are iterable: `for line in open('file'):` works, but use `with` to ensure closing."
    ],
    commonMistakes: [
      "Using `open()` without `with` — if an exception occurs, the file isn't closed, leaking a file descriptor.",
      "Forgetting `encoding='utf-8'` — the default varies by OS, causing UnicodeDecodeError when moving code.",
      "Using `f.read()` on a huge file — loads everything into memory. Use `for line in f:` instead."
    ],
    relatedTopics: ["Context Managers", "Error Handling", "JSON Handling"],
    externalLinks: [
      { label: "Python Docs: Reading & Writing Files", url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" },
      { label: "Python Docs: open()", url: "https://docs.python.org/3/library/functions.html#open" }
    ],
    mcqs: [
      {
        question: "Why use `with open(...) as f:` instead of `f = open(...)`?",
        options: ["It's faster", "It auto-closes the file even on exceptions", "It reads the whole file", "It's required syntax"],
        answer: 1,
        explanations: ["Speed isn't the reason.", "Correct — the with statement guarantees the file is closed, even if an exception occurs.", "It doesn't read anything.", "You can use open() without with."],
        difficulty: "easy"
      },
      {
        question: "What is the memory-efficient way to process a large file?",
        options: ["f.read()", "f.readlines()", "for line in f:", "f.read().split()"],
        answer: 2,
        explanations: ["Loads everything into memory.", "Loads all lines into a list.", "Correct — iterating line by line reads one line at a time, using O(1) memory.", "Loads everything then splits."],
        difficulty: "medium"
      },
      {
        question: "Why should you always specify `encoding='utf-8'`?",
        options: ["It's faster", "The default encoding varies by OS", "It's required", "It compresses the file"],
        answer: 1,
        explanations: ["Encoding doesn't affect speed much.", "Correct — the default encoding differs between Windows (cp1252) and Linux (utf-8), causing bugs.", "It's not required but recommended.", "No compression."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "classes-and-objects",
    title: "Classes & Objects",
    difficulty: "medium",
    definition: "A class is a blueprint for objects, defined with the class keyword. __init__ is the constructor called when an object is created. self refers to the current instance (explicitly passed as the first parameter). Instance attributes are set in __init__; class attributes are shared across all instances. Python supports inheritance, polymorphism, and encapsulation.",
    coreUnderstanding: "Python classes are simpler than Java/C++ — there are no true private members (convention: _protected, __mangled). `self` is explicit (unlike Java's implicit `this`), meaning you must declare it as the first parameter of every method. Instance attributes are set in __init__ (the constructor). Class attributes are shared across all instances — useful for constants and counters. Python supports multiple inheritance and duck typing: if it walks like a duck, it's a duck — no need for interfaces.",
    howItWorks: "1. `class ClassName:` — defines a class. By convention, CamelCase names.\n2. `__init__(self, ...)` — the constructor, called when you create an instance: `obj = ClassName(args)`.\n3. `self` — refers to the current instance. Must be the first parameter of every method. Passed automatically.\n4. Instance attributes: `self.x = value` in __init__. Each instance has its own copy.\n5. Class attributes: defined directly in the class body. Shared across all instances.\n6. Methods: `def method(self, args):` — called as `obj.method(args)`, self is passed automatically.\n7. `__str__` — controls how the object prints. `__repr__` — developer representation.",
    codeExamples: [
      {
        lang: "python",
        code: `class Dog:
    # Class attribute — shared by all instances
    species = "Canis familiaris"

    def __init__(self, name, age):
        # Instance attributes — unique per instance
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} says Woof!"

    def __str__(self):
        return f"Dog(name={self.name}, age={self.age})"

# Creating instances
buddy = Dog("Buddy", 3)
rex = Dog("Rex", 5)

print(buddy.bark())  # Buddy says Woof!
print(buddy)         # Dog(name=Buddy, age=3)
print(buddy.species) # Canis familiaris (class attr)
print(Dog.species)   # Canis familiaris (via class)`,
        output: `Buddy says Woof!
Dog(name=Buddy, age=3)
Canis familiaris
Canis familiaris`,
        note: "self is explicit in Python — you must declare it as the first parameter, but it's passed automatically when you call obj.method()."
      }
    ],
    marginNotes: [
      "`self` is explicit in Python — you must declare it as the first parameter of every method, but Python passes it automatically.",
      "There are no truly private attributes. `_name` is convention for 'protected', `__name` triggers name mangling (not true privacy).",
      "Class attributes are shared across all instances. Instance attributes (set in __init__) are per-object.",
      "Duck typing: you don't need interfaces. If an object has the methods you call, it works — no type check needed."
    ],
    commonMistakes: [
      "Forgetting `self` as the first parameter of a method — `def bark():` instead of `def bark(self):`.",
      "Confusing class attributes with instance attributes — class attrs are shared, instance attrs are per-object.",
      "Expecting `__init__` to return a value — it must return None. The new instance is returned by `__new__`."
    ],
    relatedTopics: ["Inheritance & super()", "Magic Methods", "Properties"],
    externalLinks: [
      { label: "Python Docs: Classes", url: "https://docs.python.org/3/tutorial/classes.html" },
      { label: "Python Docs: __init__", url: "https://docs.python.org/3/reference/datamodel.html#object.__init__" }
    ],
    mcqs: [
      {
        question: "What is `self` in a Python method?",
        options: ["The class itself", "The current instance", "A global variable", "The parent class"],
        answer: 1,
        explanations: ["That's cls (in classmethods).", "Correct — self refers to the current instance, like `this` in Java but explicit.", "It's not global.", "That's super()."],
        difficulty: "easy"
      },
      {
        question: "How are class attributes different from instance attributes?",
        options: ["They're the same", "Class attrs are shared across all instances; instance attrs are per-object", "Class attrs are private", "Instance attrs are static"],
        answer: 1,
        explanations: ["They're different.", "Correct — class attributes are defined in the class body and shared; instance attributes are set in __init__ per object.", "Privacy is convention-based.", "Instance attrs are per-object."],
        difficulty: "medium"
      },
      {
        question: "Does Python have truly private attributes?",
        options: ["Yes, using private keyword", "No — convention only (_name, __name mangling)", "Yes, using sealed", "Only in dataclasses"],
        answer: 1,
        explanations: ["No private keyword in Python.", "Correct — Python uses convention: _name is 'protected', __name triggers name mangling but isn't truly private.", "No sealed keyword.", "Dataclasses don't add privacy."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "inheritance",
    title: "Inheritance & super()",
    difficulty: "medium",
    definition: "A subclass inherits from a parent class: class Dog(Animal). It gets all the parent's methods and can override them. super() calls the parent's version of a method — essential in __init__ to ensure the parent is properly initialized. Python supports multiple inheritance (class C(A, B)) with MRO (Method Resolution Order) determining method lookup order.",
    coreUnderstanding: "Inheritance lets you build specialized classes from general ones. `super()` is the key: it calls the parent's method, which is critical in __init__ — if you don't call super().__init__(), the parent's attributes won't be set. Python supports multiple inheritance, which is powerful but complex: the MRO (Method Resolution Order) determines which parent's method is called when there's a conflict. Use `ClassName.__mro__` to see the order. The diamond problem (A->B, A->C, B+C->D) is solved by C3 linearization.",
    howItWorks: "1. `class Child(Parent):` — Child inherits all methods and attributes from Parent.\n2. `super().__init__(args)` — calls the parent's constructor. Essential to initialize parent attributes.\n3. Override: define a method with the same name in the child — it replaces the parent's version.\n4. `super().method()` — calls the parent's version from within an override.\n5. Multiple inheritance: `class C(A, B):` — C inherits from both A and B. MRO determines method lookup.\n6. `ClassName.__mro__` or `ClassName.mro()` — shows the method resolution order (C3 linearization).\n7. `isinstance(obj, Class)` — checks if obj is an instance of Class or any of its parents.",
    codeExamples: [
      {
        lang: "python",
        code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # call parent's __init__
        self.breed = breed

    def speak(self):  # override
        return f"{self.name} (a {self.breed}) says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

buddy = Dog("Buddy", "Labrador")
print(buddy.speak())  # Buddy (a Labrador) says Woof!
print(isinstance(buddy, Animal))  # True

# Multiple inheritance
class WorkingDog(Dog):
    def work(self):
        return f"{self.name} is working"

wd = WorkingDog("Rex", "Shepherd")
print(wd.speak())  # Rex (a Shepherd) says Woof!
print(WorkingDog.__mro__)
# (WorkingDog, Dog, Animal, object)`,
        output: `Buddy (a Labrador) says Woof!
True
Rex (a Shepherd) says Woof!
(<class 'WorkingDog'>, <class 'Dog'>, <class 'Animal'>, <class 'object'>)`,
        note: "Always call super().__init__() in a child's __init__ — otherwise the parent's attributes won't be set."
      }
    ],
    marginNotes: [
      "Always call `super().__init__()` in a child's __init__ — otherwise the parent's attributes won't be initialized.",
      "Python supports multiple inheritance. The MRO (Method Resolution Order) uses C3 linearization to handle the diamond problem.",
      "Check `ClassName.__mro__` to see the method lookup order. It's a tuple of classes from the class itself to `object`.",
      "`isinstance(obj, Class)` checks the full inheritance chain, unlike `type(obj) is Class` which is exact only."
    ],
    commonMistakes: [
      "Forgetting `super().__init__()` in a child class — parent attributes aren't set, causing AttributeError later.",
      "Using multiple inheritance carelessly — the diamond problem can cause unexpected method resolution.",
      "Confusing `isinstance()` (checks inheritance chain) with `type() is` (exact type only)."
    ],
    relatedTopics: ["Classes & Objects", "Magic Methods", "Class Methods & Static Methods"],
    externalLinks: [
      { label: "Python Docs: Inheritance", url: "https://docs.python.org/3/tutorial/classes.html#inheritance" },
      { label: "Python Docs: super()", url: "https://docs.python.org/3/library/functions.html#super" }
    ],
    mcqs: [
      {
        question: "Why must you call `super().__init__()` in a child class?",
        options: ["It's required syntax", "To initialize the parent's attributes", "To create the object", "To call methods"],
        answer: 1,
        explanations: ["It's not required syntax.", "Correct — without it, the parent's __init__ never runs, so parent attributes aren't set.", "The object is created by __new__.", "Methods work without it, but parent attrs don't."],
        difficulty: "medium"
      },
      {
        question: "What does MRO stand for and what does it solve?",
        options: ["Method Resolution Order — determines method lookup in multiple inheritance", "Memory Reference Object", "Method Return Order", "Module Resolution Order"],
        answer: 0,
        explanations: ["Correct — MRO uses C3 linearization to determine which parent's method is called.", "Not a real term here.", "Not a real term.", "Not a real term."],
        difficulty: "medium"
      },
      {
        question: "What does `isinstance(buddy, Animal)` return if buddy is a Dog (subclass of Animal)?",
        options: ["False", "True", "Error", "None"],
        answer: 1,
        explanations: ["It checks the chain.", "Correct — isinstance checks the full inheritance chain, so a Dog is an Animal.", "No error.", "It returns a bool."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "magic-methods",
    title: "Magic Methods (Dunder Methods)",
    difficulty: "hard",
    definition: "Dunder methods (double underscore) define how objects behave with built-in operations: __init__ (construction), __str__ (string representation), __repr__ (developer representation), __len__, __eq__, __lt__, __add__, __getitem__, __iter__, __call__, and many more. Implementing these makes your custom objects work naturally with Python syntax and built-in functions.",
    coreUnderstanding: "Dunder methods are Python's operator overloading and protocol system. When you write `len(obj)`, Python calls `obj.__len__()`. When you write `a + b`, Python calls `a.__add__(b)`. When you write `for x in obj`, Python calls `obj.__iter__()`. By implementing these methods, your custom objects integrate seamlessly with Python's syntax and built-in functions. The most common are __init__ (constructor), __str__/__repr__ (string representation), __eq__/__lt__ (comparisons), and __getitem__ (indexing).",
    howItWorks: "1. `__init__(self, ...)` — constructor, called when the object is created.\n2. `__str__(self)` — human-readable string, used by str() and print().\n3. `__repr__(self)` — developer representation, used by repr() and in the REPL. Should be unambiguous.\n4. `__eq__(self, other)` — equality (==). `__lt__`, `__le__`, `__gt__`, `__ge__` — comparisons.\n5. `__add__(self, other)` — addition (+). Similarly __sub__, __mul__, etc.\n6. `__getitem__(self, key)` — indexing (obj[key]). `__setitem__` — assignment (obj[key] = val).\n7. `__iter__(self)` — makes the object iterable. `__len__` — len(obj). `__call__` — obj() as a function.",
    codeExamples: [
      {
        lang: "python",
        code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __abs__(self):
        return (self.x**2 + self.y**2) ** 0.5

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1)           # Vector(3, 4) — uses __repr__
print(v1 + v2)      # Vector(4, 6) — uses __add__
print(v1 == Vector(3, 4))  # True — uses __eq__
print(abs(v1))      # 5.0 — uses __abs__`,
        output: `Vector(3, 4)
Vector(4, 6)
True
5.0`,
        note: "__repr__ should give an unambiguous representation (ideally valid Python code to recreate the object). __str__ is for users, __repr__ is for developers."
      }
    ],
    marginNotes: [
      "`__repr__` should be unambiguous (ideally `eval(repr(obj)) == obj`). `__str__` is for users, `__repr__` for developers.",
      "If you only implement one of __str__/__repr__, Python falls back to __repr__ for both. So implement __repr__ at minimum.",
      "Dunder methods are how Python does operator overloading. `a + b` calls `a.__add__(b)`.",
      "Don't call dunder methods directly: use `len(obj)` not `obj.__len__()`, `str(obj)` not `obj.__str__()`."
    ],
    commonMistakes: [
      "Implementing __str__ but not __repr__ — the REPL and debugging show an ugly default. Always implement __repr__.",
      "Calling dunder methods directly (`obj.__len__()`) — use the built-in (`len(obj)`) instead.",
      "Forgetting to return a value from comparison methods — `__eq__` must return True/False, not None."
    ],
    relatedTopics: ["Classes & Objects", "Properties", "Dataclasses"],
    externalLinks: [
      { label: "Python Docs: Special Methods", url: "https://docs.python.org/3/reference/datamodel.html#special-method-names" },
      { label: "Python Guide: Dunder Methods", url: "https://docs.python.org/3/reference/datamodel.html#basic-customization" }
    ],
    mcqs: [
      {
        question: "What does `a + b` call under the hood?",
        options: ["a.add(b)", "a.__add__(b)", "a.__plus__(b)", "a.sum(b)"],
        answer: 1,
        explanations: ["Not a real method.", "Correct — the + operator calls the __add__ dunder method.", "Not a real dunder.", "Not a real method."],
        difficulty: "medium"
      },
      {
        question: "Which should you always implement: __str__ or __repr__?",
        options: ["__str__ only", "__repr__ only", "__repr__ at minimum (falls back for __str__)", "Neither"],
        answer: 2,
        explanations: ["__str__ alone leaves ugly REPL output.", "__repr__ alone is fine.", "Correct — if you only implement one, __repr__ is used as fallback for both.", "You need at least __repr__."],
        difficulty: "medium"
      },
      {
        question: "How should you call the length dunder method?",
        options: ["obj.__len__()", "len(obj)", "obj.length()", "size(obj)"],
        answer: 1,
        explanations: ["Don't call dunders directly.", "Correct — use the built-in len(), which calls __len__ internally.", "Not a Python method.", "Not a built-in."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "properties",
    title: "Properties (@property)",
    difficulty: "medium",
    definition: "The @property decorator turns a method into a computed attribute — access it like a field (obj.x) but the method runs behind the scenes. @x.setter defines the assignment behavior. Properties let you add validation, computed fields, or change internal representation without breaking the public API — callers still use obj.x.",
    coreUnderstanding: "Properties are Python's way of having getter/setter methods that look like plain attribute access. This is better than Java-style getX()/setX() because the calling code is clean: `obj.x` instead of `obj.get_x()`. The real power: you can start with a plain attribute, then later add validation or computed logic by converting it to a property — without changing any calling code. @property defines the getter, @x.setter defines the setter, @x.deleter defines the deleter.",
    howItWorks: "1. `@property` above a method — makes it a getter. Access as `obj.x`, not `obj.x()`.\n2. `@x.setter` above a method — defines the setter. `obj.x = value` calls it.\n3. `@x.deleter` — defines the deleter. `del obj.x` calls it.\n4. The method name must match across getter/setter/deleter.\n5. Properties let you validate on assignment: `if value < 0: raise ValueError(...)`.\n6. Read-only property: define @property without a setter — assignment raises AttributeError.",
    codeExamples: [
      {
        lang: "python",
        code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius  # goes through the setter!

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32  # computed, read-only

t = Temperature(25)
print(t.celsius)     # 25.0 — uses getter
print(t.fahrenheit)  # 77.0 — computed property

t.celsius = 30       # uses setter
print(t.fahrenheit)  # 86.0

try:
    t.celsius = -300  # ValueError!
except ValueError as e:
    print(e)  # Below absolute zero!`,
        output: `25.0
77.0
86.0
Below absolute zero!`,
        note: "The internal value is stored in _celsius (with underscore). The property is celsius (no underscore). This avoids infinite recursion."
      }
    ],
    marginNotes: [
      "Properties let you start with a plain attribute and later add validation/computation without changing calling code — the API stays `obj.x`.",
      "Store the internal value with a leading underscore (`self._x`) to avoid infinite recursion in the property getter/setter.",
      "A property without a setter is read-only — assignment raises AttributeError.",
      "Don't overuse properties for everything. Use them when you need validation, computation, or controlled access."
    ],
    commonMistakes: [
      "Forgetting the leading underscore on the internal attribute — causes infinite recursion in the getter.",
      "Defining @property without @x.setter and then trying to assign — AttributeError.",
      "Using properties for everything when plain attributes suffice — over-engineering."
    ],
    relatedTopics: ["Classes & Objects", "Decorators", "Dataclasses"],
    externalLinks: [
      { label: "Python Docs: property()", url: "https://docs.python.org/3/library/functions.html#property" },
      { label: "Python Guide: Properties", url: "https://docs.python.org/3/howto/descriptor.html#properties" }
    ],
    mcqs: [
      {
        question: "What does @property do?",
        options: ["Makes a method private", "Turns a method into a computed attribute accessed without ()", "Caches the result", "Creates a class attribute"],
        answer: 1,
        explanations: ["It doesn't make things private.", "Correct — @property lets you access a method like an attribute: obj.x not obj.x().", "That's lru_cache.", "It's an instance-level descriptor."],
        difficulty: "medium"
      },
      {
        question: "How do you make a property read-only?",
        options: ["Use @readonly", "Define @property without a @x.setter", "Use private keyword", "Use __read_only__"],
        answer: 1,
        explanations: ["Not a real decorator.", "Correct — a property without a setter raises AttributeError on assignment.", "No private keyword in Python.", "Not a real dunder."],
        difficulty: "medium"
      },
      {
        question: "Why store the internal value as `_x` (with underscore)?",
        options: ["Convention for private", "To avoid infinite recursion in the property getter/setter", "It's required", "For performance"],
        answer: 1,
        explanations: ["Underscore is convention, but not the reason here.", "Correct — if the property is named x and stores in self.x, the getter calls itself infinitely.", "It's not required by syntax.", "No performance difference."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "modules-and-packages",
    title: "Modules & Packages",
    difficulty: "medium",
    definition: "A module is a .py file; a package is a directory of modules with an __init__.py. import, from...import, and import...as control what you bring in. The standard library is a rich set of modules (os, sys, json, datetime, collections, itertools). Third-party packages are installed via pip from PyPI. Virtual environments isolate dependencies per project.",
    coreUnderstanding: "Python's module system is simple: every .py file is a module, and directories with __init__.py are packages. When you `import math`, Python executes the module's code and makes its namespace available. Imports are cached in sys.modules — a module is only loaded once, no matter how many times you import it. The standard library is huge and batteries-included. Third-party packages live on PyPI and are installed with pip. Use virtual environments to isolate project dependencies.",
    howItWorks: "1. `import module` — loads the module, access as `module.name`.\n2. `from module import name` — imports specific names directly.\n3. `import module as alias` — renames for convenience (`import numpy as np`).\n4. `from module import *` — imports everything (discouraged — pollutes namespace).\n5. A package is a directory with `__init__.py`. Subpackages: `package.sub.module`.\n6. `if __name__ == '__main__':` — code runs only when the file is executed directly, not when imported.\n7. `sys.modules` — dict of all loaded modules. `sys.path` — list of search paths for imports.",
    codeExamples: [
      {
        lang: "python",
        code: `# Different import styles
import math
print(math.pi)  # 3.141592653589793

from datetime import datetime
print(datetime.now())

import json as j
print(j.dumps({"a": 1}))  # {"a": 1}

# __name__ == '__main__' pattern
# In mymodule.py:
"""
def greet(name):
    return f"Hello, {name}"

if __name__ == '__main__':
    print(greet("World"))  # runs only when executed directly
"""
# When imported: greet is available, but the print doesn't run

# Standard library tour
import os, sys, random, collections
print(os.getcwd())           # current directory
print(sys.version)           # Python version
print(random.randint(1, 10)) # random int
print(collections.Counter("aabbbcc"))
# Counter({'b': 3, 'a': 2, 'c': 2})`,
        output: `3.141592653589793
2024-01-15 10:30:00.123456
{"a": 1}
/home/user/project
3.12.0
7
Counter({'b': 3, 'a': 2, 'c': 2})`,
        note: "Use `if __name__ == '__main__':` to make modules that can be both imported and run as scripts."
      }
    ],
    marginNotes: [
      "Every .py file is a module. A directory with __init__.py is a package.",
      "Modules are loaded once and cached in sys.modules — repeated imports are free.",
      "`if __name__ == '__main__':` lets a file be both importable (as a module) and runnable (as a script).",
      "Avoid `from module import *` — it pollutes the namespace and makes it unclear where names come from."
    ],
    commonMistakes: [
      "Using `from module import *` — pollutes the namespace and hides where names come from.",
      "Circular imports: module A imports B, B imports A — causes ImportError. Refactor to break the cycle.",
      "Forgetting `if __name__ == '__main__':` — code runs on import, which is usually not what you want."
    ],
    relatedTopics: ["Virtual Environments & pip", "Type Hints", "Collections Module"],
    externalLinks: [
      { label: "Python Docs: Modules", url: "https://docs.python.org/3/tutorial/modules.html" },
      { label: "Python Docs: sys.path", url: "https://docs.python.org/3/library/sys.html#sys.path" }
    ],
    mcqs: [
      {
        question: "What is a package in Python?",
        options: ["A .py file", "A directory with __init__.py", "A pip install", "A zip file"],
        answer: 1,
        explanations: ["That's a module.", "Correct — a package is a directory containing an __init__.py file (which can be empty).", "That's an installation.", "Not the definition."],
        difficulty: "easy"
      },
      {
        question: "What does `if __name__ == '__main__':` do?",
        options: ["Runs code always", "Runs code only when the file is executed directly, not when imported", "Makes it a module", "Imports the module"],
        answer: 1,
        explanations: ["That's top-level code.", "Correct — __name__ is '__main__' only when the file is run directly, not when imported.", "It's already a module.", "It doesn't import."],
        difficulty: "medium"
      },
      {
        question: "Why avoid `from module import *`?",
        options: ["It's slow", "It pollutes the namespace and hides name origins", "It's a syntax error", "It doesn't work"],
        answer: 1,
        explanations: ["Speed isn't the issue.", "Correct — it dumps all names into your namespace, causing conflicts and unclear origins.", "It's valid syntax.", "It works but is discouraged."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "virtual-environments",
    title: "Virtual Environments & pip",
    difficulty: "easy",
    definition: "A virtual environment (venv) is an isolated Python installation that keeps project dependencies separate. You create one with python -m venv .venv, activate it, then pip install packages into it. This prevents version conflicts between projects. requirements.txt or pyproject.toml record dependencies for reproducibility.",
    coreUnderstanding: "Without virtual environments, every Python project on your machine shares the same global package directory. If project A needs Django 3 and project B needs Django 4, you have a conflict. Virtual environments solve this: each project gets its own isolated Python with its own packages. You create one, activate it (the prompt changes), install packages into it, and they stay isolated. Always use a venv — never pip install globally.",
    howItWorks: "1. `python -m venv .venv` — creates a virtual environment in the .venv directory.\n2. Activate: `.venv\\Scripts\\activate` (Windows) or `source .venv/bin/activate` (Unix).\n3. The prompt changes to show the active environment. `which python` points to the venv's Python.\n4. `pip install package` — installs into the venv, not globally.\n5. `pip freeze > requirements.txt` — saves all installed packages and versions.\n6. `pip install -r requirements.txt` — recreates the environment from the file.\n7. `deactivate` — exits the virtual environment.",
    codeExamples: [
      {
        lang: "bash",
        code: `# Create a virtual environment
python -m venv .venv

# Activate it
# On Windows:
.venv\\Scripts\\activate
# On macOS/Linux:
source .venv/bin/activate

# Now pip installs go into .venv, not globally
pip install requests flask

# Save dependencies
pip freeze > requirements.txt
# requirements.txt:
# requests==2.31.0
# flask==3.0.0

# Recreate on another machine
pip install -r requirements.txt

# Deactivate when done
deactivate`,
        output: `(.venv) $ pip install requests
Successfully installed requests-2.31.0
(.venv) $ deactivate
$`,
        note: "Always use a virtual environment. Never `pip install` globally — it can break system tools that depend on Python."
      }
    ],
    marginNotes: [
      "Always use a virtual environment. Never `pip install` globally — it can break system tools that depend on Python.",
      "Add .venv/ to .gitignore. The venv is machine-specific; requirements.txt is what you commit.",
      "`pip freeze > requirements.txt` captures exact versions. Use it for reproducible installs.",
      "Modern alternatives: Poetry and uv handle venv + dependencies + lockfiles in one tool."
    ],
    commonMistakes: [
      "Installing packages globally instead of in a venv — causes version conflicts between projects.",
      "Committing the .venv directory to git — it's machine-specific and huge. Commit requirements.txt instead.",
      "Forgetting to activate the venv before installing — packages go to the global Python."
    ],
    relatedTopics: ["Modules & Packages", "Dependency Management", "Type Hints"],
    externalLinks: [
      { label: "Python Docs: venv", url: "https://docs.python.org/3/library/venv.html" },
      { label: "pip Documentation", url: "https://pip.pypa.io/en/stable/" }
    ],
    mcqs: [
      {
        question: "Why use a virtual environment?",
        options: ["It's faster", "To isolate project dependencies and avoid version conflicts", "It's required by Python", "It improves code quality"],
        answer: 1,
        explanations: ["Speed isn't the reason.", "Correct — each project gets its own isolated packages, preventing conflicts.", "It's not required but strongly recommended.", "It doesn't affect code quality."],
        difficulty: "easy"
      },
      {
        question: "What command creates a virtual environment?",
        options: ["pip create venv", "python -m venv .venv", "venv create", "python venv .venv"],
        answer: 1,
        explanations: ["Not a pip command.", "Correct — python -m venv creates a virtual environment in the specified directory.", "Not a command.", "Missing -m."],
        difficulty: "easy"
      },
      {
        question: "What should you commit to git: the .venv directory or requirements.txt?",
        options: [".venv directory", "requirements.txt", "Both", "Neither"],
        answer: 1,
        explanations: [".venv is machine-specific and huge.", "Correct — requirements.txt records dependencies; the venv is recreated from it.", "Don't commit .venv.", "Commit requirements.txt."],
        difficulty: "medium"
      }
    ]
  }
];