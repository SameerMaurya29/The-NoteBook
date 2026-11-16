// JS topics part 2: Async, DOM, Events (topics 12-22)
export default [
  {
    id: "event-loop",
    title: "The Event Loop & Concurrency",
    difficulty: "hard",
    definition: `JS is single-threaded with an event loop. The call stack runs synchronous code; the task queue (macrotasks: setTimeout, events) and microtask queue (Promises, queueMicrotask) hold async callbacks. The loop: run sync code → drain microtasks → run one macrotask → repeat.`,
    coreUnderstanding: `JS has one thread (no parallelism, but concurrency via the event loop). The call stack executes synchronous code. Async callbacks go to queues: the microtask queue (Promise.then/catch/finally, queueMicrotask, MutationObserver) and the macrotask/task queue (setTimeout, setInterval, I/O, UI events). After the call stack empties, the event loop drains ALL microtasks, then runs ONE macrotask, then drains microtasks again, etc. This means microtasks (Promises) always run before the next macrotask (setTimeout) — even if the setTimeout was scheduled first. This ordering is the #1 source of async confusion. requestAnimationFrame runs before paint (for smooth animations). Understanding the event loop explains why setTimeout(fn, 0) doesn't run immediately (it's a macrotask; sync code and microtasks run first).`,
    howItWorks: `1. Call stack — synchronous code.
2. Microtask queue — Promises (.then, .catch), queueMicrotask, MutationObserver.
3. Macrotask (task) queue — setTimeout, setInterval, I/O, UI events, messageChannel.
4. Loop: run sync → drain ALL microtasks → run ONE macrotask → drain microtasks → repeat.
5. Microtasks always run before the next macrotask (even if setTimeout was first).
6. requestAnimationFrame — before paint (smooth animations).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `console.log('1. sync');

setTimeout(() => console.log('4. macrotask (setTimeout)'), 0);

Promise.resolve().then(() => console.log('3. microtask (Promise)'));

console.log('2. sync');

// Output: 1, 2, 3, 4
// Why: sync (1, 2) → drain microtasks (3) → one macrotask (4)

// Microtasks always run before the next macrotask
setTimeout(() => {
  console.log('A. macrotask');
  Promise.resolve().then(() => console.log('B. microtask'));
}, 0);
setTimeout(() => console.log('C. macrotask'), 0);
// Output: A, B, C (B runs before C — microtasks drain between macrotasks)

// queueMicrotask (explicit microtask)
queueMicrotask(() => console.log('microtask'));

// requestAnimationFrame (before paint)
requestAnimationFrame(() => console.log('before paint'));`,
        note: "The event loop: sync code → drain ALL microtasks (Promises) → run ONE macrotask (setTimeout) → drain microtasks → repeat. Microtasks always run before the next macrotask, even if the setTimeout was scheduled first."
      }
    ],
    marginNotes: [
      "The event loop: sync code → drain ALL microtasks (Promises) → run ONE macrotask (setTimeout) → drain microtasks → repeat. Microtasks always run before the next macrotask.",
      "setTimeout(fn, 0) doesn't run immediately — it's a macrotask; sync code and all microtasks run first. This is why it's delayed (~4ms minimum in browsers).",
      "Microtasks (Promises) can starve the macrotask queue — if you keep adding microtasks, macrotasks (setTimeout, UI events) never run (page freezes).",
      "requestAnimationFrame runs before paint (synced with refresh rate) — use it for smooth animations. setTimeout is not synced (janky)."
    ],
    commonMistakes: [
      "Expecting setTimeout(fn, 0) to run immediately — it's a macrotask; sync code and microtasks run first.",
      "Not understanding why a Promise.then runs before a setTimeout scheduled earlier — microtasks drain before the next macrotask.",
      "Creating infinite microtask loops — they starve the macrotask queue (UI freezes, no setTimeout/events run)."
    ],
    relatedTopics: ["Promises & async/await", "Timers", "Scope & Closures"],
    externalLinks: [
      { label: "MDN: Event loop", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop" },
      { label: "MDN: Microtasks", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide" }
    ],
    mcqs: [
      { question: "What runs first: a Promise.then or a setTimeout(fn, 0)?", options: ["setTimeout", "Promise.then (microtasks drain before the next macrotask)", "Simultaneously", "Random"], answer: 1, explanations: ["Macrotasks are later.", "Correct — microtasks (Promises) always run before the next macrotask (setTimeout), even if scheduled later.", "Sequential.", "Deterministic."], difficulty: "hard" },
      { question: "Does setTimeout(fn, 0) run immediately?", options: ["Yes", "No — it's a macrotask; sync code and microtasks run first", "Only in Node", "Only in strict mode"], answer: 1, explanations: ["It doesn't.", "Correct — setTimeout is a macrotask; sync code and all microtasks drain first. Minimum delay ~4ms.", "Same in browsers.", "Same everywhere."], difficulty: "medium" },
      { question: "Can microtasks starve macrotasks?", options: ["No", "Yes — infinite microtask loops prevent macrotasks (UI freezes)", "Only in Node", "Only with Promises"], answer: 1, explanations: ["They can.", "Correct — if you keep adding microtasks, the macrotask queue never runs (setTimeout, UI events freeze).", "Same in browsers.", "Promises are microtasks."], difficulty: "hard" }
    ]
  },
  {
    id: "promises-async",
    title: "Promises & async/await",
    difficulty: "hard",
    definition: `A Promise represents a future value (pending → fulfilled/rejected). async/await is syntactic sugar over Promises: async functions return a Promise; await pauses until a Promise settles. try/catch handles errors. They make async code look synchronous.`,
    coreUnderstanding: `A Promise is a state machine: pending → fulfilled (with a value) or rejected (with a reason). .then(fn) runs on fulfillment; .catch(fn) on rejection; .finally(fn) on settlement. async/await (ES2017) is sugar: an async function always returns a Promise; await pauses the function until a Promise settles (unwraps the value or throws). try/catch handles await errors (cleaner than .catch). Promise.all ([p1, p2]) waits for all (or rejects on first error); Promise.allSettled waits for all (never rejects — gives statuses); Promise.race settles with the first; Promise.any resolves with the first success. await is sequential by default (await a; await b;) — use Promise.all for parallel ([await a, await b] is sequential; await Promise.all([a, b]) is parallel). Top-level await (in modules) lets you await at the top level.`,
    howItWorks: `1. new Promise((resolve, reject) => {}) — create.
2. .then(value => {}) — on fulfillment; .catch(err => {}) — on rejection; .finally(() => {}).
3. async function foo() { return 1; } — returns a Promise (resolved with 1).
4. const x = await promise — pause until settled (unwrap value or throw).
5. try { await x } catch (e) {} — handle errors (cleaner than .catch).
6. Promise.all([p1, p2]) — wait for all (reject on first error).
7. Promise.allSettled — wait for all (never rejects); Promise.race — first; Promise.any — first success.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Promise
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});
p.then(val => console.log(val)) // 'done'
 .catch(err => console.error(err))
 .finally(() => console.log('settled'));

