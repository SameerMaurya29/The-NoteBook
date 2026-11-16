import { validLearningValue } from "./learningSchema.js";
export const LEGACY_KEYS = ["notebook:progress", "notebook:quizHistory", "notebook:bookmarks", "notebook:sheetProgress"];
const OWNER_KEY = "notebook:legacyOwner";
export function profileKey(key, username) {
  return `notebook:profile:${encodeURIComponent(username)}:${key}`;
}
// Copy only once. Original keys remain intact as a recoverable backup.
export function migrateLegacyProgress(username, storage = localStorage) {
  if (!username || username === "@guest" || storage.getItem(OWNER_KEY)) return;
  // Validate every legacy value before starting. Originals remain recoverable on failure.
  for (const key of LEGACY_KEYS) {
    const raw = storage.getItem(key);
    if (raw !== null && !validLearningValue(key, JSON.parse(raw))) throw new Error("Legacy learning data needs recovery; original values preserved.");
  }
  for (const key of LEGACY_KEYS) {
    const raw = storage.getItem(key);
    const target = profileKey(key, username);
    if (raw !== null && storage.getItem(target) === null) {
      JSON.parse(raw); // Never silently overwrite corrupt legacy data.
      storage.setItem(target, raw);
    }
  }
  storage.setItem(OWNER_KEY, username);
}
