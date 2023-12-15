import { gql } from "graphql-tag";

const crewAsset = gql`
  type CrewBuild {
    crew: Crew
    build: Build
  }

  type CrewBuildReturn {
    crewBuild: CrewBuild
    status: StatusMessage
  }
  type CrewRecipeBook {
    crew: Crew
    recipeBook: RecipeBook
  }

  type CrewRecipeBookReturn {
    crewRecipeBook: CrewRecipeBook
    status: StatusMessage
  }
  type CrewIngredient {
    crew: Crew
    ingredient: SpecificIngredient
  }

  type CrewIngredientReturn {
    crewIngredient: CrewIngredient
    status: StatusMessage
  }

  type CrewStorage {
    crew: Crew
    storage: Storage
  }

  type CrewStorageReturn {
    crewInventory: CrewStorage
    status: StatusMessage
  }
  type CrewInventory {
    crew: Crew
    inventory: Inventory
  }

  type CrewInventoryReturn {
    crewInventory: CrewInventory
    status: StatusMessage
  }

  type Mutation {
    addInventoryToCrew(
      crewId: String!
      inventoryId: String!
      inventoryPermission: Permission
      crewPermission: Permission
    ): CrewInventoryReturn

    removeInventoryFromCrew(
      crewId: String!
      inventoryId: String!
      permission: Permission
    ): CrewInventoryReturn

    addStorageToCrew(
      crewId: String!
      storageId: String!
      storagePermission: Permission
      crewPermission: Permission
    ): CrewStorageReturn

    removeStorageFromCrew(
      crewId: String!
      storageId: String!
      permission: Permission
    ): CrewStorageReturn

    addIngredientToCrew(
      crewId: String!
      ingredientId: String!
      ingredientPermission: Permission
      crewPermission: Permission
    ): CrewIngredientReturn

    removeIngredientFromCrew(
      crewId: String!
      ingredientId: String!
      permission: Permission
    ): CrewIngredientReturn

    addRecipeBookToCrew(
      crewId: String!
      recipeBookId: String!
      recipeBookPermission: Permission
      crewPermission: Permission
    ): CrewRecipeBookReturn

    removeRecipeBookFromCrew(
      crewId: String!
      recipeBookId: String!
      permission: Permission
    ): CrewRecipeBookReturn

    addBuildToCrew(
      crewId: String!
      buildId: String!
      buildPermission: Permission
      crewPermission: Permission
    ): CrewBuildReturn

    removeBuildFromCrew(
      crewId: String!
      buildId: String!
      permission: Permission
    ): CrewBuildReturn
  }
`;

export default crewAsset;