// async/await (sugar over Promises)
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Failed:', err);
  }
}

// Sequential vs parallel
async function sequential() {
  const a = await fetchA(); // waits for A
  const b = await fetchB(); // then waits for B (slow)
  return [a, b];
}
async function parallel() {
  const [a, b] = await Promise.all([fetchA(), fetchB()]); // both at once
  return [a, b];
}

// Promise combinators
await Promise.all([p1, p2]);       // all (rejects on first error)
await Promise.allSettled([p1, p2]); // all (never rejects, gives statuses)
await Promise.race([p1, p2]);       // first to settle (resolve or reject)
await Promise.any([p1, p2]);        // first to resolve (ignores rejections)`,
        note: "await is sequential by default (await a; await b; waits for each). Use Promise.all for parallel (await Promise.all([a, b]) runs both at once). try/catch handles await errors."
      }
    ],
    marginNotes: [
      "await is sequential by default — await a; await b; waits for each. Use Promise.all([a, b]) for parallel (both run at once).",
      "Promise.all rejects on the first error (fast-fail); Promise.allSettled never rejects (gives all statuses — use when you want all results regardless of errors).",
      "async functions always return a Promise (even if you return a plain value — it's wrapped). await unwraps a Promise (or throws on rejection).",
      "try/catch handles await errors (cleaner than .catch). Top-level await (in modules) lets you await at the top level (no wrapper function)."
    ],
    commonMistakes: [
      "Using sequential await when parallel is needed — await a; await b; is slow. Use await Promise.all([a, b]).",
      "Using Promise.all when one failure should not cancel others — use Promise.allSettled (gets all results regardless of errors).",
      "Forgetting try/catch around await — unhandled rejections. Or using .catch on the async function call (both work; try/catch is cleaner)."
    ],
    relatedTopics: ["Event Loop", "Fetch & APIs", "Error Handling"],
    externalLinks: [
      { label: "MDN: Promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" },
      { label: "MDN: async/await", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises" }
    ],
    mcqs: [
      { question: "Is await sequential or parallel by default?", options: ["Parallel", "Sequential (await a; await b; waits for each); use Promise.all for parallel", "Both", "Neither"], answer: 1, explanations: ["Sequential.", "Correct — await is sequential; use await Promise.all([a, b]) for parallel (both run at once).", "Sequential.", "Sequential."], difficulty: "medium" },
      { question: "What's the difference between Promise.all and allSettled?", options: ["Same", "all rejects on first error; allSettled never rejects (gives all statuses)", "all is faster", "allSettled is newer"], answer: 1, explanations: ["They differ.", "Correct — all fast-fails; allSettled waits for all and gives {status, value/reason} for each.", "Similar.", "Both ES2020."], difficulty: "medium" },
      { question: "Does an async function always return a Promise?", options: ["No", "Yes — even a plain return value is wrapped in a Promise", "Only with await", "Only in strict mode"], answer: 1, explanations: ["It does.", "Correct — async functions always return a Promise. return 1 becomes Promise.resolve(1).", "Always.", "Always."], difficulty: "easy" }
    ]
  },
  {
    id: "fetch-apis",
    title: "Fetch API & HTTP Requests",
    difficulty: "medium",
    definition: `fetch() makes HTTP requests (modern replacement for XMLHttpRequest). It returns a Promise resolving to a Response. You call .json()/.text() on the Response (also Promises). fetch only rejects on network errors (not HTTP errors like 404) — check response.ok.`,
    coreUnderstanding: `fetch is the modern HTTP API. fetch(url) returns a Promise that resolves to a Response object (not the data yet). The Response has status, ok (true if 200-299), headers, and body methods (.json(), .text(), .blob(), .formData() — all return Promises). Key gotcha: fetch only rejects on NETWORK errors (connection failure, CORS) — NOT on HTTP error statuses (404, 500). A 404 response still resolves the Promise; you must check response.ok (or response.status) and throw manually. For POST/PUT: fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }). The default is GET. fetch doesn't send cookies by default (credentials: 'same-origin' or 'include'). AbortController cancels a fetch (signal).`,
    howItWorks: `1. fetch(url) — GET (returns a Promise<Response>).
2. fetch(url, { method, headers, body }) — POST/PUT/DELETE.
3. response.ok — true if status 200-299 (check this!).
4. response.status — the HTTP status code.
5. await response.json() / .text() / .blob() — read the body (returns a Promise).
6. fetch only rejects on NETWORK errors (not 404/500) — check response.ok.
7. credentials: 'include' — send cookies; AbortController — cancel.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// GET (check response.ok — fetch doesn't reject on 404!)
async function getData() {
  const res = await fetch('/api/data');
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`); // must check!
  return res.json();
}

