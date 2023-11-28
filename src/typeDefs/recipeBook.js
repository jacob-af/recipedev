const { gql } = require("apollo-server");

const recipeBook = gql`
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
    user: User
    recipeBook: RecipeBook
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
    buildUser: [BuildUser]
  }

  type BuildUser {
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

  type BookReturn {
    status: String
    recipeBook: RecipeBook
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
`;

module.exports = recipeBook;
