"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lex = void 0;
function lex(code, lang) {
    const tokenArray = [];
    let line = 1;
    while (code) {
        const token = nextToken(code, lang);
        const word = lang.find(w => w.type === token.type);
        const resToken = word?.parseFunc ? word.parseFunc(token?.data) : token;
        tokenArray.push(resToken);
        code = code.substring(token.data.length);
    }
    return tokenArray;
}
exports.lex = lex;
function nextToken(code, lang, longest = true) {
    const variants = [];
    for (const { type, regexp } of lang) {
        //  console.log('code', regexp);
        const regexArray = Array.isArray(regexp) ? regexp : [regexp];
        for (const re of regexArray) {
            const result = code.match('^' + re);
            if (!result || !result[0])
                continue;
            const data = result[0];
            variants.push({ type, data, len: data.length });
        }
    }
    let result = variants[0];
    variants.forEach(v => {
        if (v.data.length > result.data.length)
            result = v;
    });
    return result;
}
