import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { hash, verify } from "argon2";
import { getConnection } from "typeorm";
import { Users } from "../entities/Users";
import { authSchema } from "../JoiSchema/auth";
import { ApolloContext } from "../types";
import {
  createAccessToken,
  createRefreshToken,
} from "../utlities/createTokens";
import { isAuth } from "../middlewares/isAuth";
// import Joi from "joi";

@ObjectType()
class AuthResponse {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => Users, { nullable: true })
  user?: Users;
}

@ObjectType()
class LoginResponse {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => String, { nullable: true })
  accessToken?: String;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Olap !!";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: ApolloContext) {
    return "hello " + payload!.userID;
  }

  @Mutation(() => AuthResponse)
  async createAccount(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<AuthResponse> {
    const { error } = authSchema.validate({ email, password });
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
    const hashedPassword = await hash(password);
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values({
          email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (e) {
      if (e.code === "23505") {
        return {
          error: "Email Has Already Been Used. Please retry with new email.",
          user,
        };
      }
    }
    return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: ApolloContext
  ): Promise<LoginResponse> {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return {
        error: "Provided Account Doesn't Exist.",
      };
    }

    const isCorrectPassword = await verify(user.password, password);
    if (!isCorrectPassword) {
      return {
        error:
          "You Have Supplied An Incorrect Password. Please check your password.",
      };
    }

    res.cookie("TKNSHRTFY", createRefreshToken(user), {
      httpOnly: true,
    });

    return {
      accessToken: createAccessToken(user),
    };
  }
}
