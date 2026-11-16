import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import PatternMatcher from "@/components/PatternMatcher";
import PatternLookup from "@/components/PatternLookup";

import { visualizers, generators } from "@/lib/visualizers";

const typeColor = {
  sorting: "text-orange-ink border-orangeink",
  searching: "text-green-ink border-greenink",
  structure: "text-brown border-brown",
  tree: "text-green-ink border-greenink",
  graph: "text-orange-ink border-orangeink",
  recursion: "text-brown border-brown",
  technique: "text-brown border-brown"
};

export default function DSAIndex() {
  return (
    <div className="animate-page-turn space-y-8">
      <header className="double-rule pt-4">
        <p className="font-hand text-2xl text-brown">the visualizer bench</p>
        <h1 className="text-4xl font-semibold text-ink">DSA, animated</h1>
        <p className="text-brown mt-2 max-w-xl">
          {Object.keys(generators).length} visualizers are available with step controls, pseudocode, state descriptions and validated custom input. Algorithm examples are teaching traces, not arbitrary code execution.
        </p>
      </header>

      <PatternMatcher />

      <PatternLookup />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visualizers.map((v) => {
          const ready = Boolean(generators[v.id]);
          return (
            <Link
              key={v.id}
              to={`/dsa/${v.id}`}
              className="group bg-paper-2/60 border border-brown rounded-sm p-5 page-lift hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-start justify-between">
                <span className={`stamp ${typeColor[v.type]}`}>{v.type}</span>
                {ready ? (
                  <Play size={16} className="text-green-ink" />
                ) : (
                  <span className="font-hand text-base text-brown">coming soon</span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink group-hover:text-brown transition-colors">{v.name}</h3>
              <p className="text-sm text-brown mt-1">{v.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}