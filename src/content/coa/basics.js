// Computer Organization & Architecture — the foundational "why & how" note, placed first.
export default {
  id: "domain-basics",
  title: "COA Basics — Why & How",
  difficulty: "easy",
  definition: `Computer Organization & Architecture (COA) is the study of how hardware executes software — logic gates, CPUs, the memory hierarchy, and instruction sets. You learn it to understand why code is fast or slow and to optimize for the machine it runs on.`,
  coreUnderstanding: `COA bridges software and silicon. A program's speed isn't just about algorithms — it's about how the CPU fetches, decodes, and executes instructions, how caches hide the slowness of RAM, and how pipelining overlaps work. You learn COA to write cache-friendly code, to reason about performance at the hardware level, to work on embedded/firmware, and to answer the hardware questions that appear in systems interviews. The key insight: memory is a hierarchy (registers → cache → RAM → disk), and each level is ~10–100x slower than the one above it — so locality (accessing nearby/recent data) dominates performance.`,
  howItWorks: `1. WHY: hardware explains performance. Cache-friendly code can be 100x faster than cache-hostile code with the same Big-O.
2. WHERE: performance optimization, embedded/firmware, compilers, GPU/accelerator work, systems interviews.
3. THE FETCH-EXECUTE CYCLE: the CPU fetches an instruction from memory (at the program counter), decodes it, executes it, writes back the result, then advances the PC. Billions of times per second.
4. INSTRUCTION SET (ISA): the commands the CPU understands (add, load, store, branch). RISC (ARM, RISC-V) uses simple fixed-length instructions; CISC (x86) uses complex variable-length ones.
5. PIPELINING: overlap stages (fetch/decode/execute) like an assembly line so multiple instructions are in flight at once — improves throughput, not single-instruction latency.
6. MEMORY HIERARCHY (fastest→slowest): registers (ns) → L1/L2/L3 cache (ns–10ns) → RAM (100ns) → SSD (µs) → disk (ms). Each level is bigger and slower. The cache HIT RATE decides real-world speed.
7. LOCALITY: temporal (reuse recent data — loops) and spatial (use nearby data — sequential array access). Code with good locality hits cache; random access misses.
8. CACHES & BLOCKS: cache holds copies of RAM in fixed-size blocks (lines). A cache miss fetches a whole block — so sequential access is fast, strided/random access is slow.
9. ASSEMBLY SYNTAX: instructions usually one per line; labels end with \`:\`; comments start with \`;\` or \`#\` (assembler-dependent); registers named \`rax\`, \`r0\`, etc.`,
  codeExamples: [
    {
      lang: "text",
      code: `Memory hierarchy (latency, approximate):
  register      ~1 ns        (inside CPU, handful of them)
  L1 cache      ~1 ns        (per-core, ~32 KB)
  L2 cache      ~4 ns        (per-core, ~256 KB)
  L3 cache      ~12 ns       (shared, ~MB)
  RAM          ~100 ns       (GB)
  SSD          ~100 µs       (TB)
  HDD           ~10 ms       (TB)
  -> each level ~10-100x slower than the one above

Cache-friendly vs hostile (same Big-O, very different speed):
  friendly:  sequential array scan (spatial locality -> cache hits)
  hostile:   random linked-list traversal (each node = cache miss)

Pipelining (overlap stages):
  without:  [F][D][E][W]  [F][D][E][W]   (one at a time)
  with:     [F][D][E][W]
                [F][D][E][W]
                   [F][D][E][W]   (overlapped -> higher throughput)`,
      output: `(hierarchy & pipelining)`,
      note: "The memory hierarchy dominates real performance: each level is ~10-100x slower than the one above. Cache-friendly (locality-respecting) code can be 100x faster than cache-hostile code with identical Big-O."
    },
    {
      lang: "text",
      code: `; x86-style assembly (syntax varies by assembler; ; = comment)
; fetch-decode-execute for: sum = a + b
  mov  rax, [a]      ; load a from memory into register rax
  add  rax, [b]      ; add b into rax
  mov  [sum], rax    ; store result back to memory

loop:                ; a label ends with :
  add  rax, 1
  cmp  rax, 10
  jl   loop          ; jump back if rax < 10`,
      output: `(assembly)`,
      note: "Assembly is one instruction per line; labels end with : ; registers (rax) hold values for the ALU. The CPU fetches, decodes, executes each instruction billions of times per second."
    }
  ],
  marginNotes: [
    "Same Big-O, wildly different speed: scanning an array sequentially hits cache (spatial locality); jumping through a linked list misses on every node. Locality, not just complexity, decides real performance.",
    "Each memory level is ~10-100x slower than the one above. A cache miss to RAM (~100ns) is ~100x a cache hit (~1ns) — so the hit rate dominates real-world speed.",
    "Pipelining improves THROUGHPUT (instructions per cycle), not single-instruction latency. A branch misprediction flushes the pipeline — that's why branch prediction matters.",
    "RISC (ARM, RISC-V) = simple fixed-length instructions, load/store only; CISC (x86) = complex variable-length, memory-to-memory allowed. Most modern CPUs are RISC internally."
  ],
  commonMistakes: [
    "Assuming Big-O is the whole performance story — locality and cache behavior can cause 100x differences for the same complexity.",
    "Traversing a linked list expecting array-like speed — each node is a cache miss; arrays are far faster for sequential access.",
    "Confusing pipelining (overlapping stages for throughput) with parallelism (multiple cores doing work at once)."
  ],
  relatedTopics: ["CPU & Instruction Cycle", "Memory Hierarchy & Caches", "Pipelining & Hazards"],
  externalLinks: [
    { label: "Computer Organization and Design (Patterson & Hennessy)", url: "https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6" },
    { label: "What Every Programmer Should Know About Memory", url: "https://people.freebsd.org/~lstewart/articles/what_every_programmer_should_know_about_memory.pdf" }
  ],
  mcqs: [
    {
      question: "Why can two algorithms with the same Big-O run at very different speeds?",
      options: ["They use different languages", "Cache behavior and memory locality — one hits cache, the other misses on every access (~100x difference)", "One is compiled better", "They run on different OSes"],
      answer: 1,
      explanations: ["Language is secondary here.", "Correct — sequential array access hits cache (spatial locality); random/linked-list access misses on every element. A cache miss (~100ns) is ~100x a hit (~1ns), so locality dominates real speed even at equal Big-O.", "Compilation matters less than locality.", "The OS is not the cause."],
      difficulty: "medium"
    },
    {
      question: "What does pipelining improve?",
      options: ["Single-instruction latency", "Throughput — overlapping stages so multiple instructions are in flight", "Clock frequency", "Memory size"],
      answer: 1,
      explanations: ["Latency per instruction isn't reduced.", "Correct — pipelining overlaps fetch/decode/execute like an assembly line, increasing instructions completed per cycle (throughput). A branch misprediction flushes it.", "It doesn't raise the clock.", "Memory is unaffected."],
      difficulty: "medium"
    },
    {
      question: "Which is faster, a cache hit or a RAM access?",
      options: ["RAM access", "A cache hit — cache is ~100x faster than RAM", "They are equal", "Depends on the OS"],
      answer: 1,
      explanations: ["RAM is far slower.", "Correct — a cache hit is ~1ns; a RAM access is ~100ns. The cache hit rate is the single biggest determinant of real-world program speed.", "They differ by ~100x.", "It's hardware, not OS-dependent."],
      difficulty: "easy"
    }
  ]
};