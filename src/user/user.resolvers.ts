import { prisma } from "..";
import { userOrThrow } from "../auth/auth.services";
import { QueryResolvers } from "../graphql/generated";

export const users: QueryResolvers["users"] = async (parent, args, ctx) => {
  const verifiedUser = await userOrThrow(ctx);
  const users = await prisma.userDB.findMany();
  return users;
};

export const me: QueryResolvers["me"] = async (parent, args, ctx) => {
  const verifiedUser = await userOrThrow(ctx);
  return verifiedUser;
};
