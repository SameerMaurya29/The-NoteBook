# The Notebook: build plan and progress tracker

Last checkpoint: 13 November 2026. Source: `/Users/sameermaurya/Desktop/Base`.

Latest request (13 November 2026): **resume building the planned OS Lab Bench, without clutter**. The earlier packaging-only checkpoint is historical. The next requested feature is the OS Lab Bench below (LB00–LB07); implementation is deferred to conserve credits. Do not mistake this plan for a completed feature. Final public URL/branding/deployment remains last in RELEASE-LAST.md.

Status: **PHASES 1–4 IMPLEMENTED AND VERIFIED (WITH DOCUMENTED LIMITS).** User authorized sequential implementation on 13 November 2026. P00–P02, P10–P16, P20–P27, P30–P36 and P40–P49 are complete at the verification levels in IMPLEMENTATION-NOTES.md. Four sheet destinations remain explicitly unresolved and live LeetCode availability is unverified. Phase 5 is in progress: P52 implemented/verified within documented scope; P50–P51 partial, P53–P55 open. No deployment, purchases, cloud accounts or public sharing authorized.

Legend: `[x]` = completed at the stated verification level; `[ ]` = not done. Never tick a proposed feature merely because its page or button exists. Add date, changed files and test evidence when finishing an item. Work in small checkpoints; do not wait until the end to update this file.

## Existing work, already done

- [x] E01 — Standalone React/Vite app starts and builds. Browser + production build verified.
- [x] E02 — Guest access and main learning dashboard. Browser verified.
- [x] E03 — Search returns topic links and opens a lesson. Browser verified.
- [x] E04 — Common lesson template, examples, notes, mistakes and inline practice. Browser/source verified; not all content certified.
- [x] E05 — Completion storage survives reload. Browser verified; test tick restored afterward.
- [x] E06 — Salted local profile hashing, isolation and legacy migration. Automated tests pass; not server authentication.
- [x] E07 — Quiz configuration, first-answer practice feedback, scoring/history implementation. Browser first-answer check + source; full E2E remains below.
- [x] E08 — Bubble Sort controls and step model. Browser step + source fixtures.
- [x] E09 — Eight algorithm templates with C++/Java and dry-run reference text. Source inventory; no execution feature.
- [x] E10 — 17 sheet categories, category-local completion implementation. Source checked; link correctness remains below.
- [x] E11 — Tricky questions, resource lists, six cheatsheets and light/dark theme implementation. Source checked; mobile/print/accessibility still open.
- [x] E12 — Content structure inventoried: 515 entries, 514 unique identities, 1,462 quiz MCQs, 495 tricky questions. Duplicate ID is not fixed.
- [x] E13 — Baseline: 15 tests, lint, scoped type-check and production build pass.
- [x] E14 — Five selected Java examples compile and match reference output.
- [x] E15 — Audit, build plan, portable handoff and source/Git baseline created outside the app folder.

## Phase 0 — Protect the existing work (do before edits)

- [x] P00 — Confirm user authorization to implement app changes. Read AUDIT.md, HANDOFF.md and this plan; compare current source to SOURCE-BASELINE.json and inspect Git status. Preserve all pre-existing edits.
- [x] P01 — Make a local recovery copy/snapshot of the current app source/config/tests and lockfile, excluding secrets, node_modules, build output and nested archive. Verify restore path. Do not commit/push without authorization.
- [x] P02 — Establish browser-data safety: keep origin/port stable; do not clear storage. Design export format for progress without passwords/hashes/session tokens. Decide migrations before renaming stored identities.

Acceptance: recovery copy exists; current Git changes are understood; no accidental resets or data clearing. Next default implementation task: P00, then P01.

## Phase 1 — Correct the core learning flow and claims (highest priority)

- [x] P10 — Resolve duplicate Python `operators-and-expressions` identity; choose merge vs unique identity deliberately and preserve old completion meaning. Add subject/topic uniqueness and route-identity tests. (F01)
- [x] P11 — Reset inline question state on lesson change, using stable question/topic identity or explicit reset. Regression: answer, navigate Next without reload, new questions are enabled/unanswered; repeat backwards and across subjects. (F02)
- [x] P12 — Synchronize quiz shortcuts/query params/selector/start destination. Test Python and another subject, plus browser back/forward. (F03)
- [x] P13 — Remove silent Bubble Sort fallback. Use one availability registry, honest disabled/planned cards and unsupported-route handling. Update “every classic” wording. Test all 18 routes and an invalid route. (F04)
- [x] P14 — Replace “Runnable code” with reference-example wording and “Offline-first” with accurate local-progress wording until those features exist. Audit promises against actual behavior.
- [x] P15 — Add structural content checks to repeatable tests: uniqueness, required fields, difficulty enum, MCQ answer/explanation alignment, shuffle invariants and valid URL syntax. Keep known factual review separate.
- [x] P16 — Complete Phase 1 regression: tests/lint/typecheck/build; desktop and narrow-screen smoke check; record evidence and update handoff.

Acceptance: every topic has a unique reachable identity; navigation cannot leak answered state; shortcuts start the intended subject; unavailable tools never impersonate another tool; claims match implementation.

## Phase 2 — Repair study tools and external data

- [x] P20 — Fix company fetch races with request identity/cancellation or company-keyed state. Test delayed A→B responses and old errors. (F07)
- [x] P21 — Validate CSV schema/content and safe URL destinations; reject HTML/empty-invalid responses; timeout/cancel sensibly; do not destroy a good cache. Distinguish session-loaded, cached, stale and failed states.
- [x] P22 — Separate preview size, static source totals, loaded row count and unique/placement counts; show snapshot/fetch dates. Do not promise live complete data before fetching it.
- [x] P23 — Add explicit canonical problem IDs/URLs to sheets. Do not guess from decorated titles. Verify representative destinations, then all distinct links within practical rate limits; record unresolved ones rather than guessing. (F06)
- [x] P24 — Limit/rework the complexity estimator. Test Python/JS/Java/C++ fixtures, reads vs allocations, sequential/nested/halving loops, binary search, merge sort and Fibonacci. Return uncertainty for unsupported syntax; no unearned exactness. (F05)
- [x] P25 — Correct known teaching errors: permutations vs subsets, Fenwick range queries, Quick Sort worst-case space, DFS trace and Dijkstra overflow-safe arithmetic. Test changed code/trace examples.
- [x] P26 — Define pattern-matching signals/prerequisites and ranking; ensure “best fit” agrees with order. Test sorted-only, sorted+pairs, graph shortest paths and weight constraints.
- [x] P27 — Phase 2 regression and evidence checkpoint.

