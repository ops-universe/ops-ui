import React,{createContext,useContext,useEffect,useState} from 'react';
import {MobileNavigation} from './advanced.mjs';
export {SearchDialog,searchEntries,MobileNavigation,FeatureCard,CodeBlock,Terminal,Steps,DocsLayout} from './advanced.mjs';
import {resolvePalette,paletteStyle} from './palettes.mjs';
export {palettes,resolvePalette,paletteStyle} from './palettes.mjs';
const h=React.createElement;
const ThemeContext=createContext(null);
const valid=['system','light','dark'];
export function ThemeProvider({children,initial='system',project='universe'}){
 const [choice,setChoice]=useState(valid.includes(initial)?initial:'system');
 const [ready,setReady]=useState(false);
 useEffect(()=>{try{const stored=localStorage.getItem('ops-theme');if(valid.includes(stored))setChoice(stored);}catch{}setReady(true);},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem('ops-theme',choice);}catch{}},[choice,ready]);
 return h(ThemeContext.Provider,{value:{choice,setChoice}},h('div',{className:'ops-root','data-theme':choice,'data-project':resolvePalette(project),style:paletteStyle(project)},children));
}
export function ThemeToggle(){
 const ctx=useContext(ThemeContext);if(!ctx)throw new Error('ThemeToggle requires ThemeProvider');
 return h('fieldset',{className:'ops-theme'},h('legend',null,'Theme'),...valid.map(value=>h('button',{key:value,type:'button','aria-pressed':ctx.choice===value,onClick:()=>ctx.setChoice(value)},value)));
}
export function Button({href,children,variant='primary',...props}){
 const className='ops-button '+(variant==='secondary'?'ops-secondary':'ops-primary');
 return href?h('a',{...props,className,href},children):h('button',{type:'button',...props,className},children);
}
export function Header({brand='Ops Universe',home='/',links=[],children}){
 return h('header',{className:'ops-header'},h('a',{className:'ops-brand',href:home},brand),h('nav',{className:'ops-desktop-nav','aria-label':'Main navigation'},links.map(x=>h('a',{key:x.href,href:x.href,'aria-current':x.current?'page':undefined},x.label))),h(MobileNavigation,{links}),children);
}
export function Hero({eyebrow,title,description,actions,visual,animate=false}){
 return h('section',{className:'ops-hero'+(animate?' ops-enter':'')},h('div',null,h('p',{className:'ops-eyebrow'},eyebrow),h('h1',null,title),h('p',null,description),h('div',{className:'ops-actions'},actions)),visual);
}
export function Card({title,children}){return h('article',{className:'ops-card'},h('h2',null,title),children);}
export function Footer({brand='Ops Universe',links=[],description,children}){return h('footer',{className:'ops-footer'},h('div',null,h('strong',null,brand),description&&h('p',null,description)),h('nav',{'aria-label':'Footer navigation'},links.map(x=>h('a',{key:x.href,href:x.href},x.label))),children);}
