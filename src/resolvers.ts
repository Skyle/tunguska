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
  createdImages,
  me,
  participatesIn,
  profileImage,
  updateUser,
  user,
  users,
} from "./user/user.resolvers";
import {
  createdByImageFieldResolver,
  uploadImage,
} from "./image/image.resolvers";

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
    // image
    uploadImage: uploadImage,
    // user
    updateUser: updateUser,
  },
  Activity: { createdBy: createdBy, participations: participations },
  User: {
    createdActivities: createdActivities,
    participatesIn: participatesIn,
    profileImage: profileImage,
    createdImages: createdImages,
  },
  Participation: {
    user: userParticipationFieldResolver,
    activity: activityParticipationFieldResolver,
  },
  Image: {
    createdBy: createdByImageFieldResolver,
  },
};
