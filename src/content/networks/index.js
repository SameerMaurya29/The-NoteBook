import basics from "./basics";
import basics2 from "./basics-2";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";

export default {
  id: "networks",
  name: "Computer Networks",
  blurb: "How data crosses the planet in milliseconds. From bits on a wire to HTTP requests — the layered protocols that connect everything.",
  glyph: "🌐",
  tags: ["Protocols", "TCP/IP", "Routing", "Security"],
  topics: [basics, ...basics2, ...topics1, ...topics2, ...topics3]
};