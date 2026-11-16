import { useState, useMemo } from "react";
import { Filter, Check, Zap, RotateCcw } from "lucide-react";

// Rule-based compatible candidates; missing prerequisites are shown explicitly.
import { CONSTRAINTS, rankPatterns } from "@/lib/patternMatching";

const GROUP_LABELS = {
  input: "input shape",
  structure: "structure",
  goal: "what you need",
  property: "problem property",
};

export default function PatternMatcher() {
  const [checked, setChecked] = useState(new Set());

  const toggle = (id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        if (["unweighted", "nonnegative", "negative"].includes(id)) ["unweighted", "nonnegative", "negative"].forEach(value => next.delete(value));
        next.add(id);
      }
      return next;
    });
  };

  const reset = () => setChecked(new Set());

  const results = useMemo(() => rankPatterns(checked), [checked]);

  const groups = useMemo(() => {
    const map = {};
    for (const c of CONSTRAINTS) {
      if (!map[c.group]) map[c.group] = [];
      map[c.group].push(c);
    }
    return map;
  }, []);

  return (
    <div className="border border-brown/40 rounded-sm bg-paper-2/40 overflow-hidden">
      <div className="px-4 py-3 bg-paper-2/60 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Filter size={16} className="text-orange-ink" />
          <span className="font-hand text-xl text-brown">pattern finder</span>
          <span className="text-xs text-brown/70 hidden sm:inline">— rule-based candidates; confirm missing prerequisites</span>
        </span>
        {checked.size > 0 && (
          <button onClick={reset} className="flex items-center gap-1 text-xs text-brown hover:text-ink px-2 py-1">
            <RotateCcw size={12} /> clear
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Constraint checkboxes grouped */}
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              <p className="font-hand text-base text-brown mb-2 capitalize">{GROUP_LABELS[group]}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((c) => {
                  const on = checked.has(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggle(c.id)}
                      aria-pressed={on}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-sm transition-colors min-h-[36px] ${
                        on
                          ? "border-greenink bg-greenink/15 text-ink"
                          : "border-brown/40 bg-paper text-brown hover:bg-paper-2"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${on ? "border-greenink bg-greenink" : "border-brown/50"}`}>
                        {on && <Check size={10} className="text-paper" strokeWidth={3} />}
                      </span>
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="border-t border-brown/20 pt-3">
          {checked.size === 0 ? (
            <p className="text-brown text-sm italic text-center py-4">
              ↑ check a few constraints above and matching patterns will appear here.
            </p>
          ) : results.length === 0 ? (
            <p className="text-brown text-sm italic text-center py-4">
              No supported rule covers all {checked.size} checked constraints — try removing one, or combine patterns (e.g. sort first, then two pointers).
            </p>
          ) : (
            <>
              <p className="font-hand text-lg text-brown mb-2 flex items-center gap-1">
                <Zap size={14} className="text-orange-ink" />
                {results.length} compatible candidate{results.length !== 1 ? "s" : ""}
              </p>
              <div className="space-y-2">
                {results.map((p, i) => (
                  <div key={p.name} className="border border-brown/30 rounded-sm bg-paper p-3 flex items-start gap-3">
                    <span className="font-mono-code text-xs text-brown/60 shrink-0 mt-0.5">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-ink">{p.name}</span>
                        <span className="font-mono-code text-xs px-1.5 py-0.5 bg-greenink/10 text-green-ink rounded-sm">{p.complexity}</span>
                        {i === 0 && p.missing.length === 0 && (
                          <span className="hand-stamp text-xs">top confirmed match</span>
                        )}
                      </div>
                      <p className="text-sm text-brown mt-1 leading-6">{p.why}</p>
                      {p.missing.length > 0 && <p className="text-xs text-orange-ink mt-1">Confirm first: {p.missing.map(id => CONSTRAINTS.find(c => c.id === id)?.label).join(", ")}</p>}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.signals.map((s) => {
                          const label = CONSTRAINTS.find((c) => c.id === s)?.label;
                          return (
                            <span key={s} className={`text-xs px-2 py-0.5 rounded-sm border ${checked.has(s) ? "border-greenink/40 bg-greenink/10 text-ink" : "border-brown/30 text-brown/70"}`}>
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}