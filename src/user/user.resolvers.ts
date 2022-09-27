import { ImageDB } from "@prisma/client";
import { prisma } from "..";
import { verifyUser, verifyUserOrThrow } from "../auth/auth.services";
import {
  MutationResolvers,
  QueryResolvers,
  UserResolvers,
} from "../graphql/generated";

export const user: QueryResolvers["user"] = async (root, args, ctx) => {
  const authUser = await verifyUser(ctx);
  const requestedUser = await prisma.userDB.findUnique({
    where: { id: args.id },
  });
  return requestedUser;
};

export const users: QueryResolvers["users"] = async (root, args, ctx) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const users = await prisma.userDB.findMany();
  return users;
};

export const me: QueryResolvers["me"] = async (root, args, ctx) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  return verifiedUser;
};

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
    return activities;
  } else {
    const activities = await prisma.userDB
      .findUnique({ where: { id: root.id } })
      .createdActivities({ where: { public: true } });
    return activities;
  }
};

export const participatesIn: UserResolvers["participatesIn"] = async (root) => {
  const activities = await prisma.userDB
    .findUnique({ where: { id: root.id } })
    .participatesIn();
  return activities;
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
  return createdImagesForUser;
};
