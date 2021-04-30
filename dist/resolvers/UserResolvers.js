"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const argon2_1 = require("argon2");
const typeorm_1 = require("typeorm");
const Users_1 = require("../entities/Users");
const auth_1 = require("../JoiSchema/auth");
const createTokens_1 = require("../utlities/createTokens");
const isAuth_1 = require("../middlewares/isAuth");
let AuthResponse = class AuthResponse {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], AuthResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => Users_1.Users, { nullable: true }),
    __metadata("design:type", Users_1.Users)
], AuthResponse.prototype, "user", void 0);
AuthResponse = __decorate([
    type_graphql_1.ObjectType()
], AuthResponse);
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], LoginResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
let UserResolver = class UserResolver {
    hello() {
        return "Olap !!";
    }
    bye({ payload }) {
        return "hello " + payload.userID;
    }
    createAccount(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = auth_1.authSchema.validate({ email, password });
            let user;
            if (error) {
                if (error.message.includes('"email" must be a valid email')) {
                    return {
                        error: "Email Has Been Badly Formatted. Please retry with new email.",
                        user,
                    };
                }
                if (error.message.includes("length must be at least 8 characters long")) {
                    return {
                        error: "Your Password Length Must At Least Be 8 Characters",
                        user,
                    };
                }
                return { error: error.message, user };
            }
            const hashedPassword = yield argon2_1.hash(password);
            try {
                const result = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Users_1.Users)
                    .values({
                    email,
                    password: hashedPassword,
                })
                    .returning("*")
                    .execute();
                user = result.raw[0];
            }
            catch (e) {
                if (e.code === "23505") {
                    return {
                        error: "Email Has Already Been Used. Please retry with new email.",
                        user,
                    };
                }
            }
            return { user };
        });
    }
    login(email, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.Users.findOne({ where: { email } });
            if (!user) {
                return {
                    error: "Provided Account Doesn't Exist.",
                };
            }
            const isCorrectPassword = yield argon2_1.verify(user.password, password);
            if (!isCorrectPassword) {
                return {
                    error: "You Have Supplied An Incorrect Password. Please check your password.",
                };
            }
            res.cookie("TKNSHRTFY", createTokens_1.createRefreshToken(user), {
                httpOnly: true,
            });
            return {
                accessToken: createTokens_1.createAccessToken(user),
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.Query(() => String),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "bye", null);
__decorate([
    type_graphql_1.Mutation(() => AuthResponse),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createAccount", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolvers.js.map