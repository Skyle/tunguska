import { IResolvers } from "mercurius";
import {
  activities,
  activity,
  createActivity,
  createdBy,
  deleteActivity,
  imageActivityFieldResolver,
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
  participationsUserFieldResolver,
  profileImage,
  updateUser,
  user,
  userFollowsResolver,
  userIsFollowingResolver,
  users,
} from "./user/user.resolvers";
import {
  createdByImageFieldResolver,
  uploadImage,
  userImageFieldResolver,
} from "./image/image.resolvers";
import {
  follow,
  followByResolver,
  followTowardsResolver,
} from "./follow/follow.resolvers";

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
    // follow
    follow: follow,
  },
  Activity: {
    createdBy: createdBy,
    participations: participations,
    image: imageActivityFieldResolver,
  },
  User: {
    createdActivities: createdActivities,
    participations: participationsUserFieldResolver,
    profileImage: profileImage,
    createdImages: createdImages,
    follows: userFollowsResolver,
    isFollowing: userIsFollowingResolver,
  },
  Participation: {
    user: userParticipationFieldResolver,
    activity: activityParticipationFieldResolver,
  },
  Image: {
    createdBy: createdByImageFieldResolver,
    user: userImageFieldResolver,
  },
  Follow: {
    by: followByResolver,
    towards: followTowardsResolver,
  },
};
