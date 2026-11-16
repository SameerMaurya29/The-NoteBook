// C — more foundational "things you have to know" notes (part 2).
export default [
  {
    id: "operators-and-expressions",
    title: "Operators & Expressions",
    difficulty: "easy",
    definition: `Operators act on values to produce results. C has arithmetic (+ - * / %), relational (< > <= >= == !=), logical (&& || !), bitwise (& | ^ ~ << >>), assignment (= += -= ...), and the ternary (cond ? a : b). Integer division truncates; precedence decides order; use parentheses to be explicit.`,
    coreUnderstanding: `C's operators are the foundation every later language copied. Two rules matter most: integer division truncates toward zero (7/2 == 3, not 3.5 — make one operand a float for a float result), and && / || short-circuit (the right side isn't evaluated if the left already decides the result — essential for null checks like \`p && p->x\`). Bitwise operators manipulate individual bits and are central to low-level code (flags, masks, hardware registers).`,
    howItWorks: `1. ARITHMETIC: + - * / %. Integer division TRUNCATES: 7/2 = 3, -7/2 = -3. For a float, make an operand float: 7/2.0 = 3.5. % is remainder (integers only).
2. RELATIONAL: < > <= >= == !=. Return 1 (true) or 0 (false). NOTE: = is assignment, == is comparison — mixing them is the classic C bug.
3. LOGICAL: && (AND), || (OR), ! (NOT). Short-circuit: && skips the right if left is 0; || skips the right if left is non-zero. Operands are treated as true (non-zero) or false (zero).
4. BITWISE: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift = *2), >> (right shift = /2). Used for flags and masks: flags & READ == READ tests a bit; flags |= READ sets it.
5. ASSIGNMENT: = and compound (+=, -=, *=, /=, %=, <<=, >>=, &=, |=, ^=). x += 5 means x = x + 5.
6. TERNARY: cond ? a : b — an expression, not a statement. max = (a > b) ? a : b.
7. INCREMENT/DECREMENT: ++x (pre: increment then use), x++ (post: use then increment). The classic interview trap.
8. PRECEDENCE: * / % before + -; relational before equality; && before ||. Use parentheses — don't memorize the full table.`,
    codeExamples: [
      {
        lang: "c",
        code: `#include <stdio.h>

int main(void) {
    // integer division TRUNCATES; use a float operand for a float result
    printf("%d\\n", 7 / 2);     // 3   (truncated)
    printf("%f\\n", 7 / 2.0);   // 3.5 (float)

    // short-circuit: right side NOT evaluated if left decides
    int *p = NULL;
    if (p != NULL && p[0] == 5) {   // p[0] is never read (p is NULL)
        printf("safe\\n");
    }

    // bitwise flags: set, test, clear a bit
    unsigned int flags = 0;
    flags |= 0x01;            // set bit 0
    if (flags & 0x01) printf("bit0 set\\n");   // prints
    flags &= ~0x01;          // clear bit 0

    // ternary expression
    int a = 10, b = 20;
    int max = (a > b) ? a : b;
    printf("max=%d\\n", max);   // 20

    // = vs == : the classic bug
    if (a == 10) printf("a is 10\\n");   // == is comparison
    return 0;
}`,
        output: `3
3.500000
bit0 set
max=20
a is 10`,
        note: "Integer division truncates (7/2=3); use a float operand for 3.5. && and || short-circuit (safe for null checks). & | ^ ~ << >> manipulate bits for flags/masks. == compares, = assigns — don't mix them."
      }
    ],
    marginNotes: [
      "Integer division TRUNCATES toward zero: 7/2 = 3. For a float result, make an operand a float: 7/2.0 or (float)7/2.",
      "= is assignment, == is comparison. `if (x = 5)` assigns 5 to x and is 'true' — a famous bug. Some write `if (5 == x)` so the compiler catches a typo.",
      "&& and || short-circuit: `p && p->x` is safe because if p is NULL, p->x is never evaluated. & and | (bitwise) do NOT short-circuit.",
      "++x (pre) increments then returns the new value; x++ (post) returns the old value then increments. Avoid mixing both on one variable in one expression — order is undefined."
    ],
    commonMistakes: [
      "Using = (assignment) where you meant == (comparison) in an if condition.",
      "Expecting 7/2 to be 3.5 — integer division truncates. Use 7/2.0.",
      "Confusing & / | (bitwise, no short-circuit) with && / || (logical, short-circuit)."
    ],
    relatedTopics: ["Variables & Data Types", "Control Flow: if/switch/loops", "Bitwise Operations"],
    externalLinks: [
      { label: "cppreference: C Operators", url: "https://en.cppreference.com/w/c/language/operator_precedence" }
    ],
    mcqs: [
      {
        question: "What does `7 / 2` evaluate to in C (both int)?",
        options: ["3.5", "3 (integer division truncates)", "4", "3.0"],
        answer: 1,
        explanations: ["That's 7/2.0.", "Correct — integer division truncates toward zero: 7/2 = 3. For a float, make an operand float: 7/2.0 = 3.5.", "It truncates, not rounds.", "The result is int, not float."],
        difficulty: "easy"
      },
      {
        question: "What does `if (x = 5)` do?",
        options: ["Compares x to 5", "Assigns 5 to x, then the condition is true (5 is non-zero)", "Compile error", "Nothing"],
        answer: 1,
        explanations: ["That's `if (x == 5)`.", "Correct — = assigns 5 to x and the expression evaluates to 5 (non-zero = true), so the body always runs. This is the classic C bug; use ==.", "It compiles.", "It assigns and runs."],
        difficulty: "medium"
      },
      {
        question: "Why is `p != NULL && p->x == 5` safe?",
        options: ["p->x is always safe", "&& short-circuits — if p is NULL, p->x is never evaluated", "It isn't safe", "NULL checks are optional"],
        answer: 1,
        explanations: ["Dereferencing NULL crashes.", "Correct — && short-circuits: if the left (p != NULL) is false, the right (p->x) is NOT evaluated, avoiding a null dereference. & (bitwise) would NOT short-circuit.", "It is safe because of short-circuit.", "They prevent crashes."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "control-flow-basics",
    title: "Control Flow: if / switch / loops",
    difficulty: "easy",
    definition: `Control flow decides which code runs and how often. C gives you conditionals (if / else if / else, switch), loops (for, while, do-while), and jump statements (break, continue, return, goto). Every statement ends with ; and blocks use braces { }.`,
    coreUnderstanding: `C's control flow is the template most languages adopted. if / else if / else branch on conditions; switch jumps to a matching case (and famously falls through without break); for / while / do-while repeat. The two C-specific traps: switch fall-through (forgetting break runs cases together) and the off-by-one in for (i=0; i<n; i++) (it runs n times, indices 0..n-1). Braces { } delimit every block; a single statement can skip braces, but always use them for safety.`,
    howItWorks: `1. IF/ELSE: if (cond) { ... } else if (cond2) { ... } else { ... }. Braces are optional for one statement but always use them.
2. SWITCH: switch (expr) { case A: ...; break; case B: ...; break; default: ...; }. Without break, execution FALLS THROUGH to the next case. Works on int/char/enum, NOT floats or strings.
3. FOR: for (init; test; update) { ... }. Runs init once, then repeats {test -> body -> update} until test is false. for (i=0; i<n; i++) runs n times.
4. WHILE: while (cond) { ... } — checks BEFORE each iteration. If cond starts false, the body never runs.
5. DO-WHILE: do { ... } while (cond); — checks AFTER, so the body runs AT LEAST once. Note the trailing semicolon.
6. BREAK: exits the nearest loop or switch. CONTINUE: skips to the next loop iteration.
7. RETURN: exits the function immediately, optionally with a value.
8. GOTO: jumps to a label. Almost always avoid it — use functions/loops instead. Rare legit use: breaking out of nested loops.`,
    codeExamples: [
      {
        lang: "c",
        code: `#include <stdio.h>

int main(void) {
    // if / else if / else
    int score = 82;
    if (score >= 90) printf("A\\n");
    else if (score >= 80) printf("B\\n");   // prints
    else printf("C\\n");

    // switch — WITHOUT break, cases fall through!
    int day = 1;
    switch (day) {
        case 1: printf("Mon\\n"); break;     // remove break -> falls into case 2
        case 2: printf("Tue\\n"); break;
        default: printf("?\\n");
    }

    // for: runs n times, indices 0..n-1
    for (int i = 0; i < 3; i++) {
        printf("%d ", i);                    // 0 1 2
    }
    printf("\\n");

    // do-while: body runs at least once
    int n = 0;
    do {
        printf("once\\n");
        n++;
    } while (n < 0);                        // cond false, but it already ran
    return 0;
}`,
        output: `B
Mon
0 1 2
once`,
        note: "if/else if/else branch; switch falls through without break (the famous trap). for (i=0; i<n; i++) runs n times (0..n-1). do-while runs at least once. Always use braces."
      }
    ],
    marginNotes: [
      "Switch fall-through is the #1 C control-flow bug: forgetting `break` makes cases run into each other. Always end a case with break (or a comment `// fallthrough` if intentional).",
      "`for (i=0; i<n; i++)` runs n times with indices 0..n-1. Using `i <= n` runs n+1 times and often reads one past the array — an off-by-one buffer bug.",
      "do-while runs the body BEFORE testing, so it always executes at least once. Use it for 'ask once, repeat if needed' menus. Don't forget the trailing semicolon.",
      "Always use braces { } even for one-statement bodies. `if (x) y = 1;` is legal but breaks when you later add a line — `if (x) y = 1; z = 2;` makes z always run."
    ],
    commonMistakes: [
      "Forgetting `break` in a switch — cases fall through and run together.",
      "Using `i <= n` instead of `i < n` — runs one extra iteration, often past the array bounds.",
      "Skipping braces on a one-line if/for, then adding a line that silently runs unconditionally."
    ],
    relatedTopics: ["Operators & Expressions", "Functions & Recursion", "Arrays"],
    externalLinks: [
      { label: "cppreference: C Control Flow", url: "https://en.cppreference.com/w/c/language/statements" }
    ],
    mcqs: [
      {
        question: "What happens if you forget `break` in a switch case?",
        options: ["Compile error", "Execution falls through into the next case", "Only that case runs", "The switch is skipped"],
        answer: 1,
        explanations: ["It compiles.", "Correct — without break, execution continues into the next case label (fall-through), usually unintended. Always end a case with break (or document intentional fallthrough).", "Fall-through makes more run.", "It isn't skipped."],
        difficulty: "easy"
      },
      {
        question: "How many times does `for (i = 0; i < n; i++)` run, and what indices?",
        options: ["n times, indices 1..n", "n times, indices 0..n-1", "n-1 times", "n+1 times"],
        answer: 1,
        explanations: ["That's 1-based.", "Correct — it runs n times with i = 0, 1, ..., n-1. Using `i <= n` would run n+1 times and often read past the array.", "It runs n times.", "That's `i <= n`."],
        difficulty: "easy"
      },
      {
        question: "When does a do-while loop's body run?",
        options: ["Only if the condition is true", "At least once — the test is after the body", "Never if the condition is false", "Twice"],
        answer: 1,
        explanations: ["That's while.", "Correct — do-while checks the condition AFTER the body, so the body always runs at least once. Use it for 'do something, then repeat if needed'.", "It runs once even if false.", "Once, not twice."],
        difficulty: "medium"
      }
    ]
  }
];