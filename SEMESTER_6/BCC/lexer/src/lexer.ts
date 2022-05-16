import { Language, Token } from './types';

export function lex(code: string, lang: Language) {
  const tokenArray: Token[] = []
  let line = 1

  while (code) {
    const token = nextToken(code, lang)
    if (!token) throw Error(`Usuported token on line ${line}: ${code[0]}`)
    if (token.type == 'NEWLINE') line++

    tokenArray.push(token!)
    code = code.substring(token!.data.length)    
  }

  return tokenArray
}

function nextToken(code: string, lang: Language): Token | null {
  const entries = Object.entries(lang)

  for (const [type, regex] of entries) {
    const regexArray = Array.isArray(regex) ? regex : [regex]

    for (const re of regexArray) {
      const result = code.match('^' + re)
      if (!result || !result[0]) continue

      const data = result[0]
      return { type, data } as Token
    }
  }

  return null
}
