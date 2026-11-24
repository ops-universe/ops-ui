import test from 'node:test';
import assert from 'node:assert/strict';
import {palettes,resolvePalette,paletteStyle} from '../src/palettes.mjs';
const lum=hex=>{const v=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2];};
const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
test('project accents are unique in both modes',()=>{for(const mode of ['light','dark'])assert.equal(new Set(Object.values(palettes).map(p=>p[mode].accent)).size,Object.keys(palettes).length);});
test('normal text, muted, links and primary buttons meet 4.5 contrast',()=>{for(const [name,p] of Object.entries(palettes))for(const [mode,t] of Object.entries(p)){for(const [a,b] of [['text','bg'],['text','surface'],['muted','bg'],['muted','surface'],['accent','bg'],['accent','surface'],['ink','accent']])assert.ok(contrast(t[a],t[b])>=4.5,name+' '+mode+' '+a+'/'+b+' '+contrast(t[a],t[b]));}});
test('case insensitive names and safe fallback',()=>{assert.equal(resolvePalette('evalOps'),'evalops');assert.equal(resolvePalette('__proto__'),'universe');assert.equal(paletteStyle('evalOps')['--ops-light-accent'],palettes.evalops.light.accent);});