Acceptance: company panels cannot mix data; cache status is truthful; practice links identify intended problems; estimator claims are bounded and tested; changed teaching examples have traceable checks.

## Phase 3 — Protect progress and finish assessment behavior

- [x] P30 — Add progress export/import with versioned schema, safe validation, preview and merge/replace choice; automatic pre-import backup; profile isolation; never export credential/session data. Test malformed, oversized and foreign-version imports.
- [x] P31 — Detect corrupt/wrong-shape learning data and offer recovery instead of silently overwriting it. Test full/disabled storage and migration interruption.
- [x] P32 — Show available quiz pool size and constrain requested count; System Design hard/15 explains the three-question limit before starting.
- [x] P33 — Decide stopwatch vs real timed test. Default low-cost fix is honest “scored stopwatch” labeling. Countdown/deadline/auto-submit is a separate approved enhancement. Include explanations in result review.
- [x] P34 — Handle mixed-subject accuracy explicitly, separate inline answers from quiz attempts if useful, and disclose history retention. Add scoring/finish/retry/double-click tests and dedupe policy.
- [x] P35 — Give every roadmap phase meaningful completion criteria; eliminate 0/0. Decide where Aptitude/System Design belong; do not silently pretend all phases are tracked.
- [x] P36 — Phase 3 regression, export/restore exercise and checkpoint.

Acceptance: users can safely recover their learning progress; assessment controls and accuracy mean what their labels say; roadmap milestones are completable.

## Phase 4 — Build missing visualizers in small tested batches

Each completed visualizer needs its own generator, expected trace tests, step controls, accurate pseudocode/variables, accessible descriptions and mobile layout checks. Use deterministic fixtures including empty/singleton/duplicates, absent search targets and graph edge cases as appropriate. Tick only after tests and browser check.

- [x] P40 — Selection Sort.
- [x] P41 — Insertion Sort.
- [x] P42 — Linear Search and Binary Search, with target input.
- [x] P43 — Merge Sort and Quick Sort, with recursion/partition states.
- [x] P44 — Stack, Queue and Linked List operations.
- [x] P45 — Binary Search Tree insertion/search.
- [x] P46 — BFS and DFS with explicit adjacency model and visited/frontier state.
- [x] P47 — Dijkstra with nonnegative-weight validation and safe distance arithmetic.
- [x] P48 — Fibonacci recursion, Hashing/Collisions, Sliding Window and Two Pointers.
- [x] P49 — Add validated custom input where useful, compare algorithms only after individual traces work, then run all-route regression.

Acceptance: registry availability equals implemented generators; no card silently reuses Bubble Sort; every advertised algorithm has evidence beyond an animation.

## Phase 5 — Make it lighter and genuinely installable/offline

- [ ] P50 (PARTIAL 2026-11-16: initial Home JS 402,262 B -> 294,220 B, see checkpoint; low-end CPU profile not measured) — Lazy-load routes and subject content; remove unused dependencies only after usage/build checks. Compare against audited 3,933.48 kB JS / 1,117.11 kB gzip baseline. Measure cold load/parse on a low-end profile; record actual improvement.
- [ ] P51 — Reduce/self-host fonts where licensing permits; preserve original notebook appearance and readable fallbacks. Honor reduced motion and avoid expensive decorative animation.
- [x] P52 — Add manifest/icons and service worker with versioned cache, safe update behavior and a clear offline fallback. Cache chosen lessons, not every remote resource blindly.
- [ ] P53 — Test offline cold/warm navigation, reconnect, storage pressure, updates and actual phone installation. Show which company lists/content are saved; stale cache is not current data.
- [ ] P54 — Audit keyboard/focus, contrast, labels/touch targets, horizontal overflow and reduced motion on desktop/phone. Check print A4/Letter output and remove unverified “one-page” promises.
- [ ] P55 — Expand lint/type-check coverage deliberately; add relevant regression/E2E tests; review dependency advisories and license/attribution obligations. Resolve actual issues without hiding warnings.

Acceptance: measured lighter loading, usable narrow-screen layout, genuine install/offline behavior and documented limitations. No real-device or installation check is assumed complete.

## Optional later features (not part of the correctness repair)

- [ ] O01 — Bookmark UI using the existing storage hook, saved page list and filters.
- [ ] O02 — Personal notes per topic, included in safe backup/restore.
- [ ] O03 — Wrong-answer revision and spaced-repetition flashcards with clear scheduling rules.
- [ ] O04 — Fill missing supporting-subject coverage with reviewed content, not bulk unverified generation.
- [ ] O05 — Sandboxed JavaScript/HTML/CSS playground first; consider Python/Java/C++ only after choosing runtime, payload limits, isolation and resource cost. Never run arbitrary user code in the main app context.
- [ ] O06 — Optional real authentication/cloud sync only after requirements, privacy and hosting decisions. Local profile hashes are not suitable server auth.
- [ ] O07 — Public static deployment only when requested; configure SPA fallback, HTTPS and release checks. No public upload is authorized now.

## Checkpoint log

