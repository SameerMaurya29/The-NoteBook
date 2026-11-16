// CSS topics part 2: Modern CSS, Visual effects, Typography (topics 12-22)
export default [
  {
    id: "css-variables",
    title: "CSS Custom Properties (Variables)",
    difficulty: "medium",
    definition: `CSS custom properties (--name: value) store reusable values, referenced via var(--name). Unlike preprocessor variables, they're dynamic (change at runtime, cascade, and can be read/written in JS). They enable theming, responsive design, and component configuration.`,
    coreUnderstanding: `CSS variables (--name) are properties (they cascade and inherit). Define them on :root (global) or any element (scoped). Reference with var(--name, fallback). They're dynamic — change them in JS (element.style.setProperty('--name', value)) or in media queries, and all uses update. Unlike Sass variables (compile-time, static), CSS variables are runtime (change live, cascade by specificity, inherit). This makes them perfect for: theming (dark mode: change --bg, --text), responsive design (change --spacing in a media query), and component configuration (set --color on a component instance). They can hold any value (colors, sizes, calc expressions, even other variables).`,
    howItWorks: `1. :root { --primary: blue; } — define globally.
2. .card { --padding: 1rem; } — define scoped (only .card and descendants).
3. color: var(--primary); — use.
4. color: var(--primary, black); — with fallback (black if --primary is undefined).
5. JS: getComputedStyle(el).getPropertyValue('--primary') — read.
6. JS: el.style.setProperty('--primary', 'red') — write (updates all uses).
7. They cascade and inherit (like normal properties).`,
    codeExamples: [
      {
        lang: "css",
        code: `:root {
  --primary: #007bff;
  --bg: #ffffff;
  --text: #333;
  --spacing: 1rem;
}

.card {
  padding: var(--spacing);
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--primary);
}

/* Dark mode: change the variables, all uses update */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
  }
}

/* Component configuration */
.button {
  background: var(--btn-color, gray); /* fallback */
}
.button.danger { --btn-color: red; }
.button.success { --btn-color: green; }`,
        note: "CSS variables cascade and inherit — define on :root for global, on an element for scoped. Change them in media queries (theming) or JS (dynamic). All uses update live."
      },
      {
        lang: "javascript",
        code: `// Read a CSS variable
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary');
console.log(color); // ' #007bff' (note leading space)

// Write a CSS variable (updates all uses)
document.documentElement.style.setProperty('--primary', 'red');

// Write on a specific element (scoped)
card.style.setProperty('--spacing', '2rem');`,
        note: "CSS variables are readable and writable in JS — setProperty updates all uses instantly. This enables dynamic theming without re-rendering."
      }
    ],
    marginNotes: [
      "CSS variables cascade and inherit (unlike Sass variables, which are compile-time). Define on :root for global, on an element for scoped.",
      "They're dynamic — change in JS (setProperty) or media queries, and all uses update live. Perfect for theming (dark mode) and responsive design.",
      "var(--name, fallback) — the fallback is used if the variable is undefined. Always provide a fallback for critical values.",
      "They can hold any value: colors, sizes, calc(), even other variables (var(--a) inside --b). They're properties, not just constants."
    ],
    commonMistakes: [
      "Using Sass variables for theming — they're compile-time (static); CSS variables are runtime (dynamic, can change for dark mode).",
      "Forgetting the fallback in var(--name, fallback) — if the variable is undefined, the property is invalid (no value).",
      "Not realizing CSS variables cascade — a variable on .card overrides :root for .card's descendants."
    ],
    relatedTopics: ["The Cascade & Inheritance", "Dark Mode"],
    externalLinks: [
      { label: "MDN: CSS custom properties", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/--*" },
      { label: "MDN: var()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/var" }
    ],
    mcqs: [
      { question: "How do CSS variables differ from Sass variables?", options: ["They're the same", "CSS variables are runtime (dynamic, cascade); Sass are compile-time (static)", "Sass is newer", "CSS variables are faster"], answer: 1, explanations: ["They differ.", "Correct — CSS variables are live (changeable in JS/media queries); Sass variables are compiled away.", "Both old.", "Not about speed."], difficulty: "medium" },
      { question: "How do you set a CSS variable in JS?", options: ["element.var = 'value'", "element.style.setProperty('--name', 'value')", "element.cssVar('--name')", "element.setAttribute('--name', 'value')"], answer: 1, explanations: ["Not a property.", "Correct — setProperty('--name', 'value') updates the variable; all uses update live.", "Not a method.", "Not an attribute."], difficulty: "medium" },
      { question: "What does var(--name, fallback) do?", options: ["Ignores fallback", "Uses fallback if --name is undefined", "Always uses fallback", "Throws an error"], answer: 1, explanations: ["Fallback is used if undefined.", "Correct — the fallback is used only if the variable is not defined.", "Not always.", "No error."], difficulty: "easy" }
    ]
  },
  {
    id: "transitions",
    title: "CSS Transitions",
    difficulty: "medium",
    definition: `Transitions smoothly animate property changes: transition: property duration timing-function delay. The browser interpolates between the old and new values. Only animatable properties (colors, sizes, transforms) transition; display can't.`,
    coreUnderstanding: `A transition animates a property change over time. transition: width 0.3s ease means width changes take 0.3s with an ease curve. You define the transition on the element's normal state (not :hover) — it applies to any change (hover, class toggle, JS). Properties must be animatable (colors, transform, opacity, width, etc. — not display, position). The timing function (ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier) controls the acceleration curve. The delay waits before starting. Transitions are simple (A → B); for multi-step or looping animations, use @keyframes. Transitions are GPU-accelerated for transform and opacity (smooth); animating width/height/top causes layout (janky).`,
    howItWorks: `1. transition: property duration timing-function delay.
2. transition: width 0.3s ease — animate width over 0.3s.
3. transition: all 0.3s — animate all animatable properties (use sparingly — can be slow).
4. transition: width 0.3s, height 0.5s — multiple properties.
5. timing-function: ease (default), linear, ease-in, ease-out, ease-in-out, cubic-bezier(x1,y1,x2,y2), steps(n).
6. transition-delay: 0.1s — wait before starting.
7. Define on the normal state (not :hover) — it applies to any change.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Transition on the normal state (applies to hover, class change, etc.) */
.button {
  background: blue;
  color: white;
  transition: background 0.3s ease, transform 0.2s ease;
}
.button:hover {
  background: darkblue;
  transform: scale(1.05);
}

/* Transition all animatable properties (use sparingly) */
.card {
  transition: all 0.3s ease;
}

/* Custom timing function (cubic-bezier) */
.smooth {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* Steps (discrete jumps — like a sprite animation) */
.steps {
  transition: opacity 1s steps(5);
}`,
        note: "Define the transition on the NORMAL state, not :hover. It applies to any change (hover, class toggle, JS). Animating transform/opacity is GPU-accelerated (smooth); width/height/top causes layout (janky)."
      }
    ],
    marginNotes: [
      "Define transitions on the NORMAL state (not :hover) — it applies to any change (hover, class toggle, JS style change).",
      "Animate transform and opacity (GPU-accelerated, smooth). Avoid animating width/height/top/left/margin — they cause layout (reflow), which is janky.",
      "transition: all is convenient but can be slow (animates everything). Specify properties explicitly for performance.",
      "cubic-bezier(x1,y1,x2,y2) lets you craft custom curves. steps(n) creates discrete jumps (sprite animations, loading bars)."
    ],
    commonMistakes: [
      "Defining the transition on :hover instead of the normal state — it only animates the hover-in, not hover-out (jumpy).",
      "Animating width/height/top/left — causes layout (reflow), which is janky. Use transform (translate, scale) instead.",
      "Using transition: all — animates everything (including unintended properties); specify properties explicitly."
    ],
    relatedTopics: ["Animations", "Transforms", "Performance"],
    externalLinks: [
      { label: "MDN: transition", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transition" },
      { label: "MDN: Using transitions", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions" }
    ],
    mcqs: [
      { question: "Where should you define a transition?", options: ["On :hover", "On the normal state (applies to any change)", "On the parent", "In JS"], answer: 1, explanations: [":hover only animates hover-in.", "Correct — define on the normal state; it applies to hover, class toggle, and JS changes.", "Not the parent.", "CSS is better."], difficulty: "medium" },
      { question: "Which properties are smoothest to animate?", options: ["width, height", "transform and opacity (GPU-accelerated)", "margin, padding", "display"], answer: 1, explanations: ["Cause layout (janky).", "Correct — transform/opacity are GPU-accelerated (compositor-only); width/height cause reflow.", "Cause layout.", "Not animatable."], difficulty: "medium" },
      { question: "Can you transition the display property?", options: ["Yes", "No — display is not animatable", "Only to none", "Only with !important"], answer: 1, explanations: ["You can't.", "Correct — display isn't animatable. Use opacity or visibility (with a delay) for show/hide animations.", "Not in any direction.", "!important doesn't help."], difficulty: "medium" }
    ]
  },
  {
    id: "animations",
    title: "CSS Animations (@keyframes)",
    difficulty: "hard",
    definition: `CSS animations use @keyframes to define multi-step animations: @keyframes name { 0% {...} 50% {...} 100% {...} }. Apply with animation: name duration timing-function delay iteration-count direction fill-mode. More powerful than transitions (multi-step, looping, pausing).`,
    coreUnderstanding: `@keyframes defines the animation steps (0% to 100%, or from/to). The animation property applies it: animation: name 2s ease infinite alternate. Sub-properties: animation-name, duration, timing-function, delay, iteration-count (number or infinite), direction (normal, reverse, alternate, alternate-reverse), fill-mode (none, forwards, backwards, both), play-state (running, paused). Animations can loop (infinite), reverse, alternate (back and forth), and pause (animation-play-state: paused). Unlike transitions (A→B), animations are multi-step and can run automatically (not just on change). Use animations for: loading spinners, pulsing effects, entrance animations, complex sequences.`,
    howItWorks: `1. @keyframes name { 0% { ... } 50% { ... } 100% { ... } } — define steps.
2. @keyframes name { from { ... } to { ... } } — shorthand for 0% and 100%.
3. animation: name 2s ease infinite — apply (name, duration, timing, iterations).
4. animation-delay, animation-direction (normal, reverse, alternate), animation-fill-mode (forwards, backwards, both).
5. animation-play-state: paused — pause (toggle with JS for play/pause).
6. animation-iteration-count: infinite or a number.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Pulsing animation */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
.pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Spinning loader */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.loader {
  animation: spin 1s linear infinite;
}

/* Entrance animation (fills forwards to keep the end state) */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.modal {
  animation: fadeInUp 0.3s ease forwards;
}

/* Pause/play (toggle with JS) */
.paused { animation-play-state: paused; }`,
        note: "animation-fill-mode: forwards keeps the end state after the animation finishes (otherwise it reverts to the original). Use it for entrance animations."
      }
    ],
    marginNotes: [
      "animation-fill-mode: forwards keeps the end state after the animation (otherwise it reverts). Use it for entrance animations (fadeInUp).",
      "Animate transform and opacity (GPU-accelerated). Avoid animating width/height/top/left (cause layout, janky).",
      "animation-play-state: paused pauses the animation — toggle with JS for play/pause controls.",
      "@keyframes 0%,100% (same state) + 50% (different) creates a pulse. from/to is shorthand for 0%/100%."
    ],
    commonMistakes: [
      "Not using animation-fill-mode: forwards — the element reverts to its original state after the animation (entrance animations disappear).",
      "Animating layout properties (width, top) — causes reflow (janky). Use transform (translate, scale, rotate).",
      "Using infinite animations excessively — can cause performance issues and be distracting (accessibility: respect prefers-reduced-motion)."
    ],
    relatedTopics: ["Transitions", "Transforms", "Accessibility"],
    externalLinks: [
      { label: "MDN: CSS animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations" },
      { label: "MDN: @keyframes", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes" }
    ],
    mcqs: [
      { question: "What does animation-fill-mode: forwards do?", options: ["Plays the animation forward", "Keeps the end state after the animation finishes", "Reverses the animation", "Loops the animation"], answer: 1, explanations: ["It's about the end state.", "Correct — without forwards, the element reverts to its original state; forwards keeps the final state.", "That's animation-direction.", "That's iteration-count."], difficulty: "medium" },
      { question: "How do you pause an animation?", options: ["animation: none", "animation-play-state: paused", "animation-iteration-count: 0", "display: none"], answer: 1, explanations: ["That stops it.", "Correct — animation-play-state: paused freezes the animation at its current position.", "That's not a pause.", "That removes the element."], difficulty: "medium" },
      { question: "What's the difference between transitions and animations?", options: ["They're the same", "Transitions are A→B; animations are multi-step, can loop and run automatically", "Animations are newer", "Transitions are better"], answer: 1, explanations: ["They differ.", "Correct — transitions are simple A→B on change; animations are multi-step, can loop, and run automatically.", "Both old.", "Different uses."], difficulty: "medium" }
    ]
  },
  {
    id: "transforms",
    title: "CSS Transforms (translate, rotate, scale, skew)",
    difficulty: "medium",
    definition: `The transform property applies 2D/3D transformations: translate (move), rotate (turn), scale (resize), skew (distort). Transforms don't cause layout (GPU-accelerated) — they're the smoothest properties to animate. They don't affect the document flow (the element's original space is preserved).`,
    coreUnderstanding: `Transforms move, rotate, scale, or skew an element WITHOUT causing layout — the browser composites the transformed element on the GPU (smooth, no reflow). The element's original space is preserved (transforming doesn't affect siblings). transform: translate(x, y) moves; rotate(deg) turns; scale(x, y) resizes; skew(x, y) distorts. 3D variants: translate3d, rotateX/Y/Z, scale3d, perspective. transform-origin sets the pivot point (default center). Transforms are the best properties to animate (GPU-accelerated, no layout). Use transform: translateZ(0) or will-change: transform to force GPU acceleration (a layer). Common uses: hover effects (scale, translate), entrance animations (translateY + opacity), spinners (rotate), 3D cards (perspective + rotateY).`,
    howItWorks: `1. transform: translate(10px, 20px) — move right 10, down 20.
2. transform: rotate(45deg) — rotate 45 degrees.
3. transform: scale(1.5) — scale 1.5x (or scale(1.5, 0.5) for different x/y).
4. transform: skew(10deg, 5deg) — skew/distort.
5. transform-origin: top left — set the pivot (default center).
6. 3D: translate3d, rotateX/Y, perspective, matrix3d.
7. Combine: transform: translate(10px, 0) rotate(45deg) scale(1.2).
8. will-change: transform — hint to the browser (create a layer).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Hover effects (smooth, GPU-accelerated) */
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: scale(1.05) translateY(-5px);
}

/* Centering with transform (the classic trick) */
.center {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

/* Spinner */
.loader {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 3D card flip */
.card-3d {
  perspective: 1000px;
}
.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}
.card-3d:hover .card-inner {
  transform: rotateY(180deg);
}`,
        note: "Transforms are GPU-accelerated (no layout) — the smoothest properties to animate. They don't affect document flow (original space preserved). transform: translate(-50%, -50%) is the classic centering trick."
      }
    ],
    marginNotes: [
      "Transforms are GPU-accelerated (no layout/reflow) — the smoothest properties to animate. Use transform instead of top/left/width/height for animations.",
      "Transforms don't affect document flow — the element's original space is preserved (siblings don't reflow). This is why a scaled element doesn't push others.",
      "transform: translate(-50%, -50%) with position: absolute; top: 50%; left: 50% is the classic centering trick (pre-flexbox).",
      "transform-origin sets the pivot (default center). For a dropdown, set transform-origin: top so it scales from the top. will-change: transform forces a GPU layer."
    ],
    commonMistakes: [
      "Animating top/left/width/height instead of transform — causes layout (janky). Use transform (translate, scale, rotate).",
      "Forgetting transform-origin — the default is center; for dropdowns, set transform-origin: top to scale from the top.",
      "Not realizing transforms don't affect flow — a scaled element overlaps neighbors (it doesn't push them)."
    ],
    relatedTopics: ["Transitions", "Animations", "Positioning"],
    externalLinks: [
      { label: "MDN: transform", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform" },
      { label: "MDN: transform-origin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin" }
    ],
    mcqs: [
      { question: "Do transforms cause layout (reflow)?", options: ["Yes", "No — they're GPU-accelerated (compositor-only)", "Only scale", "Only rotate"], answer: 1, explanations: ["They don't.", "Correct — transforms are GPU-accelerated; they don't cause layout. This is why they're smooth to animate.", "None cause layout.", "None cause layout."], difficulty: "medium" },
      { question: "Does a transformed element affect document flow?", options: ["Yes, siblings reflow", "No — the original space is preserved", "Only with scale", "Only with translate"], answer: 1, explanations: ["They don't reflow.", "Correct — transforms don't affect flow; the element's original space is preserved (siblings don't move).", "Never.", "Never."], difficulty: "medium" },
      { question: "What does transform-origin control?", options: ["The animation duration", "The pivot point of the transform", "The z-index", "The opacity"], answer: 1, explanations: ["Not duration.", "Correct — transform-origin sets the pivot (default center). For a dropdown, set it to top.", "Not z-index.", "Not opacity."], difficulty: "easy" }
    ]
  },
  {
    id: "overflow",
    title: "Overflow (visible, hidden, scroll, auto)",
    difficulty: "easy",
    definition: `The overflow property controls what happens when content exceeds its container: visible (default, spills out), hidden (clipped), scroll (clipped, always shows scrollbars), auto (scrollbars only when needed). overflow-x and overflow-y control each axis.`,
    coreUnderstanding: `overflow: visible (default) — content spills out of the container. hidden — content is clipped (invisible beyond the container). scroll — content is clipped, scrollbars always shown (even if not needed). auto — scrollbars appear only when content overflows (the common choice). overflow-x and overflow-y set each axis independently. overflow: hidden is used for: clipping rounded corners, preventing text wrap, containing floated children (clearfix alternative). overflow: auto is for scrollable areas (chat windows, code blocks). A common gotcha: overflow: hidden on a container clips absolutely positioned children (they can't escape). overflow: scroll shows scrollbars even when not needed (ugly on some browsers); use auto instead.`,
    howItWorks: `1. overflow: visible (default) — content spills out.
2. overflow: hidden — content clipped (no scroll).
3. overflow: scroll — clipped, scrollbars always shown.
4. overflow: auto — scrollbars only when needed (common).
5. overflow-x / overflow-y — per-axis control.
6. overflow: clip — like hidden but can't be scrolled (even with JS).
7. text-overflow: ellipsis — add '...' for clipped text (requires overflow: hidden + white-space: nowrap).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Scrollable area (scrollbars when needed) */
.chat {
  height: 300px;
  overflow-y: auto;
}

/* Clip content (no scroll) */
.clipped {
  overflow: hidden;
}

/* Text truncation with ellipsis */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Horizontal scroll (no vertical) */
.table-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
}

/* Clip rounded corners */
.card {
  overflow: hidden; /* clips children to the rounded border */
  border-radius: 10px;
}`,
        note: "text-overflow: ellipsis requires three properties: white-space: nowrap, overflow: hidden, text-overflow: ellipsis. All three are needed for the '...' truncation."
      }
    ],
    marginNotes: [
      "overflow: auto is usually better than scroll — auto shows scrollbars only when needed; scroll always shows them (ugly on some browsers).",
      "text-overflow: ellipsis needs THREE properties: white-space: nowrap, overflow: hidden, text-overflow: ellipsis. Missing any one breaks it.",
      "overflow: hidden clips absolutely positioned children — they can't escape the container. This can be a gotcha (or a feature for clipping).",
      "overflow: hidden on a container with border-radius clips children to the rounded corners (common for image cards)."
    ],
    commonMistakes: [
      "Using overflow: scroll instead of auto — scroll always shows scrollbars (ugly); auto shows them only when needed.",
      "Forgetting white-space: nowrap with text-overflow: ellipsis — all three properties are required for truncation.",
      "Using overflow: hidden and expecting absolutely positioned children to escape — they're clipped."
    ],
    relatedTopics: ["Box Model", "Display & Box Types"],
    externalLinks: [
      { label: "MDN: overflow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/overflow" },
      { label: "MDN: text-overflow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow" }
    ],
    mcqs: [
      { question: "What's the difference between overflow: scroll and auto?", options: ["They're the same", "scroll always shows scrollbars; auto shows them only when needed", "scroll is faster", "auto is newer"], answer: 1, explanations: ["They differ.", "Correct — scroll always shows scrollbars (ugly); auto shows them only when content overflows.", "Same speed.", "Both exist."], difficulty: "easy" },
      { question: "What does text-overflow: ellipsis require?", options: ["Just text-overflow", "white-space: nowrap + overflow: hidden + text-overflow: ellipsis (all three)", "Only overflow: hidden", "Only white-space"], answer: 1, explanations: ["Not enough.", "Correct — all three are required: nowrap (one line), hidden (clip), ellipsis (add ...).", "Not enough.", "Not enough."], difficulty: "medium" },
      { question: "Does overflow: hidden clip absolutely positioned children?", options: ["No", "Yes — they can't escape the container", "Only with z-index", "Only with position: fixed"], answer: 1, explanations: ["It does clip.", "Correct — overflow: hidden clips children, including absolutely positioned ones (they can't escape).", "Always.", "fixed escapes (viewport-relative)."], difficulty: "medium" }
    ]
  },
  {
    id: "typography",
    title: "Typography & Fonts",
    difficulty: "medium",
    definition: `CSS typography controls text: font-family (typeface), font-size, font-weight (boldness), line-height (line spacing), letter-spacing, text-align, text-decoration, text-transform, font-variant. Web fonts load via @font-face or Google Fonts (link).`,
    coreUnderstanding: `font-family: a stack with fallbacks (Arial, sans-serif) — the browser uses the first available. font-size: use rem (scalable) not px (fixed). font-weight: 100-900 (400 = normal, 700 = bold). line-height: 1.5 is readable (unitless = relative to font-size; 1.5em = 1.5 × font-size). letter-spacing/word-spacing: tracking. text-align: left, right, center, justify. text-transform: uppercase, lowercase, capitalize. @font-face loads custom fonts: @font-face { font-family: 'Name'; src: url('font.woff2'); }. Always include a system fallback (sans-serif, serif, monospace). Use font-display: swap to show fallback text immediately (avoid invisible text during font load). Variable fonts (one file, multiple weights) are modern and efficient.`,
    howItWorks: `1. font-family: "Helvetica", Arial, sans-serif; — stack with fallbacks.
2. font-size: 1rem (16px) — use rem (scalable).
3. font-weight: 400 (normal), 700 (bold), or 100-900.
4. line-height: 1.5 — unitless (relative to font-size, recommended).
5. letter-spacing: 0.05em — tracking.
6. text-align: left | right | center | justify.
7. text-transform: uppercase | lowercase | capitalize | none.
8. @font-face { font-family: 'Name'; src: url('font.woff2') format('woff2'); font-display: swap; }`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Font stack with fallbacks */
body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont,
               "Segoe UI", Roboto, sans-serif;
  font-size: 1rem;     /* 16px (scalable) */
  line-height: 1.5;   /* unitless (recommended) */
  font-weight: 400;
}

