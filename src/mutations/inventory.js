import {
  createInventory,
  updateInventory,
  deleteInventory,
  createStorageOnInventory,
  deleteStorageFromInventory,
  createPermissionOnInventory,
  deleteInventoryPermission
} from "../actions/inventory.js";
import { resolvePermission } from "../actions/utils.js";

async function newInventory(parent, args, context, info) {
  const { userId } = context;
  console.log("ding");
  const { inventory, permission, status } = await createInventory(
    context,
    args.name,
    args.description,
    userId
  );

  return {
    status,
    permission,
    inventory
  };
}

async function editInventory(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  const { inventory, status } = await updateInventory(
    context,
    args.inventoryId,
    args.name,
    args.description
  );

  return { inventory, status, permission: args.permission };
}

async function trashInventory(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Owner")) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  const { inventory, status } = await deleteInventory(
    context,
    args.inventoryId
  );
  return { inventory, status, permission: args.permission };
}

async function addStorageToInventory(parent, args, context, info) {
  if (
    !resolvePermission(args.inventoryPermission, "Manager") ||
    !resolvePermission(args.storagePermission, "Manager")
  ) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  return await createStorageOnInventory(
    context,
    args.storageId,
    args.inventoryId
  );
}

async function removeStorageFromInventory(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  return await deleteStorageFromInventory(
    context,
    args.storageId,
    args.inventoryId
  );
}

async function addIngredientToInventory(parent, args, context, info) {
  if (
    !resolvePermission(args.inventoryPermission, "Manager") ||
    !resolvePermission(args.ingredientPermission, "Manager")
  ) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  return await createIngredientOnInventory(
    context,
    args.ingredientId,
    args.inventoryId
  );
}

async function removeIngredientFromInventory(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  return await deleteIngredientFromInventory(
    context,
    args.IngredientId,
    args.inventoryId
  );
}

async function changeInventoryPermission(parent, args, context, info) {
  if (!resolvePermission(args.userPermission, args.permission)) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  return await createPermissionOnInventory(
    context,
    args.userId,
    args.inventoryId,
    args.permission
  );
}

async function removeInventoryPermission(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      message:
        "You don't have permission to remove recipes from this inventory!",
      code: "Failure"
    };
  }
  const response = await deleteInventoryPermission(
    context,
    args.userId,
    args.inventoryId,
    args.permission
  );
  return response;
}

export default {
  newInventory,
  editInventory,
  trashInventory,
  addStorageToInventory,
  removeStorageFromInventory,
  changeInventoryPermission,
  removeInventoryPermission
};
