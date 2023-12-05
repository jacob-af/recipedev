import { gql } from "@apollo/client";

export const LOAD_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        userName
        firstName
        lastName
        completeBuild {
          id
          recipeName
          buildName
          completeTouch {
            id
            specificIngredientName
            amount
            unit
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
