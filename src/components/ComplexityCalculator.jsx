import { useState, useMemo } from "react";
import { Calculator, Clock, Database, Zap, ChevronDown, ChevronUp } from "lucide-react";
import ComplexityGuide from "./ComplexityGuide";
import { analyzeComplexity } from "@/lib/complexityAnalysis";

// Small teaching-template recognizer; unsupported code returns uncertainty.
export default function ComplexityCalculator() {
  const [code, setCode] = useState("");
  const [expanded, setExpanded] = useState(false);

  const analysis = useMemo(() => analyzeComplexity(code), [code]);

  return (
    <div className="border border-brown/40 rounded-sm bg-paper-2/40 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-paper-2/60 hover:bg-paper-2 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Calculator size={16} className="text-green-ink" />
          <span className="font-hand text-xl text-brown">complexity estimator</span>
          <span className="text-xs text-brown/70 hidden sm:inline">— limited loop templates; otherwise unknown</span>
        </span>
        {expanded ? <ChevronUp size={16} className="text-brown" /> : <ChevronDown size={16} className="text-brown" />}
      </button>

      {expanded && (
        <div className="p-4 space-y-4 animate-page-turn">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`# Paste an algorithm snippet to estimate its complexity\n\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1`}
            className="w-full h-48 p-3 bg-paper border border-brown/30 rounded-sm font-mono-code text-sm text-ink leading-6 resize-y focus:outline-none focus:border-greenink"
            spellCheck={false}
          />

          {code.trim() && (
            <div className="grid sm:grid-cols-2 gap-3">
              <ComplexityCard
                icon={<Clock size={16} />}
                label="Time Complexity"
                value={analysis.timeComplexity}
                accent="green"
              />
              <ComplexityCard
                icon={<Database size={16} />}
                label="Space Complexity"
                value={analysis.spaceComplexity}
                accent="orange"
              />
            </div>
          )}

          {code.trim() && analysis.patterns.length > 0 && (
            <div className="border-t border-brown/20 pt-3">
              <p className="font-hand text-lg text-brown mb-2 flex items-center gap-1">
                <Zap size={14} className="text-orange-ink" /> detected patterns
              </p>
              <ul className="space-y-1">
                {analysis.patterns.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink">
                    <span className="text-green-ink mt-0.5 shrink-0">→</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {code.trim() && (
            <p className="text-xs text-brown/60 italic">
              Template estimate, not a proof. Supports scalar assignments/indexed reads, independent for-loops from 0 to n (Python range(n) or JS/Java/C++ braces), and brace-style halving for-loops. Other code returns “Cannot determine”. Assumes unit-cost arithmetic; auxiliary space excludes input.
            </p>
          )}

          <div className="border-t border-brown/20 pt-3">
            <ComplexityGuide />
          </div>
        </div>
      )}
    </div>
  );
}

function ComplexityCard({ icon, label, value, accent }) {
  const colors = {
    green: "border-greenink/40 bg-greenink/8 text-green-ink",
    orange: "border-orangeink/40 bg-orangeink/8 text-orange-ink",
  };
  return (
    <div className={`border rounded-sm px-3 py-2.5 ${colors[accent]}`}>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide opacity-80">
        {icon}
        {label}
      </div>
      <p className="font-mono-code text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}

