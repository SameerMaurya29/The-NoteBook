// Python — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "language-basics",
  title: "Python Basics — Why & How",
  difficulty: "easy",
  definition: `Python is a high-level, dynamically typed, interpreted language prized for readability. You use it for scripting, data science, machine learning, web backends, automation, and prototyping — anywhere you'd rather express ideas than manage memory.`,
  coreUnderstanding: `Python's design motto is "readability counts." It uses indentation (not braces) to define blocks, so how the code looks is how it's structured. It is batteries-included (a huge standard library) and runs everywhere through the CPython interpreter. You reach for Python when development speed matters more than raw execution speed, or when you're gluing libraries together (NumPy, Pandas, Django, FastAPI). The trade-offs: it's slower than C/Java, and the Global Interpreter Lock (GIL) limits true CPU-level parallelism (use multiprocessing or C extensions to bypass it).`,
  howItWorks: `1. WHY: readable, concise, enormous ecosystem, gentle learning curve. Trade-off: slower execution and the GIL.
2. WHERE: data/ML, automation scripts, web backends (Django/FastAPI), prototyping, teaching. Avoid for hard real-time or ultra-low-latency systems.
3. BLOCKS BY INDENTATION: there are no braces. Indent consistently (4 spaces is the convention). A block ENDS when indentation returns to the previous level — that's how Python knows the block closed.
4. STATEMENTS: most lines end at the newline — no semicolons needed. A \`;\` separates two statements on one line (rare, discouraged). Continue a long line with \`\\\` or wrap it in \`()\`.
5. COLONS open a block: \`if\`, \`for\`, \`while\`, \`def\`, \`class\`, \`with\`, \`try\`, \`else\`, \`elif\` all end with \`:\` then an indented body. De-indenting closes the block.
6. COMMAS separate items: \`[1, 2, 3]\`, function args \`f(a, b)\`, tuples \`(x, y)\`. A trailing comma is allowed and REQUIRED for a one-element tuple: \`(x,)\` (without it, \`(x)\` is just grouped math).
7. FUNCTIONS: \`def name(params):\` then an indented body. Return with \`return\` (or implicitly return \`None\`). Defaults: \`def f(x=10):\`. Keyword calls: \`f(x=5)\`.
8. COMMENTS: \`#\` for a single line. Triple-quoted \`"""..."""\` strings are docstrings (documentation), not block comments.
9. IMPORTS: \`import math\` or \`from math import sqrt\`. Put them at the top of the file.`,
  codeExamples: [
    {
      lang: "python",
      code: `# --- structure: colons open blocks, indentation closes them ---
def greet(name, excited=False):        # colon opens the function body
    msg = f"Hello, {name}"              # indented 4 spaces
    if excited:                         # colon opens the if-block
        msg = msg + "!!!"                # deeper indent
    return msg                          # de-indent closes the if AND the function

print(greet("Ada"))                     # Hello, Ada
print(greet("Ada", excited=True))       # Hello, Ada!!!

# --- commas, tuples, and the one-tuple trap ---
point = (3, 4)        # a 2-tuple
single = (5,)        # a 1-tuple — the comma makes it a tuple
not_a_tuple = (5)    # just the integer 5 (grouped math)

# --- no semicolons needed; one-liner with ; is legal but rare ---
a = 1; b = 2
print(a + b)         # 3`,
      output: `Hello, Ada
Hello, Ada!!!
3`,
      note: "Python uses indentation (not braces) for blocks. Colons open blocks; de-indenting closes them. No semicolons needed. Commas separate items — and a trailing comma makes a 1-tuple."
    }
  ],
  marginNotes: [
    "Indentation IS the syntax. Mixing tabs and spaces breaks the parser — configure your editor to insert 4 spaces for a tab.",
    "A block ends when indentation returns to the previous level. There is no `end` keyword — the de-indent is the close.",
    "The one-tuple trap: `(5)` is just `5`; `(5,)` is a tuple. The comma, not the parentheses, makes the tuple.",
    "Semicolons are almost never used. `a = 1; b = 2` works but is unidiomatic — prefer two lines."
  ],
  commonMistakes: [
    "Inconsistent indentation (tabs mixed with spaces) — IndentationError. Pick spaces and stick to them.",
    "Forgetting the colon after `if`/`for`/`def` — SyntaxError.",
    "Treating `(x)` as a tuple — it's not. You need the trailing comma: `(x,)`."
  ],
  relatedTopics: ["Variables & Dynamic Typing", "Lists, Tuples, Dicts & Sets", "Functions & Scope"],
  externalLinks: [
    { label: "PEP 8 — Style Guide", url: "https://peps.python.org/pep-0008/" },
    { label: "Python Tutorial", url: "https://docs.python.org/3/tutorial/" }
  ],
  mcqs: [
    {
      question: "How does Python delimit a code block?",
      options: ["Curly braces { }", "Indentation — de-indenting closes the block", "begin/end keywords", "Semicolons"],
      answer: 1,
      explanations: ["That's C/Java, not Python.", "Correct — Python uses indentation. A colon opens a block; returning to the previous indent level closes it.", "Python has no begin/end.", "Semicolons end statements in other languages, not blocks in Python."],
      difficulty: "easy"
    },
    {
      question: "Why is `(5)` not a tuple?",
      options: ["Tuples need two elements", "The comma makes a tuple, not the parentheses — `(5)` is just grouped math", "Parentheses are illegal", "It is a tuple"],
      answer: 1,
      explanations: ["A one-element tuple is legal: `(5,)`.", "Correct — the comma creates the tuple. `(5)` is just `5` in parentheses; `(5,)` is a tuple.", "Parentheses are fine.", "It is not — it's the integer 5."],
      difficulty: "medium"
    },
    {
      question: "Where is Python a poor choice?",
      options: ["Data analysis", "Automation scripts", "Hard real-time / ultra-low-latency systems", "Prototyping"],
      answer: 2,
      explanations: ["Python excels at all of these.", "Python is great for automation.", "Correct — Python's interpreter and GC make it unsuitable for hard real-time or ultra-low-latency work; use C/C++/Rust there.", "Prototyping is a core Python use case."],
      difficulty: "medium"
    }
  ]
};