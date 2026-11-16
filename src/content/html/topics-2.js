// HTML topics part 2: Accessibility, Media, APIs (topics 13-22)
export default [
  {
    id: "accessibility-aria",
    title: "Accessibility & ARIA",
    difficulty: "hard",
    definition: `ARIA (Accessible Rich Internet Applications) attributes add accessibility to dynamic content that HTML can't express: roles (role="button"), states (aria-expanded), properties (aria-label, aria-describedby). Use ARIA to supplement, not replace, semantic HTML. The first rule of ARIA: don't use ARIA if a native HTML element does the job.`,
    coreUnderstanding: `Semantic HTML is inherently accessible (<button> is keyboard-focusable, announced as 'button', activates on Enter/Space). ARIA is for when HTML isn't enough — custom widgets (a div-based dropdown), dynamic updates (aria-live for announcements), or relationships (aria-labelledby, aria-describedby). Misusing ARIA is worse than no ARIA — a role="button" on a <div> doesn't make it keyboard-accessible (you must add tabindex and key handlers). The golden rule: use native HTML first; ARIA only when HTML can't express the semantics.`,
    howItWorks: `1. role="..." — declares what an element is (button, navigation, dialog, alert, tab).
2. aria-label — accessible name when no visible label exists (icon buttons).
3. aria-labelledby — points to a visible element that labels this one.
4. aria-describedby — points to a description element.
5. aria-expanded — state: is a dropdown/accordion open?
6. aria-hidden — hide from screen readers (decorative elements).
7. aria-live="polite" — announce dynamic changes (polite waits; assertive interrupts).
8. tabindex — make focusable (0 = in tab order; -1 = focusable but not in tab order).`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Bad: div as button (needs ARIA + JS for keyboard) -->
<div role="button" tabindex="0" aria-label="Close"
     onclick="close()" onkeydown="handleKey(event)">×</div>

<!-- Good: use a real button (inherently accessible) -->
<button aria-label="Close" onclick="close()">×</button>

<!-- Accessible dropdown -->
<button aria-expanded="false" aria-haspopup="true"
        onclick="toggle()">Menu</button>
<ul role="menu" hidden>
  <li role="menuitem"><a href="/">Home</a></li>
</ul>

<!-- Live region for dynamic updates -->
<div aria-live="polite" id="status"></div>
<script>
  document.getElementById('status').textContent = 'Saved!';
</script>`,
        note: "The first rule of ARIA: if a native HTML element does the job, use it. A div with role='button' is NOT a button — it lacks keyboard support unless you add it."
      }
    ],
    marginNotes: [
      "First rule of ARIA: don't use ARIA. If <button>, <nav>, <main> work, use them — they're accessible by default.",
      "aria-label is for icon buttons (no visible text). aria-labelledby points to a visible label element (preferred when one exists).",
      "aria-live='polite' announces changes without interrupting; 'assertive' interrupts (use sparingly — annoying for screen reader users).",
      "tabindex='0' adds to tab order; tabindex='-1' is focusable via JS but not in tab order (for roving tabindex in widgets)."
    ],
    commonMistakes: [
      "Using role='button' on a <div> without adding keyboard handlers (Enter/Space) — it's not actually a button.",
      "Using aria-hidden='true' on a focusable element — it's still focusable (remove from DOM or use disabled).",
      "Adding ARIA to elements that already have the semantics (role='button' on a <button>) — redundant."
    ],
    relatedTopics: ["Semantic HTML", "Forms & Input Types"],
    externalLinks: [
      { label: "WAI-ARIA Authoring Guide", url: "https://www.w3.org/WAI/ARIA/apg/" },
      { label: "MDN: ARIA", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" }
    ],
    mcqs: [
      { question: "What's the first rule of ARIA?", options: ["Always use ARIA", "Don't use ARIA if native HTML works", "ARIA is required for all elements", "ARIA replaces HTML"], answer: 1, explanations: ["Not always.", "Correct — use semantic HTML first; ARIA only when HTML can't express the semantics.", "Not required.", "ARIA supplements, not replaces."], difficulty: "medium" },
      { question: "What does aria-live='polite' do?", options: ["Hides the element", "Announces changes without interrupting the screen reader", "Makes it live forever", "Enables live streaming"], answer: 1, explanations: ["That's aria-hidden.", "Correct — polite waits for a pause; assertive interrupts immediately.", "No.", "Not media."], difficulty: "medium" },
      { question: "Why is role='button' on a <div> problematic?", options: ["It's invalid", "It lacks keyboard support (Enter/Space) unless you add it", "It's too slow", "It breaks CSS"], answer: 1, explanations: ["It's valid.", "Correct — a real button is keyboard-accessible; a div needs tabindex + key handlers.", "No performance issue.", "No CSS issue."], difficulty: "hard" }
    ]
  },
  {
    id: "audio-video",
    title: "Audio & Video Elements",
    difficulty: "medium",
    definition: `The <audio> and <video> elements embed media without plugins. Attributes: controls (show UI), autoplay, loop, muted, preload, poster (video). <source> provides format fallbacks. The Media API (JS) controls playback, volume, and events.`,
    coreUnderstanding: `Before HTML5, media required Flash. Now <audio>/<video> are native — faster, mobile-friendly, and accessible. Use <source> for format fallbacks (MP4/WebM for video; MP3/OGG for audio) — the browser picks the first it supports. The controls attribute shows the native UI (not customizable — build custom UI with JS for full control). autoplay is blocked by browsers unless muted (user gesture required) — this is a deliberate UX decision. The Media API exposes play(), pause(), currentTime, volume, and events (timeupdate, ended, loadedmetadata).`,
    howItWorks: `1. <video src controls> — basic video with native controls.
2. <source> — format fallbacks (browser picks the first supported).
3. controls — show native play/pause/volume UI.
4. autoplay muted — autoplay is allowed only if muted (browsers block unmuted autoplay).
5. loop — repeat; poster — image before play; preload — auto/metadata/none.
6. JS API: play(), pause(), currentTime, duration, volume, playbackRate.
7. Events: play, pause, ended, timeupdate, loadedmetadata, error.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Video with format fallbacks -->
<video controls poster="cover.jpg" width="640" height="360">
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  Your browser doesn't support video.
</video>

<!-- Audio -->
<audio controls>
  <source src="audio.ogg" type="audio/ogg">
  <source src="audio.mp3" type="audio/mpeg">
</audio>

<!-- Autoplay (must be muted) -->
<video autoplay muted loop playsinline>
  <source src="bg.mp4" type="video/mp4">
</video>`,
        note: "Browsers block unmuted autoplay — a user gesture (click) is required. Muted autoplay is allowed. This prevents annoying ads."
      },
      {
        lang: "javascript",
        code: `const video = document.querySelector('video');

// Control playback
video.play();
video.pause();
video.currentTime = 30; // seek to 30s
video.volume = 0.5;      // 0 to 1
video.playbackRate = 2;  // 2x speed

// Events
video.addEventListener('timeupdate', () => {
  console.log(video.currentTime / video.duration);
});
video.addEventListener('ended', () => {
  console.log('Finished');
});`,
        note: "The Media API gives full control — build custom UIs (play button, progress bar) by listening to events and updating the UI."
      }
    ],
    marginNotes: [
      "Browsers block unmuted autoplay — always add muted if you want autoplay (background videos). A user gesture is required for sound.",
      "Use <source> for format fallbacks — WebM is smaller (VP9); MP4 is universal (H.264). The browser picks the first it supports.",
      "controls shows native UI (not customizable). For custom UI, omit controls and build your own with the Media API.",
      "Provide <track> for captions/subtitles (accessibility) — <track kind='subtitles' srclang='en' src='subs.vtt'>."
    ],
    commonMistakes: [
      "Trying to autoplay with sound — browsers block it; add muted or require a user gesture.",
      "Only providing one video format — not all browsers support all codecs; use WebM + MP4.",
      "Omitting captions (<track>) — accessibility issue; required for compliance (WCAG)."
    ],
    relatedTopics: ["Images & Media", "Accessibility & ARIA"],
    externalLinks: [
      { label: "MDN: <video> element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video" },
      { label: "MDN: Media API", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement" }
    ],
    mcqs: [
      { question: "Why is unmuted autoplay blocked?", options: ["It's invalid HTML", "Browsers block it for UX (requires a user gesture)", "It's too slow", "It's a security risk"], answer: 1, explanations: ["It's valid.", "Correct — browsers require a user gesture for sound; muted autoplay is allowed.", "Not speed.", "Not security."], difficulty: "medium" },
      { question: "Why use multiple <source> elements?", options: ["To load faster", "Format fallback — browser picks the first it supports", "To play them all", "For SEO"], answer: 1, explanations: ["One loads.", "Correct — different browsers support different codecs; provide fallbacks.", "Only one plays.", "Not SEO."], difficulty: "medium" },
      { question: "How do you add captions to a video?", options: ["<caption>", "<track kind='subtitles'>", "alt attribute", "title attribute"], answer: 1, explanations: ["That's for tables.", "Correct — track provides subtitles/captions (WebVTT).", "That's for images.", "That's a tooltip."], difficulty: "medium" }
    ]
  },
  {
    id: "iframes-embedding",
    title: "Iframes & Embedding",
    difficulty: "medium",
    definition: `The <iframe> embeds another document within the current page. The sandbox attribute restricts its capabilities (security). The loading="lazy" attribute defers loading. Iframes are used for embedding maps, videos, ads, and third-party widgets.`,
    coreUnderstanding: `An iframe creates a separate browsing context — its own DOM, origin, and session. Cross-origin iframes can't be accessed via JS (same-origin policy) — the parent can't read the iframe's content, and vice versa (they can communicate via postMessage). The sandbox attribute is critical for security — without it, the iframe can run scripts, navigate the parent, access cookies, etc. Always sandbox untrusted content: sandbox="" (all restrictions) or sandbox="allow-scripts allow-same-origin" (selective). loading="lazy" defers offscreen iframes (performance).`,
    howItWorks: `1. <iframe src="url" title="..."> — embed a document; title is for accessibility.
2. sandbox — restrict capabilities; sandbox="" blocks everything; add allow-* to permit specific actions.
3. sandbox="allow-scripts" — allow JS but not same-origin access.
4. loading="lazy" — defer loading until near the viewport (performance).
5. allow — permissions policy (camera, microphone, geolocation, fullscreen).
6. referrerpolicy — control the Referer header sent.
7. postMessage — cross-origin communication between parent and iframe.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Basic iframe (always set title for accessibility) -->
<iframe src="https://example.com" title="Example content"
        width="600" height="400"></iframe>

<!-- Sandboxed (secure for untrusted content) -->
<iframe src="untrusted.html" sandbox="allow-scripts"
        title="Sandboxed"></iframe>

<!-- Lazy loaded (performance) -->
<iframe src="map.html" loading="lazy" title="Map"></iframe>

<!-- With permissions -->
<iframe src="video.html" allow="fullscreen; geolocation"
        title="Video player"></iframe>`,
        note: "sandbox='' applies ALL restrictions (no scripts, no forms, no same-origin, no popups). Add specific allow-* tokens to permit what you need."
      },
      {
        lang: "javascript",
        code: `// Cross-origin communication via postMessage
// Parent → iframe
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage({ type: 'hello' }, 'https://example.com');

// Iframe → parent
window.parent.postMessage({ type: 'response' }, 'https://parent.com');

// Receiving (always verify origin!)
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://example.com') return; // verify!
  console.log('Received:', event.data);
});`,
        note: "Always verify event.origin in the message handler — without it, any origin can send messages (security risk). Always specify the target origin in postMessage."
      }
    ],
    marginNotes: [
      "Always sandbox untrusted iframes — sandbox='' blocks everything; add allow-* tokens for what you need. Without sandbox, the iframe can access the parent.",
      "Always set a title on iframes — screen readers announce it ('iframe, Example content'). Without it, users don't know what the iframe is.",
      "postMessage: always verify event.origin (security) and specify the target origin (don't use '*').",
      "loading='lazy' defers offscreen iframes — big performance win for pages with many embeds (comments, ads)."
    ],
    commonMistakes: [
      "Not sandboxing untrusted iframes — they can run scripts, access the parent, steal cookies.",
      "Omitting the title attribute — screen readers can't identify the iframe's purpose.",
      "Using postMessage with target origin '*' — any origin can receive it (security risk)."
    ],
    relatedTopics: ["Document Structure", "Performance"],
    externalLinks: [
      { label: "MDN: <iframe>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe" },
      { label: "MDN: sandbox attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox" }
    ],
    mcqs: [
      { question: "What does sandbox='' do?", options: ["Allows everything", "Blocks all restrictions (most secure)", "Blocks scripts only", "Nothing"], answer: 1, explanations: ["It blocks.", "Correct — empty sandbox applies all restrictions; add allow-* to permit specific actions.", "More than scripts.", "It restricts."], difficulty: "medium" },
      { question: "Why must you verify event.origin in postMessage?", options: ["Performance", "Security — any origin can send messages", "It's required by the spec", "For logging"], answer: 1, explanations: ["Not performance.", "Correct — without verification, malicious origins can send messages (XSS).", "It's best practice, not spec.", "Not just logging."], difficulty: "hard" },
      { question: "Why set a title on an iframe?", options: ["SEO", "Accessibility — screen readers announce it", "Styling", "Validation"], answer: 1, explanations: ["Not SEO.", "Correct — the title tells screen reader users what the iframe contains.", "CSS uses class.", "Not validation."], difficulty: "easy" }
    ]
  },
  {
    id: "canvas-api",
    title: "Canvas API",
    difficulty: "hard",
    definition: `The <canvas> element is a bitmap drawing surface. The Canvas 2D API (JS) draws shapes, text, and images pixel by pixel. Canvas is raster (pixels) — it doesn't retain objects (unlike SVG). Used for games, charts, image manipulation, and visualizations.`,
    coreUnderstanding: `Canvas is a resolution-dependent bitmap — you draw with imperative commands (fillRect, arc, fillText) and the result is pixels. Once drawn, the canvas doesn't know about 'a rectangle' — it's just pixels. This makes it fast for many objects (games, particles) but bad for interactivity (you must track hit detection yourself). SVG is the opposite — it retains objects (DOM elements) that you can style and attach events to. Canvas is better for thousands of objects; SVG for a few interactive shapes. The canvas has a 2d context (most common) and a WebGL context (3D, GPU-accelerated).`,
    howItWorks: `1. <canvas id width height> — the element; set width/height attributes (not CSS — CSS scales, attributes set resolution).
2. const ctx = canvas.getContext('2d') — get the 2D drawing context.
3. ctx.fillStyle / strokeStyle — colors.
4. ctx.fillRect(x, y, w, h) — filled rectangle.
5. ctx.beginPath() / moveTo / lineTo / arc / fill / stroke — paths.
6. ctx.fillText(text, x, y) — text.
7. ctx.drawImage(img, x, y) — draw an image.
8. ctx.clearRect — erase; canvas.width = canvas.width — clear all.
9. requestAnimationFrame for smooth animation.`,
    codeExamples: [
      {
        lang: "html",
        code: `<canvas id="myCanvas" width="600" height="400"></canvas>`,
        note: "Set width/height as attributes, not CSS — CSS scales the canvas (blurry); attributes set the drawing resolution."
      },
      {
        lang: "javascript",
        code: `const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Rectangle
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 50);

// Circle
ctx.beginPath();
ctx.arc(200, 100, 40, 0, Math.PI * 2);
ctx.fillStyle = 'blue';
ctx.fill();

// Line
ctx.beginPath();
ctx.moveTo(300, 10);
ctx.lineTo(350, 100);
ctx.strokeStyle = 'red';
ctx.lineWidth = 3;
ctx.stroke();

// Text
ctx.font = '24px Arial';
ctx.fillText('Hello Canvas', 10, 200);

// Animation
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ... draw frame ...
  requestAnimationFrame(draw);
}
draw();`,
        note: "Canvas is imperative — you draw commands and get pixels. For animation, clear and redraw each frame with requestAnimationFrame."
      }
    ],
    marginNotes: [
      "Set canvas width/height as ATTRIBUTES, not CSS — CSS scales the bitmap (blurry); attributes set the actual resolution.",
      "Canvas is raster (pixels); SVG is vector (retained objects). Canvas for many objects (games); SVG for interactive shapes (charts with hover).",
      "Canvas doesn't retain objects — hit detection is manual (compute if x,y is inside a shape). SVG elements have DOM events.",
      "Use requestAnimationFrame for animation (syncs with refresh rate, pauses in background tabs). setInterval is less smooth."
    ],
    commonMistakes: [
      "Setting canvas size via CSS instead of width/height attributes — the drawing is scaled (blurry).",
      "Using Canvas for interactive charts (hover, click on individual bars) — SVG or a library is easier (Canvas needs manual hit detection).",
      "Forgetting to clear (clearRect) before redrawing in animation — shapes accumulate."
    ],
    relatedTopics: ["Audio & Video", "SVG"],
    externalLinks: [
      { label: "MDN: Canvas API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" },
      { label: "MDN: Canvas tutorial", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial" }
    ],
    mcqs: [
      { question: "Should you set canvas size via CSS or attributes?", options: ["CSS", "Attributes (width/height) — CSS scales the bitmap", "Both", "Neither"], answer: 1, explanations: ["CSS scales (blurry).", "Correct — attributes set the resolution; CSS only scales the display.", "Attributes for resolution.", "You must set size."], difficulty: "medium" },
      { question: "Canvas vs SVG for a game with 1000 particles?", options: ["SVG", "Canvas — better for many objects", "Both equally", "Neither"], answer: 1, explanations: ["SVG is slow with many elements.", "Correct — Canvas is raster, fast for thousands of objects.", "Canvas wins.", "Canvas is the choice."], difficulty: "medium" },
      { question: "Does Canvas retain drawn objects?", options: ["Yes", "No — it's pixels; no object model", "Only shapes", "Only text"], answer: 1, explanations: ["It doesn't.", "Correct — Canvas is a bitmap; once drawn, it's pixels, not objects. Hit detection is manual.", "No retained objects.", "No retained objects."], difficulty: "hard" }
    ]
  },
  {
    id: "geolocation",
    title: "Geolocation API",
    difficulty: "medium",
    definition: `The Geolocation API lets the browser request the user's location (with permission). navigator.geolocation.getCurrentPosition gets the position once; watchPosition tracks it continuously. It returns latitude, longitude, accuracy, and optionally altitude, speed, heading.`,
    coreUnderstanding: `Geolocation requires HTTPS (browsers block it on HTTP) and a user gesture/permission prompt. The accuracy depends on the source (GPS on mobile, WiFi/IP on desktop). The API is asynchronous (callbacks or promises). Always handle errors (permission denied, position unavailable, timeout) and offer a fallback. Don't use geolocation for critical functionality — users may deny it or be on a device without GPS. Privacy: be transparent about why you need location and what you do with it.`,
    howItWorks: `1. navigator.geolocation.getCurrentPosition(success, error, options) — get position once.
2. navigator.geolocation.watchPosition(success, error, options) — track continuously.
3. navigator.geolocation.clearWatch(id) — stop tracking.
4. success callback receives a Position: coords.latitude, coords.longitude, coords.accuracy.
5. error callback receives a PositionError: PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT.
6. options: enableHighAccuracy (use GPS), timeout, maximumAge (cache).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log('Latitude:', pos.coords.latitude);
      console.log('Longitude:', pos.coords.longitude);
      console.log('Accuracy:', pos.coords.accuracy, 'meters');
    },
    (err) => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          console.log('User denied permission');
          break;
        case err.POSITION_UNAVAILABLE:
          console.log('Position unavailable');
          break;
        case err.TIMEOUT:
          console.log('Timed out');
          break;
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
} else {
  console.log('Geolocation not supported');
}`,
        note: "Geolocation requires HTTPS (browsers block it on HTTP) and prompts the user for permission. Always handle the error cases (denied, unavailable, timeout)."
      }
    ],
    marginNotes: [
      "Geolocation requires HTTPS — browsers block it on HTTP (except localhost). It also requires a user permission prompt.",
      "Always handle errors — users deny permission, GPS may be unavailable (desktop), or the request may time out.",
      "enableHighAccuracy uses GPS (more accurate, slower, more battery). Default uses WiFi/IP (faster, less accurate).",
      "Privacy: be transparent — explain why you need location and what you do with it. Don't track without consent."
    ],
    commonMistakes: [
      "Not handling the error callback — users deny permission and the app breaks silently.",
      "Using geolocation on HTTP — browsers block it; must be HTTPS.",
      "Always using enableHighAccuracy — drains battery; use it only when needed."
    ],
    relatedTopics: ["Web Storage", "Performance"],
    externalLinks: [
      { label: "MDN: Geolocation API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API" }
    ],
    mcqs: [
      { question: "Does geolocation work on HTTP?", options: ["Yes", "No — requires HTTPS (except localhost)", "Only on mobile", "Only with a key"], answer: 1, explanations: ["Blocked on HTTP.", "Correct — browsers block geolocation on HTTP for security; HTTPS is required.", "Same rule.", "No key needed."], difficulty: "medium" },
      { question: "What does enableHighAccuracy do?", options: ["Faster results", "Uses GPS for more accuracy (slower, more battery)", "Enables HTTPS", "Skips permission"], answer: 1, explanations: ["It's slower.", "Correct — GPS is more accurate but slower and uses more battery.", "Not HTTPS.", "Permission is always required."], difficulty: "medium" },
      { question: "What must you always handle?", options: ["The success callback only", "Errors (permission denied, unavailable, timeout)", "The options", "The coordinates"], answer: 1, explanations: ["Also handle errors.", "Correct — users deny permission; GPS may be unavailable; requests time out.", "Options are optional.", "Coordinates are in the success callback."], difficulty: "easy" }
    ]
  },
  {
    id: "web-storage",
    title: "Web Storage: localStorage & sessionStorage",
    difficulty: "medium",
    definition: `Web Storage stores key-value pairs in the browser. localStorage persists indefinitely (until cleared); sessionStorage persists for the tab session (cleared on tab close). Both store strings (serialize objects with JSON). They're synchronous and limited to ~5-10MB per origin.`,
    coreUnderstanding: `localStorage and sessionStorage are simple key-value stores (strings only). localStorage survives browser restarts; sessionStorage is per-tab (closing the tab clears it). They're synchronous (block the main thread — don't store large data). The ~5MB limit is per origin. They're not for sensitive data (any script on the page can read them — XSS can steal tokens). For sensitive data, use HttpOnly cookies (not accessible via JS). For large/structured data, use IndexedDB (asynchronous, much larger). Web Storage is great for: preferences, theme, simple state, non-sensitive tokens (with XSS awareness).`,
    howItWorks: `1. localStorage.setItem('key', 'value') — store (strings only).
2. localStorage.getItem('key') — retrieve (null if missing).
3. localStorage.removeItem('key') — delete one.
4. localStorage.clear() — delete all.
5. sessionStorage — same API, per-tab lifetime.
6. JSON.stringify / JSON.parse for objects.
7. Storage event — fires in OTHER tabs when localStorage changes (cross-tab sync).`,
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

// Cross-tab sync (Storage event fires in OTHER tabs)
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    applyTheme(e.newValue);
  }
});`,
        note: "localStorage is synchronous — it blocks the main thread. Don't store large data (use IndexedDB). The storage event fires in OTHER tabs (not the one that made the change) — useful for cross-tab sync."
      }
    ],
    marginNotes: [
      "localStorage persists forever; sessionStorage clears on tab close. Both are per-origin and synchronous (block the main thread).",
      "Values are strings — serialize objects with JSON.stringify/parse. Don't store large data (5MB limit, blocking).",
      "Don't store sensitive data (tokens) in localStorage — XSS can read it. Use HttpOnly cookies for auth tokens.",
      "The storage event fires in OTHER tabs (not the one that changed it) — use it for cross-tab synchronization (e.g., logout in all tabs)."
    ],
    commonMistakes: [
      "Storing auth tokens in localStorage — XSS can steal them; use HttpOnly cookies.",
      "Forgetting to JSON.stringify objects — they become '[object Object]'.",
      "Storing large data in localStorage — it's synchronous and blocks; use IndexedDB."
    ],
    relatedTopics: ["Data Attributes", "Performance"],
    externalLinks: [
      { label: "MDN: Web Storage API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" },
      { label: "MDN: IndexedDB", url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" }
    ],
    mcqs: [
      { question: "What's the difference between localStorage and sessionStorage?", options: ["localStorage persists; sessionStorage clears on tab close", "They're the same", "localStorage is faster", "sessionStorage is larger"], answer: 0, explanations: ["Correct — localStorage survives restarts; sessionStorage is per-tab.", "They differ in lifetime.", "Same speed.", "Same limit."], difficulty: "easy" },
      { question: "Should you store auth tokens in localStorage?", options: ["Yes, it's common", "No — XSS can read it; use HttpOnly cookies", "Only for short tokens", "Only with encryption"], answer: 1, explanations: ["Risky.", "Correct — any script can read localStorage; XSS steals tokens. HttpOnly cookies are JS-inaccessible.", "Still vulnerable.", "Encryption doesn't prevent theft."], difficulty: "hard" },
      { question: "What type are Web Storage values?", options: ["Any type", "Strings only (serialize objects with JSON)", "Objects only", "Numbers only"], answer: 1, explanations: ["Strings only.", "Correct — all values are strings; use JSON.stringify for objects.", "Serialize first.", "Strings."], difficulty: "easy" }
    ]
  },
  {
    id: "drag-drop",
    title: "Drag and Drop API",
    difficulty: "hard",
    definition: `The HTML Drag and Drop API enables dragging elements and dropping them on targets. Events: dragstart, drag, dragend (source); dragenter, dragover, dragleave, drop (target). dataTransfer carries the data. You must preventDefault on dragover to allow dropping.`,
    coreUnderstanding: `The Drag and Drop API is notoriously finicky. Key rules: (1) To make an element draggable, set draggable="true". (2) To allow a drop, you MUST call preventDefault() on the dragover event (the default is to not allow drops). (3) Data is carried via the dataTransfer object (setData/getData with a MIME type). (4) The dragstart event sets the data; the drop event reads it. (5) For file drops, use e.dataTransfer.files. The API is verbose and has inconsistencies across browsers; many developers use libraries (react-dnd, SortableJS) instead.`,
    howItWorks: `1. draggable="true" on the source element.
