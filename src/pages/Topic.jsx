import {getBuildContext} from "@/lib/buildNavigation";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSubject } from "@/lib/useSubject";
import { useProgress, useQuizHistory } from "@/lib/progress";
import NotePage from "@/components/NotePage";
import ComplexityCalculator from "@/components/ComplexityCalculator";
import { useRememberLesson } from "@/components/LessonTools";

export default function Topic() {
  const { id, topicId } = useParams();
  const [params] = useSearchParams();
  const context = getBuildContext(params);
  const buildBack = context && <Link replace className="inline-flex underline py-2 no-print" to={context.to}>← Back to OS build · {context.title}</Link>;
  const {subject, loading, error} = useSubject(id);
  const topic = subject?.topics.find(t=>t.id===topicId);
  const { isDone, toggle } = useProgress();
  const topicKey = `${id}:${topicId}`;
  const { record } = useQuizHistory();
  useRememberLesson(topic ? id : null, topic ? topic.id : null);

  if (loading) return <div>{buildBack}<p role="status">Opening lesson…</p></div>;
  if (error) return <div>{buildBack}<p role="alert">{error} <button className="underline" onClick={()=>location.reload()}>Retry</button></p></div>;
  if (!subject || !topic) {
    return (
      <div className="text-center py-20">
        <p className="font-hand text-2xl text-brown">this page is blank</p>
        {context ? buildBack : <Link to="/" className="text-brown hover:text-ink underline">back home</Link>}
      </div>
    );
  }

  const idx = subject.topics.findIndex((t) => t.id === topic.id);
  const next = subject.topics[idx + 1];
  const prev = subject.topics[idx - 1];

  const handleMCQ = (correct) => {
    record({ id: crypto.randomUUID(), subjectId: subject.id, topicId: topic.id, correct: correct ? 1 : 0, total: 1, mode: "inline" });
  };

  return (
    <div className="space-y-8">
      {context && <p className="text-sm text-brown no-print">Build an OS / Unit {context.number} · {context.title} / {subject.name} reference</p>}
      <div className="flex flex-wrap items-start justify-between gap-4">
        {context ? buildBack : <Link to={`/subject/${subject.id}`} className="inline-flex items-center gap-1 text-brown hover:text-ink text-sm">
          <ArrowLeft size={15} /> syllabus
        </Link>}
        {!context && <div className="flex gap-2">
          {prev && (
            <Link to={`/subject/${subject.id}/${prev.id}`} className="inline-flex items-center gap-1 text-brown hover:text-ink text-sm">
              <ArrowLeft size={14} /> {prev.title}
            </Link>
          )}
          {next && (
            <Link to={`/subject/${subject.id}/${next.id}`} className="inline-flex items-center gap-1 text-brown hover:text-ink text-sm">
              {next.title} <ArrowRight size={14} />
            </Link>
          )}
        </div>}
      </div>

      <div className="flex flex-wrap gap-4 no-print"><button className="underline py-2" onClick={()=>window.print()}>Print lesson / Save as PDF</button>{!context && id === "systemdesign" && <Link className="underline py-2" to="/system-design">Full System Design syllabus</Link>}</div>
      <NotePage
        key={topicKey}
        subject={subject}
        topic={topic}
        completed={isDone(topicKey)}
        onToggleDone={() => toggle(topicKey)}
        onMCQAnswered={handleMCQ}
        returnTo={context?.to}
        returnLabel={context ? "OS build · " + context.title : undefined}
      />

      {!context && subject.id === "dsa" && (
        <div className="pt-2">
          <ComplexityCalculator />
        </div>
      )}
    </div>
  );
}