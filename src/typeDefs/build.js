import { gql } from "graphql-tag";

const build = gql`
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
    archivedTouch: [ArchivedTouch]
    completeTouch: [CompleteTouch]
    recipeBook: [RecipeBook]
    buildUser: [BuildUser]
  }

  type BuildUser {
    id: ID!
    user: User!
    build: Build!
    permission: Permission
    recipeStack: RecipeStack
  }

  type CompleteBuild {
    id: ID!
    buildName: String!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    recipeId: String
    recipeName: String
    recipeOrigin: String
    recipeCreatedBy: User
    recipeHistory: String
    notes: String
    glassware: String
    ice: String
    instructions: String
    permission: Permission
    completeTouch: [CompleteTouch]
  }

  type BuildResponse {
    build: Build
    permission: Permission
    status: StatusMessage
  }
  type RecipeResponse {
    recipe: Recipe
    build: Build
    status: String
  }

  type Mutation {
    addBuild(
      recipeId: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): BuildResponse

    updateBuild(
      buildId: String
      recipeId: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): Build

    deleteBuild(buildId: String, permission: Permission): StatusMessage

    changeBuildPermission(
      userId: String
      buildId: String
      userPermission: Permission
      permission: Permission
    ): StatusMessage

    removeBuildPermission(
      userId: String
      buildId: String
      userPermission: Permission
      permission: Permission
    ): StatusMessage
  }
`;

export default build;
