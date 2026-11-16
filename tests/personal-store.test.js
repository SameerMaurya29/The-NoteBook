import test from 'node:test';import assert from 'node:assert/strict';
import {readNotes,saveNote,readLast,saveLast,MAX_NOTE} from '../src/lib/personalStore.js';
const mem=()=>{const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)};};
test('notes are per profile, capped, and blank deletes',()=>{
 const s=mem();
 assert.ok(saveNote('a','c:pointers','hello',s));assert.equal(readNotes('a',s)['c:pointers'].text,'hello');assert.deepEqual(readNotes('b',s),{});
 saveNote('a','c:pointers','x'.repeat(MAX_NOTE+50),s);assert.equal(readNotes('a',s)['c:pointers'].text.length,MAX_NOTE);
 saveNote('a','c:pointers','   ',s);assert.deepEqual(readNotes('a',s),{});
 assert.equal(saveNote('a','__proto__','x',s),false);assert.equal(saveNote('a','','x',s),false);
});
test('corrupt or hostile storage never throws',()=>{
 const s=mem();s.setItem('notebook:profile:a:notebook:notes','{bad');assert.deepEqual(readNotes('a',s),{});
 s.setItem('notebook:profile:a:notebook:notes','[1]');assert.deepEqual(readNotes('a',s),{});
 s.setItem('notebook:profile:a:notebook:lastVisited','{"subjectId":1}');assert.equal(readLast('a',s),null);
 assert.equal(saveNote('a','k','v',{getItem(){return null},setItem(){throw Error('full')}}),false);
});
test('last visited round-trips per profile',()=>{
 const s=mem();assert.ok(saveLast('a','c','pointers',s));const l=readLast('a',s);assert.equal(l.subjectId,'c');assert.equal(l.topicId,'pointers');assert.equal(readLast('b',s),null);
 assert.equal(saveLast('a','','x',s),false);
});
