import lang from './language'

export type Language = typeof lang

export type Token = {
  type: keyof Language | 'ERROR'
  data: string
}