import { Main } from "./volunteerSite/Main";

document.getElementById('#root')?.appendChild(Main())


// import { 
//   FuncCall, 
//   FuncDecl, 
//   FuncName, 
//   GetFuncFrom, 
//   Lambda, 
//   ObjLitheral, 
//   Operation, 
//   Program, 
//   Return, 
//   SetVar, 
//   StringLitheral, 
//   VarDecl, 
//   VarName 
// } from './transpiler/index'
// import {
//   $,
//   div,
//   p,
//   // input
// } from './lib/index'
// import { ifelse } from './lib/operators/ifelse';
// import { Router } from './lib/router/Router';


// console.log($, div, p, input);

// const res = new Program([
//   new FuncDecl(
//     new FuncName('MyComponent'),
//     [
//       new VarDecl(new VarName('count'), 0),
//       new Return(
//         new FuncCall(
//           new FuncName('div'),
//           [
//             new ObjLitheral(
//               [
//                 [
//                   new VarName('onclick'),
//                   new Lambda(
//                     [
//                       new SetVar(
//                         new VarName('count'),
//                         new Operation('+', new VarName('count'), 1)
//                       )
//                     ]
//                   )
//                 ]
//               ]
//             ),
//             new FuncCall(
//               new FuncName('p'),
//               [
//                 new ObjLitheral([]),
//                 new VarName('count')
//               ]
//             )
//           ]
//         )
//       )
//     ]
//   ),
//   new FuncCall(
//     new GetFuncFrom(
//       new FuncCall(
//         new GetFuncFrom(
//           new VarName('document'),
//           new FuncName('getElementById')
//         ),
//         [new StringLitheral('#root')]
//       ),
//       new FuncName('appendChild')
//     ),
//     [
//       new FuncCall(
//         new FuncName('MyComponent'),
//         []
//       )
//     ]
//   )
// ]).toString()

// eval(res)