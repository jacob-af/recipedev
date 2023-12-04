import { gql } from "graphql-tag";

const touch = gql`
  type Touch {
    id: ID!
    build: Build
    order: Int
    amount: Float
    unit: String
    genericIngredient: GenericIngredient
    specificIngredient: SpecificIngredient
  }

  input TouchInput {
    order: Int
    genericIngredientId: String
    specificIngredientId: String
    amount: Float
    unit: String
  }

  input TouchUpdate {
    ingredientId: String
    amount: Float
    unit: String
  }

  type CompleteTouch {
    id: ID!
    order: Int
    genericIngredientId: String
    genericIngredientName: String
    genericIngredientDescription: String
    specificIngredientId: String
    specificIngredientName: String
    specificIngredientDescription: String
    amount: Float
    unit: String
    cost: Float
  }
`;

export default touch;
