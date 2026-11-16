// Original notebook notes; primary references are linked, not reproduced.
export default [
  {
    "id": "requirements-and-constraints",
    "title": "Requirements, Constraints & Design Method",
    "difficulty": "medium",
    "definition": "Functional requirements: A design starts with observable behavior, not a shopping list of infrastructure.",
    "coreUnderstanding": "A design starts with observable behavior, not a shopping list of infrastructure. Separate what the system does from latency, availability, durability, privacy and cost constraints. Ask which operation matters most and what may fail. A chat service can tolerate delayed presence updates while durable message loss may be unacceptable. Record assumptions so later trade-offs can be evaluated rather than silently changed.",
    "howItWorks": "1. Choose one critical user journey.\n2. State load, payload, retention and geography assumptions.\n3. Write measurable success and failure criteria.\n4. Sketch the simplest design and identify its first bottleneck.\n5. Record alternatives and consequences.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Journey: send a message\nSuccess: acknowledged durable write, then asynchronous delivery\nFailure: retry returns the same logical message\nOpen question: may a recipient see messages out of order?",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Functional requirements, Non-functional requirements, Workload and access patterns, Constraints and assumptions, Architecture decision records.",
      "“Highly scalable” is not a measurable requirement. Do not inherit social-network-scale complexity for a small workload.",
      "Practice deliverable: Write a one-page requirements brief for chat. Include three user journeys, latency measurement boundaries, retention and two explicit non-goals. Review a failure scenario against each promise."
    ],
    "commonMistakes": [
      "“Highly scalable” is not a measurable requirement. Do not inherit social-network-scale complexity for a small workload.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Functional requirements",
      "Non-functional requirements",
      "Workload and access patterns",
      "Constraints and assumptions",
      "Architecture decision records"
    ],
    "externalLinks": [
      {
        "label": "Google SRE — online book contents",
        "url": "https://sre.google/sre-book/table-of-contents/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Requirements, Constraints & Design Method?",
        "options": [
          "Define measurable requirements before selecting components.",
          "Start with microservices for every system."
        ],
        "answer": 0,
        "explanations": [
          "Define measurable requirements before selecting components. Use the lesson’s mechanism and failure trace to justify it.",
          "“Highly scalable” is not a measurable requirement. Do not inherit social-network-scale complexity for a small workload."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Functional requirements",
      "Non-functional requirements",
      "Workload and access patterns",
      "Constraints and assumptions",
      "Architecture decision records"
    ],
    "practice": "Write a one-page requirements brief for chat. Include three user journeys, latency measurement boundaries, retention and two explicit non-goals. Review a failure scenario against each promise.",
    "curriculumGroup": "Foundations"
  },
  {
    "id": "capacity-estimation",
    "title": "Capacity, Latency & Cost Estimation",
    "difficulty": "medium",
    "definition": "QPS and peak factors: Estimates establish orders of magnitude.",
    "coreUnderstanding": "Estimates establish orders of magnitude. Average requests per second hide bursts; peak rates and payload sizes determine bandwidth and concurrency. Little’s law relates stable-system average in-flight work to throughput times average latency. Tail percentiles cannot be averaged across services. State whether storage estimates include replication, indexes and backup copies.",
    "howItWorks": "1. Estimate daily operations and peak factor.\n2. Multiply operations by payload bytes.\n3. Multiply retained writes by retention days.\n4. Budget replicas, indexes and headroom separately.\n5. Measure rather than treating estimates as benchmarks.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "10,000,000 reads/day / 86,400 ≈ 116 average reads/s\n10x peak assumption ≈ 1,160 reads/s\n2 KB payload × peak ≈ 2.32 MB/s before protocol overhead\nL = λW: 1,000 req/s × 0.1 s average = 100 in-flight",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: QPS and peak factors, Bandwidth, Retention and storage, Concurrency and Little’s law, Percentiles, Cost envelopes.",
      "Little’s law uses averages in a stable system; it does not turn p99 latency into a concurrency guarantee.",
      "Practice deliverable: Estimate a photo service at 100,000 uploads/day and 2 MB/photo for 30 days. Separate original objects, thumbnails, replicas and transfer costs. Change peak factor by 5x and explain what changes."
    ],
    "commonMistakes": [
      "Little’s law uses averages in a stable system; it does not turn p99 latency into a concurrency guarantee.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "QPS and peak factors",
      "Bandwidth",
      "Retention and storage",
      "Concurrency and Little’s law",
      "Percentiles",
      "Cost envelopes"
    ],
    "externalLinks": [
      {
        "label": "Google SRE — online book contents",
        "url": "https://sre.google/sre-book/table-of-contents/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Capacity, Latency & Cost Estimation?",
        "options": [
          "Estimate peaks and storage overhead explicitly.",
          "Average QPS alone determines peak capacity."
        ],
        "answer": 0,
        "explanations": [
          "Estimate peaks and storage overhead explicitly. Use the lesson’s mechanism and failure trace to justify it.",
          "Little’s law uses averages in a stable system; it does not turn p99 latency into a concurrency guarantee."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "QPS and peak factors",
      "Bandwidth",
      "Retention and storage",
      "Concurrency and Little’s law",
      "Percentiles",
      "Cost envelopes"
    ],
    "practice": "Estimate a photo service at 100,000 uploads/day and 2 MB/photo for 30 days. Separate original objects, thumbnails, replicas and transfer costs. Change peak factor by 5x and explain what changes.",
    "curriculumGroup": "Foundations"
  },
  {
    "id": "networking-and-edge",
    "title": "DNS, TCP/TLS, HTTP & the Edge",
    "difficulty": "medium",
    "definition": "DNS caching: Trace a request from name resolution through transport, encryption, edge caches and the origin.",
    "coreUnderstanding": "Trace a request from name resolution through transport, encryption, edge caches and the origin. DNS answers can remain cached until their TTL; changing a record is not instantaneous failover. HTTP/2 multiplexes streams over TCP while HTTP/3 uses QUIC over UDP. TLS protects transport, not application authorization. Persistent connections and pooling avoid repeated setup but consume bounded resources.",
    "howItWorks": "1. Trace DNS to edge and origin.\n2. Distinguish connection time from request time.\n3. Identify cacheable responses and private data.\n4. Allocate a deadline across hops.\n5. Measure connection reuse and upstream pool saturation.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Browser → cached DNS answer → edge TLS endpoint → reverse proxy\n→ bounded application connection pool → database\nA 500 ms client deadline cannot safely allow 500 ms at every hop.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: DNS caching, Connections and TLS, HTTP/1.1, HTTP/2 and HTTP/3, Proxies and CDN, Connection pooling, Timeout budgets.",
      "A CDN does not cache arbitrary authenticated responses safely by default.",
      "Practice deliverable: Draw a request trace with DNS, TLS termination and trust boundaries. Explain what happens to existing connections during a DNS change and why private responses must not enter a shared cache."
    ],
    "commonMistakes": [
      "A CDN does not cache arbitrary authenticated responses safely by default.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "DNS caching",
      "Connections and TLS",
      "HTTP/1.1, HTTP/2 and HTTP/3",
      "Proxies and CDN",
      "Connection pooling",
      "Timeout budgets"
    ],
    "externalLinks": [
      {
        "label": "MDN — HTTP guide",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for DNS, TCP/TLS, HTTP & the Edge?",
        "options": [
          "HTTP/3 uses QUIC rather than TCP.",
          "TLS removes the need for authorization."
        ],
        "answer": 0,
        "explanations": [
          "HTTP/3 uses QUIC rather than TCP. Use the lesson’s mechanism and failure trace to justify it.",
          "A CDN does not cache arbitrary authenticated responses safely by default."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "DNS caching",
      "Connections and TLS",
      "HTTP/1.1, HTTP/2 and HTTP/3",
      "Proxies and CDN",
      "Connection pooling",
      "Timeout budgets"
    ],
    "practice": "Draw a request trace with DNS, TLS termination and trust boundaries. Explain what happens to existing connections during a DNS change and why private responses must not enter a shared cache.",
    "curriculumGroup": "Foundations"
  },
  {
    "id": "solid-and-modeling",
    "title": "LLD: Invariants, SOLID & Domain Modeling",
    "difficulty": "medium",
    "definition": "Encapsulation: An invariant is a condition that must survive every permitted state transition: an account must not spend the same reserved balance twice.",
    "coreUnderstanding": "An invariant is a condition that must survive every permitted state transition: an account must not spend the same reserved balance twice. Encapsulation puts checks at the boundary that controls the state. Prefer interfaces around changing behavior, not around every class. Composition avoids inheritance hierarchies that violate substitutability. A diagram is useful only if it explains ownership, lifecycle and constraints.",
    "howItWorks": "1. List domain entities and value objects.\n2. Name invariants and invalid states.\n3. Model commands as transitions.\n4. Separate persistence and external side effects with interfaces.\n5. Test behavior through public operations.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Order: Created → Paid → Shipped\nCancel is allowed from Created, not from Shipped.\nPaymentGateway is a boundary; Order enforces transitions.\nA subclass must preserve the promises of its parent interface.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Encapsulation, SOLID, Composition, Interfaces, State machines, UML relationships, Domain invariants.",
      "SOLID is a reasoning aid, not a rule to create five abstractions for each method.",
      "Practice deliverable: Model a library loan with BookCopy, Member and Loan. Specify maximum active loans, overdue rules and atomic checkout. Write transition tests before adding design patterns."
    ],
    "commonMistakes": [
      "SOLID is a reasoning aid, not a rule to create five abstractions for each method.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Encapsulation",
      "SOLID",
      "Composition",
      "Interfaces",
      "State machines",
      "UML relationships",
      "Domain invariants"
    ],
    "externalLinks": [
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for LLD: Invariants, SOLID & Domain Modeling?",
        "options": [
          "State-changing methods should preserve domain invariants.",
          "Public mutable fields make invariants easier to enforce."
        ],
        "answer": 0,
        "explanations": [
          "State-changing methods should preserve domain invariants. Use the lesson’s mechanism and failure trace to justify it.",
          "SOLID is a reasoning aid, not a rule to create five abstractions for each method."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Encapsulation",
      "SOLID",
      "Composition",
      "Interfaces",
      "State machines",
      "UML relationships",
      "Domain invariants"
    ],
    "practice": "Model a library loan with BookCopy, Member and Loan. Specify maximum active loans, overdue rules and atomic checkout. Write transition tests before adding design patterns.",
    "curriculumGroup": "Low-level design"
  },
  {
    "id": "design-patterns",
    "title": "LLD: Patterns, Concurrency & Testability",
    "difficulty": "medium",
    "definition": "Strategy: Choose a pattern when a recurring pressure exists.",
    "coreUnderstanding": "Choose a pattern when a recurring pressure exists. Strategy separates interchangeable algorithms; Adapter translates an incompatible boundary; Observer delivers events but requires a subscription lifecycle. Dependency injection makes time, randomness, network and storage controllable in tests. Thread safety requires an explicit ownership or synchronization model; naming a class Singleton does not make its mutable fields safe.",
    "howItWorks": "1. Identify the variation point.\n2. Define the smallest interface needed.\n3. Inject external dependencies.\n4. Specify ownership of shared mutable state.\n5. Test concurrent and failure paths as well as the happy path.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "PriceCalculator(discountStrategy, clock)\nStrategy: seasonal or loyalty pricing\nFake clock: deterministic expiry tests\nLock or database constraint: protects shared inventory, not the pattern name",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Strategy, Factory, Observer, Adapter, Dependency injection, Thread safety, Test doubles.",
      "Global mutable singletons can hide dependencies and make tests order-dependent.",
      "Practice deliverable: Refactor a checkout calculator to swap discounts without changing checkout orchestration. Test expiry using a fake clock, and specify what prevents two checkouts from consuming the last item."
    ],
    "commonMistakes": [
      "Global mutable singletons can hide dependencies and make tests order-dependent.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Strategy",
      "Factory",
      "Observer",
      "Adapter",
      "Dependency injection",
      "Thread safety",
      "Test doubles"
    ],
    "externalLinks": [
      {
        "label": "PostgreSQL — transaction isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for LLD: Patterns, Concurrency & Testability?",
        "options": [
          "Injection makes external behavior controllable in tests.",
          "A Singleton automatically makes mutable data thread-safe."
        ],
        "answer": 0,
        "explanations": [
          "Injection makes external behavior controllable in tests. Use the lesson’s mechanism and failure trace to justify it.",
          "Global mutable singletons can hide dependencies and make tests order-dependent."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Strategy",
      "Factory",
      "Observer",
      "Adapter",
      "Dependency injection",
      "Thread safety",
      "Test doubles"
    ],
    "practice": "Refactor a checkout calculator to swap discounts without changing checkout orchestration. Test expiry using a fake clock, and specify what prevents two checkouts from consuming the last item.",
    "curriculumGroup": "Low-level design"
  },
  {
    "id": "api-contracts",
    "title": "API Contracts, Pagination & Idempotency",
    "difficulty": "medium",
    "definition": "REST versus RPC versus GraphQL: An API is a compatibility promise.",
    "coreUnderstanding": "An API is a compatibility promise. REST fits resource operations, RPC fits explicit commands and GraphQL supports client-selected fields with added query-cost controls. Cursor pagination needs a stable ordering and a tie-breaker; it is not merely an encoded offset. Persist an idempotency key with the request fingerprint and result atomically enough to prevent duplicate side effects.",
    "howItWorks": "1. Define schema, errors and authorization.\n2. Choose stable pagination ordering.\n3. Scope idempotency keys to caller and operation.\n4. Reject key reuse with a different request body.\n5. Version changes and bound webhook retries.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "POST /payments with key k and request hash h\nIf (caller,k) exists and hash=h: return recorded outcome\nIf the hash differs: reject conflicting reuse\nCreate effect and key record under one transactional boundary where possible",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: REST versus RPC versus GraphQL, Schema evolution, Cursor pagination, Idempotency keys, Webhooks, Error contracts.",
      "Idempotent effect does not mean identical HTTP status on every repeated request.",
      "Practice deliverable: Design a list API ordered by (created_at, id). Simulate an insert between pages and compare cursor versus offset behavior. Specify a payment retry after the response is lost."
    ],
    "commonMistakes": [
      "Idempotent effect does not mean identical HTTP status on every repeated request.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "REST versus RPC versus GraphQL",
      "Schema evolution",
      "Cursor pagination",
      "Idempotency keys",
      "Webhooks",
      "Error contracts"
    ],
    "externalLinks": [
      {
        "label": "MDN — HTTP guide",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
      },
      {
        "label": "AWS Builders’ Library — timeouts, retries and jitter",
        "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for API Contracts, Pagination & Idempotency?",
        "options": [
          "Idempotency records must bind a key to its request.",
          "Any reuse of a key should accept a different payment amount."
        ],
        "answer": 0,
        "explanations": [
          "Idempotency records must bind a key to its request. Use the lesson’s mechanism and failure trace to justify it.",
          "Idempotent effect does not mean identical HTTP status on every repeated request."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "REST versus RPC versus GraphQL",
      "Schema evolution",
      "Cursor pagination",
      "Idempotency keys",
      "Webhooks",
      "Error contracts"
    ],
    "practice": "Design a list API ordered by (created_at, id). Simulate an insert between pages and compare cursor versus offset behavior. Specify a payment retry after the response is lost.",
    "curriculumGroup": "Interfaces"
  },
  {
    "id": "data-modeling",
    "title": "Data Modeling, Indexes & Storage Engines",
    "difficulty": "medium",
    "definition": "Relational and document models: Choose a model from access patterns and integrity rules.",
    "coreUnderstanding": "Choose a model from access patterns and integrity rules. Normalization reduces update anomalies; denormalization deliberately duplicates data and needs a repair strategy. Indexes accelerate certain predicates and orderings while increasing write and storage cost. B-tree and LSM-family engines make different read/write/compaction trade-offs. A composite index is not a universal accelerator for all combinations of its columns.",
    "howItWorks": "1. Write the hottest reads and writes.\n2. Choose entity keys and constraints.\n3. Compare normalized and read-optimized shapes.\n4. Inspect query plans and selectivity.\n5. Migrate with backward-compatible expand/backfill/contract phases.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Query: account_id = ? ORDER BY created_at, id LIMIT 50\nCandidate index: (account_id, created_at, id)\nMeasure query plan and write overhead.\nA separate search workload may require a separate index, not arbitrary SQL scans.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Relational and document models, Normalization, Denormalization, B-tree and LSM, Composite indexes, Query plans, Schema migration.",
      "An index has maintenance cost and may not help a low-selectivity or incompatible query.",
      "Practice deliverable: Design orders and order_items with unique order identity and foreign keys. Compare an account order-list query before and after an appropriate index using an execution plan."
    ],
    "commonMistakes": [
      "An index has maintenance cost and may not help a low-selectivity or incompatible query.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Relational and document models",
      "Normalization",
      "Denormalization",
      "B-tree and LSM",
      "Composite indexes",
      "Query plans",
      "Schema migration"
    ],
    "externalLinks": [
      {
        "label": "PostgreSQL — transaction isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Data Modeling, Indexes & Storage Engines?",
        "options": [
          "Index selection should follow actual query predicates and ordering.",
          "Adding indexes always reduces both read and write cost."
        ],
        "answer": 0,
        "explanations": [
          "Index selection should follow actual query predicates and ordering. Use the lesson’s mechanism and failure trace to justify it.",
          "An index has maintenance cost and may not help a low-selectivity or incompatible query."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Relational and document models",
      "Normalization",
      "Denormalization",
      "B-tree and LSM",
      "Composite indexes",
      "Query plans",
      "Schema migration"
    ],
    "practice": "Design orders and order_items with unique order identity and foreign keys. Compare an account order-list query before and after an appropriate index using an execution plan.",
    "curriculumGroup": "Data systems"
  },
  {
    "id": "transactions-and-isolation",
    "title": "Transactions, Isolation & Concurrent Updates",
    "difficulty": "medium",
    "definition": "ACID: Atomicity groups writes; isolation controls which interleavings can appear.",
    "coreUnderstanding": "Atomicity groups writes; isolation controls which interleavings can appear. MVCC provides snapshots but snapshot isolation is not automatically serializable. A check-then-write in application code can race unless the database enforces the invariant. Use constraints, conditional updates, locks or serializable transactions as appropriate. Retry an aborted transaction from its start with bounded attempts.",
    "howItWorks": "1. Name the business invariant.\n2. Construct two conflicting transactions.\n3. Choose constraints or an isolation mechanism.\n4. Make external side effects retry-safe.\n5. Test aborts, deadlocks and transaction retries.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Inventory invariant: stock >= 0\nUPDATE inventory SET stock = stock - 1\nWHERE item_id = :id AND stock > 0;\nSuccess requires affected_rows = 1.\nRecord an order in the same transaction where applicable.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: ACID, MVCC, Lost updates, Write skew, Optimistic and pessimistic control, Deadlocks, Retry semantics.",
      "PostgreSQL Repeatable Read prevents phantoms but still permits serialization anomalies; isolation names differ across systems.",
      "Practice deliverable: Run two buyers against one remaining item. Show that a read-then-unconditional-write can fail, then protect it with a conditional update and an atomic order transaction."
    ],
    "commonMistakes": [
      "PostgreSQL Repeatable Read prevents phantoms but still permits serialization anomalies; isolation names differ across systems.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "ACID",
      "MVCC",
      "Lost updates",
      "Write skew",
      "Optimistic and pessimistic control",
      "Deadlocks",
      "Retry semantics"
    ],
    "externalLinks": [
      {
        "label": "PostgreSQL — transaction isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Transactions, Isolation & Concurrent Updates?",
        "options": [
          "Conditional updates can enforce a stock invariant atomically.",
          "A prior SELECT makes a later unconditional UPDATE race-free."
        ],
        "answer": 0,
        "explanations": [
          "Conditional updates can enforce a stock invariant atomically. Use the lesson’s mechanism and failure trace to justify it.",
          "PostgreSQL Repeatable Read prevents phantoms but still permits serialization anomalies; isolation names differ across systems."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "ACID",
      "MVCC",
      "Lost updates",
      "Write skew",
      "Optimistic and pessimistic control",
      "Deadlocks",
      "Retry semantics"
    ],
    "practice": "Run two buyers against one remaining item. Show that a read-then-unconditional-write can fail, then protect it with a conditional update and an atomic order transaction.",
    "curriculumGroup": "Data systems"
  },
  {
    "id": "replication-and-failover",
    "title": "Replication, Lag & Failover",
    "difficulty": "medium",
    "definition": "Leader-follower: Replication creates copies with explicit lag and durability trade-offs.",
    "coreUnderstanding": "Replication creates copies with explicit lag and durability trade-offs. An asynchronously acknowledged write may be missing after a failover. Reading from a follower can violate read-your-writes unless the session is routed or waits for an appropriate log position. Failover also needs to stop an old leader from continuing writes: a new leader announcement alone is not fencing.",
    "howItWorks": "1. Define when a write is acknowledged.\n2. Decide where reads go.\n3. Track follower log position and lag.\n4. Fence an obsolete leader.\n5. Test an acknowledgement followed immediately by leader failure.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Client writes version 42 to leader.\nFollower has only version 41.\nRoute the next session read to leader or wait until follower >= 42.\nIf leader fails before replication, the durability promise determines the outcome.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Leader-follower, Synchronous/asynchronous replication, Read-your-writes, Replication lag, Fencing, Split brain.",
      "Replication is not backup: accidental deletes can replicate successfully.",
      "Practice deliverable: Draw a failover timeline showing acknowledged and replicated positions. State which writes may be lost under asynchronous acknowledgement and how you avoid two writable leaders."
    ],
    "commonMistakes": [
      "Replication is not backup: accidental deletes can replicate successfully.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Leader-follower",
      "Synchronous/asynchronous replication",
      "Read-your-writes",
      "Replication lag",
      "Fencing",
      "Split brain"
    ],
    "externalLinks": [
      {
        "label": "Raft — paper, talks and visualization",
        "url": "https://raft.github.io/"
      },
      {
        "label": "Dynamo — original SOSP 2007 paper",
        "url": "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Replication, Lag & Failover?",
        "options": [
          "Asynchronous replication can lose acknowledged writes on failover.",
          "Replicas replace the need for backups."
        ],
        "answer": 0,
        "explanations": [
          "Asynchronous replication can lose acknowledged writes on failover. Use the lesson’s mechanism and failure trace to justify it.",
          "Replication is not backup: accidental deletes can replicate successfully."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Leader-follower",
      "Synchronous/asynchronous replication",
      "Read-your-writes",
      "Replication lag",
      "Fencing",
      "Split brain"
    ],
    "practice": "Draw a failover timeline showing acknowledged and replicated positions. State which writes may be lost under asynchronous acknowledgement and how you avoid two writable leaders.",
    "curriculumGroup": "Data systems"
  },
  {
    "id": "partitioning-and-hotspots",
    "title": "Sharding, Consistent Hashing & Hot Keys",
    "difficulty": "medium",
    "definition": "Range/hash partitioning: A partition key defines where data and work live.",
    "coreUnderstanding": "A partition key defines where data and work live. Hashing can spread many keys but does not split one extremely popular key. Range partitioning supports locality and range scans but can concentrate monotonically growing writes. Resharding needs a migration protocol for reads, writes and ownership. Global uniqueness and cross-shard transactions become explicit coordination problems.",
    "howItWorks": "1. Choose a shard key from access patterns.\n2. Estimate skew rather than average rows.\n3. Plan ownership/version changes.\n4. Move data with validation and controlled cutover.\n5. Test hot tenants and partial migration.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Hash(user_id) mod N spreads users, not one celebrity’s traffic.\nA hot counter may require striped partial counters.\nAn ordered timestamp range can send all new writes to the newest shard.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Range/hash partitioning, Shard keys, Virtual nodes, Resharding, Hot partitions, Scatter-gather, Global constraints.",
      "Consistent hashing reduces movement under membership change; it does not remove skew or coordination.",
      "Practice deliverable: Choose shard keys for chat messages and account transactions. Explain which operations remain local, which fan out, and what happens when a single tenant exceeds one shard."
    ],
    "commonMistakes": [
      "Consistent hashing reduces movement under membership change; it does not remove skew or coordination.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Range/hash partitioning",
      "Shard keys",
      "Virtual nodes",
      "Resharding",
      "Hot partitions",
      "Scatter-gather",
      "Global constraints"
    ],
    "externalLinks": [
      {
        "label": "Dynamo — original SOSP 2007 paper",
        "url": "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Sharding, Consistent Hashing & Hot Keys?",
        "options": [
          "A popular single key can remain hot after hashing.",
          "Hash partitioning eliminates every hotspot."
        ],
        "answer": 0,
        "explanations": [
          "A popular single key can remain hot after hashing. Use the lesson’s mechanism and failure trace to justify it.",
          "Consistent hashing reduces movement under membership change; it does not remove skew or coordination."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Range/hash partitioning",
      "Shard keys",
      "Virtual nodes",
      "Resharding",
      "Hot partitions",
      "Scatter-gather",
      "Global constraints"
    ],
    "practice": "Choose shard keys for chat messages and account transactions. Explain which operations remain local, which fan out, and what happens when a single tenant exceeds one shard.",
    "curriculumGroup": "Data systems"
  },
  {
    "id": "consistency-and-cap",
    "title": "Consistency Models, CAP & Quorums",
    "difficulty": "hard",
    "definition": "Linearizability: Linearizability respects real-time operation order for an object; serializability describes transaction equivalence to a serial order.",
    "coreUnderstanding": "Linearizability respects real-time operation order for an object; serializability describes transaction equivalence to a serial order. They are related but not interchangeable. CAP concerns behavior during a network partition under its availability and consistency definitions, not a generic pick-two menu. R + W > N gives intersection only under the assumed replica membership and protocol; sloppy quorums and concurrent versions need additional reasoning.",
    "howItWorks": "1. Define the user-visible consistency contract.\n2. Describe a network partition explicitly.\n3. Decide which operations may refuse service.\n4. Check quorum membership and version rules.\n5. Test stale reads and concurrent updates.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "N=3, R=2, W=2 → read/write sets intersect for fixed membership.\nIntersection alone is not a proof of linearizability.\nDynamo-style sloppy quorums may involve fallback nodes and version reconciliation.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Linearizability, Serializability, Eventual/session consistency, Network partitions, CAP, Quorum caveats.",
      "CAP availability is not the same as an uptime percentage in an SLO.",
      "Practice deliverable: For a bank balance and a presence indicator, choose separate consistency requirements. Walk through a partition and explain which requests you accept, reject or serve stale."
    ],
    "commonMistakes": [
      "CAP availability is not the same as an uptime percentage in an SLO.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Linearizability",
      "Serializability",
      "Eventual/session consistency",
      "Network partitions",
      "CAP",
      "Quorum caveats"
    ],
    "externalLinks": [
      {
        "label": "Dynamo — original SOSP 2007 paper",
        "url": "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf"
      },
      {
        "label": "Raft — paper, talks and visualization",
        "url": "https://raft.github.io/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Consistency Models, CAP & Quorums?",
        "options": [
          "CAP trade-offs must be described during a partition.",
          "CAP says every system permanently picks exactly two arbitrary features."
        ],
        "answer": 0,
        "explanations": [
          "CAP trade-offs must be described during a partition. Use the lesson’s mechanism and failure trace to justify it.",
          "CAP availability is not the same as an uptime percentage in an SLO."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Linearizability",
      "Serializability",
      "Eventual/session consistency",
      "Network partitions",
      "CAP",
      "Quorum caveats"
    ],
    "practice": "For a bank balance and a presence indicator, choose separate consistency requirements. Walk through a partition and explain which requests you accept, reject or serve stale.",
    "curriculumGroup": "Distributed foundations"
  },
  {
    "id": "clocks-and-ordering",
    "title": "Clocks, Ordering & Unique Identifiers",
    "difficulty": "hard",
    "definition": "Clock skew: Wall clocks can move and disagree.",
    "coreUnderstanding": "Wall clocks can move and disagree. Use a monotonic clock for elapsed durations, not a wall-clock subtraction across hosts. Logical clocks order events under a model without proving that one event physically happened a precise number of milliseconds before another. Vector clocks can expose concurrent versions but carry metadata and membership costs. Identifier uniqueness and chronological ordering are separate promises.",
    "howItWorks": "1. Distinguish event time, processing time and elapsed time.\n2. Specify tie-breaking and collision behavior.\n3. Use logical metadata when causality matters.\n4. Bound clock-skew assumptions.\n5. Test restart and backward-clock scenarios.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "A writes x; B reads x and then writes y.\nA causal chain must preserve that dependency.\nTwo independent writes may be concurrent even if wall timestamps differ.\nNever use timestamp alone as a collision-free global ID.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Clock skew, Monotonic time, Lamport ordering, Vector clocks, UUIDs and time-sortable IDs, Causality.",
      "A larger Lamport timestamp does not prove causality in the reverse direction.",
      "Practice deliverable: Design message IDs for multiple writers. Explain collision handling, sort order and what a clock rollback changes. Compare a random UUID with a time-plus-worker scheme."
    ],
    "commonMistakes": [
      "A larger Lamport timestamp does not prove causality in the reverse direction.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Clock skew",
      "Monotonic time",
      "Lamport ordering",
      "Vector clocks",
      "UUIDs and time-sortable IDs",
      "Causality"
    ],
    "externalLinks": [
      {
        "label": "Dynamo — original SOSP 2007 paper",
        "url": "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf"
      },
      {
        "label": "Spanner — Google Research publication",
        "url": "https://research.google/pubs/spanner-googles-globally-distributed-database/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Clocks, Ordering & Unique Identifiers?",
        "options": [
          "Wall-clock timestamps alone do not establish causality.",
          "Every later wall timestamp proves a causal dependency."
        ],
        "answer": 0,
        "explanations": [
          "Wall-clock timestamps alone do not establish causality. Use the lesson’s mechanism and failure trace to justify it.",
          "A larger Lamport timestamp does not prove causality in the reverse direction."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Clock skew",
      "Monotonic time",
      "Lamport ordering",
      "Vector clocks",
      "UUIDs and time-sortable IDs",
      "Causality"
    ],
    "practice": "Design message IDs for multiple writers. Explain collision handling, sort order and what a clock rollback changes. Compare a random UUID with a time-plus-worker scheme.",
    "curriculumGroup": "Distributed foundations"
  },
  {
    "id": "consensus-and-leases",
    "title": "Consensus, Leader Election & Leases",
    "difficulty": "hard",
    "definition": "Raft terms: Consensus makes participants agree on a log despite specified failures.",
    "coreUnderstanding": "Consensus makes participants agree on a log despite specified failures. In Raft, terms and voting rules constrain elections and log acceptance; a majority is central to safe progress. A timeout suggests failure but does not prove it. Leases need explicit time assumptions; fencing tokens let downstream resources reject obsolete holders even when a paused process resumes.",
    "howItWorks": "1. Identify the replicated state machine.\n2. Trace term changes and majority acknowledgements.\n3. Distinguish appended from committed entries.\n4. Specify membership-change rules.\n5. Fence old leaders and test network partitions.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Lease holder A pauses. B acquires a newer fencing token 18.\nA resumes with token 17.\nStorage must reject writes using 17 after it has accepted 18.\nThe lease store alone cannot force a stale process to stop.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Raft terms, Majority, Log commitment, Leader election, Leases and fencing, Membership changes.",
      "Leader election without safe replication and stale-writer control is not a complete consistency design.",
      "Practice deliverable: Use the Raft visualization to partition a five-node cluster. Predict which side can commit and inspect terms after reconnection. Write a fencing-token timeline."
    ],
    "commonMistakes": [
      "Leader election without safe replication and stale-writer control is not a complete consistency design.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Raft terms",
      "Majority",
      "Log commitment",
      "Leader election",
      "Leases and fencing",
      "Membership changes"
    ],
    "externalLinks": [
      {
        "label": "Raft — paper, talks and visualization",
        "url": "https://raft.github.io/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Consensus, Leader Election & Leases?",
        "options": [
          "A timeout is suspicion of failure, not proof.",
          "A timeout proves the old leader can no longer write."
        ],
        "answer": 0,
        "explanations": [
          "A timeout is suspicion of failure, not proof. Use the lesson’s mechanism and failure trace to justify it.",
          "Leader election without safe replication and stale-writer control is not a complete consistency design."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Raft terms",
      "Majority",
      "Log commitment",
      "Leader election",
      "Leases and fencing",
      "Membership changes"
    ],
    "practice": "Use the Raft visualization to partition a five-node cluster. Predict which side can commit and inspect terms after reconnection. Write a fencing-token timeline.",
    "curriculumGroup": "Distributed foundations"
  },
  {
    "id": "queues-and-delivery",
    "title": "Queues, Streams & Delivery Semantics",
    "difficulty": "medium",
    "definition": "Queue versus log: A work queue distributes tasks; a retained event log allows consumers to replay positions.",
    "coreUnderstanding": "A work queue distributes tasks; a retained event log allows consumers to replay positions. At-least-once delivery can duplicate work when an acknowledgement is lost. Exactly-once effects require a carefully defined boundary, often a transaction or idempotent sink; a broker setting alone cannot make arbitrary external side effects exactly once. Ordering usually applies per partition rather than across all events.",
    "howItWorks": "1. Define retention and replay needs.\n2. Choose the ordering key.\n3. Write the acknowledgement and commit sequence.\n4. Make repeated processing harmless.\n5. Bound retries and define dead-letter inspection.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Consumer charges card → crashes before acknowledging.\nBroker redelivers.\nA payment idempotency key is needed at the side-effect boundary.\nAcknowledging before charging instead risks losing the task.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Queue versus log, Consumer groups, At-most/at-least-once, Ordering, Acknowledgements, Replay, Dead-letter policy.",
      "A dead-letter queue is an operational workflow, not permission to forget failed business events.",
      "Practice deliverable: Design an email worker. List crash points before and after send/ack, choose a duplicate policy and document what delivery guarantee the user actually gets."
    ],
    "commonMistakes": [
      "A dead-letter queue is an operational workflow, not permission to forget failed business events.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Queue versus log",
      "Consumer groups",
      "At-most/at-least-once",
      "Ordering",
      "Acknowledgements",
      "Replay",
      "Dead-letter policy"
    ],
    "externalLinks": [
      {
        "label": "AWS Builders’ Library — timeouts, retries and jitter",
        "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Queues, Streams & Delivery Semantics?",
        "options": [
          "At-least-once delivery requires duplicate-safe processing.",
          "A broker flag guarantees exactly-once effects in every external service."
        ],
        "answer": 0,
        "explanations": [
          "At-least-once delivery requires duplicate-safe processing. Use the lesson’s mechanism and failure trace to justify it.",
          "A dead-letter queue is an operational workflow, not permission to forget failed business events."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Queue versus log",
      "Consumer groups",
      "At-most/at-least-once",
      "Ordering",
      "Acknowledgements",
      "Replay",
      "Dead-letter policy"
    ],
    "practice": "Design an email worker. List crash points before and after send/ack, choose a duplicate policy and document what delivery guarantee the user actually gets.",
    "curriculumGroup": "Async systems"
  },
  {
    "id": "outbox-sagas-and-cdc",
    "title": "Outbox, CDC, Sagas & Workflow Recovery",
    "difficulty": "medium",
    "definition": "Dual-write failure: Writing a database row and publishing an event are two failure-prone operations.",
    "coreUnderstanding": "Writing a database row and publishing an event are two failure-prone operations. The transactional outbox records state and the intent to publish in one local transaction; a relay can publish duplicates, so consumers remain idempotent. A saga splits a business workflow into local steps with compensations, but compensation is a new action, not a magical reversal of history.",
    "howItWorks": "1. Identify each local transaction boundary.\n2. Persist event intent atomically.\n3. Relay and deduplicate messages.\n4. Record workflow state and compensation decisions.\n5. Reconcile stuck and inconsistent workflows.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "BEGIN\n  create order(status=pending)\n  insert outbox(order-created, event_id=e)\nCOMMIT\nRelay publishes e; marks sent; may publish e again after a crash.\nConsumer deduplicates e.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Dual-write failure, Transactional outbox, Change-data capture, Saga compensation, Workflow state, Reconciliation.",
      "A refund can fail and has its own latency, compliance and retry requirements.",
      "Practice deliverable: Model order, payment and inventory with an outbox and a saga. Specify what happens when inventory reservation expires after payment and how an operator finds stuck workflows."
    ],
    "commonMistakes": [
      "A refund can fail and has its own latency, compliance and retry requirements.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Dual-write failure",
      "Transactional outbox",
      "Change-data capture",
      "Saga compensation",
      "Workflow state",
      "Reconciliation"
    ],
    "externalLinks": [
      {
        "label": "PostgreSQL — transaction isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      },
      {
        "label": "AWS Builders’ Library — timeouts, retries and jitter",
        "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Outbox, CDC, Sagas & Workflow Recovery?",
        "options": [
          "An outbox removes the database/event dual-write gap within one local transaction.",
          "A saga guarantees instantaneous rollback of every external side effect."
        ],
        "answer": 0,
        "explanations": [
          "An outbox removes the database/event dual-write gap within one local transaction. Use the lesson’s mechanism and failure trace to justify it.",
          "A refund can fail and has its own latency, compliance and retry requirements."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Dual-write failure",
      "Transactional outbox",
      "Change-data capture",
      "Saga compensation",
      "Workflow state",
      "Reconciliation"
    ],
    "practice": "Model order, payment and inventory with an outbox and a saga. Specify what happens when inventory reservation expires after payment and how an operator finds stuck workflows.",
    "curriculumGroup": "Async systems"
  },
  {
    "id": "cache-correctness",
    "title": "Cache Correctness, Stampedes & CDN",
    "difficulty": "medium",
    "definition": "Cache-aside/write-through: A cache contains a derived copy with an explicit staleness policy.",
    "coreUnderstanding": "A cache contains a derived copy with an explicit staleness policy. Cache-aside reads can race with writes and repopulate old values after invalidation. TTL bounds some kinds of staleness but does not make updates linearizable. When many entries expire together, single-flight loading, jitter and stale-while-revalidate can protect the origin. Include authorization context in cacheability decisions.",
    "howItWorks": "1. Define allowable staleness per response.\n2. Choose write/invalidation order.\n3. Handle concurrent refreshes.\n4. Bound negative caching and cache memory.\n5. Test expired hot entries and private-data separation.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Reader loads old DB value. Writer updates DB and deletes cache.\nReader now fills cache with the old value.\nPossible controls: versioned entries, carefully coordinated writes, bounded TTL.\nChoose against the actual consistency requirement.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Cache-aside/write-through, Invalidation, TTL, Stampedes, Negative caching, CDN cache keys, Hot-key mitigation.",
      "Caching authorization-sensitive data under a shared public key can leak information.",
      "Practice deliverable: Trace two readers and one writer around a cache invalidation. Design a hot-key refresh with one loader and bounded waiters; state when stale data may be served."
    ],
    "commonMistakes": [
      "Caching authorization-sensitive data under a shared public key can leak information.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Cache-aside/write-through",
      "Invalidation",
      "TTL",
      "Stampedes",
      "Negative caching",
      "CDN cache keys",
      "Hot-key mitigation"
    ],
    "externalLinks": [
      {
        "label": "Redis — keys, values and expiration",
        "url": "https://redis.io/docs/latest/develop/using-commands/keyspace/"
      },
      {
        "label": "MDN — HTTP guide",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Cache Correctness, Stampedes & CDN?",
        "options": [
          "TTL alone does not provide linearizable cache updates.",
          "Deleting a cache entry prevents every concurrent stale refill."
        ],
        "answer": 0,
        "explanations": [
          "TTL alone does not provide linearizable cache updates. Use the lesson’s mechanism and failure trace to justify it.",
          "Caching authorization-sensitive data under a shared public key can leak information."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Cache-aside/write-through",
      "Invalidation",
      "TTL",
      "Stampedes",
      "Negative caching",
      "CDN cache keys",
      "Hot-key mitigation"
    ],
    "practice": "Trace two readers and one writer around a cache invalidation. Design a hot-key refresh with one loader and bounded waiters; state when stale data may be served.",
    "curriculumGroup": "Performance"
  },
  {
    "id": "rate-limiting-and-backpressure",
    "title": "Rate Limiting, Admission Control & Backpressure",
    "difficulty": "medium",
    "definition": "Token/leaky buckets: Rate limits bound admitted traffic under a defined key and window.",
    "coreUnderstanding": "Rate limits bound admitted traffic under a defined key and window. A token bucket permits controlled bursts, while a fixed window can allow boundary bursts. Distributed limits trade exact global coordination for local speed and availability. Backpressure asks upstream to slow down; an unbounded queue only postpones overload while memory and latency grow.",
    "howItWorks": "1. Choose caller identity and policy.\n2. Specify burst capacity and refill.\n3. Decide global versus local enforcement.\n4. Bound queue length and deadlines.\n5. Expose retry hints and fairness metrics.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Token bucket: capacity 20, refill 5 tokens/s\nA request consumes one token if available.\n20 simultaneous requests may pass; sustained rate is bounded by refill.\nDo not split read/modify/write across unsynchronized workers.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Token/leaky buckets, Fixed/sliding windows, Per-tenant fairness, 429 and Retry-After, Bounded queues, Load shedding.",
      "Fail-open and fail-closed are business/security decisions; neither is universally correct.",
      "Practice deliverable: Design per-account and per-IP limits for login. Explain distributed counter atomicity, behavior when the limiter is unavailable and why IP alone is insufficient behind shared networks."
    ],
    "commonMistakes": [
      "Fail-open and fail-closed are business/security decisions; neither is universally correct.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Token/leaky buckets",
      "Fixed/sliding windows",
      "Per-tenant fairness",
      "429 and Retry-After",
      "Bounded queues",
      "Load shedding"
    ],
    "externalLinks": [
      {
        "label": "AWS Builders’ Library — timeouts, retries and jitter",
        "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
      },
      {
        "label": "Google SRE — online book contents",
        "url": "https://sre.google/sre-book/table-of-contents/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Rate Limiting, Admission Control & Backpressure?",
        "options": [
          "A bounded queue makes overload behavior explicit.",
          "An unbounded queue solves sustained overload."
        ],
        "answer": 0,
        "explanations": [
          "A bounded queue makes overload behavior explicit. Use the lesson’s mechanism and failure trace to justify it.",
          "Fail-open and fail-closed are business/security decisions; neither is universally correct."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Token/leaky buckets",
      "Fixed/sliding windows",
      "Per-tenant fairness",
      "429 and Retry-After",
      "Bounded queues",
      "Load shedding"
    ],
    "practice": "Design per-account and per-IP limits for login. Explain distributed counter atomicity, behavior when the limiter is unavailable and why IP alone is insufficient behind shared networks.",
    "curriculumGroup": "Performance"
  },
  {
    "id": "resilience-and-timeouts",
    "title": "Timeouts, Retries, Circuit Breakers & Bulkheads",
    "difficulty": "medium",
    "definition": "Deadline propagation: A remote timeout means the outcome may be unknown, not that the operation definitely failed.",
    "coreUnderstanding": "A remote timeout means the outcome may be unknown, not that the operation definitely failed. Retrying side effects needs idempotency. Retries amplify load; use bounded attempts, backoff and jitter and avoid retrying at every layer. Circuit breakers reduce repeated calls to an unhealthy dependency; bulkheads isolate resource pools so one failing dependency cannot consume all workers.",
    "howItWorks": "1. Assign an end-to-end deadline.\n2. Pass remaining budget downstream.\n3. Retry only eligible failures safely.\n4. Limit attempts and isolate resources.\n5. Test recovery as well as the open-breaker state.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Three attempts at each of five independent layers can create 3^5 = 243 leaf attempts.\nChoose a single retry owner when possible.\nA timeout after charging must resolve through an idempotency record, not blind recharge.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Deadline propagation, Exponential backoff, Jitter, Retry budgets, Circuit breakers, Bulkheads, Fallback correctness.",
      "A fallback that returns a fabricated success is worse than an honest error for critical operations.",
      "Practice deliverable: Write a retry policy for payment and read-only search separately. Include timeout, retryable failures, maximum attempts, backoff, jitter and the exhausted-budget user response."
    ],
    "commonMistakes": [
      "A fallback that returns a fabricated success is worse than an honest error for critical operations.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Deadline propagation",
      "Exponential backoff",
      "Jitter",
      "Retry budgets",
      "Circuit breakers",
      "Bulkheads",
      "Fallback correctness"
    ],
    "externalLinks": [
      {
        "label": "AWS Builders’ Library — timeouts, retries and jitter",
        "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
      },
      {
        "label": "Google SRE — online book contents",
        "url": "https://sre.google/sre-book/table-of-contents/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Timeouts, Retries, Circuit Breakers & Bulkheads?",
        "options": [
          "Timeouts can leave a side effect’s outcome unknown.",
          "A timeout guarantees the server never executed the request."
        ],
        "answer": 0,
        "explanations": [
          "Timeouts can leave a side effect’s outcome unknown. Use the lesson’s mechanism and failure trace to justify it.",
          "A fallback that returns a fabricated success is worse than an honest error for critical operations."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Deadline propagation",
      "Exponential backoff",
      "Jitter",
      "Retry budgets",
      "Circuit breakers",
      "Bulkheads",
      "Fallback correctness"
    ],
    "practice": "Write a retry policy for payment and read-only search separately. Include timeout, retryable failures, maximum attempts, backoff, jitter and the exhausted-budget user response.",
    "curriculumGroup": "Reliability"
  },
  {
    "id": "observability-and-slos",
    "title": "SLIs, SLOs, Observability & Incidents",
    "difficulty": "medium",
    "definition": "Metrics/logs/traces: Observe user-visible outcomes, not only machine utilization.",
    "coreUnderstanding": "Observe user-visible outcomes, not only machine utilization. An SLI measures behavior and an SLO sets its target over a window. An error budget makes reliability trade-offs explicit. Logs explain individual events, metrics show aggregate trends and traces connect work across services. High-cardinality labels can make telemetry itself expensive and unsafe.",
    "howItWorks": "1. Define good and total eligible events.\n2. Choose a window and measurement boundary.\n3. Track latency and errors by journey.\n4. Alert on actionable user impact.\n5. Run an incident review focused on contributing conditions.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "SLO: 99.9% of eligible requests succeed over 30 days.\nError budget: 0.1% of eligible requests, not a universal fixed downtime allowance.\nExclude only documented cases; hiding failures from the denominator changes the promise.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Metrics/logs/traces, Latency distributions, Error budgets, Burn-rate alerts, Cardinality, Incident response, Postmortems.",
      "Never put access tokens or unrestricted personal data into logs or metric labels.",
      "Practice deliverable: Define availability and p95 latency SLIs for checkout. List what a payment timeout counts as, how retries are represented and which alert would wake an operator."
    ],
    "commonMistakes": [
      "Never put access tokens or unrestricted personal data into logs or metric labels.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Metrics/logs/traces",
      "Latency distributions",
      "Error budgets",
      "Burn-rate alerts",
      "Cardinality",
      "Incident response",
      "Postmortems"
    ],
    "externalLinks": [
      {
        "label": "Google SRE — online book contents",
        "url": "https://sre.google/sre-book/table-of-contents/"
      },
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for SLIs, SLOs, Observability & Incidents?",
        "options": [
          "SLOs should measure user-visible outcomes at a stated boundary.",
          "High CPU alone proves users are experiencing errors."
        ],
        "answer": 0,
        "explanations": [
          "SLOs should measure user-visible outcomes at a stated boundary. Use the lesson’s mechanism and failure trace to justify it.",
          "Never put access tokens or unrestricted personal data into logs or metric labels."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Metrics/logs/traces",
      "Latency distributions",
      "Error budgets",
      "Burn-rate alerts",
      "Cardinality",
      "Incident response",
      "Postmortems"
    ],
    "practice": "Define availability and p95 latency SLIs for checkout. List what a payment timeout counts as, how retries are represented and which alert would wake an operator.",
    "curriculumGroup": "Reliability"
  },
  {
    "id": "disaster-recovery",
    "title": "Durability, Backups & Disaster Recovery",
    "difficulty": "medium",
    "definition": "RPO/RTO: Durability is the promise that acknowledged data survives specified failures.",
    "coreUnderstanding": "Durability is the promise that acknowledged data survives specified failures. Recovery point objective states tolerated data loss; recovery time objective states tolerated restoration time. Replication spreads some failures but also propagates logical corruption and deletes. Backups are useful only when a tested restore produces consistent application state, keys and dependent data within the required time.",
    "howItWorks": "1. List failure domains and loss scenarios.\n2. Set RPO and RTO per critical dataset.\n3. Choose snapshots and log retention.\n4. Restore into an isolated environment.\n5. Reconcile keys, schemas and dependencies before declaring recovery.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "RPO: at most 5 minutes of committed changes may be lost.\nRTO: restore service within 60 minutes.\nA backup job reporting success does not prove either target.\nMeasure a full restore and verify application invariants.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: RPO/RTO, Point-in-time restore, Failure domains, Multi-zone/region, Backup validation, Game days, Data deletion.",
      "Cross-region replicas do not automatically provide zero data loss and zero downtime.",
      "Practice deliverable: Write a restore drill for accidental table deletion. Specify backup age, log availability, encryption-key recovery, validation queries and when traffic may be resumed."
    ],
    "commonMistakes": [
      "Cross-region replicas do not automatically provide zero data loss and zero downtime.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "RPO/RTO",
      "Point-in-time restore",
      "Failure domains",
      "Multi-zone/region",
      "Backup validation",
      "Game days",
      "Data deletion"
    ],
    "externalLinks": [
      {
        "label": "Google SRE — online book contents",
        "url": "https://sre.google/sre-book/table-of-contents/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Durability, Backups & Disaster Recovery?",
        "options": [
          "Recovery targets must be validated through restore drills.",
          "A successful backup job proves the application can restore."
        ],
        "answer": 0,
        "explanations": [
          "Recovery targets must be validated through restore drills. Use the lesson’s mechanism and failure trace to justify it.",
          "Cross-region replicas do not automatically provide zero data loss and zero downtime."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "RPO/RTO",
      "Point-in-time restore",
      "Failure domains",
      "Multi-zone/region",
      "Backup validation",
      "Game days",
      "Data deletion"
    ],
    "practice": "Write a restore drill for accidental table deletion. Specify backup age, log availability, encryption-key recovery, validation queries and when traffic may be resumed.",
    "curriculumGroup": "Reliability"
  },
  {
    "id": "security-and-privacy",
    "title": "Threat Modeling, Authentication, Authorization & Privacy",
    "difficulty": "medium",
    "definition": "Trust boundaries: Authentication establishes a claimed identity; authorization decides whether that identity may act on this object now.",
    "coreUnderstanding": "Authentication establishes a claimed identity; authorization decides whether that identity may act on this object now. Threat modeling follows data across trust boundaries and asks what an attacker can control. Encryption does not fix broken object-level access control. Protect secrets, minimize sensitive data and plan deletion across primary storage, caches, indexes and retained backups under a documented policy.",
    "howItWorks": "1. Identify assets, actors and entry points.\n2. Mark trust boundaries.\n3. Enforce authorization server-side for every object.\n4. Rotate credentials and restrict service privileges.\n5. Test abuse, replay and data-retention rules.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "GET /accounts/123\nValidate session, then verify caller access to account 123.\nDo not trust an account ID or role supplied by the browser.\nLogs redact tokens and sensitive fields.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Trust boundaries, Sessions/OAuth/OIDC, Authorization, TLS and key rotation, Secrets, Injection, Abuse, Privacy lifecycle.",
      "CORS is a browser access policy, not a replacement for server-side authorization.",
      "Practice deliverable: Threat-model a document-sharing service. Test a guessed document ID, leaked URL, revoked collaborator, expired session and retry of an old signed request."
    ],
    "commonMistakes": [
      "CORS is a browser access policy, not a replacement for server-side authorization.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Trust boundaries",
      "Sessions/OAuth/OIDC",
      "Authorization",
      "TLS and key rotation",
      "Secrets",
      "Injection",
      "Abuse",
      "Privacy lifecycle"
    ],
    "externalLinks": [
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Threat Modeling, Authentication, Authorization & Privacy?",
        "options": [
          "Authorization must be enforced for the requested object.",
          "Knowing an object ID proves permission to read it."
        ],
        "answer": 0,
        "explanations": [
          "Authorization must be enforced for the requested object. Use the lesson’s mechanism and failure trace to justify it.",
          "CORS is a browser access policy, not a replacement for server-side authorization."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Trust boundaries",
      "Sessions/OAuth/OIDC",
      "Authorization",
      "TLS and key rotation",
      "Secrets",
      "Injection",
      "Abuse",
      "Privacy lifecycle"
    ],
    "practice": "Threat-model a document-sharing service. Test a guessed document ID, leaked URL, revoked collaborator, expired session and retry of an old signed request.",
    "curriculumGroup": "Security"
  },
  {
    "id": "deployment-and-evolution",
    "title": "Deployment, Migrations & Architecture Evolution",
    "difficulty": "medium",
    "definition": "Monolith/modular monolith/services: Deployment changes a live system while old and new versions may coexist.",
    "coreUnderstanding": "Deployment changes a live system while old and new versions may coexist. Use backward-compatible contracts and expand/backfill/contract database migrations so neither version assumes an exclusive schema. Rollback is a tested operation, not just redeploying old code after irreversible data changes. Services are useful where independent ownership and scaling justify network, observability and consistency costs.",
    "howItWorks": "1. Choose a boundary from ownership and change patterns.\n2. Make API and schema changes compatible.\n3. Deploy to a limited cohort.\n4. Observe user impact and data health.\n5. Roll back or roll forward using an explicit decision rule.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Expand: add nullable new column.\nBackfill: populate old rows with bounded batches.\nMigrate readers/writers while versions coexist.\nContract: remove old column only after compatibility window closes.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Monolith/modular monolith/services, Containers, Orchestration concepts, Canary/blue-green, Feature flags, Schema evolution, Rollback.",
      "Blue-green compute deployment cannot automatically undo a destructive database migration.",
      "Practice deliverable: Plan a username-to-user-ID migration with two application versions running together. Include validation, rollback limits and when old fields can safely be removed."
    ],
    "commonMistakes": [
      "Blue-green compute deployment cannot automatically undo a destructive database migration.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Monolith/modular monolith/services",
      "Containers",
      "Orchestration concepts",
      "Canary/blue-green",
      "Feature flags",
      "Schema evolution",
      "Rollback"
    ],
    "externalLinks": [
      {
        "label": "Google SRE — online book contents",
        "url": "https://sre.google/sre-book/table-of-contents/"
      },
      {
        "label": "PostgreSQL — transaction isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Deployment, Migrations & Architecture Evolution?",
        "options": [
          "Old and new versions may need to share a compatible schema.",
          "Redeploying old code reverses every database change."
        ],
        "answer": 0,
        "explanations": [
          "Old and new versions may need to share a compatible schema. Use the lesson’s mechanism and failure trace to justify it.",
          "Blue-green compute deployment cannot automatically undo a destructive database migration."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Monolith/modular monolith/services",
      "Containers",
      "Orchestration concepts",
      "Canary/blue-green",
      "Feature flags",
      "Schema evolution",
      "Rollback"
    ],
    "practice": "Plan a username-to-user-ID migration with two application versions running together. Include validation, rollback limits and when old fields can safely be removed.",
    "curriculumGroup": "Delivery"
  },
  {
    "id": "search-and-stream-processing",
    "title": "Search, Analytics & Stream Processing",
    "difficulty": "medium",
    "definition": "Inverted indexes: A search index is a derived retrieval structure, not usually the transaction system of record.",
    "coreUnderstanding": "A search index is a derived retrieval structure, not usually the transaction system of record. Asynchronous indexing introduces freshness lag and deletion propagation requirements. Stream processors distinguish event time from processing time; watermarks express assumptions about lateness, not proof that no older event will arrive. Windows need explicit late-event and correction policies.",
    "howItWorks": "1. Define query and freshness expectations.\n2. Choose the authoritative store.\n3. Publish changes with replayable identity.\n4. Specify windows, late data and deduplication.\n5. Rebuild derived indexes and reconcile deletions.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Order committed at 10:00; indexing completes at 10:00:05.\nAn immediate search may not show it.\nA stream window closing at a watermark needs a late-event policy.\nRevenue aggregates must not double-count replays.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Inverted indexes, Ranking, CDC pipelines, Batch versus stream, Event time/watermarks, Deduplication, Data warehouse.",
      "“Real time” must be translated into a freshness target and failure behavior.",
      "Practice deliverable: Design product search with a database source of truth. Specify CDC outage recovery, index rebuild, access filtering and how deleted products disappear from results."
    ],
    "commonMistakes": [
      "“Real time” must be translated into a freshness target and failure behavior.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Inverted indexes",
      "Ranking",
      "CDC pipelines",
      "Batch versus stream",
      "Event time/watermarks",
      "Deduplication",
      "Data warehouse"
    ],
    "externalLinks": [
      {
        "label": "The Google File System — original paper",
        "url": "https://research.google/pubs/the-google-file-system/"
      },
      {
        "label": "Dynamo — original SOSP 2007 paper",
        "url": "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Search, Analytics & Stream Processing?",
        "options": [
          "Search-index freshness can lag the authoritative database.",
          "A watermark proves no late event can ever arrive."
        ],
        "answer": 0,
        "explanations": [
          "Search-index freshness can lag the authoritative database. Use the lesson’s mechanism and failure trace to justify it.",
          "“Real time” must be translated into a freshness target and failure behavior."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Inverted indexes",
      "Ranking",
      "CDC pipelines",
      "Batch versus stream",
      "Event time/watermarks",
      "Deduplication",
      "Data warehouse"
    ],
    "practice": "Design product search with a database source of truth. Specify CDC outage recovery, index rebuild, access filtering and how deleted products disappear from results.",
    "curriculumGroup": "Specialized systems"
  },
  {
    "id": "object-storage-and-media",
    "title": "Object Storage, Uploads & Media Delivery",
    "difficulty": "medium",
    "definition": "Metadata versus blobs: Large binary objects usually belong in blob storage while a database tracks metadata and lifecycle.",
    "coreUnderstanding": "Large binary objects usually belong in blob storage while a database tracks metadata and lifecycle. A signed upload URL grants limited authority; it must constrain object destination and expiration, with validation after upload. Multi-part uploads can leave orphaned data. Media processing is asynchronous and should expose pending, ready and failed states rather than pretending transcoding is instantaneous.",
    "howItWorks": "1. Create pending metadata and scoped upload permission.\n2. Validate size/type/checksum and ownership.\n3. Commit a durable completion state.\n4. Queue idempotent transformations.\n5. Expire orphaned uploads and propagate deletion.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Asset states: pending → uploaded → processing → ready\nFailures have explicit retry/failed states.\nOnly serve a variant when its object exists and metadata permits access.\nAn upload timeout may leave a stored object requiring reconciliation.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Metadata versus blobs, Multipart uploads, Signed URLs, Checksums, Transcoding, CDN, Garbage collection.",
      "Never trust a file extension or client-reported MIME type as the only validation.",
      "Practice deliverable: Design resumable photo upload with private access. Specify signed URL scope, size limits, checksums, duplicate completion events and cleanup after a client disappears."
    ],
    "commonMistakes": [
      "Never trust a file extension or client-reported MIME type as the only validation.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Metadata versus blobs",
      "Multipart uploads",
      "Signed URLs",
      "Checksums",
      "Transcoding",
      "CDN",
      "Garbage collection"
    ],
    "externalLinks": [
      {
        "label": "The Google File System — original paper",
        "url": "https://research.google/pubs/the-google-file-system/"
      },
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Object Storage, Uploads & Media Delivery?",
        "options": [
          "Media readiness should be modeled as an asynchronous state.",
          "A signed URL can safely grant unlimited permanent write access."
        ],
        "answer": 0,
        "explanations": [
          "Media readiness should be modeled as an asynchronous state. Use the lesson’s mechanism and failure trace to justify it.",
          "Never trust a file extension or client-reported MIME type as the only validation."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Metadata versus blobs",
      "Multipart uploads",
      "Signed URLs",
      "Checksums",
      "Transcoding",
      "CDN",
      "Garbage collection"
    ],
    "practice": "Design resumable photo upload with private access. Specify signed URL scope, size limits, checksums, duplicate completion events and cleanup after a client disappears.",
    "curriculumGroup": "Specialized systems"
  },
  {
    "id": "design-url-shortener",
    "title": "Design a URL Shortener",
    "difficulty": "hard",
    "definition": "short codes: A redirect service separates a small write path from a large read path.",
    "coreUnderstanding": "A redirect service separates a small write path from a large read path. Random codes require collision handling; sequential IDs need an enumeration and information-leak analysis. A durable mapping is authoritative and a cache accelerates popular redirects. Decide whether mappings can change before choosing permanent redirect semantics.",
    "howItWorks": "1. Create mapping under a uniqueness constraint.\n2. Read and redirect only allowed schemes.\n3. Cache with an expiry bounded by mapping lifetime.\n4. Reject abuse and audit administration.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "code → destination, owner, expires_at\nCreate retries use caller idempotency keys.\nCollision → retry generation, never overwrite another mapping.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: short codes, redirect lookup, collision policy, expiry, abuse controls.",
      "A hash of a URL still needs a collision and privacy policy.",
      "Practice deliverable: Design a 1,000:1 read/write service, estimate code space and specify expiration, unsafe destination handling and cache invalidation."
    ],
    "commonMistakes": [
      "A hash of a URL still needs a collision and privacy policy.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "short codes",
      "redirect lookup",
      "collision policy",
      "expiry",
      "abuse controls"
    ],
    "externalLinks": [
      {
        "label": "PostgreSQL — transaction isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      },
      {
        "label": "Redis — keys, values and expiration",
        "url": "https://redis.io/docs/latest/develop/using-commands/keyspace/"
      },
      {
        "label": "MDN — HTTP guide",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Design a URL Shortener?",
        "options": [
          "The design must make its failure behavior and invariants explicit.",
          "A component diagram alone proves the design is correct."
        ],
        "answer": 0,
        "explanations": [
          "The design must make its failure behavior and invariants explicit. Use the lesson’s mechanism and failure trace to justify it.",
          "A hash of a URL still needs a collision and privacy policy."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "short codes",
      "redirect lookup",
      "collision policy",
      "expiry",
      "abuse controls"
    ],
    "practice": "Design a 1,000:1 read/write service, estimate code space and specify expiration, unsafe destination handling and cache invalidation.",
    "curriculumGroup": "Worked designs"
  },
  {
    "id": "design-chat",
    "title": "Design Chat & Presence",
    "difficulty": "hard",
    "definition": "WebSockets: Chat combines durable messages with ephemeral presence.",
    "coreUnderstanding": "Chat combines durable messages with ephemeral presence. A WebSocket connection is a transport, not a durability guarantee. Persist a client message ID so reconnect/retry does not create duplicates. Conversation-local sequence or ordering rules are more achievable than a global order across all conversations. Presence is approximate and should expire after missed heartbeats.",
    "howItWorks": "1. Authenticate connection and conversation access.\n2. Persist message and delivery intent.\n3. Fan out to current sessions.\n4. Replay missed messages from durable offsets.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Client sends conversation c, client_message_id m.\nServer deduplicates (sender,m), persists, acknowledges.\nReconnect requests messages after last durable cursor.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: WebSockets, message persistence, fan-out, offline delivery, ordering, presence.",
      "Delivered to a socket is not the same as read by a person.",
      "Practice deliverable: Specify group membership changes, multi-device reads, disconnect during acknowledgement and an offline recipient. Draw separate persistence and presence paths."
    ],
    "commonMistakes": [
      "Delivered to a socket is not the same as read by a person.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "WebSockets",
      "message persistence",
      "fan-out",
      "offline delivery",
      "ordering",
      "presence"
    ],
    "externalLinks": [
      {
        "label": "AWS Builders’ Library — timeouts, retries and jitter",
        "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
      },
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Design Chat & Presence?",
        "options": [
          "The design must make its failure behavior and invariants explicit.",
          "A component diagram alone proves the design is correct."
        ],
        "answer": 0,
        "explanations": [
          "The design must make its failure behavior and invariants explicit. Use the lesson’s mechanism and failure trace to justify it.",
          "Delivered to a socket is not the same as read by a person."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "WebSockets",
      "message persistence",
      "fan-out",
      "offline delivery",
      "ordering",
      "presence"
    ],
    "practice": "Specify group membership changes, multi-device reads, disconnect during acknowledgement and an offline recipient. Draw separate persistence and presence paths.",
    "curriculumGroup": "Worked designs"
  },
  {
    "id": "design-news-feed",
    "title": "Design a News Feed",
    "difficulty": "hard",
    "definition": "Fan-out on write/read: A feed is a personalized materialized view.",
    "coreUnderstanding": "A feed is a personalized materialized view. Fan-out on write buys fast reads at the cost of many writes; fan-out on read makes writes cheap but reads expensive. Hybrid designs treat high-fan-out publishers differently. Ranking and privacy can change after initial materialization, so deletion and access revocation need explicit enforcement.",
    "howItWorks": "1. Define freshness and ranking requirements.\n2. Compare write/read fan-out at estimated scale.\n3. Build stable pagination.\n4. Recheck visibility and handle deletes.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Small publisher → precomputed follower feed IDs.\nVery large publisher → merge recent posts during read.\nReturn cursor tied to ordering/ranking policy.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Fan-out on write/read, celebrity hotspots, ranking, pagination, privacy.",
      "A precomputed feed entry is not permanent permission to view the post.",
      "Practice deliverable: Estimate work for one million followers. Explain duplicate prevention, page stability, blocked users and post deletion after fan-out."
    ],
    "commonMistakes": [
      "A precomputed feed entry is not permanent permission to view the post.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Fan-out on write/read",
      "celebrity hotspots",
      "ranking",
      "pagination",
      "privacy"
    ],
    "externalLinks": [
      {
        "label": "Redis — keys, values and expiration",
        "url": "https://redis.io/docs/latest/develop/using-commands/keyspace/"
      },
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Design a News Feed?",
        "options": [
          "The design must make its failure behavior and invariants explicit.",
          "A component diagram alone proves the design is correct."
        ],
        "answer": 0,
        "explanations": [
          "The design must make its failure behavior and invariants explicit. Use the lesson’s mechanism and failure trace to justify it.",
          "A precomputed feed entry is not permanent permission to view the post."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Fan-out on write/read",
      "celebrity hotspots",
      "ranking",
      "pagination",
      "privacy"
    ],
    "practice": "Estimate work for one million followers. Explain duplicate prevention, page stability, blocked users and post deletion after fan-out.",
    "curriculumGroup": "Worked designs"
  },
  {
    "id": "design-payments",
    "title": "Design Payments & a Ledger",
    "difficulty": "hard",
    "definition": "Idempotency: Money workflows need explicit accounting invariants and auditable state.",
    "coreUnderstanding": "Money workflows need explicit accounting invariants and auditable state. Represent amounts with a stated currency and minor-unit/decimal policy, not binary floating-point assumptions. A double-entry ledger balances entries but still needs correct authorization and transaction isolation. External payment outcomes may remain unknown after timeouts; reconcile using provider identities rather than charging again blindly.",
    "howItWorks": "1. Authenticate and bind idempotency to request.\n2. Persist intent and balanced ledger changes.\n3. Call provider with stable identity.\n4. Process duplicate/out-of-order webhooks.\n5. Reconcile unknown and stuck states.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Payment: created → pending → succeeded OR failed\nA timeout may remain pending.\nLedger entries sum to zero per balanced transaction.\nRefund is a separate auditable operation.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Idempotency, double-entry records, reconciliation, webhooks, unknown outcomes.",
      "This is an educational architecture, not financial compliance certification.",
      "Practice deliverable: Simulate a lost success response, repeated webhook and concurrent refund. Specify a money invariant and the data an operator uses for reconciliation."
    ],
    "commonMistakes": [
      "This is an educational architecture, not financial compliance certification.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Idempotency",
      "double-entry records",
      "reconciliation",
      "webhooks",
      "unknown outcomes"
    ],
    "externalLinks": [
      {
        "label": "PostgreSQL — transaction isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      },
      {
        "label": "AWS Builders’ Library — timeouts, retries and jitter",
        "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
      },
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Design Payments & a Ledger?",
        "options": [
          "The design must make its failure behavior and invariants explicit.",
          "A component diagram alone proves the design is correct."
        ],
        "answer": 0,
        "explanations": [
          "The design must make its failure behavior and invariants explicit. Use the lesson’s mechanism and failure trace to justify it.",
          "This is an educational architecture, not financial compliance certification."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Idempotency",
      "double-entry records",
      "reconciliation",
      "webhooks",
      "unknown outcomes"
    ],
    "practice": "Simulate a lost success response, repeated webhook and concurrent refund. Specify a money invariant and the data an operator uses for reconciliation.",
    "curriculumGroup": "Worked designs"
  },
  {
    "id": "design-ticket-booking",
    "title": "Design Ticket Booking & Inventory",
    "difficulty": "hard",
    "definition": "Reservations: A booking system must prevent more confirmed seats than available.",
    "coreUnderstanding": "A booking system must prevent more confirmed seats than available. Reservations temporarily reduce availability and need authoritative expiry semantics. Payment and inventory are usually different transaction boundaries, so a reservation may expire while payment is pending. Define compensation and customer communication instead of promising an impossible cross-service atomic operation.",
    "howItWorks": "1. Serialize competing reservations at the seat/inventory owner.\n2. Persist a reservation deadline.\n3. Associate payment with reservation identity.\n4. Confirm with an atomic state check.\n5. Refund or reconcile late payments.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Seat: free → held(until T) → sold\nExpired hold can return to free.\nConfirmation must verify the current holder and valid state atomically.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Reservations, expiry, contention, overselling, payment coordination, fairness.",
      "A cache TTL is not by itself an authoritative inventory transaction.",
      "Practice deliverable: Run two buyers against one seat, then delay one payment beyond expiry. Prove the no-oversell invariant and describe the late-payment outcome."
    ],
    "commonMistakes": [
      "A cache TTL is not by itself an authoritative inventory transaction.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Reservations",
      "expiry",
      "contention",
      "overselling",
      "payment coordination",
      "fairness"
    ],
    "externalLinks": [
      {
        "label": "PostgreSQL — transaction isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      },
      {
        "label": "AWS Builders’ Library — timeouts, retries and jitter",
        "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Design Ticket Booking & Inventory?",
        "options": [
          "The design must make its failure behavior and invariants explicit.",
          "A component diagram alone proves the design is correct."
        ],
        "answer": 0,
        "explanations": [
          "The design must make its failure behavior and invariants explicit. Use the lesson’s mechanism and failure trace to justify it.",
          "A cache TTL is not by itself an authoritative inventory transaction."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Reservations",
      "expiry",
      "contention",
      "overselling",
      "payment coordination",
      "fairness"
    ],
    "practice": "Run two buyers against one seat, then delay one payment beyond expiry. Prove the no-oversell invariant and describe the late-payment outcome.",
    "curriculumGroup": "Worked designs"
  },
  {
    "id": "design-file-sync",
    "title": "Design File Storage & Synchronization",
    "difficulty": "hard",
    "definition": "Chunking: File sync separates immutable content chunks from mutable metadata and versions.",
    "coreUnderstanding": "File sync separates immutable content chunks from mutable metadata and versions. Detect concurrent edits with version metadata; last-write-wins is a product policy that can discard meaningful work. Content hashes support integrity and deduplication but need collision and privacy boundaries. Deletion, sharing revocation and device-offline conflicts require explicit lifecycle rules.",
    "howItWorks": "1. Upload verified chunks.\n2. Commit a version referencing complete chunks.\n3. Sync changes from a durable cursor.\n4. Detect conflicts and preserve recoverable versions.\n5. Garbage-collect only unreferenced content.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "File f version 7 is edited independently by devices A and B.\nBoth propose successors to 7.\nStore or surface a conflict rather than silently pretending one edit never happened.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Chunking, metadata, versioning, conflict detection, deduplication, sharing.",
      "Hash equality does not authorize one user to read another user’s private content.",
      "Practice deliverable: Design resume after partial upload, two offline edits, delete-versus-edit and sharing revocation. State who can reference deduplicated chunks."
    ],
    "commonMistakes": [
      "Hash equality does not authorize one user to read another user’s private content.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Chunking",
      "metadata",
      "versioning",
      "conflict detection",
      "deduplication",
      "sharing"
    ],
    "externalLinks": [
      {
        "label": "The Google File System — original paper",
        "url": "https://research.google/pubs/the-google-file-system/"
      },
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Design File Storage & Synchronization?",
        "options": [
          "The design must make its failure behavior and invariants explicit.",
          "A component diagram alone proves the design is correct."
        ],
        "answer": 0,
        "explanations": [
          "The design must make its failure behavior and invariants explicit. Use the lesson’s mechanism and failure trace to justify it.",
          "Hash equality does not authorize one user to read another user’s private content."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Chunking",
      "metadata",
      "versioning",
      "conflict detection",
      "deduplication",
      "sharing"
    ],
    "practice": "Design resume after partial upload, two offline edits, delete-versus-edit and sharing revocation. State who can reference deduplicated chunks.",
    "curriculumGroup": "Worked designs"
  },
  {
    "id": "design-notifications",
    "title": "Design Notifications & Job Scheduling",
    "difficulty": "hard",
    "definition": "Preferences: Notifications are a delivery workflow with user preferences and channel constraints.",
    "coreUnderstanding": "Notifications are a delivery workflow with user preferences and channel constraints. A scheduled time requires a timezone and daylight-saving policy. Delivery retries can duplicate messages; provider acknowledgements do not prove a human saw them. A scheduler needs durable job identity, bounded ownership and recovery after a worker stops.",
    "howItWorks": "1. Persist notification intent and preferences.\n2. Partition due jobs and claim with a safe ownership model.\n3. Apply channel rate limits.\n4. Record attempts and provider identity.\n5. Retry or expire under a documented policy.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Job j: due_at in UTC plus intended zone/policy\nStates: pending → claimed → sent OR retry/failed\nClaim expiry permits recovery, so send must tolerate duplicate execution.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Preferences, channels, deduplication, delayed jobs, time zones, retries.",
      "Do not put sensitive content into a channel the user has not approved.",
      "Practice deliverable: Model a daily 9am reminder across daylight-saving changes. Simulate a worker crash after send but before recording success."
    ],
    "commonMistakes": [
      "Do not put sensitive content into a channel the user has not approved.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Preferences",
      "channels",
      "deduplication",
      "delayed jobs",
      "time zones",
      "retries"
    ],
    "externalLinks": [
      {
        "label": "AWS Builders’ Library — timeouts, retries and jitter",
        "url": "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
      },
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Design Notifications & Job Scheduling?",
        "options": [
          "The design must make its failure behavior and invariants explicit.",
          "A component diagram alone proves the design is correct."
        ],
        "answer": 0,
        "explanations": [
          "The design must make its failure behavior and invariants explicit. Use the lesson’s mechanism and failure trace to justify it.",
          "Do not put sensitive content into a channel the user has not approved."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Preferences",
      "channels",
      "deduplication",
      "delayed jobs",
      "time zones",
      "retries"
    ],
    "practice": "Model a daily 9am reminder across daylight-saving changes. Simulate a worker crash after send but before recording success.",
    "curriculumGroup": "Worked designs"
  },
  {
    "id": "design-video-platform",
    "title": "Design Video Upload & Streaming",
    "difficulty": "hard",
    "definition": "Ingestion: Video upload is a pipeline: durable originals, validation, asynchronous transcoding and published renditions.",
    "coreUnderstanding": "Video upload is a pipeline: durable originals, validation, asynchronous transcoding and published renditions. Adaptive bitrate streaming serves segmented representations and a manifest so clients can adjust quality. An origin must survive cache misses and regional bursts. Entitlement checks, signed delivery and takedown propagation are separate from the media encoding path.",
    "howItWorks": "1. Receive and verify upload.\n2. Schedule bounded transcoding work.\n3. Publish only complete renditions/manifests.\n4. Serve through CDN with access policy.\n5. Monitor startup, rebuffering and processing failures.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Upload → validate → transcode variants → publish manifest\nA failed variant must not make a broken rendition appear ready.\nCDN misses reach an origin with bounded capacity.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Ingestion, transcoding, manifests, adaptive bitrate, CDN, access control.",
      "A CDN improves delivery but does not remove storage, rights or origin-failure requirements.",
      "Practice deliverable: Estimate storage for three renditions, design resumable upload and define behavior for processing failure, a viral video and access revocation."
    ],
    "commonMistakes": [
      "A CDN improves delivery but does not remove storage, rights or origin-failure requirements.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Ingestion",
      "transcoding",
      "manifests",
      "adaptive bitrate",
      "CDN",
      "access control"
    ],
    "externalLinks": [
      {
        "label": "The Google File System — original paper",
        "url": "https://research.google/pubs/the-google-file-system/"
      },
      {
        "label": "Google SRE — online book contents",
        "url": "https://sre.google/sre-book/table-of-contents/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Design Video Upload & Streaming?",
        "options": [
          "The design must make its failure behavior and invariants explicit.",
          "A component diagram alone proves the design is correct."
        ],
        "answer": 0,
        "explanations": [
          "The design must make its failure behavior and invariants explicit. Use the lesson’s mechanism and failure trace to justify it.",
          "A CDN improves delivery but does not remove storage, rights or origin-failure requirements."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Ingestion",
      "transcoding",
      "manifests",
      "adaptive bitrate",
      "CDN",
      "access control"
    ],
    "practice": "Estimate storage for three renditions, design resumable upload and define behavior for processing failure, a viral video and access revocation.",
    "curriculumGroup": "Worked designs"
  },
  {
    "id": "distributed-transactions",
    "title": "Distributed Transactions: 2PC versus Sagas",
    "difficulty": "hard",
    "definition": "Atomic commit: Two-phase commit coordinates an all-or-nothing decision across participants under its recovery model.",
    "coreUnderstanding": "Two-phase commit coordinates an all-or-nothing decision across participants under its recovery model. In the prepare phase, participants promise they can commit; the coordinator then records and communicates a decision. A prepared participant may have to wait when the decision is unavailable. Consensus and atomic commit solve related but different problems. Sagas choose a different business contract: intermediate states and compensations instead of one global atomic transaction.",
    "howItWorks": "1. Identify participants and the transaction boundary.\n2. Trace prepare votes and durable records.\n3. Model coordinator and participant crashes.\n4. Choose recovery and timeout behavior without inventing a decision.\n5. Compare compensation semantics to atomic commit.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Coordinator asks A and B to prepare.\nBoth persist YES; coordinator becomes unreachable before they learn the decision.\nA timeout alone does not let a prepared participant safely choose any outcome.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Atomic commit, Two-phase commit, Coordinator recovery, Blocking, Consensus versus commit, Compensating workflows.",
      "Two-phase commit is not the same algorithm as two-phase locking.",
      "Practice deliverable: Draw a two-participant commit timeline with coordinator failure after prepare. Compare the customer-visible semantics with a reservation-and-refund saga."
    ],
    "commonMistakes": [
      "Two-phase commit is not the same algorithm as two-phase locking.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Atomic commit",
      "Two-phase commit",
      "Coordinator recovery",
      "Blocking",
      "Consensus versus commit",
      "Compensating workflows"
    ],
    "externalLinks": [
      {
        "label": "PostgreSQL — transaction isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      },
      {
        "label": "Raft — paper, talks and visualization",
        "url": "https://raft.github.io/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Distributed Transactions: 2PC versus Sagas?",
        "options": [
          "A prepared participant may block while the commit decision is unavailable.",
          "Two-phase commit and two-phase locking are identical."
        ],
        "answer": 0,
        "explanations": [
          "A prepared participant may block while the commit decision is unavailable. Use the lesson’s mechanism and failure trace to justify it.",
          "Two-phase commit is not the same algorithm as two-phase locking."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Atomic commit",
      "Two-phase commit",
      "Coordinator recovery",
      "Blocking",
      "Consensus versus commit",
      "Compensating workflows"
    ],
    "practice": "Draw a two-participant commit timeline with coordinator failure after prepare. Compare the customer-visible semantics with a reservation-and-refund saga.",
    "curriculumGroup": "Distributed foundations"
  },
  {
    "id": "review-and-capstone",
    "title": "Design Review, Load Testing & Capstone",
    "difficulty": "medium",
    "definition": "Architecture review: A design is a hypothesis that tests and review should challenge.",
    "coreUnderstanding": "A design is a hypothesis that tests and review should challenge. Distinguish offered load from completed throughput, separate warmup from measurement, and record payload distribution, percentiles and error rates. Test dependency slowdown, retries and recovery, not just maximum happy-path QPS. A useful review links every requirement to an observable test or a documented limitation.",
    "howItWorks": "1. Create a requirement-to-test matrix.\n2. Build a small vertical prototype.\n3. Measure under stated workloads.\n4. Inject one dependency failure at a time.\n5. Review cost/security and document unresolved risks.",
    "codeExamples": [
      {
        "lang": "text",
        "code": "Requirement → design decision → validation → observed result\nExample: no duplicate charge → idempotency record → replay after lost response\nRecord hardware, dataset, concurrency, duration and errors with benchmark claims.",
        "output": "Design/reference trace — not executable output.",
        "note": "Work through the trace and failure cases; this is a design exercise, not a production implementation."
      }
    ],
    "marginNotes": [
      "Syllabus: Architecture review, Failure injection, Load-test methodology, Cost review, Privacy review, Capacity validation, Decision records.",
      "A synthetic benchmark is not a production availability certificate.",
      "Practice deliverable: Choose one worked design. Produce requirements, estimates, schema, APIs, architecture, three failure traces, security review, a load-test plan and an explicit list of unproven assumptions."
    ],
    "commonMistakes": [
      "A synthetic benchmark is not a production availability certificate.",
      "Skipping the failure scenario or leaving a requirement unmeasurable."
    ],
    "relatedTopics": [
      "Architecture review",
      "Failure injection",
      "Load-test methodology",
      "Cost review",
      "Privacy review",
      "Capacity validation",
      "Decision records"
    ],
    "externalLinks": [
      {
        "label": "Google SRE — online book contents",
        "url": "https://sre.google/sre-book/table-of-contents/"
      },
      {
        "label": "OWASP — security cheat sheets",
        "url": "https://cheatsheetseries.owasp.org/"
      }
    ],
    "mcqs": [
      {
        "question": "Which statement is correct for Design Review, Load Testing & Capstone?",
        "options": [
          "Validation should connect requirements to observable evidence.",
          "A high happy-path QPS proves all reliability requirements."
        ],
        "answer": 0,
        "explanations": [
          "Validation should connect requirements to observable evidence. Use the lesson’s mechanism and failure trace to justify it.",
          "A synthetic benchmark is not a production availability certificate."
        ],
        "difficulty": "medium"
      }
    ],
    "syllabus": [
      "Architecture review",
      "Failure injection",
      "Load-test methodology",
      "Cost review",
      "Privacy review",
      "Capacity validation",
      "Decision records"
    ],
    "practice": "Choose one worked design. Produce requirements, estimates, schema, APIs, architecture, three failure traces, security review, a load-test plan and an explicit list of unproven assumptions.",
    "curriculumGroup": "Delivery"
  }
];
