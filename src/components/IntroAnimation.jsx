import NotebookLogo from "@/components/NotebookLogo";

const FEATURES = [
  "Handwritten notes",
  "Reference code examples",
  "Step-through algorithms",
  "Quizzes",
  "Big-O codex",
  "Progress saved locally"
];

// Navigation must not depend on animation frame delivery in background/app windows.
export default function IntroAnimation({ onComplete }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center paper-grain px-6 text-center">
      <div className="text-brown">
        <NotebookLogo className="w-20 h-20" />
      </div>
      <h1 className="mt-6 text-4xl md:text-6xl font-heading text-ink leading-tight">The Notebook</h1>
      <p className="mt-3 font-hand text-2xl text-brown">a senior dev's study archive</p>

      <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-xl">
        {FEATURES.map((c) => (
          <span key={c} className="px-3 py-1.5 rounded-full bg-paper-2 border border-brown/40 text-sm text-brown">
            {c}
          </span>
        ))}
      </div>

      <p className="mt-8 max-w-md text-brown text-sm leading-relaxed">
        <span className="font-hand text-lg text-ink">why?</span> — learn the <em>why</em> and the <em>how</em>, not just the syntax.
        Every subject opens with the basics: where you use it, how the braces &amp; commas work, and the mistakes that bite beginners.
      </p>

      <button
       
        onClick={() => onComplete?.()}
        className="mt-10 px-8 py-3 rounded-md bg-greenink/15 border border-greenink/50 text-green-ink font-medium hover:bg-greenink/25 transition-colors"
      >
        Open the notebook →
      </button>
    </div>
  );
}