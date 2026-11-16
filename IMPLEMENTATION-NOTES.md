# Implementation handoff — 13 November 2026

## Verified checkpoint
Phase 0 and Phases 1–4 completed (P00–P02, P10–P16, P20–P27, P30–P36, P40–P49), with documented limits below. Next task: P50 route/content lazy loading and measurement. Phase 5 and optional features remain open.

User authorized implementation in this chat. Existing Git changes were preserved. Prior HANDOFF.md and SOURCE-BASELINE.json references could not be found in the project or searched session files; a fresh baseline was created instead. Do not equate the current Git diff with this implementation's diff.

Recovery: `/Users/sameermaurya/Library/Application Support/strawberry/Synced/16/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/9fece6ed-0d93-4175-ac63-462c1a3b22ae/recovery/pre-implementation.tar.gz`
Manifest: `/Users/sameermaurya/Library/Application Support/strawberry/Synced/16/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/9fece6ed-0d93-4175-ac63-462c1a3b22ae/recovery/SOURCE-BASELINE.json`
227 source/config/test/public/doc files archived and every archived file SHA-256 verified. Excluded .git, node_modules, dist, nested Users archive, .npmrc and environment secrets. Snapshot contains credential-handling source/tests, not exported browser credentials. To restore, extract into a separate review folder first, compare hashes/diffs, then copy only selected files back. Never reset/clean the pre-existing worktree.

## Browser data and identity policy (P02/P10)
Normal app origin/port 5173 and its storage were not changed. Regression harness ran on temporary port 5174. It restored the exact profile quiz-history key after each run and never changed lesson completion or authentication. The old server on 5173 serves stale transforms; restart it before expecting updated source. No unrelated existing server was stopped.

Original `python:operators-and-expressions` remains the first, originally reachable lesson with its existing completion meaning. Second lesson renamed to `operators-and-expressions-practice` and titled as Practice. No storage rewrite/copy: the previously unreachable lesson starts incomplete; a single old tick no longer counts twice. Old links still work.

Progress export design established in Phase 1 (now implemented in P30; see Phase 3 details below): JSON object with format `notebook-progress`, version 1, exportedAt, and data containing only completed topic timestamps, bookmark IDs, sheet completion timestamps and quiz-history learning records. Never serialize all localStorage; explicitly allowlist learning fields. Do not include usernames, passwords, hashes, salts, auth/session keys or tokens. Import into current profile only; size/shape/version/key validation, preview and explicit merge/replace choice; save an automatic profile-local pre-import backup before any write; preserve unknown/invalid existing raw data for recovery. On storage/write failure retain prior data and show the failure. Cross-profile restore must be explicit, never inferred from a username in the file. Import/export and failure tests are now implemented; see Phase 3 evidence below.

## Exact files changed in this checkpoint
- `src/components/MCQBlock.jsx`
- `src/components/IntroAnimation.jsx`
- `src/pages/Topic.jsx`
- `src/pages/DSAVisualizer.jsx`
- `src/pages/QuizHub.jsx`
- `src/pages/DSAIndex.jsx`
- `src/content/python/topics-1.js`
- `src/content/dsa/index.js`
- `src/lib/visualizers.js`
- `tests/content-integrity.test.js`
- `tests/browser-phase1.html`
- `tests/browser-phase1.jsx`
- `tests/browser-phase1-mobile.html`

## Verification
- Baseline tests: 15/15 pass; current: 20/20 pass (including all 515 unique routes, required content/difficulty/URL checks and 29,240 MCQ shuffle trials).
- npm run lint: pass (existing configured scope only).
- npm run typecheck: pass (existing configured scope only).
- Production build: pass, output in `/Users/sameermaurya/Library/Application Support/strawberry/Synced/16/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/9fece6ed-0d93-4175-ac63-462c1a3b22ae/phase1-build`; existing dist untouched. Bundle remains about 3.934 MB / 1.117 MB gzip; optimization deferred to P50.
- Real browser component/router harness: 54/54 pass at desktop 1280px and in a 390px viewport iframe. Covers Python/Java shortcuts, selector, Back/Forward, answered Next/Back/cross-subject lesson navigation, reused MCQ prop reset, all 18 visualizer routes plus invalid route, Bubble Sort step control and horizontal fit. Narrow-screen bars fixed after measured 434px overflow; final app width 390px.
- Evidence in session: phase1-tests.log, phase1-lint.log, phase1-types.log, phase1-build.log, phase1-browser-results.txt, phase1-mobile-results.json.
- Harness source in tests/browser-phase1*. Run on an isolated Vite origin; it writes one quiz-history learning record while exercising real Topic, then restores that key. Does not certify real phone, full app accessibility, full quiz finish or deployment.
- Remaining warnings: npm store-dir config, outdated Browserslist, oversized bundle. No dependency installs/updates, Git commit/push, deployment or storage clearing.

## Next
P50: lazy-load routes and subject content; compare bundle/loading measurements, preserve appearance and data; do not remove dependencies without usage checks.

# Phase 2 — verified checkpoint, 13 November 2026

## Changes
P20 company-keyed panels and latest-request guard cancel/ignore stale successes/errors. P21 strict CSV schema and content validation, safe HTTPS LeetCode destinations, 15s timeout, cancellation, stale-cache preservation and truthful persisted/session status. P22 explicit bundled occurrences versus preview/loaded rows; static date unknown, fetch date shown. P23 explicit canonical catalog IDs/URLs; no title-to-slug guessing. P24 bounded scalar/for-loop templates, uncertainty for unsupported code. P25 corrected teaching examples and overflow-safe Dijkstra. P26 prerequisite-aware ranking and weight constraints. P27 regression below.

## Phase 2 exact source/test/script files
- `scripts/verify-dsa-examples.mjs`
- `src/components/CompanyBank.jsx`
- `src/components/ComplexityCalculator.jsx`
- `src/components/ComplexityGuide.jsx`
- `src/components/PatternLookup.jsx`
- `src/components/PatternMatcher.jsx`
- `src/components/SheetCard.jsx`
- `src/content/dsa/algorithms.js`
- `src/content/dsa/sheet-link-review.json`
- `src/content/dsa/sheets.js`
- `src/lib/companyFullList.js`
- `src/lib/complexityAnalysis.js`
- `src/lib/latestRequest.js`
- `src/lib/patternMatching.js`
- `src/pages/DSAHub.jsx`
- `tests/browser-phase2-mobile.html`
- `tests/browser-phase2.html`
- `tests/browser-phase2.jsx`
- `tests/company-cache.test.js`
- `tests/company-requests.test.js`
- `tests/complexity-analysis.test.js`
- `tests/fixtures/sheet-destinations.json`
- `tests/pattern-matching.test.js`
- `tests/sheet-links.test.js`
- `tests/teaching-corrections.test.js`
- `BUILD-PLAN.md` and `IMPLEMENTATION-NOTES.md` updated.

