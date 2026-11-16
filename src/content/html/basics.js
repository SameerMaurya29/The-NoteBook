// HTML — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "language-basics",
  title: "HTML Basics — Why & How",
  difficulty: "easy",
  definition: `HTML (HyperText Markup Language) is the structural layer of every web page. You use it to describe what a page contains — headings, paragraphs, lists, links, images, forms — so browsers can render it and assistive tech can read it.`,
  coreUnderstanding: `HTML is a markup language, not a programming language — it describes structure, not behavior. You write ELEMENTS (tags) that nest to form a tree (the DOM). HTML is about SEMANTICS: choosing the right tag (\`<article>\`, \`<nav>\`, \`<button>\`) tells browsers, search engines, and screen readers what each piece IS, which improves accessibility and SEO. You pair HTML with CSS (presentation) and JavaScript (behavior) — HTML is the skeleton they dress up. The trade-off: HTML alone is static; it can't compute or react.`,
  howItWorks: `1. WHY: every web page starts as HTML. Good semantic HTML is the foundation of accessibility and SEO.
2. WHERE: every web page — static sites, app shells, email templates, EPUB docs.
3. ELEMENTS / TAGS: an element is \`<tagname>content</tagname>\`. The OPENING tag \`<p>\` and CLOSING tag \`</p>\` (with the slash) wrap content. Every opening tag needs a matching closing tag (for non-void elements).
4. VOID / SELF-CLOSING elements have no content and no closing tag: \`<br>\`, \`<img>\`, \`<input>\`, \`<hr>\`, \`<meta>\`, \`<link>\`. (You may write \`<br/>\` but the slash is optional in HTML5.)
5. ATTRIBUTES go in the opening tag as \`name="value"\`: \`<a href="page.html">\`, \`<img src="cat.jpg" alt="a cat">\`. Values use double (or single) quotes. Multiple attributes are separated by SPACES, not commas.
6. NESTING: elements nest inside each other to form a tree. Close inner tags before outer: \`<strong><em>text</em></strong>\` (correct), not \`<strong><em>text</strong></em>\` (overlapping — illegal).
7. THE DOCUMENT SHELL: every page starts with \`<!DOCTYPE html>\` then \`<html>\` containing \`<head>\` (metadata: title, charset, links) and \`<body>\` (visible content).
8. SEMANTICS over divs: use \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<footer>\` instead of generic \`<div>\` where they fit — it helps screen readers and SEO.
9. FORMS: \`<form>\` wraps inputs; each input has a \`name\` (sent to the server) and a \`type\` (\`text\`, \`email\`, \`submit\`, etc.). Labels link via \`for="id"\`.`,
  codeExamples: [
    {
      lang: "html",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">          <!-- void: no closing tag -->
  <title>My Page</title>
</head>
<body>
  <header>
    <h1>Welcome</h1>               <!-- opening <h1> ... closing </h1> -->
    <nav><a href="/about">About</a></nav>   <!-- attribute href="..." -->
  </header>

  <main>
    <article>
      <p>Hello, <strong>world</strong>!</p>   <!-- nested, closed inner-first -->
      <img src="cat.jpg" alt="a cat">          <!-- void: self-contained -->
    </article>

    <form action="/login" method="post">
      <label for="email">Email</label>
      <input id="email" name="email" type="email">   <!-- void -->
      <button type="submit">Go</button>
    </form>
  </main>

  <footer>&copy; 2026</footer>
</body>
</html>`,
      output: `(rendered web page)`,
      note: "HTML elements open with <tag> and close with </tag> (slash). Void elements (img, input, br, meta) have no closing tag. Attributes are name=\"value\" separated by spaces. Nest tags, don't overlap them."
    }
  ],
  marginNotes: [
    "Every non-void opening tag <p> needs a matching closing tag </p>. Forgetting to close is the most common HTML bug — browsers guess, but guessing differs across browsers.",
    "Attributes are separated by SPACES, not commas: <input type=\"text\" name=\"q\">, not <input type=\"text\", name=\"q\">.",
    "Close inner tags before outer: <b><i>text</i></b>, never <b><i>text</b></i>. Overlapping tags are illegal and produce unpredictable rendering.",
    "Use semantic tags (<article>, <nav>, <main>) instead of <div> where they fit — screen readers and search engines rely on them."
  ],
  commonMistakes: [
    "Forgetting the closing tag </tag> — browsers try to recover, but results vary. Always close.",
    "Separating attributes with commas instead of spaces — breaks the element.",
    "Overlapping tags (<b><i>x</b></i>) instead of nesting (<b><i>x</i></b>) — illegal markup.",
    "Using <div> for everything when a semantic tag (<nav>, <article>, <button>) fits better."
  ],
  relatedTopics: ["Document Structure & Semantics", "Forms & Inputs", "Accessibility (a11y)"],
  externalLinks: [
    { label: "MDN: HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics" },
    { label: "HTML Living Standard", url: "https://html.spec.whatwg.org/" }
  ],
  mcqs: [
    {
      question: "How do you close an HTML element?",
      options: ["With a semicolon", "With a closing tag that has a slash: </tag>", "With a newline", "HTML elements never close"],
      answer: 1,
      explanations: ["Semicolons aren't used in HTML.", "Correct — a non-void element opens with <tag> and closes with </tag> (the slash). Void elements like <img> and <br> have no closing tag.", "Newlines don't close elements.", "Most elements must close."],
      difficulty: "easy"
    },
    {
      question: "How are multiple attributes separated in an HTML tag?",
      options: ["With commas", "With spaces — <input type=\"text\" name=\"q\">", "With semicolons", "With pipes"],
      answer: 1,
      explanations: ["Commas break the element.", "Correct — attributes are separated by spaces: <a href=\"x\" class=\"c\">. Commas or semicolons would be treated as part of an attribute value.", "Semicolons are CSS, not HTML.", "Pipes aren't separators."],
      difficulty: "easy"
    },
    {
      question: "Which is correct nesting?",
      options: ["<b><i>text</b></i>", "<b><i>text</i></b> (close inner before outer)", "Both are fine", "Tags can't nest"],
      answer: 1,
      explanations: ["That's overlapping — illegal.", "Correct — close the innermost tag first: <b><i>text</i></b>. Overlapping (<b><i>x</b></i>) is invalid markup and renders unpredictably.", "Only one is valid.", "Nesting is the whole point of HTML's tree."],
      difficulty: "easy"
    }
  ]
};