"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.__PROD__ = exports.DATABASE_PASSWORD = exports.DATABASE_USERNAME = exports.DATABASE_NAME = void 0;
exports.DATABASE_NAME = process.env.DATABASE_NAME;
exports.DATABASE_USERNAME = process.env.DATABASE_USERNAME;
exports.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
exports.__PROD__ = !process.env.NODE_ENV;
exports.PORT = 8050;
//# sourceMappingURL=constants.js.map