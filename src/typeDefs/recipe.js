import { gql } from "graphql-tag";

const recipe = gql`
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

  type RecipeStack {
    recipeId: String
    recipeName: String
    recipeOrigin: String
    recipeCreatedById: String
    recipeHistory: String
    builds: CompleteBuild
  }

  type RecipeResponse {
    build: Build
    status: StatusMessage
  }

  type Mutation {
    addRecipe(
      name: String
      origin: String
      createdById: String
      history: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): RecipeResponse
  }
`;

export default recipe;
