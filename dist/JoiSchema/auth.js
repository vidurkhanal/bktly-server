"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidate = exports.authSchema = void 0;
const joi_1 = require("joi");
exports.authSchema = joi_1.object({
    email: joi_1.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "co"] },
    })
        .required(),
    password: joi_1.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(8)
        .required(),
});
exports.emailValidate = joi_1.object({
    email: joi_1.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "co"] },
    }),
});
//# sourceMappingURL=auth.js.map