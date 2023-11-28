const { gql } = require("apollo-server");

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
      genericIngredientId: Int
      createdBy: String
    ): SpecificIngredient!

    addBuild(
      recipeId: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      postedBy: String
      touchArray: [TouchInput]
    ): Build

    addRecipeBookPermission(
      userId: String
      recipeBookId: String!
      permission: Permission!
    ): StatusMessage

    addRecipe(
      name: String
      origin: String
      postedBy: Int
      history: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
      touchArray: [TouchInput]
    ): Recipe

    createRecipeBook(name: String!, description: String): BookReturn
    createInventory(name: String!, description: String): InventoryReturn
    createStorage(name: String!, description: String): StorageReturn

    shareRecipeBook(toUser: String, recipeBookId: String): BookReturn

    adminOnRecipeBook(toUser: String, recipeBookId: String): StatusMessage
    addBuildToRecipeBook(buildId: String, recipeBookId: String): StatusMessage

    shareBuild(fromUser: String, toUser: String, buildId: String): StatusMessage
    changeBuildPermission(
      fromUser: String
      toUser: String
      buildId: String
    ): StatusMessage

    updateBuild(
      buildId: String
      recipeId: String
      buildName: String
      instructions: String
      glassware: String
      ice: String
    ): Build

    updateSingleTouch(input: TouchUpdate, specId: String): Touch
    updateTouch(input: [TouchUpdate], specId: String): [Touch]

    login(email: String!, password: String!): AuthPayload!

    signup(
      userName: String!
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): AuthPayload!
  }
`;

module.exports = mutation;
