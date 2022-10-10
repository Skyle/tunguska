// Queries

import { prisma } from "..";
import { QueryResolvers } from "../graphql/generated";

export const search: QueryResolvers["search"] = async (root, args, ctx) => {
  const activities = prisma.activityDB.findMany({
    where: {
      public: true,
      OR: [
        { title: { contains: args.term, mode: "insensitive" } },
        { description: { contains: args.term, mode: "insensitive" } },
      ],
    },
  });
  const users = prisma.userDB.findMany({
    where: { name: { contains: args.term, mode: "insensitive" } },
  });
  const searchData = await Promise.all([activities, users]);
  return [...searchData[0], ...searchData[1]];
};
