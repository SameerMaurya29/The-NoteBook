import basics from "./basics";
import basics2 from "./basics-2";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";

export default {
  id: "c",
  name: "C",
  blurb: "The mother tongue of systems programming. Close to the metal, tiny runtime, zero hand-holding — learn memory, pointers, and how the machine actually works.",
  glyph: "🅒",
  tags: ["Systems", "Pointers", "Compiled", "Procedural"],
  topics: [basics, ...basics2, ...topics1, ...topics2, ...topics3]
};