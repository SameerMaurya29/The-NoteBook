// Computer Networks — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "domain-basics",
  title: "Networks Basics — Why & How",
  difficulty: "easy",
  definition: `Computer Networks is the study of how data moves between machines. You learn it because every modern app talks over a network — web requests, APIs, databases, messaging — and understanding the layers explains latency, failures, security, and how to design distributed systems.`,
  coreUnderstanding: `Networking is layered: each layer solves one problem and hands data to the next. The OSI model has 7 layers (Physical → Data Link → Network → Transport → Session → Presentation → Application); the internet runs on the simpler TCP/IP model. You don't memorize all 7 — you internalize the big three you actually use: IP (addresses and routing — "where"), TCP/UDP (transport — reliable vs fast), and HTTP (application — "what"). You learn networks to debug why a request is slow, to design APIs, to secure traffic (TLS), and to answer interview questions about how the internet works.`,
  howItWorks: `1. WHY: every app is distributed. Understanding networks explains latency, failures, security, and how to design APIs and distributed systems.
2. WHERE: web/mobile backends, APIs, microservices, databases-over-the-wire, real-time apps, interviews.
3. THE LAYERS YOU USE: IP (network — addresses & routing), TCP/UDP (transport — delivery), HTTP (application — request/response).
4. IP: every device has an IP address. Routers move packets hop-by-hop toward the destination IP. IPv4 looks like \`192.168.1.10\`; IPv6 like \`::1\`.
5. TCP vs UDP: TCP is reliable, ordered, connection-based (handshake → stream → teardown) — use for web, APIs, files. UDP is fire-and-forget, no ordering — use for DNS, video, games where a lost packet is fine.
6. PORTS: an IP reaches a machine; a PORT reaches a specific service on it. HTTP = 80, HTTPS = 443, SSH = 22. A "socket" = IP:port.
7. HTTP SYNTAX: a request is \`METHOD path HTTP/1.1\\r\\n\` + headers (\`Name: value\\r\\n\`) + blank line + optional body. Methods: GET (read), POST (create), PUT/PATCH (update), DELETE. Headers end each line with \`\\r\\n\`; a blank line separates headers from body.
8. URLS: \`scheme://host:port/path?query#fragment\`. The query string uses \`?\` then \`key=value\` pairs separated by \`&\`.
9. TLS: encrypts the connection (HTTPS = HTTP over TLS). Certificates prove identity; the handshake exchanges keys before any app data flows.`,
  codeExamples: [
    {
      lang: "text",
      code: `HTTP request — lines end with CRLF (\\r\\n); a blank line ends the headers:

GET /users/1 HTTP/1.1
Host: api.example.com
Accept: application/json

(body would go here for POST)

URL anatomy:
  https://api.example.com:443/users/1?active=true&limit=10#section
  \\____/  \\______________/_/ \\_____/ \\________________/ \\______/
  scheme   host          port path     query (key=value&...)  fragment

TCP vs UDP:
  TCP: handshake (SYN, SYN-ACK, ACK) -> reliable ordered stream -> teardown
  UDP: send datagram -> no guarantee of order or delivery`,
      output: `(protocol structure)`,
      note: "HTTP requests are line-based (CRLF), with a blank line separating headers from body. URLs have a fixed anatomy. TCP is reliable/ordered; UDP is fire-and-forget."
    },
    {
      lang: "bash",
      code: `# inspect the network with common tools
ping 8.8.8.8              # does the host respond? (ICMP)
curl -I https://example.com   # send a HEAD request, show headers
nslookup example.com      # DNS: name -> IP address
netstat -tlnp             # which ports is this machine listening on?`,
      output: `(network diagnostics)`,
      note: "ping tests reachability, curl sends HTTP, nslookup resolves DNS, netstat shows listening ports — the everyday network debugging toolkit."
    }
  ],
  marginNotes: [
    "HTTP headers end each line with CRLF (\\r\\n), and a blank line (just \\r\\n) separates headers from the body. Forgetting the blank line is a classic hand-rolled-HTTP bug.",
    "TCP is reliable and ordered (web, APIs, files); UDP is fire-and-forget (DNS, video, games). Pick TCP when losing a packet breaks things; UDP when latency matters more than perfection.",
    "An IP address reaches a machine; a port reaches a service on it. A socket = IP:port. HTTP=80, HTTPS=443, SSH=22, DNS=53.",
    "HTTPS is HTTP over TLS. The TLS handshake (cert + key exchange) happens BEFORE any HTTP data — that's why HTTPS adds a small latency cost on connection."
  ],
  commonMistakes: [
    "Confusing TCP (reliable, ordered, connection-based) with UDP (unreliable, unordered, connectionless).",
    "Forgetting the blank line between HTTP headers and body when hand-crafting requests.",
    "Using HTTP (port 80, plaintext) for sensitive data — use HTTPS (443, TLS-encrypted)."
  ],
  relatedTopics: ["OSI & TCP/IP Models", "TCP vs UDP", "HTTP & HTTPS"],
  externalLinks: [
    { label: "How HTTPS Works (comic)", url: "https://howhttps.works/" },
    { label: "Beej's Guide to Network Programming", url: "https://beej.us/guide/bgnet/" }
  ],
  mcqs: [
    {
      question: "What separates HTTP headers from the body?",
      options: ["A semicolon", "A blank line (CRLF CRLF)", "A closing brace", "The word END"],
      answer: 1,
      explanations: ["Semicolons aren't HTTP separators.", "Correct — each header line ends with CRLF (\\r\\n), and a blank line (an extra \\r\\n) marks the end of headers; the body follows. Forgetting it is a common hand-rolled-HTTP bug.", "HTTP has no braces.", "There is no END marker."],
      difficulty: "medium"
    },
    {
      question: "When would you choose UDP over TCP?",
      options: ["When you need every byte delivered in order", "When low latency matters more than perfect delivery (live video, gaming, DNS)", "When security is critical", "When the data is large"],
      answer: 1,
      explanations: ["That's TCP's job.", "Correct — UDP is fire-and-forget: no handshake, no retransmit, no ordering. Ideal when a lost packet is acceptable but latency isn't (video, games, DNS).", "Security is handled by TLS, not TCP/UDP.", "Large transfers usually want TCP's reliability."],
      difficulty: "medium"
    },
    {
      question: "What does a port identify?",
      options: ["A machine on the network", "A specific service on a machine (HTTP=80, HTTPS=443)", "A router", "A protocol version"],
      answer: 1,
      explanations: ["That's the IP address's job.", "Correct — an IP reaches a machine; a port reaches a specific service on it. A socket = IP:port. Multiple services run on one machine via different ports.", "Routers use IPs.", "Versions are separate."],
      difficulty: "easy"
    }
  ]
};