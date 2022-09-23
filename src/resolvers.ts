import { IResolvers } from "mercurius";
import { prisma } from ".";
import { signIn, signUp } from "./auth/auth.resolvers";
import { userOrThrow } from "./auth/auth.services";

export const resolvers: IResolvers = {
  Query: {
    async users(root, args, ctx) {
      const verifiedUser = userOrThrow(ctx);
      console.log(verifiedUser);

      const users = await prisma.userDB.findMany();
      return users;
    },
    async me(root, args, ctx) {
      const verifiedUser = userOrThrow(ctx);
      return verifiedUser;
    },
  },

  Mutation: {
    // auth
    signUp: signUp,
    signIn: signIn,
  },
};
