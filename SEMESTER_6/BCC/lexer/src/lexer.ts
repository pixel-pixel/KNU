import { Language, Token } from './types';

export function lex(code: string, lang: Language) {
  const tokenArray: Token[] = []
  let line = 1

  while (code) {
    let token = nextToken(code, lang)
    const resultToken = token.finalData 
      ? { ...token, data: token.finalData }
      : token.parseFunc 
        ? token.parseFunc(token?.data as string) 
        : token

    tokenArray.push(resultToken!)
    console.log('token', token.data, token.data.length);
    
    code = code.substring(token!.data.length)    
  }

  return tokenArray
}

function nextToken(code: string, lang: Language, longest = true) {
  const variants = []

  for (const word of lang) {
    
    const regexArray = Array.isArray(word.regexp) ? word.regexp : [word.regexp]

    for (const re of regexArray) {
      const result = code.match('^' + re)
      console.log('kek', result);
      
      if (!result || !result[0]) continue

      const data = result[0]
     
      variants.push({ ...word, data, len: data.length })
    }
  }

  let result = variants[0]
  // variants.forEach(v => {
  //   if (v.data.length > result.data.length) result = v
  // })
  
  return result
}