## Verification evidence
- `npm test`: 45/45 pass; session `phase2-tests.log`.
- `npm run lint`: pass (`phase2-lint.log`); `npm run typecheck`: pass (`phase2-types.log`), existing configured scope only.
- `node scripts/verify-dsa-examples.mjs`: C++17 and Java compilation/execution pass (`p25-code-fixtures.log`). Includes empty/singleton/duplicates/sorted/reverse Quick Sort, exact undirected DFS order 0,1,3,2; Dijkstra stale entries, unreachable vertices, negative-edge rejection including unreachable negative edge, and 4,000,000,000 distance. Script reads actual algorithm snippet strings. Tests do not certify arbitrary pasted user code.
- Production build pass (`phase2-build.log`) into session `phase2-build`, project dist untouched. JS 3,994.96 kB / 1,126.60 kB gzip; CSS 77.30 kB / 13.78 kB gzip. Explicit link metadata increases payload; lazy loading remains P50. Existing npm/Browserslist/chunk warnings remain.
- Phase 2 real React/browser harness 24/24 at 1280px and 390px iframe: delayed A→B, abort, persistence, stale cache, error retention, quota failure, count/date claims, ranking/weight conditions, canonical/unresolved links, indexed-read estimate and recursion uncertainty. Evidence `phase2-browser-results.txt`, `phase2-mobile-results.json`. Network and quota failures are deterministic fixtures, not assertions about live GitHub availability.
- Phase 1 rerun 54/54 desktop and 390px: `phase2-phase1-regression.txt`, `phase2-phase1-mobile-regression.json`. Browser fixture data restored; no real-phone claim. Temporary test tab/server closed. Normal 5173 server/storage untouched; restart that pre-existing server to pick up filesystem changes if stale.

## P23 evidence limit and unresolved destinations
422/426 distinct title labels mapped to explicit IDs/slugs from a downloaded 3,173-row public catalog; source URL and SHA-256 in `src/content/dsa/sheet-link-review.json`. All 510 placements tested against saved catalog identity fixtures. Catalog match does not prove live reachability or premium/free accessibility. Direct official API request returned HTTP 403, so no bulk retry against the blocked host. Unresolved labels intentionally have no href and display “link pending review”:
- 0/1 Knapsack
- Max Sum of a Subarray with length K
- Minimum Number of Flips to Make Binary String Alternating II
- Number of Sub-arrays of Size K
No progress keys or display titles renamed. Resolve these from a specific problem specification/source rather than a guessed slug.

## Recovery and boundaries
Pre-Phase-2 recovery: `/Users/sameermaurya/Library/Application Support/strawberry/Synced/16/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/9fece6ed-0d93-4175-ac63-462c1a3b22ae/recovery/pre-phase2.tar.gz`; manifest `/Users/sameermaurya/Library/Application Support/strawberry/Synced/16/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/9fece6ed-0d93-4175-ac63-462c1a3b22ae/recovery/PHASE2-BASELINE.json`. 233 files hash-verified before edits. Restore selected files through a separate review directory, not blanket overwrite or git reset. Original pre-implementation snapshot remains.
No dependency installs, commits, pushes, public uploads, deployment or normal-origin storage clearing. At the Phase 2 checkpoint, Phase 3 onward was open; Phase 3 is now completed below.

# Phase 3 — verified checkpoint, 13 November 2026

## Behavior and decisions
- `/progress` is reachable under More → Progress backup. Version 1 `notebook-progress` JSON includes only completed-topic timestamps, up to 50 learning-history records, bookmark IDs and sheet timestamps. Username/password/hash/session keys are not included. Current profile is shown in preview; cross-profile restore is an explicit file import into the selected destination, not automatic file-based account selection. 2 MB import limit and strict nested field/type/version validation.
- Merge unions bookmarks/ticks, keeps newer timestamps and deduplicates history by stable run ID (exact JSON identity for older ID-less records). Replace explicitly replaces only the four learning keys. Unknown learning fields/IDs are preserved only within validated shape; unknown object properties/credential-shaped record extensions are rejected.
- Import validates all input/current data before saving the latest pre-import raw snapshot at the current profile's `notebook:restoreBackup` key. A pending marker exists before multi-key writes; failures attempt rollback. Failed rollback leaves pending recovery, blocks further normal writes, and keeps the backup for explicit restore. If backup storage itself fails, learning writes do not start. localStorage cannot provide a true multi-tab database transaction: do not run simultaneous imports in multiple tabs.
- Damaged learning JSON/shape is not silently overwritten. Layout notice points to recovery. Reset requires saving a snapshot and first damaged raw copy for the chosen field; downloadable per-field copies remain accessible after later resets. Automatic backups are browser-local. Raw recovery files are diagnostic snapshots, not version 1 import files; use in-browser Restore for the latest snapshot or review raw files manually. A restore may deliberately restore originally damaged raw values, which remain blocked pending repair.
- Legacy migration prevalidates all legacy values, leaves originals, copies only absent destinations, writes owner marker last and can resume interrupted copies without overwriting current profile data. Corrupt legacy data fails migration rather than deleting it; if this prevents local sign-in, preserve original browser storage for manual recovery.
- Question count shown before start and clamped to pool/15. System Design hard has three questions. Direct runner URLs are bounded too. Scored stopwatch counts elapsed wall-clock time up; no deadline or auto-submit. Old `mode=timed` URLs map to stopwatch mode. Review includes each option explanation.
- Mixed attempts store per-subject scores; older mixed records without breakdown remain aggregate-only. Inline answers remain in the latest-50 shared learning history but are explicitly separated from quiz accuracy/attempt counts in the display. Retention is disclosed rather than silently implying lifetime accuracy. New attempts have stable UUIDs, synchronous answer/advance/finish guards and native double-click detail protection. Retry/query changes remount attempt state. Save failures are disclosed in results.
- Roadmap milestones are named reachable lessons, not whole-subject certificates. Every phase is completable and all 13 subjects appear; Aptitude is in foundations and System Design in advanced. The separate subject tracker remains the full-syllabus view.

## Exact Phase 3 changed source/test files
- `src/App.jsx`
- `src/components/Layout.jsx`
- `src/components/LearningDataNotice.jsx`
- `src/content/roadmap.js`
- `src/lib/learningSchema.js`
- `src/lib/learningStorage.js`
- `src/lib/profileStorage.js`
- `src/lib/progress.js`
- `src/lib/quizAssessment.js`
- `src/lib/quizPool.js`
- `src/lib/useLocalStorage.js`
- `src/pages/ProgressData.jsx`
- `src/pages/QuizHub.jsx`
- `src/pages/QuizRunner.jsx`
- `src/pages/Roadmap.jsx`
- `src/pages/Topic.jsx`
- `tests/browser-phase3-mobile.html`
- `tests/browser-phase3.html`
- `tests/browser-phase3.jsx`
- `tests/learning-recovery.test.js`
- `tests/local-profiles.test.js`
- `tests/progress-transfer.test.js`
- `tests/quiz-assessment.test.js`
- `tests/roadmap.test.js`
- `BUILD-PLAN.md` and `IMPLEMENTATION-NOTES.md` updated.

