import basics from "./basics";
import basics2 from "./basics-2";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";

export default {
  id: "css",
  name: "CSS",
  blurb: "The presentation layer — selectors, the box model, flexbox, grid, responsive design, and modern CSS features that make layouts expressive without frameworks.",
  glyph: "🎨",
  tags: ["Styling", "Layout", "Responsive", "Web"],
  topics: [basics, ...basics2, ...topics1, ...topics2, ...topics3]
};