### 2026-11-12 — Audit checkpoint
- Completed E01–E15 at the verification levels above.
- Application implementation tasks: **0 completed**.
- 15 existing tests, lint, scoped type-check, production build and five focused Java examples pass.
- Reproduced visualizer fallback and quiz shortcut bugs in browser.
- No application source edits, dependency installs, Git resets/commits/pushes, public deployment or browser-data clearing.
- Next: obtain implementation authorization, preserve recovery snapshot, then execute Phase 1 in small testable changes.

For every future checkpoint append: date, last finished task ID, exact changed files, tests/results, outstanding issue, next exact task, and location of backups. If work stops mid-task, leave it unchecked and write what remains.

### 2026-11-13 — Phase 1 implementation checkpoint
- Finished P00–P02 and P10–P16; implementation authorization received. Previous handoff/baseline unavailable; created fresh verified recovery baseline instead.
- Recovery archive, exact changed files, migration/export design, evidence and restore guidance: see IMPLEMENTATION-NOTES.md.
- Fixed duplicate Python identity without changing the original progress key; reset inline MCQs across navigation/prop changes; quiz subject now uses URL as source of truth.
- One visualizer registry; implemented Bubble Sort, honest planned pages for 17 others and explicit unknown-route page. Corrected intro/DSA promises and narrow-screen bar overflow.
- Tests 20/20; lint, scoped typecheck, build pass. Browser harness 54/54 at desktop and 390px iframe. No real-phone certification. Existing dist and normal-origin browser data untouched.
- Outstanding: large bundle and all Phase 2+ work. Next exact task: P20 company fetch race protection with delayed success/error tests.

### 2026-11-13 — Phase 2 checkpoint A (P20–P22)
- Company panels keyed by company; latest-request identity and abort cleanup prevent stale success/error publication, including fetchers that ignore abort.
- CSV schema/rows/quoting/difficulty/HTTPS LeetCode URLs validated; invalid or failed refresh leaves valid cache intact. Stale cache remains readable; timeout and abort supported; persistence failures labeled session-only.
- UI distinguishes bundled occurrences, preview rows, fetched rows, unknown static source date, fetch time, browser cache, stale cache and session-only results.
- Changed: src/components/CompanyBank.jsx, src/lib/latestRequest.js, src/lib/companyFullList.js; tests/company-requests.test.js, tests/company-cache.test.js.
- Verification: 29/29 tests pass (p21-tests.log). P20 lint pass. Full/browser regression remains P27. Recovery: session recovery/pre-phase2.tar.gz (233 files hash-verified).
- Next: P23 explicit sheet destinations; unresolved mappings must not be guessed.

### 2026-11-13 — Phase 2 checkpoint B (P23–P24)
- Sheet links now store explicit catalog IDs/URLs, preserving display titles and progress keys. 422/426 distinct titles matched a downloaded 3,173-row title/slug catalog; four ambiguous/non-LeetCode labels have null destinations and visible pending-review labels (no guessed href). All 510 placements checked.
- Source and SHA-256, unresolved list, and live-access limitation: src/content/dsa/sheet-link-review.json. Official LeetCode catalog returned 403; bulk destination reachability was not certified or retried. Catalog identity matching is not live page availability.
- Complexity tool replaced broad keyword guesses with explicit scalar/for-loop templates; unsupported functions, recursion, binary-search while syntax, allocations and calls return Cannot determine for both time and space. No merge-sort/Fibonacci keyword guesses. Tests cover Python/JS/Java/C++, reads vs allocations, nesting/sequential/halving and unsupported recurrences.
- Changed: src/content/dsa/sheets.js, src/content/dsa/sheet-link-review.json, src/components/SheetCard.jsx, src/pages/DSAHub.jsx, src/lib/complexityAnalysis.js, src/components/ComplexityCalculator.jsx; tests/sheet-links.test.js, tests/fixtures/sheet-destinations.json, tests/complexity-analysis.test.js.
- Verification: 37/37 tests pass (p24-tests.log). An allocation false-positive was caught by fixtures and corrected. Next: P25 targeted teaching/code corrections.

### 2026-11-13 — Phase 2 checkpoint C (P25–P27)
- P25: fixed subset/permutation output costs; Fenwick arbitrary sum ranges via two prefix sums; Quick Sort average/worst recursion space and partition trace; DFS trace follows explicit adjacency through 3→2; Dijkstra uses long/long long distances, safe comparators/addition and rejects negative weights/invalid edges.
- P26: rule-based ranking extracted to pure module; deterministic ordering prefers confirmed prerequisites; only first confirmed result gets top badge. Missing prerequisites visible. BFS requires unweighted graph, Dijkstra non-negative weights, Bellman-Ford handles possible negative edges with cycle caveat; weight choices mutually exclusive.
- P27: 45/45 automated tests pass; lint and scoped typecheck pass; actual C++ and Java Quick Sort/DFS/Dijkstra fixtures compile and execute. Production build passes outside project dist (3,994.96 kB JS / 1,126.60 kB gzip; optimization still P50).
- Real-component browser fixtures: Phase 2 24/24 desktop and 24/24 at 390px; Phase 1 rerun 54/54 desktop and 54/54 at 390px. Test origin 5174; no real company network requests in browser fixtures. Exact test cache keys/history restored; normal port 5173 storage untouched. No real-device certification.
- Files, evidence, recovery and limitations: IMPLEMENTATION-NOTES.md, Phase 2 section. No install, deployment, Git reset/commit/push or normal-origin data clearing.
- Phase 2 completion means repairs verified within stated scope, not all external destinations certified: four ambiguous sheet titles remain unlinked; official LeetCode API returned 403.
- Next exact task: P30 safe progress export/import; follow the allowlisted versioned schema design and backup-first policy in IMPLEMENTATION-NOTES.md.

