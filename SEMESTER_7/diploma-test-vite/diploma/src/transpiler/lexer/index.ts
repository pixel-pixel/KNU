import { Language, Token } from "../types"

const lex = <T extends Language>(code: string, lang: T) => {
  const tokens: Token<T>[] = []
  const words = Object.entries(lang)

  while (code) {  
    for (const [ type, regex ] of words) {
      const startLineRegExp = new RegExp('^' + regex.source, regex.flags)
      const found = code.match(startLineRegExp)      
      
      if (!found) continue

      const data = found[0]
      code = code.slice(data.length)
      tokens.push({ type, data })
      break
    }
  }

  return tokens
}

export {
  lex
}