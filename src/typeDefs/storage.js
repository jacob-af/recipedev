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
    status: StatusMessage
    storage: Storage
  }

  type StorageShareReturn {
    storageUser: StorageUser
    status: StatusMessage
  }

  type IngredientStorage {
    ingredient: SpecificIngredient
    storage: Storage
  }

  type Mutation {
    createStorage(name: String!, description: String): StorageReturn
  }
`;

export default storage;
