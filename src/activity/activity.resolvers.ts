import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { prisma } from "..";
import { verifyUser, verifyUserOrThrow } from "../auth/auth.services";
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
  const user = await verifyUser(ctx);
  const requestedActivities = await prisma.activityDB.findMany({
    where: { public: true },
    take: args.limit ?? 10,
    skip: args.skip ?? 0,
    orderBy: { createdAt: args.order === "ASC" ? "asc" : "desc" },
  });
  console.log(user?.name, " requested activities");
  return requestedActivities;
};

export const activity: QueryResolvers["activity"] = async (root, args, ctx) => {
  const user = await verifyUser(ctx);
  const requestedActivity = await prisma.activityDB.findUnique({
    where: { id: args.id },
  });
  console.log(user?.name, " requested activity ", requestedActivity?.title);
  return requestedActivity;
};

// Mutations

export const createActivity: MutationResolvers["createActivity"] = async (
  root,
  { activityInput },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  try {
    const createdActivities = await prisma.activityDB.create({
      data: {
        ...activityInput,
        imageId: undefined,
        createdBy: { connect: { id: verifiedUser.id } },
        image: activityInput.imageId
          ? { connect: { id: activityInput.imageId } }
          : undefined,
      },
    });
    console.log(
      verifiedUser.name,
      " created activity ",
      createdActivities.title
    );
    return createdActivities;
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
  const verifiedUser = await verifyUserOrThrow(ctx);
  const activity = await prisma.activityDB.findUnique({
    where: { id },
  });
  if (!activity) throw new Error("Activity could not be found");
  if (activity.createdById !== verifiedUser.id) {
    throw new Error("foreign Activities can not be deleted");
  }
  try {
    await prisma.activityDB.delete({ where: { id: activity.id } });
    console.log(verifiedUser.name, " deleted activity ", activity.title);
    return "Activity " + activity.id + " deleted";
  } catch (error) {
    console.error(error);
    throw new Error("Activity could not be deleted");
  }
};

export const updateActivity: MutationResolvers["updateActivity"] = async (
  _,
  { id, activityInput },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const activityToUpdate = await prisma.activityDB.findUnique({
    where: { id },
  });

  if (!activityToUpdate) throw new Error("Activity could not be found");

  if (activityToUpdate.createdById !== verifiedUser.id) {
    throw new Error("foreign Activities can not be updated");
  }

  const updatedActivity = await prisma.activityDB.update({
    where: { id },
    data: {
      ...activityInput,
      imageId: undefined,
      image: activityInput.imageId
        ? { connect: { id: activityInput.imageId } }
        : undefined,
    },
  });

  console.log(verifiedUser.name, " updated activity ", updatedActivity.title);

  return updatedActivity;
};

export const joinActivity: MutationResolvers["joinActivity"] = async (
  _,
  { id },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const activity = await prisma.activityDB.findUnique({
    where: { id },
  });
  if (!activity) throw new Error("Activity could not be found");
  if (activity.public === false) throw new Error("Activity must be public");
  try {
    await prisma.participationDB.create({
      data: {
        activity: { connect: { id: activity.id } },
        user: { connect: { id: verifiedUser.id } },
      },
    });
    return await prisma.activityDB.update({
      where: { id: activity.id },
      data: { updatedAt: new Date() },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("You already joined this Activity");
    }
    console.error(error);
    throw new Error("Activity could not be joined");
  }
};

export const leaveActivity: MutationResolvers["leaveActivity"] = async (
  _,
  { id },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const activity = await prisma.activityDB.findUnique({
    where: { id },
  });
  if (!activity) throw new Error("Activity could not be found");
  try {
    await prisma.participationDB.delete({
      where: {
        userId_activityId: { activityId: activity.id, userId: verifiedUser.id },
      },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("You are not attending this Activity");
    }
    console.error(error);
    throw new Error("Activity could not be left");
  }
  const updatedActivity = await prisma.activityDB.update({
    where: { id },
    data: { updatedAt: new Date() },
  });
  if (!updatedActivity) throw new Error("Activity could not be found");

  return updatedActivity;
};

// FieldResolvers

export const createdBy: ActivityResolvers["createdBy"] = async (root) => {
  const user = await prisma.activityDB
    .findUnique({ where: { id: root.id } })
    .createdBy();

  if (!user) throw new Error("Activity should always have a creator");
  return user;
};

export const participations: ActivityResolvers["participations"] = async (
  root
) => {
  const users = await prisma.activityDB
    .findUnique({ where: { id: root.id } })
    .participations();
  return users;
};

export const imageActivityFieldResolver: ActivityResolvers["image"] = async (
  root
) => {
  const image = await prisma.activityDB
    .findUnique({ where: { id: root.id } })
    .image();
  return image;
};
