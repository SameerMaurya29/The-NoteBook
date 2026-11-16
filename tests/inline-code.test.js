import test from 'node:test';
import assert from 'node:assert/strict';
import { splitInlineCode } from '../src/lib/inlineCode.js';
test('paired backticks format code without changing source text', () => {
  assert.deepEqual(splitInlineCode('Use `main()` and `int x = 1;`.'), [
    { code: false, text: 'Use ' }, { code: true, text: 'main()' },
    { code: false, text: ' and ' }, { code: true, text: 'int x = 1;' }, { code: false, text: '.' }
  ]);
});
test('unpaired backticks, multiline and double delimiters remain literal', () => {
  for (const text of ['unpaired `text', '``literal``', '`line\nbreak`']) assert.deepEqual(splitInlineCode(text), [{ code: false, text }]);
});
test('markup is literal text and not interpreted as HTML', () => {
  assert.deepEqual(splitInlineCode('`<script>alert(1)</script>`'), [{ code: true, text: '<script>alert(1)</script>' }]);
});
