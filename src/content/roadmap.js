// Named lessons are phase milestones; they do not certify full subject mastery.
export const ROADMAP = [
  {
    phase: "Phase 1 — Foundations",
    accent: "green",
    items: [
      {
        subjectId: "dsa",
        topic: "big-o-notation",
        focus: "Big-O Notation",
        note: "Start with Big-O and basic data structures — the vocabulary everything else uses. Complexity is the lens every later decision passes through."
      },
      {
        subjectId: "python",
        topic: "variables-and-types",
        focus: "Variables & Dynamic Typing",
        note: "Python's readable syntax lets you focus on logic, not ceremony. A great first language — names are labels, types live on values."
      },
      { subjectId: "aptitude", topic: "aptitude-basics", focus: "Aptitude Foundations", note: "Practice quantitative reasoning alongside programming; this milestone introduces the aptitude study path." },
      {
        subjectId: "c",
        topic: "language-basics",
        focus: "C Basics",
        note: "Pointers and memory — understand what the machine actually does. C teaches you the cost of every abstraction you'll later take for granted."
      }
    ]
  },
  {
    phase: "Phase 2 — Core Programming",
    accent: "brown",
    items: [
      {
        subjectId: "java",
        topic: "oop-classes-objects",
        focus: "OOP: Classes & Objects",
        note: "Static typing and OOP done right — the enterprise lingua franca. Classes, encapsulation, inheritance, and polymorphism, all in one place."
      },
      {
        subjectId: "dsa",
        topic: "bubble-sort",
        focus: "Sorting Algorithms",
        note: "Now go deep on algorithms — sorting, searching, trees, graphs. Use lesson examples and the available Bubble Sort visualizer to study the mechanics."
      }
    ]
  },
  {
    phase: "Phase 3 — The Web Layer",
    accent: "orange",
    items: [
      {
        subjectId: "html",
        topic: "document-structure-semantics",
        focus: "Document Structure & Semantics",
        note: "The structure of every page on the web — semantic markup, forms, accessibility, and the HTML5 APIs that make a document interactive."
      },
      {
        subjectId: "css",
        topic: "the-box-model",
        focus: "The Box Model",
        note: "Layout, design, responsiveness — the box model, flexbox, grid, and the cascade that decides who wins when rules collide."
      },
      {
        subjectId: "js",
        topic: "event-loop",
        focus: "The Event Loop",
        note: "Behavior, the DOM, and async — the language of the browser. Closures, the event loop, and prototypes are the tricky parts."
      }
    ]
  },
  {
    phase: "Phase 4 — CS Core Theory",
    accent: "brown",
    items: [
      {
        subjectId: "os",
        topic: "process-states",
        focus: "Process States",
        note: "Processes, memory, scheduling, concurrency. Why programs behave as they do under the hood, and how the kernel shares one machine among many."
      },
      {
        subjectId: "dbms",
        topic: "sql-joins",
        focus: "SQL Joins",
        note: "Relational model, SQL, transactions, normalization, indexes — how data is stored, queried, and kept consistent under concurrent access."
      },
      {
        subjectId: "networks",
        topic: "tcp-connection",
        focus: "TCP Connection",
        note: "How data crosses the planet in milliseconds — the layered protocols from bits on a wire up to HTTP and application-level security."
      },
      {
        subjectId: "coa",
        topic: "memory-hierarchy",
        focus: "Memory Hierarchy",
        note: "How hardware executes your code — pipelines, caches, and the memory hierarchy that decide whether your program is fast or slow."
      }
    ]
  },
  {
    phase: "Phase 5 — Applied & Advanced",
    accent: "green",
    items: [
      { subjectId: "systemdesign", topic: "systemdesign-basics", focus: "System Design Foundations", note: "Move from individual algorithms to component responsibilities, trade-offs and system design." },
      {
        subjectId: "dsa",
        topic: "knapsack-dp",
        focus: "Knapsack Dynamic Programming",
        note: "Advanced territory: dynamic programming and graph algorithms. This is where the hard interview questions live."
      },
      {
        subjectId: "java",
        topic: "multithreading-basics",
        focus: "Multithreading",
        note: "Concurrency, streams, lambdas, and the JVM — production-grade Java. The skills that separate working code from shipped code."
      }
    ]
  }
];
