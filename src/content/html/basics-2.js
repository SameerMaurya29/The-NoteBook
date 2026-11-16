// HTML — more foundational "things you have to know" notes (part 2).
export default [
  {
    id: "document-structure-semantics",
    title: "Document Structure & Semantics",
    difficulty: "easy",
    definition: `An HTML document has a fixed skeleton: a doctype, an html root with head (metadata) and body (visible content). Semantic tags (header, main, article, nav, section, footer) describe what each region IS, improving accessibility and SEO over generic div soup.`,
    coreUnderstanding: `Every page shares the same shell: a doctype declaration (tells the browser to use standards mode), then an html root containing head (invisible metadata: title, charset, links to CSS/JS) and body (everything visible). Inside the body, SEMANTIC tags label regions by meaning — nav for navigation, main for the primary content, article for a self-contained piece. Screen readers, search engines, and the browser all use these landmarks to navigate. A page built with semantic tags is more accessible and ranks better than one built only from divs.`,
    howItWorks: `1. DOCTYPE: <!DOCTYPE html> — always first; tells the browser to render in standards mode (not quirks mode). No closing tag.
2. html lang="en": the root element. The lang attribute helps screen readers pronounce text and helps search engines.
3. head: invisible metadata. Must include <meta charset="UTF-8"> (character encoding) and <title> (tab name + SEO). Also <link> for CSS, <script> for JS, <meta name="viewport"> for responsive mobile.
4. body: all visible content — text, images, links, forms.
5. SEMANTIC LANDMARKS: <header> (top of a page/section), <nav> (navigation links), <main> (the primary content — only ONE per page), <article> (self-contained piece), <section> (themed group), <aside> (sidebar/related), <footer> (bottom info).
6. <h1>-<h6>: headings form an outline. Use ONE <h1> per page; nest <h2> under it, <h3> under <h2>. Don't skip levels for styling — use CSS for size.
7. <meta name="viewport" content="width=device-width, initial-scale=1">: essential for responsive design on phones.
8. WHY SEMANTICS: screen readers jump by landmark; Google understands content structure; your CSS can target meaningful regions.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">                       <!-- character encoding -->
  <meta name="viewport" content="width=device-width, initial-scale=1">  <!-- responsive -->
  <title>The Notebook — study archive</title>   <!-- tab name + SEO -->
  <link rel="stylesheet" href="styles.css">      <!-- CSS -->
</head>
<body>
  <header>
    <h1>The Notebook</h1>                       <!-- ONE h1 per page -->
    <nav><a href="/">Home</a> <a href="/quiz">Quizzes</a></nav>
  </header>

  <main>
    <article>
      <h2>Variables &amp; Types</h2>             <!-- h2 under the h1 -->
      <p>A variable is a name bound to a value.</p>
      <section>
        <h3>Dynamic typing</h3>
        <p>Types live on values, not names.</p>
      </section>
    </article>
    <aside><p>Related: <a href="/dsa">DSA</a></p></aside>
  </main>

  <footer><p>&copy; 2026</p></footer>
  <script src="app.js"></script>
</body>
</html>`,
        output: `(rendered page)`,
        note: "The skeleton: <!DOCTYPE html>, <html lang>, <head> (charset, viewport, title, links) + <body>. Use semantic landmarks (header/nav/main/article/section/aside/footer) and one <h1> with nested <h2>/<h3> for an accessible, SEO-friendly outline."
      }
    ],
    marginNotes: [
      "Always include <meta charset=\"UTF-8\"> and <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> in the head — the first prevents garbled text, the second makes the page responsive on phones.",
      "Use ONE <h1> per page and nest headings in order (h2 under h1, h3 under h2). Don't skip levels or use headings for sizing — use CSS for size, headings for structure.",
      "<main> should appear ONCE per page and hold the primary content. Screen-reader users jump to it to skip navigation.",
      "Prefer <article>, <nav>, <section>, <aside> over <div> when they fit. A <div> is a generic box; a semantic tag tells assistive tech and search engines what the region IS."
    ],
    commonMistakes: [
      "Missing the viewport meta tag — the page looks tiny/zoomed-out on phones.",
      "Using multiple <h1> tags or skipping heading levels (h1 to h3) — breaks the document outline for screen readers and SEO.",
      "Using <div> for everything instead of semantic landmarks — loses accessibility and SEO benefits."
    ],
    relatedTopics: ["HTML Basics — Why & How", "Forms & Inputs", "Accessibility (a11y)"],
    externalLinks: [
      { label: "MDN: Document structure", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure" }
    ],
    mcqs: [
      {
        question: "What does the doctype declaration do?",
        options: ["Imports a stylesheet", "Tells the browser to render in standards mode (not quirks mode)", "Creates the body", "Sets the language"],
        answer: 1,
        explanations: ["Stylesheets use <link>.", "Correct — <!DOCTYPE html> (always first) puts the browser in standards mode. Without it, browsers use 'quirks mode', causing inconsistent rendering.", "It doesn't create the body.", "lang is set on <html>."],
        difficulty: "easy"
      },
      {
        question: "How many <h1> headings should a page have?",
        options: ["As many as you want", "One — it's the page's main title; nest <h2> under it", "Six (h1–h6)", "None"],
        answer: 1,
        explanations: ["Multiple h1s confuse the outline.", "Correct — one <h1> per page (the main title), with <h2> sections nested under it, <h3> under those. This forms the document outline screen readers and search engines use.", "h1–h6 are levels, not a count of h1s.", "Every page should have one h1."],
        difficulty: "easy"
      },
      {
        question: "Why use semantic tags (nav, main, article) over div?",
        options: ["They're faster to render", "They describe what each region IS — helping screen readers navigate and improving SEO", "They're required by HTML5", "They replace CSS"],
        answer: 1,
        explanations: ["Render speed is the same.", "Correct — semantic landmarks let screen-reader users jump by region and help search engines understand structure. A <div> is a generic box with no meaning.", "They're recommended, not strictly required.", "They don't replace CSS."],
        difficulty: "medium"
      }
    ]
  }
];