/* Headings */
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em; /* tight tracking for large text */
}

/* Custom font via @font-face */
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2'),
       url('myfont.woff') format('woff');
  font-weight: 400;
  font-display: swap; /* show fallback immediately, swap when loaded */
}

/* Text styles */
.label {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  font-weight: 600;
}`,
        note: "font-display: swap shows the fallback font immediately (no invisible text during load), then swaps when the custom font loads. This improves perceived performance (no blank text)."
      }
    ],
    marginNotes: [
      "Use rem for font-size (scalable — users can change browser font size). px is fixed (accessibility issue).",
      "line-height: 1.5 (unitless) is the recommended way — it's relative to the font-size. Avoid em/px for line-height (compounds or is fixed).",
      "font-display: swap shows fallback text immediately (no invisible text during font load) — improves perceived performance. Use it in @font-face.",
      "Always include a generic fallback (sans-serif, serif, monospace) at the end of font-family — if all custom fonts fail, the browser uses a system font."
    ],
    commonMistakes: [
      "Using px for font-size — not scalable (accessibility). Use rem (relative to root, scalable via browser settings).",
      "Omitting a generic fallback (sans-serif) — if the custom font fails, the browser uses a default (often serif, ugly).",
      "Forgetting font-display: swap — text is invisible during font load (bad UX). swap shows fallback immediately."
    ],
    relatedTopics: ["Units", "Responsive Design", "Performance"],
    externalLinks: [
      { label: "MDN: Fonts", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font" },
      { label: "MDN: @font-face", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face" }
    ],
    mcqs: [
      { question: "Why use rem instead of px for font-size?", options: ["It's faster", "rem is scalable (users can change browser font size); px is fixed", "rem is newer", "px is deprecated"], answer: 1, explanations: ["Not speed.", "Correct — rem scales with the root font-size (users can increase it); px is fixed (accessibility issue).", "Both old.", "px is valid but less accessible."], difficulty: "medium" },
      { question: "What does font-display: swap do?", options: ["Hides the font", "Shows fallback text immediately, swaps when the custom font loads", "Disables the font", "Loads the font faster"], answer: 1, explanations: ["It doesn't hide.", "Correct — swap shows the fallback immediately (no invisible text), then swaps when the custom font loads.", "It doesn't disable.", "It doesn't speed up loading."], difficulty: "medium" },
      { question: "What's the recommended line-height value?", options: ["1px", "1.5 (unitless, relative to font-size)", "100%", "1em"], answer: 1, explanations: ["px is fixed.", "Correct — unitless 1.5 is relative to font-size (recommended). em/px can compound or be fixed.", "% works but unitless is conventional.", "em compounds."], difficulty: "medium" }
    ]
  },
  {
    id: "colors-gradients",
    title: "Colors & Gradients",
    difficulty: "medium",
    definition: `CSS colors: named (red), hex (#ff0000), rgb/rgba (255,0,0), hsl/hsla (0,100%,50%), currentColor (the text color), and the new color-mix(). Gradients: linear-gradient, radial-gradient, conic-gradient. The color property sets text color; background sets the background.`,
    coreUnderstanding: `Color formats: hex (#rrggbb or #rgb), rgb(r,g,b) / rgba(r,g,b,a), hsl(h,s%,l%) / hsla (hue, saturation, lightness — intuitive for adjusting). currentColor is a special value = the current text color (useful for borders/icons that should match text). color-mix(in srgb, red 50%, blue) mixes colors (new). Gradients: linear-gradient(angle, color stops), radial-gradient (from a point), conic-gradient (around a center). Gradients are background-image (not background-color). Use transparent for no color. The modern approach: use hsl for theming (easy to adjust lightness) and CSS variables for colors (easy to swap for dark mode).`,
    howItWorks: `1. color: red | #ff0000 | rgb(255,0,0) | hsl(0,100%,50%).
2. rgba/hsla — with alpha (transparency): rgba(255,0,0,0.5).
3. currentColor — the current text color (dynamic).
4. transparent — fully transparent.
5. linear-gradient(angle, color1, color2, ...) — linear.
6. radial-gradient(shape, color1, color2) — radial.
7. conic-gradient(from angle, color1, color2) — conic (pie charts).
8. color-mix(in srgb, red 50%, blue) — mix colors (new).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Color formats */
.text { color: #ff0000; }          /* hex */
.text { color: rgb(255, 0, 0); }   /* rgb */
.text { color: hsl(0, 100%, 50%); }/* hsl (intuitive) */
.text { color: rgba(255, 0, 0, 0.5); } /* with alpha */

/* currentColor: use the text color */
.card {
  color: blue;
  border: 1px solid currentColor; /* blue border */
  box-shadow: 0 0 5px currentColor;
}

/* Linear gradient */
.bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Radial gradient */
.radial {
  background: radial-gradient(circle, white, black);
}

/* Conic gradient (pie chart) */
.pie {
  background: conic-gradient(red 0deg 120deg, blue 120deg 240deg, green 240deg);
}

/* color-mix (new) */
.mixed {
  color: color-mix(in srgb, red 50%, blue);
}`,
        note: "currentColor is the current text color — use it for borders/shadows that should match the text. hsl is intuitive for theming (adjust lightness). Gradients are background-image, not background-color."
      }
    ],
    marginNotes: [
      "currentColor = the current text color — use it for borders, shadows, icons that should match the text (dynamic, changes with color).",
      "hsl is intuitive for theming — adjust the lightness for shades of the same color. Use CSS variables with hsl for easy dark mode.",
      "Gradients are background-image (not background-color). Use background shorthand or background-image: gradient.",
      "color-mix(in srgb, color1 X%, color2) is a new way to mix colors in CSS (no preprocessor needed)."
    ],
    commonMistakes: [
      "Hardcoding colors instead of using currentColor — currentColor makes borders/icons match the text automatically.",
      "Using background-color for gradients — gradients are background-image. Use background: gradient or background-image.",
      "Not using hsl for theming — hex/rgb make it hard to create shades; hsl lets you adjust lightness easily."
    ],
    relatedTopics: ["CSS Variables", "Dark Mode"],
    externalLinks: [
      { label: "MDN: color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color" },
      { label: "MDN: Gradients", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Using_CSS_gradients" }
    ],
    mcqs: [
      { question: "What does currentColor refer to?", options: ["A named color", "The current text color (the color property)", "The background color", "A variable"], answer: 1, explanations: ["Not named.", "Correct — currentColor is the value of the element's color property (dynamic).", "Not background.", "Not a variable."], difficulty: "medium" },
      { question: "Are gradients background-color or background-image?", options: ["background-color", "background-image (use background: gradient)", "background-style", "color"], answer: 1, explanations: ["Not background-color.", "Correct — gradients are background-image. Use background: linear-gradient(...) or background-image.", "Not a property.", "Not color."], difficulty: "easy" },
      { question: "Which color format is most intuitive for theming?", options: ["hex", "rgb", "hsl (adjust lightness for shades)", "named colors"], answer: 2, explanations: ["Hard to adjust.", "Hard to adjust.", "Correct — hsl lets you change lightness for shades of the same hue (intuitive for theming).", "Limited."], difficulty: "medium" }
    ]
  },
  {
    id: "object-fit",
    title: "Object-fit & Object-position",
    difficulty: "medium",
    definition: `object-fit controls how an image/video fills its container: fill (stretch, default), contain (fit entirely, letterbox), cover (fill, crop), none (natural size), scale-down. object-position positions the content within the container.`,
    coreUnderstanding: `object-fit is like background-size for <img> and <video>. fill (default) stretches the image to the container (distorts). contain fits the entire image (letterbox — empty space). cover fills the container, cropping the overflow (no distortion — common for cards). none shows the natural size (overflow). scale-down is none or contain (whichever is smaller). object-position (like background-position) controls the crop point (center, top, left, 30% 70%). Use cover for image cards (no distortion, fills the box); contain for logos (no cropping). Set the container's width/height, then object-fit on the image.`,
    howItWorks: `1. object-fit: fill (default) — stretch (distorts).
2. object-fit: contain — fit entirely (letterbox, no crop).
3. object-fit: cover — fill, crop overflow (no distortion — common).
4. object-fit: none — natural size (overflow).
5. object-fit: scale-down — none or contain (smaller).
6. object-position: center | top | 30% 70% — position within container.
7. Set the container size, then object-fit on the img/video.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Image card: cover (fills, crops, no distortion) */
.card-img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  object-position: center; /* or top, 30% 70% */
}

/* Logo: contain (fits entirely, no crop) */
.logo {
  width: 200px;
  height: 100px;
  object-fit: contain;
}

/* Avatar: cover (fills the circle) */
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

/* Video: cover (background video) */
.bg-video {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}`,
        note: "object-fit: cover is the most common — it fills the container and crops the overflow (no distortion). Use it for image cards, avatars. contain is for logos (no cropping)."
      }
    ],
    marginNotes: [
      "object-fit: cover fills the container and crops (no distortion) — use for image cards, avatars. contain fits entirely (letterbox) — use for logos.",
      "object-fit is like background-size for <img>/<video>. It only works if the element has a set width AND height.",
      "object-position controls the crop point (center, top, 30% 70%) — for cover, it determines which part is visible.",
      "Without object-fit, images stretch to the container (distort). Always set object-fit: cover for fixed-size image containers."
    ],
    commonMistakes: [
      "Not setting object-fit on fixed-size images — they stretch (distort). Use cover for cards, contain for logos.",
      "Forgetting to set both width AND height — object-fit needs a defined container size.",
      "Using object-position without object-fit: cover — it has no visible effect without cropping."
    ],
    relatedTopics: ["Box Model", "Images & Media"],
    externalLinks: [
      { label: "MDN: object-fit", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" },
      { label: "MDN: object-position", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/object-position" }
    ],
    mcqs: [
      { question: "Which object-fit fills the container and crops (no distortion)?", options: ["fill", "contain", "cover", "none"], answer: 2, explanations: ["fill distorts.", "contain letterboxes.", "Correct — cover fills the container and crops the overflow (no distortion). Common for cards.", "none overflows."], difficulty: "easy" },
      { question: "Which object-fit shows the entire image (letterbox)?", options: ["fill", "contain", "cover", "none"], answer: 1, explanations: ["fill distorts.", "Correct — contain fits the entire image (no crop, may have empty space). Use for logos.", "cover crops.", "none overflows."], difficulty: "easy" },
      { question: "Does object-fit work without width/height?", options: ["Yes", "No — it needs a defined container size", "Only with cover", "Only with contain"], answer: 1, explanations: ["It needs size.", "Correct — object-fit needs both width and height set on the element (a defined container).", "It needs size.", "It needs size."], difficulty: "medium" }
    ]
  },
  {
    id: "filters",
    title: "Filters & Backdrop Filters",
    difficulty: "medium",
    definition: `The filter property applies visual effects: blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, sepia, drop-shadow. backdrop-filter applies filters to the area BEHIND an element (frosted glass). Filters are GPU-accelerated.`,
    coreUnderstanding: `filter applies effects to the element itself: filter: blur(5px), brightness(1.5), grayscale(1), sepia(1), hue-rotate(90deg), drop-shadow(2px 2px 4px rgba(0,0,0,0.5)). Multiple filters chain: filter: blur(2px) brightness(1.2). backdrop-filter applies filters to the content BEHIND the element (the element must be semi-transparent) — backdrop-filter: blur(10px) creates the frosted glass effect (Apple-style). backdrop-filter has performance costs (blurs the background continuously) and browser support issues (Safari needs -webkit-). drop-shadow (in filter) follows the element's shape (unlike box-shadow, which is rectangular) — better for PNG/SVG shadows.`,
    howItWorks: `1. filter: blur(5px) — Gaussian blur.
2. filter: brightness(1.5) — 1.5x brighter (0 = black).
3. filter: contrast(2) — 2x contrast.
4. filter: grayscale(1) — full grayscale.
5. filter: sepia(1) — sepia tone.
6. filter: hue-rotate(90deg) — shift hue.
7. filter: saturate(2) — 2x saturation.
8. filter: drop-shadow(x y blur color) — shadow following the shape.
9. backdrop-filter: blur(10px) — frosted glass (behind the element).
10. Chain: filter: blur(2px) brightness(1.2).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Grayscale on hover (color on hover) */
.img { filter: grayscale(1); transition: filter 0.3s; }
.img:hover { filter: grayscale(0); }

/* Frosted glass (backdrop-filter) */
.glass {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Safari */
}

/* Drop shadow following the shape (for PNG/SVG) */
.icon {
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
}

/* Chain multiple filters */
.dramatic {
  filter: contrast(1.5) brightness(0.9) saturate(1.5);
}`,
        note: "backdrop-filter blurs the content BEHIND the element (frosted glass) — the element must be semi-transparent. It needs -webkit- for Safari. drop-shadow (in filter) follows the element's shape (unlike box-shadow, which is rectangular)."
      }
    ],
    marginNotes: [
      "backdrop-filter creates frosted glass (blurs the content behind) — the element must be semi-transparent. Needs -webkit- for Safari. Performance cost.",
      "drop-shadow (in filter) follows the element's shape (PNG/SVG) — unlike box-shadow (rectangular). Use drop-shadow for icon shadows.",
      "Filters are GPU-accelerated — smooth to animate. Common use: grayscale on hover (color on hover), frosted glass nav bars.",
      "backdrop-filter has performance costs (continuous blur of the background). Use sparingly, especially on large areas or scroll."
    ],
    commonMistakes: [
      "Using backdrop-filter without a semi-transparent background — there's nothing to blur (the element is opaque).",
      "Using box-shadow for PNG/SVG shadows — it's rectangular; use filter: drop-shadow (follows the shape).",
      "Forgetting -webkit-backdrop-filter for Safari — backdrop-filter doesn't work in Safari without the prefix."
    ],
    relatedTopics: ["Colors & Gradients", "Performance"],
    externalLinks: [
      { label: "MDN: filter", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/filter" },
      { label: "MDN: backdrop-filter", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter" }
    ],
    mcqs: [
      { question: "What does backdrop-filter do?", options: ["Filters the element itself", "Filters the content behind the element (frosted glass)", "Hides the element", "Adds a shadow"], answer: 1, explanations: ["That's filter.", "Correct — backdrop-filter applies filters to the content BEHIND the element (frosted glass effect).", "It doesn't hide.", "That's drop-shadow."], difficulty: "medium" },
      { question: "What does backdrop-filter require?", options: ["A z-index", "A semi-transparent background (something to blur behind)", "A position", "A filter"], answer: 1, explanations: ["Not z-index.", "Correct — the element must be semi-transparent; otherwise there's nothing to blur (opaque).", "Not position.", "Not filter."], difficulty: "medium" },
      { question: "Why use drop-shadow (in filter) instead of box-shadow?", options: ["It's faster", "It follows the element's shape (PNG/SVG); box-shadow is rectangular", "It's newer", "It's required"], answer: 1, explanations: ["Not about speed.", "Correct — drop-shadow follows the alpha shape (good for icons); box-shadow is the border box (rectangular).", "Both exist.", "Not required."], difficulty: "medium" }
    ]
  },
  {
    id: "form-styling",
    title: "Form Styling & Custom Controls",
    difficulty: "medium",
    definition: `Styling forms is challenging due to browser defaults. Key techniques: appearance: none (remove native styling), :focus-visible (focus ring only for keyboard), custom checkboxes/radio (accent-color or custom with :checked), custom range/select. Normalize with appearance: none, then style.`,
    coreUnderstanding: `Native form controls (checkbox, radio, select, range, date) are hard to style consistently — browsers render them differently. appearance: none removes the native styling (you start from scratch). :focus-visible (not :focus) shows the focus ring only for keyboard users (not mouse — cleaner UX). accent-color styles checkboxes/radios (simple, limited). For full control, hide the native input and style a label (input:checked + label). Custom selects are notoriously hard (the dropdown is browser-controlled) — use a library or a custom build. Always preserve accessibility: don't remove the focus ring without an alternative; use :focus-visible; keep the input functional (don't replace it with a div).`,
    howItWorks: `1. appearance: none — remove native styling (start from scratch).
2. :focus-visible — focus ring only for keyboard (not mouse).
3. accent-color: blue — style checkboxes/radios (simple, limited).
4. Custom checkbox: input:checked + label (hide input, style label).
5. Custom range: input[type="range"] { appearance: none } then style the track/thumb.
6. Custom select: notoriously hard (dropdown is browser-controlled) — use a library.
7. Always preserve accessibility (focus, keyboard, screen readers).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Remove native styling */
input, select, button {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
}

/* Focus ring only for keyboard (not mouse) */
input:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* accent-color for checkboxes/radios (simple) */
input[type="checkbox"] {
  accent-color: blue;
}

/* Custom checkbox (full control) */
.custom-check input { display: none; }
.custom-check label::before {
  content: "";
  width: 20px; height: 20px;
  border: 2px solid #ccc;
  display: inline-block;
}
.custom-check input:checked + label::before {
  background: blue;
  border-color: blue;
}

/* Custom range thumb */
input[type="range"] {
  appearance: none;
  height: 4px;
  background: #ccc;
}
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px; height: 16px;
  background: blue;
  border-radius: 50%;
}`,
        note: "appearance: none removes native styling (start from scratch). :focus-visible shows the focus ring only for keyboard users (not mouse — cleaner). Always preserve accessibility."
      }
    ],
    marginNotes: [
      "Use :focus-visible (not :focus) for the focus ring — it shows only for keyboard users (not mouse), giving a cleaner UX while preserving accessibility.",
      "appearance: none removes native styling — you start from scratch. Use it for checkboxes, selects, ranges that need custom styling.",
      "accent-color is the simplest way to style checkboxes/radios (one line). For full control, hide the input and style a label (input:checked + label).",
      "Custom selects are notoriously hard (the dropdown is browser-controlled). Use a library (Choices, Select2) or a custom build for full control."
    ],
    commonMistakes: [
      "Removing the focus ring (outline: none) without an alternative — breaks keyboard accessibility. Use :focus-visible instead.",
      "Using :focus instead of :focus-visible — :focus shows the ring on mouse click too (ugly); :focus-visible is keyboard-only.",
      "Replacing inputs with divs — loses accessibility (keyboard, screen readers). Hide the input visually, keep it functional."
    ],
    relatedTopics: ["Pseudo-classes & Pseudo-elements", "Accessibility"],
    externalLinks: [
      { label: "MDN: appearance", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/appearance" },
      { label: "MDN: :focus-visible", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible" }
    ],
    mcqs: [
      { question: "Why use :focus-visible instead of :focus?", options: ["It's faster", "It shows the focus ring only for keyboard (not mouse) — cleaner UX", "It's newer", "It's required"], answer: 1, explanations: ["Not speed.", "Correct — :focus-visible shows the ring only for keyboard users; :focus shows it on mouse click too (ugly).", "Both exist.", "Best practice."], difficulty: "medium" },
      { question: "What does appearance: none do?", options: ["Adds native styling", "Removes native styling (start from scratch)", "Hides the element", "Disables the input"], answer: 1, explanations: ["It removes.", "Correct — appearance: none removes the browser's native styling, letting you style from scratch.", "It doesn't hide.", "It doesn't disable."], difficulty: "easy" },
      { question: "Is it safe to remove outline (focus ring)?", options: ["Yes, always", "No — provide an alternative (:focus-visible); removing it breaks keyboard accessibility", "Only on mobile", "Only with JS"], answer: 1, explanations: ["Never safe without an alternative.", "Correct — outline: none breaks keyboard navigation. Use :focus-visible for a keyboard-only ring.", "Same rule.", "CSS can do it."], difficulty: "medium" }
    ]
  },
  {
    id: "css-functions",
    title: "CSS Functions (calc, min, max, clamp)",
    difficulty: "medium",
    definition: `CSS functions compute values: calc() (arithmetic), min() (smallest of values), max() (largest), clamp(min, preferred, max) (bounded). They enable fluid, responsive sizing without media queries. Also: var(), attr(), counter(), linear-gradient().`,
    coreUnderstanding: `calc() does arithmetic with mixed units: calc(100% - 20px), calc(2rem + 1vw). Spaces around operators are required (calc(100% - 20px), not calc(100%-20px)). min() returns the smallest: min(100%, 500px) (never wider than 500px or the parent). max() returns the largest: max(100px, 10vw) (at least 100px). clamp(min, preferred, max) bounds a value: clamp(1rem, 4vw, 3rem) (between 1rem and 3rem, preferring 4vw). These enable fluid responsive design without media queries — the value adapts continuously. var() references a custom property. attr() reads an HTML attribute (limited — mostly for content). counter() generates numbers (CSS counters).`,
    howItWorks: `1. calc(100% - 20px) — arithmetic (spaces required around + and -).
2. min(100%, 500px) — the smaller value (caps at 500px).
3. max(100px, 10vw) — the larger value (at least 100px).
4. clamp(1rem, 4vw, 3rem) — bounded (between 1rem and 3rem, preferring 4vw).
5. var(--name) — reference a custom property.
6. attr(data-value) — read an HTML attribute (limited use).
7. counter(name) — CSS counters (numbering).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* calc: mixed units (spaces required around + and -) */
.sidebar { width: calc(100% - 250px); }
.gap { margin-top: calc(2rem + 1vw); }

/* min: cap a value (never wider than 500px or parent) */
.card { width: min(100%, 500px); }

/* max: floor a value (at least 100px) */
.padding { padding: max(100px, 10vw); }

/* clamp: bounded fluid sizing (no media queries!) */
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }
/* between 1.5rem and 3rem, preferring 4vw */

/* var: reference a custom property */
.btn { color: var(--primary, blue); }

/* counter: CSS numbering */
ol { counter-reset: item; }
li { counter-increment: item; }
li::before { content: counter(item) ". "; }`,
        note: "calc requires SPACES around + and -: calc(100% - 20px), not calc(100%-20px). * and / don't need spaces but it's clearer with them. clamp enables fluid responsive sizing without media queries."
      }
    ],
    marginNotes: [
      "calc requires SPACES around + and -: calc(100% - 20px). Without spaces, it's invalid. * and / don't require spaces but it's clearer with them.",
      "clamp(min, preferred, max) enables fluid responsive sizing without media queries — the value adapts continuously between bounds.",
      "min() caps a value (never larger); max() floors it (never smaller). Use min for max-widths, max for min-widths/padding.",
      "calc can mix units: calc(100% - 250px), calc(2rem + 1vw). This is impossible without calc (you can't add % and px directly)."
    ],
    commonMistakes: [
      "Forgetting spaces in calc: calc(100%-20px) is invalid; it must be calc(100% - 20px).",
      "Using media queries for fluid sizing when clamp() works — clamp(min, preferred, max) adapts continuously.",
      "Not realizing calc can mix units (%, px, rem, vw) — this is its main power."
    ],
    relatedTopics: ["Units", "Responsive Design", "CSS Variables"],
    externalLinks: [
      { label: "MDN: calc()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/calc" },
      { label: "MDN: clamp()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp" }
    ],
    mcqs: [
      { question: "What's required in calc around + and -?", options: ["Nothing", "Spaces (calc(100% - 20px))", "Parentheses", "Quotes"], answer: 1, explanations: ["Spaces are required.", "Correct — calc(100% - 20px) needs spaces around + and -; without them, it's invalid.", "Not parens.", "Not quotes."], difficulty: "medium" },
      { question: "What does clamp(min, preferred, max) do?", options: ["Fixes the value", "Bounded fluid sizing — between min and max, preferring the middle", "Random", "Only the max"], answer: 1, explanations: ["Not fixed.", "Correct — clamp keeps the value between min and max, preferring the middle value (fluid, no media queries).", "Not random.", "Not only max."], difficulty: "medium" },
      { question: "Can calc mix units?", options: ["No", "Yes — calc(100% - 20px) mixes % and px", "Only with a function", "Only in flex"], answer: 1, explanations: ["It can.", "Correct — calc can mix units (%, px, rem, vw) — this is its main power.", "calc is the function.", "Anywhere."], difficulty: "easy" }
    ]
  }
];