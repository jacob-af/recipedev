import { gql } from "graphql-tag";

const inventory = gql`
  type Inventory {
    id: ID!
    name: String!
    description: String
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    inventoryStorage: [Storage]
  }

  type InventoryUser {
    user: User
    inventory: Inventory
    permission: Permission
  }

  type InventoryReturn {
    status: StatusMessage
    inventory: Inventory
    permission: Permission
  }
  type InventoryStorage {
    inventory: Inventory
    storage: Storage
  }

  type InventoryPermissionReturn {
    inventoryUser: InventoryUser
    status: StatusMessage
  }

  type InventoryStorageReturn {
    inventoryStorage: InventoryStorage
    status: StatusMessage
  }

  type Mutation {
    newInventory(name: String!, description: String): InventoryReturn

    editInventory(
      inventoryId: String!
      name: String!
      description: String
      permission: Permission!
    ): InventoryReturn

    trashInventory(
      inventoryId: String!
      permission: Permission!
    ): InventoryReturn

    addStorageToInventory(
      inventoryId: String!
      storageId: String!
      storagePermission: Permission!
      inventoryPermission: Permission!
    ): InventoryStorageReturn

    removeStorageFromInventory(
      inventoryId: String!
      storageId: String!
      permission: Permission
    ): InventoryStorageReturn

    changeInventoryPermission(
      userId: String!
      inventoryId: String!
      permission: Permission
      userPermission: Permission
    ): InventoryPermissionReturn

    removeInventoryPermission(
      userId: String!
      inventoryId: String!
      permission: Permission
    ): InventoryPermissionReturn
  }
`;

export default inventory;
