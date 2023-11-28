import { gql } from "graphql-tag";

const user = gql`
  type User {
    id: ID!
    userName: String!
    firstName: String
    lastName: String
    dateJoined: DateTimeResolver
    lastEdited: DateTimeResolver
    email: String!
    password: String!
    profile: Profile

    recipeBookUser: [RecipeBookUser]
    recipeBook: [RecipeBook]
    recipeBookEditedBy: [RecipeBook]
    recipe: [Recipe!]

    buildUser: [BuildUser]
    build: [Build]
    buildEditedBy: [Build]

    crewUser: [CrewUser]
    crew: [Crew]
    crewEditedBy: [Crew]

    specificIngredient: [SpecificIngredient]
    ingredientPreference: [IngredientPreference]

    storageUser: [StorageUser]
    storage: [Storage]
    storageEditedBy: [Storage]

    inventory: [Inventory]
    inventoryUser: [InventoryUser]
    inventoryCreatedBy: [Inventory]
    inventoryEditedBy: [Inventory]
  }

  type Profile {
    id: String!
    user: User!
    photo: String
  }

  type StorageUser {
    storage: Storage
    user: User
    permission: Permission
  }
`;
export default user;
