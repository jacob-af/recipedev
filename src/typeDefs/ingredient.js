import { gql } from "graphql-tag";

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

  type Mutation {
    addGenericIngredient(name: String, description: String): GenericIngredient!

    addManyGenericIngredients(dat: [GenericIngredientInput]): StatusMessage

    addSpecificIngredient(
      name: String
      description: String
      amount: Int
      unit: String
      price: Float
      source: String
      genericIngredientId: String
      createdBy: String
    ): SpecificIngredient!
  }
`;

export default ingredient;
