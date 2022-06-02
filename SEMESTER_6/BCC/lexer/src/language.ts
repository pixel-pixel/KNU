import { Language } from "./types"
import { ci, fl } from "./utils"

export const cool: Language = [
  {
    type: 'KEYWORD',
    regexp: [
      ci`class`,
      ci`else`,
      fl`false`,
      ci`fi`,
      ci`if`,
      ci`in`,
      ci`inherits`,
      ci`isvoid`,
      ci`let`,
      ci`loop`,
      ci`pool`,
      ci`then`,
      ci`while`,
      ci`case`,
      ci`esac`,
      ci`new`,
      ci`of`,
      ci`not`,
      fl`true`
    ]
  },

  {
    type: 'INTEGER',
    regexp: '[0-9]+'
  },

  {
    type: 'CLASS_INDETIFIER',
    regexp: '[A-Z][a-zA-Z_0-9]*'
  },

  {
    type: 'OBJECT_INDETIFIER',
    regexp: '[a-z][a-zA-Z_0-9]*'
  },

  {
    type: 'self',
    regexp: 'setf'
  },

  {
    type: 'SELF_TYPE',
    regexp: 'SELF_TYPE'
  },

  {
    type: 'STRING',
    regexp: `"(.|\(\/\n\))*?"`,
    parseFunc(str) {      
      str = str.replaceAll('\\b', '\b')
               .replaceAll('\\t', '\t')
               .replaceAll('\\n', '\n')
               .replaceAll('\\f', '\f')
               .replaceAll('\\', '')

      if (str.length > 128) 
        return { type: 'ERROR', data: 'String constant is too long' }
        
      return { type: 'STRING', data: str }
    }
  },

  {
    type: 'ERORR',
    regexp: `".*\n`,
    finalData: 'Unterminated string constant'
  },

  {
    type: 'ONE_LINE_COMMENT',
    regexp: '--[^\n]*'
  },

  {
    type: 'MULTI_LINE_COMMENT',
    regexp: '(\\()([\*])+(.|\n)*([\*])(\\))'
  },

  {
    type: 'ERROR',
    regexp: '\\*\\)',
    finalData: 'Unmatched *)'
  },

  {
    type: 'ERROR',
    regexp: '(\\()([\*])+(.|\n)*',
    finalData: 'EOF in comment'
  },

  {
    type: 'WHITE_SPACE',
    regexp: '[\n\f\r\t\ ]*'
  }, 

  {
    type: 'OPERATOR',
    regexp: [
      '\\.',
      '@',
      '~',
      'isvoid',
      '\\*',
      '/',
      '\\+',
      '-',
      '<=',
      '<', 
      '=',
      'not',
      '<-',
      ]
  },

  {
    type: 'PUNCTUATION',
    regexp: [
      ',',
      ':',
      ';',
      '\\(',
      '\\)',

      '{',
      '}',
    ]
  },

  {
    type: 'ERROR',
    regexp: '.'
  },
]