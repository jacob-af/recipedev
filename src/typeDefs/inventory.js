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
    user: [User]
    inventory: [Inventory]
    permission: Permission
  }

  type InventoryStorage {
    inventory: [Inventory]
    storage: [Storage]
  }

  type InventoryReturn {
    status: StatusMessage
    inventory: Inventory
    permission: Permission
  }

  type InventoryShareReturn {
    status: StatusMessage
    inventoryId: String
  }

  type Mutation {
    newInventory(name: String!, description: String): InventoryReturn

    editInventory(
      inventoryId: String!
      name: String!
      description: String
      permission: Permission!
    ): InventoryReturn

    trashInventory(inventoryId: String!, permission: Permission!): StatusMessage

    addStorageToInventory(
      inventoryId: String!
      storageId: String!
      storagePermission: Permission
      inventoryPermission: Permission
    ): StatusMessage

    removeStorageFromInventory(
      inventoryId: String!
      storageId: String!
      permission: Permission
    ): StatusMessage

    changeInventoryPermission(
      userId: String!
      inventoryId: String!
      permission: Permission
      userPermission: Permission
    ): InventoryShareReturn

    removeInventoryPermission(
      userId: String!
      inventoryId: String!
      permission: Permission
    ): StatusMessage
  }
`;

export default inventory;
