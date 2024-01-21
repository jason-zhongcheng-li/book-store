import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import prisma from "@/prisma/db";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

export type Context = {
  prisma: PrismaClient;
};

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
