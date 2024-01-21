import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import prisma from "@/prisma/db";

export type Context = {
  prisma: PrismaClient;
};

const resolvers = {
  Query: {
    novels: async (parent: any, args: any, context: Context) =>
      await context.prisma.novel.findMany(),
    novel: async (parent: any, args: any, context: Context) =>
      await context.prisma.novel.findUnique({ where: { id: args.novelId } }),
  },

  Novel: {
    authors: async (parent: any, args: any, context: Context) =>
      await context.prisma.author.findMany({ where: { novelId: parent.id } }),
  },
};

const typeDefs = `#graphql
  type Novel {
    id: ID!
    title: String
    image: String
    createdAt: String
    updatedAt: String
    authors: [Author]
  }

  type Author {
    id: ID!
    name: String
    novelID: String
  }

  type Query {
    novel(id: ID): Novel
    novels: [Novel]
  }

  # type Mutation {
  #   addNovel: Novel
  # }
`;

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    prisma,
  }),
});
