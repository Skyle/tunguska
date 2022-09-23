import { IResolvers } from "mercurius";
import { signIn, signUp } from "./auth/auth.resolvers";
import { me, users } from "./user/user.resolvers";

export const resolvers: IResolvers = {
  Query: {
    // user
    users: users,
    me: me,
  },

  Mutation: {
    // auth
    signUp: signUp,
    signIn: signIn,
  },
};
