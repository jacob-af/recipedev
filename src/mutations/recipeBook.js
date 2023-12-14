// addRecipeBook; +
// editRecipeBook; +
// deleteRecipeBook; +
// addRecipeBookPermission; +
// editRecipeBookPermission;
// deleteRecipeBookPermission;\

import {
  createRecipeBook,
  updateRecipeBook,
  deleteRecipeBook,
  createBuildOnRecipeBook,
  deleteBuildFromRecipeBook,
  createPermissionOnRecipeBook,
  deleteRecipeBookPermission
} from "../actions/recipeBook.js";
import { resolvePermission } from "../actions/utils.js";

async function newRecipeBook(parent, args, context, info) {
  const { userId } = context;
  const { status, permission, recipeBook } = await createRecipeBook(
    context,
    args.name,
    args.description,
    userId
  );

  return {
    status,
    permission,
    recipeBook
  };
}

async function editRecipeBook(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        code: "Failure",
        message: ""
      }
    };
  }
  const { status, recipeBook } = await updateRecipeBook(
    context,
    args.recipeBookId,
    args.name,
    args.description,
    args.permission
  );

  return { status, permission: args.permission, recipeBook };
}

async function trashRecipeBook(parent, args, context, info) {
  if (!resolvePermission(permission, "Owner")) {
    return {
      status: {
        code: "Failure",
        message: ""
      }
    };
  }
  const { recipeBook, status } = await deleteRecipeBook(
    context,
    args.recipeBookId,
    args.permission
  );
  return { recipeBook, status };
}

async function addBuildToRecipeBook(parent, args, context, info) {
  if (
    !resolvePermission(args.bookPermission, "Manager") ||
    !resolvedPermission(args.buildPermission, "Manager")
  ) {
    return {
      status: {
        message: "You don't have permission to add to this Recipe Book",
        code: "Failure"
      }
    };
  }
  return await createBuildOnRecipeBook(
    context,
    args.buildId,
    args.recipeBookId,
    args.bookPermission,
    args.buildPermission
  );
}

async function removeBuildFromRecipeBook(parent, args, context, info) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      status: {
        message:
          "You don't have permission to remove anything from this Recipe Book",
        code: "Failure"
      }
    };
  }
  return await deleteBuildFromRecipeBook(
    context,
    args.buildId,
    args.recipeBookId,
    args.permission
  );
}

async function changeRecipeBookPermission(parent, args, context, info) {
  if (!resolvePermission(userPermission, permission)) {
    return {
      status: {
        message:
          "You don't have permission to remove anything from this Recipe Book",
        code: "Failure"
      }
    };
  }
  const recipeBook = await createPermissionOnRecipeBook(
    context,
    args.userId,
    args.recipeBookId,
    args.permission,
    args.userPermission
  );
  console.log(recipeBook);
  return recipeBook;
}

async function removeRecipeBookPermission(parent, args, context, info) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      message: "You don't have permission to remove users from this book!",
      code: "Failure"
    };
  }
  const response = await deleteRecipeBookPermission(
    context,
    args.userId,
    args.recipeBookId,
    args.permission
  );
  return response;
}

export default {
  newRecipeBook,
  editRecipeBook,
  trashRecipeBook,
  addBuildToRecipeBook,
  removeBuildFromRecipeBook,
  changeRecipeBookPermission,
  removeRecipeBookPermission
};
