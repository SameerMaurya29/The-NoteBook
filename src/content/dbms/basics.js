// DBMS — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "domain-basics",
  title: "DBMS Basics — Why & How",
  difficulty: "easy",
  definition: `A Database Management System (DBMS) stores, queries, and protects data so applications can persist state reliably. You use it for almost every app that keeps data — users, orders, posts, configs — and you talk to it primarily with SQL.`,
  coreUnderstanding: `Almost every application needs to remember things after it stops running. A DBMS provides durable, queryable, concurrent, safe storage. The relational model organizes data into tables (rows = records, columns = fields), and SQL is the language to define and query them. You learn DBMS to model data well (normalization), write efficient queries (indexes, joins), and guarantee correctness under concurrent access (transactions, ACID). The trade-offs: a database adds infrastructure and latency, but removes enormous amounts of hand-rolled persistence code.`,
  howItWorks: `1. WHY: durable, queryable, concurrent, safe storage. Without a DB you'd hand-roll file parsing, locking, and crash recovery — badly.
2. WHERE: any app with persistent state (users, orders, content). Web/mobile backends, analytics, reporting.
3. RELATIONAL MODEL: data lives in TABLES. A row is one record; a column is a field. A PRIMARY KEY uniquely identifies a row; a FOREIGN KEY references another table's primary key (a relationship).
4. SQL SYNTAX: statements end with a semicolon \`;\`. Keywords are case-insensitive (but conventionally UPPERCASE). String literals use single quotes \`'text'\`. Commas separate columns and values. Parentheses group subqueries and function arguments; SQL has NO braces for blocks.
5. CORE STATEMENTS: \`SELECT col FROM table WHERE cond;\` (read), \`INSERT INTO table VALUES (...);\` (add), \`UPDATE table SET col = val WHERE cond;\` (change), \`DELETE FROM table WHERE cond;\` (remove).
6. JOINS combine rows across tables on a key: \`SELECT * FROM orders JOIN users ON orders.user_id = users.id;\`.
7. TRANSACTIONS (ACID): a transaction is a unit of work that's all-or-nothing. \`BEGIN; ... COMMIT;\` (or \`ROLLBACK;\`). ACID = Atomicity, Consistency, Isolation, Durability.
8. INDEXES speed up reads (a B-tree index turns an O(n) table scan into O(log n)) but slow down writes and cost space.
9. NORMALIZATION removes redundancy (1NF → 2NF → 3NF): each fact stored once, keyed properly.`,
  codeExamples: [
    {
      lang: "sql",
      code: `-- statements end with ;  keywords UPPER (convention)  strings in 'quotes'
CREATE TABLE users (
    id    INTEGER PRIMARY KEY,        -- uniquely identifies a row
    name  TEXT NOT NULL,
    email TEXT UNIQUE
);

INSERT INTO users (id, name, email) VALUES (1, 'Ada', 'ada@x.io');  -- commas separate values
INSERT INTO users (id, name, email) VALUES (2, 'Bob', 'bob@x.io');

-- SELECT ... FROM ... WHERE ...  (read)
SELECT name FROM users WHERE id = 1;     -- -> Ada

-- JOIN combines tables on a key
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, total REAL);
INSERT INTO orders VALUES (101, 1, 49.99);

SELECT users.name, orders.total
FROM orders
JOIN users ON orders.user_id = users.id;  -- -> Ada | 49.99

-- transaction: all-or-nothing
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;   -- or ROLLBACK; to undo both`,
      output: `Ada
Ada | 49.99`,
      note: "SQL statements end with ;. Commas separate columns/values. Single quotes for strings. JOIN links tables on a key. Transactions (BEGIN/COMMIT/ROLLBACK) make multi-step changes all-or-nothing."
    }
  ],
  marginNotes: [
    "SQL statements end with a semicolon ;. Forgetting it in a script is fine (the next statement separates), but in a REPL the query won't run until ;.",
    "String literals use SINGLE quotes 'ada@x.io'. Double quotes \"name\" refer to identifiers (table/column names), not strings — mixing them is a common error.",
    "A PRIMARY KEY uniquely identifies a row; a FOREIGN KEY references another table's primary key to express a relationship. Every foreign key should have an index.",
    "Always use a transaction (BEGIN/COMMIT) for multi-step changes. If step 2 fails, ROLLBACK undoes step 1 — no half-applied state."
  ],
  commonMistakes: [
    "Using double quotes for string literals — they're for identifiers. Use single quotes for strings.",
    "Writing UPDATE or DELETE without a WHERE clause — it changes/deletes EVERY row. Always qualify with WHERE.",
    "Forgetting to wrap multi-step changes in a transaction — a crash mid-way leaves inconsistent data."
  ],
  relatedTopics: ["Relational Model & ER Diagrams", "SQL Basics", "Transactions & ACID"],
  externalLinks: [
    { label: "SQLZoo", url: "https://sqlzoo.net/" },
    { label: "PostgreSQL Tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html" }
  ],
  mcqs: [
    {
      question: "What ends an SQL statement?",
      options: ["A newline", "A semicolon ;", "A closing brace }", "The word END"],
      answer: 1,
      explanations: ["A newline alone doesn't end a statement in a script.", "Correct — SQL statements end with ;. In a REPL the query waits for ; before running.", "SQL has no braces for blocks.", "There is no END keyword for statements."],
      difficulty: "easy"
    },
    {
      question: "Which quotes do SQL string literals use?",
      options: ["Double quotes \"...\"", "Single quotes '...'", "Backticks `...`", "No quotes"],
      answer: 1,
      explanations: ["Double quotes are for identifiers (table/column names) in standard SQL.", "Correct — string literals use single quotes: 'ada@x.io'. Double quotes refer to identifiers, not strings.", "Backticks are MySQL-specific for identifiers.", "Strings need quotes."],
      difficulty: "easy"
    },
    {
      question: "Why wrap multi-step changes in a transaction?",
      options: ["It's faster", "So they're all-or-nothing — a failure can ROLLBACK the whole group, leaving no half-applied state", "It saves disk space", "It avoids indexes"],
      answer: 1,
      explanations: ["Transactions add overhead, not speed.", "Correct — ACID atomicity: either all changes commit or none do. A crash or error mid-transaction lets you ROLLBACK, preventing inconsistent data.", "No space saving.", "Indexes are independent."],
      difficulty: "medium"
    }
  ]
};