### 2026-11-13 — Phase 3 implementation checkpoint A (P30–P35)
- P30: version 1 allowlisted learning export/import at /progress, file validation/2 MB limit, preview, explicit current-profile merge/replace, backup-first multi-key writes with rollback/pending marker and restore controls. Credentials/sessions never read by transfer functions.
- P31: malformed/wrong-shape values detected; hooks block overwrites, visible recovery notice and raw-copy/reset controls. First damaged raw copy retained per field; legacy migration validates before copying, retries interruption without overwriting existing destinations.
- P32: available pool shown and count clamped before starting; System Design hard requests above 3 explicitly reduced. P33: scored stopwatch wording, no deadline/auto-submit, complete option explanations in result review; legacy timed URLs normalized.
- P34: per-subject mixed scores; inline accuracy displayed separately from quiz accuracy. Latest 50 learning records include inline answers (disclosed); stable run IDs dedupe history; synchronous answer/advance/finish guards, event-detail double-click protection, route/retry remount. Unsaved result disclosed.
- P35: every roadmap item has a real named lesson milestone, all 13 subjects included, Aptitude in foundations and System Design in advanced; phase milestones distinguished from full subject tracker.
- Evidence: p30/p31/p34/p35 test/lint/typecheck logs in session. Recovery: recovery/pre-phase3.tar.gz, 248 files hash-verified. P36 browser import/restore, quiz finish/retry/double-click and full regression still in progress.

### 2026-11-13 — Phase 3 verification checkpoint B (P36)
- Finished P30–P36 within the scope described above. 59/59 tests; lint and configured-scope typecheck pass; production build passes outside existing project dist.
- Real browser Phase 3: 41/41 desktop and 41/41 at 390px. Includes learning-only export, file preview, merge/replace/backup restore, malformed/foreign-version rejection, visible corruption and blocked overwrite, raw-copy/reset recovery, quota failure, System Design pool cap, correct practice/stopwatch scores, double-click/finish dedupe, retry/route reset, review explanations, and completing all roadmap phases.
- Earlier browser regressions rerun: Phase 1 54/54 and Phase 2 24/24 desktop. Prior phases' narrow-screen checks remain recorded in earlier checkpoints; Phase 3 narrow-screen check is current. No real-phone/install certification.
- Storage tests cover oversized import, profile isolation, backup-write failure, partial import rollback, persistent rollback failure/pending recovery, wrong-shaped recovery metadata, disabled storage and interrupted legacy migration.
- Exact changed files, recovery steps, limits and logs: IMPLEMENTATION-NOTES.md Phase 3 section. Temporary test origin 5174 only; fixture keys restored, normal 5173 browser data untouched. Snapshot recovery/pre-phase3.tar.gz contains 248 pre-edit files verified by hash.
- Remaining limitations: latest 50 learning records include inline answers (separately displayed in accuracy); old mixed quizzes lack retrospective subject breakdown; stopwatch is not a deadline; backups are browser-local until downloaded; four sheet destinations/live-link verification limits from Phase 2 remain. Large bundle optimization remains P50.
- Next exact task: P40 Selection Sort visualizer with deterministic trace fixtures and browser controls verification. No Phase 4 or optional features completed.

### 2026-11-13 — Phase 4 sequential implementation and verification
Recovery before source edits: session `recovery/pre-phase4.tar.gz`, 261 files hash-verified; exact paths and changed-file inventory in IMPLEMENTATION-NOTES.md. No pre-existing work reset.

- P40 — Selection Sort: src/lib/visualizers/trace.js, registry/player; deterministic minimum-selection/swap snapshots including empty/singleton/duplicates/negative values. p40-tests.log 60/60; per-route browser 15/15 desktop and 390px.
- P41 — Insertion Sort: trace.js/registry; held key, shift and insertion states with sorted prefix and stable tie policy. p41-tests.log 61/61; browser 15/15 at both widths.
- P42 — Linear/Binary Search: visualizers/search.js/registry; explicit target input, first-match linear policy, binary inclusive interval and ascending-input validation. p42-tests.log 64/64; both routes 30/30 browser checks at both widths, absent targets/duplicates/empty fixtures covered.
- P43 — Merge/Quick Sort: visualizers/recursiveSort.js/registry; recursion ranges/depth, merge buffer, Lomuto pivot/partition states. p43-tests.log 67/67, partition invariant and sorted reference fixtures; both routes 30/30 browser at both widths.
- P44 — Stack/Queue/Linked List: visualizers/structures.js/registry; explicit operation sequences, LIFO/FIFO, empty reads/removals, node identity/next/head/tail. p44-tests.log 69/69; three routes 45/45 browser at both widths.
- P45 — BST: visualizers/tree.js/registry; insert/search, explicit left/right links, duplicates ignored, no balancing promise. p45-tests.log 70/70; browser 15/15 at both widths.
- P46 — BFS/DFS: visualizers/graphs.js/registry; directed adjacency in input order, visited/frontier, BFS distances/queue and DFS recursion stack. p46-tests.log 71/71; cyclic/self-loop/disconnected/empty fixtures; routes 30/30 browser at both widths.
- P47 — Dijkstra: graphs.js/registry; non-negative safe-integer edge validation, exact distances, unreachable state and overflow rejection. This teaching version scans vertices for the minimum (O(V²+E)), not a heap. p47-tests.log 72/72; browser 15/15 at both widths. Independent all-pairs cross-check added in final suite.
- P48 — Fibonacci/Hashing/Sliding Window/Two Pointers: visualizers/techniques.js/registry; call tree/stack/returns, normalized modulo chains, complete fixed-size window sums, distinct-index sorted pair search. p48-tests.log 76/76; four routes 60/60 browser at both widths.
- P49 — Shared custom JSON validation, target editing, SVG/tree/list/bucket/array views, accessible state descriptions and bounded controls. Sorting comparison runs two actual generators on last-applied input and compares results/theoretical bounds, not frame counts or runtime. DSAIndex/Intro/subject claims updated. All 18 registered generators available; unknown route still explicit.

Final verification: 80/80 tests; lint, configured-scope typecheck and production build pass. All-route browser 280/280 desktop and 280/280 at 390px. Earlier browser regressions: Phase 1 55/55 (availability expectations updated), Phase 2 24/24, Phase 3 41/41 desktop. No real-device/screen-reader certification. Evidence and exact files in IMPLEMENTATION-NOTES.md.

