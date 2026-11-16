// DBMS — more foundational "things you have to know" notes (part 2).
// Condensed mental models that complement the "Why & How" basics note.
export default [
  {
    id: "sql-query-shape",
    title: "The Shape of an SQL Query",
    difficulty: "easy",
    definition: `Every SQL query has a fixed clause order: SELECT (what columns), FROM (which tables), WHERE (row filter), GROUP BY (grouping), HAVING (group filter), ORDER BY (sort), LIMIT (how many). The database evaluates them in a DIFFERENT order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Knowing both orders is the key to writing and debugging queries.`,
    coreUnderstanding: `SQL is declarative — you describe the result you want, not how to get it. But the clauses have a fixed syntactic order (SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT) and a fixed logical evaluation order that differs (FROM first, SELECT near the end). This gap trips up beginners: you can't use a column alias defined in SELECT inside WHERE (WHERE runs before SELECT), but you can use it in ORDER BY (ORDER BY runs after SELECT). Aggregates (COUNT, SUM, AVG) collapse rows in GROUP BY; HAVING filters groups (not rows — that's WHERE). Understanding the evaluation order explains why aliases work in some clauses and not others, and why WHERE can't contain aggregates but HAVING can.`,
    howItWorks: `1. SYNTACTIC ORDER (how you write it): SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT.
2. EVALUATION ORDER (how the DB runs it): FROM (pick tables, do joins) → WHERE (filter rows) → GROUP BY (group rows) → HAVING (filter groups) → SELECT (pick/compute columns) → DISTINCT (dedupe) → ORDER BY (sort) → LIMIT (truncate).
3. SELECT: choose columns or compute expressions. Aliases (AS) are created here — so they're available to ORDER BY and LIMIT but NOT to WHERE or GROUP BY (which run earlier).
4. WHERE: filter individual rows BEFORE grouping. Cannot use aggregates (no WHERE COUNT(*) > 5 — use HAVING instead).
5. GROUP BY: collapse rows that share the grouped columns into one row per group. Every non-aggregated column in SELECT must appear in GROUP BY.
6. HAVING: filter groups AFTER grouping. CAN use aggregates (HAVING COUNT(*) > 5).
7. ORDER BY: sort the final rows. Can use SELECT aliases and aggregates.
8. LIMIT / OFFSET: return only the first N rows (and skip OFFSET).`,
    codeExamples: [
      {
        lang: "sql",
        code: `-- clause order (how you write it) vs evaluation order (how it runs)
SELECT   dept, COUNT(*) AS num, AVG(salary) AS avg_sal   -- 5. pick columns
FROM     employees                                          -- 1. start with the table
WHERE    status = 'active'                                  -- 2. filter rows first
GROUP BY dept                                               -- 3. group surviving rows
HAVING    COUNT(*) > 3                                      -- 4. filter groups (uses aggregate)
ORDER BY avg_sal DESC                                       -- 6. sort (can use the SELECT alias)
LIMIT    5;                                                 -- 7. keep top 5

-- WHY the alias works in ORDER BY but not WHERE:
--   WHERE runs BEFORE SELECT, so avg_sal doesn't exist yet in WHERE.
--   ORDER BY runs AFTER SELECT, so the alias is available.
-- BAD:  WHERE avg_sal > 50000      -- ERROR: alias not known yet
-- GOOD: HAVING AVG(salary) > 50000  -- HAVING runs after grouping, can aggregate
-- GOOD: ORDER BY avg_sal DESC       -- ORDER BY runs after SELECT, alias is known

-- aggregate functions collapse rows:
SELECT COUNT(*) FROM employees;              -- one row (total count)
SELECT dept, COUNT(*) FROM employees GROUP BY dept;  -- one row per dept`,
        output: `dept    | num | avg_sal
--------+-----+--------
Eng     |  12 | 95000
Sales   |   8 | 72000`,
        note: "Write order: SELECT FROM WHERE GROUP BY HAVING ORDER BY LIMIT. Run order: FROM WHERE GROUP BY HAVING SELECT ORDER BY LIMIT. Aliases from SELECT are available in ORDER BY but not WHERE (WHERE runs first)."
      }
    ],
    marginNotes: [
      "The evaluation order differs from the write order: FROM runs first, SELECT runs near the end. This is why a SELECT alias can't be used in WHERE (WHERE hasn't run SELECT yet) but can be used in ORDER BY.",
      "WHERE filters rows BEFORE grouping and can't use aggregates. HAVING filters groups AFTER grouping and can use aggregates. Use WHERE for row conditions, HAVING for group conditions.",
      "Every non-aggregated column in SELECT must appear in GROUP BY — otherwise the DB doesn't know which value to pick for the group. SELECT dept, COUNT(*) ... GROUP BY dept is valid; SELECT dept, name, COUNT(*) ... GROUP BY dept is not (name isn't grouped or aggregated).",
      "LIMIT without ORDER BY returns an arbitrary set of rows — always pair LIMIT with ORDER BY so the 'top N' is deterministic."
    ],
    commonMistakes: [
      "Using a SELECT alias in WHERE — WHERE runs before SELECT, so the alias doesn't exist yet. Repeat the expression or use HAVING (for aggregates).",
      "Putting an aggregate in WHERE (WHERE COUNT(*) > 5) — aggregates aren't allowed in WHERE; use HAVING instead.",
      "Listing a non-aggregated column in SELECT that isn't in GROUP BY — the DB can't determine which value to show for the group."
    ],
    relatedTopics: ["DBMS Basics — Why & How", "SQL Basics", "SQL GROUP BY"],
    externalLinks: [
      { label: "SQL Order of Execution", url: "https://sqlbolt.com/lesson/select_queries_order_of_execution" },
      { label: "PostgreSQL: SELECT", url: "https://www.postgresql.org/docs/current/sql-select.html" }
    ],
    mcqs: [
      {
        question: "What is the logical evaluation order of SQL clauses?",
        options: ["SELECT, FROM, WHERE, GROUP BY", "FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT", "The same as the write order", "It depends on the optimizer"],
        answer: 1,
        explanations: ["That's the write order.", "Correct — the DB evaluates FROM first (pick tables/joins), then WHERE (filter rows), GROUP BY (group), HAVING (filter groups), SELECT (pick columns), ORDER BY (sort), LIMIT (truncate). This differs from the write order.", "Write and evaluation order differ.", "The optimizer chooses the physical plan, but the logical order is fixed."],
        difficulty: "medium"
      },
      {
        question: "Why can't you use a SELECT alias in WHERE?",
        options: ["Aliases aren't allowed in SQL", "WHERE runs before SELECT, so the alias doesn't exist yet", "Aliases are case-sensitive", "WHERE doesn't support expressions"],
        answer: 1,
        explanations: ["Aliases are allowed.", "Correct — the evaluation order is FROM → WHERE → ... → SELECT. WHERE runs before SELECT creates the alias, so the alias is unknown in WHERE. It IS available in ORDER BY (which runs after SELECT).", "Case isn't the issue.", "WHERE supports expressions."],
        difficulty: "medium"
      },
      {
        question: "What is the difference between WHERE and HAVING?",
        options: ["They're the same", "WHERE filters rows before grouping (no aggregates); HAVING filters groups after grouping (can use aggregates)", "WHERE is faster", "HAVING replaces WHERE"],
        answer: 1,
        explanations: ["They differ.", "Correct — WHERE filters individual rows before GROUP BY and can't use aggregates. HAVING filters groups after GROUP BY and can use aggregates (HAVING COUNT(*) > 5).", "Speed isn't the difference.", "They complement each other."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "join-mental-model",
    title: "Joins at a Glance",
    difficulty: "medium",
    definition: `A join combines rows from two tables based on a matching column (usually a foreign key). INNER JOIN keeps only matching rows from both tables. LEFT JOIN keeps all rows from the left table plus matches from the right (NULL where no match). RIGHT JOIN mirrors that. FULL JOIN keeps everything from both tables. CROSS JOIN pairs every row with every row (cartesian product). Think of joins as Venn diagrams: INNER = intersection, LEFT = left circle, FULL = both circles.`,
    coreUnderstanding: `Joins answer: "how do rows from table A line up with rows from table B?" The match is on a key (usually A.id = B.a_id). INNER JOIN keeps only rows where both sides match — the intersection. LEFT JOIN keeps every row from the left table whether or not it matches; where there's no match, the right table's columns are NULL. This is how you find "all customers and their orders, including customers with no orders." RIGHT JOIN is the mirror (keep all right rows). FULL OUTER JOIN keeps everything — matched plus unmatched from both sides. CROSS JOIN doesn't match on a key — it pairs every row of A with every row of B (N×M rows), useful for generating combinations. The mental model: INNER = intersection, LEFT = left circle + matches, FULL = union of both circles.`,
    howItWorks: `1. INNER JOIN A JOIN B ON A.id = B.a_id: keep only rows where A.id matches B.a_id. Unmatched rows from both sides are dropped.
2. LEFT (OUTER) JOIN A LEFT JOIN B ON ...: keep ALL rows from A. For each, if a matching B exists, attach it; if not, B's columns are NULL. Use this to find "all A, including those with no B."
3. RIGHT (OUTER) JOIN: mirror of LEFT — keep all rows from B. Rarely used (just swap table order and use LEFT).
4. FULL (OUTER) JOIN: keep all rows from both. Matched rows are combined; unmatched rows from either side have NULLs on the other side.
5. CROSS JOIN A CROSS JOIN B: every row of A paired with every row of B (N × M rows). No ON condition. Use for combinations.
6. SELF JOIN: join a table to itself (with aliases) — e.g., employees joined to their managers (both in the same table).
7. MULTI-TABLE JOIN: chain joins — A JOIN B ON ... JOIN C ON .... The DB joins pairwise; the order can affect performance (the optimizer chooses).`,
    codeExamples: [
      {
        lang: "sql",
        code: `-- tables: customers(id, name)  orders(id, customer_id, total)
-- customers: 1 Alice, 2 Bob, 3 Carol
-- orders:    101 cust=1 $50, 102 cust=1 $30, 103 cust=2 $20
--            (Carol has no orders)

-- INNER JOIN: only customers WITH orders (Carol dropped)
SELECT c.name, o.total
FROM customers c JOIN orders o ON c.id = o.customer_id;
-- Alice | 50
-- Alice | 30
-- Bob   | 20

-- LEFT JOIN: ALL customers, NULL total where no order (Carol kept)
SELECT c.name, o.total
FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;
-- Alice | 50
-- Alice | 30
-- Bob   | 20
-- Carol | NULL

-- FULL JOIN: all rows from both sides (here same as LEFT since every order has a customer)
-- CROSS JOIN: every customer x every order (3 x 3 = 9 rows)
SELECT c.name, o.total FROM customers c CROSS JOIN orders o;

-- SELF JOIN: employees and their managers (same table, two aliases)
SELECT e.name AS emp, m.name AS manager
FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;`,
        output: "(join results)",
        note: "INNER = intersection (only matches). LEFT = all left rows + matches (NULL where no match). FULL = both sides. CROSS = every pair (N×M). SELF JOIN uses aliases to join a table to itself."
      }
    ],
    marginNotes: [
      "INNER JOIN drops unmatched rows from both sides. LEFT JOIN keeps all left rows (NULL on the right where there's no match). Choose LEFT when you need 'all of A, including those without B.'",
      "A common LEFT JOIN use: find rows in A with NO match in B — add WHERE B.id IS NULL after a LEFT JOIN. This is the 'anti-join' pattern (customers who haven't ordered).",
      "CROSS JOIN produces N×M rows — it's expensive and usually a mistake if you forgot the ON condition. A JOIN without ON is implicitly a CROSS JOIN in some databases.",
      "In a multi-table join, the optimizer chooses the join order, not you. But you control which columns are joined on — joining on indexed columns (especially foreign keys) is much faster."
    ],
    commonMistakes: [
      "Using INNER JOIN when you need all rows from one side — INNER drops unmatched rows. Use LEFT JOIN to keep all rows from the left table.",
      "Forgetting the ON condition — a JOIN without ON becomes a CROSS JOIN (cartesian product), returning N×M rows. Usually a bug.",
      "Not indexing the join columns — joins on unindexed foreign keys force a full table scan on the inner table. Always index foreign keys."
    ],
    relatedTopics: ["DBMS Basics — Why & How", "SQL Joins", "Keys: Primary, Foreign, Candidate, Super"],
    externalLinks: [
      { label: "Visual JOIN (SQLBolt)", url: "https://sqlbolt.com/lesson/select_queries_with_joins" },
      { label: "JOIN types (PostgreSQL)", url: "https://www.postgresql.org/docs/current/queries-table-expressions.html" }
    ],
    mcqs: [
      {
        question: "Which join keeps all rows from the left table, with NULL where there's no match?",
        options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"],
        answer: 1,
        explanations: ["INNER drops unmatched rows.", "Correct — LEFT (OUTER) JOIN keeps every row from the left table. Where a matching right row exists, it's attached; where it doesn't, the right columns are NULL. Use it to find 'all A, including those without B.'", "CROSS pairs every row with every row.", "SELF joins a table to itself."],
        difficulty: "medium"
      },
      {
        question: "How do you find customers with NO orders using a join?",
        options: ["INNER JOIN then filter", "LEFT JOIN orders, then WHERE order.id IS NULL (anti-join)", "CROSS JOIN", "FULL JOIN"],
        answer: 1,
        explanations: ["INNER drops the no-order customers.", "Correct — LEFT JOIN keeps all customers (NULL for order columns where no match). Adding WHERE orders.id IS NULL filters to only the unmatched rows — customers with no orders. This is the anti-join pattern.", "CROSS is unrelated.", "FULL is overkill here."],
        difficulty: "medium"
      },
      {
        question: "What does a CROSS JOIN produce?",
        options: ["Only matching rows", "Every row of A paired with every row of B (N×M rows)", "All rows from both tables", "One row per group"],
        answer: 1,
        explanations: ["That's INNER JOIN.", "Correct — CROSS JOIN has no ON condition; it pairs every row of the left table with every row of the right, producing N×M rows. Useful for combinations, but usually a mistake if you forgot the ON.", "That's FULL JOIN.", "That's GROUP BY."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "acid-mental-model",
    title: "ACID at a Glance",
    difficulty: "medium",
    definition: `ACID is the four guarantees that make database transactions reliable: Atomicity (all-or-nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). Together they mean a transaction either fully happens or doesn't, never corrupts data, never sees another's partial work, and never loses committed data.`,
    coreUnderstanding: `ACID is why databases beat files for critical data. Atomicity: a transaction is a unit — either all its changes apply or none do. If a bank transfer debits account A but the credit to B fails, atomicity rolls back the debit — no money lost. Consistency: a transaction takes the database from one valid state to another (constraints, triggers all hold). Isolation: concurrent transactions appear to run one at a time — one transaction doesn't see another's uncommitted changes (dirty reads). Durability: once committed, the data is saved (to disk/WAL) and survives a crash. Isolation is the trickiest: full isolation (serializable) is slow, so databases offer weaker isolation levels (read committed, repeatable read) that allow some anomalies for performance. The classic example: a bank transfer is two updates (debit A, credit B) wrapped in BEGIN/COMMIT — atomicity guarantees both or neither.`,
    howItWorks: `1. ATOMICITY: BEGIN; ... COMMIT; (or ROLLBACK;). If any statement fails or the system crashes before COMMIT, all changes are undone (via the undo log). Either all changes apply or none.
2. CONSISTENCY: the database enforces constraints (primary keys, foreign keys, CHECK, unique). A transaction that violates a constraint is rolled back. The DB goes from one valid state to another.
3. ISOLATION: concurrent transactions shouldn't see each other's uncommitted changes. Levels (weakest to strongest): Read Uncommitted (dirty reads allowed) → Read Committed (no dirty reads) → Repeatable Read (no dirty/non-repeatable reads) → Serializable (fully isolated, as if sequential).
4. DURABILITY: after COMMIT, the changes are written to a write-ahead log (WAL) on disk before returning success. A crash after COMMIT doesn't lose data — the WAL is replayed on recovery.
5. THE TRANSFER EXAMPLE: BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT; — atomic (both or neither), consistent (no negative balances if a CHECK enforces it), isolated (another transfer doesn't see the half-done state), durable (survives a crash after COMMIT).
6. ISOLATION ANOMALIES: dirty read (read uncommitted data), non-repeatable read (same query gives different rows), phantom read (new rows appear). Higher levels prevent more anomalies but reduce concurrency.`,
    codeExamples: [
      {
        lang: "sql",
        code: `-- ACID in action: a bank transfer
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- debit
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- credit
COMMIT;   -- both apply (durable) or neither does (atomic)

-- if the second UPDATE fails (e.g., constraint violation):
ROLLBACK;  -- undoes the first UPDATE — no money lost (atomicity)

-- isolation levels (PostgreSQL syntax)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;     -- default: no dirty reads
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;   -- + no non-repeatable reads
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;      -- fully isolated

-- dirty read (only at Read Uncommitted):
--   Tx A: BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; (no commit)
--   Tx B: SELECT balance FROM accounts WHERE id = 1;  -- sees the uncommitted -100!
--   if A rolls back, B read data that never existed (dirty read)

-- write-ahead log (durability):
--   before COMMIT returns, changes are written to the WAL on disk.
--   a crash after COMMIT -> on restart, replay the WAL -> data is restored.`,
        output: "(transaction behavior)",
        note: "Atomicity: all-or-nothing (BEGIN/COMMIT/ROLLBACK). Consistency: constraints hold. Isolation: levels from Read Committed to Serializable. Durability: WAL on disk before COMMIT returns. The bank transfer is the canonical ACID example."
      }
    ],
    marginNotes: [
      "Atomicity is implemented with an undo log — the DB records how to undo each change. On failure or ROLLBACK, it replays the undo log. Either all changes apply or none.",
      "Durability is implemented with a write-ahead log (WAL) — changes are written to disk BEFORE COMMIT returns. On crash recovery, the WAL is replayed to restore committed data. This is why COMMIT has a small latency cost.",
      "Isolation is a spectrum: Serializable is fully isolated (as if transactions ran one at a time) but slow. Read Committed (the default in most DBs) prevents dirty reads but allows non-repeatable reads and phantoms. Choose the level that prevents the anomalies your app can't tolerate.",
      "Consistency is partly the DB's job (constraints) and partly the application's (business rules). The DB enforces declared constraints; the app must ensure the transaction logic preserves business invariants."
    ],
    commonMistakes: [
      "Forgetting to wrap multi-step changes in a transaction — a crash mid-way leaves inconsistent data (debit without credit). Always use BEGIN/COMMIT for multi-statement changes.",
      "Using the default isolation level without understanding its anomalies — Read Committed allows non-repeatable reads and phantoms. If your app can't tolerate those, use Repeatable Read or Serializable.",
      "Thinking COMMIT is free — it flushes the WAL to disk (fsync), which is slow. Batching changes into one transaction is faster than many tiny transactions."
    ],
    relatedTopics: ["DBMS Basics — Why & How", "Transactions & ACID", "Isolation Levels"],
    externalLinks: [
      { label: "ACID (Wikipedia)", url: "https://en.wikipedia.org/wiki/ACID" },
      { label: "Transaction Isolation (PostgreSQL)", url: "https://www.postgresql.org/docs/current/transaction-iso.html" }
    ],
    mcqs: [
      {
        question: "What does Atomicity guarantee?",
        options: ["Transactions run fast", "A transaction is all-or-nothing — either all changes apply or none do", "Data is encrypted", "Only one transaction at a time"],
        answer: 1,
        explanations: ["Speed is not atomicity.", "Correct — atomicity means a transaction is a unit: either all its changes commit or none do. If a bank transfer debits A but the credit to B fails, the debit is rolled back — no money lost.", "Encryption is separate.", "That's isolation (serializable)."],
        difficulty: "easy"
      },
      {
        question: "How is Durability implemented?",
        options: ["By keeping data in RAM", "By writing changes to a write-ahead log (WAL) on disk before COMMIT returns", "By encrypting data", "By using multiple threads"],
        answer: 1,
        explanations: ["RAM is volatile — not durable.", "Correct — before COMMIT returns success, changes are written to the WAL on disk (fsync). A crash after COMMIT doesn't lose data; the WAL is replayed on recovery. This is why COMMIT has latency.", "Encryption is for security, not durability.", "Threads don't provide durability."],
        difficulty: "medium"
      },
      {
        question: "What is a dirty read?",
        options: ["Reading data from disk", "Reading another transaction's UNCOMMITTED data (which might be rolled back)", "Reading too fast", "Reading without an index"],
        answer: 1,
        explanations: ["Disk reads are normal.", "Correct — a dirty read is reading uncommitted data from another transaction. If that transaction rolls back, you read data that never existed. Prevented at Read Committed and above.", "Speed isn't the issue.", "Indexing is a separate concern."],
        difficulty: "medium"
      }
    ]
  }
];