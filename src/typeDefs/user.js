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
    recipeEditedBy: [Recipe!]

    buildUser: [BuildUser]
    build: [Build]
    buildEditedBy: [Build]
    completeBuild: [CompleteBuild]
    "to be removed"
    following: [User]
    followedBy: [User]

    crewUser: [CrewUser]
    crew: [Crew]
    crewEditedBy: [Crew]

    specificIngredient: [SpecificIngredient]
    ingredientPreference: [IngredientPreference]

    storageUser: [Storage]
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
