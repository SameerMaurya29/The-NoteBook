import basics from "./basics";
import basics2 from "./basics-2";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";

export default {
  id: "js",
  name: "JavaScript",
  blurb: "The behavior layer — types, closures, the event loop, prototypes, async patterns, DOM APIs, and the modern ES features that make JS expressive and powerful.",
  glyph: "⚡",
  tags: ["Language", "DOM", "Async", "Web"],
  topics: [basics, ...basics2, ...topics1, ...topics2, ...topics3]
};