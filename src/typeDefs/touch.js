import { gql } from "graphql-tag";

const touch = gql`
  type Touch {
    id: ID!
    build: Build
    order: Int
    amount: Float
    unit: String
    version: Int
    genericIngredient: GenericIngredient
    specificIngredient: SpecificIngredient
  }

  type ArchivedTouch {
    id: ID!
    build: Build
    order: Int
    amount: Float
    unit: String
    version: Int
    genericIngredient: GenericIngredient
    specificIngredient: SpecificIngredient
  }

  input TouchInput {
    genericIngredientId: String
    specificIngredientId: String
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
