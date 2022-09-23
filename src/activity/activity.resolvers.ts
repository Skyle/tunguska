import { prisma } from "..";
import { userOrThrow } from "../auth/auth.services";
import {
  ActivityResolvers,
  MutationResolvers,
  QueryResolvers,
} from "../graphql/generated";

export const createActivity: MutationResolvers["createActivity"] = async (
  root,
  { activityInput },
  ctx
) => {
  const verifiedUser = await userOrThrow(ctx);
  return await prisma.activityDB.create({
    data: { ...activityInput, createdBy: { connect: { id: verifiedUser.id } } },
  });
};

export const activities: QueryResolvers["activities"] = async (
  root,
  args,
  ctx
) => {
  return await prisma.activityDB.findMany();
};

export const createdBy: ActivityResolvers["createdBy"] = async (root) => {
  const user = await prisma.activityDB
    .findUnique({ where: { id: root.id } })
    .createdBy();
  if (!user) throw new Error("Activity sollte eigentlich einen User haben");
  return user;
};

export const joinedBy: ActivityResolvers["joinedBy"] = async (root) => {
  const users = await prisma.activityDB
    .findUnique({ where: { id: root.id } })
    .joinedBy();
  return users;
};
