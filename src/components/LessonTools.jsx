import { useEffect, useRef, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/lib/progress";
import { getCurrentUser } from "@/lib/localAuth";
import { readNotes, saveNote, saveLast, MAX_NOTE } from "@/lib/personalStore";

const user = () => getCurrentUser()?.username || "@guest";

export function BookmarkButton({ topicKey }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const on = isBookmarked(topicKey);
  return (
    <button onClick={() => toggleBookmark(topicKey)} aria-pressed={on} className={`no-print flex items-center gap-1 px-3 py-1.5 rounded-sm border text-sm min-h-[36px] ${on ? "border-orangeink bg-orangeink/10 text-orange-ink" : "border-brown bg-paper hover:bg-paper-2 text-brown"}`}>
      {on ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}{on ? "Saved" : "Save"}
    </button>
  );
}

/** Remember the last lesson opened (per profile) for the Home "Continue" card. */
export function useRememberLesson(subjectId, topicId) {
  useEffect(() => { if (subjectId && topicId) saveLast(user(), subjectId, topicId); }, [subjectId, topicId]);
}

export function LessonNote({ topicKey }) {
  const username = user();
  const [text, setText] = useState(() => readNotes(username)[topicKey]?.text || "");
  const [state, setState] = useState("");
  const timer = useRef(/** @type {any} */ (null));
  useEffect(() => () => clearTimeout(timer.current), []);
  const change = (e) => {
    const v = e.target.value.slice(0, MAX_NOTE);
    setText(v); setState("Saving…");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState(saveNote(username, topicKey, v) ? "Saved in this browser" : "Could not save (storage full or blocked)"), 500);
  };
  return (
    <div className="no-print">
      <label htmlFor="lesson-note" className="sr-only">My notes for this lesson</label>
      <textarea id="lesson-note" value={text} onChange={change} rows={5} maxLength={MAX_NOTE} placeholder="Your own notes, doubts, things to revisit…" className="w-full p-3 bg-paper-2 border border-brown rounded-sm text-ink font-reading focus:border-orangeink outline-none" />
      <p role="status" className="text-xs text-brown">{state || "Private to this browser profile. Not in Progress backup yet, so clearing site data deletes it."}</p>
    </div>
  );
}
