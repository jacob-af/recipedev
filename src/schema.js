/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @typedef { import("@prisma/client").UserCreateArgs } UserCreateArgs
 */

const { gql } = require("apollo-server");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const { DateTimeResolver } = require("graphql-scalars");
const { context } = require("./context");

const typeDefs = gql`
  type AuthPayload {
    token: String
    user: User
  }

  type Group {
    id: ID
    group_name: String
    date_created: DateTimeResolver
  }

  type User {
    id: ID!
    user_name: String!
    first_name: String
    last_name: String
    date_joined: DateTimeResolver
    email: String!
    password: String!
  }

  type Recipe {
    id: ID
    name: String
    created_by: String
    history: String
  }

  type Query {
    allGroups: [Group]
    allUsers: [User]
    allRecipes: [Recipe]
  }

  type Mutation {
    addRecipe(name: String, created_by: String, history: String): Recipe
    login(email: String!, password: String!): AuthPayload
    signup(
      user_name: String!
      first_name: String
      last_name: String
      email: String!
      password: String!
    ): AuthPayload
  }

  scalar DateTimeResolver
`;

const resolvers = {
  Query,
  Mutation
};

module.exports = {
  resolvers,
  typeDefs
};
