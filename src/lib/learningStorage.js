import {profileKey} from './profileStorage.js';
import {LEARNING_KEYS,FIELDS,defaults,validLearningValue,validateData,parseProgressFile,mergeData} from './learningSchema.js';
export const backupKey = username => profileKey('notebook:restoreBackup',username);
export function readLearningKey(key,username,storage=globalThis.localStorage) {
  try {
    const raw=storage.getItem(profileKey(key,username));
    if(raw===null)return {value:defaults()[FIELDS[LEARNING_KEYS.indexOf(key)]],raw,error:null};
    const value=JSON.parse(raw);
    if(!validLearningValue(key,value))throw Error('Stored learning data has an invalid shape');
    return {value,raw,error:null};
  }catch(error){return {value:defaults()[FIELDS[LEARNING_KEYS.indexOf(key)]],raw:null,error:error.message||'Storage unavailable'};}
}
export function readAllLearning(username,storage=globalThis.localStorage) {
  const data=defaults();
  LEARNING_KEYS.forEach((key,i)=>{const read=readLearningKey(key,username,storage);if(read.error)throw Error(`${FIELDS[i]}: ${read.error}. Recover before exporting or importing.`);data[FIELDS[i]]=read.value;});
  return data;
}
export function exportProgress(username,storage=globalThis.localStorage) {
  if(hasPendingImport(username,storage))throw Error('Recover interrupted import before exporting');
  return JSON.stringify({format:'notebook-progress',version:1,exportedAt:new Date().toISOString(),data:readAllLearning(username,storage)},null,2);
}
export function readBackup(username,storage=globalThis.localStorage) {
  const text=storage.getItem(backupKey(username));if(!text)return null;
  const b=JSON.parse(text);
  if(!b||Object.keys(b).some(k=>!['version','status','createdAt','raw'].includes(k))||typeof b.createdAt!=='string'||!Number.isFinite(Date.parse(b.createdAt))||b.version!==1||!['pending','committed','rolledback','recovery'].includes(b.status)||!Array.isArray(b.raw)||b.raw.length!==4||!b.raw.every((r,i)=>r&&Object.keys(r).every(k=>['key','value'].includes(k))&&r.key===LEARNING_KEYS[i]&&(r.value===null||typeof r.value==='string')))throw Error('Recovery backup is unreadable; preserve browser data');
  return b;
}
export function hasPendingImport(username,storage=globalThis.localStorage) {
  try{return readBackup(username,storage)?.status==='pending';}catch{return true;}
}
function snapshot(username,storage) {return LEARNING_KEYS.map(key=>({key,value:storage.getItem(profileKey(key,username))}));}
function restoreRaw(username,raw,storage) {
  for(const {key,value} of raw) {const target=profileKey(key,username);if(value===null)storage.removeItem(target);else storage.setItem(target,value);}
}
export function restoreBackup(username,storage=globalThis.localStorage) {
  const b=readBackup(username,storage);if(!b)throw Error('No recovery backup found');
  // Leave a pending marker until every write and final status update succeeds.
  storage.setItem(backupKey(username),JSON.stringify({...b,status:'pending'}));
  restoreRaw(username,b.raw,storage);
  storage.setItem(backupKey(username),JSON.stringify({...b,status:'rolledback'}));
}
export function importProgress(text,username,mode,storage=globalThis.localStorage) {
  if(!['merge','replace'].includes(mode))throw Error('Choose merge or replace');
  const incoming=parseProgressFile(text).data;
  if(hasPendingImport(username,storage))throw Error('Recover the pending import before another import');
  const current=readAllLearning(username,storage);
  const next=mode==='merge'?mergeData(current,incoming):validateData(incoming);
  const backup={version:1,status:'pending',createdAt:new Date().toISOString(),raw:snapshot(username,storage)};
  storage.setItem(backupKey(username),JSON.stringify(backup)); // must succeed before writes
  try {
    LEARNING_KEYS.forEach((key,i)=>storage.setItem(profileKey(key,username),JSON.stringify(next[FIELDS[i]])));
    storage.setItem(backupKey(username),JSON.stringify({...backup,status:'committed'}));
  }catch(error){
    try{restoreRaw(username,backup.raw,storage);storage.setItem(backupKey(username),JSON.stringify({...backup,status:'rolledback'}));}catch{throw Error('Import interrupted; recovery backup retained. Restore it before studying.');}
    throw Error('Import failed; previous learning data restored. Storage may be full or disabled.');
  }
  return next;
}
export const damagedKey = (username,key) => profileKey(`notebook:damagedBackup:${key}`,username);
export function readDamagedCopy(username,key,storage=globalThis.localStorage) {
  if(!LEARNING_KEYS.includes(key))throw Error('Not a learning-data key');
  return storage.getItem(damagedKey(username,key));
}
export function resetDamagedKey(key,username,storage=globalThis.localStorage) {
  if(!LEARNING_KEYS.includes(key))throw Error('Not a learning-data key');
  if(hasPendingImport(username,storage))throw Error('Recover pending import first');
  const backup={version:1,status:'recovery',createdAt:new Date().toISOString(),raw:snapshot(username,storage)};
  // Preserve the first damaged raw value for this field even across multiple resets.
  if(storage.getItem(damagedKey(username,key))===null) storage.setItem(damagedKey(username,key),JSON.stringify({key,raw:storage.getItem(profileKey(key,username)),createdAt:backup.createdAt}));
  storage.setItem(backupKey(username),JSON.stringify(backup));
  storage.setItem(profileKey(key,username),JSON.stringify(defaults()[FIELDS[LEARNING_KEYS.indexOf(key)]]));
}
