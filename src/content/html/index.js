import basics from "./basics";
import basics2 from "./basics-2";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";

export default {
  id: "html",
  name: "HTML",
  blurb: "The structural layer of the web — semantic markup, forms, accessibility, and the HTML5 APIs that make a page more than a document.",
  glyph: "📄",
  tags: ["Markup", "Semantics", "Accessibility", "Web"],
  topics: [basics, ...basics2, ...topics1, ...topics2, ...topics3]
};