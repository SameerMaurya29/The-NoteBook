// Educational single-level table, not Sv39: no TLB, demand paging, COW,
// accessed/dirty bits, superpages, concurrency, or real kernel execution.
export const PAGE_SIZE = 4096;
export const PAGE_COUNT = 4;
export const FRAME_COUNT = 8;
export const CHALLENGE_KEY = 'challenge:os:vm-page-table:v1';
export const outcomes = Object.freeze({
  success: 'Access succeeds', invalid: 'Invalid input', unmapped: 'Page is unmapped',
  supervisor: 'Kernel-only page rejects user access', read: 'Read permission denied', write: 'Write permission denied',
});
const entry = (frame, user, read, write) => Object.freeze({frame, user, read, write});
const table = Object.freeze([entry(2,true,true,false), null, entry(5,false,true,true), entry(7,true,true,true)]);
export const scenarios = Object.freeze([
  {id:'read', title:'Read a user page', address:42, access:'read', table, expected:'success', repair:'keep', target:'success', policy:'This user page is readable. Keep its permissions unchanged.'},
  {id:'write', title:'Write a writable user buffer', address:80, access:'write', table, expected:'write', repair:'grant-write', target:'success', policy:'The process owns this buffer. Policy permits enabling write on page 0 only.'},
  {id:'missing', title:'Map an allocated user buffer', address:PAGE_SIZE+17, access:'read', table, expected:'unmapped', repair:'map-buffer', target:'success', policy:'Page 1 is an allocated user buffer. Map it to the reserved frame 3 with read/write permission.'},
  {id:'kernel', title:'Protect the kernel page', address:PAGE_SIZE*2+9, access:'read', table, expected:'supervisor', repair:'keep', target:'supervisor', policy:'Page 2 belongs to the kernel. Reject the user request; do not expose kernel memory.'},
].map(s=>Object.freeze(s)));
export function translate(address, access, pages) {
  const trace = [];
  const result = (code, physical = null) => ({code, physical, trace:[...trace, outcomes[code]]});
  if (!Number.isSafeInteger(address) || address<0 || address>=PAGE_SIZE*PAGE_COUNT || !['read','write'].includes(access) || !Array.isArray(pages) || pages.length!==PAGE_COUNT || !pages.every(p=>p===null || (p && Number.isSafeInteger(p.frame) && p.frame>=0 && p.frame<FRAME_COUNT && ['user','read','write'].every(k=>typeof p[k]==='boolean')))) return result('invalid');
  const vpn=Math.floor(address/PAGE_SIZE), offset=address%PAGE_SIZE;
  trace.push(`User-mode ${access} at virtual address ${address}.`, `Virtual page ${vpn}; offset ${offset} (${address} = ${vpn} × ${PAGE_SIZE} + ${offset}).`);
  const p=pages[vpn];
  if(!p) return result('unmapped');
  trace.push(`Page ${vpn} maps to frame ${p.frame}.`);
  if(!p.user) return result('supervisor');
  trace.push('User permission allowed.');
  if(!p[access]) return result(access);
  trace.push(`${access === 'read'?'Read':'Write'} permission allowed.`, `Physical address = ${p.frame} × ${PAGE_SIZE} + ${offset} = ${p.frame*PAGE_SIZE+offset}.`);
  return result('success',p.frame*PAGE_SIZE+offset);
}
export function repairScenario(scenario, action) {
  // Accept only the original immutable fixtures, never a caller-supplied policy.
  if(!scenarios.includes(scenario) || action!==scenario.repair) return {ok:false, error:'Not permitted by this scenario’s policy. Keep kernel pages private and change only the designated user buffer.'};
  const pages=scenario.table.map(p=>p?{...p}:null);
  if(action==='grant-write') pages[0].write=true;
  if(action==='map-buffer') pages[1]={frame:3,user:true,read:true,write:true};
  return {ok:true, pages, result:translate(scenario.address,scenario.access,pages)};
}
export function passedCase(scenario, prediction, action) {
  const fixed=repairScenario(scenario,action);
  return prediction===scenario.expected && fixed.ok && fixed.result.code===scenario.target;
}
export const challengePassed = completed => Number.isSafeInteger(completed?.[CHALLENGE_KEY]) && completed[CHALLENGE_KEY]>0;
