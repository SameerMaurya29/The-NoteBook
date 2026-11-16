// Machine Coding & System Design — why & how basics.
export default {
  id: "systemdesign-basics",
  title: "System Design Basics — Why & How",
  difficulty: "medium",
  definition: `System design is the practice of structuring a software system to meet functional and scale requirements. It splits into Low-Level Design (LLD — classes, interfaces, code for a bounded problem like a parking lot) and High-Level Design (HLD — services, databases, caches, load balancers for a scaled system like a URL shortener).`,
  coreUnderstanding: `There are two levels and they answer different questions. LLD asks "how do I model this problem with classes and code?" — you identify nouns (entities), verbs (methods), and relations, then write working code (a Parking Lot has Floors, Vehicles, Tickets; a Tic-Tac-Toe has a Board, Players, a win checker). HLD asks "how do I serve this to millions of users?" — you split the system into services, choose data stores, add caching and load balancing, and reason about consistency, availability, and latency. Interviews usually start HLD with a vague prompt ("design Twitter") and expect you to clarify requirements, estimate scale, sketch the architecture, and discuss trade-offs. The unifying skill is breaking a big problem into parts with clear responsibilities.`,
  howItWorks: `1. LLD PROCESS: read the problem -> list nouns (entities) and verbs (actions) -> assign classes and methods -> decide relations (inheritance, composition) -> apply SOLID and design patterns -> write code handling edge cases.
2. HLD PROCESS (6 steps): (1) clarify requirements (functional + non-functional: scale, latency, availability), (2) back-of-envelope estimation (QPS, storage, bandwidth), (3) high-level components (client, LB, services, DB, cache), (4) data model and storage choice (SQL/NoSQL), (5) deep-dive on bottlenecks (cache, sharding, async), (6) scale and trade-offs.
3. REQUIREMENTS: functional = what it does (post a tweet, follow a user); non-functional = how well (10M users, 99.9% uptime, <200ms latency).
4. ESTIMATION: QPS = daily requests / 86400 × peak factor. Storage = records/day × retention × size. Bandwidth = QPS × payload.
5. COMPONENTS: load balancer (distribute traffic), stateless services (scale horizontally), database (persist), cache (speed up reads), queue (decouple async work), CDN (serve static globally).
6. TRADE-OFFS: consistency vs availability (CAP), latency vs cost, simplicity vs scale. State your choice and why.
7. COMMUNICATE: think out loud, draw boxes, justify each decision. The process matters as much as the result.`,
  codeExamples: [
    {
      lang: "text",
      code: `# HLD: design a URL shortener (tinyurl.com)
1. Requirements
   functional: shorten a long URL, redirect short -> long
   non-functional: 100M URLs, 10k new/day, 100M reads/day, <100ms redirect
2. Estimate
   reads/day = 100M -> QPS = 100M/86400 * 5 (peak) ~ 5800/s
   writes/day = 10k -> ~0.6/s (negligible)
   storage = 100M * 500 bytes ~ 50 GB
3. Components
   client -> load balancer -> web service (stateless, scaled)
   -> cache (Redis, hot URLs) -> DB (key=shortCode, value=longURL)
4. Data model: one table {shortCode, longURL, userId, created}
   shortCode = base62 of an auto-increment id (6 chars -> 62^6 ~ 56B)
5. Deep-dive: cache the top 20% URLs (80/20 rule) -> 80% cache hit
   redirect: GET /{code} -> cache hit? redirect; else DB -> cache -> redirect
6. Trade-offs: hash collision (use unique id + base62, no collision),
   custom aliases (reserve namespace), expiry (TTL column)`,
      output: `(system sketch)`,
      note: "LLD = classes + code for a bounded problem; HLD = services + storage + cache + LB for scale. HLD steps: clarify requirements, estimate, sketch components, data model, deep-dive bottlenecks, trade-offs. Think out loud."
    }
  ],
  marginNotes: [
    "LLD vs HLD: LLD models a bounded problem with classes and working code (Parking Lot, Tic-Tac-Toe). HLD structures a system for scale (services, DB, cache, LB). Interviews may ask either.",
    "Always CLARIFY REQUIREMENTS before designing — functional (what it does) and non-functional (scale, latency, availability). Designing without requirements is the #1 interview mistake.",
    "Back-of-envelope estimation: QPS = daily requests / 86400 × peak factor. Storage = records × size × retention. These numbers drive your storage and caching choices.",
    "State trade-offs explicitly: consistency vs availability (CAP), latency vs cost, simplicity vs scale. The interviewer wants to hear WHY you chose each component, not just that you added it."
  ],
  commonMistakes: [
    "Jumping to architecture before clarifying requirements and scale.",
    "Treating LLD and HLD as the same — LLD is classes/code, HLD is services/scale.",
    "Adding components (cache, queue) without justifying why they solve a specific bottleneck."
  ],
  relatedTopics: ["Low-Level Design: Parking Lot", "REST APIs", "Caching", "Load Balancing"],
  externalLinks: [
    { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
    { label: "The System Design Interview (ByteByteGo)", url: "https://bytebytego.com/" }
  ],
  mcqs: [
    {
      question: "What's the difference between LLD and HLD?",
      options: ["They're the same", "LLD models a bounded problem with classes/code; HLD structures a system for scale (services, DB, cache, LB)", "LLD is for web, HLD for mobile", "LLD is testing, HLD is design"],
      answer: 1,
      explanations: ["They differ in scope.", "Correct — LLD (Low-Level Design) is classes, interfaces, and working code for a bounded problem (Parking Lot, Tic-Tac-Toe). HLD (High-Level Design) is services, databases, caches, and load balancers for a scaled system.", "Scope isn't about platform.", "Both are design; the level differs."],
      difficulty: "easy"
    },
    {
      question: "What's the FIRST step in an HLD interview?",
      options: ["Draw the database schema", "Clarify requirements — functional and non-functional (scale, latency, availability)", "Pick a programming language", "Write code"],
      answer: 1,
      explanations: ["Schema comes after requirements.", "Correct — clarify functional (what it does) and non-functional (scale, latency, availability) requirements first. Designing without requirements is the #1 mistake; everything else depends on them.", "Language is irrelevant to HLD.", "HLD is architecture, not code."],
      difficulty: "easy"
    },
    {
      question: "Roughly, how do you estimate QPS from daily requests?",
        options: ["daily requests × 10", "daily requests / 86400 × peak factor", "daily requests × 86400", "daily requests / 100"],
        answer: 1,
        explanations: ["That overstates it.", "Correct — QPS = daily requests / 86400 (seconds/day) × a peak factor (often 3-5) to handle traffic spikes. This drives your service and cache sizing.", "That's per-second inverted — wrong.", "Too rough."],
        difficulty: "medium"
    }
  ]
};