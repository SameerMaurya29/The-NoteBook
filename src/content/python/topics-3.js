// Python topics part 3: Walrus Operator through Dependency Management (topics 34-44)
export default [
  {
    id: "walrus-operator",
    title: "The Walrus Operator (:=)",
    difficulty: "medium",
    definition: "The walrus operator := (Python 3.8+) assigns a value as part of a larger expression, returning the assigned value. It's useful for capturing a value while testing it in one step: if (n := len(data)) > 10: ... This avoids calling the function twice or splitting assignment and condition across lines. Use it where it improves readability, not everywhere.",
    coreUnderstanding: "The walrus operator (named for its appearance: `:=` looks like walrus tusks) is assignment as an expression. Normal assignment (`x = 5`) is a statement — it doesn't return a value. The walrus operator (`x := 5`) is an expression — it assigns AND returns the value, so you can use it inside conditions, while loops, and comprehensions. The main use cases: (1) avoid calling a function twice (assign and check in one step), (2) assignment in while-loop conditions, (3) filtering in comprehensions while keeping the value.",
    howItWorks: "1. `x := 5` — assigns 5 to x AND returns 5 as an expression.\n2. `if (n := len(data)) > 10:` — assigns len(data) to n, then checks n > 10. Avoids calling len twice.\n3. `while (line := file.readline()):` — assign and check in one step. Loop until empty string.\n4. In comprehensions: `[y for x in data if (y := f(x)) > 0]` — filter and keep the computed value.\n5. Parentheses are often needed because := has very low precedence.\n6. Use it where it improves readability — don't force it everywhere.",
    codeExamples: [
      {
        lang: "python",
        code: `import re

# Without walrus — calls len() twice
data = [1, 2, 3, 4, 5]
if len(data) > 3:
    print(f"List has {len(data)} elements")  # len called twice

# With walrus — calls len() once
if (n := len(data)) > 3:
    print(f"List has {n} elements")  # len called once, n reused

# While loop — read until empty
with open("file.txt") as f:
    while (line := f.readline().strip()):
        print(line)  # process each line

# In comprehensions — filter and keep computed value
text = "Hello 123 World 456"
numbers = [int(m) for token in text.split() if (m := re.match(r'\\d+', token))]
print(numbers)  # [123, 456]

# Without walrus, you'd need:
numbers = []
for token in text.split():
    m = re.match(r'\\d+', token)
    if m:
        numbers.append(int(m))`,
        output: `List has 5 elements
List has 5 elements
123
456
[123, 456]`,
        note: "The walrus operator is about avoiding repetition. Use it when you need a value in both an expression and later — don't force it everywhere."
      }
    ],
    marginNotes: [
      "The walrus operator is named for its appearance: `:=` looks like walrus tusks (eyes and teeth).",
      "Use it to avoid calling a function twice: `if (n := len(data)) > 10:` instead of calling len in both the condition and body.",
      "It's great for while loops: `while (line := f.readline()):` — assign and check in one step.",
      "Don't overuse it. Use the walrus where it genuinely improves readability, not everywhere just because you can."
    ],
    commonMistakes: [
      "Overusing the walrus operator — it can make code less readable if used everywhere. Use it where it genuinely helps.",
      "Forgetting parentheses — `:=` has very low precedence, so `if n := len(data) > 3` parses as `n := (len(data) > 3)`.",
      "Using `:=` where a simple assignment would do — `x := 5` at statement level is just `x = 5` with extra syntax."
    ],
    relatedTopics: ["Control Flow", "Loops & Iteration", "List Comprehensions"],
    externalLinks: [
      { label: "PEP 572 — Walrus Operator", url: "https://peps.python.org/pep-0572/" },
      { label: "Python Docs: Assignment Expressions", url: "https://docs.python.org/3/reference/expressions.html#assignment-expressions" }
    ],
    mcqs: [
      {
        question: "What does the walrus operator (:=) do differently from =?",
        options: ["It's faster", ": = is an expression — it assigns AND returns the value", "It only works in loops", "It's for type hints"],
        answer: 1,
        explanations: ["Speed isn't the difference.", "Correct — := is an assignment expression: it assigns the value AND returns it, so it can be used inside other expressions.", "It works anywhere.", "Not for type hints."],
        difficulty: "medium"
      },
      {
        question: "What is a common use case for the walrus operator?",
        options: ["Type checking", "Avoiding calling a function twice (assign and check in one step)", "Creating classes", "Importing modules"],
        answer: 1,
        explanations: ["Not for type checking.", "Correct — `if (n := len(data)) > 10:` calls len once and reuses n, avoiding a second call.", "Not for classes.", "Not for imports."],
        difficulty: "medium"
      },
      {
        question: "Why is it called the walrus operator?",
        options: ["It's fast like a walrus", ":= looks like walrus tusks (eyes and teeth)", "It was created by someone named Walrus", "It's heavy"],
        answer: 1,
        explanations: ["Not about speed.", "Correct — := visually resembles a walrus with tusks (the two dots are eyes, the colon and equals are tusks).", "Not named after a person.", "Not about weight."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "f-strings",
    title: "f-strings & String Formatting",
    difficulty: "easy",
    definition: "f-strings (f\"...\") are the preferred way to embed expressions in strings: f\"Hello {name}\". They support format specs after a colon: f\"{x:.2f}\" (2 decimals), f\"{x:>10}\" (right-align), f\"{x:,}\" (thousands separator). f-strings are faster and more readable than .format() or %-formatting. Since Python 3.12, f-strings can contain any valid Python expression, including nested quotes.",
    coreUnderstanding: "f-strings (introduced in Python 3.6) are the cleanest way to embed expressions in strings. Prefix a string with f and put expressions in {}: f\"Hello {name}, age {age+1}\". After a colon, you can add format specs: f\"{x:.2f}\" for 2 decimal places, f\"{x:>10}\" for right-alignment, f\"{x:,}\" for thousands separators. f-strings are faster than .format() and % formatting because they're evaluated at compile time, not runtime. Since 3.12, you can use any valid expression, including nested quotes.",
    howItWorks: "1. f\"Hello {name}\" — embeds the value of name. Any Python expression works: f\"{a+b}\", f\"{func(x)}\".\n2. Format specs after colon: f\"{x:.2f}\" (2 decimals), f\"{x:>10}\" (right-align, width 10), f\"{x:<10}\" (left-align).\n3. f\"{x:,}\" — thousands separator: f\"{1000000:,}\" = '1,000,000'.\n4. f\"{x:,.2f}\" — combine: thousands separator and 2 decimals.\n5. f\"{x!r}\" — use repr() instead of str(). f\"{x!s}\" — use str().\n6. f\"{x=}\" (3.8+) — debug format: prints x=value. Great for debugging.\n7. Multi-line: f\"\"\"...\"\"\" with f prefix. Expressions can span lines.",
    codeExamples: [
      {
        lang: "python",
        code: [
          "name = \"Alice\"",
          "age = 30",
          "price = 1234.5678",
          "big = 1000000",
          "",
          "# Basic interpolation",
          "print(f\"Hello, {name}! You are {age} years old.\")",
          "",
          "# Expressions",
          "print(f\"Next year: {age + 1}\")",
          "print(f\"Name length: {len(name)}\")",
          "",
          "# Format specs",
          "print(f\"Price: \\${price:.2f}\")     # 2 decimals",
          "print(f\"Price: \\${price:>10.2f}\")  # right-align, width 10",
          "print(f\"Big: {big:,}\")            # thousands: 1,000,000",
          "print(f\"Big: {big:,.2f}\")         # both: 1,000,000.00",
          "",
          "# Debug format (Python 3.8+)",
          "x = 42",
          "print(f\"{x=}\")  # x=42 — shows the variable name AND value",
          "",
          "# Padding and alignment",
          "print(f\"[{'left':<10}]\")   # [left      ]",
          "print(f\"[{'right':>10}]\")  # [     right]",
          "print(f\"[{'center':^10}]\") # [  center  ]",
          "",
          "# Date formatting",
          "from datetime import datetime",
          "now = datetime.now()",
          "print(f\"Today: {now:%Y-%m-%d %H:%M}\")  # Today: 2024-01-15 10:30"
        ].join("\n"),
        output: `Hello, Alice! You are 30 years old.
Next year: 31
Name length: 5
Price: $1234.57
Price: $   1234.57
Big: 1,000,000
Big: 1,000,000.00
x=42
[left      ]
[     right]
[  center  ]
Today: 2024-01-15 10:30`,
        note: "f\"{x=}\" is a debugging gem — it prints both the variable name and its value: x=42."
      }
    ],
    marginNotes: [
      "f-strings are faster than .format() and % formatting — they're evaluated at compile time, not runtime.",
      "f\"{x=}\" (3.8+) is a debugging gem — it prints the variable name AND value: x=42.",
      "Format specs after colon: .2f (decimals), >10 (right-align), , (thousands), ^10 (center).",
      "Since Python 3.12, f-strings can contain any expression, including nested quotes — no more quote escaping issues."
    ],
    commonMistakes: [
      "Using .format() or % formatting when f-strings are available — f-strings are cleaner and faster.",
      "Forgetting the f prefix: \"Hello {name}\" is a literal string, not an f-string. You need f\"...\".",
      "Not knowing about format specs — f\"{x:.2f}\" for decimals, f\"{x:,}\" for thousands separators."
    ],
    relatedTopics: ["Strings & Formatting", "Variables & Dynamic Typing", "Datetime"],
    externalLinks: [
      { label: "PEP 498 — f-strings", url: "https://peps.python.org/pep-0498/" },
      { label: "Python Docs: Format String Syntax", url: "https://docs.python.org/3/library/string.html#format-string-syntax" }
    ],
    mcqs: [
      {
        question: "How do you format a float to 2 decimal places in an f-string?",
        options: ["f\"{x:2f}\"", "f\"{x:.2f}\"", "f\"{x:.2d}\"", "f\"{x:2}\""],
        answer: 1,
        explanations: ["Missing the dot.", "Correct — :.2f means 2 decimal places with float formatting.", "d is for integers.", "No format spec."],
        difficulty: "easy"
      },
      {
        question: "What does f\"{x=}\" print (where x = 42)?",
        options: ["42", "x=42", "x= 42", "Error"],
        answer: 1,
        explanations: ["That's f\"{x}\".", "Correct — the = debug format prints the variable name and value: x=42.", "No space after =.", "Valid syntax (3.8+)."],
        difficulty: "medium"
      },
      {
        question: "Why are f-strings preferred over .format()?",
        options: ["They're more readable and faster", "They're required", ".format() is deprecated", "They support more types"],
        answer: 0,
        explanations: ["Correct — f-strings are cleaner (inline expressions) and faster (compile-time evaluation).", "Not required.", ".format() is not deprecated.", "Same types."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "exception-hierarchy",
    title: "Exception Hierarchy & Custom Exceptions",
    difficulty: "medium",
    definition: "All Python exceptions derive from BaseException. The common branch is Exception -> ValueError, TypeError, KeyError, IndexError, AttributeError, RuntimeError, etc. You create custom exceptions by subclassing Exception (or a more specific one). Custom exceptions make your API's error contract explicit and let callers catch your specific errors without catching unrelated ones.",
    coreUnderstanding: "Python's exception hierarchy is a tree rooted at BaseException. The most important branch is Exception — almost all your custom exceptions should derive from it, not BaseException (which includes SystemExit and KeyboardInterrupt, which you usually don't want to catch). Creating custom exceptions is simple: class MyError(Exception): pass. You can add attributes and methods to carry error context. Custom exceptions make your API's error contract explicit — callers can catch your specific errors without accidentally catching unrelated ones.",
    howItWorks: "1. Hierarchy: BaseException -> Exception -> ValueError, TypeError, KeyError, etc.\n2. BaseException includes SystemExit, KeyboardInterrupt, GeneratorExit — usually don't catch these.\n3. Exception is the base for most application errors. Catch Exception to get all 'normal' errors.\n4. Custom exception: class MyError(Exception): pass — that's it. Add __init__ for custom attributes.\n5. Catch specific: except MyError: — catches only your error. except Exception: catches everything (risky).\n6. Hierarchy of custom errors: class ValidationError(MyError): — callers can catch MyError or ValidationError.\n7. Always include a helpful message: raise MyError(f\"Invalid value: {value}\").",
    codeExamples: [
      {
        lang: "python",
        code: `# Custom exception hierarchy
class AppError(Exception):
    """Base exception for our application."""
    pass

class ValidationError(AppError):
    """Input validation failed."""
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

class NotFoundError(AppError):
    """Resource not found."""
    pass

# Using custom exceptions
def get_user(user_id):
    if user_id < 0:
        raise ValidationError("user_id", "must be non-negative")
    if user_id not in users_db:
        raise NotFoundError(f"User {user_id} not found")
    return users_db[user_id]

# Catching by specificity
users_db = {1: "Alice"}

try:
    user = get_user(-1)
except ValidationError as e:
    print(f"Validation error on {e.field}: {e.message}")
except NotFoundError as e:
    print(f"Not found: {e}")
except AppError as e:
    print(f"App error: {e}")  # catches any AppError subclass

# The hierarchy
print(issubclass(ValidationError, AppError))  # True
print(issubclass(ValidationError, Exception))  # True
print(issubclass(ValidationError, BaseException))  # True`,
        output: `Validation error on user_id: must be non-negative
True
True
True`,
        note: "Always subclass Exception, not BaseException. BaseException includes SystemExit and KeyboardInterrupt, which you usually don't want to catch."
      }
    ],
    marginNotes: [
      "Always subclass Exception, not BaseException. BaseException includes SystemExit and KeyboardInterrupt — catching those is usually a mistake.",
      "Custom exceptions make your API's error contract explicit — callers can catch your specific errors without catching unrelated ones.",
      "Add attributes to carry error context: __init__(self, field, message) — callers can inspect e.field for better error handling.",
      "Create a hierarchy: AppError -> ValidationError, NotFoundError. Callers can catch the base or the specific error."
    ],
    commonMistakes: [
      "Subclassing BaseException instead of Exception — catches include SystemExit/KeyboardInterrupt, which is usually wrong.",
      "Not creating custom exceptions — using ValueError for everything makes it impossible for callers to catch specific errors.",
      "Forgetting to call super().__init__(message) in a custom exception — the message won't be set properly."
    ],
    relatedTopics: ["Error Handling", "Classes & Objects", "Inheritance & super()"],
    externalLinks: [
      { label: "Python Docs: Exception Hierarchy", url: "https://docs.python.org/3/library/exceptions.html#exception-hierarchy" },
      { label: "Python Docs: User-defined Exceptions", url: "https://docs.python.org/3/tutorial/errors.html#user-defined-exceptions" }
    ],
    mcqs: [
      {
        question: "What should custom exceptions inherit from?",
        options: ["BaseException", "Exception", "Error", "object"],
        answer: 1,
        explanations: ["Too broad — includes SystemExit/KeyboardInterrupt.", "Correct — Exception is the base for application errors. BaseException is too broad.", "Not a real base class.", "Exceptions must inherit from BaseException eventually."],
        difficulty: "medium"
      },
      {
        question: "Why create custom exceptions?",
        options: ["They're faster", "To make the API's error contract explicit and allow specific catching", "They're required", "To replace try/except"],
        answer: 1,
        explanations: ["Speed isn't the reason.", "Correct — custom exceptions let callers catch your specific errors without catching unrelated ones.", "Not required.", "They work with try/except."],
        difficulty: "medium"
      },
      {
        question: "What does BaseException include that Exception doesn't?",
        options: ["ValueError", "SystemExit, KeyboardInterrupt, GeneratorExit", "TypeError", "Nothing"],
        answer: 1,
        explanations: ["ValueError is under Exception.", "Correct — BaseException includes SystemExit, KeyboardInterrupt, GeneratorExit, which you usually don't want to catch.", "TypeError is under Exception.", "It includes more."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "garbage-collection",
    title: "Garbage Collection & Memory",
    difficulty: "hard",
    definition: "Python uses reference counting as its primary GC mechanism — when an object's reference count hits zero, it's immediately freed. A cyclic GC handles reference cycles (objects referencing each other). The gc module gives control over the cyclic collector. Most of the time you don't think about GC — but circular references, global caches, and closures holding references can cause memory leaks.",
    coreUnderstanding: "Python's memory management is primarily reference counting: every object has a count of references to it. When the count hits zero, the object is immediately freed. This is simple and deterministic — objects are freed as soon as they're unreachable. The problem: reference cycles (A->B, B->A) never reach zero. Python's cyclic garbage collector (gc module) handles this by periodically detecting and collecting cycles. Most of the time you don't think about GC, but circular references, global caches, and closures holding references can cause leaks.",
    howItWorks: "1. Reference counting: every object has ob_refcnt. x = obj increments it; del x decrements it. When it hits 0, the object is freed immediately.\n2. sys.getrefcount(obj) — check the reference count (adds 1 because the function arg is a reference).\n3. Cycles: a.next = b; b.next = a — ref counts never hit 0 even if a and b are unreachable. The cyclic GC handles this.\n4. gc.collect() — manually run the cyclic collector. gc.disable() — turn it off (rarely needed).\n5. gc.get_objects() — list all tracked objects. Useful for debugging leaks.\n6. weakref module — weak references that don't increment the ref count. Good for caches.\n7. __del__ method — called when the object is about to be destroyed. Unreliable; avoid.",
    codeExamples: [
      {
        lang: "python",
        code: `import sys, gc, weakref

# Reference counting
a = [1, 2, 3]
print(sys.getrefcount(a))  # 2 (a + the getrefcount arg)

b = a  # another reference
print(sys.getrefcount(a))  # 3

del b  # remove one reference
print(sys.getrefcount(a))  # 2

# Reference cycle — needs cyclic GC
class Node:
    pass

x = Node()
y = Node()
x.ref = y  # x references y
y.ref = x  # y references x — cycle!
del x, y  # ref counts don't hit 0 (cycle)
gc.collect()  # cyclic GC breaks the cycle

# Weak references — don't prevent GC
class Cache:
    _cache = {}
    def get(key, factory):
        if key not in Cache._cache:
            Cache._cache[key] = weakref.ref(factory())
        obj = Cache._cache[key]()
        return obj if obj is not None else None

# Check what the GC is tracking
print(f"GC tracked objects: {len(gc.get_objects())}")`,
        output: `2
3
2
GC tracked objects: 5832`,
        note: "Reference counting frees objects immediately when they become unreachable. The cyclic GC handles reference cycles that ref counting can't."
      }
    ],
    marginNotes: [
      "Python's primary GC is reference counting — objects are freed immediately when ref count hits 0. The cyclic GC handles cycles.",
      "Reference cycles (A->B, B->A) never reach ref count 0. The cyclic gc.collect() breaks them. Most of the time it runs automatically.",
      "Use weakref for caches — weak references don't prevent garbage collection, so cached objects can be freed when no strong refs remain.",
      "Avoid __del__ — it's called on destruction but is unreliable (especially with cycles). Use context managers instead."
    ],
    commonMistakes: [
      "Creating reference cycles without letting the cyclic GC handle them — can cause memory leaks in long-running processes.",
      "Using strong references for caches — the cache prevents objects from being collected. Use weakref instead.",
      "Relying on __del__ for cleanup — it's unreliable. Use context managers (with statement) instead."
    ],
    relatedTopics: ["Mutable vs Immutable", "Context Managers", "GIL & Threading"],
    externalLinks: [
      { label: "Python Docs: gc module", url: "https://docs.python.org/3/library/gc.html" },
      { label: "Python Docs: weakref module", url: "https://docs.python.org/3/library/weakref.html" }
    ],
    mcqs: [
      {
        question: "What is Python's primary garbage collection mechanism?",
        options: ["Mark and sweep", "Reference counting", "Generational GC", "Copying GC"],
        answer: 1,
        explanations: ["That's Java's approach.", "Correct — Python uses reference counting as its primary GC. Objects are freed when ref count hits 0.", "That's a secondary mechanism.", "Not used by Python."],
        difficulty: "medium"
      },
      {
        question: "What problem does the cyclic GC solve?",
        options: ["Slow performance", "Reference cycles (objects referencing each other) that ref counting can't collect", "Memory fragmentation", "Thread safety"],
        answer: 1,
        explanations: ["Not about performance.", "Correct — reference cycles (A->B, B->A) never hit ref count 0, so the cyclic GC detects and collects them.", "Not fragmentation.", "Not thread safety."],
        difficulty: "hard"
      },
      {
        question: "What do weak references do?",
        options: ["They're faster references", "They don't prevent garbage collection of the referenced object", "They're required for caching", "They prevent cycles"],
        answer: 1,
        explanations: ["Not about speed.", "Correct — weak references don't increment the ref count, so the object can still be collected. Good for caches.", "Not required but useful.", "They don't prevent cycles."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "gil-threading-multiprocessing",
    title: "GIL, Threading & Multiprocessing",
    difficulty: "hard",
    definition: "The GIL (Global Interpreter Lock) ensures only one thread executes Python bytecode at a time — so threads are good for I/O concurrency but NOT for CPU parallelism. For CPU-bound work, use the multiprocessing module to run separate processes, each with its own GIL and memory space. asyncio is the third option: single-threaded, event-loop-based concurrency for massive I/O workloads.",
    coreUnderstanding: "The GIL is the most misunderstood aspect of Python. It's a mutex that allows only one thread to execute Python bytecode at a time. This means threading is great for I/O-bound work (network, files) — while one thread waits for I/O, it releases the GIL and another thread runs. But for CPU-bound work (math, data processing), threads don't help — only one runs at a time anyway. For true CPU parallelism, use multiprocessing: each process has its own Python interpreter, GIL, and memory space. asyncio is the third option for massive I/O concurrency on a single thread.",
    howItWorks: "1. The GIL (Global Interpreter Lock) ensures only one thread executes Python bytecode at a time.\n2. Threading: import threading; t = threading.Thread(target=func); t.start(). Good for I/O-bound work.\n3. I/O releases the GIL: while one thread waits for network/file, others can run.\n4. CPU-bound work doesn't release the GIL — threads don't help. Use multiprocessing.\n5. Multiprocessing: from multiprocessing import Process; p = Process(target=func); p.start(). Each process has its own GIL.\n6. concurrent.futures.ThreadPoolExecutor and ProcessPoolExecutor — higher-level, easier API.\n7. asyncio: single-threaded, event-loop-based. Best for massive I/O concurrency (thousands of connections).",
    codeExamples: [
      {
        lang: "python",
        code: `import threading
import multiprocessing
import time

# Threading — good for I/O, NOT for CPU
def io_task(name, seconds):
    print(f"{name} starting")
    time.sleep(seconds)  # simulates I/O — releases GIL
    print(f"{name} done")

start = time.time()
threads = [threading.Thread(target=io_task, args=(f"T{i}", 2)) for i in range(3)]
for t in threads: t.start()
for t in threads: t.join()
print(f"Threading: {time.time()-start:.1f}s")  # ~2s (concurrent)

# Multiprocessing — for CPU-bound work
def cpu_task(n):
    return sum(i*i for i in range(n))

if __name__ == '__main__':
    start = time.time()
    procs = []
    for _ in range(4):
        p = multiprocessing.Process(target=cpu_task, args=(10_000_000,))
        procs.append(p)
        p.start()
    for p in procs: p.join()
    print(f"Multiprocessing: {time.time()-start:.1f}s")  # parallel!

    # concurrent.futures — easier API
    from concurrent.futures import ProcessPoolExecutor
    with ProcessPoolExecutor() as executor:
        results = list(executor.map(cpu_task, [10**6, 10**6, 10**6]))
        print(results)`,
        output: `T0 starting
T1 starting
T2 starting
T0 done
T1 done
T2 done
Threading: 2.0s
Multiprocessing: 1.5s
[333332833333500000, 333332833333500000, 333332833333500000]`,
        note: "Use threading for I/O-bound, multiprocessing for CPU-bound, asyncio for massive I/O concurrency. The GIL is the deciding factor."
      }
    ],
    marginNotes: [
      "The GIL means threads are for I/O concurrency, NOT CPU parallelism. Only one thread runs Python bytecode at a time.",
      "Use multiprocessing for CPU-bound work — each process has its own GIL and memory space, enabling true parallelism.",
      "Use threading for I/O-bound work (network, files) — I/O releases the GIL, so other threads run while one waits.",
      "concurrent.futures.ThreadPoolExecutor and ProcessPoolExecutor are easier than raw threads/processes."
    ],
    commonMistakes: [
      "Using threading for CPU-bound work — the GIL prevents parallelism. Use multiprocessing instead.",
      "Forgetting if __name__ == '__main__': with multiprocessing on Windows — required to avoid infinite recursion.",
      "Sharing state between processes without synchronization — each process has its own memory. Use Queue, Pipe, or Manager."
    ],
    relatedTopics: ["async/await & Asyncio", "Garbage Collection", "Generators & Yield"],
    externalLinks: [
      { label: "Python Docs: threading", url: "https://docs.python.org/3/library/threading.html" },
      { label: "Python Docs: multiprocessing", url: "https://docs.python.org/3/library/multiprocessing.html" }
    ],
    mcqs: [
      {
        question: "What does the GIL prevent?",
        options: ["Memory leaks", "Multiple threads executing Python bytecode simultaneously", "Garbage collection", "Import errors"],
        answer: 1,
        explanations: ["Not about memory leaks.", "Correct — the GIL ensures only one thread executes Python bytecode at a time.", "Not about GC.", "Not about imports."],
        difficulty: "medium"
      },
      {
        question: "When is threading useful despite the GIL?",
        options: ["For CPU-bound work", "For I/O-bound work (I/O releases the GIL)", "Never", "Only with asyncio"],
        answer: 1,
        explanations: ["Threading doesn't help CPU work.", "Correct — I/O operations release the GIL, so other threads can run while one waits.", "It's useful for I/O.", "They're separate options."],
        difficulty: "medium"
      },
      {
        question: "What should you use for CPU-bound parallelism in Python?",
        options: ["threading", "multiprocessing", "asyncio", "Nothing — it's impossible"],
        answer: 1,
        explanations: ["GIL prevents parallelism.", "Correct — multiprocessing uses separate processes, each with its own GIL, enabling true CPU parallelism.", "asyncio is single-threaded.", "multiprocessing makes it possible."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "metaclasses",
    title: "Metaclasses",
    difficulty: "hard",
    definition: "A metaclass is a class whose instances are classes — it controls how classes are constructed. type is the default metaclass. You create a custom metaclass by subclassing type and overriding __new__ or __init__. Metaclasses are used by ORMs (Django models), frameworks, and for enforcing class-level invariants. They are powerful but complex — prefer decorators or __init_subclass__ when they suffice.",
    coreUnderstanding: "Metaclasses are the deepest magic in Python. Just as a class creates instances, a metaclass creates classes. type is the default metaclass — when you write class Foo:, Python calls type('Foo', bases, namespace) to construct the class. A custom metaclass lets you intercept and modify class creation: enforce interfaces, register classes, modify attributes, etc. Django's ORM uses metaclasses to turn class definitions into database models. But metaclasses are complex and often overused — prefer decorators or __init_subclass__ when they suffice.",
    howItWorks: "1. type is the default metaclass. type('Name', (Base,), {'attr': val}) creates a class dynamically.\n2. class Foo(metaclass=MyMeta): — uses MyMeta instead of type to construct the class.\n3. A metaclass subclasses type and overrides __new__ or __init__.\n4. __new__(mcs, name, bases, namespace) — called before the class is created. Can modify the namespace.\n5. __init__(cls, name, bases, namespace) — called after the class is created.\n6. __init_subclass__ (simpler alternative) — called when a class is subclassed. Often replaces metaclasses.\n7. Metaclasses affect all subclasses — they propagate down the inheritance chain.",
    codeExamples: [
      {
        lang: "python",
        code: `# A metaclass that enforces a method exists
class EnforceMethod(type):
    required_methods = []

    def __new__(mcs, name, bases, namespace):
        cls = super().__new__(mcs, name, bases, namespace)
        for method in mcs.required_methods:
            if method not in namespace:
                raise TypeError(f"{name} must implement {method}")
        return cls

# Using the metaclass
class PluginBase(metaclass=EnforceMethod):
    required_methods = ['run']

class GoodPlugin(PluginBase):
    def run(self):
        return "running"

# This would raise TypeError:
# class BadPlugin(PluginBase):
#     pass  # TypeError: BadPlugin must implement run

# Simpler alternative: __init_subclass__
class PluginBase2:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if not hasattr(cls, 'run'):
            raise TypeError(f"{cls.__name__} must implement run")

class GoodPlugin2(PluginBase2):
    def run(self):
        return "running"

# type() creates classes dynamically
DynamicClass = type('Dynamic', (), {'x': 42, 'greet': lambda self: 'hi'})
obj = DynamicClass()
print(obj.x)  # 42
print(obj.greet())  # hi`,
        output: `42
hi`,
        note: "Prefer __init_subclass__ over metaclasses when possible — it's simpler and handles most use cases."
      }
    ],
    marginNotes: [
      "type is the default metaclass. class Foo: is sugar for type('Foo', (), {}).",
      "Prefer __init_subclass__ over custom metaclasses — it's simpler and handles most use cases (validation, registration).",
      "Metaclasses propagate to subclasses — if a base class uses a metaclass, all subclasses do too.",
      "Django's ORM uses metaclasses: class User(models.Model): triggers metaclass magic that creates database tables."
    ],
    commonMistakes: [
      "Using metaclasses when decorators or __init_subclass__ would suffice — metaclasses are complex and often overused.",
      "Confusing type(obj) (returns the class of obj) with type(name, bases, namespace) (creates a new class).",
      "Forgetting that metaclasses propagate to all subclasses — this can cause unexpected behavior."
    ],
    relatedTopics: ["Classes & Objects", "Inheritance & super()", "Decorators"],
    externalLinks: [
      { label: "Python Docs: Metaclasses", url: "https://docs.python.org/3/reference/datamodel.html#metaclasses" },
      { label: "PEP 3115 — Metaclasses in Python 3", url: "https://peps.python.org/pep-3115/" }
    ],
    mcqs: [
      {
        question: "What is a metaclass?",
        options: ["A class with no methods", "A class whose instances are classes — it controls class creation", "A type of decorator", "A base class"],
        answer: 1,
        explanations: ["Not about empty classes.", "Correct — a metaclass creates classes, just as a class creates instances.", "Not a decorator.", "Not a base class."],
        difficulty: "hard"
      },
      {
        question: "What is the default metaclass in Python?",
        options: ["object", "type", "class", "BaseException"],
        answer: 1,
        explanations: ["object is the base class, not a metaclass.", "Correct — type is the default metaclass. All classes are instances of type.", "Not a real metaclass.", "Not related."],
        difficulty: "medium"
      },
      {
        question: "What is a simpler alternative to metaclasses for most use cases?",
        options: ["Decorators", "__init_subclass__", "Both decorators and __init_subclass__", "There is no alternative"],
        answer: 2,
        explanations: ["Decorators work for some cases.", "__init_subclass__ handles subclass validation.", "Correct — both are simpler alternatives that handle most metaclass use cases.", "There are alternatives."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "match-case",
    title: "Pattern Matching (match/case)",
    difficulty: "medium",
    definition: "Python 3.10 introduced structural pattern matching with match/case — a more powerful switch. It matches on structure, not just values: you can destructure sequences, mappings, and objects, bind variables, and add guards (case _ if x > 0). It's especially useful for parsing data shapes, implementing interpreters, and replacing long if/elif chains.",
    coreUnderstanding: "match/case (Python 3.10+) is more than a switch statement — it's structural pattern matching. You can match on values, but also destructure sequences (lists, tuples), mappings (dicts), and objects. Patterns can bind variables, include guards (if conditions), and be nested. It's inspired by Rust and Scala. The most common use cases: replacing long if/elif chains, parsing data structures (JSON, ASTs), and implementing command dispatch. The _ pattern is the wildcard — matches anything, like else.",
    howItWorks: "1. match value: — starts a match block. case Pattern: — tries to match.\n2. Literal patterns: case 1:, case \"hello\":, case True: — match exact values.\n3. Capture patterns: case x: — matches anything and binds it to x.\n4. Wildcard: case _: — matches anything, doesn't bind. Like else.\n5. Sequence: case [1, 2, x]: — matches a 3-element list where first two are 1, 2; binds third to x.\n6. Mapping: case {\"type\": \"error\", \"msg\": msg}: — matches dict with those keys, binds msg.\n7. Class: case Point(x=0, y=y): — matches a Point instance with x=0, binds y.\n8. Guards: case [x] if x > 0: — only matches if the guard is True.\n9. OR patterns: case 1 | 2 | 3: — matches any of those values.",
    codeExamples: [
      {
        lang: "python",
        code: `# Basic value matching
def handle_command(cmd):
    match cmd:
        case "quit":
            return "Goodbye"
        case "help":
            return "Available commands: quit, help, status"
        case "status":
            return "All systems operational"
        case _:
            return f"Unknown command: {cmd}"

print(handle_command("help"))  # Available commands...

# Destructuring sequences
def process_point(point):
    match point:
        case (0, 0):
            return "Origin"
        case (0, y):
            return f"On Y axis at {y}"
        case (x, 0):
            return f"On X axis at {x}"
        case (x, y):
            return f"Point at ({x}, {y})"

print(process_point((0, 0)))  # Origin
print(process_point((3, 0)))  # On X axis at 3

# Matching dicts (JSON parsing)
def handle_event(event):
    match event:
        case {"type": "click", "x": x, "y": y}:
            return f"Click at ({x}, {y})"
        case {"type": "key", "key": key}:
            return f"Key pressed: {key}"
        case {"type": "scroll", "delta": d} if d > 0:
            return "Scroll up"
        case _:
            return "Unknown event"

print(handle_event({"type": "click", "x": 10, "y": 20}))
# Click at (10, 20)

# Class pattern matching
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

def classify(p):
    match p:
        case Point(x=0, y=0):
            return "Origin"
        case Point(x=x, y=0):
            return f"On X axis at {x}"
        case _:
            return "Other point"`,
        output: `Available commands: quit, help, status
Origin
On X axis at 3
Click at (10, 20)`,
        note: "match/case is more than a switch — it destructures data. The _ pattern is the wildcard (like else)."
      }
    ],
    marginNotes: [
      "match/case is more than a switch — it destructures sequences, mappings, and objects, and binds variables.",
      "The _ pattern is the wildcard — matches anything, like else in if/elif. It doesn't bind a variable.",
      "Guards (case [x] if x > 0:) add conditions to patterns — the pattern must match AND the guard must be True.",
      "OR patterns: case 1 | 2 | 3: matches any of those values. Useful for grouping cases."
    ],
    commonMistakes: [
      "Forgetting the case _: wildcard — without it, unmatched values silently fall through (no error, no action).",
      "Confusing capture patterns with literal patterns: case x: captures (matches anything), case 'x': matches the string 'x'.",
      "Not realizing that match/case is structural — it destructures data, unlike a simple switch."
    ],
    relatedTopics: ["Control Flow", "Classes & Objects", "JSON Handling"],
    externalLinks: [
      { label: "PEP 634 — Structural Pattern Matching", url: "https://peps.python.org/pep-0634/" },
      { label: "Python Docs: match statement", url: "https://docs.python.org/3/reference/compound_stmts.html#the-match-statement" }
    ],
    mcqs: [
      {
        question: "What Python version introduced match/case?",
        options: ["3.8", "3.9", "3.10", "3.12"],
        answer: 2,
        explanations: ["Too early.", "Too early.", "Correct — match/case (structural pattern matching) was introduced in Python 3.10.", "Too late."],
        difficulty: "easy"
      },
      {
        question: "What does the case _: pattern do?",
        options: ["Matches nothing", "Matches anything (wildcard, like else)", "Causes an error", "Matches only None"],
        answer: 1,
        explanations: ["It matches everything.", "Correct — _ is the wildcard pattern. It matches any value, like else in if/elif.", "No error.", "It matches anything, not just None."],
        difficulty: "easy"
      },
      {
        question: "How is match/case different from a switch statement?",
        options: ["It's identical to switch", "It can destructure sequences, mappings, and objects, not just match values", "It's faster", "It only works on strings"],
        answer: 1,
        explanations: ["It's more powerful.", "Correct — match/case does structural pattern matching: destructuring data, binding variables, guards.", "Speed isn't the difference.", "It works on any type."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "venv-pip-poetry",
    title: "Dependency Management: pip, Poetry, uv",
    difficulty: "medium",
    definition: "pip installs packages from PyPI. requirements.txt is the simplest dependency record. Poetry and uv are modern tools that manage virtual environments, dependency resolution, lockfiles, and packaging in one place. pyproject.toml is the modern standard for project configuration (replacing setup.py). Lockfiles ensure reproducible installs across environments. Choose a tool and stick with it per project.",
    coreUnderstanding: "Python dependency management has evolved. The basics: pip installs from PyPI, requirements.txt records dependencies. The problem: pip doesn't resolve dependencies well (no lockfile, version conflicts). Modern tools solve this: Poetry manages venv + dependencies + lockfiles + packaging in one tool. uv (written in Rust) is the new fast option — 10-100x faster than pip. pyproject.toml is the modern config standard (replacing setup.py). The key: use a lockfile for reproducible installs — poetry.lock or uv.lock pins exact versions.",
    howItWorks: "1. pip: pip install package, pip freeze > requirements.txt, pip install -r requirements.txt. Simple but no lockfile.\n2. pyproject.toml: the modern config standard. Declares dependencies, build system, tool config.\n3. Poetry: poetry init, poetry add package, poetry install, poetry.lock pins exact versions.\n4. uv: uv init, uv add package, uv sync, uv.lock. 10-100x faster than pip (written in Rust).\n5. Lockfile: records exact versions (including transitive deps) for reproducible installs.\n6. poetry build / uv build — creates distributable packages (wheels) for PyPI.\n7. Virtual env: Poetry/uv auto-create and manage the venv. No manual activation needed.",
    codeExamples: [
      {
        lang: "bash",
        code: `# --- pip (simple, manual) ---
python -m venv .venv
source .venv/bin/activate
pip install requests flask
pip freeze > requirements.txt
# On another machine:
pip install -r requirements.txt

# --- Poetry (modern, full-featured) ---
# Install: curl -sSL https://install.python-poetry.org | python3 -
poetry init          # create pyproject.toml interactively
poetry add requests  # adds to pyproject.toml + installs + updates lock
poetry add --group dev pytest  # dev dependency
poetry install       # install all deps from lockfile
poetry run python app.py  # run in the venv
poetry build         # create wheel + sdist for PyPI

# --- uv (fast, Rust-based) ---
# Install: curl -LsSf https://astral.sh/uv/install.sh | sh
uv init              # create pyproject.toml
uv add requests      # add + install + lock
uv add --dev pytest   # dev dependency
uv sync               # install from lockfile (fast!)
uv run python app.py  # run in the venv
uv build              # create wheel + sdist

# pyproject.toml structure:
[project]
name = "myapp"
version = "0.1.0"
dependencies = ["requests>=2.31"]`,
        output: `# Poetry/uv manage the venv automatically.
# No need to manually activate — use 'poetry run' or 'uv run'.`,
        note: "Use a lockfile (poetry.lock or uv.lock) for reproducible installs. It pins exact versions including transitive dependencies."
      }
    ],
    marginNotes: [
      "Use a lockfile (poetry.lock or uv.lock) for reproducible installs — it pins exact versions including transitive dependencies.",
      "pyproject.toml is the modern config standard, replacing setup.py. It declares dependencies, build system, and tool config.",
      "uv (written in Rust) is 10-100x faster than pip. It's the new modern choice for dependency management.",
      "Poetry and uv manage the virtual environment automatically — no manual activation. Use poetry run or uv run."
    ],
    commonMistakes: [
      "Not using a lockfile — requirements.txt without pinned versions leads to different installs across environments.",
      "Committing the virtual environment to git — it's machine-specific. Commit pyproject.toml and the lockfile instead.",
      "Mixing pip and Poetry/uv in the same project — pick one tool and stick with it to avoid conflicts."
    ],
    relatedTopics: ["Virtual Environments & pip", "Modules & Packages", "Type Hints"],
    externalLinks: [
      { label: "Poetry Documentation", url: "https://python-poetry.org/docs/" },
      { label: "uv Documentation", url: "https://docs.astral.sh/uv/" }
    ],
    mcqs: [
      {
        question: "What is the purpose of a lockfile (poetry.lock, uv.lock)?",
        options: ["It locks the code", "It pins exact dependency versions for reproducible installs", "It prevents editing", "It encrypts the project"],
        answer: 1,
        explanations: ["Not about code locking.", "Correct — a lockfile records exact versions (including transitive deps) so installs are reproducible.", "It doesn't prevent editing.", "No encryption."],
        difficulty: "medium"
      },
      {
        question: "What is pyproject.toml?",
        options: ["A Python file", "The modern project config standard (replacing setup.py)", "A lockfile", "A virtual environment"],
        answer: 1,
        explanations: ["It's a config file, not Python code.", "Correct — pyproject.toml declares dependencies, build system, and tool config, replacing setup.py.", "The lockfile is separate.", "It's not a venv."],
        difficulty: "medium"
      },
      {
        question: "What makes uv different from pip?",
        options: ["It's written in Python", "It's 10-100x faster (written in Rust)", "It doesn't use PyPI", "It's only for testing"],
        answer: 1,
        explanations: ["It's written in Rust.", "Correct — uv is written in Rust, making it 10-100x faster than pip for installs and resolution.", "It uses PyPI.", "It's a full package manager."],
        difficulty: "medium"
      }
    ]
  }
];