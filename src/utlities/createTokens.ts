import jwt from "jsonwebtoken";
import { JWT_REFRESH_TOKEN, JWT_ACCESS_TOKEN } from "../constants";
import { Users } from "../entities/Users";

export const createAccessToken = (user: Users): string => {
  return jwt.sign({ userID: user.id }, JWT_ACCESS_TOKEN, { expiresIn: "15m" });
};

export const createRefreshToken = (user: Users): string => {
  return jwt.sign({ userID: user.id }, JWT_REFRESH_TOKEN, { expiresIn: "7d" });
};
