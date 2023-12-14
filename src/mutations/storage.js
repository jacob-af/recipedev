import {
  createStorage,
  updateStorage,
  deleteStorage,
  createIngredientOnStorage,
  deleteIngredientFromStorage,
  createPermissionOnStorage,
  deleteStoragePermission
} from "../actions/storage.js";
import { resolvePermission } from "../actions/utils.js";

async function newStorage(parent, args, context, info) {
  const { userId } = context;
  console.log("ding");
  const { storage, permission, status } = await createStorage(
    context,
    args.name,
    args.description,
    userId
  );

  return {
    status,
    permission,
    storage
  };
}

async function editStorage(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  const { storage, status } = await updateStorage(
    context,
    args.storageId,
    args.name,
    args.description
  );

  return { storage, status, permission: args.permission };
}

async function trashStorage(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Owner")) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  const { storage, status } = await deleteStorage(context, args.storageId);
  return { storage, status, permission: args.permission };
}

async function changeStoragePermission(parent, args, context, info) {
  if (!resolvePermission(args.userPermission, args.permission)) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  return await createPermissionOnStorage(
    context,
    args.userId,
    args.storageId,
    args.permission
  );
}

async function removeStoragePermission(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      message: "You don't have permission to remove recipes from this storage!",
      code: "Failure"
    };
  }
  const response = await deleteStoragePermission(
    context,
    args.userId,
    args.storageId,
    args.permission
  );
  return response;
}

async function addIngredientToStorage(parent, args, context, info) {
  if (
    !resolvePermission(args.storagePermission, "Manager") ||
    !resolvePermission(args.ingredientPermission, "Manager")
  ) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  return await createIngredientOnStorage(
    context,
    args.storageId,
    args.ingredientId
  );
}

async function removeIngredientFromStorage(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        code: "Failure",
        message: "You dont have permission to change this"
      }
    };
  }
  return await deleteIngredientFromStorage(
    context,
    args.storageId,
    args.ingredientId
  );
}

export default {
  newStorage,
  editStorage,
  trashStorage,
  addIngredientToStorage,
  removeIngredientFromStorage,
  changeStoragePermission,
  removeStoragePermission
};
