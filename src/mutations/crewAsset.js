import {
  createInventoryOnCrew,
  deleteInventoryFromCrew,
  createStorageOnCrew,
  deleteStorageFromCrew,
  createIngredientOnCrew,
  deleteIngredientFromCrew,
  createRecipeBookOnCrew,
  deleteRecipeBookFromCrew,
  createBuildOnCrew,
  deleteBuildFromCrew
} from "../actions/crewAsset.js";
import { resolvePermission } from "../actions/utils.js";

async function addBuildToCrew(parent, args, context, info) {
  console.log(
    "ding",
    resolvePermission(args.crewPermission, "Manager"),
    resolvePermission(args.buildPermission, "Manager")
  );
  if (
    !resolvePermission(args.crewPermission, "Manager") ||
    !resolvePermission(args.buildPermission, "Manager")
  ) {
    return {
      status: {
        message: "You don't have permission to add to this Crew",
        code: "Failure"
      }
    };
  }
  return await createBuildOnCrew(
    context,
    args.buildId,
    args.crewId,
    args.crewPermission,
    args.buildPermission
  );
}

async function removeBuildFromCrew(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        message: "You don't have permission to remove anything from this Crew",
        code: "Failure"
      }
    };
  }
  return await deleteBuildFromCrew(context, args.buildId, args.crewId);
}

async function addRecipeBookToCrew(parent, args, context, info) {
  if (
    !resolvePermission(args.crewPermission, "Manager") ||
    !resolvePermission(args.recipeBookPermission, "Manager")
  ) {
    return {
      status: {
        message: "You don't have permission to add to this Crew",
        code: "Failure"
      }
    };
  }
  return await createRecipeBookOnCrew(
    context,
    args.recipeBookId,
    args.crewId,
    args.crewPermission,
    args.recipeBookPermission
  );
}

async function removeRecipeBookFromCrew(parent, args, context, info) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      status: {
        message: "You don't have permission to remove anything from this Crew",
        code: "Failure"
      }
    };
  }
  return await deleteRecipeBookFromCrew(
    context,
    args.recipeBookId,
    args.crewId,
    args.permission
  );
}

async function addIngredientToCrew(parent, args, context, info) {
  if (
    !resolvePermission(args.crewPermission, "Manager") ||
    !resolvePermission(args.ingredientPermission, "Manager")
  ) {
    return {
      status: {
        message: "You don't have permission to add to this Crew",
        code: "Failure"
      }
    };
  }
  return await createIngredientOnCrew(
    context,
    args.ingredientId,
    args.crewId,
    args.crewPermission,
    args.ingredientPermission
  );
}

async function removeIngredientFromCrew(parent, args, context, info) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      status: {
        message: "You don't have permission to remove anything from this Crew",
        code: "Failure"
      }
    };
  }
  return await deleteIngredientFromCrew(
    context,
    args.ingredientId,
    args.crewId,
    args.permission
  );
}

async function addStorageToCrew(parent, args, context, info) {
  if (
    !resolvePermission(args.crewPermission, "Manager") ||
    !resolvePermission(args.storagePermission, "Manager")
  ) {
    return {
      status: {
        message: "You don't have permission to add to this Crew",
        code: "Failure"
      }
    };
  }
  return await createStorageOnCrew(
    context,
    args.storageId,
    args.crewId,
    args.crewPermission,
    args.storagePermission
  );
}

async function removeStorageFromCrew(parent, args, context, info) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      status: {
        message: "You don't have permission to remove anything from this Crew",
        code: "Failure"
      }
    };
  }
  return await deleteStorageFromCrew(
    context,
    args.storageId,
    args.crewId,
    args.permission
  );
}

async function addInventoryToCrew(parent, args, context, info) {
  if (
    !resolvePermission(args.crewPermission, "Manager") ||
    !resolvePermission(args.inventoryPermission, "Manager")
  ) {
    return {
      status: {
        message: "You don't have permission to add to this Crew",
        code: "Failure"
      }
    };
  }
  return await createInventoryOnCrew(
    context,
    args.inventoryId,
    args.crewId,
    args.crewPermission,
    args.inventoryPermission
  );
}

async function removeInventoryFromCrew(parent, args, context, info) {
  if (!resolvePermission(permission, "Manager")) {
    return {
      status: {
        message: "You don't have permission to remove anything from this Crew",
        code: "Failure"
      }
    };
  }
  return await deleteInventoryFromCrew(
    context,
    args.inventoryId,
    args.crewId,
    args.permission
  );
}

export default {
  addInventoryToCrew,
  removeInventoryFromCrew,
  addStorageToCrew,
  removeStorageFromCrew,
  addIngredientToCrew,
  removeIngredientFromCrew,
  addRecipeBookToCrew,
  removeRecipeBookFromCrew,
  addBuildToCrew,
  removeBuildFromCrew
};
