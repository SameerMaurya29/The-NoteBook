// JS topics part 1: Types, Scope, Functions, OOP (topics 1-11)
export default [
  {
    id: "types-coercion",
    title: "Types & Type Coercion",
    difficulty: "hard",
    definition: `JavaScript has 7 primitive types (string, number, bigint, boolean, undefined, null, symbol) and object. Coercion converts between types automatically (implicit) or explicitly (Number(x)). == does loose comparison (with coercion); === does strict (no coercion).`,
    coreUnderstanding: `JS is dynamically typed (variables have no type; values do). Primitives are immutable (passed by value); objects are mutable (passed by reference). Coercion is the #1 source of JS confusion. Implicit coercion (==, +, if) follows complex rules: '5' + 3 = '53' (string), '5' - 3 = 2 (number). The advice: always use === (strict, no coercion) to avoid surprises. Understand coercion to debug == and + edge cases. Falsy values: false, 0, '', null, undefined, NaN, 0n. Everything else is truthy (including '0', [], {}). The typeof operator is mostly reliable but has quirks: typeof null === 'object' (a bug), typeof function === 'function'.`,
    howItWorks: `1. Primitives: string, number, bigint, boolean, undefined, null, symbol.
2. Object: everything else (objects, arrays, functions, dates, regex).
3. == (loose, coerces) vs === (strict, no coercion) — always use ===.
4. Coercion rules: + prefers string (if either is string); -, *, / prefer number.
5. Falsy: false, 0, '', null, undefined, NaN, 0n. Truthy: everything else.
6. typeof: 'string', 'number', 'boolean', 'undefined', 'object' (null!), 'function', 'symbol', 'bigint'.
7. Explicit coercion: String(x), Number(x), Boolean(x), +x, x.toString().`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// == vs === (always use ===)
5 == '5'   // true (coerces '5' to 5)
5 === '5'  // false (different types)
null == undefined  // true (loose)
null === undefined // false (strict)

// + vs - coercion
'5' + 3   // '53' (string — + prefers string)
'5' - 3   // 2 (number — - coerces to number)
'5' + '3' // '53'

// Falsy vs truthy
if ('')  { } // false (empty string is falsy)
if ('0') { } // true  ('0' is a non-empty string — truthy!)
if (0)   { } // false
if ([])  { } // true  (arrays are truthy, even empty)
if ({})  { } // true  (objects are truthy, even empty)

// typeof quirks
typeof 'hi'      // 'string'
typeof 42        // 'number'
typeof undefined // 'undefined'
typeof null      // 'object' (a bug — check with === null)
typeof function(){} // 'function'
typeof []        // 'object' (arrays are objects)
typeof {}        // 'object'

// Explicit coercion
String(123)   // '123'
Number('42')  // 42
Boolean('')   // false
+'42'         // 42 (unary +)
!!'hi'        // true (double negation)`,
        note: "Always use === (strict, no coercion). == coerces, causing surprises (5 == '5' is true). typeof null is 'object' (a bug) — check null with === null. '0' and [] are truthy (common gotchas)."
      }
    ],
    marginNotes: [
      "Always use === (strict, no coercion). == coerces, causing surprises (5 == '5' is true, null == undefined is true).",
      "+ prefers string ('5' + 3 = '53'); -, *, / prefer number ('5' - 3 = 2). This is the #1 coercion gotcha.",
      "Falsy: false, 0, '', null, undefined, NaN, 0n. Truthy: everything else — including '0', [], {} (common surprises).",
      "typeof null is 'object' (a legacy bug) — check null with x === null. typeof [] is 'object' — use Array.isArray()."
    ],
    commonMistakes: [
      "Using == instead of === — coercion causes subtle bugs (5 == '5', null == undefined).",
      "Expecting '0' or [] to be falsy — they're truthy (non-empty string, object). Only '', 0, null, undefined, NaN are falsy.",
      "Using typeof for null (it's 'object') or arrays (it's 'object') — use === null and Array.isArray()."
    ],
    relatedTopics: ["Equality & NaN", "Objects & References"],
    externalLinks: [
      { label: "MDN: Type coercion", url: "https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion" },
      { label: "MDN: typeof", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof" }
    ],
    mcqs: [
      { question: "What does 5 == '5' return?", options: ["false", "true (== coerces)", "TypeError", "undefined"], answer: 1, explanations: ["=== would be false.", "Correct — == coerces '5' to 5, so they're equal. Use === to avoid this.", "No error.", "No error."], difficulty: "easy" },
      { question: "What does '5' + 3 return?", options: ["8", "'53' (+ prefers string)", "TypeError", "NaN"], answer: 1, explanations: ["Not 8.", "Correct — + coerces to string: '5' + 3 = '53'. (But '5' - 3 = 2.)", "No error.", "Not NaN."], difficulty: "medium" },
      { question: "Is '0' truthy or falsy?", options: ["Falsy", "Truthy (it's a non-empty string)", "Depends", "Error"], answer: 1, explanations: ["Not falsy.", "Correct — '0' is a non-empty string, so it's truthy. Only '' (empty string) is falsy.", "Always truthy.", "No error."], difficulty: "medium" }
    ]
  },
  {
    id: "scope-closures",
    title: "Scope & Closures",
    difficulty: "hard",
    definition: `Scope is variable visibility: global, function, and block (let/const). A closure is a function that remembers its outer variables even after the outer function returns. Closures enable data privacy, currying, and callbacks.`,
    coreUnderstanding: `Scope determines where a variable is accessible. var is function-scoped (hoisted, can be accessed before declaration — undefined). let and const are block-scoped (temporal dead zone — can't access before declaration). A closure is a function plus its lexical environment (the variables in scope when it was created). Even after the outer function returns, the inner function remembers its outer variables. This is powerful: data privacy (private variables via closures), currying (function factories), and event callbacks (the callback remembers its context). Closures are why loops with var + setTimeout print the same number (the callback captures the variable, not the value) — fix with let or an IIFE. Every function in JS is a closure (it closes over its outer scope).`,
    howItWorks: `1. Global scope — accessible everywhere.
2. Function scope — var (hoisted, function-scoped).
3. Block scope — let, const (temporal dead zone, block-scoped).
4. Closure — a function + its lexical environment (remembers outer variables).
5. The inner function captures the variable, not the value (loop gotcha).
6. Use cases: data privacy, currying, callbacks, memoization.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Closure: data privacy (private variables)
function createCounter() {
  let count = 0; // private — not accessible outside
  return {
    increment: () => ++count,
    get: () => count
  };
}
const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.get()); // 2
// counter.count; // undefined — count is private

// Closure: function factory (currying)
function multiplier(factor) {
  return (x) => x * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15

// The loop gotcha (var captures the variable)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3 (not 0, 1, 2)
}
// Fix with let (block-scoped — each iteration has its own i)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}`,
        note: "A closure remembers its outer variables even after the outer function returns. The loop gotcha: var captures the variable (all callbacks see the final i); let creates a new binding per iteration (each callback sees its own i)."
      }
    ],
    marginNotes: [
      "var is function-scoped (hoisted, accessible before declaration — undefined); let/const are block-scoped (temporal dead zone — can't access before declaration).",
      "A closure is a function + its lexical environment. The inner function remembers outer variables even after the outer function returns (data privacy, currying).",
      "The loop gotcha: var i captures the variable (all callbacks see the final i = 3); let i creates a new binding per iteration (each sees its own i). Fix with let.",
      "Every function in JS is a closure — it closes over its outer scope. This is why callbacks remember their context."
    ],
    commonMistakes: [
      "Using var in loops with callbacks (setTimeout) — all callbacks see the final value. Use let (block-scoped, new binding per iteration).",
      "Not understanding the temporal dead zone — let/const can't be accessed before declaration (ReferenceError), unlike var (undefined).",
      "Creating closures in loops without let or IIFE — memory leaks or incorrect values."
    ],
    relatedTopics: ["var let const", "Functions & this", "Event Loop"],
    externalLinks: [
      { label: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" },
      { label: "MDN: Scope", url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope" }
    ],
    mcqs: [
      { question: "What is a closure?", options: ["A function that returns immediately", "A function + its lexical environment (remembers outer variables)", "A private class", "A loop"], answer: 1, explanations: ["That's an IIFE.", "Correct — a closure is a function plus the variables in scope when it was created. It remembers them after the outer function returns.", "Related (data privacy) but not the definition.", "Not a loop."], difficulty: "medium" },
      { question: "Why does var in a loop with setTimeout print the final value?", options: ["A bug", "var captures the variable (all callbacks see the final i); let creates a new binding per iteration", "setTimeout is broken", "It doesn't"], answer: 1, explanations: ["Not a bug — by design.", "Correct — var is function-scoped (one binding); let is block-scoped (new binding per iteration). Use let.", "setTimeout works.", "It does (3, 3, 3)."], difficulty: "hard" },
      { question: "What's the temporal dead zone?", options: ["A runtime error", "let/const can't be accessed before declaration (ReferenceError)", "A performance issue", "A scope type"], answer: 1, explanations: ["It's a concept, not an error.", "Correct — let/const are in the TDZ from the start of the block until the declaration; accessing them throws ReferenceError.", "Not performance.", "Not a scope."], difficulty: "medium" }
    ]
  },
  {
    id: "var-let-const",
    title: "var vs let vs const",
    difficulty: "medium",
    definition: `var: function-scoped, hoisted (undefined), reassignable, redeclarable. let: block-scoped, temporal dead zone, reassignable, not redeclarable. const: block-scoped, must initialize, not reassignable (but objects are mutable). Use const by default, let when reassigning, never var.`,
    coreUnderstanding: `var is the old way (pre-ES6) — function-scoped, hoisted (accessible before declaration, value undefined), can be redeclared (silent bugs). let and const (ES6) are block-scoped and in the temporal dead zone (can't access before declaration — ReferenceError). const must be initialized and can't be reassigned — BUT if it holds an object, the object's properties can be mutated (const binds the variable, not the value). The rule: use const by default (intent: this won't change), let when you need to reassign (loops, counters), never var (legacy, has quirks). const makes code more predictable (you know the binding won't change). For immutable objects, use Object.freeze() or immutable libraries (Immer).`,
    howItWorks: `1. var: function-scoped, hoisted (undefined), reassignable, redeclarable.
2. let: block-scoped, temporal dead zone, reassignable, not redeclarable.
3. const: block-scoped, must initialize, not reassignable (objects are mutable).
4. const binds the variable, not the value — const obj = {}; obj.x = 1; // OK.
5. Use const by default, let when reassigning, never var.
6. Object.freeze(obj) — makes an object immutable (shallow).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// var: function-scoped, hoisted (undefined)
function f() {
  console.log(x); // undefined (hoisted, not error)
  var x = 5;
  if (true) { var x = 10; } // same x (function-scoped)
  console.log(x); // 10
}

// let: block-scoped, temporal dead zone
function g() {
  // console.log(y); // ReferenceError (TDZ)
  let y = 5;
  if (true) { let y = 10; } // different y (block-scoped)
  console.log(y); // 5
}

// const: not reassignable, but objects are mutable
const z = 5;
// z = 10; // TypeError (can't reassign)
const obj = { x: 1 };
obj.x = 2; // OK (the object is mutable, the binding isn't)
// obj = {}; // TypeError (can't reassign the binding)

// Rule: const by default, let when reassigning
const config = { url: '...' }; // won't reassign the binding
let count = 0; // will reassign
for (let i = 0; i < 10; i++) { } // let for loop counters

// Object.freeze (shallow immutability)
const frozen = Object.freeze({ x: 1 });
// frozen.x = 2; // silently fails (strict mode: TypeError)`,
        note: "const binds the variable, not the value — const obj = {}; obj.x = 1 is OK (the object is mutable). Use const by default, let when reassigning, never var. Object.freeze for immutability (shallow)."
      }
    ],
    marginNotes: [
      "Use const by default (intent: this binding won't change), let when you need to reassign (loops, counters), never var (legacy, has hoisting/redeclaration quirks).",
      "const binds the variable, not the value — const obj = {}; obj.x = 1 is OK (the object is mutable). For immutability, use Object.freeze() (shallow) or Immer.",
      "var is function-scoped and hoisted (undefined); let/const are block-scoped and in the temporal dead zone (ReferenceError if accessed before declaration).",
      "var can be redeclared (silent bugs); let/const can't be redeclared in the same scope (SyntaxError — catches typos)."
    ],
    commonMistakes: [
      "Thinking const makes objects immutable — it doesn't; only the binding is const. Use Object.freeze() for immutability.",
      "Using var (legacy) instead of let/const — var has hoisting and redeclaration quirks that cause bugs.",
      "Using let for everything — use const by default (intent: won't change); let only when you need to reassign."
    ],
    relatedTopics: ["Scope & Closures", "Objects & References"],
    externalLinks: [
      { label: "MDN: let", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
      { label: "MDN: const", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" }
    ],
    mcqs: [
      { question: "Which should you use by default?", options: ["var", "let", "const", "all the same"], answer: 2, explanations: ["Legacy.", "When reassigning.", "Correct — const by default (intent: won't change); let when reassigning; never var.", "They differ."], difficulty: "easy" },
      { question: "Does const make objects immutable?", options: ["Yes", "No — only the binding is const; the object's properties can change", "Only with freeze", "Only arrays"], answer: 1, explanations: ["It doesn't.", "Correct — const obj = {}; obj.x = 1 is OK. Use Object.freeze() for immutability.", "freeze is separate.", "Same for arrays."], difficulty: "medium" },
      { question: "Can var be redeclared in the same scope?", options: ["No", "Yes (silently — can cause bugs)", "Only with let", "Only in functions"], answer: 1, explanations: ["let/const can't.", "Correct — var can be redeclared silently (bugs); let/const throw SyntaxError (catches typos).", "var can.", "var can."], difficulty: "medium" }
    ]
  },
  {
    id: "hoisting",
    title: "Hoisting",
    difficulty: "medium",
    definition: `Hoisting moves declarations to the top of their scope during compilation. var declarations are hoisted (initialized as undefined). Function declarations are fully hoisted (usable before declaration). let/const are hoisted but in the temporal dead zone (not initialized).`,
    coreUnderstanding: `Hoisting is a mental model — JS appears to move declarations to the top of their scope. var x is hoisted and initialized as undefined (so console.log(x) before var x prints undefined, not an error). Function declarations (function foo() {}) are fully hoisted — the entire function is available before its declaration. let/const are hoisted but NOT initialized (temporal dead zone) — accessing them before the declaration throws ReferenceError. Function expressions (const foo = function() {}) are NOT hoisted (the variable is, but the assignment isn't — it's undefined until the line runs). Hoisting explains why code 'works' before the declaration (functions) or gives undefined (var). To avoid confusion: declare variables at the top, use let/const (TDZ catches errors early).`,
    howItWorks: `1. var x — hoisted, initialized as undefined.
2. function foo() {} — fully hoisted (usable before declaration).
3. const foo = function() {} — variable hoisted, assignment not (undefined before line).
4. let/const — hoisted but in TDZ (ReferenceError before declaration).
5. Function declarations vs expressions: declarations hoist; expressions don't.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// var: hoisted, initialized as undefined
console.log(x); // undefined (hoisted, not error)
var x = 5;
console.log(x); // 5

// Function declaration: fully hoisted
foo(); // 'hello' (usable before declaration)
function foo() { console.log('hello'); }

// Function expression: NOT hoisted (variable is, assignment isn't)
bar(); // TypeError: bar is not a function
var bar = function() { console.log('hello'); };

// let/const: temporal dead zone (ReferenceError)
// console.log(y); // ReferenceError (TDZ)
let y = 5;

// Hoisting in action: this 'works' but is confusing
function example() {
  console.log(a); // undefined
  var a = 10;
}`,
        note: "Function declarations (function foo() {}) are fully hoisted — usable before declaration. Function expressions (const foo = function() {}) are NOT — the variable is hoisted (undefined) but the assignment isn't. Use let/const (TDZ catches errors)."
      }
    ],
    marginNotes: [
      "Function declarations (function foo() {}) are fully hoisted — usable before declaration. Function expressions (const foo = function() {}) are NOT — the variable is hoisted (undefined), the assignment isn't.",
      "var is hoisted and initialized as undefined (so it's undefined before the line, not an error). let/const are hoisted but in the TDZ (ReferenceError before the line).",
      "Hoisting is a mental model — JS doesn't actually move code; the compiler processes declarations first. But thinking of it as 'moving to the top' explains the behavior.",
      "To avoid hoisting confusion: declare variables at the top of their scope, use let/const (TDZ catches errors early), prefer function declarations (they hoist)."
    ],
    commonMistakes: [
      "Calling a function expression before its declaration — TypeError (the variable is undefined, not a function). Use function declarations if you need hoisting.",
      "Expecting let/const to be undefined before declaration (like var) — they throw ReferenceError (temporal dead zone).",
      "Relying on hoisting (using variables/functions before declaration) — confusing; declare at the top."
    ],
    relatedTopics: ["var let const", "Scope & Closures", "Functions & this"],
    externalLinks: [
      { label: "MDN: Hoisting", url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" }
    ],
    mcqs: [
      { question: "Are function declarations hoisted?", options: ["No", "Yes — fully (usable before declaration)", "Only var functions", "Only in strict mode"], answer: 1, explanations: ["They are.", "Correct — function foo() {} is fully hoisted; you can call it before the declaration.", "All function declarations.", "Always."], difficulty: "medium" },
      { question: "Are function expressions hoisted?", options: ["Yes", "No — the variable is hoisted (undefined), the assignment isn't", "Only const", "Only let"], answer: 1, explanations: ["They're not.", "Correct — const foo = function() {} — foo is undefined before the line (TypeError if called).", "Same for var.", "Same for let."], difficulty: "medium" },
      { question: "What happens if you access let before declaration?", options: ["undefined", "ReferenceError (temporal dead zone)", "null", "0"], answer: 1, explanations: ["That's var.", "Correct — let/const are in the TDZ; accessing before declaration throws ReferenceError (unlike var's undefined).", "Not null.", "Not 0."], difficulty: "medium" }
    ]
  },
  {
    id: "this-keyword",
    title: "The this Keyword",
    difficulty: "hard",
    definition: `this refers to the object executing the current function. Its value depends on the call site: method (the object), function (undefined in strict mode, global otherwise), arrow (lexical — the outer this), constructor (the new instance), call/apply/bind (explicit).`,
    coreUnderstanding: `this is NOT the function's owner — it's determined by HOW the function is called. (1) Method call (obj.method()) — this is obj. (2) Function call (foo()) — this is undefined (strict mode) or the global object (window/globalThis). (3) Arrow function — this is lexical (the outer function's this, not its own). (4) Constructor (new Foo()) — this is the new instance. (5) call/apply/bind — this is explicitly set. The #1 confusion: callbacks lose this (a method passed as a callback is called as a function, so this is undefined). Fix with arrow functions (lexical this) or bind. Arrow functions don't have their own this — they use the enclosing scope's this, making them perfect for callbacks. class methods use this (the instance), but if you extract a method, this is lost (bind or arrow).`,
    howItWorks: `1. obj.method() — this is obj (method call).
2. foo() — this is undefined (strict) or global (non-strict).
3. () => {} — this is lexical (the outer this, not its own).
4. new Foo() — this is the new instance.
5. fn.call(obj, args) / fn.apply(obj, [args]) — explicit this.
6. fn.bind(obj) — permanently bound this.
7. Callbacks lose this (called as functions) — fix with arrow or bind.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Method call: this is the object
const obj = {
  name: 'Alice',
  greet() { console.log(this.name); } // this = obj
};
obj.greet(); // 'Alice'

// Function call: this is undefined (strict) or global
function show() { console.log(this); }
show(); // undefined (strict) or window/globalThis

// Arrow function: this is lexical (outer this)
const obj2 = {
  name: 'Bob',
  greet: () => console.log(this.name) // this = outer (window)
};
obj2.greet(); // undefined (arrow doesn't have its own this)

// Callback loses this (the #1 gotcha)
class Counter {
  constructor() { this.count = 0; }
  start() {
    setInterval(function() {
      this.count++; // this is undefined (function call)!
    }, 1000);
  }
}
// Fix with arrow (lexical this):
start() {
  setInterval(() => { this.count++; }, 1000); // this = the instance
}

// Explicit this: call/apply/bind
function greet(greeting) { console.log(greeting + ', ' + this.name); }
greet.call({ name: 'Alice' }, 'Hi');    // 'Hi, Alice'
greet.apply({ name: 'Alice' }, ['Hi']); // 'Hi, Alice'
const bound = greet.bind({ name: 'Alice' });
bound('Hi'); // 'Hi, Alice'`,
        note: "this depends on HOW the function is called. Method call → the object. Function call → undefined (strict). Arrow → lexical (outer this). Callbacks lose this — fix with arrow functions (lexical this) or bind."
      }
    ],
    marginNotes: [
      "this depends on HOW the function is called, not where it's defined. Method call (obj.method()) → obj. Function call (foo()) → undefined (strict) or global.",
      "Callbacks lose this — a method passed as a callback is called as a function (this is undefined). Fix with arrow functions (lexical this) or bind.",
      "Arrow functions don't have their own this — they use the enclosing scope's this. Perfect for callbacks (they keep the outer this).",
      "call/apply/bind set this explicitly: fn.call(obj, arg), fn.apply(obj, [args]), fn.bind(obj) (returns a bound function)."
    ],
    commonMistakes: [
      "Using a regular function as a callback and expecting this to be the instance — it's undefined (function call). Use an arrow function (lexical this).",
      "Extracting a method (const fn = obj.method; fn()) — this is lost (it's a function call now). Bind it or use an arrow.",
      "Expecting arrow functions to have their own this — they don't; they use the outer this (can't bind them)."
    ],
    relatedTopics: ["Arrow Functions", "Classes & Prototypes", "Scope & Closures"],
    externalLinks: [
      { label: "MDN: this", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" },
      { label: "MDN: Arrow functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" }
    ],
    mcqs: [
      { question: "What determines this?", options: ["Where the function is defined", "How the function is called (the call site)", "The function name", "The file"], answer: 1, explanations: ["Not the definition.", "Correct — this depends on the call: method → object, function → undefined, arrow → lexical.", "Not the name.", "Not the file."], difficulty: "hard" },
      { question: "Why do callbacks lose this?", options: ["A bug", "They're called as functions (this is undefined); fix with arrow or bind", "They're async", "They're closures"], answer: 1, explanations: ["Not a bug — by design.", "Correct — a callback is called as a function (not a method), so this is undefined. Arrow functions (lexical this) or bind fix it.", "Not about async.", "Closures are related but different."], difficulty: "hard" },
      { question: "Do arrow functions have their own this?", options: ["Yes", "No — they use the enclosing scope's this (lexical)", "Only in classes", "Only in strict mode"], answer: 1, explanations: ["They don't.", "Correct — arrows don't have their own this; they use the outer this. Perfect for callbacks (keep the instance's this).", "Always lexical.", "Always lexical."], difficulty: "medium" }
    ]
  },
  {
    id: "arrow-functions",
    title: "Arrow Functions",
    difficulty: "medium",
    definition: `Arrow functions (() => {}) are a concise function syntax with lexical this (no own this, arguments, super, or new.target). They're shorter and solve the callback this problem. But they can't be constructors or methods that need their own this.`,
    coreUnderstanding: `Arrow functions are concise and have lexical this — they don't bind their own this, arguments, super, or new.target. This makes them perfect for callbacks (they keep the outer this, solving the classic this-lost-in-callbacks problem). But it means they can't be: constructors (new Arrow() throws), methods that need this to be the object (an arrow method's this is the outer scope, not the object), or functions that need the arguments object (arrows don't have their own arguments — use rest params). Concise syntax: x => x * 2 (implicit return for one expression); (x, y) => { return x + y; } (block body needs return). Use arrows for: callbacks, short pure functions. Use regular functions for: object methods (need this), constructors, functions that use arguments.`,
    howItWorks: `1. () => {} — arrow function.
2. x => x * 2 — single param (no parens), implicit return.
3. (x, y) => x + y — multiple params (parens), implicit return.
4. () => { return x; } — block body (needs explicit return).
5. Lexical this — uses the outer this (no own this).
6. No arguments object — use rest params (...args).
7. Can't be constructors (new throws) or use super.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Concise syntax
const double = x => x * 2;        // single param, implicit return
const add = (x, y) => x + y;      // multiple params
const greet = () => 'hello';      // no params
const log = x => { console.log(x); }; // block body (no implicit return)

// Callbacks (lexical this — the main use)
class Timer {
  constructor() { this.seconds = 0; }
  start() {
    setInterval(() => {
      this.seconds++; // this = the instance (lexical)
    }, 1000);
  }
}

// DON'T use arrows as object methods (this is wrong)
const obj = {
  name: 'Alice',
  // greet: () => console.log(this.name) // this = outer (window), NOT obj
  greet() { console.log(this.name); } // use regular method
};

// Can't be constructors
const Foo = () => {};
// new Foo(); // TypeError (arrows can't be constructors)

// No arguments object (use rest params)
const fn = (...args) => args; // not arguments (arrows don't have it)`,
        note: "Arrows have lexical this — perfect for callbacks (keep the outer this). But they can't be object methods (this is the outer scope, not the object) or constructors (new throws). Use regular functions for those."
      }
    ],
    marginNotes: [
      "Arrows have lexical this — use them for callbacks (they keep the outer this, solving the this-lost problem). This is their main use.",
      "Don't use arrows as object methods — this is the outer scope (window), not the object. Use regular methods (this is the object).",
      "Arrows can't be constructors (new throws) and don't have their own arguments (use rest params ...args).",
      "Concise syntax: x => x * 2 (implicit return); block body () => { return x; } needs explicit return."
    ],
    commonMistakes: [
      "Using arrow functions as object methods — this is the outer scope (window), not the object. Use regular methods.",
      "Using arrow functions as constructors (new) — throws TypeError. Use regular functions or classes.",
      "Expecting arguments in an arrow function — arrows don't have their own arguments. Use rest params (...args)."
    ],
    relatedTopics: ["The this Keyword", "Classes & Prototypes", "Functions & this"],
    externalLinks: [
      { label: "MDN: Arrow functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" }
    ],
    mcqs: [
      { question: "Do arrow functions have their own this?", options: ["Yes", "No — they use the outer this (lexical)", "Only in classes", "Only in strict mode"], answer: 1, explanations: ["They don't.", "Correct — arrows have lexical this (the outer scope's). Perfect for callbacks; bad for methods.", "Always lexical.", "Always lexical."], difficulty: "medium" },
      { question: "Can arrow functions be constructors?", options: ["Yes", "No — new Arrow() throws TypeError", "Only with class", "Only with bind"], answer: 1, explanations: ["They can't.", "Correct — arrows can't be constructors (no [[Construct]]). Use regular functions or classes.", "Not with class.", "Not with bind."], difficulty: "medium" },
      { question: "Should you use arrows as object methods?", options: ["Yes, always", "No — this is the outer scope, not the object; use regular methods", "Only for getters", "Only for setters"], answer: 1, explanations: ["No.", "Correct — an arrow method's this is the outer scope (window), not the object. Use regular methods.", "Same rule.", "Same rule."], difficulty: "medium" }
    ]
  },
  {
    id: "objects-references",
    title: "Objects & References",
    difficulty: "medium",
    definition: `Objects are passed by reference (the variable holds a pointer to the object, not a copy). Assigning an object copies the reference (both point to the same object). Primitive assignments copy the value. Deep vs shallow copy matters for nested objects.`,
    coreUnderstanding: `Primitives (string, number, boolean) are passed by value — assigning copies the value. Objects (objects, arrays, functions) are passed by reference — assigning copies the reference (both variables point to the same object). const obj1 = { x: 1 }; const obj2 = obj1; obj2.x = 2; — obj1.x is now 2 (same object). This is why === compares references for objects ({ } === { } is false — different objects). To copy: shallow copy (Object.assign({}, obj) or {...obj}) copies one level (nested objects are still shared). Deep copy (structuredClone(obj) or JSON.parse(JSON.stringify(obj))) copies all levels. JSON method loses functions, Dates, undefined; structuredClone is the modern way. Mutating shared objects is a common bug source — prefer immutability (spread to create new objects).`,
    howItWorks: `1. Primitives: passed by value (copy).
2. Objects: passed by reference (same object).
3. const a = {}; const b = a; b.x = 1; — a.x is 1 (same object).
4. {} === {} is false (different objects); a === b is true (same reference).
5. Shallow copy: {...obj} or Object.assign({}, obj) — one level (nested shared).
6. Deep copy: structuredClone(obj) (modern) or JSON.parse(JSON.stringify(obj)) (loses functions/Dates).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Primitives: passed by value (copy)
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 (a is unchanged)

// Objects: passed by reference (same object)
const obj1 = { x: 1 };
const obj2 = obj1; // copies the reference, not the object
obj2.x = 2;
console.log(obj1.x); // 2 (same object!)

// Reference comparison
console.log({} === {}); // false (different objects)
console.log(obj1 === obj2); // true (same reference)

// Shallow copy (one level — nested objects are shared)
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original }; // or Object.assign({}, original)
shallow.a = 10;
shallow.nested.b = 20;
console.log(original.a); // 1 (top-level copied)
console.log(original.nested.b); // 20 (nested is shared!)

// Deep copy (all levels)
const deep = structuredClone(original); // modern
// or JSON.parse(JSON.stringify(original)) — loses functions, Dates, undefined
deep.nested.b = 99;
console.log(original.nested.b); // 20 (independent)`,
        note: "Objects are passed by reference — assigning copies the reference (both point to the same object). Shallow copy ({...obj}) copies one level (nested is shared); deep copy (structuredClone) copies all levels."
      }
    ],
    marginNotes: [
      "Objects are passed by reference — const b = a; b.x = 1; changes a.x (same object). Primitives are passed by value (copy).",
      "Shallow copy ({...obj}, Object.assign) copies one level — nested objects are still shared. Deep copy (structuredClone) copies all levels.",
      "structuredClone is the modern deep copy (handles Dates, arrays, circular refs). JSON.parse(JSON.stringify()) loses functions, Dates, undefined.",
      "Mutating shared objects is a common bug — prefer immutability: create new objects with spread ({...obj, x: 2}) instead of mutating."
    ],
    commonMistakes: [
      "Expecting {...obj} to deep copy — it's shallow (nested objects are shared). Use structuredClone for deep copy.",
      "Mutating a shared object (obj.nested.x = 1) — affects all references. Create a new object instead (immutability).",
      "Using JSON.parse(JSON.stringify()) for deep copy — loses functions, Dates, undefined, Map/Set. Use structuredClone."
    ],
    relatedTopics: ["Types & Coercion", "var let const", "Arrays & Methods"],
    externalLinks: [
      { label: "MDN: structuredClone", url: "https://developer.mozilla.org/en-US/docs/Web/API/structuredClone" },
      { label: "MDN: Object.assign", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign" }
    ],
    mcqs: [
      { question: "Are objects passed by value or reference?", options: ["Value (copy)", "Reference (same object)", "Both", "Neither"], answer: 1, explanations: ["Primitives are by value.", "Correct — objects are passed by reference; assigning copies the reference (both point to the same object).", "Reference.", "Reference."], difficulty: "easy" },
      { question: "Is {...obj} a shallow or deep copy?", options: ["Deep", "Shallow (one level — nested is shared)", "Neither", "Both"], answer: 1, explanations: ["Not deep.", "Correct — spread is shallow; nested objects are still shared. Use structuredClone for deep.", "It's a copy.", "Shallow."], difficulty: "medium" },
      { question: "What's the modern way to deep copy?", options: ["JSON.parse(JSON.stringify())", "structuredClone()", "Object.assign()", "{...obj}"], answer: 1, explanations: ["Loses functions/Dates.", "Correct — structuredClone handles Dates, arrays, circular refs. JSON method loses functions/Dates/undefined.", "Shallow.", "Shallow."], difficulty: "medium" }
    ]
  },
  {
    id: "arrays-methods",
    title: "Arrays & Array Methods",
    difficulty: "medium",
    definition: `Arrays are ordered, indexed lists. Key methods: map (transform), filter (select), reduce (aggregate), forEach (iterate), find, some, every, sort, slice, splice, spread, destructuring. map/filter/reduce are the functional programming core.`,
    coreUnderstanding: `Arrays are objects with indexed properties and a length. The functional methods (map, filter, reduce) are the core of modern JS data processing. map(fn) returns a new array with fn applied to each element (transform). filter(fn) returns elements where fn returns true (select). reduce(fn, init) accumulates to a single value (aggregate). forEach(fn) iterates (no return — side effects). find(fn) returns the first matching element. some(fn) — any match? every(fn) — all match? sort(fn) sorts (mutates! and sorts as strings by default — provide a comparator). slice(start, end) returns a subarray (no mutation). splice(start, deleteCount, ...items) mutates (add/remove). Spread ([...arr]) and destructuring ([a, b] = arr) are modern syntax. These methods enable declarative, immutable data processing (prefer map/filter over for loops).`,
    howItWorks: `1. map(fn) — transform: new array with fn(element).
2. filter(fn) — select: elements where fn(element) is true.
3. reduce(fn, init) — aggregate: accumulate to a single value.
4. forEach(fn) — iterate (no return, side effects).
5. find(fn) — first matching element; findIndex — its index.
6. some(fn) — any match? every(fn) — all match?
7. sort(fn) — mutates! sorts as strings by default (provide a comparator).
8. slice(start, end) — subarray (no mutation); splice — mutates.
9. [...arr] — spread (copy); [a, b] = arr — destructuring.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `const nums = [1, 2, 3, 4, 5];

// map: transform each element
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter: select elements
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// reduce: aggregate to a single value
const sum = nums.reduce((acc, n) => acc + n, 0); // 15
const max = nums.reduce((a, b) => Math.max(a, b)); // 5

// find: first match
const firstEven = nums.find(n => n % 2 === 0); // 2

// some / every: tests
nums.some(n => n > 3);  // true (any match)
nums.every(n => n > 0); // true (all match)

// sort: MUTATES and sorts as strings by default!
[10, 1, 2].sort(); // [1, 10, 2] (string sort!)
[10, 1, 2].sort((a, b) => a - b); // [1, 2, 10] (numeric)

// slice (no mutation) vs splice (mutates)
const arr = [1, 2, 3, 4];
arr.slice(1, 3); // [2, 3] (copy, arr unchanged)
arr.splice(1, 2); // [2, 3] (removed; arr is now [1, 4])

// Spread and destructuring
const copy = [...arr]; // [1, 2, 3, 4]
const [first, second] = arr; // first=1, second=2`,
        note: "map/filter/reduce are the functional core — prefer them over for loops (declarative, immutable). sort MUTATES and sorts as strings by default — always provide a comparator (a, b) => a - b for numbers."
      }
    ],
    marginNotes: [
      "map/filter/reduce are the functional core — prefer them over for loops (declarative, immutable). map transforms, filter selects, reduce aggregates.",
      "sort() MUTATES the array and sorts as STRINGS by default ([10, 1, 2] → [1, 10, 2]). Always provide a comparator: (a, b) => a - b for numbers.",
      "slice(start, end) returns a copy (no mutation); splice(start, count, ...items) mutates (add/remove). Know the difference.",
      "Spread ([...arr]) copies; destructuring ([a, b] = arr) extracts. Both are modern, concise syntax."
    ],
    commonMistakes: [
      "Using sort() without a comparator — it sorts as strings ([10, 1, 2] → [1, 10, 2]). Use (a, b) => a - b for numbers.",
      "Not realizing sort() and splice() mutate — they change the original array. Use toSorted() (new) or slice for immutability.",
      "Using forEach when map is needed — forEach returns undefined (no chain); map returns a new array."
    ],
    relatedTopics: ["Objects & References", "Destructuring & Spread"],
    externalLinks: [
      { label: "MDN: Array methods", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
      { label: "MDN: reduce", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" }
    ],
    mcqs: [
      { question: "Does sort() mutate the original array?", options: ["No", "Yes — it sorts in place (and as strings by default)", "Only with a comparator", "Only in strict mode"], answer: 1, explanations: ["It does.", "Correct — sort() mutates and sorts as strings. Use toSorted() (new array) or provide a comparator.", "It always mutates.", "It always mutates."], difficulty: "medium" },
      { question: "What does [10, 1, 2].sort() return (no comparator)?", options: ["[1, 2, 10]", "[1, 10, 2] (string sort)", "[10, 1, 2]", "Error"], answer: 1, explanations: ["That needs a comparator.", "Correct — sort() converts to strings: '1', '10', '2' → [1, 10, 2]. Use (a,b) => a-b.", "Unchanged.", "No error."], difficulty: "medium" },
      { question: "What's the difference between map and forEach?", options: ["None", "map returns a new array; forEach returns undefined (side effects)", "forEach is faster", "map is newer"], answer: 1, explanations: ["They differ.", "Correct — map transforms (returns a new array, chainable); forEach iterates (returns undefined, for side effects).", "Similar speed.", "Both old."], difficulty: "easy" }
    ]
  },
  {
    id: "destructuring",
    title: "Destructuring & Spread/Rest",
    difficulty: "medium",
    definition: `Destructuring extracts values from arrays/objects into variables: const {a, b} = obj; const [x, y] = arr. Spread (...arr) expands an iterable into elements. Rest (...args) collects elements into an array. They're concise, modern syntax.`,
    coreUnderstanding: `Destructuring unpacks values: const {name, age} = user extracts user.name and user.age into variables. Array destructuring is by position: const [first, second] = arr. Rename: const {name: userName} = user (userName = user.name). Default values: const {count = 0} = obj. Nested: const {address: {city}} = user. Spread expands: [...arr1, ...arr2] concatenates; {...obj1, ...obj2} merges. Rest collects: function fn(...args) gathers all arguments into an array; const [first, ...rest] = arr. Spread and rest use the same syntax (...) but differ by context: spread expands (in array literals, function calls); rest collects (in function params, destructuring). These replace older patterns (arguments, Object.assign) with concise syntax.`,
    howItWorks: `1. Object destructuring: const {a, b} = obj.
2. Array destructuring: const [x, y] = arr (by position).
3. Rename: const {a: alias} = obj (alias = obj.a).
4. Defaults: const {a = 0} = obj (0 if undefined).
5. Nested: const {a: {b}} = obj.
6. Spread: [...arr] expands; {...obj} expands; fn(...args) spreads into args.
7. Rest: function fn(...args) collects; const [first, ...rest] = arr.
8. Swap: [a, b] = [b, a].`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Object destructuring
const user = { name: 'Alice', age: 30, role: 'admin' };
const { name, age } = user; // name='Alice', age=30
const { name: userName } = user; // rename: userName='Alice'
const { email = 'N/A' } = user; // default: email='N/A'

// Nested destructuring
const { address: { city } } = { address: { city: 'NYC' } }; // city='NYC'

// Array destructuring (by position)
const [first, second] = [1, 2, 3]; // first=1, second=2
const [a, , c] = [1, 2, 3]; // skip: a=1, c=3
const [x, ...rest] = [1, 2, 3]; // x=1, rest=[2, 3]

// Swap variables
let p = 1, q = 2;
[p, q] = [q, p]; // p=2, q=1

// Spread (expand)
const arr1 = [1, 2], arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]
const obj1 = { a: 1 }, obj2 = { b: 2 };
const combined = { ...obj1, ...obj2 }; // { a: 1, b: 2 }
fn(...arr); // spreads arr into arguments

// Rest (collect) — in function params
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
sum(1, 2, 3); // 6

// In destructuring (rest)
const { name, ...details } = user; // name='Alice', details={age:30, role:'admin'}`,
        note: "Destructuring unpacks values (concise). Spread (...) expands; rest (...) collects — same syntax, different context. Rename with {a: alias}, defaults with {a = 0}, skip with [a, , c]."
      }
    ],
    marginNotes: [
      "Destructuring unpacks values: const {name, age} = user. Rename with {name: alias}, defaults with {count = 0}, skip with [a, , c].",
      "Spread (...) expands (in array/object literals, function calls); rest (...) collects (in function params, destructuring). Same syntax, different context.",
      "Spread for objects merges (later overrides earlier): {...obj1, ...obj2} — obj2's keys win. Spread for arrays concatenates.",
      "Rest in function params (...args) replaces the arguments object (which isn't a real array). Rest gives a real array."
    ],
    commonMistakes: [
      "Confusing spread (expand) and rest (collect) — same syntax, different context. Spread is in literals/calls; rest is in params/destructuring.",
      "Forgetting that spread merges objects (later overrides earlier) — {...a, ...b} has b's keys winning.",
      "Using the old arguments object instead of rest params — arguments isn't a real array (no .map); rest (...args) is."
    ],
    relatedTopics: ["Arrays & Methods", "Objects & References", "Functions & this"],
    externalLinks: [
      { label: "MDN: Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring" },
      { label: "MDN: Spread syntax", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" }
    ],
    mcqs: [
      { question: "What's the difference between spread and rest?", options: ["None", "Spread expands; rest collects (same syntax, different context)", "Spread is newer", "Rest is faster"], answer: 1, explanations: ["They differ.", "Correct — spread (...) expands into elements; rest (...) collects into an array. Same syntax, different context.", "Both ES6.", "Same speed."], difficulty: "medium" },
      { question: "How do you rename in destructuring?", options: ["const {a} = obj", "const {a: alias} = obj (alias = obj.a)", "const {a = alias}", "const [a: alias]"], answer: 1, explanations: ["That's basic.", "Correct — {a: alias} extracts obj.a into a variable named alias.", "That's a default.", "Wrong syntax."], difficulty: "medium" },
      { question: "What does {...obj1, ...obj2} do?", options: ["Error", "Merges (obj2's keys override obj1's)", "Concatenates", "Deletes obj1"], answer: 1, explanations: ["No error.", "Correct — spread merges objects; later keys override earlier (obj2 wins).", "Arrays concatenate.", "It doesn't delete."], difficulty: "easy" }
    ]
  },
  {
    id: "equality-nan",
    title: "Equality, NaN & Object.is",
    difficulty: "medium",
    definition: `=== compares strictly (no coercion) but has edge cases: NaN === NaN is false, +0 === -0 is true. Object.is(a, b) fixes these: Object.is(NaN, NaN) is true, Object.is(+0, -0) is false. NaN is the only value not equal to itself.`,
    coreUnderstanding: `=== is strict (no coercion) but has two quirks: NaN === NaN is false (NaN is never equal to anything, including itself — use Number.isNaN or Object.is), and +0 === -0 is true (they're different values but === treats them as equal). Object.is(a, b) is the most precise comparison: it's like === but treats NaN as equal to NaN and +0 as not equal to -0. For most cases, === is fine. For NaN, use Number.isNaN(x) (not the global isNaN, which coerces — isNaN('hello') is true). For +0/-0 distinction (rare), use Object.is. The advice: use === everywhere; use Number.isNaN for NaN checks; use Object.is only when you need the +0/-0 or NaN precision.`,
    howItWorks: `1. === — strict (no coercion). But NaN === NaN is false; +0 === -0 is true.
2. Object.is(a, b) — like === but NaN === NaN is true; +0 !== -0.
3. NaN — the only value not equal to itself (NaN === NaN is false).
4. Number.isNaN(x) — true only if x is NaN (no coercion).
5. isNaN(x) (global) — coerces first (isNaN('hello') is true — bad).
6. Use === everywhere; Number.isNaN for NaN; Object.is for precision.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// === quirks
NaN === NaN;  // false (NaN is never equal to anything!)
+0 === -0;    // true (different values, but === treats them as equal)

// Object.is fixes these
Object.is(NaN, NaN);  // true
Object.is(+0, -0);    // false

// NaN checks
const x = NaN;
x === NaN;          // false (can't use ===)
Number.isNaN(x);    // true (correct way)
isNaN(x);           // true (but coerces — isNaN('hello') is also true!)

// The global isNaN coerces (bad)
isNaN('hello');     // true (coerces 'hello' to NaN)
Number.isNaN('hello'); // false (no coercion — 'hello' is not NaN)

// Practical: check for NaN
if (Number.isNaN(result)) { /* handle NaN */ }

// +0 vs -0 (rare, but Object.is distinguishes)
Object.is(0, -0);   // false
0 === -0;           // true`,
        note: "NaN === NaN is false (NaN is never equal to itself). Use Number.isNaN (not the global isNaN, which coerces). Object.is is the most precise (NaN=NaN, +0≠-0). Use === everywhere; Number.isNaN for NaN."
      }
    ],
    marginNotes: [
      "NaN === NaN is false — NaN is the only value not equal to itself. Use Number.isNaN(x) (not the global isNaN, which coerces).",
      "Object.is(a, b) is the most precise comparison: NaN=NaN (true), +0≠-0 (false). Use it when you need this precision (rare).",
      "Number.isNaN (no coercion) vs isNaN (coerces): Number.isNaN('hello') is false; isNaN('hello') is true (coerces to NaN). Always use Number.isNaN.",
      "=== is fine for 99% of cases. Use Number.isNaN for NaN, Object.is for +0/-0 or NaN precision."
    ],
    commonMistakes: [
      "Using x === NaN to check for NaN — it's always false (NaN isn't equal to itself). Use Number.isNaN(x).",
      "Using the global isNaN — it coerces (isNaN('hello') is true). Use Number.isNaN (no coercion).",
      "Not knowing +0 === -0 is true — use Object.is if you need to distinguish them (rare)."
    ],
    relatedTopics: ["Types & Coercion", "Objects & References"],
    externalLinks: [
      { label: "MDN: NaN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN" },
      { label: "MDN: Object.is", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is" }
    ],
    mcqs: [
      { question: "What does NaN === NaN return?", options: ["true", "false (NaN is never equal to anything)", "TypeError", "undefined"], answer: 1, explanations: ["It's false.", "Correct — NaN is the only value not equal to itself. Use Number.isNaN to check for NaN.", "No error.", "No error."], difficulty: "medium" },
      { question: "How should you check for NaN?", options: ["x === NaN", "Number.isNaN(x) (not the global isNaN)", "typeof x", "x == NaN"], answer: 1, explanations: ["Always false.", "Correct — Number.isNaN doesn't coerce. The global isNaN coerces (isNaN('hello') is true — bad).", "typeof NaN is 'number'.", "== coerces, still false."], difficulty: "medium" },
      { question: "What does Object.is fix compared to ===?", options: ["Coercion", "NaN=NaN (true) and +0≠-0 (false)", "Nothing", "Type checking"], answer: 1, explanations: ["=== doesn't coerce.", "Correct — Object.is is like === but NaN=NaN and +0≠-0. Use it for that precision (rare).", "It fixes edge cases.", "Not type checking."], difficulty: "hard" }
    ]
  },
  {
    id: "classes-prototypes",
    title: "Classes & Prototypes",
    difficulty: "hard",
    definition: `JS uses prototypal inheritance (objects inherit from objects). class syntax (ES6) is sugar over prototypes. A class defines a constructor and methods (on the prototype). extends creates a subclass; super calls the parent. __proto__ is the internal prototype link; prototype is on functions (for instances).`,
    coreUnderstanding: `JS inheritance is prototypal (objects inherit from other objects via a prototype chain), not class-based (like Java). The class keyword (ES6) is syntactic sugar over the prototype system — it's clearer but the same mechanism. A class has a constructor (initialization) and methods (placed on the prototype, shared by all instances). extends creates a subclass (inherits the parent's prototype); super() calls the parent constructor (required before using this in the subclass constructor). The prototype chain: an instance's __proto__ points to the class's prototype; property lookup follows the chain. static methods are on the class (not instances). Fields (class fields, ES2022): x = 5; (instance field); static y = 10; (static field). Private fields (#x) are truly private (ES2022). Under the hood: class Foo {} creates a function; Foo.prototype holds the methods; new Foo() creates an object with __proto__ = Foo.prototype.`,
    howItWorks: `1. class Foo { constructor() {} method() {} } — class syntax (sugar over prototypes).
2. Methods go on Foo.prototype (shared by all instances).
3. extends Bar — subclass; super() calls the parent constructor (required before this).
4. static method() — on the class (not instances).
5. #x — private field (truly private, ES2022).
6. Instance's __proto__ === Foo.prototype; lookup follows the chain.
7. new Foo() creates an object with __proto__ = Foo.prototype.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `class Animal {
  #name; // private field (ES2022)
  static count = 0; // static field

  constructor(name) {
    this.#name = name;
    Animal.count++; // static access via the class name
  }

  speak() { return \`\${this.#name} speaks\`; } // method (on prototype)
  get name() { return this.#name; } // getter
  static create(name) { return new Animal(name); } // static method
}

class Dog extends Animal {
  constructor(name) {
    super(name); // required before using 'this'
  }
  speak() { return \`\${this.name} barks\`; } // override
}

const dog = new Dog('Rex');
dog.speak(); // 'Rex barks'
dog.name;    // 'Rex' (getter)
// dog.#name; // SyntaxError (private)
Animal.count; // 1 (static)
Animal.create('Cat').speak(); // 'Cat speaks'

// Under the hood (prototypal inheritance)
dog.__proto__ === Dog.prototype; // true
Dog.prototype.__proto__ === Animal.prototype; // true (extends)`,
        note: "class is sugar over prototypes. Methods go on the prototype (shared). extends + super() for inheritance. #x is private (ES2022). static for class-level. __proto__ is the internal prototype link."
      }
    ],
    marginNotes: [
      "class is syntactic sugar over the prototype system — clearer syntax, same mechanism. Methods go on the prototype (shared by all instances).",
      "extends creates a subclass; super() must be called before using this in the subclass constructor. The prototype chain: instance.__proto__ → Class.prototype → Parent.prototype.",
      "#x is a private field (ES2022) — truly private (not accessible outside the class). Unlike _x (convention), #x is enforced.",
      "static methods/fields are on the class (not instances): Animal.count, Animal.create(). Access via the class name, not this (in static methods)."
    ],
    commonMistakes: [
      "Forgetting super() in a subclass constructor before using this — throws ReferenceError. Always call super() first.",
      "Using _x for privacy (convention) — it's not enforced. Use #x (private fields, ES2022) for true privacy.",
      "Accessing static members via this in static methods — use the class name (this is the class in static methods, but explicit is clearer)."
    ],
    relatedTopics: ["The this Keyword", "Arrow Functions", "Objects & References"],
    externalLinks: [
      { label: "MDN: Classes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" },
      { label: "MDN: Inheritance", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript" }
    ],
    mcqs: [
      { question: "Is class syntactic sugar over prototypes?", options: ["No, it's new", "Yes — class is sugar over the prototype system", "Only in TypeScript", "Only in strict mode"], answer: 1, explanations: ["It is sugar.", "Correct — class syntax (ES6) is sugar over prototypal inheritance. Methods go on the prototype.", "Same in JS.", "Same in JS."], difficulty: "medium" },
      { question: "What must a subclass constructor call before this?", options: ["Nothing", "super() (required before using this)", "extends", "new"], answer: 1, explanations: ["super is required.", "Correct — super() must be called before using this in a subclass constructor (ReferenceError otherwise).", "extends is on the class.", "new creates instances."], difficulty: "medium" },
      { question: "How do you make a field truly private?", options: ["_x (convention)", "#x (private field, ES2022)", "var x", "private x"], answer: 1, explanations: ["Convention, not enforced.", "Correct — #x is truly private (enforced). _x is just a convention (not private).", "var is function-scoped.", "Not JS syntax."], difficulty: "medium" }
    ]
  }
];