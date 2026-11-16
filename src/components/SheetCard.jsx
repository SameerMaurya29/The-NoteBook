import { Check } from "lucide-react";
import { useSheetProgress } from "@/lib/progress";

const diffColor = {
  easy: "text-green-ink",
  medium: "text-orange-ink",
  hard: "text-destructive"
};

/** One DSA practice sheet — questions grouped by difficulty, each tickable
 *  (persisted offline) and linked to its LeetCode problem page. */
export default function SheetCard({ sheet }) {
  const { isDone, toggle, countFor } = useSheetProgress();
  const doneCount = countFor(sheet.category, sheet.questions);
  const pct = sheet.questions.length
    ? Math.round((doneCount / sheet.questions.length) * 100)
    : 0;

  return (
    <div className="bg-paper-2/40 border border-brown/40 rounded-sm p-4">
      <div className="flex items-center justify-between border-b border-brown/30 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
          <span className="font-mono-code text-brown">{sheet.icon}</span>
          {sheet.category}
        </h3>
        <span className="font-mono-code text-xs text-brown">
          {doneCount}/{sheet.questions.length} · {pct}%
        </span>
      </div>

      {["easy", "medium", "hard"].map((d) => {
        const qs = sheet.questions.filter((q) => q.difficulty === d);
        if (!qs.length) return null;
        return (
          <div key={d} className="mb-3 last:mb-0">
            <p className={`font-mono-code text-xs uppercase mb-1.5 ${diffColor[d]}`}>
              {d} · {qs.length}
            </p>
            <ol className="space-y-1">
              {qs.map((q, i) => {
                const checked = isDone(sheet.category, q.title);
                return (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <button
                      type="button"
                      onClick={() => toggle(sheet.category, q.title)}
                      aria-label={checked ? "Mark not done" : "Mark done"}
                      className={`shrink-0 w-8 h-8 rounded-sm border flex items-center justify-center transition-colors ${
                        checked
                          ? "bg-greenink/30 border-greenink/50 text-green-ink"
                          : "border-brown/50 hover:border-greenink/60"
                      }`}
                    >
                      {checked && <Check size={11} strokeWidth={3} />}
                    </button>
                    <a
                      href={q.url || undefined}
                      aria-disabled={!q.url}
                      title={!q.url ? "Practice destination unresolved — no link guessed" : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 min-w-0 truncate ${
                        checked ? "text-brown line-through" : "text-ink hover:text-orange-ink"
                      }`}
                    >
                      <span className="text-brown font-mono-code mr-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {q.title}{!q.url && <span className="text-xs text-brown"> — link pending review</span>}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
}