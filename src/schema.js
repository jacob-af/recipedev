/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @typedef { import("@prisma/client").UserCreateArgs } UserCreateArgs
 */

const { gql } = require("apollo-server");

const { DateTimeResolver } = require("graphql-scalars");

//Each recipe can have multiple specs, each spec is made up of multiple bottle touches

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
    spec: CompleteSpec
  }

  type CompleteSpec {
    spec: Spec
    touch: [Touch]
  }

  type Group {
    id: ID
    groupName: String
    date_created: DateTimeResolver
  }

  type StatusMessage {
    status: String
  }

  type User {
    id: ID!
    userName: String!
    firstName: String
    lastName: String
    dateJoined: DateTimeResolver
    email: String!
    password: String!
    recipe: [Recipe!]
    spec: [Spec!]
    adminOnSpec: [Spec!]
    sharedSpec: [Spec!]
    ingredient: [Ingredient!]
    touch: [Touch]
  }

  type SharedSpec {
    spec: [Spec!]
    user: [User!]
  }

  type AdminOnSpec {
    spec: [Spec]!
    user: [User]!
  }

  type Recipe {
    id: ID!
    name: String
    origin: String
    postedBy: User
    history: String
    spec: [Spec]
  }

  type Spec {
    id: ID!
    recipe: Recipe
    specName: String
    instructions: String
    glassware: String
    ice: String
    postedBy: User
    sharedSpec: [User]
    adminOnSpec: [User]
    touch: [Touch]
  }

  type Touch {
    id: ID!
    order: Int
    spec: Spec
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
    touch: [Touch]
  }

  type Query {
    allGroups: [Group]
    allUsers: [User]
    allRecipes: [Recipe]
    allIngredients: [Ingredient]
    allSpecs: [Spec]
    allTouches: [Touch]
  }

  input TouchInput {
    order: Int
    ingredientId: Int
    amount: Float
    unit: String
  }

  input TouchUpdate {
    ingredientId: Int
    amount: Float
    unit: String
  }

  input SpecInput {
    specName: String
    instructions: String
    glassware: String
    ice: String
    touch: [TouchInput]
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

    addSpec(
      recipeId: Int
      specName: String
      instructions: String
      glassware: String
      ice: String
      postedBy: Int
      touchArray: [TouchInput]
    ): Spec

    addRecipe(
      name: String
      origin: String
      postedBy: Int
      history: String
      specName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): Recipe

    shareSpec(fromUser: String, toUser: String, specId: Int): StatusMessage
    adminOnSpec(toUser: String, specId: Int): Spec

    updateSpec(
      specId: Int
      recipeId: Int
      specName: String
      instructions: String
      glassware: String
      ice: String
    ): Spec

    updateSingleTouch(input: TouchUpdate, specId: Int): Touch
    updateTouch(input: [TouchUpdate], specId: Int): [Touch]

    login(email: String!, password: String!): AuthPayload!
    signup(
      userName: String!
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): AuthPayload!
  }

  scalar DateTimeResolver
`;

module.exports = {
  typeDefs
};
