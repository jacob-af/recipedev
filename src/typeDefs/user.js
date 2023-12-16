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

    myRecipeBook: [RecipeBook]
    allRecipeBook: [RecipeBook]
    recipeBookEditedBy: [RecipeBook]

    myRecipe: [Recipe]
    allRecipe: [Recipe]
    recipeEditedBy: [Recipe]

    myBuild: [Build]
    allBuild: [Build]
    buildEditedBy: [Build]
    completeBuild: [CompleteBuild]
    "to be removed"
    following: [User]
    followedBy: [User]

    myCrew: [Crew]
    allCrew: [Crew]
    crewEditedBy: [Crew]

    myIngredient: [Ingredient]
    allIngredient: [IngredientUser]
    ingredientPreference: [IngredientPreference]

    allStorage: [Storage]
    myStorage: [Storage]
    storageEditedBy: [User]

    myInventory: [Inventory]
    allInventory: [Inventory]
    inventoryCreatedBy: [User]
    inventoryEditedBy: [User]
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

  type Follower {
    following: User
    followedBy: User
    relationship: Relationship
  }

  type FollowReturn {
    following: String
    relationship: Relationship
    status: StatusMessage
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload

    signup(
      userName: String!
      firstName: String
      lastName: String
      email: String!
      password: String!
    ): AuthPayload

    followUser(userId: String!, relationship: Relationship): FollowReturn

    unFollowUser(userId: String): StatusMessage
  }
`;
export default user;
