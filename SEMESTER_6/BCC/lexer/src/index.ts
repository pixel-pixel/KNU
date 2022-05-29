import path from 'path'
import { readFileSync, writeFileSync } from 'fs'

import { lex } from './lexer';
import { cool } from './language'


const codePath = path.resolve(__dirname, '../example.cl')
const codedata = readFileSync(codePath, 'utf8')
const tokenArray = lex(codedata, cool)

const withoutSpaces = tokenArray.filter(t => t.type !== 'WHITE_SPACE')
const tokensPath = path.resolve(__dirname, '../example.tokens')

const tokenArrayString = withoutSpaces.reduce((str, token, index) => 
  str + `${index + 1}`.padStart(4, ' ').padEnd(7, ' ') + `${token.type}\n` + `${token.data}\n\n`, 
  ''
)

writeFileSync(tokensPath, tokenArrayString)

writeFileSync
// console.log(withoutSpaces);
