import {
  createCrew,
  updateCrew,
  deleteCrew,
  createPermissionOnCrew,
  deleteCrewPermission
} from "../actions/crew.js";
import { resolvePermission } from "../actions/utils.js";

async function newCrew(parent, args, context, info) {
  const { userId } = context;
  const { status, permission, crew } = await createCrew(
    context,
    args.name,
    args.description,
    userId
  );

  return {
    status,
    permission,
    crew
  };
}

async function editCrew(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      status: {
        code: "Failure",
        message: "Leave the crew alone"
      }
    };
  }
  const { status, crew } = await updateCrew(
    context,
    args.crewId,
    args.name,
    args.description,
    args.permission
  );

  return { status, permission: args.permission, crew };
}

async function trashCrew(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Owner")) {
    return {
      status: {
        code: "Failure",
        message: ""
      }
    };
  }
  const { crew, status } = await deleteCrew(
    context,
    args.crewId,
    args.permission
  );
  return { crew, status, permission: args.permission };
}

async function changeCrewPermission(parent, args, context, info) {
  if (!resolvePermission(args.userPermission, args.permission)) {
    return {
      status: {
        message: "You don't have permission to remove anything from this Crew",
        code: "Failure"
      }
    };
  }
  const crew = await createPermissionOnCrew(
    context,
    args.userId,
    args.crewId,
    args.permission
  );
  console.log(crew);
  return crew;
}

async function removeCrewPermission(parent, args, context, info) {
  if (!resolvePermission(args.permission, "Manager")) {
    return {
      message: "You don't have permission to remove users from this crew!",
      code: "Failure"
    };
  }
  const response = await deleteCrewPermission(
    context,
    args.userId,
    args.crewId
  );
  console.log(response);
  return response;
}

async function addRecipeBookToCrew(parent, args, context, info) {
  if (
    !resolvePermission(args.crewPermission, "Manager") ||
    !resolvedPermission(args.recipeBookPermission, "Manager")
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
    !resolvedPermission(args.ingredientPermission, "Manager")
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
    !resolvedPermission(args.storagePermission, "Manager")
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
    !resolvedPermission(args.inventoryPermission, "Manager")
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
  newCrew,
  editCrew,
  trashCrew,
  changeCrewPermission,
  removeCrewPermission
};
