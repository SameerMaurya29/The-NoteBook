// Aptitude & Logical Reasoning — why & how basics.
export default {
  id: "aptitude-basics",
  title: "Aptitude Basics — Why & How",
  difficulty: "easy",
  definition: `Aptitude tests measure your ability to reason with numbers, patterns, and language under time pressure. They're the first filter in most Online Assessment (OA) rounds — companies use them to thin the crowd before any coding round. You don't need advanced math; you need speed, accuracy, and pattern recognition built from a small set of recurring question types.`,
  coreUnderstanding: `Aptitude isn't about being "smart" — it's about recognizing a small number of question templates and applying a rehearsed method fast. The three pillars are Quantitative (numbers: speed, work, probability, profit), Logical (patterns: puzzles, relations, arrangements, coding-decoding), and Verbal (language: grammar, comprehension). Each has maybe 10-15 recurring question types. The skill is pattern->method: see the type, apply the formula or logic, skip what's slow, and never spend more than ~90 seconds on a single question in a test. Practice builds the recognition; timing builds the speed.`,
  howItWorks: `1. QUANT: memorize the core formulas (speed=distance/time, work=1/time, nPr, nCr, compound interest). Most questions are one formula plus one algebra step.
2. LOGICAL: learn the diagram for each type — a family tree for blood relations, a grid for seating, a substitution table for coding-decoding. Draw it; don't hold it in your head.
3. VERBAL: skim the passage first for structure (topic sentence, evidence, conclusion), then answer. For grammar, learn the ~15 common error types (subject-verb agreement, tense, articles, parallelism).
4. TIME: attempt easy types first, mark-and-move on hard ones. A 60-minute test with 50 questions rewards skipping — 1 mark per question, same penalty for wrong, so maximize attempted-and-correct.
5. ACCURACY: careless arithmetic errors cost more than skipped questions. Estimate, then compute only if needed.
6. PATTERN RECOGNITION: after ~100 practice questions per type, you'll see the type within 5 seconds. That's the goal.
7. OA FORMAT: most OAs mix quant + logical + verbal in one timed section, sometimes with negative marking. Read the instructions for marking scheme before starting.`,
  codeExamples: [
    {
      lang: "text",
      code: `# A typical OA time budget (60 min, 50 questions)
Easy types first (series, coding-decoding, simple quant): ~25 q in 20 min
Medium (puzzles, seating, probability): ~15 q in 25 min
Hard (long RC, tricky P&C): ~10 q in 15 min, attempt what you can
Rule: never cross 90s on one question — mark, move, return.

# The 3 pillars and their recurring types
Quant: speed-time-distance, work-time, percentages, profit-loss,
       simple/compound interest, ratio-proportion, averages,
       permutations, combinations, probability
Logical: number/letter series, blood relations, seating arrangements,
         coding-decoding, syllogisms, direction sense, puzzles
Verbal: grammar (error spotting, sentence correction), vocabulary
        (synonyms/antonyms), reading comprehension, sentence completion`,
      output: `(study plan)`,
      note: "Aptitude is pattern->method under time pressure. Memorize formulas for quant, draw diagrams for logical, skim-then-answer for verbal. Budget time: easy first, skip past 90s, maximize correct attempts."
    }
  ],
  marginNotes: [
    "Aptitude rewards SPEED + PATTERN RECOGNITION, not deep knowledge. After ~100 practice questions per type, you'll recognize the type in 5 seconds — that's the real goal.",
    "Never spend more than ~90 seconds on one question in a test. Mark it, move on, return if time allows. One careless 3-minute question can cost you 4 easy ones.",
    "Draw the diagram: a family tree for blood relations, a grid for seating, a table for coding-decoding. Holding these in your head is the #1 reason people get logical questions wrong.",
    "Read the OA instructions FIRST — check the marking scheme (is there negative marking?) and the section time limits before you start."
  ],
  commonMistakes: [
    "Spending 3+ minutes on one hard question and missing 4 easy ones — skip and return.",
    "Trying to solve logical reasoning 'in your head' instead of drawing the family tree / seating grid.",
    "Not memorizing the basic formulas — you lose 10-15 seconds per question deriving what should be instant."
  ],
  relatedTopics: ["Speed, Time & Work", "Permutations & Combinations", "Blood Relations", "Reading Comprehension"],
  externalLinks: [
    { label: "IndiaBix (practice)", url: "https://www.indiabix.com/" },
    { label: "GeeksforGeeks Aptitude", url: "https://www.geeksforgeeks.org/aptitude-questions-and-answers/" }
  ],
  mcqs: [
    {
      question: "What is the main skill aptitude tests measure?",
      options: ["Advanced mathematics", "Pattern recognition and speed under time pressure", "Memory of facts", "Programming ability"],
      answer: 1,
      explanations: ["No — it's basic math applied fast.", "Correct — aptitude tests reward recognizing a small set of recurring question types and applying a rehearsed method quickly. Deep knowledge isn't needed; speed and accuracy are.", "It's not a memory test.", "That's the coding round, not aptitude."],
      difficulty: "easy"
    },
    {
      question: "What should you do when a question takes more than ~90 seconds?",
      options: ["Keep going until it's solved", "Mark it, move on, and return if time allows", "Guess randomly immediately", "Skip the whole section"],
      answer: 1,
      explanations: ["That wastes time you need for easy questions.", "Correct — mark and move. One 3-minute question can cost 4 easy ones; maximize correct attempts by doing easy types first and returning to hard ones.", "Random guessing risks negative marking.", "Don't skip the whole section."],
      difficulty: "easy"
    },
    {
      question: "Why draw a diagram for logical reasoning questions?",
      options: ["It looks neat", "Holding relations/arrangements in your head is the #1 cause of errors — a tree/grid makes it reliable", "It's required", "It saves paper"],
      answer: 1,
      explanations: ["Neatness is irrelevant.", "Correct — a family tree (blood relations) or grid (seating) externalizes the structure so you don't lose track. Mental solving is the top reason logical questions go wrong.", "It's not required but it's essential.", "Paper isn't the point."],
      difficulty: "medium"
    }
  ]
};