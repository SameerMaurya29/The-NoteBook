import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { practiceAll } from "@/content/practiceLinks";

const NAMES = { cpp: "C++", javascript: "JavaScript", sql: "SQL", html: "HTML", css: "CSS", bash: "Bash", c: "C", java: "Java", python: "Python" };

/** Link-out practice: one row per runnable language in the lesson. Copy the first example, open an external editor. No code runs here. */
export default function PracticeBlock({ topic }) {
  const [copied, setCopied] = useState("");
  const rows = practiceAll(topic);
  if (!rows.length) return null;
  const copy = async (r) => {
    try { await navigator.clipboard.writeText(r.code); setCopied(r.lang); setTimeout(() => setCopied(""), 1500); } catch { /* clipboard blocked */ }
  };
  return (
    <div className="no-print mt-4 border border-brown/40 rounded-sm bg-paper-2/50 px-4 py-3">
      <p className="font-hand text-xl text-brown">try it yourself</p>
      <p className="text-sm text-ink mt-1">Copy an example, paste it into a free online editor, run it, then change one thing and predict the result.</p>
      <ul className="mt-2 space-y-2">
        {rows.map((r) => (
          <li key={r.lang} className="flex flex-wrap gap-3 items-center">
            <button onClick={() => copy(r)} className="inline-flex items-center gap-1 px-3 py-1.5 border border-brown rounded-sm text-sm text-brown hover:bg-paper min-h-[36px]">
              {copied === r.lang ? <Check size={14} /> : <Copy size={14} />}{copied === r.lang ? "Copied" : `Copy ${NAMES[r.lang] || r.lang} example`}
            </button>
            <a href={r.tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline text-brown hover:text-ink min-h-[36px]">
              <ExternalLink size={14} /> Open {r.tool.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-brown">External sites, open in a new tab. We do not run your code or track it.</p>
    </div>
  );
}