## Verified evidence
- `npm test`: 59/59 pass (`phase3-tests.log`). Tests cover versioning/shape/size, no credential export, profile-isolated round trip, merge/replace/history dedupe, backup-first failure behavior, rollback/pending recovery, damaged values, quota/disabled storage, migration interruption, pool counts, mixed scoring, retention and reachable/completable roadmap milestones. Existing local-profile fixtures updated from arbitrary wrong-shaped dummy values to valid learning shapes.
- `npm run lint` and `npm run typecheck`: pass (`phase3-lint.log`, `phase3-types.log`), existing configured scope only.
- `npm run build -- --outDir <session>/phase3-build`: pass (`phase3-build.log`). JS about 4,012 kB / 1,133 kB gzip; CSS 77.71 kB / 13.84 kB gzip. Large bundle remains P50; npm store-dir and Browserslist warnings remain. Project `dist` untouched.
- Real browser harness `tests/browser-phase3.html`: 41/41 at desktop 1280px and 41/41 in 390px iframe; export Blob inspected, actual file-input import/preview/merge/replace/restore, corruption notice/normal-write blocking, raw-reset copy, quota failure, pool cap, practice/stopwatch finish/double-click/retry, explanations and all-phase completion. Evidence: `phase3-browser-results.txt`, `phase3-mobile-results.txt`.
- Earlier browser harnesses rerun at desktop: Phase 1 54/54 (`phase3-phase1-regression.txt`); Phase 2 24/24 (`phase3-phase2-regression.txt`). These are component/router smoke regressions, not exhaustive full-device/app/security certification.
- Browser tests ran only on isolated origin 5174, restored precisely the four guest learning keys plus known backup/damaged-copy fixture keys, and did not clear storage or read/export credentials. Test export downloads intercepted in harness only. Normal origin 5173, its session, progress and existing server untouched. Temporary test tab/server closed. Restart the normal existing server if it still serves stale transformed source.

## Recovery and next step
Pre-Phase-3 recovery: `/Users/sameermaurya/Library/Application Support/strawberry/Synced/16/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/9fece6ed-0d93-4175-ac63-462c1a3b22ae/recovery/pre-phase3.tar.gz`; manifest `/Users/sameermaurya/Library/Application Support/strawberry/Synced/16/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/9fece6ed-0d93-4175-ac63-462c1a3b22ae/recovery/PHASE3-BASELINE.json`. 248 files hash-verified before edits. Extract to a separate review folder, compare, and restore only selected files; never reset/clean the pre-existing worktree. Older snapshots remain.
No dependency installs, deployment, public sharing, Git commits/pushes or normal-origin browser-data clearing. At that checkpoint Phase 4 was open; Phase 4 is now verified below. Phase 2's four unresolved sheet labels and blocked live LeetCode verification remain unchanged.

# Phase 4 — verified checkpoint, 13 November 2026

## Implemented in plan order
P40 Selection Sort, P41 Insertion Sort, P42 Linear/Binary Search, P43 Merge/Quick Sort, P44 Stack/Queue/Linked List, P45 BST, P46 BFS/DFS, P47 Dijkstra, P48 Fibonacci/Hashing/Sliding Window/Two Pointers, P49 custom inputs/comparison/all-route regression. The original Bubble Sort remains independent, with input validation and corrected inner-loop pseudocode bound. All 18 cards now have their own implemented generator; no fallback impersonation. See BUILD-PLAN.md per-item test/checkpoint entries.

## Model decisions and limits
- Inputs bounded for deterministic teaching traces: numeric arrays max 12 safe integers in [-99,99]; operation arrays max 24; adjacency graphs max 10 vertices/10 neighbors per row; weighted graph max 10 vertices/30 edges; Fibonacci integer n in [0,8]; hash bucket count 1..8. JSON edit max 10,000 characters. Invalid input retains last valid trace and pauses playback. No code evaluation, network fetch or storage writes in visualizers.
- Linear Search returns first match; Binary Search may return any duplicate match. Binary Search and pair-sum Two Pointers reject unsorted input rather than silently sorting it. Targets validated; Two Pointers requires distinct indices.
- Insertion shifts may temporarily show a duplicate in the array while the held key is explicitly in variables. Selection/Quick Sort are unstable; Merge/Insertion preserve tie order. Merge traces show recursion/buffers. Quick Sort uses last-element Lomuto pivot; average/worst stack bounds distinguished.
- Stack top rightmost; Queue front leftmost with head-index O(1)-amortized model, not shift-based dequeue. Linked list models prepend/append/removeHead/search with node IDs and actual next links. BST models insert/search; duplicates ignored; unbalanced worst case disclosed.
- Graph adjacency/edge lists are directed exactly as entered. For undirected graphs supply reciprocal edges. BFS/DFS traverse only reachable component; input adjacency order determines traversal. Queue/call stack and visited states are shown; unreachable BFS distances stay -1.
- Dijkstra rejects negative weights anywhere, invalid vertices and non-safe integers; path-sum overflow is rejected before a replacement trace is applied. Infinity is displayed as ∞. This model uses a minimum scan, honestly labeled O(V²+E), not the heap template's bound. Large 4,000,000,000 distances and independent all-pairs checks pass.
- Fibonacci is naive recursion, not memoized: distinct call IDs, parent/child edges, active call stack, returns, O(φⁿ) time/O(n) active stack. The displayed call tree stores all calls and is explicitly excluded from algorithm auxiliary-space claims.
- Hashing is separate-chaining insertion with normalized modulo for negatives and retained duplicate insertions. Sliding Window computes the max sum of complete fixed-size windows, earliest tie; empty input reports no window. Two Pointers solves sorted two-sum, not a universal pointer template.
- Shared views include responsive magnitude bars with signed labels, bucket chains, linked node cards, graph arrows plus exact text adjacency, and scrollable tree diagrams plus node/link details. Narration is aria-live; icons have labels; state does not rely solely on color. Actual screen-reader/device testing remains P54.
- Play/pause/speed/back/forward/restart bounded; manual stepping pauses playback; restart pauses and returns to first state; route changes remount state. Custom input only applies on Apply; invalid data preserves prior trace. Sorting comparison uses last-applied input and independent real generators. It compares sorted output and theoretical complexity; animation frame counts are not speed/operation benchmarks.

## Exact changed files
- `src/components/IntroAnimation.jsx`
- `src/components/VisualizerSnapshot.jsx`
- `src/content/dsa/index.js`
- `src/lib/visualizers.js`
- `src/lib/visualizers/graphs.js`
- `src/lib/visualizers/recursiveSort.js`
- `src/lib/visualizers/search.js`
- `src/lib/visualizers/structures.js`
- `src/lib/visualizers/techniques.js`
- `src/lib/visualizers/trace.js`
- `src/lib/visualizers/tree.js`
- `src/pages/DSAIndex.jsx`
- `src/pages/DSAVisualizer.jsx`
- `tests/browser-phase1.jsx`
- `tests/browser-phase4-mobile.html`
- `tests/browser-phase4.html`
- `tests/browser-phase4.jsx`
- `tests/content-integrity.test.js`
- `tests/visualizer-traces.test.js`
- `BUILD-PLAN.md` and `IMPLEMENTATION-NOTES.md` updated.

## Verification evidence
- `npm test`: 80/80 pass (`phase4-tests.log`). Sequential milestone logs `p40-tests.log` through `p48-tests.log`. Every default generator checked for immutable input/independent snapshots, valid pseudocode line and bounded trace. Five sorts cross-checked against a reference on 50 deterministic negative/duplicate fixtures; Dijkstra cross-checked against independent all-pairs relaxation on 12 graphs. Edge fixtures include empty/singleton, search misses, duplicate keys, underflow, absent list/BST searches, self-loops/cycles/disconnected graphs, zero/parallel weights, negative/unsafe weights, window ties/negative sums and Fibonacci bases.
- Lint/typecheck pass (`phase4-lint.log`, `phase4-types.log`), existing configured scope only. Production build pass (`phase4-build.log`) into session `phase4-build`, not project dist. JS 4,046.92 kB / 1,144.47 kB gzip; CSS 77.81 kB / 13.87 kB gzip. Bundle remains a Phase 5 performance concern. Existing npm/Browserslist/chunk warnings remain.
- Real browser harness `tests/browser-phase4.html`: 280/280 at 1280px desktop and 280/280 in a 390px viewport iframe (`phase4-browser-results.txt`, `phase4-mobile-results.txt`). Each route passes 15 basic UI checks: own title/trace length, start bound, accessible narration, forward/back, play/pause, restart, actual timer advancement after speed change, end bound, displayed final state, viewport fit, invalid input retention and empty/base input apply/finish. Extra checks cover all-card availability, Binary Search sorted validation/absent target, Dijkstra negative validation, comparison labels/results/layout, route reset and invalid URL. These are browser component/router checks, not real-phone/GPU/performance or exhaustive screen-reader certification.
- Earlier browser regressions desktop: Phase 1 55/55 (`phase4-phase1-regression.txt`), updated only to expect registered players rather than planned pages for now-implemented routes; Phase 2 24/24 (`phase4-phase2-regression.txt`); Phase 3 41/41 (`phase4-phase3-regression.txt`). Earlier mobile results remain in earlier phase sections; Phase 4 all-route mobile result is current.

