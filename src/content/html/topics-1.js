// HTML topics part 1: Structure, Semantics, Text, Links (topics 1-12)
export default [
  {
    id: "document-structure",
    title: "Document Structure & The Skeleton",
    difficulty: "easy",
    definition: `An HTML document is a tree of nested elements. The skeleton is <!DOCTYPE html>, <html>, <head>, and <body> — the minimal valid structure every page needs.`,
    coreUnderstanding: `The DOCTYPE tells the browser to use standards mode (not quirks mode). <html> is the root element. <head> holds metadata (title, charset, links, scripts) — nothing in head is rendered. <body> holds the visible content. The browser parses HTML into a DOM tree, then renders it. The order of elements in <body> determines the default document flow (top-to-bottom, left-to-right).`,
    howItWorks: `1. <!DOCTYPE html> — always first; triggers standards mode.
2. <html lang="en"> — root; the lang attribute is critical for screen readers and SEO.
3. <head> — metadata: <meta charset>, <meta viewport>, <title>, <link>, <style>, <script>.
4. <body> — all visible content: headings, paragraphs, images, etc.
5. The browser builds the DOM from this tree; CSS builds the CSSOM; together they form the render tree.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>This is a paragraph.</p>
</body>
</html>`,
        note: "The viewport meta tag is essential for responsive design — without it, mobile browsers render at a default 980px width."
      }
    ],
    marginNotes: [
      "Always set <html lang> — screen readers use it for pronunciation; search engines use it for language detection.",
      "Quirks mode (missing DOCTYPE) makes browsers emulate old buggy behavior — layout breaks unpredictably.",
      "The <head> is never displayed; it's metadata only. Putting visible content in head is a bug.",
      "UTF-8 charset should be declared early in head — before any content that could be misinterpreted."
    ],
    commonMistakes: [
      "Forgetting <!DOCTYPE html> — triggers quirks mode, breaking CSS box model and layout.",
      "Omitting the viewport meta tag — the page won't be responsive on mobile.",
      "Putting visible content in <head> — it's ignored or causes parsing issues."
    ],
    relatedTopics: ["Semantic HTML", "Metadata & SEO", "Script Loading"],
    externalLinks: [
      { label: "MDN: HTML document structure", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML" },
      { label: "W3C: HTML5 specification", url: "https://html.spec.whatwg.org/" }
    ],
    mcqs: [
      { question: "What does <!DOCTYPE html> do?", options: ["Defines the HTML version as HTML5 (standards mode)", "Imports a CSS file", "Creates a new element", "Nothing — it's optional"], answer: 0, explanations: ["Correct — it triggers standards mode rendering.", "That's <link>.", "No — it's a declaration, not an element.", "It's technically optional but omitting it causes quirks mode."], difficulty: "easy" },
      { question: "Where should visible page content go?", options: ["<head>", "<body>", "<html>", "<meta>"], answer: 1, explanations: ["Head is metadata only.", "Correct — body holds all visible content.", "html is the root, not a content container.", "meta is metadata."], difficulty: "easy" },
      { question: "Why is the viewport meta tag important?", options: ["It's required for SEO", "It controls mobile rendering width", "It sets the page language", "It loads fonts"], answer: 1, explanations: ["SEO uses title/description.", "Correct — without it, mobile browsers use a default width and the page isn't responsive.", "That's lang.", "That's <link>."], difficulty: "medium" }
    ]
  },
  {
    id: "semantic-html",
    title: "Semantic HTML Elements",
    difficulty: "medium",
    definition: `Semantic HTML uses elements that convey meaning about their content — <header>, <nav>, <main>, <article>, <section>, <aside>, <footer> — instead of generic <div> and <span>. Semantics improve accessibility, SEO, and code clarity.`,
    coreUnderstanding: `A <div> tells you nothing about its content; a <nav> tells browsers, screen readers, and search engines "this is navigation." Semantic elements enable features: screen readers can jump to <main>, search engines understand <article> as standalone content, and the outline is machine-readable. Using semantics is not about styling — it's about meaning. You still use <div> for layout containers that have no semantic value.`,
    howItWorks: `1. <header> — introductory content or a group of nav links (not just page top — can be in a section).
2. <nav> — major navigation links (not every group of links — just major ones).
3. <main> — the dominant content; exactly one per page; not inside header/footer/nav/aside.
4. <article> — self-contained content (a blog post, a product card, a forum comment).
5. <section> — a thematic grouping, typically with a heading; not necessarily self-contained.
6. <aside> — tangentially related content (sidebar, pull quotes, ads).
7. <footer> — closing content (copyright, links, author).`,
    codeExamples: [
      {
        lang: "html",
        code: `<body>
  <header>
    <h1>My Blog</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <article>
      <h2>Post Title</h2>
      <p>Content...</p>
      <section>
        <h3>Sub-section</h3>
        <p>More content...</p>
      </section>
    </article>
    <aside>
      <h3>Related</h3>
      <p>See also...</p>
    </aside>
  </main>
  <footer>
    <p>&copy; 2024 My Blog</p>
  </footer>
</body>`,
        note: "article vs section: article is self-contained (could be syndicated); section is a thematic grouping. An article can contain sections; a section can contain articles."
      }
    ],
    marginNotes: [
      "Use <main> once per page — screen readers offer a 'skip to main' shortcut.",
      "<nav> is for MAJOR navigation only — footer link groups don't always need <nav>.",
      "<article> should make sense if read independently (RSS feed, print). <section> doesn't need to.",
      "Don't replace all divs with semantics — use div for layout wrappers that carry no meaning."
    ],
    commonMistakes: [
      "Using <div class='nav'> instead of <nav> — loses accessibility and SEO benefits.",
      "Multiple <main> elements — invalid; only one per document.",
      "Wrapping everything in <section> when <div> would do — section implies a heading."
    ],
    relatedTopics: ["Document Structure", "Accessibility & ARIA", "Headings & Outlines"],
    externalLinks: [
      { label: "MDN: HTML semantic elements", url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics" },
      { label: "HTML5 Doctor: Sectioning elements", url: "https://html5doctor.com/" }
    ],
    mcqs: [
      { question: "What's the difference between <article> and <section>?", options: ["article is self-contained; section is a thematic grouping", "They're identical", "article is for text; section is for images", "section is newer"], answer: 0, explanations: ["Correct — article should be independently distributable; section groups related content.", "No — they have different semantics.", "Both can hold any content.", "Both are HTML5."], difficulty: "medium" },
      { question: "How many <main> elements per page?", options: ["0", "Exactly 1", "Up to 3", "Unlimited"], answer: 1, explanations: ["You should have one.", "Correct — exactly one main element per document.", "No — one only.", "No — one only."], difficulty: "easy" },
      { question: "When should you use <nav>?", options: ["For any group of links", "For major navigation only", "Only in the header", "Never"], answer: 1, explanations: ["Not every link group — footer links often don't need nav.", "Correct — nav is for major navigation blocks.", "Nav can be anywhere.", "It's a valid element."], difficulty: "medium" }
    ]
  },
  {
    id: "headings-outline",
    title: "Headings & Document Outline",
    difficulty: "medium",
    definition: `HTML has six heading levels: <h1> through <h6>. Headings create the document outline — a table of contents that screen readers and search engines use to navigate and understand the page structure.`,
    coreUnderstanding: `Headings are not about font size (that's CSS) — they're about hierarchy. The first heading should be <h1> (the page title). Sub-sections use <h2>, sub-sub-sections <h3>, etc. Don't skip levels (h1 → h3) — it breaks the outline. The outline is how screen reader users navigate (jumping between headings). The HTML5 outline algorithm (sectioning roots) was never fully implemented by browsers — use a single <h1> per page and nest logically.`,
    howItWorks: `1. Use exactly one <h1> per page (the main title).
2. Use <h2> for major sections, <h3> for sub-sections, etc.
3. Don't skip levels — h1 → h2 → h3, never h1 → h3.
4. Headings in <article> and <section> can restart at h1 (HTML5 outline) — but browsers don't support this; use h2-h6 for safety.
5. Don't use headings for styling — use CSS. A bold paragraph is not an h4.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Good: logical hierarchy -->
<h1>Page Title</h1>
  <h2>Section 1</h2>
    <h3>Sub-section 1.1</h3>
  <h2>Section 2</h2>

<!-- Bad: skipped levels -->
<h1>Page Title</h1>
  <h3>Skipped h2!</h3>

<!-- Bad: using headings for styling -->
<h4>Just want big text</h4>
<p style="font-size: 1.5rem; font-weight: bold;">Use CSS instead</p>`,
        note: "The HTML5 outline algorithm allowed multiple h1s in sectioning elements, but no browser implemented it. Stick to one h1 per page."
      }
    ],
    marginNotes: [
      "Screen reader users navigate by headings — a logical outline is the #1 accessibility feature.",
      "Don't use <h1>-<h6> for visual styling — that's CSS. Headings convey structure, not appearance.",
      "Google uses headings to understand page structure — a good outline helps SEO.",
      "The 'document outline' algorithm (h1 in sections restarting) was never implemented — use one h1 per page."
    ],
    commonMistakes: [
      "Skipping heading levels (h1 → h3) — breaks the outline for screen readers.",
      "Using <h4> or <h5> just for larger text — use CSS font-size instead.",
      "Multiple <h1> elements — one per page (the page title)."
    ],
    relatedTopics: ["Semantic HTML", "Accessibility & ARIA", "Document Structure"],
    externalLinks: [
      { label: "MDN: Heading elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements" },
      { label: "W3C: Headings and sections", url: "https://www.w3.org/WAI/tutorials/page-structure/headings/" }
    ],
    mcqs: [
      { question: "How many <h1> elements should a page have?", options: ["0", "1 (the page title)", "6 (one per level)", "Unlimited"], answer: 1, explanations: ["Every page needs a title.", "Correct — one h1 as the main page title.", "There are 6 levels, not 6 h1s.", "One per page is the convention."], difficulty: "easy" },
      { question: "Why shouldn't you skip heading levels (h1 → h3)?", options: ["It's invalid HTML", "It breaks the document outline for screen readers", "It causes a CSS error", "It's slower"], answer: 1, explanations: ["It's valid but bad practice.", "Correct — the outline becomes illogical, confusing screen reader navigation.", "CSS doesn't care about headings.", "No performance impact."], difficulty: "medium" },
      { question: "Should you use <h4> for larger text?", options: ["Yes, it's convenient", "No — use CSS for styling; headings are for structure", "Only in headers", "Only if it's a title"], answer: 1, explanations: ["Bad practice.", "Correct — headings convey hierarchy, not appearance. Use CSS font-size.", "Same rule everywhere.", "Same rule."], difficulty: "medium" }
    ]
  },
  {
    id: "text-content",
    title: "Text Content Elements",
    difficulty: "easy",
    definition: `HTML provides elements for text: <p> (paragraph), <span> (inline), <strong> (important), <em> (emphasis), <br> (line break), <hr> (thematic break), <blockquote>, <q> (inline quote), <code>, <pre>, <mark>, <small>, <sub>, <sup>.`,
    coreUnderstanding: `Each text element conveys meaning, not just appearance. <strong> means 'important' (screen readers emphasize it); <b> just means 'bold' (no semantic weight). <em> means 'stress emphasis' (changes the meaning of the sentence); <i> just means 'italic' (no emphasis). <code> is for inline code; <pre> preserves whitespace for code blocks. Choosing the right element matters for accessibility — screen readers interpret <strong> and <em> differently from <b> and <i>.`,
    howItWorks: `1. <p> — a paragraph (block-level; browsers add margins).
2. <span> — inline container with no meaning (for styling/scripting).
3. <strong> — important content (bold by default; screen readers emphasize).
4. <em> — stress emphasis (italic by default; changes sentence meaning).
5. <br> — line break (use sparingly — prefer CSS or block elements).
6. <hr> — thematic break (a topic change; horizontal rule by default).
7. <blockquote> — block quotation (indented; cite attribute for source).
8. <q> — inline quotation (adds quotes; cite attribute).
9. <code> — inline code (monospace).
10. <pre> — preformatted text (preserves whitespace; often wraps <code>).
11. <mark> — highlighted text (yellow by default).
12. <small> — side comments / fine print (smaller font).`,
    codeExamples: [
      {
        lang: "html",
        code: `<p>This is a paragraph with <strong>important</strong> text and <em>emphasized</em> text.</p>

<p>Use <code>console.log()</code> for debugging.</p>

<pre><code>function hello() {
  console.log("Hello");
}</code></pre>

<blockquote cite="https://example.com">
  This is a block quote.
</blockquote>

<p>The recipe calls for <mark>2 cups</mark> of flour.</p>

<p>H<sub>2</sub>O and E = mc<sup>2</sup></p>`,
        note: "<strong> vs <b>: strong has semantic meaning (important); b is purely visual. Use strong for accessibility."
      }
    ],
    marginNotes: [
      "<strong> ≠ <b>: strong means 'important' (semantic); b means 'bold' (visual). Screen readers treat them differently.",
      "<em> ≠ <i>: em means 'stress emphasis' (changes meaning); i means 'italic' (no emphasis).",
      "Don't use <br> for spacing — use CSS margin/padding or block elements. <br> is for content-level breaks (addresses, poems).",
      "<pre> preserves whitespace; <code> is inline. Use <pre><code> for code blocks."
    ],
    commonMistakes: [
      "Using <b> and <i> instead of <strong> and <em> — loses semantic meaning for screen readers.",
      "Using <br> for vertical spacing — use CSS margin instead.",
      "Using <pre> without <code> for code blocks — <pre> preserves whitespace, <code> adds the semantic code meaning."
    ],
    relatedTopics: ["Semantic HTML", "Document Structure"],
    externalLinks: [
      { label: "MDN: Text formatting elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element#text_content" },
      { label: "MDN: <strong> vs <b>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong" }
    ],
    mcqs: [
      { question: "What's the difference between <strong> and <b>?", options: ["Nothing — both are bold", "strong is semantic (important); b is visual only", "strong is newer", "b is deprecated"], answer: 1, explanations: ["They differ in semantics.", "Correct — strong conveys importance; b is just bold with no meaning.", "Both exist in HTML5.", "b is still valid."], difficulty: "medium" },
      { question: "What does <em> mean vs <i>?", options: ["em is italic; i is bold", "em is stress emphasis (semantic); i is italic (visual)", "They're identical", "em is deprecated"], answer: 1, explanations: ["em isn't bold.", "Correct — em conveys stress emphasis; i is just italic.", "They differ in semantics.", "Both are valid."], difficulty: "medium" },
      { question: "What is <pre> used for?", options: ["Preformatted text (preserves whitespace)", "Inline code", "A preview", "A paragraph"], answer: 0, explanations: ["Correct — pre preserves spaces and line breaks.", "That's <code>.", "Not a preview.", "That's <p>."], difficulty: "easy" }
    ]
  },
  {
    id: "links-navigation",
    title: "Links & Anchors",
    difficulty: "easy",
    definition: `The <a> (anchor) element creates hyperlinks. The href attribute specifies the destination. Links are the fundamental navigation mechanism of the web — they connect pages and resources.`,
    coreUnderstanding: `An <a> without href is not a link (it's a placeholder). href can be absolute (https://...), relative (page.html), root-relative (/page), or a fragment (#section). The target attribute controls where the link opens (_self, _blank, _parent, _top). rel attributes add relationships (noopener, noreferrer, nofollow). Links are keyboard-accessible (Tab to focus, Enter to activate) — don't use <div onclick> for navigation (it breaks accessibility).`,
    howItWorks: `1. href — the destination URL (absolute, relative, fragment, mailto:, tel:).
2. target — where to open: _self (same tab, default), _blank (new tab), _parent, _top.
3. rel — relationship: noopener (security for _blank), noreferrer, nofollow (SEO).
4. Fragment links: href="#section" — scrolls to the element with id="section".
5. download attribute — makes the link download the file instead of navigating.
6. mailto: — opens the email client; tel: — dials a number on mobile.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Absolute link -->
<a href="https://example.com">External</a>

<!-- Relative link -->
<a href="/about">About</a>

<!-- New tab (secure) -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Opens in new tab
</a>

<!-- Fragment link -->
<a href="#section1">Jump to section 1</a>
...
<h2 id="section1">Section 1</h2>

<!-- Download link -->
<a href="file.pdf" download>Download PDF</a>

<!-- Email link -->
<a href="mailto:foo@example.com?subject=Hello">Email me</a>`,
        note: "Always use rel='noopener noreferrer' with target='_blank' — without noopener, the new tab can access window.opener (a security vulnerability)."
      }
    ],
    marginNotes: [
      "rel='noopener' is critical with target='_blank' — without it, the opened page can access window.opener (security risk). Modern browsers default to this, but set it explicitly.",
      "Use <a> for navigation (page change); use <button> for actions (form submit, toggle). Don't use <div onclick> — it's not keyboard accessible.",
      "Fragment links (#section) update the URL without a page reload — they also work with the browser back button.",
      "nofollow tells search engines not to follow the link — use for paid links or untrusted content to avoid passing SEO 'link juice.'"
    ],
    commonMistakes: [
      "Using target='_blank' without rel='noopener' — security vulnerability (the new tab can manipulate the opener).",
      "Using <div onclick> instead of <a> for links — breaks keyboard navigation and screen readers.",
      "Using <a> for actions (submitting a form) instead of <button> — links navigate; buttons act."
    ],
    relatedTopics: ["Document Structure", "Accessibility & ARIA"],
    externalLinks: [
      { label: "MDN: <a> element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a" },
      { label: "Web.dev: rel=noopener", url: "https://web.dev/external-anchors-use-rel-noopener/" }
    ],
    mcqs: [
      { question: "Why use rel='noopener' with target='_blank'?", options: ["It's faster", "Security — prevents the new tab from accessing window.opener", "It's required for SEO", "It opens the link faster"], answer: 1, explanations: ["No speed benefit.", "Correct — without noopener, the new page can access and manipulate the opener window.", "Not SEO-related.", "No speed benefit."], difficulty: "medium" },
      { question: "When should you use <a> vs <button>?", options: ["a for navigation; button for actions", "a for everything", "button for everything", "They're interchangeable"], answer: 0, explanations: ["Correct — a navigates; button performs an action.", "Buttons are for actions.", "Anchors are for links.", "They have different semantics."], difficulty: "easy" },
      { question: "What does href='#section' do?", options: ["Opens a new page", "Scrolls to the element with id='section'", "Downloads a file", "Sends an email"], answer: 1, explanations: ["No navigation.", "Correct — fragment links scroll to the matching id.", "That's the download attribute.", "That's mailto."], difficulty: "easy" }
    ]
  },
  {
    id: "images-media",
    title: "Images, Picture & Responsive Media",
    difficulty: "medium",
    definition: `The <img> element embeds images. <picture> provides art direction (different images for different conditions). <figure> and <figcaption> group media with captions. The srcset and sizes attributes enable responsive images (different resolutions for different screens).`,
    coreUnderstanding: `Always set the alt attribute (accessibility — screen readers read it; it shows if the image fails). For decorative images, use alt="" (empty — tells screen readers to skip it). srcset lets the browser choose the best resolution image based on the device (DPR, viewport). <picture> with <source> enables art direction (different crop/image for mobile vs desktop) and format selection (WebP for browsers that support it, fallback to JPG).`,
    howItWorks: `1. <img src alt> — basic image; alt is required for accessibility.
2. srcset — "img-1x.jpg 1x, img-2x.jpg 2x" — browser picks based on device pixel ratio.
3. srcset + sizes — "img-300.jpg 300w, img-600.jpg 600w" + sizes="(max-width: 600px) 100vw, 50vw" — browser picks based on viewport.
4. <picture> — wraps <source> (media or type conditions) + <img> (fallback).
5. <source type="image/webp"> — browser uses WebP if supported, else falls to the <img>.
6. <source media="(max-width: 600px)"> — different image for mobile.
7. <figure> + <figcaption> — groups an image with its caption.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Basic image with alt -->
<img src="photo.jpg" alt="A sunset over the ocean" width="800" height="600">

<!-- Responsive with srcset -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="A sunset"
>

<!-- Picture with format fallback -->
<picture>
  <source srcset="photo.webp" type="image/webp">
  <source srcset="photo.jpg" type="image/jpeg">
  <img src="photo.jpg" alt="A sunset">
</picture>

<!-- Picture with art direction -->
<picture>
  <source media="(max-width: 600px)" srcset="mobile.jpg">
  <img src="desktop.jpg" alt="Hero image">
</picture>

<!-- Figure with caption -->
<figure>
  <img src="chart.png" alt="Bar chart showing sales">
  <figcaption>Q4 sales increased 20%.</figcaption>
</figure>`,
        note: "Always set width and height attributes — the browser reserves space before the image loads, preventing layout shift (CLS)."
      }
    ],
    marginNotes: [
      "alt='' (empty) is for decorative images — it tells screen readers to skip. Missing alt is an error; alt='image' is useless.",
      "Set width and height attributes to prevent Cumulative Layout Shift (CLS) — the browser reserves the space before load.",
      "srcset lets the BROWSER choose — don't use JavaScript for responsive images. The browser knows the viewport and DPR.",
      "WebP is ~30% smaller than JPEG/PNG — use <picture> with type='image/webp' and a JPEG fallback."
    ],
    commonMistakes: [
      "Omitting the alt attribute — accessibility error; screen readers read the filename.",
      "Using alt='image' or alt='photo' — useless; describe the image or use empty alt for decorative.",
      "Not setting width/height — causes layout shift as images load (bad CLS score)."
    ],
    relatedTopics: ["Accessibility & ARIA", "Performance"],
    externalLinks: [
      { label: "MDN: Responsive images", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images" },
      { label: "Web.dev: Responsive images", url: "https://web.dev/learn/images/" }
    ],
    mcqs: [
      { question: "What should alt='' (empty) be used for?", options: ["Broken images", "Decorative images (screen readers skip them)", "All images", "No images"], answer: 1, explanations: ["That's a bug.", "Correct — empty alt tells screen readers the image is decorative and can be skipped.", "Most images need descriptive alt.", "Most images need alt."], difficulty: "medium" },
      { question: "Why set width and height on <img>?", options: ["To resize the image", "To prevent layout shift (CLS) — browser reserves space", "For SEO", "It's required"], answer: 1, explanations: ["CSS can resize.", "Correct — the browser reserves the space before the image loads, preventing layout shift.", "Not SEO.", "Not required but good practice."], difficulty: "medium" },
      { question: "What does <picture> with <source type='image/webp'> do?", options: ["Converts the image to WebP", "Serves WebP if supported, else falls back to <img>", "Compresses the image", "Loads two images"], answer: 1, explanations: ["It doesn't convert.", "Correct — the browser picks WebP if it supports it; otherwise the <img> (JPEG) is used.", "No compression in HTML.", "Only one loads."], difficulty: "medium" }
    ]
  },
  {
    id: "lists",
    title: "Lists: Ordered, Unordered, Description",
    difficulty: "easy",
    definition: `HTML has three list types: <ul> (unordered/bulleted), <ol> (ordered/numbered), and <dl> (description list — term/definition pairs). List items use <li>; description lists use <dt> (term) and <dd> (description).`,
    coreUnderstanding: `Lists are semantic — they convey 'these items are a group.' Screen readers announce list count and type. Use <ul> when order doesn't matter (ingredients, features); <ol> when order matters (steps, rankings). <ol> attributes: start (starting number), type (1, A, a, I, i), reversed. <dl> is for term-definition pairs (glossaries, metadata). Don't use lists for layout — use CSS flexbox/grid for that.`,
    howItWorks: `1. <ul><li> — bulleted list; order doesn't matter.
2. <ol><li> — numbered list; order matters. Attributes: start, type, reversed.
3. <dl><dt><dd> — description list: dt is the term, dd is the description.
4. Lists can nest (a <li> can contain another <ul>/<ol>).
5. The list-style CSS property controls bullets/numbers (list-style: none to remove).`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Unordered -->
<ul>
  <li>Flour</li>
  <li>Sugar</li>
  <li>Eggs</li>
</ul>

<!-- Ordered with attributes -->
<ol start="3" type="A" reversed>
  <li>Third place</li>
  <li>Second place</li>
  <li>First place</li>
</ol>

<!-- Description list -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>

<!-- Nested list -->
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
</ul>`,
        note: "<ol> type values: 1 (numbers, default), A (uppercase letters), a (lowercase), I (Roman numerals), i (lowercase Roman)."
      }
    ],
    marginNotes: [
      "Use <ul> when order doesn't matter; <ol> when it does. Screen readers announce 'list of 3 items' — semantics matter.",
      "Don't use lists for layout (menu items in a <ul> with CSS) — that's a gray area; it's acceptable for nav menus but not for general layout.",
      "<dl> is underused — great for glossaries, FAQ, metadata (key-value pairs).",
      "Nested lists must be inside an <li>, not directly in the parent <ul>/<ol> — invalid HTML otherwise."
    ],
    commonMistakes: [
      "Using <ul> for numbered steps — should be <ol> (order matters).",
      "Nesting a <ul> directly inside a <ul> (not in an <li>) — invalid HTML.",
      "Using lists for layout instead of CSS flexbox/grid."
    ],
    relatedTopics: ["Semantic HTML", "Text Content Elements"],
    externalLinks: [
      { label: "MDN: List elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element#list_elements" },
      { label: "MDN: <ol> attributes", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol" }
    ],
    mcqs: [
      { question: "When should you use <ol> vs <ul>?", options: ["ol when order matters; ul when it doesn't", "They're the same", "ol for short lists; ul for long", "ol is newer"], answer: 0, explanations: ["Correct — ol is ordered (numbered); ul is unordered (bulleted).", "They differ.", "Length doesn't matter.", "Both are old."], difficulty: "easy" },
      { question: "What does <dl><dt><dd> represent?", options: ["A definition list", "A description list (term + description pairs)", "A dropdown list", "A data list"], answer: 1, explanations: ["It's called a description list now.", "Correct — dt is the term, dd is the description.", "That's <select>.", "Not a standard term."], difficulty: "medium" },
      { question: "Where must a nested <ul> go?", options: ["Directly in the parent <ul>", "Inside an <li> of the parent", "Before the parent <ul>", "Anywhere"], answer: 1, explanations: ["Invalid HTML.", "Correct — nested lists go inside an li, not directly in the parent list.", "Invalid.", "Invalid."], difficulty: "medium" }
    ]
  },
  {
    id: "tables",
    title: "Tables & Tabular Data",
    difficulty: "medium",
    definition: `HTML tables display tabular data using <table>, <tr> (row), <th> (header cell), <td> (data cell), <thead>, <tbody>, <tfoot>, and <caption>. Tables are for DATA, not layout — use CSS grid/flexbox for layout.`,
    coreUnderstanding: `Tables convey relationships between rows and columns — screen readers announce them as tables and can navigate by cell. <th> has a scope attribute (row, col) that tells screen readers which cells the header applies to. <thead>/<tbody>/<tfoot> group rows semantically (and allow the body to scroll independently in some browsers). <caption> describes the table (like a title). Tables for layout is an anti-pattern — it breaks accessibility, responsiveness, and semantics.`,
    howItWorks: `1. <table> — the container.
2. <caption> — the table title (first child, after <table>).
3. <thead> — header rows (contains <th>).
4. <tbody> — body rows (contains <td>).
5. <tfoot> — footer rows (totals, summary).
6. <tr> — a row.
7. <th scope="col"> — a header cell; scope tells which cells it headers.
8. <td> — a data cell.
9. colspan/rowspan — merge cells across columns/rows.`,
    codeExamples: [
      {
        lang: "html",
        code: `<table>
  <caption>Monthly Sales</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$10,000</td>
      <td>5%</td>
    </tr>
    <tr>
      <th scope="row">February</th>
      <td>$12,000</td>
      <td>20%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$22,000</td>
      <td>—</td>
    </tr>
  </tfoot>
</table>`,
        note: "scope='col' on a column header, scope='row' on a row header — this is how screen readers associate cells with their headers."
      }
    ],
    marginNotes: [
      "Tables are for DATA, not layout. Using tables for layout breaks responsiveness and accessibility — use CSS grid/flexbox.",
      "scope='col' and scope='row' on <th> are critical for screen readers — they associate data cells with their headers.",
      "<caption> is the table's title — better than a heading before the table (it's semantically linked).",
      "colspan/rowspan merge cells — use sparingly; complex merges are hard for screen readers to navigate."
    ],
    commonMistakes: [
      "Using tables for page layout — a 1990s practice; breaks responsiveness and accessibility.",
      "Omitting scope on <th> — screen readers can't associate cells with headers.",
      "Using <td> for header cells instead of <th> — loses semantic meaning."
    ],
    relatedTopics: ["Semantic HTML", "Accessibility & ARIA"],
    externalLinks: [
      { label: "MDN: HTML tables", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables" },
      { label: "W3C: Table accessibility", url: "https://www.w3.org/WAI/tutorials/tables/" }
    ],
    mcqs: [
      { question: "Should you use tables for page layout?", options: ["Yes, it's common", "No — use CSS grid/flexbox; tables are for tabular data", "Only for sidebars", "Only for headers"], answer: 1, explanations: ["Anti-pattern.", "Correct — tables are for data; CSS handles layout.", "Still use CSS.", "Still use CSS."], difficulty: "easy" },
      { question: "What does scope='col' on <th> do?", options: ["Styles the column", "Tells screen readers the cell headers a column", "Merges columns", "Hides the column"], answer: 1, explanations: ["CSS styles.", "Correct — it associates the header with its column's data cells for accessibility.", "That's colspan.", "That's CSS."], difficulty: "medium" },
      { question: "What is <caption> for?", options: ["An image caption", "The table's title/description", "A figure caption", "A heading"], answer: 1, explanations: ["That's <figcaption>.", "Correct — caption is the table's title, semantically linked.", "That's figcaption.", "Use a heading separately."], difficulty: "easy" }
    ]
  },
  {
    id: "forms-inputs",
    title: "Forms & Input Types",
    difficulty: "medium",
    definition: `HTML forms collect user input via <form>, <input>, <textarea>, <select>, <button>, <label>, <fieldset>, <legend>, and <datalist>. HTML5 added new input types (email, number, date, color, range) and validation attributes (required, pattern, min, max).`,
    coreUnderstanding: `Every input should have a <label> (clicking the label focuses the input — bigger click target, accessibility). The for attribute on <label> must match the input's id. <fieldset> groups related inputs; <legend> labels the group. Input types trigger mobile keyboards (email shows @, number shows numeric) and built-in validation. The name attribute is what the server receives; the id is for <label> association. Forms submit via GET (URL params) or POST (body); the method attribute controls this.`,
    howItWorks: `1. <form action="submit.php" method="POST"> — action is the URL; method is GET or POST.
2. <label for="email">Email</label> <input type="email" id="email" name="email" required> — label links via for/id.
3. Input types: text, email, password, number, date, time, color, range, checkbox, radio, file, hidden, submit.
4. Validation: required, pattern (regex), min, max, minlength, maxlength.
5. <select><option> — dropdown; <optgroup> groups options.
6. <textarea> — multi-line text (rows/cols attributes).
7. <fieldset><legend> — groups inputs (a bordered box with a title).
8. <datalist> — autocomplete suggestions for an input (list attribute).`,
    codeExamples: [
      {
        lang: "html",
        code: `<form action="/submit" method="POST">
  <fieldset>
    <legend>Contact Info</legend>

    <div>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
    </div>

    <div>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>

    <div>
      <label for="age">Age</label>
      <input type="number" id="age" name="age" min="18" max="120">
    </div>

    <div>
      <label for="color">Favorite Color</label>
      <input type="text" id="color" name="color" list="colors">
      <datalist id="colors">
        <option value="Red">
        <option value="Blue">
        <option value="Green">
      </datalist>
    </div>

    <div>
      <label for="bio">Bio</label>
      <textarea id="bio" name="bio" rows="4"></textarea>
    </div>

    <button type="submit">Submit</button>
  </fieldset>
</form>`,
        note: "Always pair <label> with <input> via for/id. This makes the label clickable (focuses the input) and is essential for screen readers."
      }
    ],
    marginNotes: [
      "Every input needs a <label> with matching for/id — this is the #1 form accessibility rule. Clicking the label focuses the input.",
      "Input types trigger the right mobile keyboard (email shows @, tel shows dialpad) and built-in validation — use them, don't default to type='text'.",
      "name is what the server receives; id is for label association. They can differ but usually match.",
      "method='GET' puts data in the URL (bad for passwords/large data); method='POST' puts it in the body."
    ],
    commonMistakes: [
      "Omitting <label> or not matching for/id — breaks accessibility and click-to-focus.",
      "Using type='text' for emails/numbers — loses mobile keyboard optimization and validation.",
      "Using GET for sensitive data (passwords) — it appears in the URL and browser history."
    ],
    relatedTopics: ["Accessibility & ARIA", "Form Validation"],
    externalLinks: [
      { label: "MDN: HTML forms", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms" },
      { label: "MDN: Input types", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input" }
    ],
    mcqs: [
      { question: "Why must <label for> match <input id>?", options: ["For styling", "Accessibility and click-to-focus", "It's required for validation", "For SEO"], answer: 1, explanations: ["CSS uses classes.", "Correct — the label focuses the input when clicked and screen readers announce it.", "Not validation.", "Not SEO."], difficulty: "easy" },
      { question: "What does type='email' do beyond text?", options: ["Nothing different", "Triggers email keyboard on mobile and built-in validation", "Sends an email", "Encrypts the field"], answer: 1, explanations: ["It differs.", "Correct — mobile shows @ key; browser validates email format.", "That's mailto.", "That's password."], difficulty: "medium" },
      { question: "When should you use method='POST' vs 'GET'?", options: ["POST for sensitive/large data; GET for simple queries", "Always GET", "Always POST", "They're the same"], answer: 0, explanations: ["Correct — POST hides data in the body; GET puts it in the URL.", "GET exposes data.", "POST is heavier.", "They differ."], difficulty: "medium" }
    ]
  },
  {
    id: "form-validation",
    title: "HTML5 Form Validation",
    difficulty: "medium",
    definition: `HTML5 provides built-in client-side validation via attributes: required, pattern (regex), min, max, minlength, maxlength, type (email, url, number). The browser validates before submit and shows error messages. JavaScript can extend this with the Constraint Validation API.`,
    coreUnderstanding: `Built-in validation is a first line of defense (better UX — instant feedback) but NOT a security measure (users can bypass it — always validate server-side too). The browser shows native error bubbles (not customizable in most browsers). For custom styling/messages, use the Constraint Validation API (setCustomValidity, checkValidity, validity object) or disable built-in validation (novalidate on form) and do it all in JS. The :valid and :invalid CSS pseudo-classes style based on validation state.`,
    howItWorks: `1. required — the field must have a value.
2. pattern="[0-9]{4}" — must match the regex.
3. type="email" — must be a valid email format.
4. min/max — for numbers/dates.
5. minlength/maxlength — for text length.
6. :valid / :invalid CSS — style based on state.
7. setCustomValidity('msg') — custom error message (JS).
8. checkValidity() — returns true/false (JS).
9. novalidate — disables browser validation (do it in JS).`,
    codeExamples: [
      {
        lang: "html",
        code: `<form>
  <input type="email" required placeholder="Email">
  <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
         placeholder="123-456-7890" required>
  <input type="number" min="1" max="100" value="50">
  <input type="password" minlength="8" required>
  <button type="submit">Submit</button>
</form>

<style>
  input:invalid { border-color: red; }
  input:valid { border-color: green; }
</style>`,
        note: "Client-side validation is for UX, not security. Always validate on the server — users can bypass HTML validation (disable JS, edit the DOM, send a raw request)."
      },
      {
        lang: "javascript",
        code: `// Custom validation with the Constraint Validation API
const input = document.querySelector('#username');

input.addEventListener('input', () => {
  if (input.value.includes(' ')) {
    input.setCustomValidity('No spaces allowed');
  } else {
    input.setCustomValidity(''); // clear error
  }
});`,
        note: "setCustomValidity('') clears the error. The browser shows the custom message on submit or reportValidity()."
      }
    ],
    marginNotes: [
      "Client-side validation is UX, NOT security. Users can bypass it (edit HTML, disable JS). Always validate server-side.",
      "Native error bubbles aren't customizable in most browsers — use the Constraint Validation API for custom messages.",
      "The :invalid pseudo-class applies before the user interacts (empty required fields are 'invalid' on load). Use :user-invalid (newer) or JS to delay.",
      "pattern uses JavaScript regex syntax (no slashes). It matches the WHOLE value (implicit ^...$)."
    ],
    commonMistakes: [
      "Relying on client-side validation for security — it's bypassable; always validate server-side.",
      "Forgetting to clear setCustomValidity('') when valid — the error persists.",
      "Using pattern with slashes (pattern='/[0-9]/') — it's pattern='[0-9]' (no slashes)."
    ],
    relatedTopics: ["Forms & Input Types", "Accessibility & ARIA"],
    externalLinks: [
      { label: "MDN: Form validation", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation" },
      { label: "MDN: Constraint Validation API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation" }
    ],
    mcqs: [
      { question: "Is client-side HTML validation sufficient for security?", options: ["Yes", "No — users can bypass it; always validate server-side", "Only for forms", "Only with JS"], answer: 1, explanations: ["Never sufficient.", "Correct — HTML/JS validation is bypassable; the server is the source of truth.", "All forms need server validation.", "JS is also client-side."], difficulty: "easy" },
      { question: "How do you write a regex in the pattern attribute?", options: ["pattern='/[0-9]/'", "pattern='[0-9]' (no slashes)", "pattern='regex(/[0-9]/)'", "pattern='[0-9']'"], answer: 1, explanations: ["No slashes.", "Correct — no slashes; it matches the whole value.", "No function.", "Wrong quotes."], difficulty: "medium" },
      { question: "How do you clear a custom validity error?", options: ["setCustomValidity(null)", "setCustomValidity('') — empty string", "resetValidity()", "clearValidity()"], answer: 1, explanations: ["null doesn't clear.", "Correct — empty string clears the error.", "No such method.", "No such method."], difficulty: "medium" }
    ]
  },
  {
    id: "metadata-seo",
    title: "Metadata, SEO & Social Tags",
    difficulty: "medium",
    definition: `The <head> contains metadata: <title>, <meta> (charset, viewport, description, author), <link> (favicon, CSS, canonical), and Open Graph / Twitter Card tags for social sharing. Good metadata improves SEO, social sharing, and user experience.`,
    coreUnderstanding: `<title> is the most important SEO element (appears in search results and the browser tab). <meta name="description"> is the search result snippet (doesn't affect ranking but affects click-through). Open Graph (og:) tags control how links appear when shared on Facebook/LinkedIn; Twitter Card tags for Twitter. The canonical link tells search engines the preferred URL (avoids duplicate content penalties). Structured data (JSON-LD in a <script type="application/ld+json">) helps search engines understand the content (rich results).`,
    howItWorks: `1. <title> — page title (60 chars max for search results); appears in the tab and search results.
2. <meta name="description" content="..."> — search snippet (155 chars); affects click-through, not ranking.
3. <meta name="viewport" content="width=device-width, initial-scale=1"> — responsive.
4. <link rel="canonical" href="..."> — preferred URL (for duplicate content).
5. <link rel="icon" href="favicon.ico"> — favicon.
6. Open Graph: <meta property="og:title">, og:description, og:image, og:url — social sharing.
7. Twitter: <meta name="twitter:card" content="summary_large_image"> + twitter:title, etc.
8. JSON-LD: <script type="application/ld+json">{...}</script> — structured data for rich results.`,
    codeExamples: [
      {
        lang: "html",
        code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Best Coffee in NYC | Joe's Cafe</title>
  <meta name="description" content="Joe's Cafe serves the best coffee in NYC. Fresh roasted, fair trade, and locally sourced.">

  <link rel="canonical" href="https://joescafe.com/">
  <link rel="icon" href="/favicon.ico">

  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Best Coffee in NYC | Joe's Cafe">
  <meta property="og:description" content="Fresh roasted, fair trade coffee.">
  <meta property="og:image" content="https://joescafe.com/og-image.jpg">
  <meta property="og:url" content="https://joescafe.com/">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Best Coffee in NYC">
  <meta name="twitter:image" content="https://joescafe.com/og-image.jpg">

  <!-- Structured data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": "Joe's Cafe",
    "address": "123 Main St, NYC"
  }
  </script>
</head>`,
        note: "The title and og:image are the most impactful — they appear in search results and social shares. Keep titles under 60 chars."
      }
    ],
    marginNotes: [
      "<title> is the #1 on-page SEO factor — include keywords, keep under 60 chars (Google truncates).",
      "meta description doesn't affect ranking but affects click-through — write it like ad copy (155 chars).",
      "Open Graph tags control social sharing previews — without og:image, shares look broken.",
      "canonical prevents duplicate content penalties — if the same content is at multiple URLs, point them all to one canonical."
    ],
    commonMistakes: [
      "Title too long (>60 chars) — Google truncates it in search results.",
      "Missing Open Graph tags — social shares show no image/title (looks unprofessional).",
      "Missing canonical — duplicate content (www vs non-www, HTTP vs HTTPS) hurts SEO."
    ],
    relatedTopics: ["Document Structure", "Performance"],
    externalLinks: [
      { label: "MDN: Meta tags", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta" },
      { label: "Open Graph protocol", url: "https://ogp.me/" }
    ],
    mcqs: [
      { question: "Which is the most important on-page SEO element?", options: ["<meta description>", "<title>", "<h1>", "<link>"], answer: 1, explanations: ["Description affects click-through, not ranking.", "Correct — title is the top on-page SEO factor.", "Important but below title.", "Links don't affect on-page SEO."], difficulty: "medium" },
      { question: "Does meta description affect search ranking?", options: ["Yes, directly", "No — it affects click-through, not ranking", "Only on Google", "Only with keywords"], answer: 1, explanations: ["Not a ranking factor.", "Correct — it's the snippet text; good copy improves clicks but not position.", "Same everywhere.", "Keywords in description don't help ranking."], difficulty: "medium" },
      { question: "What do Open Graph tags control?", options: ["SEO ranking", "Social sharing previews (title, image, description)", "Page speed", "Accessibility"], answer: 1, explanations: ["Not SEO.", "Correct — og: tags control how links appear when shared on social media.", "Not performance.", "Not accessibility."], difficulty: "easy" }
    ]
  },
  {
    id: "script-loading",
    title: "Script Loading: async, defer, module",
    difficulty: "hard",
    definition: `Scripts can block HTML parsing. The loading strategy controls when scripts execute: normal (blocks), async (download in parallel, execute when ready), defer (download in parallel, execute after parsing, in order). ES modules (<script type="module">) are deferred by default.`,
    coreUnderstanding: `Without async/defer, a <script> blocks HTML parsing — the browser stops rendering, downloads the script, executes it, then resumes. This is why scripts are often placed at the end of <body>. async: the script downloads in parallel (doesn't block parsing), but executes as soon as it's ready (pausing parsing) — execution order is not guaranteed. defer: downloads in parallel, executes after HTML parsing is complete, in order — ideal for non-urgent scripts that need the DOM. Module scripts are deferred by default and execute in order.`,
    howItWorks: `1. <script src="app.js"> — blocks parsing; downloads and executes immediately.
2. <script src="app.js" async> — downloads in parallel; executes when ready (may interrupt parsing); order not guaranteed.
3. <script src="app.js" defer> — downloads in parallel; executes after parsing, in order; has access to the full DOM.
4. <script type="module"> — ES module; deferred by default; strict mode; scoped.
5. async is for independent scripts (analytics, ads) — order doesn't matter.
6. defer is for scripts that need the DOM and should run in order.`,
    codeExamples: [
      {
        lang: "html",
        code: `<!-- Blocks parsing (bad for render performance) -->
<script src="app.js"></script>

<!-- Async: downloads in parallel, executes when ready -->
<!-- Good for independent scripts (analytics) -->
<script src="analytics.js" async></script>

<!-- Defer: downloads in parallel, executes after parse, in order -->
<!-- Good for main app scripts that need the DOM -->
<script src="lib.js" defer></script>
<script src="app.js" defer></script> <!-- runs after lib.js -->

<!-- Module: deferred by default, strict mode -->
<script type="module" src="app.js"></script>`,
        note: "defer is the best default for non-urgent scripts — it downloads in parallel, doesn't block rendering, and executes in order after the DOM is ready. async is for independent scripts where order doesn't matter."
      }
    ],
    marginNotes: [
      "defer is the best default — non-blocking, in-order, DOM-ready. Use async only for independent scripts (analytics, ads).",
      "async scripts execute whenever they're ready — order is NOT guaranteed. Don't use async if script B depends on script A.",
      "Module scripts (<script type='module'>) are deferred by default — no need for defer. They're also in strict mode.",
      "Scripts without async/defer block parsing — this is why they're traditionally placed at the end of <body>."
    ],
    commonMistakes: [
      "Using async for scripts with dependencies — execution order isn't guaranteed, causing errors.",
      "Not using defer for main scripts — blocks rendering, slow first paint.",
      "Forgetting that module scripts are deferred by default — adding defer is harmless but unnecessary."
    ],
    relatedTopics: ["Document Structure", "Performance"],
    externalLinks: [
      { label: "MDN: Script loading", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script" },
      { label: "Web.dev: Efficient script loading", url: "https://web.dev/efficiently-load-third-party-javascript/" }
    ],
    mcqs: [
      { question: "What's the difference between async and defer?", options: ["async executes when ready (order not guaranteed); defer executes after parse in order", "They're the same", "async is faster", "defer is newer"], answer: 0, explanations: ["Correct — async: execute ASAP; defer: execute after DOM, in order.", "They differ.", "Not about speed.", "Both exist."], difficulty: "medium" },
      { question: "When should you use async?", options: ["For scripts with dependencies", "For independent scripts where order doesn't matter (analytics)", "For the main app", "Never"], answer: 1, explanations: ["Use defer for dependencies.", "Correct — async is for independent scripts.", "Use defer for the main app.", "It has valid uses."], difficulty: "medium" },
      { question: "Are ES module scripts deferred by default?", options: ["No", "Yes — type='module' scripts are deferred", "Only with defer", "Only in production"], answer: 1, explanations: ["They are deferred.", "Correct — module scripts defer by default.", "Not needed.", "Always."], difficulty: "medium" }
    ]
  },
  {
    id: "data-attributes",
    title: "Data Attributes (data-*)",
    difficulty: "easy",
    definition: `data-* attributes store custom data on HTML elements — any name starting with data- (data-user-id, data-role). They're accessed in JS via element.dataset (camelCase) or getAttribute. They're for private app data, not for semantic meaning.`,
    coreUnderstanding: `data-* attributes let you attach custom data to elements without non-standard attributes (which are invalid HTML). In JS, dataset converts kebab-case (data-user-id) to camelCase (dataset.userId). They're readable in CSS ([data-role="admin"]). They're for app-internal data (state, IDs, config) — not for content that should be in a visible element or for accessibility (use ARIA for that). Don't store large data (use JS variables) or sensitive data (they're visible in the HTML source).`,
    howItWorks: `1. <div data-user-id="123" data-role="admin"> — define data attributes.
2. element.dataset.userId — access in JS (kebab-case → camelCase).
3. element.getAttribute('data-user-id') — alternative access.
4. [data-role="admin"] { ... } — target in CSS.
5. data attributes are strings — convert numbers/objects in JS.`,
    codeExamples: [
      {
        lang: "html",
        code: `<div data-user-id="123" data-role="admin" data-score="95">
  User card
</div>`,
        output: "",
        note: "data-user-id becomes dataset.userId in JS (kebab-case to camelCase)."
      },
      {
        lang: "javascript",
        code: `const card = document.querySelector('[data-user-id]');

// Access via dataset (camelCase)
console.log(card.dataset.userId); // "123"
console.log(card.dataset.role);   // "admin"

// Set a value
card.dataset.score = "100";

// Access via getAttribute (kebab-case)
console.log(card.getAttribute('data-user-id')); // "123"

// Values are strings — convert if needed
const score = parseInt(card.dataset.score, 10);`,
        note: "dataset converts data-user-id to dataset.userId. All values are strings — parse numbers/booleans yourself."
      }
    ],
    marginNotes: [
      "data-* is for app-internal data (state, IDs) — not for accessibility (use ARIA) or visible content (use a real element).",
      "dataset converts kebab-case to camelCase: data-user-id → dataset.userId. data-user-id-card → dataset.userIdCard.",
      "Values are always strings — '123' is a string, not a number. Parse with parseInt/parseFloat or JSON.parse for objects.",
      "Don't store sensitive data in data attributes — they're visible in the page source. Don't store large data — use JS variables."
    ],
    commonMistakes: [
      "Using data-* for accessibility (data-tooltip instead of aria-label) — use ARIA for semantics.",
      "Forgetting that dataset values are strings — data-score='95' is '95' (string), not 95 (number).",
      "Storing sensitive data in data attributes — visible in the HTML source."
    ],
    relatedTopics: ["Accessibility & ARIA", "Custom Elements"],
    externalLinks: [
      { label: "MDN: data-* attributes", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*" },
      { label: "MDN: HTMLElement.dataset", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset" }
    ],
    mcqs: [
      { question: "How does data-user-id appear in dataset?", options: ["dataset.user-id", "dataset.userId (camelCase)", "dataset.user_id", "dataset.dataUserId"], answer: 1, explanations: ["Hyphens aren't valid in JS property names.", "Correct — kebab-case converts to camelCase.", "Underscores aren't used.", "The data- prefix is stripped."], difficulty: "easy" },
      { question: "What type are data attribute values?", options: ["Always strings", "Auto-detected (number, boolean)", "Always objects", "Always numbers"], answer: 0, explanations: ["Correct — all values are strings; parse in JS.", "No auto-detection.", "Use JSON.parse for objects.", "They're strings."], difficulty: "easy" },
      { question: "Should you use data-* for accessibility?", options: ["Yes, it's common", "No — use ARIA attributes (aria-label, role)", "Only for tooltips", "Only for screen readers"], answer: 1, explanations: ["Use ARIA.", "Correct — data-* is private app data; ARIA is for accessibility semantics.", "Use ARIA for tooltips.", "Use ARIA."], difficulty: "medium" }
    ]
  }
];