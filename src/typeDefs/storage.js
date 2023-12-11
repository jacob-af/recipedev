import { gql } from "graphql-tag";

const storage = gql`
  type Storage {
    id: ID!
    name: String!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    inventoryStorage: [Storage]
    ingredientStorage: [IngredientStorage]
    storageUser: [StorageUser]
  }

  type StorageUser {
    storage: Storage
    user: User
    permission: Permission
  }

  type StorageReturn {
    status: String
    storage: Storage
  }

  type IngredientStorage {
    ingredient: SpecificIngredient
    storage: Storage
  }
`;

export default storage;
