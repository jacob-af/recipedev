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
    user: [User]
    recipeBook: [RecipeBook]
    permission: Permission
  }

  type RecipeBookBuild {
    recipeBook: [RecipeBook]
    build: [Build]
  }

  type BookReturn {
    status: StatusMessage
    recipeBook: RecipeBook
    permission: Permission
  }

  type BookShareReturn {
    status: StatusMessage
    recipeBookId: String
  }

  type Mutation {
    newRecipeBook(name: String!, description: String): BookReturn

    editRecipeBook(
      recipeBookId: String!
      name: String!
      description: String
      permission: Permission!
    ): BookReturn

    trashRecipeBook(
      recipeBookId: String!
      permission: Permission!
    ): StatusMessage

    addBuildToRecipeBook(
      recipeBookId: String!
      buildId: String!
      buildPermission: Permission
      bookPermission: Permission
    ): StatusMessage

    removeBuildFromRecipeBook(
      recipeBookId: String!
      buildId: String!
      permission: Permission
    ): StatusMessage

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
    ): StatusMessage
  }
`;

export default recipeBook;
