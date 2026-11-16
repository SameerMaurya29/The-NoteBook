import test from 'node:test';import assert from 'node:assert/strict';
import {resources,RESOURCE_KINDS,RESOURCE_SUBJECTS} from '../src/content/resources.js';
import {filterResources,shelfFilters,subjectResourcesHref,groupBySubject,subjectCounts,SUBJECT_ORDER} from '../src/lib/resourceShelf.js';
const added=resources.filter(r=>r.origin==='Added from your list');
test('all 29 supplied destinations have a single catalog record; 31 existing links retained',()=>{
 assert.equal(added.length,29);assert.equal(resources.filter(r=>r.status==='existing').length,30);assert.equal(resources.length,76);
 assert.equal(new Set(resources.map(r=>r.id)).size,76);assert.equal(new Set(resources.map(r=>r.url)).size,76);
 const expected=['github.com/ashishps1/awesome-behavioral-interviews','github.com/ashishps1/awesome-system-design-resources','karadev.net/uroci/filespdf/files/head-first-c-o-reilly-david-grifffiths-dawn-griffiths.pdf','ocw.mit.edu/','learn-anything.xyz/','books.goalkicker.com/','exercism.org/','it-tools.tech/','www.cse.iitd.ac.in/~srsarangi/archbook/archbook.pdf','ebookfoundation.github.io/free-programming-books-search/','courses.csail.mit.edu/6.042/spring18/mcs.pdf','dpvipracollege.in/wp-content/uploads/2023/01/Data-Structures-and-Algorithms-Narasimha-Karumanchi.pdf','www.indiabix.com/','quickref.me/','overapi.com/','welib.st/','www.codewars.com/','www.theodinproject.com/','sqlzoo.net/wiki/SQL_Tutorial','coddy.tech/journeys/html/fundamentals','circuitverse.org/','www.freecodecamp.org/','www.mindluster.com/','www.codedex.io/','flexboxfroggy.com/','cssgridgarden.com/','play.elevatorsaga.com/','www.codingame.com/','codecombat.com/'];
 for(const url of expected)assert.equal(added.filter(r=>[r.url,r.originalUrl].includes('https://'+url)).length,1,url);
});
test('catalog metadata has valid subjects, purposes, safe URLs and honest review states',()=>{
 for(const r of resources){assert.ok(r.title&&r.description&&r.access);assert.ok(Object.hasOwn(RESOURCE_KINDS,r.kind));assert.ok(r.subjects.length);assert.ok(r.subjects.every(s=>Object.hasOwn(RESOURCE_SUBJECTS,s)));assert.ok(['checked','limited','existing'].includes(r.status));for(const key of ['url','originalUrl','evidenceUrl'])if(r[key]){const u=new URL(r[key]);assert.equal(u.protocol,'https:');assert.equal(u.username,'');assert.equal(u.password,'');}if(r.status==='checked')assert.ok(['2026-11-13','2026-11-16'].includes(r.verifiedAt));if(r.status==='limited')assert.ok(r.caution);}
});
test('filter combinations isolate relevant books, exercises and tools without mutation',()=>{
 const before=JSON.stringify(resources);
 assert.deepEqual(filterResources({subject:'css',kind:'practice'}).map(r=>r.id).filter(id=>['flexbox-froggy','grid-garden'].includes(id)),['flexbox-froggy','grid-garden']);
 assert.ok(filterResources({subject:'coa',kind:'tools'}).some(r=>r.id==='circuitverse'));
 assert.ok(filterResources({subject:'dbms',kind:'practice'}).some(r=>r.id==='sqlzoo'));
 assert.ok(filterResources({subject:'behavioral',kind:'interviews'}).some(r=>r.id==='behavioral'));
 assert.ok(filterResources({subject:'c',kind:'books'}).some(r=>r.id==='head-first-c'));
 assert.ok(filterResources({subject:'maths',kind:'books'}).some(r=>r.id==='mcs'));
 assert.equal(filterResources({query:'CSS FLEXBOX'})[0].id,'flexbox-froggy');assert.equal(filterResources({query:'  no-match-98623  '}).length,0);assert.equal(filterResources({query:'   '}).length,76);assert.equal(JSON.stringify(resources),before);
});
test('URL filters survive reload and reject invalid or inherited filter names',()=>{
 assert.deepEqual(shelfFilters(new URLSearchParams('subject=css&kind=practice&q=grid')),{subject:'css',kind:'practice',query:'grid'});
 for(const s of ['fake','__proto__','constructor','https://evil.test'])assert.deepEqual(shelfFilters(new URLSearchParams({subject:s,kind:s})),{subject:'all',kind:'all',query:''});
 assert.equal(shelfFilters(new URLSearchParams({q:'x'.repeat(400)})).query.length,200);
 for(const id of Object.keys(RESOURCE_SUBJECTS))assert.equal(subjectResourcesHref(id),'/resources?subject='+id);assert.equal(subjectResourcesHref('unknown'),'/resources');
});

