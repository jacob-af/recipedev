import { gql } from "@apollo/client";

export const LOAD_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        userName
      }
    }
  }
`;

//export const LOAD_GENERIC = gql``;

export const LOAD_ING = gql`
  query AllIngredients {
    allIngredients {
      id
      name
      description
      ingredientType {
        id
        name
        description
      }
    }
    allIngredientTypes {
      id
      name
      description
    }
  }
`;

export const LOAD_BUILDS = gql`
  query CompleteBuild($userId: String) {
    completeBuild(userId: $userId) {
      buildName
      completeTouch {
        amount
        cost
        ingredientTypeDescription
        ingredientTypeId
        ingredientTypeName
        id
        order
        ingredientDescription
        ingredientId
        ingredientName
        unit
      }
      createdAt
      createdBy {
        userName
      }
      glassware
      ice
      id
      instructions
      notes
      permission
      about
      recipeId
      recipeName
    }
  }
`;

export const LOAD_BOOKS = gql`
  query UserRecipeBook($userId: String) {
    userRecipeBook(userId: $userId) {
      id
      name
      description
      completeBuild {
        id
        recipeName
        recipeOrigin
        recipeId
        permission
        ice
        glassware
        buildName
        completeTouch {
          id
          ingredientTypeName
          amount
          cost
        }
      }
    }
  }
`;
