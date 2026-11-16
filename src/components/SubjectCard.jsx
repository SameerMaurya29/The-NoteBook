import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProgressRing from "@/components/ProgressRing";
import SubjectIcon from "@/components/SubjectIcon";

export default function SubjectCard({ subject, index, completed, subjectProgress }) {
  const pct = subjectProgress(subject.id, subject.topics.length);
  const lastDone = [...subject.topics].reverse().find((t) => completed[`${subject.id}:${t.id}`]);

  return (
    <Link
      to={`/subject/${subject.id}`}
      className="group relative flex flex-col bg-paper-2/50 border border-brown/40 rounded-2xl p-6 hover:-translate-y-1 hover:border-brown hover:shadow-[0_8px_24px_hsl(var(--ink)/0.08)] transition-all duration-200"
    >
      {/* Glyph + progress */}
      <div className="flex items-start justify-between">
        <SubjectIcon id={subject.id} className="w-11 h-11 text-brown group-hover:text-ink group-hover:scale-110 transition-all" />
        <ProgressRing value={pct} size={42} />
      </div>

      {/* Title + blurb */}
      <h3 className="mt-5 text-xl font-semibold text-ink group-hover:text-brown transition-colors">
        {subject.name}
      </h3>
      <p className="text-sm text-brown mt-1.5 line-clamp-2 leading-relaxed">{subject.blurb}</p>

      {/* Footer */}
      <div className="mt-auto pt-5 flex items-center justify-between text-xs text-brown border-t border-brown/20 mt-5">
        <span>{subject.topics.length} topics</span>
        <span className="flex items-center gap-1 text-green-ink opacity-0 group-hover:opacity-100 transition-opacity">
          open <ArrowRight size={12} />
        </span>
      </div>

      {lastDone && (
        <p className="font-hand text-base text-brown mt-3 -mb-1">
          ↳ you left off at: {lastDone.title}
        </p>
      )}
    </Link>
  );
}