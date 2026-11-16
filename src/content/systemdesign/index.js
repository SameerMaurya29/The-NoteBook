import expanded from "./expanded";
import basics from "./basics";
import topics1 from "./topics-1";
import topics2 from "./topics-2";

export default {
  id: "systemdesign",
  name: "Machine Coding & System Design",
  blurb: "A scoped beginner-to-advanced syllabus: LLD, APIs, data systems, distributed foundations, reliability, security and worked designs. Notebook lessons, practice deliverables and primary-paper reading guides.",
  glyph: "🏗️",
  tags: ["LLD", "HLD", "REST", "Scalability"],
  topics: [basics, ...topics1, ...topics2, ...expanded]
};