import { Request, Response } from "express";
import { Users } from "./entities/Users";

export type ApolloContext = {
  req: Request;
  res: Response;
  payload?: { userID: number };
};
