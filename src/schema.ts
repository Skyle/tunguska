import { gql } from "mercurius-codegen";

export const schema = gql`
  scalar DateTime

  interface Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]!
    me: User!
  }

  type Mutation {
    """
    create a new User
    """
    signUp(credentials: NamePasswordInput!): User!
    """
    sign in with credentials and get a JWT to authenticate with
    """
    signIn(credentials: NamePasswordInput!): String!
  }

  type User implements Node {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastVisitedAt: DateTime
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
`;
