import {Link,useParams} from 'react-router-dom';
import {useSubject} from '@/lib/useSubject';
import NotePage from '@/components/NotePage';
export default function CurriculumPrint(){
 const {id}=useParams();const {subject,loading,error}=useSubject(id);
 if(loading)return <p role="status">Preparing the full lesson notebook…</p>;
 if(error)return <p role="alert">{error}</p>;
 if(!subject)return <p role="alert">Subject not found.</p>;
 return <div className="curriculum-print space-y-12"><div className="no-print space-y-3"><Link className="underline" to={id==='systemdesign'?'/system-design':`/subject/${id}`}>← Back to syllabus</Link><h1 className="text-3xl">{subject.name} · printable notebook</h1><p>All {subject.topics.length} lessons in the original notebook style. Choose A4 or Letter, check your preview and Save as PDF if desired. This is a multi-page document. External papers are linked rather than reproduced. No progress changes are made in this view.</p><button className="border px-4 py-3 min-h-[44px]" onClick={()=>window.print()}>Print / Save as PDF</button></div>{subject.topics.map(topic=><div className="print-lesson" key={topic.id}><NotePage subject={subject} topic={topic} completed={false} onToggleDone={()=>{}} onMCQAnswered={()=>{}} readOnly/></div>)}</div>;
}
