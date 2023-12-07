import { gql } from "@apollo/client";

export const LOAD_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        completeBuild {
          id
          recipeName
          buildName
          recipeId
          recipeOrigin
          recipeCreatedBy {
            id
            userName
          }
          recipeHistory
          instructions
          notes
          glassware
          ice
          completeTouch {
            id
            order
            genericIngredientId
            genericIngredientName
            specificIngredientId
            specificIngredientName
            amount
            unit
            cost
          }
        }
      }
    }
  }
`;

export const LOAD_GENERIC = gql`
  query AllGenericIngredients {
    allGenericIngredients {
      id
      name
      description
    }
  }
`;
