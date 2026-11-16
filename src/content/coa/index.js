import basics from "./basics";
import basics2 from "./basics-2";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";

export default {
  id: "coa",
  name: "Computer Organization",
  blurb: "The bridge between software and hardware — logic gates, CPUs, memory hierarchies, and instruction sets. How code actually runs on silicon.",
  glyph: "🔌",
  tags: ["Hardware", "Logic", "CPU", "Memory"],
  topics: [basics, ...basics2, ...topics1, ...topics2, ...topics3]
};