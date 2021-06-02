import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

export type ApolloContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: string };
  };
  res: Response;
  payload?: { userID: number };
};
