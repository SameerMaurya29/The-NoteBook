// CSS — more foundational "things you have to know" notes (part 2).
export default [
  {
    id: "the-box-model",
    title: "The Box Model",
    difficulty: "easy",
    definition: `Every HTML element is a rectangular box made of four layers: content, padding, border, and margin. Understanding how these layers add up to the element's total size is the foundation of CSS layout. box-sizing: border-box makes width include padding and border — the predictable default you almost always want.`,
    coreUnderstanding: `The browser renders every element as a box with four nested layers: CONTENT (the text/image), PADDING (space inside the border), BORDER (the edge line), and MARGIN (space outside, pushing other elements away). The catch: by default, \`width\` sets only the CONTENT width, so padding and border are ADDED on top — an element styled \`width: 200px; padding: 20px; border: 5px\` is actually 250px wide. This surprises every beginner and breaks layouts. The fix: \`box-sizing: border-box\` makes width INCLUDE padding and border, so the element stays 200px. Most resets apply \`* { box-sizing: border-box; }\` globally. Margins are special: vertical margins between adjacent blocks COLLAPSE (the bigger one wins, they don't add).`,
    howItWorks: `1. THE FOUR LAYERS (inside-out): content → padding → border → margin.
2. CONTENT: the text/image area. width/height set its size (by default).
3. PADDING: space INSIDE the border, around the content. Affected by the element's background color.
4. BORDER: the edge line. Has width, style (solid/dashed), color. Sits between padding and margin.
5. MARGIN: space OUTSIDE the border, pushing other elements away. Transparent (shows the parent's background).
6. DEFAULT box-sizing: content-box — width = content only. padding + border are ADDED, so total width = width + padding + border. Surprising.
7. border-box: width INCLUDES padding and border. width: 200px stays 200px total. Predictable — use it everywhere.
8. MARGIN COLLAPSE: vertical margins of adjacent block elements MERGE (the larger wins), they don't add. Only vertical (top/bottom), not horizontal. Doesn't happen with flexbox/grid.
9. DISPLAY affects the box: block (full width, stack vertically), inline (flow with text, ignore width/height), inline-block (inline flow but respects width/height).`,
    codeExamples: [
      {
        lang: "css",
        code: `/* THE PROBLEM: default content-box adds padding + border ON TOP of width */
.box-default {
  width: 200px;
  padding: 20px;       /* +20 each side */
  border: 5px solid;   /* +5 each side  */
  /* total width = 200 + 40 + 10 = 250px  (surprising!) */
}

/* THE FIX: border-box makes width INCLUDE padding + border */
.box-fixed {
  box-sizing: border-box;   /* width 200px STAYS 200px total */
  width: 200px;
  padding: 20px;
  border: 5px solid;
}

/* apply border-box to everything (the standard reset) */
* { box-sizing: border-box; }

/* margin collapse: vertical margins MERGE, they don't add */
.a { margin-bottom: 30px; }
.b { margin-top: 20px; }
/* gap between a and b is 30px (the larger), NOT 50px */

/* display types change how the box behaves */
.block   { display: block;        }  /* full width, new line */
.inline  { display: inline;       }  /* flows with text; ignores width/height */
.ib     { display: inline-block;  }  /* inline flow, but respects width/height */`,
        output: `(styled layout)`,
        note: "Every element is content + padding + border + margin. Default content-box ADDS padding/border to width (surprising); border-box INCLUDES them (predictable). Apply * { box-sizing: border-box; }. Vertical margins collapse (merge, don't add)."
      }
    ],
    marginNotes: [
      "Always set `* { box-sizing: border-box; }` globally. Default content-box makes width not include padding/border, so elements come out bigger than expected and layouts break.",
      "Padding is INSIDE the border (takes the element's background); margin is OUTSIDE (transparent, pushes neighbors away). Use padding for space within an element, margin for space between elements.",
      "Vertical margins between adjacent block elements COLLAPSE — the larger margin wins, they don't add. Two blocks with margin: 30px and 20px have 30px between them, not 50px. Flexbox/grid children don't collapse.",
      "inline elements (span, a) ignore width/height and vertical margin/padding. Use inline-block or flex/grid when you need to size something that flows inline."
    ],
    commonMistakes: [
      "Not using box-sizing: border-box — elements come out wider than their width because padding/border are added.",
      "Expecting vertical margins to add — they collapse (the larger wins). Use a gap or padding on the parent instead.",
      "Setting width/height on an inline element (span) and wondering why it has no effect — inline ignores them; use inline-block."
    ],
    relatedTopics: ["CSS Basics — Why & How", "Selectors & Specificity", "Flexbox & Grid"],
    externalLinks: [
      { label: "MDN: The box model", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model" }
    ],
    mcqs: [
      {
        question: "What does `box-sizing: border-box` do?",
        options: ["Adds a border to the box", "Makes width/height INCLUDE padding and border, so the element stays the stated size", "Removes padding", "Makes the box invisible"],
        answer: 1,
        explanations: ["It doesn't add a border.", "Correct — border-box makes width include padding and border, so width: 200px stays 200px total. Default content-box adds them on top (200 → 250px), which surprises beginners.", "Padding stays.", "It's about sizing, not visibility."],
        difficulty: "easy"
      },
      {
        question: "What is the default box-sizing, and why is it surprising?",
        options: ["border-box — predictable", "content-box — width excludes padding/border, so they're added on top, making the box bigger than its width", "padding-box", "margin-box"],
        answer: 1,
        explanations: ["border-box is the recommended override, not the default.", "Correct — default content-box sets width to the CONTENT only; padding and border are added on top, so width:200px + 20px padding + 5px border = 250px. That's why everyone sets * { box-sizing: border-box }.", "Not a standard value.", "Not a standard value."],
        difficulty: "medium"
      },
      {
        question: "What happens to vertical margins between two adjacent block elements?",
        options: ["They add together", "They collapse — the larger margin wins, they don't add", "They disappear", "They double"],
        answer: 1,
        explanations: ["They don't add.", "Correct — adjacent vertical margins collapse: a 30px bottom and 20px top margin produce a 30px gap (the larger), not 50px. Flexbox/grid children don't collapse.", "They merge.", "They don't double."],
        difficulty: "medium"
      }
    ]
  }
];