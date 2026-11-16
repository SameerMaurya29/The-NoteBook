// HTML topics part 3: Web Components, Embedding, Advanced (topics 23-33)
export default [
  {
    id: "custom-elements",
    title: "Custom Elements (Web Components)",
    difficulty: "hard",
    definition: `Custom Elements let you define new HTML tags with custom behavior: customElements.define('my-tag', class extends HTMLElement {...}). They encapsulate behavior and can be used like any native element. Part of Web Components (with Shadow DOM and HTML templates).`,
    coreUnderstanding: `Custom Elements are the foundation of reusable, framework-agnostic components. You define a class extending HTMLElement (or a specific element), register it with customElements.define, and use it as <my-tag>. Lifecycle callbacks: connectedCallback (inserted into DOM), disconnectedCallback (removed), attributeChangedCallback (an observed attribute changed), adoptedCallback (moved to a new document). Observed attributes must be listed in a static observedAttributes getter. The element name MUST contain a hyphen (my-tag, not mytag) — this avoids conflicts with current/future HTML elements.`,
    howItWorks: `1. class MyTag extends HTMLElement { ... } — define the element's behavior.
2. static get observedAttributes() { return ['name']; } — list attributes to observe.
3. connectedCallback() — called when inserted into the DOM (setup).
4. disconnectedCallback() — called when removed (cleanup).
5. attributeChangedCallback(name, oldVal, newVal) — called when an observed attribute changes.
6. customElements.define('my-tag', MyTag) — register the element.
7. Use: <my-tag name="Alice"></my-tag>.
8. The name MUST have a hyphen (my-tag, not mytag) — required by the spec.`,
    codeExamples: [
      {
        lang: "javascript",
        code: `class GreetingCard extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'name' && oldVal !== newVal) {
      this._render();
    }
  }

  _render() {
    const name = this.getAttribute('name') || 'World';
    this._shadow.innerHTML = \`<p>Hello, \${name}!</p>\`;
  }
}

customElements.define('greeting-card', GreetingCard);`,
        note: "The element name MUST contain a hyphen (greeting-card, not greetingcard) — this prevents conflicts with native HTML elements."
      },
      {
        lang: "html",
        code: `<!-- Use the custom element -->
<greeting-card name="Alice"></greeting-card>
<greeting-card name="Bob"></greeting-card>

<!-- Attributes trigger attributeChangedCallback -->
<greeting-card></greeting-card>
<script>
  document.querySelector('greeting-card').setAttribute('name', 'Carol');
</script>`,
        note: "attributeChangedCallback only fires for attributes listed in observedAttributes. Set properties to update efficiently."
      }
    ],
    marginNotes: [
      "The element name MUST contain a hyphen (my-tag) — this is required by the spec and prevents conflicts with native/future HTML elements.",
      "observedAttributes is required for attributeChangedCallback to fire — only listed attributes trigger it.",
      "connectedCallback fires every time the element is inserted (not just the first). Use it for setup; use disconnectedCallback for cleanup.",
      "Custom Elements are framework-agnostic — they work in React, Vue, vanilla JS. They're the web platform's native component model."
    ],
    commonMistakes: [
      "Naming an element without a hyphen (mytag) — the spec requires a hyphen; customElements.define throws.",
      "Forgetting observedAttributes — attributeChangedCallback never fires.",
      "Doing heavy work in the constructor (before connectedCallback) — the element isn't in the DOM yet; errors."
    ],
    relatedTopics: ["Shadow DOM", "Data Attributes"],
    externalLinks: [
      { label: "MDN: Custom Elements", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements" },
      { label: "Web Components guide", url: "https://www.webcomponents.org/" }
    ],
    mcqs: [
      { question: "Why must custom element names contain a hyphen?", options: ["For readability", "To avoid conflicts with native/future HTML elements", "It's faster", "It's required for CSS"], answer: 1, explanations: ["It's a spec requirement.", "Correct — the hyphen namespace prevents collisions with current and future HTML elements.", "Not speed.", "Not CSS."], difficulty: "medium" },
      { question: "What triggers attributeChangedCallback?", options: ["Any attribute change", "Only changes to attributes in observedAttributes", "Only class changes", "Only id changes"], answer: 1, explanations: ["Only observed ones.", "Correct — you must list attributes in static observedAttributes; others don't trigger the callback.", "Any observed attribute.", "Any observed attribute."], difficulty: "medium" },
      { question: "When does connectedCallback fire?", options: ["Once, on creation", "Every time the element is inserted into the DOM", "On attribute change", "On removal"], answer: 1, explanations: ["Not just once.", "Correct — it fires on every insertion (e.g., if moved). Use it for setup.", "That's attributeChangedCallback.", "That's disconnectedCallback."], difficulty: "hard" }
    ]
  },
  {
    id: "shadow-dom",
    title: "Shadow DOM",
    difficulty: "hard",
    definition: `Shadow DOM encapsulates a component's DOM and CSS — a hidden, separate tree attached to an element. Styles inside the shadow tree don't leak out; external styles don't leak in. This is how custom elements achieve true encapsulation.`,
    coreUnderstanding: `Without Shadow DOM, a custom element's internal HTML and CSS can be affected by the page's styles (and vice versa) — no encapsulation. Shadow DOM creates a boundary: the element has a 'shadow root' containing its internal DOM. External CSS selectors don't penetrate (except via CSS custom properties / ::part). Internal styles don't escape. This is how <video>, <input type="range">, etc. are implemented — their internal UI is in shadow DOM. attachShadow({ mode: 'open' }) creates an open shadow root (JS can access it via element.shadowRoot); mode: 'closed' denies access (used by browser-internal elements).`,
    howItWorks: `1. const shadow = element.attachShadow({ mode: 'open' }) — create a shadow root.
2. shadow.innerHTML = '<style>p { color: red; }</style><p>Hi</p>' — set the internal DOM.
3. External styles don't affect the shadow DOM (except inherited properties and CSS variables).
4. Internal styles don't leak out.
5. ::part(name) — style a named part from outside (if the component exposes it with part attribute).
6. mode: 'open' — element.shadowRoot is accessible; 'closed' — it's null (encapsulation enforced).`,
    codeExamples: [
      {
        lang: "javascript",
        code: `class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>
        /* Only affects this shadow DOM — doesn't leak */
        p { color: red; font-weight: bold; }
        .card { border: 1px solid #ccc; padding: 10px; }
      </style>
      <div class="card">
        <p>Shadow DOM content</p>
      </div>
    \`;
  }
}
customElements.define('my-card', MyCard);`,
        note: "The <style> inside the shadow root only affects the shadow DOM — it doesn't leak to the page. External page styles don't affect the shadow DOM either (except inherited properties like font-family)."
      },
      {
        lang: "html",
        code: `<!-- External styles don't affect the shadow DOM -->
<style>
  p { color: blue; } /* Won't affect <p> inside my-card */
</style>
<my-card></my-card>

<!-- Expose parts for external styling -->
<script>
  // Inside the component:
  // shadow.innerHTML = '<div part="container">...</div>'
</script>
<style>
  my-card::part(container) {
    border-color: green; /* Can style the exposed part */
  }
</style>`,
        note: "::part() lets external CSS style specific parts the component exposes (with the part attribute). This is the controlled escape hatch from encapsulation."
      }
    ],
    marginNotes: [
      "Shadow DOM encapsulates CSS and DOM — internal styles don't leak out; external styles don't leak in (except inherited properties and CSS variables).",
      "mode: 'open' lets you access element.shadowRoot (for debugging/testing); 'closed' returns null (strict encapsulation — used by browser internals).",
      "::part(name) is the controlled escape hatch — a component can expose parts (part='container') that external CSS can style via ::part(container).",
      "Inherited CSS properties (font-family, color) DO penetrate shadow DOM — set them on the host or use CSS variables for theming."
    ],
    commonMistakes: [
      "Expecting external CSS to style shadow DOM internals — it doesn't (encapsulation); use ::part or CSS variables.",
      "Using mode: 'closed' and then trying to access shadowRoot — it's null; use 'open' if you need access.",
      "Forgetting that inherited properties (font, color) DO penetrate — set them explicitly inside if needed."
    ],
    relatedTopics: ["Custom Elements", "HTML Templates"],
    externalLinks: [
      { label: "MDN: Shadow DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM" },
      { label: "MDN: ::part pseudo-element", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/::part" }
    ],
    mcqs: [
      { question: "Do external CSS styles affect Shadow DOM internals?", options: ["Yes, all styles", "No — Shadow DOM encapsulates CSS (except inherited properties)", "Only color", "Only with !important"], answer: 1, explanations: ["No — encapsulated.", "Correct — external styles don't penetrate; only inherited properties (font, color) and CSS variables do.", "Not just color.", "!important doesn't help."], difficulty: "hard" },
      { question: "What does mode: 'closed' do?", options: ["Hides the element", "element.shadowRoot returns null (strict encapsulation)", "Closes the element", "Deletes the shadow"], answer: 1, explanations: ["It doesn't hide.", "Correct — closed mode denies JS access to shadowRoot; open mode allows it.", "It doesn't close.", "It doesn't delete."], difficulty: "medium" },
      { question: "How can external CSS style a shadow DOM part?", options: ["It can't", "Via ::part() if the component exposes it", "Via !important", "Via inline styles"], answer: 1, explanations: ["It can with ::part.", "Correct — the component exposes parts (part='name'); external CSS uses ::part(name).", "!important doesn't penetrate.", "Inline styles don't penetrate."], difficulty: "hard" }
    ]
  },
  {
    id: "html-templates",
    title: "HTML Templates (<template>)",
    difficulty: "medium",
    definition: `The <template> element holds HTML that isn't rendered — it's a inert fragment you clone and insert. Content inside <template> is parsed but not displayed, not executed (scripts don't run), and not loaded (images don't download). Used with Web Components and dynamic content.`,
    coreUnderstanding: `A <template> is a holding area for HTML that you'll use later. Its content is parsed (valid DOM) but inert — no rendering, no script execution, no resource loading. You clone it (template.content.cloneNode(true)) and insert the clone into the DOM. This is faster and safer than innerHTML (no re-parsing) and is the standard way to define reusable markup for custom elements. Templates are also used for client-side rendering (define the structure once, clone for each item).`,
    howItWorks: `1. <template id="my-template">...</template> — define the template (not rendered).
2. const template = document.getElementById('my-template').
3. const clone = template.content.cloneNode(true) — clone the content (a DocumentFragment).
4. document.body.appendChild(clone) — insert the clone (now it renders).
5. Content is inert until cloned — scripts don't run, images don't load, styles don't apply.
6. cloneNode(true) deep-clones; (false) shallow-clones.`,
    codeExamples: [
      {
        lang: "html",
        code: `<template id="card-template">
  <style>
    .card { border: 1px solid #ccc; padding: 10px; }
  </style>
  <div class="card">
    <h3 class="title"></h3>
    <p class="body"></p>
  </div>
</template>

<div id="container"></div>

<script>
const template = document.getElementById('card-template');
const container = document.getElementById('container');

const data = [
  { title: 'Card 1', body: 'Content 1' },
  { title: 'Card 2', body: 'Content 2' },
];

data.forEach(item => {
  const clone = template.content.cloneNode(true);
  clone.querySelector('.title').textContent = item.title;
  clone.querySelector('.body').textContent = item.body;
  container.appendChild(clone);
});
</script>`,
        note: "Template content is inert — the <style> doesn't apply, scripts don't run, until you clone and insert. cloneNode(true) deep-clones the DocumentFragment."
      }
    ],
    marginNotes: [
      "<template> content is inert — not rendered, scripts don't run, images don't load. It's parsed but dormant until cloned.",
      "Access the content via template.content (a DocumentFragment). Clone with cloneNode(true) and append to insert.",
      "Templates are faster than innerHTML for repeated insertions — the DOM is parsed once; clones are cheap.",
      "Used with Web Components: define the shadow DOM structure in a <template>, clone it in connectedCallback."
    ],
    commonMistakes: [
      "Appending the template directly (not cloning) — the content moves out of the template (can only be used once).",
      "Using cloneNode(false) — shallow clone misses child elements.",
      "Expecting scripts inside <template> to run — they don't until cloned and inserted."
    ],
    relatedTopics: ["Custom Elements", "Shadow DOM"],
    externalLinks: [
      { label: "MDN: <template>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template" },
      { label: "MDN: Using templates", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots" }
    ],
    mcqs: [
      { question: "Is <template> content rendered?", options: ["Yes", "No — it's inert (not rendered, scripts don't run)", "Only the style", "Only if open"], answer: 1, explanations: ["It's not rendered.", "Correct — template content is parsed but dormant until cloned and inserted.", "Nothing renders.", "It's always inert."], difficulty: "easy" },
      { question: "How do you use a template?", options: ["Append it directly", "Clone template.content and append the clone", "innerHTML it", "display: block"], answer: 1, explanations: ["Appending moves it (one use).", "Correct — cloneNode(true) on template.content, then append the clone.", "Not innerHTML.", "It's not a display issue."], difficulty: "medium" },
      { question: "Do scripts inside <template> run?", options: ["Yes", "No — not until cloned and inserted", "Only async scripts", "Only module scripts"], answer: 1, explanations: ["They don't.", "Correct — template content is inert; scripts run only after cloning and inserting into the DOM.", "No scripts run.", "No scripts run."], difficulty: "medium" }
    ]
  },
  {
    id: "contenteditable",
    title: "Contenteditable & Editable Regions",
    difficulty: "medium",
    definition: `The contenteditable attribute makes any element editable (contenteditable="true"). The document.execCommand API (deprecated but still used) formats the content (bold, italic, links). Modern alternatives: Input Events API and custom implementations.`,
    coreUnderstanding: `contenteditable="true" turns any element into a rich text editor — the user can type, paste, and edit directly in the DOM. It's how Google Docs, Notion, and email composers work (with significant custom logic). The old API (document.execCommand('bold')) is deprecated but still works; it's unreliable across browsers. Modern editors use the Input Events API (beforeinput, input) and custom rendering. contenteditable is notoriously hard to get right — cursor positioning, paste handling, and HTML sanitization are complex. Most production editors use libraries (Quill, ProseMirror, Slate, TipTap).`,
    howItWorks: `1. <div contenteditable="true"> — makes the div editable.
2. document.execCommand('bold') — bold the selection (deprecated but works).
3. element.innerHTML — get/set the HTML content.
4. input event — fires on every edit (use for saving).
5. Modern: beforeinput event — intercept and customize input.
6. execCommand commands: bold, italic, underline, createLink, insertImage, formatBlock.`,
    codeExamples: [
      {
        lang: "html",
        code: `<div contenteditable="true" id="editor">
  Edit this text directly.
</div>

<button onclick="document.execCommand('bold')">Bold</button>
<button onclick="document.execCommand('italic')">Italic</button>

<script>
const editor = document.getElementById('editor');

// Save on every edit
editor.addEventListener('input', () => {
  localStorage.setItem('content', editor.innerHTML);
});

// Restore on load
editor.innerHTML = localStorage.getItem('content') || '';
</script>`,
        note: "document.execCommand is deprecated but still works in all browsers. Modern editors use the Input Events API (beforeinput, input) for more control. Most production editors use libraries (ProseMirror, Quill, Slate)."
      }
    ],
    marginNotes: [
      "contenteditable is notoriously hard — cursor positioning, paste sanitization, and cross-browser consistency are major challenges. Use a library (ProseMirror, Quill, Slate) for production.",
      "document.execCommand is deprecated but still works. It's unreliable across browsers (different HTML output).",
      "The input event fires on every edit — use it to save. beforeinput lets you intercept and customize (modern approach).",
      "Always sanitize the HTML (innerHTML) before saving or displaying — contenteditable allows arbitrary HTML (XSS risk if displayed unescaped)."
    ],
    commonMistakes: [
      "Using contenteditable without sanitizing the output — XSS risk (pasted content can contain scripts).",
      "Relying on execCommand for a production editor — it's deprecated and inconsistent across browsers.",
      "Not handling paste — pasted content (from Word, browsers) brings unwanted styles and HTML."
    ],
    relatedTopics: ["Forms & Input Types", "Custom Elements"],
    externalLinks: [
      { label: "MDN: contenteditable", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable" },
      { label: "MDN: execCommand", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand" }
    ],
    mcqs: [
      { question: "Is document.execCommand still recommended?", options: ["Yes, it's modern", "No — it's deprecated; use Input Events API or libraries", "Only for bold", "Only in Chrome"], answer: 1, explanations: ["It's deprecated.", "Correct — execCommand is deprecated and inconsistent; modern editors use the Input Events API or libraries.", "It's deprecated for all.", "It's deprecated everywhere."], difficulty: "medium" },
      { question: "What event fires on every edit in a contenteditable?", options: ["change", "input", "edit", "keyup"], answer: 1, explanations: ["change fires on blur.", "Correct — input fires on every edit (typing, pasting, formatting).", "No edit event.", "keyup misses mouse edits."], difficulty: "easy" },
      { question: "What's the main risk of contenteditable?", options: ["Performance", "XSS — pasted content can contain scripts; sanitize the HTML", "Accessibility", "Memory leaks"], answer: 1, explanations: ["Not the main risk.", "Correct — contenteditable allows arbitrary HTML; sanitize before saving/displaying.", "It can be accessible.", "Not the main risk."], difficulty: "hard" }
    ]
  },
  {
    id: "base-element",
    title: "The <base> Element",
    difficulty: "medium",
    definition: `The <base> element sets a base URL and/or target for all relative links on the page. It goes in <head>. Use sparingly — it affects ALL relative URLs, which can cause unexpected behavior.`,
    coreUnderstanding: `<base href="https://cdn.example.com/"> makes all relative links (href="img/photo.jpg") resolve to https://cdn.example.com/img/photo.jpg. <base target="_blank"> makes all links open in a new tab. It's a global setting — it affects every relative URL and link on the page, which can be surprising (anchor links, form actions, etc.). Use it for specific cases (a page served from a CDN, or an app where all links open in new tabs). The base element must be in <head>, before any URLs that depend on it.`,
    howItWorks: `1. <base href="https://cdn.example.com/"> — base URL for relative links.
2. <base target="_blank"> — default target for all links.
3. Both: <base href="https://cdn.example.com/" target="_blank">.
4. Must be in <head>, before any relative URLs.
5. Affects: <a href>, <img src>, <link href>, <script src>, <form action>, etc.`,
    codeExamples: [
      {
        lang: "html",
        code: `<head>
  <base href="https://cdn.example.com/assets/" target="_blank">
</head>
<body>
  <!-- Resolves to https://cdn.example.com/assets/photo.jpg -->
  <img src="photo.jpg" alt="Photo">

  <!-- Opens in a new tab (target="_blank" from base) -->
  <a href="https://example.com">Link</a>

  <!-- Anchor links also affected — href="#section"
       becomes https://cdn.example.com/assets/#section -->
  <a href="#section">Jump</a>
</body>`,
        note: "<base> affects ALL relative URLs, including anchor links (#section). This can break in-page navigation (the anchor resolves to the base URL + #section, not the current page + #section). Use with caution."
      }
    ],
    marginNotes: [
      "<base> affects ALL relative URLs — including anchors (#section), which can break in-page navigation. Use with caution.",
      "It must be in <head>, before any relative URLs that depend on it.",
      "Common use: a page where all assets are on a CDN, or all links should open in a new tab.",
      "It's a global setting — if you need per-link behavior, don't use <base>; set href/target individually."
    ],
    commonMistakes: [
      "Using <base> and then anchor links (#section) break — they resolve to base + #section, not current page + #section.",
      "Putting <base> after relative URLs — they resolve before the base is set.",
      "Not realizing it affects ALL relative URLs (images, scripts, forms), causing unexpected paths."
    ],
    relatedTopics: ["Links & Anchors", "Metadata & SEO"],
    externalLinks: [
      { label: "MDN: <base>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base" }
    ],
    mcqs: [
      { question: "What does <base href> affect?", options: ["Only <a> links", "All relative URLs (links, images, scripts, forms)", "Only images", "Only the page URL"], answer: 1, explanations: ["More than links.", "Correct — base affects all relative URLs on the page.", "More than images.", "Not the page URL."], difficulty: "medium" },
      { question: "Where must <base> go?", options: ["In <body>", "In <head>, before relative URLs", "At the end of the page", "Anywhere"], answer: 1, explanations: ["Not in body.", "Correct — it must be in head, before any URLs that depend on it.", "Not at the end.", "It must be early."], difficulty: "easy" },
      { question: "What's a common gotcha with <base>?", options: ["It's slow", "Anchor links (#section) break — they resolve to base + #section", "It's deprecated", "It blocks rendering"], answer: 1, explanations: ["Not speed.", "Correct — in-page anchors resolve to the base URL, breaking navigation.", "It's valid.", "It doesn't block."], difficulty: "medium" }
    ]
  },
  {
    id: "noscript",
    title: "The <noscript> Element",
    difficulty: "easy",
    definition: `<noscript> shows content when JavaScript is disabled or unavailable. It can go in <head> (for CSS/link/meta) or <body> (for visible content). Use it for graceful degradation and accessibility.`,
    coreUnderstanding: `If JS is enabled, <noscript> content is ignored. If JS is disabled, the browser renders the <noscript> content. In <head>, it can only contain <link>, <style>, and <meta> (e.g., redirect to a no-JS page). In <body>, it can contain any visible content (a message, a fallback form). Use it to: show a message ('Please enable JavaScript'), provide a basic fallback, or redirect to a no-JS version. Don't rely on it for critical functionality — most users have JS enabled, but some (accessibility tools, security-conscious users) don't.`,
    howItWorks: `1. <noscript> in <body> — visible content shown when JS is off.
2. <noscript> in <head> — only <link>, <style>, <meta> (e.g., a redirect).
3. If JS is on, <noscript> is ignored.
4. If JS is off, the browser renders <noscript>.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- In body: show a message -->
<noscript>
  <div style="padding: 20px; background: yellow;">
    Please enable JavaScript to use this app.
  </div>
</noscript>

<!-- In head: redirect to a no-JS page -->
<head>
  <noscript>
    <meta http-equiv="refresh" content="0; url=/no-js.html">
  </noscript>
</head>`,
        note: "In <head>, <noscript> can only contain <link>, <style>, and <meta>. A common pattern is a meta refresh redirect to a no-JS fallback page."
      }
    ],
    marginNotes: [
      "<noscript> in <head> can only contain <link>, <style>, <meta> — not visible content. Use a meta refresh to redirect.",
      "Most users have JS enabled, but some don't (accessibility tools, security settings, NoScript). Provide a graceful fallback.",
      "<noscript> is for graceful degradation — it doesn't make your app work without JS; it tells users to enable it or provides a basic alternative.",
      "Don't rely on <noscript> for critical functionality — it's a fallback, not a primary strategy."
    ],
    commonMistakes: [
      "Putting visible content in a <head> <noscript> — only <link>/<style>/<meta> are allowed there.",
      "Relying on <noscript> for critical functionality — it's a fallback message, not a full no-JS app.",
      "Not providing any fallback — users with JS off see a blank page."
    ],
    relatedTopics: ["Script Loading", "Document Structure"],
    externalLinks: [
      { label: "MDN: <noscript>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript" }
    ],
    mcqs: [
      { question: "When is <noscript> content shown?", options: ["Always", "When JavaScript is disabled or unavailable", "Only on mobile", "Only in head"], answer: 1, explanations: ["Not always.", "Correct — if JS is on, noscript is ignored; if off, it renders.", "Not mobile-specific.", "It works in body too."], difficulty: "easy" },
      { question: "What can <noscript> in <head> contain?", options: ["Any content", "Only <link>, <style>, <meta>", "Only text", "Only scripts"], answer: 1, explanations: ["Not any content.", "Correct — head noscript is limited to link/style/meta (e.g., a meta refresh redirect).", "Not just text.", "Scripts aren't useful (JS is off)."], difficulty: "medium" },
      { question: "Should you rely on <noscript> for critical functionality?", options: ["Yes", "No — it's a fallback, not a full no-JS app", "Only for forms", "Only for redirects"], answer: 1, explanations: ["No.", "Correct — it's for graceful degradation (a message or redirect), not a complete alternative.", "It's a fallback.", "Redirects are one use."], difficulty: "easy" }
    ]
  },
  {
    id: "object-embed",
    title: "<object> & <embed> for External Content",
    difficulty: "medium",
    definition: `<object> and <embed> embed external resources (PDFs, Flash, other documents). They're largely superseded by <img>, <video>, <iframe> for modern use. <object> can show fallback content if the resource fails; <embed> cannot.`,
    coreUnderstanding: `Before HTML5, <object> and <embed> were used for Flash, PDFs, and other plugins. Now most use cases have native elements (<video>, <audio>, <canvas>). <object> is still used for: embedding PDFs (though <iframe> is preferred), SVG documents, and fallback content (the content inside <object> shows if the resource can't load). <embed> is a void element (no closing tag, no fallback). For PDFs, <iframe> or a viewer library (PDF.js) is preferred. These elements are valid but rarely needed in modern web development.`,
    howItWorks: `1. <object data="file.pdf" type="application/pdf" width="600" height="400">Fallback</object> — embed a PDF with fallback.
2. <embed src="file.pdf" type="application/pdf" width="600" height="400"> — embed (no fallback, void element).
3. <object data="drawing.svg" type="image/svg+xml">Fallback image</object> — embed SVG.
4. Fallback content (inside <object>) shows if the browser can't render the resource.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Embed a PDF with fallback -->
<object data="document.pdf" type="application/pdf" width="600" height="400">
  <p>Your browser can't display PDFs. <a href="document.pdf">Download it</a>.</p>
</object>

<!-- Embed (no fallback) -->
<embed src="animation.svg" type="image/svg+xml" width="400" height="300">

<!-- SVG via object -->
<object data="logo.svg" type="image/svg+xml">
  <img src="logo.png" alt="Logo"> <!-- fallback -->
</object>`,
        note: "<object> provides fallback content (shown if the resource can't load); <embed> is a void element with no fallback. For PDFs, <iframe> or PDF.js is preferred in modern apps."
      }
    ],
    marginNotes: [
      "<object> and <embed> are largely superseded by native elements (<video>, <audio>, <canvas>). Use them mainly for PDFs or legacy content.",
      "<object> has fallback content (shown if the resource fails); <embed> is a void element with no fallback.",
      "For PDFs, <iframe> or a viewer library (PDF.js) is preferred — <object> PDF support varies by browser.",
      "Flash is dead (deprecated, removed from browsers) — don't use <object>/<embed> for Flash."
    ],
    commonMistakes: [
      "Using <embed> when fallback is needed — it has no fallback; use <object>.",
      "Using <object>/<embed> for video — use <video> instead (native, accessible, no plugin).",
      "Expecting consistent PDF rendering — browser support for <object type='application/pdf'> varies."
    ],
    relatedTopics: ["Iframes & Embedding", "Images & Media"],
    externalLinks: [
      { label: "MDN: <object>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object" },
      { label: "MDN: <embed>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed" }
    ],
    mcqs: [
      { question: "Which element provides fallback content?", options: ["<embed>", "<object>", "Both", "Neither"], answer: 1, explanations: ["No fallback.", "Correct — content inside <object> shows if the resource fails; <embed> has no fallback.", "Only object.", "Object has fallback."], difficulty: "medium" },
      { question: "What should you use for video instead of <object>?", options: ["<embed>", "<video>", "<iframe>", "<object>"], answer: 1, explanations: ["Not embed.", "Correct — <video> is native, accessible, no plugin needed.", "iframe is for documents.", "video is better."], difficulty: "easy" },
      { question: "Is <embed> a void element?", options: ["No, it needs a closing tag", "Yes — no closing tag, no fallback", "Only in HTML4", "Only with Flash"], answer: 1, explanations: ["It's void.", "Correct — <embed> is void (no closing tag) and has no fallback content.", "It's void in HTML5.", "It's void regardless."], difficulty: "medium" }
    ]
  },
  {
    id: "inline-svg",
    title: "Inline SVG in HTML",
    difficulty: "medium",
    definition: `SVG (Scalable Vector Graphics) can be embedded directly in HTML using the <svg> element. Inline SVG is scalable, styleable with CSS, and scriptable with JS — unlike SVG via <img> or CSS background. Use for icons, charts, and interactive graphics.`,
    coreUnderstanding: `Inline SVG (the <svg> tag directly in HTML) is part of the DOM — you can style it with CSS (fill, stroke, hover) and manipulate it with JS (addEventListener, querySelector). This is why inline SVG is used for icons (you can change color on hover) and interactive charts. SVG via <img> or background-image can't be styled/scripted (it's a sealed image). Inline SVG is vector — it scales without quality loss (unlike raster images). For simple icons, inline SVG is best; for complex illustrations, an SVG file (via <img>) may be cleaner.`,
    howItWorks: `1. <svg width height viewBox> — the canvas; viewBox defines the coordinate system.
2. <circle cx cy r fill> — a circle.
3. <rect x y width height fill> — a rectangle.
4. <path d="M... L... Z" stroke fill> — a path (the most flexible).
5. <text x y> — text.
6. CSS: svg circle { fill: red; } svg circle:hover { fill: blue; } — style and hover.
7. JS: document.querySelector('svg circle').addEventListener('click', ...) — scriptable.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Inline SVG icon (styleable, scriptable) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M8 12 L11 15 L16 9"></path>
</svg>

<style>
  /* Style inline SVG with CSS */
  .icon svg { stroke: black; }
  .icon:hover svg { stroke: green; } /* hover works! */
</style>

<div class="icon">
  <svg width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
  </svg>
</div>

<script>
  // Script inline SVG
  document.querySelector('svg circle').addEventListener('click', () => {
    alert('Clicked!');
  });
</script>`,
        note: "Inline SVG is part of the DOM — CSS and JS can target its elements. SVG via <img> or background can't be styled/scripted (it's a sealed image)."
      }
    ],
    marginNotes: [
      "Inline SVG is styleable (CSS fill/stroke) and scriptable (JS events) — unlike SVG via <img> or CSS background (sealed).",
      "Use viewBox to define the coordinate system; width/height scale the display. viewBox='0 0 24 24' + width=48 = 2x scale.",
      "currentColor lets SVG inherit the text color — set stroke='currentColor' and control via CSS color.",
      "Inline SVG is best for icons (hover color change); SVG files (<img>) are cleaner for complex illustrations."
    ],
    commonMistakes: [
      "Using <img src='icon.svg'> when you need CSS hover color changes — inline SVG is required for styling.",
      "Omitting viewBox — the SVG scales incorrectly or clips.",
      "Not using currentColor — hardcoding colors prevents theming via CSS."
    ],
    relatedTopics: ["Canvas API", "Images & Media"],
    externalLinks: [
      { label: "MDN: SVG", url: "https://developer.mozilla.org/en-US/docs/Web/SVG" },
      { label: "MDN: Inline SVG", url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Introduction" }
    ],
    mcqs: [
      { question: "Why use inline SVG instead of <img src='icon.svg'>?", options: ["It's smaller", "Inline SVG is styleable and scriptable (CSS/JS)", "It's faster", "It's required"], answer: 1, explanations: ["Not necessarily smaller.", "Correct — inline SVG is part of the DOM; you can style (hover color) and script it.", "Similar speed.", "Not required."], difficulty: "medium" },
      { question: "What does viewBox do?", options: ["Sets the display size", "Defines the coordinate system", "Sets the color", "Sets the border"], answer: 1, explanations: ["width/height set display size.", "Correct — viewBox defines the internal coordinate system; width/height scale it.", "Not color.", "Not border."], difficulty: "medium" },
      { question: "How do you make SVG inherit text color?", options: ["fill='inherit'", "stroke='currentColor'", "color='auto'", "fill='parent'"], answer: 1, explanations: ["Not valid.", "Correct — currentColor makes the SVG use the CSS color property (themable).", "Not valid.", "Not valid."], difficulty: "medium" }
    ]
  },
  {
    id: "preload-prefetch",
    title: "Resource Hints: preload, prefetch, preconnect",
    difficulty: "hard",
    definition: `Resource hints tell the browser to fetch resources early: <link rel="preload"> (fetch now for the current page), <link rel="prefetch"> (fetch for a future navigation), <link rel="preconnect"> (establish a connection early), <link rel="dns-prefetch"> (resolve DNS early).`,
    coreUnderstanding: `These optimize loading by starting work early. preload: fetch a resource needed on the current page (fonts, critical CSS, hero image) — it must be used within 3 seconds or the browser warns. prefetch: fetch a resource for a FUTURE navigation (the next page the user might visit) — low priority, idle time. preconnect: establish a connection (DNS, TCP, TLS) to a third-party origin early (fonts, API). dns-prefetch: just resolve DNS (lighter than preconnect). modulepreload: preload an ES module (and its dependencies). Use these for critical resources and likely navigations — they improve perceived performance.`,
    howItWorks: `1. <link rel="preload" href="font.woff2" as="font" crossorigin> — fetch now, high priority, for the current page.
2. <link rel="prefetch" href="next-page.html"> — fetch for a future navigation, low priority.
3. <link rel="preconnect" href="https://fonts.googleapis.com"> — connect early (DNS+TCP+TLS).
4. <link rel="dns-prefetch" href="https://example.com"> — resolve DNS only.
5. <link rel="modulepreload" href="app.js"> — preload an ES module + dependencies.
6. The as attribute (for preload) tells the browser the resource type (font, script, style, image).`,
    codeExamples: [
      {
        lang: "html",
        code: `<head>
  <!-- Preload a critical font (needed on this page) -->
  <link rel="preload" href="font.woff2" as="font"
        type="font/woff2" crossorigin>

  <!-- Preload critical CSS -->
  <link rel="preload" href="critical.css" as="style">

  <!-- Preconnect to a font CDN (DNS+TCP+TLS early) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">

  <!-- Prefetch the next page (low priority, idle) -->
  <link rel="prefetch" href="/next-page.html">

  <!-- Preload an ES module -->
  <link rel="modulepreload" href="/app.js">
</head>`,
        note: "preload is for resources needed NOW (current page); prefetch is for FUTURE navigations. preconnect/dns-prefetch establish connections early. Use crossorigin for fonts (they're fetched with CORS)."
      }
    ],
    marginNotes: [
      "preload = fetch now for the CURRENT page (high priority). prefetch = fetch for a FUTURE navigation (low priority, idle).",
      "preconnect establishes DNS+TCP+TLS early — use for third-party origins (fonts, APIs) you'll connect to. dns-prefetch is lighter (DNS only).",
      "preload requires the as attribute (font, script, style, image) — the browser uses it for caching and priority.",
      "Preloaded resources must be used within 3 seconds — or the browser warns 'preloaded but not used.' Don't preload everything."
    ],
    commonMistakes: [
      "Confusing preload (current page, high priority) with prefetch (future navigation, low priority).",
      "Preloading resources that aren't used — the browser warns; it wastes bandwidth.",
      "Not using crossorigin on preloaded fonts — fonts are fetched with CORS; without it, the preload is wasted."
    ],
    relatedTopics: ["Script Loading", "Metadata & SEO"],
    externalLinks: [
      { label: "MDN: Preload", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload" },
      { label: "MDN: Resource Hints", url: "https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch" }
    ],
    mcqs: [
      { question: "What's the difference between preload and prefetch?", options: ["They're the same", "preload = current page (high priority); prefetch = future navigation (low priority)", "preload is faster", "prefetch is newer"], answer: 1, explanations: ["They differ.", "Correct — preload is for the current page; prefetch is for a future page the user might visit.", "Not about speed.", "Both exist."], difficulty: "medium" },
      { question: "What does preconnect do?", options: ["Fetches a resource", "Establishes DNS+TCP+TLS early", "Preloads CSS", "Caches a page"], answer: 1, explanations: ["It connects, not fetches.", "Correct — preconnect opens the connection early (DNS, TCP, TLS) to a third-party origin.", "Not CSS-specific.", "Not a full page."], difficulty: "medium" },
      { question: "What happens if you preload a resource but don't use it?", options: ["Nothing", "The browser warns (preloaded but not used)", "It's cached forever", "It causes an error"], answer: 1, explanations: ["It warns.", "Correct — the browser warns if a preloaded resource isn't used within ~3 seconds (wasted bandwidth).", "Not forever.", "Not an error."], difficulty: "hard" }
    ]
  },
  {
    id: "input-modes",
    title: "Input Modes & Mobile Keyboards",
    difficulty: "medium",
    definition: `The inputmode attribute hints at the type of data, controlling which mobile keyboard appears: inputmode="numeric" (number pad), "decimal", "tel", "email", "url", "search". Unlike type, inputmode doesn't affect validation — it's purely a keyboard hint.`,
    coreUnderstanding: `type="number" changes both the keyboard AND validation (only numbers allowed). inputmode="numeric" changes only the keyboard (a number pad appears) but allows any input (no validation) — useful for credit card numbers, ZIP codes (which may have leading zeros that type="number" strips). Use type for validation (email, number); use inputmode for keyboard hints without validation (numeric input that's still text). inputmode is newer and not supported in all browsers — use it alongside type for the best experience.`,
    howItWorks: `1. inputmode="numeric" — number pad (0-9), no validation.
2. inputmode="decimal" — number pad with decimal point.
3. inputmode="tel" — telephone keypad (0-9, *, #).
4. inputmode="email" — keyboard with @ and .
5. inputmode="url" — keyboard with / and .com.
6. inputmode="search" — keyboard with a search button.
7. Unlike type, inputmode doesn't validate — it's just a keyboard hint.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Numeric keyboard, but allows any input (no validation) -->
<!-- Good for credit cards, ZIP codes (leading zeros) -->
<input type="text" inputmode="numeric" pattern="[0-9]*">

<!-- Decimal keyboard -->
<input type="text" inputmode="decimal">

<!-- Telephone keypad -->
<input type="tel" inputmode="tel">

<!-- Email keyboard (with @) -->
<input type="email" inputmode="email">

<!-- URL keyboard (with /) -->
<input type="url" inputmode="url">`,
        note: "inputmode='numeric' shows a number pad but doesn't validate (unlike type='number'). Use it for credit cards/ZIP codes where type='number' strips leading zeros or adds unwanted spinners."
      }
    ],
    marginNotes: [
      "inputmode is a KEYBOARD HINT only — it doesn't validate. Use type for validation (email, number); inputmode for the keyboard (numeric without validation).",
      "type='number' strips leading zeros and adds spinners (bad for ZIP codes, credit cards). Use type='text' inputmode='numeric' instead.",
      "inputmode is newer — not all browsers support it. Use it alongside type for progressive enhancement.",
      "Common pattern: type='text' inputmode='numeric' pattern='[0-9]*' — numeric keyboard, text input (keeps leading zeros), regex validation."
    ],
    commonMistakes: [
      "Using type='number' for credit cards/ZIP codes — strips leading zeros, adds spinners. Use type='text' inputmode='numeric'.",
      "Expecting inputmode to validate — it's a keyboard hint only; use type or pattern for validation.",
      "Not testing on multiple mobile browsers — inputmode support varies."
    ],
    relatedTopics: ["Forms & Input Types", "Form Validation"],
    externalLinks: [
      { label: "MDN: inputmode", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode" },
      { label: "MDN: Input types", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input" }
    ],
    mcqs: [
      { question: "Does inputmode validate input?", options: ["Yes", "No — it's a keyboard hint only", "Only numbers", "Only with pattern"], answer: 1, explanations: ["It doesn't validate.", "Correct — inputmode controls the mobile keyboard; use type or pattern for validation.", "No validation.", "pattern validates, not inputmode."], difficulty: "medium" },
      { question: "Why use inputmode='numeric' instead of type='number' for ZIP codes?", options: ["It's faster", "type='number' strips leading zeros and adds spinners", "It's required", "It validates better"], answer: 1, explanations: ["Not speed.", "Correct — type='number' removes leading zeros (01234 → 1234) and adds up/down spinners; inputmode='numeric' keeps it as text.", "Not required.", "inputmode doesn't validate."], difficulty: "hard" },
      { question: "What keyboard does inputmode='email' show?", options: ["A number pad", "A keyboard with @ and .", "A telephone keypad", "A standard keyboard"], answer: 1, explanations: ["Not numeric.", "Correct — email keyboard has @ and . keys for easier email entry.", "That's tel.", "It's enhanced."], difficulty: "easy" }
    ]
  },
  {
    id: "hidden-inputs",
    title: "Hidden Inputs & Hidden Elements",
    difficulty: "easy",
    definition: `<input type="hidden"> stores data that's submitted with the form but not shown to the user. The HTML hidden attribute hides any element (display: none). Hidden inputs are for form data (IDs, tokens); the hidden attribute is for UI state.`,
    coreUnderstanding: `<input type="hidden" name="id" value="123"> — the value is submitted with the form but not displayed. Use for: record IDs (editing item 123), CSRF tokens, session data the server needs. The hidden attribute (hidden or hidden="hidden") on any element is equivalent to display: none — it hides the element. Don't use hidden for security (the value is in the HTML source — visible to anyone). Don't use hidden inputs for client-side state (use localStorage or JS variables). Hidden inputs are for form submission data the server needs but the user shouldn't see/edit.`,
    howItWorks: `1. <input type="hidden" name="id" value="123"> — submitted with the form, not displayed.
2. <div hidden>Hidden content</div> — equivalent to display: none.
3. Hidden inputs are in the HTML source — NOT for sensitive data (use server-side sessions).
4. Use for: record IDs, CSRF tokens, redirect URLs, pagination state.`,
    codeExamples: [
      {
        lang: "html",
        code: `<form action="/update" method="POST">
  <!-- Hidden ID (the record being edited) -->
  <input type="hidden" name="id" value="123">

  <!-- CSRF token (from the server) -->
  <input type="hidden" name="csrf_token" value="abc123">

  <label for="name">Name</label>
  <input type="text" id="name" name="name" value="Alice">

  <button type="submit">Save</button>
</form>

<!-- Hidden element (UI state) -->
<div hidden id="modal">This is hidden</div>
<button onclick="document.getElementById('modal').hidden = false">Show</button>`,
        note: "Hidden inputs are visible in the HTML source — don't use them for sensitive data (passwords, secrets). Use server-side sessions for security. Hidden inputs are for form data the server needs (IDs, tokens)."
      }
    ],
    marginNotes: [
      "Hidden inputs are in the HTML source — NOT for sensitive data. Use server-side sessions for security. Hidden inputs are for form data (IDs, CSRF tokens).",
      "The hidden attribute (on any element) is equivalent to display: none — it hides the element. Use it for UI state, not form data.",
      "Don't use hidden inputs for client-side state (theme, preferences) — use localStorage or JS variables. Hidden inputs are for form submission.",
      "CSRF tokens in hidden inputs are a common pattern — the server generates the token, includes it in the form, and verifies it on submission."
    ],
    commonMistakes: [
      "Using hidden inputs for sensitive data — they're visible in the HTML source; use server-side sessions.",
      "Using hidden inputs for client-side state — use localStorage or JS variables instead.",
      "Confusing type='hidden' (form data) with the hidden attribute (UI display)."
    ],
    relatedTopics: ["Forms & Input Types", "Form Validation"],
    externalLinks: [
      { label: "MDN: <input type='hidden'>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden" },
      { label: "MDN: hidden attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden" }
    ],
    mcqs: [
      { question: "Are hidden inputs secure for sensitive data?", options: ["Yes", "No — they're visible in the HTML source", "Only with encryption", "Only over HTTPS"], answer: 1, explanations: ["No.", "Correct — hidden inputs are in the page source; anyone can see them. Use server-side sessions.", "Encryption doesn't hide them.", "HTTPS encrypts transit, not the source."], difficulty: "medium" },
      { question: "What's the hidden attribute equivalent to?", options: ["visibility: hidden", "display: none", "opacity: 0", "position: absolute"], answer: 1, explanations: ["visibility: hidden keeps space.", "Correct — hidden is equivalent to display: none (element is removed from layout).", "opacity keeps space.", "position doesn't hide."], difficulty: "easy" },
      { question: "What are hidden inputs typically used for?", options: ["Passwords", "Form data the server needs but the user shouldn't edit (IDs, tokens)", "Client-side state", "Styling"], answer: 1, explanations: ["Not for passwords.", "Correct — record IDs, CSRF tokens, redirect URLs — submitted but not displayed.", "Use localStorage.", "Not styling."], difficulty: "easy" }
    ]
  }
];