No dependencies installed, storage cleared, Git reset/commit/push or deployment. Visualizers do not save learning data; browser harnesses use isolated port 5174 and restore their own learning fixtures. Normal 5173 server/storage untouched. Temporary tab/server stopped. Production output outside existing dist.

Outstanding: Phase 2 link limitations remain, bundle remains large; Phase 5 not started. Next exact task: P50 lazy route/content loading and before/after measurement, preserving appearance and not removing dependencies without usage checks.


### 2026-11-13 — Phase 5 resumed checkpoint
- Preserved 307-file hash-verified recovery snapshot before edits; unrecorded Phase 5 source was already present and is now explicitly distinguished from prior verified work.
- P50 partial: route/subject/search/quiz payload splitting, parity tests and request dedupe verified. Initial Home JS 467.24 kB / 156.44 kB gzip vs audit 3,933.48 / 1,117.11; aggregate emitted JS increases to 6,087.33 kB because deferred indexes duplicate some content. Controlled low-end load/parse benchmark still outstanding, so P50 remains unchecked.
- P51 partial: retained local fonts/licenses; switched favicon to existing 192px icon and excluded 1.285 MB original artwork from automatic cache. Font/motion verification remains.
- P52 complete at implementation/test level: manifest/icons, versioned shell and selected-subject downloads, explicit updates, honest offline fallback, rollback on failed saves, verified asset inventories and safe static-cache boundaries. Real-phone installation belongs to still-open P53.
- 100/100 tests; lint/scoped typecheck/build pass. Browser regressions Phase 1 55/55 desktop and 390px; Phases 2/3/4 24/41/280 desktop. Real production update and saved-vs-unsaved cold navigation checked with isolated server stopped. No real-device certification.
- Exact changed files, evidence, trade-offs, release ID and backup paths in IMPLEMENTATION-NOTES.md Phase 5 section. Project dist and normal 5173 server/storage preserved. No dependency install/commit/push/deployment.
- Next: finish controlled P50 loading measurement, then P51/P53 verification and P54 accessibility/print. P53–P55 remain open; four sheet destinations/live LeetCode limitations unchanged.


## User-requested expansion — 13 November 2026
- [x] X01 — Prepare device-aware PWA install flow with compact temporary Inklet identity/icons; no publishing. Final name/logo/HTTPS URL remains the final release stage in RELEASE-LAST.md.
- [x] X02 — Expand System Design to a complete **defined-scope** syllabus: 42 lessons across 12 groups, four original-paper guides, common notebook styling, practice deliverables and read-only printable course.
- [x] X03 — More → Build an OS: 24 units, full unit syllabuses, language/tool prerequisites, reused subject destinations, new build notes, docs/videos, 199 saved concept/lab gates and print course.
- [x] X04 — Progress/backup compatibility, correct subject-only totals, install/platform tests, curriculum source/coverage checks, desktop + 390px browser checks, production review build.
- [ ] X05 — User review of the running app. No second build path until review; suggest later.
- [ ] X06 — LAST: approved final branding, user-supplied hosted HTTPS address, authorized deployment and real desktop/mobile installation tests. See RELEASE-LAST.md. PUBLIC_HTTPS_URL_PENDING is documentation only, never a fake link.

### Expansion checkpoint
105 tests, lint/scoped typecheck/build pass. New browser harness 35/35 desktop and 35/35 at 390px. Generated archive now 549 topics and 1,496 MCQs. Real production OS syllabus and 42-lesson print view checked. Synthetic install prompt tests are not device installation evidence. All exact files, sources, caveats and recovery in IMPLEMENTATION-NOTES.md. Review server on 5176 left running; original dist/normal 5173 progress preserved. No deployment/install/commit/push. Prior Phase 5 completion limits remain, not silently ticked by this expansion.


### 2026-11-13 — OS reference navigation correction (user review)
- [x] X07 — OS references carry an explicit build/unit context. Focused reference lessons show the originating OS unit and one primary Back to OS build link returning to that unit’s #references section. Refresh/new-tab URLs preserve it; normal standalone lessons keep normal syllabus navigation.
- Context references hide unrelated previous/next subject lessons, the subject-syllabus return links and unrelated study-tool shortcuts. Primary return replaces the reference history entry to avoid a reference/back loop.
- OS overview no longer repeats subject-reference chips in every unit; reference links live on the unit page. Unit header identifies Build an OS and unit X of 24. No new routes/content added beyond fixing the flow.
- 108/108 tests, lint/scoped typecheck/build pass; extended browser harness 45/45 desktop and 45/45 at 390px. Includes exact return destination, standalone navigation, reopened URL context and overview decluttering. Review build at 5176 refreshed; no learning data/schema changes or deployment.
- Optional next improvements, not implemented: one Resume OS card and a compact lab-evidence journal. Defer another full build path until navigation is reviewed.


## OS Lab Bench — implemented; final verification limits below

Requested 13 November 2026. User asked to save the plan and provide a portable project because credits are limited. **This checkpoint authorizes documentation/packaging only, not starting implementation.** Resume this feature when the user asks. Earlier Resume-card/lab-journal ideas remain optional, not work to add automatically.

### Outcome and first-release boundary
Add one compact, deterministic **predict → run → inspect → fix** experiment inside the existing **Virtual Memory** OS-build unit (`/build/os/virtual-memory`). The learner predicts whether a memory access will succeed, inspects a tiny page table and permission checks, corrects the mapping, and verifies the result. It is an educational browser simulation, **not a real kernel, emulator, compiler or complete RISC-V Sv39 implementation**.

One “Try the lab” button within the unit; one experiment visible at a time. No new More-menu item, dashboard widgets, AI chat panel, new build path, account/backend service or paid model calls. Keep the original notebook appearance and the current exact-unit return navigation. Do not expand into scheduling/deadlocks/filesystem labs until this experiment is reviewed.

