"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fl = exports.ci = void 0;
function ci([regExp]) {
    const characters = regExp.split('');
    return characters.reduce((acc, char) => {
        const lc = char.toLowerCase();
        const uc = char.toUpperCase();
        return acc + `[${lc}${uc}]`;
    }, '');
}
exports.ci = ci;
function fl([regExp]) {
    const characters = regExp.split('');
    return characters.reduce((acc, char) => {
        const lc = char.toLowerCase();
        const uc = char.toUpperCase();
        return acc + `[${lc}${uc}]`;
    });
}
exports.fl = fl;