## Preservation and next task
Pre-Phase-4 snapshot `/Users/sameermaurya/Library/Application Support/strawberry/Synced/16/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/9fece6ed-0d93-4175-ac63-462c1a3b22ae/recovery/pre-phase4.tar.gz` and manifest `/Users/sameermaurya/Library/Application Support/strawberry/Synced/16/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/9fece6ed-0d93-4175-ac63-462c1a3b22ae/recovery/PHASE4-BASELINE.json` contain 261 pre-edit source/config/test/public/doc files, hash-verified. Restore selected files from a separate review folder; do not reset/clean the pre-existing worktree.
Browser checks used only isolated port 5174. Phase 4 harness itself reads/writes no learning/auth storage; earlier regression harnesses restore their fixture data as documented. Normal port 5173 storage/server untouched. Temporary verification tab/server stopped. No dependency installs, commits, pushes, deployment or public uploads.

Next exact task: P50 measured route/content lazy loading. Phase 5 remains open. Phase 2's four unresolved sheet destinations and blocked live LeetCode verification remain unchanged.


# Phase 5 — resumed verification checkpoint, 13 November 2026

## Starting point and protection
The plan last recorded Phase 4 complete. Source already contained unrecorded Phase 5 changes (lazy routes/content, generated catalog, fonts, manifest/icons, service worker, offline UI, reduced-motion/print styles). These were preserved, not assumed verified or authored in this session. Starting baseline: 80/80 tests and lint pass, typecheck fails on ImportMeta.env. Recovery snapshot `/Users/sameermaurya/Library/Application Support/strawberry/Synced/17/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/4783d809-ed7c-46de-a2e2-191f173a9694/recovery/resume-phase5.tar.gz`, 307 files hash-verified against recovery/BASELINE.json before edits. Restore selected files in a separate review folder; never reset/clean the worktree. Current-session source inventory: `/Users/sameermaurya/Library/Application Support/strawberry/Synced/17/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/4783d809-ed7c-46de-a2e2-191f173a9694/phase5-changes.json` (documentation updated after inventory).

## Implemented and checked
- P50 implementation: routes lazy-loaded; lightweight catalog used for dashboard/syllabus/navigation/quiz counts, full-text index deferred until search, quiz bank deferred to quiz route, subject bodies loaded individually. Generated/source parity tests protect all 515 topic identities, search behavior and all 1,462 MCQs. Subject loader now rejects inherited property names and deduplicates pending loads; error boundary resets by route and offers offline-library recovery. Added predev content generation and deterministic bundle accounting. No dependencies removed or installed.
- Initial Home static JS closure: **467,241 bytes / 156,437 bytes gzip**, compared with audited monolith 3,933,480 / 1,117,110. **88.12% fewer initial JS bytes** (excludes CSS/fonts, background service-worker download and optional pages). Entry alone 456,234 bytes. All emitted JS together is **6,087,333 bytes / 1,729,788 gzip**: initial loading improves but deferred search/assessment indexes duplicate some lesson data, increasing aggregate payload. Search chunk ~1.24 MB and quiz runner ~767 kB remain large. This is not a claim that the entire download shrank.
- Real browser predecessor-build Home observed ~471 kB including Auth chunk; local DOMContentLoaded ~123 ms on this desktop. This is neither controlled before/after timing nor a low-end CPU/network profile. P50 remains unchecked pending controlled low-end cold-load/parse measurement. Bundle details: bundle-measurement.json; production build outside project dist at phase5-build.
- P51 existing self-hosted Latin WOFF2 files and adjacent OFL/source records retained, appearance/font/motion verification still partial. Removed the 1,285,012-byte original PNG from favicon use and automatic shell caching; used existing 192px icon instead, leaving original artwork intact. Final automatic shell payload **1,039,263 bytes** across 28 URL entries, including fonts/CSS/JS/icons; this background download is separate from initial JS. Reduced-motion and print styles exist but are not yet comprehensively audited.
- P52 manifest/icons/versioned worker/offline library implemented. Chosen subjects explicitly downloaded; external resources/company APIs never blindly cached. Update waits for user action, old release files retained for open tabs. Fixed metadata-only saved status after eviction, save/remove race, current-vs-old cache precedence, plugin configured-root resolution and Vite client typing. Failed saves roll back partial cache; static-cache removal does not clear progress/profile/company storage. Current release build `888872c326e35dc9`.

## Verification
- npm test **100/100**; lint and configured-scope typecheck pass. Production build passes; large deferred chunks, stale Browserslist and unknown npm store-dir warnings remain. Logs: phase5-tests.log, phase5-lint.log, phase5-types.log, phase5-build.log.
- New tests/lazy-content.test.js: 4 tests for generated catalog/question/search parity, all 13 lazy subjects, invalid IDs and concurrent load dedupe. New tests/offline-worker.test.js: 16 VM/temporary-project tests cover install/save/quota/network failures, eviction/repair, concurrent requests/removal, update policy, fetch boundaries, old hashed assets, malformed metadata, configured-root plugin and release version changes. VM tests are not real-browser lifecycle certification.
- Browser previous-phase regressions: Phase 1 **55/55 desktop + 55/55 at 390px**, Phase 2 **24/24**, Phase 3 **41/41**, Phase 4 **280/280** desktop. Logs phase5-phase1-browser.txt, phase5-phase1-mobile.txt, phase5-phase2-browser.txt, phase5-phase3-browser.txt, phase5-phase4-browser.txt. Phase 1 harness now waits for asynchronous lesson readiness. A first run failed because it assumed synchronous lessons; dev server also retained stale transforms until restart; final fresh-server runs pass.
- Isolated production origin 5175: guest entry/Home rendered, Python explicitly saved, server stopped, never-before-opened Python lesson loaded by full navigation. Rebuilt update appeared, was explicitly applied/reloaded; prior saved Python labeled older release rather than current; re-saved for final release. With server stopped again, cold navigation to Python variables lesson succeeded; unsaved Java lesson showed an honest reconnect/retry error, not another subject. Both fit desktop viewport. Final evidence phase5-offline-browser.json. Origin outage simulates loss of app server; it is not OS airplane mode or a first visit on a never-installed device. Normal 5173 storage/server untouched; only isolated 5175 guest/onboarding/static cache used. Prior regression fixtures restore their own learning keys.

