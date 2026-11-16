import { useState } from "react";
import { Printer } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import { SHEETS } from "@/content/cheatsheets";

export default function Cheatsheets() {
  const [active, setActive] = useState("java");
  const sheet = SHEETS[active];

  return (
    <div className="animate-page-turn space-y-6">
      <header className="double-rule pt-4">
        <p className="font-hand text-2xl text-brown">tear-out pages</p>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-semibold text-ink">Cheatsheets</h1>
            <p className="text-brown mt-1">Quick-reference summaries. Print-friendly; longer sheets span multiple pages.</p>
          </div>
          <button onClick={() => window.print()} className="no-print flex items-center gap-2 px-4 py-2 border border-brown rounded-sm text-brown hover:text-ink hover:bg-paper-2 min-h-[44px]">
            <Printer size={16} /> Print
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 no-print">
        {Object.entries(SHEETS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 rounded-sm border text-sm transition-colors min-h-[40px] ${
              active === key ? "border-greenink bg-greenink/10 text-ink" : "border-brown bg-paper text-brown hover:bg-paper-2"
            }`}
          >
            {val.name}
          </button>
        ))}
      </div>

      <div className="bg-paper-2/40 border border-brown rounded-sm p-6">
        <h2 className="text-2xl font-semibold text-ink mb-4">{sheet.name} — quick reference</h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
          {sheet.sections.map((sec) => (
            <div key={sec.title}>
              <h3 className="text-brown font-medium mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-orangeink rounded-full" /> {sec.title}
              </h3>
              <CodeBlock code={sec.code} lang={active} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}