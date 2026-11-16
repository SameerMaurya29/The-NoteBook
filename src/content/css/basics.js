// CSS — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "language-basics",
  title: "CSS Basics — Why & How",
  difficulty: "easy",
  definition: `CSS (Cascading Style Sheets) is the presentation layer of the web — it controls how HTML looks: layout, color, spacing, typography, and responsiveness. You use it to make pages attractive and usable on any screen size.`,
  coreUnderstanding: `CSS separates structure (HTML) from presentation. A rule has a SELECTOR (which elements) and a DECLARATION BLOCK (how they look). The "cascade" decides which rule wins when several target the same element — based on specificity, source order, and importance. You learn CSS to lay out interfaces (flexbox, grid), make them responsive (media queries), and theme them (variables). The trade-off: CSS is declarative and global, so large stylesheets can become hard to manage without conventions (BEM, CSS modules, Tailwind).`,
  howItWorks: `1. WHY: appearance, layout, responsiveness, theming. Good CSS makes a page usable on phones, tablets, and desktops.
2. WHERE: every styled web page — sites, web apps, email, PWAs.
3. RULE ANATOMY: \`selector { property: value; }\`. The selector picks elements; the braces \`{ }\` hold declarations; each declaration is \`property: value\` and ends with a SEMICOLON \`;\`. Colons \`:\` separate property from value.
4. BRACES \`{ }\` wrap the declaration block. Every \`{\` needs a matching \`}\`. Forgetting the closing brace silently breaks later rules.
5. SEMICOLONS \`;\` end each declaration. The last one before \`}\` is technically optional, but ALWAYS include it — dropping it is a common bug when you add another line later.
6. COLONS \`:\` separate property and value: \`color: red;\`. A space after the colon is fine; forgetting the colon is a syntax error.
7. COMMAS separate selectors in a group (\`h1, h2, p { }\`) and values in shorthand (\`margin: 0 10px;\` uses spaces, but \`rgba(0,0,0,0.5)\` uses commas).
8. SELECTORS: type (\`p\`), class (\`.btn\`), id (\`#header\`), descendant (\`.nav a\`), pseudo-class (\`a:hover\`), pseudo-element (\`p::first-line\`).
9. THE BOX MODEL: every element is a box — content + padding + border + margin. \`box-sizing: border-box\` makes width include padding/border (predictable).
10. LAYOUT: flexbox (1D rows/columns) and grid (2D). Media queries (\`@media (max-width: 600px) { }\`) adapt to screen size.
11. VARIABLES: \`--brand: #369;\` defined on \`:root\`, used as \`var(--brand)\`.`,
  codeExamples: [
    {
      lang: "css",
      code: `/* selector { property: value; } — braces hold declarations, ; ends each */
h1 {
  color: #336699;          /* property: value;  (colon separates, semicolon ends) */
  font-size: 2rem;
}

/* commas group selectors; spaces separate shorthand values */
h1, h2, h3 { font-weight: 600; }

.btn {
  background: rgba(54, 102, 153, 0.8);   /* commas inside function values */
  padding: 8px 16px;                      /* spaces separate shorthand values */
  border: 1px solid var(--brand);        /* var() uses a custom property */
}

/* the cascade: later + more specific wins */
.btn { color: black; }       /* rule 1 */
.btn.special { color: white; } /* rule 2 — higher specificity wins */

/* responsive: media query adapts to screen width */
@media (max-width: 600px) {
  .nav { flex-direction: column; }
}`,
      output: `(styled page)`,
      note: "A CSS rule is selector { property: value; }. Braces hold declarations, semicolons end each, colons separate property from value. Commas group selectors; spaces separate shorthand values."
    }
  ],
  marginNotes: [
    "Every declaration ends with a semicolon ;. The last one before } is optional, but always include it — forgetting it breaks the rule when you add a line later.",
    "Braces { } hold the declarations; every { needs a }. A missing } silently swallows all following rules until the next } — a hard-to-spot bug.",
    "Colons : separate property from value (color: red). Commas separate SELECTORS in a group (h1, h2) and values inside functions (rgba(0,0,0,.5)). Spaces separate shorthand values (margin: 0 10px).",
    "The cascade picks the winner by specificity (id > class > type), then source order (later wins). Use specificity deliberately — !important is a last resort."
  ],
  commonMistakes: [
    "Forgetting the semicolon after a declaration — the next declaration merges and both break.",
    "Missing a closing brace } — silently breaks all following rules until another } closes it.",
    "Using a comma instead of a space in shorthand (margin: 0, 10px) — invalid; shorthand uses spaces.",
    "Overusing !important to fight specificity — it makes stylesheets unmaintainable."
  ],
  relatedTopics: ["Selectors & Specificity", "The Box Model", "Flexbox & Grid"],
  externalLinks: [
    { label: "MDN: CSS Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics" },
    { label: "CSS Tricks: Almanac", url: "https://css-tricks.com/almanac/" }
  ],
  mcqs: [
    {
      question: "What ends a CSS declaration?",
      options: ["A comma", "A semicolon ;", "A newline", "A closing brace"],
      answer: 1,
      explanations: ["Commas separate selectors, not declarations.", "Correct — each declaration is `property: value;` and ends with a semicolon. The last one before } is optional but always include it.", "Newlines don't end declarations.", "The brace ends the whole block, not each declaration."],
      difficulty: "easy"
    },
    {
      question: "What separates a CSS property from its value?",
      options: ["A semicolon", "A colon :", "An equals sign =", "A space"],
      answer: 1,
      explanations: ["The semicolon ends the declaration.", "Correct — `color: red` uses a colon between property and value; the semicolon ends the whole declaration. (HTML attributes use =, not CSS.)", "= is for HTML attributes.", "A space alone is invalid."],
      difficulty: "easy"
    },
    {
      question: "How does the cascade decide which rule wins?",
      options: ["Alphabetical order", "By specificity, then source order (later wins ties)", "By file size", "Randomly"],
      answer: 1,
      explanations: ["Alphabetical order is irrelevant.", "Correct — more specific selectors (id > class > type) win; on equal specificity, the later rule in source order wins. !important overrides everything (avoid it).", "File size is irrelevant.", "It's deterministic."],
      difficulty: "medium"
    }
  ]
};