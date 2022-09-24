import { IResolvers } from "mercurius";
import { prisma } from ".";
import {
  activities,
  createActivity,
  createdBy,
  deleteActivity,
  joinedBy,
} from "./activity/activity.resolvers";
import { signIn, signUp } from "./auth/auth.resolvers";
import { createdActivities, me, users } from "./user/user.resolvers";

export const resolvers: IResolvers = {
  Query: {
    // user
    users: users,
    me: me,
    // activity
    activities: activities,
  },

  Mutation: {
    // auth
    signUp: signUp,
    signIn: signIn,
    // activity
    createActivity: createActivity,
    deleteActivity: deleteActivity,
  },
  Activity: { createdBy: createdBy, joinedBy: joinedBy },
  User: { createdActivities: createdActivities },
};
