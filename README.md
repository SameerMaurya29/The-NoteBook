# The Notebook
Standalone React/Vite learning archive. No hosted builder, provider SDK, analytics plugin, or backend is required.

## Run
`npm install`, then `npm run dev`. Production: `npm run build`; preview: `npm run preview`.
Deploy `dist/` to a static host with SPA fallback to `index.html`. Local password hashing requires HTTPS or localhost.

## Local profiles
Username/password profiles live only in this browser. New passwords use salted PBKDF2-SHA256 hashes (210,000 iterations). Old plaintext credentials upgrade after successful login. This is a local convenience lock, not secure authentication: anyone with browser/device access can modify storage. There is no email recovery or cross-device account sync. Guest mode has separate progress.

The current legacy session receives existing shared progress; otherwise the first non-guest profile to sign in receives it. Original learning-storage keys remain as backups. Later profiles start separately. Clearing site data deletes local accounts and progress. Content/fonts and remote company lists may still require network access; this is not a complete offline PWA.

## Validation
`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`.
The nested `Users/` archive is not active application source and is intentionally untouched.

## Focused lesson checks
`node scripts/verify-java-examples.mjs` compiles and runs five Java examples (variables, control flow, classes/objects, operators, Comparable/Comparator) and compares standard output. Requires a JDK supporting switch expressions (tested with JDK 25). Control-flow statements are wrapped in a test-only main method; complete programs use their public-class filenames. This does not certify the remaining examples.

The first explanatory diagrams appear in OS Process States, DBMS SQL JOINs, Networks TCP Connection Management, and COA Memory Hierarchy. Expected-output panels are reference text, not live execution.


## New learning features and release status
- More → Build an OS: `/build/os`, 24 notebook units, full concept checklists, practice gates and primary resources. `/build/os/print` prints the full course.
- More → System Design syllabus: `/system-design`, 42 lessons, grouped coverage and paper-reading guides. `/print/systemdesign` prints the complete notebook in the existing style.
- More → Install & offline: browser-aware installation and chosen-subject downloads. Installed name **Inklet** is a temporary placeholder, not final branding. Subject, paper and build progress remains browser/profile-local and is included in learning backups.
- **Publish last:** see `RELEASE-LAST.md`. The public address is `PUBLIC_HTTPS_URL_PENDING`; no site is published. Root-relative PWA configuration assumes site-root hosting, not a subdirectory. Device-specific installation must be tested after the actual HTTPS address is provided.
- Local production review is running at `http://127.0.0.1:5176/build/os`; this is not a public URL or phone-accessible localhost.

## OS Lab Bench
Build an OS → Virtual Memory → Try the lab. Four deterministic page-table cases, no backend or real kernel execution. A saved simulation pass is separate from reading ticks and the real lab deliverable. It uses existing profile-local learning backups and is cached with the offline OS notebook. Final verification limits: see BUILD-PLAN.md.

## Learning resource shelf
More → Resources (`/resources`): 63 external destinations grouped as Books, Courses, Coding & practice, Interview prep, Quick references, Tools & simulators and Explore. Filter by subject/type or search; direct URLs preserve filters. Subject syllabuses, DSA Hub, System Design syllabus and OS overview link to the matching shelf. Source/access notes distinguish verified metadata, incomplete pages and unverified third-party mirrors. The resource index is in the offline shell; linked external content is not downloaded or tracked as completed.

## Native interview practice
Resources → Interview prep → Behavioral Interview Studio (`/interviews/behavioral`) now opens an original native experience, not GitHub. 30 prompts/six categories, STAR coaching and fictional examples, searchable library, optional timer, six-prompt mock session, self-review and .txt draft export. Drafts stay only in page memory; reload, leaving or profile switch discards them. Download before leaving; Progress backup does not include these drafts. No AI assessment, recording or persistent-story storage. GitHub remains background reading in collapsed source notes.
