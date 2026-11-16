# Portable project handoff — updated 13 November 2026

## Start here
Read README.md and PLAN.md, then the latest checkpoints in BUILD-PLAN.md and IMPLEMENTATION-NOTES.md. This is the current source package, including the native Behavioral Interview Studio, 76-resource shelf and OS Lab Bench. The older packaging-only checkpoint is historical.

## Included
Standalone React/Vite app, all current source/generated content, public fonts/icons and license files, scripts, tests, configuration, package.json/package-lock.json and project documentation. The archive contains a fresh SHA256SUMS.json covering every other packaged file.

Current features: 42 System Design lessons/four paper guides, 24 OS build units/199 gates, exact-unit reference navigation, Virtual Memory simulation, subject-filtered resource shelf and original native interview practice. The studio has 30 prompts, STAR writing, fictional examples, timer, six-question mock sessions, self-review and personal .txt export.

Excluded: node_modules, dist/build outputs, .git, nested Users archives, environment/npm configuration, logs/caches, machine/browser data and recovery/older archives. No external book PDFs or website content are bundled.

## Run after extracting
Use Node.js 22 LTS (or a compatible supported version). In the extracted The-Notebook folder:

```sh
npm ci
npm run dev
```

Checks and production preview:

```sh
npm test
npm run lint
npm run typecheck
npm run build
node scripts/serve-production.mjs dist 5176
```

npm ci needs network or a suitable package cache. Do not copy node_modules between machines. Development regenerates the content catalog; the normal production build enables the PWA worker.

## Data safety
This is a source archive, not a browser learning-data backup. Before moving machines/origins, export learning progress from the app's Progress backup page, then import deliberately into the intended local profile. Credentials, sessions and localStorage are not included. Do not clear the old browser profile.

Behavioral story drafts exist only in page memory and are NOT in Progress backup. Download them from the studio before leaving/reloading/switching profiles. This ZIP contains no personal drafts.

## Verification and limits
Latest implementation verification: 123 automated tests; lint, configured-scope typecheck and production build pass. Studio browser checks: 43 desktop + 43 at 390px; resource regression: 35 desktop. These checks were performed during implementation, not all repeated for packaging. The ZIP itself is read/hash-verified.

Existing caveats remain in IMPLEMENTATION-NOTES.md: OS Lab LB06–LB07 targeted checks, broader Phase 5 performance/accessibility/device-install checks, unverified external destinations/permissions and no comprehensive real-phone/screen-reader certification. Studio timer/background/profile-switch/download details have their stated verification limits. External resources need network; native shell caching does not download external books or courses. Many historical evidence paths refer to machine-local files not included here.

## Release remains last
Visible name The Notebook; temporary installed name Inklet. No public deployment or hosting account is included or authorized. PUBLIC_HTTPS_URL_PENDING is a documentation placeholder. Final branding, actual HTTPS address, publishing authorization and device-install tests remain last in RELEASE-LAST.md.


## Personal PDF library
./personal-library (16 copyrighted PDFs, 358 MB) is excluded from the source ZIP and from Git. Use `npm run build:personal` only for private local use.
