import LessonDiagram from "./LessonDiagram";
import InlineCode from "./InlineCode";
import CodeBlock from "./CodeBlock";
import MultiCodeBlock from "./MultiCodeBlock";
import MarginNote from "./MarginNote";
import MCQBlock from "./MCQBlock";
import ProgressRing from "./ProgressRing";
import PracticeBlock from "./PracticeBlock";
import DSAPractice from "./DSAPractice";
import { BookmarkButton, LessonNote } from "./LessonTools";
import { Link } from "react-router-dom";
import { Check, ExternalLink, BookOpen } from "lucide-react";

/**
 * NotePage — renders a single Topic through the standard structure:
 * Definition → Core Understanding → How It Works → Code → Margin Notes →
 * Common Mistakes → Related → External Docs → MCQs.
 *
 * Reading content uses a serif (Spectral) with a comfortable measure so dense
 * paragraphs read like a printed book instead of one tall ruled block.
 */
export default function NotePage({ subject, topic, completed, onToggleDone, onMCQAnswered, readOnly = false, returnTo = "", returnLabel = "" }) {
  if (topic.draft) {
    return (
      <article className="animate-page-turn min-w-0 max-w-full">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-sm text-brown mb-1">
            {returnTo ? <span>{subject.name} reference</span> : <Link to={`/subject/${subject.id}`} className="hover:text-ink">{subject.name}</Link>}
            <span>/</span>
            <span className="font-hand text-lg">{topic.title}</span>
          </div>
          <div className="double-rule pt-3">
            <h1 className="text-3xl md:text-4xl font-semibold">{topic.title}</h1>
            <span className={`stamp mt-2 inline-block ${topic.difficulty === "hard" ? "text-orange-ink" : topic.difficulty === "medium" ? "text-brown" : "text-green-ink"}`}>{topic.difficulty}</span>
          </div>
        </header>
        <div className="bg-paper-2/50 border-l-4 border-orangeink rounded-sm px-4 py-3">
          <p className="font-reading text-lg text-ink leading-7 measure"><InlineCode>{topic.definition}</InlineCode></p>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center text-center py-12 border-2 border-dashed border-brown/40 rounded-sm">
          <p className="font-hand text-3xl text-brown">notes in progress ✎</p>
          <p className="text-brown mt-2 max-w-sm">The full breakdown — code, margin notes, and practice questions — is being written for this topic. Check back soon, or explore the topics already complete.</p>
          <Link to={returnTo || `/subject/${subject.id}`} className="mt-4 text-brown hover:text-ink underline underline-offset-2 text-sm">← back to {returnLabel || `${subject.name} syllabus`}</Link>
        </div>
      </article>
    );
  }
  return (
    <article className="animate-page-turn min-w-0 max-w-full">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-2 text-sm text-brown mb-1">
          {returnTo ? <span>{subject.name} reference</span> : <Link to={`/subject/${subject.id}`} className="hover:text-ink">{subject.name}</Link>}
          <span>/</span>
          <span className="font-hand text-lg">{topic.title}</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 double-rule pt-3">
          <h1 className="text-3xl md:text-4xl font-semibold">{topic.title}</h1>
          <div className="flex items-center gap-3 shrink-0">
            <span className={`stamp ${topic.difficulty === "hard" ? "text-orange-ink" : topic.difficulty === "medium" ? "text-brown" : "text-green-ink"}`}>{topic.difficulty}</span>
            {!readOnly && <BookmarkButton topicKey={`${subject.id}:${topic.id}`} />}
            <button
              disabled={readOnly}
              onClick={() => onToggleDone?.(topic.id)}
              className={`no-print flex items-center gap-1 px-3 py-1.5 rounded-sm border text-sm transition-colors min-h-[36px] ${
                completed ? "border-greenink bg-greenink/15 text-green-ink" : "border-brown bg-paper hover:bg-paper-2 text-brown"
              }`}
            >
              <Check size={14} />
              {completed ? "Completed" : "Mark done"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Center ink column */}
        <div className="min-w-0 w-full lg:w-[65%] space-y-8">
          <Section title="Definition" eyebrow="what it is" accent="green">
            <div className="bg-paper-2/50 border-l-4 border-greenink rounded-sm px-4 py-3">
              <p className="font-reading text-lg text-ink leading-7 measure"><InlineCode>{topic.definition}</InlineCode></p>
            </div>
          </Section>

          <Section title="Core Understanding" eyebrow="why it exists">
            <p className="font-reading text-ink leading-7 measure drop-cap"><InlineCode>{topic.coreUnderstanding}</InlineCode></p>
          </Section>

          <Section title="How It Works" eyebrow="the mechanics">
            <StepList text={topic.howItWorks} />
          </Section>

          <LessonDiagram subjectId={subject.id} topicId={topic.id} />

          <Section title="Code" eyebrow="worked examples" accent="green">
            {topic.codeExamples.map((ex, i) =>
              ex.variants ? (
                <MultiCodeBlock key={i} codes={ex.variants} output={ex.output} note={ex.note} />
              ) : (
                <CodeBlock key={i} {...ex} />
              )
            )}
            {!readOnly && <PracticeBlock topic={topic} />}
          </Section>

          <Section title="Common Mistakes" eyebrow="don't trip here" accent="orange">
            <ul className="space-y-1.5">
              {topic.commonMistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-ink leading-7">
                  <span className="text-orange-ink mt-1 shrink-0">✕</span>
                  <span><InlineCode>{m}</InlineCode></span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Related Topics" eyebrow="where to go next">
            <div className="flex flex-wrap gap-2">
              {topic.relatedTopics.map((r, i) => (
                <span key={i} className="px-3 py-1 bg-paper-2 border border-brown rounded-sm text-sm text-brown"><InlineCode>{r}</InlineCode></span>
              ))}
            </div>
          </Section>

          <Section title="External Docs" eyebrow="the source of truth">
            <ul className="space-y-1.5">
              {topic.externalLinks.map((l, i) => (
                <li key={i}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brown hover:text-ink underline underline-offset-2">
                    <ExternalLink size={14} /> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          {!readOnly && subject.id === "dsa" && <Section title="Practice problems" eyebrow="solve before moving on" accent="orange"><DSAPractice topicId={topic.id} /></Section>}
          {topic.practice && <Section title="Design practice" eyebrow="produce evidence"><p className="font-reading leading-7">{topic.practice}</p></Section>}
          {!readOnly && <Section title={`Practice — ${topic.mcqs.length} questions`} eyebrow="test yourself" accent="orange">
            <div className="space-y-4">
              {topic.mcqs.map((m, i) => (
                <MCQBlock key={i} mcq={m} index={i} onAnswered={onMCQAnswered} />
              ))}
            </div>
          </Section>}
        </div>

        {/* Right mentor margin */}
        <aside className="min-w-0 w-full break-words lg:w-[30%] lg:sticky lg:top-24 lg:self-start space-y-5">
          <div className="space-y-5">
            <p className="font-hand text-2xl text-brown mb-3">mentor's notes</p>
            {topic.marginNotes.map((n, i) => (
              <MarginNote key={i} index={i} variant={i % 3 === 0 ? "gotcha" : i % 3 === 1 ? "trick" : "note"}>
                {n}
              </MarginNote>
            ))}
          </div>
          {!readOnly && <div className="no-print"><p className="font-hand text-xl text-brown mb-1">my notes</p><LessonNote key={`${subject.id}:${topic.id}`} topicKey={`${subject.id}:${topic.id}`} /></div>}
          {!readOnly && <div className="no-print bg-paper-2/60 border border-brown rounded-sm p-4">
            <div className="flex items-center gap-3">
              <ProgressRing value={completed ? 100 : 0} size={56} />
              <div>
                <p className="font-hand text-xl text-brown">your progress</p>
                <p className="text-sm text-ink">{completed ? "This topic is ticked off." : "Mark it done when you've got it."}</p>
              </div>
            </div>
          </div>}
          {!returnTo && <Link
            to={`/subject/${subject.id}`}
            className="flex items-center gap-2 text-brown hover:text-ink text-sm"
          >
            <BookOpen size={15} /> Back to {subject.name} syllabus
          </Link>}
        </aside>
      </div>
    </article>
  );
}

/** Renders the "how it works" numbered text as a clean step list with badges. */
function StepList({ text }) {
  const steps = text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(\d+)\.\s*(.*)$/);
      return m ? { n: m[1], body: m[2] } : { n: null, body: line };
    });

  return (
    <ol className="space-y-2.5">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full border border-brown/50 bg-paper-2 text-brown font-mono-code text-xs">
            {s.n || i + 1}
          </span>
          <span className="font-reading text-ink leading-7 measure"><InlineCode>{s.body}</InlineCode></span>
        </li>
      ))}
    </ol>
  );
}

function Section({ title, eyebrow, accent = "brown", children }) {
  const accents = {
    brown: { border: "border-brown/40", text: "text-brown", soft: "bg-paper-2/70" },
    green: { border: "border-greenink/40", text: "text-green-ink", soft: "bg-greenink/10" },
    orange: { border: "border-orangeink/40", text: "text-orange-ink", soft: "bg-orangeink/10" }
  };
  const a = accents[accent] || accents.brown;
  return (
    <section className="border-t border-brown/20 pt-7 first:border-t-0 first:pt-0">
      <div className="mb-4">
        <span className={`inline-block font-hand text-lg ${a.text} ${a.soft} border ${a.border} rounded-full px-3 py-0.5`}>
          {eyebrow}
        </span>
        <h2 className={`mt-2 text-xl font-semibold ${a.text} flex items-center gap-3`}>
          <span>{title}</span>
          <span className={`flex-1 h-px border-t ${a.border}`} />
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
}
