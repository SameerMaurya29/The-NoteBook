# Link-out + study-tools plan (16 Nov 2026)

Decision: no in-site compiler or code execution. Link to hardened external tools; build only static, no-server, no-arbitrary-code features that need our own progress data.

Rule for every new idea: build it only if it teaches something a link cannot and needs no server, no arbitrary code and no third-party runtime risk.

## Phase A (built in this checkpoint)
- [x] A1 Practice links in one data file: `src/content/practiceLinks.js` (https only, per subject/language). Fix a dead link in one place.
- [x] A2 "Try it yourself" block inside every lesson that has code: copy first example + open compiler in a new tab (noopener). No iframe, no script, no weight on first load.
- [x] A3 Bookmark button on lessons (uses existing `notebook:bookmarks`, already in Progress backup) + Saved list on Home.
- [x] A4 "Continue where you left off" card on Home (last lesson per profile).
- [x] A5 Private lesson notes (per profile, browser-only, capped length).
- [x] A6 Tests: `tests/practice-links.test.js`, `tests/personal-store.test.js`.

## Phase B (next, not built)
- B1 Flashcards / spaced repetition from existing MCQs + commonMistakes (needs schema bump so progress is in Progress backup).
- B2 Weak-area quiz from quiz history.
- B3 Daily plan from roadmap + due reviews.
- B4 Include notes + last-visited in Progress backup (schema v2 with migration).
- B5 Link health check script (HEAD each practice URL, run manually).
- B6 SQL practice (sql.js/WASM) only if learners ask; skip by default.

## Known limits
- Notes and last-visited are NOT in Progress backup yet (B4). Clearing site data deletes them.
- External sites may change or block; links are verified manually only.

## Phase A2 (16 Nov 2026): DSA topic practice lists
- [x] Every DSA topic (76) has 13-15 free LeetCode problems, easy to hard, in a "Practice problems" section of the lesson, with a tick per problem (stored as `lc:<id>` in sheet progress, so it is in Progress backup and a repeated problem is ticked once everywhere).
- Source of truth: `scripts/topic-practice-spec.json` (titles, hand-picked). Regenerate: `node scripts/build-topic-practice.mjs <questions.csv>` (CSV must match the SHA in sheet-link-review.json). Premium-only and unknown titles are skipped automatically.
- HackerRank: only the two stable track pages are linked; per-problem HackerRank URLs cannot be verified, so none are invented.
- Limit: LeetCode returns HTTP 403 to automated checks, so live page availability is not certified; ids/slugs come from the reviewed catalog.
