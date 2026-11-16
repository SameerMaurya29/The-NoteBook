import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Check, X, Clock, RotateCcw } from "lucide-react";
import { quizPool } from "@/lib/quizPool";
import { quizCount, scoreAttempt } from "@/lib/quizAssessment";
import { shuffleMCQ } from "@/lib/mcq";
import { useQuizHistory } from "@/lib/progress";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizRunner() {
  const [params] = useSearchParams();
  const [retry, setRetry] = useState(0);
  return <QuizAttempt key={`${params.toString()}:${retry}`} params={params} onRetry={() => setRetry(n => n + 1)} />;
}

function QuizAttempt({ params, onRetry }) {
  const subject = params.get("subject") || "all";
  const difficulty = params.get("difficulty") || "all";
  const sourcePool = useMemo(() => quizPool(subject, difficulty), [subject, difficulty]);
  const count = quizCount(params.get("count") || 10, sourcePool.length);
  const mode = ["timed", "stopwatch"].includes(params.get("mode")) ? "stopwatch" : "practice";

  const { record } = useQuizHistory();

  const pool = useMemo(() => shuffle(sourcePool).slice(0, count).map(shuffleMCQ), [sourcePool, count]);
  const [attemptId] = useState(() => crypto.randomUUID());
  const [startedAt] = useState(() => Date.now());
  const answered = useRef(new Set());
  const advanced = useRef(new Set());
  const finishGuard = useRef(false);
  const [saved, setSaved] = useState(true);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);

  // Timer for timed mode
  useEffect(() => {
    if (mode !== "stopwatch" || finished || !pool.length) return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(t);
  }, [mode, finished, startedAt, pool.length]);

  if (!pool.length) {
    return (
      <div className="text-center py-20">
        <p className="font-hand text-2xl text-brown">no questions match that filter</p>
        <Link to="/quiz" className="text-brown hover:text-ink underline">back to quiz bench</Link>
      </div>
    );
  }

  const q = pool[idx];

  const finish = (allAnswers) => {
    if (finishGuard.current) return;
    finishGuard.current = true;
    const seconds = Math.floor((Date.now() - startedAt) / 1000);
    setElapsed(seconds);
    setSaved(record(scoreAttempt(pool, allAnswers, { id: attemptId, subjectId: subject, mode, timeSec: seconds })));
    setFinished(true);
  };
  const advance = (allAnswers) => {
    if (advanced.current.has(idx)) return;
    advanced.current.add(idx); setAnswers(allAnswers);
    if (idx + 1 >= pool.length) finish(allAnswers);
    else { setIdx(idx + 1); setSelected(null); setRevealed(false); }
  };
  const submit = (i, event) => {
    if (event?.detail > 1 || answered.current.has(idx) || finished) return;
    answered.current.add(idx);setSelected(i);
    if (mode === "practice") setRevealed(true);
    else advance([...answers, i]);
  };
  const practiceNext = (event) => {
    if (event?.detail > 1 || selected === null || !revealed) return;
    advance([...answers, selected]);
  };

  if (finished) {
    const correct = pool.reduce((s, m, i) => s + (answers[i] === m.answer ? 1 : 0), 0);
    const pct = Math.round((correct / pool.length) * 100);
    return (
      <div className="animate-page-turn max-w-2xl mx-auto space-y-6">
        <div className="text-center bg-paper-2/50 border border-brown rounded-sm p-8">
          <p className="font-hand text-2xl text-brown">result</p>
          <div className="text-6xl font-heading text-ink my-2">{pct}%</div>
          <p className="text-ink">{correct} of {pool.length} correct</p>
          {mode === "stopwatch" && <p className="text-brown text-sm mt-1">in {Math.floor(elapsed / 60)}m {elapsed % 60}s</p>}
          {!saved && <p role="alert" className="text-destructive">Result could not be saved. Recover learning storage before trying again; this score is displayed for this session only.</p>}
          <div className="flex gap-2 justify-center mt-4">
            <Link to="/quiz" className="px-4 py-2 bg-paper border border-brown rounded-sm text-brown hover:text-ink">New quiz</Link>
            <button onClick={onRetry} className="flex items-center gap-1 px-4 py-2 bg-greenink text-paper rounded-sm">
              <RotateCcw size={15} /> Retry
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Review</h2>
          {pool.map((m, i) => {
            const ok = answers[i] === m.answer;
            return (
              <div key={i} className={`border rounded-sm p-4 ${ok ? "border-greenink bg-greenink/5" : "border-destructive bg-destructive/5"}`}>
                <p className="text-ink font-medium flex items-start gap-2">
                  {ok ? <Check size={16} className="text-green-ink mt-1 shrink-0" /> : <X size={16} className="text-destructive mt-1 shrink-0" />}
                  {m.question}
                </p>
                <p className="text-sm text-brown mt-1 ml-6">
                  Your answer: {answers[i] !== undefined ? m.options[answers[i]] : "—"} {!ok && <span className="text-green-ink">· Correct: {m.options[m.answer]}</span>}
                </p>
                <ul className="text-sm mt-2 ml-6 space-y-1">{m.explanations.map((explanation,j)=><li key={j}><strong>{String.fromCharCode(65+j)}{j===m.answer?" (correct)":""}:</strong> {explanation}</li>)}</ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-page-turn max-w-2xl mx-auto space-y-6">
      <Link to="/quiz" className="inline-flex items-center gap-1 text-brown hover:text-ink text-sm">
        <ArrowLeft size={15} /> quit
      </Link>

      {Number(params.get("count") || 10) > pool.length && <p className="text-sm text-brown">Requested {params.get("count") || 10}; this filter has {sourcePool.length} available. This quiz contains {pool.length}.</p>}
      {mode === "stopwatch" && <p className="text-sm text-brown">Scored stopwatch — counts up, no deadline or auto-submit.</p>}
      <div className="flex items-center justify-between">
        <span className="font-mono-code text-sm text-brown">Q {idx + 1} / {pool.length}</span>
        {mode === "stopwatch" && (
          <span className="flex items-center gap-1 font-mono-code text-sm text-orange-ink">
            <Clock size={14} /> {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
          </span>
        )}
        {mode === "practice" && <span className="stamp text-greenink">practice</span>}
      </div>

      <div className="h-1.5 bg-paper-2 rounded-full overflow-hidden">
        <div className="h-full bg-greenink rounded-full" style={{ width: `${((idx) / pool.length) * 100}%`, transition: "width 0.3s" }} />
      </div>

      <div className="bg-paper-2/50 border border-brown rounded-sm p-5">
        <div className="flex items-start gap-2 mb-4">
          <span className="stamp text-brown shrink-0">{q.difficulty}</span>
          {q.subjectName && <span className="text-xs text-brown">{q.subjectName} · {q.topicTitle}</span>}
        </div>
        <p className="text-lg text-ink font-medium mb-4">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answer;
            const isChosen = i === selected;
            let cls = "border-brown bg-paper hover:bg-paper-2/60";
            if (revealed && isCorrect) cls = "border-greenink bg-greenink/10";
            else if (revealed && isChosen && !isCorrect) cls = "border-destructive bg-destructive/10";
            else if (revealed) cls = "border-brown bg-paper opacity-70";
            return (
              <button
                key={i}
                onClick={(event) => submit(i, event)}
                disabled={revealed}
                className={`w-full text-left border rounded-sm px-3 py-2.5 transition-colors min-h-[44px] flex items-start gap-2 ${cls}`}
              >
                <span className="font-mono-code text-xs text-brown mt-0.5 shrink-0">{String.fromCharCode(65 + i)}</span>
                <span className="text-ink">{opt}</span>
                {revealed && isCorrect && <Check size={16} className="text-green-ink ml-auto shrink-0" />}
                {revealed && isChosen && !isCorrect && <X size={16} className="text-destructive ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>
        {revealed && (
          <div className="mt-4 pl-2 border-l-2 border-orangeink/50">
            <p className="text-sm text-ink">{q.explanations[q.answer]}</p>
          </div>
        )}
      </div>

      {mode === "practice" && revealed && (
        <button onClick={practiceNext} className="w-full py-3 bg-greenink text-paper rounded-sm font-medium hover:opacity-90 min-h-[44px]">
          {idx + 1 >= pool.length ? "See results" : "Next question →"}
        </button>
      )}
    </div>
  );
}