### Proposed teaching model
- Use a stated fixed page size (for example 4096 bytes), a small bounded virtual-page table, frame numbers and explicit mapped/user/read/write permissions. Define address bounds and user-mode access; avoid ambiguous real-ISA claims.
- Show virtual address → virtual page + offset → mapping → permission decision → physical address or a named fault. Physical address is frame × page size + offset only after validation.
- Start with a few deterministic fixtures: valid read, write to read-only page, unmapped page, and attempted user access to a kernel-only mapping. Present them sequentially, not as a sprawling control panel.
- Learner first selects an outcome/reason, then runs the trace. “Inspect” explains the first failing check in text, not color alone. “Fix” offers bounded controls for the relevant mapping/permission, followed by Retry.
- Keep the expected user/kernel boundary explicit: do not reward making a kernel-only page user-accessible as a universal fix. A correct outcome may be rejecting an unauthorized access. Explain why a repair is valid for the scenario’s stated policy.
- Restart/Retry must reset the current attempt consistently; changing a scenario must not leak an old answer, repair or success state. No arbitrary code evaluation, free-form system commands or network dependency.

### Implementation checklist
- [x] LB00 — Read BUILD-PLAN.md, latest IMPLEMENTATION-NOTES.md and RELEASE-LAST.md; inspect current worktree, preserve user edits and make a fresh source snapshot. Baseline at this packaging checkpoint: 108 automated tests and 45+45 curriculum browser checks previously passed. Re-run baseline when resuming; do not claim a prior run certifies future edits.
- [x] LB01 — Define the simplified model, bounds, scenario policy, immutable fixtures and named outcomes in a pure module (suggested `src/lib/osLabBench.js`). Document differences from real page tables, TLBs, demand paging and COW. Do not silently mix architectures.
- [x] LB02 — Add model tests before the UI: address/page-boundary arithmetic; mapped/unmapped; read/write permissions; user/kernel policy; invalid/negative/non-integer/out-of-range inputs; stable first-fault precedence; valid/rejected repairs; immutable input and deterministic trace.
- [x] LB03 — Build one lazy-loaded notebook-style component (suggested `src/components/OSLabBench.jsx`) behind “Try the lab” in the virtual-memory unit. Preserve its URL/back context; no top-level menu or new subject. Predict, run, inspect and repair should be distinct small steps with one primary action.
- [x] LB04 — Add a separate saved challenge-pass result only after the explicit success conditions below. Prefer a versioned namespaced timestamp in the existing completed map, e.g. `challenge:os:vm-page-table:v1`, if sufficient. Keep it distinct from `build:os:virtual-memory:lab` and subject ticks; do not auto-complete either. Label it “Simulation challenge passed”, never “kernel implemented”. If richer attempts/results are required, deliberately design/validate/migrate/export that schema before writes; no ad-hoc localStorage key with silent data loss.
- [x] LB05 — Verify profile isolation, backup export/import/merge/replace and storage-error reporting for the pass result. Unknown or stale challenge versions must not silently count as current mastery. The result must not inflate subject totals, existing 199 build-gate denominator or quiz accuracy. No credentials, tokens or sensitive data in results.
- [x] LB06 (verified 2026-11-16, see checkpoint; limits stated) — Add browser tests for full predict/run/inspect/fix/retry flow, incorrect predictions, rejected unsafe repairs, scenario/restart reset, repeated clicks, persisted pass, profile separation, reference return navigation, keyboard-only use, labels/focus/live status, non-color explanations and 390px overflow. Verify offline operation in the production PWA; lazy assets must be included in the chosen offline policy even if never opened before going offline. No external resources required to run the experiment.
- [ ] LB07 — Run tests, lint, configured-scope typecheck and production build outside the existing dist; repeat relevant navigation/progress/print/install regressions. Update audit/implementation notes with exact changed files, results, limitations and backup path. Run the review app for the user. Leave all LB tasks unchecked until verified; no deployment or dependency installation without a concrete need and required authorization.

### Suggested challenge-pass rule (finalize before coding)
A learner must demonstrate a correct outcome/reason on the required deterministic cases and complete the permitted repair/rejection tasks. Merely opening the lab, clicking Run, or changing a checkbox is not a pass. Define behavior after an incorrect prediction and make it visible; allow learning retries without falsely calling a self-reported checkbox an assessment. Local-browser results are convenience learning records, not tamper-proof credentials.

### Acceptance criteria
- A learner can explain which translation/permission check failed and produce the intended safe outcome, with a readable worked trace.
- No extra menu clutter; the experiment belongs to one existing OS unit and can be closed to resume reading.
- The same inputs produce the same bounded result offline, with no AI/network/compiler backend.
- Saved pass is clearly separate from reading and real implementation evidence; backup/profile safety and original counts remain correct.
- Keyboard and narrow-screen flow work; old answer/repair state does not survive the wrong scenario; current reference-return behavior is preserved.
- Final branding, the user-supplied HTTPS address, public deployment and real-device installation remain **last**, not part of this feature.

### Planning/package checkpoint — 13 November 2026
Documentation and portable source archive only. OS Lab Bench is not implemented. No source feature changes, dependency installation, app-data export, tests rerun, commits, public upload or deployment in this packaging step. Existing verification records remain historical evidence. Archive excludes dependencies, Git history, build output, nested Users archive, local npm/environment configuration and machine/browser data. See PORTABLE-HANDOFF.md for setup and continuation.