## Current-session files
Changed: index.html, package.json, tests/browser-phase1.jsx, scripts/offline-plugin.mjs, src/App.jsx, src/lib/offlineClient.js, src/lib/subjectLoader.js, src/offline/worker-template.js.
New: tests/lazy-content.test.js, tests/offline-worker.test.js, scripts/measure-bundle.mjs.
BUILD-PLAN.md, AUDIT.md and this file updated for checkpoint. Original Phase 5 changes are part of the recovery baseline, not newly attributed here.

## Remaining and exact next step
P50 controlled low-end cold-load/parse benchmark and aggregate-payload follow-up; P51 font/motion checks; P53 warm/reconnect/update interruption/eviction/browser-pressure behavior and actual Android/iPhone installation; P54 keyboard/focus, contrast/touch targets, narrow-screen coverage, reduced-motion and A4/Letter print checks; P55 deliberate lint/type coverage, dependency advisory/license review. Very slow multi-file saves can exceed the 120-second message timeout and finish later; no cancellation protocol yet. Older pre-path-metadata caches cannot have their full inventory verified. Incomplete subject copies remain until explicit removal. Never-installed cold offline access cannot work. Phase 2's four unresolved sheet destinations and live LeetCode limitation remain.
Next exact task: finish P50 with a repeatable controlled low-end loading benchmark (or explicitly record environment limits), then P51/P53 before the P54 accessibility/print audit. Phase 5 is **in progress**, not certified complete. No real-phone/OS installation, screen-reader or low-end-device claim. No dependency install, deployment, public upload, Git reset/commit/push, or normal-origin storage clearing.


# Curriculum + device installation checkpoint — 13 November 2026

## User-approved scope
Prepare PWA only; no deployment. Use a temporary short identity and keep final branding/public URL for the last step (RELEASE-LAST.md). Expand System Design with source documentation, original papers and printable notebook-style lessons. First new Build Path is OS only; other paths are suggestions after review. Keep costs down with focused primary-source checks, local implementation and no paid tools/sub-agents.

## Implemented
- Device-aware Install & offline page under More. Capture beforeinstallprompt at app startup, expose an install action only when the browser supplies a usable event, consume it once, handle install status and provide iPhone/iPad, Android and desktop manual guidance. Prompt acceptance is not represented as verified OS installation. Temporary **Inklet** name with original compact page/nib icons, including a maskable safe-area variant; stable relative manifest identity. No hosted URL fabricated.
- More → **System Design syllabus**. Expanded 8 to **42 lessons** (34 original new notebook lessons), all assigned once across 12 curriculum groups. Requirements/estimation, LLD/invariants/patterns, APIs, storage/indexes/transactions, replication/sharding/consistency/clocks/consensus/2PC, queues/outbox/sagas, caching/rate limits, resilience/SLOs/recovery, security, deployment, search/streams/media, eight worked designs and capstone review. Full defined-scope checklist, not an impossible guarantee of every research specialization. Existing eight completion keys retained. A lesson includes mechanisms, worked traces, mistakes, design exercises, primary links and practice checks; these are educational notes, not production implementations.
- Four paper guides: Dynamo, Raft, GFS and Spanner, with mechanism/failure/assumption questions and separate reading ticks. Primary papers linked rather than reproduced. Printable full 42-lesson view at /print/systemdesign is read-only, uses the existing notebook renderer, omits interactive quiz controls and exposes Print/Save as PDF. Individual lesson print action added. Full print pagination on actual A4/Letter remains a manual preview/device check; no one-page or fixed-page-count promise.
- More → **Build an OS** (/build/os). **24 units / 199 explicit concept + lab gates**, ordered prerequisites, substantial build-specific notes and walkthroughs, acceptance criteria, internal subject links, primary documentation/book/source links and actual course-video links. C → RISC-V/ABI → tools/ELF/debugger → xv6 source reading → boot/traps/syscalls → pages/VM/COW → processes/scheduling → locks/coordination → drivers/block/filesystem/recovery → shell → separately labeled networking/security/multicore extensions → capstone. Route /build/os/:unitId; printable full course at /build/os/print. No empty new subject placeholders.
- Clear own-kernel versus xv6-lab route; target QEMU RISC-V virt. x86 architecture video labeled conceptual rather than RISC-V syntax. Safe disposable-image guidance; no compiler/emulator installed and no OS code executed by this website. External learning/lab work remains for the learner; it is not automatically graded.
- All learning/paper/build gates use namespaced keys in the existing validated learning map, preserving profile isolation and version-1 export/import. Subject totals now count only valid subject/topic IDs so 199 build gates cannot inflate the dashboard/footer. OS notebook and syllabus overviews included in static shell; full System Design body/print view included in chosen-subject offline download. External videos/papers/toolchains not cached.
- Removed GSAP-dependent intro gate: opening a notebook now navigates immediately, without waiting for animation-frame delivery in background windows. This was an observed review usability issue; remaining site styling retained. The actual production guest flow was then exercised with DOM UI clicks.

## Sources checked
Focused rendered-source checks, 13 November 2026: web.dev PWA installation; MDN BeforeInstallPromptEvent; MIT 6.1810 2024 schedule, xv6 book/lab destinations; MIT 6.S081 2020 schedule-linked YouTube lectures; MIT OCW assembly video; OSDev expanded index; Raft official paper/talk/visualization page; Google Research GFS/Spanner publication pages; Dynamo primary PDF; PostgreSQL transaction isolation; Redis TTL/keyspace; Google SRE book contents; AWS Builders’ Library retries/backoff; MDN HTTP guide; OWASP Cheat Sheet Series. Links are curated for relevance and provenance, not advertised as objectively best. OSTEP page failed to load twice and was not included as a verified reference. MIT 2025 schedule was incomplete, so the 2024 course and 2020 video index are explicitly used. Link-index verification does not prove every PDF/video/lab tool is reachable on every device or certify all teaching facts. Original prose, no bulk paper/video copying or external code licensing assumptions.

## Verification and evidence
- **105/105 automated tests**, lint, configured-scope typecheck and production build pass: curriculum-tests.log, curriculum-lint.log, curriculum-types.log, curriculum-build.log in `/Users/sameermaurya/Library/Application Support/strawberry/Synced/17/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/4783d809-ed7c-46de-a2e2-191f173a9694`. New curriculum-install.test.js verifies complete scoped lesson assignment, OS prerequisites/internal destinations/content gates, 199-key denominator, export compatibility, subject-count isolation, iPad/Android/desktop detection, PNG assets and relative manifest id. Offline plugin fixture expanded for new routes/icons. Generated catalog now 549 topics / 1,496 MCQs.
- **35/35 desktop + 35/35 at 390px** real-component browser checks: curriculum-browser-desktop.txt and curriculum-browser-mobile.txt. Includes tick/remount persistence, lab gate, unit route/invalid unit, sources, complete 42-lesson and 24-unit print rendering, read-only print, install event captured before page mount, one-use prompt and appinstalled status, overflow. Install event is synthetic: not real OS installation. Test origin 5174; fixture guest learning key restored in finally. Final minor installed-status wording/intro simplification followed by lint/types/tests/build, not a full rerun of every legacy browser harness in this checkpoint.
- Production build outside existing dist: `/Users/sameermaurya/Library/Application Support/strawberry/Synced/17/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/4783d809-ed7c-46de-a2e2-191f173a9694/curriculum-build`. Review server **http://127.0.0.1:5176** left running for the user. Actual guest app at /build/os renders 24 units without horizontal overflow; /print/systemdesign renders 42 lesson articles and service worker is controlling the page. Only isolated review origin 5176 used. Normal 5173 server/progress not cleared or rewritten. No real-phone/OS install, airplane-mode, kernel execution or exact print pagination certification.
- Recovery archive `/Users/sameermaurya/Library/Application Support/strawberry/Synced/17/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/4783d809-ed7c-46de-a2e2-191f173a9694/recovery/pre-curriculum-pwa.tar.gz`; all 467 archived files readable and SHA-256 manifest saved to recovery/CURRICULUM-BASELINE.json. Exact current-session inventory `/Users/sameermaurya/Library/Application Support/strawberry/Synced/17/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/4783d809-ed7c-46de-a2e2-191f173a9694/curriculum-changes.json`. Restore selected files via a separate folder, never git reset/clean.

