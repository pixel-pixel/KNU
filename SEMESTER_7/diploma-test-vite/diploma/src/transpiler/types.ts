export type Language = {
  [word: string]: RegExp
}

export type Token<T extends Language> = {
  type: keyof T
  data: string
}