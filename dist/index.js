"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const constants_1 = require("./constants");
const Links_1 = require("./entities/Links");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const Links_2 = require("./resolvers/Links");
const cors_1 = __importDefault(require("cors"));
const Users_1 = require("./entities/Users");
const UserResolvers_1 = require("./resolvers/UserResolvers");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "postgres",
        database: constants_1.DATABASE_NAME,
        username: constants_1.DATABASE_USERNAME,
        password: constants_1.DATABASE_PASSWORD,
        logging: true,
        synchronize: constants_1.__PROD__,
        entities: [Links_1.LinkSchema, Users_1.Users],
    });
    yield Links_1.LinkSchema.delete({});
    yield Users_1.Users.delete({});
    const app = express_1.default();
    let RedisStore = connect_redis_1.default(express_session_1.default);
    let redisClient = redis_1.default.createClient();
    app.use(express_session_1.default({
        name: "TKNSHRTFY_AUTHID",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
            disableTTL: true,
        }),
        cookie: {
            maxAge: 315569520000,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        },
        saveUninitialized: false,
        secret: "knN!KnjnNJN##@!njnnn%%@/..;[",
        resave: false,
    }));
    app.use(cors_1.default({ origin: "http://localhost:3000", credentials: true }));
    const ApServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [Links_2.LinkResolver, UserResolvers_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    ApServer.applyMiddleware({ app, cors: false });
    app.use(helmet_1.default());
    app.use(morgan_1.default("combined"));
    app.get("/", (_req, res) => {
        res.redirect("http://localhost:3000");
    });
    app.get("/:shortURL", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const sURL = req.params.shortURL;
        const link = yield Links_1.LinkSchema.findOne({ where: { shortLink: sURL } });
        return res.redirect(link === null || link === void 0 ? void 0 : link.completeLink);
    }));
    app.listen(constants_1.PORT, () => {
        console.log("LISTENING ON PORT", constants_1.PORT);
    });
});
main().catch((e) => console.log(e.details));
const date = new Date().toString();
console.log("kbdhjkbd ->", Date.parse(date));
//# sourceMappingURL=index.js.map