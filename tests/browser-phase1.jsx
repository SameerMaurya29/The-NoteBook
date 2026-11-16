// Open /tests/browser-phase1.html on a dedicated Vite test origin.
// Uses real routes/components and restores only the quiz-history key it writes.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import QuizHub from '../src/pages/QuizHub';
import Topic from '../src/pages/Topic';
import DSAVisualizer from '../src/pages/DSAVisualizer';
import MCQBlock from '../src/components/MCQBlock';
import { visualizers, generators } from '../src/lib/visualizers';
import { getCurrentUser } from '../src/lib/localAuth';
import { profileKey } from '../src/lib/profileStorage';
import '../src/index.css';
window.IS_REACT_ACT_ENVIRONMENT = true;
const host = document.querySelector('#root');
const root = createRoot(host);
const lines = [];
const check = (value, label) => { if (!value) throw new Error(label); lines.push(`PASS ${label}`); };
let navigate;
function Controls() { navigate = useNavigate(); return null; }
const settleLesson = async () => {
  for (let i=0; i<250 && host.textContent.includes('Opening lesson…'); i++) {
    await act(async () => new Promise(resolve => setTimeout(resolve, 20)));
  }
  if (host.textContent.includes('Opening lesson…')) throw new Error('Lesson load timed out');
};
const renderRoute = async (path, element, route) => {
  await act(async () => root.render(<MemoryRouter key={path} initialEntries={[path]}><Controls/><Routes><Route path={route} element={element}/></Routes></MemoryRouter>));
  await settleLesson();
};
const go = async (path) => { await act(async () => navigate(path)); await settleLesson(); };
const click = async (element) => { await act(async () => element.click()); await settleLesson(); };
const buttons = () => [...host.querySelectorAll('button')];
const historyKey = profileKey('notebook:quizHistory', getCurrentUser()?.username || '@guest');
const previousHistory = localStorage.getItem(historyKey);
try {
  await renderRoute('/quiz', <QuizHub/>, '/quiz');
  for (const subject of ['python', 'java']) {
    await click(host.querySelector(`a[href="/quiz?subject=${subject}"]`));
    check(host.querySelector('select').value === subject, `${subject} shortcut synchronizes selector`);
    check(host.querySelector('a[href^="/quiz/run"]').getAttribute('href').includes(`subject=${subject}`), `${subject} start destination`);
  }
  await go(-1); check(host.querySelector('select').value === 'python', 'quiz Back restores Python');
  await go(1); check(host.querySelector('select').value === 'java', 'quiz Forward restores Java');
  await act(async () => {
    const select = host.querySelector('select'); select.value = 'c'; select.dispatchEvent(new Event('change', {bubbles:true}));
  });
  check(host.querySelector('a[href^="/quiz/run"]').getAttribute('href').includes('subject=c'), 'selector updates start destination');
  await renderRoute('/subject/python/operators-and-expressions', <Topic/>, '/subject/:id/:topicId');
  const answerButtons = () => buttons().filter(b => /^[A-D]$/.test(b.querySelector('span')?.textContent.trim() || ''));
  check(answerButtons().length > 0, 'lesson questions rendered');
  await click(answerButtons()[0]); check(answerButtons().some(b => b.disabled), 'lesson answer revealed');
  const next = [...host.querySelectorAll('a')].find(a => a.getAttribute('href')?.startsWith('/subject/python/') && !a.textContent.includes('syllabus') && a.querySelector('.lucide-arrow-right'));
  check(Boolean(next), 'Next lesson link exists');
  await click(next); check(answerButtons().length > 0 && answerButtons().every(b => !b.disabled), 'Next lesson questions enabled/unanswered without reload');
  await click(answerButtons()[0]); await go(-1);
  check(answerButtons().every(b => !b.disabled), 'Back lesson questions reset');
  await go('/subject/java/variables-and-types');
  check(answerButtons().length > 0 && answerButtons().every(b => !b.disabled), 'cross-subject questions reset');
  const q = {question:'First?', options:['one','two'], answer:0, explanations:['yes','no'], difficulty:'easy'};
  await act(async () => root.render(<MCQBlock mcq={q} index={0}/>)); await click(buttons()[0]);
  await act(async () => root.render(<MCQBlock mcq={{...q,question:'Second?'}} index={0}/>));
  check(buttons().every(b => !b.disabled), 'reused MCQ resets on question prop change');
  for (const v of [...visualizers, {id:'invalid'}]) {
    await renderRoute(`/dsa/${v.id}`, <DSAVisualizer/>, '/dsa/:viz');
    check(host.querySelector('h1').textContent === (v.name || 'Visualizer not found'), `${v.id} route title`);
    if (!generators[v.id]) check(!buttons().length && !host.textContent.includes('Bubble Sort'), `${v.id} never runs Bubble Sort`);
    else check(Boolean(host.querySelector('[data-testid=step-counter]')), `${v.id} uses its registered player`);
  }
  await renderRoute('/dsa/bubble-sort', <DSAVisualizer/>, '/dsa/:viz');
  const forward = buttons().find(b => b.querySelector('.lucide-skip-forward'));
  check(Boolean(forward), 'Bubble Sort forward control'); await click(forward);
  check(/2\s*\/\s*\d+/.test(host.textContent), 'Bubble Sort advances a step');
  await document.fonts.ready;
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  for (let frame = 0; frame < 60 && host.scrollWidth > document.documentElement.clientWidth; frame++) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  check(host.scrollWidth <= document.documentElement.clientWidth, 'visualizer fits viewport without horizontal overflow');
  document.querySelector('#results').textContent = lines.join('\n') + `\n${lines.length} checks passed`;
  window.phase1Results = {passed:true,checks:lines};
} catch (error) {
  document.querySelector('#results').textContent = lines.join('\n') + '\nFAIL ' + error.stack;
  window.phase1Results = {passed:false,checks:lines,error:error.stack};
} finally {
  if (previousHistory === null) localStorage.removeItem(historyKey); else localStorage.setItem(historyKey, previousHistory);
}
