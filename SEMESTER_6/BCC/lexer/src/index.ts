import path from 'path'
import { readFileSync, writeFileSync } from 'fs'

import { lex } from './lexer';
import lang from './language'


const codePath = path.resolve(__dirname, '../example.js')
const codedata = readFileSync(codePath, 'utf8')
const tokenArray = lex(codedata, lang)

const withoutSpaces = tokenArray.filter(t => t.type !== 'SPACE' && t.type !== 'NEWLINE')
const tokensPath = path.resolve(__dirname, '../example.tokens')

const tokenArrayString = withoutSpaces.reduce((str, token, index) => 
  str + `${index + 1}`.padStart(5, ' ').padEnd(20, ' ') + `${token.data}`.padEnd(20, ' ') + `${token.type}\n`, 
  ''
)

writeFileSync(tokensPath, tokenArrayString)

writeFileSync
console.log(withoutSpaces);
