import { palettes } from './palettes-data.mjs';
export { palettes };
export function resolvePalette(project='universe'){const key=String(project).toLowerCase();return Object.hasOwn(palettes,key)?key:'universe';}
export function paletteStyle(project){const p=palettes[resolvePalette(project)];return Object.fromEntries(Object.entries(p).flatMap(([mode,values])=>Object.entries(values).map(([key,value])=>['--ops-'+mode+'-'+key,value])));}
