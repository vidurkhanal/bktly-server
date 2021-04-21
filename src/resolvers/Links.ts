import { LinkSchema } from "../entities/Links";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { ApolloContext } from "../types";
import { nanoid } from "nanoid";
import { getRandomIntInclusive } from "../utlities/getRandomNumber";

@Resolver()
export class LinkResolver {
  @Query(() => String)
  ello() {
    return "Ola !!";
  }

  @Query(() => [LinkSchema], { nullable: true })
  async AllLinks(): Promise<LinkSchema[] | undefined> {
    const links = await LinkSchema.find({});
    return links;
  }

  @Mutation(() => LinkSchema)
  async CreateLink(
    @Arg("completeLink") completeLink: string,
    @Ctx() { req }: ApolloContext
  ): Promise<LinkSchema | { error: { code: string; message: string } }> {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(LinkSchema)
        .values({
          completeLink: completeLink,
          shortLink: nanoid(getRandomIntInclusive(12, 14)),
          views: 0,
        })
        .returning("*")
        .execute();
      return result.raw[0];
    } catch (e) {
      return {
        error: {
          code: "uniquelink",
          message: "Some error Occured. Please retry your request. ",
        },
      };
    }
  }
}
