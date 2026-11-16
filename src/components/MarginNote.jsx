import { Lightbulb, PencilLine, Bookmark } from "lucide-react";
import InlineCode from "./InlineCode";

/** Visual treatments vary; labels stay neutral because notes are not classified. */
export default function MarginNote({ children, variant = "note", index = 0 }) {
  const treatments = {
    gotcha: { icon: PencilLine, color: "text-orange-ink", style: "mentor-note-orange" },
    trick: { icon: Lightbulb, color: "text-green-ink", style: "mentor-note-green" },
    note: { icon: Bookmark, color: "text-brown", style: "mentor-note-brown" }
  };
  const treatment = treatments[variant] || treatments.note;
  const Icon = treatment.icon;
  return (
    <aside className={`mentor-note ${treatment.style}`} role="note" aria-label={`Mentor note ${index + 1}`}>
      <span className="mentor-tape" aria-hidden="true" />
      <div className={`flex items-center justify-between gap-2 mb-2 ${treatment.color}`}>
        <span className="inline-flex items-center gap-2">
          <span className="mentor-note-icon"><Icon size={17} strokeWidth={1.6} aria-hidden="true" /></span>
          <span className="font-hand text-xl mentor-note-label">in the margin</span>
        </span>
        <span className="font-mono-code text-[10px] opacity-70" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="font-hand text-[21px] leading-[1.4] text-ink"><InlineCode>{children}</InlineCode></p>
      <svg className={`mentor-scribble ${treatment.color}`} width="76" height="9" viewBox="0 0 76 9" fill="none" aria-hidden="true">
        <path d="M2 5C18 2 36 3 72 4M8 8C30 5 51 6 65 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </aside>
  );
}
