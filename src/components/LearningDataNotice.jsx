import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {getCurrentUser} from '@/lib/localAuth';
import {LEARNING_KEYS} from '@/lib/learningSchema';
import {readLearningKey,hasPendingImport} from '@/lib/learningStorage';
export default function LearningDataNotice() {
  const [,refresh]=useState(0);
  useEffect(()=>{const sync=()=>refresh(n=>n+1);window.addEventListener('storage',sync);window.addEventListener('notebook-storage',sync);return()=>{window.removeEventListener('storage',sync);window.removeEventListener('notebook-storage',sync);};},[]);
  const username=getCurrentUser()?.username||'@guest';
  const damaged=LEARNING_KEYS.some(key=>readLearningKey(key,username).error);
  if(!damaged&&!hasPendingImport(username))return null;
  return <aside role="alert" className="border border-destructive bg-paper-2 p-4 mb-5 text-ink">Learning data needs recovery. Saved data has not been replaced; changes are blocked for damaged data or an interrupted import. <Link to="/progress" className="underline">Open progress recovery</Link>. Do not clear browser storage.</aside>;
}
