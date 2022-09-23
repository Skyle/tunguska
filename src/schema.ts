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
