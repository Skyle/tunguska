import { prisma } from "..";
import { verifyUserOrThrow } from "../auth/auth.services";
import { QueryResolvers, UserResolvers } from "../graphql/generated";

export const users: QueryResolvers["users"] = async (root, args, ctx) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  const users = await prisma.userDB.findMany();
  return users;
};

export const me: QueryResolvers["me"] = async (root, args, ctx) => {
  const verifiedUser = await verifyUserOrThrow(ctx);
  return verifiedUser;
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
