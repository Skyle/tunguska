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
    returns all users
    """
    users: [User!]!
    """
    returns the currently logged in user
    """
    me: User!
    """
    return all public activities
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
    create a new activity
    """
    createActivity(activityInput: ActivityInput!): Activity!
  }

  type User implements Node {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastVisitedAt: DateTime
    createdActivities: [Activity!]!
  }

  type Activity implements Node {
    id: ID!
    title: String
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: User!
    createdById: String!
    venue: String
    geoLocation: String
    startsAt: DateTime
    endsAt: DateTime
    barrierfree: Boolean
    public: Boolean
    joinedBy: [ActivityAttendance!]!
  }

  type ActivityAttendance implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: String!
    activity: Activity!
    activityId: String!
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
    venue: String
    geoLocation: String
    startsAt: DateTime
    endsAt: DateTime
    barrierfree: Boolean
    public: Boolean
  }
`;
