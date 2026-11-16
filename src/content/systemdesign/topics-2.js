// System Design — High-Level Design (HLD) topics.
export default [
  {
    id: "rest-apis",
    title: "REST APIs & API Design",
    difficulty: "medium",
    definition: `REST (Representational State Transfer) is an architectural style for web APIs where resources are identified by URLs and acted on by HTTP methods (GET, POST, PUT, PATCH, DELETE). Good REST design uses nouns for resources, standard methods, proper status codes, and stateless requests.`,
    coreUnderstanding: `REST models everything as RESOURCES (nouns: /users, /orders/123) and uses HTTP METHODS (verbs) to act on them: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE. The principles: stateless (each request carries everything it needs — no server session), resource-oriented (URLs are nouns, not verbs — /users/5 not /getUser?id=5), standard status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error), and content negotiation (JSON via Accept/Content-Type). Good design nests sensibly (/users/5/orders), uses plural nouns for collections, returns the created resource with 201, and versions the API (/v1/users) so changes don't break clients. Idempotency matters: GET, PUT, DELETE are idempotent (repeating gives the same result); POST is not.`,
    howItWorks: `1. RESOURCES: nouns, plural for collections. /users (collection), /users/5 (item), /users/5/orders (nested).
2. METHODS: GET (read, safe/idempotent), POST (create, not idempotent), PUT (full replace, idempotent), PATCH (partial update), DELETE (idempotent).
3. STATUS CODES: 2xx success (200 OK, 201 Created, 204 No Content), 4xx client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable), 5xx server error (500, 502, 503).
4. STATELESS: each request includes all context (auth token, params). The server stores no session between requests — this lets any server handle any request (horizontal scaling).
5. CONTENT: JSON by default; set Content-Type: application/json. Version in the URL (/v1/users) or header.
6. PAGINATION: large collections use ?page=2&limit=20 or cursor-based (?cursor=abc) — never return 100k rows at once.
7. FILTERING/SORTING: ?status=active&sort=-created (query params, not separate endpoints).
8. IDEMPOTENCY: for POST that must be safe to retry (payments), use an Idempotency-Key header so duplicates are detected.
9. ERRORS: return a consistent error body { "error": { "code", "message", "details" } } with the right status code.`,
    codeExamples: [
      {
        lang: "text",
        code: `# Resource-oriented routes (nouns + HTTP methods)
GET    /v1/users          # list users (200)
POST   /v1/users          # create a user (201, return the created user)
GET    /v1/users/5        # fetch one user (200, or 404 if missing)
PUT    /v1/users/5        # replace user 5 (200/204, idempotent)
PATCH  /v1/users/5        # partial update (e.g. just the email)
DELETE /v1/users/5        # delete (204, idempotent)
GET    /v1/users/5/orders # nested: that user's orders

# Query params for filtering, sorting, pagination
GET /v1/users?status=active&sort=-created&page=2&limit=20

# Standard status codes
200 OK            -> successful GET/PUT/PATCH
201 Created       -> successful POST (return the new resource)
204 No Content    -> successful DELETE
400 Bad Request   -> malformed input
401 Unauthorized  -> no/invalid auth token
403 Forbidden     -> authed but not allowed
404 Not Found     -> resource doesn't exist
409 Conflict      -> duplicate / state conflict
422 Unprocessable -> valid syntax but semantic error
500 Internal Error-> server fault

# Idempotency for safe-to-retry POST (e.g. payments)
POST /v1/payments
Idempotency-Key: 7f3a-...   # server returns the same result on retry

# Consistent error body
{ "error": { "code": "USER_NOT_FOUND", "message": "No user with id 5" } }`,
        output: `(API design)`,
        note: "Resources are nouns (plural collections, /users/5); methods are verbs (GET/POST/PUT/PATCH/DELETE). Stateless, standard status codes, JSON, versioned (/v1). Paginate large collections. Use an Idempotency-Key for retry-safe POST like payments."
      }
    ],
    marginNotes: [
      "URLs are NOUNS, methods are VERBS. /users/5 not /getUser?id=5. Plural for collections, nested for sub-resources (/users/5/orders).",
      "Idempotency: GET, PUT, DELETE are idempotent (repeating = same result); POST is NOT. For retry-safe POST (payments), use an Idempotency-Key header so duplicates return the same result.",
      "Use the RIGHT status code: 201 for create (return the new resource), 204 for delete, 404 for missing, 409 for duplicate, 422 for semantic errors. Don't return 200 for everything.",
      "Statelessness enables horizontal scaling: each request carries its own context (auth token), so any server can handle it — no sticky sessions needed."
    ],
    commonMistakes: [
      "Using verbs in URLs (/getUser) instead of nouns (/users).",
      "Returning 200 for every response including errors — use the correct status code.",
      "Not paginating — returning a huge collection in one response instead of ?page&limit or cursor."
    ],
    relatedTopics: ["System Design Basics", "Microservices", "Caching"],
    externalLinks: [
      { label: "REST API Tutorial", url: "https://restfulapi.net/" },
      { label: "HTTP Status Codes (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" }
    ],
    mcqs: [
      {
        question: "Which URL design is RESTful?",
        options: ["/getUser?id=5", "/users/5 (noun resource, method is the verb)", "/getTheUserNow/5", "/userFetch"],
        answer: 1,
        explanations: ["Verbs in URLs aren't RESTful.", "Correct — REST uses nouns for resources (/users, /users/5) and HTTP methods (GET/POST/PUT/DELETE) as the verbs. /getUser encodes the verb in the URL — wrong.", "Verbose verb — wrong.", "Verb-based — wrong."],
        difficulty: "easy"
      },
      {
        question: "Which HTTP methods are idempotent?",
        options: ["Only POST", "GET, PUT, DELETE (repeating gives the same result); POST is not", "Only GET", "POST and PUT"],
        answer: 1,
        explanations: ["POST is NOT idempotent.", "Correct — GET, PUT, DELETE are idempotent (calling them again gives the same result). POST is not (repeating creates duplicates). For retry-safe POST, use an Idempotency-Key.", "PUT and DELETE are too.", "POST is not idempotent."],
        difficulty: "medium"
      },
      {
        question: "What status code for a successful create that returns the new resource?",
        options: ["200 OK", "201 Created (with the new resource in the body)", "204 No Content", "100 Continue"],
        answer: 1,
        explanations: ["200 is for GET/PUT/PATCH success.", "Correct — 201 Created for a successful POST that creates a resource, returning the created resource in the body. 204 is for delete/no-body responses.", "204 has no body — wrong for create.", "100 is informational."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "microservices",
    title: "Microservices Basics",
    difficulty: "medium",
    definition: `Microservices split a monolith into small, independently deployable services, each owning one business capability and its own database. They trade the simplicity of a monolith for independent scaling, deployment, and team autonomy — at the cost of distributed-system complexity.`,
    coreUnderstanding: `A monolith is one codebase doing everything; microservices break it into services (auth, orders, payments, inventory) that communicate over the network (REST/gRPC) or async (message queue). Each service owns its OWN database — no shared tables — so changes to one service's data don't break others. The wins: independent deploy (ship orders without touching payments), independent scale (scale the hot service only), and team autonomy. The costs: network latency and failure, distributed transactions are hard (use saga/outbox), operational complexity (monitoring, tracing), and eventual consistency replaces ACID. The rule of thumb: start monolith, extract services when a capability has different scale or deployment cadence — don't start with microservices on day one. Service discovery, an API gateway, and distributed tracing become essential.`,
    howItWorks: `1. SERVICE: one business capability (orders, payments, users), owned by one team, independently deployable.
2. DATABASE PER SERVICE: each service owns its data; no shared tables. Communicate via API/events, not shared DB queries. This is the hardest rule and the most important.
3. COMMUNICATION: synchronous (REST/HTTP, gRPC) for request-response; asynchronous (Kafka/RabbitMQ) for events and decoupling. Prefer async where you can.
4. API GATEWAY: a single entry point for clients — routing, auth, rate limiting, aggregation. Hides the internal service structure from clients.
5. SERVICE DISCOVERY: services register themselves; clients find them via a registry (Consul, Eureka, K8s DNS) — handles services moving as they scale.
6. DISTRIBUTED TRANSACTIONS: no ACID across services. Use the SAGA pattern (a chain of local transactions with compensating actions) or the outbox pattern (publish events reliably).
7. EVENTUAL CONSISTENCY: services are eventually consistent, not immediately. Design for it (idempotent consumers, reconciliation).
8. RESILIENCE: retry with backoff, circuit breakers (stop calling a failing service), timeouts, bulkheads (limit concurrent calls). Failures WILL happen — design for them.
9. OBSERVABILITY: distributed tracing (one trace ID across services), centralized logs, metrics per service. You can't debug a distributed system with per-service logs alone.
10. WHEN TO SPLIT: start monolith; extract a service when it has a different scale, deployment cadence, or team boundary. Premature splitting adds complexity for no gain.`,
    codeExamples: [
      {
        lang: "text",
        code: `# Monolith vs microservices (e-commerce)
Monolith: one app -> Users, Orders, Payments, Inventory (shared DB)
Microservices:
  User Service     -> its own DB (users)
  Order Service    -> its own DB (orders)
  Payment Service  -> its own DB (payments)
  Inventory Service-> its own DB (stock)
  API Gateway -> clients -> gateway -> routes to services

# Placing an order (saga — distributed transaction)
1. Order Service: create order (PENDING) -> publish OrderCreated
2. Payment Service: charge card -> publish PaymentSucceeded (or Failed)
3. Inventory Service: reserve stock -> publish StockReserved (or Failed)
4. Order Service: on all-succeeded -> mark CONFIRMED; on any failure
   -> compensating actions: refund payment, release stock, cancel order

# Communication choices
- Order -> Payment: REST (need the result now) OR async event (decouple)
- OrderCreated event: Kafka (inventory & notifications consume async)

# Resilience defaults
- timeout: 2s per call (don't hang forever)
- retry: 3 attempts with exponential backoff
- circuit breaker: if Payment fails 50% in a window, stop calling for 30s
- bulkhead: limit 20 concurrent calls to Inventory so it can't be exhausted`,
        output: `(architecture sketch)`,
        note: "Each service owns one capability AND its own database (no shared tables). Communicate via REST/gRPC (sync) or Kafka (async). Use an API gateway, saga for distributed transactions, circuit breakers for resilience, and distributed tracing. Start monolith; split on real boundaries."
      }
    ],
    marginNotes: [
      "The hardest and most important rule: each service owns its OWN database — no shared tables. Services communicate via API/events, never by reading another service's tables. Shared DB = coupled services = not microservices.",
      "Prefer ASYNC communication (Kafka/RabbitMQ events) where you can — it decouples services and survives downstream failures. Use sync (REST/gRPC) only when you need the result immediately.",
      "Distributed transactions can't be ACID across services. Use the SAGA pattern: a chain of local transactions, each with a COMPENSATING action to undo on failure (refund payment, release stock).",
      "Don't start with microservices on day one. Start monolith, extract a service when it has a different scale, deployment cadence, or team boundary. Premature splitting adds complexity for no gain."
    ],
    commonMistakes: [
      "Sharing a database between services — that's a distributed monolith, not microservices.",
      "Using synchronous calls everywhere — cascading failures when a downstream service is slow. Add circuit breakers and prefer async.",
      "Starting with microservices on day one — premature complexity. Start monolith, split on real boundaries."
    ],
    relatedTopics: ["System Design Basics", "REST APIs", "Load Balancing"],
    externalLinks: [
      { label: "Microservices (Martin Fowler)", url: "https://martinfowler.com/articles/microservices.html" }
    ],
    mcqs: [
      {
        question: "What's the key data rule in microservices?",
        options: ["All services share one database", "Each service owns its own database — no shared tables", "No databases at all", "One database per team, shared"],
        answer: 1,
        explanations: ["Sharing a DB couples services — that's a distributed monolith.", "Correct — each service owns its data and no service reads another's tables. They communicate via API/events. This is the hardest and most important rule; sharing a DB gives you a distributed monolith.", "Services need persistence.", "Sharing couples them."],
        difficulty: "medium"
      },
      {
        question: "How are distributed transactions handled across services?",
        options: ["ACID transactions spanning services", "The SAGA pattern — a chain of local transactions with compensating actions on failure", "Two-phase commit everywhere", "Ignore consistency"],
        answer: 1,
        explanations: ["ACID doesn't work across services.", "Correct — SAGA: each service does a local transaction, and on any failure, compensating actions undo prior steps (refund payment, release stock). Two-phase commit is slow and brittle across services.", "2PC is too slow/brittle for microservices.", "You can't ignore consistency."],
        difficulty: "hard"
      },
      {
        question: "When should you extract a service from a monolith?",
        options: ["On day one", "When it has a different scale, deployment cadence, or team boundary", "Never", "When the code exceeds 100 lines"],
        answer: 1,
        explanations: ["Premature — adds complexity for no gain.", "Correct — extract a service when it has a genuinely different scale, deployment cadence, or team boundary. Premature splitting adds operational complexity without the benefits.", "You should, when there's a real boundary.", "Line count isn't a boundary."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "caching",
    title: "Caching",
    difficulty: "medium",
    definition: `Caching stores recently-used data in fast memory (RAM) so repeated reads skip the slow database. It's the single biggest latency win in most systems. The core decisions are what to cache, where (CDN, app, DB), and how to keep it consistent and bounded.`,
    coreUnderstanding: `A cache is a fast, small store in front of a slow, large store. Reading from RAM (Redis, in-memory) is ~100× faster than from a database disk. You cache the results of expensive reads (a user profile, a hot product, a computed feed) so the next request hits the cache instead of the DB. The wins: lower latency and less DB load. The costs: STALE data (the cache may lag the DB) and CACHE MISSES on first load. The two big decisions: (1) EVICTION — when the cache is full, what do you remove? LRU (least recently used) is the default; LFU for hot-key workloads; TTL for time-bounded freshness. (2) CONSISTENCY — write-through (update cache on every write), write-behind (update cache, async-write to DB), or cache-aside (app manages cache on read miss). Cache-aside + TTL is the most common pattern. Watch for thundering herd (a miss triggers many rebuilds) and cache stampede.`,
    howItWorks: `1. CACHE-ASIDE (most common): on read, check cache; on miss, read DB, write cache, return. On write, update DB and invalidate (delete) the cache entry. Next read repopulates.
2. WRITE-THROUGH: write to cache AND DB together (cache always fresh, slower writes).
3. WRITE-BEHIND: write to cache first, async-write to DB later (fast writes, risk of data loss on crash).
4. EVICTION POLICIES: LRU (evict least recently used — default), LFU (evict least frequently used — for stable hot keys), FIFO, TTL (evict after a time). Most caches combine LRU + TTL.
5. TTL: every entry expires after a time, bounding staleness. Set per data type (user profile 5 min, stock price 1s).
6. CDN: caches STATIC content (images, JS, HTML) at edge locations globally — closest to the user. Cloudflare, CloudFront.
7. APP CACHE: Redis/Memcached next to the service — caches DB rows, computed results, sessions.
8. DB CACHE: the database's own buffer pool caches hot pages.
9. THUNDERING HERD: a popular key expires -> many requests miss and rebuild simultaneously. Fix with a lock (one rebuild) or early refresh (refresh before expiry).
10. CONSISTENCY: accept eventual consistency for cached data (TTL bounds staleness). For strong consistency, invalidate on write or use write-through.
11. HIT RATE: ratio of reads served from cache. 80%+ is good; target the hot 20% of data (the 80/20 rule).`,
    codeExamples: [
      {
        lang: "text",
        code: `# Cache-aside (the most common pattern)
def get_user(id):
    val = cache.get(f"user:{id}")     # 1. check cache
    if val: return val                  # hit -> return
    val = db.query("SELECT ...", id)   # 2. miss -> read DB
    cache.set(f"user:{id}", val, ttl=300)  # 3. populate, TTL 5 min
    return val

def update_user(id, data):
    db.update("users", id, data)        # 1. write DB
    cache.delete(f"user:{id}")         # 2. invalidate cache (next read repopulates)

# Eviction: Redis with LRU + TTL
# SET user:5 "..." EX 300   (expires in 300s; LRU evicts the least
#                            recently used when memory is full)

# CDN: static assets at the edge
# user -> Cloudflare (edge) -> origin server (only on miss)
# Cache-Control: public, max-age=3600  (browser + CDN cache 1 hour)

# Thundering herd fix: lock on a hot-key miss
def get_hot(key):
    val = cache.get(key)
    if val: return val
    if lock.try(key):                  # only one rebuilds
        val = db.expensive_read(key)
        cache.set(key, val, ttl=60)
        lock.release(key)
        return val
    sleep(0.05); return get_hot(key)   # others wait and retry

# Hit rate target: cache the hot 20% (80/20 rule) -> ~80% hit rate`,
        output: `(caching patterns)`,
        note: "Cache-aside: read checks cache, on miss read DB + populate, with TTL. Invalidate (delete) on write. Evict with LRU + TTL. Use a CDN for static edge caching. Guard the thundering herd with a lock on hot-key rebuilds."
      }
    ],
    marginNotes: [
      "Cache-aside + TTL is the most common pattern: read checks the cache, on miss read DB and populate, set a TTL; on write, update DB and DELETE the cache entry (next read repopulates).",
      "Eviction: LRU (least recently used) is the default; combine with TTL so entries expire even if not evicted. LFU suits stable hot keys; TTL bounds staleness for time-sensitive data.",
      "Use a CDN (Cloudflare/CloudFront) for STATIC content — it caches at edge locations globally, closest to each user. Use Redis/Memcached for dynamic DB-row caching next to your service.",
      "Guard the THUNDERING HERD: when a hot key expires, many requests miss and rebuild at once. Use a lock so only one request rebuilds; others wait. Or refresh slightly before expiry."
    ],
    commonMistakes: [
      "Caching without a TTL — stale data forever. Always set a TTL bounded to acceptable staleness.",
      "Updating the DB but forgetting to invalidate the cache — stale reads until TTL.",
      "Not handling the thundering herd — a hot-key expiry triggers many simultaneous rebuilds, hammering the DB."
    ],
    relatedTopics: ["System Design Basics", "REST APIs", "Load Balancing"],
    externalLinks: [
      { label: "Caching (System Design Primer)", url: "https://github.com/donnemartin/system-design-primer#cache" }
    ],
    mcqs: [
      {
        question: "In cache-aside, what do you do on a write?",
        options: ["Only update the cache", "Update the DB and invalidate (delete) the cache entry — the next read repopulates it", "Nothing", "Delete the DB row"],
        answer: 1,
        explanations: ["Only updating the cache leaves the DB stale.", "Correct — write to the DB, then DELETE the cache entry. The next read misses and repopulates from the fresh DB. Updating the cache directly risks a stale write race.", "That leaves stale cache.", "That's a delete, not a write."],
        difficulty: "medium"
      },
      {
        question: "What's the default eviction policy and why pair it with TTL?",
        options: ["FIFO alone", "LRU + TTL — LRU evicts the least recently used when full; TTL bounds staleness even for active keys", "Random", "Evict the newest"],
        answer: 1,
        explanations: ["FIFO is rarely best.", "Correct — LRU evicts the least recently used when the cache is full; TTL ensures entries expire even if they stay 'recent'. Together they bound both size and staleness.", "Random is wasteful.", "Newest-first defeats caching."],
        difficulty: "medium"
      },
      {
        question: "What problem does the thundering-herd lock solve?",
        options: ["Stale data", "A hot key expires and many requests rebuild it at once, hammering the DB — a lock lets only one rebuild", "Cache too small", "Network latency"],
        answer: 1,
        explanations: ["Staleness is a TTL issue.", "Correct — when a popular key expires, many requests miss simultaneously and all rebuild, overloading the DB. A lock lets one request rebuild while others wait.", "Size is an eviction issue.", "Latency is separate."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "load-balancing",
    title: "Load Balancing",
    difficulty: "medium",
    definition: `A load balancer distributes incoming traffic across multiple servers so no single server is overwhelmed and the system stays available if one fails. It's the front door of any scaled service, choosing a server per request by an algorithm (round-robin, least connections, hash) and health-checking servers to route only to healthy ones.`,
    coreUnderstanding: `A load balancer (LB) sits between clients and a pool of servers, spreading requests so each server gets a fair share and a failing server is automatically skipped. The algorithms: ROUND-ROBIN (rotate through servers — simple, even), LEAST CONNECTIONS (send to the server with the fewest active requests — best when requests vary in length), IP/RESOURCE HASH (hash the client IP or a resource id so the same client always hits the same server — useful for sticky sessions or cache locality), and WEIGHTED variants (more powerful servers get more traffic). Health checks ping servers periodically; unhealthy servers are removed from the pool until they recover. LBs can be L4 (transport — TCP/UDP, fast, content-blind) or L7 (application — HTTP, can route by URL/header). For global scale, DNS + geo-routing sends users to the nearest region; within a region, an LB spreads across servers. Redundant LBs (active-passive or active-active) avoid the LB itself being a single point of failure.`,
    howItWorks: `1. ROUND-ROBIN: rotate through servers in order. Simple, even distribution. Bad if requests vary a lot in cost.
2. LEAST CONNECTIONS: send to the server with the fewest active connections. Best when request lengths vary.
3. IP HASH: hash the client IP -> same client always goes to the same server (sticky). Good for session locality.
4. RESOURCE HASH: hash a resource id (e.g. video id) -> same resource on the same server (cache locality).
5. WEIGHTED: assign weights — a 4-core server gets 2× the traffic of a 2-core one.
6. HEALTH CHECKS: the LB pings each server (HTTP /health) every few seconds; unhealthy servers are removed from the pool until they pass again.
7. L4 vs L7: L4 (transport layer) balances TCP/UDP — fast, content-blind. L7 (application layer) balances HTTP — can route by URL path, host, header (e.g. /api -> api service, /images -> image service).
8. STICKY SESSIONS: route a user's requests to the same server (via cookie or IP hash) — needed when session state is on the server (prefer stateless instead).
9. GLOBAL: DNS-based geo-routing (Route 53) sends users to the nearest region; a regional LB then spreads across local servers.
10. REDUNDANCY: the LB itself must not be a single point of failure — run active-passive or active-active pairs with a floating IP.
11. SSL TERMINATION: the LB decrypts HTTPS so backend servers handle plain HTTP (offloads crypto from app servers).`,
    codeExamples: [
      {
        lang: "text",
        code: `# Clients -> Load Balancer -> pool of servers
client1 ---\\
client2 ---  +--> [ LOAD BALANCER ] --> server1, server2, server3 (healthy)
client3 ---/                         (server4: UNHEALTHY -> skipped)

# Algorithms
round-robin:        c1->s1, c2->s2, c3->s3, c4->s1, ... (rotate)
least-connections:  send to the server with fewest active requests
ip-hash:            hash(clientIP) % N -> same client always to same server
weighted:           s1(weight3), s2(weight1) -> 3:1 traffic split

# Health check
LB pings GET /health on each server every 5s
  200 -> healthy (keep in pool)
  fail 3x -> mark unhealthy (remove from pool)
  recover -> mark healthy (return to pool)

# L4 vs L7
L4 (TCP): balance raw TCP — fast, can't see URL
L7 (HTTP): route by URL -> /api/* to api-service, /img/* to image-service

# Global: DNS geo-routing
user in EU -> DNS returns EU region LB IP -> EU servers
user in US -> DNS returns US region LB IP -> US servers

# SSL termination
client --HTTPS--> LB (decrypts) --HTTP--> backend (no crypto overhead on app)`,
        output: `(LB architecture)`,
        note: "An LB spreads traffic across a server pool by an algorithm (round-robin, least-connections, IP-hash, weighted) and health-checks servers, skipping unhealthy ones. L4 is fast/content-blind; L7 routes by URL/header. Geo-DNS for global; redundant LBs to avoid SPOF."
      }
    ],
    marginNotes: [
      "Pick the algorithm by your traffic: round-robin for even simple loads, LEAST CONNECTIONS when request lengths vary, IP/RESOURCE HASH for sticky sessions or cache locality.",
      "Health checks are non-negotiable: the LB pings each server (e.g. GET /health) and removes unhealthy ones from the pool automatically. Without this, the LB keeps sending traffic to a dead server.",
      "L4 (transport) is fast but content-blind; L7 (HTTP) can route by URL/host/header (e.g. /api to one service, /images to another). Use L7 when you need content-based routing.",
      "The LB itself must not be a single point of failure — run redundant LBs (active-passive or active-active) with a floating IP. And prefer stateless servers over sticky sessions."
    ],
    commonMistakes: [
      "Using round-robin when request costs vary a lot — least-connections is better there.",
      "No health checks — the LB keeps routing to a dead server.",
      "Making the LB a single point of failure — run redundant LBs."
    ],
    relatedTopics: ["System Design Basics", "Microservices", "Caching"],
    externalLinks: [
      { label: "Load Balancing (System Design Primer)", url: "https://github.com/donnemartin/system-design-primer#load-balancer" }
    ],
    mcqs: [
      {
        question: "Which algorithm is best when request lengths vary a lot?",
        options: ["Round-robin", "Least connections (sends to the server with the fewest active requests)", "Random", "First-available"],
        answer: 1,
        explanations: ["Round-robin can overload a server stuck on long requests.", "Correct — least-connections sends each new request to the server with the fewest active requests, naturally balancing uneven workloads. Round-robin is blind to in-flight load.", "Random ignores load.", "First-available ignores load."],
        difficulty: "medium"
      },
      {
        question: "Why are health checks essential?",
        options: ["They speed up the LB", "Without them, the LB keeps routing to a dead server — health checks remove unhealthy servers from the pool", "They encrypt traffic", "They cache responses"],
        answer: 1,
        explanations: ["They don't speed it up.", "Correct — the LB pings each server (e.g. GET /health) and removes any that fail from the pool, so traffic only goes to healthy servers. Without this, a dead server keeps getting requests and they fail.", "That's SSL termination.", "That's caching, not health checks."],
        difficulty: "easy"
      },
      {
        question: "L4 vs L7 load balancing — what's the difference?",
        options: ["L4 is faster; L7 is slower", "L4 balances TCP/UDP (content-blind); L7 balances HTTP and can route by URL/host/header", "L4 is newer", "L7 is only for databases"],
        answer: 1,
        explanations: ["Speed is a symptom, not the definition.", "Correct — L4 (transport layer) balances raw TCP/UDP and can't see the URL; L7 (application layer) inspects HTTP and routes by URL, host, or header (e.g. /api to one service, /images to another).", "L4 is the older/simpler one.", "L7 is for HTTP, not DBs."],
        difficulty: "medium"
      }
    ]
  }
];