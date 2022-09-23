import { gql } from "mercurius-codegen";

export const schema = gql`
  scalar DateTime
  scalar JWT

  interface Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]!
    me: User!
    activities: [Activity!]!
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
    beschreibung: String
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: User!
    createdById: String!
    venue: String
    geoLocation: String
    startsAt: DateTime
    endsAt: DateTime
    barrierefrei: Boolean
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
    beschreibung: String
    venue: String
    geoLocation: String
    startsAt: DateTime
    endsAt: DateTime
    barrierefrei: Boolean
    public: Boolean
  }
`;
