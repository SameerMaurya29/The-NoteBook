// Computer Networks — more foundational "things you have to know" notes (part 2).
// Condensed mental models that complement the "Why & How" basics note.
export default [
  {
    id: "layering-mental-model",
    title: "The Layered Model at a Glance",
    difficulty: "easy",
    definition: `Networking is layered: each layer solves one problem and hands data to the next. The OSI model has 7 layers (Physical, Data Link, Network, Transport, Session, Presentation, Application); the internet runs on the 4-layer TCP/IP model (Link, Internet, Transport, Application). Each layer adds a header (encapsulation); the receiver strips headers (decapsulation). You don't memorize all 7 — you internalize the three you use: IP (where), TCP/UDP (how), HTTP (what).`,
    coreUnderstanding: `Layering is how the internet manages complexity: each layer handles one concern and trusts the layers below. When you send an HTTP request, the Application layer (HTTP) hands the message to the Transport layer (TCP), which breaks it into segments and adds port numbers; the Network layer (IP) adds source/destination IP addresses and routes packets; the Link layer (Ethernet/Wi-Fi) adds MAC addresses and puts bits on the wire. Each layer adds a header — this is encapsulation. The receiver reverses it: each layer reads its header and hands the payload up. The mnemonic "Please Do Not Throw Sausage Pizza Away" maps the 7 OSI layers (Physical, Data Link, Network, Transport, Session, Presentation, Application). In practice, TCP/IP collapses these into 4. The key insight: a layer change doesn't break other layers — you can switch from Wi-Fi to Ethernet (link layer) without changing HTTP (application layer).`,
    howItWorks: `1. OSI 7 LAYERS (bottom to top): Physical (bits on wire), Data Link (frames, MAC addresses), Network (packets, IP addresses, routing), Transport (segments, TCP/UDP, ports), Session (connections), Presentation (encoding, encryption), Application (HTTP, DNS, SMTP).
2. TCP/IP 4 LAYERS: Link (= OSI 1-2), Internet (= OSI 3, IP), Transport (= OSI 4, TCP/UDP), Application (= OSI 5-7).
3. ENCAPSULATION (sending): Application data → Transport adds TCP header (ports) → Network adds IP header (addresses) → Link adds Ethernet header (MACs) → bits on wire. Each layer wraps the one above.
4. DECAPSULATION (receiving): bits → Link reads MAC, strips header → Network reads IP, strips → Transport reads port, strips → Application gets the data. Each layer unwraps.
5. THE THREE YOU USE: IP (network — addresses and routing, "where"), TCP/UDP (transport — delivery, "how"), HTTP (application — request/response, "what").
6. LAYER INDEPENDENCE: changing the link layer (Wi-Fi → Ethernet → 5G) doesn't change IP or HTTP. Each layer is modular.`,
    codeExamples: [
      {
        lang: "text",
        code: `OSI 7 layers (mnemonic: Please Do Not Throw Sausage Pizza Away):
  7. Application    HTTP, DNS, SMTP, FTP      (what the user sees)
  6. Presentation   TLS, JPEG, encoding        (format/encrypt)
  5. Session        connections, sessions      (manage dialog)
  4. Transport      TCP, UDP (ports)           (reliable/fast delivery)
  3. Network        IP, routers (addresses)     (route across networks)
  2. Data Link      Ethernet, Wi-Fi (MAC)      (node-to-node frame)
  1. Physical       cables, radio (bits)       (signal on wire)

TCP/IP 4 layers (what the internet actually uses):
  4. Application    (= OSI 5-7: HTTP, DNS, SMTP)
  3. Transport     (= OSI 4: TCP, UDP)
  2. Internet      (= OSI 3: IP)
  1. Link          (= OSI 1-2: Ethernet, Wi-Fi)

Encapsulation (sending an HTTP request):
  Application:  GET /index.html HTTP/1.1
  Transport:    [TCP hdr: port 80]  GET /index.html ...
  Network:      [IP hdr: src/dst IP] [TCP hdr] GET ...
  Link:         [Eth hdr: MACs] [IP hdr] [TCP hdr] GET ...
  -> bits on the wire

Decapsulation (receiving): each layer reads its header, strips it,
  and hands the payload up. The application sees only the HTTP message.`,
        output: "(layered model)",
        note: "OSI has 7 layers; TCP/IP collapses to 4. Sending wraps headers (encapsulation); receiving unwraps (decapsulation). The three you use: IP (where), TCP/UDP (how), HTTP (what). Layers are independent — switch Wi-Fi to Ethernet without touching HTTP."
      }
    ],
    marginNotes: [
      "The mnemonic for OSI layers (bottom to top): Please Do Not Throw Sausage Pizza Away — Physical, Data Link, Network, Transport, Session, Presentation, Application.",
      "Encapsulation: each layer adds its own header when sending. Decapsulation: each layer reads and removes its header when receiving. The application only sees the top-layer message — it never sees IP or TCP headers.",
      "Layer independence is powerful: you can switch from Wi-Fi to Ethernet to cellular (link layer) without changing anything at the IP, TCP, or HTTP layers. Each layer is a modular contract with the one above and below.",
      "OSI is the reference model (7 layers, taught in courses); TCP/IP is the implementation model (4 layers, what the internet actually runs). Don't memorize all 7 in depth — focus on the 3-4 layers you actually program against."
    ],
    commonMistakes: [
      "Memorizing all 7 OSI layers in depth — in practice you work with 3-4 (IP, TCP/UDP, HTTP). Know the 7 for exams, but internalize the ones you use.",
      "Forgetting that each layer adds its own header (encapsulation) — a packet on the wire has Ethernet + IP + TCP + HTTP headers stacked, not just one.",
      "Thinking layers are tightly coupled — they're independent contracts. Changing the link layer (Wi-Fi → Ethernet) doesn't affect IP or HTTP."
    ],
    relatedTopics: ["Networks Basics — Why & How", "OSI & TCP/IP Models", "TCP vs UDP"],
    externalLinks: [
      { label: "OSI Model (Cloudflare)", url: "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/" },
      { label: "TCP/IP Model (Wiki)", url: "https://en.wikipedia.org/wiki/Internet_protocol_suite" }
    ],
    mcqs: [
      {
        question: "What is encapsulation?",
        options: ["Encrypting data for security", "Each layer adding its own header when sending data down the stack", "Compressing data", "Routing packets"],
        answer: 1,
        explanations: ["Encryption is the presentation layer, not encapsulation.", "Correct — encapsulation is each layer wrapping the payload from the layer above with its own header. An HTTP message gets a TCP header, then an IP header, then an Ethernet header. The receiver decapsulates (strips) in reverse.", "Compression is separate.", "Routing is the network layer's job."],
        difficulty: "medium"
      },
      {
        question: "How many layers does the TCP/IP model have (vs OSI's 7)?",
        options: ["7 (same as OSI)", "4 (Link, Internet, Transport, Application)", "3", "5"],
        answer: 1,
        explanations: ["OSI has 7.", "Correct — TCP/IP has 4: Link (= OSI 1-2), Internet (= OSI 3, IP), Transport (= OSI 4, TCP/UDP), Application (= OSI 5-7). OSI is the reference; TCP/IP is what the internet runs.", "It has 4.", "It has 4."],
        difficulty: "easy"
      },
      {
        question: "If you switch from Wi-Fi to Ethernet, which layers change?",
        options: ["All layers", "Only the link layer (1-2) — IP, TCP, and HTTP are unaffected", "Only the application layer", "The transport layer"],
        answer: 1,
        explanations: ["Not all layers change.", "Correct — Wi-Fi and Ethernet are both link-layer technologies. Switching between them changes only the link layer; IP, TCP, and HTTP work identically. This layer independence is the point of layering.", "The application is unaffected.", "The transport is unaffected."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "ip-port-socket-essentials",
    title: "IP, Ports & Sockets",
    difficulty: "easy",
    definition: `An IP address identifies a machine on the network. A port identifies a specific service on that machine. A socket is the combination — IP:port — and is the endpoint of a network connection. IPv4 addresses look like 192.168.1.10 (32-bit, ~4 billion); IPv6 looks like 2001:db8::1 (128-bit, effectively unlimited). Ports range 0-6553; well-known ports: HTTP=80, HTTPS=443, SSH=22, DNS=53.`,
    coreUnderstanding: `An IP address gets you to the right machine; a port gets you to the right program on that machine. Think of an IP as a building's street address and a port as an apartment number — you need both to deliver a letter. A socket (IP:port) is the endpoint a program binds to send or receive data. IPv4 (32-bit) has ~4.3 billion addresses, which ran out — hence NAT (one public IP serves many private devices) and IPv6 (128-bit, 340 undecillion addresses). Ports are 16-bit (0-65535): 0-1023 are well-known (HTTP 80, HTTPS 443, SSH 22, DNS 53), 1024-49151 are registered, 49152-65535 are ephemeral (dynamic, assigned by the OS for outgoing connections). A server listens on a fixed port; a client connects from an ephemeral port. Every TCP connection is uniquely identified by the 4-tuple: (src IP, src port, dst IP, dst port).`,
    howItWorks: `1. IP ADDRESS: identifies a machine. IPv4 = 32-bit (4 octets, e.g., 192.168.1.10). IPv6 = 128-bit (8 groups of hex, e.g., 2001:db8::1).
2. PRIVATE IP RANGES (IPv4, not routable on the internet): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. NAT translates private to public.
3. PORT: identifies a service on a machine. 16-bit (0-65535). Well-known (0-1023): HTTP=80, HTTPS=443, SSH=22, DNS=53, SMTP=25. Registered (1024-49151). Ephemeral (49152-65535, OS-assigned for outgoing connections).
4. SOCKET = IP:port. A server binds to a socket (e.g., 0.0.0.0:80) and listens. A client connects to the server's socket from its own ephemeral socket.
5. THE 4-TUPLE: every TCP connection is unique by (source IP, source port, destination IP, destination port). A server on port 80 can handle thousands of connections — each has a different source IP/port.
6. SUBNET MASK: splits an IP into network + host parts. 192.168.1.10/24 means the first 24 bits are the network (192.168.1) and the last 8 are the host (.10).
7. LOOPBACK: 127.0.0.1 (IPv4) / ::1 (IPv6) = "this machine." Used for local testing.`,
    codeExamples: [
      {
        lang: "text",
        code: `IP addresses:
  IPv4 (32-bit):    192.168.1.10        (4 octets, ~4.3 billion total)
  IPv6 (128-bit):   2001:db8::1         (8 hex groups, :: = zeros)
  loopback:         127.0.0.1 / ::1     (this machine, for local testing)
  private ranges:   10.x.x.x, 172.16-31.x.x, 192.168.x.x  (behind NAT)

Ports (16-bit, 0-65535):
  well-known (0-1023):    HTTP=80, HTTPS=443, SSH=22, DNS=53, SMTP=25
  registered (1024-49151): apps register these (MySQL=3306, Redis=6379)
  ephemeral (49152-65535): OS picks these for outgoing connections

Socket = IP:port (the endpoint of a connection):
  server:  binds to 0.0.0.0:80   (listens on port 80 on all interfaces)
  client:  connects from 192.168.1.5:54321  (ephemeral port) to 93.184.216.34:80

The 4-tuple uniquely identifies a TCP connection:
  (src IP, src port, dst IP, dst port)
  = (192.168.1.5, 54321, 93.184.216.34, 80)
  A server on port 80 handles many connections — each has a
  different source IP/port, so they don't collide.

Subnet mask: 192.168.1.10/24
  network = 192.168.1   (first 24 bits)
  host   = .10          (last 8 bits, 256 addresses)`,
        output: "(addressing overview)",
        note: "IP = which machine, port = which service, socket = IP:port. IPv4 is 32-bit (ran out → NAT/IPv6). Ports: well-known (80/443/22), ephemeral (OS-assigned). Every TCP connection is unique by the 4-tuple (src IP, src port, dst IP, dst port)."
      },
      {
        lang: "bash",
        code: `# inspect addresses and ports
ip addr show              # show this machine's IP addresses
ifconfig                  # (older) show interfaces

# what's listening on which ports?
ss -tlnp                 # TCP listening sockets + process
netstat -tlnp            # (older) same info

# resolve a name to an IP (DNS)
nslookup example.com      # -> 93.184.216.34
dig example.com           # detailed DNS query

# test a port
curl -I http://example.com:80    # HTTP HEAD to port 80
nc -zv example.com 443           # is port 443 open?`,
        output: "(network inspection)",
        note: "ip/ifconfig show addresses, ss/netstat show listening ports, nslookup/dig resolve DNS, nc tests if a port is open."
      }
    ],
    marginNotes: [
      "An IP gets you to the machine; a port gets you to the program. A socket (IP:port) is the endpoint. Think: IP = building address, port = apartment number — you need both to deliver.",
      "IPv4 (32-bit) ran out of addresses, so we use NAT (many private devices share one public IP) and IPv6 (128-bit, effectively unlimited). Private ranges (10.x, 172.16-31.x, 192.168.x) are not routable on the internet.",
      "A server on port 80 handles thousands of simultaneous connections because each is uniquely identified by the 4-tuple (src IP, src port, dst IP, dst port). The server's port is the same; the clients' source ports differ.",
      "Ephemeral ports (49152-65535) are assigned by the OS for outgoing connections — the client doesn't choose them. Well-known ports (0-1023) require root/admin privileges to bind on Unix."
    ],
    commonMistakes: [
      "Confusing IP (machine) with port (service) — an IP reaches a machine; a port reaches a specific program on it. You need both for a connection.",
      "Thinking one port = one connection — a server on port 80 handles many connections simultaneously. Each is unique by the 4-tuple, not just the server's port.",
      "Forgetting that private IP ranges (10.x, 192.168.x) aren't routable on the internet — NAT translates them to a public IP. 127.0.0.1 only works on the local machine."
    ],
    relatedTopics: ["Networks Basics — Why & How", "IP Addressing", "Subnetting"],
    externalLinks: [
      { label: "IP Addresses (Cloudflare)", url: "https://www.cloudflare.com/learning/network-layer/what-is-an-ip-address/" },
      { label: "Ports and Sockets (Beej)", url: "https://beej.us/guide/bgnet/html/#ports" }
    ],
    mcqs: [
      {
        question: "What does a port identify?",
        options: ["A machine on the network", "A specific service/program on a machine", "A router", "A protocol version"],
        answer: 1,
        explanations: ["That's the IP address.", "Correct — an IP reaches a machine; a port reaches a specific service on it (HTTP=80, HTTPS=443, SSH=22). A socket = IP:port is the connection endpoint.", "Routers use IPs.", "Versions are separate."],
        difficulty: "easy"
      },
      {
        question: "How can a server on port 80 handle many simultaneous connections?",
        options: ["It can't — one port, one connection", "Each connection is unique by the 4-tuple (src IP, src port, dst IP, dst port) — the server port is the same, clients differ", "It opens new ports for each", "It queues them"],
        answer: 1,
        explanations: ["It can handle many.", "Correct — the server's port (80) is the same for all, but each connection has a unique source IP and source port. The OS demultiplexes incoming packets by the 4-tuple to the right connection.", "It doesn't need new ports.", "Queuing would be too slow."],
        difficulty: "medium"
      },
      {
        question: "Why did we need IPv6?",
        options: ["IPv4 was too slow", "IPv4 (32-bit) ran out of addresses — IPv6 (128-bit) has effectively unlimited addresses", "IPv4 was insecure", "IPv6 is faster"],
        answer: 1,
        explanations: ["Speed isn't the reason.", "Correct — IPv4 has ~4.3 billion addresses, which ran out. IPv6 has 128-bit addresses (340 undecillion), effectively unlimited. NAT was a workaround; IPv6 is the fix.", "Security is separate.", "Speed is similar."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "http-mental-model",
    title: "HTTP at a Glance",
    difficulty: "easy",
    definition: `HTTP is a request-response protocol: a client sends a request (method, path, headers, optional body), the server sends a response (status code, headers, body). It's stateless — each request is independent (servers use cookies/sessions to fake state). Methods: GET (read), POST (create), PUT (replace), PATCH (update), DELETE. Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error. HTTPS is HTTP over TLS (encrypted).`,
    coreUnderstanding: `HTTP is the application-layer protocol of the web. It's a simple conversation: the client asks, the server answers. A request has a method (what to do), a path (what to do it to), headers (metadata — auth, content type), and an optional body (data for POST/PUT). A response has a status code (what happened), headers, and a body. HTTP is stateless — the server treats each request as independent; to remember a user across requests, you use cookies (the server sends a cookie, the client returns it on each request). Methods are verbs: GET (fetch, safe/idempotent), POST (create, not idempotent), PUT (replace, idempotent), PATCH (partial update), DELETE (remove, idempotent). Status codes tell the client what happened: 200 OK, 201 Created, 301/302 redirect, 404 Not Found, 500 Server Error. HTTPS adds TLS encryption (a handshake before HTTP data, encrypting the conversation).`,
    howItWorks: `1. REQUEST: METHOD path HTTP/1.1 + headers (Host, Content-Type, Authorization) + blank line + optional body.
2. RESPONSE: HTTP/1.1 status_code reason + headers (Content-Type, Content-Length) + blank line + body.
3. METHODS: GET (read, safe, idempotent), POST (create, not idempotent), PUT (full replace, idempotent), PATCH (partial update), DELETE (remove, idempotent). Idempotent = repeating gives the same result.
4. STATUS CODES: 2xx success (200 OK, 201 Created, 204 No Content), 3xx redirect (301 Moved, 302 Found, 304 Not Modified), 4xx client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many), 5xx server error (500 Internal, 502 Bad Gateway, 503 Unavailable).
5. HEADERS: request (Host, User-Agent, Accept, Authorization, Content-Type), response (Content-Type, Content-Length, Set-Cookie, Cache-Control).
6. STATELESSNESS: each request is independent. State is faked with cookies — the server sends Set-Cookie, the client returns Cookie on each request. Sessions store server-side state keyed by the cookie.
7. HTTPS: HTTP over TLS. The TLS handshake (cert + key exchange) happens first, then HTTP flows encrypted. Port 443 (vs 80 for HTTP).`,
    codeExamples: [
      {
        lang: "text",
        code: `HTTP Request (lines end with CRLF; blank line ends headers):
  POST /api/users HTTP/1.1
  Host: api.example.com
  Content-Type: application/json
  Authorization: Bearer eyJhb...
  Content-Length: 42

  {"name": "Alice", "email": "alice@x.io"}

HTTP Response:
  HTTP/1.1 201 Created
  Content-Type: application/json
  Location: /api/users/1

  {"id": 1, "name": "Alice", "email": "alice@x.io"}

Methods (verbs):
  GET    /users/1       read (safe, idempotent — repeating is harmless)
  POST   /users         create (NOT idempotent — 2 POSTs create 2 users)
  PUT    /users/1       full replace (idempotent — repeating = same state)
  PATCH  /users/1      partial update (e.g., just the email)
  DELETE /users/1       remove (idempotent — deleting twice = same result)

Status codes:
  200 OK          201 Created     204 No Content
  301 Moved       302 Found       304 Not Modified
  400 Bad Request 401 Unauthorized 403 Forbidden 404 Not Found 429 Too Many
  500 Internal    502 Bad Gateway 503 Unavailable

Statelessness + cookies:
  Response: Set-Cookie: session=abc123; HttpOnly; Secure
  Next request: Cookie: session=abc123
  (the server looks up session=abc123 to identify the user)`,
        output: "(HTTP conversation)",
        note: "HTTP is request-response and stateless. Methods: GET/POST/PUT/PATCH/DELETE. Status: 2xx ok, 3xx redirect, 4xx client error, 5xx server error. State is faked with cookies. HTTPS = HTTP over TLS."
      }
    ],
    marginNotes: [
      "HTTP is stateless — each request is independent. To remember a user, the server sends a cookie (Set-Cookie) and the client returns it (Cookie) on every request. The server uses the cookie to look up server-side session state.",
      "Idempotent methods (GET, PUT, DELETE) give the same result no matter how many times you repeat them. POST is NOT idempotent — repeating it creates duplicates. This matters for retry logic: retrying a failed PUT is safe; retrying a POST may double-charge.",
      "Status code first digit tells the class: 2xx success, 3xx redirect, 4xx client error (your fault), 5xx server error (their fault). 401 = not authenticated (no login), 403 = authenticated but not authorized (no permission).",
      "HTTPS adds a TLS handshake (certificate + key exchange) before any HTTP data flows. This encrypts the conversation and adds a small latency cost on connection. Use HTTPS for anything sensitive — HTTP is plaintext and readable by anyone on the path."
    ],
    commonMistakes: [
      "Using POST for reads — GET is for reading (cacheable, idempotent). POST is for creating. Using POST for reads breaks caching and HTTP semantics.",
      "Confusing 401 (Unauthorized = not authenticated, no valid login) with 403 (Forbidden = authenticated but not allowed). 401 means 'who are you?'; 403 means 'I know who you are, but you can't do that.'",
      "Forgetting the blank line between HTTP headers and body — each header ends with CRLF, and a blank line (extra CRLF) marks the end of headers. Omitting it is a classic hand-rolled-HTTP bug."
    ],
    relatedTopics: ["Networks Basics — Why & How", "HTTP & HTTPS", "DNS"],
    externalLinks: [
      { label: "HTTP Overview (MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" },
      { label: "HTTP Status Codes", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" }
    ],
    mcqs: [
      {
        question: "Why is HTTP called stateless?",
        options: ["It's always slow", "Each request is independent — the server treats every request as new; state is faked with cookies/sessions", "It can't send data", "It doesn't use TCP"],
        answer: 1,
        explanations: ["Speed isn't the reason.", "Correct — HTTP is stateless: the server doesn't remember you between requests. To maintain state (login, cart), the server sends a cookie and the client returns it on each request; the server uses the cookie to look up session state.", "It sends data fine.", "It uses TCP underneath."],
        difficulty: "medium"
      },
      {
        question: "Which method is NOT idempotent?",
        options: ["GET", "PUT", "POST", "DELETE"],
        answer: 2,
        explanations: ["GET is idempotent (repeating a read is harmless).", "PUT is idempotent (repeating a full replace gives the same state).", "Correct — POST is NOT idempotent: repeating it creates a new resource each time (2 POSTs = 2 users). This is why retrying a failed POST can double-charge; PUT/DELETE are safe to retry.", "DELETE is idempotent (deleting twice = same result)."],
        difficulty: "medium"
      },
      {
        question: "What's the difference between 401 and 403?",
        options: ["They're the same", "401 = not authenticated (no valid login); 403 = authenticated but not authorized (no permission)", "401 is a server error; 403 is a client error", "401 is older than 403"],
        answer: 1,
        explanations: ["They differ.", "Correct — 401 Unauthorized means 'who are you?' (no valid authentication). 403 Forbidden means 'I know who you are, but you can't do that' (authenticated but not permitted).", "Both are client errors (4xx).", "Both are current."],
        difficulty: "medium"
      }
    ]
  }
];