## Changed and new files
Changed: index.html, src/index.css, src/App.jsx, src/pages/Topic.jsx, src/pages/Subject.jsx, src/pages/OfflineLibrary.jsx, src/pages/Home.jsx, src/components/Layout.jsx, src/components/NotePage.jsx, src/components/IntroAnimation.jsx, src/content/systemdesign/index.js, src/content/generated/questions.js, src/content/generated/catalog.js, src/content/generated/search.js, scripts/offline-plugin.mjs, public/manifest.webmanifest, tests/lazy-content.test.js, tests/offline-worker.test.js.
New: tests/browser-curriculum-mobile.html, tests/browser-curriculum.html, tests/curriculum-install.test.js, tests/browser-curriculum.jsx, public/icons/inklet-192.png, public/icons/inklet-maskable.png, public/icons/inklet-512.png, src/content/build-os.js, src/content/systemdesign-syllabus.js, src/components/InstallApp.jsx, src/lib/installState.js, src/lib/installPrompt.js, src/lib/buildProgress.js, src/pages/SystemDesignSyllabus.jsx, src/pages/CurriculumPrint.jsx, src/pages/BuildPaths.jsx, src/content/systemdesign/expanded.js.
RELEASE-LAST.md, BUILD-PLAN.md, AUDIT.md, README.md and this checkpoint updated separately. No dependency installs/removals, Git commit/push/reset, public uploads or deployment.

## Remaining
User review first. Final identity/HTTPS URL/deployment/real-device installation explicitly **last**, per RELEASE-LAST.md. Prior Phase 5 P50/P51/P53/P54/P55 work is still bounded by its recorded limits; this expansion does not tick those wholesale. Full scholarly review of all new teaching notes, source availability over time, actual learner exercise results and printed-paper layout on target printers remain distinct from structural tests. Four unresolved sheet destinations/live LeetCode limitation unchanged. Suggest another Build Path only after this release is reviewed, and do not automatically add one.


# OS reference return-context fix — 13 November 2026
User review: following OS prerequisite links lost the path context and offered the C/other subject syllabus on return. They requested returning to OS and less navigational clutter.

Implemented explicit `?build=os&unit=<known-id>` context on OS prerequisite links. src/lib/buildNavigation.js validates the build and unit against lightweight generated metadata, derives only local return URLs, and never trusts an arbitrary returnTo URL. No sticky global session state or new learning-storage key. Reloads/new tabs retain context; standalone reference URLs do not inherit stale path state. Topic loading/errors retain the OS return action. The focused reference header says Build an OS / Unit N / subject reference and offers one primary Back to OS build. It returns with history replacement to /build/os/<unit>#references. Common NotePage breadcrumb/footer syllabus links are removed from focused views, unrelated subject Next/Previous and DSA tools hidden; normal subject browsing remains unchanged. Full OS overview removes repeated prerequisite link chips; unit pages keep the source/reference section with a scroll target. Lesson columns have explicit minimum-width constraints so long code stays within its scroll container.

Changed: scripts/build-content-catalog.mjs; src/content/generated/catalog.js; src/lib/buildNavigation.js (new); src/pages/BuildPaths.jsx; src/pages/Topic.jsx; src/components/NotePage.jsx; tests/build-navigation.test.js (new); tests/browser-curriculum.jsx; tests/browser-curriculum.html. BUILD-PLAN.md and AUDIT.md updated. No curriculum identities, completion schema or content count changed.

Evidence: 108/108 automated tests plus lint/configured-scope types/production build; logs navigation-tests.log, navigation-lint.log, navigation-types.log, navigation-build.log in /Users/sameermaurya/Library/Application Support/strawberry/Synced/17/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/4783d809-ed7c-46de-a2e2-191f173a9694. Browser navigation harness 45/45 desktop and 45/45 at 390px, logs navigation-browser-desktop.txt/navigation-browser-mobile.txt. Existing course, print, persistence and install UI checks included. New checks cover encoded origin, exact-unit return, reopen-context, standalone C navigation and removal of overview reference clutter. An initial full-width fixture failed overflow while the 12px lesson entrance animation ran; fixture now matches app content margins, and lesson flex columns were bounded explicitly. This is not an OS back-gesture or real-phone certification.

Snapshot before edits: /Users/sameermaurya/Library/Application Support/strawberry/Synced/17/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/4783d809-ed7c-46de-a2e2-191f173a9694/recovery/pre-navigation-fix.tar.gz (navigation source and tests). Production output refreshed in /Users/sameermaurya/Library/Application Support/strawberry/Synced/17/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/4783d809-ed7c-46de-a2e2-191f173a9694/curriculum-build for existing 5176 review server; existing project dist and normal 5173 learning data untouched. No deployment, dependency installation, commits or storage clearing. Optional Resume card / lab-evidence journal are suggestions, not authorized additions. Final branding/HTTPS remains last in RELEASE-LAST.md.


# OS Lab Bench — 13 November 2026

## Scope and preservation
User explicitly resumed coding in `/Users/sameermaurya/Desktop/The-Notebook`, requesting no clutter. Read all active plans and previous checkpoint. No Git worktree is present here; no reset/commit/push. Fresh archive: `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/recovery/pre-os-lab.tar.gz`; `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/recovery/BASELINE.json` contains SHA-256 hashes for all 333 readable archived files. Excludes dependencies/output/Git/nested archive. Restore selected files into a separate directory for review. Dependencies were absent: npm ci installed 606 locked packages (no package changes). Pre-edit baseline 108 tests, lint and scoped types passed.

## Implemented files
- New `src/lib/osLabBench.js`: immutable four-case fixtures; 4096-byte pages, four virtual pages/eight physical frames, validated inputs and deterministic first-fault trace. Policy-bound repairs; kernel-user exposure rejected. Versioned `challenge:os:vm-page-table:v1` timestamp uses existing validated profile storage/export schema. All four correct predictions and safe outcomes required; incorrect predictions require fresh attempt. No real kernel/Sv39/TLB/demand-paging/COW claim.
- New `src/components/OSLabBench.jsx`: prediction, run, inspection table, bounded fix/rejection and retry, restart/close, live status and focus movement. Result saving uses existing error-reporting storage hook with retry on failed save. Profile-keyed attempt component; current-key-only saved-pass recognition. No automatic reading or lab-deliverable ticks.
- Changed `src/pages/BuildPaths.jsx`: one Try the lab entry only in non-print Virtual Memory unit; lazy loading and focus restoration. Navigation/unmount resets attempts. No routes/menu/dashboard changes.
- Changed `scripts/offline-plugin.mjs`: cache the small lazy lab chunk in shell so OS notebook works without previously opening it.
- Changed `tests/offline-worker.test.js`: include required lazy module in plugin fixture.
- New `tests/os-lab-bench.test.js`, `tests/browser-os-lab.jsx`, `tests/browser-os-lab.html`, `tests/browser-os-lab-mobile.html`.
- Existing `PLAN.md`, `BUILD-PLAN.md`, `IMPLEMENTATION-NOTES.md`, `PORTABLE-HANDOFF.md`, `README.md`, `AUDIT.md` updated. No other requested features added.

