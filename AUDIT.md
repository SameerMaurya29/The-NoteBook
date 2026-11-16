Navigation review update, 13 November 2026: OS prerequisite lessons now retain explicit unit context and return to the exact OS unit, not the referenced subject syllabus. Focused references hide unrelated navigation; overview links reduced. 108 tests, lint/scoped types/build and 45+45 browser checks pass. See latest checkpoint.

Current expansion checkpoint, 13 November 2026: System Design now has 42 lessons/12 syllabus groups, four paper-reading guides and a printable notebook. Build an OS adds 24 units/199 learning-and-lab gates under More. Prepared device-aware install UI and temporary Inklet identity; final hosted address/brand/deployment explicitly last, pending user input. 105 tests plus lint/scoped typecheck/build and 35+35 desktop/narrow browser checks pass. No actual phone/desktop OS installation, exact paper pagination or exhaustive factual certification claimed. See RELEASE-LAST.md and IMPLEMENTATION-NOTES.md for current scope. Historical audit follows.

# The Notebook: feature audit

Status update, 13 November 2026: Phases 1–4 repaired and verified within IMPLEMENTATION-NOTES.md scopes. Phase 5 now in progress: P52 offline infrastructure verified in automated tests and isolated desktop browser; P50–P51 partial, P53–P55 open. Current checks: 100/100 tests, lint, scoped typecheck and build pass. Initial Home JS is 467.24 kB (156.44 kB gzip), but all deferred JS totals 6,087.33 kB; no low-end-device or real-phone certification. Original findings below are historical, not a claim that repaired defects remain. See BUILD-PLAN.md for current task state.

Audited 12 November 2026. Project: `/Users/sameermaurya/Desktop/Base`.

## Summary

This is a standalone React/Vite computer-science study archive. The main learning flow works, but several tools overstate what they do. Fix correctness and data safety before adding more content. No application source was changed for this audit. The project already had extensive uncommitted edits; preserve them. The nested `Users/` folder is an inactive archive, not the live source.

Evidence labels: **Browser** means an observed UI check; **Test** means executed automated checks; **Source** means implementation inspected, not a complete end-to-end certification. Counts were computed from the loaded content, not inferred from marketing labels.

## What already works

| Feature | Evidence | Qualification |
|---|---|---|
| Vite development server and production build | Browser + build | Local server at http://127.0.0.1:5173; no deployment performed |
| Guest entry and dashboard | Browser | Local profiles are optional |
| Search and lesson navigation | Browser | Searching “binary search” returned three relevant links; opened Binary Search lesson |
| Lesson completion | Browser | Ticked a lesson, reloaded, confirmed saved state, then restored the original unchecked state |
| Rich lessons | Browser + source | Definitions, explanations, worked examples, mistakes, notes, docs links and inline questions |
| Practice quiz feedback | Browser | Answered one runner question and observed Next question; no finished quiz was recorded in this browser check |
| Profile hashing/isolation/migration | Test + source | Salted PBKDF2-SHA256, 210,000 iterations; convenience lock, not secure server authentication |
| Bubble Sort visualizer | Browser + source fixtures | Step-forward advanced to step 2/48; play/pause, speed, restart and random arrays implemented |
| DSA hub | Source | Eight algorithm templates with C++/Java and static dry-run text; no code execution |
| DSA sheets | Source | 17 categories, 510 placements, 426 unique exact titles; completion stored per category/title |
| Tricky questions | Structural checks + source | 495 questions across 11 subjects; filter/expand/navigation implementation present |
| Cheatsheets/resources/themes | Source | Six cheatsheet entries, 31 resource links across nine groups; theme toggle implementation present |

### Content inventory

| Subject | Topic entries | MCQs including extras |
|---|---:|---:|
| Java | 56 | 124 |
| Python | 46 | 142 |
| C | 46 | 146 |
| DSA | 76 | 233 |
| OS | 46 | 58 |
| DBMS | 40 | 124 |
| Networks | 39 | 121 |
| Computer Organization | 39 | 121 |
| HTML | 35 | 109 |
| CSS | 35 | 109 |
| JavaScript | 37 | 115 |
| Aptitude | 12 | 36 |
| System Design | 8 | 24 |
| Total | 515 entries | 1,462 |

There are only **514 unique subject/topic identities**, due to the duplicate Python ID below. No truthy draft topics or empty required lesson fields were found. Every MCQ had in-bounds integer answers, aligned explanations and nonempty option text; 29,240 shuffle trials preserved answer/explanation alignment. These structural checks do not establish factual correctness.

## Fix first: correctness and misleading behavior

### F01 — Duplicate Python topic identity (high)

`operators-and-expressions` occurs in `src/content/python/basics-2.js:4` and `src/content/python/topics-1.js:145`. `src/content/index.js:24–27` returns the first match. The second lesson is not independently reachable; syllabus/completion counting can count one tick twice. Decide whether to merge or rename, with an explicit progress-migration policy.

