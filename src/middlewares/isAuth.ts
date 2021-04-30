import { ApolloContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { JWT_ACCESS_TOKEN } from "../constants";

export const isAuth: MiddlewareFn<ApolloContext> = ({ context }, next) => {
  const authorization = context.req.headers.authorization;

  if (!authorization) {
    throw new Error("You are not authenticated. Please Login first.");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, JWT_ACCESS_TOKEN);
    context.payload = payload as any;
  } catch (e) {
    throw new Error("You are not authenticated. Please Login first.");
  }

  return next();
};