## Evidence
Final 112 automated tests pass (108 existing + four focused lab tests); lint, configured-scope typecheck and production build pass. Logs in `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3`: lab-tests.log, lab-lint.log, lab-types.log, lab-build.log. Production output `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/lab-build`, not existing project dist. Existing warnings: large deferred chunks, stale Browserslist, npm store-dir setting.
Model tests cover boundaries/invalid inputs, permissions/precedence, deterministic immutable fixtures/repair isolation, unsafe repairs, pass rule, current-version recognition, profile isolation, export/import merge/replace, subject/build/quiz count isolation.
Browser evidence: lab-browser-desktop.txt and lab-browser-mobile.txt, 62 assertions each including control existence. Covers wrong prediction/reset, complete four-case flow, unsafe repair rejection, no premature pass, persisted result/remount, original lab gate untouched, close-focus and restart. Existing curriculum-regression.txt: 45 desktop checks for exact-unit reference return, standalone navigation, 199 denominator, print and synthetic install behavior. A stale Vite transform initially retained old focus code; restarting on fresh port 5185 produced the final passes.
Production offline test on isolated 5186: service-worker shell contains unopened OSLabBench-CBw0mkFz.js. Server stopped; cold URL navigation to virtual-memory?offline-check=1 succeeded, Try the lab loaded from cache, first case rendered and fit viewport. lab-offline-evidence.json records result. Temporary diagnostics added only in session production output, not source, then removed. Server outage is not OS airplane mode/real-phone certification. Review server restarted afterward. Existing origins/storage untouched; browser harness restores its fixture progress in finally.

## Remaining verification
LB06–LB07 remain unchecked rather than overclaiming: exhaustive keyboard-only traversal, repeated-click races, live profile-switch and quota-failure UI checks remain. Existing storage failure/recovery tests still pass but are not new browser evidence. No new real-device install, print pagination, full screen-reader or low-end benchmark certification. Prior Phase 5/release/external-link limits remain. Public branding and deployment remain last and unauthorized.


# Resource shelf expansion — 13 November 2026

## Authorized scope
Organize the user's pasted learning/practice/book/tool destinations into the existing app, mapped to appropriate subjects, without navigation clutter. Split concatenated URLs and empty commas into 29 resources. External links only: no copying books, platform reimplementation, backend, signup, purchase, new top-level menu, or public deployment. Natural Writing skill used for concise original descriptions.

## Preservation
Fresh snapshot `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/recovery/pre-resource-shelf.tar.gz`; all 356 archived files read/hash-verified in `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/recovery/RESOURCES-BASELINE.json`. Original 31 destinations preserved in `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/existing-resources.json`. No Git reset/commit/push or dependency/package changes. Existing project dist left untouched; production output `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/resources-build`. Same review origin 127.0.0.1:5186 retained; no progress/profile storage changes.

## Implementation
- New `src/content/resources.js`: 60 entries, consisting of the original 31 plus all 29 supplied resources. Seven purpose groups: Books, Courses, Coding & practice, Interview prep, Quick references, Tools & simulators, Explore. Subject tags include the existing learning subjects plus resource-only Behavioral Interviews, Mathematics for CS, General and Spring Boot (not new lesson subjects). Each resource states its use, access terms, review status and relevant caveats.
- New `src/lib/resourceShelf.js`: pure subject/type/search filtering, validated URL filters, inherited-name protection, bounded queries and subject-link helper.
- Reworked `src/pages/Resources.jsx`: subject selector, search, type filters, counts, clear/no-results state, grouped annotated cards and collapsed provenance/access notes. URL state supports direct links and back navigation. Safe new-tab external links and explicit network/license caveats.
- New `src/components/SubjectResourceLink.jsx`; changed `src/pages/Subject.jsx`, `src/pages/DSAHub.jsx`, `src/pages/SystemDesignSyllabus.jsx`, `src/pages/BuildPaths.jsx` to expose a compact subject-filtered shelf link. OS exact-unit reference flow unchanged. No menu or routes added.
- Changed `scripts/offline-plugin.mjs` and fixture `tests/offline-worker.test.js`: resource index/metadata in offline shell; external books, games, accounts and websites remain network-dependent and are not cached.
- New `tests/resource-shelf.test.js`, `tests/browser-resources.jsx`, `tests/browser-resources.html`, `tests/browser-resources-mobile.html`.

## Source verification and honest limits
Rendered checks covered the supplied URLs, with retries for incomplete pages. Raw results `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/data/tool-results/call_PlN5LqEM5Qeap8ZByv5CtESu-return.json`. Basic Computer Architecture PDF identified as Smruti R. Sarangi, author-hosted with CC BY-ND 4.0 notice. MIT Mathematics for Computer Science title/textbook destination confirmed via classinfo.shtml; PDF body did not extract. O'Reilly Head First C metadata found through search; publisher renderer denied access, and supplied third-party PDF failed rendering. Publisher is preferred, original mirror retained in source notes with permission/access uncertainty. Karumanchi book uses publisher as primary destination, preserving supplied third-party PDF in notes without claiming redistribution permission. No books copied or bundled.
QuickRef and Codédex stayed loading twice; Learn Anything showed only a heading; WeLib was blocked by security verification; Coddy HTML route redirected to homepage. All retained but visibly marked access not fully verified. No implication all sites/courses are free, functional, current, safe to upload secrets to, or licensed for redistribution. Existing 31 destinations retained and explicitly not reverified. Source checks are metadata/homepage checks, not exhaustive exercises, link/curriculum audits or paid account tests.

## Verification
116 automated tests pass (112 prior + four catalog/filter tests); lint, configured-scope typecheck and production build pass. Evidence logs: resources-tests.log, resources-lint.log, resources-types.log, resources-build.log in `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3`. Existing warnings about large deferred chunks, stale Browserslist and npm store-dir persist; not hidden or resolved by this feature.
Browser shelf checks: 32 desktop + 32 at 390px, recorded in resources-browser-desktop.txt/resources-browser-mobile.txt. Includes all 60 cards, seven groups, subject/type combinations, URL/deep link/back, invalid filters, clear/empty state, provider-preferred books, original supplied links, native details, status language, external-link attributes, subject-to-shelf navigation and overflow. Existing curriculum/reference/print/synthetic-install regression 45/45 desktop in resources-curriculum-regression.txt. No screen-reader, full keyboard traversal, actual-phone or external-game execution certification.
Actual production `/resources` renders 60 cards with all type controls and no desktop overflow, recorded in resources-production-evidence.json. Production offline-assets.json contains Resources-CKhgh9nS.js; shell policy verified by automated worker/plugin tests and asset inventory. This checkpoint did not separately stop the server to repeat real-browser offline lifecycle for the shelf. Review at http://127.0.0.1:5186/resources, server left running. Temporary dev tests closed/stopped; prior OS lab LB06–LB07 verification limits and final deployment/branding remain open.


