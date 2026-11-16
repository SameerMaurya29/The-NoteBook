import {Link} from 'react-router-dom';
import {subjectResourcesHref} from '@/lib/resourceShelf';
export default function SubjectResourceLink({subject}) {
 return <Link className="inline-block underline underline-offset-4 min-h-[44px] py-3 text-sm text-brown hover:text-ink" to={subjectResourcesHref(subject)}>Books, courses & external practice for this subject →</Link>;
}
