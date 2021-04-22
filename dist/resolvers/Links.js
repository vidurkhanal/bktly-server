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
exports.LinkResolver = void 0;
const Links_1 = require("../entities/Links");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const nanoid_1 = require("nanoid");
const getRandomNumber_1 = require("../utlities/getRandomNumber");
let LinkResolver = class LinkResolver {
    ello() {
        return "Ola !!";
    }
    AllLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield Links_1.LinkSchema.find({});
            return links;
        });
    }
    CreateLink(completeLink) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Links_1.LinkSchema)
                    .values({
                    completeLink: completeLink,
                    shortLink: nanoid_1.nanoid(getRandomNumber_1.getRandomIntInclusive(12, 14)),
                    views: 0,
                    userId: 0,
                })
                    .returning("*")
                    .execute();
                return result.raw[0];
            }
            catch (e) {
                return {
                    error: {
                        code: "uniquelink",
                        message: "Some error Occured. Please retry your request. ",
                    },
                };
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LinkResolver.prototype, "ello", null);
__decorate([
    type_graphql_1.Query(() => [Links_1.LinkSchema], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "AllLinks", null);
__decorate([
    type_graphql_1.Mutation(() => Links_1.LinkSchema),
    __param(0, type_graphql_1.Arg("completeLink")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "CreateLink", null);
LinkResolver = __decorate([
    type_graphql_1.Resolver()
], LinkResolver);
exports.LinkResolver = LinkResolver;
//# sourceMappingURL=Links.js.map