## Four-book follow-up — 13 November 2026
Added Modern C (C, author-deposited HAL PDF), Eloquent JavaScript (JavaScript, author-hosted PDF) and HTML & CSS: Design and Build Websites (HTML/CSS, official companion/book page). Existing Karumanchi entry updated, not duplicated. Catalog now 63 resources. Original supplied third-party PDFs remain only as source links with rights/access uncertainty; no book content bundled. Modern C version-pinned v2 is explicitly distinguished from the author’s latest edition; no unsupported edition claim. Duckett’s 2011 text flagged for historical examples, not a current web standard reference.
Changed: src/content/resources.js, src/pages/Resources.jsx (generic Author / source page label), tests/resource-shelf.test.js and tests/browser-resources.jsx. Existing documentation updated, no menu/routes/dependencies/storage changes.
Verification: 117 automated tests, lint/configured-scope typecheck and production build pass; 35 desktop + 35 at 390px resource-browser checks pass. Logs books-tests.log, books-lint.log, books-types.log, books-build.log; browser evidence books-browser-desktop.txt/books-browser-mobile.txt in `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3`. Build `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/books-build`, existing project dist untouched. Recovery `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/recovery/pre-four-book-update.tar.gz`: 374 archived files read/hash-verified in FOUR-BOOKS-BASELINE.json.
Rendered metadata checked for all four PDFs and author/official Modern C and HTML & CSS pages. Modern C author page confirms free CC BY-NC-ND 4.0 version; Eloquent text CC BY-NC 3.0/code MIT. Third-party Karumanchi and Duckett PDFs contain restrictive copyright notices; hosting authorization is not established. No full-content copying, account signup, purchases or deployment. Prior external-source/device/offline-lifecycle and OS lab final-check limits remain. Review same origin http://127.0.0.1:5186/resources?kind=books with updated production output; browser learning data not cleared.


# Native Behavioral Interview Studio — 13 November 2026

## User direction and scope decision
User clarified that the behavioral resource must become a native, beautiful website experience rather than a GitHub link or another notes page. After seeing the proposed original studio, user chose “You decide the best first version.” Chosen first release: 30 original prompts across six categories, STAR guidance and fictional examples, private in-memory answer workspace, optional two-minute speaking timer, six-prompt balanced mock session, self-review and personal text export. No paid AI, recorded audio, backend, hiring score or persistent personal-story schema. Persistent drafts intentionally deferred; visible notices explain reload/navigation/profile-switch loss and exclusion from Progress backup. Product & Engineering and Natural Writing guides consulted; no third-party README text/code or sample answers copied.

## Source/config changes
- New src/content/behavioralInterviews.js: six categories (teamwork, conflict, ownership, failure/learning, leadership, communication), five original questions each. Each has intent, follow-up, pitfall and an original fictional four-part STAR example. Shared field prompts and five self-review items.
- New src/lib/behavioralPractice.js: pure question selection/filtering, balanced deterministic session rotation, bounded deadline time, display formatting and personal-draft text export.
- New src/pages/BehavioralStudio.jsx and BehavioralStudio.css: scoped emerald/cream product design, distinctive hero/framework card, topic cards, searchable library, accessible labelled STAR fields, collapsible examples, timer/start/pause/reset, mock session and export. No arbitrary code execution or app storage writes. Text export is a requested browser download; download failures surfaced. Profile changes remount private state. Browser beforeunload warning registered only while drafts exist; in-app navigation still discards them as disclosed. Timer target reaching zero never grades or submits an answer. Session completion means reaching six prompts, not proving mastery.
- Changed src/App.jsx: lazy native route /interviews/behavioral. Existing Resources card now uses native Link via src/content/resources.js internalPath; title changed to Behavioral Interview Studio, count remains 63. Original GitHub URL retained only as collapsible external background source. System Design resource remains external pending a separate native feature. No new top-level menu.
- Changed src/pages/Resources.jsx: native/external link distinction and accurate footer wording.
- Changed scripts/offline-plugin.mjs and tests/offline-worker.test.js fixture: include studio JS/CSS/import closure in shell. Offline asset inventory confirms both; no new real-browser server-outage cycle for this studio in this checkpoint.
- New tests/behavioral-practice.test.js, tests/browser-studio.jsx, tests/browser-studio.html, tests/browser-studio-mobile.html. Existing project notes updated, no package/dependency changes.

## Evidence and preservation
Recovery `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/recovery/pre-interview-studio.tar.gz`: all 374 archived files read/hash-verified in recovery/INTERVIEW-STUDIO-BASELINE.json. Existing app edits, project dist and browser learning/profile data preserved; no Git reset/commit/push or public deployment.
123 automated tests (117 prior + six new), lint/configured-scope typecheck and production build pass. Logs studio-tests.log, studio-lint.log, studio-types.log, studio-build.log in `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3`. Final production build `/Users/sameermaurya/Library/Application Support/strawberry/Synced/18/454050c5_1f0a_4829_8083_bfa2e1535197/sessions/df3feec7-e146-4527-bf36-10c7f41e91e3/studio-build`, not project dist. Existing large-chunk/Browserslist/npm-setting warnings remain.
New model tests verify 30 unique questions/complete category coverage and STAR content shape, deterministic filters/sessions, timer bounds and formatting, bounded export/no fictional example substitution, native resource target and no ad-hoc storage/execution.
Browser regressions: 43 desktop + 43 at 390px (studio-browser-desktop.txt/studio-browser-mobile.txt); resource regression 35 desktop (studio-resources-regression.txt). Covers native card/link, question and self-review isolation, drafts retained between questions but reset on remount, actual timer advance/pause/reset, Blob/text export contents and filename (download trigger intercepted in harness), six mock rounds/end/restart, invalid/deep-linked question IDs, native examples, light/dark overflow and no localStorage writes. Initial harness failed on exact button text because of trailing icon whitespace; fixed harness lookup to trim text and reran on fresh server. Final small CSS readability/hero-spacing polish followed by production rebuild.
Real production native route inspected visually on same origin 127.0.0.1:5186, guest session preserved, no draft data entered. Review tab left open. Full keyboard/screen-reader/real-phone testing, timer-expiry UI/background suspension, live multi-profile-switch browser exercise, and actual user-agent download dialog behaviour are not certified by this checkpoint. No automatic assessment or interview-success claim. Existing OS lab LB06–LB07 and public-release limits remain.

## Next optional work, not implemented
User review of the studio. If requested afterward: deliberately versioned saved-story library with export/import/profile protection; or a separately scoped native System Design challenge workbench. Do not turn all external books/platforms into copied in-app content.


## Updated source ZIP — 13 November 2026
User requested the updated archive after the native interview-studio implementation. Portable handoff refreshed to reflect all current features and data-safety limits. Package excludes dependencies, build output, secrets/environment config, browser data, recovery archives and external books. Fresh SHA256SUMS.json covers all packaged files except itself. Archive read/hash verification performed; application checks retain their latest implementation evidence rather than being claimed rerun by packaging. No deployment or browser-data export.


# 2026-11-16 — P50 first pass and LB06 verification
See BUILD-PLAN.md checkpoint of the same date for measurements and evidence. Changed: src/App.jsx, src/components/Layout.jsx, new src/components/MoreMenu.jsx, deleted src/lib/query-client.js, scripts/offline-plugin.mjs, tests/offline-worker.test.js, BUILD-PLAN.md.


# 2026-11-16 — Third book batch
See BK01 in BUILD-PLAN.md. Changed: src/content/resources.js, tests/resource-shelf.test.js, tests/browser-resources.jsx (counts 63 to 76), README.md, PLAN.md, PORTABLE-HANDOFF.md, BUILD-PLAN.md. Recovery tar: pre-books-batch3.tar.gz outside the project. No dependency, route, menu or storage changes.
