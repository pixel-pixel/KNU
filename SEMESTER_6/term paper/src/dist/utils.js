"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransoprtTime = exports.toMinutes = void 0;
function toMinutes(time) {
    const [hour, minute] = time.split(':');
    return +hour * 60 + +minute;
}
exports.toMinutes = toMinutes;
function getTransoprtTime(googleTime, nowTime) {
    console.log('google', googleTime);
    console.log('nowapi', nowTime);
    return toMinutes(googleTime) - toMinutes(nowTime);
}
exports.getTransoprtTime = getTransoprtTime;
