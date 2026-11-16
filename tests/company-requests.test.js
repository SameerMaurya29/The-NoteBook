import test from 'node:test';
import assert from 'node:assert/strict';
import { createLatestRequest } from '../src/lib/latestRequest.js';
function deferred() { let resolve, reject; const promise = new Promise((a,b) => {resolve=a;reject=b;}); return {promise,resolve,reject}; }
for (const oldError of [false,true]) test(`latest request ignores delayed A ${oldError?'error':'success'} after B`, async () => {
  const request=createLatestRequest(), a=deferred(), b=deferred(), published=[]; let signal;
  const old=request.run(s => {signal=s;return a.promise;}, x=>published.push(x), e=>published.push(e.message));
  const next=request.run(()=>b.promise, x=>published.push(x), e=>published.push(e.message));
  assert.equal(signal.aborted,true); b.resolve('B'); await next;
  if(oldError) a.reject(new Error('old A failure')); else a.resolve('A'); await old;
  assert.deepEqual(published,['B']);
});
test('unmount cancellation suppresses late results and current errors are shown',async()=>{
 const request=createLatestRequest(), a=deferred(), out=[];
 const pending=request.run(()=>a.promise,x=>out.push(x),e=>out.push(e.message));request.cancel();a.resolve('A');await pending;assert.deepEqual(out,[]);
 await request.run(()=>Promise.reject(new Error('current error')),x=>out.push(x),e=>out.push(e.message));assert.deepEqual(out,['current error']);
});
