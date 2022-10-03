import { ImageDB } from "@prisma/client";
import { prisma } from "..";
import { verifyUser, verifyUserOrThrow } from "../auth/auth.services";
import {
  MutationResolvers,
  QueryResolvers,
  UserResolvers,
} from "../graphql/generated";

// Queries

export const user: QueryResolvers["user"] = async (root, args, ctx) => {
  const authUser = await verifyUser(ctx);
  const requestedUser = await prisma.userDB.findUnique({
    where: { id: args.id },
  });
  if (authUser)
    console.log(new Date(), authUser.name, "requested user ", args.id);
  return requestedUser;
};

export const users: QueryResolvers["users"] = async (root, args, ctx) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const users = await prisma.userDB.findMany();
  console.log(new Date(), verifiedUser.name, "requested users");
  return users;
};

export const me: QueryResolvers["me"] = async (root, args, ctx) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  console.log(new Date(), verifiedUser.name, "requested me");
  return verifiedUser;
};

// Mutations

export const updateUser: MutationResolvers["updateUser"] = async (
  root,
  args,
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  let newProfileImage: ImageDB | null = null;
  if (args.imageId) {
    newProfileImage = await prisma.imageDB.findUnique({
      where: { id: args.imageId },
    });
  }

  const updatedUser = await prisma.userDB.update({
    where: { id: verifiedUser.id },
    data: {
      selfDescription: args.selfDescription,
      profileImage: newProfileImage
        ? { connect: { id: newProfileImage.id } }
        : {},
    },
  });
  console.log(new Date(), verifiedUser.name, "updated user");

  return updatedUser;
};

// FieldResolvers

export const createdActivities: UserResolvers["createdActivities"] = async (
  root,
  args,
  ctx
) => {
  if (ctx.user && root.id === ctx.user.id) {
    const activities = await prisma.userDB
      .findUnique({ where: { id: root.id } })
      .createdActivities();
    if (!activities) throw new Error("No activities found");
    return activities;
  } else {
    const activities = await prisma.userDB
      .findUnique({ where: { id: root.id } })
      .createdActivities({ where: { public: true } });
    if (!activities) throw new Error("No activities found");
    return activities;
  }
};

export const participationsUserFieldResolver: UserResolvers["participations"] =
  async (root) => {
    const participations = await prisma.userDB
      .findUnique({ where: { id: root.id } })
      .participations();
    if (!participations) throw new Error("No participations found");
    return participations;
  };

export const profileImage: UserResolvers["profileImage"] = async (root) => {
  const profileImageFromDB = await prisma.userDB
    .findUnique({ where: { id: root.id } })
    .profileImage();
  return profileImageFromDB;
};

export const createdImages: UserResolvers["createdImages"] = async (root) => {
  const createdImagesForUser = await prisma.userDB
    .findUnique({ where: { id: root.id } })
    .createdImages();
  if (!createdImagesForUser) throw new Error("No images found");
  return createdImagesForUser;
};

export const userFollowsResolver: UserResolvers["follows"] = async (root) => {
  const follows = await prisma.userDB
    .findUnique({ where: { id: root.id } })
    .follows();
  if (!follows) throw new Error("No follows found");
  return follows;
};

export const userIsFollowingResolver: UserResolvers["follows"] = async (
  root
) => {
  const isFollowing = await prisma.userDB
    .findUnique({ where: { id: root.id } })
    .isFollowing();
  if (!isFollowing) throw new Error("No isFollowing found");
  return isFollowing;
};

export const userCreatedCommentsFieldResolver: UserResolvers["createdComments"] =
  async (root) => {
    const createdComments = await prisma.userDB
      .findUnique({ where: { id: root.id } })
      .createdComments();
    if (!createdComments) throw new Error("No createdComments found");
    return createdComments;
  };
