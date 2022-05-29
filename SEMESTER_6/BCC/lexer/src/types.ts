export type Token = {
  type: string
  data: string
}

export type Language = Word[]

type Word = {
  type: string
  regexp: string | string[]
  parseFunc?: (str: string) => { type: string, data: string }
}