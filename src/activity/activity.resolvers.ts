import { prisma } from "..";
import { userOrThrow } from "../auth/auth.services";
import {
  ActivityResolvers,
  MutationResolvers,
  QueryResolvers,
} from "../graphql/generated";

// Queries

export const activities: QueryResolvers["activities"] = async (
  root,
  args,
  ctx
) => {
  return await prisma.activityDB.findMany({
    where: { public: true },
    take: args.limit ?? 10,
    skip: args.skip ?? 0,
    orderBy: { createdAt: args.order === "ASC" ? "asc" : "desc" },
  });
};

// Mutations

export const createActivity: MutationResolvers["createActivity"] = async (
  root,
  { activityInput },
  ctx
) => {
  const verifiedUser = await userOrThrow(ctx);
  try {
    return await prisma.activityDB.create({
      data: {
        ...activityInput,
        createdBy: { connect: { id: verifiedUser.id } },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Activity could not be created");
  }
};

export const deleteActivity: MutationResolvers["deleteActivity"] = async (
  root,
  { id },
  ctx
) => {
  const verifiedUser = await userOrThrow(ctx);
  const activity = await prisma.activityDB.findUnique({
    where: { id },
  });
  if (!activity) throw new Error("Activity could not be found");
  if (activity.createdById !== verifiedUser.id) {
    throw new Error("foreign Activities can not be deleted");
  }
  try {
    await prisma.activityDB.delete({ where: { id: activity.id } });
    return "Activity " + activity.id + " deleted";
  } catch (error) {
    console.error(error);
    throw new Error("Activity could not be deleted");
  }
};

// FieldResolvers

export const createdBy: ActivityResolvers["createdBy"] = async (root) => {
  const user = await prisma.activityDB
    .findUnique({ where: { id: root.id } })
    .createdBy();

  if (!user) throw new Error("Activity should always have a creator");
  return user;
};

export const joinedBy: ActivityResolvers["joinedBy"] = async (root) => {
  const users = await prisma.activityDB
    .findUnique({ where: { id: root.id } })
    .joinedBy();
  return users;
};
