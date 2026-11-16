import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, RotateCcw } from "lucide-react";

/**
 * DSAVisualizer — drives each algorithm as a step-generator.
 * Implemented availability comes from the registry. Adding
 * more algorithms is a matter of writing a step-generator.
 */

// --- Step generators return an array of step objects ---
// Each step: { array, highlights: {i, j}, sortedTail, line, vars: {name: value} }
import VisualizerSnapshot from "@/components/VisualizerSnapshot";
import { generators, getVisualizer, SORT_BOUNDS } from "@/lib/visualizers";

export default function DSAVisualizer() {
  const { viz } = useParams();
  const config = generators[viz];
  if (!config) {
    const planned = getVisualizer(viz);
    return (
      <section className="space-y-4 py-8">
        <Link to="/dsa" className="text-brown underline">All visualizers</Link>
        <h1 className="text-3xl font-semibold">{planned ? planned.name : "Visualizer not found"}</h1>
        <p className="text-brown">{planned ? "Planned — this visualizer is not implemented yet." : "No visualizer exists at this address."}</p>
      </section>
    );
  }
  return <VisualizerPlayer key={viz} config={config} />;
}

function VisualizerPlayer({ config }) {

  const [input, setInput] = useState(config.defaultInput);
  const [targetText, setTargetText] = useState(String(config.defaultTarget ?? 5));
  const [customText, setCustomText] = useState(JSON.stringify(config.defaultInput, null, 2));
  const [error, setError] = useState("");
  const [activeTarget, setActiveTarget] = useState(config.defaultTarget ?? 5);
  const [comparison, setComparison] = useState(null);
  const [compareTo, setCompareTo] = useState(config.title === "Bubble Sort" ? "selection-sort" : "bubble-sort");
  const [steps, setSteps] = useState(() => config.gen(config.defaultInput, { target: config.defaultTarget ?? 5 }));
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const timerRef = useRef(null);

  const regenerate = useCallback((arr, target = config.defaultTarget ?? 5) => {
    const generated = config.gen(arr, { target });
    setSteps(generated);
    setInput(arr);
    setActiveTarget(target);
    setComparison(null);
    setError("");
    setStepIdx(0);
    setPlaying(false);
  }, [config]);

  const apply = () => {
    try {
      if (customText.length > 10000) throw new Error("Input is too long (10,000 characters maximum).");
      if (config.hasTarget && !targetText.trim()) throw new Error("Enter an integer target.");
      regenerate(JSON.parse(customText), Number(targetText));
    } catch (e) { setError(e.message || "Invalid input"); setPlaying(false); }
  };
  const reshuffle = () => {
    const arr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 19) - 9);
    if (config.sortedInput) arr.sort((a,b) => a-b);
    setCustomText(JSON.stringify(arr));regenerate(arr, activeTarget);
  };

  useEffect(() => {
    if (!playing) return;
    if (stepIdx >= steps.length - 1) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => setStepIdx((s) => s + 1), speed);
    return () => clearTimeout(timerRef.current);
  }, [playing, stepIdx, steps.length, speed]);

  const step = steps[stepIdx];


  return (
    <div className="animate-page-turn space-y-6">
      <Link to="/dsa" className="inline-flex items-center gap-1 text-brown hover:text-ink text-sm">
        <ArrowLeft size={15} /> all visualizers
      </Link>

      <header className="double-rule pt-4">
        <h1 className="text-3xl font-semibold text-ink">{config.title}</h1>
        <p className="text-brown mt-1 max-w-xl">{config.desc}</p>
      </header>

      <details className="border border-brown p-4 space-y-3">
        <summary className="cursor-pointer">Custom input{config.hasTarget ? " and target" : ""}</summary>
        <p className="text-sm text-brown mt-2">Edit the JSON example below; edits take effect only when applied. Arrays allow up to 12 integers (-99..99); operation sequences up to 24 operations; graphs up to 10 vertices. Sorting/search/pair traces never change saved learning data. Binary Search and Two Pointers reject unsorted input.</p>
        <label className="block">Input JSON<textarea aria-label="Visualizer input JSON" value={customText} onChange={e => setCustomText(e.target.value)} spellCheck={false} className="w-full h-40 p-2 font-mono-code text-sm bg-paper border border-brown" /></label>
        {config.hasTarget && <label className="block">Target<input aria-label="Search target" type="number" step="1" value={targetText} onChange={e => setTargetText(e.target.value)} className="block max-w-full p-2 bg-paper border border-brown" /></label>}
        <button onClick={apply} className="border border-greenink px-4 py-2 min-h-[44px]">Apply input</button>
        {error && <p role="alert" className="text-destructive">{error} Previous valid trace retained.</p>}
      </details>
      {Object.values(generators).some(g => g.title === config.title && Object.keys(SORT_BOUNDS).some(id => generators[id].title === g.title)) && <details className="border border-brown p-4">
        <summary>Compare sorting results</summary>
        <p className="text-sm text-brown mt-2">Uses the last applied input, not unapplied edits. This compares results and theoretical bounds—not execution time. Display-frame counts are intentionally not treated as operation counts.</p>
        <select aria-label="Comparison algorithm" value={compareTo} onChange={e => setCompareTo(e.target.value)} className="bg-paper border border-brown p-2 my-2 max-w-full">{Object.keys(SORT_BOUNDS).filter(id => generators[id].title !== config.title).map(id => <option key={id} value={id}>{generators[id].title}</option>)}</select>
        <button className="border border-greenink p-2 mx-2" onClick={() => { const currentId = Object.keys(SORT_BOUNDS).find(id => generators[id].title === config.title); setComparison([currentId,compareTo].map(id => ({title:generators[id].title, result:generators[id].gen(input).at(-1).array, bound:SORT_BOUNDS[id]}))); }}>Compare current input</button>
        {comparison && <div aria-label="Sort comparison" className="space-y-2 mt-3">{comparison.map(row => <div key={row.title} className="border border-brown p-2"><strong>{row.title}</strong><p>Result: [{row.result.join(", ")}]</p><p className="text-sm">{row.bound}</p></div>)}</div>}
      </details>}
      <p role="status" aria-live="polite" className="text-sm text-brown">{step.narration || `${config.title}: step ${stepIdx + 1}, values ${step.array.join(", ")}.`}</p>
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Canvas */}
        <div className="bg-paper-2/40 border border-brown rounded-sm p-4 sm:p-6 min-w-0">
          <VisualizerSnapshot step={step} title={config.title} />

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            <button onClick={() => { setStepIdx(0); setPlaying(false); }} className="p-2 border border-brown rounded-sm text-brown hover:text-ink min-h-[44px] min-w-[44px]" aria-label="Restart">
              <RotateCcw size={16} />
            </button>
            <button disabled={stepIdx === 0} onClick={() => { setPlaying(false); setStepIdx((s) => Math.max(0, s - 1)); }} className="p-2 border border-brown rounded-sm text-brown hover:text-ink min-h-[44px] min-w-[44px]" aria-label="Step back">
              <SkipBack size={16} />
            </button>
            <button
              disabled={stepIdx === steps.length - 1} onClick={() => setPlaying((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 bg-greenink text-paper rounded-sm min-h-[44px]"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? "Pause" : "Play"}
            </button>
            <button disabled={stepIdx === steps.length - 1} onClick={() => { setPlaying(false); setStepIdx((s) => Math.min(steps.length - 1, s + 1)); }} className="p-2 border border-brown rounded-sm text-brown hover:text-ink min-h-[44px] min-w-[44px]" aria-label="Step forward">
              <SkipForward size={16} />
            </button>
            <div className="flex items-center gap-2 ml-2">
              <span className="font-hand text-brown">speed</span>
              <input
                type="range"
                aria-label="Playback speed"
                min={150}
                max={1500}
                step={50}
                value={1650 - speed}
                onChange={(e) => setSpeed(1650 - Number(e.target.value))}
                className="w-28 accent-[hsl(var(--orange))]"
              />
            </div>
          </div>
          {!config.inputKind && <div className="text-center mt-3">
            <button onClick={reshuffle} className="font-hand text-lg text-brown hover:text-ink">↻ new array</button>
          </div>}
        </div>

        {/* Pseudocode + vars */}
        <div className="space-y-4 min-w-0">
          <div className="bg-paper-2 border border-brown rounded-sm p-4">
            <p className="font-hand text-lg text-brown mb-2">pseudocode</p>
            <pre className="font-mono-code text-sm leading-relaxed overflow-x-auto">
              {step.pseudo.map((line, i) => (
                <div
                  key={i}
                  className={`px-2 -mx-2 rounded-sm ${step.line === i ? "bg-orangeink/25 text-ink" : "text-brown"}`}
                >
                  {line}
                </div>
              ))}
            </pre>
          </div>
          <div className="bg-paper-2 border border-brown rounded-sm p-4">
            <p className="font-hand text-lg text-brown mb-2">variables</p>
            <div className="space-y-1">
              {Object.entries(step.vars).map(([k, v]) => (
                <div key={k} className="flex flex-wrap justify-between gap-2 font-mono-code text-sm break-all">
                  <span className="text-brown">{k}</span>
                  <span className="text-ink">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
          <div data-testid="step-counter" className="text-center text-sm text-brown">
            step {stepIdx + 1} / {steps.length}
          </div>
        </div>
      </div>
    </div>
  );
}