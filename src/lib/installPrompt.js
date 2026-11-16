// Capture beforeinstallprompt at app startup, even when the install page is not open.
let pending = null;
const listeners = new Set();
const publish = () => { for (const fn of listeners) fn(pending); };
export function getInstallPrompt() { return pending; }
export function subscribeInstallPrompt(fn) { listeners.add(fn); return () => listeners.delete(fn); }
export function clearInstallPrompt() { pending = null; publish(); }
if (typeof window !== 'undefined') {
 window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); pending = event; publish(); });
 window.addEventListener('appinstalled', clearInstallPrompt);
}