### 2026-11-13 — OS Lab Bench implementation checkpoint
User authorized implementation in The-Notebook. LB00–LB05 implemented and verified at the levels in IMPLEMENTATION-NOTES.md. One lazy-loaded experiment inside Virtual Memory; no new menu, route, backend, paid AI or additional build path. Challenge pass requires all four correct initial predictions plus permitted repair/rejection, saved separately from the 199 gates.
112/112 automated tests; lint, configured-scope typecheck, production build pass. Browser lab harness 62 checks desktop + 62 at 390px (includes control-presence assertions); curriculum/navigation/print/install regression 45 checks desktop. Previously unopened lab loads after cold production navigation with server stopped.
LB06 remains partial: browser harness verifies main flows/focus/labels/layout, but exhaustive keyboard-only traversal, repeated-click races, browser quota-failure and live profile-switch exercises are not yet independently verified. LB07 remains partial pending that final targeted verification; the production build and relevant existing desktop regressions already pass. No actual-phone/screen-reader/airplane-mode certification. Existing Phase 5 and release limitations remain.
Review app: http://127.0.0.1:5186/build/os/virtual-memory . Recovery and detailed file list in IMPLEMENTATION-NOTES.md. No public deployment, Git changes/commits/pushes, or clearing existing browser data.


### 2026-11-13 — Resource shelf expansion
- [x] RS01 — Normalize all 29 supplied destinations and retain 31 existing links in one catalog with purposes, subject tags, honest source/access notes and safer publisher-primary book links. Original supplied mirrors remain in source notes; no book content copied.
- [x] RS02 — Reuse Resources for Books, Courses, Coding & practice, Interview prep, Quick references, Tools & simulators and Explore. Subject/type/search URL filters, empty state, counts and subject-prefiltered links. No new menu/routes, fake lessons or external completion tracking.
- [x] RS03 — 116 automated tests, lint/scoped types and production build pass. Shelf browser checks 32 desktop + 32 at 390px; existing curriculum/reference/print/install regression 45 desktop. Resource index added to offline shell; external resources remain online-only.
Review: http://127.0.0.1:5186/resources . Exact files, recovery hashes, source checks and limitations in IMPLEMENTATION-NOTES.md. QuickRef/Codédex/WeLib/Learn Anything/Coddy/Head First C have explicit access limits; older links not reverified. No public publishing or new dependencies. Prior lab final-check and release limitations remain.


### 2026-11-13 — Four supplied book links
- [x] RS04 — Three new books (Modern C, Eloquent JavaScript, HTML & CSS) mapped to subjects; existing Karumanchi record updated without duplication. Free author versions distinguished from commercial/third-party copies. Shelf now 63 resources.
117 tests, lint/scoped types/build pass; resource browser checks 35 desktop + 35 at 390px. Exact files, source caveats and recovery in IMPLEMENTATION-NOTES.md. No unrelated expansion, new menu or public deployment.


### 2026-11-13 — Native Behavioral Interview Studio
- [x] BI01 — Original 30-question/six-category bank, coaching, fictional STAR examples and pure practice/session model. No README/sample-answer copying.
- [x] BI02 — Visually distinct native /interviews/behavioral page, guided answer workspace, optional timer, six-prompt mock flow, self-review and personal text export. Session-only drafts explicitly disclosed; persistent story schema deferred by first-version scope decision.
- [x] BI03 — Existing behavioral Resources card opens native page. GitHub is background reading only; no added main menu. Native route lazily loaded and included in offline shell policy.
- [x] BI04 — 123 automated tests, lint/scoped types/build; 43+43 studio browser checks and 35 desktop resource regressions. Detailed evidence/limits/recovery in IMPLEMENTATION-NOTES.md.
Review http://127.0.0.1:5186/interviews/behavioral . No backend/paid AI/storage-schema changes/deployment. Full live-device/accessibility/offline-lifecycle limits remain explicit. Optional saved stories or native System Design are not automatically authorized.


### 2026-11-16 — LB06 targeted verification + P50 first bundle pass
Recovery: pre-change source tar kept outside project (session recovery). Dependencies installed with `npm ci` from the lockfile (needed to run anything); no package.json/lock changes.

**P50 measured (scripts/measure-bundle.mjs, production build, JS only, no CPU/network throttling):**
- Before: initial Home 402,262 B (130,247 B gzip); entry 391,258 B (125,761 B gzip); all JS 6,406,078 B.
- After: initial Home 294,220 B (95,219 B gzip); entry 283,216 B (90,732 B gzip); all JS 6,378,008 B (total roughly unchanged: code moved to deferred chunks, not removed).
- Change: -26.9% initial Home JS (-26.9% gzip). Versus audited 3,933,480 B baseline: -92.5%.
- Changes: removed unused QueryClientProvider (no useQuery anywhere; src/lib/query-client.js deleted; dependency left in package.json); Layout "More" menu moved to lazy src/components/MoreMenu.jsx with a plain-link fallback and an error boundary. Route and subject lazy loading already existed.
- Regression caught by verification: the offline shell list in scripts/offline-plugin.mjs is hardcoded, so the new chunk was NOT cached offline. Fixed (added src/components/MoreMenu.jsx) and added an assertion to tests/offline-worker.test.js. Confirmed in a real service-worker cache.
- Still open for P50: search index chunk (1.28 MB), QuizRunner (788 KB), TrickyQuestions (412 KB) are already deferred but large; low-end device parse/cold-load timing not measured; unused dependencies not removed.

**LB06 evidence (real Chromium tab on production build, 127.0.0.1:5190, fresh origin):**
- Keyboard: from page start, Tab reached the trigger; Enter opened the lab with focus on heading; all four cases completed with Tab/Arrow/Enter; pass saved as challenge:os:vm-page-table:v1; Close lab returned focus to the trigger; real deliverable never auto-ticked. LIMIT: the test tool cannot send Space or drive a native select popup, so the repair select value was set with a native change event; radios were operated with arrow keys.
- Repeated clicks: triple-clicks on Run, Inspect, Retry, Fresh prediction and Next produced one trace, one state change, one case advance; wrong prediction earned no credit; no premature pass.
- Quota failure: injected QuotaExceededError on the progress key. Final case showed alert, status "saving failed", Retry saving button, nothing stored; after storage restored, retry saved the pass. (First attempt used an isolated-world stub that did not reach the app and was discarded.)
- Profile switching: live switch guest -> alice dropped the mid-attempt state and pass banner; alice after reload had no pass; guest pass intact on return.
- Offline: service worker controlling, lab and MoreMenu chunks cached; with the server stopped, cold load of / and the lab route worked, a prediction ran, and the More menu opened.
- Automated: 123/123 tests, lint, configured-scope typecheck, production build pass.
LB07 remains open: curriculum/print/install browser regressions, 390px lab recheck and the 62+62 lab harness were NOT rerun after P50. No screen-reader, real-phone or airplane-mode certification.
Review app: http://127.0.0.1:5190/build/os/virtual-memory


