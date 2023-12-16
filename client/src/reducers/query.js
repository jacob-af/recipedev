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

export const LOAD_GENERIC = gql`
  query AllIngredientTypes(orderBy:{label:DESC}) {
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
      recipeHistory
      recipeId
      recipeName
      recipeOrigin
    }
  }
`;

export const LOAD_BOOKS = gql`
  query RecipeBooks($userId: String) {
    userRecipeBook(userId: $userId) {
      id
      name
      description
      completeBuild {
        id
        recipeName
        buildName
        completeTouch {
          amount
          cost
          ingredientTypeId
          ingredientTypeName
          id
          order
          ingredientId
          unit
          ingredientName
        }
        recipeOrigin
        recipeId
        recipeHistory
        permission
        notes
        instructions
        ice
        glassware
        createdBy {
          id
          userName
        }
      }
    }
  }
`;
