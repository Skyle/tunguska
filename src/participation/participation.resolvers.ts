// FieldResolvers

import { prisma } from "..";
import { verifyUserOrThrow } from "../auth/auth.services";
import { ParticipationResolvers, QueryResolvers } from "../graphql/generated";

// Queries

export const participations: QueryResolvers["participations"] = async (
  root,
  args,
  ctx
) => {
  const user = await verifyUserOrThrow(ctx);
  const requestedParticipations = await prisma.participationDB.findMany({});
  console.log(new Date(), user?.name, "requested participations");

  return requestedParticipations;
};

// FieldResolvers

export const userParticipationFieldResolver: ParticipationResolvers["user"] =
  async (root) => {
    const user = await prisma.participationDB
      .findUnique({ where: { id: root.id } })
      .user();

    if (!user) throw new Error("Attendance should always have a user");
    return user;
  };

export const activityParticipationFieldResolver: ParticipationResolvers["activity"] =
  async (root) => {
    const activity = await prisma.participationDB
      .findUnique({ where: { id: root.id } })
      .activity();

    if (!activity) throw new Error("Attendance should always have an activity");
    return activity;
  };
