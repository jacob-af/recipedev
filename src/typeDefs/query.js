import { gql } from "graphql-tag";

const query = gql`
  type Query {
    allCrews: [Crew]
    allUsers: [User]
    allRecipes: [Recipe]
    allGenericIngredients: [GenericIngredient]
    allSpecificIngredients: [SpecificIngredient]
    allRecipeBooks: [RecipeBook]
    allBuilds: [Build]
    allTouches: [Touch]
    allRecipeBookUsers: [RecipeBookUser]
  }
`;

export default query;
