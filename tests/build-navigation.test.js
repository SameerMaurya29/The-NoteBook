import test from 'node:test';import assert from 'node:assert/strict';
import {buildReferenceHref,getBuildContext} from '../src/lib/buildNavigation.js';
test('OS references carry an explicit known unit and return to its reference section',()=>{
 const href=buildReferenceHref('c','pointers-basics','c-foundations');assert.equal(href,'/subject/c/pointers-basics?build=os&unit=c-foundations');const url=new URL(href,'https://example.test');const context=getBuildContext(url.searchParams);assert.equal(context.number,2);assert.equal(context.to,'/build/os/c-foundations#references');assert.match(context.title,/C for Systems/);
});
test('ordinary lessons and unrecognized contexts cannot acquire a stale or external return target',()=>{
 for(const params of ['','build=other&unit=boot','build=os&unit=missing','build=os&unit=https://evil.test','returnTo=https://evil.test'])assert.equal(getBuildContext(new URLSearchParams(params)),null);assert.equal(buildReferenceHref('c','pointers-basics','missing'),'/subject/c/pointers-basics');
});
test('explicit unit context survives URL roundtrip without relying on history or browser storage',()=>{
 const href=buildReferenceHref('os','system-calls','syscalls');const first=getBuildContext(new URL(href,'https://example.test').searchParams);const reopened=getBuildContext(new URLSearchParams(href.split('?')[1]));assert.deepEqual(first,reopened);assert.equal(reopened.to,'/build/os/syscalls#references');
});
