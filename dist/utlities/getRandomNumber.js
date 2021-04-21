"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomIntInclusive = void 0;
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.getRandomIntInclusive = getRandomIntInclusive;
console.log(getRandomIntInclusive(8, 12));
//# sourceMappingURL=getRandomNumber.js.map