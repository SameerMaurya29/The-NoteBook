import {countSubjectCompletions} from "@/lib/buildProgress";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, X } from "lucide-react";
import { subjects } from "@/content/generated/catalog";
import { useProgress, useBookmarks } from "@/lib/progress";
import { getCurrentUser } from "@/lib/localAuth";
import { readLast } from "@/lib/personalStore";
import ProgressRing from "@/components/ProgressRing";
import SubjectCard from "@/components/SubjectCard";

export default function Home() {
  const { completed } = useProgress();
  const { bookmarks } = useBookmarks();
  const last = readLast(getCurrentUser()?.username || "@guest");
  const find = (sid, tid) => { const sub = subjects.find((s) => s.id === sid); const t = sub?.topics.find((x) => x.id === tid); return sub && t ? { sub, t } : null; };
  const lastHit = last && find(last.subjectId, last.topicId);
  const saved = bookmarks.map((k) => { const i = k.indexOf(":"); const h = find(k.slice(0, i), k.slice(i + 1)); return h && { key: k, ...h }; }).filter(Boolean);
  const [query, setQuery] = useState("");
  const [results,setResults] = useState([]);
  const [searching,setSearching] = useState(false);
  const [searchError,setSearchError] = useState("");
  useEffect(()=>{let active=true;setResults([]);setSearchError("");if(query.length<2){setSearching(false);return;}setSearching(true);import("@/content/generated/search").then(m=>{if(active){setResults(m.searchTopics(query));setSearching(false);}}).catch(()=>{if(active){setSearching(false);setSearchError("Full-text search is not saved offline yet. Reconnect and search again.");}});return()=>{active=false;};},[query]);

  const totalTopics = subjects.reduce((s, sub) => s + sub.topics.length, 0);
  const doneCount = countSubjectCompletions(subjects, completed);
  const overallPct = totalTopics ? (doneCount / totalTopics) * 100 : 0;

  const subjectProgress = (subId, topicCount) => {
    const done = subjects.find((s) => s.id === subId).topics.filter((t) => completed[`${subId}:${t.id}`]).length;
    return topicCount ? (done / topicCount) * 100 : 0;
  };

  return (
    <div className="animate-page-turn space-y-10">
      {/* Hero spread */}
      <header className="text-center md:text-left">
        <p className="font-hand text-2xl text-brown mb-1">welcome back to your desk —</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-ink leading-tight max-w-2xl">
          A senior dev's notebook for <span className="ink-underline">learning everything</span> properly.
        </h1>
        <p className="mt-3 text-brown max-w-xl">
          Handwritten notes, code examples, MCQs and animated algorithm visualizers. {subjects.length} subjects, {totalTopics} topics — all static, all yours, optional local profiles.
        </p>

        {/* Search */}
        <div className="mt-6 max-w-xl relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search every topic — try 'sorting', 'OOP', 'dict'…"
            className="w-full pl-10 pr-10 py-3 bg-paper-2 border border-brown rounded-sm text-ink placeholder:text-brown/60 focus:border-orangeink focus:ring-2 focus:ring-orangeink/30 outline-none transition"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-brown hover:text-ink rounded-sm hover:bg-paper transition-colors"
            >
              <X size={16} />
            </button>
          )}
          {results.length > 0 && (
            <div className="absolute z-20 mt-1 w-full bg-paper border border-brown rounded-sm shadow-lg max-h-80 overflow-y-auto">
              {results.slice(0, 10).map((r) => (
                <Link
                  key={`${r.subjectId}-${r.topicId}`}
                  to={`/subject/${r.subjectId}/${r.topicId}`}
                  className="block px-4 py-2.5 hover:bg-paper-2 border-b border-brown/30 last:border-0"
                  onClick={() => setQuery("")}
                >
                  <span className="text-ink">{r.title}</span>
                  <span className="text-brown text-sm ml-2">in {r.subjectName}</span>
                </Link>
              ))}
            </div>
          )}
          {searching && <p role="status">Searching the archive…</p>}
          {searchError && <p role="alert">{searchError}</p>}
          {query.length > 1 && !searching && !searchError && results.length === 0 && (
            <p className="mt-2 text-sm text-brown">No topics match "{query}".</p>
          )}
        </div>

        {/* Quick links */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { to: "/dsa", label: "DSA visualizers" },
            { to: "/roadmap", label: "Roadmap" },
            { to: "/tricky", label: "Tricky questions" },
            { to: "/cheatsheets", label: "Cheatsheets" },
            { to: "/complexity", label: "Big-O reference" },
          ].map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="text-sm px-3 py-1.5 bg-paper-2 border border-brown/50 rounded-sm text-brown hover:text-ink hover:border-brown hover:bg-paper transition-colors"
            >
              {q.label}
            </Link>
          ))}
        </div>
      </header>

      {(lastHit || saved.length > 0) && (
        <section className="grid gap-4 md:grid-cols-2">
          {lastHit && <div className="border border-brown rounded-sm p-4 bg-paper-2/50">
            <p className="font-hand text-xl text-brown">continue where you left off</p>
            <Link className="underline text-ink" to={`/subject/${lastHit.sub.id}/${lastHit.t.id}`}>{lastHit.t.title}</Link>
            <span className="text-sm text-brown"> · {lastHit.sub.name}</span>
          </div>}
          {saved.length > 0 && <div className="border border-brown rounded-sm p-4 bg-paper-2/50">
            <p className="font-hand text-xl text-brown">saved lessons ({saved.length})</p>
            <ul className="mt-1 space-y-1 text-sm">{saved.slice(0, 6).map((h) => <li key={h.key}><Link className="underline text-ink" to={`/subject/${h.sub.id}/${h.t.id}`}>{h.t.title}</Link> <span className="text-brown">· {h.sub.name}</span></li>)}</ul>
            {saved.length > 6 && <p className="text-xs text-brown mt-1">+{saved.length - 6} more</p>}
          </div>}
        </section>
      )}

      {/* Overall progress */}
      <section className="bg-paper-2/50 border border-brown rounded-sm p-5 page-lift">
        <div className="flex items-center gap-6">
          <ProgressRing value={overallPct} size={84} label="overall" />
          <div>
            <p className="font-hand text-2xl text-brown">your shelf</p>
            <p className="text-ink">
              {doneCount} of {totalTopics} topics ticked off across {subjects.length} subjects.
            </p>
            <p className="text-brown text-sm mt-1">Keep turning pages — every tick is saved in your browser.</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-2">
          {subjects.map((sub) => {
            const pct = subjectProgress(sub.id, sub.topics.length);
            return (
              <Link key={sub.id} to={`/subject/${sub.id}`} className="group" title={`${sub.name}: ${Math.round(pct)}%`}>
                <div className="flex items-center justify-between text-xs text-brown mb-1">
                  <span className="truncate group-hover:text-ink transition-colors">{sub.name}</span>
                  <span className="font-mono-code">{Math.round(pct)}%</span>
                </div>
                <div className="h-1.5 bg-paper rounded-full overflow-hidden border border-brown/20">
                  <div className="h-full bg-greenink rounded-full" style={{ width: `${pct}%`, transition: "width 0.4s" }} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Subject grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Subjects</h2>
          <Link to="/roadmap" className="font-hand text-lg text-brown hover:text-ink flex items-center gap-1">
            suggested order <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((sub, i) => (
            <SubjectCard
              key={sub.id}
              subject={sub}
              index={i}
              completed={completed}
              subjectProgress={subjectProgress}
            />
          ))}
        </div>
      </section>
    </div>
  );
}