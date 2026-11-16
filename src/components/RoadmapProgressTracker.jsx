import { subjects } from "@/content/generated/catalog";
import { useProgress } from "@/lib/progress";
import SubjectIcon from "@/components/SubjectIcon";

/**
 * At-a-glance completion tracker — one small square per topic per subject,
 * filled (green) when the topic is ticked off. Handwritten labels and a
 * "done ✓" stamp for fully-finished subjects.
 */
export default function RoadmapProgressTracker() {
  const { completed } = useProgress();

  return (
    <section className="bg-paper-2/50 border border-brown rounded-md p-5 page-lift">
      <div className="mb-4">
        <p className="font-hand text-2xl text-brown">your progress at a glance</p>
        <p className="text-sm text-brown/80">
          each square is a topic — fill it by ticking the note done. watch the shelf fill up.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((sub) => {
          const done = sub.topics.filter((t) => completed[`${sub.id}:${t.id}`]).length;
          const total = sub.topics.length;
          const pct = total ? (done / total) * 100 : 0;
          const allDone = done > 0 && done === total;

          return (
            <div key={sub.id} className="bg-paper border border-brown/40 rounded-sm p-4">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-9 h-9 rounded-sm border border-brown/40 bg-paper-2 text-brown">
                  <SubjectIcon id={sub.id} className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-ink text-sm truncate">{sub.name}</h3>
                  <p className="font-hand text-base text-brown leading-none mt-0.5">
                    {done} / {total} done
                  </p>
                </div>
                {allDone && <span className="hand-stamp">done ✓</span>}
              </div>

              {/* one square per topic */}
              <div className="mt-3 flex flex-wrap gap-1">
                {sub.topics.map((t) => {
                  const isDone = completed[`${sub.id}:${t.id}`];
                  return (
                    <span
                      key={t.id}
                      title={t.title}
                      className={`w-2.5 h-2.5 rounded-sm ${
                        isDone ? "bg-greenink" : "bg-paper-2 border border-brown/30"
                      }`}
                    />
                  );
                })}
              </div>

              <div className="mt-3 h-1.5 bg-paper-2 rounded-full overflow-hidden border border-brown/20">
                <div
                  className="h-full bg-greenink rounded-full"
                  style={{ width: `${pct}%`, transition: "width 0.4s" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}