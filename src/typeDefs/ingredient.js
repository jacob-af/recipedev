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

  type IngredientUser {
    ingredient: SpecificIngredient
    user: User
    permission: Permission
  }

  type IngredientResponse {
    ingredient: SpecificIngredient
    permission: Permission
    status: StatusMessage
  }

  type IngredientPermissionResponse {
    ingredientUser: IngredientUser
    status: StatusMessage
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
    ): IngredientResponse

    editSpecificIngredient(
      id: ID!
      name: String
      description: String
      amount: Int
      unit: String
      price: Float
      source: String
      genericIngredientId: String
      permission: Permission
    ): IngredientResponse

    trashSpecificIngredient(id: ID!, permission: Permission): IngredientResponse

    changeIngredientPermission(
      ingredientId: ID!
      userId: ID!
      permission: Permission
      userPermission: Permission
    ): IngredientPermissionResponse

    removeIngredientPermission(
      ingredientId: ID!
      userId: ID!
      permission: Permission
      userPermission: Permission
    ): IngredientPermissionResponse
  }
`;

export default ingredient;
