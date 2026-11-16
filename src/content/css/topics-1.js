// CSS topics part 1: Selectors, Box Model, Layout fundamentals (topics 1-11)
export default [
  {
    id: "selectors-specificity",
    title: "Selectors & Specificity",
    difficulty: "medium",
    definition: `CSS selectors target elements to style. Specificity determines which rule wins when multiple rules apply — it's a 4-part score (inline, ID, class/attribute/pseudo-class, element/pseudo-element). Higher specificity overrides lower.`,
    coreUnderstanding: `Specificity is calculated as (a, b, c, d): a = inline styles (style=""), b = ID selectors, c = class/attribute/pseudo-class selectors, d = element/pseudo-element selectors. Compare left-to-right; the first difference wins. * (universal) and combinators have 0 specificity. !important overrides specificity (a last resort — avoid). Inline styles beat all selectors except !important. When specificity ties, the last rule in source order wins. Understanding specificity is critical — it explains why your CSS 'doesn't work' (a more specific rule overrides it).`,
    howItWorks: `1. Element selector (div, p) — specificity (0,0,0,1).
2. Class (.card), attribute ([type="text"]), pseudo-class (:hover) — (0,0,1,0).
3. ID (#header) — (0,1,0,0).
4. Inline style="..." — (1,0,0,0).
5. !important — overrides everything (avoid).
6. Combinators (descendant: " ", child: ">", adjacent: "+", general: "~) — 0 specificity.
7. :is(), :where(), :has() — :where() has 0 specificity (useful!).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Specificity examples */
div { color: black; }              /* (0,0,0,1) */
.card { color: blue; }            /* (0,0,1,0) — beats div */
#header { color: green; }         /* (0,1,0,0) — beats .card */
#header .title { color: red; }    /* (0,1,1,0) */
<div style="color: purple">      /* (1,0,0,0) — beats all selectors */

/* :where() has 0 specificity — useful for overrides */
:where(.card, #header) { margin: 0; } /* (0,0,0,0) — easy to override */

/* :is() takes the highest specificity of its arguments */
:is(.card, #header) { margin: 0; } /* (0,1,0,0) — from #header */`,
        note: "Specificity is (inline, ID, class, element). Compare left-to-right. :where() always has 0 specificity — use it for base styles that are easy to override."
      }
    ],
    marginNotes: [
      "Specificity is (inline, ID, class, element) — compare left-to-right. #id beats .class beats div. This is why 'my CSS doesn't work' — a more specific rule wins.",
      "!important is a last resort — it breaks the cascade and makes maintenance hard. Fix specificity instead. The only valid use: overriding third-party CSS you can't edit.",
      ":where() has 0 specificity — use it for base/reset styles that are easy to override. :is() takes the highest specificity of its args.",
      "When specificity ties, source order wins (the last rule). This is why import order matters in CSS frameworks."
    ],
    commonMistakes: [
      "Using !important to force styles — fix specificity instead; !important breaks the cascade.",
      "Using IDs for styling (high specificity, hard to override) — use classes for styling, IDs for JS anchors.",
      "Not understanding why a style 'doesn't work' — usually a more specific rule is overriding it."
    ],
    relatedTopics: ["The Cascade & Inheritance", "Pseudo-classes & Pseudo-elements"],
    externalLinks: [
      { label: "MDN: Specificity", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity" },
      { label: "MDN: CSS Selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors" }
    ],
    mcqs: [
      { question: "Which has higher specificity: #header or .card?", options: [".card", "#header (ID beats class)", "They're equal", "Depends on order"], answer: 1, explanations: ["Class is lower.", "Correct — ID (0,1,0,0) beats class (0,0,1,0).", "ID is higher.", "ID is higher regardless of order."], difficulty: "easy" },
      { question: "What's the specificity of :where(.card, #header)?", options: ["(0,1,0,0)", "(0,0,1,0)", "(0,0,0,0) — :where always has 0", "The highest of its args"], answer: 2, explanations: [":where doesn't take the max.", "Not the class's.", "Correct — :where() always has 0 specificity, regardless of its arguments.", ":is does that, not :where."], difficulty: "hard" },
      { question: "Should you use !important to fix styles?", options: ["Yes, it's easy", "No — fix specificity; !important breaks the cascade", "Only for colors", "Only in production"], answer: 1, explanations: ["It's a bad habit.", "Correct — !important is a last resort; it makes maintenance hard. Fix specificity.", "Same rule.", "Same rule."], difficulty: "medium" }
    ]
  },
  {
    id: "box-model",
    title: "The Box Model",
    difficulty: "medium",
    definition: `Every element is a box: content + padding + border + margin. box-sizing controls whether width/height include padding and border. The default (content-box) excludes them; border-box includes them (more intuitive).`,
    coreUnderstanding: `The box model: the content area (text, image), padding (space inside the border), border, margin (space outside the border). With content-box (default), width = content width only — padding and border ADD to the total size. With border-box, width = content + padding + border — padding and border are INCLUDED. This is why box-sizing: border-box is a universal reset — it makes sizing intuitive (width: 100px means the box is 100px total). Margins are always outside (never included). Margins collapse vertically (adjacent margins merge into the larger one).`,
    howItWorks: `1. content-box (default): width = content only. padding/border add to total.
2. border-box: width = content + padding + border. padding/border included.
3. margin is always outside (never in width/height).
4. Vertical margins collapse: adjacent block margins merge (max, not sum).
5. Horizontal margins don't collapse.
6. padding/border are inside (affect background); margin is outside.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Universal reset: border-box (intuitive sizing) */
*, *::before, *::after {
  box-sizing: border-box;
}

/* content-box (default): width = content only */
/* Total width = 100 + 10*2 (padding) + 2*2 (border) = 124px */
.box-content {
  box-sizing: content-box;
  width: 100px;
  padding: 10px;
  border: 2px solid black;
}

/* border-box: width = content + padding + border */
/* Total width = 100px (padding and border included) */
.box-border {
  box-sizing: border-box;
  width: 100px;
  padding: 10px;
  border: 2px solid black;
}`,
        note: "box-sizing: border-box is a universal reset — it makes width mean the total box size (content + padding + border). Without it, padding and border add to the width (surprising)."
      }
    ],
    marginNotes: [
      "Always set box-sizing: border-box globally — it makes width/height include padding and border (intuitive). The default (content-box) adds them (surprising).",
      "Margins collapse vertically (adjacent block margins merge into the larger one, not the sum). Horizontal margins don't collapse.",
      "padding is inside the border (affected by background); margin is outside (transparent). padding adds to the click area; margin doesn't.",
      "Margin collapse happens between: adjacent siblings, parent and first/last child, and empty blocks. Flexbox/grid don't collapse margins."
    ],
    commonMistakes: [
      "Not using box-sizing: border-box — padding/border add to width, causing overflow.",
      "Expecting margins to add (they collapse vertically — the larger wins, not the sum).",
      "Using margin for spacing inside a container (use padding — margin is outside and collapses)."
    ],
    relatedTopics: ["Display & Box Types", "Units (px, em, rem, %)"],
    externalLinks: [
      { label: "MDN: Box model", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model" },
      { label: "MDN: box-sizing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing" }
    ],
    mcqs: [
      { question: "What does box-sizing: border-box do?", options: ["Removes the border", "Includes padding and border in width/height", "Adds margin to width", "Nothing"], answer: 1, explanations: ["It doesn't remove the border.", "Correct — border-box makes width = content + padding + border (intuitive).", "Margin is never included.", "It changes sizing."], difficulty: "easy" },
      { question: "Do vertical margins add or collapse?", options: ["Add (sum)", "Collapse (the larger wins, not the sum)", "Multiply", "Cancel out"], answer: 1, explanations: ["They don't add.", "Correct — adjacent vertical margins collapse into the larger one (not the sum).", "Not multiply.", "Not cancel."], difficulty: "medium" },
      { question: "Is padding inside or outside the border?", options: ["Outside", "Inside (affected by background)", "On the border", "It depends"], answer: 1, explanations: ["Margin is outside.", "Correct — padding is inside the border; margin is outside.", "Not on the border.", "Always inside."], difficulty: "easy" }
    ]
  },
  {
    id: "display-box-types",
    title: "Display & Box Types",
    difficulty: "medium",
    definition: `The display property determines how an element is rendered: block (full width, new line), inline (content width, no width/height), inline-block (inline but accepts width/height), flex (flex container), grid (grid container), none (not rendered).`,
    coreUnderstanding: `block (div, p, h1): takes full width, starts on a new line, accepts width/height/margin/padding. inline (span, a, strong): takes content width, stays inline, width/height are IGNORED (only horizontal margin/padding work). inline-block: inline (stays on a line) but accepts width/height (like a block). flex: the element becomes a flex container; its children become flex items (laid out by flexbox). grid: the element becomes a grid container; children are grid items. none: the element is removed (not rendered, no space). The outer display (block/inline) and inner display (flex/grid) can combine: display: inline-flex (inline container with flex children).`,
    howItWorks: `1. block — full width, new line, accepts all dimensions.
2. inline — content width, no width/height, only horizontal margin/padding.
3. inline-block — inline but accepts width/height.
4. flex — container; children are flex items (flexbox layout).
5. grid — container; children are grid items (grid layout).
6. none — removed (no space, not rendered).
7. inline-flex / inline-grid — inline container with flex/grid children.
8. contents — the element's box disappears; its children participate in the parent's layout.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Block: full width, new line */
div { display: block; }

/* Inline: content width, no width/height */
span { display: inline; }
span { width: 100px; } /* IGNORED — inline ignores width */

/* Inline-block: inline but accepts width/height */
.button { display: inline-block; width: 100px; height: 40px; }

/* Flex: container, children are flex items */
.container { display: flex; }

/* Grid: container, children are grid items */
.grid { display: grid; grid-template-columns: 1fr 1fr; }

/* None: removed (no space) */
.hidden { display: none; }

/* Inline-flex: inline container with flex children */
.toolbar { display: inline-flex; }`,
        note: "inline elements ignore width and height — only horizontal margin/padding work. Use inline-block if you need width/height on an inline element."
      }
    ],
    marginNotes: [
      "inline elements (span, a) ignore width/height and vertical margin/padding. Use inline-block if you need dimensions on an inline element.",
      "display: none removes the element (no space, not rendered). visibility: hidden hides it but keeps the space. opacity: 0 hides but keeps space and events.",
      "display: flex/grid makes the element a container; its DIRECT children become flex/grid items. display: contents makes the element's box vanish (children join the parent's layout).",
      "inline-flex/inline-grid are inline containers with flex/grid children — useful for toolbars, button groups that sit inline."
    ],
    commonMistakes: [
      "Setting width on an inline element (span) — it's ignored. Use inline-block or block.",
      "Confusing display: none (removed, no space) with visibility: hidden (hidden, keeps space).",
      "Setting display: flex on a child expecting it to align — flex affects the CONTAINER's children, not the element itself."
    ],
    relatedTopics: ["Flexbox", "Grid", "Box Model"],
    externalLinks: [
      { label: "MDN: display", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display" },
      { label: "MDN: Block and inline elements", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model" }
    ],
    mcqs: [
      { question: "Does an inline element respect width?", options: ["Yes", "No — inline ignores width/height", "Only in flex", "Only with !important"], answer: 1, explanations: ["It doesn't.", "Correct — inline elements ignore width and height; use inline-block if you need dimensions.", "Not a flex issue.", "!important doesn't help."], difficulty: "easy" },
      { question: "What's the difference between display: none and visibility: hidden?", options: ["They're the same", "none removes (no space); hidden keeps the space", "none is faster", "hidden is newer"], answer: 1, explanations: ["They differ.", "Correct — none removes the element (no space); hidden keeps the space (invisible).", "Not speed.", "Both exist."], difficulty: "medium" },
      { question: "What does display: flex do to the element's children?", options: ["Hides them", "Makes them flex items (flexbox layout)", "Makes them inline", "Nothing"], answer: 1, explanations: ["It doesn't hide them.", "Correct — the element becomes a flex container; its direct children become flex items.", "Not inline.", "It changes their layout."], difficulty: "easy" }
    ]
  },
  {
    id: "flexbox",
    title: "Flexbox (Flexible Box Layout)",
    difficulty: "hard",
    definition: `Flexbox is a 1D layout model for arranging items in a row or column. The container (display: flex) controls alignment, direction, wrapping, and distribution; items control their size, order, and alignment. Ideal for nav bars, card rows, and centering.`,
    coreUnderstanding: `Flexbox solves 1D layout (a row OR a column). The container properties: flex-direction (row/column), justify-content (main axis alignment), align-items (cross axis alignment), flex-wrap (wrap or not), gap (spacing). The item properties: flex-grow (how much to grow), flex-shrink (how much to shrink), flex-basis (initial size), align-self (override align-items), order (visual order). The key insight: flexbox has a main axis (the direction of flow) and a cross axis (perpendicular). justify-content aligns on the main axis; align-items on the cross axis. Flexbox is perfect for: centering (justify-content: center; align-items: center), nav bars, equal-height columns, and distributing space.`,
    howItWorks: `Container:
1. display: flex — enable flexbox.
2. flex-direction: row (default) | column | row-reverse | column-reverse.
3. justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly (main axis).
4. align-items: stretch (default) | center | flex-start | flex-end | baseline (cross axis).
5. flex-wrap: nowrap (default) | wrap | wrap-reverse.
6. gap: 10px (spacing between items).

Items:
7. flex: 1 (grow:1, shrink:1, basis:0) — equal sizing.
8. flex-grow: 2 — grow twice as much as flex-grow:1.
9. align-self: center — override align-items for this item.
10. order: 2 — visual order (default 0).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Centering (the classic flexbox use) */
.center {
  display: flex;
  justify-content: center; /* main axis */
  align-items: center;      /* cross axis */
  min-height: 100vh;
}

/* Nav bar (space between) */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Equal-width cards that wrap */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card {
  flex: 1 1 200px; /* grow, shrink, basis */
}

/* Sidebar + main (sidebar fixed, main grows) */
.layout {
  display: flex;
  gap: 1rem;
}
.sidebar { flex: 0 0 200px; } /* fixed 200px */
.main { flex: 1; }            /* grows to fill */`,
        note: "flex: 1 is shorthand for flex-grow:1, shrink:1, basis:0 — items share space equally. flex: 0 0 200px = fixed 200px (no grow/shrink)."
      }
    ],
    marginNotes: [
      "Flexbox is 1D (row OR column). justify-content = main axis; align-items = cross axis. The axis depends on flex-direction (row → main is horizontal; column → main is vertical).",
      "flex: 1 = grow:1, shrink:1, basis:0 — items share space equally. flex: 0 0 200px = fixed (no grow/shrink, 200px basis).",
      "Use flexbox for: centering, nav bars, equal-height columns, distributing space. Use grid for 2D layouts (rows AND columns).",
      "gap works in flexbox and grid — replaces margin hacks for spacing between items. No more :not(:last-child) margin tricks."
    ],
    commonMistakes: [
      "Using flexbox for 2D layouts (rows AND columns) — use grid instead. Flexbox is 1D.",
      "Confusing justify-content (main axis) with align-items (cross axis) — which is which depends on flex-direction.",
      "Using flex: 1 when you want a fixed size — flex: 1 grows; use flex: 0 0 200px for fixed."
    ],
    relatedTopics: ["Grid", "Display & Box Types", "Positioning"],
    externalLinks: [
      { label: "MDN: Flexbox", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox" },
      { label: "CSS Tricks: Flexbox guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" }
    ],
    mcqs: [
      { question: "Is flexbox 1D or 2D?", options: ["2D", "1D (row OR column)", "Both", "Neither"], answer: 1, explanations: ["Grid is 2D.", "Correct — flexbox is 1D; it lays out in a row or a column. Use grid for 2D.", "Flexbox is 1D.", "It's 1D."], difficulty: "easy" },
      { question: "What does justify-content align?", options: ["The cross axis", "The main axis", "Both axes", "Neither"], answer: 1, explanations: ["That's align-items.", "Correct — justify-content aligns on the main axis (the direction of flow).", "align-items is cross.", "It aligns the main axis."], difficulty: "medium" },
      { question: "What does flex: 1 mean?", options: ["Fixed size", "grow:1, shrink:1, basis:0 — equal sharing", "No grow", "Only grow"], answer: 1, explanations: ["Not fixed.", "Correct — flex:1 = grow:1, shrink:1, basis:0; items share space equally.", "It grows.", "It also shrinks."], difficulty: "medium" }
    ]
  },
  {
    id: "grid",
    title: "CSS Grid (2D Layout)",
    difficulty: "hard",
    definition: `CSS Grid is a 2D layout model — it arranges items in rows AND columns simultaneously. Define tracks with grid-template-columns/rows; place items with grid-column/grid-row. Ideal for page layouts, dashboards, and complex 2D arrangements.`,
    coreUnderstanding: `Grid is 2D — you define columns AND rows, and items can span both. Container properties: grid-template-columns (column sizes), grid-template-rows, grid-template-areas (named regions), gap, justify-items, align-items. Item properties: grid-column (start/end), grid-row, grid-area (named region), justify-self, align-self. The fr unit (fraction) distributes space (1fr 1fr = two equal columns). minmax(min, max) sets bounds. auto-fit/auto-fill create responsive grids without media queries. Grid is for 2D layouts (page structure, dashboards); flexbox is for 1D (rows of items). Use both: grid for the page, flexbox for components.`,
    howItWorks: `Container:
1. display: grid.
2. grid-template-columns: 1fr 2fr 1fr — three columns (fraction units).
3. grid-template-rows: auto 1fr auto — rows.
4. grid-template-areas: "header header" "sidebar main" — named regions.
5. gap: 10px — spacing between tracks.
6. justify-items / align-items — alignment within cells.

Item:
7. grid-column: 1 / 3 — span columns 1 to 3.
8. grid-row: 1 / 2 — span rows.
9. grid-area: header — place in a named area.
10. justify-self / align-self — individual alignment.

Responsive:
11. repeat(auto-fit, minmax(200px, 1fr)) — responsive grid without media queries.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Page layout with named areas */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }

/* Responsive card grid (no media queries!) */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Spanning items */
.item-wide {
  grid-column: 1 / 3; /* span columns 1 to 3 */
  grid-row: 1 / 2;
}`,
        note: "repeat(auto-fit, minmax(250px, 1fr)) creates a responsive grid — cards are at least 250px and fill the row, wrapping automatically. No media queries needed."
      }
    ],
    marginNotes: [
      "Grid is 2D (rows AND columns); flexbox is 1D. Use grid for page layouts, dashboards; flexbox for component internals (nav bars, button groups).",
      "repeat(auto-fit, minmax(250px, 1fr)) is a responsive grid without media queries — cards are at least 250px, fill the row, wrap automatically.",
      "grid-template-areas names regions — the most readable way to define page layouts ('header header' / 'sidebar main').",
      "fr (fraction) distributes available space: 1fr 2fr = 1:2 ratio. minmax(min, max) sets bounds. Use both for flexible, bounded layouts."
    ],
    commonMistakes: [
      "Using grid for 1D layouts (a row of items) — flexbox is simpler for 1D. Grid is for 2D.",
      "Not using auto-fit/auto-fill for responsive grids — manual media queries are unnecessary; repeat(auto-fit, minmax(...)) handles it.",
      "Confusing auto-fit (collapses empty tracks) with auto-fill (keeps empty tracks) — auto-fit is usually what you want."
    ],
    relatedTopics: ["Flexbox", "Responsive Design", "Display & Box Types"],
    externalLinks: [
      { label: "MDN: Grid", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids" },
      { label: "CSS Tricks: Grid guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" }
    ],
    mcqs: [
      { question: "Is grid 1D or 2D?", options: ["1D", "2D (rows AND columns)", "Both", "Neither"], answer: 1, explanations: ["Flexbox is 1D.", "Correct — grid is 2D; it arranges in rows and columns simultaneously.", "Grid is 2D.", "It's 2D."], difficulty: "easy" },
      { question: "What does repeat(auto-fit, minmax(250px, 1fr)) do?", options: ["Fixed 3 columns", "Responsive grid — cards ≥250px, wrap automatically (no media queries)", "A single column", "A 250px gap"], answer: 1, explanations: ["Not fixed.", "Correct — auto-fit creates as many 250px+ columns as fit, wrapping automatically. No media queries needed.", "Not single.", "Not a gap."], difficulty: "medium" },
      { question: "What does the fr unit represent?", options: ["Pixels", "A fraction of available space", "Font size", "A percentage"], answer: 1, explanations: ["Not pixels.", "Correct — fr is a fraction of the available space (1fr 2fr = 1:2 ratio).", "Not font size.", "Similar to % but of remaining space."], difficulty: "easy" }
    ]
  },
  {
    id: "positioning",
    title: "Position: static, relative, absolute, fixed, sticky",
    difficulty: "hard",
    definition: `The position property controls how an element is positioned: static (default, normal flow), relative (offset from normal position), absolute (removed from flow, positioned relative to nearest positioned ancestor), fixed (relative to viewport), sticky (relative until a threshold, then fixed).`,
    coreUnderstanding: `static: normal document flow (default). relative: offset from its normal position (top/left/right/bottom shift it; the space is preserved). absolute: removed from flow (no space preserved); positioned relative to the nearest positioned ancestor (or the initial containing block if none). fixed: relative to the viewport (stays on scroll) — except with transform/filter ancestors (which create a new containing block). sticky: relative until the scroll position reaches a threshold (top: 0), then it becomes fixed (stays in view) — great for sticky headers. The key: absolute and fixed are removed from flow (they don't affect siblings); relative and sticky stay in flow. Position requires a positioning context (a positioned ancestor for absolute).`,
    howItWorks: `1. static (default) — normal flow; top/left/etc. have no effect.
2. relative — offset from normal position; space is preserved.
3. absolute — removed from flow; positioned relative to nearest positioned ancestor (position: relative/absolute/fixed/sticky).
4. fixed — relative to viewport (ignores scroll); stays in place.
5. sticky — relative until threshold (e.g., top: 0), then fixed (sticks).
6. top/right/bottom/left — offset values (for positioned elements).
7. z-index — stacking order (only works on positioned elements).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Relative: offset from normal position (space preserved) */
.relative {
  position: relative;
  top: 10px; /* shifts down 10px; original space kept */
}

/* Absolute: removed from flow; relative to nearest positioned ancestor */
.parent { position: relative; }
.child {
  position: absolute;
  top: 0; right: 0; /* top-right of parent */
}

/* Fixed: relative to viewport (stays on scroll) */
.fixed {
  position: fixed;
  bottom: 20px; right: 20px; /* always bottom-right */
}

/* Sticky: relative until top:0, then sticks */
.sticky {
  position: sticky;
  top: 0; /* sticks to top when scrolled */
  z-index: 10;
}`,
        note: "absolute needs a positioned ancestor (position: relative on the parent) — otherwise it positions relative to the viewport (like fixed). This is the classic 'center an element in its parent' pattern."
      }
    ],
    marginNotes: [
      "absolute needs a positioned ancestor (position: relative on the parent) — otherwise it's relative to the viewport (surprising). Always set the parent to relative.",
      "sticky is relative until a threshold (top: 0), then fixed. Great for sticky headers. It needs a scrollable container and a threshold (top/bottom).",
      "fixed is relative to the viewport — UNLESS an ancestor has transform/filter/perspective (which creates a new containing block). This is a common surprise.",
      "absolute and fixed are removed from flow (no space preserved); relative and sticky stay in flow (space preserved). This affects siblings."
    ],
    commonMistakes: [
      "Using absolute without a positioned parent — it positions relative to the viewport, not the parent. Set parent to position: relative.",
      "Expecting sticky to work without a threshold (top: 0) or a scrollable container — it needs both.",
      "Using position: fixed inside a transformed ancestor — it becomes relative to the ancestor, not the viewport (surprising)."
    ],
    relatedTopics: ["Z-index & Stacking", "Flexbox", "Display & Box Types"],
    externalLinks: [
      { label: "MDN: position", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position" },
      { label: "MDN: Sticky positioning", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky" }
    ],
    mcqs: [
      { question: "What does absolute need to position relative to its parent?", options: ["Nothing", "The parent needs position: relative (or another positioned value)", "A z-index", "A flex container"], answer: 1, explanations: ["It needs a context.", "Correct — absolute positions relative to the nearest positioned ancestor; set the parent to relative.", "z-index is for stacking.", "Not flex."], difficulty: "medium" },
      { question: "How does sticky differ from fixed?", options: ["They're the same", "sticky is relative until a threshold, then fixed; fixed is always relative to viewport", "sticky is newer", "fixed is better"], answer: 1, explanations: ["They differ.", "Correct — sticky toggles between relative and fixed based on scroll; fixed is always viewport-relative.", "Both exist.", "Different uses."], difficulty: "medium" },
      { question: "Is absolute removed from document flow?", options: ["No", "Yes — no space is preserved; siblings fill in", "Only with z-index", "Only in flex"], answer: 1, explanations: ["It is removed.", "Correct — absolute (and fixed) are removed from flow; no space is preserved; siblings reflow.", "Always removed.", "Always removed."], difficulty: "easy" }
    ]
  },
  {
    id: "z-index-stacking",
    title: "Z-index & Stacking Contexts",
    difficulty: "hard",
    definition: `z-index controls the stacking order of positioned elements (higher = in front). But it only works within a stacking context. A stacking context is created by: position + z-index, opacity < 1, transform, filter, flex/grid items with z-index, and more. Within a context, z-index is local.`,
    coreUnderstanding: `z-index only works on positioned elements (position: relative/absolute/fixed/sticky) and flex/grid items. But the real complexity is stacking contexts: a new context isolates z-index — children can't escape their parent's context. A stacking context is created by: position: absolute/relative with z-index ≠ auto, position: fixed/sticky, opacity < 1, transform ≠ none, filter ≠ none, flex/grid item with z-index ≠ auto, will-change, isolation: isolate, mix-blend-mode, etc. Within a context, children stack by z-index; the context as a whole stacks with its siblings. This is why z-index: 9999 sometimes doesn't work — the element is in a lower stacking context than the one it's trying to cover.`,
    howItWorks: `1. z-index works on: positioned elements (relative/absolute/fixed/sticky) and flex/grid items.
2. Stacking context creators: position+z-index, fixed/sticky, opacity<1, transform, filter, flex/grid item+z-index, will-change, isolation:isolate.
3. Within a context, children stack by z-index (local).
4. The context as a whole stacks with its siblings (by the context's z-index).
5. A child with z-index: 9999 can't escape its parent's context — if the parent context is behind, the child is behind.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* z-index works on positioned elements */
.modal {
  position: fixed;
  z-index: 100; /* in front of z-index < 100 in the same context */
}

/* opacity < 1 creates a stacking context */
.opacity-box {
  opacity: 0.99; /* creates a new context! */
  /* children with z-index are trapped here */
}

/* transform creates a stacking context */
.transform-box {
  transform: translateZ(0); /* new context */
}

/* The trap: child can't escape parent's context */
.parent { opacity: 0.5; /* new context, z-index: 1 */ }
.child { z-index: 9999; /* trapped — can't exceed parent's context */ }
.sibling { z-index: 2; /* in front of .parent's entire context */ }`,
        note: "z-index: 9999 doesn't always work — if the element's parent created a stacking context (opacity, transform, etc.), the child is trapped. The parent's context stacks as a unit."
      }
    ],
    marginNotes: [
      "z-index only works on positioned elements (relative/absolute/fixed/sticky) and flex/grid items — not on static elements.",
      "Stacking contexts trap z-index — a child with z-index: 9999 can't escape its parent's context. If the parent is behind, the child is behind.",
      "Stacking context creators: opacity<1, transform, filter, position+z-index, fixed/sticky, flex/grid item+z-index, will-change, isolation:isolate.",
      "When z-index 'doesn't work,' check for a stacking context on an ancestor — the child is trapped. Use isolation: isolate to intentionally create a context."
    ],
    commonMistakes: [
      "Setting z-index on a static element — it's ignored; the element must be positioned (or a flex/grid item).",
      "Expecting z-index: 9999 to always work — if an ancestor created a stacking context (opacity, transform), the child is trapped.",
      "Not understanding why a modal is behind another element — usually a stacking context issue on an ancestor."
    ],
    relatedTopics: ["Positioning", "Transforms", "Display & Box Types"],
    externalLinks: [
      { label: "MDN: z-index", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/z-index" },
      { label: "MDN: Stacking context", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context" }
    ],
    mcqs: [
      { question: "Does z-index work on static elements?", options: ["Yes", "No — only on positioned elements (or flex/grid items)", "Only with !important", "Only in flex"], answer: 1, explanations: ["It doesn't.", "Correct — z-index requires position (relative/absolute/fixed/sticky) or a flex/grid item.", "!important doesn't help.", "Or grid."], difficulty: "medium" },
      { question: "Can a child with z-index: 9999 escape its parent's stacking context?", options: ["Yes", "No — it's trapped within the parent's context", "Only with !important", "Only with position: fixed"], answer: 1, explanations: ["It can't.", "Correct — stacking contexts trap children; the parent's context stacks as a unit.", "!important doesn't help.", "fixed creates its own context but is still trapped by ancestors."], difficulty: "hard" },
      { question: "What creates a stacking context?", options: ["Only z-index", "opacity<1, transform, filter, position+z-index, and more", "Only position: fixed", "Only flex"], answer: 1, explanations: ["More than z-index.", "Correct — many properties create contexts: opacity<1, transform, filter, position+z-index, fixed/sticky, flex/grid+z-index.", "Not only fixed.", "Not only flex."], difficulty: "hard" }
    ]
  },
  {
    id: "pseudo-classes-elements",
    title: "Pseudo-classes & Pseudo-elements",
    difficulty: "medium",
    definition: `Pseudo-classes (:) target elements in a specific state (:hover, :focus, :nth-child, :not, :first-child). Pseudo-elements (::) target parts of an element (::before, ::after, ::first-line, ::selection). The double colon distinguishes pseudo-elements from pseudo-classes.`,
    coreUnderstanding: `Pseudo-classes select based on state or position: :hover (mouse over), :focus (has focus), :checked (checkbox checked), :nth-child(n) (nth child), :not(selector) (negation), :first-child, :last-child, :only-child, :empty, :disabled, :valid, :invalid. Pseudo-elements create/style a virtual element: ::before and ::after (insert content via the content property), ::first-line, ::first-letter, ::selection (highlighted text), ::placeholder. The content property is required for ::before/::after (even empty: content: ""). Pseudo-elements are commonly used for decorative content (icons, badges, clearfix) and are in the DOM but not the HTML source.`,
    howItWorks: `Pseudo-classes (:):
1. :hover, :focus, :active, :visited — interaction states.
2. :nth-child(n), :first-child, :last-child — position.
3. :not(.class) — negation.
4. :checked, :disabled, :valid, :invalid — form states.
5. :empty — no children.

Pseudo-elements (::):
6. ::before, ::after — insert content (requires content: "").
7. ::first-line, ::first-letter — text parts.
8. ::selection — highlighted text.
9. ::placeholder — input placeholder.
10. ::marker — list bullet/number.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Pseudo-classes */
button:hover { background: blue; }
input:focus { border-color: green; }
li:nth-child(odd) { background: #f0f0f0; }
li:not(:first-child) { margin-top: 10px; }
input:checked + label { font-weight: bold; }

/* Pseudo-elements */
.tooltip::before {
  content: "ℹ";
  margin-right: 5px;
}
.quote::before { content: open-quote; }
.quote::after { content: close-quote; }

/* Clearfix (the classic ::after use) */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Style selected text */
::selection {
  background: yellow;
  color: black;
}`,
        note: "::before and ::after require the content property (even content: '' for a purely decorative element). They're commonly used for icons, badges, the clearfix, and decorative shapes."
      }
    ],
    marginNotes: [
      "Pseudo-classes (:) target states/positions (:hover, :nth-child). Pseudo-elements (::) target parts/virtual elements (::before, ::selection). Double colon = pseudo-element.",
      "::before and ::after REQUIRE the content property (even content: '' for decoration). Without content, they don't render.",
      ":nth-child(n) counts ALL siblings (element type doesn't matter). :nth-of-type(n) counts only same-type siblings. This is a common confusion.",
      "Pseudo-elements are in the DOM (inspectable) but not in the HTML source — they're generated by CSS. They can't contain HTML (content is plain text/escaped)."
    ],
    commonMistakes: [
      "Forgetting content: '' on ::before/::after — they don't render without it.",
      "Confusing :nth-child (all siblings) with :nth-of-type (same-type siblings) — different counting.",
      "Using single colon for pseudo-elements (:before) — it works (old syntax) but ::before is correct (double colon)."
    ],
    relatedTopics: ["Selectors & Specificity", "Form Styling"],
    externalLinks: [
      { label: "MDN: Pseudo-classes", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes" },
      { label: "MDN: Pseudo-elements", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements" }
    ],
    mcqs: [
      { question: "What's the difference between : and ::?", options: ["Nothing", ": is pseudo-class (state); :: is pseudo-element (part/virtual element)", ": is newer", ":: is deprecated"], answer: 1, explanations: ["They differ.", "Correct — : = pseudo-class (::hover); :: = pseudo-element (::before).", ":: is newer.", ":: is current."], difficulty: "medium" },
      { question: "What does ::before require to render?", options: ["A class", "The content property (even content: '')", "A position", "A z-index"], answer: 1, explanations: ["Not a class.", "Correct — ::before/::after need content: '' (or text) to render. Without it, nothing shows.", "Not position.", "Not z-index."], difficulty: "easy" },
      { question: "What's the difference between :nth-child and :nth-of-type?", options: ["They're the same", ":nth-child counts all siblings; :nth-of-type counts same-type siblings", ":nth-child is newer", ":nth-of-type is deprecated"], answer: 1, explanations: ["They differ.", "Correct — nth-child counts all siblings; nth-of-type counts only same-element-type siblings.", "Both old.", "Both valid."], difficulty: "medium" }
    ]
  },
  {
    id: "units",
    title: "Units: px, em, rem, %, vw, vh",
    difficulty: "medium",
    definition: `CSS units: px (absolute pixels), em (relative to parent font-size), rem (relative to root font-size), % (relative to parent), vw/vh (viewport width/height), ch (character width). Choose based on what you're sizing relative to.`,
    coreUnderstanding: `px: absolute (but affected by zoom; not truly device pixels on high-DPI screens). em: relative to the parent's font-size (compounds in nested elements — 1.2em inside 1.2em = 1.44em). rem: relative to the root (html) font-size (doesn't compound — predictable). %: relative to the parent (width is parent's width; padding/margin are parent's WIDTH even for vertical). vw/vh: 1% of viewport width/height. vmin/vmax: smaller/larger of vw/vh. ch: width of the '0' character (for monospace or character limits). Use rem for font-sizes (predictable, scalable), em for component-internal spacing (scales with the component), % for layouts, vw/vh for full-viewport sections.`,
    howItWorks: `1. px — absolute pixels (affected by zoom).
2. em — relative to parent's font-size (compounds when nested).
3. rem — relative to root (html) font-size (doesn't compound).
4. % — relative to parent (width % = parent width; padding/margin % = parent WIDTH).
5. vw/vh — 1% of viewport width/height.
6. vmin/vmax — smaller/larger of vw and vh.
7. ch — width of the '0' character (character-based sizing).`,
    codeExamples: [
      {
        lang: "css",
        code: `html { font-size: 16px; } /* root size */

/* rem: relative to root (16px) — predictable */
h1 { font-size: 2rem; }   /* 32px */
p { font-size: 1rem; }     /* 16px */

/* em: relative to parent's font-size — compounds! */
.parent { font-size: 1.2em; }  /* 19.2px (1.2 * 16) */
.child { font-size: 1.2em; }   /* 23.04px (1.2 * 19.2) — compounds! */

/* % for layout */
.container { width: 80%; }     /* 80% of parent width */
.box { padding: 5%; }          /* 5% of parent WIDTH (even for top/bottom) */

/* Viewport units */
.hero { height: 100vh; }       /* full viewport height */
.sidebar { width: 20vw; }      /* 20% of viewport width */

/* ch for character-based sizing (monospace or line length) */
.article { max-width: 70ch; }  /* ~70 characters wide (readable line length) */`,
        note: "rem is relative to the root (doesn't compound) — use it for font-sizes. em compounds when nested (1.2em inside 1.2em = 1.44em) — use it for component-internal spacing that should scale with the component."
      }
    ],
    marginNotes: [
      "rem = root font-size (doesn't compound). em = parent font-size (compounds when nested). Use rem for font-sizes, em for component-internal spacing.",
      "% for padding/margin is relative to the parent's WIDTH, even for top/bottom. This is surprising: padding-top: 5% = 5% of parent width.",
      "vw/vh are viewport-relative (1vw = 1% of viewport width). Use for full-viewport sections. vmin/vmax for consistent sizing across orientations.",
      "ch = width of '0' character. max-width: 70ch gives a readable line length (~70 characters) — good for article readability."
    ],
    commonMistakes: [
      "Using em for font-sizes in nested elements — it compounds (1.2em × 1.2em = 1.44em). Use rem for predictability.",
      "Expecting % padding-top to be relative to height — it's relative to the parent's WIDTH.",
      "Using px for font-sizes — not scalable (accessibility: users can't increase font-size via browser settings if px is hardcoded)."
    ],
    relatedTopics: ["Box Model", "Responsive Design", "Typography"],
    externalLinks: [
      { label: "MDN: CSS units", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units" },
      { label: "MDN: font-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-size" }
    ],
    mcqs: [
      { question: "What's the difference between em and rem?", options: ["They're the same", "em is relative to parent (compounds); rem is relative to root (doesn't compound)", "em is newer", "rem is larger"], answer: 1, explanations: ["They differ.", "Correct — em compounds when nested; rem is always relative to the root (predictable).", "Both old.", "Not about size."], difficulty: "medium" },
      { question: "What is % padding-top relative to?", options: ["Parent's height", "Parent's width (even for top/bottom padding)", "The element's height", "The viewport"], answer: 1, explanations: ["Not height.", "Correct — % padding/margin is relative to the parent's WIDTH, even for vertical padding. Surprising but true.", "Not the element.", "Not viewport."], difficulty: "hard" },
      { question: "What does 1vw equal?", options: ["1 pixel", "1% of viewport width", "1% of viewport height", "1 rem"], answer: 1, explanations: ["Not a pixel.", "Correct — 1vw = 1% of the viewport width. 1vh = 1% of the height.", "That's vh.", "Not rem."], difficulty: "easy" }
    ]
  },
  {
    id: "responsive-design",
    title: "Responsive Design & Media Queries",
    difficulty: "medium",
    definition: `Responsive design adapts to different screen sizes using: fluid layouts (%, fr, rem), media queries (@media (max-width: ...)), flexible images (max-width: 100%), and mobile-first CSS. The viewport meta tag (<meta name="viewport">) is required for mobile.`,
    coreUnderstanding: `Responsive design has three pillars: (1) Fluid grids — use relative units (%, fr, rem) instead of fixed px. (2) Media queries — apply CSS based on conditions (width, orientation, resolution). (3) Flexible media — images and videos scale (max-width: 100%; height: auto). Mobile-first: write base CSS for mobile, then use min-width media queries to add styles for larger screens. This is better than desktop-first (max-width) because mobile is the constraint; adding complexity for larger screens is progressive enhancement. The viewport meta tag is essential — without it, mobile browsers render at a default 980px width (not responsive). Modern CSS (grid auto-fit, clamp(), container queries) reduces the need for media queries.`,
    howItWorks: `1. <meta name="viewport" content="width=device-width, initial-scale=1"> — required for mobile.
2. Fluid units: %, fr, rem, vw/vh (not fixed px).
3. Flexible images: img { max-width: 100%; height: auto; }.
4. Media queries: @media (min-width: 768px) { ... } — mobile-first.
5. Breakpoints: common ones at 640px (sm), 768px (md), 1024px (lg), 1280px (xl).
6. clamp(min, preferred, max) — fluid sizing without media queries.
7. Container queries: @container (min-width: ...) — component-level responsiveness.`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Mobile-first: base styles for mobile, add for larger */
.card {
  padding: 1rem;
  font-size: 14px;
}
@media (min-width: 768px) {
  .card {
    padding: 2rem;
    font-size: 16px;
  }
}
@media (min-width: 1024px) {
  .card {
    padding: 3rem;
  }
}

/* Flexible images */
img {
  max-width: 100%;
  height: auto;
}

/* clamp(): fluid sizing without media queries */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* min 1.5rem, preferred 4vw, max 3rem */
}

/* Container query (component-level responsive) */
.card-container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { padding: 2rem; }
}`,
        note: "Mobile-first: write base CSS for mobile, use min-width media queries to add for larger screens. clamp(min, preferred, max) gives fluid sizing without media queries."
      }
    ],
    marginNotes: [
      "Mobile-first: base CSS for mobile, min-width media queries to add for larger screens. This is progressive enhancement (mobile is the constraint).",
      "The viewport meta tag is REQUIRED for responsive mobile rendering — without it, mobile browsers use a default 980px width.",
      "clamp(min, preferred, max) gives fluid sizing without media queries: font-size: clamp(1.5rem, 4vw, 3rem) scales smoothly between 1.5rem and 3rem.",
      "Container queries (@container) are component-level responsive — a component adapts to its container, not the viewport. Great for reusable components."
    ],
    commonMistakes: [
      "Forgetting the viewport meta tag — mobile renders at 980px, not responsive.",
      "Using desktop-first (max-width) instead of mobile-first (min-width) — more code, harder to maintain.",
      "Using fixed px widths — not fluid; use %, fr, rem, or clamp() for responsive sizing."
    ],
    relatedTopics: ["Grid", "Flexbox", "Units"],
    externalLinks: [
      { label: "MDN: Responsive design", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" },
      { label: "MDN: Media queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries" }
    ],
    mcqs: [
      { question: "What's required for responsive mobile rendering?", options: ["A media query", "The viewport meta tag", "Flexbox", "A CSS framework"], answer: 1, explanations: ["Not sufficient.", "Correct — without the viewport meta tag, mobile browsers use a default 980px width (not responsive).", "Not required.", "Not required."], difficulty: "easy" },
      { question: "What's the mobile-first approach?", options: ["Desktop first, then mobile", "Base CSS for mobile, min-width queries to add for larger", "Only mobile CSS", "No media queries"], answer: 1, explanations: ["That's desktop-first.", "Correct — base for mobile, add complexity for larger screens (progressive enhancement).", "Not only mobile.", "Media queries are used."], difficulty: "medium" },
      { question: "What does clamp(min, preferred, max) do?", options: ["Fixes the value", "Fluid sizing between min and max, preferring the middle", "Random value", "Only the max"], answer: 1, explanations: ["Not fixed.", "Correct — clamp gives fluid sizing: the value is preferred but never below min or above max.", "Not random.", "Not only max."], difficulty: "medium" }
    ]
  },
  {
    id: "cascade-inheritance",
    title: "The Cascade & Inheritance",
    difficulty: "medium",
    definition: `The cascade determines which rule wins when multiple apply (by specificity and source order). Inheritance passes some properties (font, color) from parent to child automatically. Not all properties inherit (border, margin don't).`,
    coreUnderstanding: `The cascade: when multiple rules target the same element, the winner is determined by (1) importance (!important > normal), (2) specificity (ID > class > element), (3) source order (last wins, if specificity ties). Inheritance: some properties inherit from parent to child (font-family, color, line-height, text-align) — the child gets the parent's value unless it has its own. Others don't inherit (border, margin, padding, background, width, height) — each element has its own default. The inherit keyword forces inheritance (border: inherit). The initial keyword resets to the spec default. The unset keyword: inherit if the property inherits, else initial. The revert keyword: resets to the user-agent (browser) default. Understanding inheritance explains why font-family on <body> affects all text (it inherits) but border doesn't (it doesn't inherit).`,
    howItWorks: `1. Cascade order: !important > inline > ID > class > element > universal.
2. Source order: if specificity ties, the last rule wins.
3. Inherited properties: font, color, line-height, text-align, visibility, letter-spacing, list-style.
4. Non-inherited: border, margin, padding, background, width, height, display.
5. Keywords: inherit (force inheritance), initial (spec default), unset (inherit if inheritable, else initial), revert (browser default).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* Inheritance: font-family inherits from body */
body { font-family: Arial; color: black; }
/* All text inherits Arial + black (unless overridden) */

/* Non-inherited: border doesn't inherit */
.parent { border: 1px solid black; }
.child { /* no border — border doesn't inherit */ }

/* Force inheritance */
.child { border: inherit; } /* inherits parent's border */

/* Reset to initial (spec default) */
.reset { color: initial; } /* spec default (often black) */

/* unset: inherit if inheritable, else initial */
.unset { color: unset; }

/* revert: browser default (not spec default) */
.revert { display: revert; } /* browser's default for the element */`,
        note: "Inherited properties (font, color) pass from parent to child automatically. Non-inherited (border, margin) don't. Use inherit to force, initial to reset to spec default, unset for smart reset."
      }
    ],
    marginNotes: [
      "Inherited: font, color, line-height, text-align. Non-inherited: border, margin, padding, background, width, height. This is why font on body affects all text.",
      "Cascade order: !important > inline > ID > class > element > *. Source order breaks ties (last wins).",
      "inherit forces inheritance; initial resets to the spec default; unset inherits if the property is inheritable (else initial); revert resets to the browser default.",
      "Setting font-family and color on body is a common reset — all text inherits them. Set them once, override per-component."
    ],
    commonMistakes: [
      "Expecting border or margin to inherit — they don't; only specific properties (font, color, etc.) inherit.",
      "Using initial to reset to the browser default — initial is the SPEC default (often different); use revert for the browser default.",
      "Not understanding why font on body affects all text — it inherits; border on body doesn't affect children (non-inherited)."
    ],
    relatedTopics: ["Selectors & Specificity", "CSS Variables"],
    externalLinks: [
      { label: "MDN: The cascade", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade" },
      { label: "MDN: Inheritance", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Inheritance" }
    ],
    mcqs: [
      { question: "Which property inherits?", options: ["border", "margin", "color", "width"], answer: 2, explanations: ["Non-inherited.", "Non-inherited.", "Correct — color inherits from parent to child (along with font, line-height, text-align).", "Non-inherited."], difficulty: "medium" },
      { question: "What does initial reset to?", options: ["The browser default", "The spec default (not necessarily the browser default)", "The parent value", "Nothing"], answer: 1, explanations: ["That's revert.", "Correct — initial is the CSS spec default (e.g., color: initial is often black, not the browser's default).", "That's inherit.", "It resets."], difficulty: "hard" },
      { question: "What breaks a specificity tie?", options: ["!important", "Source order (last rule wins)", "Alphabetical order", "Random"], answer: 1, explanations: ["!important overrides all.", "Correct — if specificity is equal, the last rule in source order wins.", "Not alphabetical.", "Not random."], difficulty: "medium" }
    ]
  }
];