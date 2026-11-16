import SubjectResourceLink from "@/components/SubjectResourceLink";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Code2, ListChecks, Building2, ArrowRight } from "lucide-react";
import MultiCodeBlock from "@/components/MultiCodeBlock";
import { ALGORITHMS } from "@/content/dsa/algorithms";
import { DSA_SHEETS, DSA_SHEET_TOTAL } from "@/content/dsa/sheets";
import CompanyBank from "@/components/CompanyBank";
import SheetCard from "@/components/SheetCard";
import { useSheetProgress } from "@/lib/progress";

const TABS = [
  { id: "algorithms", label: "Algorithm Hub", icon: Code2 },
  { id: "sheets", label: "DSA Sheets", icon: ListChecks },
  { id: "companies", label: "Company Bank", icon: Building2 }
];

const catColor = {
  sorting: "text-orange-ink border-orangeink",
  searching: "text-green-ink border-greenink",
  graph: "text-orange-ink border-orangeink",
  "dynamic programming": "text-brown border-brown",
  hashing: "text-green-ink border-greenink"
};

const diffColor = {
  easy: "text-green-ink",
  medium: "text-orange-ink",
  hard: "text-destructive"
};

export default function DSAHub() {
  const [tab, setTab] = useState("algorithms");

  return (
    <div className="animate-page-turn space-y-8">
      <header className="double-rule pt-4">
        <p className="font-hand text-2xl text-brown">the interview workbench</p>
        <h1 className="text-4xl font-semibold text-ink">DSA Hub</h1>
        <p className="text-brown mt-2 max-w-2xl">
          Algorithm templates in C++ &amp; Java with step-by-step dry runs, a curated practice sheet across data structures, and a company-wise question bank — everything in one place.
        </p>
      </header>

      <SubjectResourceLink subject="dsa"/>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-brown/40">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${
                active ? "border-orangeink text-ink font-medium" : "border-transparent text-brown hover:text-ink"
              }`}
            >
              <Icon size={15} />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "algorithms" && <AlgorithmHub />}
      {tab === "sheets" && <SheetsView />}
      {tab === "companies" && <CompanyBank />}

      <div className="pt-2">
        <Link to="/dsa" className="font-hand text-lg text-brown hover:text-ink flex items-center gap-1">
          back to the visualizers <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function AlgorithmHub() {
  return (
    <section className="space-y-6">
      <p className="text-sm text-brown">
        {ALGORITHMS.length} popular algorithms — toggle between C++ and Java, and follow the dry run step by step.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ALGORITHMS.map((alg) => (
          <article key={alg.id} className="bg-paper-2/40 border border-brown/40 rounded-sm p-4 page-lift">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-ink">{alg.name}</h3>
                <p className="text-sm text-brown mt-0.5">{alg.blurb}</p>
              </div>
              <span className={`stamp shrink-0 ${catColor[alg.category] || "text-brown border-brown"}`}>{alg.category}</span>
            </div>
            <p className="mt-2 font-mono-code text-xs text-brown">
              time {alg.time} · space {alg.space}
            </p>
            <MultiCodeBlock codes={alg.code} dryRun={alg.dryRun} />
          </article>
        ))}
      </div>
    </section>
  );
}

function SheetsView() {
  const { total } = useSheetProgress();
  return (
    <section className="space-y-6">
      <p className="text-sm text-brown">
        {DSA_SHEET_TOTAL} question placements (426 distinct titles) across {DSA_SHEETS.length} topics — tick off what you've solved. {total} solved so far.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DSA_SHEETS.map((sheet) => (
          <SheetCard key={sheet.category} sheet={sheet} />
        ))}
      </div>
    </section>
  );
}