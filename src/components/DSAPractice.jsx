import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useSheetProgress } from "@/lib/progress";

const tone = { easy: "text-green-ink", medium: "text-brown", hard: "text-orange-ink" };

/** Curated free LeetCode problems for one DSA topic, easy to hard, with a tick per problem. Links out only. */
export default function DSAPractice({ topicId }) {
  const [list, setList] = useState(null);
  const [failed, setFailed] = useState(false);
  const { done, setKeyDone } = useSheetProgress();
  useEffect(() => {
    let live = true;
    setList(null); setFailed(false);
    import("@/content/dsa/topicPractice").then((m) => { if (live) setList(m.TOPIC_PRACTICE[topicId] || []); }).catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [topicId]);
  if (failed) return <p role="alert" className="text-sm text-brown">Practice list could not load. Reconnect and reload.</p>;
  if (!list) return <p role="status" className="text-sm text-brown">Loading practice problems…</p>;
  if (!list.length) return null;
  const key = (p) => `lc:${p.id}`;
  const count = list.filter((p) => done[key(p)]).length;
  return (
    <div>
      <p className="text-sm text-brown mb-2">{count} / {list.length} solved · ordered easy to hard · free problems only. Solve a few, then move to the next topic.</p>
      <ol className="space-y-1.5">
        {list.map((p) => (
          <li key={p.id} className="flex items-center gap-3 min-h-[36px]">
            <input type="checkbox" className="h-4 w-4 shrink-0 accent-green-800" checked={Boolean(done[key(p)])} onChange={(e) => setKeyDone(key(p), e.target.checked)} aria-label={`Mark ${p.title} solved`} />
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline text-ink hover:text-brown">{p.id}. {p.title} <ExternalLink size={12} /></a>
            <span className={`ml-auto shrink-0 text-xs font-mono-code ${tone[p.difficulty]}`}>{p.difficulty}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-brown">More practice: <a className="underline" href="https://www.hackerrank.com/domains/data-structures" target="_blank" rel="noopener noreferrer">HackerRank Data Structures</a> · <a className="underline" href="https://www.hackerrank.com/domains/algorithms" target="_blank" rel="noopener noreferrer">HackerRank Algorithms</a> (whole tracks, not matched to this topic). External sites; availability is not guaranteed.</p>
    </div>
  );
}