### F02 — Lesson questions can retain old answer state (high, source-confirmed risk)

`src/components/MCQBlock.jsx:12–14` preserves selected/revealed state when `mcq` changes. `src/pages/Topic.jsx:58–64` renders NotePage without a topic key; `src/components/NotePage.jsx:133–134` keys questions by index. Route-to-route navigation can reuse answered/disabled blocks for different questions. Needs browser reproduction and regression test before declaring fixed.

### F03 — Quiz subject shortcuts do not update selected subject (high)

Browser reproduced: `/quiz` → click Python → URL gains `subject=python`, but Start quiz remains `/quiz/run?count=10&mode=practice` without a subject. Local state is initialized from query params only once (`src/pages/QuizHub.jsx:8–20,93–98`).

### F04 — Advertised visualizers fall back to Bubble Sort (high)

18 cards exist, only Bubble Sort has a generator (`src/pages/DSAIndex.jsx:6–25,55–67`; `src/pages/DSAVisualizer.jsx:50–61`). Unavailable cards are labeled coming soon but link to Bubble Sort; unknown visualizer URLs also fall back. Browser confirmed `/dsa/binary-search` displays “Bubble Sort.” The DSA subject description overclaims coverage (`src/content/dsa/index.js:14`). Derive availability from one registry; disable unavailable cards or show a clearly labeled planned page.

### F05 — Complexity estimator produces incorrect answers (high)

Actual analyzer fixtures reviewed by the DSA reviewer: Python binary search reported O(n) time/O(n) space; `const x = arr[0];` reported O(n) space; merge-sort recursion reported O(2^n). Array reads are confused with allocation; recursion and language detection are too broad (`src/components/ComplexityCalculator.jsx:123–156,196–229`). A heuristic disclaimer exists, but confident incorrect teaching output remains harmful. Prefer “cannot determine” for unsupported syntax and use a tested, limited scope rather than claiming general analysis.

### F06 — Practice destinations are guessed from labels (high)

`src/components/SheetCard.jsx:10–19,67–70` mechanically slugifies titles. “Maximum Subarray (Kadane)” becomes `maximum-subarray-kadane` instead of the canonical problem identifier. Similar issues affect Course Schedule, Rotting Oranges and abbreviated tree names. Store explicit URLs/IDs, retain presentation titles, and verify distinct destinations. External HTTP link reachability was not checked in this audit.

### F07 — Company requests can overwrite another company's panel (high, source-confirmed risk)

`src/components/CompanyBank.jsx:34–68` does not cancel or identify pending requests. An old company's response can replace the currently selected company's list/status. Add request identity or company-keyed state and deterministic out-of-order-response tests.

## Incomplete or misleading features

- **Company data/cache:** 44 data entries, 42 visible companies, 303 bundled preview rows; 13 visible companies have no preview. The summed static total 11,415 is company occurrences, not unique problems. Current CSVs are fetched only on demand from mutable GitHub main. Labels blur static totals, previews and live rows (`CompanyBank.jsx:74–86,125–142`; `src/content/dsa/companyTotals.js`).
- **Cache claims:** storage failures are swallowed yet UI claims “cached offline”; a 30-day expiry discards stale access; HTTP-200 HTML/changed schema can be accepted as a successful empty list (`src/lib/companyFullList.js:9–18,67–116`). Fixture reproductions confirmed storage-quota and HTML-response cases. Validate data and safe URL schemes; preserve previous valid cache.
- **Timed quiz:** stopwatch only, no countdown, deadline or auto-submit (`src/pages/QuizRunner.jsx:42–47`). Label honestly or implement a real timed mode. End review lacks explanations (`:103–118`).
- **Question count:** slider offers 5–15 regardless of available pool. System Design hard has only three; runner silently slices (`QuizHub.jsx:51–53`; `QuizRunner.jsx:26–33`).
- **Accuracy:** mixed quizzes record subject `all`, so no subject-specific row is updated (`QuizRunner.jsx:80–82`; `src/lib/progress.js:48–53`). History keeps 50 records; inline answers each consume a record.
- **Roadmap:** phases 3–5 have no explicit topic milestones and show 0/0; Aptitude/System Design are absent from the ordered path (`src/pages/Roadmap.jsx:54–105,137–183`). Overall subject tracker is implemented.
- **Bookmarks:** a storage hook exists, but no UI uses it (`src/lib/progress.js:29–36`; usage search found no consumers). Personal lesson notes are not implemented.
- **Offline/install:** no manifest/service-worker setup found. Google Fonts and remote company lists depend on the network. Intro says “Offline-first” (`src/components/IntroAnimation.jsx:11`), which is broader than the implementation.
- **Code execution:** intro says “Runnable code” (`IntroAnimation.jsx:7`); examples only offer copy and reference output. CodeBlock correctly marks output “REFERENCE · NOT LIVE.” No in-app compiler exists.
- **Supporting coverage:** tricky questions cover 11 subjects, not Aptitude/System Design. Cheatsheets cover six entries, not every subject. “One-page” print output is not verified and long Java/C sheets have 24 sections.
- **Teaching inaccuracies:** permutation generation listed under O(2^n) (`src/components/ComplexityGuide.jsx:111`); Fenwick range-query limitation overstated (`src/components/PatternLookup.jsx:70–77`); Quick Sort worst-case stack space understated and DFS dry run inconsistent (`src/content/dsa/algorithms.js:93–121,194–200`); Dijkstra uses overflow-prone integer arithmetic (`:211–234`). These need targeted editorial/code fixtures, not only text edits.
- **Pattern matching:** rule-based, not AI. Ranking does not genuinely distinguish match strength; “best fit” and displayed order can disagree (`src/components/PatternMatcher.jsx:76–85,167–168`).