2. dragstart — set the data (e.dataTransfer.setData('text/plain', id)).
3. dragover on the target — MUST preventDefault() to allow dropping.
4. dragenter / dragleave — highlight/unhighlight the target.
5. drop — read the data (e.dataTransfer.getData('text/plain')) and handle it.
6. dragend — cleanup on the source (remove styling).
7. For files: e.dataTransfer.files in the drop handler.`,
    codeExamples: [
      {
        lang: "html",
        code: `<div id="item" draggable="true">Drag me</div>
<div id="dropzone">Drop here</div>`,
        note: "draggable='true' makes the element draggable. Without it, the element can't be dragged."
      },
      {
        lang: "javascript",
        code: `const item = document.getElementById('item');
const zone = document.getElementById('dropzone');

// Source: set data on dragstart
item.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', item.id);
  e.dataTransfer.effectAllowed = 'move';
});

// Target: MUST preventDefault on dragover to allow drop
zone.addEventListener('dragover', (e) => {
  e.preventDefault(); // REQUIRED — without it, drop won't fire
  e.dataTransfer.dropEffect = 'move';
});

zone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const dragged = document.getElementById(id);
  zone.appendChild(dragged);
});

// File drop
zone.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  for (const file of files) {
    console.log(file.name, file.size);
  }
});`,
        note: "The #1 gotcha: you MUST call preventDefault() on dragover, or the drop event won't fire. The default behavior is to NOT allow drops."
      }
    ],
    marginNotes: [
      "The #1 gotcha: you MUST preventDefault() on dragover — without it, the drop event never fires. The default is to disallow drops.",
      "dataTransfer carries the data between drag and drop. setData('text/plain', data) on dragstart; getData('text/plain') on drop.",
      "For file drops, use e.dataTransfer.files (a FileList). Each file has name, size, type, and can be read with FileReader.",
      "The API is verbose and inconsistent — many use libraries (react-dnd, SortableJS) for complex interactions."
    ],
    commonMistakes: [
      "Not calling preventDefault() on dragover — the drop event never fires (the most common Drag and Drop bug).",
      "Forgetting draggable='true' on the source — the element can't be dragged.",
      "Using the wrong data type in getData (must match setData's type)."
    ],
    relatedTopics: ["Canvas API", "Custom Elements"],
    externalLinks: [
      { label: "MDN: Drag and Drop API", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API" },
      { label: "MDN: Drag operations", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations" }
    ],
    mcqs: [
      { question: "What MUST you do on dragover to allow dropping?", options: ["Nothing", "Call preventDefault()", "Set a data type", "Add a class"], answer: 1, explanations: ["Not enough.", "Correct — without preventDefault, the default is to disallow drops; the drop event won't fire.", "Data is set on dragstart.", "Styling is optional."], difficulty: "hard" },
      { question: "How do you make an element draggable?", options: ["CSS: draggable: true", "HTML: draggable='true' attribute", "JS: element.draggable()", "It's always draggable"], answer: 1, explanations: ["Not CSS.", "Correct — the draggable='true' attribute enables dragging.", "It's an attribute.", "You must enable it."], difficulty: "medium" },
      { question: "How do you access dropped files?", options: ["e.files", "e.dataTransfer.files", "e.target.files", "e.droppedFiles"], answer: 1, explanations: ["Not on the event.", "Correct — files are in e.dataTransfer.files (a FileList).", "Not on the target.", "Not a property."], difficulty: "medium" }
    ]
  },
  {
    id: "details-summary",
    title: "Details & Summary (Disclosure)",
    difficulty: "easy",
    definition: `The <details> and <summary> elements create a native disclosure widget (expand/collapse) without JavaScript. <details> wraps the content; <summary> is the clickable header. The open attribute reflects/controls the state.`,
    coreUnderstanding: `Before <details>, expand/collapse required JS (toggle a class, manage ARIA). Now it's native — the browser handles the toggle, keyboard support, and ARIA (it's accessible by default). <summary> is the visible header; the rest of <details> is hidden until open. The open attribute (boolean) reflects the state — set it to expand, remove to collapse. The toggle event fires when the state changes. Use for: FAQs, advanced settings, 'show more' sections. It degrades gracefully (content is visible if JS is disabled).`,
    howItWorks: `1. <details> — the container; content is hidden until open.
