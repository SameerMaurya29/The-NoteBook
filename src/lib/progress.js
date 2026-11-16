import { addHistory, accuracyForSubject } from "./quizAssessment.js";
import { useLocalStorage } from "./useLocalStorage";

const PROGRESS_KEY = "notebook:progress";
const QUIZ_KEY = "notebook:quizHistory";
const BOOKMARK_KEY = "notebook:bookmarks";

/** A topic is "completed" when its ID lives in the progress set. */
export function useProgress() {
  const [completed, setCompleted] = useLocalStorage(PROGRESS_KEY, {});

  const isDone = (topicId) => Boolean(completed[topicId]);

  const toggle = (topicId) => {
    setCompleted((prev) => {
      const next = { ...prev };
      if (next[topicId]) delete next[topicId];
      else next[topicId] = Date.now();
      return next;
    });
  };

  const markDone = (topicId) => {
    setCompleted((prev) => ({ ...prev, [topicId]: Date.now() }));
  };

  return { completed, isDone, toggle, markDone };
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage(BOOKMARK_KEY, []);
  const isBookmarked = (id) => bookmarks.includes(id);
  const toggleBookmark = (id) =>
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  return { bookmarks, isBookmarked, toggleBookmark };
}

export function useQuizHistory() {
  const [history, setHistory] = useLocalStorage(QUIZ_KEY, []);

  const record = (entry) => setHistory((prev) => addHistory(prev, { ...entry, date: entry.date || Date.now() }));
  const subjectAccuracy = (subjectId) => accuracyForSubject(history, subjectId);
  const inlineAccuracy = (subjectId) => accuracyForSubject(history, subjectId, { inline: true });
  return { history, record, subjectAccuracy, inlineAccuracy };

}

const SHEET_KEY = "notebook:sheetProgress";

/** Tracks which DSA-sheet questions the user has solved, keyed by `category::title`. */
export function useSheetProgress() {
  const [done, setDone] = useLocalStorage(SHEET_KEY, {});

  const key = (category, title) => `${category}::${title}`;
  const isDone = (category, title) => Boolean(done[key(category, title)]);
  const toggle = (category, title) => {
    setDone((prev) => {
      const k = key(category, title);
      const next = { ...prev };
      if (next[k]) delete next[k];
      else next[k] = Date.now();
      return next;
    });
  };
  const setKeyDone = (k, on) => {
    setDone((prev) => {
      const next = { ...prev };
      if (on) next[k] = Date.now(); else delete next[k];
      return next;
    });
  };
  const countFor = (category, questions) =>
    questions.filter((q) => done[key(category, q.title)]).length;
  const total = Object.keys(done).filter((k) => !k.startsWith("lc:")).length;

  return { done, isDone, toggle, setKeyDone, countFor, total };
}