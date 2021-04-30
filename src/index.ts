import "reflect-metadata";
import { createConnection } from "typeorm";
import Express from "express";
import "dotenv/config";
import {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  PORT,
  __PROD__,
} from "./constants";
import { LinkSchema } from "./entities/Links";
import helmet from "helmet";
import morgan from "morgan";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { LinkResolver } from "./resolvers/Links";
import { ApolloContext } from "./types";
import cors from "cors";
import { Users } from "./entities/Users";
import { UserResolver } from "./resolvers/UserResolvers";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    logging: true,
    synchronize: __PROD__,
    entities: [LinkSchema, Users],
  });

  await LinkSchema.delete({});
  // await Users.delete({});

  const app = Express();
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  const ApServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [LinkResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): ApolloContext => ({ req, res }),
  });

  ApServer.applyMiddleware({ app, cors: false });

  app.use(helmet());
  app.use(morgan("combined"));

  app.get("/", (_req, res) => {
    res.redirect("http://localhost:3000");
  });

  app.get("/:shortURL", async (req, res) => {
    const sURL = req.params.shortURL;
    const link = await LinkSchema.findOne({ where: { shortLink: sURL } });
    await LinkSchema.update(
      { shortLink: sURL },
      { views: (link?.views as number) + 1 }
    );
    res.redirect(link?.completeLink as string);
  });

  app.listen(PORT, () => {
    console.log("LISTENING ON PORT", PORT);
  });
};

main().catch((e) => console.log(e.details));
