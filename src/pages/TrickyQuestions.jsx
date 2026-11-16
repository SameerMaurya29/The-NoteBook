import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, HelpCircle, Filter } from "lucide-react";
import { trickySubjects, getTrickySubject } from "@/content/tricky";

/**
 * TrickyQuestions — a deep interview-prep section listing 40-50 tricky,
 * confusing, or commonly-missed questions per subject, each with a detailed
 * technical answer. Supports subject selection, category filtering, and
 * expandable answers.
 */
export default function TrickyQuestions() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("all");

  const activeSubject = subjectId ? getTrickySubject(subjectId) : null;

  const categories = useMemo(() => {
    if (!activeSubject) return [];
    const set = new Set(activeSubject.questions.map((q) => q.category));
    return ["all", ...Array.from(set).sort()];
  }, [activeSubject]);

  const filteredQuestions = useMemo(() => {
    if (!activeSubject) return [];
    if (filter === "all") return activeSubject.questions;
    return activeSubject.questions.filter((q) => q.category === filter);
  }, [activeSubject, filter]);

  const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  if (!activeSubject) {
    return (
      <div className="animate-page-turn space-y-8">
        <header className="double-rule pt-4">
          <p className="font-hand text-2xl text-brown">the trick drawer</p>
          <h1 className="text-4xl font-semibold text-ink">Tricky Questions</h1>
          <p className="text-brown mt-2 max-w-xl">
            Deep, confusing, and interview-favorite questions with detailed technical answers. Pick a subject — each has 40+ questions designed to trip you up.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trickySubjects.map((s) => (
            <Link
              key={s.id}
              to={`/tricky/${s.id}`}
              className="border border-brown/40 rounded-sm bg-paper-2/40 p-4 hover:bg-paper-2 transition-colors page-lift group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{s.glyph}</span>
                <div>
                  <h2 className="text-lg font-semibold text-ink group-hover:text-brown transition-colors">{s.name}</h2>
                  <p className="text-sm text-brown">{s.questions.length} questions</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {Array.from(new Set(s.questions.map((q) => q.category))).slice(0, 4).map((c) => (
                  <span key={c} className="text-xs px-1.5 py-0.5 bg-paper border border-brown/30 rounded-sm text-brown">{c}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-page-turn space-y-6">
      <header className="double-rule pt-4">
        <div className="flex items-center gap-2 text-sm text-brown mb-1">
          <Link to="/tricky" className="hover:text-ink">Tricky Questions</Link>
          <span>/</span>
          <span className="font-hand text-lg">{activeSubject.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{activeSubject.glyph}</span>
          <div>
            <h1 className="text-3xl font-semibold text-ink">{activeSubject.name} — Tricky Questions</h1>
            <p className="text-brown text-sm">{filteredQuestions.length} questions · deep interview prep</p>
          </div>
        </div>
      </header>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={15} className="text-brown shrink-0" />
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-2.5 py-1 rounded-sm border text-sm transition-colors min-h-[32px] ${
              filter === c
                ? "border-orangeink bg-orangeink/15 text-ink"
                : "border-brown/40 bg-paper text-brown hover:bg-paper-2"
            }`}
          >
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {filteredQuestions.map((q, i) => {
          const isOpen = expanded[q.id];
          return (
            <div key={q.id} className="border border-brown/30 rounded-sm bg-paper-2/30 overflow-hidden">
              <button
                onClick={() => toggle(q.id)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-paper-2/50 transition-colors"
              >
                <span className="font-mono-code text-xs text-brown/60 shrink-0 mt-0.5 w-6">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <p className="text-ink leading-7 font-medium">{q.question}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-1.5 py-0.5 bg-brown/10 text-brown rounded-sm">{q.category}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-sm ${q.difficulty === "hard" ? "bg-orangeink/15 text-orange-ink" : "bg-brown/10 text-brown"}`}>{q.difficulty}</span>
                  </div>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-brown shrink-0 mt-1" /> : <ChevronDown size={16} className="text-brown shrink-0 mt-1" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pl-13 animate-page-turn">
                  <div className="border-l-2 border-greenink/40 pl-4 ml-9">
                    <p className="font-hand text-base text-green-ink mb-1">answer</p>
                    <p className="text-ink leading-8 whitespace-pre-line">{q.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-brown/20">
        <Link to="/tricky" className="inline-flex items-center gap-1 text-brown hover:text-ink text-sm">
          <HelpCircle size={14} /> all subjects
        </Link>
        {(() => {
          const idx = trickySubjects.findIndex((s) => s.id === activeSubject.id);
          const next = trickySubjects[idx + 1];
          if (!next) return null;
          return (
            <button
              onClick={() => { setExpanded({}); setFilter("all"); navigate(`/tricky/${next.id}`); }}
              className="inline-flex items-center gap-1 text-brown hover:text-ink text-sm"
            >
              {next.name} →
            </button>
          );
        })()}
      </div>
    </div>
  );
}