## Engineering and data safety

- Fresh production build passes, but emits one **3,933.48 kB JS bundle (1,117.11 kB gzip)** and **77.39 kB CSS (13.79 kB gzip)**. All pages/content are eagerly imported (`src/App.jsx:9–24`). Split routes and content, measure before/after, and avoid shipping unused heavy dependencies. Do not remove dependencies merely because they look unused.
- Existing `dist/` has matching asset names/sizes, but compare outputs before treating it as a release. Audit build was written outside Base to preserve existing dist.
- Local accounts and learning data are browser/origin-specific. There is no export/import UI, cross-device sync, email recovery or backend authorization. A forged local session is not a server-security breach because no server auth is promised.
- Malformed learning JSON silently falls back to defaults (`src/lib/useLocalStorage.js:7–9`); later writes can replace damaged stored data. Add shape checks, recoverable backups and visible recovery state. Credentials have a separate corruption error.
- Lint/type-check pass but configuration deliberately excludes parts of `src/lib`, UI code and/or source entry/content files. `jsconfig.json` also includes a nonexistent `src/Layout.jsx`; expand deliberate coverage instead of equating a green check with whole-app correctness.
- No relevant automated coverage found for quiz navigation, company requests/cache, estimator, sheet links, roadmap or visualizer routing. Existing tests are focused on inline formatting, four lesson diagrams, and local profiles/migration.
- Existing Git worktree includes modifications/deletions/untracked content. Never reset/clean it to start implementing. The nested Users archive was not evaluated for secrets or content safety and should not be shipped blindly.

## Executed checks

| Check | Result |
|---|---|
| `npm test` | PASS, 15/15 |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS, configured scope only |
| `npm run build -- --outDir <session>/audit-build` | PASS, large-chunk warning |
| `node scripts/verify-java-examples.mjs` | PASS, five selected examples only |
| Browser: search → lesson | PASS |
| Browser: completion → reload → restore | PASS |
| Browser: practice feedback | PASS, first question only |
| Browser: Bubble Sort step | PASS |
| Browser: Binary Search visualizer route | DEFECT reproduced: Bubble Sort |
| Browser: Python quiz shortcut | DEFECT reproduced: starts all-subjects |

Warnings: unknown npm `store-dir` config, outdated Browserslist data, oversized JS chunk. Not build failures.

Not completed: exhaustive factual/code review, live external link/CSV availability checks, real phone/low-end device testing, screen-reader/keyboard audit, print page-count checks, complete quiz finish/retry E2E, OS PWA installation, security/dependency advisory audit, public deployment. No claim of production readiness is made.

## 13 November 2026 — OS Lab Bench update
Implemented one bounded Virtual Memory simulation without new navigation. 112 automated tests, lint/scoped types/build pass; 62+62 lab browser assertions and 45 desktop curriculum regressions pass; unopened production lab verified from cached shell during server outage. Full keyboard/quota/profile-switch browser checks remain, documented in IMPLEMENTATION-NOTES.md. No deployment; earlier audit limits remain.

## Resource shelf update — 13 November 2026
29 supplied + 31 existing destinations organized on the current Resources page. Subject-filtered entry points added without extra routes/menu items. 116 tests, lint/scoped types/build and 32+32 shelf/45 desktop curriculum checks pass. Metadata/access checks are not certification of every external course, exercise, price or license. Incomplete sources visibly labeled; commercial-book mirrors not represented as licensed free downloads. See IMPLEMENTATION-NOTES.md for exact changes/recovery/evidence. Prior limits remain.

## Native behavioral studio — 13 November 2026
Existing external card now opens an original in-app practice experience. No repository text/code copied or new persistent story storage. 123 tests, lint/scoped types/build, 43+43 studio and 35 resource browser checks pass. Draft retention/download, assessment and verification limits documented in IMPLEMENTATION-NOTES.md. No public deployment.