// POST
async function postData(data) {
  const res = await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

// Error handling (network vs HTTP)
try {
  const data = await getData();
} catch (err) {
  // Network error OR the Error we threw for !res.ok
  console.error(err);
}

// AbortController (cancel a fetch)
const controller = new AbortController();
fetch('/api', { signal: controller.signal });
controller.abort(); // cancels the fetch

// Send cookies
fetch('/api', { credentials: 'include' });`,
        note: "fetch only rejects on NETWORK errors (not 404/500). A 404 resolves the Promise — you must check response.ok and throw manually. This is the #1 fetch gotcha."
      }
    ],
    marginNotes: [
      "fetch only rejects on NETWORK errors (connection failure, CORS) — NOT on HTTP errors (404, 500). A 404 resolves the Promise; check response.ok and throw.",
      "The body is a stream — read it once with .json()/.text()/.blob() (each returns a Promise). You can't read it twice.",
      "fetch doesn't send cookies by default. Use credentials: 'same-origin' (same site) or 'include' (cross-site, needs CORS Allow-Credentials).",
      "AbortController cancels a fetch: pass signal: controller.signal, then controller.abort(). Useful for cancellable requests (component unmount)."
    ],
    commonMistakes: [
      "Not checking response.ok — fetch resolves on 404/500 (only rejects on network errors). Always check and throw.",
      "Forgetting to set Content-Type: application/json for POST — the server may not parse the body correctly.",
      "Not using AbortController for cancellable requests — the request continues after the component unmounts (memory leak, state update on unmounted component)."
    ],
    relatedTopics: ["Promises & async/await", "Error Handling", "JSON"],
    externalLinks: [
      { label: "MDN: Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" },
      { label: "MDN: fetch()", url: "https://developer.mozilla.org/en-US/docs/Web/API/fetch" }
    ],
    mcqs: [
      { question: "Does fetch reject on a 404?", options: ["Yes", "No — it resolves; check response.ok (only network errors reject)", "Only with await", "Only in strict mode"], answer: 1, explanations: ["It resolves.", "Correct — fetch only rejects on network errors. A 404 resolves; you must check response.ok and throw.", "Always resolves.", "Always resolves."], difficulty: "medium" },
      { question: "How do you read the response body?", options: ["response.body (directly)", "await response.json() / .text() (returns a Promise)", "JSON.parse(response)", "response.data"], answer: 1, explanations: ["It's a stream.", "Correct — .json()/.text()/.blob() return Promises (the body is a stream, read once).", "Not directly.", "Not a property."], difficulty: "medium" },
      { question: "How do you cancel a fetch?", options: ["fetch.cancel()", "AbortController (signal + abort)", "return false", "setTimeout"], answer: 1, explanations: ["No cancel method.", "Correct — pass signal: controller.signal, then controller.abort() cancels the fetch.", "Not valid.", "Not for cancellation."], difficulty: "medium" }
    ]
  },
  {
    id: "timers",
    title: "Timers: setTimeout, setInterval, requestAnimationFrame",
    difficulty: "medium",
    definition: `setTimeout(fn, delay) runs fn once after delay. setInterval(fn, interval) runs fn repeatedly. requestAnimationFrame(fn) runs fn before the next paint (for smooth animations). All return IDs for cancellation. Timers are macrotasks (run after microtasks).`,
    coreUnderstanding: `setTimeout(fn, delay) schedules fn as a macrotask after delay ms (minimum ~4ms for nested timeouts in browsers; 0ms in Node). setInterval(fn, interval) schedules fn repeatedly (every interval ms — but not precise; the interval is between the END of one call and the START of the next, not between starts). Both return an ID (clearTimeout/clearInterval to cancel). Timers don't run if the tab is backgrounded (throttled to 1s; or paused). requestAnimationFrame(fn) runs fn before the next paint (synced with the refresh rate, ~60fps) — the smoothest way to animate. cancelAnimationFrame cancels it. For animations, use requestAnimationFrame (smooth, pauses in background tabs); for delays, setTimeout; for polling, setInterval (or recursive setTimeout for precise timing).`,
    howItWorks: `1. setTimeout(fn, delay) — run once after delay (returns an ID).
2. clearTimeout(id) — cancel.
3. setInterval(fn, interval) — run repeatedly (returns an ID).
4. clearInterval(id) — cancel.
5. requestAnimationFrame(fn) — run before the next paint (smooth animations).
6. cancelAnimationFrame(id) — cancel.
7. Timers are macrotasks (run after sync code and microtasks).
8. Background tabs throttle timers (to 1s; or pause).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// setTimeout (once after delay)
const id = setTimeout(() => console.log('hi'), 1000);
clearTimeout(id); // cancel

// setInterval (repeatedly)
const interval = setInterval(() => console.log('tick'), 1000);
clearInterval(interval); // cancel

// requestAnimationFrame (smooth animation)
function animate() {
  element.style.left = (position += 2) + 'px';
  if (position < 500) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Recursive setTimeout (more precise than setInterval)
function poll() {
  fetch('/api').then(() => {
    setTimeout(poll, 1000); // schedule next AFTER this finishes
  });
}
poll();
// Better than setInterval: setInterval doesn't wait for the previous call
// to finish; if the call is slow, intervals overlap.`,
        note: "requestAnimationFrame is the smoothest way to animate (synced with the refresh rate, pauses in background tabs). Recursive setTimeout is more precise than setInterval (waits for the previous call to finish)."
      }
    ],
    marginNotes: [
      "requestAnimationFrame is the smoothest animation method (synced with refresh rate, pauses in background tabs). Use it for animations, not setInterval.",
      "Recursive setTimeout is more precise than setInterval — setInterval doesn't wait for the previous call; if it's slow, intervals overlap. Recursive setTimeout schedules the next AFTER the current finishes.",
      "Timers are macrotasks — they run after sync code and microtasks. setTimeout(fn, 0) doesn't run immediately (minimum ~4ms in browsers).",
      "Background tabs throttle timers (to ~1s; or pause). Don't rely on precise timing in background tabs. Use Page Visibility API to pause/resume."
    ],
    commonMistakes: [
      "Using setInterval for animations — not synced with refresh rate (janky). Use requestAnimationFrame.",
      "Using setInterval for polling without waiting for the previous call — if the call is slow, intervals overlap. Use recursive setTimeout.",
      "Forgetting to clear timers (clearTimeout/clearInterval) — memory leaks, especially in components that unmount."
    ],
    relatedTopics: ["Event Loop", "Promises & async/await", "Performance"],
    externalLinks: [
      { label: "MDN: setTimeout", url: "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout" },
      { label: "MDN: requestAnimationFrame", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame" }
    ],
    mcqs: [
      { question: "Which is smoothest for animations?", options: ["setInterval", "requestAnimationFrame (synced with refresh rate)", "setTimeout", "CSS only"], answer: 1, explanations: ["Not synced (janky).", "Correct — rAF syncs with the refresh rate (~60fps) and pauses in background tabs.", "Not synced.", "CSS is an alternative."], difficulty: "medium" },
      { question: "Why is recursive setTimeout more precise than setInterval?", options: ["It's faster", "setInterval doesn't wait for the previous call; recursive setTimeout schedules the next AFTER the current finishes", "It's newer", "It's required"], answer: 1, explanations: ["Not speed.", "Correct — setInterval can overlap if the call is slow; recursive setTimeout waits for the current call to finish.", "Both old.", "Best practice."], difficulty: "medium" },
      { question: "Are timers macrotasks or microtasks?", options: ["Microtasks", "Macrotasks (run after sync code and microtasks)", "Neither", "Both"], answer: 1, explanations: ["Promises are microtasks.", "Correct — setTimeout/setInterval are macrotasks; they run after sync code and all microtasks drain.", "They're macrotasks.", "Macrotasks."], difficulty: "medium" }
    ]
  },
  {
    id: "dom-manipulation",
    title: "DOM Manipulation",
    difficulty: "medium",
    definition: `The DOM (Document Object Model) is the page's tree structure. JS manipulates it: querySelector/querySelectorAll (select), createElement (create), appendChild/removeChild (modify), textContent/innerHTML (content), setAttribute (attributes), classList (classes).`,
    coreUnderstanding: `The DOM is a tree of nodes (the browser's parsed HTML). document.querySelector(sel) returns the first match; querySelectorAll(sel) returns a NodeList (not live — a static list). document.createElement(tag) creates an element (not attached yet). parent.appendChild(child) attaches; parent.removeChild(child) removes (or child.remove()). element.textContent = '...' sets text (safe — no HTML parsing); innerHTML = '...' sets HTML (XSS risk if user input). setAttribute/getAttribute for attributes; element.id, element.className directly. classList.add/remove/toggle/contains for classes (better than className string manipulation). For multiple changes, use a DocumentFragment (batch insert — one reflow) or cloneNode. Modern frameworks (React) abstract this, but understanding the DOM is essential.`,
    howItWorks: `1. document.querySelector(sel) — first match; querySelectorAll(sel) — all (NodeList, not live).
2. document.createElement(tag) — create (not attached).
3. parent.appendChild(child) / removeChild(child) / child.remove().
4. element.textContent = '...' — safe text; innerHTML = '...' — HTML (XSS risk).
5. element.setAttribute('href', '...') / getAttribute / removeAttribute.
6. element.classList.add/remove/toggle/contains — classes.
7. DocumentFragment — batch insert (one reflow).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Select
const el = document.querySelector('.card');        // first match
const all = document.querySelectorAll('.card');     // NodeList (not live)

// Create and append
const div = document.createElement('div');
div.textContent = 'Hello';       // safe (no HTML parsing)
div.classList.add('active');     // classList (better than className)
div.setAttribute('id', 'my-div');
document.body.appendChild(div);  // attach

// Remove
div.remove();                    // or parent.removeChild(div)

// Content (textContent vs innerHTML)
el.textContent = '<b>safe</b>';  // shows the text (no HTML)
// el.innerHTML = userInput;      // XSS! (user input parsed as HTML)

// Batch insert (DocumentFragment — one reflow)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = \`Item \${i}\`;
  fragment.appendChild(li);
}
document.querySelector('ul').appendChild(fragment); // one reflow

// classList (better than className string manipulation)
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('dark');
el.classList.contains('active'); // true/false`,
        note: "textContent is safe (no HTML parsing); innerHTML with user input is XSS. classList is better than className (string manipulation). DocumentFragment batches inserts (one reflow)."
      }
    ],
    marginNotes: [
      "textContent is safe (no HTML parsing); innerHTML with user input is XSS (the browser parses it as HTML, executing scripts). Use textContent for text, innerHTML only for trusted content.",
      "classList (add/remove/toggle/contains) is better than className (string manipulation). Don't do el.className += ' active' (space issues).",
      "DocumentFragment batches inserts — append to the fragment, then append the fragment once (one reflow). Appending 100 elements one-by-one causes 100 reflows (slow).",
      "querySelectorAll returns a NodeList (not live — a static snapshot). getElementsByClassName returns an HTMLCollection (live — updates as the DOM changes)."
    ],
    commonMistakes: [
      "Using innerHTML with user input — XSS (the browser parses it as HTML, executing scripts). Use textContent or sanitize.",
      "Appending elements one-by-one (many reflows) — use a DocumentFragment (one reflow for many inserts).",
      "Using className += ' active' (string manipulation) — use classList.add (handles spacing, no duplicates)."
    ],
    relatedTopics: ["Events", "Forms & Input Types", "Performance"],
    externalLinks: [
      { label: "MDN: DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" },
      { label: "MDN: querySelector", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector" }
    ],
    mcqs: [
      { question: "Which is safe for user input: textContent or innerHTML?", options: ["innerHTML", "textContent (no HTML parsing)", "Both", "Neither"], answer: 1, explanations: ["innerHTML is XSS.", "Correct — textContent treats input as text (no parsing); innerHTML parses as HTML (XSS with user input).", "innerHTML is unsafe.", "textContent is safe."], difficulty: "medium" },
      { question: "Why use a DocumentFragment?", options: ["To create elements", "To batch inserts (one reflow instead of many)", "To remove elements", "To style elements"], answer: 1, explanations: ["createElement creates.", "Correct — a fragment batches inserts; appending it once causes one reflow (vs many for one-by-one).", "It doesn't remove.", "It doesn't style."], difficulty: "medium" },
      { question: "Is querySelectorAll's NodeList live?", options: ["Yes", "No — it's a static snapshot (getElementsByClassName is live)", "Only in strict mode", "Only with await"], answer: 1, explanations: ["It's static.", "Correct — querySelectorAll returns a static NodeList; getElementsByClassName/TagName return live HTMLCollections.", "Always static.", "Always static."], difficulty: "medium" }
    ]
  },
  {
    id: "events",
    title: "Events & Event Handling",
    difficulty: "medium",
    definition: `Events are user/browser actions (click, input, keydown, load). addEventListener(type, fn) attaches a handler; removeEventListener removes. The event object has target (the element that triggered), currentTarget (the listener), preventDefault, stopPropagation. Events bubble (child → parent) and capture (parent → child).`,
    coreUnderstanding: `addEventListener('click', fn) attaches a handler (multiple handlers per event, unlike onclick). The event object: e.target (the element that triggered the event — may be a child), e.currentTarget (the element with the listener — the same during the handler), e.preventDefault() (stop the default action — form submit, link navigation), e.stopPropagation() (stop bubbling to parents). Events flow in three phases: capture (parent → child), target, bubble (child → parent). By default, listeners run in the bubble phase; use the third arg { capture: true } for capture. Event delegation: attach one listener to a parent, use e.target to handle children (efficient for lists). removeEventListener requires the SAME function reference (use named functions, not anonymous). once: true auto-removes after the first call.`,
    howItWorks: `1. addEventListener('click', fn) — attach (multiple per event).
2. removeEventListener('click', fn) — remove (needs the same fn reference).
3. e.target — the element that triggered (may be a child).
4. e.currentTarget — the element with the listener (the same during handling).
5. e.preventDefault() — stop the default (form submit, link).
6. e.stopPropagation() — stop bubbling to parents.
7. Phases: capture (parent→child), target, bubble (child→parent).
8. Event delegation: one listener on a parent, use e.target.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// addEventListener (multiple handlers per event)
button.addEventListener('click', handleClick);
button.addEventListener('click', anotherHandler);

// The event object
function handleClick(e) {
  console.log(e.target);       // the element clicked (may be a child)
  console.log(e.currentTarget); // the element with the listener
  e.preventDefault();          // stop default (form submit, link)
  e.stopPropagation();         // stop bubbling
}

// Event delegation (one listener for many children)
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
  }
});
// No need to attach a listener to each <li> — one on the parent.

// removeEventListener (needs the same function reference)
function handler() { /* ... */ }
el.addEventListener('click', handler);
el.removeEventListener('click', handler); // must be the same 'handler'

// Capture phase (parent → child, before bubble)
parent.addEventListener('click', fn, { capture: true });

// once: auto-remove after the first call
button.addEventListener('click', fn, { once: true });`,
        note: "Event delegation: one listener on a parent, use e.target to handle children (efficient for lists — no per-child listeners). e.target is the element that triggered; e.currentTarget is the element with the listener."
      }
    ],
    marginNotes: [
      "Event delegation: one listener on a parent, use e.target to handle children. Efficient for lists (no per-child listeners) and works for dynamically added children.",
      "e.target is the element that triggered (may be a child — e.g., a span inside a button); e.currentTarget is the element with the listener (the same during handling).",
      "removeEventListener needs the SAME function reference — use named functions, not anonymous (anonymous can't be removed). once: true auto-removes.",
      "Events flow: capture (parent→child) → target → bubble (child→parent). Listeners run in bubble by default; { capture: true } for capture. stopPropagation stops bubbling."
    ],
    commonMistakes: [
      "Using anonymous functions with addEventListener — can't removeEventListener (no reference). Use named functions or once: true.",
      "Confusing e.target (the element that triggered) with e.currentTarget (the element with the listener). target may be a child.",
      "Attaching listeners to each child instead of using event delegation — inefficient, and doesn't work for dynamically added children."
    ],
    relatedTopics: ["DOM Manipulation", "Event Loop", "Forms & Input Types"],
    externalLinks: [
      { label: "MDN: Events", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
      { label: "MDN: addEventListener", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" }
    ],
    mcqs: [
      { question: "What's event delegation?", options: ["Multiple listeners", "One listener on a parent, use e.target to handle children", "Removing listeners", "Custom events"], answer: 1, explanations: ["That's the opposite.", "Correct — one listener on a parent; e.target identifies the child. Efficient for lists and dynamic children.", "That's removeEventListener.", "That's CustomEvent."], difficulty: "medium" },
      { question: "What's the difference between e.target and e.currentTarget?", options: ["They're the same", "target triggered the event (may be a child); currentTarget has the listener", "target is newer", "currentTarget is the parent"], answer: 1, explanations: ["They differ.", "Correct — target is the element that triggered (may be a child); currentTarget is the element with the listener.", "Both exist.", "Not necessarily the parent."], difficulty: "medium" },
      { question: "Why can't you removeEventListener an anonymous function?", options: ["You can", "You need the same function reference; anonymous functions have no reference", "It's a bug", "Only in strict mode"], answer: 1, explanations: ["You can't.", "Correct — removeEventListener needs the same reference; anonymous functions can't be removed. Use named functions or once: true.", "By design.", "Always."], difficulty: "medium" }
    ]
  },
  {
    id: "event-delegation",
    title: "Event Delegation & Bubbling",
    difficulty: "medium",
    definition: `Event delegation uses bubbling (events bubble from child to parent) to handle many children with one listener on a parent. e.target identifies the child. It's efficient (one listener) and works for dynamically added children.`,
    coreUnderstanding: `When you click a child, the event bubbles up to all ancestors. Instead of attaching a listener to each child (100 listeners for 100 items), attach one to the parent and use e.target to identify the child. Benefits: (1) One listener (memory, performance). (2) Works for dynamically added children (no need to attach listeners when adding). (3) Centralized handling. The pattern: parent.addEventListener('click', e => { if (e.target.matches('.item')) handle(e.target); }). Watch for: e.target may be a descendant of the intended element (a span inside a button) — use e.target.closest('.item') to find the intended ancestor. stopPropagation stops bubbling (use sparingly — it breaks delegation).`,
    howItWorks: `1. Attach one listener to a parent.
2. e.target — the element that triggered (the child).
3. e.target.matches('.item') — check if it's the intended element.
4. e.target.closest('.item') — find the intended ancestor (handles nested children).
5. Benefits: one listener, works for dynamic children, centralized.
6. stopPropagation stops bubbling (breaks delegation — use sparingly).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `<!-- <ul id="list"><li class="item">Item 1</li><li>Item 2</li></ul> -->

// Event delegation: one listener on the parent
document.getElementById('list').addEventListener('click', (e) => {
  // e.target may be the <li> or a child (span) inside it
  const item = e.target.closest('.item'); // find the intended element
  if (item) {
    console.log('Clicked:', item.textContent);
  }
});

// Without delegation (bad for many/dynamic items):
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => { /* ... */ });
});
// Problems: 100 listeners for 100 items; new items need listeners attached.

