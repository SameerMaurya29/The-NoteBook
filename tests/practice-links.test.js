import test from 'node:test';import assert from 'node:assert/strict';
import {TOOLS,BY_LANG,practiceFor,practiceAll,normLang} from '../src/content/practiceLinks.js';
test('every practice tool is https, has no credentials and every language maps to a tool',()=>{
 for(const t of Object.values(TOOLS)){const u=new URL(t.url);assert.equal(u.protocol,'https:');assert.equal(u.username,'');assert.ok(t.label);}
 for(const k of Object.values(BY_LANG))assert.ok(TOOLS[k],k);
});
test('practiceFor picks the first runnable example and skips plain text',()=>{
 const p=practiceFor({codeExamples:[{lang:'text',code:'x'},{lang:'c',code:'int main(){}'}]});
 assert.equal(p.lang,'c');assert.equal(p.tool,TOOLS.gdbC);
 assert.equal(practiceFor({codeExamples:[{lang:'text',code:'x'}]}),null);
 assert.equal(practiceFor({codeExamples:[]}),null);assert.equal(practiceFor(undefined),null);
 assert.equal(practiceFor({codeExamples:[{variants:[{lang:'java',code:'class A{}'}]}]}).tool,TOOLS.gdbJava);
 assert.equal(practiceFor({codeExamples:[{lang:'python',code:'   '}]}),null);
});
test('bash is runnable, aliases normalise, and every runnable language in a lesson gets one row',()=>{
 assert.equal(practiceFor({codeExamples:[{lang:'bash',code:'ls'}]}).tool,TOOLS.oneBash);
 assert.equal(normLang('C++'),'cpp');assert.equal(normLang('js'),'javascript');assert.equal(normLang('sh'),'bash');
 const rows=practiceAll({codeExamples:[{lang:'text',code:'x'},{variants:[{lang:'cpp',code:'int a;'},{lang:'java',code:'int a;'}]},{lang:'java',code:'dup'},{lang:'bash',code:'ls'}]});
 assert.deepEqual(rows.map(r=>r.lang),['cpp','java','bash']);
 assert.equal(practiceAll({codeExamples:[{lang:'text',code:'only text'}]}).length,0);
});
