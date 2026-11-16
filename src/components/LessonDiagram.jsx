import { useId } from "react";

const DIAGRAMS = {
  "os:process-states": { title: "A process does not go straight from I/O to the CPU", caption: "I/O completion returns the process to Ready. The scheduler must dispatch it before it can run again.", type: "states" },
  "dbms:sql-joins": { title: "Follow the rows, not just the circles", caption: "Match students.id to grades.student_id. INNER keeps matches; LEFT also keeps unmatched students with NULL on the right. Multiple grades produce multiple result rows.", type: "joins" },
  "networks:tcp-connection": { title: "Three messages establish a TCP connection", caption: "These illustrative sequence numbers show that each SYN consumes one sequence number. The final ACK acknowledges the server’s SYN; it carries no application data here.", type: "tcp" },
  "coa:memory-hierarchy": { title: "Small and fast above; large and slower below", caption: "This is a conceptual hierarchy, not a scale drawing. Cache layout and latency vary by CPU. Storage is accessed through I/O, not as an automatic extra CPU cache level.", type: "memory" }
};
function Box({ x, y, label, detail = "", width = 120 }) {
  return <g><rect x={x} y={y} width={width} height="58" rx="5" fill="hsl(var(--paper-2))" stroke="hsl(var(--brown) / .5)" /><text x={x + width / 2} y={y + 24} textAnchor="middle" className="diagram-label">{label}</text>{detail && <text x={x + width / 2} y={y + 43} textAnchor="middle" className="diagram-detail">{detail}</text>}</g>;
}
function Arrow({ d, marker, label, x, y }) {
  return <g><path d={d} fill="none" stroke="hsl(var(--brown))" strokeWidth="1.5" markerEnd={`url(#${marker})`} />{label && <text x={x} y={y} textAnchor="middle" className="diagram-detail">{label}</text>}</g>;
}
function Drawing({ type, marker }) {
  if (type === "states") return <>
    <Box x={12} y={105} width={86} label="New" /><Box x={155} y={105} label="Ready" detail="waiting for CPU" /><Box x={355} y={105} label="Running" detail="on the CPU" /><Box x={355} y={270} label="Blocked" detail="waiting for I/O" /><Box x={535} y={105} width={108} label="Terminated" />
    <Arrow d="M98 134H150" marker={marker} label="admit" x={125} y={122} /><Arrow d="M275 125H350" marker={marker} label="dispatch" x={314} y={114} /><Arrow d="M355 151H280" marker={marker} label="preempt" x={316} y={174} /><Arrow d="M475 134H530" marker={marker} label="exit" x={503} y={122} /><Arrow d="M415 163V265" marker={marker} label="I/O request" x={470} y={220} /><Arrow d="M355 299H215V168" marker={marker} label="I/O complete" x={269} y={286} />
  </>;
  if (type === "tcp") return <>
    <Box x={45} y={15} label="Client" /><Box x={475} y={15} label="Server" />
    <path d="M105 80V333M535 80V333" stroke="hsl(var(--brown) / .4)" strokeDasharray="5 5" />
    <Arrow d="M105 105L535 145" marker={marker} label="1 · SYN — seq = 100" x={320} y={108} /><Arrow d="M535 190L105 230" marker={marker} label="2 · SYN + ACK — seq = 500, ack = 101" x={320} y={185} /><Arrow d="M105 270L535 310" marker={marker} label="3 · ACK — seq = 101, ack = 501" x={320} y={269} />
    <text x={105} y={355} textAnchor="middle" className="diagram-detail">time flows down ↓</text><text x={535} y={355} textAnchor="middle" className="diagram-detail">connection established</text>
  </>;
  return <>
    {[['Registers',180],['L1 cache',230],['L2 cache',280],['L3 cache',330],['RAM',380],['SSD / HDD',430]].map(([label,width], i) => <g key={label}><rect x={(660-Number(width))/2} y={12+i*54} width={width} height="42" rx="4" fill={`hsl(var(--${i<4?'green':'brown'}) / ${0.16-i*0.015})`} stroke="hsl(var(--brown) / .35)" /><text x="330" y={39+i*54} textAnchor="middle" className="diagram-label">{label}</text></g>)}
    <Arrow d="M65 40V320" marker={marker} label="capacity grows" x={65} y={350} /><text x="570" y="100" textAnchor="middle" className="diagram-detail">lower latency</text><text x="570" y="300" textAnchor="middle" className="diagram-detail">higher latency</text>
    <path d="M120 279H540" stroke="hsl(var(--orange))" strokeDasharray="4 5" /><text x="571" y="279" className="diagram-detail" textAnchor="middle">I/O boundary</text>
  </>;
}
function Rows({ title, headers, rows }) {
  return <div className="min-w-0"><p className="font-hand text-xl text-brown mb-2">{title}</p><div className="overflow-x-auto"><table className="w-full text-sm border border-brown/30"><thead className="bg-paper-2"><tr>{headers.map(h => <th key={h} className="text-left px-3 py-2 font-medium text-brown">{h}</th>)}</tr></thead><tbody>{rows.map((row,i) => <tr key={i} className="border-t border-brown/20">{row.map((v,j) => <td key={j} className={`px-3 py-2 ${v==='NULL'?'text-orange-ink italic':'text-ink'}`}>{v}</td>)}</tr>)}</tbody></table></div></div>;
}
export default function LessonDiagram({ subjectId, topicId }) {
  const id = useId().replace(/:/g, "");
  const diagram = DIAGRAMS[`${subjectId}:${topicId}`];
  if (!diagram) return null;
  return <figure className="lesson-diagram my-7" aria-labelledby={`${id}-title`}>
    <div className="mb-4"><p className="font-hand text-xl text-brown">sketch it out</p><h2 id={`${id}-title`} className="text-lg font-semibold text-ink">{diagram.title}</h2></div>
    {diagram.type === 'joins' ? <div className="grid sm:grid-cols-2 gap-5">
      <Rows title="Students (left)" headers={['id','name']} rows={[[1,'Ada'],[2,'Lin']]} /><Rows title="Grades (right)" headers={['student_id','grade']} rows={[[1,'A'],[1,'B'],[3,'C']]} />
      <Rows title="INNER JOIN → matches only" headers={['name','grade']} rows={[["Ada","A"],["Ada","B"]]} /><Rows title="LEFT JOIN → keep every student" headers={['name','grade']} rows={[["Ada","A"],["Ada","B"],["Lin","NULL"]]} />
    </div> : <div className="overflow-x-auto"><svg viewBox="0 0 660 375" className="w-full min-w-[520px]" role="img" aria-labelledby={`${id}-svgtitle ${id}-desc`}><title id={`${id}-svgtitle`}>{diagram.title}</title><desc id={`${id}-desc`}>{diagram.caption}</desc><defs><marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" fill="hsl(var(--brown))" /></marker></defs><Drawing type={diagram.type} marker={id} /></svg></div>}
    <figcaption className="mt-4 text-sm text-brown leading-relaxed border-t border-brown/20 pt-3">{diagram.caption}</figcaption>
  </figure>;
}
