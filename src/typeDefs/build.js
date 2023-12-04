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
  }

  type Recipe {
    id: ID!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    name: String
    origin: String
    createdBy: User
    editedBy: User
    history: String
    build: [Build]
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
    completeTouch: [CompleteTouch]
  }

  type BuildResponse {
    build: Build
    status: String
  }
`;

export default build;
