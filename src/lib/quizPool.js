import {QUIZ_BANK} from '../content/generated/questions.js';
export function quizPool(subject,difficulty='all') {
 return QUIZ_BANK.filter(q=>(subject==='all'||q.subjectId===subject)&&(difficulty==='all'||q.difficulty===difficulty));
}
