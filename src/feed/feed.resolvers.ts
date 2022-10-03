// Queries

import { prisma } from "..";
import { verifyUser, verifyUserOrThrow } from "../auth/auth.services";
import { QueryResolvers } from "../graphql/generated";

export const feed: QueryResolvers["feed"] = async (root, args, ctx) => {
  const user = await verifyUser(ctx);
  const activities = prisma.activityDB.findMany({ where: { public: true } });
  const comments = prisma.commentDB.findMany({});
  const participations = prisma.participationDB.findMany({});
  const follows = prisma.followDB.findMany({});
  const feedData = await Promise.all([
    activities,
    comments,
    participations,
    follows,
  ]);
  const returnFeedData = [
    ...feedData[0],
    ...feedData[1],
    ...feedData[2],
    ...feedData[3],
  ];
  const sortedFeedData = returnFeedData.sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return sortedFeedData.slice(0, 10);
};
