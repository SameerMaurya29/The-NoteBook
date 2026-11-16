/** A deliberately small recognizer, not a general code analyzer or parser.
 * Only scalar statements and explicit n-bound/halving loop templates are supported.
 * Unit-cost scalar arithmetic and O(1) indexed input reads are assumptions.
 */
const UNKNOWN = 'Cannot determine';
const max = (a,b) => a[0]>b[0] || (a[0]===b[0] && a[1]>=b[1]) ? a : b;
function scalar(line, protectedNames) {
  const m = line.trim().replace(/;$/, '').match(/^(?:(?:const|let|var|int|long|double|float)\s+)?([A-Za-z_]\w*)\s*(\+=|-=|\*=|\/=|=)\s*(.+)$/);
  if (!m || protectedNames.includes(m[1])) throw Error('Unsupported statement or loop-bound mutation');
  // No calls, attributes, allocation, literals/containers or hidden operators.
  if (/\*\*/.test(m[3]) || !/^[\w\s+*/%\[\].-]+$/.test(m[3]) || /\b(new|await|yield|delete|true|false)\b|\.(?!\d)|\[\s*\]/.test(m[3])) throw Error('Unsupported expression or allocation');
  if (/[\[\]]/.test(m[3]) && !/^[A-Za-z_]\w*\s*\[\s*(?:\d+|[A-Za-z_]\w*)\s*\]$/.test(m[3])) throw Error('Only a single indexed read is supported');
  return [0,0];
}
function braceProgram(source, protectedNames=['n']) {
  let rest=source.trim(),cost=[0,0];
  while(rest) {
    if(/^for\b/.test(rest)) {
      const loop=rest.match(/^for\s*\(\s*(?:(?:let|int|long|var)\s+)?(\w+)\s*=\s*(0|n)\s*;\s*\1\s*(<|>)\s*(n|1)\s*;\s*(.*?)\s*\)\s*\{/);
      if(!loop) throw Error('Unsupported loop header');
      const [,v,start,op,bound,update]=loop;
      if(protectedNames.includes(v)) throw Error('Loop variable shadows an input or outer counter');
      const linear=start==='0'&&op==='<'&&bound==='n'&&(update===`${v}++`||update===`++${v}`);
      const log=start==='n'&&op==='>'&&bound==='1'&&new RegExp(`^${v}\\s*/=\\s*2$`).test(update);
      if(!linear&&!log) throw Error('Only independent n-bound or halving loops supported');
      let depth=1,end=loop[0].length;
      for(;end<rest.length&&depth;end++) {if(rest[end]==='{')depth++;if(rest[end]==='}')depth--;}
      if(depth) throw Error('Unbalanced braces');
      const inner=braceProgram(rest.slice(loop[0].length,end-1),[...protectedNames,v]);
      cost=max(cost,[inner[0]+(linear?1:0),inner[1]+(log?1:0)]);rest=rest.slice(end).trim();
    } else {
      const end=rest.indexOf(';');if(end<0)throw Error('Scalar statements need a semicolon');
      scalar(rest.slice(0,end),protectedNames);rest=rest.slice(end+1).trim();
    }
  }
  return cost;
}
function pythonProgram(source) {
  const lines=source.split('\n').filter(l=>l.trim());
  function block(start,indent,protectedNames) {
    let i=start,cost=[0,0];
    while(i<lines.length) {
      const line=lines[i],spaces=line.length-line.trimStart().length;
      if(spaces<indent) break;if(spaces!==indent)throw Error('Unsupported indentation');
      const match=line.trim().match(/^for ([A-Za-z_]\w*) in range\(n\):$/);
      if(match) {
        if(protectedNames.includes(match[1]) || !lines[i+1])throw Error('Invalid loop variable/body');
        const childIndent=lines[i+1].length-lines[i+1].trimStart().length;
        if(childIndent<=indent)throw Error('Missing loop body');
        const child=block(i+1,childIndent,[...protectedNames,match[1]]);
        cost=max(cost,[child.cost[0]+1,child.cost[1]]);i=child.end;
      } else {scalar(line,protectedNames);i++;}
    }
    return {end:i,cost};
  }
  return block(0,0,['n']).cost;
}
function notation(cost) {
  const [power,logs]=cost;
  const parts=[];if(power)parts.push(power===1?'n':`n^${power}`);if(logs)parts.push(logs===1?'log n':`(log n)^${logs}`);
  return `O(${parts.join(' ')||'1'})`;
}
export function analyzeComplexity(code) {
  if(!code.trim())return {timeComplexity:'—',spaceComplexity:'—',patterns:[]};
  try {
    const source=(/[;{}]/.test(code) ? code.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g,'') : code.replace(/#[^\n]*/g,'')).trim();
    if(!source || /["'`\t]/.test(source))throw Error('Strings, tabs or empty/comment-only snippets unsupported');
    const python=/^for \w+ in range\(n\):/m.test(source) || !source.includes(';');
    const cost=python?pythonProgram(source):braceProgram(source);
    return {timeComplexity:notation(cost),spaceComplexity:'O(1)',patterns:[
      'Recognized only scalar statements, indexed input reads and supported loop templates; sequential costs take the maximum, nested costs multiply.',
      'Assumes n is a non-negative integer, input is already allocated, primitive arithmetic/indexing costs O(1), and n/loop counters are not modified by the body. Space excludes input.'
    ]};
  } catch(error) {
    return {timeComplexity:UNKNOWN,spaceComplexity:UNKNOWN,patterns:[
      'Unsupported syntax: functions/recursion, while loops, calls/sorts, containers/allocations, branches and data-dependent bounds require manual analysis.',
      'Binary search needs a proven shrinking interval; merge sort needs its recurrence and merge cost; Fibonacci depends on memoization. No exact bound is inferred from keywords.'
    ]};
  }
}
