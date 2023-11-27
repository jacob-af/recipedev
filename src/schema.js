/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @typedef { import("@prisma/client").UserCreateArgs } UserCreateArgs
 */

const { gql } = require("apollo-server");

const { DateTimeResolver } = require("graphql-scalars");

///User
///-Profile
///-RecipeBook
/// * UserRecipeBook
/// * RecipeBooksBuild
///--Build
/// * UserBuild
///---Recipe M-1
/// * RecipeBookBuild
///---Touch
///----Ingredient
///-Inventory
/// * UserInventory
///--Storage
/// * InventoryStorage
/// * IgredientStorage
/// * UserStorage
///---Ingredient
///-Crew
/// * UserCrew

const typeDefs = gql`
  type AuthPayload {
    token: String
    user: User
  }

  type BatchPayload {
    count: Int
  }

  type StatusMessage {
    status: String
    id: String
  }

  type User {
    id: ID!
    userName: String!
    firstName: String
    lastName: String
    dateJoined: DateTimeResolver
    lastEdited: DateTimeResolver
    email: String!
    password: String!
    profile: Profile

    recipeBookUser: [RecipeBookUser]
    recipeBook: [RecipeBook]
    recipeBookEditedBy: [RecipeBook]
    recipe: [Recipe!]

    userBuild: [UserBuild]
    build: [Build]
    buildEditedBy: [Build]

    userCrew: [UserCrew]
    crew: [Crew]
    crewEditedBy: [Crew]

    specificIngredient: [SpecificIngredient]
    ingredientPreference: [IngredientPreference]

    userStorage: [UserStorage]
    storage: [Storage]
    storageEditedBy: [Storage]

    userInventory: [UserInventory]
    inventoryCreatedBy: [Inventory]
    inventoryEditedBy: [Inventory]
  }

  type Profile {
    id: String!
    user: User!
    photo: String
  }

  type RecipeBook {
    id: ID!
    name: String
    description: String
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    build: [Build]
  }

  type RecipeBookUser {
    id: ID!
    user: User!
    recipeBook: RecipeBook!
    permission: Permission
  }

  type Build {
    id: ID!
    buildName: String!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    recipe: Recipe
    instructions: String
    notes: String
    glassware: String
    ice: String
    touch: [Touch]
    recipeBook: [RecipeBook]
    userBuild: [UserBuild]
  }

  type UserBuild {
    id: ID!
    user: User!
    build: Build!
    permission: Permission
  }

  type Recipe {
    id: ID!
    name: String
    origin: String
    createdBy: User
    history: String
    build: [Build]
  }

  type RecipeBookBuild {
    recipeBook: [RecipeBook]
    build: [Build]
  }

  type Touch {
    id: ID!
    build: Build
    order: Int
    amount: Float
    unit: String
    genericIngredient: GenericIngredient
    specificIngredient: SpecificIngredient
  }

  type GenericIngredient {
    id: ID!
    name: String!
    description: String
    touch: [Touch]
    specificIngredient: [SpecificIngredient]
    ingredientPreference: [IngredientPreference]
  }

  type SpecificIngredient {
    id: ID!
    createdAt: DateTimeResolver
    createdBy: User
    name: String!
    description: String
    price: Float
    amount: Float
    unit: String
    source: String
    touch: [Touch]
    genericIngredient: GenericIngredient!
    ingredientStorage: [IngredientStorage]
    ingredientPreference: [IngredientPreference]
  }

  type IngredientPreference {
    genericIngredient: GenericIngredient!
    specificIngredient: SpecificIngredient!
    user: User
  }

  type Inventory {
    id: ID!
    name: String!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    inventoryStorage: [InventoryStorage]
  }

  type UserInventory {
    user: User
    inventory: Inventory
    permission: Permission
  }

  type Storage {
    id: ID!
    name: String!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    inventoryStorage: [InventoryStorage]
    ingredientStorage: [IngredientStorage]
    userStorage: [UserStorage]
  }

  type InventoryStorage {
    inventory: Inventory
    storage: Storage
  }

  type IngredientStorage {
    ingredient: SpecificIngredient
    storage: Storage
  }

  type UserStorage {
    storage: Storage
    user: User
    permission: Permission
  }

  type Crew {
    id: ID!
    name: String
    description: String
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    userCrew: [UserCrew]
  }

  type UserCrew {
    crew: Crew
    user: User
    permission: Permission
  }

  type Query {
    allCrews: [Crew]
    allUsers: [User]
    allRecipes: [Recipe]
    allGenericIngredients: [GenericIngredient]
    allSpecificIngredients: [SpecificIngredient]
    allRecipeBooks: [RecipeBook]
    allBuilds: [Build]
    allTouches: [Touch]
  }

  input TouchInput {
    order: Int
    ingredientId: String
    amount: Float
    unit: String
  }

  input TouchUpdate {
    ingredientId: String
    amount: Float
    unit: String
  }

  type Mutation {
    addGenericIngredient(name: String, description: String): GenericIngredient!

    addSpecificIngredient(
      name: String
      description: String
      amount: Int
      unit: String
      price: Float
      source: String
      genericIngredientId: String
      createdBy: String
    ): SpecificIngredient!

    addBuild(
      recipeId: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      postedBy: Int
      touchArray: [TouchInput]
    ): Build

    addRecipe(
      name: String
      origin: String
      postedBy: Int
      history: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): Recipe

    createRecipeBook(name: String): StatusMessage
    shareRecipeBook(toUser: String, recipeBookId: String): StatusMessage
    adminOnRecipeBook(toUser: String, recipeBookId: String): StatusMessage
    addBuildToRecipeBook(buildId: String, recipeBookId: String): StatusMessage

    shareBuild(fromUser: String, toUser: String, buildId: String): StatusMessage
    changeBuildPermission(
      fromUser: String
      toUser: String
      buildId: String
    ): StatusMessage

    updateBuild(
      buildId: String
      recipeId: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
    ): Build

    updateSingleTouch(input: TouchUpdate, specId: String): Touch
    updateTouch(input: [TouchUpdate], specId: String): [Touch]

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

  enum Permission {
    View
    Comment
    Edit
    Manage
    Own
    Blocked
  }
`;

module.exports = {
  typeDefs
};
