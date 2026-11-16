import InlineCode from "./InlineCode";
import { useState, useMemo } from "react";
import { Check, X } from "lucide-react";
import { shuffleMCQ } from "@/lib/mcq";

/**
 * MCQBlock — a single multiple-choice question with per-option explanations.
 * Options are shuffled once per mount so the correct answer isn't always the
 * same letter. Supports instant feedback (practice) mode.
 */
export default function MCQBlock(props) {
  // Remount answer state whenever the question content changes, including reuse
  // outside a lesson route. The topic-level key also resets revisited lessons.
  return <QuestionState key={JSON.stringify(props.mcq)} {...props} />;
}

function QuestionState({ mcq, index, onAnswered }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const q = useMemo(() => shuffleMCQ(mcq), [mcq]);

  const choose = (i) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    onAnswered?.(i === q.answer);
  };

  return (
    <div className="border border-brown rounded-sm bg-paper-2/40 p-4">
      <div className="flex items-start gap-2 mb-3">
        <span className="stamp text-brown shrink-0 mt-0.5">Q{index + 1}</span>
        <span className="stamp text-brown shrink-0 mt-0.5">{q.difficulty}</span>
        <p className="text-ink font-medium"><InlineCode>{q.question}</InlineCode></p>
      </div>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isChosen = i === selected;
          let cls = "border-brown bg-paper hover:bg-paper-2/60";
          if (revealed && isCorrect) cls = "border-greenink bg-greenink/10";
          else if (revealed && isChosen && !isCorrect) cls = "border-destructive bg-destructive/10";
          else if (revealed) cls = "border-brown bg-paper opacity-70";
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={revealed}
              className={`w-full text-left border rounded-sm px-3 py-2 transition-colors min-h-[44px] flex items-start gap-2 ${cls}`}
            >
              <span className="font-mono-code text-xs text-brown mt-0.5 shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-ink text-[15px]"><InlineCode>{opt}</InlineCode></span>
              {revealed && isCorrect && <Check size={16} className="text-green-ink ml-auto shrink-0" />}
              {revealed && isChosen && !isCorrect && <X size={16} className="text-destructive ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-3 pl-2 border-l-2 border-orangeink/50">
          {q.explanations.map((exp, i) => (
            <p key={i} className={`text-sm mb-1 ${i === q.answer ? "text-green-ink" : "text-brown"}`}>
              <span className="font-mono-code text-xs mr-1">{String.fromCharCode(65 + i)}:</span>
              <InlineCode>{exp}</InlineCode>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}