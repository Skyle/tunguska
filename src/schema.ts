import { gql } from "mercurius-codegen";

export const schema = gql`
  scalar DateTime
  scalar JWT
  scalar Upload

  enum Order {
    """
    createdAt ascending
    """
    ASC
    """
    createdAt descending
    """
    DESC
    """
    startsAt ascending
    """
    STARTSATASC
    """
    startsAt descending
    """
    STARTSATDESC
  }

  interface Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    """
    all public users
    """
    users: [User!]!
    """
    a single User by ID
    """
    user(id: ID!): User
    """
    currently logged in user (you)
    """
    me: User!
    """
    all public activities
    """
    activities(
      limit: Float
      skip: Float
      order: Order
      past: Boolean
    ): [Activity!]!
    """
    a single public activity
    """
    activity(id: ID!): Activity
    feed: [FeedItem!]
    participations: [Participation!]!
    search(term: String!): [SearchResult!]!
  }

  type Mutation {
    """
    create a new User  and get a JWT to authenticate with
    """
    signUp(credentials: NamePasswordInput!): JWT!
    """
    sign in with credentials and get a JWT to authenticate with
    """
    signIn(credentials: NamePasswordInput!): JWT!
    """
    create an new activity
    """
    createActivity(activityInput: ActivityInput!): Activity!
    """
    delete an activity
    """
    deleteActivity(id: ID!): String!
    """
    update an activity
    """
    updateActivity(id: ID!, activityInput: ActivityInput!): Activity!
    """
    participate in an activity
    """
    joinActivity(id: ID!): Activity!
    """
    do not participate in an activity
    """
    leaveActivity(id: ID!): Activity!
    """
    upload an image file as multipart/form-data and get an image back
    """
    uploadImage(image: Upload!): Image!
    """
    update an user
    """
    updateUser(imageId: String, selfDescription: String): User!
    """
    follow an user
    """
    follow(userId: String!): Follow!
    """
    unfollow an user
    """
    unfollow(userId: String!): User!
    """
    create a comment
    """
    createComment(activityId: String!, text: String!): Comment!
    """
    delete a comment
    """
    deleteComment(id: ID!): String!
  }

  type User implements Node {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastVisitedAt: DateTime
    createdActivities: [Activity!]!
    participations(order: Order): [Participation!]!
    createdImages: [Image!]!
    public: Boolean!
    profileImage: Image
    selfDescription: String
    """
    who is following this User
    """
    follows: [Follow!]!
    """
    who is followed by this User
    """
    isFollowing: [Follow!]!
    createdComments: [Comment!]!
  }

  type Activity implements Node {
    id: ID!
    title: String
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: User!
    venueName: String
    geoLocation: String
    startsAt: DateTime
    endsAt: DateTime
    barrierFree: Boolean
    public: Boolean
    participations: [Participation!]!
    freeWifiAvailable: Boolean
    toilettsAvailable: Boolean
    hygienePolicy: String
    kidsWelcome: Boolean
    petsWelcome: Boolean
    smokingAllowed: Boolean
    image: Image
    comments: [Comment!]!
  }

  """
  Participation is when a User takes part in an Activity
  """
  type Participation implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    activity: Activity!
  }

  type Image implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: User!
    uploadCompleted: Boolean!
    user: User
    activity: Activity
  }

  type Follow implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    towards: User!
    by: User!
  }

  type Comment implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: User!
    activity: Activity!
    text: String!
  }

  input NamePasswordInput {
    """
    not empty
    length >= 2
    """
    name: String!

    """
    length >= 6
    """
    password: String!
  }

  input ActivityInput {
    title: String
    description: String
    venueName: String
    geoLocation: String
    startsAt: DateTime
    endsAt: DateTime
    barrierFree: Boolean
    public: Boolean
    freeWifiAvailable: Boolean
    toilettsAvailable: Boolean
    hygienePolicy: String
    kidsWelcome: Boolean
    petsWelcome: Boolean
    smokingAllowed: Boolean
    imageId: String
  }

  union FeedItem = Activity | Follow | Comment | Participation
  union SearchResult = Activity | User
`;
