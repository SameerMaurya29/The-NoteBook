// CSS topics part 3: Advanced layout, Modern CSS, Architecture (topics 23-33)
export default [
  {
    id: "dark-mode",
    title: "Dark Mode & prefers-color-scheme",
    difficulty: "medium",
    definition: `Dark mode adapts the UI to the user's system preference via the prefers-color-scheme media query (@media (prefers-color-scheme: dark)). The best approach: define colors as CSS variables, then swap them in the media query. Respect the user's choice.`,
    coreUnderstanding: `prefers-color-scheme: dark is a media query that matches when the user's OS/browser is in dark mode. The cleanest implementation: define all colors as CSS variables on :root, then override them in @media (prefers-color-scheme: dark). This way, all components use var(--bg), var(--text), etc., and the theme swaps automatically. For a manual toggle (user can switch regardless of system), add a .dark class to <html> and define the dark variables under .dark too. Always respect the user's system preference as the default, but allow override. Avoid hardcoding colors (use variables). Test both modes — contrast matters (WCAG AA/AAA). Don't just invert colors — adjust saturation, shadows, and images for dark mode.`,
    howItWorks: `1. Define colors as CSS variables on :root.
2. @media (prefers-color-scheme: dark) { :root { --bg: #1a1a1a; --text: #f0f0f0; } } — override for dark.
3. Components use var(--bg), var(--text) — they swap automatically.
4. For a manual toggle: add .dark class to <html>; define dark vars under .dark too.
5. Respect the user's system preference as the default.
6. Adjust contrast, shadows, and images for dark mode (not just inversion).`,
    codeExamples: [
      {
        lang: "css",
        code: `:root {
  --bg: #ffffff;
  --text: #333333;
  --card-bg: #f5f5f5;
  --border: #dddddd;
}

/* System dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
    --card-bg: #2a2a2a;
    --border: #3a3a3a;
  }
}

/* Manual toggle (optional, for a theme switcher) */
.dark {
  --bg: #1a1a1a;
  --text: #f0f0f0;
  --card-bg: #2a2a2a;
  --border: #3a3a3a;
}

/* Components use variables — they swap automatically */
body { background: var(--bg); color: var(--text); }
.card { background: var(--card-bg); border: 1px solid var(--border); }`,
        note: "Define colors as CSS variables, then swap them in @media (prefers-color-scheme: dark). Components use var(--bg), var(--text) — they swap automatically. For a manual toggle, add a .dark class and define the same vars."
      },
      {
        lang: "javascript",
        code: `// Manual toggle: add/remove .dark on <html>
const toggleTheme = () => {
  document.documentElement.classList.toggle('dark');
};

// Respect system preference on load
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}

// Listen for system changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    document.documentElement.classList.toggle('dark', e.matches);
  });`,
        note: "For a manual toggle, add/remove a .dark class on <html>. Listen to matchMedia for system changes. Save the user's choice in localStorage."
      }
    ],
    marginNotes: [
      "Define colors as CSS variables, swap them in @media (prefers-color-scheme: dark). Components use var(--bg) — they swap automatically. This is the cleanest dark mode.",
      "Respect the user's system preference as the default, but allow a manual toggle (.dark class on <html>). Save the choice in localStorage.",
      "Don't just invert colors — adjust saturation (dark mode colors are less saturated), shadows (lighter or none), and images (consider filter: brightness(0.9) for dark mode).",
      "Test contrast in both modes (WCAG AA: 4.5:1 for normal text). Dark mode isn't just 'black background' — it's a considered palette."
    ],
    commonMistakes: [
      "Hardcoding colors instead of using variables — dark mode requires changing every color manually. Use CSS variables.",
      "Just inverting colors (filter: invert(1)) — looks bad; adjust saturation, shadows, and images for dark mode.",
      "Not respecting the system preference — default to prefers-color-scheme, allow override."
    ],
    relatedTopics: ["CSS Variables", "Colors & Gradients", "Media Queries"],
    externalLinks: [
      { label: "MDN: prefers-color-scheme", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme" },
      { label: "Web.dev: Dark mode", url: "https://web.dev/articles/prefers-color-scheme" }
    ],
    mcqs: [
      { question: "What's the cleanest way to implement dark mode?", options: ["Invert all colors", "CSS variables swapped in prefers-color-scheme: dark", "Two separate CSS files", "JavaScript only"], answer: 1, explanations: ["Looks bad.", "Correct — define colors as variables, override them in the dark media query. Components swap automatically.", "Hard to maintain.", "JS is for the toggle, CSS for the theme."], difficulty: "medium" },
      { question: "Should you respect the system preference?", options: ["No", "Yes — default to prefers-color-scheme, allow override", "Only on mobile", "Only if the user asks"], answer: 1, explanations: ["You should.", "Correct — respect the system preference as the default, but allow a manual override (toggle).", "All platforms.", "Best practice."], difficulty: "easy" },
      { question: "Is dark mode just inverting colors?", options: ["Yes", "No — adjust saturation, shadows, and images for a considered palette", "Only the background", "Only the text"], answer: 1, explanations: ["Inversion looks bad.", "Correct — dark mode is a considered palette: less saturation, lighter/no shadows, adjusted images.", "More than background.", "More than text."], difficulty: "medium" }
    ]
  },
  {
    id: "float-clear",
    title: "Float & Clear (Legacy Layout)",
    difficulty: "medium",
    definition: `float: left/right takes an element out of flow and pushes it to one side, with text wrapping around it. clear: left/right/both prevents wrapping. Floats were the layout tool before flexbox/grid — now mostly used for wrapping text around images.`,
    coreUnderstanding: `Floats were the only layout tool before flexbox/grid. float: left moves the element left, and following content wraps around it (like text around an image in a magazine). The problem: floated elements are removed from flow, so the parent collapses (doesn't contain them) — this is the 'clearfix' problem. The clearfix (::after with clear: both) forces the parent to contain floats. Modern usage: floats are still appropriate for wrapping text around images (float: left; margin-right: 1rem). For layout (columns, sidebars), use flexbox or grid — not floats. Floats have quirks (collapsing parents, clearing issues) that flexbox/grid eliminate.`,
    howItWorks: `1. float: left | right — take out of flow, push to one side, content wraps.
2. clear: left | right | both — prevent wrapping on that side.
3. The parent of floated children collapses (doesn't contain them).
4. Clearfix: .clearfix::after { content: ""; display: table; clear: both; } — forces containment.
5. Modern use: wrapping text around images (not for layout).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Wrapping text around an image (the valid modern use) */
.article img {
  float: left;
  margin: 0 1rem 1rem 0;
}
.article p { /* text wraps around the floated image */ }

/* Clearfix (forces a parent to contain floated children) */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Legacy 2-column layout (use flexbox/grid instead!) */
.col-left { float: left; width: 50%; }
.col-right { float: right; width: 50%; }
.container { /* needs clearfix to contain the floats */ }`,
        note: "Floats are for wrapping text around images (valid). For layout (columns, sidebars), use flexbox/grid — floats have collapsing-parent issues that modern layout eliminates."
      }
    ],
    marginNotes: [
      "Floats are for wrapping text around images (valid modern use). For layout (columns, sidebars), use flexbox/grid — floats have collapsing-parent issues.",
      "The parent of floated children collapses (doesn't contain them). The clearfix (::after with clear: both) forces containment.",
      "clear: both prevents an element from wrapping next to floats. Use it to start a new section below floated content.",
      "Float quirks: collapsing parents, clearing issues, source order dependence. Flexbox/grid eliminate all of these."
    ],
    commonMistakes: [
      "Using floats for layout (columns) instead of flexbox/grid — floats have collapsing-parent and clearing issues.",
      "Forgetting the clearfix on a parent of floated children — the parent collapses (height: 0).",
      "Not clearing floats — following content wraps unexpectedly next to floated elements."
    ],
    relatedTopics: ["Flexbox", "Grid", "Display & Box Types"],
    externalLinks: [
      { label: "MDN: float", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/float" },
      { label: "MDN: clear", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/clear" }
    ],
    mcqs: [
      { question: "What's the modern use of floats?", options: ["Page layout", "Wrapping text around images", "Centering", "Nothing — they're deprecated"], answer: 1, explanations: ["Use flexbox/grid.", "Correct — floats are still valid for wrapping text around images. For layout, use flexbox/grid.", "Use flexbox.", "They're valid for text wrap."], difficulty: "medium" },
      { question: "Why does a parent of floated children collapse?", options: ["Floats are removed from flow", "A CSS bug", "The parent has no height", "The children are hidden"], answer: 0, explanations: ["Correct — floated elements are out of flow; the parent doesn't 'see' them, so its height collapses.", "Not a bug — by design.", "It has height 0 because of floats.", "They're not hidden."], difficulty: "medium" },
      { question: "How do you fix a collapsed parent (clearfix)?", options: ["Add height: auto", "::after with clear: both", "overflow: hidden", "display: block"], answer: 1, explanations: ["Doesn't fix it.", "Correct — .clearfix::after { content: ''; display: table; clear: both; } forces containment.", "Works but has side effects (clipping).", "Doesn't fix it."], difficulty: "medium" }
    ]
  },
  {
    id: "scroll-snap",
    title: "Scroll Snap & Smooth Scrolling",
    difficulty: "medium",
    definition: `Scroll snap forces the scroll to align to points (scroll-snap-type, scroll-snap-align). scroll-behavior: smooth enables smooth scrolling (for anchor links and JS scroll). These create carousel-like, snap-to-grid scrolling without JS libraries.`,
    coreUnderstanding: `scroll-snap-type: x mandatory on a container forces horizontal scrolling to snap to points. scroll-snap-align: start/center/end on children defines where they snap. mandatory snaps always (can't stop between); proximity snaps only if close. This creates carousel-like, page-like, or gallery scrolling natively (no JS). scroll-behavior: smooth on html (or a container) makes anchor links (#section) and JS scroll smooth (animated). scroll-snap-stop: normal/always prevents skipping snap points (for carousels). Modern scroll snap is well-supported and replaces many JS carousel libraries.`,
    howItWorks: `1. scroll-snap-type: x mandatory — horizontal snap (mandatory = always snaps).
2. scroll-snap-type: y proximity — vertical snap (proximity = snaps if close).
3. scroll-snap-align: start | center | end — where children snap.
4. scroll-snap-stop: always — prevent skipping snap points (carousels).
5. scroll-behavior: smooth — smooth scrolling (anchor links, JS scroll).
6. scroll-padding: 20px — offset snap points (e.g., for a fixed header).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Horizontal carousel (snap to each card) */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
}
.carousel > * {
  scroll-snap-align: start;
  scroll-snap-stop: always; /* can't skip cards */
  flex: 0 0 300px;
}

/* Full-page vertical snap (sections) */
.pages {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
.pages > section {
  scroll-snap-align: start;
  height: 100vh;
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 60px; /* offset for fixed header */
}`,
        note: "scroll-snap creates carousels and page-like scrolling natively (no JS). scroll-behavior: smooth animates anchor links. scroll-padding offsets snap points (for fixed headers)."
      }
    ],
    marginNotes: [
      "scroll-snap-type: x/y mandatory/proximity — mandatory always snaps; proximity only if close. scroll-snap-align: start/center/end on children.",
      "scroll-behavior: smooth on html makes anchor links (#section) animate. scroll-padding-top offsets the target (for fixed headers).",
      "scroll-snap-stop: always prevents skipping snap points (essential for carousels — one card at a time).",
      "Scroll snap replaces many JS carousel libraries — it's native, smooth, and accessible. Use it for carousels, galleries, page sections."
    ],
    commonMistakes: [
      "Using mandatory when proximity is better — mandatory can trap users (can't stop between points); proximity is gentler.",
      "Forgetting scroll-padding-top with a fixed header — the snap target is hidden behind the header.",
      "Building JS carousels when scroll-snap works — native is smoother and more accessible."
    ],
    relatedTopics: ["Overflow", "Responsive Design"],
    externalLinks: [
      { label: "MDN: scroll-snap", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap" },
      { label: "MDN: scroll-behavior", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior" }
    ],
    mcqs: [
      { question: "What's the difference between mandatory and proximity?", options: ["They're the same", "mandatory always snaps; proximity only if close", "mandatory is faster", "proximity is newer"], answer: 1, explanations: ["They differ.", "Correct — mandatory always snaps (can trap); proximity snaps only if the user is close (gentler).", "Same speed.", "Both exist."], difficulty: "medium" },
      { question: "What does scroll-behavior: smooth do?", options: ["Snaps to points", "Animates anchor link scrolling", "Hides the scrollbar", "Prevents scrolling"], answer: 1, explanations: ["That's scroll-snap.", "Correct — smooth animates scrolling (anchor links, JS scroll).", "It doesn't hide.", "It doesn't prevent."], difficulty: "easy" },
      { question: "Why use scroll-padding-top?", options: ["To add padding", "To offset snap targets for a fixed header", "To hide content", "To slow scrolling"], answer: 1, explanations: ["Not just padding.", "Correct — scroll-padding-top offsets the snap target so it isn't hidden behind a fixed header.", "It doesn't hide.", "It doesn't slow."], difficulty: "medium" }
    ]
  },
  {
    id: "container-queries",
    title: "Container Queries",
    difficulty: "hard",
    definition: `Container queries (@container) apply styles based on a component's container size (not the viewport). A component adapts to where it's placed (sidebar vs main), not the screen. This enables true component-level responsiveness.`,
    coreUnderstanding: `Media queries respond to the viewport; container queries respond to a component's container. This is a paradigm shift — a card component can look different in a sidebar (narrow) vs the main area (wide), regardless of the screen size. To use: (1) Set container-type: inline-size (or layout) on the container. (2) Use @container (min-width: 400px) { ... } in the child. The child's styles adapt to the container's width. This is powerful for reusable components (design systems) — the component doesn't need to know where it's placed. container-type: inline-size responds to width; layout responds to the container's layout (more powerful but newer). Named containers (container-name) allow targeting specific containers.`,
    howItWorks: `1. .container { container-type: inline-size; } — enable the container.
2. @container (min-width: 400px) { .card { ... } } — query the container.
3. container-type: inline-size — respond to width (most common).
4. container-type: layout — respond to layout changes (newer).
5. container-name: sidebar — name a container for targeted queries.
6. @container sidebar (min-width: 300px) — query a named container.
7. cqw/cqh/cqi/cqb — container query units (1cqi = 1% of container inline size).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Enable a container */
.sidebar { container-type: inline-size; }
.main { container-type: inline-size; }

/* The card adapts to its container (not the viewport) */
.card {
  display: block; /* narrow: stacked */
}
@container (min-width: 400px) {
  .card {
    display: flex; /* wide: side-by-side */
  }
}

/* Named container */
.widget { container-type: inline-size; container-name: widget; }
@container widget (min-width: 300px) {
  .widget-content { ... }
}

/* Container query units (1cqi = 1% of container inline size) */
.title {
  font-size: 5cqi; /* 5% of the container's width */
}`,
        note: "Container queries let a component adapt to its container (not the viewport). A card looks different in a sidebar vs the main area, regardless of screen size. This is a paradigm shift for reusable components."
      }
    ],
    marginNotes: [
      "Container queries respond to the CONTAINER, not the viewport. A component adapts to where it's placed (sidebar vs main), not the screen size.",
      "Set container-type: inline-size on the container, then @container (min-width: ...) in the child. This enables true component-level responsiveness.",
      "Container query units (cqw, cqi, cqb) are like vw/vh but relative to the container. font-size: 5cqi scales with the container width.",
      "This is a paradigm shift for design systems — components don't need to know where they're placed; they adapt to their container."
    ],
    commonMistakes: [
      "Forgetting container-type on the parent — @container queries won't work without it.",
      "Confusing container queries with media queries — container = component's container; media = viewport.",
      "Not using container queries for reusable components — they should adapt to their container, not the screen."
    ],
    relatedTopics: ["Responsive Design", "Media Queries"],
    externalLinks: [
      { label: "MDN: Container queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries" },
      { label: "MDN: container-type", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/container-type" }
    ],
    mcqs: [
      { question: "What do container queries respond to?", options: ["The viewport", "The component's container", "The screen size", "The font size"], answer: 1, explanations: ["That's media queries.", "Correct — container queries respond to the component's container, not the viewport. Components adapt to where they're placed.", "That's media queries.", "Not font size."], difficulty: "medium" },
      { question: "What must you set on the container?", options: ["container-type: inline-size", "display: container", "position: container", "nothing"], answer: 0, explanations: ["Correct.", "Not a property.", "Not a property.", "You must enable it."], difficulty: "medium" },
      { question: "What are cqi units?", options: ["Pixels", "1% of the container's inline size", "1% of the viewport", "A font size"], answer: 1, explanations: ["Not pixels.", "Correct — cqi is 1% of the container's inline size (like vw but for the container).", "That's vw.", "Not font size."], difficulty: "hard" }
    ]
  },
  {
    id: "css-nesting",
    title: "CSS Nesting",
    difficulty: "medium",
    definition: `Native CSS nesting lets you nest selectors inside others (like Sass): .card { color: red; &:hover { color: blue; } }. The & refers to the parent selector. Supported in all modern browsers (2023+).`,
    coreUnderstanding: `CSS nesting is now native (no preprocessor needed). .card { & .title { } } nests a descendant selector. &:hover adds a pseudo-class to the parent. & .title means .card .title; &:hover means .card:hover. Nesting reduces repetition and groups related styles. It's compiled by the browser (no build step). The & is required for most nesting (to disambiguate from property declarations). Nesting can go deep, but avoid over-nesting (specificity increases, readability decreases). Sass nesting and native CSS nesting are nearly identical now — the main reason to use Sass is variables (though CSS variables work) and mixins (though @apply and functions help).`,
    howItWorks: `1. .card { & .title { } } — nest a descendant (.card .title).
2. .card { &:hover { } } — add a pseudo-class (.card:hover).
3. .card { &.active { } } — compound (.card.active, no space).
4. .card { & + .card { } } — sibling (.card + .card).
5. The & is the parent selector (required in most cases).
6. Nesting increases specificity — avoid over-nesting.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Native CSS nesting (no preprocessor) */
.card {
  padding: 1rem;
  background: white;

  & .title {        /* .card .title */
    font-size: 1.5rem;
  }

  &:hover {         /* .card:hover */
    background: #f0f0f0;
  }

  &.active {        /* .card.active (no space) */
    border-color: blue;
  }

  & .title {        /* nested descendant */
    & span {        /* .card .title span */
      color: gray;
    }
  }
}`,
        note: "Native CSS nesting (no preprocessor). & is the parent selector. &:hover = .card:hover; & .title = .card .title (descendant); &.active = .card.active (compound, no space). Avoid over-nesting (specificity increases)."
      }
    ],
    marginNotes: [
      "Native CSS nesting (no preprocessor needed). & is the parent selector. &:hover = .card:hover; & .title = .card .title; &.active = .card.active (no space).",
      "Avoid over-nesting — each level increases specificity (harder to override) and reduces readability. 2-3 levels is usually enough.",
      "Nesting is now native in all modern browsers (2023+). The main remaining reasons for Sass: mixins (though @apply helps) and functions.",
      "& is required in most nesting (to disambiguate from property declarations). &:hover, & .title, &.active are all valid."
    ],
    commonMistakes: [
      "Over-nesting (deeply nested selectors) — increases specificity, reduces readability. Keep it to 2-3 levels.",
      "Forgetting the & — without it, the nested selector is ambiguous (could be a property). &:hover, not :hover.",
      "Confusing & .title (descendant, space) with &.active (compound, no space) — very different selectors."
    ],
    relatedTopics: ["Selectors & Specificity", "The Cascade & Inheritance"],
    externalLinks: [
      { label: "MDN: CSS nesting", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting" },
      { label: "MDN: Nesting selector (&)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector" }
    ],
    mcqs: [
      { question: "Is CSS nesting native or does it need a preprocessor?", options: ["Needs Sass", "Native in modern browsers (no preprocessor)", "Only with PostCSS", "Only in CSS-in-JS"], answer: 1, explanations: ["Not anymore.", "Correct — CSS nesting is native in all modern browsers (2023+). No preprocessor needed.", "Not only PostCSS.", "Not only CSS-in-JS."], difficulty: "easy" },
      { question: "What does & represent?", options: ["A variable", "The parent selector", "A child element", "Nothing"], answer: 1, explanations: ["Not a variable.", "Correct — & is the parent selector. &:hover = .card:hover; & .title = .card .title.", "Not a child.", "It's the parent."], difficulty: "easy" },
      { question: "What's the difference between & .title and &.active?", options: ["They're the same", "& .title is descendant (space); &.active is compound (no space)", "& .title is newer", "&.active is deprecated"], answer: 1, explanations: ["They differ.", "Correct — & .title = .card .title (descendant, space); &.active = .card.active (compound, no space).", "Both valid.", "Both valid."], difficulty: "medium" }
    ]
  },
  {
    id: "cascade-layers",
    title: "Cascade Layers (@layer)",
    difficulty: "hard",
    definition: `@layer creates named layers that control cascade order across entire stylesheets. Layers have a fixed order (lower wins within the same specificity). This lets you import a framework (Tailwind, Bootstrap) into a layer and override it without !important or high specificity.`,
    coreUnderstanding: `Without layers, cascade order is: !important > inline > ID > class > element > source order. With @layer, you define layers in order: @layer reset, base, framework, components, utilities. Styles in earlier layers WIN over later layers (at the same specificity). This is the opposite of source order (later wins) — layers reverse it. The key use case: import a framework (e.g., @import 'tailwind' layer(framework)) and your components layer overrides it without !important or specificity wars. Unlayered styles win over layered styles (so you can add quick overrides). Layers don't change specificity within a layer — they reorder layers. This is a powerful tool for managing large CSS codebases and third-party CSS.`,
    howItWorks: `1. @layer reset, base, framework, components, utilities; — declare layer order (earlier wins).
2. @layer base { body { ... } } — add styles to a layer.
3. @import 'framework.css' layer(framework); — import into a layer.
4. Earlier layers win over later layers (at the same specificity).
5. Unlayered styles win over ALL layered styles (quick overrides).
6. !important reverses: layered !important wins over unlayered !important in REVERSE layer order.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Declare layer order (earlier wins) */
@layer reset, base, framework, components, utilities;

/* Add styles to layers */
@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}
@layer base {
  body { font-family: sans-serif; line-height: 1.5; }
}

/* Import a framework into a layer */
@import 'tailwind.css' layer(framework);

/* Your components override the framework (no !important needed) */
@layer components {
  .btn { /* overrides framework's .btn */ }
}

/* Unlayered styles win over ALL layers (quick overrides) */
.btn-special { /* wins over layered .btn */ }`,
        note: "@layer declares layer order — earlier layers win over later ones (at the same specificity). Import frameworks into a layer; your components layer overrides without !important. Unlayered styles win over all layers."
      }
    ],
    marginNotes: [
      "@layer reorders the cascade — earlier layers win over later ones (opposite of source order). This lets you import a framework into a layer and override it cleanly.",
      "Unlayered styles win over ALL layered styles — use unlayered for quick overrides (like !important but cleaner).",
      "The main use case: import a framework (Tailwind, Bootstrap) into a layer, then your components layer overrides it without specificity wars or !important.",
      "!important reverses within layers: layered !important wins over unlayered !important in REVERSE layer order (earlier layer's !important wins)."
    ],
    commonMistakes: [
      "Not declaring layer order first — the order is determined by first appearance; declare it explicitly for clarity.",
      "Expecting later layers to win (like source order) — it's reversed: earlier layers win.",
      "Forgetting that unlayered styles win over all layers — this can be surprising (unlayered overrides your layered components)."
    ],
    relatedTopics: ["The Cascade & Inheritance", "Selectors & Specificity"],
    externalLinks: [
      { label: "MDN: @layer", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@layer" },
      { label: "MDN: Cascade layers", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@layer/cascade_layers" }
    ],
    mcqs: [
      { question: "Which layer wins at the same specificity?", options: ["The last declared", "The first declared (earlier wins)", "The one with !important", "Random"], answer: 1, explanations: ["Reversed from source order.", "Correct — earlier layers win over later ones (opposite of source order).", "!important is separate.", "Not random."], difficulty: "hard" },
      { question: "Do unlayered styles win over layered styles?", options: ["No", "Yes — unlayered wins over all layers", "Only with !important", "Only if later"], answer: 1, explanations: ["They do.", "Correct — unlayered styles win over ALL layered styles (useful for quick overrides).", "Always.", "Always."], difficulty: "medium" },
      { question: "What's the main use case for @layer?", options: ["Animations", "Importing frameworks and overriding without specificity wars", "Dark mode", "Nesting"], answer: 1, explanations: ["Not animations.", "Correct — import a framework into a layer, override it from your components layer without !important.", "That's media queries.", "That's nesting."], difficulty: "medium" }
    ]
  },
  {
    id: "logical-properties",
    title: "Logical Properties (inline/block, start/end)",
    difficulty: "hard",
    definition: `Logical properties (margin-inline, padding-block, inset-inline-start) are direction-agnostic — they adapt to the writing mode (LTR/RTL). margin-inline-start = left in LTR, right in RTL. This makes internationalization (RTL languages like Arabic) automatic.`,
    coreUnderstanding: `Physical properties (margin-left, padding-right, left) are hardcoded to directions. Logical properties (margin-inline-start, padding-block-end, inset-inline-start) are relative to the writing mode. In LTR (left-to-right), inline-start = left, inline-end = right. In RTL (right-to-left, like Arabic), inline-start = right, inline-end = left — automatically. block = vertical (top/bottom); inline = horizontal (left/right). start/end = the beginning/end of the axis. Using logical properties means your layout works in LTR and RTL without rewriting CSS — just set dir="rtl" on <html>. This is essential for internationalized apps. The flow-relative values (inline/block) also adapt to vertical writing modes (e.g., Japanese vertical text).`,
    howItWorks: `1. inline = horizontal (in LTR/RTL); block = vertical.
2. start = beginning of the axis; end = end.
3. margin-inline-start = left in LTR, right in RTL (automatic).
4. padding-block-start = top (always, regardless of direction).
5. inset-inline-start = left in LTR, right in RTL (for positioning).
6. text-align: start = left in LTR, right in RTL.
7. Set dir="rtl" on <html> for RTL — logical properties adapt automatically.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Physical (hardcoded — breaks in RTL) */
.card {
  margin-left: 1rem;   /* always left */
  padding-right: 1rem;  /* always right */
  text-align: left;
}

/* Logical (direction-agnostic — works in LTR and RTL) */
.card {
  margin-inline-start: 1rem;  /* left in LTR, right in RTL */
  padding-inline-end: 1rem;   /* right in LTR, left in RTL */
  text-align: start;          /* left in LTR, right in RTL */
}

/* Block (vertical — always top/bottom) */
.box {
  margin-block-start: 1rem;  /* top */
  padding-block-end: 1rem;    /* bottom */
}

/* Positioning (inset) */
.badge {
  position: absolute;
  inset-inline-end: 0;  /* right in LTR, left in RTL */
}`,
        note: "Logical properties (inline/block, start/end) adapt to the writing mode. margin-inline-start = left in LTR, right in RTL. Set dir='rtl' on <html> and the layout adapts automatically — no CSS changes."
      }
    ],
    marginNotes: [
      "Logical properties (inline/block, start/end) adapt to the writing mode. margin-inline-start = left in LTR, right in RTL. Essential for internationalized apps.",
      "inline = horizontal; block = vertical. start = beginning; end = end. In LTR: inline-start=left, inline-end=right. In RTL: reversed.",
      "Set dir='rtl' on <html> for RTL languages (Arabic, Hebrew). Logical properties adapt automatically — no CSS changes needed.",
      "text-align: start (not left) — left in LTR, right in RTL. inset-inline-start (not left) — for positioning. Use logical properties for internationalization."
    ],
    commonMistakes: [
      "Using physical properties (margin-left, left) for internationalized apps — they break in RTL. Use logical (margin-inline-start, inset-inline-start).",
      "Using text-align: left instead of text-align: start — start adapts to the writing mode.",
      "Not testing in RTL — set dir='rtl' on <html> and check if the layout adapts (with logical properties, it should)."
    ],
    relatedTopics: ["Box Model", "Positioning", "Responsive Design"],
    externalLinks: [
      { label: "MDN: Logical properties", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties" },
      { label: "MDN: Writing mode", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode" }
    ],
    mcqs: [
      { question: "What does margin-inline-start equal in RTL?", options: ["Left", "Right (adapts to the writing mode)", "Top", "Bottom"], answer: 1, explanations: ["That's LTR.", "Correct — inline-start = left in LTR, right in RTL. Logical properties adapt to the writing mode.", "That's block-start.", "That's block-end."], difficulty: "hard" },
      { question: "Why use logical properties?", options: ["They're faster", "Internationalization — they adapt to LTR/RTL automatically", "They're newer", "They're required"], answer: 1, explanations: ["Not speed.", "Correct — logical properties adapt to the writing mode, making RTL support automatic (just set dir='rtl').", "Not just newer.", "Best practice."], difficulty: "medium" },
      { question: "What does text-align: start do in LTR?", options: ["Right", "Left (start of the line in LTR)", "Center", "Justify"], answer: 1, explanations: ["That's end.", "Correct — start = left in LTR, right in RTL. Use start instead of left for internationalization.", "Not center.", "Not justify."], difficulty: "medium" }
    ]
  },
  {
    id: "css-architecture",
    title: "CSS Architecture (BEM, OOCSS, SMACSS)",
    difficulty: "hard",
    definition: `CSS architecture methodologies organize styles for maintainability: BEM (Block__Element--Modifier naming), OOCSS (separate structure from skin), SMACSS (categorize: base, layout, module, state, theme). They prevent specificity wars and unused CSS.`,
    coreUnderstanding: `BEM (Block Element Modifier): .block__element--modifier. Block = standalone component (.card); Element = a part of the block (.card__title); Modifier = a variant (.card--dark). The double-underscore and double-hyphen make the structure explicit. This keeps specificity flat (all classes, no nesting) — easy to override. OOCSS: separate structure (layout) from skin (visuals) — .media and .box (structure) + .large and .dark (skin). SMACSS: categorize rules — base (element selectors), layout (structural), module (components), state (.is-hidden), theme. Utility-first (Tailwind): small, single-purpose classes (text-center, mt-4) composed in HTML. Each methodology solves the same problems: specificity wars, unused CSS, hard-to-override styles. BEM is the most popular for custom CSS; Tailwind for utility-first.`,
    howItWorks: `1. BEM: .block__element--modifier — flat specificity, explicit structure.
2. OOCSS: separate structure (.media) from skin (.large, .dark).
3. SMACSS: categorize — base, layout, module, state (.is-active), theme.
4. Utility-first (Tailwind): small classes (text-center, mt-4) composed in HTML.
5. All aim for: flat specificity, reusable components, easy overrides, no unused CSS.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* BEM: Block__Element--Modifier */
.card { }               /* Block */
.card__title { }         /* Element (part of card) */
.card__body { }          /* Element */
.card--dark { }          /* Modifier (variant) */
.card__title--large { }  /* Element + modifier */

/* HTML */
/* <div class="card card--dark">
   <h2 class="card__title card__title--large">Title</h2>
   <div class="card__body">Content</div>
</div> */

/* OOCSS: separate structure from skin */
.media { display: flex; }     /* structure */
.box { padding: 1rem; }       /* structure */
.large { font-size: 2rem; }   /* skin */
.dark { background: #333; }   /* skin */

/* SMACSS: state classes */
.tab { }          /* module */
.tab.is-active { }/* state */`,
        note: "BEM (.block__element--modifier) keeps specificity flat (all classes, no nesting) — easy to override and maintain. The naming makes the structure explicit. It's the most popular methodology for custom CSS."
      }
    ],
    marginNotes: [
      "BEM (.block__element--modifier) keeps specificity flat (all classes) — no nesting, easy to override. The naming makes the structure explicit.",
      "The goal of all methodologies: flat specificity (avoid ID/nesting), reusable components, easy overrides, no unused CSS.",
      "Utility-first (Tailwind) is a different approach — small, single-purpose classes composed in HTML. No custom CSS, but HTML gets verbose.",
      "Choose based on your team: BEM for custom CSS (explicit, maintainable); Tailwind for rapid development (utility-first)."
    ],
    commonMistakes: [
      "Deeply nested selectors (.card .card__title .card__title-link) — increases specificity. BEM uses flat classes (.card__title-link).",
      "Mixing methodologies — pick one (BEM is most common for custom CSS) and stick with it for consistency.",
      "Using IDs for styling (high specificity, hard to override) — use classes (flat specificity)."
    ],
    relatedTopics: ["Selectors & Specificity", "The Cascade & Inheritance"],
    externalLinks: [
      { label: "BEM: Methodology", url: "https://getbem.io/" },
      { label: "SMACSS", url: "https://smacss.com/" }
    ],
    mcqs: [
      { question: "What does BEM stand for?", options: ["Block Element Modifier", "Basic Element Method", "Block Encapsulation Model", "Browser Element Markup"], answer: 0, explanations: ["Correct.", "Not BEM.", "Not BEM.", "Not BEM."], difficulty: "easy" },
      { question: "What's the BEM naming for a card's title element?", options: [".card-title", ".card__title", ".card .title", ".card_title"], answer: 1, explanations: ["Not BEM (no double underscore).", "Correct — .block__element uses double underscores: .card__title.", "Not BEM (nested).", "Not BEM (single underscore)."], difficulty: "medium" },
      { question: "Why does BEM use flat classes (no nesting)?", options: ["It's faster", "Flat specificity — easy to override, no specificity wars", "It's required", "It's newer"], answer: 1, explanations: ["Not speed.", "Correct — flat classes (all 0,0,1,0 specificity) are easy to override; nesting increases specificity (hard to override).", "Not required.", "It's a design choice."], difficulty: "medium" }
    ]
  },
  {
    id: "performance",
    title: "CSS Performance & Critical CSS",
    difficulty: "hard",
    definition: `CSS is render-blocking (the browser won't render until CSS loads). Optimize: minimize CSS, inline critical CSS (above-the-fold), defer non-critical, use will-change sparingly, avoid layout thrashing, prefer transform/opacity for animations. Measure with Lighthouse/DevTools.`,
    coreUnderstanding: `CSS blocks rendering — the browser waits for all <link> CSS before painting. Optimize: (1) Minimize CSS (remove unused, minify). (2) Inline critical CSS (above-the-fold) in <style> for instant first paint; load the rest async. (3) Avoid @import (it's serial — each import waits for the previous). (4) Use will-change sparingly (it creates GPU layers — memory cost). (5) Avoid layout thrashing (read then write DOM, not interleaved). (6) Animate transform/opacity (GPU, no layout) not width/top (layout, janky). (7) Avoid expensive selectors (* and deep descendants are slower). Measure with Lighthouse (Performance score) and DevTools (Coverage tab shows unused CSS, Performance tab shows layout/paint times).`,
    howItWorks: `1. CSS is render-blocking — the browser waits for CSS before painting.
2. Inline critical CSS (above-the-fold) in <style> for instant first paint.
3. Load non-critical CSS async: <link rel="preload" as="style" onload="this.rel='stylesheet'">.
4. Avoid @import (serial loading) — use <link> (parallel).
5. Minify CSS and remove unused (PurgeCSS, UnCSS).
6. will-change: transform — hint for GPU layers (use sparingly — memory).
7. Animate transform/opacity (GPU); avoid width/top (layout).`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Inline critical CSS (above-the-fold) for instant first paint -->
<style>
  /* Only the CSS needed for above-the-fold content */
  body { margin: 0; font-family: sans-serif; }
  .hero { height: 100vh; background: #007bff; color: white; }
</style>

<!-- Load non-critical CSS async (doesn't block render) -->
<link rel="preload" href="styles.css" as="style"
      onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- Avoid @import (serial — each waits for the previous) -->
<!-- Bad: <style>@import 'a.css'; @import 'b.css';</style> -->
<!-- Good: -->
<link rel="stylesheet" href="a.css">
<link rel="stylesheet" href="b.css">`,
        note: "Inline critical (above-the-fold) CSS for instant first paint; load the rest async. Avoid @import (serial loading); use multiple <link> (parallel)."
      },
      {
        lang: "css",
        code: `/* will-change: hint for GPU layers (use SPARINGLY — memory cost) */
.animated {
  will-change: transform; /* creates a layer — smooth but uses memory */
}
/* Remove when animation ends (JS): element.style.willChange = 'auto' */

/* Avoid expensive selectors */
/* Bad: * { } (universal — slow) */
/* Bad: .deep .nested .selector (descendants — slow) */
/* Good: .specific-class (flat — fast) */

/* Animate transform/opacity (GPU, no layout) — not width/top (layout) */
.smooth {
  transition: transform 0.3s; /* good */
  /* transition: width 0.3s; — bad (causes layout) */
}`,
        note: "will-change creates GPU layers (smooth animations) but uses memory — use sparingly and remove when done. Animate transform/opacity (GPU); avoid width/top (layout)."
      }
    ],
    marginNotes: [
      "CSS is render-blocking — inline critical (above-the-fold) CSS for instant first paint; load the rest async. This is the #1 CSS performance optimization.",
      "Avoid @import (serial loading — each waits for the previous). Use multiple <link> (parallel loading).",
      "will-change creates GPU layers (smooth animations) but uses memory. Use it sparingly and remove it when the animation ends (element.style.willChange = 'auto').",
      "Animate transform/opacity (GPU, no layout — smooth). Avoid width/top/left (layout/reflow — janky). Measure with Lighthouse and DevTools Coverage."
    ],
    commonMistakes: [
      "Using @import (serial loading) instead of <link> (parallel) — @import blocks rendering longer.",
      "Overusing will-change — it creates GPU layers (memory cost). Use it only for elements about to animate, and remove it after.",
      "Animating width/top/left (causes layout/reflow) instead of transform/opacity (GPU, smooth)."
    ],
    relatedTopics: ["Transitions", "Transforms", "Script Loading"],
    externalLinks: [
      { label: "Web.dev: CSS performance", url: "https://web.dev/articles/css-performance" },
      { label: "MDN: will-change", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/will-change" }
    ],
    mcqs: [
      { question: "Is CSS render-blocking?", options: ["No", "Yes — the browser waits for CSS before painting", "Only in Chrome", "Only @import"], answer: 1, explanations: ["It is.", "Correct — CSS blocks rendering; inline critical CSS for instant first paint.", "All browsers.", "@import is worse (serial)."], difficulty: "medium" },
      { question: "Why avoid @import?", options: ["It's deprecated", "Serial loading — each import waits for the previous; <link> is parallel", "It's slower to parse", "It's invalid"], answer: 1, explanations: ["It's valid.", "Correct — @import loads serially (each waits for the previous); multiple <link> load in parallel.", "Parse speed is similar.", "It's valid."], difficulty: "medium" },
      { question: "Should you overuse will-change?", options: ["Yes, for smoothness", "No — it creates GPU layers (memory cost); use sparingly and remove when done", "Only in production", "Only for animations"], answer: 1, explanations: ["No.", "Correct — will-change uses memory (GPU layers). Use it only for elements about to animate, remove after.", "Same rule.", "That's the use, but sparingly."], difficulty: "hard" }
    ]
  },
  {
    id: "accessibility-css",
    title: "CSS for Accessibility",
    difficulty: "medium",
    definition: `CSS affects accessibility: respect prefers-reduced-motion (disable animations), maintain color contrast (WCAG AA: 4.5:1), don't remove focus rings without alternatives, use :focus-visible, hide content accessibly (visually-hidden pattern), support prefers-contrast.`,
    coreUnderstanding: `CSS can help or hurt accessibility. Key practices: (1) prefers-reduced-motion: disable non-essential animations for users who request it (vestibular disorders). (2) Color contrast: WCAG AA requires 4.5:1 for normal text, 3:1 for large text. (3) Focus: never remove outline without an alternative; use :focus-visible (keyboard-only ring). (4) Visually-hidden: hide content visually but keep it for screen readers (the .visually-hidden pattern — clip, not display: none). (5) prefers-contrast: more contrast for users who need it. (6) Don't rely on color alone (add icons/text for status). (7) Respect prefers-color-scheme (dark mode). Test with a screen reader and keyboard-only navigation.`,
    howItWorks: `1. @media (prefers-reduced-motion: reduce) { * { animation: none; transition: none; } } — disable animations.
2. Color contrast: WCAG AA = 4.5:1 (normal), 3:1 (large text). Use a contrast checker.
3. :focus-visible — focus ring only for keyboard (not mouse).
4. .visually-hidden — hide visually, keep for screen readers (clip, not display: none).
5. @media (prefers-contrast: more) — increase contrast.
6. Don't rely on color alone — add icons/text for status (colorblind users).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Respect reduced motion (vestibular disorders) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Visually hidden, but available to screen readers */
.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus ring only for keyboard (not mouse) */
:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* Don't rely on color alone — add icons */
.error { color: red; }
.error::before { content: "⚠ "; } /* icon + color */`,
        note: "Respect prefers-reduced-motion (disable animations). Use .visually-hidden (clip, not display: none) to hide content visually but keep it for screen readers. Don't rely on color alone (add icons for colorblind users)."
      }
    ],
    marginNotes: [
      "Respect prefers-reduced-motion — disable non-essential animations for users with vestibular disorders. This is a WCAG requirement.",
      ".visually-hidden hides content visually but keeps it for screen readers (clip, not display: none). Use it for labels, headings that are visual-only.",
      "Color contrast: WCAG AA = 4.5:1 (normal text), 3:1 (large text). Use a contrast checker. Don't rely on color alone (add icons for colorblind users).",
      "Never remove outline (focus ring) without an alternative. Use :focus-visible (keyboard-only ring) instead of outline: none."
    ],
    commonMistakes: [
      "Removing outline (outline: none) without an alternative — breaks keyboard navigation. Use :focus-visible.",
      "Using display: none to hide content from sighted users — it also hides it from screen readers. Use .visually-hidden.",
      "Relying on color alone for status (red = error) — colorblind users can't tell. Add icons or text."
    ],
    relatedTopics: ["Form Styling", "Dark Mode", "Transitions"],
    externalLinks: [
      { label: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" },
      { label: "WCAG: Color contrast", url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" }
    ],
    mcqs: [
      { question: "What does prefers-reduced-motion: reduce request?", options: ["More animations", "Fewer/non-essential animations (vestibular disorders)", "No CSS", "Faster animations"], answer: 1, explanations: ["The opposite.", "Correct — users with vestibular disorders request reduced motion; disable non-essential animations.", "Not no CSS.", "Not faster."], difficulty: "medium" },
      { question: "How do you hide content visually but keep it for screen readers?", options: ["display: none", "visibility: hidden", ".visually-hidden (clip, not display: none)", "opacity: 0"], answer: 2, explanations: ["Hides from screen readers too.", "Hides from screen readers too.", "Correct — .visually-hidden uses clip to hide visually but keeps it in the accessibility tree.", "Keeps space and is still focusable."], difficulty: "medium" },
      { question: "Why not rely on color alone for status?", options: ["It's ugly", "Colorblind users can't distinguish colors; add icons or text", "It's slow", "It's invalid"], answer: 1, explanations: ["Not about looks.", "Correct — colorblind users may not see the difference; add icons or text (e.g., ⚠ for errors).", "Not speed.", "It's valid but inaccessible."], difficulty: "easy" }
    ]
  },
  {
    id: "css-containment",
    title: "CSS Containment (contain)",
    difficulty: "hard",
    definition: `The contain property tells the browser an element is independent (its internals don't affect the rest of the page). This enables performance optimizations — the browser can skip re-layout for the rest of the page when the contained element changes. Values: layout, paint, size, style, content, strict, paint.`,
    coreUnderstanding: `contain tells the browser 'this element's internals don't affect the outside' — so the browser can optimize (skip re-layout/paint for the rest of the page when this element changes). contain: layout (the element's layout doesn't affect outside), paint (the element's painting doesn't affect outside — also clips overflow), size (the element's size doesn't depend on its contents — you must set a size), style (counters and quotes are scoped), content (layout + paint), strict (layout + paint + size — maximum optimization, but requires a set size). Use contain: content on cards, list items, or widgets that are independent — it improves rendering performance on large pages. content-offset is useful for scroll containers. Don't overuse — size containment requires you to set the size (or the element collapses).`,
    howItWorks: `1. contain: layout — the element's layout doesn't affect the rest of the page.
2. contain: paint — painting is clipped to the element (also clips overflow).
3. contain: size — the element's size doesn't depend on its contents (you must set a size).
4. contain: style — counters and quotes are scoped to the element.
5. contain: content — layout + paint (common, safe).
6. contain: strict — layout + paint + size (maximum, requires set size).
7. Use on independent components (cards, list items) for performance.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Contain a card (layout + paint — safe, performant) */
.card {
  contain: content; /* layout + paint */
}

/* Strict containment (maximum optimization — requires a set size) */
.widget {
  contain: strict; /* layout + paint + size */
  height: 200px;   /* MUST set a size (size containment) */
}

/* Contain a list (improves scroll performance) */
.list-item {
  contain: content;
}

/* content-visibility: auto — skip rendering offscreen elements */
.long-list .item {
  content-visibility: auto;
  contain-intrinsic-size: 100px; /* estimated size */
}`,
        note: "contain: content (layout + paint) is safe and common — use on independent components for performance. content-visibility: auto skips rendering offscreen elements (huge for long lists)."
      }
    ],
    marginNotes: [
      "contain: content (layout + paint) is safe and common — use on independent components (cards, list items) for rendering performance.",
      "contain: strict (layout + paint + size) is maximum optimization but REQUIRES a set size — otherwise the element collapses (size containment ignores content).",
      "content-visibility: auto skips rendering offscreen elements — huge performance win for long lists. Use contain-intrinsic-size to estimate the size.",
      "contain tells the browser the element is independent — it can skip re-layout/paint for the rest of the page when this element changes."
    ],
    commonMistakes: [
      "Using contain: strict without setting a size — the element collapses (size containment ignores content size).",
      "Overusing contain — it's for independent components; don't use it on elements that affect their parent's layout.",
      "Not using content-visibility: auto for long lists — it skips offscreen rendering, a big performance win."
    ],
    relatedTopics: ["Performance", "Display & Box Types"],
    externalLinks: [
      { label: "MDN: contain", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/contain" },
      { label: "MDN: content-visibility", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility" }
    ],
    mcqs: [
      { question: "What does contain: content do?", options: ["Hides the content", "Layout + paint containment (the element is independent)", "Removes the content", "Clips the content"], answer: 1, explanations: ["It doesn't hide.", "Correct — content = layout + paint; the element's internals don't affect the rest of the page (optimization).", "It doesn't remove.", "Paint containment clips, but that's not the main point."], difficulty: "hard" },
      { question: "What does contain: strict require?", options: ["Nothing", "A set size (it includes size containment, which ignores content size)", "A z-index", "A position"], answer: 1, explanations: ["It requires a size.", "Correct — strict = layout + paint + size; size containment means the element's size doesn't depend on content — you must set it.", "Not z-index.", "Not position."], difficulty: "hard" },
      { question: "What does content-visibility: auto do?", options: ["Always renders", "Skips rendering offscreen elements (performance for long lists)", "Hides content", "Adds a scrollbar"], answer: 1, explanations: ["It skips offscreen.", "Correct — auto skips rendering elements that are offscreen, rendering them when they scroll into view. Big for long lists.", "It doesn't hide (renders when visible).", "It doesn't add a scrollbar."], difficulty: "medium" }
    ]
  }
];