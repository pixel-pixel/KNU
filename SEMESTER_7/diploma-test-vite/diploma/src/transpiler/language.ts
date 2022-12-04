export const bartLang = {
  //names
  varName: /[a-z][A-Za-z0-9]*/,
  reactiveVarName: /\$[A-Za-z0-9]+/,
  funcName: /[A-Z][A-Za-z0-9]*/,

  //literals
  numberLiteral: /[0-9]+(\.[0-9]+)?/,

  //operations
  create: /=/,
  set: /<-/,
  plusPlus: /\+\+/,
  add: /\+/,

  //decorators
  fpl: /{/,
  fpr: /}/,
  tpl: /</,
  tpr: />/,

  //others
  space: / /,
  newline: /\n/,
  errorSymbol: /./
}