import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { shuffleMCQ } from '../src/lib/mcq.js';
import { visualizers, generators, getVisualizer } from '../src/lib/visualizers.js';
const result = await build({ entryPoints: ['src/content/index.js'], bundle: true, write: false, format: 'esm', platform: 'node' });
const { subjects, findTopic, allMCQs } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
const levels = new Set(['easy', 'medium', 'hard']);
test('every subject/topic identity is unique and independently reachable', () => {
  assert.equal(new Set(subjects.map(s => s.id)).size, subjects.length);
  for (const s of subjects) {
    assert.equal(new Set(s.topics.map(t => t.id)).size, s.topics.length, s.id);
    for (const t of s.topics) assert.equal(findTopic(s.id, t.id), t);
  }
  // Migration policy: keep the original reachable lesson and its stored key.
  assert.equal(findTopic('python', 'operators-and-expressions').title, 'Operators & Expressions');
  assert.equal(findTopic('python', 'operators-and-expressions-practice').title, 'Operators & Expressions — Practice');
});
test('lessons have required content, valid difficulty, safe documentation URLs', () => {
  for (const s of subjects) for (const t of s.topics) {
    const label = `${s.id}:${t.id}`;
    for (const field of ['id','title','definition','coreUnderstanding','howItWorks']) assert.ok(typeof t[field] === 'string' && t[field].trim(), `${label} ${field}`);
    assert.ok(levels.has(t.difficulty), label);
    for (const field of ['codeExamples','marginNotes','commonMistakes','relatedTopics','externalLinks','mcqs']) assert.ok(Array.isArray(t[field]) && t[field].length, `${label} ${field}`);
    for (const link of t.externalLinks) assert.ok(['http:', 'https:'].includes(new URL(link.url).protocol), label);
  }
});
test('all MCQs are aligned and shuffles preserve correct answers/explanations', () => {
  for (const q of allMCQs()) {
    assert.ok(q.question.trim()); assert.ok(levels.has(q.difficulty));
    assert.ok(q.options.length >= 2); assert.equal(q.options.length, q.explanations.length);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length);
    for (const text of [...q.options, ...q.explanations]) assert.ok(typeof text === 'string' && text.trim());
    for (let i = 0; i < 20; i++) {
      const shuffled = shuffleMCQ(q);
      assert.equal(shuffled.options[shuffled.answer], q.options[q.answer]);
      assert.equal(shuffled.explanations[shuffled.answer], q.explanations[q.answer]);
      assert.deepEqual(shuffled.options.map((text,j) => [text,shuffled.explanations[j]]).sort(), q.options.map((text,j) => [text,q.explanations[j]]).sort());
    }
  }
});
test('all 18 visualizer routes distinguish implemented, planned, and invalid', () => {
  assert.equal(visualizers.length, 18);
  assert.equal(new Set(visualizers.map(v => v.id)).size, 18);
  for (const v of visualizers) { assert.equal(getVisualizer(v.id), v); assert.equal(typeof generators[v.id]?.gen, 'function'); }
  assert.equal(getVisualizer('not-real'), null); assert.equal(generators['not-real'], undefined);
});
test('Bubble Sort traces sort without mutating input, including edge cases', () => {
  for (const input of [[], [1], [3,1,2], [2,2,1], [1,2,3], [3,2,1]]) {
    const before = [...input]; const steps = generators['bubble-sort'].gen(input);
    assert.deepEqual(input, before);
    assert.deepEqual(steps.at(-1).array, [...input].sort((a,b) => a-b));
    assert.equal(steps.at(-1).done, true);
  }
});
