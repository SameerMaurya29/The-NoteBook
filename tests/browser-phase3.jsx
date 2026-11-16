// Dedicated test origin only: restores exactly the allowlisted fixture keys.
import React from 'react';import {createRoot} from 'react-dom/client';import {act} from 'react-dom/test-utils';
import {MemoryRouter,Routes,Route,useNavigate} from 'react-router-dom';
import ProgressData from '../src/pages/ProgressData';import LearningDataNotice from '../src/components/LearningDataNotice';
import QuizHub from '../src/pages/QuizHub';import QuizRunner from '../src/pages/QuizRunner';import Roadmap from '../src/pages/Roadmap';
import {useProgress} from '../src/lib/progress';import {LEARNING_KEYS,defaults,parseProgressFile} from '../src/lib/learningSchema';
import {exportProgress,backupKey,damagedKey} from '../src/lib/learningStorage';import {profileKey} from '../src/lib/profileStorage';
import {allMCQs} from '../src/content';import {ROADMAP} from '../src/content/roadmap';import '../src/index.css';
window.IS_REACT_ACT_ENVIRONMENT=true;
const host=document.querySelector('#root'),root=createRoot(host),checks=[];
const username='@guest',keys=[...LEARNING_KEYS.map(k=>profileKey(k,username)),backupKey(username),...LEARNING_KEYS.map(k=>damagedKey(username,k))],before=keys.map(k=>localStorage.getItem(k));
const originalAlert=window.alert,originalURL=URL.createObjectURL,originalClick=HTMLAnchorElement.prototype.click,originalSet=Storage.prototype.setItem;
const alerts=[],blobs=[];window.alert=text=>alerts.push(text);URL.createObjectURL=blob=>{blobs.push(blob);return originalURL(blob);};HTMLAnchorElement.prototype.click=function(){if(!this.download)originalClick.call(this);};
let navigate;function Controls(){navigate=useNavigate();return null;}
const check=(ok,label)=>{if(!ok)throw Error(label);checks.push(`PASS ${label}`);};
const button=text=>[...host.querySelectorAll('button')].find(b=>b.textContent.includes(text));
const click=async(el,detail=1)=>{if(!el)throw Error('Missing test button');await act(async()=>el.dispatchEvent(new MouseEvent('click',{bubbles:true,detail})));};
const render=async(path,element,route)=>{await act(async()=>root.render(<MemoryRouter key={path} initialEntries={[path]}><Controls/><Routes><Route path={route} element={element}/></Routes></MemoryRouter>));};
const go=async(path)=>{await act(async()=>navigate(path));};
const signal=()=>window.dispatchEvent(new CustomEvent('notebook-storage',{detail:null}));
const dataFile=data=>JSON.stringify({format:'notebook-progress',version:1,exportedAt:new Date().toISOString(),data});
const chooseFile=async(text,name='progress.json')=>{const input=host.querySelector('input[type=file]'),transfer=new DataTransfer();transfer.items.add(new File([text],name,{type:'application/json'}));Object.defineProperty(input,'files',{value:transfer.files,configurable:true});await act(async()=>{input.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(resolve=>setTimeout(resolve,20));});};
function Probe(){const {completed,toggle}=useProgress();return <><LearningDataNotice/><p>{Object.keys(completed).length} ticks</p><button onClick={()=>toggle('python:language-basics')}>Toggle test topic</button></>;}
const history=()=>JSON.parse(localStorage.getItem(profileKey('notebook:quizHistory',username))||'[]');
const answerButtons=()=>[...host.querySelectorAll('button')].filter(b=>/^[A-D]$/.test(b.querySelector('span')?.textContent.trim()||''));
const correctButton=()=>{
 const question=host.querySelector('p.text-lg')?.textContent;
 const record=allMCQs().find(q=>q.question===question);if(!record)throw Error('Question lookup failed: '+question);
 return answerButtons().find(b=>b.querySelectorAll('span')[1]?.textContent===record.options[record.answer]);
};
try{
 keys.forEach(k=>localStorage.removeItem(k));
 const original=defaults();original.completed={'python:language-basics':123};original.bookmarks=['python:language-basics'];original.sheets={'Array::Two Sum':456};
 LEARNING_KEYS.forEach((key,i)=>localStorage.setItem(profileKey(key,username),JSON.stringify(original[['completed','history','bookmarks','sheets'][i]])));
 await render('/progress',<ProgressData/>,'/progress');await click(button('Export progress'));
 check(blobs.length===1,'export download generated');const exported=await blobs[0].text();check(!/password|hash|session|username|tabula/.test(exported),'export omits credential and session fields');
 check(parseProgressFile(exported).data.completed['python:language-basics']===123,'export contains saved learning data');
 const incoming=defaults();incoming.completed={'java:language-basics':789};incoming.bookmarks=['java:language-basics'];
 await chooseFile(dataFile(incoming));check(host.textContent.includes('1 completed topics')&&host.textContent.includes('Destination: Guest'),'import preview shows counts and destination');
 await click(button('Apply merge import'));check(Object.keys(parseProgressFile(exportProgress(username)).data.completed).length===2,'merge import preserves existing topic ticks');
 check(host.textContent.includes('Pre-import backup saved'),'pre-import backup acknowledged');
 await click(button('Restore this backup'));check(exportProgress(username).includes('python:language-basics')&&!exportProgress(username).includes('java:language-basics'),'UI restore returns exact pre-import learning data');
 await chooseFile(dataFile(incoming));await act(async()=>{const select=host.querySelector('select');select.value='replace';select.dispatchEvent(new Event('change',{bubbles:true}));});
 await click(button('Apply replace import'));check(!exportProgress(username).includes('python:language-basics')&&exportProgress(username).includes('java:language-basics'),'explicit replace changes only learning fields');
 const beforeBad=exportProgress(username);await chooseFile('{broken');check(host.textContent.includes('not valid JSON')&&!button('Apply'),'malformed import rejected before apply');
 check(JSON.stringify(parseProgressFile(exportProgress(username)).data)===JSON.stringify(parseProgressFile(beforeBad).data),'malformed import leaves learning data unchanged');
 await chooseFile(dataFile(incoming).replace('"version":1','"version":99'));check(host.textContent.includes('Unsupported progress file'),'foreign version rejected');
 // Corruption is detected by the real hook, not silently overwritten.
 localStorage.setItem(profileKey('notebook:progress',username),'damaged raw');await render('/probe',<Probe/>,'/probe');
 check(host.textContent.includes('Learning data needs recovery'),'corruption notice visible');await click(button('Toggle test topic'));
 check(localStorage.getItem(profileKey('notebook:progress',username))==='damaged raw','normal study action cannot overwrite corrupt raw data');check(alerts.length>0,'blocked write is disclosed');
 await render('/progress',<ProgressData/>,'/progress');await click(button('Back up raw completed'));
 check(localStorage.getItem(profileKey('notebook:progress',username))==='{}','reset occurs only after backup');check(localStorage.getItem(damagedKey(username,'notebook:progress')).includes('damaged raw'),'first damaged raw value preserved');
 check(host.textContent.includes('Download preserved damaged completed copy'),'damaged-copy download remains discoverable');
 // Failed storage writes preserve existing values.
 await render('/probe',<Probe/>,'/probe');Storage.prototype.setItem=function(k,v){if(k===profileKey('notebook:progress',username))throw Error('quota fixture');return originalSet.call(this,k,v);};
 await click(button('Toggle test topic'));check(localStorage.getItem(profileKey('notebook:progress',username))==='{}','quota failure does not falsely save a tick');Storage.prototype.setItem=originalSet;
 await render('/quiz?subject=systemdesign&difficulty=hard',<QuizHub/>,'/quiz');
 check(host.textContent.includes('3 questions available'),'System Design hard pool size shown');
 check(host.textContent.includes('only 3 available'),'pool shortage explained before starting');
 check(host.querySelector('a[href^="/quiz/run"]').getAttribute('href').includes('count=3'),'start URL clamps count to three');
 check(host.textContent.includes('no deadline or auto-submit'),'stopwatch limits disclosed');
 localStorage.setItem(profileKey('notebook:quizHistory',username),'[]');
 await render('/quiz/run?subject=systemdesign&difficulty=hard&count=15&mode=practice',<QuizRunner/>,'/quiz/run');
 check(host.textContent.includes('This quiz contains 3'),'direct oversized quiz count clamped');
 for(let i=0;i<3;i++){
  const correct=correctButton();await act(async()=>{correct.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1}));correct.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:2}));});
  check(answerButtons().every(b=>b.disabled),`practice Q${i+1} locks answer exactly once`);
  const next=button(i===2?'See results':'Next question');await act(async()=>{next.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1}));next.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:2}));});
 }
 check(host.textContent.includes('3 of 3 correct'),'practice scoring is correct');check(history().length===1,'double finish records one attempt');check(host.querySelectorAll('li').length>=12,'result review includes every option explanation');
 await click(button('Retry'));check(host.textContent.includes('Q 1 / 3')&&!host.textContent.includes('result'),'retry starts fresh without page reload');check(history().length===1,'retry alone does not record a finish');
 await go('/quiz/run?subject=java&count=1&mode=timed');check(host.textContent.includes('Scored stopwatch'),'legacy timed URL uses honest stopwatch mode');
 const first=correctButton();await click(first);check(host.textContent.includes('1 of 1 correct'),'stopwatch finish scores correct answer');check(history().length===2,'stopwatch records one new attempt');
 await go('/quiz/run?subject=python&count=3&mode=stopwatch');
 await click(correctButton(),1);check(host.textContent.includes('Q 2 / 3'),'stopwatch advances exactly one question');
 await click(correctButton(),2);check(host.textContent.includes('Q 2 / 3'),'second click of native double-click does not answer next question');
 await click(correctButton(),1);await click(correctButton(),1);check(history().length===3,'multi-question stopwatch finishes once');
 await render('/roadmap',<Roadmap/>,'/roadmap');check(!/0\s*\/\s*0 milestones/.test(host.textContent),'roadmap has no empty milestone denominator');check(host.textContent.includes('Aptitude')&&host.textContent.includes('System Design'),'roadmap includes aptitude and system design');
 const allTicks=Object.fromEntries(ROADMAP.flatMap(p=>p.items.map(i=>[`${i.subjectId}:${i.topic}`,Date.now()])));localStorage.setItem(profileKey('notebook:progress',username),JSON.stringify(allTicks));await act(async()=>signal());
 check(ROADMAP.every(p=>host.textContent.includes(`${p.items.length} / ${p.items.length} milestones`)),'all phase milestones can be completed using learning progress');
 await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));for(let i=0;i<60&&host.scrollWidth>document.documentElement.clientWidth;i++)await new Promise(resolve=>requestAnimationFrame(resolve));
 check(host.scrollWidth<=document.documentElement.clientWidth,'roadmap fits viewport');
 document.querySelector('#results').textContent=checks.join('\n')+`\n${checks.length} checks passed`;
}catch(error){document.querySelector('#results').textContent=checks.join('\n')+'\nFAIL '+error.stack;}
finally{
 await act(async()=>root.unmount());Storage.prototype.setItem=originalSet;window.alert=originalAlert;URL.createObjectURL=originalURL;HTMLAnchorElement.prototype.click=originalClick;
 keys.forEach((k,i)=>before[i]===null?localStorage.removeItem(k):localStorage.setItem(k,before[i]));
}
