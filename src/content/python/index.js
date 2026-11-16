import basics from "./basics";
import basics2 from "./basics-2";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";

export default {
  id: "python",
  name: "Python",
  blurb: "Dynamically typed, whitespace-significant, batteries-included. From scripts to ML — readable enough to read like pseudocode that runs.",
  glyph: "🐍",
  tags: ["Dynamic", "Interpreted", "High-level"],
  topics: [basics, ...basics2, ...topics1, ...topics2, ...topics3]
};