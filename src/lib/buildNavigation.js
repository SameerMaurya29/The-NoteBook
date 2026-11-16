import {osBuildUnits} from '../content/generated/catalog.js';
// Explicit route context survives reload/new tabs, without sticky global session state.
export function buildReferenceHref(subjectId, topicId, unitId) {
 const base=`/subject/${encodeURIComponent(subjectId)}/${encodeURIComponent(topicId)}`;
 if(!osBuildUnits.some(u=>u.id===unitId))return base;
 return `${base}?build=os&unit=${encodeURIComponent(unitId)}`;
}
export function getBuildContext(params) {
 if(params.get('build')!=='os')return null;
 const unit=osBuildUnits.find(u=>u.id===params.get('unit'));
 return unit?{...unit,to:`/build/os/${unit.id}#references`}:null;
}
