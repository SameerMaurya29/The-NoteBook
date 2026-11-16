import basics from "./basics";
import basics2 from "./basics-2";
import topics1 from "./topics-1";
import topics2 from "./topics-2";
import topics3 from "./topics-3";

export default {
  id: "dbms",
  name: "DBMS",
  blurb: "The science of storing, querying, and protecting data. From ER diagrams to ACID transactions — the backbone of every application that persists state.",
  glyph: "🗄",
  tags: ["SQL", "Relational", "Transactions", "Normalization"],
  topics: [basics, ...basics2, ...topics1, ...topics2, ...topics3]
};