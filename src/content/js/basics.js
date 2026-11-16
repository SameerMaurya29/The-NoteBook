// JavaScript — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "language-basics",
  title: "JavaScript Basics — Why & How",
  difficulty: "easy",
  definition: `JavaScript is the behavior layer of the web — the only language browsers run natively. You use it to make pages interactive, build web apps, and (via Node.js) write servers, CLIs, and build tools.`,
  coreUnderstanding: `JavaScript runs in every browser and (via Node.js/Deno/Bun) on servers. It's dynamically typed, single-threaded with an event loop (async via callbacks, promises, async/await), and prototype-based for OOP. You reach for JS for any web interactivity, SPAs (React/Vue), backends (Node/Express), and tooling. The trade-offs: dynamic typing means runtime errors that static languages catch at compile time, and the event loop's concurrency model (callbacks, microtasks) trips up beginners. Modern JS (ES6+) added \`let\`/\`const\`, arrow functions, classes, modules, and async/await — making it far more usable than its 1995 origins.`,
  howItWorks: `1. WHY: it's the only browser language; one language across front and back (Node). Huge ecosystem (npm). Trade-off: dynamic typing, event-loop quirks.
2. WHERE: browser interactivity, SPAs (React/Vue/Svelte), backends (Node/Express), CLIs, build tools, desktop apps (Electron).
3. STATEMENTS & SEMICOLONS: JS uses semicolons \`;\` to end statements, but ASI (Automatic Semicolon Insertion) inserts them in some cases. ALWAYS write them explicitly — relying on ASI causes subtle bugs (e.g., returning a value on the next line).
4. BRACES \`{ }\` delimit function bodies, blocks (\`if\`/\`for\`), and OBJECT LITERALS \`{ a: 1 }\`. Every \`{\` needs a matching \`}\`. Note: an object literal at the start of a line can be confused with a block — start with \`(\` or use semicolons carefully.
5. COMMAS separate: array items \`[1, 2, 3]\`, object properties \`{ a: 1, b: 2 }\`, function params \`f(a, b)\`, and arguments. A trailing comma is allowed (and handy for diffs).
6. VARIABLES: \`let\` (reassignable, block-scoped), \`const\` (can't reassign, block-scoped — prefer it), \`var\` (function-scoped, hoisted — avoid). Always declare; undeclared assignment creates a global (bad).
7. FUNCTIONS: three forms — declaration \`function f() {}\`, expression \`const f = function() {}\`, arrow \`const f = (x) => x + 1\`. Arrows have no own \`this\` (great for callbacks, bad for methods).
8. TYPES: primitives (string, number, boolean, null, undefined, symbol, bigint) vs objects. \`typeof\` checks type; \`===\` checks value AND type (always prefer \`===\` over \`==\`).
9. ASYNC: the event loop handles concurrency via callbacks → promises → async/await. \`await\` pauses a function until a promise settles, without blocking the thread.
10. MODULES: \`export\`/\`import\` (ES modules) split code into files.`,
  codeExamples: [
    {
      lang: "javascript",
      code: `// statements end with ;  — write them explicitly (ASI is unreliable)
const x = 5;
let y = 10;
y = y + x;          // reassignment OK (let)

// braces delimit blocks AND object literals
if (x > 3) {                  // block braces
  console.log("big");
}
const point = { x: 1, y: 2 }; // object literal — commas separate properties

// functions: declaration, expression, arrow
function add(a, b) { return a + b; }          // declaration
const sub = function (a, b) { return a - b; }; // expression (note ; )
const mul = (a, b) => a * b;                   // arrow (implicit return)

console.log(add(2, 3), sub(5, 2), mul(4, 4));  // 5 3 16

// === checks value AND type; == coerces (avoid)
console.log(0 === false);   // false  (different types)
console.log(0 == false);    // true   (coercion — surprising)

// async: await pauses without blocking the thread
async function fetchUser(id) {
  const res = await fetch('/api/users/' + id);
  return res.json();
}`,
      output: `big
5 3 16
false
true`,
      note: "JS statements end with ; (write them explicitly — ASI is unreliable). Braces { } delimit blocks and object literals. Commas separate items/properties/params. Prefer const, use === over ==, and arrow functions for short callbacks."
    }
  ],
  marginNotes: [
    "Always write semicolons explicitly. Relying on ASI causes subtle bugs — e.g. `return\\nx + 1` returns undefined because ASI inserts a semicolon after `return`.",
    "Braces { } are overloaded: they delimit blocks (if/for bodies, functions) AND object literals { a: 1 }. At the start of a statement, `{` is read as a block — wrap object literals in `()` when ambiguous.",
    "Prefer `const` by default, `let` when reassigning, and never `var` (it's function-scoped and hoisted, causing confusion). Undeclared assignment leaks a global.",
    "Always use === (value + type). == coerces types (`0 == ''` is true) and causes hard-to-find bugs. The only exception is checking `x == null` to catch both null and undefined."
  ],
  commonMistakes: [
    "Relying on ASI and omitting semicolons — subtle bugs when a line starts with `(`, `[`, or a template literal.",
    "Using `==` instead of `===` — type coercion makes `0 == ''` and `'1' == 1` true unexpectedly.",
    "Using `var` (function-scoped, hoisted) instead of `let`/`const` (block-scoped) — causes closure and loop bugs.",
    "Using arrow functions as object methods — arrows have no own `this`, so `this` won't point to the object."
  ],
  relatedTopics: ["Variables & Types", "Functions & Closures", "The Event Loop & Async"],
  externalLinks: [
    { label: "MDN: JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
    { label: "You Don't Know JS", url: "https://github.com/getify/You-Dont-Know-JS" }
  ],
  mcqs: [
    {
      question: "Why should you write semicolons explicitly in JavaScript?",
      options: ["It's required by the language", "ASI (Automatic Semicolon Insertion) is unreliable and can cause subtle bugs, e.g. `return\\nx` returning undefined", "It makes code faster", "It's required by the browser"],
      answer: 1,
      explanations: ["Semicolons are technically optional due to ASI.", "Correct — ASI inserts semicolons automatically but inconsistently, causing bugs like `return\\nx + 1` returning undefined. Writing them explicitly removes a whole class of subtle errors.", "No speed difference.", "Browsers accept either, but explicit is safer."],
      difficulty: "medium"
    },
    {
      question: "Why prefer `===` over `==`?",
      options: ["`===` is faster", "`==` coerces types (`0 == ''` is true), causing bugs; `===` checks value AND type", "`===` is shorter", "`==` is deprecated"],
      answer: 1,
      explanations: ["Speed is negligible.", "Correct — `==` coerces operands before comparing, so `0 == ''` and `'1' == 1` are true unexpectedly. `===` compares without coercion. Always use `===` (except `x == null` to catch both null and undefined).", "They're the same length.", "`==` isn't deprecated, just dangerous."],
      difficulty: "medium"
    },
    {
      question: "Why avoid arrow functions for object methods?",
      options: ["They're slower", "They have no own `this` — `this` won't bind to the object the method is called on", "They can't return values", "They require semicolons"],
      answer: 1,
      explanations: ["Speed is the same.", "Correct — arrow functions don't bind their own `this`; they inherit it from the enclosing scope. So `obj = { say: () => this.x }` won't see `obj.x`. Use regular methods for object methods.", "They return fine.", "Semicolons are unrelated."],
      difficulty: "hard"
    }
  ]
};