### 2026-11-16 — Resource shelf: third book batch (BK01)
- [x] BK01 — Added 13 book records and updated the existing Database System Concepts record (not duplicated). Shelf is now 76 resources (28 books). Links go to publisher, author or catalogue pages only; no book content is bundled and none of the supplied PDFs is linked, because hosting permission is not established for any of them.
- Excluded by the user: Truth Without Apology, Beyond Good and Evil, The Guest-Talk on Kabir (all English and Hindi editions). A test keeps them off the shelf.
- Added: Grokking Algorithms; Fundamentals of Database Systems; SQL Cookbook 2nd ed.; Head First Java 3rd ed.; C Programming: A Modern Approach; Computer System Architecture (Mano); JavaScript & jQuery; Discrete Mathematics and Its Applications 8th ed.; Introduction to Linear Algebra (Strang); No Bullshit Guide to Linear Algebra; Head First Statistics; Naked Statistics; Statistics in Plain English 5th ed.
- Already on the shelf, so not added again: The C Programming Language (K&R) (the supplied "C Programming.pdf"), HTML & CSS (Duckett).
- Honest source notes recorded in each card: "Naked Statistics PDF" is a Bookey summary, not the book; "Linear Algebra tooobasic" is a ~150-page preview of the Savov book; "Head first statistics Visuals" is a 73-page excerpt; the Strang scan is the 4th edition (site now lists 5th/6th); the Mano scan is the older Mano-only 3rd edition while Pearson India sells a revised edition with Rajib Mall; the Urdan PDF is the 2001 first edition versus the 5th (2022); Fundamentals of Database Systems came from a PDF-sharing site.
- Limited status (publisher page not fully confirmed): Mano (Pearson India link confirmed via search only) and Rosen (McGraw-Hill page would not load; catalogue record linked). Head First Java's O'Reilly page was confirmed through search, not a signed-in page read.
- K. N. King's own site (knking.com) has no HTTPS, so the card links the Norton publisher page instead.
- Verification: 124/124 tests (one new batch test), lint, configured-scope typecheck, production build pass. Real-browser check on the production build: 76 cards, seven sections, Books filter shows 28, maths books filter shows 8, no overflow at desktop width, external links open with noopener noreferrer. The 390px resource-browser harness and the 35-check resource regression were NOT rerun for this batch. Review: http://127.0.0.1:5190/resources?kind=books


### 2026-11-16 — BK02: personal PDF library (Open / Download buttons)
- [x] BK02 — User asked for the supplied PDFs to open or download from the site. Implemented as a PERSONAL build only. 16 PDFs (every supplied book except the three excluded titles) are copied to the git-ignored ./personal-library/<record-id>.pdf (358 MB). `npm run build:personal` (or `dev:personal`) sets NOTEBOOK_INCLUDE_BOOKS=1 and VITE_PERSONAL_LIBRARY=1: PDFs are copied to dist/library/ and cards show "Open PDF" (new tab) and "Download PDF". New: scripts/personal-library-plugin.mjs. Changed: vite.config.js, package.json, .gitignore, src/content/resources.js (pdf field on 16 records), src/pages/Resources.jsx, scripts/serve-production.mjs (application/pdf), tests/resource-shelf.test.js.
- The normal `npm run build` contains NO PDFs and NO PDF buttons (verified). PDFs are never in the offline shell/cache.
- WARNING: these are commercial copyrighted books and hosting permission is not established for any of them. Never deploy, upload or ZIP a personal build or the personal-library folder. RELEASE-LAST.md final stage must use the normal build.
- Verification: 125/125 tests, lint, typecheck pass; normal build has no library folder; personal build has 16 PDFs; real browser: Open PDF opened a new tab in the PDF viewer, Download PDF saved the 6.45 MB file. Not tested: every one of the 16 files opened individually, offline PDF access (PDFs are online/local-server only), phones.


### 2026-11-16 — UI1: browse-first Resources shelf
- [x] UI1 — Resources reworked from a search-first page of 76 equal cards into: type tabs (Books default, Courses, Practice, Interviews, References, Tools, Explore, Everything), subject chips with counts, then one section per subject with compact rows. Search is now a small optional box. Page height for the default view fell from ~11,950 px to ~6,250 px. Access and licence notes stay behind "Source & access notes"; Open/Download PDF buttons (personal build only) sit on the row.
- URLs unchanged and still work: ?subject=, ?kind=, ?q=; invalid values fall back safely to Everything. Opening /resources with no filters shows Books. Subject chips filter by any tag (a book tagged for two subjects appears under both when the chip is chosen); the "all subjects" view lists each resource once under its first subject, General last. So a chip count can exceed the section count in the all-subjects view.
- Changed: src/pages/Resources.jsx, src/lib/resourceShelf.js (groupBySubject, subjectCounts, SUBJECT_ORDER), tests/resource-shelf.test.js. 126/126 tests, lint, typecheck, production build pass. Real-browser checks: default view, chip, tab, search, old links, invalid params, no horizontal overflow, tabs fit at 1280px.
- NOT done: tests/browser-resources.jsx (the older harness) still asserts the old layout (76 cards, seven h2 sections) and needs rewriting before it is rerun; 390px phone layout not checked; the 31 older cards still say "See provider for access terms."