test('four supplied book links resolve to three new records and the existing Karumanchi entry',()=>{
 const modern=resources.find(r=>r.id==='modern-c'),eloquent=resources.find(r=>r.id==='eloquent-javascript'),html=resources.find(r=>r.id==='html-css-duckett');
 assert.equal(modern.kind,'books');assert.deepEqual(modern.subjects,['c']);assert.match(modern.url,/hal-02383654v2\/file\/modernC\.pdf$/);assert.match(modern.access,/CC BY-NC-ND 4.0/);assert.match(modern.caution,/version v2/);
 assert.equal(eloquent.url,'https://eloquentjavascript.net/Eloquent_JavaScript.pdf');assert.deepEqual(eloquent.subjects,['js']);assert.match(eloquent.access,/CC BY-NC 3.0/);
 assert.deepEqual(html.subjects,['html','css']);assert.equal(html.url,'https://www.htmlandcssbook.com/');assert.match(html.originalUrl,/dcpehvpm/);assert.match(html.access,/Commercial/);assert.match(html.caution,/historical/);
 assert.equal(resources.filter(r=>r.id==='karumanchi').length,1);assert.equal(resources.filter(r=>(r.originalUrl||r.url).includes('Data-Structures-and-Algorithms-Narasimha-Karumanchi.pdf')).length,1);
 for(const [subject,id] of [['c','modern-c'],['js','eloquent-javascript'],['html','html-css-duckett'],['css','html-css-duckett']])assert.ok(filterResources({subject,kind:'books'}).some(r=>r.id===id));
});

test('third book batch: 13 new records plus the existing Silberschatz record updated, none linking to a file copy',()=>{
 const batch=resources.filter(r=>r.verifiedAt==='2026-11-16');
 assert.equal(batch.length,14);
 assert.equal(resources.filter(r=>r.id==='existing-dbms-0').length,1);
 for(const id of ['grokking-algorithms','fundamentals-database-systems','sql-cookbook','head-first-java','c-modern-approach','mano-computer-system-architecture','javascript-jquery-duckett','rosen-discrete-mathematics','strang-linear-algebra','no-bs-linear-algebra','head-first-statistics','naked-statistics','statistics-plain-english'])assert.ok(resources.some(r=>r.id===id),id);
 for(const r of batch){assert.ok(r.caution,r.id);assert.ok(!/\.pdf($|\?)/i.test(r.url),r.id+' must not link to a PDF copy');assert.ok(!JSON.stringify(r).includes('/Users/')&&!JSON.stringify(r).includes('Desktop'),r.id+' leaks a local path');}
 assert.ok(!resources.some(r=>/truth.without.apology|beyond good and evil|guest.talk/i.test(r.title)),'excluded titles stay off the shelf');
 assert.ok(filterResources({subject:'maths',kind:'books'}).length>=8);
});

test('personal PDF fields are safe local paths matching the record id, and excluded titles never get one',()=>{
 const withPdf=resources.filter(r=>r.pdf);
 assert.equal(withPdf.length,16);
 for(const r of withPdf)assert.equal(r.pdf,`/library/${r.id}.pdf`,r.id);
 assert.ok(!withPdf.some(r=>/truth|beyond good|guest/i.test(r.title)));
});

test('browse-first grouping: one section per resource, General last, counts match the filter',()=>{
 const books=filterResources({kind:'books'});const groups=groupBySubject(books);
 assert.equal(groups.reduce((n,g)=>n+g.items.length,0),books.length);
 assert.equal(new Set(groups.flatMap(g=>g.items.map(r=>r.id))).size,books.length);
 for(const g of groups)assert.ok(g.items.every(r=>r.subjects[0]===g.subject));
 assert.equal(SUBJECT_ORDER.at(-1),'general');assert.equal(SUBJECT_ORDER.length,Object.keys(RESOURCE_SUBJECTS).length);
 for(const {subject,count} of subjectCounts({kind:'books'}))assert.equal(count,filterResources({kind:'books',subject}).length,subject);
 assert.deepEqual(subjectCounts({kind:'books',query:'zzzz-none'}),[]);
});
