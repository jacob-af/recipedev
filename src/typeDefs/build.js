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
    instructions: String
    notes: String
    glassware: String
    ice: String
    permission: Permission
    completeTouch: [CompleteTouch]
  }

  type BuildResponse {
    build: Build
    permission: Permission
    status: String
  }
  type RecipeResponse {
    recipe: Recipe
    build: Build
    status: String
  }
`;

export default build;
