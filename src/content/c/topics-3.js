// C topics part 3: Command Line Args through Debugging (topics 29-43)
export default [
  {
    id: "command-line-args",
    title: "Command Line Arguments",
    difficulty: "medium",
    definition: "main can accept arguments: int main(int argc, char *argv[]). argc is the argument count (including the program name), and argv is an array of string arguments. This lets you pass configuration to a program at launch — file names, flags, options — without interactive input.",
    coreUnderstanding: "Command-line arguments let you pass configuration to a C program at launch. `argc` is the argument count (always at least 1 — the program name). `argv` is an array of string pointers: argv[0] is the program name, argv[1] is the first argument, etc. argv[argc] is NULL (a sentinel). This is how command-line tools work: `gcc -o prog prog.c` passes -o, prog, and prog.c as arguments. You parse them manually (or with getopt for options). Arguments are always strings — convert with atoi, strtol, or sscanf for numbers.",
    howItWorks: "1. `int main(int argc, char *argv[])` — argc is count, argv is array of string pointers.\n2. argv[0] is the program name. argv[1] to argv[argc-1] are the arguments.\n3. argv[argc] is NULL — a sentinel for iteration.\n4. All arguments are strings — convert with `atoi(argv[1])` (simple) or `strtol(argv[1], &end, 10)` (robust).\n5. `getopt` (from <unistd.h>) — parse options like -f, -o. `getopt_long` — parse long options like --file.\n6. Check argc before accessing argv: `if (argc < 2) { printf(\"Usage: %s <file>\\n\", argv[0]); }`.\n7. Arguments are read-only — don't modify argv strings.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char *argv[]) {\n    printf(\"argc = %d\\n\", argc);\n    for (int i = 0; i < argc; i++) {\n        printf(\"argv[%d] = %s\\n\", i, argv[i]);\n    }\n\n    // Check for required arguments\n    if (argc < 3) {\n        printf(\"Usage: %s <num1> <num2>\\n\", argv[0]);\n        return 1;\n    }\n\n    // Convert string arguments to numbers\n    int a = atoi(argv[1]);\n    int b = atoi(argv[2]);\n    printf(\"%d + %d = %d\\n\", a, b, a + b);\n    return 0;\n}\n\n// Run: ./prog 5 3\n// argc = 3\n// argv[0] = ./prog\n// argv[1] = 5\n// argv[2] = 3\n// 5 + 3 = 8",
        output: "argc = 3\nargv[0] = ./prog\nargv[1] = 5\nargv[2] = 3\n5 + 3 = 8",
        note: "argv[0] is always the program name. argv[argc] is NULL. All arguments are strings — convert with atoi or strtol for numbers."
      }
    ],
    marginNotes: [
      "argv[0] is always the program name. argv[argc] is NULL (a sentinel for iteration).",
      "All arguments are strings. Convert to numbers with atoi (simple) or strtol (robust, with error checking).",
      "Always check argc before accessing argv[i] — `if (argc < 2)` prevents out-of-bounds access.",
      "Use getopt for option parsing (-f file) and getopt_long for long options (--file=file). Don't parse options manually."
    ],
    commonMistakes: [
      "Accessing argv[1] without checking argc — if no arguments are given, out-of-bounds access (undefined behavior).",
      "Forgetting that all arguments are strings — `argv[1] + argv[2]` concatenates strings, doesn't add numbers. Convert first.",
      "Modifying argv strings — they're read-only. Copy to your own buffer if you need to modify."
    ],
    relatedTopics: ["Functions", "Strings & Character Arrays", "Pointers to Pointers"],
    externalLinks: [
      { label: "cppreference: Command Line Args", url: "https://en.cppreference.com/w/c/language/main_function" },
      { label: "C Command Line Args — GeeksforGeeks", url: "https://www.geeksforgeeks.org/command-line-arguments-in-c-cpp/" }
    ],
    mcqs: [
      {
        question: "What is argv[0]?",
        options: ["The first argument", "The program name", "NULL", "The argument count"],
        answer: 1,
        explanations: ["Not the first user argument.", "Correct — argv[0] is always the program name. User arguments start at argv[1].", "argv[argc] is NULL.", "That's argc."],
        difficulty: "easy"
      },
      {
        question: "What is the minimum value of argc?",
        options: ["0", "1 (the program name)", "2", "Depends on arguments"],
        answer: 1,
        explanations: ["argc is at least 1.", "Correct — argc is always at least 1 because argv[0] is the program name.", "Not 2.", "It's always at least 1."],
        difficulty: "easy"
      },
      {
        question: "What type are command-line arguments?",
        options: ["int", "Strings (char*)", "float", "Depends on the argument"],
        answer: 1,
        explanations: ["Not int.", "Correct — all arguments are strings. Convert with atoi or strtol for numbers.", "Not float.", "Always strings."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "bitwise-operators",
    title: "Bitwise Operators",
    difficulty: "medium",
    definition: "Bitwise operators manipulate individual bits: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift). They are essential for flags, masks, embedded programming, cryptography, and any task where you pack data tightly or talk directly to hardware registers.",
    coreUnderstanding: "Bitwise operators work on individual bits of integers. They're essential for systems programming, embedded systems, cryptography, and any task where you need to pack data tightly or manipulate hardware registers. The key operations: & (AND — mask/check bits), | (OR — set bits), ^ (XOR — toggle bits), ~ (NOT — flip all bits), << (left shift — multiply by 2), >> (right shift — divide by 2). Common patterns: flags (each bit is a boolean), masks (check/set specific bits), bit fields (pack multiple values in one int).",
    howItWorks: "1. `&` (AND): bits that are 1 in BOTH operands. `0b1100 & 0b1010` = `0b1000`. Used for masking (checking bits).\n2. `|` (OR): bits that are 1 in EITHER operand. `0b1100 | 0b1010` = `0b1110`. Used for setting bits.\n3. `^` (XOR): bits that are 1 in exactly ONE operand. `0b1100 ^ 0b1010` = `0b0110`. Used for toggling bits.\n4. `~` (NOT): flips all bits. `~0b00001111` = `0b11110000` (on 8 bits). Unary.\n5. `<<` (left shift): moves bits left, filling with 0. `0b0001 << 3` = `0b1000`. Same as multiplying by 2^n.\n6. `>>` (right shift): moves bits right. For unsigned, fills with 0. For signed, fills with sign bit (implementation-defined). Same as dividing by 2^n.\n7. Common patterns: `flags |= BIT` (set), `flags & BIT` (check), `flags &= ~BIT` (clear), `flags ^= BIT` (toggle).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// Bit flags\n#define READ  0x01  // 0001\n#define WRITE 0x02  // 0010\n#define EXEC  0x04  // 0100\n\nint main(void) {\n    unsigned int a = 0b1100;  // 12\n    unsigned int b = 0b1010;  // 10\n\n    printf(\"a & b = %u\\n\", a & b);  // 8  (1000)\n    printf(\"a | b = %u\\n\", a | b);  // 14 (1110)\n    printf(\"a ^ b = %u\\n\", a ^ b);  // 6  (0110)\n    printf(\"~a = %u\\n\", ~a);       // large (flips all bits)\n    printf(\"a << 2 = %u\\n\", a << 2); // 48 (110000)\n    printf(\"a >> 1 = %u\\n\", a >> 1); // 6  (0110)\n\n    // Bit flags pattern\n    unsigned int perm = 0;\n    perm |= READ;   // set READ\n    perm |= WRITE;  // set WRITE\n    printf(\"perm = %u\\n\", perm);  // 3 (0011)\n\n    if (perm & READ) printf(\"Has READ\\n\");\n    if (perm & EXEC) printf(\"Has EXEC\\n\");  // won't print\n\n    perm &= ~WRITE;  // clear WRITE\n    printf(\"perm = %u\\n\", perm);  // 1 (0001)\n    return 0;\n}",
        output: "a & b = 8\na | b = 14\na ^ b = 6\n~a = 4294967283\na << 2 = 48\na >> 1 = 6\nperm = 3\nHas READ\nperm = 1",
        note: "Bit flags: |= to set, & to check, &= ~ to clear, ^= to toggle. Each flag is a power of 2 (1, 2, 4, 8, ...)."
      }
    ],
    marginNotes: [
      "Bit flags: `flags |= BIT` (set), `flags & BIT` (check), `flags &= ~BIT` (clear), `flags ^= BIT` (toggle). Each flag is a power of 2.",
      "`<< n` is equivalent to multiplying by 2^n. `>> n` is equivalent to dividing by 2^n (for unsigned).",
      "Right shift of signed integers is implementation-defined (may fill with 0 or the sign bit). Use unsigned for portable bit operations.",
      "XOR with the same value twice gives the original: `a ^ b ^ b == a`. This is used in simple encryption and swap without temp: `a ^= b; b ^= a; a ^= b;`."
    ],
    commonMistakes: [
      "Confusing & (bitwise AND) with && (logical AND), and | (bitwise OR) with || (logical OR).",
      "Right-shifting signed integers — implementation-defined. Use unsigned for portable bit operations.",
      "Forgetting operator precedence: bitwise operators have lower precedence than comparison. Use parentheses: `(a & b) == 0` not `a & b == 0`."
    ],
    relatedTopics: ["Operators & Expressions", "Enumerations", "Bit Fields"],
    externalLinks: [
      { label: "cppreference: Bitwise Operators", url: "https://en.cppreference.com/w/c/language/operator_arithmetic#Bitwise_logic" },
      { label: "C Bitwise Operators — GeeksforGeeks", url: "https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/" }
    ],
    mcqs: [
      {
        question: "What does `flags |= BIT` do?",
        options: ["Checks if BIT is set", "Sets BIT in flags", "Clears BIT", "Toggles BIT"],
        answer: 1,
        explanations: ["That's flags & BIT.", "Correct — |= (OR-assign) sets the bit. flags |= BIT turns on the BIT in flags.", "That's flags &= ~BIT.", "That's flags ^= BIT."],
        difficulty: "medium"
      },
      {
        question: "What is `a << 3` equivalent to?",
        options: ["a + 3", "a * 8 (2^3)", "a / 8", "a ^ 3"],
        answer: 1,
        explanations: ["Not addition.", "Correct — left shift by n is multiplication by 2^n. a << 3 = a * 8.", "That's right shift.", "That's XOR."],
        difficulty: "medium"
      },
      {
        question: "How do you clear (turn off) a specific bit?",
        options: ["flags |= BIT", "flags &= ~BIT", "flags ^= BIT", "flags & BIT"],
        answer: 1,
        explanations: ["That sets the bit.", "Correct — flags &= ~BIT clears the bit. AND with the complement turns off that bit.", "That toggles the bit.", "That checks the bit."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "scope-lifetime",
    title: "Scope & Lifetime of Variables",
    difficulty: "easy",
    definition: "Scope is the region of code where a variable is visible; lifetime is how long it exists in memory. Local (block) variables have block scope and automatic lifetime. Global variables have file scope and live for the entire program. static locals persist across calls but keep block scope. Understanding scope prevents name collisions and misuse.",
    coreUnderstanding: "Scope and lifetime are related but different concepts. Scope is WHERE a variable is visible (which parts of the code can access it). Lifetime is WHEN it exists in memory (how long the storage is valid). Local variables have block scope (visible only in their block) and automatic lifetime (created on function entry, destroyed on exit). Global variables have file scope (visible from declaration to end of file) and static lifetime (exist for the entire program). Static locals are a hybrid: block scope (local visibility) but static lifetime (persist across calls).",
    howItWorks: "1. Block scope: variables declared inside { } are visible only within that block. They're created on entry, destroyed on exit.\n2. File scope: variables declared outside all functions are visible from their declaration to the end of the file.\n3. Global (external) scope: file-scope variables can be made visible to other files with `extern`.\n4. Automatic lifetime: local variables are created on the stack when the block is entered and destroyed when it exits.\n5. Static lifetime: global and static variables exist for the entire program. They're stored in the data segment, not the stack.\n6. Static local: block scope (local visibility) but static lifetime (persists across calls). Initialized once.\n7. Name hiding: an inner block variable with the same name as an outer one hides the outer variable.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint global = 100;  // file scope, static lifetime\n\nvoid demo(void) {\n    int local = 10;  // block scope, automatic lifetime\n    static int count = 0;  // block scope, static lifetime\n\n    count++;  // persists across calls\n    printf(\"local=%d, count=%d, global=%d\\n\", local, count, global);\n}\n\nint main(void) {\n    demo();  // local=10, count=1, global=100\n    demo();  // local=10, count=2, global=100 (count persists!)\n\n    // Block scope — variable only visible inside the block\n    {\n        int x = 5;  // visible only in this block\n        printf(\"x = %d\\n\", x);  // 5\n    }\n    // printf(\"%d\", x);  // ERROR: x is out of scope\n\n    // Name hiding\n    int y = 20;\n    {\n        int y = 30;  // hides outer y\n        printf(\"inner y = %d\\n\", y);  // 30\n    }\n    printf(\"outer y = %d\\n\", y);  // 20\n    return 0;\n}",
        output: "local=10, count=1, global=100\nlocal=10, count=2, global=100\nx = 5\ninner y = 30\nouter y = 20",
        note: "Scope = where visible. Lifetime = how long it exists. Static locals have block scope but persist across calls (static lifetime)."
      }
    ],
    marginNotes: [
      "Scope = WHERE a variable is visible. Lifetime = HOW LONG it exists. They're related but different concepts.",
      "Static locals have block scope (local visibility) but static lifetime (persist across calls). They're initialized once and keep their value.",
      "Name hiding: an inner block variable with the same name as an outer one hides the outer variable. Avoid this — it's confusing.",
      "Global variables have file scope and static lifetime. They're visible from their declaration to the end of the file (or via extern in other files)."
    ],
    commonMistakes: [
      "Assuming a local variable persists across function calls — it doesn't (automatic lifetime). Use static if you need persistence.",
      "Name hiding: declaring a variable with the same name in an inner block — it hides the outer variable, causing confusion.",
      "Using global variables excessively — they make code hard to maintain and debug. Prefer passing parameters."
    ],
    relatedTopics: ["Storage Classes", "Functions", "Memory Layout"],
    externalLinks: [
      { label: "cppreference: Scope", url: "https://en.cppreference.com/w/c/language/scope" },
      { label: "cppreference: Storage Duration", url: "https://en.cppreference.com/w/c/language/storage_duration" }
    ],
    mcqs: [
      {
        question: "What is the difference between scope and lifetime?",
        options: ["They're the same", "Scope is WHERE visible; lifetime is HOW LONG it exists", "Scope is for globals; lifetime for locals", "Scope is compile-time; lifetime is runtime"],
        answer: 1,
        explanations: ["They're different.", "Correct — scope is the region of code where a variable is visible; lifetime is how long the storage exists.", "Both apply to all variables.", "Both are compile-time concepts, but lifetime is about runtime existence."],
        difficulty: "medium"
      },
      {
        question: "What is special about a static local variable?",
        options: ["It's global", "Block scope but static lifetime (persists across calls)", "It's on the stack", "It's read-only"],
        answer: 1,
        explanations: ["It's not global — it's local scope.", "Correct — static locals have block scope (local visibility) but static lifetime (persist across calls).", "It's in the data segment, not the stack.", "const is read-only, not static."],
        difficulty: "medium"
      },
      {
        question: "What is name hiding?",
        options: ["A variable is deleted", "An inner block variable with the same name hides the outer one", "A variable is made private", "A variable is uninitialized"],
        answer: 1,
        explanations: ["Not deletion.", "Correct — an inner block variable with the same name as an outer one hides the outer variable within the inner block.", "Not about privacy.", "Not about initialization."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "type-qualifiers",
    title: "Type Qualifiers (const, volatile, restrict)",
    difficulty: "medium",
    definition: "const marks a variable as read-only after initialization — the compiler enforces immutability. volatile tells the compiler not to optimize reads/writes because the value can change unexpectedly (hardware registers, signal handlers). restrict is a promise that a pointer is the only reference to its target, enabling optimization.",
    coreUnderstanding: "Type qualifiers modify how the compiler treats a variable. const is the most common: it marks a variable as read-only after initialization, and the compiler enforces this. volatile is crucial for embedded and systems programming: it tells the compiler not to optimize away reads or writes because the value can change outside the program's control (hardware registers, memory-mapped I/O, signal handlers). restrict (C99) is a promise from the programmer that a pointer is the only way to access its target — this enables aggressive optimization. Violating restrict is undefined behavior.",
    howItWorks: "1. `const int x = 5;` — x is read-only. `x = 10;` is a compile error.\n2. `const int *p` — pointer to const int. Can't modify through p. `int * const p` — const pointer, can't change where p points.\n3. `volatile int x;` — the compiler won't optimize reads/writes. Every access goes to memory.\n4. volatile is needed for: memory-mapped hardware registers, variables modified by signal handlers, variables shared with another thread (without synchronization).\n5. `int *restrict p` — p is the only way to access the pointed-to data. Enables optimization.\n6. restrict is a promise — violating it (another pointer accesses the same data) is undefined behavior.\n7. Qualifiers can combine: `const volatile int *p` — read-only and volatile (e.g., a read-only hardware register that changes).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// const — read-only\nvoid show_const(void) {\n    const int x = 5;\n    // x = 10;  // ERROR: can't modify const\n    printf(\"x = %d\\n\", x);\n\n    const int *p1 = &x;  // pointer to const int\n    // *p1 = 10;  // ERROR: can't modify through p1\n    int y = 10;\n    int * const p2 = &y;  // const pointer\n    *p2 = 20;  // OK — can modify y through p2\n    // p2 = &x;  // ERROR: can't change where p2 points\n}\n\n// volatile — don't optimize\nvolatile int hardware_reg = 0;\nvoid wait_for_hardware(void) {\n    // Without volatile, the compiler might optimize this to an infinite loop\n    while (hardware_reg == 0) {\n        // hardware_reg might change outside the program\n    }\n    printf(\"Hardware ready!\\n\");\n}\n\n// restrict — promise of exclusive access\nvoid add_arrays(const int *restrict a, const int *restrict b, int *restrict c, int n) {\n    for (int i = 0; i < n; i++)\n        c[i] = a[i] + b[i];  // compiler can optimize aggressively\n}\n\nint main(void) {\n    show_const();\n    int arr1[] = {1, 2, 3}, arr2[] = {4, 5, 6}, arr3[3];\n    add_arrays(arr1, arr2, arr3, 3);\n    printf(\"%d %d %d\\n\", arr3[0], arr3[1], arr3[2]);  // 5 7 9\n    return 0;\n}",
        output: "x = 5\n5 7 9",
        note: "const = read-only, volatile = don't optimize (hardware/signal), restrict = exclusive pointer access (optimization promise)."
      }
    ],
    marginNotes: [
      "`const int *p` (pointer to const) vs `int * const p` (const pointer) — read the declaration right to left.",
      "volatile is essential for embedded programming — it prevents the compiler from optimizing away reads of hardware registers.",
      "restrict is a promise, not a check. If you violate it (another pointer accesses the same data), it's undefined behavior.",
      "`const volatile` is valid — a read-only hardware register that changes on its own (e.g., a timer counter)."
    ],
    commonMistakes: [
      "Confusing `const int *p` (pointer to const, can't modify data) with `int * const p` (const pointer, can't change target).",
      "Forgetting volatile for hardware registers — the compiler optimizes away reads, causing infinite loops.",
      "Violating restrict by having another pointer access the same data — undefined behavior."
    ],
    relatedTopics: ["Variables & Data Types", "Pointers: The Fundamentals", "Signal Handling"],
    externalLinks: [
      { label: "cppreference: Type Qualifiers", url: "https://en.cppreference.com/w/c/language/const" },
      { label: "C Type Qualifiers — GeeksforGeeks", url: "https://www.geeksforgeeks.org/const-qualifier-in-c/" }
    ],
    mcqs: [
      {
        question: "What does `const int *p` mean?",
        options: ["A const pointer", "A pointer to const int — can't modify the data through p", "A pointer that can't change", "A const pointer to a const int"],
        answer: 1,
        explanations: ["That's int * const p.", "Correct — const int *p is a pointer to const int. You can't modify the data through p, but you can change where p points.", "That's int * const p.", "That's const int * const p."],
        difficulty: "medium"
      },
      {
        question: "When should you use volatile?",
        options: ["For all variables", "For hardware registers and signal handler variables that change outside the program", "For constants", "For performance"],
        answer: 1,
        explanations: ["Not for all variables.", "Correct — volatile prevents the compiler from optimizing reads/writes. Use it for hardware registers and signal handler variables.", "const is for constants.", "volatile may decrease performance."],
        difficulty: "medium"
      },
      {
        question: "What does restrict promise?",
        options: ["The pointer is const", "The pointer is the only way to access its target — enables optimization", "The pointer can't be NULL", "The pointer is volatile"],
        answer: 1,
        explanations: ["Not const.", "Correct — restrict promises that the pointer is the only reference to its target. Violating this is undefined behavior.", "Not about NULL.", "Not volatile."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "memory-layout",
    title: "Memory Layout: Stack, Heap, Data, Text",
    difficulty: "hard",
    definition: "A C program's memory is divided into segments: the text segment (machine code), data segment (initialized globals), BSS (uninitialized globals, zeroed), the stack (function frames, local variables, return addresses — grows downward), and the heap (dynamically allocated memory — grows upward). Understanding this layout is key to debugging crashes and memory errors.",
    coreUnderstanding: "A C program's memory is organized into segments, each with a different purpose. The text segment holds the compiled machine code (read-only, executable). The data segment holds initialized global and static variables. The BSS segment holds uninitialized globals (automatically zeroed). The stack holds function frames — local variables, parameters, return addresses — and grows downward. The heap holds dynamically allocated memory (malloc/calloc) and grows upward. Understanding this layout is crucial for debugging: stack overflows, heap corruption, and accessing freed memory all manifest as crashes that make sense only when you know the memory layout.",
    howItWorks: "1. Text segment: the compiled machine code. Read-only and executable. Shared for multiple runs of the same program.\n2. Data segment: initialized global and static variables. `int x = 5;` (global) goes here.\n3. BSS segment: uninitialized global and static variables. Automatically zeroed. `int x;` (global) goes here.\n4. Stack: function frames. Each function call pushes a frame (local variables, parameters, return address). Grows downward. Auto-managed.\n5. Heap: dynamically allocated memory (malloc/calloc/realloc). Grows upward. Manually managed (you must free).\n6. Stack overflow: too many recursive calls or too-large local arrays. The stack hits the heap or goes past its limit.\n7. Heap corruption: writing past a malloc'd block, double-free, use-after-free. Causes crashes or undefined behavior.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <stdlib.h>\n\nint global_init = 42;    // Data segment (initialized)\nint global_uninit;        // BSS segment (zeroed)\n\nvoid show_layout(void) {\n    int local = 10;       // Stack\n    static int stat = 5;  // Data segment (initialized static)\n    static int stat_un;   // BSS (uninitialized static, zeroed)\n    int *heap = malloc(sizeof(int));  // Heap\n\n    printf(\"Text (function):    %p\\n\", (void*)show_layout);\n    printf(\"Data (global_init): %p\\n\", (void*)&global_init);\n    printf(\"BSS  (global_un):   %p\\n\", (void*)&global_uninit);\n    printf(\"Stack (local):      %p\\n\", (void*)&local);\n    printf(\"Stack (stat):       %p\\n\", (void*)&stat);\n    printf(\"Heap  (malloc):     %p\\n\", (void*)heap);\n\n    free(heap);\n}\n\nint main(void) {\n    show_layout();\n    // Typical addresses (64-bit Linux):\n    // Text:  0x4005a6  (low)\n    // Data:  0x601034\n    // BSS:   0x601040\n    // Heap:  0x8c3010  (grows up from data)\n    // Stack: 0x7ffd12345678  (high, grows down)\n    return 0;\n}",
        output: "Text (function):    0x4005a6\nData (global_init): 0x601034\nBSS  (global_un):   0x601040\nStack (local):      0x7ffd12345678\nStack (stat):       0x601038\nHeap  (malloc):     0x8c3010",
        note: "Text (code) is low, stack is high and grows down, heap grows up from data. Understanding this layout helps debug memory errors."
      }
    ],
    marginNotes: [
      "Stack grows DOWNWARD (from high to low addresses). Heap grows UPWARD (from low to high). They grow toward each other — if they meet, you get a stack/heap collision.",
      "Stack overflow: too many recursive calls or too-large local arrays. The stack grows past its limit and crashes.",
      "BSS is zero-initialized. Data is initialized to the declared value. Both hold global/static variables.",
      "Text segment is read-only and executable. Data, BSS, heap, and stack are read-write (but not executable, on modern systems)."
    ],
    commonMistakes: [
      "Allocating huge arrays on the stack — `int arr[1000000]` causes a stack overflow. Use malloc for large allocations.",
      "Returning a pointer to a stack variable — the stack frame is destroyed when the function returns, leaving a dangling pointer.",
      "Forgetting that BSS is zero-initialized — assuming uninitialized globals contain garbage (they don't, they're zeroed)."
    ],
    relatedTopics: ["Dynamic Memory Allocation", "Storage Classes", "Scope & Lifetime"],
    externalLinks: [
      { label: "C Memory Layout — GeeksforGeeks", url: "https://www.geeksforgeeks.org/memory-layout-of-c-program/" },
      { label: "cppreference: Storage Duration", url: "https://en.cppreference.com/w/c/language/storage_duration" }
    ],
    mcqs: [
      {
        question: "Where are local (auto) variables stored?",
        options: ["Heap", "Stack", "Data segment", "BSS"],
        answer: 1,
        explanations: ["Heap is for malloc.", "Correct — local variables are on the stack. Each function call pushes a frame.", "Data is for initialized globals.", "BSS is for uninitialized globals."],
        difficulty: "easy"
      },
      {
        question: "Where does malloc allocate memory?",
        options: ["Stack", "Heap", "Data segment", "BSS"],
        answer: 1,
        explanations: ["Stack is for locals.", "Correct — malloc allocates from the heap, which grows upward.", "Data is for globals.", "BSS is for uninitialized globals."],
        difficulty: "easy"
      },
      {
        question: "What causes a stack overflow?",
        options: ["Too much malloc", "Too many recursive calls or too-large local arrays", "Freeing memory twice", "Using const"],
        answer: 1,
        explanations: ["That causes heap issues.", "Correct — deep recursion or large stack allocations push the stack past its limit, causing a crash.", "That's heap corruption.", "const doesn't cause overflow."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "error-handling",
    title: "Error Handling (errno, perror, exit)",
    difficulty: "medium",
    definition: "C has no exceptions. Library functions signal failure by returning a sentinel (NULL, -1, EOF) and set the global errno to a specific error code. perror prints a human-readable message for errno. exit(status) terminates the program immediately. Robust C code checks every return value and handles errors explicitly.",
    coreUnderstanding: "C has no exception handling mechanism. Instead, functions signal failure by returning a sentinel value (NULL for pointers, -1 for integers, EOF for I/O) and setting the global errno to a specific error code. You check the return value, and if it indicates failure, you inspect errno (or call perror/strerror for a human-readable message). exit(status) terminates the program immediately (0 = success, non-zero = failure). Robust C code checks EVERY return value and handles errors explicitly — there's no safety net.",
    howItWorks: "1. Return sentinels: NULL (pointers), -1 (integers), EOF (I/O). Check after every call that can fail.\n2. `errno` — global variable set by library functions on failure. Defined in <errno.h>. Reset to 0 before a call if you check it.\n3. `perror(\"prefix\")` — prints `prefix: <error message>` to stderr. Uses errno.\n4. `strerror(errno)` — returns a string describing the error. From <string.h>.\n5. `exit(status)` — terminates the program. 0 = success, 1 or non-zero = failure. From <stdlib.h>.\n6. `EXIT_SUCCESS` (0) and `EXIT_FAILURE` (1) — portable constants from <stdlib.h>.\n7. Common errno values: ENOENT (no such file), EACCES (permission denied), ENOMEM (out of memory), EINVAL (invalid argument).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <stdlib.h>\n#include <errno.h>\n#include <string.h>\n\nint main(void) {\n    // fopen returns NULL on failure, sets errno\n    FILE *f = fopen(\"nonexistent.txt\", \"r\");\n    if (!f) {\n        perror(\"fopen\");  // fopen: No such file or directory\n        printf(\"errno = %d: %s\\n\", errno, strerror(errno));\n        // errno = 2: No such file or directory\n    }\n\n    // malloc returns NULL on failure\n    int *arr = malloc(1000000000 * sizeof(int));\n    if (!arr) {\n        perror(\"malloc\");  // malloc: Cannot allocate memory\n        exit(EXIT_FAILURE);\n    }\n    free(arr);\n\n    // Check return values\n    FILE *out = fopen(\"output.txt\", \"w\");\n    if (!out) {\n        perror(\"fopen\");\n        return EXIT_FAILURE;\n    }\n    if (fprintf(out, \"Hello\\n\") < 0) {\n        perror(\"fprintf\");\n    }\n    if (fclose(out) != 0) {\n        perror(\"fclose\");\n    }\n    return EXIT_SUCCESS;\n}",
        output: "fopen: No such file or directory\nerrno = 2: No such file or directory",
        note: "C has no exceptions. Check every return value. Use perror/strerror for error messages and exit(EXIT_FAILURE) to terminate on error."
      }
    ],
    marginNotes: [
      "C has no exceptions. Check EVERY return value — NULL, -1, EOF indicate failure. There's no safety net.",
      "`perror(\"prefix\")` prints `prefix: <error message>` to stderr. It uses errno to get the message.",
      "errno is only set on failure — it's NOT reset to 0 on success. Set it to 0 before a call if you want to check it after.",
      "Use `exit(EXIT_FAILURE)` to terminate on error. `exit(EXIT_SUCCESS)` or `return 0` for success."
    ],
    commonMistakes: [
      "Not checking return values — C has no exceptions, so failures are silently ignored if you don't check.",
      "Assuming errno is reset on success — it's not. Only set errno = 0 before a call if you plan to check it after.",
      "Using `return 0` for failure and `return 1` for success — convention is the opposite: 0 = success, non-zero = failure."
    ],
    relatedTopics: ["File Handling", "Functions", "Undefined Behavior"],
    externalLinks: [
      { label: "cppreference: errno", url: "https://en.cppreference.com/w/c/error/errno" },
      { label: "C Error Handling — GeeksforGeeks", url: "https://www.geeksforgeeks.org/error-handling-in-c/" }
    ],
    mcqs: [
      {
        question: "How do C functions signal failure?",
        options: ["Throw exceptions", "Return a sentinel value (NULL, -1, EOF) and set errno", "Set a global error flag", "Print to stderr"],
        answer: 1,
        explanations: ["C has no exceptions.", "Correct — C functions return a sentinel (NULL, -1, EOF) and set errno. You must check the return value.", "Not a global flag (errno is per-thread, but it's not a simple flag).", "perror prints to stderr, but that's not how failure is signaled."],
        difficulty: "medium"
      },
      {
        question: "What does perror do?",
        options: ["Returns an error code", "Prints a human-readable error message to stderr", "Exits the program", "Clears errno"],
        answer: 1,
        explanations: ["It doesn't return a code.", "Correct — perror prints `prefix: <error message>` to stderr, using errno for the message.", "That's exit().", "It doesn't clear errno."],
        difficulty: "easy"
      },
      {
        question: "What does exit(EXIT_FAILURE) do?",
        options: ["Returns 0", "Terminates the program with a failure status (non-zero)", "Throws an error", "Restarts the program"],
        answer: 1,
        explanations: ["EXIT_FAILURE is non-zero.", "Correct — exit(EXIT_FAILURE) terminates the program immediately with a non-zero (failure) status.", "It doesn't throw.", "It doesn't restart."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "data-structures-in-c",
    title: "Linked Lists, Stacks & Queues in C",
    difficulty: "hard",
    definition: "C's combination of structs and pointers lets you build dynamic data structures from scratch. A linked list node is a self-referential struct holding data and a next pointer. Stacks (LIFO) and queues (FIFO) are built on lists or arrays. These structures are where pointers, dynamic memory, and recursion all come together — and where you truly learn to manage memory.",
    coreUnderstanding: "Building data structures in C is where everything comes together: structs, pointers, dynamic memory, and recursion. A linked list is a chain of self-referential struct nodes, each holding data and a pointer to the next node. A stack is LIFO (push/pop from the top). A queue is FIFO (enqueue at the back, dequeue from the front). These can be built with linked lists (dynamic size) or arrays (fixed size, simpler). The key challenge is memory management: every malloc'd node must be freed, and you must handle edge cases (empty list, single node, inserting at head/tail).",
    howItWorks: "1. Linked list node: `struct Node { int data; struct Node *next; };` — each node has data and a pointer to the next.\n2. Insert at head: create new node, set its next to current head, update head. O(1).\n3. Insert at tail: traverse to the end, set last node's next to new node. O(n) without a tail pointer.\n4. Delete: find the node, adjust the previous node's next pointer, free the node.\n5. Stack (LIFO): push (insert at head), pop (remove from head). Both O(1).\n6. Queue (FIFO): enqueue (insert at tail), dequeue (remove from head). O(1) with head and tail pointers.\n7. Always free nodes when deleting — memory leaks are easy to create in data structures.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <stdlib.h>\n\n// Linked list node\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\n// Insert at head — O(1)\nstruct Node* insert_head(struct Node *head, int data) {\n    struct Node *new = malloc(sizeof(struct Node));\n    new->data = data;\n    new->next = head;\n    return new;  // new head\n}\n\n// Print the list\nvoid print_list(struct Node *head) {\n    for (struct Node *p = head; p; p = p->next)\n        printf(\"%d -> \", p->data);\n    printf(\"NULL\\n\");\n}\n\n// Free the entire list\nvoid free_list(struct Node *head) {\n    while (head) {\n        struct Node *next = head->next;\n        free(head);\n        head = next;\n    }\n}\n\n// Stack push (same as insert_head) and pop\nint pop(struct Node **head) {\n    if (!*head) return -1;  // empty stack\n    int data = (*head)->data;\n    struct Node *old = *head;\n    *head = (*head)->next;\n    free(old);\n    return data;\n}\n\nint main(void) {\n    struct Node *list = NULL;\n    list = insert_head(list, 3);\n    list = insert_head(list, 2);\n    list = insert_head(list, 1);\n    print_list(list);  // 1 -> 2 -> 3 -> NULL\n\n    // Stack operations\n    printf(\"pop: %d\\n\", pop(&list));  // 1\n    printf(\"pop: %d\\n\", pop(&list));  // 2\n    print_list(list);  // 3 -> NULL\n\n    free_list(list);\n    return 0;\n}",
        output: "1 -> 2 -> 3 -> NULL\npop: 1\npop: 2\n3 -> NULL",
        note: "Always free nodes when deleting. Forgetting to free causes memory leaks. Save the next pointer before freeing the current node."
      }
    ],
    marginNotes: [
      "Always free nodes when deleting from a linked list. Save `next = p->next` before `free(p)` — you need the next pointer after freeing.",
      "Insert at head is O(1). Insert at tail is O(n) unless you maintain a tail pointer (then O(1)).",
      "Stack = LIFO (push/pop from head). Queue = FIFO (enqueue at tail, dequeue from head). Both can be built with linked lists.",
      "Handle edge cases: empty list, single node, inserting at head vs tail. These are where most bugs live."
    ],
    commonMistakes: [
      "Forgetting to free deleted nodes — memory leak. Save the next pointer before freeing.",
      "Losing the head pointer: `head = head->next` without saving the old head — can't free it, memory leak.",
      "Not handling the empty list case — dereferencing NULL head crashes."
    ],
    relatedTopics: ["Nested & Self-Referential Structures", "Dynamic Memory Allocation", "Recursion"],
    externalLinks: [
      { label: "C Linked Lists — GeeksforGeeks", url: "https://www.geeksforgeeks.org/linked-list-in-c/" },
      { label: "C Stacks and Queues — GeeksforGeeks", url: "https://www.geeksforgeeks.org/stack-in-c/" }
    ],
    mcqs: [
      {
        question: "What is the time complexity of inserting at the head of a linked list?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
        answer: 1,
        explanations: ["That's insert at tail without a tail pointer.", "Correct — inserting at the head is O(1): create a node, point it to the old head, update head.", "Not logarithmic.", "Not quadratic."],
        difficulty: "medium"
      },
      {
        question: "What is the difference between a stack and a queue?",
        options: ["Stack is FIFO; queue is LIFO", "Stack is LIFO (push/pop from top); queue is FIFO (enqueue at back, dequeue from front)", "They're the same", "Stack uses arrays; queue uses lists"],
        answer: 1,
        explanations: ["Reversed.", "Correct — stack is LIFO (last in, first out), queue is FIFO (first in, first out).", "They differ.", "Both can use either."],
        difficulty: "easy"
      },
      {
        question: "What must you do when deleting a node from a linked list?",
        options: ["Just remove it", "Free the node's memory and adjust the previous node's next pointer", "Set it to NULL", "Nothing — it's automatic"],
        answer: 1,
        explanations: ["Not enough — you must free.", "Correct — adjust the previous node's next pointer to skip the deleted node, then free the deleted node's memory.", "Not sufficient.", "C has no garbage collector."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "bit-fields",
    title: "Bit Fields in Structures",
    difficulty: "medium",
    definition: "Bit fields let you specify the exact bit width of struct members, packing multiple small fields into a single machine word. Declared as `unsigned int flag : 1;` (1 bit). Bit fields save memory in embedded systems and protocol headers, but they are implementation-defined (bit order, alignment, padding), so they're not portable across compilers.",
    coreUnderstanding: "Bit fields let you pack multiple small values into a single int by specifying the exact number of bits for each field. `unsigned int a : 3` uses only 3 bits (values 0-7). This is useful for memory-constrained systems (embedded) and protocol headers (network packets) where every byte counts. However, bit fields are implementation-defined: the order of bits within a byte, whether fields can cross word boundaries, and how padding works all depend on the compiler. This makes bit fields non-portable — don't use them for cross-platform data interchange.",
    howItWorks: "1. Declaration: `struct { unsigned int a : 3; unsigned int b : 5; }` — a uses 3 bits (0-7), b uses 5 bits (0-31).\n2. Total: 3 + 5 = 8 bits = 1 byte (but the compiler may pad to a full int).\n3. Access: like normal struct members — `s.a = 5; s.b = 20;`.\n4. Overflow: `s.a = 8` (3 bits max 7) — the value is truncated to 0 (8 & 0x7 = 0).\n5. Implementation-defined: bit order (MSB first or LSB first), whether fields can cross word boundaries, padding.\n6. Not portable: different compilers may lay out the same bit fields differently. Don't use for cross-platform data interchange.\n7. Can't take address: `&s.a` is illegal — bit fields don't have addresses (they're sub-byte).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// Bit fields — pack flags into a single int\nstruct Flags {\n    unsigned int read  : 1;  // 1 bit (0 or 1)\n    unsigned int write : 1;\n    unsigned int exec  : 1;\n    unsigned int : 5;        // 5 bits of padding\n    unsigned int level : 3;   // 3 bits (0-7)\n};\n\n// Protocol header — pack fields tightly\nstruct Header {\n    unsigned int version : 4;   // 4 bits (0-15)\n    unsigned int type    : 2;   // 2 bits (0-3)\n    unsigned int flags   : 2;   // 2 bits\n    unsigned int length   : 8;   // 8 bits (0-255)\n};\n\nint main(void) {\n    printf(\"sizeof(Flags) = %zu\\n\", sizeof(struct Flags));  // 4 (padded to int)\n\n    struct Flags f = {0};\n    f.read = 1;\n    f.write = 1;\n    f.level = 5;\n    printf(\"read=%u, write=%u, exec=%u, level=%u\\n\",\n           f.read, f.write, f.exec, f.level);  // 1, 1, 0, 5\n\n    // Overflow — 3 bits max is 7\n    f.level = 8;  // 8 = 0b1000, but only 3 bits -> 0b000 = 0\n    printf(\"level after overflow: %u\\n\", f.level);  // 0\n\n    // Can't take address of a bit field\n    // &f.read;  // ERROR: cannot take address of bit-field\n    return 0;\n}",
        output: "sizeof(Flags) = 4\nread=1, write=1, exec=0, level=5\nlevel after overflow: 0",
        note: "Bit fields pack multiple small values into one int. They're implementation-defined (bit order, padding) — not portable across compilers."
      }
    ],
    marginNotes: [
      "Bit fields are implementation-defined — bit order, padding, and whether fields can cross word boundaries depend on the compiler. Not portable.",
      "You can't take the address of a bit field (`&f.read` is illegal) — bit fields are sub-byte and don't have addresses.",
      "Overflow is silently truncated: `f.level = 8` on a 3-bit field gives 0 (8 & 0x7 = 0).",
      "Use bit fields for memory-constrained systems and protocol headers. Don't use them for cross-platform data interchange (use explicit bit masking instead)."
    ],
    commonMistakes: [
      "Assuming bit field layout is portable — it's not. Bit order and padding are implementation-defined.",
      "Trying to take the address of a bit field (`&f.read`) — illegal, bit fields don't have addresses.",
      "Forgetting that overflow is silently truncated — `f.level = 8` on a 3-bit field gives 0, not an error."
    ],
    relatedTopics: ["Structures", "Bitwise Operators", "Type Qualifiers"],
    externalLinks: [
      { label: "cppreference: Bit Fields", url: "https://en.cppreference.com/w/c/language/bit_field" },
      { label: "C Bit Fields — GeeksforGeeks", url: "https://www.geeksforgeeks.org/bit-fields-in-c/" }
    ],
    mcqs: [
      {
        question: "What does `unsigned int flag : 3;` declare?",
        options: ["A 3-byte field", "A 3-bit field (values 0-7)", "A pointer", "An array of 3 ints"],
        answer: 1,
        explanations: ["Not 3 bytes.", "Correct — : 3 specifies a 3-bit field, holding values 0-7.", "Not a pointer.", "Not an array."],
        difficulty: "medium"
      },
      {
        question: "Are bit fields portable across compilers?",
        options: ["Yes, always", "No — bit order and padding are implementation-defined", "Only on 64-bit systems", "Only with #pragma"],
        answer: 1,
        explanations: ["They're not portable.", "Correct — bit field layout (bit order, padding, word boundaries) is implementation-defined. Don't use for cross-platform data interchange.", "Not about bit width.", "pragma doesn't fully fix this."],
        difficulty: "hard"
      },
      {
        question: "Can you take the address of a bit field (&f.flag)?",
        options: ["Yes", "No — bit fields are sub-byte and don't have addresses", "Only if it's 8 bits", "Only with a cast"],
        answer: 1,
        explanations: ["You can't.", "Correct — bit fields are sub-byte, so they don't have addresses. &f.flag is a compile error.", "Even 8-bit fields can't be addressed.", "No cast helps."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "variadic-functions",
    title: "Variadic Functions (stdarg.h)",
    difficulty: "medium",
    definition: "A variadic function accepts a variable number of arguments, like printf. The <stdarg.h> header provides va_list, va_start, va_arg, and va_end to access the extra arguments. You must have at least one named parameter and a way to know how many extra args there are (printf uses format specifiers). Variadic functions are type-unsafe — the compiler can't check argument types.",
    coreUnderstanding: "Variadic functions accept a variable number of arguments. printf is the classic example: `printf(\"%d %s\", 42, \"hello\")` has 2 extra arguments. The <stdarg.h> header provides the tools: va_list (the argument list), va_start (initialize it), va_arg (get the next argument), va_end (cleanup). The critical limitation: the function has no way to know how many arguments were passed — you need a convention. printf uses format specifiers (%d, %s). Another approach: pass a count as the first argument, or use a sentinel (NULL) as the last. Variadic functions are type-unsafe — the compiler can't check that the types match.",
    howItWorks: "1. `#include <stdarg.h>` — provides va_list, va_start, va_arg, va_end.\n2. Declaration: `void f(int count, ...);` — the ... means variable arguments. Must have at least one named parameter.\n3. `va_list args;` — declare the argument list.\n4. `va_start(args, last_named)` — initialize args. last_named is the last named parameter (the one before ...).\n5. `va_arg(args, type)` — get the next argument, as the given type. You must know the type (no runtime type info).\n6. `va_end(args)` — cleanup. Always call this.\n7. You need a way to know how many arguments: a count parameter, a format string (printf), or a sentinel (NULL).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <stdarg.h>\n\n// Sum a variable number of integers (count provided)\nint sum(int count, ...) {\n    va_list args;\n    va_start(args, count);  // initialize with last named param\n\n    int total = 0;\n    for (int i = 0; i < count; i++) {\n        total += va_arg(args, int);  // get next arg as int\n    }\n\n    va_end(args);  // cleanup\n    return total;\n}\n\n// Print with a sentinel (NULL) to mark the end\nvoid print_all(const char *first, ...) {\n    va_list args;\n    va_start(args, first);\n\n    const char *str = first;\n    while (str != NULL) {\n        printf(\"%s \", str);\n        str = va_arg(args, const char*);\n    }\n\n    va_end(args);\n    printf(\"\\n\");\n}\n\nint main(void) {\n    printf(\"sum = %d\\n\", sum(3, 10, 20, 30));  // 60\n    printf(\"sum = %d\\n\", sum(5, 1, 2, 3, 4, 5));  // 15\n    print_all(\"Hello\", \"World\", \"!\", NULL);  // Hello World !\n    return 0;\n}",
        output: "sum = 60\nsum = 15\nHello World ! ",
        note: "Variadic functions need a way to know how many arguments: a count, a format string, or a sentinel (NULL). They're type-unsafe."
      }
    ],
    marginNotes: [
      "Variadic functions are type-unsafe — the compiler can't check that the types match. printf(\"%d\", 3.14) compiles but is undefined behavior.",
      "You need a way to know how many arguments: a count parameter, a format string (printf), or a sentinel (NULL).",
      "`va_arg(args, type)` — you must know the type. There's no runtime type info. Getting the type wrong is undefined behavior.",
      "Integer arguments smaller than int are promoted to int; float is promoted to double. This is why printf uses %f for both float and double."
    ],
    commonMistakes: [
      "Passing the wrong type to va_arg — `va_arg(args, int)` when a double was passed. Undefined behavior.",
      "Forgetting to call va_end — resource leak (though on most platforms it's a no-op, it's required for portability).",
      "Not having a way to know the argument count — reading past the last argument is undefined behavior."
    ],
    relatedTopics: ["Functions", "Input & Output", "Function Pointers"],
    externalLinks: [
      { label: "cppreference: stdarg.h", url: "https://en.cppreference.com/w/c/variadic" },
      { label: "C Variadic Functions — GeeksforGeeks", url: "https://www.geeksforgeeks.org/variadic-functions-in-c/" }
    ],
    mcqs: [
      {
        question: "What does a variadic function need to determine the number of arguments?",
        options: ["The compiler tells it", "A convention: count parameter, format string, or sentinel", "It always knows", "A global variable"],
        answer: 1,
        explanations: ["The compiler doesn't help.", "Correct — the function needs a convention: a count, a format string (printf), or a sentinel (NULL). It can't determine the count automatically.", "It doesn't know automatically.", "Not via globals."],
        difficulty: "medium"
      },
      {
        question: "Why are variadic functions considered type-unsafe?",
        options: ["They're slow", "The compiler can't check that argument types match the expected types", "They use too much memory", "They can't return values"],
        answer: 1,
        explanations: ["Speed isn't the issue.", "Correct — the compiler can't verify that the arguments match the expected types. printf(\"%d\", 3.14) compiles but is undefined behavior.", "Memory isn't the issue.", "They can return values."],
        difficulty: "medium"
      },
      {
        question: "What happens to float arguments in a variadic function?",
        options: ["They stay float", "They're promoted to double", "They become int", "They're ignored"],
        answer: 1,
        explanations: ["They're promoted.", "Correct — float is promoted to double in variadic functions. This is why printf uses %f for both float and double.", "Not to int.", "Not ignored."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "signal-handling",
    title: "Signal Handling (signal.h)",
    difficulty: "hard",
    definition: "Signals are asynchronous notifications sent to a process (SIGINT for Ctrl+C, SIGSEGV for segfault, SIGALRM for timer). The <signal.h> header lets you register a handler function with signal(signum, handler). When the signal arrives, the handler runs. Signal handlers must be async-signal-safe — you can't safely call printf, malloc, or most library functions from a handler.",
    coreUnderstanding: "Signals are asynchronous interrupts sent to a process. Common signals: SIGINT (Ctrl+C), SIGSEGV (segfault), SIGTERM (termination request), SIGALRM (timer). You can register a handler function with `signal(signum, handler)` — when the signal arrives, the handler runs. The critical rule: signal handlers must be async-signal-safe. Most library functions (printf, malloc, stdio) are NOT safe to call from a handler because they may be in the middle of modifying global state when the signal interrupts. Use write() (a syscall) and volatile sig_atomic_t flags instead. The handler may be interrupted by another signal — keep it minimal.",
    howItWorks: "1. `signal(signum, handler)` — register a handler for signum. handler is a function taking int (the signal number).\n2. `SIG_DFL` — restore default behavior. `SIG_IGN` — ignore the signal.\n3. Common signals: SIGINT (Ctrl+C), SIGTERM (termination request), SIGSEGV (segfault), SIGALRM (timer), SIGKILL (can't be caught).\n4. The handler receives the signal number as its argument: `void handler(int sig) { ... }`.\n5. Async-signal-safe: only call functions that are safe in a signal handler. write() is safe; printf, malloc are NOT.\n6. `volatile sig_atomic_t flag = 0;` — set the flag in the handler, check it in the main loop. This is the safe pattern.\n7. SIGKILL and SIGSTOP can't be caught, blocked, or ignored — they always work.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <signal.h>\n#include <unistd.h>\n#include <stdlib.h>\n\n// Safe flag for signal handler\nvolatile sig_atomic_t stop = 0;\n\n// Signal handler — must be async-signal-safe\nvoid handle_sigint(int sig) {\n    // Can't use printf — use write (async-signal-safe)\n    const char msg[] = \"Caught SIGINT, stopping...\\n\";\n    write(STDOUT_FILENO, msg, sizeof(msg) - 1);\n    stop = 1;  // set flag, checked in main loop\n}\n\nint main(void) {\n    // Register handler for SIGINT (Ctrl+C)\n    signal(SIGINT, handle_sigint);\n\n    printf(\"Running. Press Ctrl+C to stop.\\n\");\n\n    // Main loop — checks the flag set by the handler\n    while (!stop) {\n        pause();  // wait for a signal\n    }\n\n    printf(\"Clean shutdown.\\n\");\n    return 0;\n}\n\n// SIGKILL (kill -9) can't be caught — it always kills the process.\n// SIGTERM (kill) can be caught for graceful shutdown.",
        output: "Running. Press Ctrl+C to stop.\n^CCaught SIGINT, stopping...\nClean shutdown.",
        note: "Signal handlers must be async-signal-safe. Use write() and volatile sig_atomic_t flags — not printf or malloc."
      }
    ],
    marginNotes: [
      "Signal handlers must be async-signal-safe. Don't call printf, malloc, or most library functions. Use write() and volatile sig_atomic_t flags.",
      "`volatile sig_atomic_t` is the only safe way to share data between a signal handler and the main program.",
      "SIGKILL (kill -9) and SIGSTOP can't be caught, blocked, or ignored — they always work. Use SIGTERM for graceful shutdown.",
      "Keep signal handlers minimal — they can be interrupted by another signal. Set a flag and return; do the real work in the main loop."
    ],
    commonMistakes: [
      "Calling printf or malloc from a signal handler — not async-signal-safe. Use write() and set a flag instead.",
      "Using a regular int (not volatile sig_atomic_t) for the flag — the compiler might optimize away the check.",
      "Trying to catch SIGKILL — it can't be caught. Use SIGTERM for graceful shutdown."
    ],
    relatedTopics: ["Error Handling", "Type Qualifiers", "Setjmp & Longjmp"],
    externalLinks: [
      { label: "cppreference: signal.h", url: "https://en.cppreference.com/w/c/program/signal" },
      { label: "C Signal Handling — GeeksforGeeks", url: "https://www.geeksforgeeks.org/signal-handling-in-c/" }
    ],
    mcqs: [
      {
        question: "Which functions can you safely call from a signal handler?",
        options: ["Any function", "Only async-signal-safe functions (e.g., write, not printf or malloc)", "Only printf", "Only malloc"],
        answer: 1,
        explanations: ["Not any function.", "Correct — signal handlers must be async-signal-safe. write() is safe; printf and malloc are NOT.", "printf is not safe.", "malloc is not safe."],
        difficulty: "hard"
      },
      {
        question: "Which signal can NOT be caught or ignored?",
        options: ["SIGINT", "SIGTERM", "SIGKILL", "SIGSEGV"],
        answer: 2,
        explanations: ["SIGINT (Ctrl+C) can be caught.", "SIGTERM can be caught for graceful shutdown.", "Correct — SIGKILL (kill -9) can't be caught, blocked, or ignored. It always kills the process.", "SIGSEGV can be caught (though it's usually a bad idea)."],
        difficulty: "medium"
      },
      {
        question: "What type should you use for a flag shared with a signal handler?",
        options: ["int", "volatile sig_atomic_t", "static int", "const int"],
        answer: 1,
        explanations: ["Regular int may be optimized away.", "Correct — volatile sig_atomic_t is the only safe type for sharing data with a signal handler. volatile prevents optimization, sig_atomic_t ensures atomic access.", "static doesn't help with signal safety.", "const can't be modified."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "setjmp-longjmp",
    title: "setjmp & longjmp",
    difficulty: "hard",
    definition: "setjmp/longjmp provide non-local jumps — a goto across functions. setjmp(buf) saves the execution context (registers, stack pointer) and returns 0. longjmp(buf, val) restores that context, causing setjmp to 'return' val instead. This implements exception-like error handling in C. It's dangerous: it skips destructors/cleanup, can leak resources, and corrupts state if used across threads.",
    coreUnderstanding: "setjmp/longjmp are C's version of exception handling — a non-local goto that jumps across function boundaries. setjmp(buf) saves the current execution context (registers, stack pointer, program counter) and returns 0. longjmp(buf, val) restores that context, making setjmp 'return' val instead of 0. This lets you jump out of deeply nested function calls on error, like throwing an exception. But it's dangerous: it skips any cleanup code (no destructors in C), can leak resources (malloc'd memory, open files), and corrupts state if used across threads or if the function that called setjmp has already returned. Prefer returning error codes.",
    howItWorks: "1. `jmp_buf buf;` — declares a buffer to save the execution context.\n2. `setjmp(buf)` — saves the context and returns 0. When longjmp is called with this buf, setjmp 'returns' the val instead.\n3. `longjmp(buf, val)` — restores the context saved by setjmp. setjmp 'returns' val (or 1 if val is 0).\n4. The function that called setjmp MUST still be on the stack — if it has returned, longjmp is undefined behavior.\n5. Use: `if (setjmp(buf) == 0) { /* normal path */ } else { /* error path, jumped to by longjmp */ }`.\n6. longjmp skips all cleanup — no destructors, no stack unwinding. Resources (malloc, files) are leaked.\n7. Not thread-safe: don't share jmp_buf across threads. Don't use longjmp to jump out of a signal handler unless you know what you're doing.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <setjmp.h>\n\njmp_buf env;\n\nvoid deep_function(int level) {\n    printf(\"Entering level %d\\n\", level);\n    if (level >= 3) {\n        printf(\"Error at level %d, jumping back!\\n\", level);\n        longjmp(env, level);  // jump back to setjmp\n    }\n    deep_function(level + 1);  // recurse deeper\n    printf(\"Leaving level %d\\n\", level);  // SKIPPED by longjmp\n}\n\nint main(void) {\n    // setjmp returns 0 on first call, val on longjmp\n    int result = setjmp(env);\n    if (result == 0) {\n        printf(\"Normal path\\n\");\n        deep_function(1);\n        printf(\"This won't print if longjmp was called\\n\");\n    } else {\n        printf(\"Error path, jumped from level %d\\n\", result);\n    }\n    return 0;\n}",
        output: "Normal path\nEntering level 1\nEntering level 2\nEntering level 3\nError at level 3, jumping back!\nError path, jumped from level 3",
        note: "setjmp/longjmp are C's exception-like mechanism. They're dangerous: they skip cleanup, leak resources, and are undefined if the calling function has returned."
      }
    ],
    marginNotes: [
      "setjmp/longjmp skip all cleanup — no destructors, no stack unwinding. Resources (malloc, files) are leaked. Prefer returning error codes.",
      "The function that called setjmp MUST still be on the stack when longjmp is called. If it has returned, it's undefined behavior.",
      "longjmp(buf, 0) is treated as longjmp(buf, 1) — 0 is not a valid return value for setjmp after a longjmp.",
      "Not thread-safe: don't share jmp_buf across threads. Don't longjmp out of a signal handler unless you're very careful."
    ],
    commonMistakes: [
      "Calling longjmp after the function that called setjmp has returned — undefined behavior (the stack frame is gone).",
      "Forgetting that longjmp skips cleanup — malloc'd memory and open files are leaked. There are no destructors in C.",
      "Using longjmp(buf, 0) — 0 is not valid; it's converted to 1. Use a non-zero value."
    ],
    relatedTopics: ["Signal Handling", "Error Handling", "Functions"],
    externalLinks: [
      { label: "cppreference: setjmp/longjmp", url: "https://en.cppreference.com/w/c/program" },
      { label: "C setjmp/longjmp — GeeksforGeeks", url: "https://www.geeksforgeeks.org/setsiglongjmp-in-c/" }
    ],
    mcqs: [
      {
        question: "What do setjmp/longjmp provide?",
        options: ["Exception handling with cleanup", "Non-local jumps (goto across functions) without cleanup", "Thread synchronization", "Memory allocation"],
        answer: 1,
        explanations: ["They don't do cleanup.", "Correct — setjmp/longjmp provide non-local jumps across function boundaries, like a goto across functions. They skip cleanup.", "Not synchronization.", "Not allocation."],
        difficulty: "hard"
      },
      {
        question: "What happens if you longjmp after the setjmp function has returned?",
        options: ["Nothing", "Undefined behavior — the stack frame is gone", "It works fine", "A compile error"],
        answer: 1,
        explanations: ["Something does happen.", "Correct — if the function that called setjmp has returned, its stack frame is gone. longjmp is undefined behavior.", "It doesn't work fine.", "It compiles fine."],
        difficulty: "hard"
      },
      {
        question: "What is a major danger of setjmp/longjmp?",
        options: ["It's slow", "It skips cleanup — resources (malloc, files) are leaked", "It can't jump across functions", "It requires threads"],
        answer: 1,
        explanations: ["Speed isn't the main issue.", "Correct — longjmp skips all cleanup code. There are no destructors in C, so malloc'd memory and open files are leaked.", "It can jump across functions.", "It doesn't require threads."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "undefined-behavior",
    title: "Undefined Behavior in C",
    difficulty: "hard",
    definition: "Undefined behavior (UB) means the C standard imposes no requirements on what happens — the compiler can do anything, including crashing, producing wrong results silently, or seeming to work. Examples: dereferencing null/wild pointers, signed integer overflow, reading uninitialized memory, buffer overflows, data races. UB is the source of most C security vulnerabilities and the reason C is considered dangerous.",
    coreUnderstanding: "Undefined behavior (UB) is one of the most important and dangerous concepts in C. When the standard says behavior is 'undefined', it means ANYTHING can happen — the program might crash, produce wrong results, seem to work on one machine and fail on another, or work in debug and fail in release. Common UB: dereferencing NULL or uninitialized pointers, signed integer overflow, reading uninitialized memory, buffer overflows, data races (unsynchronized shared data in threads), violating restrict. The worst part: compilers OPTIMIZE assuming no UB. If your code has UB, the compiler may delete checks, reorder code, or produce surprising results. UB is the source of most C security vulnerabilities.",
    howItWorks: "1. Null/wild pointer dereference: `int *p = NULL; *p = 5;` — crash (segfault) or corruption.\n2. Signed integer overflow: `INT_MAX + 1` — undefined. The compiler may assume it doesn't happen and optimize accordingly.\n3. Reading uninitialized memory: `int x; printf(\"%d\", x);` — garbage value, or the compiler may assume it's 0.\n4. Buffer overflow: `int arr[5]; arr[10] = 0;` — writes past the array, corrupting adjacent memory.\n5. Use-after-free: `free(p); *p = 5;` — the memory may have been reallocated, causing corruption.\n6. Data race: two threads access the same data without synchronization — undefined behavior.\n7. Violating restrict: two restrict pointers alias the same data — undefined behavior.\n8. Sequencing: `i = i++ + 1` — undefined (i is modified twice without a sequence point).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <limits.h>\n#include <stdlib.h>\n\nint main(void) {\n    // 1. Null pointer dereference — UB (usually segfault)\n    int *p = NULL;\n    // *p = 5;  // CRASH: segmentation fault\n\n    // 2. Signed integer overflow — UB\n    int x = INT_MAX;\n    // int y = x + 1;  // UB: overflow\n    // The compiler may assume this doesn't happen and optimize\n    // away overflow checks!\n\n    // 3. Reading uninitialized memory — UB\n    int uninit;\n    // printf(\"%d\\n\", uninit);  // UB: garbage value\n\n    // 4. Buffer overflow — UB\n    int arr[5];\n    // arr[10] = 0;  // UB: writes past the array\n\n    // 5. Use-after-free — UB\n    int *heap = malloc(sizeof(int));\n    free(heap);\n    // *heap = 5;  // UB: memory may be reallocated\n\n    // 6. Sequencing issue — UB\n    int i = 0;\n    // i = i++ + 1;  // UB: i modified twice without sequence point\n    i = (i + 1) + 1;  // OK: i = 2\n    printf(\"i = %d\\n\", i);  // 2\n    return 0;\n}",
        output: "i = 2",
        note: "Undefined behavior means ANYTHING can happen. Compilers optimize assuming no UB, which can cause surprising results."
      }
    ],
    marginNotes: [
      "Undefined behavior means ANYTHING can happen — crash, wrong results, or seeming to work. It may work in debug and fail in release.",
      "Compilers OPTIMIZE assuming no UB. If your code has signed overflow, the compiler may delete overflow checks. This is why UB is so dangerous.",
      "Common UB: null dereference, signed overflow, uninitialized reads, buffer overflow, use-after-free, data races, sequencing issues (i = i++).",
      "Use tools to find UB: -fsanitize=undefined (UBSan), -fsanitize=address (ASan), Valgrind. These catch UB at runtime."
    ],
    commonMistakes: [
      "Assuming signed integer overflow wraps around (like unsigned) — it's UB. The compiler may optimize away overflow checks.",
      "Reading uninitialized variables and expecting garbage — it's UB. The compiler may assume it's 0 or anything.",
      "Writing `i = i++ + 1` — i is modified twice without a sequence point. UB. Use `i = i + 2` instead."
    ],
    relatedTopics: ["Pointers: The Fundamentals", "Error Handling", "Debugging: gdb & Valgrind"],
    externalLinks: [
      { label: "cppreference: Undefined Behavior", url: "https://en.cppreference.com/w/c/language/behavior" },
      { label: "What Every C Programmer Should Know About UB", url: "https://blog.regehr.org/archives/213" }
    ],
    mcqs: [
      {
        question: "What does 'undefined behavior' mean in C?",
        options: ["The program will crash", "The standard imposes no requirements — anything can happen", "It's a compile error", "It's a warning"],
        answer: 1,
        explanations: ["It might crash, but not necessarily.", "Correct — UB means the standard doesn't define what happens. The program might crash, produce wrong results, or seem to work.", "It compiles fine.", "It's not just a warning."],
        difficulty: "medium"
      },
      {
        question: "Why is signed integer overflow dangerous?",
        options: ["It wraps around", "It's UB — the compiler may optimize away overflow checks assuming it doesn't happen", "It's a compile error", "It's slow"],
        answer: 1,
        explanations: ["Unsigned wraps; signed is UB.", "Correct — signed overflow is UB. The compiler may assume it doesn't happen and delete overflow checks, causing security holes.", "It compiles fine.", "Speed isn't the issue."],
        difficulty: "hard"
      },
      {
        question: "What is `i = i++ + 1` in C?",
        options: ["i = i + 2", "Undefined behavior — i is modified twice without a sequence point", "i = i + 1", "A compile error"],
        answer: 1,
        explanations: ["Not i + 2.", "Correct — i is modified twice (by ++ and by =) without a sequence point between them. This is UB.", "Not i + 1.", "It compiles but is UB."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "compilation-process",
    title: "The Compilation Process",
    difficulty: "medium",
    definition: "C compilation has four stages: Preprocessing (expands #include, #define, strips comments — produces pure C), Compilation (translates C to assembly language), Assembly (translates assembly to machine code in object files .o), and Linking (combines object files and libraries, resolves symbols, produces the executable). Each stage can be inspected: gcc -E shows preprocessed output, -S shows assembly, -c stops at object file.",
    coreUnderstanding: "C compilation is a pipeline of four stages. Preprocessing handles # directives (#include, #define, #ifdef) — it pastes file contents, expands macros, and strips comments, producing pure C. Compilation translates C to assembly language (human-readable machine code). Assembly translates assembly to machine code in object files (.o) — these have unresolved external references. Linking combines object files and libraries, resolves external references, and produces the final executable. Understanding this pipeline is key to debugging build errors: 'undefined reference' is a linker error, not a compiler error.",
    howItWorks: "1. Preprocessing: `gcc -E file.c` — expands #include, #define, #ifdef. Strips comments. Produces pure C.\n2. Compilation: `gcc -S file.c` — translates C to assembly language (.s file). This is where syntax and type errors are caught.\n3. Assembly: `gcc -c file.c` — translates assembly to machine code (.o object file). Has unresolved external references.\n4. Linking: `gcc file.o other.o -o program` — combines object files and libraries, resolves symbols, produces executable.\n5. 'undefined reference' — linker error: a function is used but not defined in any object file or library.\n6. 'undefined symbol' — the symbol doesn't exist. Check spelling, includes, and library flags (-l).\n7. Static linking: copies library code into the executable. Dynamic linking: links at runtime (.so / .dll).",
    codeExamples: [
      {
        lang: "bash",
        code: "# Four stages of C compilation\n\n# 1. Preprocessing — expand #include, #define, strip comments\ngcc -E hello.c -o hello.i    # produces preprocessed C\n# View: hello.i is pure C with all includes expanded\n\n# 2. Compilation — C to assembly\ngcc -S hello.c -o hello.s    # produces assembly (.s)\n# View: hello.s is human-readable assembly\n\n# 3. Assembly — assembly to object file\ngcc -c hello.c -o hello.o   # produces object file (.o)\n# hello.o is machine code with unresolved references\n\n# 4. Linking — combine object files, resolve symbols\ngcc hello.o -o hello        # produces executable\n\n# All in one step (what you usually do):\ngcc hello.c -o hello\n\n# Common errors:\n# 'undefined reference to foo' — linker error: foo not defined\n# 'no such file' — wrong #include path or filename\n# 'expected ;' — compiler error: syntax issue",
        output: "# Each stage produces a different file:\n# .i = preprocessed C\n# .s = assembly\n# .o = object file (machine code)\n# (no extension) = executable",
        note: "Understanding the four stages helps debug build errors: 'undefined reference' is a linker error, not a compiler error."
      }
    ],
    marginNotes: [
      "'undefined reference' is a LINKER error, not a compiler error. It means a function is used but not defined in any object file or library.",
      "Use `gcc -E` to see preprocessed output (expanded includes/macros), `gcc -S` for assembly, `gcc -c` for object files.",
      "Static linking copies library code into the executable (larger, self-contained). Dynamic linking links at runtime (smaller, needs .so/.dll).",
      "The compiler catches syntax and type errors. The linker catches missing definitions. Know which stage an error comes from."
    ],
    commonMistakes: [
      "Confusing compiler errors (syntax, type) with linker errors (undefined reference). They're different stages with different fixes.",
      "Forgetting to link a library: `gcc file.c -lm` (math library). Without -lm, you get 'undefined reference to sqrt'.",
      "Not understanding that #include pastes file contents — circular includes cause infinite preprocessing (caught by include guards)."
    ],
    relatedTopics: ["Preprocessor Directives", "Header Files", "Makefiles"],
    externalLinks: [
      { label: "GCC Compilation Process", url: "https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html" },
      { label: "C Compilation Process — GeeksforGeeks", url: "https://www.geeksforgeeks.org/compilation-process-in-c/" }
    ],
    mcqs: [
      {
        question: "What are the four stages of C compilation?",
        options: ["Parse, compile, run, debug", "Preprocessing, compilation, assembly, linking", "Edit, save, compile, run", "Lex, parse, optimize, execute"],
        answer: 1,
        explanations: ["Not those stages.", "Correct — preprocessing (expand #include/#define), compilation (C to assembly), assembly (to machine code), linking (combine .o files).", "Not those.", "Not those."],
        difficulty: "medium"
      },
      {
        question: "An 'undefined reference to foo' error comes from which stage?",
        options: ["Preprocessor", "Compiler", "Linker", "Assembler"],
        answer: 2,
        explanations: ["Not the preprocessor.", "Not the compiler — it handles syntax/types.", "Correct — 'undefined reference' is a linker error. foo is used but not defined in any object file or library.", "Not the assembler."],
        difficulty: "medium"
      },
      {
        question: "What does `gcc -E file.c` show?",
        options: ["Assembly code", "Preprocessed C (expanded includes and macros)", "Object file", "The executable"],
        answer: 1,
        explanations: ["That's gcc -S.", "Correct — -E runs only the preprocessor, showing the C with all #include and #define expanded.", "That's gcc -c.", "That's the final output."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "makefiles",
    title: "Makefiles & Build Automation",
    difficulty: "medium",
    definition: "Make is a build automation tool that compiles only changed files based on file timestamps. A Makefile defines targets (usually output files), prerequisites (source files), and recipes (shell commands). Make compares timestamps — if a prerequisite is newer than the target, the recipe runs. Variables ($CC, $CFLAGS) and automatic variables ($@, $<, $^) keep it DRY. Make handles dependencies between files, avoiding full rebuilds. CMake generates Makefiles cross-platform.",
    coreUnderstanding: "Make is a build automation tool that saves time by compiling only what changed. A Makefile has rules: target (what to build), prerequisites (what it depends on), and recipe (how to build it). Make compares timestamps: if a prerequisite is newer than the target, the recipe runs. This means if you change one .c file, only that file is recompiled and re-linked — not the entire project. Variables (CC, CFLAGS) and automatic variables ($@ = target, $< = first prerequisite, $^ = all prerequisites) keep the Makefile DRY. CMake is a higher-level tool that generates Makefiles for cross-platform builds.",
    howItWorks: "1. Rule: `target: prerequisites` followed by a tab-indented recipe.\n2. `target` — usually a file to build (e.g., program, file.o).\n3. `prerequisites` — files the target depends on. If any is newer than the target, the recipe runs.\n4. Recipe — shell commands, MUST be indented with a TAB (not spaces).\n5. Variables: `CC = gcc`, `CFLAGS = -Wall -g`. Use as `$(CC)` and `$(CFLAGS)`.\n6. Automatic variables: `$@` = target, `$<` = first prerequisite, `$^` = all prerequisites.\n7. `make` (no arg) builds the first target. `make target` builds a specific target. `make clean` runs the clean rule.\n8. Pattern rules: `%.o: %.c` — builds any .o from the corresponding .c.",
    codeExamples: [
      {
        lang: "bash",
        code: "# Makefile\nCC = gcc\nCFLAGS = -Wall -g\n\n# Default target\nall: program\n\n# Link the final executable\nprogram: main.o utils.o\n\t$(CC) $(CFLAGS) -o $@ $^  # $@ = program, $^ = main.o utils.o\n\n# Compile each .c to .o (pattern rule)\n%.o: %.c\n\t$(CC) $(CFLAGS) -c $< -o $@  # $< = source, $@ = object\n\n# Clean build artifacts\nclean:\n\trm -f *.o program\n\n# Usage:\n# make        — builds 'all' (the first target)\n# make program — builds 'program'\n# make clean   — removes .o files and executable\n# make -j4    — build with 4 parallel jobs (faster)\n\n# Make only recompiles changed files:\n# If you edit utils.c, only utils.o is recompiled and the program is re-linked.\n# main.o is NOT recompiled (it didn't change).",
        output: "gcc -Wall -g -c main.c -o main.o\ngcc -Wall -g -c utils.c -o utils.o\ngcc -Wall -g -o program main.o utils.o",
        note: "Recipes MUST be indented with a TAB, not spaces. Make compares timestamps — only changed files are recompiled."
      }
    ],
    marginNotes: [
      "Recipes MUST be indented with a TAB, not spaces. This is the #1 Makefile error — spaces cause 'missing separator' errors.",
      "Make only recompiles changed files — if you edit one .c file, only that .o is rebuilt and the program is re-linked. This saves time on large projects.",
      "Automatic variables: `$@` = target, `$<` = first prerequisite, `$^` = all prerequisites. They keep the Makefile DRY.",
      "CMake generates Makefiles cross-platform. Write CMakeLists.txt instead of Makefile for portable builds."
    ],
    commonMistakes: [
      "Using spaces instead of a TAB for recipe indentation — 'missing separator' error. Recipes MUST use tabs.",
      "Not declaring all prerequisites — if a header changes but isn't listed, the dependent .c files aren't recompiled (stale build).",
      "Forgetting to add a `clean` target — old .o files can cause confusing build errors. `make clean` removes them."
    ],
    relatedTopics: ["Compilation Process", "Header Files", "Debugging: gdb & Valgrind"],
    externalLinks: [
      { label: "GNU Make Manual", url: "https://www.gnu.org/software/make/manual/" },
      { label: "Makefile Tutorial — GeeksforGeeks", url: "https://www.geeksforgeeks.org/makefile-in-c/" }
    ],
    mcqs: [
      {
        question: "What must recipes in a Makefile be indented with?",
        options: ["Spaces", "A TAB", "2 spaces", "4 spaces"],
        answer: 1,
        explanations: ["Spaces cause errors.", "Correct — recipes MUST be indented with a TAB, not spaces. Spaces cause 'missing separator' errors.", "Not 2 spaces.", "Not 4 spaces."],
        difficulty: "easy"
      },
      {
        question: "How does Make decide whether to rebuild a target?",
        options: ["Always rebuilds", "Compares timestamps — if a prerequisite is newer than the target, rebuild", "Random", "Based on file size"],
        answer: 1,
        explanations: ["It doesn't always rebuild.", "Correct — Make compares timestamps. If a prerequisite is newer than the target, the recipe runs. Otherwise, it skips.", "Not random.", "Not based on size."],
        difficulty: "medium"
      },
      {
        question: "What do $@, $<, $^ mean in a Makefile?",
        options: ["Random variables", "$@ = target, $< = first prerequisite, $^ = all prerequisites", "Compiler flags", "File names only"],
        answer: 1,
        explanations: ["They're automatic variables.", "Correct — $@ is the target, $< is the first prerequisite, $^ is all prerequisites. They keep the Makefile DRY.", "Not compiler flags.", "They're more than just names."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "debugging-gdb-valgrind",
    title: "Debugging: gdb & Valgrind",
    difficulty: "medium",
    definition: "gdb (GNU Debugger) lets you pause a running program, inspect variables, set breakpoints, step through code line by line, and examine the call stack — essential for finding logic bugs. Compile with -g to include debug symbols. Valgrind detects memory errors: leaks (malloc without free), use-after-free, buffer overflows, uninitialized reads — by running the program in a simulated environment. Together, gdb and Valgrind are the C programmer's primary debugging toolkit.",
    coreUnderstanding: "gdb and Valgrind are the two essential debugging tools for C. gdb lets you interact with a running program: set breakpoints (pause at a line), step through code line by line, inspect and modify variables, examine the call stack (backtrace), and find where a crash occurred. Compile with -g to include debug symbols (line numbers, variable names). Valgrind runs your program in a simulated environment and detects memory errors: leaks (malloc without free), use-after-free, buffer overflows, uninitialized reads. It's slow but catches bugs that gdb can't. Together, they're the C programmer's primary debugging toolkit.",
    howItWorks: "1. Compile with debug symbols: `gcc -g -O0 file.c` — -g includes line numbers and variable names, -O0 disables optimization (which can reorder code and hide bugs).\n2. gdb: `gdb ./program` — start the debugger. `run` to start the program, `break main` to set a breakpoint, `next` to step line by line, `print x` to inspect a variable, `backtrace` to see the call stack.\n3. gdb on crash: `gdb ./program core` — load a core dump. `backtrace` shows where the crash occurred.\n4. Valgrind: `valgrind ./program` — runs the program and reports memory errors.\n5. `valgrind --leak-check=full ./program` — detailed leak report showing where each leak was allocated.\n6. Valgrind detects: leaks, use-after-free, buffer overflows, uninitialized reads, double-free.\n7. AddressSanitizer (ASan): `gcc -fsanitize=address` — faster alternative to Valgrind for memory errors, built into gcc/clang.",
    codeExamples: [
      {
        lang: "bash",
        code: "# Compile with debug symbols and no optimization\ngcc -g -O0 -Wall buggy.c -o buggy\n\n# === gdb ===\ngdb ./buggy\n(gdb) break main          # set breakpoint at main\n(gdb) run                 # start the program\n(gdb) next                # step to next line (step = step into functions)\n(gdb) print x             # print variable x\n(gdb) print *ptr          # print what ptr points to\n(gdb) backtrace           # show call stack (where am I?)\n(gdb) info locals        # show all local variables\n(gdb) continue           # continue to next breakpoint\n(gdb) quit\n\n# Debug a crash (segfault):\ngdb ./buggy core         # load core dump\n(gdb) backtrace          # shows where the crash happened\n\n# === Valgrind ===\nvalgrind --leak-check=full ./buggy\n# Output:\n# ==12345== 40 bytes in 1 blocks are definitely lost\n# ==12345==    at 0x4C2B0E0: malloc (vg_replace_malloc.c)\n# ==12345==    by 0x1086A4: main (buggy.c:10)\n\n# === AddressSanitizer (faster alternative) ===\ngcc -fsanitize=address -g buggy.c -o buggy\n./buggy  # ASan reports errors at runtime, much faster than Valgrind",
        output: "# gdb shows where crashes happen and lets you inspect variables.\n# Valgrind finds memory leaks and corruption.\n# ASan is a fast built-in alternative to Valgrind.",
        note: "Compile with -g -O0 for debugging. Use gdb for logic bugs and crash locations, Valgrind/ASan for memory errors."
      }
    ],
    marginNotes: [
      "Compile with `-g -O0` for debugging: -g includes debug symbols (line numbers, variable names), -O0 disables optimization (which can reorder code and hide bugs).",
      "gdb `backtrace` (bt) is the first command to run after a crash — it shows the call stack and where the crash occurred.",
      "Valgrind is slow but catches memory errors: leaks, use-after-free, buffer overflows, uninitialized reads. Use `--leak-check=full` for detailed reports.",
      "AddressSanitizer (`-fsanitize=address`) is a faster alternative to Valgrind — built into gcc/clang, runs at near-native speed."
    ],
    commonMistakes: [
      "Not compiling with -g — without debug symbols, gdb can't show line numbers or variable names.",
      "Compiling with -O2 (optimization) for debugging — optimization reorders code and hides bugs. Use -O0 for debugging.",
      "Ignoring Valgrind warnings — 'definitely lost' means a real leak. Fix all leaks, even small ones."
    ],
    relatedTopics: ["Error Handling", "Undefined Behavior", "Memory Layout"],
    externalLinks: [
      { label: "GDB Documentation", url: "https://www.gnu.org/software/gdb/documentation/" },
      { label: "Valgrind Documentation", url: "https://valgrind.org/docs/manual/manual.html" }
    ],
    mcqs: [
      {
        question: "What does the -g flag do in gcc?",
        options: ["Optimizes the code", "Includes debug symbols (line numbers, variable names)", "Generates assembly", "Links libraries"],
        answer: 1,
        explanations: ["That's -O.", "Correct — -g includes debug symbols so gdb can show line numbers and variable names.", "That's -S.", "That's -l."],
        difficulty: "easy"
      },
      {
        question: "What does Valgrind detect?",
        options: ["Syntax errors", "Memory errors (leaks, use-after-free, buffer overflows)", "Type errors", "Linking errors"],
        answer: 1,
        explanations: ["Syntax errors are caught by the compiler.", "Correct — Valgrind detects memory errors: leaks, use-after-free, buffer overflows, uninitialized reads.", "Type errors are caught by the compiler.", "Linking errors are caught by the linker."],
        difficulty: "medium"
      },
      {
        question: "What is the first gdb command to run after a crash?",
        options: ["print", "backtrace", "run", "next"],
        answer: 1,
        explanations: ["print shows a variable.", "Correct — backtrace (bt) shows the call stack, revealing where the crash occurred.", "run starts the program.", "next steps to the next line."],
        difficulty: "medium"
      }
    ]
  }
];