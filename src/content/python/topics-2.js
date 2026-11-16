// Python topics part 2: Type Hints through Dataclasses (topics 19-33)
export default [
  {
    id: "type-hints",
    title: "Type Hints & Static Analysis",
    difficulty: "medium",
    definition: "Type hints (PEP 484) are optional annotations that describe expected types: def add(a: int, b: int) -> int. They are NOT enforced at runtime — they exist for static checkers like mypy and pyright to catch type bugs before running. The typing module provides generic types (List, Dict, Optional, Union, Callable). Type hints improve readability and IDE support.",
    coreUnderstanding: "Type hints are annotations, not enforcement. Python stays dynamically typed at runtime — `x: int = \"oops\"` runs fine. The value of type hints is in static analysis: tools like mypy and pyright check your code without running it, catching type errors before they hit production. They also improve IDE autocomplete and documentation. In Python 3.9+, you can use built-in types directly: `list[int]` instead of `List[int]`. In 3.10+, `int | str` replaces `Union[int, str]`.",
    howItWorks: "1. Function annotations: `def f(x: int, y: str = \"default\") -> bool:` — types for params and return.\n2. Variable annotations: `x: int = 5` or just `x: int` (no value).\n3. `typing` module: `List[int]`, `Dict[str, int]`, `Optional[int]` (= `Union[int, None]`), `Callable[[int], str]`.\n4. Python 3.9+: use builtins directly: `list[int]`, `dict[str, int]`.\n5. Python 3.10+: `int | str` instead of `Union[int, str]`, `int | None` instead of `Optional[int]`.\n6. `mypy file.py` — runs the type checker. `pyright` is another popular one (used by VS Code).\n7. `from __future__ import annotations` — makes all annotations strings (lazy evaluation), useful for forward references.",
    codeExamples: [
      {
        lang: "python",
        code: `# Function with type hints
def greet(name: str, times: int = 1) -> str:
    return (f"Hello, {name}! " * times).strip()

# Variable annotations
count: int = 0
names: list[str] = []  # Python 3.9+
config: dict[str, int | str] = {}  # Python 3.10+

# Optional and Union
from typing import Optional, Union, Callable

def find(items: list[int], target: int) -> int | None:
    for i, v in enumerate(items):
        if v == target:
            return i
    return None

# Callable type
def apply(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)

# mypy would catch this:
# greet(123)  # error: argument 1 has incompatible type "int"; expected "str"`,
        output: `(no runtime output — type hints are for static analysis)`,
        note: "Type hints are NOT enforced at runtime. Use mypy or pyright to check them statically before running."
      }
    ],
    marginNotes: [
      "Type hints are NOT enforced at runtime — `x: int = 'oops'` runs fine. Use mypy/pyright for static checking.",
      "Python 3.9+: use `list[int]` not `List[int]`. Python 3.10+: use `int | str` not `Union[int, str]`.",
      "`Optional[int]` is just `Union[int, None]` — or `int | None` in 3.10+.",
      "Type hints improve IDE autocomplete and serve as documentation — even without a checker."
    ],
    commonMistakes: [
      "Expecting type hints to be enforced at runtime — they're not. Use mypy/pyright.",
      "Using `List[int]` (typing module) when `list[int]` (builtin) works in Python 3.9+.",
      "Annotating everything including obvious cases — type hints are most valuable on function signatures and complex types."
    ],
    relatedTopics: ["Variables & Dynamic Typing", "Dataclasses", "Functions & Parameters"],
    externalLinks: [
      { label: "PEP 484 — Type Hints", url: "https://peps.python.org/pep-0484/" },
      { label: "mypy Documentation", url: "https://mypy.readthedocs.io/" }
    ],
    mcqs: [
      {
        question: "Are type hints enforced at runtime?",
        options: ["Yes, always", "No — they are for static analysis only", "Only for functions", "Only in classes"],
        answer: 1,
        explanations: ["Never at runtime.", "Correct — Python ignores type hints at runtime. Use mypy/pyright to check them.", "Not even for functions.", "Not for classes either."],
        difficulty: "easy"
      },
      {
        question: "What is `Optional[int]` equivalent to?",
        options: ["int only", "Union[int, None]", "int | str", "int or None or any type"],
        answer: 1,
        explanations: ["Optional means it can be None.", "Correct — Optional[int] is shorthand for Union[int, None], or int | None in 3.10+.", "Not str.", "Not any type."],
        difficulty: "medium"
      },
      {
        question: "Which syntax works in Python 3.9+?",
        options: ["List[int] only", "list[int] (builtin generics)", "int[] only", "Array[int]"],
        answer: 1,
        explanations: ["List[int] works but is older style.", "Correct — Python 3.9+ allows list[int], dict[str, int], etc. directly.", "Not Python syntax.", "Not a Python type."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "async-await",
    title: "async / await & Asyncio",
    difficulty: "hard",
    definition: "async/await enables asynchronous, concurrent programming using a single-threaded event loop. An async def function is a coroutine; await suspends it until an awaitable (usually I/O) completes, letting other coroutines run meanwhile. asyncio is the standard library for managing the event loop, tasks, and synchronization primitives. Ideal for I/O-bound concurrency, not CPU-bound.",
    coreUnderstanding: "async/await is about concurrency on a single thread. When a coroutine hits `await`, it suspends and returns control to the event loop, which can run other coroutines meanwhile. This is perfect for I/O-bound work (network requests, file I/O, database queries) — while one coroutine waits for a response, others can proceed. It's NOT for CPU-bound work (that needs multiprocessing). The event loop is the orchestrator: it schedules coroutines, handles I/O callbacks, and wakes up suspended coroutines when their awaitables complete.",
    howItWorks: "1. `async def f():` — defines a coroutine. Calling it returns a coroutine object, not a result.\n2. `await some_async_op()` — suspends the coroutine until the operation completes. Other coroutines run meanwhile.\n3. `asyncio.run(main())` — starts the event loop and runs the main coroutine.\n4. `asyncio.gather(*coros)` — runs multiple coroutines concurrently and collects results.\n5. `asyncio.create_task(coro)` — schedules a coroutine as a Task on the event loop.\n6. Async context managers and async iterators: `async with`, `async for`.\n7. Libraries must be async-aware: use `aiohttp` not `requests`, `aiomysql` not `pymysql`.",
    codeExamples: [
      {
        lang: "python",
        code: `import asyncio
import time

async def fetch_data(name, delay):
    print(f"  {name}: starting...")
    await asyncio.sleep(delay)  # simulates I/O
    print(f"  {name}: done!")
    return f"{name}_result"

async def main():
    start = time.time()

    # Run concurrently — total time = max delay, not sum
    results = await asyncio.gather(
        fetch_data("A", 2),
        fetch_data("B", 1),
        fetch_data("C", 3),
    )

    print(f"Results: {results}")
    print(f"Total: {time.time()-start:.1f}s")  # ~3s, not 6s

asyncio.run(main())`,
        output: `  A: starting...
  B: starting...
  C: starting...
  B: done!
  A: done!
  C: done!
Results: ['A_result', 'B_result', 'C_result']
Total: 3.0s`,
        note: "asyncio.gather runs coroutines concurrently — total time is the max delay (3s), not the sum (6s). This is the power of async."
      }
    ],
    marginNotes: [
      "async/await is for I/O-bound concurrency (network, files, DBs), NOT CPU-bound work (use multiprocessing for that).",
      "You can't mix async and sync libraries — `requests` blocks the event loop. Use `aiohttp` for async HTTP.",
      "`asyncio.run(main())` is the entry point — it creates the event loop, runs your coroutine, and closes it.",
      "Calling an async function without await gives you a coroutine object, not the result. Always await it."
    ],
    commonMistakes: [
      "Calling an async function without await — you get a coroutine object, not the result. Always await.",
      "Using blocking calls (time.sleep, requests.get) in async code — they freeze the event loop. Use asyncio.sleep, aiohttp.",
      "Using async for CPU-bound work — it doesn't parallelize computation. Use multiprocessing instead."
    ],
    relatedTopics: ["Generators & Yield", "Context Managers", "GIL & Threading"],
    externalLinks: [
      { label: "Python Docs: asyncio", url: "https://docs.python.org/3/library/asyncio.html" },
      { label: "Real Python: async/await", url: "https://realpython.com/async-io-python/" }
    ],
    mcqs: [
      {
        question: "What does `await` do?",
        options: ["Blocks the thread", "Suspends the coroutine, letting others run until the awaitable completes", "Creates a thread", "Kills the coroutine"],
        answer: 1,
        explanations: ["That's the opposite of async.", "Correct — await suspends the coroutine and returns control to the event loop.", "No threads involved.", "It suspends, not kills."],
        difficulty: "medium"
      },
      {
        question: "Is async/await suitable for CPU-bound work?",
        options: ["Yes, it parallelizes computation", "No — use multiprocessing for CPU-bound work", "Only with threads", "Only with asyncio.gather"],
        answer: 1,
        explanations: ["async is single-threaded.", "Correct — async is for I/O-bound concurrency. CPU-bound work needs multiprocessing for true parallelism.", "Threads are limited by the GIL.", "gather is for I/O concurrency."],
        difficulty: "hard"
      },
      {
        question: "What happens if you call an async function without await?",
        options: ["It runs synchronously", "You get a coroutine object, not the result", "It errors", "It blocks forever"],
        answer: 1,
        explanations: ["It doesn't run at all.", "Correct — calling an async function returns a coroutine object. You must await it to get the result.", "No error, just a coroutine object.", "It doesn't block."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "context-managers",
    title: "Context Managers",
    difficulty: "medium",
    definition: "A context manager defines setup and teardown around a with block. The with statement guarantees the __exit__ method runs even if an exception occurs — the standard pattern for resource management (files, locks, connections). You can create context managers with a class implementing __enter__/__exit__, or with the @contextmanager decorator on a generator.",
    coreUnderstanding: "Context managers solve the cleanup problem: how do you guarantee a resource is released even if an exception occurs? The with statement is the answer. When you write `with open(f) as fh:`, Python calls __enter__ (opens the file), binds the result to fh, runs your block, and then calls __exit__ (closes the file) — no matter what happened in the block. You can create your own with a class (__enter__/__exit__) or with the @contextmanager decorator on a generator (simpler for most cases).",
    howItWorks: "1. `with resource as r:` — calls `resource.__enter__()`, binds result to r, runs block, then calls `resource.__exit__()`.\n2. `__exit__` is called even if an exception occurs — that's the guarantee.\n3. Class-based: implement `__enter__(self)` (return the resource) and `__exit__(self, exc_type, exc_val, exc_tb)` (cleanup).\n4. Return True from `__exit__` to suppress the exception (rarely needed).\n5. Generator-based: `@contextmanager` on a function that yields the resource. Code before yield = setup, after yield = teardown.\n6. `contextlib.suppress(Exception)` — a built-in context manager that ignores specified exceptions.",
    codeExamples: [
      {
        lang: "python",
        code: `from contextlib import contextmanager
import time

# Generator-based (simpler, preferred for most cases)
@contextmanager
def timer(label):
    start = time.perf_counter()
    try:
        yield  # the block runs here
    finally:
        elapsed = time.perf_counter() - start
        print(f"{label}: {elapsed:.4f}s")

with timer("processing"):
    total = sum(range(1000000))
# processing: 0.0352s

# Class-based
class ManagedResource:
    def __enter__(self):
        print("Acquiring resource")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Releasing resource")
        return False  # don't suppress exceptions

with ManagedResource() as r:
    print("Using resource")
    # Even if this raises, __exit__ runs
# Acquiring resource
# Using resource
# Releasing resource`,
        output: `Acquiring resource
Using resource
Releasing resource
processing: 0.0352s`,
        note: "Use @contextmanager for simple cases — it's cleaner than a class. Code before yield is setup, after yield (in finally) is teardown."
      }
    ],
    marginNotes: [
      "The with statement guarantees __exit__ runs even if an exception occurs — that's the whole point.",
      "Use @contextmanager for simple cases: code before yield = setup, after yield (in finally) = teardown.",
      "Return True from __exit__ to suppress the exception (rarely needed — usually let it propagate).",
      "Multiple with statements: `with a as x, b as y:` — both are cleaned up even if one fails."
    ],
    commonMistakes: [
      "Forgetting the `try/finally` in @contextmanager — without it, teardown doesn't run on exception.",
      "Not yielding in a @contextmanager function — it must yield exactly once.",
      "Forgetting that __exit__ receives exception info (exc_type, exc_val, exc_tb) — you can inspect or suppress exceptions."
    ],
    relatedTopics: ["File Handling", "Error Handling", "Decorators"],
    externalLinks: [
      { label: "Python Docs: contextlib", url: "https://docs.python.org/3/library/contextlib.html" },
      { label: "Python Docs: with statement", url: "https://docs.python.org/3/reference/datamodel.html#with-statement-context-managers" }
    ],
    mcqs: [
      {
        question: "What does the with statement guarantee?",
        options: ["The resource is acquired", "__exit__ runs even if an exception occurs", "No exceptions can happen", "The block runs twice"],
        answer: 1,
        explanations: ["That's __enter__.", "Correct — the with statement guarantees cleanup (__exit__) regardless of exceptions.", "Exceptions can still occur.", "It runs once."],
        difficulty: "easy"
      },
      {
        question: "In @contextmanager, what runs before vs after yield?",
        options: ["Both run after", "Setup before, teardown after (in finally)", "Teardown before, setup after", "Only setup runs"],
        answer: 1,
        explanations: ["Both run, but at different times.", "Correct — code before yield is setup, code after yield (in finally) is teardown.", "Reversed.", "Both run."],
        difficulty: "medium"
      },
      {
        question: "What does returning True from __exit__ do?",
        options: ["Errors", "Suppresses the exception", "Rethrows the exception", "Nothing"],
        answer: 1,
        explanations: ["No error.", "Correct — returning True suppresses the exception, so it doesn't propagate. Rarely needed.", "Returning False or None propagates it.", "It suppresses."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "regular-expressions",
    title: "Regular Expressions (re module)",
    difficulty: "medium",
    definition: "The re module provides regular expression matching: re.search, re.match, re.findall, re.sub, re.split. Patterns use metacharacters like . (any), * (zero+), + (one+), ? (optional), \\d (digit), \\w (word char), [] (char class), () (group). Compile patterns with re.compile for reuse. Regex is powerful but can become unreadable — test with regex101.com.",
    coreUnderstanding: "Regular expressions are a mini-language for pattern matching in strings. The re module is Python's interface. The key functions: re.search (find anywhere), re.match (match from start), re.findall (all matches), re.sub (replace), re.split (split on pattern). Metacharacters have special meaning: . (any char), * (zero or more), + (one or more), ? (zero or one), \\d (digit), \\w (word char), [] (character class), () (capture group). Always use raw strings (r'...') for patterns to avoid backslash escaping issues.",
    howItWorks: "1. `re.search(pattern, string)` — finds first match anywhere. Returns a Match object or None.\n2. `re.match(pattern, string)` — matches from the START of the string only.\n3. `re.findall(pattern, string)` — returns a list of all matches (strings, or tuples if groups).\n4. `re.sub(pattern, replacement, string)` — replaces all matches with replacement.\n5. `re.split(pattern, string)` — splits string on the pattern.\n6. `re.compile(pattern)` — compiles for reuse (faster if used many times).\n7. Groups: `()` capture parts. `m.group(1)` gets the first group. `(?P<name>...)` names a group.\n8. Always use raw strings: `r'\\d+'` not `'\\\\d+'` — backslashes are literal in raw strings.",
    codeExamples: [
      {
        lang: "python",
        code: `import re

# Find all numbers
text = "I have 3 cats and 2 dogs"
numbers = re.findall(r'\\d+', text)
print(numbers)  # ['3', '2']

# Extract with groups
email = "user@example.com"
match = re.match(r'(\\w+)@(\\w+\\.\\w+)', email)
if match:
    print(match.group(1))  # user
    print(match.group(2))  # example.com

# Replace
phone = "Call 555-123-4567"
clean = re.sub(r'\\D', '', phone)  # remove non-digits
print(clean)  # 5551234567

# Named groups
date = "2024-01-15"
m = re.match(r'(?P<year>\\d+)-(?P<month>\\d+)-(?P<day>\\d+)', date)
if m:
    print(m.group('year'), m.group('month'), m.group('day'))
    # 2024 01 15

# Split on pattern
parts = re.split(r'[,;\\s]+', "a, b; c d")
print(parts)  # ['a', 'b', 'c', 'd']`,
        output: `['3', '2']
user
example.com
5551234567
2024 01 15
['a', 'b', 'c', 'd']`,
        note: "Always use raw strings (r'...') for regex patterns — backslashes are literal, so r'\\d' is two chars, not an escaped d."
      }
    ],
    marginNotes: [
      "Always use raw strings (r'...') for regex patterns. `r'\\d'` is two chars; `'\\d'` might be interpreted as an escape.",
      "`re.search` finds anywhere; `re.match` only matches from the start. This is a common confusion.",
      "Use `re.VERBOSE` flag for complex patterns — it allows whitespace and comments in the pattern for readability.",
      "Regex is powerful but can become unreadable. For complex parsing, consider a proper parser (e.g., pyparsing)."
    ],
    commonMistakes: [
      "Not using raw strings (r'...') for patterns — backslash escaping breaks the pattern.",
      "Confusing re.search (finds anywhere) with re.match (matches from start only).",
      "Forgetting that re.findall returns strings, not Match objects — no .group() method on the results."
    ],
    relatedTopics: ["Strings & Formatting", "File Handling", "JSON Handling"],
    externalLinks: [
      { label: "Python Docs: re module", url: "https://docs.python.org/3/library/re.html" },
      { label: "regex101.com — Regex Tester", url: "https://regex101.com/" }
    ],
    mcqs: [
      {
        question: "Why use raw strings (r'...') for regex patterns?",
        options: ["They're faster", "Backslashes are literal, avoiding escape issues", "They're required", "They support more features"],
        answer: 1,
        explanations: ["Speed isn't the reason.", "Correct — in raw strings, \\d is two chars (backslash, d). In regular strings, \\d might be interpreted as an escape.", "They're not required but strongly recommended.", "Same features."],
        difficulty: "medium"
      },
      {
        question: "What is the difference between re.search and re.match?",
        options: ["They're identical", "search finds anywhere; match only from the start", "match is faster", "search uses different syntax"],
        answer: 1,
        explanations: ["They differ in position.", "Correct — re.search scans the whole string; re.match only matches at the beginning.", "Speed isn't the difference.", "Same syntax."],
        difficulty: "medium"
      },
      {
        question: "What does re.findall return?",
        options: ["A Match object", "A list of strings (or tuples if groups)", "A single string", "An iterator"],
        answer: 1,
        explanations: ["That's re.search/match.", "Correct — re.findall returns a list of all matches. If groups are used, it returns tuples of group values.", "It returns a list.", "It returns a list, not an iterator."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "datetime-module",
    title: "Date & Time (datetime)",
    difficulty: "medium",
    definition: "The datetime module provides date, time, datetime, timedelta, and timezone classes. datetime.now() gives the current moment. timedelta represents a duration for arithmetic (dt + timedelta(days=7)). strftime/strptime format and parse strings. Always work in UTC and convert to local time for display. For serious time zone handling, use the zoneinfo module (3.9+) or pytz.",
    coreUnderstanding: "Date and time is notoriously hard — time zones, daylight saving, leap years, leap seconds. Python's datetime module provides the building blocks: date (year, month, day), time (hour, minute, second), datetime (both), timedelta (duration). The golden rule: store and compute in UTC, convert to local time only for display. For time zones, use zoneinfo (Python 3.9+, standard library) or pytz (older). strftime formats datetime to string; strptime parses string to datetime.",
    howItWorks: "1. `datetime.now()` — current local date and time. `datetime.now(timezone.utc)` — current UTC time.\n2. `datetime(2024, 1, 15, 10, 30)` — create a specific datetime.\n3. `timedelta(days=7)` — a duration. `dt + timedelta(days=7)` — date arithmetic.\n4. `dt.strftime('%Y-%m-%d %H:%M')` — format to string. `datetime.strptime(s, format)` — parse from string.\n5. `dt.isoformat()` — ISO 8601 string (machine-readable). `datetime.fromisoformat(s)` — parse ISO.\n6. `zoneinfo.ZoneInfo('America/New_York')` — time zone (Python 3.9+). `dt.astimezone(tz)` — convert.\n7. Format codes: %Y (year), %m (month), %d (day), %H (hour), %M (minute), %S (second), %A (weekday name).",
    codeExamples: [
      {
        lang: "python",
        code: `from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

# Current time
now = datetime.now()
print(now)  # 2024-01-15 10:30:00.123456

# UTC (always prefer UTC for storage)
utc_now = datetime.now(timezone.utc)
print(utc_now)  # 2024-01-15 15:30:00.123456+00:00

# Date arithmetic
week_from_now = now + timedelta(weeks=1)
print(week_from_now)  # 2024-01-22 10:30:00.123456

# Format to string
formatted = now.strftime('%Y-%m-%d %H:%M')
print(formatted)  # 2024-01-15 10:30

# Parse from string
parsed = datetime.strptime('2024-01-15', '%Y-%m-%d')
print(parsed)  # 2024-01-15 00:00:00

# Time zone conversion
ny_tz = ZoneInfo('America/New_York')
ny_time = utc_now.astimezone(ny_tz)
print(ny_time)  # 2024-01-15 10:30:00.123456-05:00`,
        output: `2024-01-15 10:30:00.123456
2024-01-15 15:30:00.123456+00:00
2024-01-22 10:30:00.123456
2024-01-15 10:30
2024-01-15 00:00:00
2024-01-15 10:30:00.123456-05:00`,
        note: "Always store and compute in UTC. Convert to local time only for display. This avoids timezone bugs."
      }
    ],
    marginNotes: [
      "Always store and compute in UTC. Convert to local time only for display. This is the golden rule of datetime.",
      "Use `zoneinfo.ZoneInfo('America/New_York')` (Python 3.9+) for time zones. It's in the standard library, replacing pytz.",
      "`datetime.now()` returns naive (no timezone) datetime. `datetime.now(timezone.utc)` returns aware datetime. Prefer aware.",
      "strftime = string from time (format). strptime = string parse to time (parse). The 'f' and 'p' help remember."
    ],
    commonMistakes: [
      "Using naive datetimes (no timezone) and assuming they're UTC — they're not. Always use timezone-aware datetimes.",
      "Confusing strftime (format to string) with strptime (parse from string).",
      "Using pytz's localize() incorrectly — with zoneinfo, just pass the tz to the datetime constructor or use astimezone()."
    ],
    relatedTopics: ["JSON Handling", "File Handling", "Time Complexity"],
    externalLinks: [
      { label: "Python Docs: datetime", url: "https://docs.python.org/3/library/datetime.html" },
      { label: "Python Docs: zoneinfo", url: "https://docs.python.org/3/library/zoneinfo.html" }
    ],
    mcqs: [
      {
        question: "What is the golden rule for storing datetimes?",
        options: ["Store in local time", "Store in UTC, convert for display", "Store as strings", "Store as timestamps"],
        answer: 1,
        explanations: ["Local time causes bugs across timezones.", "Correct — always store and compute in UTC, convert to local only for display.", "Strings are error-prone.", "Timestamps work but UTC datetimes are clearer."],
        difficulty: "medium"
      },
      {
        question: "What does strftime do?",
        options: ["Parses a string to datetime", "Formats a datetime to a string", "Calculates difference", "Gets current time"],
        answer: 1,
        explanations: ["That's strptime.", "Correct — strftime (string format time) formats a datetime to a string.", "That's timedelta.", "That's datetime.now()."],
        difficulty: "easy"
      },
      {
        question: "What is the difference between naive and aware datetimes?",
        options: ["Naive is faster", "Naive has no timezone info; aware does", "Aware is always UTC", "They're the same"],
        answer: 1,
        explanations: ["Speed isn't the difference.", "Correct — naive datetimes have no timezone; aware datetimes include timezone info, preventing ambiguity.", "Aware can be any timezone.", "They differ in timezone info."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "json-handling",
    title: "JSON Handling",
    difficulty: "easy",
    definition: "The json module serializes Python objects to JSON strings (json.dumps) and deserializes JSON to Python objects (json.loads). For files, use json.dump and json.load. JSON maps to Python dicts, lists, strings, numbers, booleans, and None. Custom objects need a default encoder or conversion to dicts first.",
    coreUnderstanding: "JSON is the lingua franca of web APIs. Python's json module makes it easy: dumps (dump string) serializes a Python object to a JSON string, loads (load string) parses a JSON string to a Python object. For files, use dump/load (without the 's'). The type mapping is natural: dict<->object, list<->array, str<->string, int/float<->number, True<->true, None<->null. Custom objects aren't serializable by default — you need a default function or to convert to a dict first.",
    howItWorks: "1. `json.dumps(obj)` — serialize Python object to JSON string. `json.loads(s)` — parse JSON string to Python.\n2. `json.dump(obj, file)` — serialize to a file. `json.load(file)` — parse from a file.\n3. Type mapping: dict->object, list->array, str->string, int/float->number, True->true, False->false, None->null.\n4. `indent=2` — pretty-print with 2-space indentation. `sort_keys=True` — sort dict keys.\n5. `default=func` — function called for objects that aren't serializable by default. Usually converts to a dict.\n6. `json.JSONEncoder` subclass — for custom serialization logic.\n7. `object_hook=func` — for custom deserialization (e.g., converting dicts to objects).",
    codeExamples: [
      {
        lang: "python",
        code: `import json

# Python dict to JSON string
data = {"name": "Alice", "age": 30, "skills": ["Python", "ML"]}
json_str = json.dumps(data, indent=2)
print(json_str)
# {
#   "name": "Alice",
#   "age": 30,
#   "skills": ["Python", "ML"]
# }

# JSON string to Python dict
parsed = json.loads(json_str)
print(parsed["name"])  # Alice
print(type(parsed))    # <class 'dict'>

# File I/O
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

with open("data.json") as f:
    loaded = json.load(f)
    print(loaded == data)  # True

# Custom serialization
from datetime import datetime
def encode(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError("Not serializable")

event = {"time": datetime.now(), "msg": "hello"}
print(json.dumps(event, default=encode))`,
        output: `{
  "name": "Alice",
  "age": 30,
  "skills": [
    "Python",
    "ML"
  ]
}
Alice
<class 'dict'>
True
{"time": "2024-01-15T10:30:00.123456", "msg": "hello"}`,
        note: "dumps/loads work with strings; dump/load work with files. The 's' stands for string."
      }
    ],
    marginNotes: [
      "`dumps`/`loads` work with strings; `dump`/`load` work with files. The 's' stands for 'string'.",
      "Custom objects aren't JSON-serializable by default. Use `default=func` to convert them, or convert to a dict first.",
      "Use `indent=2` for human-readable JSON. Omit it for compact (smaller) output.",
      "JSON only supports basic types. datetime, set, and custom classes need custom serialization."
    ],
    commonMistakes: [
      "Using `json.dumps` on a custom object without a `default` function — TypeError: not JSON serializable.",
      "Confusing dumps/loads (strings) with dump/load (files) — the 's' makes the difference.",
      "Expecting JSON to preserve Python-specific types like tuples (they become arrays) or sets (not serializable)."
    ],
    relatedTopics: ["File Handling", "Datetime", "Dataclasses"],
    externalLinks: [
      { label: "Python Docs: json module", url: "https://docs.python.org/3/library/json.html" },
      { label: "JSON Specification", url: "https://www.json.org/json-en.html" }
    ],
    mcqs: [
      {
        question: "What is the difference between json.dumps and json.dump?",
        options: ["dumps is faster", "dumps works with strings; dump works with files", "dump is deprecated", "They're identical"],
        answer: 1,
        explanations: ["Speed isn't the difference.", "Correct — dumps serializes to a string; dump serializes to a file. The 's' = string.", "Neither is deprecated.", "They differ in output target."],
        difficulty: "easy"
      },
      {
        question: "How do you serialize a custom object to JSON?",
        options: ["It works automatically", "Use the default parameter with a conversion function", "Use pickle instead", "Convert to XML first"],
        answer: 1,
        explanations: ["Custom objects aren't serializable by default.", "Correct — pass a default function that converts the object to a dict or primitive.", "pickle is a different format.", "No need for XML."],
        difficulty: "medium"
      },
      {
        question: "What Python type does a JSON array map to?",
        options: ["tuple", "list", "set", "array"],
        answer: 1,
        explanations: ["Tuples become arrays in JSON, not the other way.", "Correct — JSON arrays map to Python lists.", "Sets aren't JSON-serializable.", "array is a different module."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "collections-module",
    title: "The collections Module",
    difficulty: "medium",
    definition: "The collections module provides specialized containers: Counter (counting hashable items), defaultdict (dict with a default factory), OrderedDict (ordered dict, less needed since 3.7), namedtuple (tuple with named fields), deque (double-ended queue, O(1) at both ends). These are more efficient and readable than hand-rolling equivalents with plain dicts and lists.",
    coreUnderstanding: "The collections module is a toolkit of specialized containers that solve common problems more elegantly than plain dicts and lists. Counter counts things (word frequency, votes). defaultdict avoids the key-checking pattern (`if key not in d: d[key] = []`). namedtuple gives you tuple immutability with named fields (like a lightweight class). deque is a double-ended queue with O(1) append/pop at both ends — unlike lists which are O(n) at the front. These are all production-quality, well-tested, and more readable than rolling your own.",
    howItWorks: "1. `Counter(iterable)` — counts hashable items. `c['x']` gives count. `c.most_common(n)` gives top n.\n2. `defaultdict(factory)` — missing keys auto-created by calling factory(). `defaultdict(list)` for grouping.\n3. `namedtuple('Name', ['x', 'y'])` — creates a tuple subclass with named fields. Immutable, lightweight.\n4. `deque(iterable)` — double-ended queue. `appendleft`, `popleft` are O(1). Good for queues and stacks.\n5. `OrderedDict` — dict that remembers insertion order. Less needed since Python 3.7 (dicts are ordered now).\n6. `ChainMap` — chains multiple dicts for lookup. Useful for layered configs (defaults + overrides).",
    codeExamples: [
      {
        lang: "python",
        code: `from collections import Counter, defaultdict, namedtuple, deque

# Counter — counting
words = "the cat sat on the mat the cat".split()
c = Counter(words)
print(c)  # Counter({'the': 2, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1})
print(c.most_common(2))  # [('the', 2), ('cat', 2)]

# defaultdict — no more key checking
groups = defaultdict(list)
for name, dept in [("Alice", "Eng"), ("Bob", "Sales"), ("Carol", "Eng")]:
    groups[dept].append(name)
print(groups)  # {'Eng': ['Alice', 'Carol'], 'Sales': ['Bob']}

# namedtuple — lightweight immutable record
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # 3 4
print(p[0], p[1])  # 3 4 (still a tuple!)

# deque — O(1) at both ends
dq = deque([1, 2, 3])
dq.appendleft(0)
dq.append(4)
print(dq)  # deque([0, 1, 2, 3, 4])
dq.popleft()  # 0 — O(1), unlike list.pop(0) which is O(n)`,
        output: `Counter({'the': 2, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1})
[('the', 2), ('cat', 2)]
{'Eng': ['Alice', 'Carol'], 'Sales': ['Bob']}
3 4
3 4
deque([0, 1, 2, 3, 4])`,
        note: "defaultdict(list) replaces the `if key not in d: d[key] = []` pattern — cleaner and more Pythonic."
      }
    ],
    marginNotes: [
      "`defaultdict(list)` replaces the `if key not in d: d[key] = []` pattern — cleaner and more Pythonic.",
      "`Counter` is perfect for frequency counting. `c.most_common(n)` gives the top n most frequent items.",
      "`deque` is O(1) at both ends. `list.pop(0)` is O(n) — use deque if you need fast front operations.",
      "`namedtuple` is a lightweight alternative to a full class when you just need immutable fields."
    ],
    commonMistakes: [
      "Using `defaultdict` with a mutable default like `defaultdict({})` — the factory must be callable: `defaultdict(dict)`.",
      "Expecting `namedtuple` to be mutable — it's a tuple, so immutable. Use a dataclass if you need mutability.",
      "Using `list.pop(0)` in a hot loop — it's O(n). Use `deque.popleft()` which is O(1)."
    ],
    relatedTopics: ["Lists & Tuples", "Dataclasses", "Itertools Module"],
    externalLinks: [
      { label: "Python Docs: collections", url: "https://docs.python.org/3/library/collections.html" },
      { label: "Python Docs: Counter", url: "https://docs.python.org/3/library/collections.html#collections.Counter" }
    ],
    mcqs: [
      {
        question: "What does `defaultdict(list)` do when you access a missing key?",
        options: ["Raises KeyError", "Creates a new empty list automatically", "Returns None", "Returns an error"],
        answer: 1,
        explanations: ["That's a regular dict.", "Correct — defaultdict calls the factory (list) to create a default value for missing keys.", "It doesn't return None.", "It creates a default."],
        difficulty: "easy"
      },
      {
        question: "What is Counter most useful for?",
        options: ["Sorting lists", "Counting hashable items / frequency analysis", "Removing duplicates", "Grouping by key"],
        answer: 1,
        explanations: ["Use sorted() for that.", "Correct — Counter counts occurrences of items. most_common(n) gives the top n.", "Use a set for that.", "Use defaultdict for that."],
        difficulty: "easy"
      },
      {
        question: "Why use deque instead of list for a queue?",
        options: ["deque is faster for indexing", "deque has O(1) append/pop at both ends; list is O(n) at the front", "deque uses less memory", "deque is thread-safe"],
        answer: 1,
        explanations: ["Lists are faster for indexing.", "Correct — list.pop(0) is O(n) because all elements shift; deque.popleft() is O(1).", "Memory isn't the main reason.", "Neither is inherently thread-safe."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "itertools-module",
    title: "The itertools Module",
    difficulty: "medium",
    definition: "itertools provides fast, memory-efficient tools for working with iterators: chain (flatten iterables), cycle (repeat infinitely), islice (slice an iterator), product (cartesian product), permutations, combinations, groupby, accumulate, and starmap. These are building blocks for functional-style data processing that work on infinite streams without materializing everything in memory.",
    coreUnderstanding: "itertools is the functional programmer's toolkit in Python. It provides iterator-based building blocks that are lazy (memory-efficient) and composable. chain flattens multiple iterables into one. product gives the cartesian product (nested loops as a single iterator). groupby groups consecutive elements by a key. The key insight: all itertools functions return iterators, not lists — they're lazy and can handle infinite streams. They're the building blocks for data pipelines.",
    howItWorks: "1. `chain(*iterables)` — chains multiple iterables into one. `chain.from_iterable` for a list of iterables.\n2. `product(*iterables)` — cartesian product. `product('AB', '12')` = A1, A2, B1, B2. Like nested for loops.\n3. `permutations(iterable, r)` — all r-length permutations. `combinations(iterable, r)` — all r-length combinations.\n4. `groupby(iterable, key)` — groups CONSECUTIVE elements by key. Sort first if you need all groups.\n5. `islice(iterable, start, stop, step)` — slice an iterator (can't go backwards).\n6. `accumulate(iterable, func)` — running accumulation (sum by default, or any binary func).\n7. `cycle(iterable)` — repeats the iterable infinitely. `count(start, step)` — infinite arithmetic sequence.",
    codeExamples: [
      {
        lang: "python",
        code: `import itertools

# chain — flatten iterables
a = [1, 2, 3]
b = [4, 5, 6]
print(list(itertools.chain(a, b)))  # [1, 2, 3, 4, 5, 6]

# product — cartesian product (like nested loops)
for x, y in itertools.product('AB', '12'):
    print(x, y, end="  ")
# A 1  A 2  B 1  B 2

# combinations & permutations
print(list(itertools.combinations('ABC', 2)))
# [('A','B'), ('A','C'), ('B','C')]
print(list(itertools.permutations('ABC', 2)))
# [('A','B'), ('A','C'), ('B','A'), ('B','C'), ('C','A'), ('C','B')]

# groupby — group consecutive elements
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4)]
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))
# A [('A', 1), ('A', 2)]
# B [('B', 3), ('B', 4)]

# accumulate — running sum
print(list(itertools.accumulate([1, 2, 3, 4])))
# [1, 3, 6, 10]`,
        output: `[1, 2, 3, 4, 5, 6]
A 1  A 2  B 1  B 2
[('A', 'B'), ('A', 'C'), ('B', 'C')]
[('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
A [('A', 1), ('A', 2)]
B [('B', 3), ('B', 4)]
[1, 3, 6, 10]`,
        note: "groupby only groups CONSECUTIVE elements. Sort by key first if you want all items in each group."
      }
    ],
    marginNotes: [
      "`groupby` only groups CONSECUTIVE elements with the same key. Sort by key first if you want all items grouped together.",
      "All itertools functions return iterators, not lists. Wrap in list() to see the values, or iterate directly.",
      "`product` replaces nested for loops: `product(A, B)` = `for a in A: for b in B:`.",
      "`combinations` = order doesn't matter (subsets). `permutations` = order matters (arrangements)."
    ],
    commonMistakes: [
      "Using `groupby` without sorting first — it only groups consecutive elements, so unsorted data gives fragmented groups.",
      "Forgetting that itertools functions return iterators — they're exhausted after one pass. Convert to list if needed.",
      "Confusing combinations (order doesn't matter) with permutations (order matters)."
    ],
    relatedTopics: ["Generators & Yield", "Collections Module", "Functional Programming"],
    externalLinks: [
      { label: "Python Docs: itertools", url: "https://docs.python.org/3/library/itertools.html" },
      { label: "Itertools Recipes", url: "https://docs.python.org/3/library/itertools.html#itertools-recipes" }
    ],
    mcqs: [
      {
        question: "What does itertools.groupby do?",
        options: ["Groups all elements by key", "Groups CONSECUTIVE elements by key", "Sorts then groups", "Removes duplicates"],
        answer: 1,
        explanations: ["It only groups consecutive elements.", "Correct — groupby groups consecutive elements with the same key. Sort first for full grouping.", "It doesn't sort.", "It groups, not deduplicates."],
        difficulty: "medium"
      },
      {
        question: "What do itertools functions return?",
        options: ["Lists", "Iterators (lazy)", "Tuples", "Generators"],
        answer: 1,
        explanations: ["They return iterators, not lists.", "Correct — all itertools functions return lazy iterators. Wrap in list() to materialize.", "Not tuples specifically.", "Iterators, which are a generalization of generators."],
        difficulty: "easy"
      },
      {
        question: "What is the difference between combinations and permutations?",
        options: ["They're the same", "Combinations: order doesn't matter; permutations: order matters", "Combinations are faster", "Permutations are shorter"],
        answer: 1,
        explanations: ["They differ in order sensitivity.", "Correct — combinations are subsets (order irrelevant); permutations are arrangements (order matters).", "Speed isn't the difference.", "Length depends on r, not the function."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "functools-module",
    title: "The functools Module",
    difficulty: "medium",
    definition: "functools provides higher-order functions: lru_cache (memoization — caches function results), partial (pre-fill some arguments), reduce (cumulative application), wraps (preserve metadata on decorated functions), and total_ordering (fill in comparison methods from __eq__ and one ordering method). lru_cache is especially powerful for dynamic programming and expensive pure function calls.",
    coreUnderstanding: "functools is the functional programming companion to itertools. The standout is lru_cache: it memoizes function results — if you call the function again with the same arguments, it returns the cached result instead of recomputing. This turns exponential recursive functions (like naive Fibonacci) into linear ones with a single decorator. partial creates a new function with some arguments pre-filled — useful for callbacks. wraps preserves function metadata in decorators. reduce applies a function cumulatively (like a running fold).",
    howItWorks: "1. `@lru_cache(maxsize=128)` — caches the last 128 unique calls. `maxsize=None` for unlimited. Only works with hashable args.\n2. `partial(func, *args, **kwargs)` — returns a new function with those args pre-filled. `partial(print, sep='|')`.\n3. `reduce(func, iterable, initial)` — cumulatively applies func: `reduce(lambda a,b: a+b, [1,2,3,4])` = 10.\n4. `@wraps(func)` — copies func's __name__, __doc__, etc. to the wrapper. Essential for decorators.\n5. `@total_ordering` — fill in all comparison methods from __eq__ and one of __lt__/__le__/__gt__/__ge__.\n6. `@cache` (Python 3.9+) — like lru_cache(maxsize=None). Simpler syntax for unlimited caching.",
    codeExamples: [
      {
        lang: "python",
        code: `from functools import lru_cache, partial, reduce, wraps

# lru_cache — memoization (game changer for recursion)
@lru_cache(maxsize=None)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

print(fib(100))  # 354224848179261915075 — instant!
print(fib.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=None, currsize=101)

# partial — pre-fill arguments
def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)
print(square(5))  # 25
print(cube(3))    # 27

# reduce — cumulative application
product = reduce(lambda a, b: a * b, [1, 2, 3, 4])
print(product)  # 24 = ((1*2)*3)*4

# total_ordering — fill in missing comparisons
from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, grade):
        self.name, self.grade = name, grade
    def __eq__(self, other):
        return self.grade == other.grade
    def __lt__(self, other):
        return self.grade < other.grade
# Now <=, >, >= all work automatically!`,
        output: `354224848179261915075
CacheInfo(hits=98, misses=101, maxsize=None, currsize=101)
25
27
24`,
        note: "lru_cache only works with hashable arguments. Lists and dicts can't be cached — convert to tuples or frozensets."
      }
    ],
    marginNotes: [
      "`lru_cache` is a game-changer for recursive functions. It turns O(2^n) Fibonacci into O(n) with one decorator.",
      "`lru_cache` only works with hashable arguments. Lists and dicts can't be cached — use tuples or frozensets.",
      "`partial` pre-fills arguments, creating a new callable. Great for callbacks and configuration.",
      "`reduce` was moved to functools in Python 3. It's less needed now — use sum(), any(), all(), or a loop for most cases."
    ],
    commonMistakes: [
      "Using `lru_cache` with unhashable arguments (lists, dicts) — TypeError. Convert to tuples/frozensets first.",
      "Forgetting `@wraps` in custom decorators — the wrapper loses the original function's name and docstring.",
      "Using `reduce` when a simpler built-in (sum, any, all) would do — reduce is often less readable."
    ],
    relatedTopics: ["Decorators", "Lambda & Higher-Order Functions", "Generators & Yield"],
    externalLinks: [
      { label: "Python Docs: functools", url: "https://docs.python.org/3/library/functools.html" },
      { label: "Python Docs: lru_cache", url: "https://docs.python.org/3/library/functools.html#functools.lru_cache" }
    ],
    mcqs: [
      {
        question: "What does lru_cache do?",
        options: ["Sorts results", "Caches function results — same args return cached result", "Limits execution time", "Reduces memory usage"],
        answer: 1,
        explanations: ["It doesn't sort.", "Correct — lru_cache memoizes: repeated calls with the same args return the cached result without recomputing.", "It doesn't limit time.", "It uses memory for the cache."],
        difficulty: "medium"
      },
      {
        question: "What is a limitation of lru_cache?",
        options: ["It's slow", "Arguments must be hashable (no lists or dicts)", "It only works on recursive functions", "It has a size limit of 10"],
        answer: 1,
        explanations: ["It's fast.", "Correct — lru_cache uses a dict keyed on arguments, so they must be hashable. Lists and dicts fail.", "It works on any function.", "maxsize is configurable (default 128)."],
        difficulty: "medium"
      },
      {
        question: "What does partial(func, arg) do?",
        options: ["Calls func with arg", "Returns a new function with arg pre-filled", "Removes arg from func", "Caches func(arg)"],
        answer: 1,
        explanations: ["It doesn't call it immediately.", "Correct — partial returns a new callable with the given arguments pre-filled.", "It doesn't remove arguments.", "That's lru_cache."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "args-kwargs",
    title: "*args and **kwargs",
    difficulty: "medium",
    definition: "*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict. They let functions accept variable numbers of arguments. The same syntax unpacks when calling: func(*list) or func(**dict). This is how Python functions forward arguments to other functions, a common pattern in decorators and wrapper functions.",
    coreUnderstanding: "*args and **kwargs are Python's way of handling variable arguments. In a function definition, *args collects extra positional arguments into a tuple, and **kwargs collects extra keyword arguments into a dict. When calling a function, the same syntax unpacks: `func(*list)` unpacks a list as positional args, `func(**dict)` unpacks a dict as keyword args. This is essential for decorators, wrapper functions, and flexible APIs. The names 'args' and 'kwargs' are convention — only the * and ** matter.",
    howItWorks: "1. `def f(*args):` — collects all positional arguments into a tuple named args.\n2. `def f(**kwargs):` — collects all keyword arguments into a dict named kwargs.\n3. `def f(a, b, *args, **kwargs):` — a and b are required, extras go to args/kwargs.\n4. Order: positional -> *args -> keyword-only -> **kwargs. Keyword-only args come after *args.\n5. Unpacking on call: `func(*[1, 2, 3])` = `func(1, 2, 3)`. `func(**{'x': 1})` = `func(x=1)`.\n6. Forwarding: `def wrapper(*args, **kwargs): return original(*args, **kwargs)` — passes all args through.\n7. Keyword-only arguments: `def f(a, *, b):` — b can only be passed as keyword: `f(1, b=2)`.",
    codeExamples: [
      {
        lang: "python",
        code: `# Collecting arguments
def show_args(*args, **kwargs):
    print(f"args: {args}")    # tuple
    print(f"kwargs: {kwargs}") # dict

show_args(1, 2, 3, name="Alice", age=30)
# args: (1, 2, 3)
# kwargs: {'name': 'Alice', 'age': 30}

# Unpacking when calling
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))  # 6 — unpacks list as positional args

config = {"a": 10, "b": 20, "c": 30}
print(add(**config))  # 60 — unpacks dict as keyword args

# Forwarding (common in decorators)
def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}({args}, {kwargs})")
        return func(*args, **kwargs)  # forward all args
    return wrapper

# Keyword-only arguments (after *)
def f(a, b, *, required_kw):
    return a + b + required_kw

print(f(1, 2, required_kw=3))  # 6
# f(1, 2, 3) would error — required_kw must be keyword`,
        output: `args: (1, 2, 3)
kwargs: {'name': 'Alice', 'age': 30}
6
60
Calling add((1, 2, 3), {})
6`,
        note: "The names args and kwargs are just convention — only the * and ** matter. You could write *stuff, **options."
      }
    ],
    marginNotes: [
      "The names `args` and `kwargs` are convention — only `*` and `**` matter. You could write `*stuff, **options`.",
      "Keyword-only arguments come after `*args` or a bare `*`: `def f(a, *, b):` — b must be passed as keyword.",
      "Unpacking works on any iterable for `*` (lists, tuples, generators) and any mapping for `**` (dicts).",
      "The parameter order is: positional -> *args -> keyword-only -> **kwargs. This is enforced by Python syntax."
    ],
    commonMistakes: [
      "Putting `**kwargs` before `*args` in the parameter list — syntax error. Order must be positional, *args, **kwargs.",
      "Forgetting to unpack when forwarding: `func(args, kwargs)` instead of `func(*args, **kwargs)` — passes the tuple and dict as two arguments.",
      "Confusing `*` in a definition (collect) with `*` in a call (unpack) — same syntax, different context."
    ],
    relatedTopics: ["Functions & Parameters", "Decorators", "Lambda & Higher-Order Functions"],
    externalLinks: [
      { label: "Python Docs: Function Definitions", url: "https://docs.python.org/3/reference/compound_stmts.html#function-definitions" },
      { label: "PEP 3102 — Keyword-Only Arguments", url: "https://peps.python.org/pep-3102/" }
    ],
    mcqs: [
      {
        question: "What do *args and **kwargs collect?",
        options: ["Both collect positional args", "*args: positional (tuple); **kwargs: keyword (dict)", "Both collect keyword args", "They're the same"],
        answer: 1,
        explanations: ["They differ in what they collect.", "Correct — *args collects extra positional args into a tuple; **kwargs collects extra keyword args into a dict.", "Only **kwargs collects keyword args.", "They're different."],
        difficulty: "easy"
      },
      {
        question: "What does `func(*list)` do when calling a function?",
        options: ["Passes the list as a single argument", "Unpacks the list as positional arguments", "Creates a tuple", "Errors"],
        answer: 1,
        explanations: ["That's func(list).", "Correct — * unpacks the list so each element becomes a separate positional argument.", "It unpacks, not creates.", "Valid syntax."],
        difficulty: "medium"
      },
      {
        question: "Are 'args' and 'kwargs' required names?",
        options: ["Yes, they're keywords", "No — only * and ** matter; the names are convention", "Only kwargs is required", "Only args is required"],
        answer: 1,
        explanations: ["They're not keywords.", "Correct — * and ** are the operators; 'args' and 'kwargs' are just conventional names. You can use any name.", "Neither is required.", "Neither is required."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "mutability",
    title: "Mutable vs Immutable Types",
    difficulty: "medium",
    definition: "Immutable types (int, float, str, tuple, frozenset) cannot be changed after creation — any 'modification' creates a new object. Mutable types (list, dict, set) can be modified in place. This distinction matters for aliasing, dict keys (only hashable/immutable types work), default argument values (mutable defaults are a classic bug), and thread safety.",
    coreUnderstanding: "The mutable/immutable distinction is fundamental in Python. Immutable types (int, str, tuple) can't be changed — `x = x + 1` creates a new int object and rebinds x. Mutable types (list, dict, set) can be changed in place — `lst.append(1)` modifies the same object. This matters for three reasons: (1) aliasing — `b = a` shares a mutable object, so changing b changes a; (2) dict keys — only hashable (immutable) types can be keys; (3) default arguments — mutable defaults are shared across all calls, a classic bug.",
    howItWorks: "1. Immutable: int, float, str, tuple, frozenset, bool. `x = 5; x += 1` creates a new int, x points to it.\n2. Mutable: list, dict, set. `lst.append(1)` modifies the same object in place.\n3. Aliasing: `a = [1]; b = a; b.append(2)` — a is now [1, 2] because a and b are the same object.\n4. `id(x)` — check if two names point to the same object. `a is b` checks identity.\n5. Dict keys must be hashable — immutable types work, mutable types don't (TypeError: unhashable).\n6. Mutable default arguments: `def f(x=[])` — the same list is shared across all calls. Use `x=None` instead.\n7. Tuples are immutable, but can contain mutable objects: `t = ([1,2],)` — `t[0].append(3)` works.",
    codeExamples: [
      {
        lang: "python",
        code: `# Immutable: modification creates a new object
x = 5
print(id(x))  # 140234866423344
x = x + 1
print(id(x))  # 140234866423376 — different object!

# Mutable: modification is in-place
lst = [1, 2, 3]
print(id(lst))  # 140234865890240
lst.append(4)
print(id(lst))  # 140234865890240 — same object!

# Aliasing — the classic trap
a = [1, 2, 3]
b = a          # b and a are the SAME object
b.append(4)
print(a)       # [1, 2, 3, 4] — a changed too!

# To copy: use .copy() or list()
c = a.copy()   # c is a NEW list
c.append(5)
print(a)       # [1, 2, 3, 4] — a unchanged

# Mutable default argument bug
def add_item(item, lst=[]):  # BAD!
    lst.append(item)
    return lst

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] — same list! Not [2]!

# Fix: use None
def add_item_fixed(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst`,
        output: `140234866423344
140234866423376
140234865890240
140234865890240
[1, 2, 3, 4]
[1, 2, 3, 4]
[1]
[1, 2]
[2]`,
        note: "The mutable default argument bug is one of Python's most famous gotchas. Always use None as the default and create inside."
      }
    ],
    marginNotes: [
      "The mutable default argument bug is Python's most famous gotcha: `def f(x=[])` shares the same list across all calls.",
      "Immutable types: int, float, str, tuple, frozenset, bool. Mutable types: list, dict, set.",
      "Tuples are immutable, but can contain mutable objects: `t = ([1],)` — `t[0].append(2)` works because the tuple holds a reference.",
      "Use `.copy()` for a shallow copy. For nested structures, use `copy.deepcopy()` to avoid shared inner objects."
    ],
    commonMistakes: [
      "Using a mutable default argument (`def f(x=[])`) — the same list is shared across all calls.",
      "Assuming `b = a` copies a list — it aliases. Use `b = a.copy()` or `b = list(a)`.",
      "Forgetting that tuples can contain mutable objects — the tuple is immutable, but its contents can change."
    ],
    relatedTopics: ["Shallow vs Deep Copy", "Variables & Dynamic Typing", "Functions & Parameters"],
    externalLinks: [
      { label: "Python Docs: Data Model", url: "https://docs.python.org/3/reference/datamodel.html" },
      { label: "EFFBot: Mutable Default Arguments", url: "https://docs.python-guide.org/writing/gotchas/#mutable-default-arguments" }
    ],
    mcqs: [
      {
        question: "Which types are immutable in Python?",
        options: ["list, dict, set", "int, str, tuple, frozenset", "dict, set", "list, tuple"],
        answer: 1,
        explanations: ["Those are mutable.", "Correct — int, float, str, tuple, frozenset, bool are immutable.", "Both mutable.", "list is mutable, tuple is immutable."],
        difficulty: "easy"
      },
      {
        question: "What is wrong with `def f(x=[])`?",
        options: ["Syntax error", "The same list is shared across all calls without an explicit argument", "x must be a tuple", "Nothing"],
        answer: 1,
        explanations: ["Valid syntax.", "Correct — the default is evaluated once at definition, so all calls share the same list object.", "Lists are valid defaults syntactically.", "It's a well-known bug."],
        difficulty: "medium"
      },
      {
        question: "After `a = [1]; b = a; b.append(2)`, what is a?",
        options: ["[1]", "[1, 2]", "[2]", "Error"],
        answer: 1,
        explanations: ["a changed — b and a are the same object.", "Correct — assignment aliases, so mutating b mutates a.", "a still has 1.", "No error."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "shallow-deep-copy",
    title: "Shallow vs Deep Copy",
    difficulty: "medium",
    definition: "Assignment aliases (same object). copy.copy() creates a shallow copy — new outer container, but inner objects are shared. copy.deepcopy() recursively copies everything, creating fully independent duplicates. Nested mutable structures (list of lists, dict of dicts) need deepcopy to be truly independent. Forgetting this leads to shared-state bugs that are extremely hard to trace.",
    coreUnderstanding: "There are three levels of copying in Python: (1) assignment (`b = a`) — no copy, b and a are the same object; (2) shallow copy (`b = a.copy()` or `copy.copy(a)`) — new outer container, but inner objects are shared; (3) deep copy (`copy.deepcopy(a)`) — everything is recursively copied, fully independent. For flat structures (list of ints), shallow copy is enough. For nested structures (list of lists), you need deepcopy — otherwise modifying an inner object in the copy also modifies the original.",
    howItWorks: "1. Assignment: `b = a` — b and a are the same object. `b is a` is True.\n2. Shallow copy: `b = a.copy()` or `copy.copy(a)` or `b = list(a)` — new outer object, inner objects shared.\n3. Deep copy: `b = copy.deepcopy(a)` — recursively copies everything. Fully independent.\n4. For flat structures (list of ints), shallow copy is enough — ints are immutable, so sharing is fine.\n5. For nested structures (list of lists), shallow copy shares inner lists — modifying one affects both.\n6. `copy.deepcopy` handles circular references correctly (it tracks already-copied objects).\n7. Slicing creates a shallow copy: `b = a[:]` for lists. Same as `a.copy()`.",
    codeExamples: [
      {
        lang: "python",
        code: `import copy

# Assignment — no copy (aliasing)
a = [1, 2, 3]
b = a
print(b is a)  # True — same object
b.append(4)
print(a)  # [1, 2, 3, 4] — a changed!

# Shallow copy — new outer, shared inner
matrix = [[1, 2], [3, 4]]
shallow = matrix.copy()  # or copy.copy(matrix)
shallow[0][0] = 99
print(matrix)  # [[99, 2], [3, 4]] — inner list is shared!
print(shallow[0] is matrix[0])  # True — same inner object

# Deep copy — fully independent
matrix2 = [[1, 2], [3, 4]]
deep = copy.deepcopy(matrix2)
deep[0][0] = 99
print(matrix2)  # [[1, 2], [3, 4]] — original unchanged!
print(deep[0] is matrix2[0])  # False — different inner objects

# Flat structures — shallow copy is enough
flat = [1, 2, 3]
flat_copy = flat.copy()
flat_copy[0] = 99
print(flat)  # [1, 2, 3] — ints are immutable, so no sharing issue`,
        output: `True
[1, 2, 3, 4]
[[99, 2], [3, 4]]
True
[[1, 2], [3, 4]]
False
[1, 2, 3]`,
        note: "For nested mutable structures, always use deepcopy. Shallow copy shares inner objects, leading to subtle bugs."
      }
    ],
    marginNotes: [
      "Assignment aliases, shallow copy shares inner objects, deep copy is fully independent. Know the difference.",
      "For flat structures (list of ints/strings), shallow copy is enough — immutable inner objects can't be modified.",
      "For nested structures (list of lists, dict of dicts), use deepcopy — otherwise inner objects are shared.",
      "Slicing (`a[:]`) creates a shallow copy, same as `a.copy()`. Neither handles nesting."
    ],
    commonMistakes: [
      "Using shallow copy for nested structures — inner objects are shared, so modifying one affects both.",
      "Assuming `b = a` copies — it aliases. `b is a` is True.",
      "Forgetting that slicing (`a[:]`) is a shallow copy — it doesn't deep copy nested structures."
    ],
    relatedTopics: ["Mutable vs Immutable", "Variables & Dynamic Typing", "Lists & Tuples"],
    externalLinks: [
      { label: "Python Docs: copy module", url: "https://docs.python.org/3/library/copy.html" },
      { label: "Python Docs: Assignment vs Copy", url: "https://docs.python.org/3/faq/programming.html#how-do-i-copy-an-object-in-python" }
    ],
    mcqs: [
      {
        question: "What does a shallow copy share with the original?",
        options: ["Nothing", "Inner objects (but new outer container)", "Everything", "Only the first element"],
        answer: 1,
        explanations: ["Deep copy shares nothing.", "Correct — shallow copy creates a new outer container but inner objects are shared references.", "That's assignment.", "It shares all inner objects."],
        difficulty: "medium"
      },
      {
        question: "When do you need deepcopy instead of shallow copy?",
        options: ["Always", "For nested mutable structures (list of lists, dict of dicts)", "For flat lists", "Never"],
        answer: 1,
        explanations: ["Not always.", "Correct — nested mutable structures need deepcopy so inner objects are independent.", "Shallow copy is fine for flat lists.", "deepcopy is needed for nesting."],
        difficulty: "medium"
      },
      {
        question: "What does `b = a` do (where a is a list)?",
        options: ["Creates a copy", "Aliases — b and a are the same object", "Creates a deep copy", "Creates a shallow copy"],
        answer: 1,
        explanations: ["It doesn't copy.", "Correct — assignment creates an alias. b is a is True. No copy is made.", "That's deepcopy.", "That's a.copy()."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "testing-pytest",
    title: "Testing with pytest",
    difficulty: "medium",
    definition: "pytest is the most popular Python testing framework. Tests are plain functions named test_*, using assert statements (no special assert methods). pytest discovers tests automatically, provides rich failure output, and supports fixtures (setup/teardown), parameterization, and markers. Fixtures handle dependency injection for test setup. Run with pytest command, which finds test_*.py files.",
    coreUnderstanding: "pytest is beloved because it's simple and powerful. Tests are plain functions — no class boilerplate, no self.assertEqual. Just `assert x == y`. pytest discovers them automatically (any function named test_* in a file named test_*.py). Fixtures handle setup/teardown and dependency injection — you request a fixture by adding it as a parameter. Parameterization runs the same test with different inputs. The failure output is excellent — it shows the exact values that didn't match. Run `pytest` and it finds and runs everything.",
    howItWorks: "1. Test files: `test_*.py` or `*_test.py`. Test functions: `def test_*():`.\n2. Assertions: `assert x == y`, `assert x in y`, `assert not x` — plain assert, no assertEqual.\n3. `pytest` command — discovers and runs all tests. `pytest -v` for verbose. `pytest test_file.py::test_name` for one test.\n4. Fixtures: `@pytest.fixture` defines setup. Request by adding as a parameter: `def test_f(my_fixture):`.\n5. `@pytest.mark.parametrize` — run the same test with different inputs.\n6. `@pytest.mark.skip` or `@pytest.mark.xfail` — skip or expect failure.\n7. `conftest.py` — shared fixtures available to all tests in the directory and subdirectories.",
    codeExamples: [
      {
        lang: "python",
        code: `# test_math.py
import pytest

# Simple test
def test_addition():
    assert 1 + 1 == 2

def test_string_methods():
    assert "hello".upper() == "HELLO"
    assert "  hi  ".strip() == "hi"

# Fixture — setup for tests
@pytest.fixture
def sample_list():
    return [1, 2, 3, 4, 5]

def test_sum(sample_list):
    assert sum(sample_list) == 15

def test_length(sample_list):
    assert len(sample_list) == 5

# Parameterize — run with multiple inputs
@pytest.mark.parametrize("a, b, expected", [
    (1, 2, 3),
    (5, 5, 10),
    (-1, 1, 0),
    (0, 0, 0),
])
def test_add(a, b, expected):
    assert a + b == expected

# Fixture with teardown (using yield)
@pytest.fixture
def temp_file(tmp_path):
    f = tmp_path / "test.txt"
    f.write_text("hello")
    yield f  # test runs here
    f.unlink()  # teardown — cleanup

def test_file_content(temp_file):
    assert temp_file.read_text() == "hello"

# Run: pytest test_math.py -v`,
        output: `test_math.py::test_addition PASSED
test_math.py::test_string_methods PASSED
test_math.py::test_sum PASSED
test_math.py::test_length PASSED
test_math.py::test_add[1-2-3] PASSED
test_math.py::test_add[5-5-10] PASSED
test_math.py::test_add[-1-1-0] PASSED
test_math.py::test_add[0-0-0] PASSED
test_math.py::test_file_content PASSED`,
        note: "pytest uses plain assert — no assertEqual, assertTrue, etc. It introspects the assertion to show what failed."
      }
    ],
    marginNotes: [
      "pytest uses plain `assert` — no self.assertEqual. It introspects the expression to show exactly what failed.",
      "Fixtures handle setup/teardown via dependency injection — just add the fixture name as a parameter.",
      "`conftest.py` holds shared fixtures — available to all tests in that directory and subdirectories automatically.",
      "`@pytest.mark.parametrize` runs the same test with different inputs — great for testing edge cases."
    ],
    commonMistakes: [
      "Using unittest-style assertEqual in pytest — just use `assert x == y`.",
      "Forgetting the `test_` prefix on test functions — pytest won't discover them.",
      "Not using fixtures for setup — duplicating setup code across tests instead of injecting a fixture."
    ],
    relatedTopics: ["Error Handling", "Modules & Packages", "Logging Module"],
    externalLinks: [
      { label: "pytest Documentation", url: "https://docs.pytest.org/" },
      { label: "pytest Fixtures", url: "https://docs.pytest.org/en/stable/explanation/fixtures.html" }
    ],
    mcqs: [
      {
        question: "How does pytest discover test functions?",
        options: ["By class name", "By function name starting with test_", "By decorators", "By file name only"],
        answer: 1,
        explanations: ["Not class-based.", "Correct — pytest finds any function named test_* in files named test_*.py.", "Decorators are optional.", "File name matters but function name is key."],
        difficulty: "easy"
      },
      {
        question: "How do you assert in pytest?",
        options: ["self.assertEqual(a, b)", "assert a == b", "pytest.assert(a, b)", "EXPECT(a == b)"],
        answer: 1,
        explanations: ["That's unittest.", "Correct — pytest uses plain assert statements. It introspects the expression on failure.", "Not a real function.", "Not Python syntax."],
        difficulty: "easy"
      },
      {
        question: "What is a pytest fixture?",
        options: ["A test that always passes", "Setup/teardown code injected into tests via parameters", "A type of assertion", "A test runner"],
        answer: 1,
        explanations: ["No, fixtures are for setup.", "Correct — fixtures provide setup (and teardown via yield) to tests through dependency injection.", "It's not an assertion.", "It's not the runner."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "logging-module",
    title: "The logging Module",
    difficulty: "medium",
    definition: "The logging module provides a flexible framework for emitting log messages at levels: DEBUG, INFO, WARNING, ERROR, CRITICAL. Loggers form a hierarchy; handlers route messages to files/console; formatters control layout. Always use logging instead of print for production code — it supports levels, routing, timestamps, and can be configured without code changes.",
    coreUnderstanding: "Logging is the professional alternative to print. It gives you levels (DEBUG for details, INFO for progress, WARNING for concerns, ERROR for failures, CRITICAL for disasters), routing (send to console, file, or network), and formatting (timestamps, log levels, module names). The logger hierarchy means you can configure the root logger and all child loggers inherit. The key: use `logging.getLogger(__name__)` in each module — this creates a logger named after the module, and you can control levels per module.",
    howItWorks: "1. `import logging; logging.basicConfig(level=logging.INFO)` — basic config (call once at program start).\n2. `logger = logging.getLogger(__name__)` — get a logger named after the current module.\n3. Levels (ascending): DEBUG(10), INFO(20), WARNING(30), ERROR(40), CRITICAL(50). Messages below the level are ignored.\n4. `logger.info(\"message\")`, `logger.error(\"failed: %s\", detail)` — log at a level.\n5. Handlers: `StreamHandler` (console), `FileHandler` (file). A logger can have multiple handlers.\n6. Formatters: `logging.Formatter('%(asctime)s %(name)s %(levelname)s: %(message)s')` — control output format.\n7. `logger.setLevel(logging.DEBUG)` — control what this logger emits. Child loggers propagate to parent by default.",
    codeExamples: [
      {
        lang: "python",
        code: `import logging

# Basic configuration (do once at program start)
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)

# Get a logger for this module
logger = logging.getLogger(__name__)

# Log at different levels
logger.debug("Detailed debug info")
logger.info("Normal operation")
logger.warning("Something concerning")
logger.error("An error occurred")
logger.critical("System is broken!")

# Advanced: per-module log levels
db_logger = logging.getLogger("database")
db_logger.setLevel(logging.WARNING)  # only warnings+ from database module

# Exception logging
try:
    1 / 0
except ZeroDivisionError:
    logger.exception("Division failed")  # includes traceback!`,
        output: `2024-01-15 10:30:00,123 [DEBUG] __main__: Detailed debug info
2024-01-15 10:30:00,124 [INFO] __main__: Normal operation
2024-01-15 10:30:00,124 [WARNING] __main__: Something concerning
2024-01-15 10:30:00,125 [ERROR] __main__: An error occurred
2024-01-15 10:30:00,125 [CRITICAL] __main__: System is broken!
2024-01-15 10:30:00,126 [ERROR] __main__: Division failed
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
ZeroDivisionError: division by zero`,
        note: "Use `logger.exception()` in an except block — it automatically includes the traceback, unlike logger.error()."
      }
    ],
    marginNotes: [
      "Use `logging.getLogger(__name__)` in each module — creates a logger named after the module, enabling per-module control.",
      "Use `logger.exception()` in except blocks — it logs the message AND the full traceback. `logger.error()` doesn't include the traceback.",
      "Levels: DEBUG(10) < INFO(20) < WARNING(30) < ERROR(40) < CRITICAL(50). Messages below the set level are ignored.",
      "Don't use print for production code. Logging gives levels, routing, timestamps, and can be configured without code changes."
    ],
    commonMistakes: [
      "Using `print` instead of `logging` in production — no levels, no routing, no timestamps, can't be configured without code changes.",
      "Using `logger.error()` in an except block instead of `logger.exception()` — you lose the traceback.",
      "Calling `basicConfig` multiple times — only the first call has effect. Configure once at program start."
    ],
    relatedTopics: ["Error Handling", "Testing with pytest", "File Handling"],
    externalLinks: [
      { label: "Python Docs: logging", url: "https://docs.python.org/3/library/logging.html" },
      { label: "Python Docs: Logging HOWTO", url: "https://docs.python.org/3/howto/logging.html" }
    ],
    mcqs: [
      {
        question: "Why use logging instead of print in production?",
        options: ["It's faster", "It supports levels, routing, and timestamps, configurable without code changes", "It's required", "print is deprecated"],
        answer: 1,
        explanations: ["Speed isn't the main reason.", "Correct — logging gives levels, handlers, formatters, and can be configured via config files.", "It's not required.", "print is not deprecated."],
        difficulty: "easy"
      },
      {
        question: "What does `logger.exception()` do that `logger.error()` doesn't?",
        options: ["Logs at a higher level", "Includes the full traceback", "Sends to a file", "Nothing different"],
        answer: 1,
        explanations: ["Same level (ERROR).", "Correct — logger.exception() includes the traceback, making it ideal for except blocks.", "Handler routing is separate.", "It includes the traceback."],
        difficulty: "medium"
      },
      {
        question: "What is the correct way to get a logger in a module?",
        options: ["logging.getLogger()", "logging.getLogger(__name__)", "logging.create_logger()", "logging.Logger()"],
        answer: 1,
        explanations: ["That gets the root logger.", "Correct — getLogger(__name__) creates a logger named after the module, enabling per-module control.", "Not a real function.", "Not the API."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "class-methods-static-methods",
    title: "Class Methods & Static Methods",
    difficulty: "medium",
    definition: "@classmethod receives the class (cls) as the first argument instead of the instance — used for factory methods and alternative constructors. @staticmethod receives neither self nor cls — it's just a function that happens to live in the class namespace for organizational purposes. Regular instance methods receive self. Choose based on what the method needs access to.",
    coreUnderstanding: "Python has three types of methods. Instance methods (default) receive `self` — they operate on an instance. Class methods (`@classmethod`) receive `cls` — they operate on the class itself, useful for factory methods (alternative constructors). Static methods (`@staticmethod`) receive neither — they're just functions placed in the class for organization, without access to instance or class. The choice depends on what the method needs: instance data -> instance method, class data or alternative construction -> class method, neither -> static method.",
    howItWorks: "1. Instance method (default): `def method(self, args):` — receives the instance as first arg.\n2. `@classmethod`: `def method(cls, args):` — receives the class as first arg. Called on class or instance.\n3. `@staticmethod`: `def method(args):` — receives neither self nor cls. Just a function in the class.\n4. Factory methods: `@classmethod` is perfect for alternative constructors: `Date.from_string('2024-01-15')`.\n5. Static methods are for utility functions related to the class but not needing class/instance data.\n6. All three are called the same way: `obj.method(args)` or `ClassName.method(args)`.",
    codeExamples: [
      {
        lang: "python",
        code: `class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    # Instance method — uses self
    def display(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

    # Class method — factory / alternative constructor
    @classmethod
    def from_string(cls, date_str):
        year, month, day = map(int, date_str.split('-'))
        return cls(year, month, day)  # cls is Date (or a subclass!)

    @classmethod
    def today(cls):
        import datetime
        t = datetime.date.today()
        return cls(t.year, t.month, t.day)

    # Static method — utility, no self or cls
    @staticmethod
    def is_valid_date(year, month, day):
        try:
            datetime.date(year, month, day)
            return True
        except ValueError:
            return False

# Instance method
d = Date(2024, 1, 15)
print(d.display())  # 2024-01-15

# Class method as factory
d2 = Date.from_string("2024-06-20")
print(d2.display())  # 2024-06-20

# Static method — no instance needed
print(Date.is_valid_date(2024, 2, 30))  # False`,
        output: `2024-01-15
2024-06-20
False`,
        note: "@classmethod is the Pythonic way to create factory methods / alternative constructors. cls is the class, so it works with inheritance."
      }
    ],
    marginNotes: [
      "`@classmethod` is the Pythonic way to create factory methods. `cls` is the class, so it works correctly with inheritance.",
      "`@staticmethod` is just a function in the class namespace — no self, no cls. Use it for utility functions related to the class.",
      "Choose by what the method needs: instance data -> instance method, class data/factory -> class method, neither -> static method.",
      "All three are called the same way: `obj.method()` or `ClassName.method()`. The difference is what the first parameter receives."
    ],
    commonMistakes: [
      "Using `@staticmethod` when the method needs class data — it receives neither self nor cls. Use `@classmethod`.",
      "Forgetting that `@classmethod` receives `cls`, not `self` — the first parameter is the class, not the instance.",
      "Using `@staticmethod` as a factory — it can't create instances because it doesn't have `cls`. Use `@classmethod`."
    ],
    relatedTopics: ["Classes & Objects", "Inheritance & super()", "Properties"],
    externalLinks: [
      { label: "Python Docs: classmethod", url: "https://docs.python.org/3/library/functions.html#classmethod" },
      { label: "Python Docs: staticmethod", url: "https://docs.python.org/3/library/functions.html#staticmethod" }
    ],
    mcqs: [
      {
        question: "What does @classmethod receive as its first argument?",
        options: ["self (the instance)", "cls (the class)", "Nothing", "args"],
        answer: 1,
        explanations: ["That's instance methods.", "Correct — class methods receive the class itself as the first argument.", "That's static methods.", "Not a parameter."],
        difficulty: "easy"
      },
      {
        question: "What is @classmethod commonly used for?",
        options: ["Utility functions", "Factory methods / alternative constructors", "Property getters", "Private methods"],
        answer: 1,
        explanations: ["That's @staticmethod.", "Correct — class methods are the Pythonic way to create factory methods and alternative constructors.", "That's @property.", "Convention, not a decorator."],
        difficulty: "medium"
      },
      {
        question: "What does @staticmethod receive as its first argument?",
        options: ["self", "cls", "Neither self nor cls", "args"],
        answer: 2,
        explanations: ["That's instance methods.", "That's class methods.", "Correct — static methods receive neither self nor cls. They're just functions in the class.", "Not a parameter."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "dataclasses",
    title: "Dataclasses",
    difficulty: "medium",
    definition: "@dataclass (Python 3.7+) auto-generates __init__, __repr__, and __eq__ for classes that are primarily data containers. It eliminates boilerplate for simple value objects. Fields can have defaults, type hints, and custom factory functions for mutable defaults (field(default_factory=list)). frozen=True makes the dataclass immutable. Dataclasses are the modern replacement for namedtuple and manual boilerplate.",
    coreUnderstanding: "Dataclasses eliminate the boilerplate of writing __init__, __repr__, and __eq__ for data-heavy classes. Instead of writing a constructor that just assigns parameters to self, you declare fields with type hints and @dataclass generates everything. It's the modern replacement for namedtuple (which is immutable and lacks methods) and for manual boilerplate. Key features: mutable defaults via `field(default_factory=list)`, frozen=True for immutability, and `__post_init__` for post-construction logic.",
    howItWorks: "1. `@dataclass` above a class — auto-generates __init__, __repr__, __eq__.\n2. Fields: `name: type = default` — type hints are required, defaults are optional.\n3. `field(default_factory=list)` — for mutable defaults (replaces the `x=None` pattern).\n4. `frozen=True` — makes the dataclass immutable (like a namedtuple). Good for hashable instances.\n5. `__post_init__(self)` — called after __init__, for computed fields or validation.\n6. `@dataclass(order=True)` — also generates __lt__, __le__, __gt__, __ge__ for sorting.\n7. `@dataclass(slots=True)` (3.10+) — uses __slots__ for memory efficiency.",
    codeExamples: [
      {
        lang: "python",
        code: `from dataclasses import dataclass, field

@dataclass
class Person:
    name: str
    age: int
    email: str = ""  # default value

p = Person("Alice", 30)
print(p)  # Person(name='Alice', age=30, email='')
print(p == Person("Alice", 30))  # True — __eq__ auto-generated

# Mutable defaults with default_factory
@dataclass
class Student:
    name: str
    grades: list = field(default_factory=list)  # NOT grades: list = []

s = Student("Bob")
s.grades.append(95)
print(s)  # Student(name='Bob', grades=[95])

# Frozen (immutable)
@dataclass(frozen=True)
class Point:
    x: float
    y: float

pt = Point(3.0, 4.0)
# pt.x = 5.0  # FrozenInstanceError!

# __post_init__ for computed fields
@dataclass
class Rectangle:
    width: float
    height: float
    area: float = field(init=False)  # not in __init__

    def __post_init__(self):
        self.area = self.width * self.height

r = Rectangle(3, 4)
print(r.area)  # 12.0`,
        output: `Person(name='Alice', age=30, email='')
True
Student(name='Bob', grades=[95])
12.0`,
        note: "Use `field(default_factory=list)` for mutable defaults — dataclasses forbid bare `list` as a default to prevent the shared-mutable bug."
      }
    ],
    marginNotes: [
      "Use `field(default_factory=list)` for mutable defaults — dataclasses forbid bare `list` to prevent the shared-mutable bug.",
      "`frozen=True` makes the dataclass immutable and hashable — good for dict keys and set members.",
      "`__post_init__` runs after the generated __init__ — use it for computed fields or validation.",
      "`@dataclass(order=True)` generates comparison methods for sorting — like total_ordering but built in."
    ],
    commonMistakes: [
      "Using `grades: list = []` in a dataclass — ValueError. Use `field(default_factory=list)` instead.",
      "Forgetting that type hints are required in dataclasses — `name: str` not just `name`.",
      "Trying to modify a frozen dataclass — FrozenInstanceError. Use `frozen=False` (default) for mutable."
    ],
    relatedTopics: ["Classes & Objects", "Magic Methods", "Mutable vs Immutable"],
    externalLinks: [
      { label: "PEP 557 — Dataclasses", url: "https://peps.python.org/pep-0557/" },
      { label: "Python Docs: dataclasses", url: "https://docs.python.org/3/library/dataclasses.html" }
    ],
    mcqs: [
      {
        question: "What does @dataclass auto-generate?",
        options: ["Only __init__", "__init__, __repr__, and __eq__", "All methods", "Only __str__"],
        answer: 1,
        explanations: ["It generates more than just __init__.", "Correct — dataclass generates __init__, __repr__, and __eq__ by default.", "Not all methods.", "More than just __str__."],
        difficulty: "easy"
      },
      {
        question: "How do you set a mutable default in a dataclass?",
        options: ["field: list = []", "field(default_factory=list)", "field: list = list()", "field: list = None"],
        answer: 1,
        explanations: ["Forbidden — ValueError.", "Correct — use field(default_factory=list) to create a new list per instance.", "Also forbidden.", "Not the pattern."],
        difficulty: "medium"
      },
      {
        question: "What does `@dataclass(frozen=True)` do?",
        options: ["Caches the class", "Makes instances immutable (and hashable)", "Prevents inheritance", "Freezes the module"],
        answer: 1,
        explanations: ["Not caching.", "Correct — frozen=True makes instances immutable, so they're also hashable (can be dict keys).", "It doesn't prevent inheritance.", "Not module-level."],
        difficulty: "medium"
      }
    ]
  }
];