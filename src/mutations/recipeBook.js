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

async function removeBuildFromRecipeBook(parent, args, context, info) {
  return await deleteBuildFromRecipeBook(
    context,
    args.buildId,
    args.recipeBookId,
    args.permission
  );
}

async function changeRecipeBookPermission(parent, args, context, info) {
  const recipeBook = await createPermissionOnRecipeBook(
    context,
    args.userId,
    args.recipeBookId,
    args.permission,
    args.userPermission
  );
  console.log(recipeBook);
  return {
    status: { message: "barf", code: "success" },
    recipeBookId: recipeBook.recipeBookId
  };
}

async function removeRecipeBookPermission(parent, args, context, info) {
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
