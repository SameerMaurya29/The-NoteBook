// Aptitude — Logical Reasoning topics.
export default [
  {
    id: "number-letter-series",
    title: "Number & Letter Series",
    difficulty: "medium",
    definition: `Series questions give a sequence and ask for the next term or the missing one. The pattern is usually arithmetic (add a constant), geometric (multiply), a difference pattern (differences themselves form a series), squares/cubes, or alternating series.`,
    coreUnderstanding: `Series solving is pure pattern recognition. You look at the gaps between terms first — if the gaps are constant it's arithmetic, if they grow it's a difference pattern or geometric, if they're perfect squares/cubes it's polynomial. Letter series use the same idea but with alphabet positions (A=1, B=2...). The two traps: alternating series (two interleaved patterns, e.g. odd positions add 2, even positions add 3) and mixed operations (×2 then +1, ×2 then +1). Always check the differences, then the ratios, then look for squares/cubes — in that order.`,
    howItWorks: `1. ARITHMETIC: constant difference. 3, 7, 11, 15 -> +4 each -> next 19.
2. GEOMETRIC: constant ratio. 2, 6, 18, 54 -> ×3 -> next 162.
3. DIFFERENCE PATTERN: the differences form their own series. 1, 3, 6, 10, 15 -> diffs 2,3,4,5 -> next diff 6 -> next 21 (triangular).
4. SQUARES/CUBES: n², n³, n²±k, n³±k. 1,4,9,16 -> n² -> 25. 2,9,28,65 -> n³+1 -> 126.
5. ALTERNATING: two interleaved patterns. 1, 4, 3, 8, 5, 12 -> odds 1,3,5 (+2), evens 4,8,12 (+4) -> next odd 7.
6. MIXED OPERATION: ×2 then +1 repeating. 1, 3, 7, 15, 31 -> ×2+1 -> next 63.
7. LETTER SERIES: convert to alphabet positions (A=1). BD, CE, DF, EG -> each letter +1 -> next FH.
8. FIBONACCI-LIKE: each term = sum of previous two. 1,1,2,3,5,8 -> next 13.
9. METHOD: compute differences -> if not constant, compute differences of differences -> check ratios -> check squares/cubes -> check alternating.`,
    codeExamples: [
      {
        lang: "text",
        code: `# Arithmetic: constant difference
3, 7, 11, 15, ?  -> diffs all 4 -> next 19

# Difference pattern (triangular numbers)
1, 3, 6, 10, 15, ?  -> diffs 2,3,4,5 -> next diff 6 -> 21

# Geometric
2, 6, 18, 54, ?  -> ratio 3 -> next 162

# Squares +1
2, 5, 10, 17, 26, ?  -> 1²+1, 2²+1, 3²+1... -> 6²+1 = 37

# Cubes -1
0, 7, 26, 63, ?  -> 1³-1, 2³-1, 3³-1, 4³-1 -> 5³-1 = 124

# Alternating (two interleaved)
1, 4, 3, 8, 5, 12, ?
odds: 1,3,5 -> +2 -> next odd 7
evens: 4,8,12 -> +4

# Mixed: ×2 then +1
1, 3, 7, 15, 31, ?  -> 31*2+1 = 63

# Letter series (A=1, B=2...)
B, D, F, H, ?  -> positions 2,4,6,8 -> +2 -> 10 = J`,
        output: `(worked solutions)`,
        note: "Check differences first (constant -> arithmetic; growing -> difference pattern), then ratios (geometric), then squares/cubes, then alternating (two interleaved patterns). Letter series = alphabet positions."
      }
    ],
    marginNotes: [
      "Always compute the DIFFERENCES between terms first. Constant diff = arithmetic; growing diff = a difference pattern or geometric; check the ratio for geometric.",
      "Watch for ALTERNATING series — two interleaved patterns at odd and even positions. If one pattern doesn't fit all terms, split into odd/even positions.",
      "Squares and cubes (often ± a constant) are common: n², n³, n²+1, n³-1. Memorize the first 15 squares and 10 cubes — it makes these instant.",
      "Letter series: convert letters to alphabet positions (A=1, B=2, ...), find the number pattern, convert back. BD, CE, DF -> each position +1."
    ],
    commonMistakes: [
      "Forcing a single pattern on an alternating (interleaved) series.",
      "Missing a square/cube pattern because you only checked differences and ratios.",
      "Forgetting that mixed operations (×2 then +1) repeat, so the pattern is two-step."
    ],
    relatedTopics: ["Aptitude Basics", "Coding-Decoding"],
    externalLinks: [
      { label: "Number Series (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/number-series-reasoning/" }
    ],
    mcqs: [
      {
        question: "Next term: 1, 3, 6, 10, 15, ?",
        options: ["20", "21 (differences 2,3,4,5 -> next diff 6)", "18", "25"],
        answer: 1,
        explanations: ["That's +5 from 15 — but diffs grow.", "Correct — differences are 2,3,4,5 (growing by 1), so next diff is 6, giving 15+6 = 21 (triangular numbers).", "Too low.", "That's a square, not this pattern."],
        difficulty: "medium"
      },
      {
        question: "Next term: 2, 6, 18, 54, ?",
        options: ["108", "162 (×3 each time)", "216", "60"],
        answer: 1,
        explanations: ["That's ×2 — wrong ratio.", "Correct — geometric with ratio 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162.", "That's ×4 — wrong.", "That's +6 — arithmetic, wrong."],
        difficulty: "easy"
      },
      {
        question: "Next term: 1, 4, 3, 8, 5, 12, ?",
        options: ["7 (alternating: odds +2, evens +4)", "16", "9", "6"],
        answer: 0,
        explanations: ["Correct — two interleaved patterns: odd positions 1,3,5 (+2) -> next 7; even positions 4,8,12 (+4). A single pattern won't fit all terms.", "That continues the even series, but the next term is an odd position.", "Wrong — that's +4 from 5.", "Wrong."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "blood-relations",
    title: "Blood Relations",
    difficulty: "medium",
    definition: `Blood relation problems describe a family relationship in words and ask you to identify the exact relation. The method: draw a family tree, use symbols for male/female and horizontal/vertical links, and work from a fixed reference person.`,
    coreUnderstanding: `The only reliable method is to DRAW the tree — never solve these mentally. Use a square for male, a circle for female, a horizontal line for a couple (marriage), a vertical line for parent-child, and label each person as you place them. The trick is choosing the reference person (the one whose perspective you're asked from) and tracing the path. Common relations: sibling, parent/child, grandparent, in-law, cousin, uncle/aunt, niece/nephew. "Pointing" questions ("A is the father of B") need you to fix A or B as the anchor. Gender matters: a question may give only one gender clue and you infer the rest.`,
    howItWorks: `1. SYMBOLS: male = square, female = circle. Couple = horizontal line. Parent->child = vertical line. Siblings = same parents.
2. REFERENCE: identify the person whose perspective is asked ("how is X related to Y" -> start from Y, trace to X).
3. PLACE AS YOU READ: "A is the father of B" -> draw A (male) above B. "B is the sister of C" -> B female, same parents as C.
4. GENERATIONS: keep same-generation people on the same horizontal level; parents one level up, children one level down.
5. COMMON RELATIONS: father's brother = uncle; uncle's child = cousin; sibling's child = niece/nephew; child's child = grandchild; spouse's parent = in-law.
6. GENDER INFERENCE: "only son of" pins a male; "only daughter" pins a female. Use these to fix genders of others.
7. "HOW IS X RELATED TO Y": start at Y, go up/down/sideways to X, read off the relation.
8. PUZZLE FORM: "A+B means A is father of B; A-B means A is brother of B" — substitute the symbols, then solve the tree.`,
    codeExamples: [
      {
        lang: "text",
        code: `# Symbols
[ ] = male,  ( ) = female
— = married couple,  | = parent->child

# "A is the father of B. B is the sister of C. How is A related to C?"
[A] —— ([B]'s mother)
        |
    [B] ( )   [C] (?)
A is father of B; B and C share parents -> A is father of C too.
Answer: A is the father of C.

# "Pointing to a man, Riya said 'he is the son of my grandfather's only son.'
#  How is the man related to Riya?"
grandfather -> his only son = Riya's father -> that man's son.
The man is Riya's father's son = Riya's brother (or Riya himself if male).
Riya is female -> the man is her brother.

# "A+B = A is father of B; A-B = A is sister of B; A*B = A is mother of B.
#  P-Q+R means: Q is father of R, P is sister of Q -> P is R's aunt."`,
        output: `(family trees)`,
        note: "Draw the tree: square=male, circle=female, —=couple, |=parent->child. Keep generations on levels. Fix the reference person and trace. Gender clues ('only son/daughter') pin people."
      }
    ],
    marginNotes: [
      "ALWAYS draw the tree — never solve blood relations in your head. Square=male, circle=female, horizontal line=couple, vertical line=parent-child.",
      "Keep GENERATIONS on horizontal levels: parents one row up, children one row down, siblings on the same row. This makes relations readable.",
      "Use 'only son'/'only daughter' to pin genders — these fix a person's gender and let you infer the rest of the tree.",
      "For 'how is X related to Y', start at Y and trace the path to X — the direction of the question matters."
    ],
    commonMistakes: [
      "Trying to solve mentally without drawing — the #1 cause of errors.",
      "Confusing the reference person (answering 'Y related to X' when asked 'X related to Y').",
      "Ignoring gender clues that pin a person's sex."
    ],
    relatedTopics: ["Aptitude Basics", "Seating Arrangements", "Coding-Decoding"],
    externalLinks: [
      { label: "Blood Relations (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/blood-relation/" }
    ],
    mcqs: [
      {
        question: "Pointing to a man, Riya (female) said: 'He is the son of my grandfather's only son.' The man is?",
        options: ["Her father", "Her brother (grandfather's only son = her father; his son = her brother)", "Her uncle", "Her son"],
        answer: 1,
        explanations: ["Her grandfather's only son is her father, not the man.", "Correct — grandfather's only son = Riya's father; the man is that son's son = Riya's brother (Riya is female, so not herself).", "An uncle would be grandfather's brother — wrong.", "Her son would be a generation below — wrong."],
        difficulty: "medium"
      },
      {
        question: "What's the essential method for blood relation problems?",
        options: ["Memorize all relations", "Draw a family tree with gender symbols and trace from the reference person", "Guess based on names", "Use algebra"],
        answer: 1,
        explanations: ["Memorizing isn't enough — trees vary.", "Correct — draw the tree (square=male, circle=female, lines for couple/parent-child), keep generations on levels, and trace from the reference person. Mental solving is the top error source.", "Names don't encode relations.", "Algebra doesn't apply."],
        difficulty: "easy"
      },
      {
        question: "A is the father of B. B is the sister of C. How is A related to C?",
        options: ["Uncle", "Father (B and C share parents, so A is C's father too)", "Brother", "Grandfather"],
        answer: 1,
        explanations: ["An uncle is a parent's brother.", "Correct — B and C are siblings (same parents); A is B's father, so A is also C's father.", "A is a parent, not a sibling.", "A is one generation up, not two."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "seating-arrangements",
    title: "Seating Arrangements",
    difficulty: "hard",
    definition: `Seating arrangement problems place people in a row or around a table given clues about who sits where, next to whom, and facing which direction. The method: draw the seats, fill the definite clues first, then use the relative clues to narrow the rest.`,
    coreUnderstanding: `There are two shapes: LINEAR (a row of seats, sometimes facing two directions) and CIRCULAR (around a table, facing center or away). The solving order is fixed: (1) draw the seats, (2) place any DEFINITE clues ("A sits at the left end", "F sits opposite C"), (3) place RELATIVE clues that lock positions ("B sits second to the right of A"), (4) use the remaining negative clues ("C is not next to D") to eliminate. For circular, remember "second to the right" means 2 seats clockwise; "opposite" only exists for even-numbered tables. Facing direction matters: if people face the center, "to the right" is clockwise; if they face outward, it's reversed. Make a grid for arrangements with attributes (person + profession + color).`,
    howItWorks: `1. LINEAR ROW: draw N seats in a line. Left end = seat 1, right end = seat N. "Second to the right of A" = 2 seats toward the right.
2. CIRCULAR: draw N seats around a circle. "To the right" = clockwise (if facing center). "Opposite" = directly across (only for even N).
3. FACING: if all face the center, right = clockwise. If some face inward and some outward, the directions flip per person — track it.
4. DEFINITE FIRST: "A sits at an end", "F sits exactly in the middle", "C sits opposite D" -> place these before anything relative.
5. RELATIVE: "B sits second to the right of A" -> once A is placed, B is fixed.
6. NEGATIVE: "C does not sit next to D" -> eliminate the seats adjacent to D for C.
7. ATTRIBUTE GRID: when each seat has a person + profession + city + color, make a table (seat rows, attribute columns) and fill clues one at a time.
8. TWO ROWS FACING: two rows of people facing each other — "A faces B" means they're directly opposite across the rows.
9. DIRECTION SENSE: combine with left/right/up/down when the arrangement has a compass orientation.`,
    codeExamples: [
      {
        lang: "text",
        code: `# Linear: 5 seats, A at left end, B second to right of A, C not next to B
seats: 1   2   3   4   5
        A   .   B   .   .     (A at left, B = A + 2 = seat 3)
C not next to B (seats 2,4) -> C in seat 5
Remaining (D, E) in seats 2, 4.

# Circular (6 people, facing center, even table):
        1
     6     2
     5     3
        4
"A opposite D" -> A at 1, D at 4 (directly across).
"B second to the right of A" -> A=1, right=cw -> B at 3.
"F second to the left of A" -> left=ccw -> F at 5.
Remaining 2,6 for C,E.

# Attribute grid (seat | person | profession | color)
Clue: "The doctor sits in seat 3 and likes red."
Fill seat 3: profession=doctor, color=red. Cross off doctor/red
for all other seats.`,
        output: `(arrangements)`,
        note: "Draw seats first. Place DEFINITE clues (ends, middle, opposite) before relative ones. Circular: right = clockwise if facing center; opposite needs even N. Use an attribute grid when each seat has multiple attributes."
      }
    ],
    marginNotes: [
      "Always DRAW the seats first and place DEFINITE clues (ends, middle, opposite) before relative ones. Relative clues only help once an anchor is placed.",
      "Circular 'to the right' = clockwise if people face the CENTER. If they face outward, it's reversed. Track facing direction per person when it varies.",
      "'Opposite' only exists for EVEN-numbered tables — for odd N, no one is directly across. Don't assume opposite for 5 or 7 seats.",
      "For arrangements with multiple attributes (person + profession + color + city), use a GRID: one row per seat, one column per attribute, and fill clues one at a time, crossing off as you go."
    ],
    commonMistakes: [
      "Placing relative clues before any anchor is fixed — you can't place 'B second to right of A' until A is placed.",
      "Getting 'right' vs 'left' wrong in circular arrangements, especially when people face outward.",
      "Assuming an 'opposite' seat exists for an odd-numbered table."
    ],
    relatedTopics: ["Aptitude Basics", "Blood Relations", "Direction Sense"],
    externalLinks: [
      { label: "Seating Arrangement (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/seating-arrangement/" }
    ],
    mcqs: [
      {
        question: "In a circular arrangement facing the center, 'to the right' means?",
        options: ["Counter-clockwise", "Clockwise", "Toward the center", "Away from the center"],
        answer: 1,
        explanations: ["That's 'to the left'.", "Correct — when people face the center, 'to the right' is clockwise. If they face outward, it reverses. Always check facing direction.", "That's 'inward', not a direction around the circle.", "That's 'outward'."],
        difficulty: "medium"
      },
      {
        question: "When should you place 'B second to the right of A'?",
        options: ["First, before anything", "After A's seat is fixed by a definite clue", "Last, after all negatives", "Never"],
        answer: 1,
        explanations: ["You can't — A must be placed first.", "Correct — relative clues need an anchor. Place definite clues (ends, middle, opposite) first, then relative ones like 'B second to right of A' lock in.", "Negatives eliminate, they don't anchor.", "You do place it, after the anchor."],
        difficulty: "medium"
      },
      {
        question: "Can two people sit 'opposite' each other at a 5-seat round table?",
        options: ["Yes", "No — 'opposite' only exists for even-numbered tables", "Only if they're tall", "Only at the head"],
        answer: 1,
        explanations: ["5 is odd — no direct opposite.", "Correct — 'opposite' (directly across) only exists for even-numbered tables. For 5 or 7 seats, no one is directly across from anyone. Don't assume an opposite seat.", "Height is irrelevant.", "Round tables have no head."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "coding-decoding",
    title: "Coding-Decoding",
    difficulty: "medium",
    definition: `Coding-decoding problems encode a word by a rule (letter shift, reversal, substitution, number mapping) and ask you to apply the same rule to another word. The method: identify the rule from the example, then apply it exactly.`,
    coreUnderstanding: `The pattern is always "given WORD -> CODE, apply the same rule to TARGET". First decode the rule from the example pair: is it a letter shift (each letter +2), a reversal, a letter-to-number mapping (A=1), a substitution pattern (consonants/vowels swapped), or a position-based rule (first/last letters special)? Letter-shift rules use alphabet positions (A=1...Z=26), wrapping past Z. Number coding maps each letter to its position or a fixed code. The trap: rules can combine (reverse the word THEN shift each letter) or be conditional (vowels +1, consonants -1). Always verify the rule reproduces the example before applying it to the target.`,
    howItWorks: `1. LETTER SHIFT: each letter moves by k positions. CAT -> DBU (each +1). Wrap Z->A. Identify k from the example.
2. REVERSAL: the word is reversed. CAT -> TAC. Sometimes reversed THEN shifted.
3. LETTER-NUMBER: each letter -> its alphabet position (A=1, B=2...). CAT -> 3,1,20. Or a fixed digit code per letter.
4. POSITION-BASED: first letter +k, last letter -k, middle unchanged. Or first/last swapped.
5. VOWEL/CONSONANT RULE: vowels shifted one way, consonants another. AEIOU treated specially.
6. SUBSTITUTION: letters replaced by symbols/numbers from a given table — copy the table, apply it.
7. SENTENCE CODING: words mapped to codes word-by-word; find which word maps to which code by matching lengths/patterns.
8. DECODING: given code -> word, reverse the rule (shift -k, reverse back).
9. METHOD: from the example pair, find the rule; VERIFY it reproduces the example; then apply to the target.`,
    codeExamples: [
      {
        lang: "text",
        code: `# Letter shift: CAT -> DBU (each letter +1)
rule: each letter +1
apply to DOG -> EPH

# Reversal: CAT -> TAC
apply to DOG -> GOD

# Letter-number: CAT -> 3-1-20 (A=1, B=2...)
apply to DOG -> 4-15-7

# Reverse then shift: CAT -> TAC -> UBD (reverse, then +1 each)
apply to DOG -> GOD -> HPE

# Vowel/consonant rule: vowels +1, consonants -1
CAT -> BZS (C->B, A->B, T->S)
apply to DOG -> CPH (D->C, O->P, G->F... wait G consonant -> F)
# verify: A,E,I,O,U are vowels (+1); others -1

# Number coding with a fixed table (given):
A=2, B=5, C=8 ...  (copy the table, apply letter by letter)

# Sentence: "she is good" -> "tig jt hppe"
she->tig (+1 each), is->jt (+1), good->hppe (+1)
apply "bad" -> "cbe"`,
        output: `(decoded words)`,
        note: "Find the rule from the example pair (shift, reverse, letter-number, vowel/consonant, position-based). VERIFY it reproduces the example, then apply to the target. Watch for combined rules (reverse THEN shift)."
      }
    ],
    marginNotes: [
      "Always VERIFY the rule against the example before applying it. A rule that 'almost fits' is wrong — it must reproduce the example exactly.",
      "Letter shifts use alphabet positions (A=1...Z=26) and wrap past Z (Z+1 = A). 'CAT +1' = 'DBU'.",
      "Watch for COMBINED rules: reverse the word THEN shift, or shift then swap first/last. Apply steps in the order the example shows.",
      "For vowel/consonant rules, treat A,E,I,O,U as vowels (one rule) and the rest as consonants (another). Don't apply one rule to all letters."
    ],
    commonMistakes: [
      "Not verifying the rule reproduces the example — applying an unverified guess.",
      "Forgetting to wrap past Z (Z+1 = A) in letter shifts.",
      "Missing a combined rule (reverse + shift) because you only checked one operation."
    ],
    relatedTopics: ["Aptitude Basics", "Number & Letter Series"],
    externalLinks: [
      { label: "Coding-Decoding (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/coding-decoding/" }
    ],
    mcqs: [
      {
        question: "If CAT is coded as DBU, how is DOG coded?",
        options: ["EPH (each letter +1)", "CPH", "FPH", "EOH"],
        answer: 0,
        explanations: ["Correct — the rule is each letter +1 (C->D, A->B, T->U). Apply to DOG: D->E, O->P, G->H = EPH.", "That mixes +1 and -1 — inconsistent.", "That's +2 — wrong rule.", "Inconsistent shift."],
        difficulty: "easy"
      },
      {
        question: "If CAT is coded as TAC, the rule is?",
        options: ["Each letter +1", "Reversal of the word", "Letter to number", "Vowels +1"],
        answer: 1,
        explanations: ["+1 would give DBU, not TAC.", "Correct — CAT reversed is TAC. Verify by applying to DOG -> GOD.", "Numbers would be 3,1,20.", "A vowel rule wouldn't reverse the word."],
        difficulty: "easy"
      },
      {
        question: "What's the essential step before applying a coding rule to the target?",
        options: ["Guess quickly", "Verify the rule reproduces the example exactly", "Apply it to every word you know", "Skip verification"],
        answer: 1,
        explanations: ["Guessing causes errors.", "Correct — the rule must reproduce the example pair exactly. A rule that 'almost fits' is wrong; verify first, then apply to the target.", "That wastes time.", "Skipping causes wrong answers."],
        difficulty: "medium"
      }
    ]
  }
];