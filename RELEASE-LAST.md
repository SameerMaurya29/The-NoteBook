# Release last: public installation and final identity

User decision, 13 November 2026: prepare only. Do not deploy or upload this project now. The user will provide the hosted address later. Finish and review the app first.

## Placeholders
- Public production address: `PUBLIC_HTTPS_URL_PENDING` (documentation placeholder, deliberately not a clickable URL).
- Temporary installed name: **Inklet**. It is not a claim of worldwide/trademark uniqueness. The visible study-site name stays The Notebook until final brand approval.
- Temporary mark: original page-and-ink-nib icon, with 192px, 512px and a separate maskable variant. Final approval remains open.
- Manifest `id`, `start_url` and `scope` remain `/` so no fabricated hostname is shipped. This release assumes hosting at the site root; subdirectory deployment requires a deliberate base/scope/service-worker configuration change.

## Final stage — do last, after the user reviews the app
- [ ] Receive the actual public HTTPS address and hosting choice from the user.
- [ ] Confirm final short name/logo before users install; review naming/ownership rather than asserting global uniqueness.
- [ ] Apply approved identity consistently in manifest name/short_name, icons, Apple app title, install UI and site branding if requested. Keep the stable manifest id unless intentionally migrating installation identity.
- [ ] Review deployment contents (exclude nested Users archive, secrets, tests and development artifacts), hosting SPA fallback, correct MIME types and service-worker scope/update behavior.
- [ ] Obtain explicit publish authorization for the selected destination. No accounts, purchases or public uploads authorized in this checkpoint.
- [ ] Test desktop installation on target Chrome/Edge and supported Safari Add to Dock; test Android and iPhone/iPad using actual devices. Browser support and wording vary; no universal one-click prompt claim.
- [ ] Verify installed icon/name, standalone launch, updates, offline selected subjects/OS notebook, reconnect, and progress backup/restore. Progress remains device/browser-local; installation is not cloud sync.
- [ ] Replace this placeholder with the final URL and record real-device evidence. Do not mark installation complete from a simulated event test.

## Review build
Local review only: http://127.0.0.1:5176/build/os . This is not the future public address and cannot be opened on a phone by typing that phone’s localhost.

- [ ] DO NOT publish a personal build: confirm `dist/` has no `library/` folder and the host receives only the normal `npm run build` output. ./personal-library holds copyrighted PDFs for personal use only.
