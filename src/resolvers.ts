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
  },
  Image: {
    createdBy: createdByImageFieldResolver,
    user: imageUserFieldResolver,
  },
  Follow: {
    by: followByResolver,
    towards: followTowardsResolver,
  },
  Comment: {
    createdBy: commentCreatedByFieldResolver,
    activity: commentActivityFieldResolver,
  },
  FeedItem: {
    resolveType: (obj) => {
      const anyedobj = obj as any;
      if (anyedobj.text) {
        return "Comment";
      } else if (anyedobj.title || anyedobj.title === "") {
        return "Activity";
      } else if (anyedobj.towardsId && anyedobj.byId) {
        return "Follow";
      } else {
        return "Participation";
      }
    },
  },
};
