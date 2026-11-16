// JS topics part 3: Advanced JS, Storage, Web APIs (topics 23-33)
export default [
  {
    id: "localstorage-sessionstorage",
    title: "localStorage & sessionStorage",
    difficulty: "easy",
    definition: `Web Storage stores key-value pairs in the browser. localStorage persists indefinitely; sessionStorage clears on tab close. Both store strings (serialize with JSON), are synchronous, and limited to ~5-10MB per origin. Not for sensitive data (XSS can read it).`,
    coreUnderstanding: `localStorage and sessionStorage are simple key-value stores (strings only). localStorage survives browser restarts; sessionStorage is per-tab (closing the tab clears it). They're synchronous (block the main thread — don't store large data). The ~5MB limit is per origin. They're not for sensitive data (any script on the page can read them — XSS can steal tokens). For sensitive data, use HttpOnly cookies (not accessible via JS). For large/structured data, use IndexedDB (asynchronous, much larger). Web Storage is great for: preferences, theme, simple state, non-sensitive tokens (with XSS awareness). The API: setItem, getItem, removeItem, clear, length, key(i). The storage event fires in OTHER tabs when localStorage changes (cross-tab sync).`,
    howItWorks: `1. localStorage.setItem('key', 'value') — store (strings only).
2. localStorage.getItem('key') — retrieve (null if missing).
3. localStorage.removeItem('key') — delete one.
4. localStorage.clear() — delete all.
5. sessionStorage — same API, per-tab lifetime.
6. JSON.stringify/parse for objects.
7. storage event — fires in OTHER tabs (cross-tab sync).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Store a string
localStorage.setItem('theme', 'dark');

// Retrieve
const theme = localStorage.getItem('theme'); // 'dark'

// Store an object (serialize)
const user = { name: 'Alice', age: 30 };
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
const stored = JSON.parse(localStorage.getItem('user'));

// Remove
localStorage.removeItem('theme');

// Clear all
localStorage.clear();

// Cross-tab sync (storage event fires in OTHER tabs)
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') applyTheme(e.newValue);
});
// In tab A: localStorage.setItem('theme', 'dark');
// In tab B: the storage event fires, applyTheme('dark') runs.`,
        note: "localStorage persists; sessionStorage clears on tab close. Both are synchronous (block the main thread). The storage event fires in OTHER tabs (not the one that changed) — use it for cross-tab sync (e.g., logout in all tabs)."
      }
    ],
    marginNotes: [
      "localStorage persists forever; sessionStorage clears on tab close. Both are per-origin and synchronous (block the main thread).",
      "Don't store sensitive data (tokens) in localStorage — XSS can read it. Use HttpOnly cookies for auth tokens (JS-inaccessible).",
      "The storage event fires in OTHER tabs (not the one that changed) — use it for cross-tab sync (e.g., logout in all tabs, theme sync).",
      "For large/structured data, use IndexedDB (asynchronous, much larger). Web Storage is for small, simple, non-sensitive data."
    ],
    commonMistakes: [
      "Storing auth tokens in localStorage — XSS can steal them; use HttpOnly cookies.",
      "Forgetting to JSON.stringify objects — they become '[object Object]'.",
      "Storing large data in localStorage — it's synchronous and blocks; use IndexedDB."
    ],
    relatedTopics: ["JSON", "IndexedDB", "Cookies"],
    externalLinks: [
      { label: "MDN: Web Storage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" }
    ],
    mcqs: [
      { question: "What's the difference between localStorage and sessionStorage?", options: ["localStorage persists; sessionStorage clears on tab close", "They're the same", "localStorage is faster", "sessionStorage is larger"], answer: 0, explanations: ["Correct.", "They differ in lifetime.", "Same speed.", "Same limit."], difficulty: "easy" },
      { question: "Should you store auth tokens in localStorage?", options: ["Yes", "No — XSS can read it; use HttpOnly cookies", "Only for short tokens", "Only with encryption"], answer: 1, explanations: ["Risky.", "Correct — any script can read localStorage; XSS steals tokens. HttpOnly cookies are JS-inaccessible.", "Still vulnerable.", "Encryption doesn't prevent theft."], difficulty: "medium" },
      { question: "In which tab does the storage event fire?", options: ["The tab that changed", "Other tabs (not the one that changed)", "All tabs", "No tabs"], answer: 1, explanations: ["Not the changer.", "Correct — the storage event fires in OTHER tabs (cross-tab sync). The changing tab doesn't get the event.", "Other tabs.", "Other tabs."], difficulty: "medium" }
    ]
  },
  {
    id: "indexeddb",
    title: "IndexedDB (Asynchronous Database)",
    difficulty: "hard",
    definition: `IndexedDB is a browser-based NoSQL database (asynchronous, transactional, much larger than Web Storage). It stores objects in object stores, queried by keys and indexes. Ideal for offline apps, large datasets, and structured data. The API is verbose; libraries (Dexie) simplify it.`,
    coreUnderstanding: `IndexedDB is a powerful client-side database (NoSQL — object stores, not tables). It's asynchronous (doesn't block the main thread, unlike localStorage), transactional (operations are all-or-nothing), and can store much more (hundreds of MB to GB). It stores objects (not just strings) with keys and indexes (for fast queries). The API is notoriously verbose (open a database, create stores, transactions, requests). Most developers use a library (Dexie, idb) for a cleaner API. Use cases: offline apps (PWA), large datasets (caching API responses), structured data (notes, messages). It's more complex than localStorage but far more capable. The same-origin policy applies. Versioning (changing the schema) uses the version number and onupgradeneeded.`,
    howItWorks: `1. indexedDB.open('name', version) — open (returns a request).
2. onupgradeneeded — create/modify object stores (only place to change schema).
3. transaction(store, mode) — 'readonly' or 'readwrite'.
4. store.put(obj) / get(key) / delete(key) — CRUD (returns a request).
5. store.index('name') — query by an index.
6. All operations are asynchronous (requests) and transactional.
7. Libraries (Dexie, idb) simplify the verbose API.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Raw IndexedDB (verbose)
const request = indexedDB.open('MyDB', 1);

request.onupgradeneeded = (e) => {
  const db = e.target.result;
  if (!db.objectStoreNames.contains('users')) {
    const store = db.createObjectStore('users', { keyPath: 'id' });
    store.createIndex('name', 'name'); // index for querying by name
  }
};

request.onsuccess = (e) => {
  const db = e.target.result;
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');

  store.put({ id: 1, name: 'Alice', age: 30 }); // add/update
  store.get(1).onsuccess = (e) => console.log(e.target.result);

  tx.oncomplete = () => db.close();
};

// With Dexie (much cleaner)
import Dexie from 'dexie';
const db = new Dexie('MyDB');
db.version(1).stores({ users: 'id, name, age' });
await db.users.put({ id: 1, name: 'Alice', age: 30 });
const user = await db.users.get(1);
const adults = await db.users.where('age').above(18).toArray();`,
        note: "IndexedDB is powerful but verbose. The raw API uses requests and transactions. Libraries (Dexie, idb) provide a clean Promise-based API. Use it for offline apps, large datasets, structured data."
      }
    ],
    marginNotes: [
      "IndexedDB is asynchronous (doesn't block) and transactional (all-or-nothing) — unlike localStorage (synchronous, simple). It stores objects, not just strings.",
      "The raw API is verbose (open, onupgradeneeded, transactions, requests). Use a library (Dexie, idb) for a clean Promise-based API.",
      "onupgradeneeded is the ONLY place to create/modify object stores and indexes (schema changes). It runs when the version increases.",
      "Use IndexedDB for offline apps (PWA), large datasets (caching), structured data. Use localStorage for small, simple, non-sensitive data."
    ],
    commonMistakes: [
      "Using localStorage for large data — it's synchronous (blocks) and limited to ~5MB. Use IndexedDB (asynchronous, much larger).",
      "Modifying the schema outside onupgradeneeded — you can only create/modify stores and indexes there (when the version changes).",
      "Using the raw API instead of a library (Dexie, idb) — the raw API is verbose and error-prone; libraries simplify it."
    ],
    relatedTopics: ["localStorage & sessionStorage", "Service Workers", "Promises & async/await"],
    externalLinks: [
      { label: "MDN: IndexedDB", url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" },
      { label: "Dexie.js", url: "https://dexie.org/" }
    ],
    mcqs: [
      { question: "Is IndexedDB synchronous or asynchronous?", options: ["Synchronous", "Asynchronous (doesn't block the main thread)", "Both", "Neither"], answer: 1, explanations: ["localStorage is sync.", "Correct — IndexedDB is asynchronous (unlike localStorage). It doesn't block the main thread.", "Async.", "Async."], difficulty: "medium" },
      { question: "Where can you create object stores?", options: ["Anywhere", "Only in onupgradeneeded (when the version changes)", "In a transaction", "In onsuccess"], answer: 1, explanations: ["Not anywhere.", "Correct — onupgradeneeded is the only place to create/modify stores and indexes (schema changes).", "Not in a transaction.", "Not in onsuccess."], difficulty: "hard" },
      { question: "Should you use the raw IndexedDB API?", options: ["Yes, always", "A library (Dexie, idb) simplifies the verbose API", "Only in Node", "Only in workers"], answer: 1, explanations: ["It's verbose.", "Correct — the raw API is verbose (requests, transactions). Libraries (Dexie, idb) provide a clean Promise-based API.", "Same in browsers.", "Same in workers."], difficulty: "medium" }
    ]
  },
  {
    id: "cookies",
    title: "Cookies & HttpOnly",
    difficulty: "medium",
    definition: `Cookies are key-value pairs sent with every HTTP request (to the same origin). They're set by the server (Set-Cookie) or JS (document.cookie). HttpOnly cookies are JS-inaccessible (secure for auth tokens). Attributes: Secure, SameSite, Max-Age, Path, Domain.`,
    coreUnderstanding: `Cookies are the original web storage — sent with every HTTP request to the same origin (automatic, unlike localStorage). Set by the server (Set-Cookie header) or JS (document.cookie = 'key=value; ...'). Attributes: HttpOnly (JS can't read it — secure for auth tokens; XSS can't steal it), Secure (HTTPS only), SameSite (Strict, Lax, None — controls cross-site sending; prevents CSRF), Max-Age/Expires (lifetime), Path, Domain (scope). document.cookie is awkward (a string, not an object — you set one cookie at a time, read all at once). For auth: use HttpOnly + Secure + SameSite=Lax/Strict cookies (the server sets them; JS can't read them — XSS-safe). For preferences, use localStorage (simpler, not sent with every request). Cookies are limited to ~4KB each.`,
    howItWorks: `1. Set-Cookie: key=value; HttpOnly; Secure; SameSite=Lax; Max-Age=3600 (server).
2. document.cookie = 'key=value; ...' (JS — can't set HttpOnly).
3. HttpOnly — JS can't read (document.cookie excludes it) — secure for tokens.
4. Secure — HTTPS only.
5. SameSite — Strict (no cross-site), Lax (top-level GETs), None (always, needs Secure).
6. Max-Age (seconds) / Expires (date) — lifetime.
7. Path, Domain — scope (which URLs receive the cookie).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// JS sets a cookie (can't set HttpOnly — only the server can)
document.cookie = 'theme=dark; max-age=31536000; path=/';
document.cookie = 'lang=en; SameSite=Lax; Secure';

// Read all cookies (a string, not an object)
console.log(document.cookie); // 'theme=dark; lang=en'
// Parse manually:
const cookies = Object.fromEntries(
  document.cookie.split('; ').map(c => c.split('='))
);

// Delete a cookie (set Max-Age=0 or an expired Expires)
document.cookie = 'theme=; max-age=0; path=/';

// Server sets an HttpOnly cookie (JS can't read it — XSS-safe)
// HTTP response header:
// Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Lax; Max-Age=3600
// JS: document.cookie // doesn't include 'token' (HttpOnly)`,
        note: "HttpOnly cookies are JS-inaccessible (document.cookie excludes them) — secure for auth tokens (XSS can't steal them). Only the server can set HttpOnly. For auth: HttpOnly + Secure + SameSite=Lax/Strict."
      }
    ],
    marginNotes: [
      "HttpOnly cookies are JS-inaccessible (document.cookie excludes them) — use them for auth tokens (XSS can't steal them). Only the server can set HttpOnly.",
      "SameSite prevents CSRF: Strict (no cross-site sending), Lax (top-level GETs only — the default), None (always, needs Secure).",
      "Cookies are sent with EVERY HTTP request to the same origin (automatic) — unlike localStorage (manual). This is why they're used for auth (the server gets them automatically).",
      "document.cookie is awkward — a string (set one at a time, read all at once). For preferences, use localStorage (simpler). Cookies are for auth (HttpOnly, server-set)."
    ],
    commonMustakes: [
      "Setting auth tokens in JS-accessible cookies (no HttpOnly) — XSS can steal them. Use HttpOnly (server-set, JS-inaccessible).",
      "Not setting SameSite — default is Lax (good), but older browsers sent cookies cross-site (CSRF risk). Set SameSite=Lax or Strict.",
      "Using cookies for preferences — they're sent with every request (overhead). Use localStorage (simpler, not sent automatically)."
    ],
    commonMistakes: [
      "Setting auth tokens in JS-accessible cookies (no HttpOnly) — XSS can steal them. Use HttpOnly (server-set).",
      "Not setting SameSite — CSRF risk (cross-site requests carry the cookie). Set SameSite=Lax or Strict.",
      "Using cookies for preferences — sent with every request (overhead). Use localStorage."
    ],
    relatedTopics: ["localStorage & sessionStorage", "Fetch & APIs", "Security"],
    externalLinks: [
      { label: "MDN: Cookies", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies" },
      { label: "MDN: Set-Cookie", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie" }
    ],
    mcqs: [
      { question: "What does HttpOnly do?", options: ["Hides the cookie", "JS can't read it (document.cookie excludes it) — secure for tokens", "Encrypts the cookie", "Deletes the cookie"], answer: 1, explanations: ["It doesn't hide (sent with requests).", "Correct — HttpOnly cookies are JS-inaccessible (XSS can't steal them). Use for auth tokens.", "It doesn't encrypt.", "It doesn't delete."], difficulty: "medium" },
      { question: "Can JS set an HttpOnly cookie?", options: ["Yes", "No — only the server can set HttpOnly", "Only with a flag", "Only in strict mode"], answer: 1, explanations: ["It can't.", "Correct — only the server (Set-Cookie header) can set HttpOnly. JS can't (it would defeat the purpose).", "No flag for JS.", "Not a strict mode thing."], difficulty: "medium" },
      { question: "What does SameSite prevent?", options: ["XSS", "CSRF (cross-site requests carrying the cookie)", "Clickjacking", "SQL injection"], answer: 1, explanations: ["HttpOnly prevents XSS.", "Correct — SameSite controls cross-site sending: Strict/Lax prevent CSRF (cross-site requests don't carry the cookie).", "CSP/X-Frame-Options prevent clickjacking.", "Not related."], difficulty: "medium" }
    ]
  },
  {
    id: "mutation-observer",
    title: "MutationObserver & IntersectionObserver",
    difficulty: "hard",
    definition: `MutationObserver watches for DOM changes (added/removed nodes, attribute/ text changes). IntersectionObserver watches when an element enters/leaves the viewport (or a container). Both are efficient alternatives to polling (setInterval) or scroll events.`,
    coreUnderstanding: `MutationObserver watches the DOM for changes (childList, attributes, characterData) and calls a callback when they happen. It's far more efficient than polling (setInterval) or mutation events (deprecated). Use it for: dynamic content (react to added nodes), third-party widgets, or building dev tools. IntersectionObserver watches when an element enters/leaves the viewport (or a root container). Use it for: lazy loading (images, components), infinite scroll, analytics (visibility tracking), pausing offscreen animations. Both are asynchronous (batched — the callback runs after the current task, not for every change). They replace inefficient patterns (scroll events for visibility, polling for DOM changes).`,
    howItWorks: `MutationObserver:
1. new MutationObserver(callback) — create.
2. observe(target, { childList, attributes, subtree, characterData }) — start watching.
3. disconnect() — stop.
4. The callback receives an array of MutationRecords.

IntersectionObserver:
5. new IntersectionObserver(callback, { root, threshold, rootMargin }).
6. observe(element) — watch an element.
7. unobserve(element) / disconnect().
8. The callback receives entries (isIntersecting, intersectionRatio).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// MutationObserver (watch DOM changes)
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      console.log('Nodes added:', mutation.addedNodes);
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });
observer.disconnect(); // stop

// IntersectionObserver (lazy load images)
const imgObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // load the real src
      imgObserver.unobserve(img); // stop watching
    }
  }
}, { rootMargin: '100px' }); // load 100px before visible

document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));

// Infinite scroll
const sentinel = document.querySelector('#sentinel');
const scrollObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
});
scrollObserver.observe(sentinel);`,
        note: "MutationObserver watches DOM changes (efficient — no polling). IntersectionObserver watches viewport visibility (lazy loading, infinite scroll, analytics). Both are asynchronous and batched."
      }
    ],
    marginNotes: [
      "IntersectionObserver is the efficient way to lazy load (images, components) and implement infinite scroll — far better than scroll events (which fire constantly).",
      "MutationObserver watches DOM changes (added/removed nodes, attributes) — efficient, no polling. Use for dynamic content, third-party widgets.",
      "Both are asynchronous and batched — the callback runs after the current task, not for every change (efficient).",
      "rootMargin on IntersectionObserver lets you trigger before the element is visible (e.g., '100px' loads 100px before entering — smoother lazy load)."
    ],
    commonMistakes: [
      "Using scroll events for visibility tracking — they fire constantly (janky). Use IntersectionObserver (efficient, batched).",
      "Using setInterval to poll for DOM changes — inefficient. Use MutationObserver (event-driven, batched).",
      "Forgetting to unobserve/disconnect — memory leaks, especially for elements that are removed."
    ],
    relatedTopics: ["DOM Manipulation", "Events", "Performance"],
    externalLinks: [
      { label: "MDN: MutationObserver", url: "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver" },
      { label: "MDN: IntersectionObserver", url: "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver" }
    ],
    mcqs: [
      { question: "What does IntersectionObserver watch?", options: ["DOM changes", "When an element enters/leaves the viewport", "Scroll position", "Clicks"], answer: 1, explanations: ["That's MutationObserver.", "Correct — IntersectionObserver watches viewport visibility (lazy loading, infinite scroll, analytics).", "Scroll events do that (less efficient).", "That's click events."], difficulty: "medium" },
      { question: "What's the efficient way to lazy load images?", options: ["setInterval", "scroll events", "IntersectionObserver", "setTimeout"], answer: 2, explanations: ["Polling (bad).", "Fire constantly (janky).", "Correct — IntersectionObserver is efficient and batched. Use data-src + rootMargin.", "Not for this."], difficulty: "medium" },
      { question: "What does MutationObserver watch?", options: ["Viewport visibility", "DOM changes (added/removed nodes, attributes)", "Mouse moves", "Network requests"], answer: 1, explanations: ["That's IntersectionObserver.", "Correct — MutationObserver watches DOM mutations (childList, attributes, characterData).", "That's mouse events.", "That's fetch."], difficulty: "medium" }
    ]
  },
  {
    id: "service-workers",
    title: "Service Workers & PWAs",
    difficulty: "hard",
    definition: `A Service Worker is a background script (separate thread) that controls a page's network requests (caching, offline), push notifications, and background sync. It enables PWAs (installable, offline apps). It has no DOM access; it's event-driven (install, activate, fetch, push).`,
    coreUnderstanding: `A Service Worker is a proxy between the page and the network — it can intercept requests, serve cached responses (offline), and queue background sync. It runs on a separate thread (no DOM access — can't use document, window). It's event-driven: install (set up caches), activate (cleanup old caches), fetch (intercept requests), push (notifications), sync (background tasks). It only works on HTTPS (security). Lifecycle: register → install → activate → control. It controls pages only after activation (navigator.serviceWorker.controller). Use cases: offline apps (PWA), caching (performance), push notifications, background sync. The Cache API (caches.open, put, match) stores requests/responses for offline. Workbox (Google's library) simplifies service worker recipes (caching strategies).`,
    howItWorks: `1. navigator.serviceWorker.register('sw.js') — register (returns a Promise).
2. install event — set up caches (cache.addAll).
3. activate event — cleanup old caches.
4. fetch event — intercept requests (cache-first, network-first, etc.).
5. push event — push notifications.
6. sync event — background sync (retry failed requests).
7. No DOM access (separate thread); HTTPS only.
8. Cache API: caches.open('name').put(request, response).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Register (in the page)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Registered', reg));
}

// sw.js (the service worker — no DOM access)
const CACHE = 'v1';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  // Cache-first strategy
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).then(res => {
        // Optionally cache the new response
        return caches.open(CACHE).then(c => {
          c.put(e.request, res.clone());
          return res;
        });
      })
    )
  );
});`,
        note: "A service worker intercepts fetch events for offline support. Cache-first (serve cache, fallback to network), network-first (try network, fallback to cache), or stale-while-revalidate. No DOM access; HTTPS only."
      }
    ],
    marginNotes: [
      "Service workers have NO DOM access (separate thread) and require HTTPS. They intercept fetch events for offline support and caching.",
      "Caching strategies: cache-first (serve cache, fallback to network — offline apps), network-first (try network, fallback to cache — fresh content), stale-while-revalidate (serve cache, update in background).",
      "The service worker controls pages only after activation (navigator.serviceWorker.controller). A page refresh isn't enough — the SW takes over on the NEXT load.",
      "Workbox (Google's library) simplifies service worker recipes (caching strategies, background sync, push). Don't write raw SW for complex apps."
    ],
    commonMistakes: [
      "Trying to access the DOM (document, window) in a service worker — it has no DOM access (separate thread). Use postMessage to communicate with the page.",
      "Not handling the lifecycle (install, activate) — caches aren't set up, old caches aren't cleaned. Use waitUntil for async operations.",
      "Expecting the service worker to control the current page immediately — it controls on the NEXT load (after activation)."
    ],
    relatedTopics: ["IndexedDB", "Fetch & APIs", "Promises & async/await"],
    externalLinks: [
      { label: "MDN: Service Workers", url: "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" },
      { label: "Workbox", url: "https://developer.chrome.com/docs/workbox/" }
    ],
    mcqs: [
      { question: "Does a service worker have DOM access?", options: ["Yes", "No — it runs on a separate thread (no document/window)", "Only in PWAs", "Only with postMessage"], answer: 1, explanations: ["It doesn't.", "Correct — service workers have no DOM access (separate thread). Use postMessage to communicate with the page.", "Never.", "postMessage is for communication, not DOM."], difficulty: "medium" },
      { question: "Does a service worker require HTTPS?", options: ["No", "Yes — for security (except localhost)", "Only in production", "Only for push"], answer: 1, explanations: ["It does.", "Correct — service workers require HTTPS (security — they intercept requests). localhost is exempt.", "Always HTTPS.", "Always HTTPS."], difficulty: "easy" },
      { question: "When does a service worker control a page?", options: ["Immediately on register", "After activation (the next load)", "Never", "Only on refresh"], answer: 1, explanations: ["Not immediately.", "Correct — the SW controls pages after activation (navigator.serviceWorker.controller). The current page is controlled on the NEXT load.", "After activation.", "A refresh isn't enough (next load)."], difficulty: "hard" }
    ]
  },
  {
    id: "web-workers",
    title: "Web Workers (Background Threads)",
    difficulty: "hard",
    definition: `A Web Worker runs JS on a background thread (parallel execution), offloading heavy computations from the main thread (no UI freezing). Workers have no DOM access; they communicate via postMessage. Dedicated (one page) and Shared (multiple pages) workers exist.`,
    coreUnderstanding: `JS is single-threaded — heavy computation freezes the UI. Web Workers run JS on a separate thread (true parallelism), keeping the main thread responsive. Workers have NO DOM access (no document, window, parent) — they're isolated. Communication is via postMessage (the main thread and worker send messages; data is copied or transferred). Use cases: image processing, data parsing (large CSV/JSON), complex calculations (crypto, ML inference), sorting large arrays. Dedicated workers (new Worker('worker.js')) are tied to one page; Shared workers (new SharedWorker) are shared across pages. Data is copied by default (structured clone); transferable objects (ArrayBuffer, MessagePort) are transferred (zero-copy, the sender loses them). Workers are heavyweight (a new thread); use them for genuinely heavy work, not small tasks (overhead).`,
    howItWorks: `1. const worker = new Worker('worker.js') — create (dedicated).
2. worker.postMessage(data) — send to the worker.
3. worker.onmessage = (e) => — receive from the worker.
4. worker.terminate() — stop.
5. In the worker: self.onmessage, self.postMessage (self is the worker scope).
6. No DOM access (no document, window, parent).
7. Data is copied (structured clone) or transferred (ArrayBuffer — zero-copy).
8. importScripts('lib.js') — import scripts in the worker.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Main thread
const worker = new Worker('worker.js');

worker.postMessage({ data: largeArray });
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};
worker.onerror = (e) => console.error(e.message);
worker.terminate(); // stop

// worker.js (no DOM access)
self.onmessage = (e) => {
  const result = heavyComputation(e.data.data);
  self.postMessage(result);
};

function heavyComputation(arr) {
  // ... heavy work ...
  return arr.map(x => x * 2);
}

// Transferable objects (zero-copy — sender loses them)
const buffer = new ArrayBuffer(1024);
worker.postMessage({ buffer }, [buffer]); // transferred (not copied)
// buffer is now neutered in the main thread (can't use it)

// Import scripts in the worker
importScripts('lib.js', 'utils.js');`,
        note: "Web Workers run JS on a background thread (no UI freezing). No DOM access; communicate via postMessage. Data is copied (structured clone) or transferred (ArrayBuffer — zero-copy). Use for heavy computation."
      }
    ],
    marginNotes: [
      "Web Workers run on a separate thread (true parallelism) — no UI freezing for heavy computation. No DOM access; communicate via postMessage.",
      "Data is copied by default (structured clone). Transferable objects (ArrayBuffer, MessagePort) are transferred (zero-copy, the sender loses them — efficient for large data).",
      "Workers are heavyweight (a new thread) — use them for genuinely heavy work (image processing, large data), not small tasks (overhead exceeds benefit).",
      "Dedicated workers (new Worker) are tied to one page; Shared workers (new SharedWorker) are shared across pages (same origin)."
    ],
    commonMistakes: [
      "Using workers for small tasks — the overhead (thread creation, message copying) exceeds the benefit. Use them for heavy computation.",
      "Trying to access the DOM in a worker — no document/window access. Use postMessage to communicate with the main thread.",
      "Copying large data when transferable objects work — transfer ArrayBuffer (zero-copy, sender loses it) for large buffers."
    ],
    relatedTopics: ["Event Loop", "Promises & async/await", "Performance"],
    externalLinks: [
      { label: "MDN: Web Workers", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API" },
      { label: "MDN: postMessage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage" }
    ],
    mcqs: [
      { question: "Do Web Workers have DOM access?", options: ["Yes", "No — they're isolated (no document/window)", "Only in dedicated workers", "Only with postMessage"], answer: 1, explanations: ["They don't.", "Correct — workers have no DOM access (isolated thread). Communicate via postMessage.", "No workers do.", "postMessage is for communication, not DOM."], difficulty: "medium" },
      { question: "How is data sent to a worker?", options: ["By reference", "Copied (structured clone) or transferred (ArrayBuffer — zero-copy)", "Shared memory only", "Not sent"], answer: 1, explanations: ["Copied (not by reference).", "Correct — data is copied (structured clone) by default; ArrayBuffer can be transferred (zero-copy, sender loses it).", "SharedArrayBuffer exists but is advanced.", "It's sent via postMessage."], difficulty: "hard" },
      { question: "Should you use workers for small tasks?", options: ["Yes", "No — the overhead (thread creation, copying) exceeds the benefit; use for heavy computation", "Only in loops", "Only in async"], answer: 1, explanations: ["No.", "Correct — workers are heavyweight (a new thread). Use them for genuinely heavy work (image processing, large data), not small tasks.", "Same rule.", "Same rule."], difficulty: "medium" }
    ]
  },
  {
    id: "generators-iterators",
    title: "Generators & Iterators",
    difficulty: "hard",
    definition: `An iterator is an object with a next() method returning {value, done}. A generator (function*) is a function that pauses (yield) and resumes — it produces an iterator. Generators enable lazy evaluation, custom iterables, and async generators (for await of).`,
    coreUnderstanding: `An iterator is the protocol for iterating (next() returns {value, done}). An iterable is anything with a [Symbol.iterator] method (arrays, strings, Maps, Sets). A generator (function*) is a concise way to create iterators: it pauses at each yield and resumes on next(). Generators are lazy — they produce values on demand (not all at once), enabling infinite sequences and memory-efficient processing. for...of iterates iterables. yield* delegates to another iterable. Generators are also the basis for async iteration (async function*, for await...of) — useful for streaming data. Use cases: custom iterables (a range object), lazy sequences (infinite Fibonacci), state machines (yield at each state), and async streams (reading a file line by line).`,
    howItWorks: `1. Iterator: { next() } returns { value, done }.
2. Iterable: has [Symbol.iterator] (arrays, strings, Map, Set).
3. function* gen() { yield 1; yield 2; } — a generator.
4. const it = gen(); it.next() — { value: 1, done: false }.
5. for...of — iterates iterables (calls [Symbol.iterator]).
6. yield* — delegate to another iterable.
7. async function* — async generator; for await...of — async iteration.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Generator (lazy — produces values on demand)
function* range(start, end) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}
const it = range(1, 4);
it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 3, done: false }
it.next(); // { value: undefined, done: true }

// for...of (iterates the generator)
for (const n of range(1, 4)) {
  console.log(n); // 1, 2, 3
}

// Infinite sequence (lazy — doesn't run forever)
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1
fib.next().value; // 2

// yield* (delegate)
function* combined() {
  yield* [1, 2, 3];
  yield* 'abc';
}
// → 1, 2, 3, 'a', 'b', 'c'

// Async generator (for streaming data)
async function* fetchPages(url) {
  while (url) {
    const res = await fetch(url);
    const data = await res.json();
    yield data;
    url = data.next;
  }
}
for await (const page of fetchPages('/api')) {
  console.log(page);
}`,
        note: "Generators (function*) are lazy — they produce values on demand (next()), enabling infinite sequences and memory-efficient processing. for...of iterates them. async function* + for await...of for async streams."
      }
    ],
    marginNotes: [
      "Generators are lazy — they produce values on demand (next()), not all at once. This enables infinite sequences (Fibonacci) and memory-efficient processing (large data).",
      "for...of iterates iterables (calls [Symbol.iterator]). Generators are iterables. yield* delegates to another iterable.",
      "async function* (async generators) + for await...of enable async iteration — useful for streaming data (fetching pages, reading a file line by line).",
      "Use cases: custom iterables (a range object), lazy sequences (infinite Fibonacci), state machines (yield at each state), async streams."
    ],
    commonMistakes: [
      "Expecting a generator to run all at once — it's lazy (pauses at each yield, resumes on next()). Call next() or use for...of.",
      "Forgetting that generators are exhausted — after done: true, next() keeps returning { value: undefined, done: true } (can't restart; create a new generator).",
      "Using arrays when generators are better — an infinite Fibonacci array is impossible (memory); a generator produces values on demand (lazy)."
    ],
    relatedTopics: ["Promises & async/await", "Destructuring & Spread"],
    externalLinks: [
      { label: "MDN: Generators", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*" },
      { label: "MDN: Iterators", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols" }
    ],
    mcqs: [
      { question: "Are generators lazy or eager?", options: ["Eager (all at once)", "Lazy (produce values on demand)", "Both", "Neither"], answer: 1, explanations: ["Arrays are eager.", "Correct — generators are lazy (pause at yield, resume on next()). Enables infinite sequences.", "Lazy.", "Lazy."], difficulty: "medium" },
      { question: "Can a generator produce an infinite sequence?", options: ["No (memory)", "Yes — it's lazy (produces values on demand)", "Only with a limit", "Only in async"], answer: 1, explanations: ["Arrays can't (memory).", "Correct — a generator can yield forever (lazy — you take what you need). Infinite Fibonacci is possible.", "No limit needed.", "Sync too."], difficulty: "medium" },
      { question: "How do you iterate an async generator?", options: ["for...of", "for await...of", ".then", "while"], answer: 1, explanations: ["for...of is sync.", "Correct — for await...of iterates async generators (awaits each value). Used for streaming data.", ".then is for Promises.", "while is manual."], difficulty: "hard" }
    ]
  },
  {
    id: "proxy-reflect",
    title: "Proxy & Reflect",
    difficulty: "hard",
    definition: `Proxy wraps an object and intercepts operations (get, set, has, deleteProperty). Reflect provides the default behavior for those traps. Together they enable metaprogramming: validation, logging, reactive systems (Vue 3), and default values.`,
    coreUnderstanding: `A Proxy wraps a target object and lets you intercept operations via 'traps' (get, set, has, deleteProperty, ownKeys, etc.). The handler object defines the traps. Reflect is a companion object with methods matching the traps (Reflect.get, Reflect.set) — they provide the default behavior, so you can call them inside a trap to do the default and add custom logic. Use cases: validation (reject invalid sets), logging (track all access), reactive systems (Vue 3 uses Proxy for reactivity — intercept set to trigger updates), default values (return a default for missing properties), private fields (block access to _-prefixed). Proxies are powerful but have a performance cost (every operation goes through the trap). They're the foundation of Vue 3's reactivity and MobX.`,
    howItWorks: `1. new Proxy(target, handler) — wrap target with handler traps.
2. handler.get(target, prop, receiver) — intercept property access.
3. handler.set(target, prop, value, receiver) — intercept assignment.
4. handler.has(target, prop) — intercept 'in'.
5. handler.deleteProperty(target, prop) — intercept delete.
6. Reflect.get(target, prop) / Reflect.set — default behavior (call in traps).
7. Use cases: validation, logging, reactivity, defaults, privacy.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Validation proxy (reject invalid sets)
const validator = {
  set(target, prop, value) {
    if (prop === 'age' && (value < 0 || value > 150)) {
      throw new RangeError('Invalid age');
    }
    target[prop] = value;
    return true; // set must return true (or throw)
  }
};
const person = new Proxy({}, validator);
person.age = 30; // OK
// person.age = -5; // RangeError (intercepted)

// Default values (return a default for missing properties)
const withDefaults = new Proxy({}, {
  get(target, prop) {
    return prop in target ? target[prop] : 'default';
  }
});
withDefaults.name = 'Alice';
withDefaults.name; // 'Alice'
withDefaults.missing; // 'default'

// Logging (track all access)
const logProxy = new Proxy({ x: 1 }, {
  get(target, prop) {
    console.log(\`Get \${prop}\`);
    return Reflect.get(target, prop); // default behavior
  },
  set(target, prop, value) {
    console.log(\`Set \${prop} = \${value}\`);
    return Reflect.set(target, prop, value); // default + return true
  }
});`,
        note: "Proxy intercepts operations (get, set, etc.) via traps. Reflect provides the default behavior (call it in traps to do the default + custom logic). Use for validation, logging, reactivity (Vue 3), defaults."
      }
    ],
    marginNotes: [
      "Proxy intercepts operations (get, set, has, delete). Reflect provides the default behavior — call Reflect.get/Reflect.set in traps to do the default + custom logic.",
      "The set trap must return true (success) or throw (failure). Returning false (or nothing) in strict mode throws TypeError.",
      "Use cases: validation (reject invalid sets), logging (track access), reactivity (Vue 3 uses Proxy — intercept set to trigger updates), defaults, privacy.",
      "Proxies have a performance cost (every operation goes through the trap). Don't overuse them for performance-critical code."
    ],
    commonMistakes: [
      "Forgetting to return true from the set trap — in strict mode, returning false (or nothing) throws TypeError. Return true on success.",
      "Not using Reflect in traps — calling target[prop] directly works for simple cases but breaks for getters/setters and inheritance. Use Reflect.",
      "Overusing Proxies for performance-critical code — every operation goes through the trap (overhead). Use them when the metaprogramming benefit justifies it."
    ],
    relatedTopics: ["Objects & References", "Classes & Prototypes"],
    externalLinks: [
      { label: "MDN: Proxy", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" },
      { label: "MDN: Reflect", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect" }
    ],
    mcqs: [
      { question: "What does a Proxy do?", options: ["Clones an object", "Wraps an object and intercepts operations (get, set, etc.)", "Freezes an object", "Deletes an object"], answer: 1, explanations: ["It doesn't clone.", "Correct — a Proxy wraps a target and intercepts operations via traps (get, set, has, delete).", "That's Object.freeze.", "It doesn't delete."], difficulty: "hard" },
      { question: "What does Reflect provide?", options: ["A mirror", "Default behavior for Proxy traps (Reflect.get, Reflect.set)", "A copy", "A freeze"], answer: 1, explanations: ["Not a mirror.", "Correct — Reflect provides the default behavior; call it in traps to do the default + custom logic.", "Not a copy.", "Not a freeze."], difficulty: "hard" },
      { question: "What must the set trap return on success?", options: ["false", "true (or throw on failure)", "null", "the value"], answer: 1, explanations: ["false throws (strict).", "Correct — the set trap must return true on success (or throw on failure). Returning false throws in strict mode.", "Not null.", "Not the value."], difficulty: "hard" }
    ]
  },
  {
    id: "symbols",
    title: "Symbols",
    difficulty: "hard",
    definition: `A Symbol is a unique, immutable primitive (Symbol() creates a unique value). They're used as hidden object keys (not enumerated) and for well-known protocols (Symbol.iterator, Symbol.toPrimitive). No two Symbols are equal (even with the same description).`,
    coreUnderstanding: `Symbols are a primitive type (like string, number). Symbol() creates a unique value — Symbol() === Symbol() is false (even with the same description). The description (Symbol('foo')) is just for debugging (not an ID). Symbols are used as object keys that are hidden (not enumerated by for...in or Object.keys — use Object.getOwnPropertySymbols). This makes them useful for private properties and avoiding collisions. Well-known Symbols define protocols: Symbol.iterator (for...of), Symbol.toPrimitive (type coercion), Symbol.hasInstance (instanceof), Symbol.toStringTag. Symbol.for('key') creates/looks up a global Symbol (shared across realms — same key, same Symbol). Symbols are the foundation of the iterable protocol (an object with [Symbol.iterator] is iterable).`,
    howItWorks: `1. Symbol() — a unique value (Symbol() === Symbol() is false).
2. Symbol('desc') — with a description (for debugging, not an ID).
3. Use as object keys (hidden — not in for...in, Object.keys).
4. Object.getOwnPropertySymbols(obj) — get symbol keys.
5. Symbol.for('key') — global Symbol (shared across realms).
6. Well-known: Symbol.iterator, Symbol.toPrimitive, Symbol.hasInstance, Symbol.toStringTag.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Symbols are unique
const s1 = Symbol();
const s2 = Symbol();
console.log(s1 === s2); // false (unique)

const s3 = Symbol('foo');
const s4 = Symbol('foo');
console.log(s3 === s4); // false (description is not an ID)

// Hidden object keys (not enumerated)
const privateId = Symbol('id');
const obj = {
  name: 'Alice',
  [privateId]: 123 // hidden key
};
Object.keys(obj); // ['name'] (symbol keys not included)
for (const key in obj) { console.log(key); } // 'name' only
Object.getOwnPropertySymbols(obj); // [Symbol(id)] — how to get them

// Well-known: Symbol.iterator (makes an object iterable)
const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    return { next: () => ({ value: i++, done: i > 3 }) };
  }
};
for (const n of iterable) console.log(n); // 0, 1, 2

// Symbol.for (global — shared across realms)
const global1 = Symbol.for('shared');
const global2 = Symbol.for('shared');
console.log(global1 === global2); // true (same global Symbol)
Symbol.keyFor(global1); // 'shared'`,
        note: "Symbols are unique (Symbol() === Symbol() is false). As object keys, they're hidden (not enumerated). Well-known Symbols define protocols (Symbol.iterator for for...of). Symbol.for creates global shared Symbols."
      }
    ],
    marginNotes: [
      "Symbols are unique (Symbol() === Symbol() is false, even with the same description). The description is for debugging, not an ID.",
      "Symbol keys are hidden (not in for...in, Object.keys). Use Object.getOwnPropertySymbols to get them. Useful for private properties.",
      "Well-known Symbols define protocols: Symbol.iterator (for...of), Symbol.toPrimitive (coercion), Symbol.hasInstance (instanceof), Symbol.toStringTag.",
      "Symbol.for('key') creates/looks up a global Symbol (shared across realms — same key, same Symbol). Symbol.keyFor(sym) gets the key."
    ],
    commonMistakes: [
      "Expecting Symbol('foo') === Symbol('foo') to be true — they're unique (the description is for debugging, not an ID). Use Symbol.for for shared Symbols.",
      "Expecting for...in or Object.keys to include symbol keys — they don't (symbols are hidden). Use Object.getOwnPropertySymbols.",
      "Not using Symbol.iterator for custom iterables — an object with [Symbol.iterator] is iterable (works with for...of, spread)."
    ],
    relatedTopics: ["Types & Coercion", "Generators & Iterators", "Objects & References"],
    externalLinks: [
      { label: "MDN: Symbol", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol" },
      { label: "MDN: Well-known Symbols", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols" }
    ],
    mcqs: [
      { question: "Is Symbol('foo') === Symbol('foo')?", options: ["true", "false (each Symbol is unique; the description is for debugging)", "TypeError", "undefined"], answer: 1, explanations: ["It's false.", "Correct — Symbols are unique (even with the same description). Use Symbol.for for shared Symbols.", "No error.", "Not undefined."], difficulty: "medium" },
      { question: "Are symbol keys enumerated by for...in?", options: ["Yes", "No — they're hidden (use Object.getOwnPropertySymbols)", "Only in strict mode", "Only with Reflect"], answer: 1, explanations: ["They're not.", "Correct — symbol keys are hidden (not in for...in, Object.keys). Use Object.getOwnPropertySymbols to get them.", "Always hidden.", "Always hidden."], difficulty: "hard" },
      { question: "What does Symbol.iterator define?", options: ["A property", "The iterable protocol (for...of)", "A class", "A type"], answer: 1, explanations: ["Not just a property.", "Correct — an object with [Symbol.iterator] is iterable (works with for...of, spread, destructuring).", "Not a class.", "Not a type."], difficulty: "medium" }
    ]
  },
  {
    id: "maps-sets",
    title: "Maps & Sets",
    difficulty: "medium",
    definition: `Map is a key-value collection (any key type, maintains insertion order). Set is a collection of unique values. WeakMap/WeakSet hold weak references (keys/values are garbage-collected if no other references). They're alternatives to objects/arrays for specific use cases.`,
    coreUnderstanding: `Map: a key-value collection where keys can be ANY type (objects, functions, not just strings/symbols — unlike objects). It maintains insertion order (iteration is predictable). size property (not length). Use for: dictionaries with non-string keys, frequent add/remove (faster than objects for large maps). Set: a collection of unique values (no duplicates). Use for: deduplication (new Set(array)), membership testing (set.has is O(1)). WeakMap: keys must be objects; keys are weakly held (garbage-collected if no other references — useful for associating data with DOM elements without leaks). WeakSet: a Set of objects, weakly held. WeakMap/WeakSet are NOT enumerable (can't iterate — the entries can be GC'd at any time). Map/Set are iterable (for...of, spread). Choose: Map for key-value with non-string keys or frequent add/remove; Set for unique values; objects for simple string-keyed dictionaries (lighter).`,
    howItWorks: `1. new Map() — create; map.set(key, value), get, has, delete, clear.
2. map.size — the count (not length).
3. Keys can be any type (objects, functions — not just strings).
4. Map maintains insertion order (iterable in that order).
5. new Set() — create; set.add(value), has, delete, clear.
6. Set: unique values (no duplicates); set.size.
7. WeakMap: keys must be objects; weakly held (GC'd if no other refs); not enumerable.
8. WeakSet: weak Set of objects; not enumerable.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Map (any key type, insertion order)
const map = new Map();
map.set('name', 'Alice');
map.set(42, 'number key');
map.set({ obj: 1 }, 'object key'); // objects as keys (not possible with plain objects)
map.size; // 3
map.get('name'); // 'Alice'
map.has(42); // true
map.delete('name');
for (const [key, value] of map) { } // insertion order

// Set (unique values)
const set = new Set([1, 2, 2, 3, 3, 3]);
set.size; // 3 (duplicates removed)
set.add(4);
set.has(2); // true
set.delete(1);
// Deduplication
const unique = [...new Set([1, 1, 2, 2, 3])]; // [1, 2, 3]

// WeakMap (keys must be objects; weakly held)
const weakMap = new WeakMap();
const element = document.querySelector('#myEl');
weakMap.set(element, { data: 'private' }); // associated with the element
// When element is removed from the DOM and GC'd, the entry is too (no leak)
// weakMap is NOT iterable (can't for...of)

// WeakSet (weak Set of objects)
const weakSet = new WeakSet();
weakSet.add(element);
weakSet.has(element); // true
// Not iterable; entries GC'd with the objects`,
        note: "Map: any key type, insertion order, size. Set: unique values (deduplication, O(1) has). WeakMap/WeakSet: weakly held (GC'd with the objects), not iterable — use for associating data with objects without leaks."
      }
    ],
    marginNotes: [
      "Map keys can be ANY type (objects, functions) — unlike plain objects (string/symbol keys only). Use Map for non-string keys or frequent add/remove.",
      "Set is for unique values — new Set(array) deduplicates; set.has is O(1) (faster than array.includes for membership).",
      "WeakMap/WeakSet hold weak references — entries are GC'd when the key/value object is. Use for associating data with DOM elements without leaks. NOT iterable.",
      "Map maintains insertion order (iteration is predictable); plain object keys are not ordered (historically, though modern engines preserve string key insertion order for non-integer keys)."
    ],
    commonMistakes: [
      "Using plain objects for dictionaries with non-string keys — object keys are coerced to strings. Use Map for object/function keys.",
      "Using arrays for membership testing (arr.includes is O(n)) — use Set (set.has is O(1)) for large collections.",
      "Expecting to iterate a WeakMap/WeakSet — they're not enumerable (entries can be GC'd at any time)."
    ],
    relatedTopics: ["Objects & References", "Destructuring & Spread"],
    externalLinks: [
      { label: "MDN: Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" },
      { label: "MDN: Set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" }
    ],
    mcqs: [
      { question: "Can Map have object keys?", options: ["No (coerced to strings)", "Yes (any key type, including objects)", "Only in WeakMap", "Only in strict mode"], answer: 1, explanations: ["Plain objects coerce.", "Correct — Map keys can be any type (objects, functions). Plain objects coerce keys to strings.", "Map too.", "Always."], difficulty: "medium" },
      { question: "What's Set used for?", options: ["Key-value pairs", "Unique values (deduplication, O(1) has)", "Ordered lists", "Weak references"], answer: 1, explanations: ["That's Map.", "Correct — Set stores unique values (no duplicates). new Set(arr) deduplicates; set.has is O(1).", "That's arrays.", "That's WeakSet."], difficulty: "easy" },
      { question: "Are WeakMap/WeakSet iterable?", options: ["Yes", "No — entries can be GC'd at any time (not enumerable)", "Only in strict mode", "Only with for await"], answer: 1, explanations: ["They're not.", "Correct — WeakMap/WeakSet are not enumerable (entries can be GC'd). Use for associating data with objects without leaks.", "Never.", "Never."], difficulty: "hard" }
    ]
  },
  {
    id: "performance-js",
    title: "JS Performance & Optimization",
    difficulty: "hard",
    definition: `JS performance: avoid layout thrashing (read then write DOM, not interleaved), debounce/throttle expensive events (scroll, resize), use requestAnimationFrame for animations, offload heavy work to Web Workers, avoid memory leaks (clear timers, remove listeners), use efficient data structures.`,
    coreUnderstanding: `Key performance principles: (1) Avoid layout thrashing — reading DOM properties (offsetWidth, getBoundingClientRect) forces layout (reflow); interleaving reads and writes causes repeated reflows. Batch reads, then batch writes. (2) Debounce/throttle expensive event handlers (scroll, resize, input) — they fire constantly. (3) Use requestAnimationFrame for animations (synced with refresh rate, pauses in background). (4) Offload heavy computation to Web Workers (don't freeze the UI). (5) Avoid memory leaks — clear timers (clearTimeout), remove listeners (removeEventListener), avoid accidental global variables. (6) Use efficient data structures (Map/Set for membership, not array.includes for large arrays). (7) Avoid creating objects in hot loops (GC pressure). (8) Lazy load (dynamic import, IntersectionObserver). Measure with DevTools (Performance tab, Lighthouse).`,
    howItWorks: `1. Avoid layout thrashing — batch DOM reads, then writes (don't interleave).
2. Debounce/throttle scroll, resize, input (they fire constantly).
3. requestAnimationFrame for animations (smooth, pauses in background).
4. Web Workers for heavy computation (don't freeze the UI).
5. Clear timers, remove listeners (avoid memory leaks).
6. Efficient data structures (Map/Set for membership, not array.includes).
7. Avoid object creation in hot loops (GC pressure).
8. Lazy load (dynamic import, IntersectionObserver).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// Layout thrashing (BAD — read + write interleaved)
for (let i = 0; i < items.length; i++) {
  const width = items[i].offsetWidth; // read (forces layout)
  items[i].style.width = width + 10 + 'px'; // write (invalidates)
  // Next iteration reads again (forces layout again) — thrashing!
}

// Batch reads and writes (GOOD)
const widths = items.map(item => item.offsetWidth); // read all
items.forEach((item, i) => item.style.width = widths[i] + 10 + 'px'); // write all

// Debounce (run after a pause)
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
window.addEventListener('resize', debounce(handleResize, 250));

// Throttle (run at most once per interval)
function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) { fn(...args); inThrottle = true;
      setTimeout(() => inThrottle = false, limit); }
  };
}
window.addEventListener('scroll', throttle(handleScroll, 100));

// Avoid memory leaks (clear timers, remove listeners)
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // cleanup
}, []);`,
        note: "Layout thrashing: batch DOM reads, then writes (don't interleave — each read after a write forces a reflow). Debounce/throttle expensive events. Clear timers and remove listeners (memory leaks)."
      }
    ],
    marginNotes: [
      "Layout thrashing: interleaving DOM reads (offsetWidth) and writes (style) forces repeated reflows. Batch reads, then batch writes.",
      "Debounce (run after a pause) for resize/search; throttle (at most once per interval) for scroll/mousemove. Both prevent expensive handlers from firing too often.",
      "Clear timers (clearTimeout) and remove listeners (removeEventListener) — otherwise memory leaks (the handler holds references, preventing GC).",
      "Use efficient data structures: Map/Set for membership (O(1) has), not array.includes (O(n)) for large arrays. Avoid object creation in hot loops (GC pressure)."
    ],
    commonMistakes: [
      "Interleaving DOM reads and writes (layout thrashing) — each read after a write forces a reflow. Batch reads, then writes.",
      "Not debouncing/throttling scroll/resize/input — they fire constantly, freezing the UI. Debounce or throttle expensive handlers.",
      "Not cleaning up timers/listeners — memory leaks (the handler holds references, preventing GC). Clear in useEffect cleanup."
    ],
    relatedTopics: ["Event Loop", "Timers", "Web Workers", "DOM Manipulation"],
    externalLinks: [
      { label: "Web.dev: Performance", url: "https://web.dev/performance/" },
      { label: "MDN: Debouncing", url: "https://developer.mozilla.org/en-US/docs/Glossary/Debounce" }
    ],
    mcqs: [
      { question: "What's layout thrashing?", options: ["A CSS bug", "Interleaving DOM reads and writes (forces repeated reflows)", "A memory leak", "A slow network"], answer: 1, explanations: ["Not a bug.", "Correct — reading DOM (offsetWidth) after writing (style) forces a reflow. Batch reads, then writes.", "Not a leak.", "Not network."], difficulty: "hard" },
      { question: "When do you debounce vs throttle?", options: ["Same thing", "Debounce: after a pause (search); throttle: at most once per interval (scroll)", "Debounce is faster", "Throttle is newer"], answer: 1, explanations: ["They differ.", "Correct — debounce waits for a pause (search input); throttle limits the rate (scroll, mousemove).", "Different uses.", "Both exist."], difficulty: "medium" },
      { question: "How do you avoid memory leaks with timers/listeners?", options: ["Ignore them", "Clear timers and remove listeners (cleanup)", "Use more timers", "Use strict mode"], answer: 1, explanations: ["Don't ignore.", "Correct — clearTimeout, removeEventListener, useEffect cleanup. Otherwise leaks (references prevent GC).", "Opposite.", "Strict mode doesn't help."], difficulty: "medium" }
    ]
  },
  {
    id: "security-xss",
    title: "Security: XSS & CSRF",
    difficulty: "hard",
    definition: `XSS (Cross-Site Scripting): injecting malicious scripts (via innerHTML, eval, unescaped output). Prevent: escape output, use textContent, CSP. CSRF (Cross-Site Request Forgery): tricking a user into submitting a request. Prevent: SameSite cookies, CSRF tokens.`,
    coreUnderstanding: `XSS: an attacker injects a script that runs in the victim's browser (steals cookies, session data). Sources: innerHTML with user input (the browser parses it as HTML, executing scripts), eval (runs arbitrary code), unescaped output in templates. Prevent: (1) Use textContent (not innerHTML) for user input. (2) Escape output (convert <, >, & to entities). (3) Content Security Policy (CSP) — a header restricting script sources. (4) Don't use eval. CSRF: an attacker tricks an authenticated user into submitting a request (e.g., a forged form to a bank). The cookie is sent automatically (the victim is logged in). Prevent: (1) SameSite cookies (Lax/Strict — don't send cross-site). (2) CSRF tokens (a unique token the server validates; the attacker doesn't have it). (3) Check the Referer/Origin header. (4) Don't use GET for state-changing operations (use POST).`,
    howItWorks: `XSS prevention:
1. Use textContent (not innerHTML) for user input.
2. Escape output (< → &lt;, > → &gt;, & → &amp;).
3. CSP header: Content-Security-Policy: script-src 'self'.
4. Don't use eval, Function(), or setTimeout with strings.

CSRF prevention:
5. SameSite cookies (Lax/Strict — don't send cross-site).
6. CSRF tokens (unique token the server validates).
7. Check Referer/Origin headers.
8. Don't use GET for state-changing operations (use POST).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `// XSS: innerHTML with user input (BAD)
const userInput = '<img src=x onerror="stealCookie()">';
element.innerHTML = userInput; // XSS! (the browser runs the script)

// Safe: textContent (no HTML parsing)
element.textContent = userInput; // shows the text (no execution)

// Escape output (for HTML contexts)
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  }[c]));
}
element.innerHTML = '<div>' + escapeHtml(userInput) + '</div>'; // safe

