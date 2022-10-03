import { ImageDB } from "@prisma/client";
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
  if (user) console.log(new Date(), user?.name, "requested activities");

  return requestedActivities;
};

export const activity: QueryResolvers["activity"] = async (root, args, ctx) => {
  const user = await verifyUser(ctx);
  const requestedActivity = await prisma.activityDB.findUnique({
    where: { id: args.id },
  });
  if (user) console.log(new Date(), user?.name, "requested activity ", args.id);
  return requestedActivity;
};

// Mutations

export const createActivity: MutationResolvers["createActivity"] = async (
  root,
  { activityInput },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  if (activityInput.title === "") {
    throw new Error("Title should not be empty");
  }
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
      new Date(),
      verifiedUser.name,
      "created activity",
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
    console.log(
      new Date(),
      verifiedUser.name,
      "deleted activity",
      activity.title
    );
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

  let newActivityImage: ImageDB | null = null;
  if (activityInput.imageId) {
    newActivityImage = await prisma.imageDB.findUnique({
      where: { id: activityInput.imageId },
    });
  }
  const updatedActivity = await prisma.activityDB.update({
    where: { id },
    data: {
      ...activityInput,
      imageId: undefined,
      image: newActivityImage ? { connect: { id: newActivityImage.id } } : {},
    },
  });

  console.log(
    new Date(),
    verifiedUser.name,
    "updated activity",
    updatedActivity.title
  );
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
    console.log(
      new Date(),
      verifiedUser.name,
      "joined activity",
      activity.title
    );
    return await prisma.activityDB.update({
      where: { id: activity.id },
      data: { updatedAt: new Date() },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.error(
        verifiedUser.name,
        "already joined activity",
        activity.title
      );
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
      console.error(
        new Date(),
        verifiedUser.name,
        "already left activity",
        activity.title
      );
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

  console.log(
    new Date(),
    verifiedUser.name,
    "left activity",
    updatedActivity.title
  );
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

export const activityParticipationsFieldResolver: ActivityResolvers["participations"] =
  async (root) => {
    const participations = await prisma.activityDB
      .findUnique({ where: { id: root.id } })
      .participations();
    if (!participations)
      throw new Error("Activity should always have participations");

    return participations;
  };

export const imageActivityFieldResolver: ActivityResolvers["image"] = async (
  root
) => {
  const image = await prisma.activityDB
    .findUnique({ where: { id: root.id } })
    .image();
  return image;
};

export const activityCommentsFieldResolver: ActivityResolvers["comments"] =
  async (root) => {
    const comments = await prisma.activityDB
      .findUnique({ where: { id: root.id } })
      .comments();

    if (!comments) throw new Error("Activity should always have comments");
    return comments;
  };