// With delegation: one listener, works for new items too
list.appendChild(newItem); // no need to attach a listener — delegation handles it`,
        note: "Event delegation: one listener on a parent, use e.target.closest('.item') to find the intended element (handles nested children). Works for dynamically added children (no per-child listeners)."
      }
    ],
    marginNotes: [
      "Event delegation: one listener on a parent, use e.target to handle children. Efficient (one listener) and works for dynamically added children.",
      "e.target may be a descendant of the intended element (a span inside a button). Use e.target.closest('.item') to find the intended ancestor.",
      "Benefits: one listener (memory), works for dynamic children (no attach on add), centralized handling. Ideal for lists, tables, menus.",
      "stopPropagation stops bubbling — it breaks delegation (the parent won't receive the event). Use it sparingly."
    ],
    commonMistakes: [
      "Attaching listeners to each child instead of delegating — inefficient (many listeners) and breaks for dynamic children.",
      "Using e.target directly when it may be a nested child (span inside a button) — use e.target.closest('.item').",
      "Using stopPropagation excessively — it breaks event delegation (the parent never receives the event)."
    ],
    relatedTopics: ["Events", "DOM Manipulation"],
    externalLinks: [
      { label: "MDN: Event delegation", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation" }
    ],
    mcqs: [
      { question: "What's the main benefit of event delegation?", options: ["Faster events", "One listener for many children (efficient, works for dynamic children)", "More memory", "Better styling"], answer: 1, explanations: ["Not about speed.", "Correct — one listener on a parent handles all children (efficient, works for dynamically added children).", "Less memory.", "Not styling."], difficulty: "easy" },
      { question: "How do you handle e.target being a nested child?", options: ["Use e.target directly", "Use e.target.closest('.item') to find the intended ancestor", "Ignore it", "Use e.currentTarget"], answer: 1, explanations: ["May be the wrong element.", "Correct — closest('.item') finds the intended ancestor (handles a span inside a button).", "Don't ignore.", "currentTarget is the listener, not the child."], difficulty: "medium" },
      { question: "Does stopPropagation affect delegation?", options: ["No", "Yes — it stops bubbling, so the parent never receives the event (breaks delegation)", "Only in capture", "Only in bubble"], answer: 1, explanations: ["It does.", "Correct — stopPropagation prevents the event from reaching the parent, breaking delegation. Use it sparingly.", "Both phases.", "Both phases."], difficulty: "medium" }
    ]
  },
  {
    id: "error-handling",
    title: "Error Handling (try/catch, throw)",
    difficulty: "medium",
    definition: `try/catch/finally handles errors: try runs code, catch handles errors, finally always runs. throw creates an error (Error, TypeError, RangeError). Async: await errors are caught by try/catch; Promise rejections need .catch. Unhandled rejections crash in Node (browser: console warning).`,
    coreUnderstanding: `try { risky() } catch (err) { handle(err) } finally { cleanup() }. finally always runs (even if catch throws or there's a return). throw new Error('msg') creates an error (or TypeError, RangeError, SyntaxError, ReferenceError for specific cases). Error objects have .message and .stack (the call stack — for debugging). For async: await errors are caught by try/catch (clean); Promise.then().catch(fn) handles rejections; unhandled Promise rejections log a warning (browser) or crash (Node — unhandledRejection). Always handle errors (don't let them bubble to the user). Create custom error classes (class MyError extends Error) for domain-specific errors. The error stack is non-standard but available everywhere (for logging). Don't swallow errors (catch {} with no handling) — at least log them.`,
    howItWorks: `1. try { } catch (err) { } finally { } — finally always runs.
2. throw new Error('msg') — create an error.
3. Error types: Error, TypeError, RangeError, SyntaxError, ReferenceError.
4. err.message — the message; err.stack — the call stack (debugging).
5. async: try { await x } catch (e) { } — await errors caught by try/catch.
6. Promise.then().catch(fn) — handle rejections.
7. Unhandled rejections: browser warns; Node crashes (unhandledRejection).
8. Custom errors: class MyError extends Error { }.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// try/catch/finally
try {
  riskyOperation();
} catch (err) {
  console.error(err.message); // the error message
  console.error(err.stack);   // the call stack (debugging)
} finally {
  cleanup(); // always runs (even if catch throws or there's a return)
}

// throw
function divide(a, b) {
  if (b === 0) throw new RangeError('Division by zero');
  return a / b;
}

// Error types
throw new TypeError('x is not a number');
throw new RangeError('index out of bounds');
throw new SyntaxError('invalid syntax');

// Async error handling (await — clean try/catch)
async function fetchData() {
  try {
    const res = await fetch('/api');
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('Failed:', err);
  }
}

// Promise .catch
fetch('/api')
  .then(res => res.json())
  .catch(err => console.error(err));

// Custom error class
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
throw new ValidationError('Invalid email', 'email');`,
        note: "try/catch/finally — finally always runs. await errors are caught by try/catch (clean). Don't swallow errors (catch {} with no handling) — at least log them. Create custom error classes for domain-specific errors."
      }
    ],
    marginNotes: [
      "finally always runs — even if catch throws or there's a return. Use it for cleanup (closing files, clearing timers).",
      "await errors are caught by try/catch (clean). Promise.then().catch(fn) handles rejections. Unhandled rejections warn (browser) or crash (Node).",
      "Don't swallow errors (catch {} with no handling) — at least log them. Silent failures are hard to debug.",
      "Create custom error classes (class MyError extends Error) for domain-specific errors. Set this.name to the class name (otherwise it's 'Error')."
    ],
    commonMistakes: [
      "Swallowing errors (catch {} with no handling) — silent failures are hard to debug. At least log them.",
      "Not handling Promise rejections — unhandled rejections warn (browser) or crash (Node). Always .catch or try/catch.",
      "Using generic Error for everything — use specific types (TypeError, RangeError) or custom classes for clarity."
    ],
    relatedTopics: ["Promises & async/await", "Fetch & APIs"],
    externalLinks: [
      { label: "MDN: try/catch", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" },
      { label: "MDN: Error", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" }
    ],
    mcqs: [
      { question: "Does finally always run?", options: ["No", "Yes — even if catch throws or there's a return", "Only on success", "Only on error"], answer: 1, explanations: ["It always runs.", "Correct — finally always runs (cleanup). Even if catch throws or try/catch returns.", "Always.", "Always."], difficulty: "easy" },
      { question: "How do you handle await errors?", options: [".catch on the function", "try/catch around the await (clean)", "Ignore them", "throw"], answer: 1, explanations: ["Works but less clean.", "Correct — try { await x } catch (e) { } catches await errors (cleaner than .catch).", "Don't ignore.", "throw creates errors."], difficulty: "medium" },
      { question: "Is swallowing errors (catch {}) a good practice?", options: ["Yes", "No — at least log them; silent failures are hard to debug", "Only in production", "Only in dev"], answer: 1, explanations: ["No.", "Correct — catch {} with no handling hides bugs. At least log the error (console.error).", "Same rule.", "Same rule."], difficulty: "easy" }
    ]
  },
  {
    id: "json",
    title: "JSON (JavaScript Object Notation)",
    difficulty: "easy",
    definition: `JSON is a lightweight data format: objects {key: value} and arrays [item]. JSON.stringify(obj) serializes to a JSON string; JSON.parse(str) parses back. JSON is the standard for APIs. It supports strings, numbers, booleans, null, objects, arrays (not functions, Dates, undefined).`,
    coreUnderstanding: `JSON is a text format for structured data (the standard for APIs). JSON.stringify(obj) converts a JS value to a JSON string (serialization). JSON.parse(str) converts back (deserialization). JSON supports: strings (double quotes), numbers, booleans, null, objects, arrays. It does NOT support: functions, undefined, Dates (become strings), Symbols, Map/Set, circular references (throws). JSON.stringify has a replacer (filter/transform) and space (indent for readability): JSON.stringify(obj, null, 2). The format is strict: keys must be double-quoted strings; no trailing commas; no comments. JSON is language-independent (every language has a parser). For Dates, use .toISOString() (or a reviver in JSON.parse to reconstruct).`,
    howItWorks: `1. JSON.stringify(obj) — serialize to a JSON string.
2. JSON.parse(str) — parse back to a JS value.
3. JSON.stringify(obj, null, 2) — indented (readable).
4. JSON.stringify(obj, replacer) — filter/transform.
5. JSON.parse(str, reviver) — transform during parse (e.g., reconstruct Dates).
6. Supports: string, number, boolean, null, object, array.
7. NOT supported: function, undefined, Date (→ string), Symbol, Map/Set, circular (throws).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Stringify (serialize)
const obj = { name: 'Alice', age: 30, active: true };
const json = JSON.stringify(obj); // '{"name":"Alice","age":30,"active":true}'

// Parse (deserialize)
const parsed = JSON.parse(json); // { name: 'Alice', age: 30, active: true }

// Indented (readable)
const pretty = JSON.stringify(obj, null, 2);
// {
//   "name": "Alice",
//   "age": 30,
//   "active": true
// }

// Replacer (filter/transform)
const filtered = JSON.stringify(obj, ['name', 'age']); // only those keys
const transformed = JSON.stringify(obj, (key, val) =>
  typeof val === 'number' ? val * 2 : val
);

// Reviver (reconstruct Dates)
const data = { date: new Date() };
const json2 = JSON.stringify(data); // {"date":"2024-01-01T00:00:00.000Z"}
const parsed2 = JSON.parse(json2, (key, val) =>
  key === 'date' ? new Date(val) : val
); // date is a Date object again

// What JSON doesn't support
JSON.stringify({ fn: () => {} }); // {} (functions omitted)
JSON.stringify({ u: undefined }); // {} (undefined omitted)
JSON.stringify({ d: new Date() }); // {"d":"2024-01-01T..."} (Date → string)
const a = {}; a.b = a;
JSON.stringify(a); // TypeError (circular reference)`,
        note: "JSON.stringify serializes (functions, undefined omitted; Dates → strings; circular throws). JSON.parse deserializes. Use a reviver to reconstruct Dates. JSON is the API standard."
      }
    ],
    marginNotes: [
      "JSON.stringify omits functions and undefined; Dates become strings; circular references throw. Use a reviver in JSON.parse to reconstruct Dates.",
      "JSON is strict: double-quoted keys, no trailing commas, no comments. JSON5 (a superset) allows comments/trailing commas but isn't standard.",
      "JSON.stringify(obj, null, 2) indents for readability (logging). The replacer (array or function) filters/transforms; the reviver transforms during parse.",
      "JSON is the standard for APIs (lightweight, language-independent). Every language has a parser. Use it for data exchange, not for JS-specific objects (Dates, Maps)."
    ],
    commonMistakes: [
      "Expecting JSON.stringify to preserve functions, Dates, or undefined — they're omitted or converted (Dates → strings). Use a reviver for Dates.",
      "Using single quotes in JSON — JSON requires double quotes for keys and strings. '{name: \"Alice\"}' is invalid JSON.",
      "Not handling circular references — JSON.stringify throws on circular objects. Use a replacer or a library (flatted) for circular data."
    ],
    relatedTopics: ["Objects & References", "Fetch & APIs"],
    externalLinks: [
      { label: "MDN: JSON", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON" },
      { label: "MDN: JSON.stringify", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify" }
    ],
    mcqs: [
      { question: "Does JSON.stringify preserve functions?", options: ["Yes", "No — functions are omitted", "They become strings", "They throw"], answer: 1, explanations: ["They're omitted.", "Correct — functions (and undefined) are omitted from the JSON string. Dates become strings.", "They're omitted.", "Circular throws, not functions."], difficulty: "medium" },
      { question: "What does JSON.stringify do with Dates?", options: ["Preserves them", "Converts to strings (use a reviver to reconstruct)", "Omits them", "Throws"], answer: 1, explanations: ["It doesn't preserve.", "Correct — Dates become ISO strings. Use a reviver in JSON.parse to reconstruct them as Dates.", "They're included (as strings).", "It doesn't throw."], difficulty: "medium" },
      { question: "Does JSON allow single-quoted keys?", options: ["Yes", "No — keys must be double-quoted", "Only in JSON5", "Only in strict mode"], answer: 1, explanations: ["No.", "Correct — JSON requires double quotes for keys and strings. Single quotes are invalid JSON.", "JSON5 allows them (not standard).", "Always double."], difficulty: "easy" }
    ]
  },
  {
    id: "modules",
    title: "ES Modules (import/export)",
    difficulty: "medium",
    definition: `ES Modules are the standard JS module system: export (named or default) and import. Modules are files with their own scope (not global). They're statically analyzable (imports are hoisted), strict by default, and support tree-shaking (unused exports are removed).`,
    coreUnderstanding: `ES Modules (ESM) are the standard (replacing CommonJS require/module.exports). Each module (file) has its own scope (no global pollution). export can be named (export const x) or default (export default x — one per module). import: named (import { x } from './mod'), default (import x from './mod'), or both (import x, { y } from './mod'). Imports are hoisted (available before the line — but use top-level for clarity). Modules are strict mode by default. They're statically analyzable (the bundler knows what's imported — tree-shaking removes unused exports). Dynamic imports (import('./mod')) return a Promise (lazy loading). CommonJS (require) is synchronous; ESM supports top-level await. In browsers: <script type="module"> (deferred by default, CORS required). In Node: .mjs extension or "type": "module" in package.json.`,
    howItWorks: `1. export const x = 5 — named export.
2. export default x — default export (one per module).
3. import { x } from './mod' — named import.
4. import x from './mod' — default import.
5. import * as mod from './mod' — namespace import.
6. import { x as y } from './mod' — rename.
7. import('./mod') — dynamic import (returns a Promise, lazy load).
8. Modules are strict mode by default; statically analyzable (tree-shaking).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// math.js
export const add = (a, b) => a + b;      // named export
export const sub = (a, b) => a - b;
export default function multiply(a, b) {  // default export (one per file)
  return a * b;
}

// main.js
import multiply, { add, sub } from './math'; // default + named
import { add as plus } from './math';        // rename
import * as math from './math';              // namespace
math.add(1, 2);

// Dynamic import (lazy load — returns a Promise)
button.addEventListener('click', async () => {
  const { add } = await import('./math'); // loaded on demand
  console.log(add(1, 2));
});

// Re-export
export { add } from './math';        // re-export
export * from './math';              // re-export all

// Browser: <script type="module" src="main.js"></script>
// (deferred by default, CORS required, strict mode)`,
        note: "ES Modules: export (named or default), import (named, default, namespace, rename). Dynamic import() returns a Promise (lazy loading). Modules are strict by default and statically analyzable (tree-shaking)."
      }
    ],
    marginNotes: [
      "ES Modules are the standard (replacing CommonJS require). Each module has its own scope; imports are hoisted; strict mode by default.",
      "export default (one per file) vs named exports (multiple). import default without braces (import x); named with braces (import { x }).",
      "Dynamic import('./mod') returns a Promise — lazy loading (load on demand, code splitting). Use it for large, rarely-used modules.",
      "Modules are statically analyzable — the bundler knows what's imported, enabling tree-shaking (unused exports are removed from the bundle)."
    ],
    commonMistakes: [
      "Mixing default and named import syntax — default has no braces (import x); named has braces (import { x }). import x, { y } for both.",
      "Using CommonJS require/module.exports in ESM — they're different systems. Use import/export in ESM.",
      "Forgetting that <script type='module'> is CORS-restricted and deferred by default — file:// won't work (needs a server)."
    ],
    relatedTopics: ["Scope & Closures", "Promises & async/await"],
    externalLinks: [
      { label: "MDN: Modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
      { label: "MDN: import", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import" }
    ],
    mcqs: [
      { question: "What's the difference between default and named exports?", options: ["They're the same", "default is one per file (import x); named is multiple (import { x })", "default is newer", "named is faster"], answer: 1, explanations: ["They differ.", "Correct — one default per file (import x, no braces); multiple named (import { x }, braces).", "Both ES6.", "Same speed."], difficulty: "medium" },
      { question: "Does import() (dynamic) return a Promise?", options: ["No", "Yes — it's for lazy loading (code splitting)", "Only with await", "Only in Node"], answer: 1, explanations: ["It does.", "Correct — import('./mod') returns a Promise (lazy loading). Use it for large, rarely-used modules.", "It returns a Promise (await it).", "Same in browsers."], difficulty: "medium" },
      { question: "Are ES Modules strict mode by default?", options: ["No", "Yes — modules are always strict", "Only with 'use strict'", "Only in Node"], answer: 1, explanations: ["They are.", "Correct — ESM is strict mode by default (no need for 'use strict').", "No need for the pragma.", "Same in browsers."], difficulty: "easy" }
    ]
  },
  {
    id: "strict-mode",
    title: "Strict Mode ('use strict')",
    difficulty: "easy",
    definition: `Strict mode enforces stricter parsing and error handling: silent errors become throws, assignments to undeclared variables throw, this is undefined (not global), duplicate parameters are errors, octal literals are forbidden. ES Modules and classes are strict by default.`,
    coreUnderstanding: `'use strict' (at the top of a script or function) enables strict mode — a safer subset of JS. Changes: (1) Assigning to an undeclared variable throws (x = 5 without let/var — ReferenceError; non-strict creates a global). (2) this is undefined in functions (not the global object). (3) Duplicate parameter names throw. (4) Octal literals (0o...) are forbidden (use 0o prefix). (5) delete on non-deletable properties throws. (6) with statements are forbidden. (7) arguments doesn't track parameter reassignment. ES Modules and classes are strict by default (no need for the pragma). Strict mode catches bugs early (silent errors become throws) and enables optimizations (the engine can assume no weird behavior). Always use strict mode (it's the default in ESM and classes; add 'use strict' to scripts).`,
    howItWorks: `1. 'use strict' at the top of a script or function.
2. Assigning to undeclared variable throws (x = 5 without let/var).
3. this is undefined in functions (not global).
4. Duplicate parameter names throw.
5. Octal literals (010) forbidden (use 0o10).
6. with statements forbidden; delete on non-deletable throws.
7. ES Modules and classes are strict by default.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `'use strict';

// Assigning to undeclared variable throws
// x = 5; // ReferenceError (non-strict: creates a global x)

// this is undefined in functions (not global)
function f() { console.log(this); } // undefined (strict), window (non-strict)

// Duplicate parameter names throw
// function g(a, a) {} // SyntaxError (strict); allowed (non-strict)

// Octal literals forbidden
// const x = 010; // SyntaxError (strict); 8 (non-strict)
const y = 0o10; // 8 (ES6 octal prefix — allowed)

// delete on non-deletable throws
// delete Object.prototype; // TypeError (strict); false (non-strict)

// ES Modules and classes are strict by default (no pragma needed)
// module.js
export const x = 5; // strict by default
// class C { } // strict by default`,
        note: "Strict mode catches bugs early (silent errors become throws). ES Modules and classes are strict by default (no need for 'use strict'). Always use strict mode."
      }
    ],
    marginNotes: [
      "Strict mode catches bugs early: undeclared assignments throw (no accidental globals), this is undefined (not global), duplicate params throw.",
      "ES Modules and classes are strict by default — no need for 'use strict'. Add it to scripts (non-module).",
      "this is undefined in functions (strict) vs the global object (non-strict) — this is a major difference (affects callbacks).",
      "Strict mode enables engine optimizations (the engine can assume no with, no accidental globals, etc.). Always use it."
    ],
    commonMistakes: [
      "Not using strict mode — silent bugs (accidental globals, this being the global object). Add 'use strict' to scripts.",
      "Expecting this to be the global object in a function (strict mode) — it's undefined. Use arrow functions or bind.",
      "Forgetting that ES Modules and classes are strict by default — adding 'use strict' is harmless but unnecessary."
    ],
    relatedTopics: ["The this Keyword", "ES Modules", "var let const"],
    externalLinks: [
      { label: "MDN: Strict mode", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode" }
    ],
    mcqs: [
      { question: "What happens to x = 5 (no let/var) in strict mode?", options: ["Creates a global", "Throws ReferenceError", "Undefined", "Works"], answer: 1, explanations: ["Non-strict creates a global.", "Correct — strict mode throws (no accidental globals). Non-strict silently creates a global x.", "It throws.", "It throws."], difficulty: "medium" },
      { question: "Are ES Modules strict by default?", options: ["No", "Yes — no need for 'use strict'", "Only with the pragma", "Only in Node"], answer: 1, explanations: ["They are.", "Correct — ESM and classes are strict by default (no 'use strict' needed).", "No pragma needed.", "Same in browsers."], difficulty: "easy" },
      { question: "What is this in a function (strict mode)?", options: ["The global object", "undefined (not the global object)", "The function", "null"], answer: 1, explanations: ["Non-strict: global.", "Correct — strict mode: this is undefined in functions (not the global object). Affects callbacks.", "Not the function.", "Not null."], difficulty: "medium" }
    ]
  }
];