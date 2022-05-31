"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lex = void 0;
function lex(code, lang) {
    const tokenArray = [];
    let line = 1;
    while (code) {
        let token = nextToken(code, lang);
        const resultToken = token.finalData
            ? { ...token, data: token.finalData }
            : token.parseFunc
                ? token.parseFunc(token?.data)
                : token;
        tokenArray.push(resultToken);
        console.log('token', token.data, token.data.length);
        code = code.substring(token.data.length);
    }
    return tokenArray;
}
exports.lex = lex;
function nextToken(code, lang, longest = true) {
    const variants = [];
    for (const word of lang) {
        const regexArray = Array.isArray(word.regexp) ? word.regexp : [word.regexp];
        for (const re of regexArray) {
            const result = code.match('^' + re);
            if (!result || !result[0])
                continue;
            const data = result[0];
            variants.push({ ...word, data, len: data.length });
        }
    }
    let result = variants[0];
    variants.forEach(v => {
        if (v.data.length > result.data.length)
            result = v;
    });
    return result;
}
