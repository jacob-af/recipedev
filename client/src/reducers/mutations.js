import { gql } from "@apollo/client";

export const ADD_SPEC_ING = gql`
  mutation AddSpecificIngredient(
    $name: String
    $amount: Int
    $unit: String
    $price: Float
    $source: String
    $description: String
    $ingredientTypeId: String
  ) {
    addIngredient(
      name: $name
      amount: $amount
      unit: $unit
      price: $price
      source: $source
      description: $description
      ingredientTypeId: $ingredientTypeId
    ) {
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
`;

export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $name: String
    $about: String
    $buildName: String
    $instructions: String
    $glassware: String
    $ice: String
    $touchArray: [TouchInput]
  ) {
    addRecipe(
      name: $name
      about: $about
      buildName: $buildName
      instructions: $instructions
      glassware: $glassware
      ice: $ice
      touchArray: $touchArray
    ) {
      build {
        id
        buildName
      }
      status {
        code
        message
      }
    }
  }
`;

export const ADD_BUILD = gql`
  mutation AddBuild(
    $recipeId: String
    $buildName: String
    $instructions: String
    $glassware: String
    $ice: String
    $touchArray: [TouchInput]
  ) {
    addBuild(
      recipeId: $recipeId
      buildName: $buildName
      instructions: $instructions
      glassware: $glassware
      ice: $ice
      touchArray: $touchArray
    ) {
      build {
        id
        buildName
        touch {
          id
          ingredient {
            name
          }
        }
      }
      permission
      status {
        code
        message
      }
    }
  }
`;
