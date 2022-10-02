import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { prisma } from "..";
import { verifyUserOrThrow } from "../auth/auth.services";
import { FollowResolvers, MutationResolvers } from "../graphql/generated";

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
