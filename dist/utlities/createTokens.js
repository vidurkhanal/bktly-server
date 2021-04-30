"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const createAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ userID: user.id }, constants_1.JWT_ACCESS_TOKEN, { expiresIn: "15m" });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ userID: user.id }, constants_1.JWT_REFRESH_TOKEN, { expiresIn: "7d" });
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=createTokens.js.map