import { gql } from "graphql-tag";

const ingredient = gql`
  type IngredientType {
    id: ID!
    name: String!
    description: String
    touch: [Touch]
    ingredient: [Ingredient]
    ingredientPreference: [IngredientPreference]
  }

  input IngredientTypeInput {
    name: String!
    description: String
  }

  type Ingredient {
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
    ingredientType: IngredientType!
    ingredientStorage: [IngredientStorage]
    ingredientPreference: [IngredientPreference]
  }

  type IngredientPreference {
    ingredientType: IngredientType!
    ingredient: Ingredient!
    user: User
  }

  type IngredientUser {
    ingredient: Ingredient
    user: User
    permission: Permission
  }

  type IngredientResponse {
    ingredient: Ingredient
    permission: Permission
    status: StatusMessage
  }

  type IngredientPermissionResponse {
    ingredientUser: IngredientUser
    status: StatusMessage
  }

  input IngredientTypeInput {
    name: String!
    description: String
  }

  type Mutation {
    addIngredientType(name: String, description: String): IngredientType!

    addManyIngredientTypes(dat: [IngredientTypeInput]): StatusMessage

    addIngredient(
      name: String
      description: String
      amount: Int
      unit: String
      price: Float
      source: String
      ingredientTypeId: String
      createdBy: String
    ): IngredientResponse

    editIngredient(
      id: ID!
      name: String
      description: String
      amount: Int
      unit: String
      price: Float
      source: String
      ingredientTypeId: String
      permission: Permission
    ): IngredientResponse

    trashIngredient(id: ID!, permission: Permission): IngredientResponse

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
