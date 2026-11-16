/**
 * Shuffle an MCQ's options (and the matching per-option explanations),
 * remapping the `answer` index to the option's new position.
 *
 * The stored content keeps the correct answer at a fixed index, so without
 * this the correct option always lands on the same letter. Shuffling once
 * per render keeps the answer position unpredictable while preserving the
 * link between each option and its explanation.
 */
export function shuffleMCQ(mcq) {
  const tagged = mcq.options.map((text, i) => ({
    text,
    exp: mcq.explanations[i],
    correct: i === mcq.answer,
  }));
  for (let i = tagged.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tagged[i], tagged[j]] = [tagged[j], tagged[i]];
  }
  return {
    ...mcq,
    options: tagged.map((o) => o.text),
    explanations: tagged.map((o) => o.exp),
    answer: tagged.findIndex((o) => o.correct),
  };
}