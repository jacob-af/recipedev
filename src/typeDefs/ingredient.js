const { gql } = require("apollo-server");

const ingredient = gql`
  type GenericIngredient {
    id: ID!
    name: String!
    description: String
    touch: [Touch]
    specificIngredient: [SpecificIngredient]
    ingredientPreference: [IngredientPreference]
  }

  input GenericIngredientInput {
    name: String!
    description: String
  }

  type SpecificIngredient {
    id: ID!
    createdAt: DateTimeResolver
    createdBy: User
    name: String!
    description: String
    price: Float
    amount: Float
    unit: String
    source: String
    touch: [Touch]
    genericIngredient: GenericIngredient!
    ingredientStorage: [IngredientStorage]
    ingredientPreference: [IngredientPreference]
  }

  type IngredientPreference {
    genericIngredient: GenericIngredient!
    specificIngredient: SpecificIngredient!
    user: User
  }

  input GenericIngredientInput {
    name: String!
    description: String
  }
`;

module.exports = ingredient;
