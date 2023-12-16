import { gql } from "graphql-tag";

const query = gql`
  type Query {
    allCrews: [Crew]
    allUsers: [User]
    allRecipes: [Recipe]
    allIngredientTypes: [IngredientType]
    allIngredients: [Ingredient]
    allRecipeBooks: [RecipeBook]
    allBuilds: [Build]
    allTouches: [Touch]
    allRecipeBookUsers: [RecipeBookUser]
    completeBuild(userId: String): [CompleteBuild]
    userRecipeBook(userId: String): [RecipeBook]
  }
`;

export default query;
