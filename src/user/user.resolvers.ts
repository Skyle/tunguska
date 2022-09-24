import { prisma } from "..";
import { userOrThrow } from "../auth/auth.services";
import { QueryResolvers, UserResolvers } from "../graphql/generated";

export const users: QueryResolvers["users"] = async (root, args, ctx) => {
  const verifiedUser = await userOrThrow(ctx);
  const users = await prisma.userDB.findMany();
  return users;
};

export const me: QueryResolvers["me"] = async (root, args, ctx) => {
  const verifiedUser = await userOrThrow(ctx);
  return verifiedUser;
};

// FieldResolvers

export const createdActivities: UserResolvers["createdActivities"] = async (
  root
) => {
  const activities = await prisma.userDB
    .findUnique({ where: { id: root.id } })
    .createdActivities();
  return activities;
};

export const participatesIn: UserResolvers["participatesIn"] = async (root) => {
  const activities = await prisma.userDB
    .findUnique({ where: { id: root.id } })
    .participatesIn();
  return activities;
};
