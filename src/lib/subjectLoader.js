const loaders={
 java:()=>import('../content/java/index.js'),python:()=>import('../content/python/index.js'),c:()=>import('../content/c/index.js'),dsa:()=>import('../content/dsa/index.js'),os:()=>import('../content/os/index.js'),dbms:()=>import('../content/dbms/index.js'),networks:()=>import('../content/networks/index.js'),coa:()=>import('../content/coa/index.js'),html:()=>import('../content/html/index.js'),css:()=>import('../content/css/index.js'),js:()=>import('../content/js/index.js'),aptitude:()=>import('../content/aptitude/index.js'),systemdesign:()=>import('../content/systemdesign/index.js')
};
const loaded = new Map();
const pending = new Map();

export function loadSubject(id) {
  if (!Object.hasOwn(loaders, id)) return Promise.resolve(null);
  if (loaded.has(id)) return Promise.resolve(loaded.get(id));
  if (!pending.has(id)) {
    pending.set(id, loaders[id]().then(module => {
      loaded.set(id, module.default);
      return module.default;
    }).finally(() => pending.delete(id)));
  }
  return pending.get(id);
}

export function peekSubject(id) { return loaded.get(id) || null; }
export const subjectIds = Object.keys(loaders);
