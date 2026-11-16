import { useState, useEffect, useMemo } from "react";
import { ExternalLink, Search, Loader2, RefreshCw, Database } from "lucide-react";
import { COMPANY_PROBLEMS } from "@/content/dsa/companyProblems";
import { COMPANY_TOTALS } from "@/content/dsa/companyTotals";
import { fetchFullList, getCachedFullList } from "@/lib/companyFullList";

import { createLatestRequest } from "@/lib/latestRequest";

const diffColor = {
  easy: "text-green-ink",
  medium: "text-orange-ink",
  hard: "text-destructive"
};

export default function CompanyBank() {
  const all = COMPANY_PROBLEMS;
  const withQs = all.filter(
    (c) => (COMPANY_TOTALS[c.company] ?? 0) > 0 || c.questions.length > 0
  );
  const totalAll = withQs.reduce((s, c) => s + (COMPANY_TOTALS[c.company] ?? 0), 0);

  const [active, setActive] = useState(withQs[0]?.company || "");
  const [query, setQuery] = useState("");
  const current = all.find((c) => c.company === active) || withQs[0];
  const total = current ? COMPANY_TOTALS[current.company] ?? 0 : 0;
  const preview = current?.questions || [];
  const filtered = withQs.filter((c) =>
    c.company.toLowerCase().includes(query.trim().toLowerCase())
  );


  return (
    <section className="space-y-5">
      <p className="text-sm text-brown">
        {totalAll.toLocaleString()} bundled company–problem occurrences across {withQs.length} companies, not unique problems.
        Static totals and previews have an unknown source snapshot date (inventoried 12 November 2026).
        Each preview contains {"up to 30"} bundled rows; some companies have none.
        Load a source snapshot on demand from the{" "}
        <a href="https://github.com/liquidslr/leetcode-company-wise-problems" target="_blank" rel="noreferrer" className="underline text-ink">liquidslr/leetcode-company-wise-problems</a>{" "}
        repository. Upstream data can change and is not a guarantee of complete company history.

      </p>

      {/* Company selector */}
      <div className="space-y-3">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brown" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter companies…"
            className="w-full pl-8 pr-3 py-1.5 bg-paper-2 border border-brown rounded-sm text-sm text-ink placeholder:text-brown/60 focus:border-orangeink focus:ring-2 focus:ring-orangeink/30 outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filtered.map((c) => {
            const on = c.company === current?.company;
            const t = COMPANY_TOTALS[c.company] ?? 0;
            return (
              <button
                key={c.company}
                type="button"
                onClick={() => setActive(c.company)}
                className={`px-2.5 py-1 rounded-sm text-sm border transition-colors ${
                  on
                    ? "bg-greenink/20 border-greenink text-ink font-medium"
                    : "bg-paper-2 border-brown/40 text-brown hover:text-ink hover:border-brown"
                }`}
              >
                {c.company} <span className="font-mono-code text-xs text-brown/70">{t}</span>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-sm text-brown">No companies match "{query}".</p>
          )}
        </div>
      </div>

      {current && <CompanyPanel key={current.company} current={current} total={total} preview={preview} />}

    </section>
  );
}

function CompanyPanel({ current, total, preview }) {
  const [full, setFull] = useState(() => getCachedFullList(current.company));
  const [status, setStatus] = useState(full ? "loaded" : "idle");
  const [err, setErr] = useState("");
  const displayed = full?.questions || preview;
  const request = useMemo(() => createLatestRequest(), []);
  useEffect(() => () => request.cancel(), [request]);
  const loadList = (force = false) => {
    setStatus("loading"); setErr("");
    request.run(
      (signal) => fetchFullList(current.company, { force, signal }),
      (result) => { setFull(result); setStatus("loaded"); },
      (error) => { setStatus("error"); setErr(error.message || "Failed to load"); }
    );
  };
  const load = () => loadList();
  const reload = () => loadList(true);

  return (

        <div className="bg-paper-2/40 border border-brown/40 rounded-sm p-4 page-lift">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brown/30 pb-2 mb-3">
            <h3 className="text-xl font-semibold text-ink">{current.company}</h3>
            <span className="font-mono-code text-xs text-brown">
              {full ? `${full.questions.length} loaded` : `${preview.length} preview`} · {total.toLocaleString()} bundled source total (date unknown)
            </span>
          </div>

          {/* Load / cache controls */}
          {total > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
              {status === "loaded" ? (
                <>
                  <button
                    type="button"
                    onClick={reload}
                    className="inline-flex items-center gap-1 text-brown hover:text-ink text-xs"
                  >
                    <RefreshCw size={12} /> reload
                  </button>
                </>
              ) : status === "loading" ? (
                <span className="inline-flex items-center gap-1.5 text-brown">
                  <Loader2 size={14} className="animate-spin" /> fetching source snapshot…
                </span>
              ) : (
                <button
                  type="button"
                  onClick={load}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-greenink/15 border border-greenink/40 text-green-ink hover:bg-greenink/25 text-sm"
                >
                  <Database size={14} /> Load source snapshot
                </button>
              )}
              {full && (
                  <span className="inline-flex items-center gap-1.5 text-green-ink font-mono-code text-xs">
                    <Database size={13} /> {full?.stale ? "saved snapshot — stale (over 30 days)" : full?.persisted ? "saved in this browser" : "session only — could not save offline"}
                  </span>
              )}
              {full && <span className="text-xs text-brown">Fetched {new Date(full.ts).toLocaleString()} · {full.source === "cache" ? "browser cache" : "network snapshot"}</span>}
              {status === "error" && (
                <span className="text-destructive text-xs">
                  {err} —{" "}
                  <button onClick={load} className="underline">
                    retry
                  </button>
                </span>
              )}
            </div>
          )}

          <ol className="space-y-2">
            {displayed.map((q, i) => (
              <li key={i} className="flex items-baseline justify-between gap-3 text-sm">
                <a
                  href={q.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink hover:text-orangeink underline decoration-brown/30 hover:decoration-orangeink underline-offset-2 flex items-baseline gap-1.5"
                >
                  <span className="text-brown font-mono-code mr-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {q.title}
                  <ExternalLink size={12} className="inline-block text-brown/60" />
                </a>
                <span className="flex items-center gap-2 shrink-0">
                  {q.topics && <span className="hidden sm:inline text-brown text-xs">{q.topics}</span>}
                  <span className={`font-mono-code text-xs uppercase ${diffColor[q.difficulty] || ""}`}>
                    {q.difficulty}
                  </span>
                </span>
              </li>
            ))}
            {displayed.length === 0 && (
              <li className="text-sm text-brown">
                No bundled preview — load a source snapshot to see available rows.
              </li>
            )}
          </ol>
        </div>

  );
}
