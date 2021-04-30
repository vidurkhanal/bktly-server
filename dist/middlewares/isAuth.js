"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("../constants");
const isAuth = ({ context }, next) => {
    const authorization = context.req.headers.authorization;
    if (!authorization) {
        throw new Error("You are not authenticated. Please Login first.");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = jsonwebtoken_1.verify(token, constants_1.JWT_ACCESS_TOKEN);
        context.payload = payload;
    }
    catch (e) {
        throw new Error("You are not authenticated. Please Login first.");
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map