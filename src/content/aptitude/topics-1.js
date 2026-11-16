// Aptitude — Quantitative topics.
export default [
  {
    id: "speed-time-work",
    title: "Speed, Time & Work",
    difficulty: "medium",
    definition: `Speed-time-distance and work-time problems relate how fast something moves or gets done. Core formulas: distance = speed × time, and work = rate × time. If A does a job in 12 days, A's rate is 1/12 of the job per day; combined rates add.`,
    coreUnderstanding: `These are the most common quant questions and they all reduce to two formulas. For motion: distance = speed × time (d = s·t), so time = d/s and speed = d/t. For work: if a person finishes a job in n days, their rate is 1/n jobs per day; people working together ADD their rates (1/A + 1/B = combined rate). The trick is keeping units consistent (km/h vs m/s) and converting "X is twice as fast as Y" into rate ratios. Most questions are one formula plus one algebra step.`,
    howItWorks: `1. MOTION: d = s·t. Rearrange as needed. Watch units: 1 km/h = 5/18 m/s; to convert km/h to m/s multiply by 5/18.
2. RELATIVE SPEED: same direction -> subtract speeds; opposite direction -> add speeds. Two trains crossing: time = total length / relative speed.
3. AVERAGE SPEED: total distance / total time (NOT the average of speeds). For equal distances at speeds a and b, average = 2ab/(a+b) (harmonic mean).
4. WORK RATE: if A does a job in n days, A's rate = 1/n per day. A+B combined rate = 1/A + 1/B. Time together = 1 / (combined rate).
5. PIPE & CISTERN: filling pipe = positive rate, drain = negative rate. Net rate = sum; time to fill = 1 / net rate.
6. MAN-DAYS: M1·D1 = M2·D2 for same work (more men take fewer days). Add work: M1·D1·H1/W1 = M2·D2·H2/W2.
7. "TWICE AS FAST": if A is twice as fast as B, A's rate = 2 × B's rate, so A takes half the time.`,
    codeExamples: [
      {
        lang: "text",
        code: `# Motion: a 240 km trip at 80 km/h takes how long?
time = distance / speed = 240 / 80 = 3 hours

# Convert 72 km/h to m/s (for train/platform problems)
72 * (5/18) = 20 m/s

# Two trains crossing (opposite directions): total length / relative speed
train1 = 120 m, train2 = 180 m, speeds 30 and 42 m/s (opposite)
relative speed = 30 + 42 = 72 m/s
time to cross = (120 + 180) / 72 = 300/72 = 4.17 s

# Work: A does a job in 12 days, B in 18 days. Together?
A rate = 1/12 per day, B rate = 1/18 per day
combined = 1/12 + 1/18 = 3/36 + 2/36 = 5/36 per day
time together = 1 / (5/36) = 36/5 = 7.2 days

# Average speed, equal distances at 60 and 40 km/h
avg = 2*60*40 / (60+40) = 4800/100 = 48 km/h (NOT 50!)`,
        output: `(worked solutions)`,
        note: "d = s·t for motion (watch units: ×5/18 for km/h->m/s). Work rates add: 1/A + 1/B = combined; time together = 1/combined. Average speed = total distance/total time (harmonic mean for equal distances)."
      }
    ],
    marginNotes: [
      "Keep UNITS consistent. The classic trap: speeds in km/h but lengths in metres. Convert km/h to m/s by multiplying by 5/18 (e.g. 72 km/h = 20 m/s).",
      "Work rates ADD: if A takes 12 days and B takes 18, combined rate = 1/12 + 1/18 = 5/36 per day, so together = 36/5 = 7.2 days. Don't average the days.",
      "Average speed is total distance / total time — NOT the average of the speeds. For equal distances at speeds a and b, it's the harmonic mean 2ab/(a+b).",
      "Relative speed: same direction -> subtract; opposite direction -> add. Two trains crossing = (sum of lengths) / relative speed."
    ],
    commonMistakes: [
      "Mixing km/h and m/s without converting (×5/18).",
      "Averaging the two speeds instead of using total distance / total time.",
      "Adding work TIMES instead of work RATES — add 1/A + 1/B, not A+B."
    ],
    relatedTopics: ["Aptitude Basics", "Ratio & Proportion", "Permutations & Combinations"],
    externalLinks: [
      { label: "Time, Speed & Distance (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/time-speed-distance/" }
    ],
    mcqs: [
      {
        question: "A does a job in 12 days, B in 18 days. Working together, how long?",
        options: ["15 days", "7.2 days (combined rate 1/12 + 1/18 = 5/36; time = 36/5)", "30 days", "6 days"],
        answer: 1,
        explanations: ["That's the average of the days — wrong.", "Correct — rates add: 1/12 + 1/18 = 5/36 per day, so time = 1/(5/36) = 36/5 = 7.2 days.", "Adding days is wrong.", "Too fast."],
        difficulty: "medium"
      },
      {
        question: "A car goes 240 km at 60 km/h and returns at 40 km/h. Average speed?",
        options: ["50 km/h", "48 km/h (harmonic mean 2·60·40/(60+40), NOT the average)", "45 km/h", "60 km/h"],
        answer: 1,
        explanations: ["That's the arithmetic average — wrong for equal distances.", "Correct — average speed = total distance/total time. For equal distances at speeds a and b, it's 2ab/(a+b) = 4800/100 = 48 km/h, not 50.", "Too low.", "That's only the first leg."],
        difficulty: "medium"
      },
      {
        question: "Convert 72 km/h to m/s.",
        options: ["72 m/s", "20 m/s (multiply by 5/18)", "25.9 m/s", "200 m/s"],
        answer: 1,
        explanations: ["Wrong units.", "Correct — 1 km/h = 1000/3600 m/s = 5/18 m/s. So 72 × 5/18 = 20 m/s.", "That's 72 × 0.36 — wrong factor.", "Way off."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "permutations-combinations",
    title: "Permutations & Combinations",
    difficulty: "hard",
    definition: `Permutations count ARRANGements (order matters): nPr = n!/(n-r)!. Combinations count SELECTIONS (order doesn't matter): nCr = n!/(r!(n-r)!). The key question to ask: does the order of picking matter?`,
    coreUnderstanding: `Both count "ways to choose r things from n", but permutations care about ORDER (a password, a race's 1st-2nd-3rd, a seating order) and combinations don't (a committee, a hand of cards, a subset). nPr = n!/(n-r)! (arrangements), nCr = n!/(r!(n-r)!) (selections). The relation nPr = nCr × r! shows permutations are just ordered combinations. Watch for: with/without repetition, identical items (divide by factorial of repeats), and "at least/at most" cases solved by summing. Most mistakes come from picking the wrong one (order matters?) or forgetting identical items.`,
    howItWorks: `1. ASK FIRST: does order matter? Yes -> permutation (nPr); No -> combination (nCr).
2. nPr = n!/(n-r)!: arrange r of n distinct items in order. 5P3 = 5·4·3 = 60.
3. nCr = n!/(r!(n-r)!): choose r of n, order irrelevant. 5C3 = 5!/(3!2!) = 10. Note nCr = nC(n-r).
4. ALL n items: nPn = n! (arrangements), nCn = 1.
5. WITH REPETITION: r items from n with repetition allowed -> n^r (ordered), C(n+r-1, r) (unordered).
6. IDENTICAL ITEMS: if items repeat (e.g. MISSISSIPPI), total arrangements = n! / (p!·q!·r!...) for each group of identical items.
7. "AT LEAST k": sum the cases — C(n,k) + C(n,k+1) + ... . "EXACTLY k": just C(n,k) × (ways for the rest).
8. RESTRICTED POSITIONS: fix the restricted items first, then arrange the rest. "A and B must sit together" -> treat AB as one unit -> (n-1)! × 2!.
9. CIRCULAR ARRANGEMENT: (n-1)! for n distinct items around a circle (fix one to remove rotational symmetry).`,
    codeExamples: [
      {
        lang: "text",
        code: `# Order matters? Password of 3 digits from 0-9 (repetition allowed)
10^3 = 1000 codes  (permutation WITH repetition)

# Order matters, no repetition: top 3 from 8 runners
8P3 = 8*7*6 = 336  (permutation)

# Order doesn't matter: choose 3 toppings from 8
8C3 = 8!/(3!*5!) = 56  (combination)

# Identical items: letters of MISSISSIPPI
M=1, I=4, S=4, P=2, total 11 letters
arrangements = 11! / (1! * 4! * 4! * 2!) = 34650

# A and B must sit together in a row of 5
treat AB as one unit -> 4 units -> 4! * 2! = 48

# Circular seating of 6 distinct people
(6-1)! = 120  (fix one to remove rotation)`,
        output: `(worked solutions)`,
        note: "Ask 'order matters?' first: yes -> nPr, no -> nCr. nPr = n!/(n-r)!, nCr = n!/(r!(n-r)!). Identical items: divide by factorial of each repeat group. Circular: (n-1)!."
      }
    ],
    marginNotes: [
      "ALWAYS ask 'does order matter?' first. Password/race/seating order -> permutation (nPr). Committee/hand/subset -> combination (nCr).",
      "Identical items: divide by the factorial of EACH repeat group. MISSISSIPPI = 11!/(1!·4!·4!·2!) — not just 11!.",
      "nCr = nC(n-r): choosing 3 from 8 is the same count as choosing 5 from 8 (you're picking what to EXCLUDE). Saves computation.",
      "Circular arrangements are (n-1)!, not n! — fix one person to remove the rotational symmetry, then arrange the rest."
    ],
    commonMistakes: [
      "Using a permutation where order doesn't matter (or vice versa) — always ask first.",
      "Forgetting to divide by factorials for identical/repeated items.",
      "Using n! for circular seating instead of (n-1)!."
    ],
    relatedTopics: ["Aptitude Basics", "Probability", "Ratio & Proportion"],
    externalLinks: [
      { label: "Permutations & Combinations (Khan Academy)", url: "https://www.khanacademy.org/math/precalculus/prob-comb" }
    ],
    mcqs: [
      {
        question: "How many ways to choose 3 toppings from 8 (order doesn't matter)?",
        options: ["336", "56 (8C3 = 8!/(3!5!))", "24", "512"],
        answer: 1,
        explanations: ["That's 8P3 (order matters) — wrong for toppings.", "Correct — order doesn't matter, so combination: 8C3 = 8!/(3!·5!) = 56.", "Too few.", "That's 8^3 with repetition — wrong."],
        difficulty: "medium"
      },
      {
        question: "Arrangements of the letters in MISSISSIPPI?",
        options: ["11!", "11!/(1!·4!·4!·2!) = 34650", "11!/4!", "11"],
        answer: 1,
        explanations: ["That ignores the repeated letters.", "Correct — divide by the factorial of each repeat group: M=1, I=4, S=4, P=2, so 11!/(1!·4!·4!·2!) = 34650.", "Only divides by one group — incomplete.", "Far too few."],
        difficulty: "hard"
      },
      {
        question: "Seating 6 distinct people around a circular table?",
        options: ["720 (6!)", "120 ((6-1)! — fix one to remove rotation)", "360", "6"],
        answer: 1,
        explanations: ["That's a row arrangement, not circular.", "Correct — circular arrangements are (n-1)!: fix one person to remove rotational symmetry, then arrange the other 5 -> 5! = 120.", "Half of 6! — wrong.", "Way too few."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "probability",
    title: "Probability",
    difficulty: "medium",
    definition: `Probability measures how likely an event is: P(E) = favorable outcomes / total outcomes, always between 0 and 1. Compound events use AND (multiply) and OR (add), with care for independence and mutual exclusivity.`,
    coreUnderstanding: `Probability = (ways the event can happen) / (all possible equally-likely outcomes). The two operations: AND means multiply (P(A and B) = P(A)·P(B) if independent), OR means add (P(A or B) = P(A) + P(B) if mutually exclusive; otherwise subtract the overlap P(A∩B)). The complement trick saves time: P(at least one) = 1 - P(none). Most OA questions are counting (favorable/total via combinations) plus one of these operations. Watch for "with replacement" (independent) vs "without replacement" (dependent — update the counts each draw).`,
    howItWorks: `1. BASIC: P(E) = favorable / total. All outcomes equally likely. 0 <= P <= 1.
2. COMPLEMENT: P(not E) = 1 - P(E). Use for "at least one": P(at least 1) = 1 - P(none).
3. AND (both): P(A and B) = P(A) · P(B|A). If independent, P(B|A) = P(B), so just multiply.
4. OR (either): P(A or B) = P(A) + P(B) - P(A and B). If mutually exclusive, the overlap is 0.
5. WITH REPLACEMENT: counts stay the same each draw -> independent.
6. WITHOUT REPLACEMENT: counts change each draw -> dependent. Update numerator and denominator.
7. COUNTING APPROACH: favorable = C(k, r) (choose r from the k favorable items); total = C(n, r); P = favorable/total.
8. EXPECTED VALUE: sum of (outcome × its probability). The fair price of a bet.
9. BAYES: P(A|B) = P(B|A)·P(A) / P(B). Reverse conditional probability — rare in basic OAs.`,
    codeExamples: [
      {
        lang: "text",
        code: `# A bag has 3 red, 5 blue balls. P(red)?
favorable = 3, total = 8 -> P(red) = 3/8

# Two balls drawn WITHOUT replacement: P(both red)?
P(1st red) = 3/8, then 2 reds left of 7 -> P(2nd red | 1st red) = 2/7
P(both red) = 3/8 * 2/7 = 6/56 = 3/28

# WITH replacement: P(both red) = 3/8 * 3/8 = 9/64

# "At least one red in 3 draws" -> use complement
P(no red in 3 draws) = (5/8)*(4/7)*(3/6) = 60/336
P(at least one red) = 1 - 60/336 = 276/336

# Two dice: P(sum = 7)?
favorable = (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) = 6
total = 36 -> P = 6/36 = 1/6

# A card: P(ace or king) = mutually exclusive
4/52 + 4/52 = 8/52
# P(ace or red) = NOT exclusive -> 4/52 + 26/52 - 2/52 = 28/52`,
        output: `(worked solutions)`,
        note: "P = favorable/total. AND = multiply (independent if with replacement), OR = add (subtract overlap if not exclusive). P(at least one) = 1 - P(none). Without replacement: update counts each draw."
      }
    ],
    marginNotes: [
      "Use the COMPLEMENT for 'at least one': P(at least one) = 1 - P(none). Summing all the 'one or more' cases is slow and error-prone.",
      "AND = multiply, OR = add — but only subtract the overlap for OR when events CAN happen together (not mutually exclusive).",
      "With replacement = independent (counts unchanged). Without replacement = dependent (update numerator AND denominator each draw).",
      "For card/dice/ball problems, count favorable and total with combinations: P = C(favorable, r) / C(total, r)."
    ],
    commonMistakes: [
      "Adding probabilities for AND instead of multiplying (or vice versa).",
      "Forgetting to update counts when drawing without replacement.",
      "Not subtracting the overlap in P(A or B) when events aren't mutually exclusive."
    ],
    relatedTopics: ["Permutations & Combinations", "Aptitude Basics"],
    externalLinks: [
      { label: "Probability (Khan Academy)", url: "https://www.khanacademy.org/math/statistics-probability/probability" }
    ],
    mcqs: [
      {
        question: "Bag: 3 red, 5 blue. Two drawn without replacement. P(both red)?",
        options: ["9/64", "3/28 (3/8 × 2/7 — counts update without replacement)", "6/64", "3/8"],
        answer: 1,
        explanations: ["That's WITH replacement.", "Correct — without replacement: P(1st red)=3/8, then 2 reds left of 7, so P(2nd red|1st)=2/7. Product = 6/56 = 3/28.", "Wrong denominator.", "That's just the first draw."],
        difficulty: "medium"
      },
      {
        question: "P(at least one red in 3 draws) is best computed as:",
        options: ["Sum P(exactly 1) + P(exactly 2) + P(exactly 3)", "1 - P(no red in 3 draws) — the complement", "P(red) cubed", "3 × P(red)"],
        answer: 1,
        explanations: ["Slow and error-prone.", "Correct — the complement is fastest: P(at least one) = 1 - P(none). Compute P(no red) for all 3 draws and subtract from 1.", "That's P(all red), not at least one.", "That can exceed 1 — wrong."],
        difficulty: "medium"
      },
      {
        question: "P(ace or red card) from a standard deck?",
        options: ["30/52 (4/52 + 26/52, no overlap)", "28/52 (4/52 + 26/52 - 2/52; subtract the 2 red aces counted twice)", "8/52", "26/52"],
        answer: 1,
        explanations: ["That double-counts the 2 red aces.", "Correct — ace and red are NOT mutually exclusive (2 red aces), so subtract the overlap: 4/52 + 26/52 - 2/52 = 28/52.", "That's ace or king (mutually exclusive).", "That's just red."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "profit-loss",
    title: "Profit, Loss & Percentages",
    difficulty: "medium",
    definition: `Profit and loss track the difference between cost price (CP) and selling price (SP): profit = SP - CP (when SP > CP), loss = CP - SP (when SP < CP), each expressed as a percentage of CP. Marked price, discounts, and successive percentages are the common twists.`,
    coreUnderstanding: `All profit/loss is a percentage of the COST PRICE. Profit % = (profit / CP) × 100, loss % = (loss / CP) × 100. The chain: a shopkeeper marks the goods up (marked price = CP + markup%), then offers a discount (SP = MP - discount%). Successive percentage changes don't add — they multiply: two 10% hikes give 1.1 × 1.1 = 1.21, a 21% increase, not 20%. The "dishonest shopkeeper" trick (selling at cost but cheating on weight) is really a profit-percentage question in disguise.`,
    howItWorks: `1. BASIC: Profit = SP - CP; Loss = CP - SP. Profit% = (Profit/CP)×100; Loss% = (Loss/CP)×100. Always on CP.
2. SP from CP and %: SP = CP × (1 + profit%/100) or CP × (1 - loss%/100).
3. CP from SP and %: CP = SP × 100 / (100 + profit%) or SP × 100 / (100 - loss%).
4. MARKED PRICE & DISCOUNT: MP = CP + markup. Discount% is on MP. SP = MP × (1 - discount%/100).
5. SUCCESSIVE %: multiply factors. +10% then +10% = 1.1 × 1.1 = 1.21 (+21%). +20% then -20% = 1.2 × 0.8 = 0.96 (-4%, never cancels).
6. NET CHANGE: a% up then b% down -> net = (a - b - ab/100)%. Note +x then -x is always a loss of x²/100 %.
7. DISHONEST SHOPKEEPER: claims to sell at cost but uses a lighter weight. Profit% = (error / true weight) × 100. E.g. 900 g for 1 kg -> profit = 100/900 = 11.11%.
8. TWO ITEMS SAME SP: if one sold at x% profit and other at x% loss, net is always a LOSS of x²/100 %.
9. POPULATION/VALUE: same formulas — a 20% rise then 20% fall leaves the value LOWER by 4%.`,
    codeExamples: [
      {
        lang: "text",
        code: `# CP = 200, profit = 15% -> SP?
SP = 200 * (1 + 15/100) = 200 * 1.15 = 230

# SP = 460, profit = 15% -> CP?
CP = 460 * 100 / (100 + 15) = 46000 / 115 = 400

# Marked price 500, discount 10% -> SP
SP = 500 * (1 - 10/100) = 450

# Successive: +20% then -20%
factor = 1.2 * 0.8 = 0.96 -> net -4% (never cancels!)

# Two items same SP, one at 20% profit, one at 20% loss
net = -(20*20)/100 = -4% (always a loss)

# Dishonest shopkeeper: sells 900 g as 1 kg at cost price
profit% = (100 / 900) * 100 = 11.11%

# A value rises 25% then falls by what % to return to original?
fall needed = (25 / (100+25)) * 100 = 20%`,
        output: `(worked solutions)`,
        note: "Profit/Loss % always on CP. Successive % multiply (1±p/100). +x then -x never cancels — net is -x²/100%. Same-SP opposite-% trades always lose x²/100%."
      }
    ],
    marginNotes: [
      "Profit/Loss % is ALWAYS on the COST PRICE, not the selling price. Profit% = (profit/CP)×100.",
      "Successive percentages MULTIPLY, they don't add. +20% then -20% = 1.2×0.8 = 0.96, a 4% LOSS — never cancels.",
      "Two items sold at the SAME SP, one at x% profit and one at x% loss -> net is always a LOSS of x²/100 %.",
      "Dishonest shopkeeper (sells at cost but cheats on weight): profit% = (cheat weight / true weight) × 100. 900 g for 1 kg = 100/900 = 11.11%."
    ],
    commonMistakes: [
      "Computing profit % on SP instead of CP.",
      "Adding successive percentages (20% + 20% = 40%) instead of multiplying (1.2×1.2 = 44%).",
      "Thinking +x% then -x% cancels out — it always loses x²/100 %."
    ],
    relatedTopics: ["Aptitude Basics", "Ratio & Proportion", "Speed, Time & Work"],
    externalLinks: [
      { label: "Profit & Loss (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/profit-loss/" }
    ],
    mcqs: [
      {
        question: "An item costs 200 and is sold at 15% profit. Selling price?",
        options: ["215", "230 (CP × 1.15)", "300", "185"],
        answer: 1,
        explanations: ["That's +15, not +15%.", "Correct — SP = CP × (1 + profit%/100) = 200 × 1.15 = 230.", "Too high.", "That's a loss."],
        difficulty: "easy"
      },
      {
        question: "A price rises 20% then falls 20%. Net change?",
        options: ["0% (it cancels)", "4% loss (1.2 × 0.8 = 0.96)", "4% gain", "40% gain"],
        answer: 1,
        explanations: ["It never cancels.", "Correct — successive % multiply: 1.2 × 0.8 = 0.96, a 4% net loss. +x% then -x% always loses x²/100 = 4%.", "It's a loss, not a gain.", "They don't add."],
        difficulty: "medium"
      },
      {
        question: "A shopkeeper sells 900 g as 1 kg at cost price. Profit %?",
        options: ["10%", "11.11% (cheat/true = 100/900)", "11.11% loss", "1.11%"],
        answer: 1,
        explanations: ["Close but wrong.", "Correct — profit% = (cheat weight / true weight) × 100 = 100/900 × 100 = 11.11%. He gives 900 g but charges for 1000 g.", "It's a profit, not loss.", "Too low."],
        difficulty: "hard"
      }
    ]
  }
];