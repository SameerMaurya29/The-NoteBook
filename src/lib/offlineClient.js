/// <reference types="vite/client" />
let registration=null;
export async function registerOffline(){
 if(typeof navigator==='undefined'||!('serviceWorker' in navigator)||!import.meta.env.PROD)return null;
 if(!registration)registration=navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).catch(error=>{registration=null;throw error;});
 return registration;
}
export async function offlineAction(type,extra={}){
 const registration=await registerOffline();if(!registration)throw Error('Offline saving is available in the production build on HTTPS or localhost.');
 const ready=await navigator.serviceWorker.ready,worker=navigator.serviceWorker.controller||ready.active;if(!worker)throw Error('Offline worker is not ready; reload and try again.');
 return new Promise((resolve,reject)=>{const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();reject(Error('Offline action timed out. Storage or the network may be unavailable.'));},120000);channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();if(event.data.ok)resolve(event.data);else reject(Error(event.data.error));};worker.postMessage({type,...extra},[channel.port2]);});
}
export async function waitingUpdate(){return (await registerOffline())?.waiting||null;}
export async function acceptUpdate(){const worker=await waitingUpdate();if(!worker)throw Error('No waiting update');worker.postMessage({type:'ACTIVATE_UPDATE'});}
