import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { subjects as catalog, quizPoolSize } from '../src/content/generated/catalog.js';
import { QUIZ_BANK } from '../src/content/generated/questions.js';
import { searchTopics } from '../src/content/generated/search.js';
async function bundle(path) {
  const result = await build({entryPoints:[path],bundle:true,write:false,format:'esm',platform:'node'});
  return import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
}
const source = await bundle('src/content/index.js');
const loader = await bundle('src/lib/subjectLoader.js');
test('generated lightweight catalog preserves every lesson identity and quiz count', () => {
  assert.deepEqual(catalog.map(s=>s.id),source.subjects.map(s=>s.id));
  for(const subject of source.subjects) {
    const summary=catalog.find(s=>s.id===subject.id);
    assert.deepEqual(summary.topics,subject.topics.map(({id,title,difficulty})=>({id,title,difficulty})));
    assert.equal('definition' in summary.topics[0],false);
    for(const difficulty of ['all','easy','medium','hard']) {
      assert.equal(quizPoolSize(subject.id,difficulty),source.allMCQs().filter(q=>q.subjectId===subject.id&&(difficulty==='all'||q.difficulty===difficulty)).length);
    }
  }
  assert.equal(quizPoolSize('all'),source.allMCQs().length);
  assert.deepEqual(QUIZ_BANK,source.allMCQs());
});
test('deferred full-text search preserves original results', () => {
  for(const q of ['','  ','binary search','Python','dict','OOP','overflow','UNICODE','not-a-real-query-123'])assert.deepEqual(searchTopics(q),source.searchTopics(q));
});
test('subject loader rejects inherited property names and deduplicates concurrent requests', async () => {
  for(const id of ['unknown','toString','constructor','__proto__'])assert.equal(await loader.loadSubject(id),null);
  assert.equal(loader.peekSubject('java'),null);
  const first=loader.loadSubject('java'),second=loader.loadSubject('java');
  assert.equal(first,second);
  const subject=await first;
  assert.equal(subject.id,'java');assert.equal(loader.peekSubject('java'),subject);
  assert.equal(await loader.loadSubject('java'),subject);
});
test('all 13 lazy subject modules match source content',async () => {
  for(const id of loader.subjectIds)assert.deepEqual(await loader.loadSubject(id),source.getSubject(id));
});
