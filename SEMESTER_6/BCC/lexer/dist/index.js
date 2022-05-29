"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const lexer_1 = require("./lexer");
const language_1 = require("./language");
const codePath = path_1.default.resolve(__dirname, '../example.cl');
const codedata = (0, fs_1.readFileSync)(codePath, 'utf8');
const tokenArray = (0, lexer_1.lex)(codedata, language_1.cool);
const withoutSpaces = tokenArray.filter(t => t.type !== 'WHITE_SPACE');
const tokensPath = path_1.default.resolve(__dirname, '../example.tokens');
const tokenArrayString = withoutSpaces.reduce((str, token, index) => str + `${index + 1}`.padStart(4, ' ').padEnd(7, ' ') + `${token.type}\n` + `${token.data}\n\n`, '');
(0, fs_1.writeFileSync)(tokensPath, tokenArrayString);
fs_1.writeFileSync;
// console.log(withoutSpaces);
