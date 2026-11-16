// Computer Organization & Architecture — more foundational "things you have to know" notes (part 2).
// Condensed mental models that complement the "Why & How" basics note.
export default [
  {
    id: "fetch-execute-essentials",
    title: "The Fetch-Execute Cycle",
    difficulty: "easy",
    definition: `The fetch-execute (instruction) cycle is the heartbeat of the CPU: fetch the next instruction from memory (at the address in the Program Counter), decode it, execute it, write back the result, then advance the Program Counter. Billions of times per second. A handful of registers (PC, IR, MAR, MBR, ACC) coordinate this loop. Every program — from a loop to a web server — is just this cycle running billions of instructions.`,
    coreUnderstanding: `The CPU is a loop. It reads an instruction from memory, figures out what it means, does it, stores the result, and moves to the next one — over and over, billions of times per second. A few special registers orchestrate this: the Program Counter (PC) holds the address of the next instruction; the Instruction Register (IR) holds the currently fetched instruction; the Memory Address Register (MAR) holds the address to read/write; the Memory Buffer Register (MBR) holds the data read or to be written; the Accumulator (ACC) holds intermediate results. The cycle: fetch (read memory at PC into IR), decode (the control unit interprets the opcode), execute (the ALU does the operation), write back (store the result), increment PC. Branches and jumps change the PC directly — that's how loops and if-statements work. Pipelining overlaps these stages for multiple instructions (like an assembly line), but the single-instruction cycle is the foundation.`,
    howItWorks: `1. FETCH: the CPU reads the instruction at the address in the Program Counter (PC). The address goes to the MAR, memory is read, the instruction lands in the MBR, then moves to the Instruction Register (IR).
2. DECODE: the control unit decodes the opcode in the IR — determines the operation (ADD, LOAD, JMP) and the operands (registers or memory addresses).
3. EXECUTE: the ALU (or appropriate unit) performs the operation. E.g., ADD: read two registers, add them, produce a result.
4. WRITE BACK: the result is written to the destination register or memory.
5. PC UPDATE: the PC advances to the next instruction (PC = PC + instruction_size). For a branch/jump, the PC is set to the target address instead.
6. REPEAT: the cycle restarts at fetch with the new PC. Billions of times per second (a 3 GHz CPU does ~3 billion cycles/sec).
7. KEY REGISTERS: PC (next instruction address), IR (current instruction), MAR (memory address to access), MBR (data to/from memory), ACC (accumulator, intermediate results), general-purpose registers (R0-Rn).
8. BRANCH: a conditional branch (BEQ, BNE) checks a condition flag; if met, it sets the PC to the target — breaking the sequential PC+4 flow. This is how if/while/for work.`,
    codeExamples: [
      {
        lang: "text",
        code: `The Fetch-Execute Cycle (one instruction):

  1. FETCH
     PC -> MAR              (address of next instruction)
     memory[MAR] -> MBR      (read the instruction from memory)
     MBR -> IR              (instruction now in Instruction Register)
     PC = PC + 4            (advance to next instruction, 4 bytes)

  2. DECODE
     control unit reads IR:
       opcode = ADD
       operands = R1, R2, R3   (R1 = R2 + R3)

  3. EXECUTE
     read R2 and R3
     ALU adds them -> result

  4. WRITE BACK
     result -> R1            (store the sum in R1)

  5. REPEAT (back to fetch with the new PC)

Key registers:
  PC  (Program Counter)      address of the NEXT instruction
  IR  (Instruction Register)  the CURRENT instruction being decoded
  MAR (Memory Address Reg)    address to read/write in memory
  MBR (Memory Buffer Reg)     data read from / to write to memory
  ACC (Accumulator)           intermediate ALU results
  R0-Rn                       general-purpose registers

A branch changes the PC:
  BEQ R1, R2, 1000    if R1 == R2, set PC = 1000 (not PC+4)
  -> this is how if-statements and loops work`,
        output: "(instruction cycle)",
        note: "The fetch-execute cycle: fetch (PC→memory→IR), decode (control unit), execute (ALU), write back, advance PC. Branches/jumps change the PC directly. PC=next addr, IR=current instr, MAR/MBR=memory access. A 3GHz CPU does ~3 billion cycles/sec."
      },
      {
        lang: "text",
        code: `; assembly view of the cycle (x86-style)
  mov  eax, [a]      ; FETCH: read instr, DECODE: mov, EXECUTE: load a
                      ; WRITE BACK: eax = value of a
  add  eax, [b]      ; FETCH, DECODE: add, EXECUTE: ALU adds b, WRITE BACK: eax
  mov  [sum], eax    ; FETCH, DECODE: mov, EXECUTE: store, WRITE BACK: memory[sum]

loop:
  add  ecx, 1        ; ecx = ecx + 1
  cmp  ecx, 10       ; compare ecx to 10, set flags
  jl   loop          ; if ecx < 10, PC = address of loop (BRANCH!)
  ; the jl (jump if less) changes the PC — this is the while loop`,
        output: "(assembly)",
        note: "Each line is one fetch-execute cycle (or a few). The `jl loop` is a branch — it sets the PC to `loop`'s address, repeating the body. This is how loops compile to machine code."
      }
    ],
    marginNotes: [
      "The Program Counter (PC) always holds the address of the NEXT instruction, not the current one. After fetch, PC advances (PC+4 for 32-bit RISC). A branch/jump overwrites the PC — that's how control flow works.",
      "The Instruction Register (IR) holds the currently executing instruction while the control unit decodes it. The PC has already moved on — this is why pipelining can fetch the next instruction while the current one executes.",
      "MAR (address) and MBR (data) are the interface to memory. The CPU puts an address in the MAR, asserts read, and the data comes back in the MBR. This is how every memory access works.",
      "A 3 GHz CPU completes ~3 billion cycles per second. But pipelining means multiple instructions are in flight simultaneously — the effective rate is higher (instructions per cycle, or IPC, is the real throughput metric)."
    ],
    commonMistakes: [
      "Thinking the PC holds the current instruction's address — it holds the NEXT one. It advances right after fetch, before execute. This is why a branch must set the PC (not PC+4).",
      "Confusing the IR (current instruction being decoded/executed) with the PC (next instruction's address). They're different registers with different roles.",
      "Forgetting that branches change the PC directly — a jump doesn't go to PC+4; it loads the target address into the PC. This is how all control flow (if, while, for, function calls) works."
    ],
    relatedTopics: ["COA Basics — Why & How", "Instruction Cycle (Fetch-Decode-Execute)", "CPU & Instruction Cycle"],
    externalLinks: [
      { label: "Instruction Cycle (Wiki)", url: "https://en.wikipedia.org/wiki/Instruction_cycle" },
      { label: "Fetch-Decode-Execute (OSTEP)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf" }
    ],
    mcqs: [
      {
        question: "What does the Program Counter (PC) hold?",
        options: ["The current instruction", "The address of the NEXT instruction to fetch", "The result of the last ALU operation", "The number of cycles elapsed"],
        answer: 1,
        explanations: ["The current instruction is in the IR.", "Correct — the PC holds the address of the next instruction. After fetch, the PC advances (PC+4). A branch/jump overwrites the PC to change control flow.", "Results go to registers/ACC.", "There's no cycle-count register in the basic model."],
        difficulty: "easy"
      },
      {
        question: "How does a branch (jump) instruction work?",
        options: ["It adds to the accumulator", "It loads the target address into the PC, so the next fetch is from there", "It skips the next instruction", "It stops the cycle"],
        answer: 1,
        explanations: ["Branches don't touch the accumulator.", "Correct — a branch sets the PC to the target address (instead of PC+4). The next fetch reads from that address. This is how if/while/for and function calls work — they all compile to branches that change the PC.", "It doesn't skip — it redirects.", "The cycle continues."],
        difficulty: "medium"
      },
      {
        question: "Which register holds the instruction currently being decoded?",
        options: ["PC (Program Counter)", "IR (Instruction Register)", "MAR (Memory Address Register)", "ACC (Accumulator)"],
        answer: 1,
        explanations: ["The PC holds the next instruction's address.", "Correct — the IR (Instruction Register) holds the currently fetched instruction while the control unit decodes and executes it.", "The MAR holds a memory address.", "The ACC holds ALU results."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "memory-hierarchy-mental-model",
    title: "The Memory Hierarchy at a Glance",
    difficulty: "easy",
    definition: `Memory is a hierarchy from small-and-fast to large-and-slow: registers (ns) → L1/L2/L3 cache (ns-10ns) → RAM (100ns) → SSD (µs) → HDD (ms). Each level is ~10-100x slower than the one above and ~10-100x bigger. The cache hit rate — how often data is found in a fast level — decides real-world speed. Locality (accessing nearby/recent data) is what makes the hierarchy work.`,
    coreUnderstanding: `There's a fundamental trade-off in memory: fast memory is expensive (so you get little of it); cheap memory is slow (so you get a lot). The hierarchy resolves this by stacking levels: a few registers inside the CPU (instant), small caches (L1/L2/L3, fast), big RAM (slower), huge disk (slowest). The CPU always checks the fastest level first; if the data is there (a cache hit), it's fast. If not (a cache miss), it fetches from the next level down — which is ~10-100x slower. The magic that makes this work is locality: programs tend to access nearby data (spatial locality — sequential array access) and reuse recent data (temporal locality — loops). Because of locality, ~95-99% of accesses hit the cache, so the CPU sees "fast" speed most of the time despite having "slow" RAM. This is why two algorithms with the same Big-O can differ by 100x — one respects locality (cache-friendly), the other doesn't (cache-hostile).`,
    howItWorks: `1. THE LEVELS (fastest to slowest): registers (~1ns, ~1KB) → L1 cache (~1ns, ~32KB) → L2 cache (~4ns, ~256KB) → L3 cache (~12ns, ~MB) → RAM (~100ns, ~GB) → SSD (~100µs, ~TB) → HDD (~10ms, ~TB).
2. EACH LEVEL IS ~10-100x SLOWER and ~10-100x BIGGER than the one above. The gap between cache and RAM is the most impactful (~100x).
3. CACHE HIERARCHY: L1 is per-core (fastest, smallest), L2 is per-core (bigger), L3 is shared across cores (biggest cache). The CPU checks L1, then L2, then L3, then RAM.
4. CACHE LINE (BLOCK): cache doesn't fetch single bytes — it fetches blocks (typically 64 bytes). When you read array[0], the cache loads array[0..63]. This is why sequential access is fast (the next elements are already cached).
5. LOCALITY: TEMPORAL (reuse recent data — loops reuse the same variables) and SPATIAL (use nearby data — sequential array access hits the same cache line). Good locality = high hit rate = fast.
6. HIT RATE: the fraction of accesses found in cache. ~95-99% in well-written code. A miss is ~100x slower than a hit — the hit rate dominates real performance.
7. CACHE-FRIENDLY vs HOSTILE: sequential array scan (friendly, hits cache) vs linked-list traversal (hostile, misses on every node) — same Big-O, 100x different speed.`,
    codeExamples: [
      {
        lang: "text",
        code: `The Memory Hierarchy (latency, approximate):

  Level        Latency     Size        Location
  ─────────────────────────────────────────────────
  registers    ~1 ns       ~1 KB       inside CPU core
  L1 cache     ~1 ns       ~32 KB      per-core
  L2 cache     ~4 ns       ~256 KB     per-core
  L3 cache     ~12 ns      ~MB         shared (all cores)
  RAM          ~100 ns     ~GB         motherboard
  SSD          ~100 µs     ~TB         external
  HDD          ~10 ms      ~TB         external

  -> each level is ~10-100x slower than the one above
  -> a cache miss to RAM is ~100x a cache hit

Cache-friendly vs hostile (SAME Big-O, very different speed):

  FRIENDLY (spatial locality — sequential array scan):
  for (i = 0; i < N; i++) sum += arr[i];
  // arr[0..63] loaded together (one cache line = 64 bytes)
  // -> almost every access is a cache HIT -> fast

  HOSTILE (no locality — linked list traversal):
  while (p) { sum += p->val; p = p->next; }
  // each node is elsewhere in memory -> every access is a MISS
  // -> ~100x slower than the array, same Big-O

  FRIENDLY (temporal locality — loop reuses the same data):
  for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
      A[i] += B[j];   // B[j] reused N times for each i -> stays in cache`,
        output: "(hierarchy & locality)",
        note: "Registers→L1→L2→L3→RAM→SSD→HDD, each ~10-100x slower. Cache fetches 64-byte blocks, so sequential access hits (spatial locality). Loops reuse data (temporal locality). Cache-friendly code can be 100x faster than cache-hostile code with the same Big-O."
      }
    ],
    marginNotes: [
      "The hierarchy exists because of a hardware trade-off: fast memory is expensive (small), cheap memory is slow (large). Stacking levels gives the illusion of a huge, fast memory — as long as the hit rate is high.",
      "Cache fetches blocks (64 bytes), not single bytes. Reading array[0] loads array[0..63] into cache. So sequential access (spatial locality) hits cache; random/strided access misses. This is why arrays beat linked lists for sequential traversal.",
      "Two algorithms with the same Big-O can differ by 100x because of cache behavior. A row-major array traversal in C (arr[i][j]) is cache-friendly; a column-major traversal (arr[j][i]) misses on every access — same Big-O, 100x slower.",
      "The hit rate (~95-99% in good code) is the single biggest determinant of real-world speed. A miss to RAM (~100ns) is ~100x a hit (~1ns). Optimizing for locality — accessing data sequentially and reusing recent data — is often more impactful than reducing Big-O."
    ],
    commonMistakes: [
      "Assuming Big-O is the whole performance story — two O(n) algorithms can differ by 100x because of cache behavior. Locality often matters more than complexity for real-world speed.",
      "Traversing a linked list expecting array speed — each node is a separate allocation, so every access is a cache miss. Arrays are far faster for sequential access because of spatial locality.",
      "Accessing a 2D array in the wrong order — in C, arrays are row-major, so arr[i][j] with j in the inner loop is cache-friendly. Iterating arr[j][i] (column-first) misses on every access — same Big-O, ~100x slower."
    ],
    relatedTopics: ["COA Basics — Why & How", "Memory Hierarchy & Caches", "Cache Memory"],
    externalLinks: [
      { label: "Memory Hierarchy (Wiki)", url: "https://en.wikipedia.org/wiki/Memory_hierarchy" },
      { label: "What Every Programmer Should Know About Memory", url: "https://people.freebsd.org/~lstewart/articles/what_every_programmer_should_know_about_memory.pdf" }
    ],
    mcqs: [
      {
        question: "Why is sequential array access faster than linked-list traversal (same Big-O)?",
        options: ["Arrays use less memory", "Spatial locality — sequential array elements share a cache line (hits); list nodes are scattered (misses, ~100x slower)", "Arrays are newer", "Linked lists are buggy"],
        answer: 1,
        explanations: ["Memory size isn't the reason.", "Correct — cache fetches 64-byte blocks. Sequential array access hits the same cache line (spatial locality); linked-list nodes are scattered, so each is a cache miss (~100ns vs ~1ns). Same Big-O, ~100x different speed.", "Age is irrelevant.", "Lists aren't buggy — they're just cache-hostile."],
        difficulty: "medium"
      },
      {
        question: "What is temporal locality?",
        options: ["Accessing nearby memory addresses", "Reusing recently accessed data (loops reuse the same variables) — keeping them in cache", "Accessing data at the right time", "Using temporary variables"],
        answer: 1,
        explanations: ["That's spatial locality.", "Correct — temporal locality is reusing recently accessed data. A loop that reads the same variable N times benefits because the variable stays in cache after the first access. This is why loops are fast.", "Timing isn't the concept.", "It's about data reuse, not variable type."],
        difficulty: "medium"
      },
      {
        question: "How much slower is a RAM access than a cache hit (approximately)?",
        options: ["About the same", "~100x slower (cache ~1ns, RAM ~100ns)", "1000x slower", "10x slower"],
        answer: 1,
        explanations: ["They differ greatly.", "Correct — a cache hit is ~1ns; a RAM access (cache miss) is ~100ns — about 100x slower. This is why the cache hit rate dominates real performance. The hierarchy gap between cache and RAM is the most impactful.", "That's an overestimate.", "That's an underestimate."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "pipeline-mental-model",
    title: "Pipelining at a Glance",
    difficulty: "medium",
    definition: `Pipelining overlaps the stages of instruction execution (fetch, decode, execute, memory, write-back) like an assembly line — while one instruction executes, the next is being decoded and the one after is being fetched. This improves THROUGHPUT (instructions completed per cycle), not single-instruction latency. Hazards (data, control, structural) stall the pipeline; branch prediction and forwarding mitigate them.`,
    coreUnderstanding: `Without pipelining, the CPU finishes one instruction completely before starting the next — the fetch, decode, execute, memory, and write-back units are idle most of the time. Pipelining overlaps them: like a factory assembly line, each stage works on a different instruction simultaneously. While instruction 3 is in execute, instruction 2 is in decode and instruction 4 is in fetch. This doesn't make any single instruction faster (it still takes 5 cycles to go through 5 stages), but it completes one instruction per cycle instead of one per 5 cycles — 5x throughput. The problems are hazards: a data hazard (instruction 2 needs instruction 1's result, which isn't written yet) stalls the pipeline; a control hazard (a branch changes the PC, but the next instructions are already fetched) wastes work on wrong-path instructions; a structural hazard (two instructions need the same hardware unit at once) serializes them. Solutions: forwarding (bypass the write-back, pass the result directly), branch prediction (guess the branch direction to keep the pipeline full), and delaying (stall one cycle).`,
    howItWorks: `1. STAGES (typical 5-stage RISC pipeline): IF (instruction fetch), ID (decode), EX (execute/ALU), MEM (memory access), WB (write back to register).
2. WITHOUT PIPELINE: IF ID EX MEM WB (one instruction) then IF ID EX MEM WB (next) — 5 cycles per instruction, 4 units idle.
3. WITH PIPELINE: IF ID EX MEM WB for instruction 1, while IF ID EX MEM WB for instruction 2 starts one cycle later, etc. After the pipeline fills, one instruction completes per cycle — 5x throughput.
4. DATA HAZARD: instruction 2 needs a result from instruction 1, but instruction 1 hasn't written it back yet (it's in EX or MEM). Fix: FORWARDING (bypass — pass the result from EX directly to the next instruction's EX, skipping WB) or STALL (insert a bubble, wait one cycle).
5. CONTROL HAZARD: a branch (jump) changes the PC, but the pipeline has already fetched the next sequential instructions. If the branch is taken, those are wrong-path — wasted work. Fix: BRANCH PREDICTION (guess taken/not-taken; if wrong, flush the pipeline) or DELAYED BRANCH (the instruction after the branch always runs — a RISC trick).
6. STRUCTURAL HAZARD: two instructions need the same hardware (e.g., memory for both IF and MEM) in the same cycle. Fix: separate caches for instructions and data (Harvard architecture) or stall.
7. THROUGHPUT vs LATENCY: pipelining improves throughput (instructions per cycle), NOT the latency of a single instruction (still 5 cycles through 5 stages).`,
    codeExamples: [
      {
        lang: "text",
        code: `5-Stage Pipeline (IF ID EX MEM WB):

WITHOUT pipelining (one instruction at a time):
  Cycle:  1    2    3    4    5    6    7    8    9    10
  Instr1: IF   ID   EX   MEM  WB
  Instr2:                           IF   ID   EX   MEM  WB
  -> 5 cycles per instruction (most units idle)

WITH pipelining (overlapped, like an assembly line):
  Cycle:  1    2    3    4    5    6    7
  Instr1: IF   ID   EX   MEM  WB
  Instr2:      IF   ID   EX   MEM  WB
  Instr3:           IF   ID   EX   MEM  WB
  Instr4:                IF   ID   EX   MEM  WB
  -> after fill, ONE instruction completes per cycle (5x throughput)

DATA HAZARD (Instr2 needs Instr1's result):
  Instr1: add  $1, $2, $3   (writes $1 in WB, cycle 5)
  Instr2: sub  $4, $1, $5   (needs $1 in EX, cycle 4 — too early!)
  Fix 1: STALL (insert a bubble):
  Instr2:        IF   ID   --   EX   MEM   WB   (waited 1 cycle)
  Fix 2: FORWARDING (bypass WB, pass $1 from EX directly to Instr2's EX):
  Instr2:        IF   ID   EX   MEM  WB   (no stall — result forwarded)

CONTROL HAZARD (a branch):
  Instr1: beq  $1, $2, target   (branch decided in EX, cycle 3)
  Instr2: add  ...               (fetched in cycle 2 — is it the right path?)
  -> if branch taken, Instr2 is wrong-path -> flush (waste) it
  Fix: BRANCH PREDICTION (guess; if wrong, flush the pipeline)`,
        output: "(pipeline timing)",
        note: "Pipelining overlaps stages (IF ID EX MEM WB) like an assembly line — one instruction completes per cycle (vs 5 without). Hazards: data (fix: forwarding/stall), control (fix: branch prediction), structural (fix: separate units). Improves throughput, not single-instruction latency."
      }
    ],
    marginNotes: [
      "Pipelining improves THROUGHPUT (instructions per cycle), not single-instruction LATENCY. A 5-stage pipeline still takes 5 cycles for one instruction to pass through — but after fill-up, one completes per cycle, a 5x throughput gain.",
      "A data hazard (instruction needs a previous result not yet written back) is fixed by forwarding (bypass the write-back, pass the result directly from EX to EX) or by stalling (insert a bubble, wait one cycle). Forwarding is preferred (no lost cycle).",
      "A control hazard (a branch changes the PC, but the next instructions are already fetched) is fixed by branch prediction — guess the direction. If the guess is wrong, flush the wrong-path instructions (wasted work). Modern CPUs predict with ~95% accuracy, so the pipeline stays full most of the time.",
      "A branch misprediction flushes the pipeline — all wrong-path instructions are discarded and the correct path is fetched. This is a ~15-20 cycle penalty on modern CPUs. This is why branch prediction accuracy matters so much for performance."
    ],
    commonMistakes: [
      "Thinking pipelining makes each instruction faster — it doesn't. It improves throughput (one instruction per cycle after fill), not the latency of a single instruction (still 5 cycles through 5 stages).",
      "Confusing pipelining (overlapping stages of ONE instruction stream) with parallelism (multiple cores running separate instruction streams). Pipelining is about throughput within one core; multi-core is about running multiple threads.",
      "Forgetting that a branch misprediction flushes the pipeline — wrong-path instructions are wasted. This is why predictable branches (loops) are fast and unpredictable branches (random if-statements) are slow."
    ],
    relatedTopics: ["COA Basics — Why & How", "Pipelining & Hazards", "Branch Prediction"],
    externalLinks: [
      { label: "Pipelining (Wiki)", url: "https://en.wikipedia.org/wiki/Instruction_pipelining" },
      { label: "Pipeline Hazards (Computer Architecture)", url: "https://www.cs.cornell.edu/courses/cs3410/2019sp/" }
    ],
    mcqs: [
      {
        question: "Does pipelining make a single instruction faster?",
        options: ["Yes, each instruction takes fewer cycles", "No — it improves throughput (one instruction per cycle after fill), not single-instruction latency", "Only for branches", "Only for memory instructions"],
        answer: 1,
        explanations: ["Single-instruction latency is unchanged.", "Correct — a 5-stage pipeline still takes 5 cycles for one instruction to pass through. But after the pipeline fills, one instruction completes per cycle (vs 1 per 5 without). It's a throughput gain, not a latency gain.", "Branches are a hazard issue.", "All instructions benefit."],
        difficulty: "medium"
      },
      {
        question: "What is a data hazard?",
        options: ["Two instructions need the same hardware unit", "An instruction needs a result from a previous instruction that hasn't been written back yet", "A branch goes the wrong way", "The cache misses"],
        answer: 1,
        explanations: ["That's a structural hazard.", "Correct — a data hazard occurs when an instruction needs a result from a previous instruction that is still in the pipeline (not yet written back). Fix: forwarding (pass the result directly) or stalling (wait a cycle).", "That's a control hazard.", "That's a cache miss, not a pipeline hazard."],
        difficulty: "medium"
      },
      {
        question: "How is a control hazard (branch) typically handled?",
        options: ["Stall the entire pipeline", "Branch prediction — guess the direction; if wrong, flush the wrong-path instructions", "Disable pipelining for branches", "Run branches on a separate core"],
        answer: 1,
        explanations: ["Stalling every branch would kill performance.", "Correct — the CPU predicts the branch direction and keeps fetching that path. If the prediction is wrong, it flushes the wrong-path instructions (wasted work) and fetches the correct path. Modern predictors are ~95% accurate.", "Pipelining isn't disabled.", "A separate core isn't the solution."],
        difficulty: "medium"
      }
    ]
  }
];