import { Context } from "@/pages/api/graphql";

export const resolvers = {
  Query: {
    novels: async (parent: any, args: any, context: Context) =>
      await context.prisma.novel.findMany(),
    novel: async (parent: any, args: any, context: Context) =>
      await context.prisma.novel.findUnique({ where: { id: args.id } }),
  },

  Novel: {
    authors: async (parent: any, args: any, context: Context) =>
      await context.prisma.author.findMany({ where: { novelId: parent.id } }),
  },

  Mutation: {
    addNovel: async (parent: any, args: any, context: Context) => {
      const { image, title } = args;

      return await context.prisma.novel.create({
        data: {
          image,
          title,
        },
      });
    },
    updateNovel: async (parent: any, args: any, context: Context) => {
      const { id, image, title } = args;

      return await context.prisma.novel.update({
        where: { id },
        data: {
          image,
          title,
        },
      });
    },
    deleteNovel: async (parent: any, args: any, context: Context) =>
      await context.prisma.novel.delete({ where: { id: args.id } }),

    addAuthor: async (parent: any, args: any, context: Context) => {
      const { novelId, name } = args;

      return await context.prisma.author.create({
        data: {
          novelId,
          name,
        },
      });
    },
  },
};
