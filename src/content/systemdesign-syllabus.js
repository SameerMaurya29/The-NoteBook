export const systemDesignGroups=[
  {
    "title": "Foundations",
    "topics": [
      "systemdesign-basics",
      "requirements-and-constraints",
      "capacity-estimation",
      "networking-and-edge"
    ]
  },
  {
    "title": "Low-level design",
    "topics": [
      "lld-parking-lot",
      "lld-tic-tac-toe",
      "lld-bank-account",
      "solid-and-modeling",
      "design-patterns"
    ]
  },
  {
    "title": "Interfaces",
    "topics": [
      "rest-apis",
      "api-contracts"
    ]
  },
  {
    "title": "Data systems",
    "topics": [
      "data-modeling",
      "transactions-and-isolation",
      "replication-and-failover",
      "partitioning-and-hotspots"
    ]
  },
  {
    "title": "Distributed foundations",
    "topics": [
      "consistency-and-cap",
      "clocks-and-ordering",
      "consensus-and-leases",
      "distributed-transactions"
    ]
  },
  {
    "title": "Async systems",
    "topics": [
      "queues-and-delivery",
      "outbox-sagas-and-cdc"
    ]
  },
  {
    "title": "Performance",
    "topics": [
      "caching",
      "load-balancing",
      "cache-correctness",
      "rate-limiting-and-backpressure"
    ]
  },
  {
    "title": "Reliability",
    "topics": [
      "resilience-and-timeouts",
      "observability-and-slos",
      "disaster-recovery"
    ]
  },
  {
    "title": "Security",
    "topics": [
      "security-and-privacy"
    ]
  },
  {
    "title": "Specialized systems",
    "topics": [
      "search-and-stream-processing",
      "object-storage-and-media"
    ]
  },
  {
    "title": "Worked designs",
    "topics": [
      "design-url-shortener",
      "design-chat",
      "design-news-feed",
      "design-payments",
      "design-ticket-booking",
      "design-file-sync",
      "design-notifications",
      "design-video-platform"
    ]
  },
  {
    "title": "Delivery",
    "topics": [
      "microservices",
      "deployment-and-evolution",
      "review-and-capstone"
    ]
  }
];
export const systemDesignPapers=[
  {
    "id": "dynamo",
    "title": "Dynamo — original SOSP 2007 paper",
    "url": "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf",
    "questions": [
      "Which availability goal drives the design?",
      "Explain virtual nodes, vector clocks and sloppy quorums.",
      "Why does R + W > N alone not prove linearizability?"
    ]
  },
  {
    "id": "raft",
    "title": "Raft — paper, talks and visualization",
    "url": "https://raft.github.io/",
    "questions": [
      "Trace election, replication and commitment separately.",
      "What happens when a minority loses contact?",
      "What assumptions make the safety argument work?"
    ]
  },
  {
    "id": "gfs",
    "title": "The Google File System — original paper",
    "url": "https://research.google/pubs/the-google-file-system/",
    "questions": [
      "Which workload assumptions shape chunk size and append semantics?",
      "Separate master metadata from chunk data paths.",
      "What happens when a replica or master becomes unavailable?"
    ]
  },
  {
    "id": "spanner",
    "title": "Spanner — Google Research publication",
    "url": "https://research.google/pubs/spanner-googles-globally-distributed-database/",
    "questions": [
      "After reading the paper, explain its time-uncertainty model.",
      "Separate transaction, replication and commit-wait concerns.",
      "Which assumptions would not hold in a small deployment?"
    ]
  }
];
export const systemDesignScope="A complete checklist for this defined general-purpose application/distributed-systems curriculum, not every specialized research field. Existing lesson completion keys remain unchanged. Worked designs are educational exercises, not verified production systems.";
