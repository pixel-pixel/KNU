"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cool = void 0;
const utils_1 = require("./utils");
exports.cool = [
    {
        type: 'KEYWORD',
        regexp: [
            (0, utils_1.ci) `class`,
            (0, utils_1.ci) `else`,
            (0, utils_1.fl) `false`,
            (0, utils_1.ci) `fi`,
            (0, utils_1.ci) `if`,
            (0, utils_1.ci) `in`,
            (0, utils_1.ci) `inherits`,
            (0, utils_1.ci) `isvoid`,
            (0, utils_1.ci) `let`,
            (0, utils_1.ci) `loop`,
            (0, utils_1.ci) `pool`,
            (0, utils_1.ci) `then`,
            (0, utils_1.ci) `while`,
            (0, utils_1.ci) `case`,
            (0, utils_1.ci) `esac`,
            (0, utils_1.ci) `new`,
            (0, utils_1.ci) `of`,
            (0, utils_1.ci) `not`,
            (0, utils_1.fl) `true`
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
        regexp: `"(.|\n)*"`,
        parseFunc(str) {
            str = str.replaceAll('\\b', '\b')
                .replaceAll('\\t', '\t')
                .replaceAll('\\n', '\n')
                .replaceAll('\\f', '\f')
                .replaceAll('\\', '');
            if (str.length > 10)
                return { type: 'ERROR', data: 'String constant is too long' };
            return { type: 'STRING', data: str };
        }
    },
    {
        type: 'ONE_LINE_COMMENT',
        regexp: '--[^\n]*'
    },
    {
        type: 'MULTI_LINE_COMMENT',
        regexp: '(\\()([\*])+(.|\n)+?([\*])(\\))'
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
    }
];
// export default {
//   COMMENT: [
//                     '//.*\n',
//                     '(\/)([\*])+(.|\n)+?([\*])(\/)',
//   ],
//   KEYWORD: [
//                     'as',
//                     'await',
//                     'break',
//                     'case',
//                     'catch',
//                     'class',
//                     'const',
//                     'continue',
//                     'debugger',
//                     'default',
//                     'delete',
//                     'do',
//                     'else',
//                     'enum',
//                     'export',
//                     'extends',
//                     'false',
//                     'finally',
//                     'for',
//                     'function',
//                     'if',
//                     'implements',
//                     'import',
//                     'in',
//                     'instanceof',
//                     'interface',
//                     'let',
//                     'new',
//                     'package',
//                     'private',
//                     'protected',
//                     'public',
//                     'return',
//                     'super',
//                     'switch',
//                     'static',
//                     'this',
//                     'throw',
//                     'try',
//                     'true',
//                     'typeof',
//                     'var',
//                     'void',
//                     'while',
//                     'with',
//                     'yield', 	 
//   ],
//   ARROW:            '=>',
//   OPERATOR: [
//                     '\\.\\.\\.',
//                     '\\?',
//                     '>=',
//                     '<=',
//                     '>',
//                     '<',
//                     '!==',
//                     '!=',
//                     '===',
//                     '==',
//                     '\\+=',
//                     '-=',
//                     '\\*=',
//                     '/=',
//                     '%=',
//                     '\\+',
//                     '-',
//                     '\\*\\*',
//                     '\\*',
//                     '/',
//                     '%',
//                     '\\+\\+',
//                     '--',
//                     '!',
//                     '\\|\\|',
//                     '&&',
//                     '>>',
//                     '<<',
//                     '^',
//                     '~',
//                     '\\|',
//                     '&',
//                     '\\^',
//   ],
//   ASIGN:            '=',
//   PERIOD:           '\\.',
//   COMA:             ',',
//   COLON:            ':',
//   SEMICOLON:        ';',
//   STRING:           `('.*'|)`,
//   SPECIAL_STRING:   '`.*`',
//   NUMBER:           '[0-9]+\\.?[0-9]*',
//   NAN:              'NaN',
//   INFINITY:         'Infinity',
//   BOOLEAN:          '(true|false)',
//   NULL:             'null',
//   UNDEFINED:        'undefined',
//   BRACKET_LEFT:     '\\(',
//   BRACKET_RIGHT:    '\\)',
//   SQUARE_LEFT:      '\\[',
//   SQUARE_RIGHT:     '\\]',
//   CURLY_LEFT:       '{',
//   CURLY_RIGHT:      '}',
//   SPACE: [
//                     ' ',
//                     '\t',
//   ],
//   NEWLINE:          '\n',
//   PRIVATE_VALUE:    '#[a-z$_A-Z][a-zA-Z$_0-9]*',
//   VALUE:            '[a-z$_A-Z][a-zA-Z$_0-9]*',
// }
