// Queries

import { prisma } from "..";
import { verifyUser, verifyUserOrThrow } from "../auth/auth.services";
import { QueryResolvers } from "../graphql/generated";

export const feed: QueryResolvers["feed"] = async (root, args, ctx) => {
  const user = await verifyUser(ctx);
  const activities = prisma.activityDB.findMany({
    where: { public: true },
    take: 10,
    orderBy: { createdAt: "desc" },
  });
  const comments = prisma.commentDB.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });
  const participations = prisma.participationDB.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });
  const follows = prisma.followDB.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });
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
  if (user) console.log(new Date(), user?.name, "requested feed");

  return sortedFeedData.slice(0, 10);
};
