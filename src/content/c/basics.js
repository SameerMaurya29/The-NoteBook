// C — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "language-basics",
  title: "C Basics — Why & How",
  difficulty: "easy",
  definition: `C is a small, compiled, statically typed language that sits one step above the hardware. You use it for operating systems, embedded firmware, compilers, language runtimes, and any code where control over memory and maximum speed matter.`,
  coreUnderstanding: `C is the mother tongue of systems programming. It gives you pointers, manual memory management, and a tiny runtime — nothing is hidden. Learning C teaches you what the machine actually does: bytes, addresses, the stack, and the heap. The trade-off: you get speed and control, but you also get buffer overflows, manual free(), and no safety net. Most operating systems (Linux, Windows kernels), language VMs (CPython, the JVM), and databases are written in or heavily rely on C.`,
  howItWorks: `1. WHY: maximum speed, tiny binary, portable across CPUs, total control over memory. Trade-off: no bounds checking, manual memory management, easy to shoot yourself in the foot.
2. WHERE: OS kernels, embedded/firmware, compilers, interpreters, drivers, performance-critical libraries. Avoid for quick web apps or rapid prototyping.
3. BRACES { } delimit every block — function bodies, if/for/while bodies, struct definitions. Every opening { MUST have a matching closing }. Mismatched braces are the #1 compile error for beginners.
4. SEMICOLONS ; end EVERY statement. Forgetting one is a compile error. A block { ... } does not need a semicolon after it, but the statements inside do.
5. COMMAS separate: function parameters (int f(int a, int b)), arguments (f(1, 2)), array initializers {1, 2, 3}, and variable declarations of the same type (int x, y;).
6. PROGRAM STRUCTURE: #include <stdio.h> at the top (preprocessor), then functions. int main(void) { ... return 0; } is the entry point — the OS calls main; returning 0 means success.
7. FUNCTIONS: returnType name(params) { body; return value; }. A prototype (declaration) goes above if defined later. void means no return / no params.
8. POINTERS: int *p holds an address. &x takes the address of x; *p dereferences. This is the core idea that makes C powerful and dangerous.
9. MEMORY: malloc/free from <stdlib.h> — every malloc needs a matching free, or you leak memory.`,
  codeExamples: [
    {
      lang: "c",
      code: `#include <stdio.h>   // preprocessor: bring in printf

// function: returnType name(params) { body }
int add(int a, int b) {
    return a + b;     // statement ends with ;
}                     // closing brace ends the function

int main(void) {      // entry point — the OS calls main
    int x = 3, y = 4; // commas separate same-type declarations
    int sum = add(x, y);

    if (sum > 5) {    // braces open the if-block
        printf("big: %d\\n", sum);
    } else {
        printf("small: %d\\n", sum);
    }

    return 0;         // 0 = success to the OS
}                     // every { needs a matching }`,
      output: `big: 7`,
      note: "C uses braces { } for blocks and semicolons ; for statements. Every { needs a }. main() is the entry point; return 0 means success. Commas separate params, args, and declarations."
    }
  ],
  marginNotes: [
    "Every opening brace { needs a closing }. If you get a strange error on a late line, count your braces first — it's almost always a mismatch.",
    "Every statement ends with ;. A common beginner error is `if (x > 5);` — the semicolon ends the if immediately, so the block always runs.",
    "main returns int. `return 0;` means success; non-zero means an error. `void main()` is non-standard — avoid it.",
    "Every malloc needs a free. Forgetting free leaks memory; freeing twice corrupts the heap."
  ],
  commonMistakes: [
    "Mismatched braces — count them. A missing } surfaces as an error far from the real cause.",
    "Putting a semicolon after an if/for/while condition: `if (x); { ... }` — the block always executes.",
    "Forgetting to free() malloc'd memory, or freeing the same block twice."
  ],
  relatedTopics: ["Variables & Data Types", "Pointers & Memory", "Functions & Recursion"],
  externalLinks: [
    { label: "The C Programming Language (K&R)", url: "https://en.wikipedia.org/wiki/The_C_Programming_Language" },
    { label: "cppreference — C", url: "https://en.cppreference.com/w/c" }
  ],
  mcqs: [
    {
      question: "What delimits a block in C?",
      options: ["Indentation", "Curly braces { }", "begin/end keywords", "Colons"],
      answer: 1,
      explanations: ["Indentation is cosmetic in C.", "Correct — braces { } delimit function bodies, if/for/while bodies, and structs. Every { needs a }.", "C has no begin/end.", "Colons are for labels/switch/ternary, not blocks."],
      difficulty: "easy"
    },
    {
      question: "What does `if (x > 5); { ... }` do?",
      options: ["Runs the block only when x > 5", "Runs the block ALWAYS — the semicolon ends the if, leaving an empty statement", "Compile error", "Nothing"],
      answer: 1,
      explanations: ["The semicolon breaks the if.", "Correct — `if (x > 5);` is a complete (empty) statement, so the if does nothing. The following `{ ... }` is an unrelated block that always runs. Remove the semicolon.", "It compiles.", "The block runs unconditionally."],
      difficulty: "medium"
    },
    {
      question: "Why is C still widely used?",
      options: ["It's the fastest to write", "It gives maximum speed and direct hardware/memory control for systems code", "It has the largest standard library", "It's the only portable language"],
      answer: 1,
      explanations: ["C is verbose to write.", "Correct — C compiles to fast, tiny binaries with manual memory control, making it ideal for OS kernels, firmware, and runtimes.", "C's standard library is small.", "Many languages are portable."],
      difficulty: "easy"
    }
  ]
};