import { profileKey } from "./profileStorage.js";
// Browser-only personal data that is not part of Progress backup (yet).
export const NOTES_KEY = "notebook:notes";
export const LAST_KEY = "notebook:lastVisited";
export const MAX_NOTE = 5000;
const MAX_NOTES = 2000;
const okId = (s) => typeof s === "string" && s.length > 0 && s.length <= 300 && !["__proto__", "constructor", "prototype"].some((p) => s.includes(p)) && !/[\x00-\x1f]/.test(s);
const store = () => globalThis.localStorage;

function readJson(key, username, storage) {
  try { const raw = storage.getItem(profileKey(key, username)); return raw === null ? null : JSON.parse(raw); } catch { return null; }
}
export function readNotes(username, storage = store()) {
  const v = readJson(NOTES_KEY, username, storage);
  if (!v || typeof v !== "object" || Array.isArray(v)) return {};
  return Object.fromEntries(Object.entries(v).filter(([k, n]) => okId(k) && n && typeof n.text === "string"));
}
/** Save (or delete when blank) one lesson note. Returns true on success. */
export function saveNote(username, topicKey, text, storage = store()) {
  if (!okId(topicKey) || typeof text !== "string") return false;
  try {
    const all = readNotes(username, storage);
    const clean = text.slice(0, MAX_NOTE);
    if (clean.trim()) all[topicKey] = { text: clean, updatedAt: Date.now() }; else delete all[topicKey];
    if (Object.keys(all).length > MAX_NOTES) return false;
    storage.setItem(profileKey(NOTES_KEY, username), JSON.stringify(all));
    return true;
  } catch { return false; }
}
export function readLast(username, storage = store()) {
  const v = readJson(LAST_KEY, username, storage);
  return v && okId(v.subjectId) && okId(v.topicId) && Number.isSafeInteger(v.at) ? v : null;
}
export function saveLast(username, subjectId, topicId, storage = store()) {
  if (!okId(subjectId) || !okId(topicId)) return false;
  try { storage.setItem(profileKey(LAST_KEY, username), JSON.stringify({ subjectId, topicId, at: Date.now() })); return true; } catch { return false; }
}
