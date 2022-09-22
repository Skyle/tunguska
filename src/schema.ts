import { gql } from "mercurius-codegen";

export const schema = gql`
  scalar DateTime

  interface Node {
    id: ID!
  }

  type Query {
    users: [User!]!
    me: User!
  }

  type Mutation {
    signUp(name: String!, password: String!): User!
    signIn(name: String!, password: String!): String!
  }

  type User implements Node {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
