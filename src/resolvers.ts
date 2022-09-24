import { IResolvers } from "mercurius";
import {
  activities,
  createActivity,
  createdBy,
  deleteActivity,
  joinActivity,
  leaveActivity,
  participations,
  updateActivity,
} from "./activity/activity.resolvers";
import { activity, user } from "./participation/participation.resolvers";
import { signIn, signUp } from "./auth/auth.resolvers";
import {
  createdActivities,
  me,
  participatesIn,
  users,
} from "./user/user.resolvers";

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
    joinActivity: joinActivity,
    leaveActivity: leaveActivity,
    updateActivity: updateActivity,
  },
  Activity: { createdBy: createdBy, participations: participations },
  User: {
    createdActivities: createdActivities,
    participatesIn: participatesIn,
  },
  Participation: { user: user, activity: activity },
};
