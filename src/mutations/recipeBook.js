// addRecipeBook; +
// editRecipeBook; +
// deleteRecipeBook; +
// addRecipeBookPermission; +
// editRecipeBookPermission;
// deleteRecipeBookPermission;\

import {
  createRecipeBook,
  permissionOnRecipeBook,
  updateRecipeBook,
  deleteRecipeBook,
  createBuildOnRecipeBook
} from "../helperFunctions/recipeBook.js";

async function newRecipeBook(parent, args, context, info) {
  const { userId } = context;

  const recipeBook = await createRecipeBook(
    context,
    args.name,
    args.description,
    userId
  );

  return {
    status: recipeBook.status,
    permission: recipeBook.permission,
    recipeBook: recipeBook.recipeBook
  };
}

async function changeRecipeBookPermission(parent, args, context, info) {
  const recipeBook = await permissionOnRecipeBook(
    context,
    args.userId,
    args.recipeBookId,
    args.permission,
    args.userPermission
  );
  return {
    status: { message: "barf", code: "success" },
    recipeBookId: recipeBook.recipeBookId
  };
}

async function editRecipeBook(parent, args, context, info) {
  const recipeBook = await updateRecipeBook(
    context,
    args.recipeBookId,
    args.name,
    args.description,
    args.permission
  );

  return {
    status: recipeBook.status,
    permission: recipeBook.permission,
    recipeBook: recipeBook.recipeBook
  };
}

async function trashRecipeBook(parent, args, context, info) {
  const statusMessage = await deleteRecipeBook(
    context,
    args.recipeBookId,
    args.permission
  );
  return statusMessage;
}

async function addBuildToRecipeBook(parent, args, context, info) {
  return await createBuildOnRecipeBook(
    context,
    args.buildId,
    args.recipeBookId,
    args.bookPermission,
    args.buildPermission
  );
}

export default {
  newRecipeBook,
  changeRecipeBookPermission,
  editRecipeBook,
  trashRecipeBook,
  addBuildToRecipeBook
};
