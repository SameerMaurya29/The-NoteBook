// A growing bank of extra quiz questions across every subject.
// Each entry is a standalone MCQ tagged with its origin subject so it can be
// merged into the quiz pool without being attached to a specific topic.
// Shape matches the Topic.mcqs[] items: { question, options, answer, explanations, difficulty }
// plus subjectId / topicId / topicTitle for the quiz runner's bookkeeping.

export const EXTRA_MCQS = [
  // ── DSA ──
  {
    subjectId: "dsa", topicId: "extra", topicTitle: "Mixed DSA", difficulty: "easy",
    question: "What is the time complexity of binary search on a sorted array?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: 1,
    explanations: [
      "Linear search is O(n), but binary search halves the range each step.",
      "Correct — each comparison discards half the remaining elements.",
      "That's sorting complexity (e.g. merge sort), not search.",
      "Only achievable by a hash lookup, not binary search.",
    ],
  },
  {
    subjectId: "dsa", topicId: "extra", topicTitle: "Mixed DSA", difficulty: "easy",
    question: "Which data structure follows FIFO order?",
    options: ["Stack", "Queue", "Binary Tree", "Graph"],
    answer: 1,
    explanations: [
      "A stack is LIFO — last in, first out.",
      "Correct — a queue removes elements in the order they were added.",
      "Trees are hierarchical, not linear FIFO structures.",
      "Graphs model arbitrary relationships, not FIFO ordering.",
    ],
  },
  {
    subjectId: "dsa", topicId: "extra", topicTitle: "Mixed DSA", difficulty: "medium",
    question: "Which sorting algorithm is stable and runs in O(n log n) worst-case?",
    options: ["Quick sort", "Merge sort", "Heap sort", "Selection sort"],
    answer: 1,
    explanations: [
      "Quick sort degrades to O(n²) in the worst case and is not stable.",
      "Correct — merge sort is stable and guaranteed O(n log n).",
      "Heap sort is O(n log n) but not stable.",
      "Selection sort is O(n²) and not stable.",
    ],
  },

  // ── Java ──
  {
    subjectId: "java", topicId: "extra", topicTitle: "Mixed Java", difficulty: "easy",
    question: "Which keyword prevents a class from being inherited?",
    options: ["static", "final", "abstract", "sealed"],
    answer: 1,
    explanations: [
      "static relates to class-level members, not inheritance.",
      "Correct — a final class cannot be subclassed.",
      "abstract requires subclassing; it's the opposite.",
      "sealed restricts inheritance but still permits permitted subclasses.",
    ],
  },
  {
    subjectId: "java", topicId: "extra", topicTitle: "Mixed Java", difficulty: "easy",
    question: "What is the size of an int in Java?",
    options: ["2 bytes", "4 bytes", "8 bytes", "Platform-dependent"],
    answer: 1,
    explanations: [
      "That's the size of a short, not int.",
      "Correct — Java's int is always a 32-bit (4-byte) signed value.",
      "That's the size of a long.",
      "Unlike C, Java fixes primitive sizes regardless of platform.",
    ],
  },

  // ── Python ──
  {
    subjectId: "python", topicId: "extra", topicTitle: "Mixed Python", difficulty: "easy",
    question: "Which of these is an immutable sequence type?",
    options: ["list", "dict", "tuple", "set"],
    answer: 2,
    explanations: [
      "Lists are mutable — you can change their contents.",
      "Dictionaries are mutable mappings, not sequences.",
      "Correct — tuples cannot be modified after creation.",
      "Sets are mutable (and unordered) collections.",
    ],
  },
  {
    subjectId: "python", topicId: "extra", topicTitle: "Mixed Python", difficulty: "easy",
    question: "What does the expression 3 // 2 evaluate to?",
    options: ["1.5", "1", "0", "2"],
    answer: 1,
    explanations: [
      "// is floor division, not true division — it drops the remainder.",
      "Correct — floor division of 3 by 2 returns 1.",
      "That would be the result of truncating toward zero only for negatives.",
      "That's the result of rounding up, which floor division doesn't do here.",
    ],
  },

  // ── C ──
  {
    subjectId: "c", topicId: "extra", topicTitle: "Mixed C", difficulty: "easy",
    question: "What is the size of a char in C (in bytes)?",
    options: ["1", "2", "4", "Implementation-defined but always ≥ 1"],
    answer: 0,
    explanations: [
      "Correct — sizeof(char) is defined to be 1 byte by the standard.",
      "That's typically wchar_t on some platforms, not char.",
      "That's the size of an int on many platforms.",
      "While ≥1 is true, the standard fixes char at exactly 1.",
    ],
  },
  {
    subjectId: "c", topicId: "extra", topicTitle: "Mixed C", difficulty: "easy",
    question: "Which operator returns the address of a variable?",
    options: ["*", "&", "->", "."],
    answer: 1,
    explanations: [
      "* is the dereference operator — it reads the value at an address.",
      "Correct — & yields the memory address of its operand.",
      "-> accesses a member through a pointer, not an address.",
      ". accesses a member directly, not an address.",
    ],
  },

  // ── OS ──
  {
    subjectId: "os", topicId: "extra", topicTitle: "Mixed OS", difficulty: "medium",
    question: "Which scheduling algorithm is preemptive?",
    options: ["First-Come-First-Serve", "Shortest-Job-First (non-preemptive)", "Round Robin", "Priority (non-preemptive)"],
    answer: 2,
    explanations: [
      "FCFS runs each process to completion — non-preemptive.",
      "Non-preemptive SJF doesn't interrupt a running process.",
      "Correct — Round Robin preempts each process after its time quantum.",
      "The non-preemptive variant never interrupts a running process.",
    ],
  },
  {
    subjectId: "os", topicId: "extra", topicTitle: "Mixed OS", difficulty: "medium",
    question: "Which algorithm is used for deadlock avoidance?",
    options: ["Banker's algorithm", "LRU", "FIFO", "Belady's algorithm"],
    answer: 0,
    explanations: [
      "Correct — Banker's algorithm checks safe resource-allocation states to avoid deadlock.",
      "LRU is a page-replacement algorithm, unrelated to deadlock.",
      "FIFO is also a page-replacement algorithm.",
      "Belady's anomaly relates to page replacement, not deadlock avoidance.",
    ],
  },

  // ── DBMS ──
  {
    subjectId: "dbms", topicId: "extra", topicTitle: "Mixed DBMS", difficulty: "medium",
    question: "Which normal form removes transitive dependencies?",
    options: ["1NF", "2NF", "3NF", "4NF"],
    answer: 2,
    explanations: [
      "1NF only enforces atomic values.",
      "2NF removes partial dependencies on a composite key.",
      "Correct — 3NF eliminates transitive (non-key) dependencies.",
      "4NF deals with multi-valued dependencies, a step beyond 3NF.",
    ],
  },
  {
    subjectId: "dbms", topicId: "extra", topicTitle: "Mixed DBMS", difficulty: "easy",
    question: "Which ACID property keeps concurrent transactions from interfering?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    answer: 2,
    explanations: [
      "Atomicity is all-or-nothing commit/rollback.",
      "Consistency ensures valid state transitions, not concurrency control.",
      "Correct — isolation makes concurrent transactions appear sequential.",
      "Durability guarantees committed data survives crashes.",
    ],
  },

  // ── Networks ──
  {
    subjectId: "networks", topicId: "extra", topicTitle: "Mixed Networks", difficulty: "easy",
    question: "At which OSI layer does TCP operate?",
    options: ["Network", "Transport", "Application", "Data Link"],
    answer: 1,
    explanations: [
      "The network layer handles routing (e.g. IP).",
      "Correct — TCP is a transport-layer protocol providing reliable delivery.",
      "The application layer holds HTTP, FTP, etc.",
      "The data link layer handles frame delivery on a local link.",
    ],
  },
  {
    subjectId: "networks", topicId: "extra", topicTitle: "Mixed Networks", difficulty: "easy",
    question: "What is the default port for HTTPS?",
    options: ["80", "443", "21", "8080"],
    answer: 1,
    explanations: [
      "Port 80 is plain HTTP.",
      "Correct — HTTPS runs over TLS on port 443.",
      "Port 21 is FTP.",
      "8080 is a common alternate HTTP port, not the HTTPS default.",
    ],
  },

  // ── COA ──
  {
    subjectId: "coa", topicId: "extra", topicTitle: "Mixed COA", difficulty: "easy",
    question: "Which is the fastest type of memory in the hierarchy?",
    options: ["Cache", "Main memory (RAM)", "CPU register", "Hard disk"],
    answer: 2,
    explanations: [
      "Cache is fast but sits below the registers.",
      "RAM is slower than both cache and registers.",
      "Correct — registers are inside the CPU and are the fastest storage.",
      "Hard disk is by far the slowest of these.",
    ],
  },
  {
    subjectId: "coa", topicId: "extra", topicTitle: "Mixed COA", difficulty: "medium",
    question: "What does instruction pipelining primarily improve?",
    options: ["Latency of a single instruction", "Throughput of the CPU", "Clock frequency", "Memory size"],
    answer: 1,
    explanations: [
      "Pipelining can slightly increase single-instruction latency due to overhead.",
      "Correct — overlapping stages increases the number of instructions completed per cycle.",
      "Pipelining doesn't raise the clock rate itself.",
      "It has no effect on memory size.",
    ],
  },

  // ── HTML ──
  {
    subjectId: "html", topicId: "extra", topicTitle: "Mixed HTML", difficulty: "easy",
    question: "Which tag creates the largest heading?",
    options: ["<h6>", "<h1>", "<head>", "<header>"],
    answer: 1,
    explanations: [
      "<h6> is the smallest heading level.",
      "Correct — <h1> is the largest, top-level heading.",
      "<head> holds document metadata, not visible headings.",
      "<header> is a semantic sectioning element, not a heading level.",
    ],
  },
  {
    subjectId: "html", topicId: "extra", topicTitle: "Mixed HTML", difficulty: "easy",
    question: "Which attribute sets placeholder text on an <input>?",
    options: ["value", "name", "placeholder", "type"],
    answer: 2,
    explanations: [
      "value sets the actual input value, not the hint.",
      "name identifies the field in submitted form data.",
      "Correct — placeholder shows a hint that disappears on input.",
      "type controls the input kind (text, email, etc.).",
    ],
  },

  // ── CSS ──
  {
    subjectId: "css", topicId: "extra", topicTitle: "Mixed CSS", difficulty: "easy",
    question: "Which property changes the color of text?",
    options: ["text-color", "font-color", "color", "background"],
    answer: 2,
    explanations: [
      "text-color is not a valid CSS property.",
      "font-color is not a valid CSS property.",
      "Correct — color sets the text color.",
      "background sets the element's background, not its text.",
    ],
  },
  {
    subjectId: "css", topicId: "extra", topicTitle: "Mixed CSS", difficulty: "medium",
    question: "In flexbox, along which axis does justify-content align items?",
    options: ["The cross axis", "The main axis", "The z-axis", "The grid axis"],
    answer: 1,
    explanations: [
      "align-items controls the cross axis; justify-content does not.",
      "Correct — justify-content distributes items along the main axis.",
      "There is no z-axis concept in flexbox alignment.",
      "Grid axes are a separate layout system.",
    ],
  },

  // ── JavaScript ──
  {
    subjectId: "js", topicId: "extra", topicTitle: "Mixed JS", difficulty: "easy",
    question: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "function", "static"],
    answer: 1,
    explanations: [
      "var is function-scoped, not block-scoped.",
      "Correct — let (and const) are block-scoped.",
      "function declares functions, not variables.",
      "static is a class field modifier, not a variable declaration.",
    ],
  },
  {
    subjectId: "js", topicId: "extra", topicTitle: "Mixed JS", difficulty: "medium",
    question: "What does typeof null return in JavaScript?",
    options: ["\"null\"", "\"undefined\"", "\"object\"", "\"number\""],
    answer: 2,
    explanations: [
      "It's a known quirk that typeof null is not \"null\".",
      "undefined is the type of undefined, not null.",
      "Correct — typeof null returns \"object\" (a historic bug kept for compatibility).",
      "null is not a number.",
    ],
  },

  // ── Batch 2 ──
  {
    subjectId: "dsa", topicId: "extra", topicTitle: "Mixed DSA", difficulty: "easy",
    question: "Which data structure follows LIFO order?",
    options: ["Queue", "Stack", "Binary Tree", "Heap"],
    answer: 1,
    explanations: ["Queues are FIFO.", "Correct — a stack pushes and pops from the same end.", "Trees are hierarchical.", "Heaps are ordered by priority, not LIFO."],
  },
  {
    subjectId: "dsa", topicId: "extra", topicTitle: "Mixed DSA", difficulty: "medium",
    question: "What is the worst-case time complexity of quicksort?",
    options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
    answer: 1,
    explanations: ["That's the average case.", "Correct — poor pivots degrade quicksort to quadratic.", "That's binary search.", "That's a single linear pass."],
  },
  {
    subjectId: "java", topicId: "extra", topicTitle: "Mixed Java", difficulty: "easy",
    question: "Which of these is NOT a primitive type in Java?",
    options: ["int", "boolean", "String", "double"],
    answer: 2,
    explanations: ["int is a primitive.", "boolean is a primitive.", "Correct — String is a class (reference type).", "double is a primitive."],
  },
  {
    subjectId: "java", topicId: "extra", topicTitle: "Mixed Java", difficulty: "easy",
    question: "Which keyword expresses class inheritance?",
    options: ["implements", "extends", "inherits", "super"],
    answer: 1,
    explanations: ["implements is for interfaces.", "Correct — extends inherits from a class.", "inherits is not a Java keyword.", "super accesses the parent, it doesn't declare inheritance."],
  },
  {
    subjectId: "python", topicId: "extra", topicTitle: "Mixed Python", difficulty: "easy",
    question: "Which of these is a mutable type?",
    options: ["tuple", "str", "list", "int"],
    answer: 2,
    explanations: ["tuples are immutable.", "strings are immutable.", "Correct — lists can be changed in place.", "ints are immutable."],
  },
  {
    subjectId: "python", topicId: "extra", topicTitle: "Mixed Python", difficulty: "easy",
    question: "Which character starts a single-line comment in Python?",
    options: ["//", "#", "--", "/*"],
    answer: 1,
    explanations: ["// is used in C-family languages.", "Correct — # starts a Python comment.", "-- is SQL/Ada style.", "/* opens block comments in other languages."],
  },
  {
    subjectId: "c", topicId: "extra", topicTitle: "Mixed C", difficulty: "easy",
    question: "Which function dynamically allocates memory in C?",
    options: ["malloc", "alloc", "new", "create"],
    answer: 0,
    explanations: ["Correct — malloc allocates uninitialized heap memory.", "alloc is not a standard C function.", "new is C++, not C.", "create is not a standard allocator."],
  },
  {
    subjectId: "c", topicId: "extra", topicTitle: "Mixed C", difficulty: "easy",
    question: "Which header declares printf?",
    options: ["stdlib.h", "stdio.h", "string.h", "math.h"],
    answer: 1,
    explanations: ["stdlib.h declares malloc, exit, etc.", "Correct — printf is declared in stdio.h.", "string.h declares string functions.", "math.h declares math functions."],
  },
  {
    subjectId: "os", topicId: "extra", topicTitle: "Mixed OS", difficulty: "medium",
    question: "What is the smallest unit of execution that the CPU can schedule?",
    options: ["Process", "Thread", "Program", "Task batch"],
    answer: 1,
    explanations: ["A process contains threads; the CPU schedules threads.", "Correct — a thread is the unit of CPU execution.", "A program is a passive file on disk.", "Not a scheduling unit."],
  },
  {
    subjectId: "os", topicId: "extra", topicTitle: "Mixed OS", difficulty: "medium",
    question: "Which is a mutual-exclusion synchronization tool?",
    options: ["mutex", "cache", "buffer", "socket"],
    answer: 0,
    explanations: ["Correct — a mutex (lock) provides mutual exclusion.", "A cache speeds access, not synchronization.", "A buffer holds data in transit.", "A socket is a network endpoint."],
  },
  {
    subjectId: "dbms", topicId: "extra", topicTitle: "Mixed DBMS", difficulty: "easy",
    question: "Which SQL statement retrieves data?",
    options: ["GET", "SELECT", "FETCH", "PULL"],
    answer: 1,
    explanations: ["GET is HTTP, not SQL.", "Correct — SELECT retrieves rows.", "FETCH is a cursor operation, not the main retrieval statement.", "PULL is not SQL."],
  },
  {
    subjectId: "dbms", topicId: "extra", topicTitle: "Mixed DBMS", difficulty: "easy",
    question: "Which key uniquely identifies each row in a table?",
    options: ["Foreign key", "Primary key", "Candidate key", "Super key"],
    answer: 1,
    explanations: ["A foreign key references another table's key.", "Correct — the primary key is unique and non-null per row.", "A candidate key could be primary but isn't chosen.", "A super key may include extra columns."],
  },
  {
    subjectId: "networks", topicId: "extra", topicTitle: "Mixed Networks", difficulty: "easy",
    question: "Which transport protocol guarantees reliable, ordered delivery?",
    options: ["UDP", "TCP", "IP", "ICMP"],
    answer: 1,
    explanations: ["UDP is unreliable and unordered.", "Correct — TCP provides reliable, ordered delivery.", "IP is the network layer, not transport.", "ICMP carries control/diagnostic messages."],
  },
  {
    subjectId: "networks", topicId: "extra", topicTitle: "Mixed Networks", difficulty: "easy",
    question: "How many layers are in the OSI model?",
    options: ["5", "6", "7", "8"],
    answer: 2,
    explanations: ["The OSI model has more than 5 layers.", "It has more than 6.", "Correct — OSI has 7 layers.", "It has fewer than 8."],
  },
  {
    subjectId: "coa", topicId: "extra", topicTitle: "Mixed COA", difficulty: "medium",
    question: "A higher cache hit ratio primarily improves what?",
    options: ["Cost", "Performance", "Memory size", "Power draw"],
    answer: 1,
    explanations: ["Hits don't reduce hardware cost.", "Correct — more hits mean fewer slow memory accesses, so faster execution.", "Cache size is fixed regardless of hit ratio.", "Hit ratio isn't mainly about power."],
  },
  {
    subjectId: "coa", topicId: "extra", topicTitle: "Mixed COA", difficulty: "medium",
    question: "Which is a characteristic of RISC architectures?",
    options: ["Variable-length instructions", "Fixed-length instructions", "Complex instructions", "Memory-to-memory operations"],
    answer: 1,
    explanations: ["Variable-length instructions are a CISC trait.", "Correct — RISC uses simple, fixed-length instructions.", "Complex instructions are CISC.", "RISC favors load/store, not memory-to-memory."],
  },
  {
    subjectId: "html", topicId: "extra", topicTitle: "Mixed HTML", difficulty: "easy",
    question: "Which attribute sets the destination of an <a> link?",
    options: ["src", "link", "href", "url"],
    answer: 2,
    explanations: ["src is for embedded resources, not links.", "link is a tag name, not an attribute.", "Correct — href holds the hyperlink URL.", "url is not a valid attribute."],
  },
  {
    subjectId: "html", topicId: "extra", topicTitle: "Mixed HTML", difficulty: "easy",
    question: "Which tag starts an unordered (bulleted) list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: 1,
    explanations: ["<ol> is an ordered (numbered) list.", "Correct — <ul> is an unordered list.", "<li> is a list item, not the list container.", "<list> is not a valid HTML tag."],
  },
  {
    subjectId: "css", topicId: "extra", topicTitle: "Mixed CSS", difficulty: "easy",
    question: "Which selector targets an element by id?",
    options: [".", "#", "*", ">"],
    answer: 1,
    explanations: [". selects by class.", "Correct — # selects by id.", "* is the universal selector.", "> is a child combinator."],
  },
  {
    subjectId: "css", topicId: "extra", topicTitle: "Mixed CSS", difficulty: "easy",
    question: "Which property controls space inside an element's border?",
    options: ["margin", "padding", "gap", "border-width"],
    answer: 1,
    explanations: ["margin is space outside the border.", "Correct — padding is space inside the border.", "gap is space between flex/grid items.", "border-width sets the border thickness."],
  },
  {
    subjectId: "js", topicId: "extra", topicTitle: "Mixed JS", difficulty: "easy",
    question: "Which array method adds an element to the end?",
    options: ["push", "pop", "shift", "unshift"],
    answer: 0,
    explanations: ["Correct — push appends to the end.", "pop removes from the end.", "shift removes from the start.", "unshift adds to the start."],
  },
  {
    subjectId: "js", topicId: "extra", topicTitle: "Mixed JS", difficulty: "medium",
    question: "What does the strict equality operator === compare?",
    options: ["Value only", "Type only", "Value and type", "Reference only"],
    answer: 2,
    explanations: ["== compares value with coercion.", "It compares more than type alone.", "Correct — === compares value and type without coercion.", "It's not limited to reference comparison."],
  },
];