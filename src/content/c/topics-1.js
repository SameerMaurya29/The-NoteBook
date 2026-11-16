// C topics part 1: Intro through Strings (topics 1-13)
export default [
  {
    id: "intro-to-c",
    title: "Introduction to C",
    difficulty: "easy",
    definition: "C is a general-purpose, compiled, statically-typed programming language created by Dennis Ritchie at Bell Labs in 1972. It sits one step above assembly: you manage memory yourself, there is no garbage collector, and the language trusts you completely — which is both its power and its danger.",
    coreUnderstanding: "C was built to rewrite the UNIX kernel in a portable high-level language. That origin shapes everything: C is small (only a few dozen keywords), fast (compiles to native machine code with almost no runtime overhead), and portable (a correctly-written C program runs on everything from microcontrollers to supercomputers). It is the foundation beneath operating systems, embedded firmware, databases, and most modern language runtimes. Learning C is learning how a computer actually works — memory addresses, the stack and heap, bytes, and the cost of every instruction. Languages like C++, Java, and Python all borrow C's syntax, so mastering C makes every other language easier to read.",
    howItWorks: "1. You write source code in a `.c` file.\n2. The preprocessor strips comments, expands `#include` and `#define` directives, producing pure C.\n3. The compiler translates each `.c` file into an object file (`.o`) — machine code with unresolved external references.\n4. The linker combines object files and libraries into a final executable.\n5. The executable is loaded into memory by the OS and the CPU runs it directly — no interpreter, no virtual machine.\n6. `main()` is the entry point the runtime calls; it returns an int to the operating system (0 means success).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
        output: "Hello, World!",
        note: "stdio.h gives you printf. main returns 0 to tell the OS the program succeeded. The \\n moves the cursor to a new line."
      },
      {
        lang: "bash",
        code: "# compile and run on a Unix system\ngcc hello.c -o hello\n./hello",
        output: "Hello, World!",
        note: "gcc is the GNU C Compiler. -o names the output file. Without it the default name is 'a.out'."
      }
    ],
    marginNotes: [
      "C has NO garbage collector. Every byte you allocate with malloc, you must free yourself. This is the #1 source of bugs — and the #1 thing that makes you understand memory.",
      "The C standard is deliberately tiny. Things like strings, dynamic arrays, and hash maps are NOT built-in — you build them from char arrays and pointers. This is why C programmers respect Python.",
      "'C trusts the programmer' is the design philosophy. The compiler will not stop you from reading memory you don't own — it assumes you meant to. With great power comes great segmentation faults."
    ],
    commonMistakes: [
      "Forgetting `#include <stdio.h>` before using printf — older compilers warn, newer ones error.",
      "Omitting `return 0;` from main. Modern C (C99) implicitly returns 0, but explicit is clearer and required by older standards.",
      "Treating C like Python — there's no automatic memory management, no bounds checking on arrays, and no exception handling."
    ],
    relatedTopics: ["Variables & Data Types", "Input & Output", "Compilation Process"],
    externalLinks: [
      { label: "The C Programming Language (K&R)", url: "https://en.wikipedia.org/wiki/The_C_Programming_Language" },
      { label: "ISO C Standard (C17 draft)", url: "https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2310.pdf" },
      { label: "Learn-C.org Tutorial", url: "https://www.learn-c.org/" }
    ],
    mcqs: [
      {
        question: "Who created the C programming language and in what year?",
        options: ["Bjarne Stroustrup, 1979", "Dennis Ritchie, 1972", "Guido van Rossum, 1991", "Ken Thompson, 1969"],
        answer: 1,
        explanations: ["Stroustrup created C++ in 1979.", "Correct — Dennis Ritchie at Bell Labs created C in 1972 to rewrite UNIX.", "Van Rossum created Python.", "Thompson created the B language and UNIX, not C."],
        difficulty: "easy"
      },
      {
        question: "What does the C compiler ultimately produce?",
        options: ["Bytecode for a virtual machine", "Native machine code", "An interpreted script", "A web assembly module"],
        answer: 1,
        explanations: ["That's Java/Python.", "Correct — C compiles directly to the CPU's native machine code, which is why it's so fast.", "C is compiled, not interpreted.", "WASM is a separate target; C's default output is native machine code."],
        difficulty: "easy"
      },
      {
        question: "What does `return 0;` in main() signify?",
        options: ["The program crashed", "The program ran successfully", "The program returned no output", "Memory was freed"],
        answer: 1,
        explanations: ["A non-zero return usually signals an error.", "Correct — by convention, returning 0 tells the operating system the program completed successfully.", "Return value is unrelated to output.", "Return value doesn't free memory."],
        difficulty: "easy"
      },
      {
        question: "Which of these is NOT managed automatically by C?",
        options: ["Compilation to machine code", "Memory deallocation", "Type checking at compile time", "Linking object files"],
        answer: 1,
        explanations: ["Compilation is the compiler's job.", "Correct — C has no garbage collector; you must manually free memory you allocate.", "C is statically typed, so types are checked at compile time.", "The linker handles combining object files."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "variables-and-data-types",
    title: "Variables & Data Types",
    difficulty: "easy",
    definition: "A variable is a named label for a location in memory that holds a value. In C every variable must have a declared type — the type tells the compiler how many bytes to reserve and how to interpret the bits stored there.",
    coreUnderstanding: "C is statically typed: types are checked at compile time, and a variable's type cannot change. C's type system is intentionally close to the hardware — types correspond to raw byte widths the CPU understands. The fundamental types are: integers (char, short, int, long) in signed and unsigned variants, floating-point numbers (float, double), and pointers. There is no built-in string type — a string is simply an array of char terminated by a null byte ('\\0'). C also lets you create compound types with struct, union, and enum. Understanding type sizes and signedness is critical because C performs implicit conversions silently, which can cause subtle bugs when mixing types.",
    howItWorks: "1. Declaration: `type name;` reserves memory. `int age;` reserves 4 bytes.\n2. Initialization: `int age = 30;` reserves and stores a value in one step.\n3. Each type has a fixed size (in bytes) defined by the standard — but sizes can vary by platform. Use `sizeof(type)` to check.\n4. `signed` types can hold negative values; `unsigned` types use all bits for magnitude (range 0 to 2^n-1).\n5. Integer literals: `100` is int, `100U` is unsigned, `100L` is long, `100UL` is unsigned long. `3.14` is double, `3.14f` is float.\n6. `const` marks a variable as read-only after initialization — the compiler enforces it.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    int age = 30;\n    unsigned int score = 42000;\n    long bigNum = 9000000000L;\n    float price = 19.99f;\n    double pi = 3.141592653589;\n    char grade = 'A';\n    char name[] = \"Ada\";       // a string is a char array ending in '\\0'\n\n    printf(\"age = %d, size = %zu bytes\\n\", age, sizeof(age));\n    printf(\"pi = %.5f\\n\", pi);\n    printf(\"name = %s, grade = %c\\n\", name, grade);\n    return 0;\n}",
        output: "age = 30, size = 4 bytes\npi = 3.14159\nname = Ada, grade = A",
        note: "sizeof returns the byte size of a type or variable. %zu is the format specifier for the size_t type it returns."
      }
    ],
    marginNotes: [
      "int is NOT guaranteed to be 4 bytes — the standard only says it's 'at least 16 bits'. On most modern systems it's 4, but on some embedded chips it's 2. Use sizeof or stdint.h types (int32_t) when size matters.",
      "A C string is just a char array with a '\\0' at the end. The string \"Hi\" needs 3 bytes: 'H', 'i', '\\0'. Forgetting the null terminator is the classic source of buffer overflows.",
      "char is an integer type — it stores the numeric code of a character. Whether it's signed or unsigned by default is implementation-defined, which is a sneaky portability trap."
    ],
    commonMistakes: [
      "Using `float f = 3.14;` — the literal 3.14 is a double, and the compiler may warn about precision loss. Use `3.14f`.",
      "Assuming char is always signed — on ARM it's unsigned by default, on x86 it's signed. This breaks code that compares char values to negative numbers.",
      "Forgetting the null terminator when building strings manually — causes reads past the end of the array."
    ],
    relatedTopics: ["Input & Output", "Operators & Expressions", "Type Qualifiers"],
    externalLinks: [
      { label: "cppreference: Fundamental types", url: "https://en.cppreference.com/w/c/language/type" },
      { label: "stdint.h — Fixed-width integers", url: "https://en.cppreference.com/w/c/types/integer" }
    ],
    mcqs: [
      {
        question: "What is the minimum guaranteed size of an `int` in C?",
        options: ["8 bits", "16 bits", "32 bits", "64 bits"],
        answer: 1,
        explanations: ["char is at least 8 bits.", "Correct — the C standard guarantees int is at least 16 bits, though it's typically 32 on modern systems.", "That's the typical size, not the guaranteed minimum.", "long is at least 32 bits; int is not guaranteed 64."],
        difficulty: "medium"
      },
      {
        question: "How many bytes does the string literal \"Hi\" require in memory?",
        options: ["2", "3", "4", "1"],
        answer: 1,
        explanations: ["That's just the visible characters.", "Correct — 'H', 'i', and the null terminator '\\0' = 3 bytes. The null byte is always appended automatically for string literals.", "No, there's no size prefix in C strings.", "Far too few."],
        difficulty: "medium"
      },
      {
        question: "What does `sizeof(int)` return on a typical 64-bit system?",
        options: ["2", "4", "8", "It depends on the compiler"],
        answer: 1,
        explanations: ["That's short.", "Correct — on most modern 32-bit and 64-bit systems, int is 4 bytes.", "That's typically a pointer or long on 64-bit.", "While technically implementation-defined, 4 is overwhelmingly standard."],
        difficulty: "easy"
      },
      {
        question: "Which format specifier prints a `double`?",
        options: ["%d", "%f", "%lf in printf (though %f works too)", "%s"],
        answer: 2,
        explanations: ["%d is for integers.", "%f works for both float and double in printf because floats are promoted to double in variadic functions.", "Correct — %lf is the formally correct specifier for double, though %f also works in printf. In scanf, %lf is required for double.", "%s is for strings."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "input-output",
    title: "Input & Output (printf / scanf)",
    difficulty: "easy",
    definition: "printf writes formatted text to standard output (the screen). scanf reads formatted input from standard input (the keyboard). Both use format specifiers — placeholders like %d and %s — to convert between binary values in memory and human-readable text.",
    coreUnderstanding: "C has no built-in I/O statements — input and output are provided by library functions in <stdio.h>. The printf and scanf family are 'formatted' I/O: you provide a format string containing specifiers, and the functions convert values to and from text automatically. The format string is the contract — if the specifiers don't match the actual types of the arguments, the behavior is undefined: you might print garbage, crash, or silently corrupt data. scanf is especially dangerous because it writes to memory at the address you give it, so a wrong specifier or missing bounds check can overwrite memory. Understanding format specifiers deeply is a fundamental C survival skill.",
    howItWorks: "1. printf(\"format\", args...) — scans the format string left to right.\n2. Ordinary characters are printed as-is; specifiers starting with % consume the next argument.\n3. Common specifiers: %d (int), %f (float/double), %c (char), %s (string/char*), %p (pointer), %zu (size_t), %x (hex).\n4. Width and precision: %5d pads to 5 chars, %.2f rounds to 2 decimal places, %08x pads hex with zeros.\n5. scanf(\"format\", &var) — reads input, parses it according to specifiers, and stores results at the addresses you pass. The & is critical — scanf needs the ADDRESS, not the value.\n6. scanf returns the number of items successfully read — always check it if input correctness matters.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    int age;\n    char name[20];\n\n    printf(\"Enter your name and age: \");\n    int matched = scanf(\"%19s %d\", name, &age);\n\n    if (matched == 2) {\n        printf(\"Hi %s, you are %d years old.\\n\", name, age);\n        printf(\"In hex your age is 0x%x\\n\", age);\n        printf(\"Padded: |%5d|\\n\", age);\n    } else {\n        printf(\"Input error — only %d field(s) read.\\n\", matched);\n    }\n    return 0;\n}",
        output: "Enter your name and age: Ada 30\nHi Ada, you are 30 years old.\nIn hex your age is 0x1e\nPadded: |   30|",
        note: "%19s limits scanf to 19 chars + null terminator, preventing buffer overflow. The & before age gives scanf the address to write to."
      }
    ],
    marginNotes: [
      "scanf needs ADDRESSES, not values. Writing scanf(\"%d\", age) instead of &age is the #1 beginner crash — it treats the value of age as a memory address and writes there. Boom.",
      "Always bound your %s in scanf — %19s for a 20-char buffer. Unbounded %s is a textbook buffer overflow vulnerability.",
      "printf and scanf use DIFFERENT rules for float vs double. In printf, %f handles both (floats are promoted). In scanf, you MUST use %f for float and %lf for double — they are not interchangeable."
    ],
    commonMistakes: [
      "Forgetting the `&` in scanf for non-array variables — causes a crash or memory corruption.",
      "Using `%s` without a width limit in scanf — classic buffer overflow security hole.",
      "Mismatched format specifiers and types — `printf(\"%d\", 3.14)` prints garbage because %d reads an int but gets a double.",
      "Not checking scanf's return value — if input fails, your variables hold garbage and you proceed blindly."
    ],
    relatedTopics: ["Variables & Data Types", "Strings", "File Handling"],
    externalLinks: [
      { label: "cppreference: printf", url: "https://en.cppreference.com/w/c/io/fprintf" },
      { label: "cppreference: scanf", url: "https://en.cppreference.com/w/c/io/fscanf" }
    ],
    mcqs: [
      {
        question: "Why does scanf require `&age` (the address) instead of `age` (the value)?",
        options: ["It's a syntax rule with no reason", "scanf needs to know WHERE in memory to store the input", "It makes the code faster", "scanf only works with pointers"],
        answer: 1,
        explanations: ["There's a clear reason.", "Correct — scanf writes the parsed value into memory, so it needs the address of the variable, not its current value.", "Address vs value doesn't affect speed here.", "scanf works with addresses, which is what & provides."],
        difficulty: "easy"
      },
      {
        question: "What happens if you use `scanf(\"%s\", name)` into a 20-byte buffer and the user types 50 characters?",
        options: ["scanf truncates to 20 bytes automatically", "Undefined behavior — buffer overflow, memory corruption", "scanf prints an error", "The program ignores extra input"],
        answer: 1,
        explanations: ["scanf does NOT auto-truncate unbounded %s.", "Correct — without a width limit like %19s, scanf writes past the buffer, corrupting adjacent memory. This is a security vulnerability.", "scanf doesn't print errors for this.", "It writes all 50 chars, overflowing the buffer."],
        difficulty: "medium"
      },
      {
        question: "Which format specifier is correct for reading a `double` with scanf?",
        options: ["%f", "%lf", "%d", "%g"],
        answer: 1,
        explanations: ["%f in scanf reads a float, not a double — using it for double is undefined behavior.", "Correct — scanf distinguishes float (%f) from double (%lf). This is different from printf where %f works for both.", "%d is for int.", "%g is a printf output format, not a scanf input specifier for this purpose."],
        difficulty: "medium"
      },
      {
        question: "What does `printf(\"|%5d|\", 42)` print?",
        options: ["|42   |", "|   42|", "|42|", "|  42 |"],
        answer: 1,
        explanations: ["%5d right-aligns in 5 chars, so padding is on the left.", "Correct — the width 5 right-aligns the number, padding with spaces on the left: three spaces then 42.", "Width 5 would add padding.", "That centers it, which %5d does not do."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "operators",
    title: "Operators & Expressions",
    difficulty: "easy",
    definition: "Operators are symbols that perform computations on values. C provides arithmetic (+, -, *, /, %), relational (==, !=, <, >), logical (&&, ||, !), assignment (=, +=, *=), bitwise (&, |, ^, <<, >>), and the conditional ternary (?:) operator. Operator precedence and associativity determine the order of evaluation in a complex expression.",
    coreUnderstanding: "C operators are the building blocks of expressions. The key gotchas: integer division truncates (7/2 = 3, not 3.5), % only works on integers (not floats), and C has no boolean type (C89 uses int: 0 is false, anything else is true; C99 added _Bool/bool). The ternary operator ?: is a compact if-else expression. Bitwise operators manipulate individual bits — essential for systems programming. Understanding precedence is critical: when in doubt, use parentheses.",
    howItWorks: "1. Arithmetic: `7 / 2` = 3 (integer division truncates), `7 % 2` = 1 (modulo, integers only), `2.0 / 7` = 3.5 (float division).\n2. Relational: `==`, `!=`, `<`, `>`, `<=`, `>=` — return 1 (true) or 0 (false).\n3. Logical: `&&` (AND), `||` (OR), `!` (NOT) — short-circuit: `a && b` doesn't evaluate b if a is false.\n4. Assignment: `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `&=`, `|=` — `x += 5` is shorthand for `x = x + 5`.\n5. Bitwise: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (left shift), `>>` (right shift) — operate on bits.\n6. Ternary: `condition ? a : b` — evaluates to a if condition is true, b otherwise.\n7. Increment/decrement: `++x` (pre: increment then use), `x++` (post: use then increment).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    // Integer division truncates\n    printf(\"7 / 2 = %d\\n\", 7 / 2);      // 3\n    printf(\"7 / 2.0 = %f\\n\", 7 / 2.0);  // 3.5\n    printf(\"7 %% 2 = %d\\n\", 7 % 2);     // 1\n\n    // Ternary operator\n    int x = 10;\n    const char* sign = (x >= 0) ? \"non-negative\" : \"negative\";\n    printf(\"x is %s\\n\", sign);  // non-negative\n\n    // Bitwise operations\n    unsigned int a = 0b1100;  // 12\n    unsigned int b = 0b1010;  // 10\n    printf(\"a & b = %u\\n\", a & b);  // 8  (1000)\n    printf(\"a | b = %u\\n\", a | b);  // 14 (1110)\n    printf(\"a ^ b = %u\\n\", a ^ b);  // 6  (0110)\n    printf(\"a << 1 = %u\\n\", a << 1); // 24 (11000)\n\n    // Short-circuit: division by zero avoided\n    int divisor = 0;\n    if (divisor != 0 && 10 / divisor > 1) {\n        printf(\"This won't crash\\n\");\n    }\n    return 0;\n}",
        output: "7 / 2 = 3\n7 / 2.0 = 3.500000\n7 % 2 = 1\nx is non-negative\na & b = 8\na | b = 14\na ^ b = 6\na << 1 = 24",
        note: "Integer division truncates toward zero. Use 7.0/2 or (float)7/2 for float division. The ternary is a compact if-else."
      }
    ],
    marginNotes: [
      "Integer division truncates: 7/2 = 3, not 3.5. To get float division, make at least one operand a float: 7.0/2 or (float)7/2.",
      "C has no boolean type in C89 — 0 is false, anything else is true. C99 added <stdbool.h> with bool, true, false.",
      "Short-circuit evaluation: `a && b` doesn't evaluate b if a is false. `a || b` doesn't evaluate b if a is true. This is useful for null checks before dereference.",
      "Pre-increment (++x) increments then returns; post-increment (x++) returns then increments. In loops, ++x is slightly more efficient (no temporary)."
    ],
    commonMistakes: [
      "Using `=` (assignment) instead of `==` (comparison): `if (x = 5)` assigns 5 to x and is always true.",
      "Forgetting that `%` (modulo) only works on integers — `5.5 % 2` is a compile error. Use fmod() for floats.",
      "Confusing `&` (bitwise AND) with `&&` (logical AND), and `|` (bitwise OR) with `||` (logical OR)."
    ],
    relatedTopics: ["Variables & Data Types", "Bitwise Operators", "Control Flow"],
    externalLinks: [
      { label: "cppreference: Operators", url: "https://en.cppreference.com/w/c/language/operator_precedence" },
      { label: "C Operators — GNU Manual", url: "https://www.gnu.org/software/gnu-c-manual/html_node/Operators.html" }
    ],
    mcqs: [
      {
        question: "What does `7 / 2` evaluate to in C (both operands are int)?",
        options: ["3.5", "3", "4", "3.0"],
        answer: 1,
        explanations: ["That's float division.", "Correct — integer division truncates toward zero, so 7/2 = 3.", "That's rounding, not truncation.", "Integer division returns int, not float."],
        difficulty: "easy"
      },
      {
        question: "What is the difference between `=` and `==`?",
        options: ["They're the same", "= assigns a value; == compares for equality", "= is for floats; == is for ints", "= is comparison; == is assignment"],
        answer: 1,
        explanations: ["They're different.", "Correct — = assigns, == compares. `if (x = 5)` is a common bug: it assigns 5 to x and is always true.", "Both work on any type.", "Reversed."],
        difficulty: "easy"
      },
      {
        question: "What does `a && b` do if a is false (0)?",
        options: ["Evaluates b anyway", "Short-circuits: does NOT evaluate b", "Crashes", "Returns a"],
        answer: 1,
        explanations: ["That would be no short-circuit.", "Correct — && short-circuits: if a is false, b is not evaluated. This is useful for null checks: `if (p && p->x)`.", "No crash.", "It returns 0 (false)."],
        difficulty: "medium"
      },
      {
        question: "What does the ternary `x > 0 ? 1 : -1` return when x = 5?",
        options: ["-1", "1", "0", "5"],
        answer: 1,
        explanations: ["That's when x <= 0.", "Correct — x > 0 is true, so the ternary returns 1.", "Not 0.", "It returns the conditional value, not x."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "control-flow",
    title: "Decision Making: if, else, switch",
    difficulty: "easy",
    definition: "Decision-making statements let a program choose different execution paths based on conditions. C provides if, else if, else for general branching, and switch for multi-way selection on integer or character values. The ternary operator (?:) is a compact if-else expression.",
    coreUnderstanding: "C's control flow is straightforward: if/else for conditional branching, switch for multi-way dispatch on integer values. The switch statement is C's closest thing to a 'case' statement — it jumps to a matching case label and executes from there. Without break, execution falls through to the next case (a famous source of bugs). The if/else chain evaluates conditions top-to-bottom. C89 has no boolean type — 0 is false, anything else is true.",
    howItWorks: "1. `if (condition) { ... }` — executes the block if condition is non-zero (true).\n2. `else if (condition) { ... }` — checked only if the previous if was false.\n3. `else { ... }` — runs if no if/else if matched. Optional.\n4. `switch (expr) { case val: ...; break; }` — jumps to the matching case label. expr must be an integer type.\n5. `break` exits the switch. Without it, execution falls through to the next case (often a bug).\n6. `default:` — runs if no case matches. Good practice to always include it.\n7. Ternary: `cond ? a : b` — an expression, not a statement. Returns a if cond is true, b otherwise.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    int score = 85;\n\n    // if / else if / else\n    if (score >= 90) {\n        printf(\"A\\n\");\n    } else if (score >= 80) {\n        printf(\"B\\n\");\n    } else if (score >= 70) {\n        printf(\"C\\n\");\n    } else {\n        printf(\"F\\n\");\n    }\n\n    // switch — multi-way dispatch\n    int day = 3;\n    switch (day) {\n        case 1: printf(\"Monday\\n\"); break;\n        case 2: printf(\"Tuesday\\n\"); break;\n        case 3: printf(\"Wednesday\\n\"); break;\n        case 4: printf(\"Thursday\\n\"); break;\n        case 5: printf(\"Friday\\n\"); break;\n        default: printf(\"Weekend\\n\");\n    }\n\n    // Ternary expression\n    int x = 10;\n    int abs_x = (x >= 0) ? x : -x;\n    printf(\"abs(x) = %d\\n\", abs_x);\n    return 0;\n}",
        output: "B\nWednesday\nabs(x) = 10",
        note: "Always use break in switch cases. Without break, execution falls through to the next case — a classic C bug."
      }
    ],
    marginNotes: [
      "Always use `break` in switch cases. Without it, execution falls through to the next case — the most famous C bug (the 'goto fail' Apple SSL bug was a fall-through).",
      "switch only works on integer types (int, char, enum). You can't switch on a string or float — use if/else chains instead.",
      "C89 has no boolean type. `if (x)` means `if (x != 0)`. `if (!x)` means `if (x == 0)`. C99 added <stdbool.h> with bool/true/false.",
      "Always include a `default` case in switch — it catches unexpected values and makes debugging easier."
    ],
    commonMistakes: [
      "Forgetting `break` in a switch case — execution falls through to the next case, causing unexpected behavior.",
      "Using `=` instead of `==` in conditions: `if (x = 5)` assigns 5 to x and is always true.",
      "Switching on a string or float — switch only works on integer types. Use if/else chains instead."
    ],
    relatedTopics: ["Operators & Expressions", "Loops", "Break, Continue & Goto"],
    externalLinks: [
      { label: "cppreference: if statement", url: "https://en.cppreference.com/w/c/language/if" },
      { label: "cppreference: switch", url: "https://en.cppreference.com/w/c/language/switch" }
    ],
    mcqs: [
      {
        question: "What happens if you forget `break` in a switch case?",
        options: ["Compile error", "Execution falls through to the next case", "The switch exits", "Nothing happens"],
        answer: 1,
        explanations: ["It compiles fine.", "Correct — without break, execution continues into the next case. This is a classic C bug.", "break exits; without it, it falls through.", "It falls through."],
        difficulty: "easy"
      },
      {
        question: "Which types can a switch statement evaluate?",
        options: ["Any type", "Integer types only (int, char, enum)", "Strings only", "Floats only"],
        answer: 1,
        explanations: ["Not any type.", "Correct — switch works on integer types: int, char, enum. Not strings or floats.", "Not strings.", "Not floats."],
        difficulty: "medium"
      },
      {
        question: "What does `if (x)` mean in C?",
        options: ["If x is 1", "If x is non-zero (true)", "If x is positive", "If x is defined"],
        answer: 1,
        explanations: ["Not just 1.", "Correct — C treats any non-zero value as true. `if (x)` means `if (x != 0)`.", "Not just positive.", "Not about definition."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "loops",
    title: "Loops: for, while, do-while",
    difficulty: "easy",
    definition: "Loops repeat a block of code. C has three: for (counter-controlled, when you know the iteration count), while (condition-checked before each iteration), and do-while (condition checked after, so the body runs at least once). break exits a loop; continue skips to the next iteration.",
    coreUnderstanding: "C's three loops serve different scenarios. for is the classic counter loop — init, condition, increment all in one line. while checks the condition BEFORE each iteration — if the condition is false initially, the body never runs. do-while checks AFTER the body — so the body always runs at least once, even if the condition is false. This makes do-while perfect for menus and input validation. All three support break (exit immediately) and continue (skip to next iteration).",
    howItWorks: "1. `for (init; condition; increment) { ... }` — init runs once, then check condition, run body, run increment, repeat.\n2. `while (condition) { ... }` — check condition, run body, repeat. If condition is false initially, body never runs.\n3. `do { ... } while (condition);` — run body, THEN check condition. Body always runs at least once.\n4. `break` — exits the loop immediately, regardless of the condition.\n5. `continue` — skips the rest of the current iteration and jumps to the next condition check.\n6. Infinite loop: `for (;;)` or `while (1)` — use break to exit.\n7. for is flexible: `for (int i = 0, j = 10; i < j; i++, j--)` — multiple variables and expressions.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    // for loop — counter controlled\n    for (int i = 0; i < 5; i++) {\n        printf(\"%d \", i);  // 0 1 2 3 4\n    }\n    printf(\"\\n\");\n\n    // while loop — condition checked first\n    int n = 5;\n    while (n > 0) {\n        printf(\"%d \", n);\n        n--;\n    }\n    printf(\"\\n\");  // 5 4 3 2 1\n\n    // do-while — body runs at least once\n    int choice;\n    do {\n        printf(\"Enter 1-3: \");\n        scanf(\"%d\", &choice);\n    } while (choice < 1 || choice > 3);\n    printf(\"You chose %d\\n\", choice);\n\n    // continue — skip even numbers\n    for (int i = 0; i < 10; i++) {\n        if (i % 2 == 0) continue;  // skip evens\n        printf(\"%d \", i);  // 1 3 5 7 9\n    }\n    printf(\"\\n\");\n    return 0;\n}",
        output: "0 1 2 3 4\n5 4 3 2 1\nYou chose 2\n1 3 5 7 9",
        note: "do-while runs the body at least once — perfect for input validation and menus. while may never run if the condition is false initially."
      }
    ],
    marginNotes: [
      "do-while runs the body at least once — perfect for menus and input validation where you need to ask at least once.",
      "`for (;;)` or `while (1)` is the idiom for an infinite loop. Use break to exit when a condition is met.",
      "C99 allows declaring the loop variable in the for statement: `for (int i = 0; ...)` — the variable is scoped to the loop.",
      "`continue` in a for loop jumps to the increment expression, then the condition. In while, it jumps to the condition."
    ],
    commonMistakes: [
      "Using `while` when you need `do-while` — if the body must run at least once (menus, input validation), use do-while.",
      "Forgetting the semicolon after `do { ... } while (condition);` — it's required.",
      "Infinite loops from a missing increment: `for (int i = 0; i < 10;) { ... }` — i never changes."
    ],
    relatedTopics: ["Break, Continue & Goto", "Control Flow", "Recursion"],
    externalLinks: [
      { label: "cppreference: for loop", url: "https://en.cppreference.com/w/c/language/for" },
      { label: "cppreference: while loop", url: "https://en.cppreference.com/w/c/language/while" }
    ],
    mcqs: [
      {
        question: "What is the key difference between while and do-while?",
        options: ["while is faster", "do-while runs the body at least once; while may not run at all", "while can't use break", "do-while is for floats"],
        answer: 1,
        explanations: ["Speed isn't the difference.", "Correct — do-while checks the condition AFTER the body, so it always runs at least once. while checks before.", "Both can use break.", "Both work on any type."],
        difficulty: "easy"
      },
      {
        question: "What does `continue` do in a loop?",
        options: ["Exits the loop", "Skips to the next iteration", "Restarts the loop", "Pauses the loop"],
        answer: 1,
        explanations: ["That's break.", "Correct — continue skips the rest of the current iteration and jumps to the next one.", "It doesn't restart.", "It doesn't pause."],
        difficulty: "easy"
      },
      {
        question: "How do you write an infinite loop in C?",
        options: ["for (;;) or while (1)", "for (0)", "while (false)", "loop(infinite)"],
        answer: 0,
        explanations: ["Correct — both for (;;) and while (1) create infinite loops. Use break to exit.", "for (0) doesn't loop.", "while (false) never runs.", "Not a C keyword."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "break-continue-goto",
    title: "break, continue & goto",
    difficulty: "easy",
    definition: "break exits the nearest enclosing loop or switch immediately. continue skips the remaining body of the current iteration and jumps to the next. goto performs an unconditional jump to a labeled statement — powerful but discouraged, as it makes code hard to follow.",
    coreUnderstanding: "break and continue are controlled jumps that make loops more flexible. break exits a loop or switch immediately — useful for early termination. continue skips the rest of the current iteration — useful for filtering. goto is the nuclear option: it jumps to any labeled statement in the same function. goto is widely discouraged because it creates spaghetti code, but it has one legitimate use in C: breaking out of nested loops (break only exits one level). Even then, refactoring into a function is usually better.",
    howItWorks: "1. `break` — exits the nearest enclosing loop or switch. Only exits ONE level of nesting.\n2. `continue` — skips the rest of the current iteration. In for, jumps to the increment; in while/do-while, jumps to the condition.\n3. `goto label;` — jumps to the labeled statement. The label is `label:` followed by a statement.\n4. `break` in nested loops only exits the innermost loop. To exit all levels, use a flag or goto.\n5. goto is useful for cleanup in functions with multiple exit points: `goto cleanup;` to jump to a shared cleanup section.\n6. Labels are function-scoped — you can only goto within the same function.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    // break — early exit\n    for (int i = 0; i < 100; i++) {\n        if (i == 5) break;  // stop at 5\n        printf(\"%d \", i);  // 0 1 2 3 4\n    }\n    printf(\"\\n\");\n\n    // continue — skip even numbers\n    for (int i = 0; i < 10; i++) {\n        if (i % 2 == 0) continue;\n        printf(\"%d \", i);  // 1 3 5 7 9\n    }\n    printf(\"\\n\");\n\n    // goto — break out of nested loops\n    int found = 0;\n    for (int i = 0; i < 3 && !found; i++) {\n        for (int j = 0; j < 3; j++) {\n            if (i * j == 4) {\n                printf(\"Found at (%d, %d)\\n\", i, j);\n                found = 1;\n                break;  // only breaks inner loop\n            }\n        }\n    }\n\n    // goto for cleanup (legitimate use)\n    int* data = malloc(100 * sizeof(int));\n    if (!data) goto cleanup;\n    // ... use data ...\n    free(data);\ncleanup:\n    return 0;\n}",
        output: "0 1 2 3 4\n1 3 5 7 9\nFound at (2, 2)",
        note: "goto is discouraged but has one legitimate use: breaking out of deeply nested loops or jumping to a shared cleanup section."
      }
    ],
    marginNotes: [
      "break only exits ONE level of nesting. To break out of nested loops, use a flag variable or goto.",
      "goto is widely discouraged but has two legitimate uses: breaking out of nested loops and jumping to a shared cleanup section.",
      "continue in a for loop jumps to the increment expression, then the condition. In while/do-while, it jumps to the condition.",
      "Labels are function-scoped — you can only goto within the same function. You can't jump across functions."
    ],
    commonMistakes: [
      "Using goto for general control flow — it creates spaghetti code. Use it only for nested-loop breaks or cleanup.",
      "Forgetting that break only exits one level — in nested loops, you need a flag or goto to exit all levels.",
      "Using continue in a while loop without updating the loop variable — can cause an infinite loop."
    ],
    relatedTopics: ["Loops", "Control Flow", "Functions"],
    externalLinks: [
      { label: "cppreference: break", url: "https://en.cppreference.com/w/c/language/break" },
      { label: "Dijkstra: Go To Statement Considered Harmful", url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf" }
    ],
    mcqs: [
      {
        question: "What does `break` do in nested loops?",
        options: ["Exits all loops", "Exits only the innermost loop", "Exits the outermost loop", "Does nothing"],
        answer: 1,
        explanations: ["It only exits one level.", "Correct — break exits only the nearest enclosing loop. To exit all levels, use a flag or goto.", "Only the innermost.", "It does exit the innermost."],
        difficulty: "medium"
      },
      {
        question: "When is goto considered acceptable in C?",
        options: ["Never", "For breaking out of nested loops or jumping to cleanup", "For all control flow", "Only in switch"],
        answer: 1,
        explanations: ["It has limited use.", "Correct — goto is acceptable for breaking out of nested loops or jumping to a shared cleanup section.", "Not for all control flow.", "Not for switch."],
        difficulty: "medium"
      },
      {
        question: "What does `continue` do in a for loop?",
        options: ["Exits the loop", "Skips to the increment, then the condition", "Restarts from init", "Does nothing"],
        answer: 1,
        explanations: ["That's break.", "Correct — continue in a for loop jumps to the increment expression, then checks the condition.", "It doesn't restart.", "It skips to the next iteration."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "functions",
    title: "Functions",
    difficulty: "easy",
    definition: "A function is a named, reusable block of code that takes inputs (parameters), performs work, and optionally returns a value. C is procedure-oriented — programs are organized as collections of functions. Every C program starts at main(). Functions must be declared (prototype) or defined before use.",
    coreUnderstanding: "Functions are the primary organizational unit in C. A program is a collection of functions that call each other. Every C program starts at main(), which can call other functions. C requires functions to be declared before use — either by a prototype (signature only) or a full definition. Parameters are passed by value (copied) — the function gets a copy, not the original. To modify the caller's variable, pass a pointer. Functions can return one value (or void for no value). The return type and parameter types must be specified.",
    howItWorks: "1. Declaration (prototype): `returnType name(paramTypes);` — tells the compiler the signature before the definition.\n2. Definition: `returnType name(params) { body }` — the actual implementation.\n3. Call: `name(args)` — passes arguments (by value — copies) and executes the body.\n4. `return value;` — sends a value back to the caller. `return;` (void function) or falling off the end returns nothing.\n5. Pass-by-value: the function receives copies of the arguments. Modifying a parameter doesn't affect the caller.\n6. To modify the caller's variable, pass a pointer: `void swap(int *a, int *b)` — the function dereferences the pointers.\n7. Prototypes go in header files; definitions go in .c files.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// Function prototype (declaration)\nint add(int a, int b);\nvoid swap(int *a, int *b);\n\n// Function definitions\nint add(int a, int b) {\n    return a + b;\n}\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main(void) {\n    int x = 5, y = 3;\n    printf(\"add(%d, %d) = %d\\n\", x, y, add(x, y));  // 8\n\n    // Pass-by-value: swap doesn't work without pointers\n    int a = 10, b = 20;\n    swap(&a, &b);  // pass addresses\n    printf(\"a=%d, b=%d\\n\", a, b);  // a=20, b=10\n    return 0;\n}",
        output: "add(5, 3) = 8\na=20, b=10",
        note: "C passes arguments by value (copies). To modify the caller's variable, pass a pointer and dereference it inside the function."
      }
    ],
    marginNotes: [
      "C passes arguments by VALUE (copies). To modify the caller's variable, pass a pointer: `swap(&a, &b)` and dereference inside.",
      "Always declare function prototypes before use. Without a prototype, the compiler assumes default return type int and may not check argument types.",
      "Functions can return at most ONE value. To return multiple values, use output parameters (pointers) or a struct.",
      "Prototypes go in header files (.h); definitions go in .c files. This enables modular programming."
    ],
    commonMistakes: [
      "Forgetting that C passes by value — `void swap(int a, int b)` doesn't swap the caller's variables. Use pointers.",
      "Not declaring a prototype before calling a function — the compiler assumes int return and may not type-check arguments.",
      "Forgetting to `return` a value in a non-void function — undefined behavior (the caller gets garbage)."
    ],
    relatedTopics: ["Storage Classes", "Recursion", "Pointers: The Fundamentals"],
    externalLinks: [
      { label: "cppreference: Functions", url: "https://en.cppreference.com/w/c/language/functions" },
      { label: "C Functions — GNU Manual", url: "https://www.gnu.org/software/gnu-c-manual/html_node/Functions.html" }
    ],
    mcqs: [
      {
        question: "How does C pass function arguments?",
        options: ["By reference", "By value (copies)", "By name", "By pointer always"],
        answer: 1,
        explanations: ["Not by reference.", "Correct — C passes by value: the function receives copies. To modify the caller's variable, pass a pointer.", "Not by name.", "Pointers are manual, not automatic."],
        difficulty: "easy"
      },
      {
        question: "How do you modify the caller's variable from a function?",
        options: ["Just assign to the parameter", "Pass a pointer and dereference it", "Use a global variable", "You can't"],
        answer: 1,
        explanations: ["The parameter is a copy — modifying it doesn't affect the caller.", "Correct — pass a pointer (&var) and dereference (*ptr) inside the function.", "Globals work but are bad practice.", "You can, via pointers."],
        difficulty: "medium"
      },
      {
        question: "Why use function prototypes?",
        options: ["They make code faster", "They tell the compiler the function signature before the definition, enabling type checking", "They're required by the standard", "They prevent recursion"],
        answer: 1,
        explanations: ["No speed benefit.", "Correct — prototypes let the compiler check argument types and return type before the function is defined.", "Not strictly required but strongly recommended.", "They don't prevent recursion."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "storage-classes",
    title: "Storage Classes (auto, static, extern, register)",
    difficulty: "medium",
    definition: "Storage classes control a variable's lifetime, visibility, and storage location. auto (default for locals) lives on the stack and dies when its block exits. static persists for the program's lifetime. extern declares a variable defined elsewhere. register hints the compiler to store it in a CPU register for speed.",
    coreUnderstanding: "Storage classes determine WHERE a variable is stored and HOW LONG it lives. auto (the default for locals) lives on the stack and dies when the block exits — it's re-initialized each call. static has two uses: (1) a static local persists across calls but keeps local scope, (2) a static global is visible only in its file (internal linkage). extern declares a variable defined in another file — it's a promise that the variable exists somewhere. register is mostly obsolete — modern compilers optimize better than hints.",
    howItWorks: "1. `auto` — default for local variables. Lives on the stack, dies when the block exits. Rarely written explicitly.\n2. `static` (local) — persists across function calls. Initialized once, keeps its value between calls. Scope is still local.\n3. `static` (global/file) — visible only in the current file (internal linkage). Prevents other files from seeing it via extern.\n4. `extern` — declares a variable defined in another file. `extern int x;` says 'x exists somewhere, defined elsewhere'.\n5. `register` — hints the compiler to store in a CPU register. Modern compilers ignore it — they optimize better themselves.\n6. Static variables are zero-initialized by default. Auto variables are NOT — they contain garbage until assigned.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// static local — persists across calls\nint counter(void) {\n    static int count = 0;  // initialized ONCE\n    return ++count;        // keeps value between calls\n}\n\n// extern — variable defined elsewhere\nextern int global_x;  // defined in another file\n\n// static global — file-private\nstatic int file_private = 42;  // only visible in this file\n\nint main(void) {\n    printf(\"%d\\n\", counter());  // 1\n    printf(\"%d\\n\", counter());  // 2\n    printf(\"%d\\n\", counter());  // 3\n\n    // auto (default) — re-initialized each call\n    for (int i = 0; i < 3; i++) {\n        int x = 0;  // auto, re-initialized each iteration\n        x++;\n        printf(\"%d \", x);  // 1 1 1\n    }\n    printf(\"\\n\");\n    return 0;\n}",
        output: "1\n2\n3\n1 1 1",
        note: "static locals are initialized once and persist across calls. auto (default) locals are re-initialized each time the block runs."
      }
    ],
    marginNotes: [
      "static has two meanings: (1) static local — persists across calls, keeps local scope; (2) static global — file-private, invisible to other files.",
      "Static and global variables are zero-initialized by default. Auto (local) variables are NOT — they contain garbage until you assign them.",
      "`register` is mostly obsolete — modern compilers optimize register allocation better than manual hints. You also can't take the address (&) of a register variable.",
      "Use `extern` in header files to declare global variables defined in one .c file but used in others."
    ],
    commonMistakes: [
      "Forgetting that auto (local) variables are NOT initialized — they contain garbage. Always initialize before use.",
      "Confusing the two meanings of static: static local (persists across calls) vs static global (file-private).",
      "Using `register` and taking its address (&var) — register variables can't have their address taken. Modern compilers ignore register anyway."
    ],
    relatedTopics: ["Functions", "Scope & Lifetime", "Header Files"],
    externalLinks: [
      { label: "cppreference: Storage Classes", url: "https://en.cppreference.com/w/c/language/storage_duration" },
      { label: "C Storage Classes — GNU Manual", url: "https://www.gnu.org/software/gnu-c-manual/html_node/Storage-Classes.html" }
    ],
    mcqs: [
      {
        question: "What does a `static` local variable do?",
        options: ["Dies when the block exits", "Persists across function calls, keeps local scope", "Is visible to other files", "Is stored in a register"],
        answer: 1,
        explanations: ["That's auto.", "Correct — static locals are initialized once and keep their value between calls, but scope remains local.", "That's extern/static global.", "That's register."],
        difficulty: "medium"
      },
      {
        question: "What does `extern` declare?",
        options: ["A variable that doesn't exist", "A variable defined in another file", "A constant", "A static variable"],
        answer: 1,
        explanations: ["It must exist somewhere.", "Correct — extern says 'this variable is defined elsewhere' — typically in another .c file.", "Not a constant.", "Not static."],
        difficulty: "medium"
      },
      {
        question: "Are auto (local) variables initialized by default?",
        options: ["Yes, to zero", "No — they contain garbage until assigned", "Yes, to 1", "Only if static"],
        answer: 1,
        explanations: ["Static and global are zero-initialized.", "Correct — auto (local) variables are NOT initialized. They contain whatever was in memory. Always initialize before use.", "Not to 1.", "Static variables are zero-initialized."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "recursion",
    title: "Recursion",
    difficulty: "medium",
    definition: "Recursion is when a function calls itself to solve a smaller instance of the same problem. Every recursive function needs a base case (to stop) and a recursive case (to make progress toward it). Without a base case, recursion runs forever and exhausts the stack, crashing the program.",
    coreUnderstanding: "Recursion is a problem-solving technique where a function calls itself. It's elegant for problems that have a self-similar structure: factorials, tree traversal, divide-and-conquer algorithms. Every recursive function needs two things: a base case (the simplest instance that doesn't recurse) and a recursive case (which calls itself with a smaller input). Without a base case, the function calls itself forever, exhausting the stack and crashing with a stack overflow. Each recursive call adds a frame to the stack — deep recursion can overflow the stack even with a correct base case.",
    howItWorks: "1. Base case: the simplest instance — return a result directly, no recursion. Without it, infinite recursion.\n2. Recursive case: call the function with a smaller/simpler input. Must progress toward the base case.\n3. Each call adds a stack frame (local variables, return address). When the base case is hit, frames unwind.\n4. Stack depth = number of recursive calls. Too deep = stack overflow (crash).\n5. Return values propagate back up: each call returns its result to the caller.\n6. Tail recursion (last operation is the recursive call) can be optimized by compilers — but C doesn't guarantee it.\n7. Recursion is often clearer than iteration but uses more memory (stack frames). For deep recursion, prefer iteration.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// Recursive factorial: n! = n * (n-1)!\nint factorial(int n) {\n    if (n <= 1) return 1;       // base case\n    return n * factorial(n - 1); // recursive case\n}\n\n// Recursive Fibonacci (inefficient — O(2^n))\nint fib(int n) {\n    if (n < 2) return n;         // base case\n    return fib(n - 1) + fib(n - 2); // recursive case\n}\n\n// Iterative factorial (no stack overflow risk)\nint factorial_iter(int n) {\n    int result = 1;\n    for (int i = 2; i <= n; i++)\n        result *= i;\n    return result;\n}\n\nint main(void) {\n    printf(\"5! = %d\\n\", factorial(5));  // 120\n    printf(\"fib(10) = %d\\n\", fib(10));   // 55\n    printf(\"5! = %d\\n\", factorial_iter(5)); // 120\n    return 0;\n}",
        output: "5! = 120\nfib(10) = 55\n5! = 120",
        note: "Every recursive function needs a base case. Without it, infinite recursion causes a stack overflow crash."
      }
    ],
    marginNotes: [
      "Every recursive function MUST have a base case. Without it, infinite recursion causes a stack overflow crash.",
      "Each recursive call adds a stack frame. Deep recursion (thousands of calls) can overflow the stack even with a correct base case.",
      "Recursive Fibonacci fib(n) = fib(n-1) + fib(n-2) is O(2^n) — it recomputes the same values. Use memoization or iteration instead.",
      "Tail recursion (recursive call is the last operation) can be optimized to O(1) space, but C doesn't guarantee tail-call optimization."
    ],
    commonMistakes: [
      "Forgetting the base case — infinite recursion causes a stack overflow crash.",
      "Not making progress toward the base case — `factorial(n)` calling `factorial(n)` (not n-1) recurses forever.",
      "Using recursion for deep problems (like fib(50)) — the stack overflows or the exponential time is too slow. Use iteration or memoization."
    ],
    relatedTopics: ["Functions", "Loops", "Data Structures in C"],
    externalLinks: [
      { label: "cppreference: Recursion", url: "https://en.cppreference.com/w/c/language/recursion" },
      { label: "Recursion — GeeksforGeeks", url: "https://www.geeksforgeeks.org/recursion/" }
    ],
    mcqs: [
      {
        question: "What does every recursive function need?",
        options: ["A loop", "A base case and a recursive case", "A global variable", "A static variable"],
        answer: 1,
        explanations: ["Loops are iterative, not recursive.", "Correct — a base case (to stop) and a recursive case (to make progress toward the base case).", "Not needed.", "Not needed."],
        difficulty: "easy"
      },
      {
        question: "What happens if a recursive function has no base case?",
        options: ["It returns 0", "Infinite recursion — stack overflow crash", "It loops forever without crashing", "Compile error"],
        answer: 1,
        explanations: ["It doesn't return.", "Correct — without a base case, the function calls itself forever, exhausting the stack and crashing.", "It crashes from stack overflow.", "It compiles fine."],
        difficulty: "easy"
      },
      {
        question: "What is a disadvantage of recursion vs iteration?",
        options: ["Recursion is always slower", "Recursion uses stack memory — deep recursion can overflow the stack", "Recursion can't solve the same problems", "Recursion is harder to write"],
        answer: 1,
        explanations: ["Not always slower — depends on the problem.", "Correct — each recursive call adds a stack frame. Deep recursion can overflow the stack.", "Recursion can solve the same problems.", "Recursion is often clearer, not harder."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "arrays-1d",
    title: "One-Dimensional Arrays",
    difficulty: "easy",
    definition: "An array is a contiguous block of memory holding multiple values of the same type, accessed by index (starting at 0). In C, array names decay to pointers to the first element, and there is NO bounds checking — reading or writing past the end is undefined behavior, a leading cause of security bugs.",
    coreUnderstanding: "Arrays in C are the simplest data structure — a contiguous block of memory holding values of the same type. The array name is (in most contexts) a pointer to the first element. Indexing (arr[i]) is just pointer arithmetic: *(arr + i). C has NO bounds checking — writing past the end of an array is undefined behavior (buffer overflow), a leading cause of security vulnerabilities. Array size is fixed at compile time (unless dynamically allocated). The array length is NOT stored — you must track it separately.",
    howItWorks: "1. Declaration: `int arr[5];` — reserves 5 * sizeof(int) bytes. Size must be a compile-time constant (C89) or any expression (C99 VLAs).\n2. Initialization: `int arr[] = {1, 2, 3, 4, 5};` — size inferred from initializer.\n3. Access: `arr[0]` is the first element, `arr[4]` is the last (for size 5). Index starts at 0.\n4. Array name decays: `arr` in most expressions becomes `&arr[0]` (pointer to first element).\n5. `arr[i]` is equivalent to `*(arr + i)` — pointer arithmetic. The compiler scales by the element size.\n6. No bounds checking: `arr[10]` on a 5-element array is undefined behavior — it reads/writes past the array.\n7. `sizeof(arr)` gives the total byte size (only when arr is the actual array, not a pointer). `sizeof(arr)/sizeof(arr[0])` gives the element count.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    int arr[] = {10, 20, 30, 40, 50};\n    int size = sizeof(arr) / sizeof(arr[0]);  // 5\n\n    // Access by index\n    for (int i = 0; i < size; i++) {\n        printf(\"arr[%d] = %d\\n\", i, arr[i]);\n    }\n\n    // Array name decays to pointer\n    int *p = arr;  // same as &arr[0]\n    printf(\"*p = %d, *(p+2) = %d\\n\", *p, *(p + 2));  // 10, 30\n\n    // No bounds checking — this is UNDEFINED BEHAVIOR\n    // arr[100] = 999;  // writes past the array — crash or corruption\n\n    // Modify elements\n    arr[0] = 100;\n    printf(\"arr[0] = %d\\n\", arr[0]);  // 100\n    return 0;\n}",
        output: "arr[0] = 10\narr[1] = 20\narr[2] = 30\narr[3] = 40\narr[4] = 50\n*p = 10, *(p+2) = 30\narr[0] = 100",
        note: "C has NO bounds checking. Writing past the end of an array is undefined behavior — a leading cause of security vulnerabilities."
      }
    ],
    marginNotes: [
      "C has NO bounds checking. `arr[100]` on a 5-element array is undefined behavior — it reads/writes past the array, causing crashes or security holes.",
      "The array name decays to a pointer in most contexts. `sizeof(arr)` gives the byte size only when arr is the actual array, not a pointer.",
      "Array size is fixed at compile time (C89). C99 added Variable Length Arrays (VLAs) but they're optional and discouraged.",
      "The array length is NOT stored anywhere. You must pass the size separately to functions: `void process(int arr[], int size)`."
    ],
    commonMistakes: [
      "Accessing `arr[size]` — off-by-one error. Valid indices are 0 to size-1. `arr[size]` is out of bounds.",
      "Assuming the array length is stored — it's not. You must track it separately and pass it to functions.",
      "Using `sizeof` on a pointer to an array — `sizeof(ptr)` gives the pointer size (8 on 64-bit), not the array size."
    ],
    relatedTopics: ["Multi-Dimensional Arrays", "Pointers and Arrays", "Strings"],
    externalLinks: [
      { label: "cppreference: Arrays", url: "https://en.cppreference.com/w/c/language/array" },
      { label: "C Arrays — GeeksforGeeks", url: "https://www.geeksforgeeks.org/arrays-in-c/" }
    ],
    mcqs: [
      {
        question: "What is the valid index range for an array of size 5?",
        options: ["1 to 5", "0 to 5", "0 to 4", "1 to 4"],
        answer: 2,
        explanations: ["Arrays start at 0, not 1.", "0 to 5 would be 6 elements.", "Correct — indices 0, 1, 2, 3, 4 for a 5-element array.", "Arrays start at 0."],
        difficulty: "easy"
      },
      {
        question: "Does C check array bounds?",
        options: ["Yes, always", "No — out-of-bounds access is undefined behavior", "Only in debug mode", "Only for global arrays"],
        answer: 1,
        explanations: ["C never checks bounds.", "Correct — C has no bounds checking. Out-of-bounds access is undefined behavior (crash, corruption, security hole).", "Not even in debug.", "Never checks."],
        difficulty: "easy"
      },
      {
        question: "What does the array name decay to in most expressions?",
        options: ["The first element", "A pointer to the first element (&arr[0])", "The array size", "The last element"],
        answer: 1,
        explanations: ["Not the value, the address.", "Correct — the array name decays to a pointer to the first element. `arr` becomes `&arr[0]`.", "Not the size.", "Not the last."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "arrays-2d",
    title: "Multi-Dimensional Arrays",
    difficulty: "medium",
    definition: "A 2D array is an array of arrays — a contiguous block accessed with two indices like grid[row][col]. C stores 2D arrays in row-major order. Multi-dimensional arrays model matrices, grids, and images, but the compiler needs to know all dimensions except the first to compute offsets.",
    coreUnderstanding: "A 2D array in C is an array of arrays — `int grid[3][4]` is 3 rows of 4 columns, stored contiguously in row-major order (row 0, then row 1, then row 2). Access is `grid[row][col]`. The compiler computes the offset as `row * num_cols + col`, which is why it needs to know the number of columns at compile time. When passing 2D arrays to functions, you must specify all dimensions except the first: `void process(int grid[][4], int rows)`.",
    howItWorks: "1. Declaration: `int grid[3][4];` — 3 rows, 4 columns. 3*4*4 = 48 bytes.\n2. Initialization: `int grid[2][3] = {{1,2,3}, {4,5,6}};` — row by row.\n3. Access: `grid[row][col]` — row first, then column. `grid[0][0]` is top-left.\n4. Memory layout: row-major. `grid[0][0], grid[0][1], ..., grid[0][3], grid[1][0], ...`\n5. Offset: `&grid[r][c]` = base + (r * num_cols + c) * sizeof(int). Compiler needs num_cols.\n6. Passing to functions: `void f(int grid[][4], int rows)` — must specify all dims except first.\n7. Higher dimensions: `int cube[2][3][4]` — same pattern, more indices.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n#define ROWS 3\n#define COLS 4\n\nint main(void) {\n    int grid[ROWS][COLS] = {\n        {1, 2, 3, 4},\n        {5, 6, 7, 8},\n        {9, 10, 11, 12}\n    };\n\n    // Access and print\n    for (int r = 0; r < ROWS; r++) {\n        for (int c = 0; c < COLS; c++) {\n            printf(\"%3d \", grid[r][c]);\n        }\n        printf(\"\\n\");\n    }\n\n    // grid[1][2] is row 1, col 2\n    printf(\"grid[1][2] = %d\\n\", grid[1][2]);  // 7\n\n    // Memory is contiguous (row-major)\n    int* p = &grid[0][0];\n    printf(\"p[5] = %d\\n\", p[5]);  // 6 (row 1, col 1)\n    return 0;\n}",
        output: "  1   2   3   4\n  5   6   7   8\n  9  10  11  12\ngrid[1][2] = 7\np[5] = 6",
        note: "2D arrays are stored in row-major order: row 0, then row 1, etc. The compiler needs the number of columns to compute offsets."
      }
    ],
    marginNotes: [
      "C stores 2D arrays in row-major order: row 0, then row 1, etc. This matters for cache performance — iterate row by row, not column by column.",
      "When passing a 2D array to a function, you MUST specify all dimensions except the first: `void f(int grid[][4], int rows)`.",
      "A 2D array is an array of arrays. `grid[r]` is a 1D array (row r), and `grid[r][c]` is an element.",
      "For dynamic 2D arrays (runtime size), use an array of pointers: `int** grid = malloc(rows * sizeof(int*))` — each row is a separate allocation."
    ],
    commonMistakes: [
      "Forgetting to specify column count when passing to functions — `void f(int grid[][])` is a compile error. Must specify `grid[][4]`.",
      "Iterating column-by-column instead of row-by-row — causes cache misses. Always iterate in memory order (row-major).",
      "Confusing `grid[r][c]` (row first, column second) — the order matters and is a common source of off-by-one errors."
    ],
    relatedTopics: ["One-Dimensional Arrays", "Pointers to Pointers", "Dynamic Memory Allocation"],
    externalLinks: [
      { label: "cppreference: Multidimensional Arrays", url: "https://en.cppreference.com/w/c/language/array#Multidimensional_arrays" },
      { label: "C 2D Arrays — GeeksforGeeks", url: "https://www.geeksforgeeks.org/multidimensional-arrays-in-c/" }
    ],
    mcqs: [
      {
        question: "In what order does C store 2D array elements in memory?",
        options: ["Column-major", "Row-major", "Random order", "Diagonal order"],
        answer: 1,
        explanations: ["That's Fortran/MATLAB.", "Correct — C stores 2D arrays in row-major order: all of row 0, then all of row 1, etc.", "Not random.", "Not diagonal."],
        difficulty: "medium"
      },
      {
        question: "When passing a 2D array to a function, what must you specify?",
        options: ["Only the first dimension", "All dimensions except the first", "No dimensions", "Only the total size"],
        answer: 1,
        explanations: ["Not enough.", "Correct — you must specify all dimensions except the first: `void f(int grid[][4], int rows)`.", "Not sufficient.", "Not the way it works."],
        difficulty: "medium"
      },
      {
        question: "How is `grid[r][c]` accessed in memory?",
        options: ["base + r + c", "base + (r * num_cols + c) * sizeof(element)", "base + (c * num_rows + r)", "Random access"],
        answer: 1,
        explanations: ["Missing the column count and element size.", "Correct — the offset is row * num_cols + col, scaled by element size. This is why the compiler needs num_cols.", "That's column-major.", "It's deterministic."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "strings",
    title: "Strings & Character Arrays",
    difficulty: "medium",
    definition: "C has no string type — a string is a char array terminated by a null character ('\\0'). String literals like \"hello\" are stored in read-only memory. You manipulate strings with library functions from <string.h> like strlen, strcpy, strcat, and strcmp, all of which rely on the null terminator to find the end.",
    coreUnderstanding: "C has no built-in string type. A string is a char array with a null terminator ('\\0') at the end. The null terminator is how all string functions know where the string ends — there's no length stored. String literals (\"hello\") are stored in read-only memory; modifying them is undefined behavior. To create a modifiable string, declare a char array: `char s[] = \"hello\";`. The <string.h> library provides functions for string operations, but they're unsafe (no bounds checking) — always ensure your buffers are large enough.",
    howItWorks: "1. A string is `char s[6] = \"hello\"` — 5 chars + '\\0'. The null terminator is automatic for string literals.\n2. String literals (\"hello\") are stored in read-only memory. `char* s = \"hello\"; s[0] = 'H';` is undefined behavior.\n3. `char s[] = \"hello\"` — modifiable copy on the stack. `char* s = \"hello\"` — read-only pointer.\n4. `strlen(s)` — length without the null terminator. `sizeof(s)` — includes the null terminator.\n5. `strcpy(dest, src)` — copies src to dest. No bounds checking — dest must be large enough.\n6. `strcat(dest, src)` — appends src to dest. No bounds checking.\n7. `strcmp(s1, s2)` — compares. Returns 0 if equal, <0 if s1<s2, >0 if s1>s2.\n8. `s[i]` — access individual characters. Iterate until `s[i] == '\\0'` to find the end.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    // Modifiable string (char array)\n    char greeting[] = \"Hello\";  // 6 bytes: H,e,l,l,o,\\0\n    printf(\"%s, len=%zu\\n\", greeting, strlen(greeting));  // Hello, len=5\n\n    // Read-only string literal\n    const char* literal = \"World\";  // stored in read-only memory\n    // literal[0] = 'w';  // UNDEFINED BEHAVIOR — crash\n\n    // Copying strings\n    char dest[20];\n    strcpy(dest, greeting);  // copy greeting to dest\n    printf(\"dest = %s\\n\", dest);  // Hello\n\n    // Concatenation\n    strcat(dest, \", \");\n    strcat(dest, literal);\n    printf(\"%s\\n\", dest);  // Hello, World\n\n    // Comparison\n    if (strcmp(greeting, \"Hello\") == 0) {\n        printf(\"Strings are equal\\n\");\n    }\n\n    // Iterating char by char\n    for (int i = 0; greeting[i] != '\\0'; i++) {\n        printf(\"%c \", greeting[i]);  // H e l l o\n    }\n    printf(\"\\n\");\n    return 0;\n}",
        output: "Hello, len=5\ndest = Hello\nHello, World\nStrings are equal\nH e l l o ",
        note: "C strings are char arrays terminated by '\\0'. String literals are read-only — use char arrays for modifiable strings."
      }
    ],
    marginNotes: [
      "C has no string type. A string is a char array with a '\\0' terminator. All string functions rely on the null terminator to find the end.",
      "String literals (\"hello\") are stored in read-only memory. `char* s = \"hello\"; s[0] = 'H';` is undefined behavior. Use `char s[] = \"hello\"` for a modifiable copy.",
      "`strlen` returns the length WITHOUT the null terminator. `sizeof` includes it. `strlen(\"Hi\")` = 2, `sizeof(\"Hi\")` = 3.",
      "strcpy, strcat have NO bounds checking. Use strncpy, strncat with a length limit to prevent buffer overflows."
    ],
    commonMistakes: [
      "Modifying a string literal: `char* s = \"hello\"; s[0] = 'H';` — undefined behavior. Use `char s[] = \"hello\"` for a modifiable copy.",
      "Forgetting the null terminator when building strings manually — string functions read past the end.",
      "Using `==` to compare strings: `if (s1 == s2)` compares pointers, not contents. Use `strcmp(s1, s2) == 0`."
    ],
    relatedTopics: ["String Handling Functions", "One-Dimensional Arrays", "Pointers: The Fundamentals"],
    externalLinks: [
      { label: "cppreference: Strings", url: "https://en.cppreference.com/w/c/language/string_literal" },
      { label: "cppreference: string.h", url: "https://en.cppreference.com/w/c/string/byte" }
    ],
    mcqs: [
      {
        question: "How does C represent a string?",
        options: ["A built-in string type", "A char array terminated by '\\0'", "A pointer to char", "A struct"],
        answer: 1,
        explanations: ["C has no string type.", "Correct — a C string is a char array with a null terminator ('\\0'). All string functions rely on it.", "A pointer to char might not be null-terminated.", "Not a struct."],
        difficulty: "easy"
      },
      {
        question: "What is wrong with `char* s = \"hello\"; s[0] = 'H';`?",
        options: ["Syntax error", "String literals are read-only — modifying them is undefined behavior", "s is too short", "Nothing"],
        answer: 1,
        explanations: ["Valid syntax.", "Correct — string literals are stored in read-only memory. Modifying them is undefined behavior (crash on most systems). Use `char s[] = \"hello\"` for a modifiable copy.", "Length is fine.", "It's a well-known bug."],
        difficulty: "medium"
      },
      {
        question: "How do you compare two strings in C?",
        options: ["if (s1 == s2)", "if (strcmp(s1, s2) == 0)", "if (s1.equals(s2))", "if (s1 = s2)"],
        answer: 1,
        explanations: ["== compares pointers, not contents.", "Correct — strcmp compares string contents. It returns 0 if equal.", "Not C syntax.", "= is assignment."],
        difficulty: "easy"
      }
    ]
  }
];