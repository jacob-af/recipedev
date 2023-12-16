import { gql } from "graphql-tag";

const touch = gql`
  type Touch {
    id: ID!
    build: Build
    order: Int
    amount: Float
    unit: String
    version: Int
    ingredientType: IngredientType
    ingredient: Ingredient
  }

  type ArchivedTouch {
    id: ID!
    build: Build
    order: Int
    amount: Float
    unit: String
    version: Int
    ingredientType: IngredientType
    ingredient: Ingredient
  }

  input TouchInput {
    order: Int
    ingredientTypeId: String
    ingredientId: String
    amount: Float
    unit: String
  }

  type CompleteTouch {
    id: ID!
    order: Int
    ingredientTypeId: String
    ingredientTypeName: String
    ingredientTypeDescription: String
    ingredientId: String
    ingredientName: String
    ingredientDescription: String
    amount: Float
    unit: String
    cost: Float
  }

  type Mutation {
    updateTouch(
      newTouchArray: [TouchInput]
      permission: Permission
      buildId: String
      version: Int
    ): [Touch]
  }
`;

export default touch;
