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
`;

export default recipe;
