import InlineCode from "./InlineCode";
import { useState } from "react";
import { Check, Copy, Terminal, ArrowDown, PencilLine } from "lucide-react";

/**
 * CodeBlock — light "paper-2" code surface with a copy button.
 * No dark mode; uses the notebook palette. Lightweight token highlighting.
 */
export default function CodeBlock({ code, lang = "text", output = undefined, note = undefined, walkthrough = undefined }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="my-4">
      <div className="bg-paper-2 border border-brown rounded-sm overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-brown bg-paper">
          <span className="inline-flex items-center gap-2 text-brown"><Terminal size={15} /><span className="font-mono-code text-xs uppercase tracking-wider">{lang}</span><span className="hidden sm:inline text-xs opacity-70">· worked example</span></span>
          <button
            onClick={copy}
            className="flex items-center gap-1 text-xs text-brown hover:text-ink transition-colors min-h-[36px] px-1"
            aria-label="Copy code"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "copied" : "copy"}
          </button>
        </div>
        <pre tabIndex={0} aria-label={`${lang} code example`} className="code-example-scroll overflow-x-auto text-[14px] leading-7 py-3">
          <code className="font-mono-code text-ink">{code.split("\n").map((line, i) => <span className="code-example-line" key={i}><span aria-hidden="true" className="code-line-number">{i + 1}</span><span className="whitespace-pre pr-4">{highlight(line, lang)}{i < code.split("\n").length - 1 ? "\n" : ""}</span></span>)}</code>
        </pre>
      </div>
      {output && (
        <div className="mt-2 rounded-sm border border-greenink/30 bg-greenink/5 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-greenink/20 text-brown"><ArrowDown size={14} /><span className="font-hand text-lg">expected output</span><span className="ml-auto text-[10px] font-mono-code">REFERENCE · NOT LIVE</span></div>
          <pre className="px-4 py-3 font-mono-code text-sm text-ink whitespace-pre-wrap overflow-x-auto">{output}</pre>
        </div>
      )}
      {walkthrough?.length > 0 && <div className="mt-3 border-l-2 border-orangeink/40 pl-3"><p className="font-hand text-xl text-brown mb-2">read the example</p><ol className="space-y-2">{walkthrough.map((step, i) => <li key={i} className="flex gap-2 text-sm text-ink"><span className="text-orange-ink font-mono-code text-xs pt-0.5">{i + 1}.</span><span><InlineCode>{step}</InlineCode></span></li>)}</ol></div>}
      {note && (
        <p className="mt-3 flex items-start gap-2 text-sm text-brown"><PencilLine size={15} className="shrink-0 mt-0.5" /><InlineCode>{note}</InlineCode></p>
      )}
    </div>
  );
}

// Minimal, safe token highlighter — keywords, strings, comments, numbers.
const KEYWORDS = new Set([
  "public","private","protected","class","static","void","int","long","double","float","boolean","char","String","var","new","this","super","return","if","else","for","while","do","switch","case","default","break","continue","import","package","extends","implements","interface","abstract","final","try","catch","finally","throw","throws","enum","def","print","println","True","False","None","in","not","and","or","is","lambda","with","as","yield","range","len","import","from","self"
]);

function highlight(code, lang) {
  // Tokenize with a single regex covering comments, strings, numbers, identifiers.
  const parts = [];
  const re = /(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d[\d_]*\b)|([A-Za-z_]\w*)|(\s+)|([^\w\s])/g;
  let m;
  let i = 0;
  while ((m = re.exec(code)) !== null) {
    const [full, comment, str, num, ident, ws, punct] = m;
    if (comment) parts.push(<span key={i++} style={{ color: "hsl(var(--brown) / 0.7)", fontStyle: "italic" }}>{full}</span>);
    else if (str) parts.push(<span key={i++} style={{ color: "hsl(var(--green))" }}>{full}</span>);
    else if (num) parts.push(<span key={i++} style={{ color: "hsl(var(--orange))" }}>{full}</span>);
    else if (ident) parts.push(KEYWORDS.has(ident) ? <span key={i++} style={{ color: "hsl(var(--brown))", fontWeight: 600 }}>{full}</span> : <span key={i++}>{full}</span>);
    else parts.push(<span key={i++}>{full}</span>);
  }
  return parts;
}