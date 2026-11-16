import basics from "./basics";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";

export default {
  id: "aptitude",
  name: "Aptitude & Logical Reasoning",
  blurb: "The first filter in most OA rounds — speed, accuracy, and pattern recognition across quantitative, logical, and verbal question types. Build the pattern->method reflex that clears timed tests.",
  glyph: "🧠",
  tags: ["Quant", "Logical Reasoning", "Verbal", "OA Prep"],
  topics: [basics, ...topics1, ...topics2, ...topics3]
};