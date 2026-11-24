import {ThemeProvider,SearchDialog,Header,FeatureCard,palettes} from '../src/index.mjs';
ThemeProvider({project:'evalOps',initial:'dark'});SearchDialog({entries:[{title:'Docs',href:'/docs/'}]});Header({links:[{href:'/',label:'Home'}]});FeatureCard({title:'Eval'});const color:string=palettes.evalops.dark.accent;
// @ts-expect-error invalid theme
ThemeProvider({initial:'purple'});
