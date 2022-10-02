import { prisma } from "..";
import { verifyUserOrThrow } from "../auth/auth.services";
import { MutationResolvers } from "../graphql/generated";

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

  const newFollow = await prisma.followDB.create({
    data: {
      by: { connect: { id: verifiedUser.id } },
      towards: { connect: { id: userToFollow.id } },
    },
  });
  return newFollow;
};
