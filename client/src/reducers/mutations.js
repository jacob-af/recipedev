import { gql } from "@apollo/client";

export const ADD_SPEC_ING = gql`
  mutation AddIngredient(
    $name: String
    $description: String
    $amount: Int
    $unit: String
    $price: Float
    $source: String
    $ingredientTypeId: String
  ) {
    addIngredient(
      name: $name
      description: $description
      amount: $amount
      unit: $unit
      price: $price
      source: $source
      ingredientTypeId: $ingredientTypeId
    ) {
      {
        ingredient {
          id
          description
          name
          price
          source
          ingredientType {
            id
            name
          }
        }
      permission
      status {
        code
        message
      }
    } 
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $name: String
    $origin: String
    $history: String
    $buildName: String
    $instructions: String
    $glassware: String
    $ice: String
    $touchArray: [TouchInput]
  ) {
    addRecipe(
      name: $name
      origin: $origin
      history: $history
      buildName: $buildName
      instructions: $instructions
      glassware: $glassware
      ice: $ice
      touchArray: $touchArray
    ) {
      recipe {
        id
        name
      }
    }
  }
`;