// CSP header (restrict script sources)
// Content-Security-Policy: default-src 'self'; script-src 'self'

// Don't use eval (XSS risk)
// eval(userInput); // XSS!
// new Function(userInput)(); // XSS!
// setTimeout(userInput, 0); // XSS! (string arg)

// CSRF: SameSite cookie (server sets)
// Set-Cookie: token=abc; SameSite=Lax; Secure; HttpOnly

// CSRF token (include in forms)
// <input type="hidden" name="csrf" value="server-generated-token">
// The server validates the token (the attacker doesn't have it)`,
        note: "XSS: use textContent (not innerHTML), escape output, CSP, no eval. CSRF: SameSite cookies, CSRF tokens, check Origin, don't use GET for state changes."
      }
    ],
    marginNotes: [
      "XSS: never use innerHTML with user input (the browser parses it as HTML, executing scripts). Use textContent or escape the output.",
      "CSP (Content-Security-Policy) is a header restricting script sources ('self' only). It's a defense-in-depth measure (prevents XSS even if you miss a spot).",
      "CSRF: SameSite cookies (Lax/Strict) prevent cross-site sending. CSRF tokens (server-validated) are the primary defense. Check the Origin header.",
      "Don't use eval, new Function(), or setTimeout with a string — they run arbitrary code (XSS risk). Use functions (setTimeout(fn, 0), not setTimeout(string, 0))."
    ],
    commonMistakes: [
      "Using innerHTML with user input — XSS. Use textContent or escape the output.",
      "Not setting SameSite on cookies — CSRF risk (cross-site requests carry the cookie). Set SameSite=Lax or Strict.",
      "Using eval or setTimeout with a string — XSS risk (runs arbitrary code). Use functions."
    ],
    relatedTopics: ["DOM Manipulation", "Cookies", "Fetch & APIs"],
    externalLinks: [
      { label: "MDN: XSS", url: "https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting" },
      { label: "MDN: CSP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" }
    ],
    mcqs: [
      { question: "How do you prevent XSS from innerHTML?", options: ["Use innerHTML anyway", "Use textContent (or escape the output)", "Use eval", "Use cookies"], answer: 1, explanations: ["That's the cause.", "Correct — textContent treats input as text (no HTML parsing). Or escape (< → &lt;).", "eval is worse.", "Cookies are unrelated."], difficulty: "medium" },
      { question: "What prevents CSRF?", options: ["XSS prevention", "SameSite cookies + CSRF tokens", "HTTPS", "CSP"], answer: 1, explanations: ["Different attack.", "Correct — SameSite cookies (don't send cross-site) + CSRF tokens (server-validated).", "HTTPS is for transport.", "CSP is for XSS."], difficulty: "medium" },
      { question: "Is eval safe with user input?", options: ["Yes", "No — it runs arbitrary code (XSS risk)", "Only in strict mode", "Only with CSP"], answer: 1, explanations: ["It's not.", "Correct — eval (and new Function, setTimeout with a string) runs arbitrary code — XSS. Never use with untrusted input.", "Still unsafe.", "CSP helps but don't rely on it."], difficulty: "easy" }
    ]
  }
];