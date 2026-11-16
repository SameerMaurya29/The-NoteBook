import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Play, Clock, Zap } from "lucide-react";
import { subjects, quizPoolSize } from "@/content/generated/catalog";
import { quizCount } from "@/lib/quizAssessment";
import { useQuizHistory } from "@/lib/progress";

export default function QuizHub() {
  const [params, setParams] = useSearchParams();
  const requestedSubject = params.get("subject");
  const subject = subjects.some((s) => s.id === requestedSubject) ? requestedSubject : "all";
  const setSubject = (value) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete("subject");
    else next.set("subject", value);
    setParams(next);
  };
  const difficulty = ["easy","medium","hard"].includes(params.get("difficulty")) ? params.get("difficulty") : "all";
  const setDifficulty = (value) => {const next = new URLSearchParams(params);if(value === "all") next.delete("difficulty");else next.set("difficulty",value);setParams(next);};
  const [count, setCount] = useState(10);
  const [mode, setMode] = useState("practice");
  const { subjectAccuracy, inlineAccuracy } = useQuizHistory();
  const available = quizPoolSize(subject, difficulty);
  const effectiveCount = quizCount(count, available);

  const buildQuery = () => {
    const q = new URLSearchParams();
    if (subject !== "all") q.set("subject", subject);
    if (difficulty !== "all") q.set("difficulty", difficulty);
    q.set("count", String(effectiveCount));
    q.set("mode", mode);
    return q.toString();
  };

  return (
    <div className="animate-page-turn space-y-8">
      <header className="double-rule pt-4">
        <p className="font-hand text-2xl text-brown">quiz bench</p>
        <h1 className="text-4xl font-semibold text-ink">Test your ink</h1>
        <p className="text-brown mt-2">Pick a subject, a difficulty, and how many questions. Practice gives instant feedback; scored stopwatch mode scores at the end. The stopwatch counts up—there is no deadline or auto-submit.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Config card */}
        <div className="bg-paper-2/50 border border-brown rounded-sm p-6 space-y-5">
          <div>
            <label className="font-hand text-lg text-brown block mb-1">subject</label>
            <select aria-label="Quiz subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 bg-paper border border-brown rounded-sm text-ink">
              <option value="all">All subjects</option>
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="font-hand text-lg text-brown block mb-1">difficulty</label>
            <select aria-label="Quiz difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-3 py-2 bg-paper border border-brown rounded-sm text-ink">
              <option value="all">All levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="font-hand text-lg text-brown block mb-1">questions: {effectiveCount}</label>
            <input type="range" min={1} max={Math.max(1, Math.min(15, available))} value={Math.max(1, effectiveCount)} disabled={!available} aria-label="Question count" onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-[hsl(var(--orange))]" />
          </div>
          <p className="text-sm text-brown" role="status">{available} questions available for these filters. {count > available && available > 0 ? `Requested ${count}; only ${available} available, so this quiz will contain ${effectiveCount}.` : ""}</p>
          <div>
            <label className="font-hand text-lg text-brown block mb-1">mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setMode("practice")} className={`flex items-center gap-2 px-3 py-2.5 rounded-sm border text-sm min-h-[44px] ${mode === "practice" ? "border-greenink bg-greenink/10 text-ink" : "border-brown bg-paper text-brown"}`}>
                <Zap size={15} /> Practice
              </button>
              <button onClick={() => setMode("stopwatch")} className={`flex items-center gap-2 px-3 py-2.5 rounded-sm border text-sm min-h-[44px] ${mode === "stopwatch" ? "border-orangeink bg-orangeink/10 text-ink" : "border-brown bg-paper text-brown"}`}>
                <Clock size={15} /> Scored stopwatch
              </button>
            </div>
          </div>
          <Link to={available ? `/quiz/run?${buildQuery()}` : "#"} aria-disabled={!available} onClick={(e) => { if (!available) e.preventDefault(); }} className="flex items-center justify-center gap-2 w-full py-3 bg-greenink text-paper rounded-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]">
            <Play size={16} /> Start quiz
          </Link>
        </div>

        {/* Accuracy history */}
        <div className="bg-paper-2/50 border border-brown rounded-sm p-6">
          <h2 className="text-xl font-semibold mb-3">Quiz accuracy</h2>
          <p className="text-xs text-brown mb-3">Latest 50 learning records retained, including inline answers. Quiz attempts and inline practice are shown separately. New mixed quizzes contribute per subject; older mixed records without breakdown remain aggregate-only.</p>
          {subjectAccuracy("all") && <p className="text-sm mb-3">Mixed-quiz aggregate: {subjectAccuracy("all").pct}%</p>}
          <div className="space-y-3">
            {subjects.map((s) => {
              const acc = subjectAccuracy(s.id);
              return (
                <div key={s.id} className="flex items-center justify-between border-b border-brown/20 pb-2 last:border-0">
                  <span className="text-ink">{s.glyph} {s.name}</span>
                  <div className="text-right">{acc ? (
                    <span className="font-mono-code text-sm text-greenink">{acc.pct}% <span className="text-brown">({acc.runs} quizzes)</span></span>
                  ) : (
                    <span className="font-hand text-brown">not attempted</span>
                  )}
                  {inlineAccuracy(s.id) && <p className="text-xs text-brown">Inline: {inlineAccuracy(s.id).pct}% ({inlineAccuracy(s.id).runs} answers)</p>}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-3">Or quiz a single subject</h2>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <Link key={s.id} to={`/quiz?subject=${s.id}`} className="px-4 py-2 bg-paper-2 border border-brown rounded-sm text-brown hover:text-ink hover:bg-paper transition-colors">
              {s.glyph} {s.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}