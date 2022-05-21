"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lex = void 0;
function lex(code, lang) {
    const tokenArray = [];
    let line = 1;
    while (code) {
        const token = nextToken(code, lang);
        if (!token)
            throw Error(`Usuported token on line ${line}: ${code[0]}`);
        if (token.type == 'NEWLINE')
            line++;
        tokenArray.push(token);
        code = code.substring(token.data.length);
    }
    return tokenArray;
}
exports.lex = lex;
function nextToken(code, lang) {
    const entries = Object.entries(lang);
    for (const [type, regex] of entries) {
        const regexArray = Array.isArray(regex) ? regex : [regex];
        for (const re of regexArray) {
            const result = code.match('^' + re);
            if (!result || !result[0])
                continue;
            const data = result[0];
            return { type, data };
        }
    }
    return null;
}
