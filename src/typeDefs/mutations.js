import { gql } from "graphql-tag";

const mutation = gql`
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

    addRecipe(
      name: String
      origin: String
      createdById: String
      history: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): RecipeResponse

    createInventory(name: String!, description: String): InventoryReturn
    createStorage(name: String!, description: String): StorageReturn
    createCrew(name: String!, description: String): Crew
    
    login(email: String!, password: String!): AuthPayload

    signup(
      userName: String!
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): AuthPayload
  }
`;

export default mutation;
