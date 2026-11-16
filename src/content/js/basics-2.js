// JavaScript — more foundational "things you have to know" notes (part 2).
export default [
  {
    id: "operators-and-expressions",
    title: "Operators & Expressions",
    difficulty: "easy",
    definition: `Operators act on values. JS has arithmetic (+ - * / % **), comparison (< > <= >= == === != !==), logical (&& || !), bitwise (& | ^ ~ << >>), assignment (= += ...), and the ternary (cond ? a : b). Two JS traps: == coerces types, and + is overloaded for strings.`,
    coreUnderstanding: `JS operators look familiar but have two famous footguns. First, == does type coercion (0 == '' is true, '1' == 1 is true) — always use === which checks value AND type. Second, + is overloaded: with numbers it adds, with strings it concatenates (1 + 2 + '3' = '33'), so mixing types gives surprising results. Logical operators && and || short-circuit and return the operand value (not always a boolean), which enables idioms like value || default. Modern JS added ?? (nullish coalescing) for defaults that only trigger on null/undefined.`,
    howItWorks: `1. ARITHMETIC: + - * / % **. + is overloaded: number+number adds, but anything+string concatenates. ** is exponentiation (2**3=8).
2. COMPARISON: < > <= >= (coerce), == != (loose, coerces types — AVOID), === !== (strict, no coercion — PREFER).
3. LOGICAL: && (AND), || (OR), ! (NOT). Short-circuit. Return the operand value: 0 || 'hi' returns 'hi', null && x returns null.
4. NULLISH COALESCING: a ?? b — returns b only if a is null or undefined (NOT 0 or ''). Safer default than a || b for numbers/booleans.
5. OPTIONAL CHAINING: a?.b — returns undefined if a is null/undefined instead of throwing. Great for deep access: user?.address?.city.
6. BITWISE: & | ^ ~ << >>. Rarely used; >>> is unsigned right shift.
7. ASSIGNMENT: = and compound (+=, -=, *=, /=, **=, ??=).
8. TERNARY: cond ? a : b — an expression. const max = a > b ? a : b.
9. INCREMENT: ++x (pre), x++ (post). Avoid in mixed expressions.
10. TYPEOF: typeof x returns a type string ('number', 'string', 'boolean', 'undefined', 'object', 'function', 'symbol', 'bigint'). typeof null is 'object' (a famous bug).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// + is overloaded: number+string concatenates
console.log(1 + 2);        // 3   (number + number)
console.log(1 + 2 + '3');  // '33' ( (1+2) then + '3' -> string )
console.log('1' + 2);      // '12' (string + number -> string)

// == coerces (avoid); === checks value AND type
console.log(0 == false);   // true  (coercion!)
console.log(0 === false);  // false (different types)
console.log('1' == 1);     // true  (coercion!)
console.log('1' === 1);    // false

// || returns the operand value (not always boolean)
const name = '' || 'anon';   // 'anon' ('' is falsy)
const count = 0 ?? 10;        // 0   (?? only defaults on null/undefined)
const maybe = null ?? 10;    // 10

// optional chaining: safe deep access
const user = { address: { city: 'NYC' } };
console.log(user?.address?.city);     // 'NYC'
console.log(user?.profile?.city);     // undefined (no throw)

// ternary expression
const a = 10, b = 20;
console.log(a > b ? a : b);  // 20`,
        output: `3
33
12
true
false
true
false
NYC
undefined
20`,
        note: "+ concatenates if any operand is a string. == coerces (use ===). || returns operand value; ?? defaults only on null/undefined. ?. (optional chaining) is safe deep access. typeof null is 'object' (a JS bug)."
      }
    ],
    marginNotes: [
      "Always use === (strict, no coercion) over == (loose, coerces). `0 == ''` and `'1' == 1` are true under == — a major bug source.",
      "+ is overloaded: if ANY operand is a string, + concatenates. `1 + 2 + '3'` is '33' (left-to-right: 1+2=3, then 3+'3'='33').",
      "Use ?? (nullish coalescing) for defaults that should keep 0 or '' — `count ?? 10` keeps 0, while `count || 10` would replace 0. Use || only when 0/'' should be replaced.",
      "Optional chaining `a?.b` returns undefined instead of throwing when a is null/undefined — essential for deep property access like `user?.address?.city`."
    ],
    commonMistakes: [
      "Using == and getting surprised by coercion (`0 == ''` is true). Always use ===.",
      "Expecting `1 + 2 + '3'` to be '123' — it's '33' because + is left-to-right and 1+2=3 first.",
      "Using `value || default` when value can be 0 or '' (they're falsy and get replaced) — use `value ?? default` instead."
    ],
    relatedTopics: ["Variables & Types", "Control Flow & Loops", "Coercion & Truthiness"],
    externalLinks: [
      { label: "MDN: Expressions & Operators", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators" }
    ],
    mcqs: [
      {
        question: "What does `0 == false` return, and why?",
        options: ["false — different types", "true — == coerces types before comparing", "an error", "undefined"],
        answer: 1,
        explanations: ["=== would give false.", "Correct — == coerces: 0 and false both become the same after coercion, so it's true. This is why you should use === (no coercion).", "No error.", "It returns a boolean."],
        difficulty: "easy"
      },
      {
        question: "What is `1 + 2 + '3'` in JavaScript?",
        options: ["'123'", "'33' — + is left-to-right: 1+2=3, then 3+'3'='33'", "6", "an error"],
        answer: 1,
        explanations: ["That would need all strings first.", "Correct — + evaluates left-to-right: 1+2 = 3 (number), then 3 + '3' = '33' (string concatenation). To get '123' you'd write '' + 1 + 2 + '3'.", "It's a string.", "No error."],
        difficulty: "medium"
      },
      {
        question: "When should you use `??` instead of `||` for a default?",
        options: ["Never — they're the same", "When the value can legitimately be 0 or '' and you want to keep them (|| would replace them)", "When the value is a string", "When the value is an object"],
        answer: 1,
        explanations: ["They differ on 0/''/false.", "Correct — || treats 0, '', false, null, undefined as falsy and replaces them. ?? only replaces null and undefined, so `count ?? 10` keeps 0. Use ?? when 0/'' are valid.", "Type is unrelated.", "Object type is unrelated."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "control-flow-and-loops",
    title: "Control Flow & Loops",
    difficulty: "easy",
    definition: `Control flow decides which code runs and how often. JS has conditionals (if / else if / else, switch), loops (for, while, do-while, for...of, for...in), and jump statements (break, continue, return). Blocks use braces { }; statements end with ; (or newline via ASI).`,
    coreUnderstanding: `JS control flow is C-like: if / else if / else branch, switch jumps to a case (and falls through without break), for / while / do-while repeat. JS adds iteration forms: for...of (values of arrays/strings/iterables) and for...in (keys of objects — a common source of bugs when used on arrays). The two traps: switch fall-through (forget break) and using for...in on an array (it iterates indices/keys, often including inherited ones). Prefer for...of for arrays and .forEach / .map / .filter for functional iteration.`,
    howItWorks: `1. IF/ELSE: if (cond) { } else if (cond2) { } else { }. Always use braces.
2. SWITCH: switch (x) { case A: ...; break; case B: ...; break; default: ...; }. Without break, falls through. Uses === comparison.
3. FOR (classic): for (let i = 0; i < n; i++) { } — C-style counter.
4. WHILE: while (cond) { } — checks before; may run zero times.
5. DO-WHILE: do { } while (cond); — checks after; runs at least once.
6. FOR...OF: for (const x of arr) { } — iterates VALUES of arrays, strings, Sets, Maps. The modern, preferred array loop.
7. FOR...IN: for (const k in obj) { } — iterates KEYS of an object. DO NOT use on arrays (iterates indices as strings + inherited keys).
8. BREAK: exits the loop. CONTINUE: skips to next iteration. RETURN: exits the function.
9. FUNCTIONAL LOOPS: arr.forEach(fn), arr.map(fn), arr.filter(fn), arr.reduce(fn, init) — often cleaner than for loops.
10. LABELS: outer: for (...) { for (...) { break outer; } } — rare, for nested loop control.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// if / else if / else
const score = 82;
if (score >= 90) console.log("A");
else if (score >= 80) console.log("B");   // B
else console.log("C");

// switch — without break, cases fall through
const day = "mon";
switch (day) {
  case "mon": console.log("Monday"); break;   // remove break -> falls into "tue"
  case "tue": console.log("Tuesday"); break;
  default: console.log("?");
}

// for...of — VALUES (preferred for arrays)
for (const x of [10, 20, 30]) console.log(x);   // 10 20 30

// for...in — KEYS (use on objects, NOT arrays)
const obj = { a: 1, b: 2 };
for (const k in obj) console.log(k, obj[k]);    // a 1  b 2

// functional iteration (often cleaner)
[1, 2, 3].map(x => x * 2).filter(x => x > 2).forEach(x => console.log(x));  // 4 6`,
        output: `B
Monday
10
20
30
a 1
b 2
4
6`,
        note: "if/else if/else branch; switch falls through without break. for...of iterates VALUES (use for arrays); for...in iterates KEYS (use for objects, NOT arrays). Functional methods (map/filter/forEach) are often cleaner."
      }
    ],
    marginNotes: [
      "Use for...of for arrays (iterates values) and for...in for objects (iterates keys). Using for...in on an array iterates indices as strings and may include inherited keys — a classic bug.",
      "Switch falls through without break, just like C/Java. Always end a case with break (or a comment) unless fall-through is intentional.",
      "Prefer functional iteration (map, filter, forEach, reduce) over classic for loops when you're transforming/selecting — it's clearer and avoids off-by-one index bugs.",
      "while checks before the body (may run zero times); do-while checks after (runs at least once). Pick based on whether you need at least one iteration."
    ],
    commonMistakes: [
      "Using for...in on an array — iterates indices as strings and inherited keys. Use for...of for arrays.",
      "Forgetting break in a switch — cases fall through and run together.",
      "Using a classic for loop with index when for...of or .map would be clearer and less error-prone."
    ],
    relatedTopics: ["Operators & Expressions", "Arrays & Array Methods", "Objects"],
    externalLinks: [
      { label: "MDN: Loops and iteration", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" }
    ],
    mcqs: [
      {
        question: "Which loop should you use to iterate an array's VALUES?",
        options: ["for...in", "for...of (iterates values)", "while only", "do-while"],
        answer: 1,
        explanations: ["for...in iterates KEYS, not values — wrong for arrays.", "Correct — for...of iterates the values of arrays, strings, Sets, Maps. for...in iterates keys (use it for objects, not arrays).", "while works but is less clean.", "do-while is for repeat-until patterns."],
        difficulty: "easy"
      },
      {
        question: "What does for...in iterate over?",
        options: ["Array values", "Object keys (property names)", "Only numbers", "Inherited prototypes only"],
        answer: 1,
        explanations: ["It iterates keys, not array values.", "Correct — for...in iterates the enumerable KEYS of an object (including inherited ones). That's why it's wrong for arrays (indices become string keys).", "Keys can be any string.", "Inherited keys are included, but own keys too."],
        difficulty: "medium"
      },
      {
        question: "What happens without `break` in a switch case?",
        options: ["Compile error", "Execution falls through into the next case", "Only that case runs", "The switch is skipped"],
        answer: 1,
        explanations: ["No error — it's legal.", "Correct — without break, execution continues into the next case (fall-through), usually unintended. Always end a case with break.", "Fall-through makes more run.", "It isn't skipped."],
        difficulty: "easy"
      }
    ]
  }
];