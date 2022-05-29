export function ci([regExp]: TemplateStringsArray) {
  const characters = regExp.split('')

  return characters.reduce((acc, char) => {
    const lc = char.toLowerCase()
    const uc = char.toUpperCase()
    return acc + `[${lc}${uc}]`
  }, '')
}

export function fl([regExp]: TemplateStringsArray) {
  const characters = regExp.split('')

  return characters.reduce((acc, char) => {
    const lc = char.toLowerCase()
    const uc = char.toUpperCase()
    return acc + `[${lc}${uc}]`
  })
}