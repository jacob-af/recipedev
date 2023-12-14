import { gql } from "graphql-tag";

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
    completeBuild: [CompleteBuild]
  }

  type RecipeBookUser {
    recipeBook: RecipeBook
    user: User
    permission: Permission
  }

  type RecipeBookBuild {
    recipeBook: RecipeBook
    build: Build
  }

  type BookBuildReturn {
    recipeBookBuild: RecipeBookBuild
    status: StatusMessage
  }

  type BookReturn {
    recipeBook: RecipeBook
    permission: Permission
    status: StatusMessage
  }

  type BookShareReturn {
    recipeBookUser: RecipeBookUser
    status: StatusMessage
  }

  type Mutation {
    newRecipeBook(name: String!, description: String): BookReturn

    editRecipeBook(
      recipeBookId: String!
      name: String!
      description: String
      permission: Permission!
    ): BookReturn

    trashRecipeBook(recipeBookId: String!, permission: Permission!): BookReturn

    addBuildToRecipeBook(
      recipeBookId: String!
      buildId: String!
      buildPermission: Permission
      bookPermission: Permission
    ): BookBuildReturn

    removeBuildFromRecipeBook(
      recipeBookId: String!
      buildId: String!
      permission: Permission
    ): BookBuildReturn

    changeRecipeBookPermission(
      userId: String!
      recipeBookId: String!
      permission: Permission
      userPermission: Permission
    ): BookShareReturn

    removeRecipeBookPermission(
      userId: String!
      recipeBookId: String!
      permission: Permission
    ): BookShareReturn
  }
`;

export default recipeBook;
