import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";

/**
 * MultiCodeBlock — a language toggle (C++ / Java) over one algorithm,
 * with optional dry-run steps. `codes` is either an array of
 * { lang, code, output?, note? } or a map { cpp: "...", java: "..." }.
 */
export default function MultiCodeBlock({ codes, dryRun = undefined, output = undefined, note = undefined }) {
  const entries = Array.isArray(codes)
    ? codes
    : Object.entries(codes).map(([lang, code]) => ({ lang, code }));
  const [active, setActive] = useState(0);
  const cur = entries[active] || entries[0];

  const label = (l) => (l === "cpp" ? "C++" : l === "java" ? "Java" : l);

  return (
    <div>
      <div className="flex gap-1">
        {entries.map((e, i) => (
          <button
            key={e.lang}
            type="button"
            onClick={() => setActive(i)}
            className={`px-3 py-1 text-xs font-mono-code uppercase tracking-wider rounded-t-md border-b-2 transition-colors ${
              i === active ? "border-orangeink text-ink" : "border-transparent text-brown hover:text-ink"
            }`}
          >
            {label(e.lang)}
          </button>
        ))}
      </div>
      <CodeBlock code={cur.code} lang={cur.lang} output={cur.output || output} note={cur.note || note} />

      {dryRun && dryRun.length > 0 && (
        <div className="mt-2 px-3 py-3 bg-paper border-l-2 border-orangeink rounded-sm">
          <span className="font-mono-code text-xs text-brown uppercase tracking-wider">dry run</span>
          <ol className="mt-2 space-y-1 list-decimal list-inside text-sm text-ink font-mono-code leading-relaxed">
            {dryRun.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}