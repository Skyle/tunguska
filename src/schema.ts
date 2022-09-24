import { gql } from "mercurius-codegen";

export const schema = gql`
  scalar DateTime
  scalar JWT

  enum Order {
    ASC
    DESC
  }

  interface Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    """
    all users
    """
    users: [User!]!
    """
    currently logged in user (you)
    """
    me: User!
    """
    all public activities
    """
    activities(limit: Float, skip: Float, order: Order): [Activity!]!
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
    join an activity
    """
    joinActivity(id: ID!): Activity!
    """
    leave an activity
    """
    leaveActivity(id: ID!): Activity!
  }

  type User implements Node {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastVisitedAt: DateTime
    createdActivities: [Activity!]!
    participatesIn: [Participation!]!
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
  }
`;
