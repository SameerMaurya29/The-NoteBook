import test from 'node:test';import assert from 'node:assert/strict';
import {profileKey,migrateLegacyProgress} from '../src/lib/profileStorage.js';
import {readLearningKey,readDamagedCopy,resetDamagedKey} from '../src/lib/learningStorage.js';
class Storage {map=new Map();getItem(k){return this.map.get(k)??null;}setItem(k,v){this.map.set(k,String(v));}removeItem(k){this.map.delete(k);}}
test('malformed and wrong-shape data are detected and preserved until explicit backed-up reset',()=>{
 const s=new Storage(),key='notebook:progress',target=profileKey(key,'a');
 for(const raw of ['broken','[]','null','{"python:x":true}']){s.setItem(target,raw);assert.ok(readLearningKey(key,'a',s).error);assert.equal(s.getItem(target),raw);}
 s.setItem(target,'first damaged');resetDamagedKey(key,'a',s);assert.equal(s.getItem(target),'{}');assert.match(readDamagedCopy('a',key,s),/first damaged/);
 s.setItem(target,'second damaged');resetDamagedKey(key,'a',s);assert.match(readDamagedCopy('a',key,s),/first damaged/);
});
test('disabled storage and quota errors do not silently reset data',()=>{
 const bad={getItem(){throw Error('disabled');},setItem(){throw Error('disabled');}};assert.ok(readLearningKey('notebook:progress','a',bad).error);assert.throws(()=>resetDamagedKey('notebook:progress','a',bad));
 const s=new Storage(),key=profileKey('notebook:progress','a');s.setItem(key,'broken');s.setItem=()=>{throw Error('quota');};assert.throws(()=>resetDamagedKey('notebook:progress','a',s));assert.equal(s.getItem(key),'broken');
});
test('migration validates all shapes before writes and retries interrupted copy without overwriting destinations',()=>{
 const s=new Storage();s.setItem('notebook:progress','{"python:x":123}');s.setItem('notebook:bookmarks','{}');assert.throws(()=>migrateLegacyProgress('a',s));assert.equal(s.getItem(profileKey('notebook:progress','a')),null);
 s.setItem('notebook:bookmarks','["python:x"]');const write=s.setItem.bind(s);let fail=true;s.setItem=(k,v)=>{if(k===profileKey('notebook:bookmarks','a')&&fail){fail=false;throw Error('interrupted');}write(k,v);};
 assert.throws(()=>migrateLegacyProgress('a',s));assert.equal(s.getItem('notebook:legacyOwner'),null);write(profileKey('notebook:progress','a'),'{"python:x":456}');
 migrateLegacyProgress('a',s);assert.equal(s.getItem(profileKey('notebook:progress','a')),'{"python:x":456}');assert.equal(s.getItem('notebook:progress'),'{"python:x":123}');assert.equal(s.getItem('notebook:legacyOwner'),'a');
});
test('wrong-shape recovery metadata is not trusted or exported',async()=>{
 const {backupKey,readBackup,hasPendingImport}=await import('../src/lib/learningStorage.js');const s=new Storage();
 s.setItem(backupKey('a'),JSON.stringify({version:1,status:'committed',createdAt:{unexpected:'object'},raw:[]}));assert.throws(()=>readBackup('a',s));assert.equal(hasPendingImport('a',s),true);
});
