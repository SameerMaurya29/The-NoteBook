import { useState, useEffect, useCallback, useRef } from "react";
import { getCurrentUser } from "./localAuth.js";
import { readLearningKey, hasPendingImport } from "./learningStorage.js";
import { validLearningValue } from "./learningSchema.js";
import { profileKey } from "./profileStorage.js";
export function useLocalStorage(key, initialValue) {
  const username = getCurrentUser()?.username || "@guest";
  const storageKey = profileKey(key, username);
  const fallback = useRef(initialValue);
  const read = useCallback(() => {
    return readLearningKey(key, username).value ?? fallback.current;
  }, [storageKey, key, username]);
  const [value, setValue] = useState(read);
  useEffect(() => {
    setValue(read());
    const sync = (event) => {
      if (event.type === "storage" && event.key !== storageKey && event.key !== null) return;
      if (event.type === "notebook-storage" && event.detail !== storageKey && event.detail !== null) return;
      setValue(read());
    };
    window.addEventListener("storage", sync);
    window.addEventListener("notebook-storage", sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener("notebook-storage", sync); };
  }, [storageKey, key, username]);
  const update = useCallback((updater) => {
    try {
      if (hasPendingImport(username)) throw new Error("Recover the interrupted import before saving changes.");
      const current = readLearningKey(key, username);
      if (current.error) throw new Error("Learning data needs recovery; it has not been overwritten. Open Progress backup.");
      const prev = current.value;
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (!validLearningValue(key, next)) throw new Error("Invalid learning update was blocked.");
      localStorage.setItem(storageKey, JSON.stringify(next));
      setValue(next);
      window.dispatchEvent(new CustomEvent("notebook-storage", { detail: storageKey }));
      return true;
    } catch (error) {
      window.dispatchEvent(new CustomEvent("notebook-storage", { detail: storageKey }));
      window.alert(error.message || "Your changes could not be saved. Browser storage may be full or disabled.");
      return false;
    }
  }, [storageKey, key, username]);
  return [value, update];
}
