import test from 'node:test';import assert from 'node:assert/strict';
import {profileKey} from '../src/lib/profileStorage.js';
import {defaults,parseProgressFile,MAX_IMPORT_BYTES,LEARNING_KEYS} from '../src/lib/learningSchema.js';
import {exportProgress,importProgress,backupKey,restoreBackup,hasPendingImport} from '../src/lib/learningStorage.js';
export class MemoryStorage {map=new Map();getItem(k){return this.map.get(k)??null;}setItem(k,v){this.map.set(k,String(v));}removeItem(k){this.map.delete(k);}}
const file=(data=defaults())=>JSON.stringify({format:'notebook-progress',version:1,exportedAt:new Date().toISOString(),data});
test('export/import round trip includes learning fields only and isolates profiles',()=>{
 const s=new MemoryStorage();s.setItem('tabula_users','secret hashes');s.setItem('tabula_session','secret session');
 s.setItem(profileKey('notebook:progress','a'),'{"python:basics":123}');
 const text=exportProgress('a',s);assert.doesNotMatch(text,/secret|username|password|hash|session|tabula/);
 importProgress(text,'b','replace',s);assert.deepEqual(parseProgressFile(exportProgress('b',s)).data.completed,{'python:basics':123});
 assert.equal(s.getItem(profileKey('notebook:progress','a')),'{"python:basics":123}');
});
test('malformed, oversized, foreign-version and credential-bearing files are rejected without writes',()=>{
 const s=new MemoryStorage();
 for(const text of ['broken','x'.repeat(MAX_IMPORT_BYTES+1),file().replace('"version":1','"version":2'),file().replace('"data":','"password":"secret","data":'),file().replace('"completed":{}','"completed":{"__proto__":1}')]) {
  assert.throws(()=>importProgress(text,'a','merge',s));assert.equal(s.map.size,0);
 }
});
test('merge preserves higher timestamps, unions bookmarks, dedupes history, replace is explicit',()=>{
 const s=new MemoryStorage(),a=defaults(),b=defaults();a.completed={'python:x':100};a.bookmarks=['python:x'];b.completed={'python:x':50,'java:y':200};b.bookmarks=['python:x','java:y'];
 const record={id:'run-1',subjectId:'python',date:100,correct:1,total:1,mode:'practice'};a.history=[record];b.history=[record];
 importProgress(file(a),'a','replace',s);importProgress(file(b),'a','merge',s);
 const merged=parseProgressFile(exportProgress('a',s)).data;assert.equal(merged.completed['python:x'],100);assert.equal(merged.history.length,1);assert.equal(merged.bookmarks.length,2);
 restoreBackup('a',s);assert.deepEqual(parseProgressFile(exportProgress('a',s)).data,a);
 importProgress(file(b),'a','replace',s);assert.deepEqual(parseProgressFile(exportProgress('a',s)).data,b);
});
test('backup write failure prevents any learning writes',()=>{
 const s=new MemoryStorage(),old=s.setItem.bind(s);s.setItem=(k,v)=>{if(k===backupKey('a'))throw Error('quota');old(k,v);};
 assert.throws(()=>importProgress(file(),'a','replace',s));assert.equal(s.map.size,0);
});
test('partial import rolls back; failed rollback keeps pending recovery and blocks new imports',()=>{
 const s=new MemoryStorage();importProgress(file(),'a','replace',s);const old=s.setItem.bind(s);let fail=true;
 s.setItem=(k,v)=>{if(k===profileKey(LEARNING_KEYS[1],'a')&&fail){fail=false;throw Error('one failure');}old(k,v);};
 assert.throws(()=>importProgress(file(),'a','replace',s),/previous learning data restored/);assert.equal(hasPendingImport('a',s),false);
 s.setItem=(k,v)=>{if(k===profileKey(LEARNING_KEYS[1],'a'))throw Error('persistent failure');old(k,v);};
 assert.throws(()=>importProgress(file(),'a','replace',s),/recovery backup retained/);assert.equal(hasPendingImport('a',s),true);
 assert.throws(()=>importProgress(file(),'a','merge',s),/pending import/);
 s.setItem=old;restoreBackup('a',s);assert.equal(hasPendingImport('a',s),false);
});
