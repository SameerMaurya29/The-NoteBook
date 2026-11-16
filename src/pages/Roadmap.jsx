import { Link } from "react-router-dom";
import { subjects } from "@/content/generated/catalog";
import { useProgress } from "@/lib/progress";
import { Check } from "lucide-react";
import RoadmapProgressTracker from "@/components/RoadmapProgressTracker";

/**
 * A suggested learning order across subjects — the "spine" of the archive.
 * Ordered from foundations to advanced, with reasoning for each step.
 * Only valid subject/topic IDs are referenced so every link resolves.
 */
import { ROADMAP } from "@/content/roadmap";

const accentStyles = {
  green: { node: "border-greenink bg-greenink/10 text-green-ink", line: "bg-greenink/30" },
  brown: { node: "border-brown bg-paper-2 text-brown", line: "bg-brown/30" },
  orange: { node: "border-orangeink bg-orangeink/10 text-orange-ink", line: "bg-orangeink/30" }
};

export default function Roadmap() {
  const { isDone } = useProgress();
  const subjName = (id) => subjects.find((s) => s.id === id)?.name || id;

  return (
    <div className="animate-page-turn space-y-8">
      <header className="double-rule pt-4">
        <p className="font-hand text-2xl text-brown">the spine of the archive</p>
        <h1 className="text-4xl font-semibold text-ink">Learning roadmap</h1>
        <p className="text-brown mt-2 max-w-xl">
          A suggested order — foundations first, theory in the middle, applied last. Follow the phases
          or jump around; every topic stands alone. Phase counts track the named lesson milestones below—not completion of whole subjects. The subject tracker above covers full syllabuses.
        </p>
      </header>

      <RoadmapProgressTracker />

      <div className="space-y-10">
        {ROADMAP.map((phase) => {
          const a = accentStyles[phase.accent];
          const [label, ...rest] = phase.phase.split("—");
          const title = rest.join("—").trim();
          const milestones = phase.items.filter((it) => it.topic);
          const doneCount = milestones.filter((it) => isDone(`${it.subjectId}:${it.topic}`)).length;

          return (
            <section key={phase.phase}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h2 className="text-xl font-semibold text-ink flex items-center gap-2.5">
                  <span className={`stamp ${a.node}`}>{label.trim()}</span>
                  <span>{title}</span>
                </h2>
                <span className="font-hand text-lg text-brown">
                  {doneCount} / {milestones.length} milestones
                </span>
              </div>

              <div className="relative">
                {/* vertical spine */}
                <span className={`absolute left-[10px] top-2 bottom-2 w-px ${a.line}`} />
                <div className="space-y-3">
                  {phase.items.map((item, i) => {
                    const topicDone = item.topic && isDone(`${item.subjectId}:${item.topic}`);
                    const to = item.topic
                      ? `/subject/${item.subjectId}/${item.topic}`
                      : `/subject/${item.subjectId}`;
                    return (
                      <div key={i} className="flex gap-3 relative">
                        <span
                          className={`relative z-10 shrink-0 mt-3 flex items-center justify-center w-5 h-5 rounded-full border-2 text-[10px] font-mono ${
                            topicDone ? "border-greenink bg-greenink text-paper" : a.node
                          }`}
                        >
                          {topicDone ? <Check size={11} /> : i + 1}
                        </span>
                        <Link
                          to={to}
                          className="flex-1 bg-paper-2/40 border border-brown rounded-sm p-4 hover:bg-paper-2 hover:-translate-y-0.5 transition-all group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="text-ink font-medium group-hover:text-brown">
                                {subjName(item.subjectId)}
                              </span>
                              {item.topic && (
                                <span className="text-brown text-sm ml-1">→ {item.focus}</span>
                              )}
                            </div>
                            {topicDone && (
                              <span className="font-hand text-green-ink text-lg shrink-0">done ✓</span>
                            )}
                          </div>
                          <p className="text-sm text-brown mt-1">{item.note}</p>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}