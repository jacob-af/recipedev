/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @typedef { import("@prisma/client").UserCreateArgs } UserCreateArgs
 */

const { gql } = require("apollo-server");

const { DateTimeResolver } = require("graphql-scalars");

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
    recipes: [Recipe!]!
    ingredients: [Ingredient!]!
  }

  type Recipe {
    id: ID!
    name: String
    origin: String
    postedBy: User
    history: String
    specs: [Spec]
  }

  type Ingredient {
    id: ID!
    name: String
    amount: Int
    price: Float
    source: String
    postedBy: User
  }

  type Query {
    allGroups: [Group]
    allUsers: [User]
    allRecipes: [Recipe]
    allIngredients: [Ingredient]
  }

  type Spec {
    id: ID!
    instructions: String
    glassware: String
    ice: String
    postedBy: User
    quantities: [Quantity]!
  }

  type Quantity {
    id: ID!
    spec_id: Int
    ingredient_id: Int
    amount: Float
    unit: String
  }

  type Mutation {
    addRecipe(
      name: String
      origin: String
      postedBy: Int
      history: String
    ): Recipe!
    addSpec(
      instructions: String
      glassware: String
      ice: String
      postedBy: Int
      quantities: [Int]!
    ): Spec!
    addIngredient(
      name: String
      amount: Int
      price: Float
      source: String
      postedBy: Int
    ): Ingredient!
    login(email: String!, password: String!): AuthPayload!
    signup(
      user_name: String!
      first_name: String
      last_name: String
      email: String!
      password: String!
    ): AuthPayload!
  }

  scalar DateTimeResolver
`;

module.exports = {
  typeDefs
};
