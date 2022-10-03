import { IResolvers } from "mercurius";
import {
  activities,
  activity,
  activityCommentsFieldResolver,
  createActivity,
  createdBy,
  deleteActivity,
  imageActivityFieldResolver,
  joinActivity,
  leaveActivity,
  activityParticipationsFieldResolver,
  updateActivity,
} from "./activity/activity.resolvers";
import {
  activityParticipationFieldResolver,
  participations,
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
  userCreatedCommentsFieldResolver,
  userFollowsResolver,
  userIsFollowingResolver,
  users,
} from "./user/user.resolvers";
import {
  createdByImageFieldResolver,
  uploadImage,
  imageUserFieldResolver,
} from "./image/image.resolvers";
import {
  follow,
  followByResolver,
  followTowardsResolver,
  unfollow,
} from "./follow/follow.resolvers";
import {
  commentActivityFieldResolver,
  commentCreatedByFieldResolver,
  createComment,
  deleteComment,
} from "./comment/comment.resolvers";
import { feed } from "./feed/feed.resolvers";

export const resolvers: IResolvers = {
  Query: {
    // user
    user: user,
    users: users,
    me: me,
    // activity
    activities: activities,
    activity: activity,
    // feed
    feed: feed,
    // participation
    participations: participations,
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
    unfollow: unfollow,
    // comment
    createComment: createComment,
    deleteComment: deleteComment,
  },
  Activity: {
    createdBy: createdBy,
    participations: activityParticipationsFieldResolver,
    image: imageActivityFieldResolver,
    comments: activityCommentsFieldResolver,
    isTypeOf: (obj, lol) => {
      console.log(obj);

      if (obj.title) {
        return true;
      } else {
        return false;
      }
    },
  },
  User: {
    createdActivities: createdActivities,
    participations: participationsUserFieldResolver,
    profileImage: profileImage,
    createdImages: createdImages,
    follows: userFollowsResolver,
    isFollowing: userIsFollowingResolver,
    createdComments: userCreatedCommentsFieldResolver,
  },
  Participation: {
    user: userParticipationFieldResolver,
    activity: activityParticipationFieldResolver,
    isTypeOf: (obj) => {
      console.log(obj);

      const anyedobj = obj as any;
      if (anyedobj.userId && anyedobj.activityId && !anyedobj.text) {
        return true;
      } else {
        return false;
      }
    },
  },
  Image: {
    createdBy: createdByImageFieldResolver,
    user: imageUserFieldResolver,
  },
  Follow: {
    by: followByResolver,
    towards: followTowardsResolver,
    isTypeOf: (obj) => {
      console.log(obj);

      const anyedobj = obj as any;

      if (anyedobj.towardsId && anyedobj.byId) {
        return true;
      } else {
        return false;
      }
    },
  },
  Comment: {
    createdBy: commentCreatedByFieldResolver,
    activity: commentActivityFieldResolver,
    isTypeOf: (obj) => {
      console.log(obj);

      if (obj.text !== undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
};
