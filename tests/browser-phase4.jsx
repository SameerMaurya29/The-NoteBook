// Pure visualizer/UI fixture: never reads/writes learning progress or auth.
import React from 'react';import {createRoot} from 'react-dom/client';import {act} from 'react-dom/test-utils';
import {MemoryRouter,Routes,Route,useNavigate} from 'react-router-dom';
import DSAVisualizer from '../src/pages/DSAVisualizer';import DSAIndex from '../src/pages/DSAIndex';
import {generators,visualizers} from '../src/lib/visualizers';import '../src/index.css';
window.IS_REACT_ACT_ENVIRONMENT=true;
const host=document.querySelector('#root'),root=createRoot(host),checks=[];
const check=(value,label)=>{if(!value)throw Error(label);checks.push(`PASS ${label}`);};
const button=label=>[...host.querySelectorAll('button')].find(b=>b.getAttribute('aria-label')===label||b.textContent.trim()===label);
const click=async el=>{if(!el)throw Error('Missing button');await act(async()=>el.click());};
const count=()=>host.querySelector('[data-testid=step-counter]')?.textContent.match(/\d+/g).map(Number);
const type=async(el,value)=>{await act(async()=>{Object.getOwnPropertyDescriptor(el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(el,value);el.dispatchEvent(new Event('input',{bubbles:true}));});};
const fit=async label=>{await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));for(let i=0;i<60&&host.scrollWidth>document.documentElement.clientWidth;i++)await new Promise(resolve=>requestAnimationFrame(resolve));check(host.scrollWidth<=document.documentElement.clientWidth,`${label} fits viewport`);};
let navigate;function Controls(){navigate=useNavigate();return null;}
const render=async path=>{await act(async()=>root.render(<MemoryRouter key={path} initialEntries={[path]}><Controls/><Routes><Route path="/dsa" element={<DSAIndex/>}/><Route path="/dsa/:viz" element={<DSAVisualizer/>}/></Routes></MemoryRouter>));};
const finish=async()=>{const n=count()[1];await act(async()=>{for(let i=0;i<n;i++)button('Step forward')?.click();});};
try{
 await render('/dsa');check(visualizers.every(v=>host.querySelector(`a[href="/dsa/${v.id}"]`)),'all 18 cards use own destination');check(!host.textContent.includes('coming soon'),'all implemented cards available');
 for(const [id,c] of Object.entries(generators)){
  await render(`/dsa/${id}`);const steps=c.gen(c.defaultInput,{target:c.defaultTarget??5});
  check(host.querySelector('h1').textContent===c.title,`${id} own route/title`);check(count()[0]===1&&count()[1]===steps.length,`${id} initial trace length`);check(button('Step back').disabled,`${id} back bounded at start`);
  check(Boolean(host.querySelector('[aria-live=polite]')?.textContent),`${id} accessible state description`);
  await click(button('Step forward'));check(count()[0]===2,`${id} forward`);await click(button('Step back'));check(count()[0]===1,`${id} back`);
  await click(button('Play'));check(Boolean(button('Pause')),`${id} play/pause toggle`);await click(button('Restart'));check(count()[0]===1&&button('Play'),`${id} restart pauses and resets`);
  await type(host.querySelector('input[type=range]'),'1500');await click(button('Play'));await act(async()=>new Promise(resolve=>setTimeout(resolve,180)));await click(button('Pause'));check(count()[0]>1,`${id} playback advances at changed speed`);
  await finish();check(button('Step forward').disabled&&button('Play').disabled,`${id} final controls bounded`);
  if(steps.at(-1).array.length)check([...host.querySelectorAll('[data-value]')].map(e=>Number(e.getAttribute('data-value'))).join(',')===steps.at(-1).array.join(','),`${id} displayed final array`);
  else check(host.querySelector('figure'),`${id} semantic state figure`);
  await fit(id);
  // Invalid input must keep prior valid trace, not crash or change data.
  host.querySelector('details').open=true;const before=count().join(',');await type(host.querySelector('textarea'),'not-json');await click(button('Apply input'));check(host.querySelector('[role=alert]')?.textContent.includes('Previous valid trace retained')&&count().join(',')===before,`${id} rejects malformed input without losing trace`);
  const empty=id==='dijkstra'?{nodes:0,edges:[],start:0}:['bfs','dfs'].includes(id)?{adj:[],start:0}:id==='recursion-fib'?0:id==='hashing'?{values:[],buckets:3}:id==='sliding-window'?{values:[],k:1}:[];
  await type(host.querySelector('textarea'),JSON.stringify(empty));if(c.hasTarget)await type(host.querySelector('input[type=number]'),'99');await click(button('Apply input'));check(!host.querySelector('[role=alert]')&&count()[0]===1,`${id} accepts empty/base fixture and resets`);await finish();check(button('Step forward').disabled,`${id} empty/base trace finishes`);
 }
 await render('/dsa/binary-search');host.querySelector('details').open=true;await type(host.querySelector('textarea'),'[3,1,2]');await click(button('Apply input'));check(host.querySelector('[role=alert]').textContent.includes('ascending'),'binary search enforces sorted input');
 await type(host.querySelector('textarea'),'[1,2,3]');await type(host.querySelector('input[type=number]'),'99');await click(button('Apply input'));await finish();check(host.querySelector('[role=status]').textContent.includes('absent'),'binary search absent target UI');
 await render('/dsa/dijkstra');host.querySelector('details').open=true;await type(host.querySelector('textarea'),JSON.stringify({nodes:2,edges:[[0,1,-1]],start:0}));await click(button('Apply input'));check(host.querySelector('[role=alert]').textContent.includes('non-negative'),'Dijkstra rejects negative weights in UI');
 await render('/dsa/selection-sort');host.querySelectorAll('details')[1].open=true;await click(button('Compare current input'));check(host.querySelector('[aria-label="Sort comparison"]').textContent.includes('Bubble Sort')&&host.querySelector('[aria-label="Sort comparison"]').textContent.includes('Selection Sort'),'sort comparison uses distinct models and same applied input');check(host.textContent.includes('not execution time')||host.textContent.includes('not treated as operation counts'),'comparison does not equate animation frames with speed');await fit('sort comparison');
 await act(async()=>navigate('/dsa/insertion-sort'));check(count()[0]===1,'route change resets trace state');
 await render('/dsa/not-real');check(host.querySelector('h1').textContent==='Visualizer not found'&&!button('Play'),'invalid route never falls back');
 document.querySelector('#results').textContent=checks.join('\n')+`\n${checks.length} checks passed`;
}catch(error){document.querySelector('#results').textContent=checks.join('\n')+'\nFAIL '+error.stack;}
finally{await act(async()=>root.unmount());}
