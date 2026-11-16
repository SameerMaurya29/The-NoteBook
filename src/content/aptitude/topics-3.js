// Aptitude — Verbal Ability topics.
export default [
  {
    id: "grammar-rules",
    title: "Grammar & Error Spotting",
    difficulty: "medium",
    definition: `Grammar questions test the ~15 common error types: subject-verb agreement, tense consistency, articles, prepositions, parallel structure, modifiers, pronouns, and word choice. Error spotting gives a sentence split into parts and asks which part has the error.`,
    coreUnderstanding: `Verbal grammar in OAs is pattern-matching against a fixed set of error types — you don't need to parse grammar trees, you need to know the ~15 things that go wrong. The big three: SUBJECT-VERB AGREEMENT (a singular subject takes a singular verb; "the list of items WAS" not "were" — the subject is "list", not "items"), TENSE CONSISTENCY (don't mix past and present in one clause without reason), and PARALLELISM (items in a list must be the same grammatical form: "reading, writing, and to swim" is wrong — should be "reading, writing, and swimming"). Articles (a/an/the) and prepositions (in/on/at) have small rule sets you can memorize. The method: read the sentence, check each part against the error-type list, find the mismatch.`,
    howItWorks: `1. SUBJECT-VERB AGREEMENT: the verb agrees with the SUBJECT, not the nearest noun. "The box of chocolates IS" (subject = box). Watch "along with", "as well as" — they don't change the subject number.
2. TENSE: keep tenses consistent within a clause. Past for completed actions, present for general truths, present perfect for past-with-present-relevance.
3. PARALLELISM: list items must match in form. "She likes hiking, swimming, and to run" -> "...hiking, swimming, and running".
4. ARTICLES: a/an before consonant/vowel SOUND (an hour, a university). "the" for specific, "a/an" for general/first-mention.
5. PREPOSITIONS: fixed pairs — "dependent on" (not of), "different from" (not than), "superior to" (not than).
6. MODIFIERS: a modifier should sit next to what it describes. "Walking down the street, the trees were beautiful" — wrong (the trees weren't walking).
7. PRONOUNS: a pronoun must clearly refer to one noun. Ambiguous reference ("John told Mike he was late" — who?) is an error.
8. WORD CHOICE: affect (verb, to influence) vs effect (noun, result); its/it's; their/there/they're; fewer (countable) vs less (uncountable).
9. METHOD: read the sentence, scan each underlined part for one of these error types, mark the mismatch.`,
    codeExamples: [
      {
        lang: "text",
        code: `# Subject-verb agreement — the subject is "list", not "items"
"The list of items WAS on the table."   (correct)
"The list of items WERE on the table."  (ERROR: were)

# Parallelism — list items must match form
"She likes hiking, swimming, and running."   (correct)
"She likes hiking, swimming, and to run."    (ERROR: mixed)

# Modifier placement
"Walking home, I saw a beautiful tree."   (correct — I was walking)
"Walking home, the tree was beautiful."   (ERROR — the tree wasn't walking)

# Articles (sound-based)
"an hour" (h is silent -> vowel sound)
"a university" (sounds like 'yoo' -> consonant sound)

# Word choice
"The medicine had no EFFECT."  (noun, result)
"The weather AFFECTS my mood." (verb, to influence)

# Preposition pairs
"dependent ON" (not of), "different FROM" (not than), "superior TO"`,
        output: `(grammar checks)`,
        note: "Scan for the ~15 error types: subject-verb agreement (verb matches the SUBJECT), tense consistency, parallelism (list items same form), articles (a/an by SOUND), preposition pairs, modifier placement, pronoun clarity, word choice (affect/effect)."
      }
    ],
    marginNotes: [
      "The verb agrees with the SUBJECT, not the nearest noun. 'The list of items WAS' — the subject is 'list' (singular), so use 'was', not 'were'.",
      "PARALLELISM: items in a list must be the same grammatical form. 'hiking, swimming, and to run' is wrong — make them all -ing: 'hiking, swimming, and running'.",
      "Articles follow SOUND, not spelling: 'an hour' (silent h, vowel sound), 'a university' (sounds like 'yoo', consonant sound).",
      "Modifier placement: a modifier sits next to what it describes. 'Walking home, the tree was beautiful' is wrong — the tree wasn't walking."
    ],
    commonMistakes: [
      "Making the verb agree with the nearest noun instead of the actual subject ('list of items were' — wrong).",
      "Breaking parallelism in a list ('hiking, swimming, and to run').",
      "Using 'affect'/'effect' or 'its'/'it's' incorrectly — affect is usually a verb, effect a noun; it's = it is."
    ],
    relatedTopics: ["Aptitude Basics", "Reading Comprehension"],
    externalLinks: [
      { label: "Common Grammar Errors (Purdue OWL)", url: "https://owl.purdue.edu/owl/general_writing/mechanics/" }
    ],
    mcqs: [
      {
        question: "Which is correct?",
        options: ["The list of items were on the table", "The list of items was on the table (subject = 'list', singular)", "The list of item was on the table", "The lists of items was on the table"],
        answer: 1,
        explanations: ["'were' disagrees with the singular subject 'list'.", "Correct — the subject is 'list' (singular), so the verb is 'was'. The noun 'items' is part of a prepositional phrase, not the subject.", "'item' should be plural here.", "'lists' is plural — would need 'were'."],
        difficulty: "medium"
      },
      {
        question: "Which sentence has a parallelism error?",
        options: ["She likes hiking, swimming, and running", "She likes hiking, swimming, and to run (mixed forms)", "She likes to hike, to swim, and to run", "She likes hiking, swimming, and jogging"],
        answer: 1,
        explanations: ["All -ing — parallel, correct.", "Correct — this mixes -ing forms with an infinitive ('to run'). All list items must match: 'hiking, swimming, and running'.", "All infinitives — parallel, correct.", "All -ing — correct."],
        difficulty: "medium"
      },
      {
        question: "Which article is correct?",
        options: ["a hour", "an hour (silent h -> vowel sound)", "the hour is always 'a'", "no article"],
        answer: 1,
        explanations: ["'a' before a vowel SOUND — but 'hour' starts with a vowel sound (silent h).", "Correct — articles follow SOUND, not spelling. 'hour' has a silent h, so it starts with a vowel sound -> 'an hour'.", "Sound decides, not a fixed rule.", "An article is needed."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "reading-comprehension",
    title: "Reading Comprehension",
    difficulty: "medium",
    definition: `Reading comprehension gives a passage and questions on its main idea, details, inferences, tone, and vocabulary-in-context. The method: skim for structure first, then read the question, then scan the passage for the specific answer — don't memorize the whole passage.`,
    coreUnderstanding: `RC in OAs is about efficient extraction, not slow reading. The winning approach: (1) skim the passage in ~60-90 seconds to map its STRUCTURE — first sentence of each paragraph (the topic), the last (the point), and any transition words ("however", "therefore"); (2) read the question; (3) SCAN back to the relevant part for the exact answer. Most questions are factual (the answer is literally in the passage) or inferential (one step beyond the text). The traps: answers that are true in the real world but NOT in the passage (stick to the text), and answers that are too extreme ("always", "never") when the passage hedges. Vocabulary-in-context questions ask what a word means as used — substitute each option and see which keeps the sentence's meaning.`,
    howItWorks: `1. SKIM (60-90s): read the FIRST sentence of each paragraph (topic) and the LAST sentence (the point). Note transition words (however, moreover, therefore) — they signal the author's turn.
2. STRUCTURE MAP: introduction -> evidence -> counter-argument -> conclusion. Knowing the shape lets you jump to the right part for each question.
3. QUESTION TYPES: main idea, detail (factual), inference (one step beyond), tone (author's attitude), vocabulary-in-context, title.
4. MAIN IDEA: usually the last sentence of the first paragraph or the whole last paragraph. Eliminate options that are too narrow (a detail) or too broad.
5. DETAIL: scan for a keyword from the question, read 2-3 lines around it. The answer is literally there.
6. INFERENCE: must follow from the text — eliminate anything the passage doesn't support, even if true in reality.
7. TONE: pick from neutral, critical, supportive, humorous, sarcastic. Watch for hedging words ("perhaps", "seems") -> neutral/cautious.
8. VOCAB-IN-CONTEXT: substitute each option into the sentence; the one that keeps the meaning and grammar is correct.
9. TRAPS: 'true but not in the passage' (eliminate), too-extreme absolutes ('always'/'never' when the passage hedges), half-right options (one part wrong).`,
    codeExamples: [
      {
        lang: "text",
        code: `# Skim map (for a 4-paragraph passage)
P1: introduces the topic of urban beekeeping (topic sentence)
P2: evidence — benefits to pollination (first sentence)
P3: "However," — counter: disease risks (transition signals the turn)
P4: conclusion — balanced regulation needed (last sentence = main idea)

# Question: "What is the main idea?"
-> Likely P4's last sentence: balanced regulation of urban beekeeping.
Eliminate: a detail from P2 (too narrow), a general bee fact (too broad).

# Question: "According to the passage, what increases pollination?"
-> Detail: scan "pollination" -> found in P2 -> answer is literally there.

# Question (inference): "The author would likely support..."
-> Must follow from the tone of P4 (balanced regulation).
Eliminate options true in reality but NOT supported by the text.

# Vocabulary-in-context: "The bees 'flourished' (line 12) most nearly means..."
-> Substitute each option into the sentence; the one keeping
   meaning + grammar wins (here: "thrived").`,
        output: `(reading strategy)`,
        note: "Skim for structure (first/last sentence of each paragraph, transitions), then read the question, then SCAN back. Main idea = usually the conclusion. Eliminate 'true but not in the passage' and too-extreme absolutes. Vocab: substitute each option."
      }
    ],
    marginNotes: [
      "Skim for STRUCTURE in 60-90s: first and last sentence of each paragraph plus transition words ('however', 'therefore'). Don't memorize the whole passage — map the shape, then scan back per question.",
      "Eliminate answers that are TRUE IN REALITY but NOT IN THE PASSAGE. RC answers must come from the text, even if an option is factually correct outside it.",
      "Beware ABSOLUTE answers ('always', 'never', 'only') when the passage hedges ('often', 'may', 'seems'). The correct option usually matches the passage's level of certainty.",
      "Vocabulary-in-context: substitute each option into the sentence and pick the one that keeps both meaning and grammar — not the dictionary definition, the in-context meaning."
    ],
    commonMistakes: [
      "Reading the whole passage slowly and running out of time — skim structure, scan for details.",
      "Choosing an answer that's true in reality but not stated in the passage.",
      "Picking an absolute ('always') when the passage uses hedged language ('often')."
    ],
    relatedTopics: ["Aptitude Basics", "Grammar & Error Spotting"],
    externalLinks: [
      { label: "RC Strategies (Manhattan Prep)", url: "https://www.manhattanprep.com/" }
    ],
    mcqs: [
      {
        question: "What's the most time-efficient way to start an RC passage?",
        options: ["Read every word slowly", "Skim for structure — first/last sentence of each paragraph and transitions", "Read the questions first only", "Skip to the last paragraph only"],
        answer: 1,
        explanations: ["Too slow — you'll run out of time.", "Correct — skim the structure (topic sentences, transitions) in 60-90s to map the shape, then scan back to the relevant part for each question.", "Reading questions without the passage context is confusing.", "You'd miss the setup."],
        difficulty: "easy"
      },
      {
        question: "An RC answer that is factually true in reality but NOT stated in the passage should be?",
        options: ["Chosen if it sounds right", "Eliminated — RC answers must come from the text", "Chosen only if no other option fits", "Marked for review"],
        answer: 1,
        explanations: ["Sounding right isn't enough.", "Correct — eliminate it. RC answers must be supported by the passage, even if an option is true in the real world. Stick to the text.", "No — never choose an unsupported option.", "Eliminating is better than marking."],
        difficulty: "medium"
      },
      {
        question: "A vocabulary-in-context question is best solved by?",
        options: ["Using the dictionary definition", "Substituting each option into the sentence and picking the one that keeps meaning and grammar", "Guessing the hardest word", "Picking the first option"],
        answer: 1,
        explanations: ["The dictionary meaning may not fit the context.", "Correct — substitute each option into the sentence; the one that preserves both the meaning and the grammar in context is correct, not the literal dictionary definition.", "Hardest is rarely right.", "First is rarely right."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "oa-practice-quiz",
    title: "OA Practice Strategy",
    difficulty: "medium",
    definition: `The Online Assessment (OA) is a timed, auto-graded test mixing aptitude, verbal, and sometimes coding, used as the first filter. Strategy matters as much as knowledge: section time management, question selection, and avoiding negative marking determine the score.`,
    coreUnderstanding: `An OA isn't just a test of what you know — it's a test of how you spend limited time across mixed-difficulty questions. The strategy: (1) read the rules FIRST (time per section, marking scheme, negative marking, sectional cutoffs); (2) do a 30-second scan of all questions, then attempt easy ones first to bank marks and build momentum; (3) never exceed ~90 seconds on a question — mark and move; (4) for negative marking, only guess if you can eliminate 2+ options; (5) watch the sectional cutoff — if one section is weak, spend proportionally more time there. Practice with a timer to build pacing; untimed practice doesn't prepare you for the time pressure.`,
    howItWorks: `1. READ RULES FIRST: time per section, number of questions, marking scheme (+1/-0.25?), sectional cutoffs, on-screen calculator allowed?
2. 30-SECOND SCAN: flip through all questions; tag easy/medium/hard mentally. Attempt easy first.
3. TIME BUDGET: total time / questions = avg per question. Spend less on easy, bank time for hard. Never exceed ~90s on one.
4. MARK & MOVE: most OAs let you flag a question and return. Use it — don't get stuck.
5. NEGATIVE MARKING: if -0.25 per wrong and +1 per right, guess only if you can eliminate 2+ options (expected value turns positive).
6. SECTIONAL CUTOFFS: if each section has its own cutoff, don't neglect a weak section to ace a strong one — balance.
7. ELIMINATION: even without negative marking, eliminate 2 wrong options to raise your hit rate on guesses.
8. PRACTICE WITH A TIMER: untimed practice doesn't build pacing. Simulate the real time pressure.
9. REVIEW: if time remains, revisit flagged questions — a second look often spots the trick.`,
    codeExamples: [
      {
        lang: "text",
        code: `# Sample OA: 60 min, 50 questions, +1/-0.25, no sectional cutoffs
avg = 60/50 = 1.2 min/question
Plan: 25 easy in 20 min, 15 medium in 25 min, 10 hard in 15 min.

# Negative marking decision: +1 right, -0.25 wrong
# Guess with 4 options, no elimination: EV = 0.25*1 - 0.75*0.25 = +0.06 (slightly +)
# Eliminate 2 -> 2 options left: EV = 0.5*1 - 0.5*0.25 = +0.375 (clearly +) -> GUESS
# Eliminate 1 -> 3 options: EV = 0.33 - 0.67*0.25 = +0.16 (slightly +) -> borderline

# Sectional cutoff: quant 40%, logical 40%, verbal 40%
# If verbal is weak, spend more time there to clear the cutoff,
# don't just max quant.

# Timer practice: do a 30-question set in 36 min (1.2 each)
# to build the pacing instinct.`,
        output: `(OA strategy)`,
        note: "Read rules first (time, marking, cutoffs). Scan, then easy-first. Never exceed ~90s — mark and move. With negative marking, guess only if you can eliminate 2+ options (positive EV). Respect sectional cutoffs."
      }
    ],
    marginNotes: [
      "Read the rules FIRST — time per section, marking scheme (+1/-0.25?), and sectional cutoffs change your whole strategy. Don't start answering before you know these.",
      "With negative marking, only guess if you can ELIMINATE 2+ options. With +1/-0.25 and 4 options, random guessing is barely positive; eliminating 2 makes it clearly positive.",
      "Never exceed ~90 seconds on a question — mark and move. One 3-minute question costs you 4 easy ones. Easy-first banks marks and builds momentum.",
      "Practice WITH A TIMER. Untimed practice doesn't build the pacing instinct you need under real pressure."
    ],
    commonMistakes: [
      "Starting to answer without reading the marking scheme and cutoffs.",
      "Getting stuck on one hard question and missing several easy ones.",
      "Random-guessing under negative marking without eliminating any options."
    ],
    relatedTopics: ["Aptitude Basics", "Speed, Time & Work", "Reading Comprehension"],
    externalLinks: [
      { label: "OA Tips (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/how-to-prepare-for-aptitude-tests/" }
    ],
    mcqs: [
      {
        question: "With +1 for correct and -0.25 for wrong (4 options), when should you guess?",
        options: ["Always — guessing is free", "Only if you can eliminate 2+ options (expected value turns clearly positive)", "Never", "Only on the last question"],
        answer: 1,
        explanations: ["Random guessing is barely positive (+0.06) — risky.", "Correct — eliminate 2 options and the EV jumps to +0.375, clearly worth guessing. With no elimination it's barely positive; with one eliminated it's borderline.", "You lose value by never guessing.", "Timing of the question is irrelevant."],
        difficulty: "hard"
      },
      {
        question: "What should you do in the first 60 seconds of an OA?",
        options: ["Start answering question 1", "Read the rules — time, marking scheme, sectional cutoffs", "Guess all answers", "Take a break"],
        answer: 1,
        explanations: ["You'd miss the rules that shape your strategy.", "Correct — read time per section, marking scheme (+1/-0.25?), and sectional cutoffs FIRST. They determine your time budget and guessing strategy.", "Random guessing wastes marks.", "No time for breaks."],
        difficulty: "easy"
      },
      {
        question: "Why practice with a timer?",
        options: ["It's required", "Untimed practice doesn't build the pacing instinct needed under real time pressure", "It's faster", "It improves accuracy only"],
        answer: 1,
        explanations: ["It's not required but essential.", "Correct — pacing under pressure is a separate skill from solving. Untimed practice leaves you slow on test day; timed sets build the instinct to skip and move.", "Speed isn't the main point.", "It builds pacing, not just accuracy."],
        difficulty: "medium"
      }
    ]
  }
];