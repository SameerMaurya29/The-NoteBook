import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const diffColor = {
  easy: "text-green-ink border-greenink",
  medium: "text-brown border-brown",
  hard: "text-orange-ink border-orangeink"
};

/**
 * TopicTree — the syllabus "stem". Each node is a topic with a difficulty stamp.
 */
export default function TopicTree({ subjectId, topics, completed = {} }) {
  return (
    <ol className="relative ruled-lines">
      <span className="absolute left-[7px] top-2 bottom-2 w-px bg-brown/40" aria-hidden />
      {topics.map((t, i) => {
        const done = completed[`${subjectId}:${t.id}`];
        return (
          <li key={t.id} className="relative pl-7">
            <span
              className={`absolute left-0 top-2 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-paper ${
                done ? "border-greenink bg-greenink/20" : "border-brown"
              }`}
            >
              {done && <Check size={10} className="text-green-ink" />}
            </span>
            <Link
              to={`/subject/${subjectId}/${t.id}`}
              className="group flex flex-wrap items-center gap-2 leading-8 min-h-[44px]"
            >
              <span className="text-ink group-hover:text-brown transition-colors">{t.title}</span>
              <span className={`stamp ${diffColor[t.difficulty]}`}>{t.difficulty}</span>
              {done && <span className="hand-stamp">done ✓</span>}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}