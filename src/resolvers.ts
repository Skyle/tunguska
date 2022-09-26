import { IResolvers } from "mercurius";
import {
  activities,
  activity,
  createActivity,
  createdBy,
  deleteActivity,
  joinActivity,
  leaveActivity,
  participations,
  updateActivity,
} from "./activity/activity.resolvers";
import {
  activityParticipationFieldResolver,
  userParticipationFieldResolver,
} from "./participation/participation.resolvers";
import { signIn, signUp } from "./auth/auth.resolvers";
import {
  createdActivities,
  me,
  participatesIn,
  user,
  users,
} from "./user/user.resolvers";
import { uploadImage } from "./image/image.resolvers";

export const resolvers: IResolvers = {
  Query: {
    // user
    user: user,
    users: users,
    me: me,
    // activity
    activities: activities,
    activity: activity,
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
    //
    uploadImage: uploadImage,
  },
  Activity: { createdBy: createdBy, participations: participations },
  User: {
    createdActivities: createdActivities,
    participatesIn: participatesIn,
  },
  Participation: {
    user: userParticipationFieldResolver,
    activity: activityParticipationFieldResolver,
  },
};
