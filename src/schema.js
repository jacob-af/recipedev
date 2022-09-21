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

  type BatchPayload {
    count: Int
  }

  type CompleteRecipe {
    recipe: Recipe
    version: CompleteVersion
  }

  type CompleteVersion {
    version: Version
    specs: [Spec]
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
    recipes: [Recipe!]
    versions: [Version!]
    sharedVersions: [Version!]
    ingredients: [Ingredient!]
    specs: [Spec]
  }

  type UserVersion {
    id: ID!
    versions: [Version!]
    users: [User!]
  }

  type Recipe {
    id: ID!
    name: String
    origin: String
    postedBy: User
    history: String
    versions: [Version]
  }

  type Version {
    id: ID!
    recipe: Recipe
    versionName: String
    instructions: String
    glassware: String
    ice: String
    postedBy: User
    usersVersion: [User]
    specs: [Spec]
  }

  type Spec {
    id: ID!
    order: Int
    version: Version
    ingredient: Ingredient
    amount: Float
    unit: String
    postedBy: User
  }

  type Ingredient {
    id: ID!
    name: String
    amount: Int
    unit: String
    price: Float
    source: String
    postedBy: User
    specs: [Spec]
  }

  type Query {
    allGroups: [Group]
    allUsers: [User]
    allRecipes: [Recipe]
    allIngredients: [Ingredient]
    allVersions: [Version]
    allSpecs: [Spec]
  }

  input SpecInput {
    order: Int
    ingredientId: Int
    amount: Float
    unit: String
  }

  input SpecUpdate {
    ingredientId: Int
    amount: Float
    unit: String
  }

  input VersionInput {
    versionName: String
    instructions: String
    glassware: String
    ice: String
    specs: [SpecInput]
  }

  type Mutation {
    addIngredient(
      name: String
      amount: Int
      unit: String
      price: Float
      source: String
      postedBy: Int
    ): Ingredient!

    addVersion(
      recipeId: Int
      versionName: String
      instructions: String
      glassware: String
      ice: String
      postedBy: Int
      specArray: [SpecInput]
    ): Version

    addRecipe(
      name: String
      origin: String
      postedBy: Int
      history: String
      versionName: String
      instructions: String
      glassware: String
      ice: String
      specArray: [SpecInput]
    ): Recipe

    shareVersion(fromUser: Int, toUser: Int, versionId: Int): Version

    updateVersion(
      versionId: Int
      recipeId: Int
      versionName: String
      instructions: String
      glassware: String
      ice: String
    ): Version

    updateSingleSpec(input: SpecUpdate, versionId: Int): Spec
    updateSpecs(input: [SpecUpdate], versionId: Int): [Spec]

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
