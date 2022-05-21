"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const lexer_1 = require("./lexer");
const language_1 = __importDefault(require("./language"));
const codePath = path_1.default.resolve(__dirname, '../example.mjs');
const codedata = (0, fs_1.readFileSync)(codePath, 'utf8');
const tokenArray = (0, lexer_1.lex)(codedata, language_1.default);
const withoutSpaces = tokenArray.filter(t => t.type !== 'SPACE' && t.type !== 'NEWLINE');
const tokensPath = path_1.default.resolve(__dirname, '../example.tokens');
const tokenArrayString = withoutSpaces.reduce((str, token, index) => str + `${index + 1}`.padStart(5, ' ').padEnd(20, ' ') + `${token.data}`.padEnd(20, ' ') + `${token.type}\n`, '');
(0, fs_1.writeFileSync)(tokensPath, tokenArrayString);
fs_1.writeFileSync;
console.log(withoutSpaces);
