import { gql } from "graphql-tag";

const recipe = gql`
  type Recipe {
    id: ID!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    name: String
    about: String
    createdBy: User
    editedBy: User
    build: [Build]
  }

  type RecipeStack {
    recipeId: String
    recipeName: String
    recipeOrigin: String
    recipeCreatedById: String
    about: String
    builds: CompleteBuild
  }

  type RecipeResponse {
    build: Build
    status: StatusMessage
  }

  type Mutation {
    addRecipe(
      name: String
      about: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): RecipeResponse
  }
`;

export default recipe;
