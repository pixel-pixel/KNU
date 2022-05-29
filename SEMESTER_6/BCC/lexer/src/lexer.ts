import { Language, Token } from './types';

export function lex(code: string, lang: Language) {
  const tokenArray: Token[] = []
  let line = 1

  while (code) {
    const token = nextToken(code, lang)

    const word = lang.find(w => w.type === token!.type)
    const resToken = word?.parseFunc ? word.parseFunc(token?.data as string) : token
    tokenArray.push(resToken!)
    code = code.substring(token!.data.length)    
  }

  return tokenArray
}

function nextToken(code: string, lang: Language, longest = true): Token | null {
  const variants = []

  for (const { type, regexp } of lang) {
    //  console.log('code', regexp);
    

    const regexArray = Array.isArray(regexp) ? regexp : [regexp]

    for (const re of regexArray) {
      const result = code.match('^' + re)
      if (!result || !result[0]) continue

      const data = result[0]

     
      variants.push({ type, data, len: data.length })
    }
  }

  let result = variants[0]
  variants.forEach(v => {
    if (v.data.length > result.data.length) result = v
  })
  return result
}