2. <summary> — the clickable header (must be the first child); shows a triangle marker.
3. open attribute — boolean; present = expanded, absent = collapsed.
4. toggle event — fires when the user opens/closes (or you set the open attribute).
5. You can style the marker: summary::-webkit-details-marker (WebKit) or summary::marker.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Basic disclosure -->
<details>
  <summary>Click to expand</summary>
  <p>Hidden content that appears when expanded.</p>
</details>

<!-- Open by default -->
<details open>
  <summary>Already open</summary>
  <p>This content is visible immediately.</p>
</details>

<!-- FAQ pattern -->
<details>
  <summary>What is HTML?</summary>
  <p>HTML is the standard markup language for web pages.</p>
</details>

<script>
  const details = document.querySelector('details');
  details.addEventListener('toggle', () => {
    console.log('Open?', details.open);
  });
</script>`,
        note: "<details> is accessible by default (keyboard and screen reader support) — no ARIA or JS needed for the toggle. The toggle event fires on open/close."
      }
    ],
    marginNotes: [
      "<details> is accessible and JS-free — the browser handles keyboard, ARIA, and the toggle. Use it instead of custom JS accordions.",
      "<summary> must be the first child of <details> — if it's not, the browser creates a default 'Details' summary.",
      "The open attribute reflects the state — set details.open = true to expand programmatically; the toggle event fires.",
      "Style the marker with summary::marker (standard) or summary::-webkit-details-marker (Safari/Chrome)."
    ],
    commonMistakes: [
      "Building a custom JS accordion when <details> works — native is accessible and simpler.",
      "Not putting <summary> as the first child — a default 'Details' summary appears.",
      "Not handling the toggle event for dependent UI (e.g., lazy-loading content on expand)."
    ],
    relatedTopics: ["Semantic HTML", "Accessibility & ARIA"],
    externalLinks: [
      { label: "MDN: <details>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details" },
      { label: "MDN: <summary>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary" }
    ],
    mcqs: [
      { question: "Does <details> need JavaScript to work?", options: ["Yes", "No — it's native and accessible by default", "Only for styling", "Only for the toggle"], answer: 1, explanations: ["No JS needed.", "Correct — the browser handles the toggle, keyboard, and ARIA.", "CSS can style it.", "Native toggle."], difficulty: "easy" },
      { question: "Where must <summary> go?", options: ["Anywhere in <details>", "As the first child of <details>", "After the content", "Outside <details>"], answer: 1, explanations: ["Must be first.", "Correct — summary must be the first child; otherwise a default 'Details' appears.", "Must be first.", "Must be inside."], difficulty: "easy" },
      { question: "What event fires when <details> opens/closes?", options: ["click", "toggle", "open", "change"], answer: 1, explanations: ["Click is on summary.", "Correct — the toggle event fires when the open state changes.", "No open event.", "No change event."], difficulty: "medium" }
    ]
  },
  {
    id: "progress-meter",
    title: "Progress & Meter Elements",
    difficulty: "easy",
    definition: `The <progress> element shows a task completion bar (download, upload). The <meter> element shows a scalar measurement within a range (disk usage, score). Both are accessible and native — no need for custom progress bar divs.`,
    coreUnderstanding: `<progress> is for indeterminate (no value) or determinate (with value and max) tasks — it represents 'how far along a task is.' <meter> is for a static measurement within a known range (min, max, value) — it can show optimal/low/high zones. Both are accessible (screen readers announce them) and styled with CSS (the ::-webkit-progress-bar / ::-webkit-progress-value pseudo-elements for WebKit). Use these instead of <div class="progress-bar"> — they're semantic and accessible.`,
    howItWorks: `1. <progress value="50" max="100"> — determinate (50% complete).
2. <progress> — indeterminate (unknown total; shows animation).
3. <meter value="0.6" min="0" max="1"> — 60% of range.
4. <meter> attributes: min, max, value, low, high, optimum — color zones.
5. CSS: ::-webkit-progress-bar (track), ::-webkit-progress-value (fill) for WebKit; ::-moz-progress-bar for Firefox.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Determinate progress -->
<progress value="70" max="100">70%</progress>

<!-- Indeterminate (unknown total) -->
<progress></progress>

<!-- Meter with zones -->
<meter value="0.6" min="0" max="1"
       low="0.3" high="0.7" optimum="0.5">
  60%
</meter>

<!-- Disk usage -->
<meter value="850" min="0" max="1000">850GB used</meter>`,
        note: "progress is for tasks (dynamic — downloads); meter is for measurements (static — disk usage). Both are accessible and native."
      },
      {
        lang: "css",
        code: `/* Style the progress bar (WebKit) */
progress::-webkit-progress-bar {
  background: #eee;
  border-radius: 4px;
}
progress::-webkit-progress-value {
  background: green;
  border-radius: 4px;
}

/* Firefox */
progress::-moz-progress-bar {
  background: green;
}`,
        note: "Progress bar styling is browser-specific (::-webkit-* for Chrome/Safari, ::-moz-* for Firefox). There's no standard pseudo-element yet."
      }
    ],
    marginNotes: [
      "Use <progress> for tasks (downloads, uploads — dynamic) and <meter> for measurements (disk usage, scores — static). Both are accessible.",
      "<progress> without a value is indeterminate (animated, unknown total). With value+max, it's determinate (shows fraction).",
      "<meter> has low/high/optimum zones — the browser colors the bar based on where value falls relative to these zones.",
      "Style with ::-webkit-progress-value (Chrome/Safari) and ::-moz-progress-bar (Firefox) — no standard cross-browser pseudo-element yet."
    ],
    commonMistakes: [
      "Using <div class='progress-bar'> instead of <progress> — loses accessibility and semantics.",
      "Confusing <progress> (tasks) with <meter> (measurements) — they have different semantics.",
      "Not setting max on <progress> — defaults to 1, so value must be 0-1."
    ],
    relatedTopics: ["Semantic HTML", "Accessibility & ARIA"],
    externalLinks: [
      { label: "MDN: <progress>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress" },
      { label: "MDN: <meter>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter" }
    ],
    mcqs: [
      { question: "What's the difference between <progress> and <meter>?", options: ["They're the same", "progress for tasks (dynamic); meter for measurements (static)", "progress is newer", "meter is for bars"], answer: 1, explanations: ["They differ.", "Correct — progress = task completion; meter = scalar measurement in a range.", "Both are HTML5.", "Both can be bars."], difficulty: "medium" },
      { question: "What does <progress> without a value show?", options: ["0%", "Indeterminate (animated, unknown total)", "100%", "An error"], answer: 1, explanations: ["Not 0%.", "Correct — no value = indeterminate; the browser shows an animation (unknown total).", "Not 100%.", "Not an error."], difficulty: "medium" },
      { question: "Why use <progress> instead of a div?", options: ["It's faster", "Accessibility and semantics — screen readers announce it", "It's required", "It's easier to style"], answer: 1, explanations: ["Not speed.", "Correct — progress is semantic and accessible; a div needs ARIA.", "Not required.", "Styling is browser-specific."], difficulty: "easy" }
    ]
  }
];