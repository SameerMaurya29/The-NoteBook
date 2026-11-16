import SubjectResourceLink from "@/components/SubjectResourceLink";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getSubject } from "@/content/generated/catalog";
import { useProgress, useQuizHistory } from "@/lib/progress";
import TopicTree from "@/components/TopicTree";
import ProgressRing from "@/components/ProgressRing";
import SubjectIcon from "@/components/SubjectIcon";

export default function Subject() {
  const { id } = useParams();
  const subject = getSubject(id);
  const { completed } = useProgress();
  const { subjectAccuracy } = useQuizHistory();

  if (!subject) {
    return (
      <div className="text-center py-20">
        <p className="font-hand text-2xl text-brown">no such subject</p>
        <Link to="/" className="text-brown hover:text-ink underline">back home</Link>
      </div>
    );
  }

  const done = subject.topics.filter((t) => completed[`${subject.id}:${t.id}`]).length;
  const pct = subject.topics.length ? (done / subject.topics.length) * 100 : 0;
  const acc = subjectAccuracy(subject.id);

  return (
    <div className="animate-page-turn space-y-8">
      <Link to="/" className="inline-flex items-center gap-1 text-brown hover:text-ink text-sm">
        <ArrowLeft size={15} /> all subjects
      </Link>

      <header className="double-rule pt-4">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <SubjectIcon id={subject.id} className="w-16 h-16 text-brown" />
            <h1 className="text-4xl font-semibold text-ink mt-2">{subject.name}</h1>
            <p className="text-brown mt-2 max-w-xl">{subject.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {subject.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 bg-paper-2 border border-brown/40 rounded-sm text-brown">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <ProgressRing value={pct} size={72} label="done" />
            </div>
            {acc && (
              <div className="text-center">
                <div className="font-mono-code text-2xl text-greenink">{acc.pct}%</div>
                <p className="font-hand text-base text-brown">quiz accuracy</p>
                <p className="text-xs text-brown">{acc.runs} run{acc.runs !== 1 ? "s" : ""}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {id === "systemdesign" && <div className="border border-brown/30 p-4 bg-paper-2/40"><Link className="underline" to="/system-design">Open the complete grouped syllabus, paper guides & printable notebook →</Link></div>}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Syllabus</h2>
          <Link to={`/quiz?subject=${subject.id}`} className="font-hand text-lg text-brown hover:text-ink">
            take a quiz →
          </Link>
        </div>
        <div className="bg-paper-2/40 border border-brown rounded-sm p-5">
          <TopicTree subjectId={subject.id} topics={subject.topics} completed={completed} />
        </div>
      </section>
      <SubjectResourceLink subject={subject.id}/>
    </div>
  );
}