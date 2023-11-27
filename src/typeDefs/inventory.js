const { gql } = require("apollo-server");

const inventory = gql`
  type Inventory {
    id: ID!
    name: String!
    description: String
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    inventoryStorage: [InventoryStorage]
  }

  type InventoryUser {
    user: User
    inventory: Inventory
    permission: Permission
  }

  type Storage {
    id: ID!
    name: String!
    createdAt: DateTimeResolver
    editedAt: DateTimeResolver
    createdBy: User
    editedBy: User
    inventoryStorage: [InventoryStorage]
    ingredientStorage: [IngredientStorage]
    storageUser: [StorageUser]
  }

  type InventoryStorage {
    inventory: Inventory
    storage: Storage
  }

  type IngredientStorage {
    ingredient: SpecificIngredient
    storage: Storage
  }

  type StorageUser {
    storage: Storage
    user: User
    permission: Permission
  }

  type InventoryReturn {
    status: String
    inventory: Inventory
  }
  type StorageReturn {
    status: String
    storage: Storage
  }
`;

module.exports = inventory;
