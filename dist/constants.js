"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_REFRESH_TOKEN = exports.JWT_ACCESS_TOKEN = exports.PORT = exports.__PROD__ = exports.DATABASE_PASSWORD = exports.DATABASE_USERNAME = exports.DATABASE_NAME = void 0;
exports.DATABASE_NAME = process.env.DATABASE_NAME;
exports.DATABASE_USERNAME = process.env.DATABASE_USERNAME;
exports.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
exports.__PROD__ = !process.env.NODE_ENV;
exports.PORT = 8050;
exports.JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_SECRET;
exports.JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
//# sourceMappingURL=constants.js.map