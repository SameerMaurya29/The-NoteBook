import basics from "./basics";
import basics2 from "./basics-2";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";
import topics4 from "./topics-4";
import topics5 from "./topics-5";
import topics6 from "./topics-6";
import topics7 from "./topics-7";

export default {
  id: "dsa",
  name: "DSA",
  blurb: "Data Structures & Algorithms — the grammar of efficient code. From array sorting to graph traversal, with tested step-through visualizers for sorting, searching, structures, graphs and array techniques.",
  glyph: "📊",
  tags: ["Algorithms", "Complexity", "Visualization"],
  topics: [basics, ...basics2, ...topics1, ...topics2, ...topics3, ...topics4, ...topics5, ...topics6, ...topics7]
};