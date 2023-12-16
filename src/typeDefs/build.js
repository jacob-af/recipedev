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
    version: Int
    permission: Permission
    touch: [Touch]
    archivedBuild: [ArchivedBuild]
    completeTouch: [CompleteTouch]
    recipeBook: [RecipeBook]
    buildUser: [BuildUser]
  }
  type ArchivedBuild {
    id: ID!
    buildId: ID!
    buildName: String!
    createdAt: DateTimeResolver
    createdBy: User
    recipe: Recipe
    instructions: String
    notes: String
    glassware: String
    ice: String
    version: Int
    archivedTouch: [ArchivedTouch]
  }

  type BuildUser {
    user: User!
    build: Build!
    permission: Permission
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

  type BuildUser {
    build: Build
    user: User
    permission: Permission
  }

  type BuildResponse {
    build: Build
    permission: Permission
    status: StatusMessage
  }

  type ArchiveResponse {
    build: Build
    archivedBuild: ArchivedBuild
    permission: Permission
    status: StatusMessage
  }

  type BuildPermissionResponse {
    buildUser: BuildUser
    status: StatusMessage
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

    editBuild(
      permission: Permission
      buildId: String
      recipeId: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): ArchiveResponse

    removeBuild(buildId: String, permission: Permission): BuildResponse

    changeBuildPermission(
      userId: String
      buildId: String
      userPermission: Permission
      permission: Permission
    ): BuildPermissionResponse

    removeBuildPermission(
      userId: String
      buildId: String
      userPermission: Permission
      permission: Permission
    ): BuildPermissionResponse
  }
`;

export default build;
