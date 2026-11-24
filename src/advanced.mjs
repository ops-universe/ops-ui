import React,{useEffect,useId,useRef,useState} from 'react';
const h=React.createElement;
export function searchEntries(entries,query){
 const terms=String(query).trim().toLowerCase().split(/\s+/).filter(Boolean);
 return entries.filter(entry=>terms.every(term=>[entry.title,entry.description,...(entry.keywords||[])].join(' ').toLowerCase().includes(term))).slice(0,20);
}
export function SearchDialog({entries=[],label='Search'}){
 const ref=useRef(null),input=useRef(null),trigger=useRef(null),previous=useRef(null);
 const [query,setQuery]=useState('');const id=useId();
 function open(){if(ref.current&&!ref.current.open){previous.current=document.activeElement;setQuery('');ref.current.showModal();input.current?.focus();}}
 useEffect(()=>{function onKey(e){if((e.metaKey||e.ctrlKey)&&!e.altKey&&e.key.toLowerCase()==='k'){e.preventDefault();open();}}document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey);},[]);
 const results=searchEntries(entries,query);
 return h(React.Fragment,null,h('button',{ref:trigger,type:'button',className:'ops-button ops-search-trigger',onClick:open,'aria-haspopup':'dialog'},label,h('kbd',null,'Ctrl/⌘ K')),
 h('dialog',{ref,className:'ops-search-dialog','aria-labelledby':id,onClose:()=>{const el=previous.current;if(el?.isConnected)el.focus();else trigger.current?.focus();}},h('div',{className:'ops-dialog-head'},h('h2',{id},label),h('button',{type:'button',className:'ops-button',onClick:()=>ref.current?.close()},'Close')),h('label',null,'Search pages',h('input',{ref:input,type:'search',value:query,onChange:e=>setQuery(e.target.value),placeholder:'Search documentation or projects'})),h('p',{role:'status'},results.length+' results'),h('ul',{className:'ops-results'},results.map(entry=>h('li',{key:entry.href},h('a',{href:entry.href,onClick:()=>ref.current?.close()},h('strong',null,entry.title),h('span',null,entry.description)))))));
}
export function MobileNavigation({links=[],label='Menu'}){
 const [open,setOpen]=useState(false),id=useId(),button=useRef(null);
 return h('div',{className:'ops-mobile-nav',onKeyDown:e=>{if(e.key==='Escape'&&open){setOpen(false);button.current?.focus();}}},h('button',{type:'button',ref:button,className:'ops-button','aria-expanded':open,'aria-controls':id,onClick:()=>setOpen(v=>!v)},label),h('nav',{id,hidden:!open,'aria-label':'Mobile navigation'},links.map(x=>h('a',{key:x.href,href:x.href,'aria-current':x.current?'page':undefined,onClick:()=>setOpen(false)},x.label))));
}
export function FeatureCard({title,description,icon,href,children}){
 return h('article',{className:'ops-card ops-feature-card'},icon&&h('span',{'aria-hidden':true,className:'ops-feature-icon'},icon),h('h2',null,title),description&&h('p',null,description),children,href&&h('a',{href,className:'ops-card-link'},'Explore '+title+' →'));
}
export function CodeBlock({code='',language='text'}){
 const [status,setStatus]=useState('');
 async function copy(){try{await navigator.clipboard.writeText(code);setStatus('Copied');}catch{setStatus('Copy unavailable; select the code manually.');}}
 return h('section',{className:'ops-code'},h('div',{className:'ops-code-head'},h('span',null,language),h('button',{type:'button',className:'ops-button',onClick:copy},'Copy code')),h('pre',null,h('code',null,code)),h('span',{role:'status'},status));
}
export function Terminal({title='Terminal',lines=[]}){
 return h('figure',{className:'ops-terminal'},h('figcaption',null,title),h('pre',null,h('code',null,lines.join('\n'))));
}
export function Steps({items=[]}){
 return h('ol',{className:'ops-steps'},items.map((item,i)=>h('li',{key:i},h('strong',null,item.title),h('p',null,item.description))));
}
export function DocsLayout({links=[],children}){
 return h('div',{className:'ops-docs'},h('aside',null,h('nav',{'aria-label':'Documentation'},links.map(x=>h('a',{key:x.href,href:x.href,'aria-current':x.current?'page':undefined},x.label)))),h('div',{className:'ops-doc-content'},children));
}
