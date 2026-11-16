// External links only. No third-party books, course content or executable tools are embedded.
export const RESOURCE_KINDS = {
  "books": "Books",
  "courses": "Courses",
  "practice": "Coding & practice",
  "interviews": "Interview prep",
  "reference": "Quick references",
  "tools": "Tools & simulators",
  "discover": "Explore"
};
export const RESOURCE_SUBJECTS = {
  "general": "General",
  "java": "Java",
  "python": "Python",
  "c": "C / C++",
  "dsa": "DSA",
  "os": "Operating Systems",
  "dbms": "DBMS / SQL",
  "networks": "Networks",
  "coa": "Computer Architecture",
  "html": "HTML",
  "css": "CSS",
  "js": "JavaScript",
  "aptitude": "Aptitude",
  "systemdesign": "System Design",
  "behavioral": "Behavioral Interviews",
  "maths": "Mathematics for CS",
  "spring": "Spring Boot"
};
export const resources = [
  {
    "id": "existing-java-0",
    "title": "Oracle Java Tutorials",
    "url": "https://docs.oracle.com/javase/tutorial/",
    "subjects": [
      "java"
    ],
    "kind": "courses",
    "description": "Official walkthroughs — Trails cover basics to concurrency.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-java-1",
    "title": "Java Language Specification",
    "url": "https://docs.oracle.com/javase/specs/jls/se17/html/index.html",
    "subjects": [
      "java"
    ],
    "kind": "reference",
    "description": "The source of truth for every grammar rule. Dense but definitive.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-java-2",
    "title": "Baeldung",
    "url": "https://www.baeldung.com/java",
    "subjects": [
      "java"
    ],
    "kind": "reference",
    "description": "Practical, recipe-style articles on Spring, testing, and modern Java.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-java-3",
    "title": "Effective Java (Bloch)",
    "url": "https://www.oreilly.com/library/view/effective-java/9780134686097/",
    "subjects": [
      "java"
    ],
    "kind": "books",
    "description": "The book on Java best practices — read after the basics.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-python-0",
    "title": "Python Official Docs",
    "url": "https://docs.python.org/3/",
    "subjects": [
      "python"
    ],
    "kind": "reference",
    "description": "Tutorial + library reference. Start with the Tutorial.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-python-1",
    "title": "PEP Index",
    "url": "https://peps.python.org/",
    "subjects": [
      "python"
    ],
    "kind": "reference",
    "description": "Python Enhancement Proposals — the design decisions behind the language.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-python-2",
    "title": "Real Python",
    "url": "https://realpython.com/",
    "subjects": [
      "python"
    ],
    "kind": "reference",
    "description": "Deep, well-edited tutorials across the ecosystem.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-python-3",
    "title": "Fluent Python (Ramalho)",
    "url": "https://www.oreilly.com/library/view/fluent-python/9781492056348/",
    "subjects": [
      "python"
    ],
    "kind": "books",
    "description": "Master Python's data model and idioms.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-dsa-0",
    "title": "Visualgo",
    "url": "https://visualgo.net/",
    "subjects": [
      "dsa"
    ],
    "kind": "reference",
    "description": "Animated visualizations of nearly every data structure.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-dsa-1",
    "title": "Big-O Cheat Sheet",
    "url": "https://www.bigocheatsheet.com/",
    "subjects": [
      "dsa"
    ],
    "kind": "reference",
    "description": "Complexity tables for all common structures and sorts.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-dsa-2",
    "title": "NPTEL — Data Structures",
    "url": "https://nptel.ac.in/courses/106106127",
    "subjects": [
      "dsa"
    ],
    "kind": "courses",
    "description": "IIT lecture series — rigorous, university-level.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-dsa-3",
    "title": "CP Algorithms",
    "url": "https://cp-algorithms.com/",
    "subjects": [
      "dsa"
    ],
    "kind": "reference",
    "description": "Competitive-programming-grade algorithm reference.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-operating-0",
    "title": "OSTEP (Wisconsin)",
    "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    "subjects": [
      "os"
    ],
    "kind": "books",
    "description": "Free, beloved OS textbook. Read chapters alongside the homework.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-operating-1",
    "title": "NPTEL — Operating Systems",
    "url": "https://nptel.ac.in/courses/106105081",
    "subjects": [
      "os"
    ],
    "kind": "courses",
    "description": "IIT Madras lecture series by Prof. Chebrolu.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-operating-2",
    "title": "MIT 6.S081",
    "url": "https://pdos.csail.mit.edu/6.828/2023/schedule.html",
    "subjects": [
      "os"
    ],
    "kind": "courses",
    "description": "xv6 labs — build real OS primitives.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-dbms-0",
    "pdf": "/library/existing-dbms-0.pdf",
    "title": "Database System Concepts (Silberschatz)",
    "url": "https://www.db-book.com/",
    "subjects": [
      "dbms"
    ],
    "kind": "books",
    "description": "The standard university text — SQL to transactions to normalization.",
    "access": "Paid McGraw-Hill textbook. The authors’ site offers free slides, practice-exercise solutions and some chapters; check it for what is currently free.",
    "status": "checked",
    "origin": "Existing shelf",
    "verifiedAt": "2026-11-16",
    "evidenceUrl": "https://www.db-book.com/",
    "caution": "Site lists the 7th edition (2019). The supplied full PDF is the 7th edition with McGraw-Hill’s copyright notice; hosting permission is not established, so it is not linked. Existing record updated, not duplicated."
  },
  {
    "id": "existing-dbms-1",
    "title": "NPTEL — Database Management Systems",
    "url": "https://nptel.ac.in/courses/106105095",
    "subjects": [
      "dbms"
    ],
    "kind": "courses",
    "description": "IIT lecture series covering the full DBMS syllabus.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-dbms-2",
    "title": "Use The Index, Luke!",
    "url": "https://use-the-index-luke.com/",
    "subjects": [
      "dbms"
    ],
    "kind": "reference",
    "description": "Understand database indexes deeply — practical and free.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-coa-0",
    "title": "Computer Organization & Design (Patterson/Hennessy)",
    "url": "https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6",
    "subjects": [
      "coa"
    ],
    "kind": "books",
    "description": "The canonical COA text, RISC-V edition.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-coa-1",
    "title": "NPTEL — Computer Architecture",
    "url": "https://nptel.ac.in/courses/106106139",
    "subjects": [
      "coa"
    ],
    "kind": "courses",
    "description": "IIT lecture series on architecture and organization.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-coa-2",
    "title": "nand2tetris",
    "url": "https://www.nand2tetris.org/",
    "subjects": [
      "coa"
    ],
    "kind": "courses",
    "description": "Build a computer from logic gates up — hands-on COA.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-spring-0",
    "title": "Spring Reference Docs",
    "url": "https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/",
    "subjects": [
      "spring"
    ],
    "kind": "reference",
    "description": "The official reference — configuration, auto-config, actuator.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-spring-1",
    "title": "Spring Guides",
    "url": "https://spring.io/guides",
    "subjects": [
      "spring"
    ],
    "kind": "courses",
    "description": "Hands-on 15-minute tutorials for every common task.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-spring-2",
    "title": "Baeldung — Spring",
    "url": "https://www.baeldung.com/spring-tutorial",
    "subjects": [
      "spring"
    ],
    "kind": "reference",
    "description": "Deep-dive articles, especially on testing and security.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-web-0",
    "title": "MDN Web Docs",
    "url": "https://developer.mozilla.org/",
    "subjects": [
      "html",
      "css",
      "js"
    ],
    "kind": "reference",
    "description": "The web platform reference. Bookmark permanently.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-web-1",
    "title": "web.dev",
    "url": "https://web.dev/learn/",
    "subjects": [
      "html",
      "css",
      "js"
    ],
    "kind": "reference",
    "description": "Google's learn paths for modern CSS, JS, and performance.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-web-2",
    "title": "JavaScript.info",
    "url": "https://javascript.info/",
    "subjects": [
      "html",
      "css",
      "js"
    ],
    "kind": "reference",
    "description": "The most complete modern JS tutorial, free.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-web-3",
    "title": "CSS Tricks — Almanac",
    "url": "https://css-tricks.com/almanac/",
    "subjects": [
      "html",
      "css",
      "js"
    ],
    "kind": "reference",
    "description": "Look up any CSS property with examples.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-c-0",
    "title": "cppreference.com",
    "url": "https://en.cppreference.com/",
    "subjects": [
      "c"
    ],
    "kind": "reference",
    "description": "The definitive C/C++ standard library reference.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-c-1",
    "title": "LearnCpp.com",
    "url": "https://www.learncpp.com/",
    "subjects": [
      "c"
    ],
    "kind": "courses",
    "description": "Free, thorough, modern C++ tutorial — best on the web.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "existing-c-2",
    "pdf": "/library/existing-c-2.pdf",
    "title": "The C Programming Language (K&R)",
    "url": "https://www.oreilly.com/library/view/the-c-programming/9780133086249/",
    "subjects": [
      "c"
    ],
    "kind": "books",
    "description": "Kernighan & Ritchie — terse, elegant, foundational.",
    "access": "See provider for access terms.",
    "status": "existing",
    "origin": "Existing shelf",
    "verifiedAt": null
  },
  {
    "id": "behavioral",
    "title": "Behavioral Interview Studio",
    "url": "https://github.com/ashishps1/awesome-behavioral-interviews",
    "subjects": [
      "behavioral"
    ],
    "kind": "interviews",
    "description": "Practise 30 original questions with STAR guidance, fictional examples, a six-question mock session and a private session-only answer workspace.",
    "access": "Built into The Notebook. No paid AI or external account needed; download drafts before leaving.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13",
    "internalPath": "/interviews/behavioral",
    "caution": "Original native experience, not a copied GitHub README. The external repository is background reading only. Practice is self-review, not a hiring assessment."
  },
  {
    "id": "system-design",
    "title": "Awesome System Design Resources",
    "url": "https://github.com/ashishps1/awesome-system-design-resources",
    "subjects": [
      "systemdesign",
      "networks",
      "dbms"
    ],
    "kind": "interviews",
    "description": "Find explanations, engineering articles and interview study links for APIs, storage, caching and distributed systems.",
    "access": "Public GitHub reading; linked resources have their own terms.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "head-first-c",
    "title": "Head First C · David & Dawn Griffiths",
    "url": "https://www.oreilly.com/library/view/head-first-c/9781449335649/",
    "subjects": [
      "c"
    ],
    "kind": "books",
    "description": "Study C syntax, pointers, memory management and project-based systems programming.",
    "access": "Publisher book; purchase, subscription or library access may apply.",
    "status": "limited",
    "origin": "Added from your list",
    "verifiedAt": null,
    "originalUrl": "https://karadev.net/uroci/filespdf/files/head-first-c-o-reilly-david-grifffiths-dawn-griffiths.pdf",
    "caution": "Publisher metadata found, but its page denied access here. Supplied third-party PDF did not render; hosting permission is unverified. Prefer publisher or library access."
  },
  {
    "id": "mit-ocw",
    "title": "MIT OpenCourseWare",
    "url": "https://ocw.mit.edu/",
    "subjects": [
      "c",
      "python",
      "dsa",
      "os",
      "coa",
      "networks",
      "dbms",
      "systemdesign",
      "maths"
    ],
    "kind": "courses",
    "description": "Use university lecture notes, assignments and course materials alongside your notebook subjects.",
    "access": "Free course materials; no registration needed to browse.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "learn-anything",
    "title": "Learn Anything",
    "url": "https://learn-anything.xyz/",
    "subjects": [
      "general"
    ],
    "kind": "discover",
    "description": "Explore learning topics and possible study directions.",
    "access": "Access and account requirements not confirmed.",
    "status": "limited",
    "origin": "Added from your list",
    "verifiedAt": null,
    "caution": "Only the “I want to learn” heading rendered during review; topic coverage could not be verified."
  },
  {
    "id": "goalkicker",
    "title": "GoalKicker · Notes for Professionals",
    "url": "https://books.goalkicker.com/",
    "subjects": [
      "java",
      "python",
      "c",
      "html",
      "css",
      "js",
      "dbms"
    ],
    "kind": "books",
    "description": "Find programming reference books by language or tool. Use them for lookup and worked examples, not as language specifications.",
    "access": "Site lists free books; check each book’s attribution and license before reuse.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "exercism",
    "title": "Exercism",
    "url": "https://exercism.org/",
    "subjects": [
      "java",
      "python",
      "c",
      "js"
    ],
    "kind": "practice",
    "description": "Practice one language through small exercises and feedback; pair a track with the syntax lessons here.",
    "access": "Platform describes its learning offering as free; account options available.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "it-tools",
    "title": "IT-Tools",
    "url": "https://it-tools.tech/",
    "subjects": [
      "general",
      "js",
      "networks"
    ],
    "kind": "tools",
    "description": "Use development utilities for text, data conversion and networking tasks. These are tools, not a programming course.",
    "access": "No sign-in or pricing gate shown on the tools index.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13",
    "caution": "Do not paste passwords, tokens or private production data into external tools."
  },
  {
    "id": "architecture-book",
    "title": "Basic Computer Architecture · Smruti R. Sarangi",
    "url": "https://www.cse.iitd.ac.in/~srsarangi/archbook/archbook.pdf",
    "subjects": [
      "coa",
      "os"
    ],
    "kind": "books",
    "description": "Read about assembly, processor design, memory and multiprocessors alongside COA and OS units.",
    "access": "Author-hosted PDF; document states CC BY-ND 4.0.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13",
    "format": "PDF"
  },
  {
    "id": "free-books-search",
    "title": "Free Programming Books · search",
    "url": "https://ebookfoundation.github.io/free-programming-books-search/",
    "subjects": [
      "general",
      "java",
      "python",
      "c",
      "dsa",
      "os",
      "dbms",
      "networks",
      "coa",
      "html",
      "css",
      "js",
      "systemdesign",
      "maths"
    ],
    "kind": "books",
    "description": "Search a directory of programming books and related learning materials by topic.",
    "access": "Directory links out; each work has its own license and access terms.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "mcs",
    "title": "Mathematics for Computer Science · MIT 6.042",
    "url": "https://courses.csail.mit.edu/6.042/spring18/mcs.pdf",
    "subjects": [
      "maths",
      "dsa",
      "aptitude"
    ],
    "kind": "books",
    "description": "Study proofs, sets, functions, graphs, counting and probability for algorithms and CS foundations.",
    "access": "MIT course page links this class textbook.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13",
    "format": "PDF",
    "caution": "Course identity and textbook link verified from MIT’s class page; PDF text did not extract here.",
    "evidenceUrl": "https://courses.csail.mit.edu/6.042/spring18/classinfo.shtml"
  },
  {
    "id": "karumanchi",
    "title": "Data Structures and Algorithms Made Easy · Narasimha Karumanchi",
    "url": "https://www.careermonk.com/",
    "subjects": [
      "dsa",
      "c"
    ],
    "kind": "books",
    "description": "Use the book for data structures, algorithmic puzzles and comparing solution approaches.",
    "access": "Publisher book; use publisher or library access.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13",
    "originalUrl": "https://dpvipracollege.in/wp-content/uploads/2023/01/Data-Structures-and-Algorithms-Narasimha-Karumanchi.pdf",
    "caution": "Supplied college-hosted PDF identifies the 5th edition (2017) and carries an all-rights-reserved notice. Hosting permission is unverified; use publisher or library access. This is the same supplied PDF already on the shelf, not a second book."
  },
  {
    "id": "indiabix",
    "title": "IndiaBIX",
    "url": "https://www.indiabix.com/",
    "subjects": [
      "aptitude",
      "behavioral",
      "c",
      "java",
      "dbms"
    ],
    "kind": "practice",
    "description": "Practice placement aptitude, reasoning and technical interview questions. Check explanations against your own working.",
    "access": "Question categories are public; login and provider terms may apply to other features.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "quickref",
    "title": "QuickRef",
    "url": "https://quickref.me/",
    "subjects": [
      "java",
      "python",
      "c",
      "html",
      "css",
      "js",
      "dbms"
    ],
    "kind": "reference",
    "description": "Keep a quick-reference destination for syntax lookup while coding.",
    "access": "Access could not be confirmed.",
    "status": "limited",
    "origin": "Added from your list",
    "verifiedAt": null,
    "caution": "Page remained loading on two review attempts; current cheatsheet coverage not verified."
  },
  {
    "id": "overapi",
    "title": "OverAPI",
    "url": "https://overapi.com/",
    "subjects": [
      "java",
      "python",
      "c",
      "html",
      "css",
      "js",
      "dbms"
    ],
    "kind": "reference",
    "description": "Look up language, framework and tool cheatsheets when you need a short syntax reminder.",
    "access": "Index readable without a visible account gate.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "welib",
    "title": "WeLib · supplied library link",
    "url": "https://welib.st/",
    "subjects": [
      "general"
    ],
    "kind": "discover",
    "description": "A library link from your list. Contents and learning coverage have not been verified.",
    "access": "Access and rights status unknown.",
    "status": "limited",
    "origin": "Added from your list",
    "verifiedAt": null,
    "caution": "Security verification blocked the content. Do not assume books are authorized for download or reuse."
  },
  {
    "id": "codewars",
    "title": "Codewars",
    "url": "https://www.codewars.com/",
    "subjects": [
      "java",
      "python",
      "c",
      "js",
      "dsa"
    ],
    "kind": "practice",
    "description": "Solve small coding kata, pass tests and compare approaches after solving a problem yourself.",
    "access": "Join/login offered; optional subscription linked. Feature terms vary.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "odin",
    "title": "The Odin Project",
    "url": "https://www.theodinproject.com/",
    "subjects": [
      "html",
      "css",
      "js"
    ],
    "kind": "courses",
    "description": "Follow a full-stack web curriculum and build projects rather than only watching tutorials.",
    "access": "Free curriculum; account and community features available.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "sqlzoo",
    "title": "SQLZoo",
    "url": "https://sqlzoo.net/wiki/SQL_Tutorial",
    "subjects": [
      "dbms"
    ],
    "kind": "practice",
    "description": "Write SQL queries through tutorials, quizzes and assessments, then use them to test your DBMS understanding.",
    "access": "Tutorial readable without a visible account or price gate.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "coddy",
    "title": "Coddy · HTML learning",
    "url": "https://coddy.tech/",
    "subjects": [
      "html",
      "css",
      "js",
      "python"
    ],
    "kind": "practice",
    "description": "Explore interactive coding lessons. Start with HTML fundamentals when that journey is available.",
    "access": "Free to start with optional premium features.",
    "status": "limited",
    "origin": "Added from your list",
    "verifiedAt": null,
    "originalUrl": "https://coddy.tech/journeys/html/fundamentals",
    "caution": "Supplied HTML-journey URL redirected to the homepage; that exact course was not verified."
  },
  {
    "id": "circuitverse",
    "title": "CircuitVerse",
    "url": "https://circuitverse.org/",
    "subjects": [
      "coa"
    ],
    "kind": "tools",
    "description": "Design and simulate digital logic circuits to connect Boolean logic with computer architecture.",
    "access": "Free, open-source platform; account features available.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "freecodecamp",
    "title": "freeCodeCamp",
    "url": "https://www.freecodecamp.org/",
    "subjects": [
      "html",
      "css",
      "js",
      "python",
      "dbms"
    ],
    "kind": "courses",
    "description": "Work through coding challenges and projects alongside web-development and programming lessons.",
    "access": "Platform states learning is free; sign-in options available.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "mindluster",
    "title": "MindLuster",
    "url": "https://www.mindluster.com/",
    "subjects": [
      "general",
      "html",
      "css",
      "js",
      "python",
      "java"
    ],
    "kind": "courses",
    "description": "Browse courses by topic when you need a different explanation or a longer lesson sequence.",
    "access": "Free courses advertised; premium and certificate terms vary.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "codedex",
    "title": "Codédex",
    "url": "https://www.codedex.io/",
    "subjects": [
      "python",
      "html",
      "css",
      "js"
    ],
    "kind": "practice",
    "description": "A supplied coding-learning destination; check its current course catalog before starting.",
    "access": "Access and pricing not confirmed.",
    "status": "limited",
    "origin": "Added from your list",
    "verifiedAt": null,
    "caution": "Page stayed loading on two review attempts; course features could not be verified."
  },
  {
    "id": "flexbox-froggy",
    "title": "Flexbox Froggy",
    "url": "https://flexboxfroggy.com/",
    "subjects": [
      "css"
    ],
    "kind": "practice",
    "description": "Practice CSS Flexbox alignment by positioning frogs with CSS rules.",
    "access": "Browser puzzle; no sign-in or price gate shown.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "grid-garden",
    "title": "Grid Garden",
    "url": "https://cssgridgarden.com/",
    "subjects": [
      "css"
    ],
    "kind": "practice",
    "description": "Practice CSS Grid placement with a visual garden puzzle.",
    "access": "Browser puzzle; no sign-in or price gate shown.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "elevator-saga",
    "title": "Elevator Saga",
    "url": "https://play.elevatorsaga.com/",
    "subjects": [
      "js",
      "dsa"
    ],
    "kind": "practice",
    "description": "Write JavaScript to control simulated elevators and meet challenge targets.",
    "access": "Browser programming game; no sign-in or price gate shown.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "codingame",
    "title": "CodinGame",
    "url": "https://www.codingame.com/",
    "subjects": [
      "dsa",
      "java",
      "python",
      "c",
      "js"
    ],
    "kind": "practice",
    "description": "Practice programming through puzzles and competitions; explore agent and bot challenges.",
    "access": "Sign-up/login needed for some participation; current terms belong to the provider.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "codecombat",
    "title": "CodeCombat",
    "url": "https://codecombat.com/",
    "subjects": [
      "python",
      "js"
    ],
    "kind": "practice",
    "description": "Learn coding through game-based lessons and challenges.",
    "access": "Free signup offered; some home and classroom offerings are paid.",
    "status": "checked",
    "origin": "Added from your list",
    "verifiedAt": "2026-11-13"
  },
  {
    "id": "modern-c",
    "title": "Modern C · Jens Gustedt",
    "url": "https://inria.hal.science/hal-02383654v2/file/modernC.pdf",
    "subjects": [
      "c"
    ],
    "kind": "books",
    "description": "Study C types, expressions, memory and modern programming techniques. Use the author’s current edition for C23-specific material.",
    "access": "Author-deposited free PDF; CC BY-NC-ND 4.0. Commercial editions are available separately.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-13",
    "format": "PDF",
    "evidenceUrl": "https://gustedt.gitlabpages.inria.fr/modern-c/",
    "caution": "The supplied URL selects HAL version v2. Check the author page for the latest revision; do not assume a version-pinned PDF is always current."
  },
  {
    "id": "eloquent-javascript",
    "title": "Eloquent JavaScript · Marijn Haverbeke",
    "url": "https://eloquentjavascript.net/Eloquent_JavaScript.pdf",
    "subjects": [
      "js"
    ],
    "kind": "books",
    "description": "Read JavaScript fundamentals, functions, objects, asynchronous code, browser APIs and Node.js, then work through the book’s projects and exercises.",
    "access": "Free author-hosted PDF. Text: CC BY-NC 3.0; code: MIT. Printed edition sold separately.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-13",
    "format": "PDF",
    "evidenceUrl": "https://eloquentjavascript.net/"
  },
  {
    "id": "html-css-duckett",
    "pdf": "/library/html-css-duckett.pdf",
    "title": "HTML & CSS: Design and Build Websites · Jon Duckett",
    "url": "https://www.htmlandcssbook.com/",
    "subjects": [
      "html",
      "css"
    ],
    "kind": "books",
    "description": "Learn HTML page structure, CSS styling, typography and layout through visual examples. This 2011 book is a foundation, not a current web-platform reference.",
    "access": "Commercial Wiley book. Official sample chapter and code samples are available; full-book free access is not established.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-13",
    "originalUrl": "https://www.dcpehvpm.org/E-Content/BCA/BCA-II/Web%20Technology/HTML%20and%20CSS%20design%20and%20build%20websites.pdf",
    "caution": "The supplied college-hosted PDF contains a restrictive copyright notice; hosting permission is unverified. Prefer the official book page or library access. Some examples, including Flash, are historical; use modern references for current practice."
  },
  {
    "id": "grokking-algorithms",
    "pdf": "/library/grokking-algorithms.pdf",
    "title": "Grokking Algorithms · Aditya Bhargava",
    "url": "https://www.manning.com/books/grokking-algorithms",
    "subjects": [
      "dsa"
    ],
    "kind": "books",
    "description": "Build intuition for searching, sorting, graphs and dynamic programming through illustrated examples before moving to heavier texts.",
    "access": "Paid Manning publication (print, and subscription access on liveBook). No free full text offered.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Publisher page",
    "evidenceUrl": "https://www.manning.com/books/grokking-algorithms",
    "caution": "Examples are in Python, and the book is introductory: pair it with a full DSA text and practice problems. The supplied PDF filename was “DSA basics”; it is the 2016 first edition and carries Manning’s copyright. Hosting permission is not established, so it is not linked."
  },
  {
    "id": "fundamentals-database-systems",
    "pdf": "/library/fundamentals-database-systems.pdf",
    "title": "Fundamentals of Database Systems · Elmasri & Navathe",
    "url": "https://www.pearson.com/en-us/subject-catalog/p/fundamentals-of-database-systems/P200000003546",
    "subjects": [
      "dbms"
    ],
    "kind": "books",
    "description": "Use it for relational theory, normalization, SQL, indexing, transactions and database design, alongside Database System Concepts.",
    "access": "Paid Pearson textbook (print or eTextbook). No free full text offered.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Publisher page",
    "evidenceUrl": "https://www.pearson.com/en-us/subject-catalog/p/fundamentals-of-database-systems/P200000003546",
    "caution": "The supplied copy is the 7th edition from a PDF-sharing site (PDFDrive); hosting permission is not established, so it is not linked. Pearson lists a 2021 update of the 7th edition."
  },
  {
    "id": "sql-cookbook",
    "pdf": "/library/sql-cookbook.pdf",
    "title": "SQL Cookbook, 2nd edition · Molinaro & de Graaf",
    "url": "https://www.oreilly.com/library/view/sql-cookbook-2nd/9781492077435/",
    "subjects": [
      "dbms"
    ],
    "kind": "books",
    "description": "Look up worked recipes for joins, windowing, hierarchies, pivots and everyday query problems once the basics are familiar.",
    "access": "Paid O’Reilly title; read with an O’Reilly membership or buy. Trial terms are set by O’Reilly.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Publisher page",
    "evidenceUrl": "https://www.oreilly.com/library/view/sql-cookbook-2nd/9781492077435/",
    "caution": "Published November 2020. The supplied PDF carries O’Reilly’s copyright and is not linked. Recipes cover several database products, so check syntax against your own engine."
  },
  {
    "id": "head-first-java",
    "pdf": "/library/head-first-java.pdf",
    "title": "Head First Java, 3rd edition · Sierra, Bates & Gee",
    "url": "https://www.oreilly.com/library/view/head-first-java/9781492091646/",
    "subjects": [
      "java"
    ],
    "kind": "books",
    "description": "Learn core Java and object-oriented ideas through puzzles and visual explanations, including lambdas, streams, generics and threading.",
    "access": "Paid O’Reilly title; read with an O’Reilly membership or buy.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Publisher page",
    "evidenceUrl": "https://www.oreilly.com/library/view/head-first-java/9781492091646/",
    "caution": "Search result for the 3rd edition (May 2022) was confirmed; the page itself could not be re-extracted in a signed-out browser. The supplied 156 MB PDF is not linked because hosting permission is not established."
  },
  {
    "id": "c-modern-approach",
    "pdf": "/library/c-modern-approach.pdf",
    "title": "C Programming: A Modern Approach, 2nd edition · K. N. King",
    "url": "https://wwnorton.com/books/9780393979503",
    "subjects": [
      "c"
    ],
    "kind": "books",
    "description": "Follow a gentle but thorough route through C99 for coursework, with exercises and the author’s supporting pages.",
    "access": "Paid W. W. Norton book (2008). No free full text offered. The author’s own site, knking.com, has supporting material but is served over plain HTTP, so it is not linked.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Publisher page",
    "evidenceUrl": "https://wwnorton.com/books/9780393979503",
    "caution": "The supplied PDF is not linked because hosting permission is not established. It covers C99, not newer standards; use Modern C or current references for C11 and later."
  },
  {
    "id": "mano-computer-system-architecture",
    "pdf": "/library/mano-computer-system-architecture.pdf",
    "title": "Computer System Architecture · M. Morris Mano",
    "url": "https://www.pearsoned.co.in/prc/book/m-morris-mano-computer-system-architecture-3e--3/9789332585607",
    "subjects": [
      "coa"
    ],
    "kind": "books",
    "description": "Study register transfer, microprogrammed control, CPU design, I/O and memory organization in the classic textbook order.",
    "access": "Paid Pearson India textbook. No free full text offered.",
    "status": "limited",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Publisher page",
    "evidenceUrl": "https://www.pearsoned.co.in/prc/book/m-morris-mano-computer-system-architecture-3e--3/9789332585607",
    "caution": "The Pearson India page is a revised 3rd edition with co-author Rajib Mall. The supplied scan, identified from its cover, is the older Mano-only 3rd edition (International Edition). Chapter numbering may differ. Not linked because hosting permission is not established."
  },
  {
    "id": "javascript-jquery-duckett",
    "pdf": "/library/javascript-jquery-duckett.pdf",
    "title": "JavaScript & jQuery · Jon Duckett",
    "url": "https://javascriptbook.com/",
    "subjects": [
      "js"
    ],
    "kind": "books",
    "description": "Learn browser JavaScript visually and use the companion site’s code and extras. Treat the jQuery material as legacy for new projects.",
    "access": "Paid Wiley book. The companion site offers code downloads and extras; the book itself is not free.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Companion site",
    "evidenceUrl": "https://javascriptbook.com/",
    "caution": "Published 2014, so it predates modern ES modules and current framework practice. The supplied PDF is a scan with Wiley’s copyright notice and is not linked."
  },
  {
    "id": "rosen-discrete-mathematics",
    "pdf": "/library/rosen-discrete-mathematics.pdf",
    "title": "Discrete Mathematics and Its Applications, 8th edition · Kenneth H. Rosen",
    "url": "https://books.google.com/books/about/Discrete_Mathematics_and_Its_Application.html?id=T_K9tgEACAAJ",
    "subjects": [
      "maths",
      "dsa"
    ],
    "kind": "books",
    "description": "Use it for logic, proofs, sets, counting, relations, graphs and trees that underpin algorithms and theory of computation.",
    "access": "Paid McGraw-Hill textbook (2019). The link is a Google Books record, not a free text.",
    "status": "limited",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Catalogue record",
    "evidenceUrl": "https://search.worldcat.org/title/Discrete-mathematics-and-its-applications/oclc/1025409043",
    "caution": "McGraw-Hill’s product page could not be loaded, so this links to a catalogue record confirming edition and publisher. Prefer the publisher or your library. The supplied PDF is not linked because hosting permission is not established."
  },
  {
    "id": "strang-linear-algebra",
    "pdf": "/library/strang-linear-algebra.pdf",
    "title": "Introduction to Linear Algebra · Gilbert Strang",
    "url": "https://math.mit.edu/~gs/linearalgebra/",
    "subjects": [
      "maths"
    ],
    "kind": "books",
    "description": "Learn vectors, subspaces, eigenvalues and SVD, and pair the book with Strang’s free MIT 18.06 lectures.",
    "access": "Paid Wellesley-Cambridge Press book. Strang’s site lists the current editions; MIT OpenCourseWare 18.06 videos and problem sets are free under MIT’s OCW terms.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Author page",
    "evidenceUrl": "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
    "caution": "The supplied scan is the 4th edition (2009); the author site now lists the 5th and 6th. Chapter numbers differ between editions. Not linked because hosting permission is not established."
  },
  {
    "id": "no-bs-linear-algebra",
    "pdf": "/library/no-bs-linear-algebra.pdf",
    "title": "No Bullshit Guide to Linear Algebra · Ivan Savov",
    "url": "https://minireference.com/",
    "subjects": [
      "maths"
    ],
    "kind": "books",
    "description": "Get a compact, conversational introduction to linear algebra with applications; useful as a second explanation next to Strang.",
    "access": "Self-published paid book (about 596 pages). The author offers a preview on his site; the full book is sold separately.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Author page",
    "evidenceUrl": "https://minireference.com/",
    "caution": "The supplied file is only an extended preview (about 150 pages) carrying the author’s all-rights-reserved notice, not the full book. It is not linked."
  },
  {
    "id": "head-first-statistics",
    "pdf": "/library/head-first-statistics.pdf",
    "title": "Head First Statistics · Dawn Griffiths",
    "url": "https://www.oreilly.com/library/view/head-first-statistics/9780596527587/",
    "subjects": [
      "maths"
    ],
    "kind": "books",
    "description": "Learn descriptive statistics, probability and distributions through worked, visual examples.",
    "access": "Paid O’Reilly title (2008); read with an O’Reilly membership or buy. No free preview on the page.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Publisher page",
    "evidenceUrl": "https://www.oreilly.com/library/view/head-first-statistics/9780596527587/",
    "caution": "The supplied PDF is a 73-page excerpt, not the full 716-page book. It is not linked. Examples are classroom-style; use a modern text for applied data science."
  },
  {
    "id": "naked-statistics",
    "pdf": "/library/naked-statistics.pdf",
    "title": "Naked Statistics · Charles Wheelan",
    "url": "https://wwnorton.com/books/9780393347777",
    "subjects": [
      "maths"
    ],
    "kind": "books",
    "description": "Read for an intuition-first tour of statistical ideas, with plain-language examples and little formula work.",
    "access": "Paid W. W. Norton paperback. No free full text offered.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Publisher page",
    "evidenceUrl": "https://wwnorton.com/books/9780393347777",
    "caution": "The supplied file is a Bookey summary of the book, not Wheelan’s text, so it should not be treated as the book. It is not linked."
  },
  {
    "id": "statistics-plain-english",
    "pdf": "/library/statistics-plain-english.pdf",
    "title": "Statistics in Plain English, 5th edition · Timothy C. Urdan",
    "url": "https://www.routledge.com/Statistics-in-Plain-English/Urdan/p/book/9780367342838",
    "subjects": [
      "maths"
    ],
    "kind": "books",
    "description": "Use short chapters on each statistic: what it does, when to use it, a worked example and how to write it up.",
    "access": "Paid Routledge title (2022). No free full text offered.",
    "status": "checked",
    "origin": "Added book links",
    "verifiedAt": "2026-11-16",
    "format": "Publisher page",
    "evidenceUrl": "https://www.routledge.com/Statistics-in-Plain-English/Urdan/p/book/9780367342838",
    "caution": "The supplied PDF is the 2001 first edition from Lawrence Erlbaum Associates; the current edition is the 5th (2022). It is not linked because hosting permission is not established."
  }
];
