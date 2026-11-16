import {useState,useEffect} from 'react';import {loadSubject,peekSubject} from './subjectLoader.js';
export function useSubject(id){
 const [state,setState]=useState(()=>({id,subject:peekSubject(id),loading:!peekSubject(id),error:''}));
 useEffect(()=>{let active=true;const existing=peekSubject(id);setState({id,subject:existing,loading:!existing,error:''});loadSubject(id).then(subject=>{if(active)setState({id,subject,loading:false,error:''});}).catch(()=>{if(active)setState({id,subject:null,loading:false,error:'This lesson is not available yet. Reconnect or open a saved subject; then reload to retry.'});});return()=>{active=false;};},[id]);
 return state.id===id?state:{subject:null,loading:true,error:''};
}
