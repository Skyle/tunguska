// FieldResolvers

import { prisma } from "..";
import { ParticipationResolvers } from "../graphql/generated";

// FieldResolvers

export const user: ParticipationResolvers["user"] = async (root) => {
  const user = await prisma.participationDB
    .findUnique({ where: { id: root.id } })
    .user();

  if (!user) throw new Error("Attendance should always have a user");
  return user;
};

export const activity: ParticipationResolvers["activity"] = async (root) => {
  const activity = await prisma.participationDB
    .findUnique({ where: { id: root.id } })
    .activity();

  if (!activity) throw new Error("Attendance should always have an activity");
  return activity;
};
