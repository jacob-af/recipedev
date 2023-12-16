import { gql } from "graphql-tag";

const storage = gql`
  type Storage {
    id: ID!
    name: String!
    desciprtion: String
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    permission: Permission
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
    permission: Permission
  }

  type IngredientStorage {
    ingredient: Ingredient
    storage: Storage
  }

  type StoragePermissionReturn {
    storageUser: StorageUser
    status: StatusMessage
  }

  type StorageIngredientReturn {
    ingredientStorage: IngredientStorage
    status: StatusMessage
  }

  type Mutation {
    newStorage(name: String!, description: String): StorageReturn

    editStorage(
      storageId: String!
      name: String!
      description: String
      permission: Permission!
    ): StorageReturn

    trashStorage(storageId: String!, permission: Permission!): StorageReturn

    addIngredientToStorage(
      storageId: String!
      ingredientId: String!
      ingredientPermission: Permission!
      storagePermission: Permission!
    ): StorageIngredientReturn

    removeIngredientFromStorage(
      storageId: String!
      ingredientId: String!
      permission: Permission
    ): StorageIngredientReturn

    changeStoragePermission(
      userId: String!
      storageId: String!
      permission: Permission
      userPermission: Permission
    ): StoragePermissionReturn

    removeStoragePermission(
      userId: String!
      storageId: String!
      permission: Permission
    ): StoragePermissionReturn
  }
`;

export default storage;
