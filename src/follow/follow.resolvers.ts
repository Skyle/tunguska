import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { MercuriusContext } from "mercurius";
import { prisma } from "..";
import { verifyUserOrThrow } from "../auth/auth.services";
import {
  Follow,
  FollowResolvers,
  IsTypeOfResolverFn,
  MutationResolvers,
} from "../graphql/generated";

export const follow: MutationResolvers["follow"] = async (
  root,
  { userId },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const userToFollow = await prisma.userDB.findUnique({
    where: { id: userId },
  });
  if (!userToFollow) throw new Error("User not found");
  try {
    const newFollow = await prisma.followDB.create({
      data: {
        by: { connect: { id: verifiedUser.id } },
        towards: { connect: { id: userToFollow.id } },
      },
    });
    console.log(new Date(), verifiedUser.name, "followed", userToFollow.name);
    return newFollow;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("You already followed this User");
    }
    console.error(error);
    throw new Error("Follow could not be created");
  }
};

export const unfollow: MutationResolvers["unfollow"] = async (
  root,
  { userId },
  ctx
) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const userToUnfollow = await prisma.userDB.findUnique({
    where: { id: userId },
  });
  if (!userToUnfollow) throw new Error("User not found");

  try {
    await prisma.followDB.delete({
      where: {
        towardsId_byId: { towardsId: userToUnfollow.id, byId: verifiedUser.id },
      },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.error("You are not following this User");

      throw new Error("You are not following this User");
    }
    throw new Error("Follow could not be deleted");
  }

  const updatedVerifiedUser = await prisma.userDB.findUnique({
    where: { id: verifiedUser.id },
  });
  if (!updatedVerifiedUser) throw new Error("User not found");
  return updatedVerifiedUser;
};

// FieldResolvers

export const followByResolver: FollowResolvers["by"] = async (root) => {
  const by = await prisma.followDB.findUnique({ where: { id: root.id } }).by();

  if (!by) throw new Error("No user found");
  return by;
};

export const followTowardsResolver: FollowResolvers["towards"] = async (
  root
) => {
  const towards = await prisma.followDB
    .findUnique({ where: { id: root.id } })
    .towards();

  if (!towards) throw new Error("No user found");
  return towards;
};
